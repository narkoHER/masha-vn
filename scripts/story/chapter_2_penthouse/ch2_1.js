// Глава 2 • Сцена 1: Утренний визит Ленки, кофе на кухне и отъезд Маши
// Каждая сцена — отдельный независимый скрипт (по архитектуре Amnesia).

export const scene_ch2_1 = {

    // =========================================================================
    // ГЛАВА 2: ЧУЖОЙ ДОМ (Ch2_1 .. Ch2_6)
    // =========================================================================
    Ch2_1: [
      {
        location: "ГЛАВА 2 • ПЕНТХАУС, 07:55",
        bg: "./assets/story/ch2/01_lenka_entrance.webp",
        video: null,
        sprite: null,
        cam: "zoom-slow",
        fxShader: "morning_sun",
        ambience: "morning",
        fx: "door",
        effect: (s) => {
          s.currentChapter = 2;
          s.flags.lenka_met = true;
        },
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        text: "Та-даам! Доставка горячего ванильного рафа для самых скрытных девочек Пресни… Стоп. Так он реально настоящий?!"
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "На пороге стоит жгучая темноволосая девчонка с ровным пробором, оливковым бомбером нараспашку и такой наглой искрой в карих глазах, будто она уже знает обо мне больше, чем я сам. Бесцеремонно окидывает меня взглядом с кроссовок до макушки."
      },
      {
        bg: "./assets/story/ch2/02_kitchen_trio_coffee.webp",
        cam: "zoom-slow",
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        text: "Машка, ты мне вчера по телефону лепетала про «маленького братика с поезда»! Какой же он маленький? Плечи развёрнуты, взгляд волчий, ещё и эта хулиганская засечка на брови… Привет, Соколов. Я Лена."
      },
      {
        bg: "./assets/locations/penthouse/kitchen/morning_sun.webp",
        sprite: "./assets/sprites/masha/cafe_nervous.webp",
        role: "masha",
        speaker: "Маша",
        text: "Лена, выдохни и поставь стаканы на остров. Ты зачем вообще примчалась в восемь утра без звонка?"
      },
      {
        sprite: "./assets/sprites/lenka/smirk.webp",
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        text: "Как зачем? Проверить, жива ли моя лучшая подруга после вчерашнего выезда, и посмотреть на твоего таинственного родственника! Ну что, {mc}, признавайся: сестра тебя тут уже построила по стойке смирно?"
      },
      {
        choices: [
          {
            text: "Выдержать её взгляд в упор: «Меня сложно построить. Но кофе кстати»",
            onPick: (s, api) => {
              s.flags.lenka_intrigued = true;
              api.changeStats({ alpha: 1 }, ["Вектор характера: Альфа"]);
            },
            goto: "Ch2_1_alpha"
          },
          {
            text: "Спокойно кивнуть и прикрыть Машу: «Маша отлично встретила, спасибо за раф»",
            onPick: (s, api) => {
              api.changeStats({ vanilla: 1, loyalty: 1 }, [
                "Вектор характера: Ваниль",
                "Доверие Маши выросло"
              ]);
            },
            goto: "Ch2_1_vanilla"
          }
        ]
      }
    ],


    Ch2_1_alpha: [
      {
        sprite: "./assets/sprites/lenka/smirk.webp",
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        text: "Опа, зубастый! Слышишь, Маш? А голос-то какой спокойный, даже ухом не повёл. Определённо не похож на твоих скучных пиджаков из Сити."
      },
      { goto: "Ch2_1_call" }
    ],


    Ch2_1_vanilla: [
      {
        sprite: "./assets/sprites/lenka/smirk.webp",
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        text: "Какой воспитанный мальчик, прямо красная книга Москвы! Смотри не испорть парня нашим воздухом, Марусь."
      },
      { goto: "Ch2_1_call" }
    ],


    Ch2_1_call: [
      {
        fx: "phone_buzz",
        sprite: "./assets/sprites/masha/cafe_nervous.webp",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "На мраморной стойке резко вибрирует второй телефон Маши. Улыбка слетает с её лица за долю секунды."
      },
      {
        bg: "./assets/story/ch2/03_masha_urgent_departure.webp",
        sprite: null,
        cam: "zoom-slow",
        role: "masha",
        speaker: "Маша",
        text: "Вот же проклятье… Артур перенёс подписание бумаг на восемь тридцать в соседней башне. Если не спущусь к водителю прямо сейчас, мне оторвут голову."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Опять тот самый «клиент»? Маш, ты же толком не спала после ночи."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Там буквально на сорок минут, поставлю две подписи и пулей назад! {mc_dim}, позавтракай нормально и никуда не уходи. А ты, Ленка…"
      },
      {
        bg: "./assets/locations/penthouse/kitchen/morning_sun.webp",
        sprite: "./assets/sprites/lenka/smirk.webp",
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        text: "Да сижу я тише травы, допиваю свой раф! Беги давай, деловая колбаса, присмотрю за твоим сокровищем в лучшем виде."
      },
      {
        sprite: "./assets/sprites/masha/cafe_nervous.webp",
        role: "masha",
        speaker: "Маша",
        text: "Я серьёзно, Лена! Без твоих фирменных шуточек. Через сорок минут буду дома!"
      },
      {
        fx: "door",
        sprite: null,
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Замок входной двери защёлкивается, и мы с Ленкой остаёмся в залитом утренним солнцем пентхаусе совершенно одни."
      },
      { goto: "Ch2_2" }
    ]
};
