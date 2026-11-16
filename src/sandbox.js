// Интерактивная детективная песочница Intro_4 (4 комнаты апартаментов Маши на Пресне),
// каталог предметов, зацепок и интерфейс второго рабочего iPhone Маши (PIN: 1408).

export const ITEMS_CATALOG = {
  orphanage_referral: {
    id: "orphanage_referral",
    title: "Справка о выпуске и направление",
    subtitle: "Интернат • Общежитие в Текстильщиках",
    desc: "Выдана комендантом Тамарой Ильиничной вместе с тощим конвертом подъёмных. Заселение во временное общежитие возможно только с понедельника."
  },
  father_watch: {
    id: "father_watch",
    title: "Механические часы отца (Виктора)",
    subtitle: "Стальной корпус • Треснувшее стекло",
    desc: "Стрелки замерли на без четверти девять. Единственная вещь от родного отца, которую шестилетний Артём не позволил забрать в приёмнике."
  },
  katya_strap: {
    id: "katya_strap",
    title: "Страховочный тренчик из паракорда",
    subtitle: "Подарок Кати у ворот интерната",
    desc: "Аккуратно сплетённый вручную чёрный ремешок с маленьким латунным карабином под корпус отцовских часов."
  },
  sky_lounge_card: {
    id: "sky_lounge_card",
    title: "Карта «SKY LOUNGE • 54 ЭТАЖ»",
    subtitle: "Башня Империя • Металлический пропуск",
    desc: "Тяжёлая матово-чёрная клубная карта без имени, обнаруженная под салфеткой у бокалов с Бордо вместе с конвертом пятитысячных купюр."
  }
};

