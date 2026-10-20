import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

# Target files
pptx_path = "SIH 2.0/SIH2025-IDEA-Presentation-Format.pptx"
illustration_img = "SIH 2.0/ai_family_guidance.jpg"

prs = Presentation(pptx_path)

# Ensure only Slide 1 is targeted
slide = prs.slides[0]

# Preserve Picture 2 (official SIH logo) before clearing shapes
sih_logo_blob = None
for s in slide.shapes:
    if s.name == 'Picture 2' and s.shape_type == 13:
        sih_logo_blob = s.image.blob
        break

# Clear existing shapes on Slide 1 ONLY
shapes_to_remove = list(slide.shapes)
for s in shapes_to_remove:
    sp = s._element
    sp.getparent().remove(sp)

# Color Palette Definitions
COLOR_IVORY_BG = RGBColor(0xF8, 0xF9, 0xFA)
COLOR_WHITE = RGBColor(0xFF, 0xFF, 0xFF)
COLOR_NAVY_DARK = RGBColor(0x0B, 0x13, 0x2B)
COLOR_NAVY_HEADING = RGBColor(0x13, 0x22, 0x47)
COLOR_SLATE_MUTED = RGBColor(0x5A, 0x6E, 0x85)
COLOR_TEAL_ACCENT = RGBColor(0x1A, 0xB8, 0xA6)
COLOR_TEAL_DARK = RGBColor(0x0D, 0x94, 0x88)
COLOR_TEAL_BG = RGBColor(0xF0, 0xFD, 0xFA)
COLOR_TEAL_BORDER = RGBColor(0x99, 0xF6, 0xE4)
COLOR_CARD_BORDER = RGBColor(0xE2, 0xE8, 0xF0)

# 1. Background Shape (Warm Ivory Full Bleed: 13.333" x 7.500")
bg = slide.shapes.add_shape(
    MSO_SHAPE.RECTANGLE, 
    Inches(0), Inches(0), Inches(13.333), Inches(7.500)
)
bg.fill.solid()
bg.fill.fore_color.rgb = COLOR_IVORY_BG
bg.line.fill.background()

# 2. Header Top Bar
# Event Pill Badge (Top Left)
event_pill = slide.shapes.add_shape(
    MSO_SHAPE.ROUNDED_RECTANGLE,
    Inches(0.80), Inches(0.46), Inches(4.75), Inches(0.38)
)
event_pill.fill.solid()
event_pill.fill.fore_color.rgb = COLOR_TEAL_BG
event_pill.line.color.rgb = COLOR_TEAL_BORDER
event_pill.line.width = Pt(1)
tf_ep = event_pill.text_frame
tf_ep.word_wrap = True
tf_ep.margin_left = Inches(0.18)
tf_ep.margin_right = Inches(0.18)
tf_ep.margin_top = Inches(0.04)
tf_ep.margin_bottom = Inches(0.04)
p_ep = tf_ep.paragraphs[0]
p_ep.text = "SMART INDIA HACKATHON 2026  •  SMART EDUCATION"
p_ep.font.name = "Arial"
p_ep.font.size = Pt(9.5)
p_ep.font.bold = True
p_ep.font.color.rgb = COLOR_TEAL_DARK

# SIH Logo (Top Right)
if sih_logo_blob:
    logo_temp_path = "SIH 2.0/sih_logo_extracted.png"
    with open(logo_temp_path, "wb") as f:
        f.write(sih_logo_blob)
    slide.shapes.add_picture(
        logo_temp_path,
        Inches(11.15), Inches(0.35), width=Inches(1.50)
    )

# 3. Left Column (60% width: 0.8" to 7.3")
# Dominant Project Title: SkillSaathi
tb_title = slide.shapes.add_textbox(Inches(0.78), Inches(1.02), Inches(6.50), Inches(0.88))
tf_title = tb_title.text_frame
tf_title.word_wrap = True
tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
p_title = tf_title.paragraphs[0]
p_title.text = "SkillSaathi"
p_title.font.name = "Arial"
p_title.font.size = Pt(50)
p_title.font.bold = True
p_title.font.color.rgb = COLOR_NAVY_DARK

# Tagline
tb_tag = slide.shapes.add_textbox(Inches(0.80), Inches(1.94), Inches(6.50), Inches(0.40))
tf_tag = tb_tag.text_frame
tf_tag.word_wrap = True
tf_tag.margin_left = tf_tag.margin_top = tf_tag.margin_right = tf_tag.margin_bottom = 0
p_tag = tf_tag.paragraphs[0]
p_tag.text = "From Career Confusion to Family Consensus"
p_tag.font.name = "Arial"
p_tag.font.size = Pt(18)
p_tag.font.bold = True
p_tag.font.color.rgb = COLOR_TEAL_ACCENT

