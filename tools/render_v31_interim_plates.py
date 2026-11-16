#!/usr/bin/env python3
"""Render clean stylized 720x1280 interim storyboard plates for new v3.1 scenes
(before Seedream 5.5 + Kling 2.5 nodes on Space Page 5 are run & harvested)."""

import math
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

OUT_DIR = Path(__file__).resolve().parent.parent / "assets" / "v3"
W, H = 720, 1280


def vgrad(top_rgb, bot_rgb):
    img = Image.new("RGB", (W, H))
    px = img.load()
    for y in range(H):
        t = y / max(1, H - 1)
        r = int(top_rgb[0] + (bot_rgb[0] - top_rgb[0]) * t)
        g = int(top_rgb[1] + (bot_rgb[1] - top_rgb[1]) * t)
        b = int(top_rgb[2] + (bot_rgb[2] - top_rgb[2]) * t)
        for x in range(W):
            px[x, y] = (r, g, b)
    return img


def add_rain_streaks(base, count=140, color=(190, 210, 230, 55), angle=-12):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    rng = random.Random(42)
    dx = int(math.tan(math.radians(angle)) * 70)
    for _ in range(count):
        x = rng.randint(-40, W + 40)
        y = rng.randint(-40, H)
        length = rng.uniform(0.5, 1.35)
        d.line([(x, y), (x + int(dx * length), y + int(70 * length))], fill=color, width=2)
    layer = layer.filter(ImageFilter.GaussianBlur(0.6))
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


def add_bokeh(base, lights):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for cx, cy, rad, col in lights:
        d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=col)
    layer = layer.filter(ImageFilter.GaussianBlur(22))
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