export const CLUES_CATALOG = {
  clue_monpansier: {
    id: "clue_monpansier",
    title: "Двойная проверка Маши",
    tag: "Детство • Доверие",
    summary: "При первом звонке Маша упомянула некоего Вадима и проверила Артёма тайником за батареей (жестяная банка из-под монпансье) и вопросом-ловушкой про Сочи.",
    detail: "Маша явно опасается «пробивщиков» и провокаций со стороны людей некоего Вадима. Только точные детали из их старой детской сняли её защиту."
  },
  clue_father_week: {
    id: "clue_father_week",
    title: "Последняя неделя Виктора",
    tag: "Дело отца",
    summary: "Перед исчезновением отец почти не спал, звонил кому-то с лестничной площадки и проверял дверные замки по три раза за ночь.",
    detail: "По словам Маши, в тот вечер пропали отложенные деньги Вероники и документы Виктора, но его поведение перед уходом больше напоминало панику человека, за которым охотятся."
  },
  clue_realtor_cover: {
    id: "clue_realtor_cover",
    title: "Легенда о «риэлторе» и второй телефон",
    tag: "Двойная жизнь",
    summary: "При вопросе о работе Маша нервно коснулась чокера и спрятала вспыхнувший экран второго iPhone в тёмном матовом чехле.",
    detail: "Она уверяет, что работает брокером по элитной недвижимости в Москва-Сити и выезжает на поздние показы к занятым клиентам. Позже ей позвонил некий Артур и напомнил про «ложу в 11:00»."
  },
  clue_sky_lounge: {
    id: "clue_sky_lounge",
    title: "Бокалы Бордо и пропуск «SKY LOUNGE»",
    tag: "Гостиная • Улика",
    image: "./assets/v2/prop_lounge_card_wine.webp",
    summary: "Второй бокал на столике пахнет селективным мужским парфюмом с нотами кожи и трубочного табака. Под салфеткой — карта «SKY LOUNGE • 54 ЭТАЖ • БАШНЯ ИМПЕРИЯ» и пачка пятитысячных.",
    detail: "Вчера поздно вечером в гостиной Маши был состоятельный мужчина. Закрытый лаунж расположен на 54-м этаже башни прямо напротив окон её апартаментов."
  },
  clue_calla_note: {
    id: "clue_calla_note",
    title: "Букет белых калл и записка «К.»",
    tag: "Кухня-бар • Улика",
    image: "./assets/v2/prop_calla_bouquet.webp",
    summary: "На пустой кухне в высокой вазе стоит строгий букет калл с карточкой: «За безупречную выдержку в среду. В пятницу жду в том же составе — без опозданий. К.»",
    detail: "На плите не готовят домашнюю еду — в холодильнике только сухое шампанское, ресторанные роллы и голубика. Некто «К.» ждёт Машу в пятницу на очередную закрытую встречу."
  },
  clue_swing_photo: {
    id: "clue_swing_photo",
    title: "Снимок на качелях: дата «14.08»",
    tag: "Спальня • Ключ к PIN",
    image: "./assets/v2/prop_swing_photo_1408.webp",
    summary: "У самого изголовья кровати Маша все 12 лет хранила летнее фото с шестилетним Артёмом на дворовых качелях. В углу выведена дата «14.08».",
    detail: "Снимок сделан за неделю до исчезновения отца Артёма. Четыре цифры «1408» — ключ к коду блокировки рабочего смартфона Маши."
  },
  clue_masha_phone: {
    id: "clue_masha_phone",
    title: "Переписки во втором iPhone Маши",
    tag: "Спальня • Главный инсайд",
    summary: "Куратор Артур вызвал Машу на закрытый ужин с Градовым ради подписи юристов, Ленка едет сюда к 10 утра, а Вероника ругает Машу за тайные поиски следов Виктора.",
    detail: "Маша не просто «развлекает гостей» — Артур требует держать голову холодной до приезда юристов с папкой. Ещё важнее сообщение её матери Вероники: Маша сама тайком наводила справки о пропавшем отце Артёма через его старых знакомых."
  },
  clue_katya_archive: {
    id: "clue_katya_archive",
    title: "Архивный бланк Кати: ателье на Арбате",
    tag: "Катя • Зацепка Главы 1",
    image: "./assets/v2/cg_intro1_doc_watch.webp",
    summary: "За 3 дня до интерната часы чинили в частном ателье на Арбате, а этой весной неизвестный мужчина через курьера выяснял точную дату выпуска Артёма!",
    detail: "Катя нашла в дальнем сейфе канцелярии первичную опись приёма Артёма 12-летней давности. Часовая мастерская находится в 20 минутах ходьбы от Пресни — и кто-то живой следил за выходом Артёма на свободу."
  },
  clue_midnight_card_confession: {
    id: "clue_midnight_card_confession",
    title: "Ночной расклад: контракт с Артуром",
    tag: "01:48 • Откровение на картах",
    summary: "Выиграв спор на Бубновой Даме, Артём услышал от Маши правду: она не риэлтор, а отрабатывает старый кабальный долг перед закрытым агентством Артура в Сити.",
    detail: "Маша призналась, что влезла в обязательства перед Артуром три года назад, когда пыталась выкупить архивы и выйти на след пропавшего Виктора. Осталось закрыть последние два выезда."
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
      "Ого, первой под твоей рукой открылась Червовая Дама… Тёплая, преданная душа, которая осталась ждать тебя за закрытыми воротами. Ну-ка колись, Соколов: оставил в интернате тихую девчонку, которая по тебе вздыхает?"
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
      "Бубновая Королева легла прямо в изголовье… Светская блондинка в шелках, у которой за красивым фасадом семь замков и вечная бессонница. Хм, даже не представляю, на кого это твоя колода так бесцеремонно намекает…"
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
      "Так, а вот от Пиковой Дамы держись на пистолетном выстреле, братец! Кареглазая бестия без стыда и тормозов — такая ворвётся с утра на каблуках и за пять минут проверит все твои слабые места."
  },
  {
    id: "queen_clubs",
    suit: "♣",
    suitColor: "dark",
    rank: "Q",
    title: "Дама Треф",
    archetype: "Ледяной расчёт и старый долг",
    heroineHint: "Тень Вероники",
    mashaMood: "spr_masha_warm_smile",
    mashaLine:
      "И Трефовая Дама отвернулась к прошлому… Холодная гордая женщина, старая семейная трещина и чужие деньги, из-за которых всё пошло наперекосяк двенадцать лет назад."
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
        text: "Ленка, у меня караул!! Ко мне в квартиру реально приехал мой мелкий сводный брат Артём — сегодня выпустился из интерната! Такой высокий, глаза отцовские, краснеет от каждого вздоха, а у меня вино со вчерашнего приёма не убрано. Я со страху брякнула ему, что работаю риэлтором!"
      },
      {
        dir: "in",
        sender: "Ленка",
        time: "22:20",
        text: "Подожди, настоящий восемнадцатилетний скромник прямо у тебя на диване?! Машка, да ты сорвала джекпот! Смотри только не спались перед ним со своими ночными выездами к Артуру. Короче, завтра ровно в десять утра жди меня с кофе — лично протестирую твоего братика на стрессоустойчивость!"
      },
      {
        dir: "out",
        sender: "Маша",
        time: "22:21",
        text: "Даже думать не смей к нему клеиться, хищница! Он ещё совсем чистый парень, не ломай ему психику!"
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
        text: "Мария, машина у подъезда. Сегодня в ложе на 54-м закрытый ужин с Градовым. Дресс-код вечерний, улыбаешься, поддерживаешь беседу и не даёшь ему соскочить до полуночи, пока юристы не привезут папку на подпись. Шампанское только для вида — голова должна быть холодной."
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
        text: "Маша, прекрати присылать мне переводы, у нас с Игорем более чем достойный достаток. И мне вчера передали, что ты снова наводила справки через старых знакомых Виктора. Оставь эту грязь в прошлом, он сломал нам жизнь и не стоит твоих усилий."
      }
    ]
  }
};