# Elevated Problem Statement Card
ps_card = slide.shapes.add_shape(
    MSO_SHAPE.ROUNDED_RECTANGLE,
    Inches(0.80), Inches(2.46), Inches(6.50), Inches(2.25)
)
ps_card.fill.solid()
ps_card.fill.fore_color.rgb = COLOR_WHITE
ps_card.line.color.rgb = COLOR_CARD_BORDER
ps_card.line.width = Pt(1)

# Left accent indicator bar on PS card
ps_bar = slide.shapes.add_shape(
    MSO_SHAPE.ROUNDED_RECTANGLE,
    Inches(0.82), Inches(2.56), Inches(0.08), Inches(2.05)
)
ps_bar.fill.solid()
ps_bar.fill.fore_color.rgb = COLOR_TEAL_ACCENT
ps_bar.line.fill.background()

# Inside PS Card Content
tb_ps_content = slide.shapes.add_textbox(Inches(1.08), Inches(2.64), Inches(6.00), Inches(1.95))
tf_ps = tb_ps_content.text_frame
tf_ps.word_wrap = True
tf_ps.margin_left = tf_ps.margin_top = tf_ps.margin_right = tf_ps.margin_bottom = 0

# PS ID & Category
p1 = tf_ps.paragraphs[0]
p1.text = "PROBLEM STATEMENT #26241   |   SOFTWARE CATEGORY"
p1.font.name = "Arial"
p1.font.size = Pt(10)
p1.font.bold = True
p1.font.color.rgb = COLOR_TEAL_DARK
p1.space_after = Pt(6)

# Full Title
p2 = tf_ps.add_paragraph()
p2.text = "AI-Enabled Career Counselling and Family Decision-Support Platform for Vocational Education"
p2.font.name = "Arial"
p2.font.size = Pt(15)
p2.font.bold = True
p2.font.color.rgb = COLOR_NAVY_HEADING
p2.space_after = Pt(8)

# Organization
p3 = tf_ps.add_paragraph()
p3.text = "Organization: Ministry of Skill Development and Entrepreneurship (MSDE)"
p3.font.name = "Arial"
p3.font.size = Pt(11)
p3.font.color.rgb = COLOR_SLATE_MUTED

# Left Column Bottom Cards: Team Info & Key Innovation
# Card 1: Team Info (Left)
team_card = slide.shapes.add_shape(
    MSO_SHAPE.ROUNDED_RECTANGLE,
    Inches(0.80), Inches(4.94), Inches(3.15), Inches(1.85)
)
team_card.fill.solid()
team_card.fill.fore_color.rgb = COLOR_WHITE
team_card.line.color.rgb = COLOR_CARD_BORDER
team_card.line.width = Pt(1)

tb_team = slide.shapes.add_textbox(Inches(1.00), Inches(5.12), Inches(2.75), Inches(1.52))
tf_team = tb_team.text_frame
tf_team.word_wrap = True
tf_team.margin_left = tf_team.margin_top = tf_team.margin_right = tf_team.margin_bottom = 0

pt1 = tf_team.paragraphs[0]
pt1.text = "SUBMITTED BY"
pt1.font.name = "Arial"
pt1.font.size = Pt(9)
pt1.font.bold = True
pt1.font.color.rgb = COLOR_SLATE_MUTED
pt1.space_after = Pt(4)

pt2 = tf_team.add_paragraph()
pt2.text = "TeamChargers"
pt2.font.name = "Arial"
pt2.font.size = Pt(19)
pt2.font.bold = True
pt2.font.color.rgb = COLOR_NAVY_DARK
pt2.space_after = Pt(6)

pt3 = tf_team.add_paragraph()
pt3.text = "Team ID: [To Be Added]"
pt3.font.name = "Arial"
pt3.font.size = Pt(11)
pt3.font.bold = True
pt3.font.color.rgb = COLOR_TEAL_DARK

# Card 2: Innovation USP (Right) with subtle Teal Accent Fill to highlight USP
usp_card = slide.shapes.add_shape(
    MSO_SHAPE.ROUNDED_RECTANGLE,
    Inches(4.15), Inches(4.94), Inches(3.15), Inches(1.85)
)
usp_card.fill.solid()
usp_card.fill.fore_color.rgb = COLOR_TEAL_BG
usp_card.line.color.rgb = COLOR_TEAL_BORDER
usp_card.line.width = Pt(1)

tb_usp = slide.shapes.add_textbox(Inches(4.35), Inches(5.12), Inches(2.75), Inches(1.52))
tf_usp = tb_usp.text_frame
tf_usp.word_wrap = True
tf_usp.margin_left = tf_usp.margin_top = tf_usp.margin_right = tf_usp.margin_bottom = 0

pu1 = tf_usp.paragraphs[0]
pu1.text = "CORE USP"
pu1.font.name = "Arial"
pu1.font.size = Pt(9)
pu1.font.bold = True
pu1.font.color.rgb = COLOR_TEAL_DARK
pu1.space_after = Pt(4)