def render_signboard():
    img = vgrad((38, 46, 58), (18, 22, 30))
    d = ImageDraw.Draw(img)
    # Wet brick pillar left & wrought-iron gate bars right
    d.rectangle([0, 120, 410, H], fill=(64, 42, 38), outline=(14, 15, 20), width=5)
    for row in range(130, H, 54):
        d.line([(0, row), (410, row)], fill=(36, 24, 22), width=3)
    for bar_x in range(455, W, 52):
        d.rectangle([bar_x, 220, bar_x + 14, H], fill=(24, 28, 35), outline=(10, 12, 16), width=3)
    d.rectangle([410, 340, W, 362], fill=(28, 32, 40), outline=(10, 12, 16), width=3)
    # Official brass/enamel plaque on pillar
    d.rounded_rectangle([58, 390, 366, 650], radius=14, fill=(26, 36, 52), outline=(196, 164, 102), width=6)
    d.rounded_rectangle([72, 404, 352, 636], radius=8, outline=(140, 118, 76), width=2)
    # Stylized emblem + geometric lines (no garbled text)
    d.ellipse([186, 426, 238, 478], fill=(196, 164, 102), outline=(16, 20, 28), width=3)
    for ly, lw in [(506, 210), (534, 240), (562, 180), (594, 130)]:
        d.rounded_rectangle([212 - lw // 2, ly, 212 + lw // 2, ly + 10], radius=4, fill=(214, 196, 156))
    img = add_bokeh(img, [(560, 290, 90, (235, 185, 95, 70)), (620, 820, 110, (120, 155, 195, 55))])
    img = add_rain_streaks(img, 160)
    img.save(OUT_DIR / "interim_intro1_signboard.webp", "WEBP", quality=88)


def render_katya_cross():
    img = vgrad((28, 35, 46), (14, 18, 25))
    img = add_bokeh(img, [(190, 260, 120, (230, 185, 105, 65)), (540, 320, 140, (110, 150, 185, 65))])
    d = ImageDraw.Draw(img)
    # Open palm silhouette (warm cel-shaded tone) + olive sleeve from top-right
    d.polygon([(0, 930), (240, 740), (540, 720), (610, 820), (450, 980), (0, 1180)], fill=(212, 168, 144), outline=(18, 16, 22))
    d.polygon([(720, 250), (470, 470), (565, 590), (720, 470)], fill=(72, 86, 62), outline=(16, 18, 20))
    d.polygon([(470, 470), (355, 585), (415, 635), (555, 575)], fill=(224, 182, 160), outline=(18, 16, 22))
    # Dark cord loop
    d.arc([255, 490, 465, 755], start=165, end=375, fill=(26, 26, 32), width=7)
    # Worn antique silver Orthodox/family cross pendant in center of palm
    cx, cy = 360, 748
    # Bail ring
    d.ellipse([cx - 12, cy - 82, cx + 12, cy - 56], outline=(205, 212, 224), width=6)
    # Shadow
    d.rounded_rectangle([cx - 13 + 5, cy - 60 + 6, cx + 13 + 5, cy + 78 + 6], radius=5, fill=(35, 28, 30))
    d.rounded_rectangle([cx - 54 + 5, cy - 22 + 6, cx + 54 + 5, cy + 2 + 6], radius=5, fill=(35, 28, 30))
    # Silver cross body with bold ink outline
    d.rounded_rectangle([cx - 14, cy - 60, cx + 14, cy + 78], radius=5, fill=(210, 218, 230), outline=(18, 20, 28), width=4)
    d.rounded_rectangle([cx - 54, cy - 22, cx + 54, cy + 2], radius=5, fill=(210, 218, 230), outline=(18, 20, 28), width=4)
    d.rounded_rectangle([cx - 26, cy - 46, cx + 26, cy - 34], radius=3, fill=(198, 206, 220), outline=(18, 20, 28), width=3)
    # Specular silver highlight
    d.line([(cx - 4, cy - 52), (cx - 4, cy + 68)], fill=(246, 250, 255), width=3)
    img = add_rain_streaks(img, 95)
    img.save(OUT_DIR / "interim_intro1_katya_cross.webp", "WEBP", quality=88)


def render_bus_stop():
    img = vgrad((42, 52, 66), (16, 20, 28))
    d = ImageDraw.Draw(img)
    # Wet asphalt road
    d.polygon([(0, 860), (W, 820), (W, H), (0, H)], fill=(22, 26, 34))
    # Autumn maple canopy silhouettes
    img = add_bokeh(img, [
        (140, 260, 130, (196, 128, 46, 85)),
        (360, 210, 150, (182, 108, 38, 75)),
        (520, 690, 95, (255, 212, 118, 165)),
        (615, 695, 95, (255, 212, 118, 165)),
        (565, 980, 120, (255, 196, 92, 95)),
    ])
    d = ImageDraw.Draw(img)
    # Approaching trolleybus silhouette on right
    d.rounded_rectangle([465, 455, 675, 790], radius=24, fill=(34, 62, 104), outline=(12, 16, 24), width=5)
    d.rounded_rectangle([485, 490, 655, 625], radius=12, fill=(232, 188, 116), outline=(14, 18, 24), width=4)
    # Trolley poles
    d.line([(530, 455), (430, 240)], fill=(22, 26, 34), width=5)
    d.line([(605, 455), (505, 240)], fill=(22, 26, 34), width=5)
    # Glass bus shelter frame on left
    d.rectangle([48, 250, 390, 930], outline=(30, 36, 46), width=8)
    d.polygon([(24, 250), (430, 225), (448, 262), (24, 282)], fill=(26, 31, 40), outline=(12, 14, 18))
    img = add_rain_streaks(img, 175)
    img.save(OUT_DIR / "interim_intro1_bus_stop.webp", "WEBP", quality=88)


def render_trolley_doors():
    img = vgrad((24, 30, 42), (14, 16, 22))
    img = add_bokeh(img, [(360, 580, 240, (255, 188, 92, 130)), (360, 1080, 190, (245, 172, 78, 95))])
    d = ImageDraw.Draw(img)
    # Trolleybus body around open doorway
    d.rectangle([0, 80, W, 980], fill=(30, 54, 92), outline=(12, 15, 22), width=6)
    # Open doorway glowing warm amber
    d.rectangle([135, 165, 585, 965], fill=(238, 182, 98), outline=(16, 18, 24), width=6)
    # Folding door panels left & right
    d.rectangle([135, 165, 205, 965], fill=(42, 48, 60), outline=(14, 16, 22), width=5)
    d.rectangle([515, 165, 585, 965], fill=(42, 48, 60), outline=(14, 16, 22), width=5)
    # Steps + handrail
    for sy in [835, 895, 945]:
        d.rectangle([205, sy, 515, sy + 24], fill=(56, 52, 54), outline=(18, 18, 22), width=3)
    d.line([(360, 220), (360, 835)], fill=(212, 175, 95), width=8)
    img = add_rain_streaks(img, 120)
    img.save(OUT_DIR / "interim_intro1_trolley_doors.webp", "WEBP", quality=88)


def render_porsche_ext():
    img = vgrad((10, 14, 26), (8, 10, 18))
    img = add_bokeh(img, [
        (360, 310, 160, (72, 136, 235, 95)),
        (460, 280, 130, (238, 178, 86, 85)),
        (220, 920, 140, (235, 64, 64, 80)),
        (510, 910, 140, (255, 204, 124, 95)),
    ])
    d = ImageDraw.Draw(img)
    # Distant Moscow-City towers silhouette
    for tx, tw, th in [(250, 56, 360), (316, 72, 430), (400, 62, 390), (474, 52, 320)]:
        d.rectangle([tx, 520 - th, tx + tw, 520], fill=(24, 38, 66), outline=(58, 96, 152), width=2)
    # Wet boulevard perspective
    d.polygon([(0, 680), (W, 680), (W, H), (0, H)], fill=(14, 17, 26))
    # Sleek midnight-black Porsche coupe silhouette (rear-3/4 / front-3/4 low angle)
    d.polygon([(95, 860), (195, 735), (475, 725), (625, 835), (640, 935), (80, 945)],
              fill=(18, 22, 32), outline=(92, 118, 160), width=4)
    # Cabin greenhouse glass
    d.polygon([(215, 742), (445, 735), (525, 810), (175, 815)],
              fill=(44, 62, 92), outline=(140, 168, 210), width=3)
    # Signature LED light bar / headlights
    d.rounded_rectangle([115, 848, 245, 868], radius=8, fill=(255, 236, 198))
    d.rounded_rectangle([475, 842, 605, 864], radius=8, fill=(255, 236, 198))
    img = add_rain_streaks(img, 150)
    img.save(OUT_DIR / "interim_intro4_porsche_ext.webp", "WEBP", quality=88)


def render_porsche_cabin():
    img = vgrad((14, 20, 34), (10, 12, 20))
    img = add_bokeh(img, [
        (160, 280, 120, (245, 175, 82, 105)),
        (540, 250, 140, (78, 145, 245, 105)),
        (360, 420, 150, (225, 92, 112, 70)),
    ])
    d = ImageDraw.Draw(img)
    # Windshield frame & Cognac/Obsidian luxury dashboard
    d.polygon([(0, 0), (W, 0), (W, 130), (0, 150)], fill=(12, 14, 20))
    d.polygon([(0, 740), (W, 720), (W, H), (0, H)], fill=(20, 18, 24), outline=(74, 52, 42), width=4)
    # Stitched cognac leather trim strip + ambient LED line
    d.line([(0, 760), (W, 740)], fill=(218, 158, 88), width=4)
    # Sport steering wheel on left (180-degree cinema axis)
    d.ellipse([78, 560, 348, 830], outline=(32, 30, 38), width=24)
    d.ellipse([186, 668, 240, 722], fill=(28, 28, 36), outline=(196, 162, 98), width=3)
    # Instrument cluster glow
    for gx in [135, 212, 288]:
        d.ellipse([gx - 30, 695, gx + 30, 755], outline=(238, 176, 92), width=3)
    img = add_rain_streaks(img, 90)
    img.save(OUT_DIR / "interim_intro4_porsche_cabin.webp", "WEBP", quality=88)


if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    render_signboard()
    render_katya_cross()
    render_bus_stop()
    render_trolley_doors()
    render_porsche_ext()
    render_porsche_cabin()
    print("Rendered 6 interim v3.1 plates successfully.")
