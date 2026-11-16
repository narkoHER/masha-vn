// Полный чистовой сценарий Пролога («МАША»: Intro_1 — Intro_6)
// Строго по документу Сценарий_Пролог_Чистовик.md без сокращений ключевых сцен и развилок.

export const ASSET_FALLBACKS = {
  "./assets/v2/title_cover_v2.webp": "./assets/title_cover.webp",
  "./assets/v2/bg_orphanage_gates.webp": "./assets/sc1_trolleybus_mc.webp",
  "./assets/v2/cg_intro1_doc_watch.webp": "./assets/clue_mask_watch.webp",
  "./assets/v2/cg_intro1_katya_farewell.webp": "./assets/sc1_fantasy_nerd.webp",
  "./assets/v2/bg_trolleybus_interior.webp": "./assets/sc1_trolleybus_mc.webp",
  "./assets/v2/cg_intro2_trolleybus_mc.webp": "./assets/sc1_trolleybus_mc.webp",
  "./assets/v2/cg_intro2_flashback_sepia.webp": "./assets/sc1_trolleybus_mc.webp",
  "./assets/v2/cg_intro2_fantasy_librarian.webp": "./assets/sc1_fantasy_nerd.webp",
  "./assets/v2/cg_intro2_fantasy_office.webp": "./assets/sc1_fantasy_nerd.webp",
  "./assets/v2/bg_malaya_bronnaya_ext.webp": "./assets/sc2_masha_reveal.webp",
  "./assets/v2/cg_intro3_masha_reveal.webp": "./assets/sc2_masha_reveal.webp",
  "./assets/v2/cg_intro3_hug_awkward.webp": "./assets/sc2_hug_awkward.webp",
  "./assets/v2/cg_intro3_secret_call.webp": "./assets/bg_cafe_booth.webp",
  "./assets/v2/bg_cafe_malaya_bronnaya.webp": "./assets/bg_cafe_booth.webp",
  "./assets/v2/cg_intro4_penthouse_arrival.webp": "./assets/bg_apt_living.webp",
  "./assets/v2/bg_penthouse_living_moscow.webp": "./assets/bg_apt_living.webp",
  "./assets/v2/bg_penthouse_living_night.webp": "./assets/bg_apt_living.webp",
  "./assets/v2/bg_penthouse_kitchen_moscow.webp": "./assets/bg_apt_kitchen.webp",
  "./assets/v2/bg_penthouse_kitchen_morning.webp": "./assets/bg_apt_kitchen.webp",
  "./assets/v2/bg_penthouse_bathroom_clean.webp": "./assets/bg_apt_bathroom.webp",
  "./assets/v2/bg_penthouse_bedroom_clean.webp": "./assets/bg_apt_bedroom.webp",
  "./assets/v2/prop_lounge_card_wine.webp": "./assets/clue_mask_watch.webp",
  "./assets/v2/prop_calla_bouquet.webp": "./assets/bg_apt_kitchen.webp",
  "./assets/v2/prop_swing_photo_1408.webp": "./assets/bg_apt_bedroom.webp",
  "./assets/v2/cg_intro5_night_return.webp": "./assets/sc5_night_return.webp",
  "./assets/v2/cg_intro5_sleep_silhouette.webp": "./assets/sc5_night_return.webp",
  "./assets/v2/cg_intro5_awake_sofa.webp": "./assets/sc5_night_return.webp",
  "./assets/v2/cg_intro6_shower_steam.webp": "./assets/bg_apt_bathroom.webp",
  "./assets/v2/cg_intro6_towel_high_loyalty.webp": "./assets/bg_apt_bedroom.webp",
  "./assets/v2/cg_intro6_towel_low_loyalty.webp": "./assets/bg_apt_bathroom.webp",
  "./assets/v2/cg_intro6_lenka_intercom.webp": "./assets/ava_lenka_phone.webp",
  "./assets/v2/ava_characters_v2.webp": "./assets/ava_mc_sheet.webp",
  "./assets/v2/spr_masha_warm_smile.webp": "./assets/spr_masha_warm_smile.webp",
  "./assets/v2/spr_masha_playful_tease.webp": "./assets/spr_masha_teasing.webp",
  "./assets/v2/spr_masha_nervous_lie.webp": "./assets/spr_masha_nervous_lie.webp",
  "./assets/v2/spr_masha_coat_smile.webp": "./assets/spr_masha_warm_smile.webp",
  "./assets/v2/spr_masha_night_dress.webp": "./assets/spr_masha_warm_smile.webp",
  "./assets/v2/spr_masha_morning_towel.webp": "./assets/spr_masha_teasing.webp",
  "./assets/v2/spr_katya_rain.webp": null,

  // ==================== V3 SEEDREAM 5.5 + 3D FALLBACK REGISTRY ====================
  // 16 синхронных комнат пентхауса (4 комнаты × 4 времени суток)
  "./assets/v3/sd_living_rain_evening.webp": "./assets/v3/room_living_rain_evening.webp",
  "./assets/v3/sd_living_night_clear.webp": "./assets/v3/room_living_night_clear.webp",
  "./assets/v3/sd_living_dawn_mist.webp": "./assets/v3/room_living_dawn_mist.webp",
  "./assets/v3/sd_living_morning_sun.webp": "./assets/v3/room_living_morning_sun.webp",
  "./assets/v3/sd_kitchen_rain_evening.webp": "./assets/v3/room_kitchen_rain_evening.webp",
  "./assets/v3/sd_kitchen_night_clear.webp": "./assets/v3/room_kitchen_night_clear.webp",
  "./assets/v3/sd_kitchen_dawn_mist.webp": "./assets/v3/room_kitchen_dawn_mist.webp",
  "./assets/v3/sd_kitchen_morning_sun.webp": "./assets/v3/room_kitchen_morning_sun.webp",
  "./assets/v3/sd_bathroom_rain_evening.webp": "./assets/v3/room_bathroom_rain_evening.webp",
  "./assets/v3/sd_bathroom_night_clear.webp": "./assets/v3/room_bathroom_night_clear.webp",
  "./assets/v3/sd_bathroom_dawn_mist.webp": "./assets/v3/room_bathroom_dawn_mist.webp",
  "./assets/v3/sd_bathroom_morning_sun.webp": "./assets/v3/room_bathroom_morning_sun.webp",
  "./assets/v3/sd_bedroom_rain_evening.webp": "./assets/v3/room_bedroom_rain_evening.webp",
  "./assets/v3/sd_bedroom_night_clear.webp": "./assets/v3/room_bedroom_night_clear.webp",
  "./assets/v3/sd_bedroom_dawn_mist.webp": "./assets/v3/room_bedroom_dawn_mist.webp",
  "./assets/v3/sd_bedroom_morning_sun.webp": "./assets/v3/room_bedroom_morning_sun.webp",

  // 8 эмоциональных и костюмных спрайтов Маши (Dispatch / Invincible style)
  "./assets/v3/sd_spr_masha_coat_guarded.webp": "./assets/v2/spr_masha_coat_smile.webp",
  "./assets/v3/sd_spr_masha_coat_warm.webp": "./assets/v2/spr_masha_coat_smile.webp",
  "./assets/v3/sd_spr_masha_cafe_warm.webp": "./assets/v2/spr_masha_warm_smile.webp",
  "./assets/v3/sd_spr_masha_cafe_tease.webp": "./assets/v2/spr_masha_playful_tease.webp",
  "./assets/v3/sd_spr_masha_cafe_nervous.webp": "./assets/v2/spr_masha_nervous_lie.webp",
  "./assets/v3/sd_spr_masha_cafe_sad.webp": "./assets/v2/spr_masha_warm_smile.webp",
  "./assets/v3/sd_spr_masha_night_sapphire.webp": "./assets/v2/spr_masha_night_dress.webp",
  "./assets/v3/sd_spr_masha_towel_flirt.webp": "./assets/v2/spr_masha_morning_towel.webp",

  // Ключевые исправленные и многоракурсные сюжетные кадры v3
  "./assets/v3/sd_intro2_trolleybus_temple.webp": "./assets/v2/cg_intro2_trolleybus_mc.webp",
  "./assets/v3/sd_intro3_masha_reveal_clean.webp": "./assets/v2/cg_intro3_masha_reveal.webp",
  "./assets/v3/sd_intro3_hug_clean.webp": "./assets/v2/cg_intro3_hug_awkward.webp",
  "./assets/v3/sd_intro5_01_doorway_wide.webp": "./assets/v2/cg_intro5_night_return.webp",
  "./assets/v3/sd_intro5_02_low_heels_hem.webp": "./assets/v2/cg_intro5_night_return.webp",
  "./assets/v3/sd_intro5_03_sofa_lashes_pov.webp": "./assets/v2/cg_intro5_night_return.webp",
  "./assets/v3/sd_intro5_04_window_silhouette_ots.webp": "./assets/v2/cg_intro5_sleep_silhouette.webp",
  "./assets/v3/sd_intro5_05_macro_spine_zipper.webp": "./assets/v2/cg_intro5_sleep_silhouette.webp",
  "./assets/v3/sd_intro5_06_low_silk_stockings.webp": "./assets/v2/cg_intro5_sleep_silhouette.webp",
  "./assets/v3/sd_intro5_07_glass_reflection.webp": "./assets/v2/cg_intro5_sleep_silhouette.webp",
  "./assets/v3/sd_intro5_08_cards_table_pov.webp": "./assets/v2/cg_intro5_awake_sofa.webp",
  "./assets/v3/sd_intro6_01_shower_door_ajar.webp": "./assets/v2/cg_intro6_shower_steam.webp",
  "./assets/v3/sd_intro6_02_shower_low_angle.webp": "./assets/v2/cg_intro6_shower_steam.webp",
  "./assets/v3/sd_intro6_03_shower_high_angle.webp": "./assets/v2/cg_intro6_shower_steam.webp",
  "./assets/v3/sd_intro6_04_shower_steamy_mirror.webp": "./assets/v2/cg_intro6_shower_steam.webp"
};

