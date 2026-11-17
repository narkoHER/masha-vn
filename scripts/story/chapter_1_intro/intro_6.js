// Глава 1 • Сцена 6: 07:30 утра — душ, полотенце, архив Кати и домофон Ленки
// Каждая сцена — отдельный независимый скрипт (по архитектуре Amnesia).

export const scene_intro_6 = {

    // =========================================================================
    // INTRO_6: 07:30 УТРА, МНОГОРАКУРСНЫЙ ДУШ, ПРОВЕРКА ДОВЕРИЯ И КЛИФФХЭНГЕР
    // =========================================================================
    Intro_6: [
      {
        location: "МОСКВА • 07:30 УТРА",
        bg: "./assets/locations/penthouse/livingroom/morning_sun.webp",
        cam: "zoom-slow",
        fxShader: "morning_sun",
        ambience: "morning",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Просыпаюсь ровно в семь тридцать по старой интернатской привычке. Первые секунды спросонья ищу глазами казённые двухъярусные койки, а вижу залитый солнцем паркет и чистое небо над башнями Сити. Маша легла заполночь, точно спит без задних ног. Пойду тихо умыться."
      },
      {
        // *#Кадр 1: приоткрытая дверь ванной, пар и силуэт за стеклом душевой*
        location: "ВАННАЯ • 07:32",
        bg: "./assets/story/intro_6/01_shower_door_ajar.webp",
        video: "./assets/videos/loops/shower_door_ajar_5s.mp4",
        videoMode: "loop",
        cam: "zoom-slow",
        fxShader: "shower_steam",
        ambience: "shower",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Толкаю незапертую дверь, чтобы не щёлкать выключателем, и замираю на полушаге. Изнутри обдаёт горячим паром с запахом цитруса и цветочного шампуня."
      },
      {
        // *#Кадр 2: нижний контровой ракурс сквозь пар в солнечных лучах*
        bg: "./assets/story/intro_6/02_shower_low_angle.webp",
        video: "./assets/videos/oneshots/shower_low_angle_5s.mp4",
        videoMode: "once",
        cam: "pan-up-reveal",
        fxShader: "shower_steam",
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Она забыла повернуть защёлку… В двух шагах за мокрым стеклом кабины в косых солнечных лучах стоит Маша, убирая со лба тяжёлые золотистые пряди под струями воды."
      },
      {
        // *#Кадр 3: верхний ракурс под тропической лейкой*
        bg: "./assets/story/intro_6/03_shower_high_angle.webp",
        video: "./assets/videos/loops/shower_high_angle_5s.mp4",
        videoMode: "loop",
        cam: "zoom-slow",
        fxShader: "shower_steam",
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Во рту мгновенно пересыхает, ступни будто приросли к тёплой плитке у порога. Если не выйду прямо в эту секунду, она выключит воду и обернётся…"
      },
      {
        choices: [
          {
            text: "Задержать взгляд ещё на пару секунд",
            onPick: (s, api) => {
              api.changeStats({ risk: 1 }, ["Риск +1"]);
            },
            goto: "Intro_6_shower_look"
          },
          {
            text: "Отвести глаза и тихо шагнуть за дверь",
            onPick: (s, api) => {
              api.changeStats({ loyalty: 1 }, ["Доверие Маши выросло"]);
            },
            goto: "Intro_6_shower_leave"
          }
        ]
      }
    ],


    Intro_6_shower_look: [
      {
        // *#Кадр 4: отражение в запотевшем зеркале и звон задетого флакона*
        bg: "./assets/story/intro_6/04_shower_steamy_mirror.webp",
        video: "./assets/videos/oneshots/steamy_mirror_5s.mp4",
        videoMode: "once",
        cam: "zoom-slow",
        fxShader: "shower_steam",
        fx: "glass_clink",
        shake: true,
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "В запотевшем зеркале видно, как её ладонь ложится на стекло кабины, вода стихает… Дёргаюсь назад к выходу и локтем задеваю флакон духов на краю раковины!"
      },
      {
        role: "masha",
        speaker: "Маша (из-за стекла)",
        text: "Ой! Кто там?! {mc_dim}, это ты в ванной?!"
      },
      {
        branchByState: (s) => (s.masha.loyalty >= 2 ? "Intro_6_high_loyalty" : "Intro_6_low_loyalty")
      }
    ],


    Intro_6_shower_leave: [
      {
        location: "ЗА ДВЕРЬЮ ВАННОЙ • 07:34",
        bg: "./assets/locations/penthouse/livingroom/morning_sun.webp",
        video: null,
        fxShader: "morning_sun",
        fx: "door",
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Прости, Маш, я уже за дверью! Защёлка была открыта, я думал, ты ещё спишь!"
      },
      {
        role: "masha",
        speaker: "Маша (из ванной)",
        text: "Хах, стой уж в коридоре, раз спалился, ранняя пташка! Дай полминуты полотенце накинуть!"
      },
      {
        branchByState: (s) => (s.masha.loyalty >= 2 ? "Intro_6_high_loyalty" : "Intro_6_low_loyalty")
      }
    ],


    // Ветка прохождения проверки доверия (loyalty >= 2)
    Intro_6_high_loyalty: [
      {
        location: "КОРИДОР И ГАРДЕРОБНАЯ • 07:36",
        bg: "./assets/story/intro_6/towel_high_loyalty.webp",
        video: null,
        cam: "zoom-slow",
        fxShader: "morning_sun",
        ambience: "morning",
        effect: (s, api) => {
          s.flags.morning_high_loyalty = true;
          if (s.masha.stars < 1) {
            s.masha.stars = 1;
            api.toast("Близость с Машей: ★1", "gold");
          }
        },
        role: "masha",
        speaker: "Маша",
        text: "Доброе утро, Соколов. У тебя сейчас уши такого цвета, будто ты не в ванную случайно зашёл, а банк ограбил!"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Извини ещё раз… Привык по звонку в полвосьмого вставать, на автомате пошёл умыться."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Да расслабься ты, свои же люди! Раз уж всё равно не спишь, выручай свежим мужским взглядом, у меня с утра важная встреча."
      },
      {
        // *#Маша проходит к гардеробной в коротком полотенце и прикладывает два наряда*
        bg: "./assets/locations/penthouse/bedroom/morning_sun.webp",
        video: null,
        sprite: "./assets/sprites/masha/towel_flirt.webp",
        fx: "cloth",
        role: "masha",
        speaker: "Маша",
        text: "Ну, говори честно: в чём убедительнее смотрится, в строгом светлом жакете или в платье помягче?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Честно говоря, Маш, ты даже в одном полотенце выглядишь так, что там все забудут, зачем собрались. Но светлый жакет тебе очень идёт."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Ого, да ты ещё и комплименты делать умеешь, когда осмелеешь! Засчитано, иди включай кофемашину на кухне, через пять минут выхожу завтракать!"
      },
      { goto: "Intro_6_kitchen_finale" }
    ],


    // Ветка непрохождения проверки доверия (loyalty < 2)
    Intro_6_low_loyalty: [
      {
        location: "У ДВЕРИ ВАННОЙ • 07:36",
        bg: "./assets/story/intro_6/towel_low_loyalty.webp",
        cam: "zoom-slow",
        fxShader: "morning_sun",
        ambience: "morning",
        effect: (s) => {
          s.flags.morning_high_loyalty = false;
        },
        role: "masha",
        speaker: "Маша",
        text: "Так, {mc}! Давай сразу договоримся: ты уже давно не шестилетний мальчишка, а я в этой квартире привыкла жить одна. В следующий раз перед закрытой дверью стучат и ждут ответа, понял?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Понял, Маш, виноват… Честно, случайно вышло, больше не повторится."
      },
      {
        fx: "door",
        role: "masha",
        speaker: "Маша",
        text: "Очень надеюсь. Всё, иди на кухню ставить кофе и не крутись в коридоре, пока я нормально не соберусь!"
      },
      { goto: "Intro_6_kitchen_finale" }
    ],


    // Финал на кухне и двойной клиффхэнгер (сообщение Кати + визит Ленки)
    Intro_6_kitchen_finale: [
      {
        location: "КУХНЯ-БАР • 07:48",
        bg: "./assets/locations/penthouse/kitchen/morning_sun.webp",
        sprite: null,
        video: null,
        cam: "zoom-slow",
        fxShader: "morning_sun",
        ambience: "morning",
        fx: "phone_buzz",
        incomingCard: {
          sender: "Катя (Интернат)",
          meta: "Только что • 2 фото из архива канцелярии",
          text: "{mc_dim}, проснись, это просто бомба!! Я ночью нашла в дальнем сейфе твою старую опись при поступлении! Смотри второй снимок: на квитке приёмки твоих часов стоит штамп часового ателье на Арбате, где их чинили за три дня до приёмника! И ещё: секретарша проболталась, что этой весной какой-то мужчина присылал курьера узнать точную дату твоего выпуска!!"
        },
        effect: (s, api) => {
          api.addClue("clue_katya_archive");
          api.pushMcMessage("katya", {
            dir: "in",
            time: "07:48",
            attachments: [
              "Фото 1: Первичная опись приёма №114/02 (сейф канцелярии)",
              "Фото 2: Штамп «Часовое ателье • Старый Арбат» за 3 дня до приёмника"
            ],
            text: "{mc_dim}, проснись, это просто бомба!! Я ночью нашла в дальнем сейфе твою старую опись при поступлении! На квитке приёмки твоих часов стоит штамп часового ателье на Арбате, где их чинили за три дня до приёмника! И ещё: секретарша проболталась, что этой весной какой-то мужчина присылал курьера узнать точную дату твоего выпуска!!"
          });
        },
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Пока кофемашина наливает эспрессо, телефон на стойке вибрирует сообщением от Кати. Открываю прикреплённые снимки старых пожелтевших бланков…"
      },
      {
        incomingCard: null,
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Пальцы моментально холодеют. Часовая мастерская на Арбате в двадцати минутах ходьбы отсюда. И неизвестный мужчина, который полгода назад выяснял дату моего выхода на свободу?! Неужели отец всё это время был жив и ходил со мной по одному городу?!"
      },
      {
        // *#Трель видеодомофона, на экране появляется Ленка с двумя стаканами кофе*
        location: "ПРИХОЖАЯ • 07:52",
        bg: "./assets/story/intro_6/lenka_intercom.webp",
        video: null,
        cam: "zoom-slow",
        fxShader: "none",
        fx: "intercom",
        role: "masha",
        speaker: "Маша",
        text: "Чёрт… Только не она с утра пораньше! Это Ленка, моя лучшая подруга и главная ходячая катастрофа во всей Москве!"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Та самая? И чем она так опасна?"
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Тем, что у неё рентген вместо глаз и ноль тормозов! {mc_dim}, умоляю, ни слова про мою работу и про вчерашний вечер. Если эта бестия почует хоть одну нестыковку, она из нас обоих душу вынет прямо за завтраком!"
      },
      {
        fx: "lock_beep",
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        effect: (s) => {
          s.flags.lenka_met = true;
        },
        text: "Ну что, подруга, открывай двери! Я привезла лучший раф с Патриарших и горю желанием взглянуть в глаза твоему таинственному младшему братику!"
      },
      {
        fx: "door",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Замок щёлкает, за дверью стучат высокие каблуки, и наши взгляды скрещиваются прямо на пороге. Похоже, спокойного утра в этой квартире не будет."
      },
      {
        goto: "Ch2_1"
      }
    ]
};
