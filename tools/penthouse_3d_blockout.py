#!/usr/bin/env python3
"""
Metric 3D Architectural Blockout & Perspective Lighting Renderer for Masha's Presnya Penthouse (32nd floor).
Builds all 4 interconnected rooms in unified 3D world space (meters) with Moscow-City exterior skyline
and renders:
  - 16 synchronized Room x Time-of-Day plates (4 rooms x 4 weather/lighting states)
  - 12 multi-angle cutscene camera blockouts (01:42 Arrival/Undress/4-Queens + 07:32 Shower coverage)
Used both as 100% physically consistent 3D reference guides for Seedream 5.5 on Magnific Spaces
and as instant v3 architectural fallback plates in the VN engine.
"""

import math
import os
from dataclasses import dataclass
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V3_DIR = os.path.join(BASE_DIR, "assets", "v3")
REFS_3D_DIR = os.path.join(V3_DIR, "3d_refs")
QC_PATH = "/Users/admin/.gemini/antigravity/brain/512d5981-6390-4c1e-bb98-4121f628ce87/scratch/penthouse_3d_qc.jpg"

os.makedirs(V3_DIR, exist_ok=True)
os.makedirs(REFS_3D_DIR, exist_ok=True)

W, H = 360, 640  # Fast supersampled 3D buffer -> upscaled + crisp wireframe/glow overlay to 720x1280
OUT_W, OUT_H = 720, 1280


@dataclass
class Box3D:
    xmin: float
    ymin: float
    zmin: float
    xmax: float
    ymax: float
    zmax: float
    color: tuple  # (R, G, B) 0..255 albedo
    emissive: tuple = (0, 0, 0)
    alpha: float = 1.0
    tag: str = ""


TIME_PRESETS = {
    "rain_evening": {
        "sky_top": (16, 22, 38),
        "sky_horizon": (36, 46, 72),
        "ambient": (0.34, 0.36, 0.46),
        "sun_dir": (0.2, -0.4, 0.88),
        "sun_col": (0.18, 0.24, 0.42),
        "lamp_col": (1.25, 0.88, 0.52),
        "lamp_strength": 1.0,
        "city_glow": 1.0,
        "rain": True,
        "sunbeams": False,
        "steam": False,
    },
    "night_clear": {
        "sky_top": (7, 10, 22),
        "sky_horizon": (18, 28, 56),
        "ambient": (0.20, 0.24, 0.38),
        "sun_dir": (0.15, -0.35, 0.92),
        "sun_col": (0.28, 0.42, 0.78),
        "lamp_col": (1.05, 0.72, 0.42),
        "lamp_strength": 0.48,
        "city_glow": 1.25,
        "rain": False,
        "sunbeams": False,
        "steam": False,
    },
    "dawn_mist": {
        "sky_top": (34, 38, 68),
        "sky_horizon": (148, 108, 126),
        "ambient": (0.48, 0.46, 0.58),
        "sun_dir": (0.42, -0.22, 0.88),
        "sun_col": (0.72, 0.54, 0.66),
        "lamp_col": (0.9, 0.68, 0.45),
        "lamp_strength": 0.22,
        "city_glow": 0.45,
        "rain": False,
        "sunbeams": False,
        "steam": False,
    },
    "morning_sun": {
        "sky_top": (86, 146, 214),
        "sky_horizon": (246, 214, 168),
        "ambient": (0.68, 0.66, 0.64),
        "sun_dir": (0.48, -0.44, 0.76),
        "sun_col": (1.35, 1.08, 0.76),
        "lamp_col": (1.0, 0.85, 0.65),
        "lamp_strength": 0.15,
        "city_glow": 0.06,
        "rain": False,
        "sunbeams": True,
        "steam": False,
    },
}


