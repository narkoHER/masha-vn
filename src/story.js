// Полный чистовой сценарий Пролога («МАША»: Intro_1..Intro_6, редакция v3.1)
// Строго без голоса рассказчика: раскадровки управляют только камерой, кадрами и звуком,
// а в текстовом окне выводятся исключительно мысли ГГ (`mct`) и реплики персонажей.

// Список файлов в ./assets/v3/, которые уже физически лежат в репозитории (чтобы не давать 404 до выгрузки с доски Magnific)
export const AVAILABLE_V3_ASSETS = new Set([
  "./assets/v3/room_living_rain_evening.webp",
  "./assets/v3/room_living_night_clear.webp",
  "./assets/v3/room_living_dawn_mist.webp",
  "./assets/v3/room_living_morning_sun.webp",
  "./assets/v3/room_kitchen_rain_evening.webp",
  "./assets/v3/room_kitchen_night_clear.webp",
  "./assets/v3/room_kitchen_dawn_mist.webp",
  "./assets/v3/room_kitchen_morning_sun.webp",
  "./assets/v3/room_bathroom_rain_evening.webp",
  "./assets/v3/room_bathroom_night_clear.webp",
  "./assets/v3/room_bathroom_dawn_mist.webp",
  "./assets/v3/room_bathroom_morning_sun.webp",
  "./assets/v3/room_bedroom_rain_evening.webp",
  "./assets/v3/room_bedroom_night_clear.webp",
  "./assets/v3/room_bedroom_dawn_mist.webp",
  "./assets/v3/room_bedroom_morning_sun.webp",
  "./assets/v3/interim_intro1_signboard.webp",
  "./assets/v3/interim_intro1_katya_cross.webp",
  "./assets/v3/interim_intro1_bus_stop.webp",
  "./assets/v3/interim_intro1_trolley_doors.webp",
  "./assets/v3/interim_intro4_porsche_ext.webp",
  "./assets/v3/interim_intro4_porsche_cabin.webp"
]);

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

  // Эмоциональные и костюмные спрайты Маши и Кати (Dispatch / Invincible style)
  "./assets/v3/sd_spr_masha_coat_guarded.webp": "./assets/v2/spr_masha_coat_smile.webp",
  "./assets/v3/sd_spr_masha_coat_warm.webp": "./assets/v2/spr_masha_coat_smile.webp",
  "./assets/v3/sd_spr_masha_cafe_warm.webp": "./assets/v2/spr_masha_warm_smile.webp",
  "./assets/v3/sd_spr_masha_cafe_tease.webp": "./assets/v2/spr_masha_playful_tease.webp",
  "./assets/v3/sd_spr_masha_cafe_nervous.webp": "./assets/v2/spr_masha_nervous_lie.webp",
  "./assets/v3/sd_spr_masha_cafe_sad.webp": "./assets/v2/spr_masha_warm_smile.webp",
  "./assets/v3/sd_spr_masha_night_sapphire.webp": "./assets/v2/spr_masha_night_dress.webp",
  "./assets/v3/sd_spr_masha_towel_flirt.webp": "./assets/v2/spr_masha_morning_towel.webp",
  "./assets/v3/sd_spr_katya_crossed_arms.webp": "./assets/v2/spr_katya_rain.webp",
  "./assets/v3/sd_spr_katya_tear.webp": "./assets/v2/spr_katya_rain.webp",

  // Новые кадры v3.1 (Page 5 Magnific Space: табличка, крестик, остановка, Porsche)
  "./assets/v3/sd_intro1_signboard_gates.webp": "./assets/v3/interim_intro1_signboard.webp",
  "./assets/v3/sd_intro1_katya_cross_hands.webp": "./assets/v3/interim_intro1_katya_cross.webp",
  "./assets/v3/sd_intro1_bus_stop_arrival.webp": "./assets/v3/interim_intro1_bus_stop.webp",
  "./assets/v3/sd_intro1_trolley_doors_open.webp": "./assets/v3/interim_intro1_trolley_doors.webp",
  "./assets/v3/sd_intro1_bus_stop_alone.webp": "./assets/v3/interim_intro1_bus_stop.webp",
  "./assets/v3/sd_intro1_mc_emotional_closeup.webp": "./assets/v2/bg_orphanage_gates.webp",
  "./assets/v3/sd_intro2_macro_raindrops_window.webp": "./assets/v2/bg_trolleybus_interior.webp",
  "./assets/v3/sd_intro4_porsche_ext.webp": "./assets/v3/interim_intro4_porsche_ext.webp",
  "./assets/v3/sd_intro4_porsche_two_shot.webp": "./assets/v3/interim_intro4_porsche_cabin.webp",
  "./assets/v3/sd_intro4_porsche_ots_masha.webp": "./assets/v3/interim_intro4_porsche_cabin.webp",
  "./assets/v3/sd_intro4_porsche_ots_mc.webp": "./assets/v3/interim_intro4_porsche_cabin.webp",

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
  "./assets/v3/sd_intro6_04_shower_steamy_mirror.webp": "./assets/v2/cg_intro6_shower_steam.webp",
  "./assets/v3/cg_intro6_lenka_intercom_v3.webp": "./assets/v2/cg_intro6_lenka_intercom.webp"
};

