// Глава 1 • Сцена 5: 01:42 ночи — возвращение Маши, окно и 4 Королевы
// Каждая сцена — отдельный независимый скрипт (по архитектуре Amnesia).

export const scene_intro_5 = {

    // =========================================================================
    // INTRO_5: 01:42 НОЧИ — МНОГОРАКУРСНЫЙ ПРИХОД, НОЧНАЯ СЦЕНА У ОКНА ИЛИ 4 КОРОЛЕВЫ
    // =========================================================================
    Intro_5: [
      {
        location: "ПРЕСНЯ • 23:15",
        bg: "./assets/locations/penthouse/livingroom/rain_evening.webp",
        video: null,
        sprite: null,
        cam: "dim",
        fxShader: "moscow_city_night",
        ambience: "penthouse",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Выключаю настенные бра, кладу отцовские часы на край столика и забираюсь под плед. За мокрым стеклом плывут огни ночной Москвы, глаза слипаются, но слух всё равно ждёт щелчка входной двери…"
      },
      {
        // *#01:42 ночи: замок тихо пищит, в проёме прихожей появляется Маша в сапфировом платье*
        location: "МОСКВА • 01:42",
        bg: "./assets/story/intro_5/01_doorway_wide.webp",
        video: "./assets/videos/oneshots/doorway_arrival_5s.mp4",
        videoMode: "once",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        fx: "lock_beep",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "На часах духовки 01:42. Дождь за окном стих, и огни Москва-Сити режут паркет длинными сине-золотыми полосами. Входной замок тихо пискнул: вернулась."
      },
      {
        // *#Нижний ракурс: туфли на шпильке в опущенной руке, босые шаги по паркету*
        bg: "./assets/story/intro_5/02_low_heels_hem.webp",
        video: null,
        cam: "pan-up-reveal",
        fxShader: "moscow_city_calm",
        fx: "cloth",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Идёт босиком, держа лаковые лодочки за ремешки в пальцах, чтобы не разбудить меня каблуками. На ней вместо дневного трикотажа вечернее платье цвета тёмного сапфира с открытой спиной."
      },
      {
        // *#POV сквозь полуопущенные ресницы с дивана*
        bg: "./assets/story/intro_5/03_sofa_lashes_pov.webp",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "От неё веет ночной прохладой, миндальными духами и сухим шампанским. Остановилась в полушаге от дивана, всматривается в полумраке в моё лицо. У меня секунда решить: притвориться спящим или подать голос."
      },
      {
        choices: [
          {
            text: "Притвориться спящим и смотреть сквозь ресницы",
            onPick: (s, api) => {
              s.flags.intro5_branch = "sleep";
              api.changeStats({ risk: 1 }, ["Риск +1"]);
            },
            goto: "Intro_5_sleep"
          },
          {
            text: "Окликнуть в полутьме: «Тяжёлый вечер, Маш?..»",
            onPick: (s, api) => {
              s.flags.intro5_branch = "awake";
              api.changeStats({ loyalty: 1 }, ["Доверие Маши выросло"]);
            },
            goto: "Intro_5_awake"
          }
        ]
      }
    ],


    Intro_5_sleep: [
      {
        bg: "./assets/story/intro_5/03_sofa_lashes_pov.webp",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        role: "masha",
        speaker: "Маша (шёпотом)",
        text: "Уснул всё-таки, чудо упрямое… Спи, братец. Хоть один нормальный мужчина в этом доме, которому от меня ничего не нужно."
      },
      {
        // *#Общий план от дивана: Маша подходит к панорамному окну Москва-Сити*
        bg: "./assets/story/intro_5/04_window_silhouette.webp",
        video: "./assets/videos/oneshots/window_silhouette_5s.mp4",
        videoMode: "once",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        fx: "cloth",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Думая, что я крепко сплю, она оставляет туфли у кресла, отходит к самому стеклу напротив башен Сити и перекидывает волну волос на одно плечо, заводя пальцы за спину."
      },
      {
        // *#Макро-ракурс: бегунок потайной молнии скользит вниз вдоль спины*
        bg: "./assets/story/intro_5/05_macro_spine_zipper.webp",
        video: "./assets/videos/oneshots/spine_zipper_5s.mp4",
        videoMode: "once",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        fx: "cloth",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "В тишине комнаты слышно, как расходится потайная молния. Боюсь даже сглотнуть, чтобы не выдать себя дыханием."
      },
      {
        // *#Нижний ракурс: сапфировый шёлк опадает к босым ступням*
        bg: "./assets/story/intro_5/06_low_silk_stockings.webp",
        video: "./assets/videos/oneshots/silk_stockings_5s.mp4",
        videoMode: "once",
        cam: "pan-up-reveal",
        fxShader: "moscow_city_calm",
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Бретели соскальзывают с плеч, и тёмный шёлк мягко ложится у её босых ступней на ковёр. В контровом свете высоток она остаётся в тонком светлом кружеве и чулках."
      },
      {
        // *#Ракурс через отражение в тёмном панорамном стекле*
        bg: "./assets/story/intro_5/07_glass_reflection.webp",
        video: null,
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "В тёмном окне поверх огней города отражается её силуэт. Она устало разминает шею, прислоняется ладонью к холодному стеклу и прикрывает глаза. Смотреть на неё так тайком стыдно до горячих ушей, но отвернуться просто нет сил."
      },
      {
        // *#Маша наклоняется над диваном и поправляет плед на плече Артёма*
        bg: "./assets/story/intro_5/03_sofa_lashes_pov.webp",
        fx: "cloth",
        role: "masha",
        speaker: "Маша (шёпотом)",
        text: "Спокойной ночи, {mc_dim_k}… Завтра с утра что-нибудь придумаем."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Прядь её волос щекочет мне висок, когда она поправляет сползший плед на плече и бесшумно уходит к себе. А я ещё полчаса лежу глядя в потолок и слушаю, как колотится сердце."
      },
      { goto: "Intro_5_end" }
    ],


    Intro_5_awake: [
      {
        bg: "./assets/story/intro_5/awake_sofa.webp",
        video: null,
        sprite: null,
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        role: "masha",
        speaker: "Маша",
        text: "Господи, {mc}! Чуть туфли из рук не выронила… Ты чего не спишь во втором часу ночи?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "На новом месте всегда сплю вполглаза, старая привычка. Да и неспокойно было, пока ты ездила одна в такую темень."
      },
      {
        bg: "./assets/locations/penthouse/livingroom/night_clear.webp",
        video: null,
        sprite: "./assets/sprites/masha/night_sapphire.webp",
        fx: "cloth",
        role: "masha",
        speaker: "Маша",
        text: "Отвыкла я, чтобы дома кто-то ждал и спрашивал, как доехала… Извини, если пахнет шампанским. Пришлось весь вечер держать улыбку перед тяжёлыми людьми, голова гудит, и сна ни в одном глазу."
      },
      {
        sprite: "./assets/sprites/masha/cafe_tease.webp",
        role: "masha",
        speaker: "Маша",
        text: "Слушай, Соколов, раз уж нам обоим не спится… Помнишь, как я в десять лет гадала тебе под одеялом с фонариком на «будущую невесту»? Двигай ноги, у меня в ящике подарочная колода лежит. Раскину тебе взрослый расклад на Четырёх Королев!"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Какие ещё королевы, Маш? Я полдня как за ворота интерната вышел."
      },
      {
        bg: "./assets/story/intro_5/08_cards_table_pov.webp",
        video: "./assets/videos/oneshots/cards_table_pov_5s.mp4",
        videoMode: "once",
        sprite: null,
        cam: "zoom-slow",
        fx: "cloth",
        role: "masha",
        speaker: "Маша",
        text: "В Москве дамы появляются быстрее, чем успеешь моргнуть, братец! Садись ближе: сними колоду левой рукой к себе, открой всех четырёх Королев, а в финале сыграем с тобой на один честный ответ."
      },
      {
        startQueensCardGame: true
      }
    ],


    Intro_5_cards_win: [
      {
        bg: "./assets/story/intro_5/awake_sofa.webp",
        video: null,
        sprite: null,
        fx: "heartbeat",
        effect: (s, api) => {
          s.flags.won_queens_wager = true;
          api.addClue("clue_midnight_card_confession");
          api.changeStats({ loyalty: 1 }, ["Доверие Маши +1 (выигран карточный спор)"]);
        },
        role: "masha",
        speaker: "Маша",
        text: "Да ну тебя?! С первой попытки вытянул! Ты что, по глазам подсмотрел, куда я Бубновую Даму убрала? Ладно, карточный долг святое, спрашивай."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Тогда один вопрос без сказок про ипотеку, Маш. Кто такой Артур и зачем ты ездишь к ним по ночам?"
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Глазастый вырос, {mc_dim}… Никакой я не риэлтор. Три года назад я пыталась через частных безопасников поднять закрытые справки об исчезновении твоего отца и влезла в огромный долг перед агентством Артура. Отрабатываю сопровождением на деловых ужинах: без грязи, но на жёстком контракте. Осталось закрыть два выезда."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Внутри всё сжимается. Она три года тянула эту лямку из-за попытки разыскать моего отца и ни словом не упрекнула меня за ужином."
      },
      { goto: "Intro_5_sofa_choice" }
    ],


    Intro_5_cards_miss: [
      {
        bg: "./assets/story/intro_5/awake_sofa.webp",
        video: null,
        sprite: null,
        fx: "tap",
        effect: (s, api) => {
          s.flags.won_queens_wager = false;
          api.changeStats({ risk: 1 }, ["Азарт ночи: Риск +1"]);
        },
        role: "masha",
        speaker: "Маша",
        text: "Мимо, картежник! Вот она где лежала, моя Бубновая Королева, у самого края пледа!"
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Так что мои скучные взрослые секреты пока остаются при мне… Знаешь, утром я проснулась совсем одна в пустой квартире, а ночью сижу рядом с тобой за картами, и впервые за три года не хочется включать телевизор для фона от тишины."
      },
      { goto: "Intro_5_sofa_choice" }
    ],


    Intro_5_sofa_choice: [
      {
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Она сидит на краю дивана в ладони от меня: плечи открыты, по пледу веером лежат карты, а в глазах дрожат огни ночного города. Вся её столичная броня сейчас снята."
      },
      {
        choices: [
          {
            text: "Накрыть её ладонь рукой и посмотреть в глаза",
            onPick: (s, api) => {
              api.changeStats({ alpha: 1 }, ["Вектор характера: Альфа"]);
            },
            goto: "Intro_5_alpha"
          },
          {
            text: "Укрыть её плечи своим тёплым пледом",
            onPick: (s, api) => {
              api.changeStats({ vanilla: 1 }, ["Вектор характера: Ваниль"]);
              api.fx("cloth");
            },
            goto: "Intro_5_vanilla"
          }
        ]
      }
    ],


    Intro_5_alpha: [
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Послушай меня, Маш. Я не знаю всех твоих дел и читать морали не собираюсь. Но запомни твёрдо: ты в этом городе больше не одна. И если хоть один из этих ночных «клиентов» позволит себе лишнее, ты скажешь мне."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "{mc_dim}… Ничего себе у тебя взгляд стал. И голос такой низкий… Ты когда успел из моего тихого мальчика превратиться во взрослого мужчину?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "За двенадцать лет многому успеваешь научиться. Иди отдыхай, я рядом."
      },
      {
        bg: "./assets/locations/penthouse/livingroom/night_clear.webp",
        video: null,
        sprite: "./assets/sprites/masha/night_sapphire.webp",
        role: "masha",
        speaker: "Маша",
        text: "Да уж… Пожалуй, мне правда пора в спальню, пока шампанское окончательно не ударило в голову. Спокойной ночи, защитник."
      },
      { goto: "Intro_5_end" }
    ],


    Intro_5_vanilla: [
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Тебе не нужно всё время казаться железной передо мной, слышишь? В детстве ты меня от всего двора закрывала, теперь моя очередь просто побыть рядом, когда ты устала. Хочешь, согрею чаю с мятой?"
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Не уходи никуда… Посиди так минутку, ладно? Господи, как же с тобой спокойно и тепло, {mc_dim_k}… Я уже и забыла, каково это, когда рядом сидят просто так, ничего не требуя взамен."
      },
      {
        bg: "./assets/locations/penthouse/livingroom/night_clear.webp",
        video: null,
        sprite: "./assets/sprites/masha/night_sapphire.webp",
        role: "masha",
        speaker: "Маша",
        text: "Спасибо тебе за этот вечер, родной. Спи крепко, завтра начнём твою новую московскую жизнь."
      },
      { goto: "Intro_5_end" }
    ],


    Intro_5_end: [
      {
        location: "РАССВЕТ НАД ПРЕСНЕЙ • 05:20",
        bg: "./assets/locations/penthouse/livingroom/dawn_mist.webp",
        video: null,
        sprite: null,
        fx: "door",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Дверь её спальни тихо закрывается, а за панорамным стеклом ночная темнота постепенно сереет предрассветной дымкой над Москвой-рекой."
      },
      { goto: "Intro_6" }
    ]
};