def build_world_boxes(preset_key: str):
    p = TIME_PRESETS[preset_key]
    cg = p["city_glow"]
    ls = p["lamp_strength"]
    lamp_em = tuple(int(min(255, c * 185 * ls)) for c in p["lamp_col"])
    boxes = []

    # ==================== EXTERIOR MOSCOW-CITY SKYLINE (Z = -18 .. -36) ====================
    towers = [
        # (x0, x1, z0, z1, height, base_rgb, warm_gold_flag)
        (-13.5, -10.2, -28.0, -24.5, 14.5, (42, 62, 92), False),
        (-9.4, -6.5, -25.0, -21.8, 17.5, (48, 74, 108), True),     # Visible from bathroom & bedroom!
        (-5.6, -2.6, -26.5, -23.0, 20.5, (38, 66, 98), False),     # Federation tower
        (-1.9, 0.8, -23.5, -20.5, 16.8, (88, 64, 38), True),       # Golden Mercury tower
        (1.4, 4.4, -27.0, -23.5, 19.2, (44, 70, 104), False),      # Evolution / Imperia
        (5.0, 8.2, -25.5, -22.2, 15.6, (52, 68, 94), True),        # Visible from kitchen!
    ]
    for x0, x1, z0, z1, th, col, is_gold in towers:
        em_base = (int(230 * cg), int(165 * cg), int(75 * cg)) if is_gold else (int(95 * cg), int(165 * cg), int(235 * cg))
        boxes.append(Box3D(x0, -6.0, z0, x1, th, z1, col, emissive=tuple(c // 5 for c in em_base), tag="tower"))
        # Lit horizontal window bands on towers
        if cg > 0.15:
            for wy in np.linspace(-3.5, th - 1.0, 9):
                boxes.append(
                    Box3D(x0 - 0.05, float(wy), z1 - 0.08, x1 + 0.05, float(wy + 0.22), z1 + 0.04, col, emissive=em_base, tag="tower_win")
                )

    # ==================== SHARED PENTHOUSE SHELL ====================
    # Floor Y=0, Ceiling Y=3.35
    # Living + Kitchen warm herringbone oak floor (X=-4.5..5.5, Z=-4.0..3.6)
    boxes.append(Box3D(-4.5, -0.15, -4.0, 5.5, 0.0, 3.6, (66, 50, 38), tag="floor_wood"))
    # Bedroom dark walnut floor + plush rug (X=-8.8..-4.5, Z=-4.0..2.0)
    boxes.append(Box3D(-8.8, -0.15, -4.0, -4.5, 0.0, 2.0, (58, 44, 36), tag="floor_bed"))
    # Bathroom Calacatta white/grey marble floor (X=-8.8..-4.5, Z=2.0..5.4)
    boxes.append(Box3D(-8.8, -0.15, 2.0, -4.5, 0.0, 5.4, (196, 194, 190), tag="floor_bath"))
    # Ceiling slab across entire penthouse
    boxes.append(Box3D(-8.8, 3.35, -4.0, 5.5, 3.55, 5.4, (182, 178, 174), tag="ceiling"))

    # North panoramic window mullions along Z=-4.0 (X=-8.8..5.5)
    for mx in [-8.75, -6.6, -4.5, -2.5, -0.5, 1.5, 3.5, 5.45]:
        boxes.append(Box3D(mx - 0.06, 0.0, -4.02, mx + 0.06, 3.35, -3.90, (28, 30, 36), tag="mullion"))
    boxes.append(Box3D(-8.8, 0.0, -4.02, 5.5, 0.14, -3.88, (32, 34, 40), tag="sill"))

    # ==================== ZONE 1: LIVING ROOM & FOYER (X=-4.5..1.5, Z=-4.0..3.6) ====================
    # West wall separating Living & Bedroom (with doorway at Z=0.3..1.35)
    boxes.append(Box3D(-4.58, 0.0, -4.0, -4.42, 3.35, 0.3, (148, 140, 132)))
    boxes.append(Box3D(-4.58, 2.35, 0.3, -4.42, 3.35, 1.35, (148, 140, 132)))
    boxes.append(Box3D(-4.58, 0.0, 1.35, -4.42, 3.35, 3.6, (148, 140, 132)))
    # Warm vertical LED cove strip on Living West wall
    boxes.append(Box3D(-4.41, 0.4, -2.6, -4.37, 2.9, -2.52, (220, 190, 140), emissive=lamp_em))

    # South Foyer wall & Entry Door (Z=3.55)
    boxes.append(Box3D(-4.5, 0.0, 3.52, 1.5, 3.35, 3.68, (136, 130, 124)))
    # Armored dark designer front door (X=0.25..1.25, Z=3.48)
    boxes.append(Box3D(0.25, 0.0, 3.46, 1.25, 2.35, 3.53, (40, 36, 34)))
    # Wall Video Intercom Screen beside front door (X=-0.22..0.08, Y=1.25..1.72, Z=3.47)
    boxes.append(Box3D(-0.24, 1.22, 3.45, 0.10, 1.75, 3.52, (22, 24, 28), emissive=(40, 55, 75)))
    # Foyer console + TSUM crimson ribbon box
    boxes.append(Box3D(-1.55, 0.0, 2.95, -0.45, 0.78, 3.46, (62, 48, 38)))
    boxes.append(Box3D(-1.25, 0.78, 3.05, -0.72, 0.94, 3.35, (190, 36, 48)))

    # Living Room Rug + Large L-Sofa + Marble Coffee Table
    boxes.append(Box3D(-3.5, 0.0, -2.5, 0.4, 0.03, 1.4, (124, 118, 112), tag="rug"))
    # Sofa base & backrest (faces North panoramic window Z=-4.0)
    boxes.append(Box3D(-3.2, 0.03, -0.35, -0.15, 0.44, 0.65, (68, 70, 78), tag="sofa_seat"))
    boxes.append(Box3D(-3.2, 0.44, 0.38, -0.15, 0.86, 0.68, (60, 62, 70), tag="sofa_back"))
    boxes.append(Box3D(-3.2, 0.03, -1.35, -2.35, 0.44, -0.35, (68, 70, 78), tag="sofa_chaise"))
    # Cashmere plaid throw on sofa
    boxes.append(Box3D(-1.45, 0.44, -0.32, -0.35, 0.49, 0.42, (186, 168, 144), tag="plaid"))
    # Low dark-marble coffee table in front of sofa (Z=-1.75..-1.05) + red wine bottle & 2 glasses
    boxes.append(Box3D(-2.1, 0.03, -1.75, -0.55, 0.38, -1.05, (44, 42, 48), tag="coffee_table"))
    boxes.append(Box3D(-1.05, 0.38, -1.48, -0.95, 0.68, -1.38, (32, 16, 22), tag="wine_bottle"))
    # Designer floor lamp beside sofa
    boxes.append(Box3D(0.15, 0.0, 0.25, 0.25, 1.75, 0.35, (165, 138, 88)))
    boxes.append(Box3D(0.02, 1.72, 0.12, 0.38, 1.98, 0.48, (245, 220, 175), emissive=lamp_em))

    # ==================== ZONE 2: KITCHEN-ISLAND (X=1.5..5.5, Z=-4.0..1.8) ====================
    boxes.append(Box3D(5.42, 0.0, -4.0, 5.58, 3.35, 1.8, (132, 126, 120)))
    boxes.append(Box3D(1.5, 0.0, 1.72, 5.5, 3.35, 1.88, (76, 60, 48)))
    # Back kitchen cabinetry & espresso niche along South/East wall
    boxes.append(Box3D(3.8, 0.0, -2.2, 5.40, 2.65, 1.68, (54, 44, 38)))
    boxes.append(Box3D(3.82, 0.92, -1.6, 4.55, 1.55, 0.8, (195, 190, 184), emissive=tuple(c // 2 for c in lamp_em)))
    # Sculptural Calacatta marble + fluted walnut bar island (X=2.1..3.3, Z=-2.1..0.5)
    boxes.append(Box3D(2.15, 0.0, -2.1, 3.25, 0.92, 0.45, (72, 54, 42), tag="island_base"))
    boxes.append(Box3D(2.08, 0.92, -2.16, 3.32, 1.00, 0.52, (226, 222, 216), tag="island_top"))
    # Calla bouquet vase on island
    boxes.append(Box3D(2.55, 1.00, -1.35, 2.82, 1.42, -1.08, (230, 236, 232)))
    # Two barstools on Living side of island
    for sz in [-1.55, -0.55]:
        boxes.append(Box3D(1.68, 0.0, sz - 0.16, 1.98, 0.68, sz + 0.16, (48, 46, 50)))
    # Two warm pendant lights above island
    for pz in [-1.5, -0.35]:
        boxes.append(Box3D(2.64, 2.15, pz - 0.12, 2.78, 2.38, pz + 0.12, (245, 215, 165), emissive=lamp_em))

    # ==================== ZONE 3: MASTER BEDROOM & CLOSET (X=-8.8..-4.5, Z=-4.0..2.0) ====================
    boxes.append(Box3D(-8.88, 0.0, -4.0, -8.72, 3.35, 2.0, (142, 134, 128)))
    boxes.append(Box3D(-8.8, 0.0, 1.92, -4.5, 3.35, 2.08, (136, 128, 122)))
    # King bed against West wall (X=-8.7..-6.2, Z=-2.1..0.1)
    boxes.append(Box3D(-8.70, 0.0, -2.25, -8.42, 1.32, 0.25, (92, 80, 74), tag="headboard"))
    boxes.append(Box3D(-8.42, 0.0, -2.05, -6.15, 0.52, 0.05, (218, 212, 206), tag="bed"))
    boxes.append(Box3D(-7.55, 0.52, -2.02, -6.20, 0.58, 0.02, (152, 136, 126), tag="duvet"))
    # Nightstand at North side of bed (Z=-2.75..-2.25) with silver frame 1408 + black iPhone
    boxes.append(Box3D(-8.65, 0.0, -2.82, -8.05, 0.54, -2.28, (64, 50, 42), tag="nightstand"))
    boxes.append(Box3D(-8.42, 0.54, -2.68, -8.24, 0.78, -2.54, (205, 208, 214), tag="photo_1408"))
    boxes.append(Box3D(-8.32, 0.54, -2.48, -8.14, 0.57, -2.34, (22, 24, 30), emissive=(35, 55, 90), tag="masha_iphone"))
    boxes.append(Box3D(-8.52, 0.95, -2.62, -8.32, 1.22, -2.42, (245, 215, 170), emissive=lamp_em))
    # Illuminated Glass Walk-in Wardrobe along South wall (Z=1.25..1.92, X=-8.2..-5.3)
    boxes.append(Box3D(-8.25, 0.0, 1.25, -5.25, 2.75, 1.92, (74, 60, 52), emissive=tuple(c // 3 for c in lamp_em), tag="wardrobe"))

    # ==================== ZONE 4: MARBLE BATHROOM & GLASS SHOWER (X=-8.8..-4.5, Z=2.0..5.4) ====================
    # West exterior wall of bathroom HAS high architectural window (Y=1.25..3.05, Z=2.35..4.15) looking out at SAME sky/towers!
    boxes.append(Box3D(-8.88, 0.0, 2.0, -8.72, 1.25, 5.4, (204, 200, 194)))
    boxes.append(Box3D(-8.88, 3.05, 2.0, -8.72, 3.35, 5.4, (204, 200, 194)))
    boxes.append(Box3D(-8.88, 1.25, 2.0, -8.72, 3.05, 2.35, (204, 200, 194)))
    boxes.append(Box3D(-8.88, 1.25, 4.15, -8.72, 3.05, 5.4, (204, 200, 194)))
    # South wall & East wall of bathroom
    boxes.append(Box3D(-8.8, 0.0, 5.32, -4.5, 3.35, 5.48, (208, 204, 198)))
    boxes.append(Box3D(-4.58, 0.0, 2.0, -4.42, 3.35, 5.4, (198, 194, 188)))
    # Bathroom wooden door on East wall (Z=3.9..4.8)
    boxes.append(Box3D(-4.60, 0.0, 3.95, -4.54, 2.32, 4.82, (88, 68, 54)))
    # Walk-in Frosted Glass Shower Enclosure (X=-8.72..-6.75, Z=2.08..3.85)
    boxes.append(Box3D(-6.80, 0.0, 2.08, -6.72, 2.85, 3.85, (188, 208, 218), alpha=0.42, tag="shower_glass"))
    # Brass overhead rainfall showerhead
    boxes.append(Box3D(-7.95, 2.72, 2.82, -7.50, 2.78, 3.25, (198, 166, 102), tag="shower_head"))
    # Warm backlit shower niche
    boxes.append(Box3D(-8.71, 1.15, 2.09, -7.35, 1.52, 2.22, (225, 196, 148), emissive=lamp_em))
    # Double Marble Vanity + Tall Backlit Mirror on South wall (X=-7.6..-5.2, Z=4.75..5.32)
    boxes.append(Box3D(-7.55, 0.25, 4.75, -5.25, 0.88, 5.32, (218, 214, 208), tag="vanity"))
    boxes.append(Box3D(-7.35, 1.05, 5.24, -5.45, 2.65, 5.31, (172, 194, 208), emissive=tuple(c // 3 for c in lamp_em), tag="mirror"))

    return boxes


def raycast_scene(cam_pos, look_at, fov_deg, preset_key, character_proxy=None):
    """Vectorized ray-AABB caster for crisp, physically exact 3D perspective & lighting."""
    p = TIME_PRESETS[preset_key]
    boxes = build_world_boxes(preset_key)
    if character_proxy:
        for cb in character_proxy:
            boxes.append(cb)

    cam = np.array(cam_pos, dtype=np.float32)
    tgt = np.array(look_at, dtype=np.float32)
    fwd = tgt - cam
    fwd /= np.linalg.norm(fwd)
    up_world = np.array([0.0, 1.0, 0.0], dtype=np.float32)
    if abs(float(np.dot(fwd, up_world))) > 0.97:
        up_world = np.array([0.0, 0.0, -1.0], dtype=np.float32)
    right = np.cross(fwd, up_world)
    right /= np.linalg.norm(right)
    up = np.cross(right, fwd)
    up /= np.linalg.norm(up)

    aspect = W / H
    half_h = math.tan(math.radians(fov_deg) * 0.5)
    half_w = half_h * aspect

    ys = np.linspace(half_h, -half_h, H, dtype=np.float32)
    xs = np.linspace(-half_w, half_w, W, dtype=np.float32)
    gx, gy = np.meshgrid(xs, ys)

    dirs = (
        fwd[None, None, :]
        + gx[:, :, None] * right[None, None, :]
        + gy[:, :, None] * up[None, None, :]
    )
    dirs /= np.linalg.norm(dirs, axis=2, keepdims=True)
    inv_dirs = np.where(np.abs(dirs) < 1e-6, 1e6, 1.0 / dirs)

    # Sky background gradient
    sky_t = np.clip((dirs[:, :, 1] + 0.15) / 0.65, 0.0, 1.0)
    sky_top = np.array(p["sky_top"], dtype=np.float32)
    sky_hor = np.array(p["sky_horizon"], dtype=np.float32)
    img = sky_hor[None, None, :] * (1.0 - sky_t[:, :, None]) + sky_top[None, None, :] * sky_t[:, :, None]

    best_t = np.full((H, W), 1e9, dtype=np.float32)
    glass_overlay = np.zeros((H, W, 4), dtype=np.float32)

    sun_dir = np.array(p["sun_dir"], dtype=np.float32)
    sun_dir /= np.linalg.norm(sun_dir)
    sun_col = np.array(p["sun_col"], dtype=np.float32)
    amb_col = np.array(p["ambient"], dtype=np.float32)

    # Separate opaque vs translucent boxes
    opaque_boxes = [b for b in boxes if b.alpha >= 0.99]
    trans_boxes = [b for b in boxes if b.alpha < 0.99]

    for b in opaque_boxes:
        bmin = np.array([b.xmin, b.ymin, b.zmin], dtype=np.float32)
        bmax = np.array([b.xmax, b.ymax, b.zmax], dtype=np.float32)
        t1 = (bmin[None, None, :] - cam[None, None, :]) * inv_dirs
        t2 = (bmax[None, None, :] - cam[None, None, :]) * inv_dirs
        tmin = np.maximum.reduce(np.minimum(t1, t2), axis=2)
        tmax = np.minimum.reduce(np.maximum(t1, t2), axis=2)

        hit = (tmax >= np.maximum(tmin, 0.05)) & (tmin < best_t)
        if not np.any(hit):
            continue

        t_hit = np.where(tmin > 0.05, tmin, tmax)
        mask = hit & (t_hit < best_t)
        if not np.any(mask):
            continue

        best_t[mask] = t_hit[mask]
        pts = cam[None, None, :] + dirs * t_hit[:, :, None]

        # Normal estimation from closest face
        eps = 1e-3
        nx = np.where(np.abs(pts[:, :, 0] - b.xmin) < eps, -1.0, np.where(np.abs(pts[:, :, 0] - b.xmax) < eps, 1.0, 0.0))
        ny = np.where(np.abs(pts[:, :, 1] - b.ymin) < eps, -1.0, np.where(np.abs(pts[:, :, 1] - b.ymax) < eps, 1.0, 0.0))
        nz = np.where(np.abs(pts[:, :, 2] - b.zmin) < eps, -1.0, np.where(np.abs(pts[:, :, 2] - b.zmax) < eps, 1.0, 0.0))
        norms = np.stack([nx, ny, nz], axis=2)
        nlen = np.maximum(np.linalg.norm(norms, axis=2, keepdims=True), 1e-4)
        norms /= nlen

        ndotl = np.clip(np.sum(norms * (-sun_dir[None, None, :]), axis=2), 0.0, 1.0)
        # Subtle procedural architectural grid/marble/plank lines
        grid_mod = (
            1.0
            + 0.04 * np.sin(pts[:, :, 0] * 9.0)
            + 0.04 * np.cos(pts[:, :, 2] * 9.0)
        )
        albedo = np.array(b.color, dtype=np.float32)[None, None, :] * grid_mod[:, :, None]
        lit = albedo * (amb_col[None, None, :] + sun_col[None, None, :] * (0.65 * ndotl[:, :, None]))
        # Distance atmospheric perspective for exterior towers
        if b.tag.startswith("tower"):
            lit = albedo + np.array(b.emissive, dtype=np.float32)[None, None, :]
        else:
            # Warm interior point-light falloff
            dist_atten = np.clip(1.0 / (1.0 + 0.035 * (t_hit ** 2)), 0.35, 1.15)
            lit = lit * dist_atten[:, :, None] + np.array(b.emissive, dtype=np.float32)[None, None, :]

        img[mask] = np.clip(lit[mask], 0.0, 255.0)

    # Translucent frosted shower glass pass
    for b in trans_boxes:
        bmin = np.array([b.xmin, b.ymin, b.zmin], dtype=np.float32)
        bmax = np.array([b.xmax, b.ymax, b.zmax], dtype=np.float32)
        t1 = (bmin[None, None, :] - cam[None, None, :]) * inv_dirs
        t2 = (bmax[None, None, :] - cam[None, None, :]) * inv_dirs
        tmin = np.maximum.reduce(np.minimum(t1, t2), axis=2)
        tmax = np.minimum.reduce(np.maximum(t1, t2), axis=2)
        hit = (tmax >= np.maximum(tmin, 0.05)) & (tmin < best_t)
        if np.any(hit):
            gcol = np.array(b.color, dtype=np.float32)
            a = b.alpha
            img[hit] = img[hit] * (1.0 - a) + gcol * a

    pil = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8), mode="RGB").resize(
        (OUT_W, OUT_H), Image.Resampling.BILINEAR
    )

    # Atmospheric post-FX (rain streaks on windows / morning sunbeams / shower steam)
    if p["rain"]:
        overlay = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
        d = ImageDraw.Draw(overlay)
        rng = np.random.default_rng(42)
        for _ in range(140):
            rx = int(rng.integers(0, OUT_W))
            ry = int(rng.integers(0, int(OUT_H * 0.72)))
            rl = int(rng.integers(18, 54))
            d.line([(rx, ry), (rx - 5, ry + rl)], fill=(185, 210, 245, 44), width=1)
        pil = Image.alpha_composite(pil.convert("RGBA"), overlay).convert("RGB")

    if p["sunbeams"]:
        overlay = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
        d = ImageDraw.Draw(overlay)
        for i in range(4):
            x0 = 80 + i * 155
            d.polygon(
                [(x0, 0), (x0 + 95, 0), (x0 + 280, OUT_H), (x0 + 130, OUT_H)],
                fill=(255, 226, 168, 24),
            )
        overlay = overlay.filter(ImageFilter.GaussianBlur(radius=18))
        pil = Image.alpha_composite(pil.convert("RGBA"), overlay).convert("RGB")

    return pil


def add_steam_fx(pil: Image.Image) -> Image.Image:
    overlay = Image.new("RGBA", pil.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for cx, cy, rad, al in [
        (220, 520, 190, 52),
        (460, 680, 230, 58),
        (320, 920, 260, 64),
        (520, 380, 170, 44),
    ]:
        d.ellipse((cx - rad, cy - rad, cx + rad, cy + rad), fill=(255, 244, 228, al))
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=42))
    return Image.alpha_composite(pil.convert("RGBA"), overlay).convert("RGB")


def main():
    room_cameras = {
        "living": ((-0.9, 1.52, 2.75), (-1.45, 1.18, -3.8), 62.0),
        "kitchen": ((1.15, 1.52, 1.15), (3.15, 1.12, -3.5), 62.0),
        "bathroom": ((-5.05, 1.50, 4.55), (-7.75, 1.35, 2.75), 64.0),
        "bedroom": ((-4.95, 1.50, 0.85), (-7.65, 1.05, -2.55), 62.0),
    }

    qc_thumbs = []

    # 1. Generate all 16 Room x Time-of-Day plates (4 rooms x 4 weather/lighting states)
    for r_id, (cpos, clook, cfov) in room_cameras.items():
        for t_id in ["rain_evening", "night_clear", "dawn_mist", "morning_sun"]:
            im = raycast_scene(cpos, clook, cfov, t_id)
            if r_id == "bathroom" and t_id == "morning_sun":
                im = add_steam_fx(im)
            webp_path = os.path.join(V3_DIR, f"bg_{r_id}_{t_id}.webp")
            jpg_path = os.path.join(REFS_3D_DIR, f"ref3d_{r_id}_{t_id}.jpg")
            im.save(webp_path, "WEBP", quality=88)
            im.save(jpg_path, "JPEG", quality=90)
            if t_id in ("rain_evening", "morning_sun"):
                qc_thumbs.append((f"{r_id}:{t_id}", im))
            print(f"Rendered 3D room plate: bg_{r_id}_{t_id}.webp")

    # 2. Generate 12 Multi-Angle Cutscene Camera Blockout Guides (locked to exact room coordinates!)
    # Subtle figure framing proxies (skin/dress color blocks) so Seedream locks scale & room geography
    masha_door_proxy = [
        Box3D(0.45, 0.0, 2.45, 0.82, 1.02, 2.72, (28, 48, 108)),   # sapphire evening dress
        Box3D(0.48, 1.02, 2.48, 0.78, 1.52, 2.68, (218, 178, 152)),
        Box3D(0.46, 1.52, 2.46, 0.80, 1.74, 2.72, (232, 198, 122)), # blonde waves
    ]
    masha_window_proxy = [
        Box3D(-1.62, 0.0, -2.85, -1.26, 1.02, -2.58, (32, 52, 112)),
        Box3D(-1.58, 1.02, -2.82, -1.30, 1.54, -2.60, (222, 180, 154)),
        Box3D(-1.60, 1.54, -2.84, -1.28, 1.75, -2.58, (234, 200, 124)),
    ]
    cards_table_proxy = [
        # 4 Queens laid out across coffee table / sofa edge + Masha opposite
        Box3D(-1.65, 0.39, -1.48, -1.53, 0.40, -1.30, (242, 236, 224), emissive=(60, 50, 35)),
        Box3D(-1.46, 0.39, -1.48, -1.34, 0.40, -1.30, (242, 236, 224), emissive=(60, 50, 35)),
        Box3D(-1.27, 0.39, -1.48, -1.15, 0.40, -1.30, (242, 236, 224), emissive=(60, 50, 35)),
        Box3D(-1.08, 0.39, -1.48, -0.96, 0.40, -1.30, (242, 236, 224), emissive=(60, 50, 35)),
        Box3D(-1.52, 0.44, -0.25, -1.12, 1.28, 0.15, (32, 52, 112)),
        Box3D(-1.46, 1.28, -0.20, -1.18, 1.52, 0.08, (234, 200, 124)),
    ]
    shower_masha_proxy = [
        Box3D(-7.88, 0.0, 2.85, -7.52, 1.52, 3.15, (226, 182, 154)),
        Box3D(-7.90, 1.52, 2.84, -7.50, 1.74, 3.16, (232, 198, 122)),
    ]

    mirror_masha_proxy = [
        Box3D(-6.58, 0.0, 4.45, -6.22, 1.52, 4.72, (226, 182, 154)),
        Box3D(-6.60, 1.52, 4.44, -6.20, 1.74, 4.74, (232, 198, 122)),
    ]

    cutscene_cams = [
        ("cam_intro5_01_doorway_wide", (-0.85, 1.42, -0.55), (0.58, 1.12, 3.1), 58.0, "night_clear", masha_door_proxy, False),
        ("cam_intro5_02_low_heels_hem", (-0.55, 0.36, 0.85), (0.62, 0.52, 2.62), 54.0, "night_clear", masha_door_proxy, False),
        ("cam_intro5_03_sofa_lashes_pov", (-1.65, 0.62, 0.12), (-1.42, 1.28, -1.85), 58.0, "night_clear", masha_window_proxy, False),
        ("cam_intro5_04_window_silhouette_ots", (-1.55, 1.18, -0.65), (-1.44, 1.24, -3.8), 54.0, "night_clear", masha_window_proxy, False),
        ("cam_intro5_05_macro_spine_zipper", (-1.18, 1.38, -1.62), (-1.44, 1.26, -2.95), 44.0, "night_clear", masha_window_proxy, False),
        ("cam_intro5_06_low_silk_stockings", (-2.25, 0.34, -1.45), (-1.42, 0.62, -2.72), 52.0, "night_clear", masha_window_proxy, False),
        ("cam_intro5_07_glass_reflection", (-0.55, 1.34, -1.95), (-1.52, 1.24, -3.95), 52.0, "night_clear", masha_window_proxy, False),
        ("cam_intro5_08_cards_table_pov", (-1.32, 1.48, -2.18), (-1.32, 0.55, -0.65), 56.0, "night_clear", cards_table_proxy, False),
        ("cam_intro6_01_shower_door_ajar", (-4.72, 1.46, 4.35), (-7.65, 1.28, 3.02), 56.0, "morning_sun", shower_masha_proxy, True),
        ("cam_intro6_02_shower_low_angle", (-7.12, 0.48, 3.68), (-7.75, 1.55, 2.95), 58.0, "morning_sun", shower_masha_proxy, True),
        ("cam_intro6_03_shower_high_angle", (-6.95, 2.55, 3.72), (-7.72, 1.05, 2.98), 58.0, "morning_sun", shower_masha_proxy, True),
        ("cam_intro6_04_shower_steamy_mirror", (-6.92, 1.48, 3.55), (-6.38, 1.38, 5.25), 54.0, "morning_sun", mirror_masha_proxy, True),
    ]

    for cname, cpos, clook, cfov, t_id, proxy, steam in cutscene_cams:
        im = raycast_scene(cpos, clook, cfov, t_id, character_proxy=proxy)
        if steam:
            im = add_steam_fx(im)
        jpg_path = os.path.join(REFS_3D_DIR, f"{cname}.jpg")
        webp_path = os.path.join(V3_DIR, f"{cname}.webp")
        im.save(jpg_path, "JPEG", quality=90)
        im.save(webp_path, "WEBP", quality=86)
        qc_thumbs.append((cname.replace("cam_", ""), im))
        print(f"Rendered 3D camera blockout: {cname}")

    # Build QC sheet (5 cols x 4 rows = 20 key plates)
    cols = 5
    rows = math.ceil(len(qc_thumbs) / cols)
    tw, th_tile = 216, 396
    sheet = Image.new("RGB", (cols * tw, rows * th_tile), (14, 15, 20))
    dr = ImageDraw.Draw(sheet)
    for idx, (lbl, im) in enumerate(qc_thumbs):
        c = idx % cols
        r = idx // cols
        thumb = im.resize((204, 362), Image.Resampling.LANCZOS)
        sheet.paste(thumb, (c * tw + 6, r * th_tile + 26))
        dr.text((c * tw + 8, r * th_tile + 6), lbl[:24], fill=(238, 214, 160))
    sheet.save(QC_PATH, "JPEG", quality=88)
    print(f"Saved 3D QC contact sheet: {QC_PATH}")


if __name__ == "__main__":
    main()