export const SANDBOX_ROOMS = {
  living: {
    id: "living",
    emoji: "🛋",
    shortLabel: "🛋 Гостиная",
    title: "Гостиная — панорама Москва-Сити",
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
        label: "Осмотреть столик с Бордо и салфеткой",
        x: 64,
        y: 72
      },
      {
        id: "guest_sofa",
        icon: "moon",
        shortTag: "Диван",
        label: "Погасить бра и лечь на диван",
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
    title: "Кухня-бар — камень и латунь",
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
    title: "Ванная комната — ночной свет и мрамор",
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
    title: "Спальня Маши — приглушённый бра",
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
            text: "Карта «SKY LOUNGE • 54 ЭТАЖ • БАШНЯ ИМПЕРИЯ» и конверт с наличными лежат на прежнем месте под салфеткой. Значит, сегодня ночью она работает именно в той башне напротив."
          }
        ];
      }
      return [
        {
          role: "narrator",
          prop: "./assets/v2/prop_lounge_card_wine.webp",
          fx: "glass_clink",
          text: "На низком каменном столике напротив панорамного окна стоят початая бутылка французского Бордо, два хрустальных бокала и забытый под краем салфетки плотный матово-чёрный картхолдер."
        },
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "calm",
          prop: "./assets/v2/prop_lounge_card_wine.webp",
          text: "На ножке одного бокала — чёткий след ягодного блеска для губ Маши. Второй бокал чистый, но стоит поднести его ближе — от стекла тянет тем самым тяжёлым, властным селективным парфюмом с нотами кожи и трубочного табака. Вчера поздно вечером она принимала здесь мужчину."
        },
        {
          role: "narrator",
          prop: "./assets/v2/prop_lounge_card_wine.webp",
          text: "{mc} приподнимает салфетку: под ней лежит тяжёлая металлическая клубная карта без имени с гравировкой «SKY LOUNGE • 54 ЭТАЖ • БАШНЯ ИМПЕРИЯ» и сложенный вдвое банковский конверт с пачкой новых пятитысячных купюр."
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
          text: "Полсотни или сотня тысяч наличными просто в конверте под салфеткой — явно не аванс по ипотечному договору. И закрытый лаунж на пятьдесят четвёртом этаже башни прямо напротив наших окон… Значит, именно туда она сейчас уехала в ночь."
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
            text: "Холодная мраморная кухня и строгие белые каллы с открыткой от некоего «К.». В пятницу её снова ждут «без опозданий»."
          }
        ];
      }
      return [
        {
          role: "narrator",
          text: "Минималистичная кухня из тёмного камня и латуни. Ни единой кастрюли или сковороды — плита блестит как в мебельном салоне. В холодильнике стоят только бутылка сухого шампанского, коробка авторских роллов из дорогого ресторана и лоток свежей голубики. На барном острове в высокой вазе белеет строгий букет калл с маленькой карточкой."
        },
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "calm",
          text: "Домашней едой здесь и не пахнет — квартира человека, который почти не проводит вечера дома. Посмотрим, что написано на карточке в цветах…"
        },
        {
          role: "narrator",
          prop: "./assets/v2/prop_calla_bouquet.webp",
          fx: "cloth",
          text: "На плотной кремовой открытке каллиграфическим почерком выведено: «За безупречную выдержку в среду. В пятницу жду в том же составе — без опозданий. К.»"
        },
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "calm",
          prop: "./assets/v2/prop_calla_bouquet.webp",
          effect: (s, api) => {
            api.markPropTaken("kitchen_calla_clue");
            api.addClue("clue_calla_note");
          },
          text: "«За безупречную выдержку»… Внутри поднимается глухая, злая тяжесть — и не на Машу, нет. На человека, чьи сломанные часы висят у меня на руке, и на самого себя за то, что я двенадцать лет рос в тепле на готовом пайке, пока сестра выживала в этом каменном лесу как умела."
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
              ? "В воздухе ванной всё ещё витает тонкий миндально-ванильный аромат духов Маши. Лучше больше не испытывать собственную выдержку у этого полотенцесушителя."
              : "Я уже прикрыл дверь ванной — нечего шарить глазами по её личным вещам."
          }
        ];
      }
      return [
        {
          role: "narrator",
          text: "Просторная ванная в тёплом мраморе с мягкой контурной подсветкой. Вдоль раковины выстроена целая коллекция стеклянных флаконов нишевых духов и кремов, а прямо на тёплом хромированном полотенцесушителе на уровне груди {mc_gen} развешаны тончайшие шёлковые чулки и невесомое белое кружевное бельё Маши."
        },
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "shy",
          text: "Я застываю на пороге. После серых умывальников интерната с холодным хозяйственным мылом эта комната кажется декорацией из другого мира — здесь сам воздух пропитан тёплой пудрой, ванилью и тем самым горьковатым миндальным ароматом Машиной кожи."
        },
        {
          role: "mct",
          speaker: "{mc}",
          portraitMood: "shy",
          fx: "heartbeat",
          text: "Взгляд против воли прикипает к тонкому полупрозрачному кружеву на блестящем металле. Мы с ней не родные по крови, я один в пустой квартире, и никто никогда не узнает, если я сделаю один шаг вперёд…"
        },
        {
          choices: [
            {
              text: "Поддаться искушению — коснуться пальцами тёплого кружева и вдохнуть её аромат",
              onPick: (s, api) => {
                s.flags.touched_lace = true;
                api.markPropTaken("bathroom_lace_dilemma");
                api.changeStats({ risk: 1 }, ["Риск +1"]);
                api.fx("cloth");
              },
              next: [
                {
                  role: "narrator",
                  text: "Пальцы {mc_gen} едва заметно подрагивают, касаясь невесомой тёплой ткани на полотенцесушителе. Он на секунду подносит край кружева ближе к лицу, прикрывая глаза от дурманящего цветочного шлейфа, а затем торопливо возвращает вещь на прежнее место — хотя складочка ложится чуть иначе, чем висела."
                },
                {
                  role: "mct",
                  speaker: "{mc}",
                  portraitMood: "shy",
                  fx: "heartbeat",
                  text: "Сердце бьётся прямо в висках, по спине пробегает горячая волна стыда и острого мужского возбуждения. С ума сойти, Соколов — не успел переступить порог дома сводной сестры, а голова уже окончательно отказывает…"
                }
              ]
            },
            {
              text: "Собрать волю в кулак, отвести взгляд и аккуратно прикрыть дверь ванной",
              onPick: (s, api) => {
                s.flags.touched_lace = false;
                api.markPropTaken("bathroom_lace_dilemma");
                api.changeStats({ loyalty: 1 }, ["Доверие Маши выросло"]);
              },
              next: [
                {
                  role: "narrator",
                  text: "{mc} делает глубокий вдох, упирается взглядом в собственное отражение в зеркале, ополаскивает лицо холодной водой из крана и выходит в коридор, плотно прикрывая за собой дверь."
                },
                {
                  role: "mct",
                  speaker: "{mc}",
                  portraitMood: "calm",
                  text: "Стоп. Маша — единственный человек в Москве, который не захлопнул передо мной дверь и пустил под свою крышу без лишних вопросов. Лазить по её белью в первый же вечер — последнее дело."
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
            text: "Наша старая карточка на дворовых качелях у самого изголовья кровати. В правом нижнем углу ручкой выведено: «14.08» — четырнадцатое августа."
          }
        ];
      }
      return [
        {
          role: "narrator",
          text: "Полутёмная спальня с широкой кроватью под жемчужно-серым покрывалом. На открытой рейл-стойке у стены висят коктейльные платья с открытой спиной и шёлковые пеньюары в прозрачных чехлах. На прикроватной тумбочке в тёплом круге ночника стоят старая фотография в серебряной рамке и подключённый к кабелю тёмный рабочий iPhone Маши."
        },
        {
          role: "narrator",
          prop: "./assets/v2/prop_swing_photo_1408.webp",
          text: "На слегка выцветшем летнем снимке в серебряной рамке десятилетняя белокурая Маша с щербинкой на месте молочного зуба смеётся во весь рот, крепко обнимая за плечи шестилетнего {mc_acc} на тех самых дворовых качелях. В правом нижнем углу ручкой выведена дата: «14.08»."
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
          text: "Комок подступает к горлу. Среди всего этого дорогого столичного глянца, шёлка и чужих букетов она все двенадцать лет держала нашу старую дворовую карточку прямо у изголовья кровати… Четырнадцатое августа — 14.08. За неделю до того, как исчез отец."
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
      role: "narrator",
      fx: "tap",
      text: "{mc} осторожно блокирует экран, кладёт второй телефон ровно на прежнее место на тумбочке и бесшумно отступает к двери спальни."
    },
    {
      role: "mct",
      speaker: "{mc}",
      portraitMood: "calm",
      text: "В голове гудит от прочитанного. С одной стороны — закрытые ночные ужины с какими-то важными господами вроде Градова под командованием куратора Артура и дерзкая подруга Ленка, которая собирается нагрянуть сюда прямо с утра. С другой — слова Вероники: Маша сама тайком искала следы моего отца?!"
    }
  ];
}
