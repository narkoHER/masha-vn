// Интерактивная детективная песочница Intro_4 (4 комнаты апартаментов Маши на Пресне),
// каталог предметов, зацепок, карточный расклад «4 Королевы» и второй iPhone Маши (PIN: 1408).
// Строго без голоса рассказчика (только мысли ГГ `mct` и прямая речь персонажей).

const KATYA_CROSS_ITEM = {
  id: "katya_cross",
  title: "Старый крестик Кати",
  subtitle: "Память на прощание у ворот",
  desc: "Потёртый серебряный крестик на тонком шнурке. Единственная вещь, которая осталась у Кати от её семьи."
};

export const ITEMS_CATALOG = {
  orphanage_referral: {
    id: "orphanage_referral",
    title: "Справка о выпуске и направление",
    subtitle: "Интернат • Общежитие в Текстильщиках",
    desc: "Выдана на проходной вместе с тощим конвертом подъёмных. Заселиться в общежитие можно только с понедельника."
  },
  father_watch: {
    id: "father_watch",
    title: "Механические часы отца",
    subtitle: "Стальной корпус • Треснувшее стекло",
    desc: "Стрелки замерли на без четверти девять. Единственная вещь, которую у шестилетнего Артёма не отняли при приёме в интернат."
  },
  katya_cross: KATYA_CROSS_ITEM,
  // Обратная совместимость со старыми сохранениями
  katya_strap: KATYA_CROSS_ITEM,
  sky_lounge_card: {
    id: "sky_lounge_card",
    title: "Карта «SKY LOUNGE • 54 ЭТАЖ»",
    subtitle: "Башня Империя • Металлический пропуск",
    desc: "Тяжёлая матовая клубная карта без имени. Лежала под салфеткой рядом с бокалами и конвертом пятитысячных купюр."
  }
};

