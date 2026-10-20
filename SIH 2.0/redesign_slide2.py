import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

pptx_path = "SIH 2.0/SIH2025-IDEA-Presentation-Format.pptx"
prs = Presentation(pptx_path)

# Target Slide 2 ONLY
slide2 = prs.slides[1]

# Palette - Editorial Minimalist & High Contrast
COLOR_NAVY_DARK = RGBColor(0x0B, 0x13, 0x2B)
COLOR_NAVY_TITLE = RGBColor(0x1F, 0x4E, 0x79)
COLOR_SLATE_DARK = RGBColor(0x1E, 0x29, 0x3B)
COLOR_SLATE_MUTED = RGBColor(0x47, 0x55, 0x69)
COLOR_SLATE_LIGHT = RGBColor(0x64, 0x74, 0x8B)

COLOR_TEAL_DARK = RGBColor(0x0D, 0x94, 0x88)
COLOR_TEAL_ACCENT = RGBColor(0x14, 0xB8, 0xA6)
COLOR_TEAL_TINT = RGBColor(0xF0, 0xFD, 0xFA)
COLOR_TEAL_BORDER = RGBColor(0x0D, 0x94, 0x88)

COLOR_WHITE = RGBColor(0xFF, 0xFF, 0xFF)
COLOR_OFFWHITE = RGBColor(0xF8, 0xF9, 0xFA)
COLOR_CARD_BORDER = RGBColor(0xCB, 0xD5, 0xE1)
COLOR_DIVIDER = RGBColor(0xE2, 0xE8, 0xF0)

# 1. Update Oval 9 (Team Name Badge at top-left)
for s in slide2.shapes:
    if s.name.startswith("Oval"):
        s.left = Inches(0.80)
        s.top = Inches(0.30)
        s.width = Inches(1.70)
        s.height = Inches(0.55)
        s.fill.solid()
        s.fill.fore_color.rgb = COLOR_OFFWHITE
        s.line.color.rgb = COLOR_CARD_BORDER
        s.line.width = Pt(1)
        if s.has_text_frame:
            tf = s.text_frame
            tf.clear()
            tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
            p = tf.paragraphs[0]
            p.text = "TeamChargers"
            p.alignment = PP_ALIGN.CENTER
            p.font.name = "Arial"
            p.font.size = Pt(11)
            p.font.bold = True
            p.font.color.rgb = COLOR_NAVY_DARK

# 2. Update Title 1
for s in slide2.shapes:
    if s.name == "Title 1":
        s.left = Inches(2.65)
        s.top = Inches(0.18)
        s.width = Inches(7.95)
        s.height = Inches(0.95)
        if s.has_text_frame:
            tf = s.text_frame
            tf.word_wrap = True
            tf.clear()
            # Mandatory Template Heading: IDEA TITLE
            p1 = tf.paragraphs[0]
            p1.alignment = PP_ALIGN.CENTER
            r1 = p1.add_run()
            r1.text = "IDEA TITLE: "
            r1.font.name = "Garamond"
            r1.font.size = Pt(22)
            r1.font.bold = True
            r1.font.color.rgb = COLOR_NAVY_TITLE
            
            r2 = p1.add_run()
            r2.text = "SkillSaathi"
            r2.font.name = "Arial"
            r2.font.size = Pt(22)
            r2.font.bold = True
            r2.font.color.rgb = COLOR_NAVY_DARK
            p1.space_after = Pt(2)
            
            # Tagline / Headline
            p2 = tf.add_paragraph()
            p2.alignment = PP_ALIGN.CENTER
            r3 = p2.add_run()
            r3.text = "Beyond Career Advice, Towards Family Consensus"
            r3.font.name = "Arial"
            r3.font.size = Pt(14)
            r3.font.italic = True
            r3.font.color.rgb = COLOR_TEAL_DARK

# 3. Clean up existing dynamic/content shapes on Slide 2
shapes_to_remove = [s for s in slide2.shapes if s.name.startswith("Dynamic_") or s.name == "TextBox 8"]
for s in shapes_to_remove:
    sp = s._element
    sp.getparent().remove(sp)

