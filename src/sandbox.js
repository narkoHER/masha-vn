// Песочница по квартире Маши (4 комнаты + взлом рабочего iPhone + инвентарь и улики)

export const INITIAL_BAG = [
  {
    id: "father_watch",
    icon: "⌚",
    title: "Старые часы отца (Виктора)",
    desc: "Механические часы с треснувшим стеклом. Внутри задней крышки выгравирована странная карнавальная маска и надпись: «Береги мелкую»."
  },
  {
    id: "orphanage_doc",
    icon: "📄",
    title: "Справка о выпуске из интерната №7",
    desc: "Выдана на руки совершеннолетнему выпускнику (18 лет). Направление в общагу на окраине, куда совсем не тянет возвращаться."
  }
];

export const SANDBOX_ROOMS = {
  living: {
    id: "living",
    title: "Гостиная Маши — панорамный пентхаус",
    bg: "./assets/bg_apt_living.webp",
    hotspots: [
      {
        id: "wine_table",
        label: "🍷 Вино и два бокала",
        x: 68,
        y: 72,
        kind: "normal"
      },
      {
        id: "mask_card",
        label: "🎭 Чёрная карточка у ковра",
        x: 42,
        y: 83,
        kind: "normal"
      },
      {
        id: "guest_sofa",
        label: "🛋 Лечь на диван (конец вечера)",
        x: 27,
        y: 62,
        kind: "normal"
      }
    ]
  },
  bathroom: {
    id: "bathroom",
    title: "Ванная комната — мрамор и парфюм",
    bg: "./assets/bg_apt_bathroom.webp",
    hotspots: [
      {
        id: "panties_rail",
        label: "👙 Трусики на змеевике",
        x: 80,
        y: 46,
        kind: "spicy"
      },
      {
        id: "mirror_vanity",
        label: "🪞 Зеркало и флаконы",
        x: 24,
        y: 57,
        kind: "normal"
      }
    ]
  },
  bedroom: {
    id: "bedroom",
    title: "Спальня Маши — «не заходить без стука»",
    bg: "./assets/bg_apt_bedroom.webp",
    hotspots: [
      {
        id: "bed_duvet",
        label: "🛏 Бугорок под одеялом",
        x: 66,
        y: 61,
        kind: "spicy"
      },
      {
        id: "ring_closet",
        label: "👗 Кольцевая лампа и шкаф",
        x: 22,
        y: 44,
        kind: "normal"
      },
      {
        id: "kids_photo",
        label: "🖼 Детское фото в рамке",
        x: 83,
        y: 69,
        kind: "normal"
      },
      {
        id: "masha_phone",
        label: "📱 Второй iPhone Маши",
        x: 66,
        y: 81,
        kind: "spicy"
      }
    ]
  },
  kitchen: {
    id: "kitchen",
    title: "Кухня-бар — 28 этаж",
    bg: "./assets/bg_apt_kitchen.webp",
    hotspots: [
      {
        id: "sushi_box",
        label: "🍣 Роллы и клубника",
        x: 43,
        y: 59,
        kind: "normal"
      },
      {
        id: "champagne_bucket",
        label: "🥂 Шампанское во льду",
        x: 73,
        y: 52,
        kind: "normal"
      }
    ]
  }
};