export function buildPrologueScript() {
  return {
    // =========================================================================
    // INTRO_1: ПРОХОДНАЯ ИНТЕРНАТА, КАТЯ И ЗВОНОК МАШЕ
    // =========================================================================
    Intro_1: [
      {
        location: "ПРОХОДНАЯ ИНТЕРНАТА • 08:45",
        bg: "./assets/v2/bg_orphanage_gates.webp",
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        ambience: "rain",
        role: "narrator",
        text: "Казённое окошко на проходной интерната. Пожилая женщина-комендант со стуком ставит фиолетовую печать на справку о выпуске и пододвигает её по исцарапанному пластику вместе с тощим конвертом подъёмных. За окном сеет мелкий октябрьский дождь."
      },
      {
        role: "komendant",
        speaker: "Комендант",
        text: "Расписывайся в ведомости, Соколов. Направление во временное общежитие в Текстильщиках действительно с понедельника, раньше коек нет. Документы не посей — восстанавливать никто не побежит."
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
        fx: "door",
        role: "narrator",
        text: "Тяжёлая металлическая дверь проходной закрывается за спиной с глухим лязгом магнитного замка. Мокрое крыльцо, потёртый тёмный рюкзак на одном плече и холодный воздух с запахом прелой листвы и сырого асфальта."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Вот так буднично и заканчиваются двенадцать лет казённой жизни. Ни фанфар, ни красной дорожки — только серая московская морось за воротами, пачка справок во внутреннем кармане да ключи от ниоткуда."
      },
      {
        bg: "./assets/v2/cg_intro1_doc_watch.webp",
        video: "./assets/v2/vid_10_doc_watch.mp4",
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        role: "narrator",
        text: "Под манжетой куртки на запястье видны старые мужские механические часы в стальном корпусе с тонкой трещиной на стекле. Стрелки замерли на без четверти девять."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "И старые отцовские часы. Единственная вещь, которую мне не дали отобрать в приёмнике, когда мне было шесть. Стекло треснуло, пружина давно лопнула, но снимать их с руки почему-то всё равно что предать самого себя."
      },
      {
        bg: "./assets/v2/bg_orphanage_gates.webp",
        fxShader: "rain_exterior",
        role: "narrator",
        text: "У пустой стеклянной остановки за чугунными воротами внезапно раздаётся шорох гравия и быстрый топот кед по лужам."
      },
      {
        bg: "./assets/v2/cg_intro1_katya_farewell.webp",
        video: "./assets/v2/vid_09_katya_farewell.mp4",
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Соколов! Тормози, бессовестный!"
      },
      {
        role: "narrator",
        text: "Под козырёк остановки влетает запыхавшаяся Катя: дутая куртка болотного цвета с чужого плеча, две растрёпанные русые косички из-под вязаной шапки и густо запотевшие круглые очки в массивной роговой оправе. Стянув их на секунду, она щурит огромные лучистые серо-зелёные глаза с тонкими, породистыми чертами лица — и тут же смущённо возвращает оправу на переносицу."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Катька? Ты чего без зонта через забор махнула, у вас же сейчас первый час информатики?"
      },
      {
        bg: "./assets/v2/bg_orphanage_gates.webp",
        sprite: "./assets/v2/spr_katya_rain.webp",
        fxShader: "rain_exterior",
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Да ну её к лешему, эту информатику! Я там системники ещё на прошлой неделе сама перебрала. А ты реально собирался тихо улизнуть в город и даже не попрощаться?!"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Я заходил к женскому корпусу, дежурная буркнула, что вашу группу закрыли на уборку. Не орать же мне под окнами директрисы."
      },
      {
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Ой, ладно, засчитано за слабое оправдание. На вот, руку давай. Быстро, пока я не передумала!"
      },
      {
        bg: "./assets/v2/cg_intro1_katya_farewell.webp",
        video: "./assets/v2/vid_09_katya_farewell.mp4",
        sprite: null,
        fx: "cloth",
        role: "narrator",
        text: "Катя с напускной суровостью вкладывает в ладонь {mc_gen} аккуратно сплетённый из чёрного паракорда ремешок-тренчик с маленьким латунным карабином. Её тонкие пальцы ледяные от дождя и чуть дрожат."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Это что?"
      },
      {
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Страховочный ремешок под корпус твоих часов. Ты же вечно за замок браслета цепляешься — потеряешь в метро в первый же день, будешь потом локти кусать. А мне тут ещё до апреля куковать, следить за тобой некому."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Вот же чудо в перьях… Полночи, небось, с фонариком под одеялом плела, чтобы воспиталка не спалила. И ведь искренне считает себя «серой мышью в очках», хотя стоит ей умыться и снять этот мешок с плеч — парни на улице шеи сворачивать будут."
      },
      {
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Чего молчишь и смотришь так странно? Если стрёмный — выброси за углом, я не обижусь."
      },
      {
        choices: [
          {
            text: "Притянуть Катю за плечи, поправить съехавшие очки и крепко обнять",
            onPick: (s, api) => {
              s.flags.katya_warm_start = true;
              api.addItem("katya_strap");
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
            text: "Тепло улыбнуться, надеть ремешок при ней и бережно согреть её ладони",
            onPick: (s, api) => {
              s.flags.katya_warm_start = true;
              api.addItem("katya_strap");
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
        role: "narrator",
        text: "{mc} делает шаг вплотную под узкий козырёк остановки, двумя пальцами бережно поправляет очки на её переносице и притягивает Катю к себе, укрывая от косого ветра полами своей куртки. Катя замирает, уткнувшись носом ему в ключицу, её уши под шапкой мгновенно вспыхивают румянцем."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Только попробуй ещё раз назвать свою работу стрёмной. Сидит как влитой. Как только закреплюсь в Москве — первым делом вытащу тебя в выходной есть нормальное мороженое на набережной. Замётано?"
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
        role: "narrator",
        text: "{mc} тут же продевает ремешок на запястье, а затем осторожно накрывает холодные пальцы Кати своими ладонями, согревая дыханием. Катя от неожиданности моргает за каплями на стёклах очков и прячет смущённую улыбку в воротник."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Спасибо, Кать. Честно — это лучший подарок за все годы в этих стенах. Я без тебя тут вообще бы одичал."
      },
      {
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Ой, не начинай разводить сырость, её на улице и так по колено! Главное — устройся по-человечески и напиши мне вечером, как добрался. Я же волноваться буду."
      },
      { goto: "Intro_1_after_katya" }
    ],

    Intro_1_after_katya: [
      {
        bg: "./assets/v2/bg_orphanage_gates.webp",
        sprite: "./assets/v2/spr_katya_rain.webp",
        fxShader: "rain_exterior",
        role: "narrator",
        text: "Вдалеке из пелены дождя выплывают жёлтые фары подходящего к окраине троллейбуса. Катя спохватывается и пятится к калитке."
      },
      {
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Всё, бегу, а то вахтёрша сейчас тревогу поднимет! Кстати, {mc_dim}… Я сегодня вечером дежурю в учебной канцелярии — попробую одним глазом глянуть в архивном шкафу твою старую папку при поступлении. Вдруг там осталась хоть какая-то зацепка про твоего отца?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Будь осторожна, не подставляйся лишний раз. До связи, Кать!"
      },
      {
        bg: "./assets/v2/bg_orphanage_gates.webp",
        sprite: null,
        fxShader: "rain_exterior",
        role: "narrator",
        text: "Катя машет рукой и скрывается за мокрыми клёнами. Оставшись под козырьком один, {mc} достаёт из кармана треснувший старый смартфон и разворачивает смятый листок бумаги с единственным выписанным от руки номером."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Ладно, выдохнули. До понедельника ночевать мне негде, а в этом огромном городе есть только один человек из той, настоящей жизни. Моя сводная сестра Маша. Точнее, номер её старого телефона, который мне полгода назад по секрету передала бывшая соседка по нашему старому дому."
      },
      {
        fx: "phone_ring",
        role: "narrator",
        text: "Идут длинные гудки. На четвёртом вызов принимают — в трубке слышен мягкий фоновый джаз, звон фарфора и негромкий, грудной, завораживающе взрослый женский голос."
      },
      {
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
        text: "Допустим, Мария. А с кем я говорю и откуда у вас мой личный номер?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Маш, не клади трубку, пожалуйста… Это я. {mc}. {mc_dim_k}…"
      },
      {
        role: "narrator",
        text: "В трубке повисает звенящая трёхсекундная тишина — даже шум кофемашины на том конце словно стихает. Когда Маша отвечает снова, её голос становится ледяным, собранным и колючим, как сталь."
      },
      {
        role: "masha",
        speaker: "Маша (по телефону)",
        text: "Так. Очень остроумно. Кто тебя надоумил так шутить? Если ты от Вадима или очередные пробивщики решили поиграть на старых нервах — передай заказчику, что вы перешли грань."
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
        text: "У меня нет никаких доказательств, что ты не аферист с купленной базой данных. Назови за пять секунд одну вещь из нашей детской на третьем этаже, о которой не знала даже моя мать. Время пошло."
      },
      {
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Сердце ухает куда-то под рёбра. Детская на третьем этаже… Двухъярусная кровать у окна, скрипящая половица и наш общий секрет!"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Жёлтая жестяная банка из-под монпансье за батареей! Мы прятали туда фантики и твой молочный зуб, чтобы мышка принесла нам денег на собаку!"
      },
      {
        role: "narrator",
        text: "На том конце раздаётся короткий, сбитый вдох — будто у неё разом перехватило горло. Строгий тон даёт едва заметную трещину."
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
        text: "Записывай адрес: Малая Бронная, кофейня на углу у сквера. Буду ждать тебя ровно через полтора часа у входа. Приедешь — посмотрю тебе в глаза и решу, верить или нет. Не промокни."
      },
      {
        fx: "door",
        role: "narrator",
        text: "Короткие гудки. Двери подъехавшего троллейбуса с шипением распахиваются перед {mc_ins}, обдавая тёплым светом салона."
      },
      { goto: "Intro_2" }
    ],

    // =========================================================================
    // INTRO_2: ВЕЧЕРНИЙ ТРОЛЛЕЙБУС, ФЛЕШБЭК И КОМЕДИЙНАЯ ФАНТАЗИЯ
    // =========================================================================
    Intro_2: [
      {
        location: "ТРОЛЛЕЙБУС • СУМЕРКИ",
        bg: "./assets/v2/cg_intro2_trolleybus_mc.webp",
        video: "./assets/v2/vid_01_trolleybus.mp4",
        cam: "zoom-slow",
        fxShader: "trolleybus_glass",
        ambience: "trolleybus",
        role: "narrator",
        text: "Полупустой салон троллейбуса идёт сквозь сумерки и московский дождь. {mc} сидит у заднего окна, прислонившись виском к холодному стеклу, по которому наискось бегут светящиеся ручьи от фар встречных машин и красных стоп-сигналов."
      },
      {
        bg: "./assets/v2/bg_trolleybus_interior.webp",
        video: null,
        fxShader: "trolleybus_glass",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Мокрая Москва за окном постепенно меняет декорации: серые панельные окраины и развязки уступают место сталинским фасадам, тёплым витринам и отражениям неона в чёрном асфальте."
      },
      {
        bg: "./assets/v2/cg_intro2_trolleybus_mc.webp",
        video: "./assets/v2/vid_01_trolleybus.mp4",
        fxShader: "trolleybus_glass",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Двенадцать лет… Странная штука память: лица взрослых почти стёрлись, а обрывки того последнего года всплывают так ярко, будто это было вчера."
      },
      {
        location: "ВОСПОМИНАНИЕ • 12 ЛЕТ НАЗАД",
        bg: "./assets/v2/cg_intro2_flashback_sepia.webp",
        video: null,
        cam: "sepia",
        fxShader: "none",
        role: "narrator",
        text: "Узкий коридор старой московской квартиры. Шестилетний {mc} сидит на маленьком стульчике с застёгнутым до подбородка воротником и рюкзачком на коленях. Над ним стоит высокая, безупречно причёсанная женщина с ледяным лицом — мама Маши, Вероника. В дверях комнаты рыдает десятилетняя белокурая девочка, пытаясь вырвать руку."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Мы с Машей никогда не были родными по крови. Моя настоящая мама умерла, когда я едва научился ходить, и спустя пару лет отец сошёлся с Вероникой — ухоженной, гордой женщиной, у которой от первого брака уже росла десятилетняя дочка Машка."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "По документам — чужие дети от разных родителей под одной крышей. По жизни — Машка с первого дня взяла надо мной шефство: таскала за руку на горку, отбирала у дворовых хулиганов мою шапку и по вечерам шёпотом читала мне сказки со второго яруса кровати."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "А потом в один осенний вечер отец просто не вернулся домой. Вместе с ним из квартиры бесследно исчезли все отложенные деньги Вероники. Кто-то из соседей шептался, что батя пустился в бега с чужой кассой, кто-то — что просто бросил нас обоих."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Вероника не стала тянуть на себе чужого ребёнка без копейки за душой и смотреть каждый день в глаза маленькой копии человека, который разрушил её жизнь. Я до сих пор помню, как Машка кричала с лестничной клетки: «Мама, не отдавай {mc_acc_short}!», пока за мной захлопывалась дверь казённой машины."
      },
      {
        location: "ТРОЛЛЕЙБУС • ЦЕНТР",
        bg: "./assets/v2/cg_intro2_trolleybus_mc.webp",
        video: "./assets/v2/vid_01_trolleybus.mp4",
        cam: "zoom-slow",
        fxShader: "trolleybus_glass",
        role: "narrator",
        text: "Лёгкая тряска на стыке асфальта возвращает в реальность троллейбусного салона. {mc} переводит дыхание и невольно касается пальцами промокшего воротника."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Ладно, хватит бередить старые раны. Лучше подумать о насущном: я еду в самый центр Москвы на встречу с двадцатидвухлетней девушкой, а весь мой опыт общения с женским полом — это перепалки с Катькой у кулера да красные уши от любого случайного прикосновения."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Интересно, какой вообще выросла Машка после того, как жизнь так жёстко прошлась по нашей семье?"
      },
      {
        choices: [
          {
            text: "Представить скромную отличницу-библиотекаршу в вязаном кардигане",
            onPick: (s) => {
              s.flags.intro2_fantasy = "librarian";
            },
            goto: "Intro_2_fantasy_a"
          },
          {
            text: "Представить замученную офисную труженицу с пакетами и вечным недосыпом",
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
        bg: "./assets/v2/cg_intro2_fantasy_librarian.webp",
        video: null,
        cam: "zoom-slow",
        fxShader: "none",
        role: "narrator",
        text: "В тёплой дымке воображения возникает предельно целомудренная картина: на фоне книжных стеллажей стоит смешная версия «Маши» — в глухой серой водолазке под горло, бесформенном бабушкином кардигане до колен, с тугим пучком на макушке и огромным томом бухгалтерского учёта, прижатым к груди."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Ну да, сто процентов так и есть: тихая домашняя пай-девочка, пьёт ромашковый чай, боится сквозняков и к десяти вечера уже видит третий сон. Зато с такой точно не придётся сгорать со стыда за свои дешёвые кроссовки!"
      },
      { goto: "Intro_2_arrive" }
    ],

    Intro_2_arrive_office_bridge: [{ goto: "Intro_2_arrive" }],

    Intro_2_fantasy_b: [
      {
        bg: "./assets/v2/cg_intro2_fantasy_office.webp",
        video: null,
        cam: "zoom-slow",
        fxShader: "none",
        role: "narrator",
        text: "Воображение рисует бледную, взъерошенную девушку в растянутом свитере и пуховике — с термокружкой в одной руке и пухлой папкой квартальных отчётов в другой она зевает во весь рот у офисного принтера."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "После того, как мой отец оставил их с матерью без гроша, сладкой жизни ей точно ждать было неоткуда. Наверняка крутится на двух обычных работах за скромный оклад и считает дни до выходных. Своя, простая — поймёт с полуслова."
      },
      { goto: "Intro_2_arrive" }
    ],

    Intro_2_arrive: [
      {
        location: "БУЛЬВАРНОЕ КОЛЬЦО • 20:20",
        bg: "./assets/v2/cg_intro2_trolleybus_mc.webp",
        video: "./assets/v2/vid_01_trolleybus.mp4",
        fxShader: "trolleybus_glass",
        fx: "brakes",
        shake: true,
        joltGlass: true,
        role: "narrator",
        text: "Резкий визг тормозов обрывает фантазию: троллейбус причаливает к остановке у сияющего вечерними огнями бульвара. За стеклом горят тёплые гирлянды ресторанов, проплывают чёрные представительские седаны и спешат нарядные прохожие под зонтами."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Приехали. До кофейни на Малой Бронной двести метров пешком. Руки предательски холодеют — ну же, Соколов, соберись, это ведь просто твоя старшая сестрёнка из детства!"
      },
      { goto: "Intro_3" }
    ],

    // =========================================================================
    // INTRO_3: МАЛАЯ БРОННАЯ, ВОПРОС-ЛОВУШКА ПРО СОЧИ И ХАБ В КОФЕЙНЕ
    // =========================================================================
    Intro_3: [
      {
        location: "МАЛАЯ БРОННАЯ • 20:30",
        bg: "./assets/v3/sd_intro3_masha_reveal_clean.webp",
        video: null,
        sprite: null,
        cam: "pan-up-reveal",
        fxShader: "rain_exterior",
        ambience: "cafe",
        role: "narrator",
        text: "Тихий переулок у Патриарших. Мокрая брусчатка блестит золотом от тёплых бра кофейни. У панорамной витрины под широким чёрным маркизом стоит ослепительная молодая женщина: высокие замшевые сапоги на каблуке, распахнутое кашемировое пальто цвета топлёного молока, мягкий трикотаж по тонкой талии, золотисто-русые волны по плечам, золотые кольца в ушах и бархатная лента-чокер на шее."
      },
      {
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Я замираю посреди тротуара так резко, что прохожий сзади едва не задевает меня зонтом. Воздух застревает где-то в грудной клетке."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Это… кто вообще? Девушка из рекламы дорогого парфюма? Проезжающие мимо водители притормаживают у бордюра, просто чтобы лишнюю секунду проводить её взглядом. Наверное, я перепутал вход — моя Машка должна стоять где-нибудь скромно за углом…"
      },
      {
        role: "narrator",
        text: "Маша убирает телефон в сумочку, поднимает голову и ловит растерянный взгляд {mc_gen} ярко-голубыми, чуть раскосыми глазами. Она делает полшага навстречу, но не улыбается, а внимательно, цепко изучает его лицо."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Погоди-ка… Серый взгляд исподлобья и вечная привычка прятать подбородок в воротник, когда нервничаешь. {mc}?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "М-маша?.. Это правда ты?!"
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "У меня в голове рассыпаются в пыль все мои жалкие троллейбусные фантазии про «бабушкин кардиган». Передо мной стоит настолько ослепительная женщина, что мне хочется провалиться сквозь мокрую плитку вместе со своим полинявшим рюкзаком."
      },
      {
        bg: "./assets/v2/bg_malaya_bronnaya_ext.webp",
        sprite: "./assets/v3/sd_spr_masha_coat_guarded.webp",
        fxShader: "rain_exterior",
        role: "masha",
        speaker: "Маша",
        text: "Не спеши радоваться, молодой человек. Сходство сходством, а Москва быстро отучает верить на слово. Давай последний контрольный вопрос — и тогда решим, пить нам кофе или звать полицию."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Напомни-ка мне, в какой пансионат под Сочи нас с тобой возил твой папа в то последнее лето перед школой? В «Волну» или в «Лазурный»?"
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Стоп. Она смотрит на меня в упор и ждёт, где я споткнусь. В голове мелькают картины того жаркого августа: раскалённый гудрон на крышах гаражей за домом, два стаканчика подтаявшего пломбира за копейки и белый мел у Машки на ладонях…"
      },
      {
        choices: [
          {
            text: "Усмехнуться: «Ни в какой. Мы сидели в Москве, а море ты рисовала мелом за гаражами»",
            onPick: (s, api) => {
              s.flags.kinship_proven = true;
              api.changeStats({ loyalty: 1 }, ["Доверие Маши выросло"]);
            },
            goto: "Intro_3_trap_pass"
          },
          {
            text: "Замяться от волнения: «Кажется, в Лазурный… хотя я был совсем мелкий»",
            onPick: (s, api) => {
              s.flags.kinship_proven = false;
              api.toast("Маша заметила заминку в ответе", "neutral");
            },
            goto: "Intro_3_trap_slip"
          }
        ]
      }
    ],

    Intro_3_trap_pass: [
      {
        role: "narrator",
        text: "Лицо Маши меняется в одно мгновение: холодная светская маска осыпается без следа, ярко-голубые глаза влажно вспыхивают в свете витрины, а уголки губ мелко вздрагивают."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Хорошая попытка подловить, Маш. Денег на юг у родителей тогда не хватило — мы всё лето проторчали во дворе, ели один пломбир на двоих, и ты ещё заехала мне качелями вот сюда, в бровь, когда показывала, как прыгать «солнышком»."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Ах ты паршивец глазастый… Шрам до сих пор остался!"
      },
      { goto: "Intro_3_hug" }
    ],

    Intro_3_trap_slip: [
      {
        role: "narrator",
        text: "Маша разочарованно прищуривается и делает полшага назад, её взгляд снова настораживается. Спохватившись, {mc} торопливо оттягивает рукав куртки, показывая треснутые часы отца и белую отметину у брови."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Мимо. Мы вообще ни разу в жизни не были на море. Плохо подготовился?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Прости, я просто дико растерялся рядом с тобой… Смотри — это же папины часы, с которыми он забирал нас из парка, и шрам от тех зелёных качелей во дворе, когда ты меня нечаянно задела и потом полчаса дула на лоб!"
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Часы дяди Вити… И та самая отметина у брови. Фух, напугал до чёртиков — я уж решила, совсем чужой человек пришёл."
      },
      { goto: "Intro_3_hug" }
    ],

    Intro_3_hug: [
      {
        bg: "./assets/v3/sd_intro3_hug_clean.webp",
        video: "./assets/v2/vid_11_hug_awkward.mp4",
        videoMode: "once",
        sprite: null,
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        fx: "cloth",
        role: "narrator",
        text: "В следующую секунду Маша подаётся вперёд и без всякого светского лоска порывисто, крепко прижимается к {mc_dat}, обвивая ладонями его шею."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Живой… Мелкий, какой же ты высоченный вымахал! Я же тебе теперь макушкой едва до подбородка достаю!"
      },
      {
        fx: "heartbeat",
        role: "narrator",
        text: "Лицо {mc_gen} заливается густой краской. Кашемировое пальто Маши распахивается, обдавая шлейфом дорогих цветочных духов с ноткой горького миндаля и живым теплом её тела. Его руки неловко зависают в сантиметре от её тонкой талии, прежде чем он решается осторожно коснуться её спины."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Катастрофа… Мой пульс сейчас пробьёт звуковой барьер. В воспоминаниях она осталась худенькой десятилетней девчонкой со сбитыми коленками, а в реальности ко мне прижимается роскошная взрослая женщина, от которой у меня напрочь отключается речь!"
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Да обними ты нормально, чего застыл как солдатик на плацу! Или уши замёрзли? Пошли скорее внутрь, у тебя куртка насквозь сырая."
      },
      {
        location: "КОФЕЙНЯ НА БРОННОЙ • 20:45",
        bg: "./assets/v2/bg_cafe_malaya_bronnaya.webp",
        sprite: "./assets/v2/spr_masha_warm_smile.webp",
        cam: "zoom-slow",
        fxShader: "none",
        role: "narrator",
        text: "Тихий полумрак дальнего углового дивана: на мраморном столике дымятся две чашки капучино и горит свеча в матовом стакане. Скинув пальто, Маша подпирает щёку ладонью и с тёплым, чуть грустным любопытством разглядывает брата."
      },
      {
        sprite: "./assets/v2/spr_masha_warm_smile.webp",
        role: "masha",
        speaker: "Маша",
        text: "Сижу, смотрю на тебя — и не верится. Глаза один в один отцовские, серьёзные такие, глубокие. Рассказывай, как ты вообще нашёл мой номер через столько лет?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Тётя Валя со второго этажа нашего старому дома помогла. Я написал ей письмо весной, а она ответила, что случайно встретила тебя пару лет назад у аптеки и записала телефон. Я до последнего боялся звонить… Думал, ты вообще не захочешь вспоминать нашу семью."
      },
      {
        sprite: "./assets/v2/spr_masha_warm_smile.webp",
        role: "masha",
        speaker: "Маша",
        text: "Дурак ты, {mc_dim}. Большой, а всё такой же глупый. Спрашивай давай всё, что копилось эти годы, — я от тебя прятаться не собираюсь."
      },
      { goto: "Intro_3_cafe_hub" }
    ],

    Intro_3_cafe_hub: [
      {
        bg: "./assets/v2/bg_cafe_malaya_bronnaya.webp",
        sprite: "./assets/v2/spr_masha_warm_smile.webp",
        fxShader: "none",
        dynamicChoices: (state) => {
          const asked = state.flags.cafeTopics || {};
          const choices = [];

          if (!asked.veronika) {
            choices.push({
              text: "Спросить про маму Маши и почему оборвалась связь: «Как вы жили после того дня?»",
              onPick: (s) => {
                s.flags.cafeTopics = { ...(s.flags.cafeTopics || {}), veronika: true };
              },
              goto: "Intro_3_topic_veronika"
            });
          }

          if (!asked.father) {
            choices.push({
              text: "Показать старые часы: «Ты ничего не знаешь о том, куда исчез мой отец?»",
              onPick: (s, api) => {
                s.flags.cafeTopics = { ...(s.flags.cafeTopics || {}), father: true };
                api.addClue("clue_father_week");
              },
              goto: "Intro_3_topic_father"
            });
          }

          if (!asked.job) {
            choices.push({
              text: "Кивнуть на её столичный образ: «А ты сама чем сейчас занимаешься в Москве?»",
              onPick: (s, api) => {
                s.flags.cafeTopics = { ...(s.flags.cafeTopics || {}), job: true };
                api.addClue("clue_realtor_cover");
              },
              goto: "Intro_3_topic_job"
            });
          }

          if (asked.veronika && asked.father && asked.job) {
            choices.push({
              text: "Допить остывший кофе: «Спасибо, что пришла, Маш. Мне пора до закрытия метро…»",
              goto: "Intro_3_depart"
            });
          }

          return choices;
        }
      }
    ],

    Intro_3_topic_veronika: [
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Маш… Я ведь тогда в шесть лет толком ничего не понял. Помню только, как твоя мама привезла меня в приёмник и больше ни разу не приехала. Вы потом уехали из Москвы?"
      },
      {
        sprite: "./assets/v2/spr_masha_warm_smile.webp",
        role: "masha",
        speaker: "Маша",
        text: "На полгода уезжали к бабушке в Тверь — мама продала ту квартиру почти за бесценок, чтобы раздать долги по счетам. Я первое время каждый вечер ревела в подушку и просила забрать тебя обратно… Но мама отрезала как ножом: «Чужая кровь, чужая беда, у меня нет сил тянуть двоих»."
      },
      {
        sprite: "./assets/v2/spr_masha_warm_smile.webp",
        role: "masha",
        speaker: "Маша",
        text: "А когда мне исполнилось восемнадцать и я сама пошла в органы опеки искать тебя — меня даже на порог архива не пустили. По закону-то наши родители даже не успели усыновление оформить: разные фамилии, ноль родства на бумаге. Для чиновников я была тебе просто посторонней девочкой с улицы."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "А твоя мама сейчас где? Вы общаетесь?"
      },
      {
        sprite: "./assets/v2/spr_masha_playful_tease.webp",
        role: "masha",
        speaker: "Маша",
        text: "Вероника Павловна у нас теперь дама из высшего общества — четыре года назад удачно вышла замуж за владельца сети клиник, живёт в загородном посёлке на Новой Риге. Красивая, ледяная, звонит мне раз в месяц сделать замечание о моём образе жизни. У нас с ней… скажем так, вежливый нейтралитет."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Значит, Вероника устроила свою судьбу и вычеркнула прошлое без тени сожаления. И в то же время внутри странно кольнуло от слов самой Маши: юридически и по крови между нами действительно нет вообще ничего общего — только память из далёкого детства."
      },
      { goto: "Intro_3_cafe_hub" }
    ],

    Intro_3_topic_father: [
      {
        fx: "tap",
        role: "narrator",
        text: "{mc} расстёгивает карабин нового паракордового ремешка и кладёт потёртые часы отца на столик между чашками. Маша осторожно касается кончиками пальцев треснутого стекла."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Все эти годы в интернате мне не давала покоя одна мысль, Маш. Воспитатели шептались за спиной, что батя просто бросил меня и сбежал с вашими деньгами. Но он же пылинки с нас обоих сдувал… Неужели он правда оказался таким подлецом?"
      },
      {
        sprite: "./assets/v2/spr_masha_warm_smile.webp",
        role: "masha",
        speaker: "Маша",
        text: "Я не знаю всей правды, {mc_dim}. Честно. В ту последнюю неделю дядя Витя ходил сам не свой — почти не спал, кому-то звонил с лестничной площадки и проверял замки по три раза за ночь. А потом мама открыла шкатулку с деньгами на новую квартиру — а там пусто, и его документов след простыл."
      },
      {
        sprite: "./assets/v2/spr_masha_warm_smile.webp",
        role: "masha",
        text: "Может, он во что-то вляпался по работе, может, его прижали не те люди… Но с того вечера от него не пришло ни строчки, ни перевода. Словно человек шагнул в туман и растворился."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "В груди становится тяжело и горько. Из-за моего отца две женщины остались без гроша посреди Москвы, мама Маши ожесточилась, а нам с Машкой пришлось взрослеть в одиночку. Клянусь: раз уж я вышел за эти ворота — я переверну город, но узнаю, жив он или мёртв и почему предал нас."
      },
      { goto: "Intro_3_cafe_hub" }
    ],

    Intro_3_topic_job: [
      {
        sprite: "./assets/v2/spr_masha_nervous_lie.webp",
        fx: "phone_buzz",
        role: "narrator",
        text: "Маша едва заметно вздрагивает ресницами, её пальцы машинально касаются бархатной ленты на шее. В эту же секунду в её открытой сумочке глухо вибрирует второй телефон в тёмном матовом чехле."
      },
      {
        sprite: "./assets/v2/spr_masha_nervous_lie.webp",
        role: "masha",
        speaker: "Маша",
        text: "А? Я-то?.. Ой, да самая обычная московская круговерть! Работаю брокером по элитной недвижимости. Пентхаусы, клубные дома, видовые этажи в Москва-Сити…"
      },
      {
        bg: "./assets/v2/cg_intro3_secret_call.webp",
        video: "./assets/v2/vid_03_secret_call.mp4",
        videoMode: "once",
        cam: "zoom-slow",
        sprite: null,
        role: "narrator",
        text: "Быстрым, отточенным движением Маша достаёт второй iPhone, бросает секундный взгляд на вспыхнувшее уведомление и тут же кладёт аппарат экраном вниз возле салфетки, натянуто улыбаясь брату."
      },
      {
        bg: "./assets/v2/bg_cafe_malaya_bronnaya.webp",
        sprite: "./assets/v2/spr_masha_nervous_lie.webp",
        role: "masha",
        speaker: "Маша",
        text: "Сама себе хозяйка, процент со сделок хороший, вот и приоделась немного. Просто клиенты в моём сегменте сплошь капризные, занятые мужчины — днём у них советы директоров, поэтому показы вечно назначают на поздний вечер или в закрытых ресторанах… Приходится соответствовать дресс-коду!"
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Я вырос в месте, где врать учились раньше, чем читать по слогам. И когда человек при простом вопросе о работе начинает частить, прячет экран второго телефона и оправдывается за вечерние встречи с «занятыми мужчинами» — внутри зажигается очень нехороший красный фонарь."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Только давить на неё сейчас я не имею никакого права. Мы не виделись двенадцать лет."
      },
      { goto: "Intro_3_cafe_hub" }
    ],

    Intro_3_depart: [
      {
        sprite: "./assets/v2/spr_masha_playful_tease.webp",
        fx: "cloth",
        role: "narrator",
        text: "{mc} отодвигает пустую чашку и тянется к лямке своего рюкзака. Маша мгновенно накрывает его запястье своей тёплой мягкой ладонью, не давая подняться."
      },
      {
        sprite: "./assets/v2/spr_masha_playful_tease.webp",
        role: "masha",
        speaker: "Маша",
        text: "Стоять на месте, Соколов. Какое ещё метро в десятом часу под проливным дождём? Куда ты сейчас поедешь — колись мне прямо в глаза."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Ну… У меня направление в общагу в Текстильщиках, правда, заселение только в понедельник. Ничего страшного, переночую пару суток в каком-нибудь хостеле у вокзала, подъёмных хватит."
      },
      {
        sprite: "./assets/v2/spr_masha_playful_tease.webp",
        role: "masha",
        speaker: "Маша",
        text: "Ты с ума сошёл?! В привокзальном клоповнике в день своего совершеннолетия, при живой-то старшей сестре в Москве?! Даже слышать ничего не желаю — берёшь свой рюкзак и едешь ко мне."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Маш, ну ты чего, неудобно же! Мы столько лет не виделись, у тебя своя взрослая жизнь, а тут я свалюсь как снег на голову…"
      },
      {
        sprite: "./assets/v2/spr_masha_warm_smile.webp",
        role: "masha",
        speaker: "Маша",
        text: "Цыц, я на четыре года старше, со мной спорить бесполезно! У меня в гостиной диван размером с взлётную полосу, места вагон. Только…"
      },
      {
        sprite: "./assets/v2/spr_masha_nervous_lie.webp",
        role: "narrator",
        text: "Маша вдруг осекается на полуслове и прикусывает нижнюю губу, словно в последнюю секунду вспомнив какую-то деталь у себя дома, от которой ей становится жарко."
      },
      {
        sprite: "./assets/v2/spr_masha_nervous_lie.webp",
        role: "masha",
        speaker: "Маша",
        text: "Только чур без глупых вопросов и по комнатам без спроса не разгуливать, договорились? Я с утра убегала в дикой спешке и не рассчитывала, что сегодня ко мне приедут гости… Вызываю нам такси!"
      },
      { goto: "Intro_4" }
    ],

    // =========================================================================
    // INTRO_4: АПАРТАМЕНТЫ НА ПРЕСНЕ (32 ЭТАЖ) → ДЕТЕКТИВНАЯ ПЕСОЧНИЦА
    // =========================================================================
    Intro_4: [
      {
        location: "ПРЕСНЯ, 32 ЭТАЖ • 22:05",
        bg: "./assets/v2/cg_intro4_penthouse_arrival.webp",
        video: "./assets/v2/vid_12_penthouse_arrival.mp4",
        videoMode: "once",
        sprite: null,
        cam: "zoom-slow",
        fxShader: "moscow_city_night",
        ambience: "penthouse",
        fx: "lock_beep",
        role: "narrator",
        text: "Бесшумный скоростной лифт поднимается на тридцать второй этаж жилого небоскрёба на Пресне. Щелчок биометрического замка — и перед {mc_ins} распахивается полутёмное пространство дизайнерских апартаментов. Во всю стену гостиной горят мокрые от дождя панорамные окна, за которыми как на ладони сияют стеклянные гиганты Москва-Сити."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Ничего себе… Маш, тут вид как из кабины самолёта! И это всё твоя квартира?"
      },
      {
        bg: "./assets/v2/bg_penthouse_living_moscow.webp",
        sprite: "./assets/v2/spr_masha_nervous_lie.webp",
        role: "masha",
        speaker: "Маша",
        text: "Эм… Ну не совсем моя в собственности — подруга детства улетела жить в Дубай, а я снимаю у неё по старой дружбе и присматриваю за порядком! Ты разувайся, проходи на свет, только дай мне буквально две минуты прибрать вещи…"
      },
      {
        sprite: null,
        role: "narrator",
        text: "Взгляд {mc_gen} невольно выхватывает три быстрых акцента: в прихожей у зеркала стоит узкая фирменная коробка из ЦУМа с алыми лентами и витает тонкий шлейф мужского табачного парфюма; на столике в гостиной — открытая бутылка красного вина и два хрустальных бокала; а Маша пулей проскальзывает в спальню, торопливо захлопывая дверцу гардеробной с вечерними платьями."
      },
      {
        fx: "phone_ring",
        role: "narrator",
        text: "В этот момент второй iPhone в сумочке Маши начинает настойчиво звонить незнакомой мелодией. Маша отвечает вполоборота у окна, понижая голос почти до шёпота."
      },
      {
        sprite: "./assets/v2/spr_masha_nervous_lie.webp",
        role: "masha",
        speaker: "Маша",
        text: "Да, Артур, я уже дома, через десять минут спускаюсь к машине… Помню я про ложу и про одиннадцать ноль-ноль, не отчитывай меня как школьницу. Буду вовремя."
      },
      {
        sprite: "./assets/v2/spr_masha_warm_smile.webp",
        role: "masha",
        speaker: "Маша",
        text: "{mc_dim_k}, прости ради бога, ужасно глупо вышло! Тот самый капризный клиент из Сити перенёс просмотр пентхауса прямо на сейчас — если сорву сделку, потеряю комиссию за полгода."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Да я всё понимаю, работа есть работа. Только на улице ливень стеной, уже почти одиннадцать ночи… Может, я с тобой за компанию съезжу, подожду внизу у входа?"
      },
      {
        sprite: "./assets/v2/spr_masha_nervous_lie.webp",
        role: "masha",
        speaker: "Маша",
        text: "Нет-нет, даже не выдумывай, туда охрана без заранее заказанных пропусков близко не подпустит! Смотри: в холодильнике на кухне свежие роллы и ягоды, полотенце чистое я тебе на диване оставила. Второй телефон у меня разрядился, бросила в спальне у кровати — туда чур не заходить! Вернусь поздно, не жди меня и ложись спать!"
      },
      {
        sprite: null,
        fx: "door",
        role: "narrator",
        text: "Быстрый, тёплый чмок в щёку на бегу — и входная дверь мягко захлопывается, оставляя {mc_acc} в полной тишине огромной квартиры наедине с гулом ночного мегаполиса за стеклом."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Замок щёлкнул. Тишина такая плотная, что слышно, как дождь сечёт по панорамному стеклу тридцать второго этажа."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "«Клиент перенёс просмотр квартиры на одиннадцать ночи»… Господи, кого я обманываю? Мне восемнадцать лет, а не восемь. Я видел, как она прятала глаза, слышал этот тон человека по имени Артур и чувствую чужой мужской одеколон прямо здесь, посреди её гостиной."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Если из-за побега моего отца и нищеты Машка вынуждена так расплачиваться за эту красивую столичную витрину… Я обязан понять, во что она ввязалась, прежде чем сделаю неверный шаг."
      },
      {
        enterSandbox: true
      }
    ],

    // =========================================================================
    // INTRO_5: 01:42 НОЧИ — МНОГОРАКУРСНЫЙ ПРИХОД, ПОДГЛЯДЫВАНИЕ ИЛИ РАСКЛАД 4 КОРОЛЕВ
    // =========================================================================
    Intro_5: [
      {
        location: "ПРЕСНЯ • 23:15",
        bg: "./assets/v3/sd_living_rain_evening.webp",
        video: null,
        sprite: null,
        cam: "dim",
        fxShader: "moscow_city_night",
        ambience: "penthouse",
        role: "narrator",
        text: "{mc} выключает настенные светильники, укладывает старые часы отца на край журнального столика и забирается под мягкий кашемировый плед на просторном диване напротив панорамного окна."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "За стеклом в сизой пелене дождя медленно плывут огни ночной Москвы. Веки наливаются свинцом от бесконечного дня, но слух чутко ловит каждый шорох у входной двери…"
      },
      {
        location: "МОСКВА • 01:42",
        bg: "./assets/v3/sd_intro5_01_doorway_wide.webp",
        video: "./assets/v2/vid_04_night_return.mp4",
        videoMode: "once",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        fx: "lock_beep",
        role: "narrator",
        text: "Электронные часы в глубине студии высвечивают 01:42. Дождь за панорамными окнами стих, и башни Москва-Сити расчерчивают паркет длинными золотисто-синими полосами. Тихий писк биометрического замка — и в проёме прихожей бесшумно возникает Маша в вечернем шёлковом платье цвета ночного сапфира."
      },
      {
        bg: "./assets/v3/sd_intro5_02_low_heels_hem.webp",
        video: null,
        cam: "pan-up-reveal",
        fxShader: "moscow_city_calm",
        fx: "cloth",
        role: "narrator",
        text: "Нижний ракурс от кромки ковра: чтобы не стучать каблуками в тишине, Маша несёт чёрные лаковые лодочки за тонкие ремешки в опущенной руке и ступает босыми пальцами по тёплому дереву. Подол струящегося сапфирового шёлка с высоким разрезом скользит по её щиколоткам при каждом осторожном шаге."
      },
      {
        bg: "./assets/v3/sd_intro5_03_sofa_lashes_pov.webp",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Вернулась… От неё долетает тонкая волна ночной прохлады, миндальных духов и сухого шампанского. Она замирает в полушаге от изголовья моего дивана, всматриваясь сверху вниз в моё лицо в контровом свете небоскрёбов — и у меня есть всего секунда решить, остаться «спящим» или подать голос."
      },
      {
        choices: [
          {
            text: "Остаться неподвижным и подглядывать сквозь ресницы, что она сделает наедине с собой",
            onPick: (s, api) => {
              s.flags.intro5_branch = "sleep";
              api.changeStats({ risk: 1 }, ["Риск +1"]);
            },
            goto: "Intro_5_sleep"
          },
          {
            text: "Подать голос в полумраке: «Не спится на новом месте… Тяжёлый вечер, Маш?»",
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
        bg: "./assets/v3/sd_intro5_03_sofa_lashes_pov.webp",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        role: "narrator",
        text: "{mc} выравнивает дыхание, оставляя узкую щёлочку между ресницами. Уверенная, что она в комнате совершенно одна, Маша устало выдыхает и кончиками пальцев расстёгивает замочек бархатного чокера."
      },
      {
        role: "masha",
        speaker: "Маша (шёпотом)",
        text: "Спит без задних ног, чудо упрямое… Хоть один мужчина под этой крышей, перед которым не нужно держать спину как на витрине."
      },
      {
        bg: "./assets/v3/sd_intro5_04_window_silhouette_ots.webp",
        video: "./assets/v2/vid_05_night_silhouette.mp4",
        videoMode: "once",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        fx: "cloth",
        role: "narrator",
        text: "Маша ставит лодочки у края кресла, выходит прямо к панорамному стеклу напротив сияющих башен Москва-Сити и медленно убирает тяжёлую волну золотистых волос на одно плечо, открывая изящную линию шеи и спины."
      },
      {
        bg: "./assets/v3/sd_intro5_05_macro_spine_zipper.webp",
        video: null,
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        fx: "cloth",
        role: "narrator",
        text: "Крупный план: её тонкие ухоженные пальцы заводятся за спину и неспешно тянут вниз бегунок потайной молнии. Звенья расходятся с тихим шёлковым шелестом миллиметр за миллиметром, обнажая тёплую бархатистую кожу вдоль прогиба позвоночника в сине-золотом неоне ночного города."
      },
      {
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "У меня перехватывает горло так, что боюсь сглотнуть и выдать себя. Кровь стучит в ушах — я никогда в жизни не видел ничего настолько завораживающего и запретного буквально на расстоянии вытянутой руки."
      },
      {
        bg: "./assets/v3/sd_intro5_06_low_silk_stockings.webp",
        cam: "pan-up-reveal",
        fxShader: "moscow_city_calm",
        fx: "cloth",
        role: "narrator",
        text: "Тонкие бретели соскальзывают с ключиц, и тёмно-синий шёлк бесшумной волной опадает к её босым ступням на мягкий ворс ковра — открывая стройные бёдра в полупрозрачных кружевных чулках и утончённый светлый кружевной комплект."
      },
      {
        bg: "./assets/v3/sd_intro5_07_glass_reflection.webp",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        role: "narrator",
        text: "В тёмном зеркале панорамного стекла поверх огней высоток отражается её точёный силуэт спереди: Маша потягивается всем телом после долгого вечера на каблуках, касается ладонью прохладного окна и на мгновение прикрывает глаза."
      },
      {
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Пальцы под кашемировым пледом невольно сжимают ткань до побелевших костяшек. Оторвать взгляд от этого отражения на фоне ночной Москвы просто свыше человеческих сил."
      },
      {
        bg: "./assets/v3/sd_intro5_03_sofa_lashes_pov.webp",
        fx: "cloth",
        role: "narrator",
        text: "Подхватив с ковра сброшенное платье и накинув его на сгиб локтя, Маша бесшумно подходит вплотную к дивану и наклоняется низко над {mc_ins} — прядь её тёплых душистых волос касается его виска, пока она бережно подтыкает сползший край пледа у его плеча."
      },
      {
        role: "masha",
        speaker: "Маша (шёпотом)",
        text: "Доброй ночи, {mc_dim_k}… Спи спокойно, завтра со всем разберёмся."
      },
      {
        role: "narrator",
        text: "Она мягко ускользает в полумрак спальни, а {mc} ещё долго лежит с колотящимся сердцем, вдыхая оставшийся над подушкой тонкий шлейф миндаля и ночной прохлады."
      },
      { goto: "Intro_5_end" }
    ],

    Intro_5_awake: [
      {
        bg: "./assets/v2/cg_intro5_awake_sofa.webp",
        video: "./assets/v2/vid_06_awake_sofa.mp4",
        videoMode: "loop",
        sprite: null,
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        role: "narrator",
        text: "Маша вздрагивает всем телом, едва не выронив лодочки из пальцев, и прижимает свободную ладонь к ключицам, переводя дыхание. В сине-золотом свете панорамы Сити её скулы трогает живой румянец."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Господи, {mc}! У меня чуть сердце не выпрыгнуло… Ты чего не спишь во втором часу ночи?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "В первую ночь на новом месте никогда сразу не засыпаю — интернатская привычка. Да и ждал, пока замок щёлкнет, чтобы знать, что ты нормально добралась."
      },
      {
        bg: "./assets/v3/sd_living_night_clear.webp",
        video: null,
        sprite: "./assets/v3/sd_spr_masha_night_sapphire.webp",
        fx: "cloth",
        role: "masha",
        speaker: "Маша",
        text: "Ждал он меня… Знаешь, у меня в груди так отвыкли от этой фразы, что даже щиплет. Мне самой после этих шумных кабинетов хоть волком вой — голова гудит, сна ни в одном глазу."
      },
      {
        sprite: "./assets/v3/sd_spr_masha_cafe_tease.webp",
        role: "narrator",
        text: "В глазах Маши вдруг вспыхивает озорная, почти девчоночья искра. Она ставит туфли у кресла, тянется к нижнему ящику консоли и достаёт тяжёлую бархатную коробочку с колодой карт с золочёным обрезом."
      },
      {
        sprite: "./assets/v3/sd_spr_masha_night_sapphire.webp",
        role: "masha",
        speaker: "Маша",
        text: "Слушай, Соколов, раз уж нам обоим не спится — давай тряхнём стариной! Помнишь, как я в десять лет гадала тебе под одеялом с фонариком на «будущую невесту»? Двигай ноги, сейчас раскину тебе настоящий взрослый расклад на любовь — на Четырёх Королев!"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Какой ещё расклад на любовь, Маш?! Я три часа как из интерната вышел, какие вокруг меня королевы…"
      },
      {
        bg: "./assets/v3/sd_intro5_08_cards_table_pov.webp",
        sprite: null,
        cam: "zoom-slow",
        fx: "cloth",
        role: "masha",
        speaker: "Маша",
        text: "Москва — город быстрый, братец, тут дамы появляются раньше, чем успеешь оглянуться! Садись ближе: сдвинь колоду левой рукой к сердцу, открой всех четырёх Королев по очереди, а под конец сыграем с тобой на один честный ответ."
      },
      {
        startQueensCardGame: true
      }
    ],

    Intro_5_cards_win: [
      {
        bg: "./assets/v2/cg_intro5_awake_sofa.webp",
        video: "./assets/v2/vid_06_awake_sofa.mp4",
        videoMode: "loop",
        sprite: null,
        fx: "heartbeat",
        effect: (s, api) => {
          s.flags.won_queens_wager = true;
          api.addClue("clue_midnight_card_confession");
          api.changeStats({ loyalty: 1 }, ["Доверие Маши +1 (выигран карточный спор)"]);
        },
        role: "masha",
        speaker: "Маша",
        text: "Да ладно?! Угадал с первой попытки — ты что, по моим ресницам считываешь, куда я Бубновую Даму положила?! Ну, карточный долг — дело святое…"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Тогда один вопрос без сказок про ипотеку, Маш. Кто такой этот Артур и зачем ты ездишь к ним по ночам?"
      },
      {
        role: "narrator",
        text: "Улыбка медленно сходит с губ Маши. Она перебирает край золочёной карты в тонких пальцах и смотрит на огни башни Империя за окном."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Глазастый ты вырос, {mc_dim}… Никакой я не брокер по квартирам. Три года назад я пыталась через частных безопасников поднять закрытые архивы по исчезновению твоего отца и влезла в огромный долг перед агентством Артура. Теперь отрабатываю контрактом сопровождения на закрытых деловых приёмах — без грязи, но на коротком поводке. Мне осталось закрыть всего два выезда."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "У меня внутри всё переворачивается. Она влезла в эту золотую клетку три года назад из-за попытки найти следы моего отца… И молча тянула эту лямку одна!"
      },
      { goto: "Intro_5_sofa_choice" }
    ],

    Intro_5_cards_miss: [
      {
        bg: "./assets/v2/cg_intro5_awake_sofa.webp",
        video: "./assets/v2/vid_06_awake_sofa.mp4",
        videoMode: "loop",
        sprite: null,
        effect: (s, api) => {
          s.flags.won_queens_wager = false;
          api.changeStats({ risk: 1 }, ["Азарт ночи: Риск +1"]);
        },
        role: "masha",
        speaker: "Маша",
        text: "Мимо, шулер! Вот она где пряталась, моя Бубновая Королева — прямо у края пледа!"
      },
      {
        fx: "tap",
        role: "narrator",
        text: "Маша со смехом щёлкает {mc_acc} уголком глянцевой карты по кончику носа, но тут же затихает, кутаясь от ночной прохлады и глядя на него с неожиданной взрослой нежностью."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Так что мои скучные взрослые секреты пока остаются при мне… Честно говоря, утром я проснулась совершенно одна в пустом стеклянном аквариуме, а сейчас сижу с тобой за картами — и впервые за три года мне не страшно выключить в комнате свет."
      },
      { goto: "Intro_5_sofa_choice" }
    ],

    Intro_5_sofa_choice: [
      {
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Она сидит на краю дивана в десяти сантиметрах от меня — плечи обнажены, карты рассыпаны по кашемировому пледу, в глазах мерцают огни Сити, и вся её светская броня снята. Сейчас всё решит одно движение."
      },
      {
        choices: [
          {
            text: "Уверенно накрыть её ладонь поверх карт и посмотреть прямо в глаза",
            onPick: (s, api) => {
              api.changeStats({ alpha: 1 }, ["Вектор характера: Альфа"]);
            },
            goto: "Intro_5_alpha"
          },
          {
            text: "Бережно укрыть её продрогшие плечи тёплым кашемировым пледом",
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
        role: "narrator",
        text: "{mc} приподнимается на локте, без прежней мальчишеской робости берёт прохладные пальцы Маши в свою горячую ладонь и свободным движением убирает выбившуюся золотистую прядь за её ухо. Маша мгновенно замирает, её дыхание сбивается."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Послушай меня, Маш. Я не знаю всех твоих московских дел и не буду лезть с моралями. Но одно запомни твёрдо: ты в этом городе больше не одна. И если хоть один из твоих ночных «клиентов» позволит себе лишнее — ты скажешь об этом мне."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "{mc_dim}… Ничего себе у тебя взгляд стал. И голос такой низкий… Ты когда успел превратиться из моего тихого мальчика во взрослого мужчину?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "За двенадцать лет много чему успеваешь научиться. Иди отдыхай, я рядом."
      },
      {
        role: "narrator",
        text: "Маша медленно, словно нехотя, высвобождает пальцы, скользит задумчивым, непривычно долгим взглядом по его губам и поднимается с дивана с едва заметной дрожью мурашек на плечах."
      },
      {
        bg: "./assets/v2/bg_penthouse_living_night.webp",
        sprite: "./assets/v2/spr_masha_night_dress.webp",
        role: "masha",
        speaker: "Маша",
        text: "Да уж… Пожалуй, мне действительно пора в спальню, пока шампанское совсем не ударило в голову. Спокойной ночи, защитник."
      },
      { goto: "Intro_5_end" }
    ],

    Intro_5_vanilla: [
      {
        role: "narrator",
        text: "{mc} садится на диване и аккуратно, стараясь не напугать резким движением, укутывает открытые плечи Маши половиной своего тёплого кашемирового пледа. Маша затихает, кутается в мягкую ткань и вдруг доверчиво опускает голову виском ему на плечо."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Тебе не обязательно всё время казаться железной передо мной, слышишь? В детстве ты меня от всего двора закрывала — теперь моя очередь просто побыть рядом, когда ты устала. Хочешь, пойду согрею тебе чаю с мятой?"
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Не уходи никуда… Посиди так ровно минутку, ладно? Господи, как же с тобой спокойно и тепло, {mc_dim_k}… Я и забыла, каково это — когда рядом сидят просто так, не требуя ничего взамен."
      },
      {
        role: "narrator",
        text: "Они сидят в тишине полминуты, глядя на мерцающие огни высоток за стеклом, после чего Маша мягко касается губами его щеки у самой скулы и поднимается с тёплой, светлой улыбкой."
      },
      {
        bg: "./assets/v2/bg_penthouse_living_night.webp",
        sprite: "./assets/v2/spr_masha_night_dress.webp",
        role: "masha",
        speaker: "Маша",
        text: "Спасибо тебе за этот вечер, родной. Спи крепко — завтра начнём твою новую московскую жизнь."
      },
      { goto: "Intro_5_end" }
    ],

    Intro_5_end: [
      {
        bg: "./assets/v3/sd_living_dawn_mist.webp",
        video: null,
        sprite: null,
        fx: "door",
        role: "narrator",
        text: "Дверь спальни Маши мягко закрывается. Огни небоскрёбов за окном гаснут один за другим, уступая место сиренево-розовой предрассветной дымке над Москвой-рекой."
      },
      { goto: "Intro_6" }
    ],

    // =========================================================================
    // INTRO_6: 07:30 УТРА, МНОГОРАКУРСНЫЙ ДУШ, LOYALTY >= 2 И ДВОЙНОЙ КЛИФФХЭНГЕР
    // =========================================================================
    Intro_6: [
      {
        location: "МОСКВА • 07:30 УТРА",
        bg: "./assets/v3/sd_living_morning_sun.webp",
        cam: "zoom-slow",
        fxShader: "morning_sun",
        ambience: "morning",
        role: "narrator",
        text: "Яркое солнечное московское утро после вчерашнего шторма. Косые золотые лучи бьют сквозь панорамные окна, заливая гостиную светом. {mc} просыпается ровно в семь тридцать по выработанной годами интернатской привычке и босиком отправляется в коридор умыться."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "В голове ещё путаются сон и явь — первые три секунды спросонья искал глазами двухъярусные казённые койки, а увидел светлый паркет и голубое небо над башнями Сити. Маша легла под утро, наверняка спит до обеда…"
      },
      {
        location: "ВАННАЯ • 07:32",
        bg: "./assets/v3/sd_intro6_01_shower_door_ajar.webp",
        video: "./assets/v2/vid_07_shower_steam.mp4",
        videoMode: "loop",
        cam: "zoom-slow",
        fxShader: "shower_steam",
        ambience: "shower",
        role: "narrator",
        text: "Не желая щёлкать выключателем, {mc} машинально толкает незапертую дверь ванной. Навстречу выплывает густое облако тёплого пара с ароматом цитрусового масла и миндаля — а за влажным стеклом душевой под косыми лучами утреннего солнца вырисовывается точёный силуэт Маши."
      },
      {
        bg: "./assets/v3/sd_intro6_02_shower_low_angle.webp",
        video: null,
        cam: "pan-up-reveal",
        fxShader: "shower_steam",
        role: "narrator",
        text: "Нижний контровой ракурс сквозь клубы пара: под латунной тропической лейкой струи воды вспыхивают жидким золотом, стекая по приподнятым локтям и изгибу талии, пока Маша убирает со лба мокрые тяжёлые пряди."
      },
      {
        bg: "./assets/v3/sd_intro6_03_shower_high_angle.webp",
        cam: "zoom-slow",
        fxShader: "shower_steam",
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Дыхание застревает в горле, ступни буквально прирастают к тёплому мрамору у порога. Она забыла повернуть фиксатор замка… Сверху сквозь высокое окно бьёт утреннее солнце, подсвечивая каждую каплю на её обнажённых плечах и ключицах!"
      },
      {
        choices: [
          {
            text: "Замереть у порога и заворожённо проследить за её отражением в запотевшем зеркале",
            onPick: (s, api) => {
              api.changeStats({ risk: 1 }, ["Риск +1"]);
            },
            goto: "Intro_6_shower_look"
          },
          {
            text: "Собрать всю выдержку, отвести глаза и бесшумно шагнуть обратно в коридор",
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
        bg: "./assets/v3/sd_intro6_04_shower_steamy_mirror.webp",
        cam: "zoom-slow",
        fxShader: "shower_steam",
        role: "narrator",
        text: "В высоком запотевшем зеркале над раковиной на секунду проступает мягкое отражение: Маша прислоняет ладонь к тёплому стеклу кабины, оставляя чёткий отпечаток на конденсате, и выключает воду."
      },
      {
        fx: "glass_clink",
        shake: true,
        role: "narrator",
        text: "{mc} в оцепенении делает резкий шаг назад и неловко задевает локтем стеклянный флакон духов на краю мраморной столешницы — раздаётся предательский звон!"
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
        fx: "door",
        role: "narrator",
        text: "{mc} с усилием заставляет себя отвернуться от запотевшего стекла, не позволяя себе злоупотреблять её оплошностью, и осторожно пятится к выходу — но его ладонь задевает металлическую ручку двери как раз в ту секунду, когда шум воды в кабине стихает."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Прости-прости, Маш, я уже вышел! Замок не был закрыт, я думал, ты ещё спишь!"
      },
      {
        role: "masha",
        speaker: "Маша (из ванной)",
        text: "Хах, стой уж за дверью, раз спалился, ранняя пташка! Дай мне полминуты полотенце накинуть!"
      },
      {
        branchByState: (s) => (s.masha.loyalty >= 2 ? "Intro_6_high_loyalty" : "Intro_6_low_loyalty")
      }
    ],

    // Ветка прохождения проверки доверия (loyalty >= 2)
    Intro_6_high_loyalty: [
      {
        location: "КОРИДОР И ГАРДЕРОБНАЯ • 07:36",
        bg: "./assets/v2/cg_intro6_towel_high_loyalty.webp",
        video: "./assets/v2/vid_08_towel_high.mp4",
        videoMode: "once",
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
        role: "narrator",
        text: "Дверь ванной распахивается в залитый солнцем коридор. В облаке тёплого пара стоит свежеумытая Маша без грамма косметики, завернувшись в одно короткое белоснежное махровое полотенце, которое подчёркивает капли воды на её розоватых ключицах. На губах играет тёплая, чуть лукавая утренняя улыбка."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Доброе утро, Соколов. У тебя сейчас уши такого цвета, будто ты не в душ случайно заглянул, а банк ограбил!"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Извини ещё раз… Я привык вставать по звонку в половине восьмого, на автомате пошёл к раковине."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Да расслабься ты, свои же люди под одной крышей! Слушай, раз уж ты всё равно не спишь — выручай меня свежим мужским взглядом, у меня сегодня с утра важная встреча."
      },
      {
        fx: "cloth",
        role: "narrator",
        text: "Маша совершенно непринуждённо проходит мимо замершего {mc_gen} к открытой дверце гардеробной в спальне и прикладывает к себе прямо поверх короткого полотенца два наряда на плечиках — строгий молочный жакетный костюм и мягкое облегающее платье пудрового оттенка, кокетливо оглядываясь через обнажённое плечо."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Ну, колись честно: в чём я выгляжу убедительнее — в образе неприступной деловой акулы или помягче?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Эм… Честно говоря, Маш, ты даже в одном полотенце выглядишь так, что любая деловая акула забудет, зачем пришла. Но светлый жакет тебе безумно идёт."
      },
      {
        bg: "./assets/v3/sd_bedroom_morning_sun.webp",
        sprite: "./assets/v3/sd_spr_masha_towel_flirt.webp",
        role: "masha",
        speaker: "Маша",
        text: "Ого, да ты у нас ещё и комплименты делать умеешь, когда осмелеешь! Засчитано, иди включай кофемашину на кухне — через пять минут выхожу завтракать!"
      },
      { goto: "Intro_6_kitchen_finale" }
    ],

    // Ветка непрохождения проверки доверия (loyalty < 2)
    Intro_6_low_loyalty: [
      {
        location: "У ДВЕРИ ВАННОЙ • 07:36",
        bg: "./assets/v2/cg_intro6_towel_low_loyalty.webp",
        cam: "zoom-slow",
        fxShader: "morning_sun",
        ambience: "morning",
        effect: (s) => {
          s.flags.morning_high_loyalty = false;
        },
        role: "narrator",
        text: "Створка двери ванной приоткрывается ровно на ширину ладони. Маша крепко прижимает край белого полотенца у самой шеи; её щёки пылают румянцем, а ярко-голубые глаза смотрят одновременно смущённо и по-взрослому строго, мельком косясь на полотенцесушитель."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Так, {mc}! Давай сразу обозначим берега на берегу: ты уже давно не шестилетний карапуз, а я в этой квартире привыкла жить одна. В следующий раз перед закрытой дверью полагается стучать и ждать ответа, уяснил?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Уяснил, Маш, виноват… Честно, вышло случайно, больше не повторится."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Очень на это надеюсь. Всё, марш на кухню ставить чайник и не попадайся мне под руку в коридоре, пока я нормально не приведу себя в порядок!"
      },
      {
        fx: "door",
        role: "narrator",
        text: "Дверь ванной со звонким щелчком запирается перед самым носом смущённого {mc_gen}."
      },
      { goto: "Intro_6_kitchen_finale" }
    ],

    // Финал на кухне и двойной клиффхэнгер (сообщение Кати + визит Ленки)
    Intro_6_kitchen_finale: [
      {
        location: "КУХНЯ-БАР • 07:48",
        bg: "./assets/v3/sd_kitchen_morning_sun.webp",
        sprite: null,
        video: null,
        cam: "zoom-slow",
        fxShader: "morning_sun",
        ambience: "morning",
        role: "narrator",
        text: "На залитой утренним солнцем кухне кофемашина с тихим урчанием наливает эспрессо в фарфоровые чашки. {mc} стоит у барного острова, пристегнув старые часы отца на новый ремешок Кати. Внезапно его собственный смартфон на камне стола коротко вибрирует входящим сообщением."
      },
      {
        fx: "phone_buzz",
        incomingCard: {
          sender: "Катя (Интернат)",
          meta: "Только что • 2 вложения (архив канцелярии)",
          text: "{mc_dim}, проснись, это просто бомба!! Я перед сдачей смены нашла в дальнем сейфе архива твою первичную опись при приёме двенадцать лет назад! Смотри второй снимок: на обороте квитка приёмки твоих часов стоит штамп частного часового ателье на Арбате, где их чинили за три дня до твоего интерната! И самое странное — секретарша проболталась, что этой весной какой-то мужчина присылал курьера и неофициально запрашивал, когда именно у тебя выпуск!!"
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
            text: "{mc_dim}, проснись, это просто бомба!! Я перед сдачей смены нашла в дальнем сейфе архива твою первичную опись при приёме двенадцать лет назад! На обороте квитка приёмки твоих часов стоит штамп частного часового ателье на Арбате, где их чинили за три дня до твоего интерната! И самое странное — секретарша проболталась, что этой весной какой-то мужчина присылал курьера и неофициально запрашивал, когда именно у тебя выпуск!!"
          });
        },
        role: "narrator",
        text: "Экран смартфона вспыхивает сообщением от контакта «Катя (Интернат)» с двумя фотографиями старых пожелтевших бланков под светом настольной лампы."
      },
      {
        incomingCard: null,
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "У меня леденеют кончики пальцев, я приближаю снимок архивного бланка двумя пальцами… Часовая мастерская в двадцати минутах ходьбы отсюда. И неизвестный мужчина, который всего полгода назад выяснял дату моего выхода из интерната?! Неужели отец всё это время был жив и ходил по одним со мной улицам Москвы?!"
      },
      {
        fx: "intercom",
        role: "narrator",
        text: "Не успевает {mc} выдохнуть от потрясения, как тишину апартаментов разрезает настойчивая мелодичная трель видеодомофона в прихожей. Из спальни, уже одетая и свежая, выходит Маша — бросает взгляд на цветной экран панели у двери и мгновенно меняется в лице."
      },
      {
        location: "ПРИХОЖАЯ • 07:52",
        bg: "./assets/v2/cg_intro6_lenka_intercom.webp",
        video: "./assets/v2/vid_13_lenka_intercom.mp4",
        videoMode: "once",
        cam: "zoom-slow",
        fxShader: "none",
        role: "narrator",
        text: "На цветном экране видеодомофона с хищной, ослепительной улыбкой смотрит прямо в объектив эффектная длинноногая шатенка в распахнутом кожаном жакете поверх ультракороткого платья и солнечных очках, помахивая подстаканником с двумя стаканами рафа."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Чёрт… Только не это с утра пораньше! Это Ленка — моя лучшая подруга и главный генератор катастроф во всей Москве!"
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
        text: "Тем, что у неё рентген вместо глаз и полностью отсутствует чувство тормозов! {mc_dim}, умоляю: держи язык за зубами про мою работу и про вчерашний вечер — если эта бестия почует хоть одну нестыковку, она из нас обоих душу вытрясет прямо за завтраком!"
      },
      {
        fx: "lock_beep",
        role: "narrator",
        text: "Маша глубоко вдыхает и нажимает кнопку открытия замка. За входной дверью раздаётся стремительный цокот каблуков и низкий, смеющийся женский голос."
      },
      {
        role: "lenka",
        speaker: "Ленка",
        portraitMood: "lenka",
        effect: (s) => {
          s.flags.lenka_met = true;
        },
        text: "Ну что, подруга, открывай ворота — я привезла лучший кофе на Патриарших и дико хочу взглянуть в глаза твоему таинственному младшему братику!"
      },
      {
        fx: "door",
        role: "narrator",
        text: "Дверь распахивается навстречу солнечному свету коридора — взгляды замершего у барной стойки {mc_gen}, напряжённой Маши и входящей на порог Ленки скрещиваются."
      },
      {
        finishPrologue: true
      }
    ]
  };
}
