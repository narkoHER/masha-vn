#!/usr/bin/env python3
"""
Organize all QC-approved Seedream 5.5 1.5K renders, fixed character/LHD/room-consistent CGs,
alpha-keyed sprites, items, and Kling 2.5 animations into the clean Amnesia-style folder taxonomy:
  assets/
    characters/{mc,masha,katya,lenka}/
    sprites/{masha,katya}/
    locations/{orphanage,trolleybus,malaya_bronnaya,penthouse/{livingroom,kitchen,bathroom,bedroom}}/
    story/{intro_1..intro_6}/
    items/
    videos/{loops,oneshots}/
"""

import shutil
import subprocess
from collections import deque
from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
BRAIN = Path("/Users/admin/.gemini/antigravity/brain/512d5981-6390-4c1e-bb98-4121f628ce87")
HARVEST = BRAIN / "scratch" / "harvest_v3"


def save_webp_916(src: Path, dst: Path, width: int = 720, height: int = 1280, quality: int = 86) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGB")
    # Center-crop to exact target aspect ratio if slightly off, then Lanczos resize
    target_ratio = width / height
    cur_ratio = im.width / im.height
    if abs(cur_ratio - target_ratio) > 0.02:
        if cur_ratio > target_ratio:
            new_w = int(im.height * target_ratio)
            left = (im.width - new_w) // 2
            im = im.crop((left, 0, left + new_w, im.height))
        else:
            new_h = int(im.width / target_ratio)
            top = (im.height - new_h) // 2
            im = im.crop((0, top, im.width, top + new_h))
    im = im.resize((width, height), Image.Resampling.LANCZOS)
    im.save(dst, "WEBP", quality=quality, method=6)


def save_webp_square(src: Path, dst: Path, size: int = 768, quality: int = 88) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGB").resize((size, size), Image.Resampling.LANCZOS)
    im.save(dst, "WEBP", quality=quality, method=6)


