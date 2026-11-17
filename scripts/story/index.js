// Реестр всех сцен игры (автосборка по папкам глав — как в Amnesia)
import { scene_intro_1 } from "./chapter_1_intro/intro_1.js";
import { scene_intro_2 } from "./chapter_1_intro/intro_2.js";
import { scene_intro_3 } from "./chapter_1_intro/intro_3.js";
import { scene_intro_4 } from "./chapter_1_intro/intro_4.js";
import { scene_intro_5 } from "./chapter_1_intro/intro_5.js";
import { scene_intro_6 } from "./chapter_1_intro/intro_6.js";
import { scene_ch2_1 } from "./chapter_2_penthouse/ch2_1.js";
import { scene_ch2_2 } from "./chapter_2_penthouse/ch2_2.js";
import { scene_ch2_3 } from "./chapter_2_penthouse/ch2_3.js";
import { scene_ch2_4 } from "./chapter_2_penthouse/ch2_4.js";
import { scene_ch2_5 } from "./chapter_2_penthouse/ch2_5.js";
import { scene_ch2_6 } from "./chapter_2_penthouse/ch2_6.js";
import { scene_ch3_1 } from "./chapter_3_arbat/ch3_1.js";
import { scene_ch3_2 } from "./chapter_3_arbat/ch3_2.js";
import { scene_ch3_3 } from "./chapter_3_arbat/ch3_3.js";
import { scene_ch3_4 } from "./chapter_3_arbat/ch3_4.js";
import { scene_ch3_5 } from "./chapter_3_arbat/ch3_5.js";

export function buildFullStoryScript() {
  return {
    ...scene_intro_1,
    ...scene_intro_2,
    ...scene_intro_3,
    ...scene_intro_4,
    ...scene_intro_5,
    ...scene_intro_6,
    ...scene_ch2_1,
    ...scene_ch2_2,
    ...scene_ch2_3,
    ...scene_ch2_4,
    ...scene_ch2_5,
    ...scene_ch2_6,
    ...scene_ch3_1,
    ...scene_ch3_2,
    ...scene_ch3_3,
    ...scene_ch3_4,
    ...scene_ch3_5,
  };
}