pu2 = tf_usp.add_paragraph()
pu2.text = "Family Consensus Intelligence"
pu2.font.name = "Arial"
pu2.font.size = Pt(15)
pu2.font.bold = True
pu2.font.color.rgb = COLOR_NAVY_DARK
pu2.space_after = Pt(4)

pu3 = tf_usp.add_paragraph()
pu3.text = "Dual-Persona AI & NSQF Pathways"
pu3.font.name = "Arial"
pu3.font.size = Pt(10.5)
pu3.font.color.rgb = COLOR_SLATE_MUTED

# 4. Right Column (40% width: 7.65" to 12.55")
# Elevated Illustration Card Frame
frame_right = slide.shapes.add_shape(
    MSO_SHAPE.ROUNDED_RECTANGLE,
    Inches(7.65), Inches(1.02), Inches(4.90), Inches(5.77)
)
frame_right.fill.solid()
frame_right.fill.fore_color.rgb = COLOR_WHITE
frame_right.line.color.rgb = COLOR_CARD_BORDER
frame_right.line.width = Pt(1)

# Top badge in right frame
tb_rf_badge = slide.shapes.add_shape(
    MSO_SHAPE.ROUNDED_RECTANGLE,
    Inches(7.85), Inches(1.20), Inches(4.50), Inches(0.38)
)
tb_rf_badge.fill.solid()
tb_rf_badge.fill.fore_color.rgb = COLOR_TEAL_BG
tb_rf_badge.line.color.rgb = COLOR_TEAL_BORDER
tb_rf_badge.line.width = Pt(0.75)
tf_rf = tb_rf_badge.text_frame
tf_rf.margin_left = tf_rf.margin_right = tf_rf.margin_top = tf_rf.margin_bottom = 0
prf = tf_rf.paragraphs[0]
prf.text = "AI-POWERED FAMILY GUIDANCE SYSTEM"
prf.font.name = "Arial"
prf.font.size = Pt(9.5)
prf.font.bold = True
prf.font.color.rgb = COLOR_TEAL_DARK
prf.alignment = PP_ALIGN.CENTER

# Conceptual Illustration Image
if os.path.exists(illustration_img):
    slide.shapes.add_picture(
        illustration_img,
        Inches(7.85), Inches(1.70), width=Inches(4.50), height=Inches(3.30)
    )

# Bottom Pill 1: Student Side
student_pill = slide.shapes.add_shape(
    MSO_SHAPE.ROUNDED_RECTANGLE,
    Inches(7.85), Inches(5.18), Inches(4.50), Inches(0.68)
)
student_pill.fill.solid()
student_pill.fill.fore_color.rgb = COLOR_IVORY_BG
student_pill.line.color.rgb = COLOR_CARD_BORDER
student_pill.line.width = Pt(0.75)
tf_sp = student_pill.text_frame
tf_sp.word_wrap = True
tf_sp.margin_left = Inches(0.15)
tf_sp.margin_right = Inches(0.15)
tf_sp.margin_top = Inches(0.08)
tf_sp.margin_bottom = Inches(0.08)
psp1 = tf_sp.paragraphs[0]
psp1.text = "Student Discovery: Aptitude, Passion & Skills"
psp1.font.name = "Arial"
psp1.font.size = Pt(10.5)
psp1.font.bold = True
psp1.font.color.rgb = COLOR_NAVY_DARK

psp2 = tf_sp.add_paragraph()
psp2.text = "Accredited NSQF/NCVET career pathways mapped to student potential"
psp2.font.name = "Arial"
psp2.font.size = Pt(9)
psp2.font.color.rgb = COLOR_SLATE_MUTED

# Bottom Pill 2: Parent Consensus Side
parent_pill = slide.shapes.add_shape(
    MSO_SHAPE.ROUNDED_RECTANGLE,
    Inches(7.85), Inches(5.96), Inches(4.50), Inches(0.68)
)
parent_pill.fill.solid()
parent_pill.fill.fore_color.rgb = COLOR_TEAL_BG
parent_pill.line.color.rgb = COLOR_TEAL_BORDER
parent_pill.line.width = Pt(0.75)
tf_pp = parent_pill.text_frame
tf_pp.word_wrap = True
tf_pp.margin_left = Inches(0.15)
tf_pp.margin_right = Inches(0.15)
tf_pp.margin_top = Inches(0.08)
tf_pp.margin_bottom = Inches(0.08)
ppp1 = tf_pp.paragraphs[0]
ppp1.text = "Parent Assurance: Economic ROI & Employment Stability"
ppp1.font.name = "Arial"
ppp1.font.size = Pt(10.5)
ppp1.font.bold = True
ppp1.font.color.rgb = COLOR_TEAL_DARK

ppp2 = tf_pp.add_paragraph()
ppp2.text = "AI bridges family hesitation into high-confidence career consensus"
ppp2.font.name = "Arial"
ppp2.font.size = Pt(9)
ppp2.font.color.rgb = COLOR_SLATE_MUTED

# Save updated presentation
prs.save(pptx_path)
print("Updated presentation saved successfully to:", pptx_path)