def save_alpha_sprite(src: Path, dst: Path, width: int = 720, height: int = 1280) -> None:
    """Flood-fill background removal from outer border (#14161f dark studio backdrop)
    so internal dark features (black choker, pupils, sapphire dress) remain 100% opaque."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGBA")
    target_ratio = width / height
    cur_ratio = im.width / im.height
    if abs(cur_ratio - target_ratio) > 0.02:
        if cur_ratio > target_ratio:
            new_w = int(im.height * target_ratio)
            left = (im.width - new_w) // 2
            im = im.crop((left, 0, left + new_w, im.height))
        else:
            new_h = int(im.width / target_ratio)
            top = (im.height - new_h) // 2
            im = im.crop((0, top, im.width, top + new_h))
    im = im.resize((width, height), Image.Resampling.LANCZOS)
    px = im.load()

    # Sample top-left and top-right corners for studio bg color
    samples = [px[4, 4][:3], px[width - 5, 4][:3], px[4, height // 3][:3], px[width - 5, height // 3][:3]]
    bg_r = sum(s[0] for s in samples) / len(samples)
    bg_g = sum(s[1] for s in samples) / len(samples)
    bg_b = sum(s[2] for s in samples) / len(samples)

    visited = bytearray(width * height)
    bg_mask = Image.new("L", (width, height), 255)
    mpx = bg_mask.load()
    q = deque()

    def color_dist(x: int, y: int) -> float:
        r, g, b, _ = px[x, y]
        return ((r - bg_r) ** 2 + (g - bg_g) ** 2 + (b - bg_b) ** 2) ** 0.5

    tol = 34.0
    # Seed left, top, and right edges (not bottom edge where torso meets frame bottom)
    for x in range(width):
        if color_dist(x, 0) < tol:
            visited[x] = 1
            q.append((x, 0))
    for y in range(height):
        for bx in (0, width - 1):
            idx = y * width + bx
            if not visited[idx] and color_dist(bx, y) < tol:
                visited[idx] = 1
                q.append((bx, y))

    while q:
        cx, cy = q.popleft()
        mpx[cx, cy] = 0
        for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
            if 0 <= nx < width and 0 <= ny < height:
                nidx = ny * width + nx
                if not visited[nidx] and color_dist(nx, ny) < tol:
                    visited[nidx] = 1
                    q.append((nx, ny))

    # Feather alpha 1px for crisp anti-aliased ink outline
    smooth_alpha = bg_mask.filter(ImageFilter.GaussianBlur(0.85))
    im.putalpha(smooth_alpha)
    im.save(dst, "WEBP", quality=88, method=6)


def crop_head_avatar(src: Path, dst: Path, box_rel=(0.22, 0.03, 0.78, 0.36), size: int = 256) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGB")
    x1 = int(im.width * box_rel[0])
    y1 = int(im.height * box_rel[1])
    x2 = int(im.width * box_rel[2])
    y2 = int(im.height * box_rel[3])
    # Make square
    side = min(x2 - x1, y2 - y1)
    cx = (x1 + x2) // 2
    cy = (y1 + y2) // 2
    crop = im.crop((max(0, cx - side // 2), max(0, cy - side // 2), cx + side // 2, cy + side // 2))
    crop = crop.resize((size, size), Image.Resampling.LANCZOS)
    crop.save(dst, "WEBP", quality=88, method=6)


def transcode_mp4(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "ffmpeg", "-y", "-i", str(src),
            "-vf", "scale=720:1280:flags=lanczos",
            "-c:v", "libx264", "-preset", "fast", "-crf", "24",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
            str(dst),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def main() -> None:
    # 1. CHARACTERS (canonical sheets & dialogue/phone avatars)
    save_webp_square(
        BRAIN / "char_mc_artyom_sheet_1794833023908.jpg",
        ASSETS / "characters/mc/artyom_sheet.webp",
        size=768,
    )
    crop_head_avatar(
        HARVEST / "sd_spr_masha_cafe_warm.png",
        ASSETS / "characters/masha/masha_avatar.webp",
        box_rel=(0.24, 0.03, 0.76, 0.34),
    )
    crop_head_avatar(
        HARVEST / "sd_spr_katya_crossed_arms.png",
        ASSETS / "characters/katya/katya_avatar.webp",
        box_rel=(0.18, 0.03, 0.82, 0.40),
    )
    crop_head_avatar(
        HARVEST / "cg_intro6_lenka_intercom_v3.png",
        ASSETS / "characters/lenka/lenka_avatar.webp",
        box_rel=(0.24, 0.25, 0.56, 0.45),
    )

    # 2. ALPHA-KEYED CHARACTER SPRITES (10 sprites: 8 Masha + 2 Katya)
    masha_sprites = {
        "coat_guarded": HARVEST / "sd_spr_masha_coat_guarded.png",
        "coat_warm": HARVEST / "sd_spr_masha_coat_warm.png",
        "cafe_warm": HARVEST / "sd_spr_masha_cafe_warm.png",
        "cafe_tease": HARVEST / "sd_spr_masha_cafe_tease.png",
        "cafe_nervous": HARVEST / "sd_spr_masha_cafe_nervous.png",
        "cafe_sad": HARVEST / "sd_spr_masha_cafe_sad.png",
        "night_sapphire": HARVEST / "sd_spr_masha_night_sapphire.png",
        "towel_flirt": HARVEST / "sd_spr_masha_towel_flirt.png",
    }
    for name, src in masha_sprites.items():
        save_alpha_sprite(src, ASSETS / f"sprites/masha/{name}.webp")

    katya_sprites = {
        "crossed_arms": HARVEST / "sd_spr_katya_crossed_arms.png",
        "tear": HARVEST / "sd_spr_katya_tear.png",
    }
    for name, src in katya_sprites.items():
        save_alpha_sprite(src, ASSETS / f"sprites/katya/{name}.webp")

    # 3. LOCATIONS (Amnesia-style: orphanage, trolleybus, malaya_bronnaya, penthouse/{4 rooms x 4 times})
    locations_map = {
        "locations/orphanage/signboard_gates.webp": HARVEST / "sd_intro1_signboard_gates.png",
        "locations/orphanage/gates_rain.webp": ASSETS / "v2/bg_orphanage_gates.webp",
        "locations/orphanage/bus_stop_arrival.webp": HARVEST / "sd_intro1_bus_stop_arrival.png",
        "locations/orphanage/trolley_doors_open.webp": HARVEST / "sd_intro1_trolley_doors_open.png",
        "locations/trolleybus/cabin_evening.webp": ASSETS / "v2/bg_trolleybus_interior.webp",
        "locations/trolleybus/macro_raindrops.webp": HARVEST / "sd_intro2_macro_raindrops_window.png",
        "locations/malaya_bronnaya/street_rain.webp": ASSETS / "v2/bg_malaya_bronnaya_ext.webp",
        "locations/malaya_bronnaya/cafe_booth.webp": ASSETS / "v2/bg_cafe_malaya_bronnaya.webp",
        # Penthouse 16 rooms (4 rooms x 4 times of day — 100% Seedream 5.5 1.5K!)
        "locations/penthouse/livingroom/rain_evening.webp": HARVEST / "sd_living_rain_evening.png",
        "locations/penthouse/livingroom/night_clear.webp": HARVEST / "sd_living_night_clear.png",
        "locations/penthouse/livingroom/dawn_mist.webp": HARVEST / "sd_living_dawn_mist.png",
        "locations/penthouse/livingroom/morning_sun.webp": HARVEST / "sd_living_morning_sun.png",
        "locations/penthouse/kitchen/rain_evening.webp": HARVEST / "sd_kitchen_rain_evening.png",
        "locations/penthouse/kitchen/night_clear.webp": HARVEST / "sd_kitchen_night_clear.png",
        "locations/penthouse/kitchen/dawn_mist.webp": HARVEST / "sd_kitchen_dawn_mist.png",
        "locations/penthouse/kitchen/morning_sun.webp": HARVEST / "sd_kitchen_morning_sun.png",
        "locations/penthouse/bathroom/rain_evening.webp": HARVEST / "sd_bathroom_rain_evening.png",
        "locations/penthouse/bathroom/night_clear.webp": HARVEST / "sd_bathroom_night_clear.png",
        "locations/penthouse/bathroom/dawn_mist.webp": HARVEST / "sd_bathroom_dawn_mist.png",
        "locations/penthouse/bathroom/morning_sun.webp": HARVEST / "sd_bathroom_morning_sun.png",
        "locations/penthouse/bedroom/rain_evening.webp": HARVEST / "sd_bedroom_rain_evening.png",
        "locations/penthouse/bedroom/night_clear.webp": HARVEST / "sd_bedroom_night_clear.png",
        "locations/penthouse/bedroom/dawn_mist.webp": HARVEST / "sd_bedroom_dawn_mist.png",
        "locations/penthouse/bedroom/morning_sun.webp": HARVEST / "sd_bedroom_morning_sun.png",
    }
    for rel, src in locations_map.items():
        save_webp_916(src, ASSETS / rel)

    # 4. STORY CUTSCENES (intro_1 .. intro_6 — every frame QC-verified & room/character-locked!)
    story_map = {
        # Intro_1
        "story/intro_1/doc_watch.webp": ASSETS / "v2/cg_intro1_doc_watch.webp",
        "story/intro_1/katya_farewell.webp": BRAIN / "cg_intro1_katya_farewell_fixed_1794833056461.jpg",
        "story/intro_1/katya_cross_hands.webp": BRAIN / "cg_intro1_katya_cross_fixed_1794833099993.jpg",
        "story/intro_1/bus_stop_alone.webp": BRAIN / "cg_intro1_bus_stop_alone_outdoor_1794835221219.jpg",
        "story/intro_1/mc_emotional_closeup.webp": BRAIN / "cg_intro1_mc_emotional_closeup_fixed_1794833188501.jpg",
        # Intro_2
        "story/intro_2/trolleybus_mc_temple.webp": HARVEST / "sd_intro2_trolleybus_temple.png",
        "story/intro_2/flashback_sepia.webp": ASSETS / "v2/cg_intro2_flashback_sepia.webp",
        "story/intro_2/fantasy_librarian.webp": ASSETS / "v2/cg_intro2_fantasy_librarian.webp",
        "story/intro_2/fantasy_office.webp": ASSETS / "v2/cg_intro2_fantasy_office.webp",
        # Intro_3
        "story/intro_3/masha_reveal.webp": HARVEST / "sd_intro3_masha_reveal_clean.png",
        "story/intro_3/hug_embrace.webp": HARVEST / "sd_intro3_hug_clean.png",
        "story/intro_3/father_watch_table.webp": BRAIN / "cg_intro3_father_watch_table_1794833262047.jpg",
        "story/intro_3/secret_call.webp": ASSETS / "v2/cg_intro3_secret_call.webp",
        # Intro_4 (LHD Porsche + Room-locked Penthouse arrival!)
        "story/intro_4/porsche_ext.webp": HARVEST / "sd_intro4_porsche_ext.png",
        "story/intro_4/porsche_two_shot_lhd.webp": BRAIN / "cg_intro4_porsche_two_shot_lhd_1794833092782.jpg",
        "story/intro_4/porsche_ots_masha_lhd.webp": BRAIN / "cg_intro4_porsche_ots_masha_lhd_1794833155872.jpg",
        "story/intro_4/porsche_ots_mc_lhd.webp": BRAIN / "cg_intro4_porsche_ots_mc_lhd_1794833233521.jpg",
        "story/intro_4/penthouse_arrival.webp": BRAIN / "cg_intro4_penthouse_arrival_fixed_1794833134843.jpg",
        # Intro_5 (Room-locked 01:42 Night arrival, Voyeur window angles & 4-Queens spread!)
        "story/intro_5/01_doorway_wide.webp": BRAIN / "cg_intro5_01_doorway_wide_fixed_1794833181993.jpg",
        "story/intro_5/02_low_heels_hem.webp": HARVEST / "sd_intro5_02_low_heels_hem.png",
        "story/intro_5/03_sofa_lashes_pov.webp": BRAIN / "cg_intro5_03_sofa_lashes_pov_fixed_1794833308346.jpg",
        "story/intro_5/04_window_silhouette.webp": HARVEST / "sd_intro5_04_window_silhouette_ots.png",
        "story/intro_5/05_macro_spine_zipper.webp": HARVEST / "sd_intro5_05_macro_spine_zipper.png",
        "story/intro_5/06_low_silk_stockings.webp": HARVEST / "sd_intro5_06_low_silk_stockings.png",
        "story/intro_5/07_glass_reflection.webp": BRAIN / "cg_intro5_07_glass_reflection_fixed_1794833341945.jpg",
        "story/intro_5/08_cards_table_pov.webp": HARVEST / "sd_intro5_08_cards_table_pov.png",
        "story/intro_5/awake_sofa.webp": BRAIN / "cg_intro5_awake_sofa_fixed_1794833404136.jpg",
        # Intro_6 (4-angle Dispatch 2D Shower + Room-locked Towel scenes + Lenka Intercom!)
        "story/intro_6/01_shower_door_ajar.webp": HARVEST / "sd_intro6_01_shower_door_ajar.png",
        "story/intro_6/02_shower_low_angle.webp": HARVEST / "sd_intro6_02_shower_low_angle.png",
        "story/intro_6/03_shower_high_angle.webp": HARVEST / "sd_intro6_03_shower_high_angle.png",
        "story/intro_6/04_shower_steamy_mirror.webp": HARVEST / "sd_intro6_04_shower_steamy_mirror.png",
        "story/intro_6/towel_high_loyalty.webp": BRAIN / "cg_intro6_towel_high_fixed_1794833453422.jpg",
        "story/intro_6/towel_low_loyalty.webp": BRAIN / "cg_intro6_towel_low_fixed_1794835377373.jpg",
        "story/intro_6/lenka_intercom.webp": HARVEST / "cg_intro6_lenka_intercom_v3.png",
    }
    for rel, src in story_map.items():
        save_webp_916(src, ASSETS / rel)

    # 5. ITEMS & HOTSPOT CUTOUTS
    items_copy = {
        "items/lounge_card_wine.webp": ASSETS / "v2/prop_lounge_card_wine.webp",
        "items/calla_bouquet.webp": ASSETS / "v2/prop_calla_bouquet.webp",
        "items/swing_photo_1408.webp": ASSETS / "v2/prop_swing_photo_1408.webp",
        "items/cutout_wine_card.webp": ASSETS / "v2/cutout_wine_card.webp",
        "items/cutout_calla_note.webp": ASSETS / "v2/cutout_calla_note.webp",
        "items/cutout_silk_lace.webp": ASSETS / "v2/cutout_silk_lace.webp",
        "items/cutout_swing_frame.webp": ASSETS / "v2/cutout_swing_frame.webp",
    }
    (ASSETS / "items").mkdir(parents=True, exist_ok=True)
    for rel, src in items_copy.items():
        if src.exists():
            shutil.copy2(src, ASSETS / rel)

    # 6. VIDEOS (8 brand-new Space v3 Kling 2.5 animations + 2 clean v2 oneshots)
    videos_transcode = {
        "videos/loops/trolleybus_temple_10s.mp4": HARVEST / "vid_v3_01_trolleybus_10s_loop.mp4",
        "videos/loops/macro_raindrops_10s.mp4": HARVEST / "vid_v3_15_macro_raindrops_10s.mp4",
        "videos/oneshots/trolley_pull_in_5s.mp4": HARVEST / "vid_v3_13_trolley_pull_in_5s.mp4",
        "videos/oneshots/hug_embrace_5s.mp4": HARVEST / "vid_v3_03_hug_5s_freeze.mp4",
        "videos/oneshots/spine_zipper_5s.mp4": HARVEST / "vid_v3_05_zipper_5s_freeze.mp4",
        "videos/oneshots/silk_stockings_5s.mp4": HARVEST / "vid_v3_06_silk_stockings_5s_freeze.mp4",
        "videos/oneshots/steamy_mirror_5s.mp4": HARVEST / "vid_v3_10_steamy_mirror_5s_freeze.mp4",
        "videos/oneshots/lenka_intercom_5s.mp4": HARVEST / "vid_v3_11_lenka_intercom_5s_freeze.mp4",
    }
    for rel, src in videos_transcode.items():
        transcode_mp4(src, ASSETS / rel)

    for rel, src in {
        "videos/oneshots/doc_watch_5s.mp4": ASSETS / "v2/vid_10_doc_watch.mp4",
        "videos/oneshots/secret_call_5s.mp4": ASSETS / "v2/vid_03_secret_call.mp4",
    }.items():
        if src.exists():
            (ASSETS / rel).parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, ASSETS / rel)

    print("Organized full Amnesia-style asset tree successfully!")


if __name__ == "__main__":
    main()