export function buildPrologueScript() {
  return {
    // =========================================================================
    // INTRO_1: ПРОХОДНАЯ ИНТЕРНАТА, СТАРЫЙ КРЕСТИК КАТИ И ЗВОНОК МАШЕ
    // =========================================================================
    Intro_1: [
      {
        // *#Раскадровка: окошко на проходной, фиолетовая печать на справке, табличка и входная группа*
        location: "ПРОХОДНАЯ ИНТЕРНАТА • 08:45",
        bg: "./assets/v3/sd_intro1_signboard_gates.webp",
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
        bg: "./assets/v2/bg_orphanage_gates.webp",
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
        bg: "./assets/v2/cg_intro1_doc_watch.webp",
        video: "./assets/v2/vid_10_doc_watch.mp4",
        videoMode: "once",
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
        bg: "./assets/v2/cg_intro1_katya_farewell.webp",
        video: "./assets/v2/vid_09_katya_farewell.mp4",
        videoMode: "once",
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
        bg: "./assets/v2/bg_orphanage_gates.webp",
        video: null,
        sprite: "./assets/v2/spr_katya_rain.webp",
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
        sprite: "./assets/v3/sd_spr_katya_crossed_arms.webp",
        role: "katya",
        speaker: "Катя",
        portraitMood: "katya",
        text: "Не больно ты и старался! На вот, руку давай. Быстро, пока я не передумала!"
      },
      {
        // *#Крупный план ладоней: Катя вкладывает в ладонь старый крестик*
        bg: "./assets/v3/sd_intro1_katya_cross_hands.webp",
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
        bg: "./assets/v2/bg_orphanage_gates.webp",
        sprite: "./assets/v3/sd_spr_katya_tear.webp",
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
        sprite: "./assets/v3/sd_spr_katya_crossed_arms.webp",
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
        bg: "./assets/v2/cg_intro1_katya_farewell.webp",
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
        bg: "./assets/v3/sd_intro1_katya_cross_hands.webp",
        sprite: null,
        cam: "zoom-slow",
        fx: "cloth",
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Спасибо, Кать. Честно, это лучший подарок за все годы в этих стенах. Я без тебя тут вообще бы одичал."
      },
      {
        bg: "./assets/v2/bg_orphanage_gates.webp",
        sprite: "./assets/v2/spr_katya_rain.webp",
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
        bg: "./assets/v3/sd_intro1_bus_stop_arrival.webp",
        sprite: "./assets/v2/spr_katya_rain.webp",
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
        bg: "./assets/v3/sd_intro1_bus_stop_alone.webp",
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
        bg: "./assets/v3/sd_intro1_mc_emotional_closeup.webp",
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
        bg: "./assets/v3/sd_intro1_trolley_doors_open.webp",
        cam: "zoom-slow",
        fx: "door",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Короткие гудки, и прямо передо мной с шипением расходятся двери тёплого салона. Ну что ж, Москва, встречай."
      },
      { goto: "Intro_2" }
    ],

    // =========================================================================
    // INTRO_2: ВЕЧЕРНИЙ ТРОЛЛЕЙБУС, МАКРО КАПЕЛЬ, ФЛЕШБЭК И РАЗВИЛКА ФАНТАЗИИ
    // =========================================================================
    Intro_2: [
      {
        // *#Раскадровка: салон троллейбуса, ГГ сидит ровно, прислонившись виском к холодному стеклу*
        location: "ТРОЛЛЕЙБУС • СУМЕРКИ",
        bg: "./assets/v3/sd_intro2_trolleybus_temple.webp",
        video: "./assets/v2/vid_01_trolleybus.mp4",
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
        bg: "./assets/v3/sd_intro2_macro_raindrops_window.webp",
        video: null,
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
        bg: "./assets/v2/cg_intro2_flashback_sepia.webp",
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
        bg: "./assets/v3/sd_intro2_trolleybus_temple.webp",
        video: "./assets/v2/vid_01_trolleybus.mp4",
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
        bg: "./assets/v2/cg_intro2_fantasy_librarian.webp",
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
        bg: "./assets/v2/cg_intro2_fantasy_office.webp",
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
        bg: "./assets/v3/sd_intro2_trolleybus_temple.webp",
        video: "./assets/v2/vid_01_trolleybus.mp4",
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
    ],

    // =========================================================================
    // INTRO_3: МАЛАЯ БРОННАЯ, ВОПРОС-ЛОВУШКА ПРО СОЧИ И РАЗГОВОР В КОФЕЙНЕ
    // =========================================================================
    Intro_3: [
      {
        // *#Раскадровка: Малая Бронная, у витрины под маркизом стоит ослепительная Маша, проезд камеры снизу вверх*
        location: "МАЛАЯ БРОННАЯ • 20:30",
        bg: "./assets/v3/sd_intro3_masha_reveal_clean.webp",
        video: null,
        sprite: null,
        cam: "pan-up-reveal",
        fxShader: "rain_exterior",
        ambience: "cafe",
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Замираю посреди тротуара так резко, что прохожий сзади задевает плечо зонтом. Дышать разом становится нечем."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Это кто вообще? Девушка с обложки дорогого журнала? Прохожие оборачиваются на неё под дождём, а я стою в промокших кроссовках и думаю, что перепутал кофейню. Моя Машка должна ждать где-нибудь скромно за углом…"
      },
      {
        // *#Маша убирает телефон и цепко вглядывается в лицо ГГ*
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
        text: "Все мои жалкие фантазии про «бабушкин кардиган» рассыпаются в пыль. Передо мной стоит настолько красивая взрослая женщина, что хочется провалиться сквозь мокрую брусчатку вместе со своим полинявшим рюкзаком."
      },
      {
        bg: "./assets/v2/bg_malaya_bronnaya_ext.webp",
        sprite: "./assets/v3/sd_spr_masha_coat_guarded.webp",
        fxShader: "rain_exterior",
        role: "masha",
        speaker: "Маша",
        text: "Не спеши радоваться, молодой человек. Сходство сходством, а Москва быстро отучает верить на слово. Последний контрольный вопрос, и тогда решим, пить нам кофе или звать полицию."
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
        text: "Стоп. Она смотрит в упор и ждёт, где я проколюсь. В памяти всплывает тот душный август: горячий гудрон за гаражами, один пломбир на двоих и белый мел у Машки на ладонях…"
      },
      {
        choices: [
          {
            text: "Ни в какой: море ты рисовала мелом за гаражами",
            onPick: (s, api) => {
              s.flags.kinship_proven = true;
              api.changeStats({ loyalty: 1 }, ["Доверие Маши выросло"]);
            },
            goto: "Intro_3_trap_pass"
          },
          {
            text: "Кажется, в «Лазурный»… я был совсем мелкий",
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
        sprite: "./assets/v3/sd_spr_masha_coat_warm.webp",
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Хорошая попытка подловить, Маш. Денег на юг у родителей тогда не хватило. Мы всё лето проторчали во дворе, ели один пломбир на двоих, и ты ещё заехала мне качелями вот сюда, в бровь, когда показывала, как прыгать «солнышком»."
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
        sprite: "./assets/v3/sd_spr_masha_coat_guarded.webp",
        role: "masha",
        speaker: "Маша",
        text: "Мимо. Мы вообще ни разу в жизни не были на море. Плохо подготовился?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Прости, я просто растерялся рядом с тобой… Смотри: это же папины часы, с которыми он забирал нас из парка, и шрам от тех зелёных качелей во дворе, когда ты нечаянно задела меня и полчаса дула на лоб!"
      },
      {
        sprite: "./assets/v3/sd_spr_masha_coat_warm.webp",
        role: "masha",
        speaker: "Маша",
        text: "Часы дяди Вити… И та самая отметина у брови. Фух, напугал до чёртиков, я уж решила, совсем чужой человек пришёл."
      },
      { goto: "Intro_3_hug" }
    ],

    Intro_3_hug: [
      {
        // *#Маша порывисто обнимает Артёма за шею*
        bg: "./assets/v3/sd_intro3_hug_clean.webp",
        video: "./assets/v2/vid_11_hug_awkward.mp4",
        videoMode: "once",
        sprite: null,
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        fx: "cloth",
        role: "masha",
        speaker: "Маша",
        text: "Живой… Мелкий, какой же ты высоченный вымахал! Я же тебе теперь макушкой едва до подбородка достаю!"
      },
      {
        fx: "heartbeat",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "От её тёплого пальто накрывает ароматом цветов и горького миндаля, руки сами зависают в воздухе у её тонкой талии. В памяти осталась десятилетняя девчонка со сбитыми коленками, а сейчас ко мне прижимается взрослая красавица, от которой я двух слов связать не могу."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Да обними ты нормально, чего застыл как солдатик! Или уши замёрзли? Пошли скорее внутрь, у тебя куртка насквозь сырая."
      },
      {
        // *#Переход за угловой столик внутри кофейни*
        location: "КОФЕЙНЯ НА БРОННОЙ • 20:45",
        bg: "./assets/v2/bg_cafe_malaya_bronnaya.webp",
        video: null,
        sprite: "./assets/v3/sd_spr_masha_cafe_warm.webp",
        cam: "zoom-slow",
        fxShader: "none",
        role: "masha",
        speaker: "Маша",
        text: "Сижу, смотрю на тебя и поверить не могу. Глаза один в один отцовские, серьёзные такие, глубокие. Рассказывай, как ты вообще нашёл мой номер через столько лет?"
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Тётя Валя со второго этажа нашего старого дома помогла. Написал ей письмо весной, а она ответила, что случайно встретила тебя пару лет назад у аптеки и записала телефон. Я до последнего боялся звонить… Думал, ты вообще не захочешь вспоминать нашу семью."
      },
      {
        sprite: "./assets/v3/sd_spr_masha_cafe_warm.webp",
        role: "masha",
        speaker: "Маша",
        text: "Дурак ты, {mc_dim}. Большой, а всё такой же глупый. Я и есть твоя семья!"
      },
      { goto: "Intro_3_cafe_hub" }
    ],

    Intro_3_cafe_hub: [
      {
        bg: "./assets/v2/bg_cafe_malaya_bronnaya.webp",
        sprite: "./assets/v3/sd_spr_masha_cafe_warm.webp",
        fxShader: "none",
        dynamicChoices: (state) => {
          const asked = state.flags.cafeTopics || {};
          const choices = [];

          if (!asked.veronika) {
            choices.push({
              text: "Спросить про маму Маши: «Как вы жили после того дня?»",
              onPick: (s) => {
                s.flags.cafeTopics = { ...(s.flags.cafeTopics || {}), veronika: true };
              },
              goto: "Intro_3_topic_veronika"
            });
          }

          if (!asked.father) {
            choices.push({
              text: "Показать часы отца: «Ты ничего не знаешь, куда он исчез?»",
              onPick: (s, api) => {
                s.flags.cafeTopics = { ...(s.flags.cafeTopics || {}), father: true };
                api.addClue("clue_father_week");
              },
              goto: "Intro_3_topic_father"
            });
          }

          if (!asked.job) {
            choices.push({
              text: "Спросить о её жизни: «А ты чем сейчас занимаешься в Москве?»",
              onPick: (s, api) => {
                s.flags.cafeTopics = { ...(s.flags.cafeTopics || {}), job: true };
                api.addClue("clue_realtor_cover");
              },
              goto: "Intro_3_topic_job"
            });
          }

          if (asked.veronika && asked.father && asked.job) {
            choices.push({
              text: "Допить кофе: «Спасибо, что пришла. Мне пора до закрытия метро…»",
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
        sprite: "./assets/v3/sd_spr_masha_cafe_sad.webp",
        role: "masha",
        speaker: "Маша",
        text: "На полгода уезжали к бабушке в Тверь. Мама продала ту квартиру почти за бесценок, чтобы раздать долги по счетам. Я первое время каждый вечер ревела в подушку и просила забрать тебя обратно… Но мама отрезала как ножом: «Чужая кровь, чужая беда. У меня нет сил тянуть двоих»."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "А когда мне исполнилось восемнадцать и я сама пошла в опеку искать тебя, меня даже на порог архива не пустили. По документам родители так и не успели оформить усыновление: разные фамилии, ноль родства на бумаге. Для чиновников я была просто посторонней девчонкой с улицы."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "А твоя мама сейчас где? Вы общаетесь?"
      },
      {
        sprite: "./assets/v3/sd_spr_masha_cafe_tease.webp",
        role: "masha",
        speaker: "Маша",
        text: "Вероника Павловна у нас теперь дама из высшего света. Четыре года назад удачно вышла замуж за владельца сети клиник, живёт за городом на Новой Риге. Звонит раз в месяц отчитать меня за образ жизни. В общем, держим вежливый нейтралитет."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Вероника спокойно вычеркнула нас обоих из памяти и устроила свою судьбу. И странно кольнуло от другой детали: ни по документам, ни по крови между мной и Машей правда нет ничего общего. Только старое детство на двоих."
      },
      { goto: "Intro_3_cafe_hub" }
    ],

    Intro_3_topic_father: [
      {
        // *#ГГ снимает с руки потёртые часы отца и кладёт на столик между чашками*
        fx: "tap",
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Все эти годы в интернате мне не давала покоя одна мысль, Маш. Воспитатели за спиной шептались, что батя просто бросил меня и сбежал с вашими деньгами. Но он же пылинки с нас обоих сдувал… Неужели он правда оказался таким подлецом?"
      },
      {
        sprite: "./assets/v3/sd_spr_masha_cafe_sad.webp",
        role: "masha",
        speaker: "Маша",
        text: "Я не знаю всей правды, {mc_dim}. Честно. В ту последнюю неделю дядя Витя ходил сам не свой: почти не спал, выходил звонить на лестницу и проверял замки по три раза за ночь. А потом мама открыла шкатулку с отложенными деньгами, а там пусто и его документов нет."
      },
      {
        role: "masha",
        speaker: "Маша",
        text: "Может, вляпался во что-то по работе, может, прижали серьёзные люди… Но с того вечера от него не пришло ни строчки. Будто человек шагнул в туман и пропал."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "На душе становится совсем муторно. Из-за моего отца они остались без копейки посреди Москвы. Раз уж я вышел за ворота интерната, я переверну этот город, но выясню, жив он или мёртв и что случилось в ту осень."
      },
      { goto: "Intro_3_cafe_hub" }
    ],

    Intro_3_topic_job: [
      {
        // *#В сумочке вибрирует второй телефон; Маша касается чокера*
        sprite: "./assets/v3/sd_spr_masha_cafe_nervous.webp",
        fx: "phone_buzz",
        role: "masha",
        speaker: "Маша",
        text: "А? Я-то?.. Ой, да обычная московская беготня! Работаю брокером по элитной недвижимости. Пентхаусы, клубные дома, видовые этажи в Москва-Сити…"
      },
      {
        // *#Крупный план столика: Маша кладёт второй iPhone экраном вниз*
        bg: "./assets/v2/cg_intro3_secret_call.webp",
        video: "./assets/v2/vid_03_secret_call.mp4",
        videoMode: "once",
        cam: "zoom-slow",
        sprite: null,
        role: "masha",
        speaker: "Маша",
        text: "Сама себе хозяйка, процент со сделок хороший, вот и приоделась немного. Просто клиенты у меня сплошь занятые мужчины. Днём у них совещания, поэтому показы вечно ставят на поздний вечер или в закрытых ресторанах. Приходится держать марку!"
      },
      {
        bg: "./assets/v2/bg_cafe_malaya_bronnaya.webp",
        video: null,
        sprite: "./assets/v3/sd_spr_masha_cafe_nervous.webp",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Я вырос там, где врать учились раньше, чем читать по слогам. И когда при обычном вопросе о работе человек начинает частить, прячет экран второго телефона и оправдывается за вечерние встречи с «занятыми мужчинами», внутри зажигается очень нехороший красный сигнал."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Только давить на неё сейчас я не имею права. Мы не виделись двенадцать лет."
      },
      { goto: "Intro_3_cafe_hub" }
    ],

    Intro_3_depart: [
      {
        // *#Маша накрывает ладонью запястье ГГ, не давая встать*
        sprite: "./assets/v3/sd_spr_masha_cafe_tease.webp",
        fx: "cloth",
        role: "masha",
        speaker: "Маша",
        text: "Стоять на месте, Соколов. Какое ещё метро в десятом часу под проливным дождём? Куда ты сейчас поедешь, говори прямо в глаза."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Ну… У меня направление в общагу в Текстильщиках, только заселение с понедельника. Ничего страшного, переночую пару ночей в хостеле у вокзала, подъёмных хватит."
      },
      {
        sprite: "./assets/v3/sd_spr_masha_cafe_tease.webp",
        role: "masha",
        speaker: "Маша",
        text: "Ты с ума сошёл?! В привокзальном клоповнике в день своего совершеннолетия при живой старшей сестре в Москве?! Даже слушать не стану. Берёшь рюкзак и едешь ко мне."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Маш, ну неудобно же! Мы столько лет не виделись, у тебя своя взрослая жизнь, а тут я свалился как снег на голову…"
      },
      {
        sprite: "./assets/v3/sd_spr_masha_cafe_warm.webp",
        role: "masha",
        speaker: "Маша",
        text: "Цыц, я на четыре года старше, со мной спорить бесполезно! У меня в гостиной диван размером со взлётную полосу, места полно. Только…"
      },
      {
        // *#Маша осекается, прикусив губу*
        sprite: "./assets/v3/sd_spr_masha_cafe_nervous.webp",
        role: "masha",
        speaker: "Маша",
        text: "Только чур без лишних вопросов и по комнатам без спроса не ходить, договорились? Я с утра убегала в спешке и не ждала гостей… Пошли к машине, я тут за углом припарковалась!"
      },
      { goto: "Intro_4" }
    ],

    // =========================================================================
    // INTRO_4: НОЧНОЙ ПРОЕЗД В PORSCHE (КИНОВОСЬМЁРКА) → ПЕНТХАУС 32 ЭТАЖ → ПЕСОЧНИЦА
    // =========================================================================
    Intro_4: [
      {
        // *#Раскадровка: у обочины в дожде мигает фарами чёрный Porsche; общий проезд к Сити*
        location: "САДОВОЕ → ПРЕСНЯ • 21:45",
        bg: "./assets/v3/sd_intro4_porsche_ext.webp",
        video: null,
        sprite: null,
        cam: "zoom-slow",
        fxShader: "rain_exterior",
        ambience: "trolleybus",
        fx: "lock_beep",
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Постой, Маш… Мы точно к той машине подошли? Это же «Порше»!"
      },
      {
        // *#Двухплановый кадр через мокрое лобовое стекло (капотная камера, правило 180 градусов)*
        bg: "./assets/v3/sd_intro4_porsche_two_shot.webp",
        cam: "zoom-slow",
        fxShader: "trolleybus_glass",
        role: "masha",
        speaker: "Маша",
        text: "Садись давай, пока спина насквозь не промокла. Подогрев сиденья справа на панели."
      },
      {
        // *#Обратная точка 180° на Артёма на пассажирском кресле*
        bg: "./assets/v3/sd_intro4_porsche_ots_mc.webp",
        cam: "zoom-slow",
        fxShader: "trolleybus_glass",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Дверь втягивается с тихим щелчком доводчика, в салоне пахнет новой коньячной кожей и её духами. Боюсь лишний раз пошевелиться, чтобы не накапать с мокрой куртки на обшивку, которая стоит как весь наш старый подъезд."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Маш, скажи честно… Риэлторам в Москве правда выдают такие тачки?"
      },
      {
        // *#Камера от пассажира на Машу за рулём (восьмёрка 180°)*
        bg: "./assets/v3/sd_intro4_porsche_ots_masha.webp",
        cam: "zoom-slow",
        fxShader: "trolleybus_glass",
        role: "masha",
        speaker: "Маша",
        text: "Служебная машина от агентства, дают ведущим брокерам под статусных клиентов. Не приезжать же на сделку в Сити на трамвае, меня там охрана у шлагбаума засмеёт."
      },
      {
        bg: "./assets/v3/sd_intro4_porsche_two_shot.webp",
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "А водишь ты так уверенно давно?"
      },
      {
        bg: "./assets/v3/sd_intro4_porsche_ots_masha.webp",
        role: "masha",
        speaker: "Маша",
        text: "Третий год за рулём. Ночью под дождём за баранкой даже голова отдыхает. Пристегнись получше, Соколов, через три минуты будем у моего дома."
      },
      {
        // *#Подъём на 32 этаж небоскрёба на Пресне, панорама Москва-Сити во всю стену*
        location: "ПРЕСНЯ, 32 ЭТАЖ • 22:05",
        bg: "./assets/v2/cg_intro4_penthouse_arrival.webp",
        video: "./assets/v2/vid_12_penthouse_arrival.mp4",
        videoMode: "once",
        sprite: null,
        cam: "zoom-slow",
        fxShader: "moscow_city_night",
        ambience: "penthouse",
        fx: "lock_beep",
        role: "mc",
        speaker: "{mc}",
        portraitMood: "shy",
        text: "Обалдеть… Маш, тут вид как из кабины самолёта! И это всё твоя квартира?"
      },
      {
        bg: "./assets/v3/sd_living_rain_evening.webp",
        video: null,
        sprite: "./assets/v3/sd_spr_masha_cafe_nervous.webp",
        role: "masha",
        speaker: "Маша",
        text: "Эм… Ну не в собственности. Подруга улетела жить в Дубай, а я снимаю у неё по старой дружбе и присматриваю за порядком! Разувайся, проходи в гостиную, только дай мне две минуты прибрать вещи…"
      },
      {
        // *#Три быстрых акцента глазами ГГ: коробка ЦУМа и мужской парфюм, два бокала на столике, гардеробная*
        sprite: null,
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Глаз сразу цепляется за мелочи. У зеркала стоит коробка из ЦУМа с алыми лентами и тянет чужим мужским табачным парфюмом, на столике открыта бутылка вина на два бокала, а сама Маша пулей залетает в спальню прикрыть гардеробную."
      },
      {
        // *#Звонок второго iPhone от Артура*
        fx: "phone_ring",
        sprite: "./assets/v3/sd_spr_masha_cafe_nervous.webp",
        role: "masha",
        speaker: "Маша",
        text: "Да, Артур, я уже дома, через десять минут спускаюсь к машине… Помню я про ложу и про одиннадцать ноль-ноль, не отчитывай меня как школьницу. Буду вовремя."
      },
      {
        sprite: "./assets/v3/sd_spr_masha_cafe_warm.webp",
        role: "masha",
        speaker: "Маша",
        text: "{mc_dim_k}, прости ради бога, глупо вышло! Тот самый капризный клиент из Сити перенёс показ пентхауса прямо на сейчас. Если сорву встречу, потеряю комиссию за полгода."
      },
      {
        role: "mc",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Да я понимаю, работа есть работа. Только на улице ливень стеной и одиннадцатый час ночи… Может, я с тобой за компанию съезжу, подожду внизу в холле?"
      },
      {
        sprite: "./assets/v3/sd_spr_masha_cafe_nervous.webp",
        role: "masha",
        speaker: "Маша",
        text: "Нет-нет, даже не выдумывай, туда охрана без заказанного пропуска близко не подпустит! В холодильнике свежие роллы и ягоды, чистое полотенце оставила тебе на диване. Второй телефон разрядился на зарядке в спальне, туда чур не заходить! Вернусь поздно, ложись спать!"
      },
      {
        // *#Чмок в щёку на бегу, щелчок входной двери*
        sprite: null,
        fx: "door",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Быстрый чмок в щёку на бегу, щелчок замка, и в огромной квартире остаётся только гул дождя по панорамному стеклу тридцать второго этажа."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "«Показ квартиры в одиннадцать ночи»… Кого я обманываю? Мне восемнадцать лет, а не восемь. Я видел, как она прятала глаза, слышал командный тон этого Артура и чувствую чужой мужской одеколон посреди её гостиной."
      },
      {
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Если из-за побега моего отца Машка расплачивается за эту красивую жизнь чем-то нехорошим, я обязан понять, во что она вляпалась, пока она не вернулась."
      },
      {
        enterSandbox: true
      }
    ],

    // =========================================================================
    // INTRO_5: 01:42 НОЧИ — МНОГОРАКУРСНЫЙ ПРИХОД, НОЧНАЯ СЦЕНА У ОКНА ИЛИ 4 КОРОЛЕВЫ
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
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Выключаю настенные бра, кладу отцовские часы на край столика и забираюсь под плед. За мокрым стеклом плывут огни ночной Москвы, глаза слипаются, но слух всё равно ждёт щелчка входной двери…"
      },
      {
        // *#01:42 ночи: замок тихо пищит, в проёме прихожей появляется Маша в сапфировом платье*
        location: "МОСКВА • 01:42",
        bg: "./assets/v3/sd_intro5_01_doorway_wide.webp",
        video: "./assets/v2/vid_04_night_return.mp4",
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
        bg: "./assets/v3/sd_intro5_02_low_heels_hem.webp",
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
        bg: "./assets/v3/sd_intro5_03_sofa_lashes_pov.webp",
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
        bg: "./assets/v3/sd_intro5_03_sofa_lashes_pov.webp",
        cam: "zoom-slow",
        fxShader: "moscow_city_calm",
        role: "masha",
        speaker: "Маша (шёпотом)",
        text: "Уснул всё-таки, чудо упрямое… Спи, братец. Хоть один нормальный мужчина в этом доме, которому от меня ничего не нужно."
      },
      {
        // *#Общий план от дивана: Маша подходит к панорамному окну Москва-Сити*
        bg: "./assets/v3/sd_intro5_04_window_silhouette_ots.webp",
        video: "./assets/v2/vid_05_night_silhouette.mp4",
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
        bg: "./assets/v3/sd_intro5_05_macro_spine_zipper.webp",
        video: null,
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
        bg: "./assets/v3/sd_intro5_06_low_silk_stockings.webp",
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
        bg: "./assets/v3/sd_intro5_07_glass_reflection.webp",
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
        bg: "./assets/v3/sd_intro5_03_sofa_lashes_pov.webp",
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
        bg: "./assets/v2/cg_intro5_awake_sofa.webp",
        video: "./assets/v2/vid_06_awake_sofa.mp4",
        videoMode: "loop",
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
        bg: "./assets/v3/sd_living_night_clear.webp",
        video: null,
        sprite: "./assets/v3/sd_spr_masha_night_sapphire.webp",
        fx: "cloth",
        role: "masha",
        speaker: "Маша",
        text: "Отвыкла я, чтобы дома кто-то ждал и спрашивал, как доехала… Извини, если пахнет шампанским. Пришлось весь вечер держать улыбку перед тяжёлыми людьми, голова гудит, и сна ни в одном глазу."
      },
      {
        sprite: "./assets/v3/sd_spr_masha_cafe_tease.webp",
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
        bg: "./assets/v3/sd_intro5_08_cards_table_pov.webp",
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
        bg: "./assets/v2/cg_intro5_awake_sofa.webp",
        video: "./assets/v2/vid_06_awake_sofa.mp4",
        videoMode: "loop",
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
        bg: "./assets/v3/sd_living_night_clear.webp",
        video: null,
        sprite: "./assets/v3/sd_spr_masha_night_sapphire.webp",
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
        bg: "./assets/v3/sd_living_night_clear.webp",
        video: null,
        sprite: "./assets/v3/sd_spr_masha_night_sapphire.webp",
        role: "masha",
        speaker: "Маша",
        text: "Спасибо тебе за этот вечер, родной. Спи крепко, завтра начнём твою новую московскую жизнь."
      },
      { goto: "Intro_5_end" }
    ],

    Intro_5_end: [
      {
        location: "РАССВЕТ НАД ПРЕСНЕЙ • 05:20",
        bg: "./assets/v3/sd_living_dawn_mist.webp",
        video: null,
        sprite: null,
        fx: "door",
        role: "mct",
        speaker: "{mc}",
        portraitMood: "calm",
        text: "Дверь её спальни тихо закрывается, а за панорамным стеклом ночная темнота постепенно сереет предрассветной дымкой над Москвой-рекой."
      },
      { goto: "Intro_6" }
    ],

    // =========================================================================
    // INTRO_6: 07:30 УТРА, МНОГОРАКУРСНЫЙ ДУШ, ПРОВЕРКА ДОВЕРИЯ И КЛИФФХЭНГЕР
    // =========================================================================
    Intro_6: [
      {
        location: "МОСКВА • 07:30 УТРА",
        bg: "./assets/v3/sd_living_morning_sun.webp",
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
        bg: "./assets/v3/sd_intro6_01_shower_door_ajar.webp",
        video: "./assets/v2/vid_07_shower_steam.mp4",
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
        bg: "./assets/v3/sd_intro6_02_shower_low_angle.webp",
        video: null,
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
        bg: "./assets/v3/sd_intro6_03_shower_high_angle.webp",
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
        bg: "./assets/v3/sd_intro6_04_shower_steamy_mirror.webp",
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
        bg: "./assets/v3/sd_bedroom_morning_sun.webp",
        video: null,
        sprite: "./assets/v3/sd_spr_masha_towel_flirt.webp",
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
        bg: "./assets/v2/cg_intro6_towel_low_loyalty.webp",
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
        bg: "./assets/v3/sd_kitchen_morning_sun.webp",
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
        bg: "./assets/v3/cg_intro6_lenka_intercom_v3.webp",
        video: "./assets/v2/vid_13_lenka_intercom.mp4",
        videoMode: "once",
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
        finishPrologue: true
      }
    ]
  };
}
