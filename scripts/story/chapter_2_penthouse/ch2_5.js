// Глава 2 • Сцена 5: Щелчок замка — возвращение Маши и обвинение Ленки
// Каждая сцена — отдельный независимый скрипт (по архитектуре Amnesia).

export const scene_ch2_5 = {

    // =========================================================================
    // CH2_5: ЩЕЛЧОК ЗАМКА — МАША ЗАСТАЁТ СЦЕНУ И ОБВИНЕНИЕ ЛЕНКИ
    // =========================================================================
    Ch2_5_caught: [
      {
        // Щелчок электронного замка — в распахнутых дверях стоит Маша!
        location: "ПРИХОЖАЯ → ГОСТИНАЯ • 09:02",
        bg: "./assets/story/ch2/11_masha_catches_them_wide.webp",
        cam: "zoom-slow",
        fx: "lock_beep",
        shake: true,
        role: "masha",
        speaker: "Маша",
        text: "{mc_dim}, у них принтер завис, я забрала копию и вернулась раньше… ЧТО ЗДЕСЬ ПРОИСХОДИТ?!"
      },
      {
        // Крупный план шока в глазах Маши
        bg: "./assets/story/ch2/12_masha_shock_closeup.webp",
        cam: "zoom-slow",
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "tense",
        text: "Время словно замерзает. Папка с бумагами выскальзывает из пальцев Маши на паркет. Картина со стороны убийственная: я без футболки полулежу на её диване, сверху на мне сидит раскрасневшаяся Ленка, а мои ладони всё ещё на её талии."
      },
      {
        // Мгновенный фальшивый спектакль Ленки с переводом стрелок на ГГ
        bg: "./assets/story/ch2/13_lenka_fake_accusation.webp",
        cam: "zoom-slow",
        fx: "cloth",
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        text: "Маша!! Слава богу, ты вошла! Приструни своего дикого братца — кого ты вообще с улицы в дом притащила?! Я потянулась через диван за стаканом, а он меня за руки на себя дёрнул!"
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "tense",
        text: "У меня перехватывает дыхание от такой запредельной наглости. Секунду назад она сама шептала мне в губы, а сейчас с дрожащим голосом одёргивает топ за спиной побелевшей Маши!"
      },
      {
        choices: [
          {
            text: "Жёстко оборвать спектакль: «Маш, посмотри ей в глаза — она врёт каждое слово!»",
            onPick: (s, api) => {
              api.changeStats({ alpha: 1 }, ["Вектор характера: Альфа"]);
            },
            goto: "Ch2_5_defend_alpha"
          },
          {
            text: "Посмотреть прямо на Машу: «Маш, клянусь тебе — я её пальцем первым не трогал»",
            onPick: (s, api) => {
              api.changeStats({ vanilla: 1 }, ["Вектор характера: Ваниль"]);
            },
            goto: "Ch2_5_defend_vanilla"
          }
        ]
      }
    ],


    Ch2_5_defend_alpha: [
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "tense",
        text: "Хватит ломать комедию, Лена! Маш, она с порога начала поливать твою жизнь грязью, а потом сама залезла сверху проверять меня на вшивость ровно перед твоим приходом!"
      },
      {
        bg: "./assets/locations/penthouse/livingroom/morning_sun.webp",
        sprite: "./assets/sprites/lenka/accusatory.webp",
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        text: "Ты слышишь, как он выкручивается?! Я к ней со всей душой с утра приехала, а твой интернатский волчонок ещё и стрелки переводит!"
      },
      {
        branchByState: (s) => (s.masha.loyalty >= 3 ? "Ch2_6_high_trust" : "Ch2_6_low_trust")
      }
    ],


    Ch2_5_defend_vanilla: [
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "tense",
        text: "Маш, ты знаешь меня с детства, я бы никогда так с тобой не поступил в твоём доме! Она сама подошла после разминки и повалила меня на подушки за секунду до замка!"
      },
      {
        bg: "./assets/locations/penthouse/livingroom/morning_sun.webp",
        sprite: "./assets/sprites/lenka/accusatory.webp",
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        text: "Ну конечно, бедный невинный мальчик случайно разделся до пояса посреди гостиной! Маш, открой глаза, кого ты пригрела!"
      },
      {
        branchByState: (s) => (s.masha.loyalty >= 3 ? "Ch2_6_high_trust" : "Ch2_6_low_trust")
      }
    ]
};
