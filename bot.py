#!/usr/bin/env python3
"""
Telegram-бот запуска вертикальной визуальной новеллы «Маша: Чужая кровь» (@play_with_masha_bot).
Читает BOT_TOKEN и WEBAPP_URL из .env (не хранит секреты в коде).

Использование:
  python3 bot.py --setup   # Настроить кнопку меню Mini App, команды и описание бота (работает 24/7 без сервера)
  python3 bot.py           # Запустить long-polling обработчик /start с обложкой и inline-кнопкой игры
"""

import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

SSL_CTX = (
    ssl.create_default_context(cafile="/etc/ssl/cert.pem")
    if Path("/etc/ssl/cert.pem").exists()
    else ssl.create_default_context()
)


def load_dotenv(env_path: Path) -> None:
    if not env_path.exists():
        return
    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, val = line.split("=", 1)
        os.environ.setdefault(key.strip(), val.strip().strip('"').strip("'"))


load_dotenv(Path(__file__).resolve().parent / ".env")

BOT_TOKEN = os.environ.get("BOT_TOKEN", "").strip()
WEBAPP_URL = os.environ.get("WEBAPP_URL", "https://narkoher.github.io/masha-vn/?v=3.4").strip()
if "v=" not in WEBAPP_URL:
    WEBAPP_URL = f"{WEBAPP_URL.rstrip('/')}/?v=3.4"

if not BOT_TOKEN:
    sys.exit("Ошибка: задайте BOT_TOKEN в файле .env или переменных окружения.")


def tg_call(method: str, payload: dict | None = None) -> dict:
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/{method}"
    data = json.dumps(payload or {}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=35, context=SSL_CTX) as resp:
        return json.loads(resp.read().decode("utf-8"))


def configure_bot() -> None:
    me = tg_call("getMe")["result"]
    print(f"Бот: @{me.get('username')} ({me.get('first_name')})")

    tg_call(
        "setChatMenuButton",
        {
            "menu_button": {
                "type": "web_app",
                "text": "Играть",
                "web_app": {"url": WEBAPP_URL},
            }
        },
    )
    tg_call(
        "setMyCommands",
        {
            "commands": [
                {"command": "start", "description": "Запустить визуальную новеллу «Маша»"},
            ]
        },
    )
    tg_call(
        "setMyShortDescription",
        {
            "short_description": "Интерактивная визуальная новелла «МАША» — Пролог «Чужая Москва».",
        },
    )
    tg_call(
        "setMyDescription",
        {
            "description": (
                "🎬 МАША — вертикальная визуальная новелла и интерактивная история.\n\n"
                "Двенадцать лет тишины, сломанные отцовские часы, кофейня на Малой Бронной "
                "и ночной пентхаус на 32-м этаже с видом на Москва-Сити.\n\n"
                "Нажми «Играть» или /start, чтобы открыть Пролог!"
            ),
        },
    )
    print(f"Готово! Кнопка Mini App настроена на: {WEBAPP_URL}")


def send_start_card(chat_id: int, first_name: str = "друг") -> None:
    caption = (
        f"✨ <b>МАША — Пролог «Чужая Москва» (v2 Чистовик)</b>\n\n"
        f"Привет, {first_name}! Ты выходишь за проходную интерната с отцовскими часами «Полёт» и старым номером "
        f"сводной сестры <b>Марии Боратовны</b>.\n\n"
        f"🎬 <b>В чистовом Прологе (6 сцен):</b>\n"
        f"• Режиссёрская раскадровка Seedream 5.0 + живые видео-лупы Kling 2.5\n"
        f"• Смартфон героя (шкалы Вектора Альфа/Ваниль, Близости, чаты и улики)\n"
        f"• Свободный осмотр 4 комнат пентхауса на Пресне и взлом второго iPhone Маши\n"
        f"• Развилка утренней сцены и приход Ленки\n\n"
        f"👇 Жми кнопку ниже, чтобы войти в историю на весь экран:"
    )
    tg_call(
        "sendMessage",
        {
            "chat_id": chat_id,
            "text": caption,
            "parse_mode": "HTML",
            "reply_markup": {
                "inline_keyboard": [
                    [
                        {
                            "text": "▶️ Играть: Пролог «Чужая Москва»",
                            "web_app": {"url": WEBAPP_URL},
                        }
                    ]
                ]
            },
        },
    )


def run_polling() -> None:
    configure_bot()
    tg_call("deleteWebhook", {"drop_pending_updates": False})
    print("Long-polling запущен (Ctrl+C для остановки)...")
    offset = 0
    while True:
        try:
            res = tg_call("getUpdates", {"offset": offset, "timeout": 25})
            for upd in res.get("result", []):
                offset = upd["update_id"] + 1
                msg = upd.get("message") or {}
                text = (msg.get("text") or "").strip()
                chat = msg.get("chat") or {}
                if chat.get("id") and (text.startswith("/start") or text.lower() in {"играть", "маша", "play"}):
                    first_name = (msg.get("from") or {}).get("first_name") or "герой"
                    send_start_card(chat["id"], first_name)
        except KeyboardInterrupt:
            print("\nОстановлено.")
            break
        except Exception as exc:
            print(f"[warn] Ошибка polling: {exc}", file=sys.stderr)
            time.sleep(3)


if __name__ == "__main__":
    if "--setup" in sys.argv:
        configure_bot()
    else:
        run_polling()
