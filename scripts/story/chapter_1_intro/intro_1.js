// Глава 1 • Сцена 1: Проходная интерната, крестик Кати и звонок Маше
// Каждая сцена — отдельный независимый скрипт (по архитектуре Amnesia).

export const scene_intro_1 = {

    // =========================================================================
    // INTRO_1: ПРОХОДНАЯ ИНТЕРНАТА, СТАРЫЙ КРЕСТИК КАТИ И ЗВОНОК МАШЕ
    // =========================================================================
    Intro_1: [
      {
        // *#Раскадровка: окошко на проходной, фиолетовая печать на справке, табличка и входная группа*
        location: "ПРОХОДНАЯ ИНТЕРНАТА • 08:45",
        bg: "./assets/locations/orphanage/signboard_gates.webp",
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        ambience: "rain",
        fx: "tap",
        role: "komendant",
        speaker: "Комендант",
        text: "Расписывайся в ведомости, Соколов. Направление во временное общежитие в Текстильщиках действительно с понедельника, раньше коек нет. Документы не посей, восстанавливать никто не побежит."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Спасибо, Тамара Ильинична. Не посею."
      },
      {
        role: "komendant",
        speaker: "Комендант",
        text: "Ну, с богом, {mc}. Парень ты с головой, руки на месте… Не пропади там, в большой Москве."
      },
      {
        // *#Тяжёлая металлическая дверь проходной закрывается с лязгом магнитного замка*
        bg: "./assets/locations/orphanage/gates_rain.webp",
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        fx: "door",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Вот так буднично и заканчиваются двенадцать лет казённой жизни. Ни фанфар, ни красной дорожки тебе, только серая московская морось и пачка справок."
      },
      {
        // *#Крупный план запястья ГГ: старые механические часы отца с трещиной на стекле*
        bg: "./assets/story/intro_1/doc_watch.webp",
        video: null,
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "И старые отцовские часы. Единственная вещь, которую у меня не отняли, когда я попал сюда. Стекло треснуло, пружина давно лопнула, но снимать их с руки почему-то всё равно не хочется."
      },
      {
        // *#ГГ выходит к остановке; под козырёк влетает запыхавшаяся Катя*
        location: "ОСТАНОВКА У ИНТЕРНАТА • 08:52",
        bg: "./assets/story/intro_1/katya_farewell.webp",
        video: null,
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Соколов! Тормози, бессовестный!"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Катька? Ты чего тут делаешь? У вас же сейчас первый час информатики?"
      },
      {
        bg: "./assets/locations/orphanage/gates_rain.webp",
        video: null,
        sprite: "./assets/sprites/katya/crossed_arms.webp",
        fxShader: "rain_exterior",
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Да ну её к лешему, эту информатику! Я там системники ещё на прошлой неделе сама перебрала. А ты реально собирался тихо улизнуть и даже не попрощаться?!"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Я подходил к женскому корпусу, дежурная буркнула, что не пустит. Не орать же мне под окнами директрисы."
      },
      {
        // *#Катя скрещивает руки, будто обиделась*
        sprite: "./assets/sprites/katya/crossed_arms.webp",
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Не больно ты и старался! На вот, руку давай. Быстро, пока я не передумала!"
      },
      {
        // *#Крупный план ладоней: Катя вкладывает в ладонь старый крестик*
        bg: "./assets/story/intro_1/katya_cross_hands.webp",
        sprite: null,
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        fx: "cloth",
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Это что?"
      },
      {
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Мой старый крестик. Единственное, что осталось от моей семьи."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Но… зачем?"
      },
      {
        // *#Катя вытирает слезу*
        bg: "./assets/locations/orphanage/gates_rain.webp",
        sprite: "./assets/sprites/katya/tear.webp",
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Чтобы ты меня не забывал, дурень! А мне тут ещё до апреля куковать, следить за тобой некому."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Я и не думал…"
      },
      {
        // *#Катя бьёт его по плечу*
        fx: "tap",
        shake: true,
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Ауч! За что?"
      },
      {
        sprite: "./assets/sprites/katya/crossed_arms.webp",
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Всё, хватит долгих прощаний! Разнылся мне тут."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Вот же чудо в перьях…"
      },
      {
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Чего молчишь и смотришь так странно? Если стрёмный, выбрось или отдай обратно."
      },
      {
        choices: [
          {
            text: "Обнять Катю",
            onPick: (s, api) => {
              s.flags.katya_warm_start = true;
              api.addItem("katya_cross");
              api.changeStats(
                { alpha: 1, katya: 1 },
                ["Вектор характера: Альфа", "Связь с Катей укреплена"],
                { triggerOnboarding: true }
              );
              api.fx("cloth");
            },
            goto: "Intro_1_katya_alpha"
          },
          {
            text: "Надеть крестик",
            onPick: (s, api) => {
              s.flags.katya_warm_start = true;
              api.addItem("katya_cross");
              api.changeStats(
                { vanilla: 1, katya: 1 },
                ["Вектор характера: Ваниль", "Связь с Катей укреплена"],
                { triggerOnboarding: true }
              );
              api.fx("cloth");
            },
            goto: "Intro_1_katya_vanilla"
          }
        ]
      }
    ],


    Intro_1_katya_alpha: [
      {
        // *#ГГ резко прижимает Катю к себе*
        bg: "./assets/story/intro_1/katya_farewell.webp",
        sprite: null,
        cam: "zoom-slow",
        fx: "cloth",
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Ничего не стрёмный. Как только закреплюсь в Москве, первым делом вытащу тебя в выходной есть нормальное мороженое на набережной. Замётано?"
      },
      {
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Угу… Ты только пиши иногда, ладно? А то найдёшь там свою городскую сестру и забудешь, как мы в подсобке чай кипятильником грели."
      },
      { goto: "Intro_1_after_katya" }
    ],


    Intro_1_katya_vanilla: [
      {
        // *#ГГ надевает крестик*
        bg: "./assets/story/intro_1/katya_cross_hands.webp",
        sprite: null,
        cam: "zoom-slow",
        fx: "cloth",
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Спасибо, Кать. Честно, это лучший подарок за все годы в этих стенах. Я без тебя тут вообще бы одичал."
      },
      {
        bg: "./assets/locations/orphanage/gates_rain.webp",
        sprite: "./assets/sprites/katya/crossed_arms.webp",
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Ой, не начинай там! Главное устройся по-человечески и напиши мне вечером, как добрался. Я же волноваться буду."
      },
      { goto: "Intro_1_after_katya" }
    ],


    Intro_1_after_katya: [
      {
        // *#Из пелены дождя выплывают фары подходящего троллейбуса, Катя пятится к калитке*
        bg: "./assets/locations/orphanage/bus_stop_arrival.webp",
        video: "./assets/videos/oneshots/trolley_pull_in_5s.mp4",
        videoMode: "once",
        sprite: null,
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Всё, бегу, а то вахтёрша сейчас тревогу поднимет! Кстати… Меня попросили переустановить винду в канцелярии. Я вот что попробую… Загляну в архив поступлений. Вдруг там осталась хоть какая-то зацепка про твоего отца?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Будь осторожна, не подставляйся лишний раз. До связи, Кать!"
      },
      {
        // *#Локация остановки: ГГ остаётся один с треснувшим телефоном и смятым листком*
        bg: "./assets/story/intro_1/bus_stop_alone.webp",
        sprite: null,
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Ладно… До понедельника ночевать мне всё равно негде, а в этом огромном городе есть только один человек из старой жизни. Моя сестра Маша. Точнее, номер её телефона…"
      },
      {
        // *#Крупный план экрана: длинные гудки, на четвёртом трубку берут*
        fx: "phone_ring",
        role: "masha",
        speaker: "Маша (по телефону)",
        text: "Алло. Слушаю вас."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Эм… Алло, здравствуйте… Это Маша?"
      },
      {
        role: "masha",
        speaker: "Маша (по телефону)",
        text: "Допустим, Мария Боратовна. А с кем я говорю и откуда у вас мой личный номер?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Маш, не клади трубку, пожалуйста… Это я. {mc_intro_self}…"
      },
      {
        // *#Звенящая пауза, клоуз-ап ГГ на эмоциях, ледяной голос Маши*
        bg: "./assets/story/intro_1/mc_emotional_closeup.webp",
        cam: "zoom-slow",
        fx: "heartbeat",
        role: "masha",
        speaker: "Маша (по телефону)",
        text: "Так. Очень остроумно. Кто тебя надоумил так шутить? Если ты от Вадима, то пошёл к чёрту. И боссу своему передай идти туда же."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Какой ещё Вадим?! Маша, постой, никто меня не подсылал! Мне сегодня восемнадцать исполнилось, меня час назад из интерната выпустили!"
      },
      {
        role: "masha",
        speaker: "Маша (по телефону)",
        text: "У меня нет никаких доказательств, что ты не аферист. Назови за пять секунд одну вещь из нашей детской на втором этаже, о которой не знала даже моя мать. Время пошло."
      },
      {
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Сердце ухает куда-то под рёбра. Детская на втором этаже… Двухъярусная кровать у окна, скрипящая половица и наш общий секрет!"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Жёлтая жестяная банка из-под монпансье за батареей! Мы прятали туда фантики и твой молочный зуб, чтобы мышка принесла нам денег на собаку!"
      },
      {
        role: "masha",
        speaker: "Маша (по телефону)",
        text: "Банка из-под монпансье… Господи, этого правда никто не мог знать. Ты сейчас где находишься?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "На конечной за кольцевой, тут как раз троллейбус до метро подошёл."
      },
      {
        role: "masha",
        speaker: "Маша (по телефону)",
        effect: (s, api) => {
          api.addClue("clue_monpansier", { silent: true });
          api.pushMcMessage("masha", {
            dir: "in",
            time: "09:04",
            text: "Малая Бронная, кофейня на углу у сквера. Жду ровно через полтора часа."
          });
        },
        text: "Записывай адрес: Малая Бронная, кофейня на углу у сквера. Буду ждать тебя ровно через полтора часа у входа. Приедешь, посмотрю тебе в глаза и решу, верить или нет. Не промокни."
      },
      {
        // *#Двери подъехавшего троллейбуса с шипением распахиваются*
        bg: "./assets/locations/orphanage/trolley_doors_open.webp",
        cam: "zoom-slow",
        fx: "door",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Короткие гудки, и прямо передо мной с шипением расходятся двери тёплого салона. Ну что ж, Москва, встречай."
      },
      { goto: "Intro_2" }
    ]
};