# ==============================================================================
# SECTION A: ONE-LINE DESCRIPTION (Sub-Header Banner)
# ==============================================================================
tb_desc = slide2.shapes.add_textbox(Inches(0.80), Inches(1.28), Inches(11.733), Inches(0.45))
tb_desc.name = "Dynamic_OneLineDesc"
tf_desc = tb_desc.text_frame
tf_desc.word_wrap = True
tf_desc.margin_left = tf_desc.margin_right = tf_desc.margin_top = tf_desc.margin_bottom = 0
p_desc = tf_desc.paragraphs[0]
p_desc.alignment = PP_ALIGN.CENTER
r_desc = p_desc.add_run()
r_desc.text = "An AI-powered platform helping students and parents make informed vocational career decisions together."
r_desc.font.name = "Arial"
r_desc.font.size = Pt(15)
r_desc.font.color.rgb = COLOR_SLATE_DARK

# Subtle horizontal divider line under description
divider = slide2.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(3.00), Inches(1.85), Inches(7.333), Inches(0.02))
divider.name = "Dynamic_Divider"
divider.fill.solid()
divider.fill.fore_color.rgb = COLOR_DIVIDER
divider.line.fill.background()

# ==============================================================================
# SECTION B: MAIN VISUAL — FAMILY CONSENSUS INTELLIGENCE (Dominant Centerpiece)
# ONE Large Horizontal Process Diagram: 3 Clean Stages with Generous Whitespace
# STUDENT + PARENT → AI COUNSELLING → FAMILY DECISION
# Top: 2.15", Height: 2.45"
# ==============================================================================
stage_w = Inches(3.35)
arrow_w = Inches(0.84)
stage_h = Inches(2.35)
top_y = Inches(2.15)
start_x = Inches(0.80)

stages_data = [
    {
        "pill": "INPUT",
        "title": "STUDENT + PARENT",
        "label": "Aspirations & Concerns",
        "bg": COLOR_WHITE,
        "border": COLOR_CARD_BORDER,
        "border_width": Pt(1),
        "pill_color": COLOR_SLATE_LIGHT,
        "label_color": COLOR_SLATE_DARK
    },
    {
        "pill": "CENTRAL INTELLIGENCE",
        "title": "AI COUNSELLING",
        "label": "Verified Data & Personalized Guidance",
        "bg": COLOR_TEAL_TINT,
        "border": COLOR_TEAL_BORDER,
        "border_width": Pt(1.5),
        "pill_color": COLOR_TEAL_DARK,
        "label_color": COLOR_TEAL_DARK
    },
    {
        "pill": "OUTCOME",
        "title": "FAMILY DECISION",
        "label": "Confidence & Career Clarity",
        "bg": COLOR_WHITE,
        "border": COLOR_CARD_BORDER,
        "border_width": Pt(1),
        "pill_color": COLOR_SLATE_LIGHT,
        "label_color": COLOR_SLATE_DARK
    }
]