export const CLUES_CATALOG = {
  clue_monpansier: {
    id: "clue_monpansier",
    title: "Двойная проверка Маши",
    tag: "Детство • Доверие",
    summary: "При первом звонке Маша упомянула какого-то Вадима и его босса, а потом проверила Артёма тайником за батареей и ловушкой про Сочи.",
    detail: "Маша явно ждёт удара со стороны некоего Вадима. Только точные детали из их общей детской на втором этаже заставили её поверить."
  },
  clue_father_week: {
    id: "clue_father_week",
    title: "Последняя неделя отца",
    tag: "Дело отца",
    summary: "Перед исчезновением отец почти не спал, звонил кому-то с лестничной площадки и по три раза за ночь проверял замки.",
    detail: "В тот вечер пропали отложенные деньги Вероники и документы Виктора, но вёл он себя как человек, за которым гонятся."
  },
  clue_realtor_cover: {
    id: "clue_realtor_cover",
    title: "Легенда про «риэлтора» и Porsche",
    tag: "Двойная жизнь",
    summary: "Маша прячет экран второго iPhone, ездит на ночном Porsche якобы от агентства и срывается к некому Артуру в «ложу к 11:00».",
    detail: "Она уверяет, что продаёт элитные пентхаусы в Москва-Сити занятым клиентам по вечерам, но путается в деталях и нервничает при звонках."
  },
  clue_sky_lounge: {
    id: "clue_sky_lounge",
    title: "Бокалы вина и пропуск «SKY LOUNGE»",
    tag: "Гостиная • Улика",
    image: "./assets/v2/prop_lounge_card_wine.webp",
    summary: "От второго бокала тянет мужским табачным парфюмом. Под салфеткой спрятаны пропуск на 54-й этаж башни Империя и пачка пятитысячных.",
    detail: "Вчера поздно вечером в гостиной Маши был состоятельный мужчина. Закрытый лаунж находится прямо в башне напротив её окон."
  },
  clue_calla_note: {
    id: "clue_calla_note",
    title: "Букет белых калл и открытка «К.»",
    tag: "Кухня-бар • Улика",
    image: "./assets/v2/prop_calla_bouquet.webp",
    summary: "На пустой кухне стоит букет белых калл с открыткой: «За безупречную выдержку в среду. В пятницу жду в том же составе, без опозданий. К.»",
    detail: "Дома Маша совсем не готовит: в холодильнике только сухое шампанское, ресторанные роллы и голубика. В пятницу её снова ждёт некто «К.»."
  },
  clue_swing_photo: {
    id: "clue_swing_photo",
    title: "Снимок на качелях: дата «14.08»",
    tag: "Спальня • Ключ к PIN",
    image: "./assets/v2/prop_swing_photo_1408.webp",
    summary: "У изголовья кровати Маша все двенадцать лет хранила детское фото с шестилетним Артёмом на дворовых качелях. В углу подписано «14.08».",
    detail: "Карточка снята за неделю до исчезновения отца. Цифры «1408» подходят к паролю на рабочем телефоне Маши."
  },
  clue_masha_phone: {
    id: "clue_masha_phone",
    title: "Переписки во втором iPhone Маши",
    tag: "Спальня • Главный инсайд",
    summary: "Куратор Артур вызвал Машу на ужин с Градовым ради подписи бумаг, Ленка едет в гости с утра, а Вероника ругает дочь за поиски Виктора.",
    detail: "Артур требует держать голову холодной, пока юристы везут папку на подпись. А из сообщения Вероники ясно, что Маша сама тайком искала отца Артёма."
  },
  clue_katya_archive: {
    id: "clue_katya_archive",
    title: "Архивный бланк Кати: ателье на Арбате",
    tag: "Катя • Зацепка Главы 1",
    image: "./assets/v2/cg_intro1_doc_watch.webp",
    summary: "За три дня до интерната часы чинили в ателье на Арбате, а этой весной неизвестный мужчина через курьера узнавал дату выпуска Артёма.",
    detail: "Катя нашла в сейфе канцелярии старую опись приёма. Мастерская на Старом Арбате совсем рядом с Пресней, и кто-то заранее ждал выхода Артёма."
  },
  clue_midnight_card_confession: {
    id: "clue_midnight_card_confession",
    title: "Ночной расклад: долг перед Артуром",
    tag: "01:48 • Откровение за картами",
    summary: "Проиграв спор на Бубновой Даме, Маша призналась, что она не риэлтор, а отрабатывает старый долг перед закрытым агентством Артура.",
    detail: "Три года назад Маша влезла в кабалу к людям Артура, пытаясь выкупить закрытые справки об исчезновении Виктора. Ей осталось отработать два выезда."
  }
};

export const QUEENS_SPREAD_CARDS = [
  {
    id: "queen_hearts",
    suit: "♥",
    suitColor: "red",
    rank: "Q",
    title: "Дама Червей",
    archetype: "Чистое сердце из прошлого",
    heroineHint: "Линия Кати",
    mashaMood: "spr_masha_warm_smile",
    mashaLine:
      "Ого, первой под твоей рукой легла Червовая Дама. Добрая, преданная душа, которая осталась ждать тебя за закрытыми воротами. Колись давай, Соколов: оставил в интернате девчонку, которая по тебе вздыхает?"
  },
  {
    id: "queen_diamonds",
    suit: "♦",
    suitColor: "red",
    rank: "Q",
    title: "Дама Бубен",
    archetype: "Золотая витрина и чужая тайна",
    heroineHint: "Линия Маши",
    mashaMood: "spr_masha_nervous_lie",
    mashaLine:
      "А вот и Бубновая Королева прямо в изголовье. Светская блондинка в шелках, у которой за красивым фасадом семь замков и вечный недосып. Интересно даже, на кого это колода так нагло намекает…"
  },
  {
    id: "queen_spades",
    suit: "♠",
    suitColor: "dark",
    rank: "Q",
    title: "Дама Пик",
    archetype: "Искушение без тормозов",
    heroineHint: "Линия Ленки",
    mashaMood: "spr_masha_playful_tease",
    mashaLine:
      "От Пиковой Дамы держись подальше, братец. Хищная кареглазая бестия без стыда и тормозов. Такая заявится с утра на каблуках и за пять минут проверит все твои слабые места."
  },
  {
    id: "queen_clubs",
    suit: "♣",
    suitColor: "dark",
    rank: "Q",
    title: "Дама Треф",
    archetype: "Холодный расчёт и старый счёт",
    heroineHint: "Тень Вероники",
    mashaMood: "spr_masha_warm_smile",
    mashaLine:
      "И Трефовая Дама отвернулась к прошлому. Холодная гордая женщина, старая обида и чужие деньги, из-за которых двенадцать лет назад всё пошло наперекосяк."
  }
];

