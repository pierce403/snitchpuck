"""Render the static social image. Requires Pillow, fontTools and Brotli."""
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
SCALE = 2
PAPER, INK, RED, MUTED = '#f1eee5', '#202822', '#ba3d24', '#60655c'


def font(stem, size):
    face = TTFont(ROOT / 'site/assets' / (stem + '.woff2'))
    face.flavor = None
    data = BytesIO()
    face.save(data)
    data.seek(0)
    return ImageFont.truetype(data, size * SCALE)


card = Image.new('RGB', (1200 * SCALE, 630 * SCALE), PAPER)
draw = ImageDraw.Draw(card)
heading = font('barlow-condensed-latin', 116)
label = font('dm-sans-latin', 11)
small = font('dm-sans-latin', 9)
body = font('dm-sans-latin', 21)


def text(x, y, value, face, color=INK):
    draw.text((x * SCALE, y * SCALE), value, font=face, fill=color, anchor='lt')


def rectangle(box, fill, outline=None):
    draw.rectangle(tuple(int(n * SCALE) for n in box), fill=fill,
                   outline=outline, width=SCALE)


text(46, 39, 'SNITCHPUCK.ORG', label)
right = 'HALO 3C / 2025 RESEARCH'
text(1154 - draw.textlength(right, font=label) / SCALE, 39, right, label)
draw.line((46 * SCALE, 69 * SCALE, 1154 * SCALE, 69 * SCALE), fill=INK, width=SCALE)
text(46, 143, 'HALO SENSOR', font('barlow-condensed-latin', 100))
text(46, 239, 'SECURITY', heading, RED)
text(46, 335, 'RESEARCH', heading, RED)
text(46, 451, 'Rey & nyx / DEF CON 33', body)
text(46, 481, '2025 findings and firmware update', body)
rectangle((624, 116, 1158, 554), '#dedbd1')
rectangle((618, 110, 1152, 548), '#faf8f1', '#c8c9bd')
photo = Image.open(ROOT / 'site/assets/halo-3c-photo.webp').convert('RGB')
photo.thumbnail((514 * SCALE, 390 * SCALE), Image.Resampling.LANCZOS)
card.paste(photo, (628 * SCALE, 120 * SCALE))
text(628, 516, 'HALO 3C SENSOR', small, MUTED)
text(628, 533, 'Rey & nyx / DEF CON 33 slides, p. 29', small, MUTED)
draw.line((46 * SCALE, 573 * SCALE, 1154 * SCALE, 573 * SCALE), fill=INK, width=SCALE)
text(46, 590, 'Presentation, reporting and vendor advisory', label)
card.resize((1200, 630), Image.Resampling.LANCZOS).save(
    ROOT / 'site/assets/social.png', optimize=True)