for idx, st in enumerate(stages_data):
    sx = start_x + idx * (stage_w + arrow_w)
    
    # Stage Card
    box = slide2.shapes.add_shape(MSO_SHAPE.RECTANGLE, sx, top_y, stage_w, stage_h)
    box.name = f"Dynamic_Stage_{idx}"
    box.fill.solid()
    box.fill.fore_color.rgb = st["bg"]
    box.line.color.rgb = st["border"]
    box.line.width = st["border_width"]
    
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.20)
    tf.margin_right = Inches(0.20)
    tf.margin_top = Inches(0.25)
    tf.margin_bottom = Inches(0.20)
    
    # Pill Tag
    p0 = tf.paragraphs[0]
    p0.alignment = PP_ALIGN.CENTER
    p0.text = st["pill"]
    p0.font.name = "Arial"
    p0.font.size = Pt(9.5)
    p0.font.bold = True
    p0.font.color.rgb = st["pill_color"]
    p0.space_after = Pt(14)
    
    # Large Stage Title
    p1 = tf.add_paragraph()
    p1.alignment = PP_ALIGN.CENTER
    p1.text = st["title"]
    p1.font.name = "Arial"
    p1.font.size = Pt(19)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_NAVY_DARK
    p1.space_after = Pt(12)
    
    # Supporting Label
    p2 = tf.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = st["label"]
    p2.font.name = "Arial"
    p2.font.size = Pt(12.5)
    p2.font.bold = True
    p2.font.color.rgb = st["label_color"]
    
    # Large Arrow connecting stages
    if idx < 2:
        ax = sx + stage_w
        tb_arr = slide2.shapes.add_textbox(ax, top_y + Inches(0.85), arrow_w, Inches(0.60))
        tb_arr.name = f"Dynamic_Arrow_{idx}"
        tf_a = tb_arr.text_frame
        tf_a.margin_left = tf_a.margin_right = tf_a.margin_top = tf_a.margin_bottom = 0
        pa = tf_a.paragraphs[0]
        pa.text = "→"
        pa.alignment = PP_ALIGN.CENTER
        pa.font.name = "Arial"
        pa.font.size = Pt(28)
        pa.font.bold = True
        pa.font.color.rgb = COLOR_TEAL_ACCENT

# ==============================================================================
# SECTION C: THREE INNOVATION HIGHLIGHTS (Bottom Section, Generous Spacing)
# Top: 4.88", Height: 1.65"
# ==============================================================================
card_w = Inches(3.64)
gap_w = Inches(0.40)
innov_y = Inches(4.88)
innov_h = Inches(1.65)

innovations_data = [
    ("01 — Evidence-Based Guidance",
     "Verified earnings, placements & NSQF pathways.",
     "Official trade outcomes ground family discussions in verified economic facts."),
    
    ("02 — Family Confidence Tracking",
     "Measures parental concerns before and after counselling.",
     "Quantifies shifting family consensus, tracking trust and objection resolution."),
    
    ("03 — Human Counsellor Support",
     "Escalates unresolved concerns to real counsellors.",
     "Seamless human safety net when families need specialized human mediation.")
]

for idx, (title, lead, detail) in enumerate(innovations_data):
    ix = start_x + idx * (card_w + gap_w)
    
    ibox = slide2.shapes.add_shape(MSO_SHAPE.RECTANGLE, ix, innov_y, card_w, innov_h)
    ibox.name = f"Dynamic_Innov_{idx}"
    ibox.fill.solid()
    ibox.fill.fore_color.rgb = COLOR_OFFWHITE
    ibox.line.color.rgb = COLOR_CARD_BORDER
    ibox.line.width = Pt(1)
    
    tf_i = ibox.text_frame
    tf_i.word_wrap = True
    tf_i.margin_left = Inches(0.20)
    tf_i.margin_right = Inches(0.20)
    tf_i.margin_top = Inches(0.18)
    tf_i.margin_bottom = Inches(0.15)
    
    # 01 / 02 / 03 Title
    pi0 = tf_i.paragraphs[0]
    pi0.text = title
    pi0.font.name = "Arial"
    pi0.font.size = Pt(13)
    pi0.font.bold = True
    pi0.font.color.rgb = COLOR_NAVY_DARK
    pi0.space_after = Pt(6)
    
    # Primary Lead (User's exact text)
    pi1 = tf_i.add_paragraph()
    pi1.text = lead
    pi1.font.name = "Arial"
    pi1.font.size = Pt(11)
    pi1.font.bold = True
    pi1.font.color.rgb = COLOR_TEAL_DARK
    pi1.space_after = Pt(4)
    
    # Short support line
    pi2 = tf_i.add_paragraph()
    pi2.text = detail
    pi2.font.name = "Arial"
    pi2.font.size = Pt(9.5)
    pi2.font.color.rgb = COLOR_SLATE_MUTED

# Save updated presentation
prs.save(pptx_path)
print("Successfully redesigned Slide 2 in:", pptx_path)