export const MASHA_WORK_PHONE_CHATS = {
  lenka: {
    id: "lenka",
    title: "Ленка (Лучшая подруга)",
    subtitle: "Закреплённый диалог • в сети",
    avatarKey: "lenka",
    messages: [
      {
        dir: "out",
        sender: "Маша",
        time: "22:18",
        text: "Ленка, у меня караул!! Ко мне реально приехал мой мелкий брат Артём, сегодня выпустился из интерната! Высоченный вымахал, глаза отцовские, краснеет с полуслова, а у меня вино со вчерашнего не убрано. Я с перепугу ляпнула ему, что работаю риэлтором!"
      },
      {
        dir: "in",
        sender: "Ленка",
        time: "22:20",
        text: "Подожди, живой восемнадцатилетний скромник прямо у тебя на диване?! Машка, да ты сорвала джекпот! Смотри только не спались со своими ночными выездами к Артуру. Короче, завтра с утра жди меня с кофе, лично проверю твоего братика на прочность!"
      },
      {
        dir: "out",
        sender: "Маша",
        time: "22:21",
        text: "Даже думать не смей к нему клеиться, хищница! Парень совсем чистый, не ломай ему голову!"
      }
    ]
  },
  artur: {
    id: "artur",
    title: "Артур • Куратор (Сити)",
    subtitle: "Рабочий контакт • Башня Империя",
    avatarKey: "artur",
    messages: [
      {
        dir: "in",
        sender: "Артур",
        time: "22:05",
        text: "Мария, время. Сегодня в ложе на 54-м закрытый ужин с Градовым. Дресс-код вечерний. Улыбаешься, держишь паузу и не даёшь ему уехать до полуночи, пока юристы не привезут папку на подпись. Бокал только для вида, голова должна быть трезвой."
      }
    ]
  },
  veronika: {
    id: "veronika",
    title: "Мама (Вероника)",
    subtitle: "Личный контакт • вчера",
    avatarKey: "veronika",
    messages: [
      {
        dir: "in",
        sender: "Вероника",
        time: "вчера, 19:40",
        text: "Маша, прекрати присылать мне переводы, у нас с Игорем полный достаток. И мне вчера передали, что ты опять наводила справки через старых знакомых Виктора. Оставь эту историю в прошлом, он сломал нам жизнь и не стоит твоих нервов."
      }
    ]
  }
};