export function getHotspotSequence(spotId, state) {
  const mc = state.playerName;

  switch (spotId) {
    case "wine_table":
      return [
        {
          speaker: mc,
          thought: true,
          mood: "focus",
          text: "Початая бутылка французского Бордо. На одном бокале — отпечаток Машиного блеска для губ. Второй бокал абсолютно чистый по краю, пахнет тяжёлым мужским табачным парфюмом."
        },
        {
          speaker: mc,
          thought: true,
          mood: "shy",
          text: "То есть вчера поздно вечером у «сестрёнки-риэлтора» явно гостил какой-то серьёзный дядя. Почему-то внутри неприятно кольнуло, хотя какое мне вообще дело?"
        }
      ];

    case "mask_card":
      if (state.flags.foundMaskCard) {
        return [
          {
            speaker: mc,
            thought: true,
            mood: "focus",
            prop: "./assets/clue_mask_watch.webp",
            text: "Я уже забрал чёрную карточку. Тот же самый знак золотой венецианской маски, что выгравирован внутри часов моего пропавшего отца..."
          }
        ];
      }
      return [
        {
          speaker: mc,
          thought: true,
          mood: "neutral",
          text: "Из-под края ковра у столика торчит плотный матово-чёрный прямоугольник. Похоже, вчерашний гость выронил из пиджака."
        },
        {
          speaker: mc,
          thought: true,
          mood: "shock",
          fx: "heartbeat",
          shake: true,
          prop: "./assets/clue_mask_watch.webp",
          text: "Погоди-ка... Тиснёная золотая венецианская маска без единого имени и номера?! Я дрожащими пальцами достаю из кармана старые часы отца и отщёлкиваю крышку."
        },
        {
          speaker: mc,
          thought: true,
          mood: "focus",
          prop: "./assets/clue_mask_watch.webp",
          effect: (s, api) => {
            s.flags.foundMaskCard = true;
            api.addClue("mask_card", "Чёрная VIP-карта Ордена с маской (совпадает с часами отца!)");
            api.addItem({
              id: "vip_mask_card",
              icon: "🎭",
              title: "Чёрная карта с золотой маской",
              desc: "Найдена у столика в гостиной Маши. Эмблема один в один повторяет гравировку внутри часов твоего пропавшего отца Виктора."
            });
          },
          text: "Один в один! Та же самая карнавальная маска! Двенадцать лет назад отец бесследно сгинул после звонка людей с этим знаком... И теперь они ходят домой к Маше?!"
        }
      ];

    case "panties_rail":
      if (state.flags.pantiesResolved) {
        return [
          {
            speaker: mc,
            thought: true,
            mood: "shy",
            text: state.flags.stolePanties
              ? "На тёплом змеевике остались только чулки. Улика моего тихого безумия сейчас жжёт карман толстовки..."
              : "Лучше больше не испытывать судьбу у этого полотенцесушителя."
          }
        ];
      }
      return [
        {
          speaker: mc,
          thought: true,
          mood: "shock",
          fx: "heartbeat",
          text: "Хромированный змеевик пышет теплом. Прямо на уровне глаз висят крошечные белые кружевные трусики Маши и тонкие чулки. В детдоме за такое подглядывание в сушилке уши откручивали, а тут я вообще один в квартире..."
        },
        {
          choices: [
            {
              text: "Украсть трусики себе в карман",
              badge: "+2 Разврат • Риск!",
              onPick: (s, api) => {
                s.flags.pantiesResolved = true;
                s.flags.stolePanties = true;
                s.stats.boldness += 2;
                api.fx("cloth");
                api.toast("🔥 Наглость / Разврат +2", "spicy");
                api.toast("🏆 Достижение: «Тихий фетишист»", "spicy");
                api.addItem({
                  id: "masha_panties",
                  icon: "👙",
                  title: "Белые кружевные трусики Маши",
                  desc: "Сняты с тёплого змеевика в ванной. Пахнут дорогим цветочным кондиционером и ванилью. Главное — не спалиться."
                });
              },
              next: [
                {
                  speaker: mc,
                  thought: true,
                  mood: "shock",
                  text: "Сердце колотится где-то в горле. Тончайшее тёплое кружево мгновенно исчезает у меня в кармане. Господи, кем я становлюсь в первый же вечер в её доме?!"
                }
              ]
            },
            {
              text: "Осторожно коснуться и оставить ровно как висели",
              badge: "+1 Разврат",
              onPick: (s, api) => {
                s.flags.pantiesResolved = true;
                s.stats.boldness += 1;
                api.fx("cloth");
                api.toast("🔥 Наглость / Разврат +1", "spicy");
              },
              next: [
                {
                  speaker: mc,
                  thought: true,
                  mood: "shy",
                  text: "Невесомая ткань пахнет сладкой ванилью и чем-то головокружительно женским. Аккуратно расправляю складочку обратно — ни один детектив не заметит."
                }
              ]
            },
            {
              text: "Отвести взгляд и не трогать чужие вещи",
              badge: "+1 Сдержанность",
              onPick: (s, api) => {
                s.flags.pantiesResolved = true;
                s.stats.trust += 1;
                api.toast("🛡 Сдержанность +1");
              },
              next: [
                {
                  speaker: mc,
                  thought: true,
                  mood: "neutral",
                  text: "Так, выдохнули. Она единственная в этом городе пустила меня под крышу, не хватало ещё лазить по её белью. Почти горжусь своей силой воли."
                }
              ]
            }
          ]
        }
      ];

    case "mirror_vanity":
      return [
        {
          speaker: mc,
          thought: true,
          mood: "neutral",
          text: "Одни духи на этой полке стоят как весь годовой бюджет нашей группы в интернате. Из круглого зеркала на меня смотрит взъерошенный пацан из троллейбуса — будто случайно забрёл в декорации кино."
        }
      ];

    case "bed_duvet":
      return [
        {
          speaker: mc,
          thought: true,
          mood: "shock",
          effect: (s, api) => {
            if (!s.flags.clueToy) {
              s.flags.clueToy = true;
              api.addClue("toy_lamp", "Розовый «массажёр» и студийный свет в спальне");
            }
          },
          text: "Приподнимаю уголок тёмного шёлкового одеяла — ну конечно: массивный розовый вибромассажёр на аккумуляторе, ещё даже индикатор мигает. Отличная экипировка для «сделок с коммерческой недвижимостью»!"
        }
      ];

    case "ring_closet":
      return [
        {
          speaker: mc,
          thought: true,
          mood: "shy",
          effect: (s, api) => {
            if (!s.flags.clueCloset) {
              s.flags.clueCloset = true;
              api.addClue("closet_costumes", "Гардероб с ролевыми костюмами и вечерними платьями");
            }
          },
          text: "У кровати стоит профессиональная кольцевая лампа с держателем под смартфон, а в приоткрытой гардеробной — ни одного офисного пиджака: вечерние мини, латекс, костюм горничной, белые чулки и гора шпилек..."
        }
      ];

    case "kids_photo":
      return [
        {
          speaker: mc,
          thought: true,
          mood: "shy",
          effect: (s, api) => {
            s.flags.sawPhotoDate = true;
            api.toast("💡 Подсказка запомнена: дата на фото 14.08", "clue");
          },
          text: "Серебряная рамка у лампы... Сердце вдруг сжимается. Десятилетняя Машка без переднего молочного зуба обнимает за плечи шестилетнего меня с разбитой коленкой! Она реально хранила это фото у кровати все двенадцать лет..."
        },
        {
          speaker: mc,
          thought: true,
          mood: "focus",
          text: "В углу снимка маминым почерком выведена дата нашего последнего общего дня на озере: «14.08». Четырнадцатое августа — `1408`."
        }
      ];

    case "masha_phone":
      return "OPEN_PHONE_MODAL";

    case "sushi_box":
      return [
        {
          speaker: mc,
          thought: true,
          mood: "shy",
          text: "Коробка премиальных роллов с лососем и миска свежей клубники. Супа или пельменей в этой квартире явно не водится, зато один ролл «Филадельфия» залетает как родной."
        }
      ];

    case "champagne_bucket":
      return [
        {
          speaker: mc,
          thought: true,
          mood: "neutral",
          text: "Ведёрко с подтаявшим льдом и бутылкой шампанского на два бокала. А за стеклом с 28-го этажа гудит ночной город — миллионы огней, и где-то там сейчас Маша на своём «показе»."
        }
      ];

    case "guest_sofa":
      return "CONFIRM_SLEEP";

    default:
      return [];
  }
}
