// Глава 1 • Сцена 2: Вечерний троллейбус, флешбэк и фантазии о сестре
// Каждая сцена — отдельный независимый скрипт (по архитектуре Amnesia).

export const scene_intro_2 = {

    // =========================================================================
    // INTRO_2: ВЕЧЕРНИЙ ТРОЛЛЕЙБУС, МАКРО КАПЕЛЬ, ФЛЕШБЭК И РАЗВИЛКА ФАНТАЗИИ
    // =========================================================================
    Intro_2: [
      {
        // *#Раскадровка: салон троллейбуса, ГГ сидит ровно, прислонившись виском к холодному стеклу*
        location: "ТРОЛЛЕЙБУС • СУМЕРКИ",
        bg: "./assets/story/intro_2/trolleybus_mc_temple.webp",
        video: "./assets/videos/loops/trolleybus_temple_10s.mp4",
        videoMode: "loop",
        cam: "zoom-slow",
        fxShader: "trolleybus_glass",
        ambience: "trolleybus",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Мокрая Москва за стеклом постепенно меняет декорации. Серые панельные окраины и развязки уступают место сталинским фасадам, тёплым витринам и отражениям неона в чёрном асфальте."
      },
      {
        // *#Макрошот капель на окне троллейбуса*
        bg: "./assets/locations/trolleybus/macro_raindrops.webp",
        video: "./assets/videos/loops/macro_raindrops_10s.mp4",
        videoMode: "loop",
        cam: "zoom-slow",
        fxShader: "trolleybus_glass",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Двенадцать лет… Странная штука память: лица взрослых почти стёрлись, а обрывки того последнего года всплывают так отчётливо, будто это было вчера."
      },
      {
        // *#Переход в сепию воспоминания: коридор старой квартиры, Вероника и плачущая Маша*
        location: "ВОСПОМИНАНИЕ • 12 ЛЕТ НАЗАД",
        bg: "./assets/story/intro_2/flashback_sepia.webp",
        video: null,
        cam: "sepia",
        fxShader: "none",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Мы с Машей никогда не были родными по крови. Моя мама умерла, когда я едва научился ходить, и через пару лет отец сошёлся с Вероникой, гордой ухоженной женщиной, у которой от первого брака уже росла десятилетняя дочка Машка."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "На бумаге мы значились чужими детьми под одной крышей. На деле Машка с первого дня взяла надо мной шефство: таскала за руку на горку, отбирала у дворовых хулиганов мою шапку и по вечерам шёпотом читала сказки со второго яруса кровати."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "А потом в один осенний вечер отец просто не вернулся домой. Вместе с ним из квартиры пропали все отложенные деньги Вероники. Соседи шептались, что батя пустился в бега с чужой кассой, другие решили, что просто бросил нас обоих."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Вероника не стала тянуть на себе чужого ребёнка без копейки за душой и смотреть каждый день в глаза маленькой копии человека, который разрушил её жизнь. Я до сих пор помню, как Машка кричала с лестничной клетки: «Мама, не отдавай {mc_acc_short}!», пока за мной захлопывалась дверь интерната."
      },
      {
        // *#Возврат в реальность салона троллейбуса на стыке асфальта*
        location: "ТРОЛЛЕЙБУС • ЦЕНТР",
        bg: "./assets/story/intro_2/trolleybus_mc_temple.webp",
        video: "./assets/videos/loops/trolleybus_temple_10s.mp4",
        videoMode: "loop",
        cam: "zoom-slow",
        fxShader: "trolleybus_glass",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Ладно, хватит бередить старые раны. Лучше подумать о насущном: я еду в самый центр Москвы на встречу с двадцатидвухлетней девушкой, а весь мой опыт с женским полом сводится к перепалкам с Катькой да красным ушам от любого случайного прикосновения."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Интересно, какой вообще выросла Машка после того, как жизнь так прошлась по нашей семье?"
      },
      {
        choices: [
          {
            text: "Представить скромную библиотекаршу в кардигане",
            onPick: (s) => {
              s.flags.intro2_fantasy = "librarian";
            },
            goto: "Intro_2_fantasy_a"
          },
          {
            text: "Представить замученную офисную труженицу",
            onPick: (s) => {
              s.flags.intro2_fantasy = "office";
            },
            goto: "Intro_2_fantasy_b"
          }
        ]
      }
    ],


    Intro_2_fantasy_a: [
      {
        bg: "./assets/story/intro_2/fantasy_librarian.webp",
        video: null,
        cam: "zoom-slow",
        fxShader: "none",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Ну да, сто процентов так и есть: глухая водолазка под горло, бабушкин кардиган до колен, ромашковый чай и отбой ровно в десять вечера. Зато с такой точно не придётся сгорать со стыда за свои дешёвые кроссовки!"
      },
      { goto: "Intro_2_arrive" }
    ],


    Intro_2_fantasy_b: [
      {
        bg: "./assets/story/intro_2/fantasy_office.webp",
        video: null,
        cam: "zoom-slow",
        fxShader: "none",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "После того как отец оставил их с матерью без гроша, сладкой жизни ей ждать было неоткуда. Наверняка крутится на двух обычных работах с термокружкой и пачкой квартальных отчётов. Своя, простая, поймёт с полуслова."
      },
      { goto: "Intro_2_arrive" }
    ],


    Intro_2_arrive: [
      {
        // *#Визг тормозов, троллейбус причаливает к вечернему бульвару*
        location: "БУЛЬВАРНОЕ КОЛЬЦО • 20:20",
        bg: "./assets/story/intro_2/trolleybus_mc_temple.webp",
        video: "./assets/videos/loops/trolleybus_temple_10s.mp4",
        videoMode: "loop",
        fxShader: "trolleybus_glass",
        fx: "brakes",
        shake: true,
        joltGlass: true,
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Тормоза визжат на весь квартал, приехали. До кофейни на Малой Бронной двести метров пешком. Руки предательски холодеют. Ну же, Соколов, соберись, это ведь просто твоя старшая сестрёнка из детства."
      },
      { goto: "Intro_3" }
    ]
};