export const SANDBOX_ROOMS = {
  living: {
    id: "living",
    emoji: "🛋",
    shortLabel: "🛋 Гостиная",
    title: "Гостиная • панорама Москва-Сити",
    locationBadge: "ГОСТИНАЯ • 22:24",
    bg: "./assets/v3/sd_living_rain_evening.webp",
    bgByTime: {
      rain_evening: "./assets/v3/sd_living_rain_evening.webp",
      night_clear: "./assets/v3/sd_living_night_clear.webp",
      dawn_mist: "./assets/v3/sd_living_dawn_mist.webp",
      morning_sun: "./assets/v3/sd_living_morning_sun.webp"
    },
    fxShader: "moscow_city_night",
    fxByTime: {
      rain_evening: "moscow_city_night",
      night_clear: "moscow_city_calm",
      dawn_mist: "none",
      morning_sun: "morning_sun"
    },
    visualProps: [],
    hotspots: [
      {
        id: "living_wine_card",
        propKey: "living_table_clue",
        icon: "search",
        imgSrc: "./assets/v2/cutout_wine_card.webp",
        shortTag: "Бокалы и пропуск",
        label: "Осмотреть столик с вином и салфеткой",
        x: 64,
        y: 72
      },
      {
        id: "guest_sofa",
        icon: "moon",
        shortTag: "Диван",
        label: "Погасить свет и лечь на диван",
        x: 26,
        y: 63,
        isExit: true
      }
    ]
  },
  kitchen: {
    id: "kitchen",
    emoji: "🍷",
    shortLabel: "🍷 Кухня",
    title: "Кухня-бар • камень и латунь",
    locationBadge: "КУХНЯ-БАР • 22:28",
    bg: "./assets/v3/sd_kitchen_rain_evening.webp",
    bgByTime: {
      rain_evening: "./assets/v3/sd_kitchen_rain_evening.webp",
      night_clear: "./assets/v3/sd_kitchen_night_clear.webp",
      dawn_mist: "./assets/v3/sd_kitchen_dawn_mist.webp",
      morning_sun: "./assets/v3/sd_kitchen_morning_sun.webp"
    },
    fxShader: "moscow_city_night",
    fxByTime: {
      rain_evening: "moscow_city_night",
      night_clear: "moscow_city_calm",
      dawn_mist: "none",
      morning_sun: "morning_sun"
    },
    visualProps: [],
    hotspots: [
      {
        id: "kitchen_calla",
        propKey: "kitchen_calla_clue",
        icon: "sparkle",
        imgSrc: "./assets/v2/cutout_calla_note.webp",
        shortTag: "Букет калл",
        label: "Осмотреть букет и открытку на острове",
        x: 54,
        y: 56
      }
    ]
  },
  bathroom: {
    id: "bathroom",
    emoji: "🚿",
    shortLabel: "🚿 Ванная",
    title: "Ванная комната • мрамор и зеркало",
    locationBadge: "ВАННАЯ • 22:32",
    bg: "./assets/v3/sd_bathroom_rain_evening.webp",
    bgByTime: {
      rain_evening: "./assets/v3/sd_bathroom_rain_evening.webp",
      night_clear: "./assets/v3/sd_bathroom_night_clear.webp",
      dawn_mist: "./assets/v3/sd_bathroom_dawn_mist.webp",
      morning_sun: "./assets/v3/sd_bathroom_morning_sun.webp"
    },
    fxShader: "moscow_city_night",
    fxByTime: {
      rain_evening: "moscow_city_night",
      night_clear: "moscow_city_calm",
      dawn_mist: "none",
      morning_sun: "shower_steam"
    },
    visualProps: [],
    hotspots: [
      {
        id: "bathroom_rail",
        propKey: "bathroom_lace_dilemma",
        icon: "eye",
        imgSrc: "./assets/v2/cutout_silk_lace.webp",
        shortTag: "Шёлк у зеркала",
        label: "Полотенцесушитель и флаконы духов",
        x: 76,
        y: 50
      }
    ]
  },
  bedroom: {
    id: "bedroom",
    emoji: "🛏",
    shortLabel: "🛏 Спальня",
    title: "Спальня Маши • ночник у кровати",
    locationBadge: "СПАЛЬНЯ МАШИ • 22:36",
    bg: "./assets/v3/sd_bedroom_rain_evening.webp",
    bgByTime: {
      rain_evening: "./assets/v3/sd_bedroom_rain_evening.webp",
      night_clear: "./assets/v3/sd_bedroom_night_clear.webp",
      dawn_mist: "./assets/v3/sd_bedroom_dawn_mist.webp",
      morning_sun: "./assets/v3/sd_bedroom_morning_sun.webp"
    },
    fxShader: "moscow_city_night",
    fxByTime: {
      rain_evening: "moscow_city_night",
      night_clear: "moscow_city_calm",
      dawn_mist: "none",
      morning_sun: "morning_sun"
    },
    visualProps: [],
    hotspots: [
      {
        id: "bedroom_photo",
        propKey: "bedroom_swing_photo",
        icon: "search",
        imgSrc: "./assets/v2/cutout_swing_frame.webp",
        shortTag: "Рамка 14.08",
        label: "Серебряная фоторамка у изголовья",
        x: 78,
        y: 64
      },
      {
        id: "bedroom_phone",
        propKey: "bedroom_masha_phone",
        icon: "phone",
        shortTag: "iPhone Маши",
        label: "Рабочий iPhone на зарядке",
        x: 60,
        y: 78
      }
    ]
  }
};

export function countExploredSandboxGoals(state) {
  const rp = state.roomProps || {};
  let done = 0;
  if (rp.living_table_clue?.taken) done += 1;
  if (rp.kitchen_calla_clue?.taken) done += 1;
  if (rp.bathroom_lace_dilemma?.taken) done += 1;
  if (rp.bedroom_swing_photo?.taken && state.flags.masha_phone_unlocked) done += 1;
  return done;
}

export function getHotspotSequence(spotId, state) {
  const rp = state.roomProps || {};

  switch (spotId) {
    case "living_wine_card": {
      if (rp.living_table_clue?.taken) {
        return [
          {
            role: "mct",
            speaker: "{mc}",
            portraitMood: "calm",
            prop: "./assets/v2/prop_lounge_card_wine.webp",
            text: "Карта «SKY LOUNGE • 54 ЭТАЖ» и конверт с купюрами лежат под салфеткой ровно так, как она их оставила. Значит, уехала она именно в ту башню напротив."
          }
        ];
      }
      return [
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "calm",
          prop: "./assets/v2/prop_lounge_card_wine.webp",
          fx: "glass_clink",
          text: "На ободке одного бокала остался след Машиного ягодного блеска. Второй с виду чистый, но стоит поднести ближе, и от стекла тянет тяжёлым мужским парфюмом с табаком и кожей. Вчера поздно вечером она здесь была не одна."
        },
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "calm",
          prop: "./assets/v2/prop_lounge_card_wine.webp",
          effect: (s, api) => {
            api.markPropTaken("living_table_clue");
            api.addItem("sky_lounge_card");
            api.addClue("clue_sky_lounge");
          },
          text: "Под салфеткой металл: клубная карта без имени «SKY LOUNGE • 54 ЭТАЖ • БАШНЯ ИМПЕРИЯ» и банковский конверт с пачкой пятитысячных. Точно не задаток по сделке с квартирой. Пятьдесят четвёртый этаж горит прямо напротив наших окон."
        }
      ];
    }

    case "kitchen_calla": {
      if (rp.kitchen_calla_clue?.taken) {
        return [
          {
            role: "mct",
            speaker: "{mc}",
            portraitMood: "calm",
            prop: "./assets/v2/prop_calla_bouquet.webp",
            text: "Пустая каменная столешница и белые каллы с карточкой от некоего «К.». В пятницу её снова ждут без опозданий."
          }
        ];
      }
      return [
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "calm",
          text: "Плита блестит как в витрине салона, ни одной кастрюли или сковородки. В холодильнике только сухое шампанское, коробка ресторанных роллов да лоток голубики. Домашней едой тут и не пахнет. А в цветах на острове торчит открытка…"
        },
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "calm",
          prop: "./assets/v2/prop_calla_bouquet.webp",
          fx: "cloth",
          effect: (s, api) => {
            api.markPropTaken("kitchen_calla_clue");
            api.addClue("clue_calla_note");
          },
          text: "«За безупречную выдержку в среду. В пятницу жду в том же составе, без опозданий. К.» Внутри поднимается глухая злость. И не на Машу, а на человека, чьи сломанные часы висят у меня на запястье. Пока я рос на всём готовом за казённым забором, сестра выкручивалась в Москве сама."
        }
      ];
    }

    case "bathroom_rail": {
      if (rp.bathroom_lace_dilemma?.taken) {
        return [
          {
            role: "mct",
            speaker: "{mc}",
            portraitMood: "shy",
            text: state.flags.touched_lace
              ? "В воздухе всё ещё держится тонкий аромат пудры и горького миндаля. Хватит испытывать себя у этого зеркала."
              : "Я уже умылся холодной водой. Нечего лишний раз заглядывать в её вещи."
          }
        ];
      }
      return [
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "shy",
          text: "После казённых умывальников с куском хозяйственного мыла эта ванная кажется другой планетой. Тёплый мрамор, десятки стеклянных флаконов у зеркала, а в воздухе стоит пудра, ваниль и миндальный запах Машиных духов."
        },
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "shy",
          fx: "heartbeat",
          text: "Взгляд сам цепляется за хромированный полотенцесушитель прямо на уровне груди: тонкие чулки и невесомое светлое кружево. Родной крови между нами нет, в квартире ни души, и никто никогда не узнает…"
        },
        {
          choices: [
            {
              text: "Коснуться тёплого кружева",
              onPick: (s, api) => {
                s.flags.touched_lace = true;
                api.markPropTaken("bathroom_lace_dilemma");
                api.changeStats({ risk: 1 }, ["Риск +1"]);
                api.fx("cloth");
              },
              next: [
                {
                  role: "mct",
                  speaker: "{mc}",
                  portraitMood: "shy",
                  fx: "heartbeat",
                  text: "Ткань тёплая, почти невесомая под пальцами, и от неё кружит голову тем самым цветочным шлейфом, что был на улице, когда она меня обняла. Быстро убираю руку, хотя складка ложится чуть иначе. Приехали, Соколов. Первый вечер в гостях у сестры, а тормоза уже отказывают."
                }
              ]
            },
            {
              text: "Умыться холодной водой и выйти",
              onPick: (s, api) => {
                s.flags.touched_lace = false;
                api.markPropTaken("bathroom_lace_dilemma");
                api.changeStats({ loyalty: 1 }, ["Доверие Маши выросло"]);
              },
              next: [
                {
                  role: "mct",
                  speaker: "{mc}",
                  portraitMood: "calm",
                  text: "Холодная вода из крана быстро приводит в чувство. Маша единственная в этом городе не закрыла передо мной дверь и пустила к себе домой. Шарить по её вещам в первый же вечер я точно не стану."
                }
              ]
            }
          ]
        }
      ];
    }

    case "bedroom_photo": {
      if (rp.bedroom_swing_photo?.taken) {
        return [
          {
            role: "mct",
            speaker: "{mc}",
            portraitMood: "calm",
            prop: "./assets/v2/prop_swing_photo_1408.webp",
            text: "Наша старая карточка на дворовых качелях прямо у изголовья. В правом нижнем углу ручкой выведено «14.08»."
          }
        ];
      }
      return [
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "calm",
          text: "На открытой стойке у стены висят вечерние платья в чехлах, а прямо у подушки в круге ночника лежат две вещи: потёртая серебряная фоторамка и тёмный рабочий iPhone на зарядке."
        },
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "shy",
          prop: "./assets/v2/prop_swing_photo_1408.webp",
          effect: (s, api) => {
            s.flags.saw_lake_photo_date = true;
            api.markPropTaken("bedroom_swing_photo");
            api.addClue("clue_swing_photo");
          },
          text: "Горло перехватывает. Среди всего этого дорогого лоска и чужих букетов она двенадцать лет держала у кровати наш старый дворовый снимок на качелях. В углу рукой отца подписана дата: «14.08». Четырнадцатое августа, за неделю до того, как он пропал."
        }
      ];
    }

    case "bedroom_phone":
      return "OPEN_MASHA_PHONE";

    case "guest_sofa":
      return "CONFIRM_SLEEP";

    default:
      return [];
  }
}

export function buildPostPhoneUnlockSequence() {
  return [
    {
      role: "mct",
      speaker: "{mc}",
      portraitMood: "calm",
      fx: "tap",
      text: "Возвращаю телефон на тумбочку тем же углом к кабелю. В голове шумит: закрытые ночные ужины с каким-то Градовым под присмотром Артура, подруга Ленка, которая собирается заявиться сюда с утра… И слова Вероники о том, что Маша сама тайком искала следы моего отца."
    }
  ];
}
