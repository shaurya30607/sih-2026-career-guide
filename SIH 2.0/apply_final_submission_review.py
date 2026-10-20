import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def apply_all_final_corrections():
    src_ppt = "SIH 2.0/SIH2025-IDEA-Presentation-Format.pptx"
    out_ppt = "SIH 2.0/SkillSaathi_SIH_Final_Reviewed.pptx"
    
    prs = Presentation(src_ppt)
    
    NAVY = RGBColor(11, 19, 43)          # #0B132B
    TEAL = RGBColor(13, 148, 136)        # #0D9488
    DARK_TEAL = RGBColor(15, 118, 110)   # #0F766E
    LIGHT_TEAL = RGBColor(240, 253, 250) # #F0FDFA
    BORDER_TEAL = RGBColor(45, 212, 191) # #2DD4BF
    WHITE = RGBColor(255, 255, 255)
    GRAY_TEXT = RGBColor(71, 85, 105)    # #475569
    SLATE_LIGHT = RGBColor(100, 116, 139)# #64748B
    CARD_BG = RGBColor(248, 250, 252)    # #F8FAFC
    BORDER_LIGHT = RGBColor(226, 232, 240)# #E2E8F0
    BORDER_GRAY = RGBColor(203, 213, 225)# #CBD5E1
    AMBER_BG = RGBColor(254, 243, 199)   # #FEF3C7
    AMBER_TEXT = RGBColor(146, 64, 14)   # #92400E
    BLUE_BG = RGBColor(224, 242, 254)    # #E0F2FE
    BLUE_TEXT = RGBColor(7, 89, 133)     # #075985
    GREEN_BG = RGBColor(220, 252, 231)   # #DCFCE7
    GREEN_TEXT = RGBColor(22, 101, 52)   # #166534
    ROSE_BG = RGBColor(255, 228, 230)    # #FFE4E6
    ROSE_TEXT = RGBColor(159, 18, 57)    # #9F1239
    LINK_BLUE = RGBColor(2, 132, 199)    # #0284C7
    PURPLE_BG = RGBColor(243, 232, 255)  # #F3E8FF
    PURPLE_TEXT = RGBColor(126, 34, 206) # #7E22CE
    SIH_BLUE = RGBColor(0, 112, 192)     # #0070C0 (Official SIH Footer Blue)

    # =========================================================================
    # SLIDE 1 (Index 0): ABSOLUTELY UNTOUCHED!
    # =========================================================================
    print("Slide 1 (Title): Retained 100% UNTOUCHED.")

    # =========================================================================
    # SLIDE 2 (Index 1): IDEA TITLE / PROPOSED SOLUTION
    # =========================================================================
    slide2 = prs.slides[1]
    
    # 1. Clean up user shapes, preserving official placeholders & logo
    preserved_names_s2 = {"Slide Number Placeholder 5", "Footer Placeholder 6", "Picture 2"}
    for s in list(slide2.shapes):
        if s.name not in preserved_names_s2:
            sp = s._element
            sp.getparent().remove(sp)

    # Restore Official Footer Bar (Rectangle 8) from original template
    rect8 = slide2.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.0), Inches(6.95), Inches(13.333), Inches(0.55))
    rect8.name = "Rectangle 8"
    rect8.fill.solid()
    rect8.fill.fore_color.rgb = SIH_BLUE
    rect8.line.fill.background()
    # Send Rectangle 8 behind the footer placeholders
    slide2.shapes._spTree.remove(rect8._element)
    slide2.shapes._spTree.insert(2, rect8._element) # place behind placeholders

    # Team Name Badge
    tb2 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(0.32), Inches(1.65), Inches(0.42))
    tb2.fill.solid()
    tb2.fill.fore_color.rgb = WHITE
    tb2.line.color.rgb = BORDER_TEAL
    tb2.line.width = Pt(1.5)
    p = tb2.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "TeamChargers"
    r.font.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = NAVY

    # Official Slide Title
    tbox2 = slide2.shapes.add_textbox(Inches(2.65), Inches(0.28), Inches(7.50), Inches(0.45))
    p = tbox2.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "IDEA TITLE: "
    r.font.name = "Georgia"
    r.font.size = Pt(21)
    r.font.bold = True
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "SkillSaathi  "
    r.font.bold = True
    r.font.size = Pt(21)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "— Beyond Career Advice. Towards Family Consensus."
    r.font.italic = True
    r.font.size = Pt(13)
    r.font.color.rgb = TEAL

    # Sub-header Description (width = 8.50" to clear SIH logo buffer)
    desc2 = slide2.shapes.add_textbox(Inches(0.80), Inches(0.80), Inches(8.50), Inches(0.32))
    p = desc2.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "An AI-powered family counselling platform that bridges student aspirations and parental concerns through evidence-backed vocational guidance."
    r.font.size = Pt(9.5)
    r.font.color.rgb = GRAY_TEXT

    # Top Workflow Container
    wf_c = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(1.22), Inches(11.733), Inches(1.88))
    wf_c.fill.solid()
    wf_c.fill.fore_color.rgb = CARD_BG
    wf_c.line.color.rgb = BORDER_LIGHT
    wf_c.line.width = Pt(1.0)

    # Workflow Label Left & Right
    wfl = slide2.shapes.add_textbox(Inches(0.95), Inches(1.26), Inches(6.00), Inches(0.24))
    r = wfl.text_frame.paragraphs[0].add_run()
    r.text = "PROPOSED SOLUTION: FAMILY DECISION INTELLIGENCE WORKFLOW"
    r.font.bold = True
    r.font.size = Pt(8.5)
    r.font.color.rgb = NAVY

    wfr = slide2.shapes.add_textbox(Inches(7.10), Inches(1.26), Inches(5.25), Inches(0.24))
    r = wfr.text_frame.paragraphs[0].add_run()
    r.text = "🌐 English + Regional Language  |  Simple, Family-Friendly Guidance"
    r.font.bold = True
    r.font.size = Pt(8.0)
    r.font.color.rgb = DARK_TEAL

    # Dual Inputs (Student & Parent)
    box_s = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.95), Inches(1.54), Inches(2.15), Inches(0.68))
    box_s.fill.solid()
    box_s.fill.fore_color.rgb = WHITE
    box_s.line.color.rgb = BORDER_LIGHT
    tf = box_s.text_frame
    tf.margin_top = Inches(0.08)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Student Aspirations\n"
    r.font.bold = True
    r.font.size = Pt(9.0)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Interests, Aptitude & Ambitions"
    r.font.size = Pt(7.5)
    r.font.color.rgb = GRAY_TEXT

    box_p = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.95), Inches(2.32), Inches(2.15), Inches(0.68))
    box_p.fill.solid()
    box_p.fill.fore_color.rgb = WHITE
    box_p.line.color.rgb = BORDER_LIGHT
    tf = box_p.text_frame
    tf.margin_top = Inches(0.08)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Parent Concerns\n"
    r.font.bold = True
    r.font.size = Pt(9.0)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Financial Security, ROI & Stability"
    r.font.size = Pt(7.5)
    r.font.color.rgb = GRAY_TEXT

    # Convergence Arrows
    arr_s = slide2.shapes.add_textbox(Inches(3.12), Inches(1.68), Inches(0.28), Inches(0.35))
    r = arr_s.text_frame.paragraphs[0].add_run()
    r.text = "↘"
    r.font.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = TEAL

    arr_p = slide2.shapes.add_textbox(Inches(3.12), Inches(2.46), Inches(0.28), Inches(0.35))
    r = arr_p.text_frame.paragraphs[0].add_run()
    r.text = "↗"
    r.font.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = TEAL

    # Stage 1: AI Family Counselling (Correction E Applied)
    box_c1 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(3.42), Inches(1.54), Inches(2.55), Inches(1.46))
    box_c1.fill.solid()
    box_c1.fill.fore_color.rgb = WHITE
    box_c1.line.color.rgb = TEAL
    box_c1.line.width = Pt(1.5)
    tf = box_c1.text_frame
    tf.margin_top = Inches(0.10)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "AI FAMILY COUNSELLING\n"
    r.font.bold = True
    r.font.size = Pt(9.2)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Dual-Persona Dialogue Mediation\n"
    r.font.bold = True
    r.font.size = Pt(7.8)
    r.font.color.rgb = DARK_TEAL
    p2 = tf.add_paragraph()
    p2.alignment = PP_ALIGN.LEFT
    p2.space_before = Pt(3)
    r = p2.add_run()
    r.text = "• Identifies stated concerns & priorities\n• Synthesizes passion with practical ROI"
    r.font.size = Pt(7.2)
    r.font.color.rgb = GRAY_TEXT

    # Arrow to Career Comparison
    arr_c1 = slide2.shapes.add_textbox(Inches(6.00), Inches(2.10), Inches(0.28), Inches(0.35))
    r = arr_c1.text_frame.paragraphs[0].add_run()
    r.text = "→"
    r.font.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = TEAL

    # Stage 2: Career Comparison (Correction B & F Applied)
    box_c2 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.32), Inches(1.54), Inches(2.68), Inches(1.46))
    box_c2.fill.solid()
    box_c2.fill.fore_color.rgb = WHITE
    box_c2.line.color.rgb = BORDER_LIGHT
    tf = box_c2.text_frame
    tf.margin_top = Inches(0.10)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "CAREER COMPARISON\n"
    r.font.bold = True
    r.font.size = Pt(9.2)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Evidence-Based Benchmarking\n"
    r.font.bold = True
    r.font.size = Pt(7.8)
    r.font.color.rgb = DARK_TEAL
    p2 = tf.add_paragraph()
    p2.alignment = PP_ALIGN.LEFT
    p2.space_before = Pt(3)
    r = p2.add_run()
    r.text = "• NSQF-aligned qualifications & training\n• Proposed placement & salary evidence"
    r.font.size = Pt(7.2)
    r.font.color.rgb = GRAY_TEXT

    # Arrow to Decision
    arr_c2 = slide2.shapes.add_textbox(Inches(9.03), Inches(2.10), Inches(0.28), Inches(0.35))
    r = arr_c2.text_frame.paragraphs[0].add_run()
    r.text = "→"
    r.font.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = TEAL

    # Stage 3: Informed Family Decision (Correction A Applied)
    box_c3 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.34), Inches(1.54), Inches(2.98), Inches(1.46))
    box_c3.fill.solid()
    box_c3.fill.fore_color.rgb = WHITE
    box_c3.line.color.rgb = BORDER_LIGHT
    tf = box_c3.text_frame
    tf.margin_top = Inches(0.10)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "INFORMED FAMILY DECISION\n"
    r.font.bold = True
    r.font.size = Pt(9.2)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Consensus & Career Clarity\n"
    r.font.bold = True
    r.font.size = Pt(7.8)
    r.font.color.rgb = DARK_TEAL
    p2 = tf.add_paragraph()
    p2.alignment = PP_ALIGN.LEFT
    p2.space_before = Pt(3)
    r = p2.add_run()
    r.text = "• Aligned student-parent commitment\n• Planned pre/post confidence tracking"
    r.font.size = Pt(7.2)
    r.font.color.rgb = GRAY_TEXT

    # Innovation Grid Label
    grid_lbl = slide2.shapes.add_textbox(Inches(0.80), Inches(3.18), Inches(11.733), Inches(0.26))
    r = grid_lbl.text_frame.paragraphs[0].add_run()
    r.text = "INNOVATION & UNIQUENESS — WHY SKILLSAATHI?"
    r.font.bold = True
    r.font.size = Pt(9.0)
    r.font.color.rgb = NAVY

    col_w = Inches(5.72)
    card_h = Inches(1.64)
    c1_left = Inches(0.80)
    c2_left = Inches(6.81)
    r1_top = Inches(3.48)
    r2_top = Inches(5.20)
    inner_h = Inches(0.54)

    # CARD 01: Family Consensus Intelligence (★ FLAGSHIP USP) - Correction G & A Applied
    card1 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left, r1_top, col_w, card_h)
    card1.fill.solid()
    card1.fill.fore_color.rgb = LIGHT_TEAL
    card1.line.color.rgb = BORDER_TEAL
    card1.line.width = Pt(1.5)

    tb1 = slide2.shapes.add_textbox(c1_left + Inches(0.12), r1_top + Inches(0.07), Inches(4.75), Inches(0.70))
    p = tb1.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "01. Family Consensus Intelligence ★ FLAGSHIP USP\n"
    r.font.bold = True
    r.font.size = Pt(9.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Identifies family disagreements, addresses parental objections, and tracks changes in family confidence."
    r.font.size = Pt(7.5)
    r.font.color.rgb = GRAY_TEXT

    # Icon 1
    if os.path.exists("SIH 2.0/assets/family_convergence.svg.png"):
        slide2.shapes.add_picture("SIH 2.0/assets/family_convergence.svg.png", c1_left + Inches(4.96), r1_top + Inches(0.09), Inches(0.62), Inches(0.50))

    # Inner container & 3 Chips (Concrete Workflow: Identify Disagreements -> Compare Trade-offs -> Shared Decision)
    ic1 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left + Inches(0.12), r1_top + Inches(0.82), Inches(5.48), Inches(0.70))
    ic1.fill.solid()
    ic1.fill.fore_color.rgb = WHITE
    ic1.line.color.rgb = BORDER_TEAL

    # Chip 1A: Identify Disagreements
    ch1a = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left + Inches(0.20), r1_top + Inches(0.90), Inches(1.52), inner_h)
    ch1a.fill.solid()
    ch1a.fill.fore_color.rgb = AMBER_BG
    ch1a.line.fill.background()
    p = ch1a.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Identify Disagreements\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = AMBER_TEXT
    r = p.add_run()
    r.text = "Student vs Parent View"
    r.font.size = Pt(6.8)
    r.font.color.rgb = AMBER_TEXT

    arr1a = slide2.shapes.add_textbox(c1_left + Inches(1.74), r1_top + Inches(0.98), Inches(0.22), Inches(0.30))
    r = arr1a.text_frame.paragraphs[0].add_run()
    r.text = "→"
    r.font.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = TEAL

    # Chip 1B: Compare Trade-Offs
    ch1b = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left + Inches(1.98), r1_top + Inches(0.90), Inches(1.68), inner_h)
    ch1b.fill.solid()
    ch1b.fill.fore_color.rgb = LIGHT_TEAL
    ch1b.line.color.rgb = BORDER_TEAL
    p = ch1b.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Compare Trade-Offs\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = "Evidence Fact-Checking"
    r.font.size = Pt(6.8)
    r.font.color.rgb = DARK_TEAL

    arr1b = slide2.shapes.add_textbox(c1_left + Inches(3.68), r1_top + Inches(0.98), Inches(0.22), Inches(0.30))
    r = arr1b.text_frame.paragraphs[0].add_run()
    r.text = "→"
    r.font.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = TEAL

    # Chip 1C: Shared Decision & Tracking (Correction A applied)
    ch1c = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left + Inches(3.94), r1_top + Inches(0.90), Inches(1.66), inner_h)
    ch1c.fill.solid()
    ch1c.fill.fore_color.rgb = GREEN_BG
    ch1c.line.fill.background()
    p = ch1c.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Shared Family Decision\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = GREEN_TEXT
    r = p.add_run()
    r.text = "Pre/Post Confidence Track"
    r.font.size = Pt(6.8)
    r.font.color.rgb = GREEN_TEXT

    # CARD 02: Hyperlocal Career Reality Engine (Correction F Applied)
    card2 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left, r1_top, col_w, card_h)
    card2.fill.solid()
    card2.fill.fore_color.rgb = CARD_BG
    card2.line.color.rgb = BORDER_GRAY

    tb2 = slide2.shapes.add_textbox(c2_left + Inches(0.12), r1_top + Inches(0.07), Inches(4.75), Inches(0.70))
    p = tb2.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "02. Hyperlocal Career Reality Engine\n"
    r.font.bold = True
    r.font.size = Pt(9.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Connects vocational choices to regional earnings, placement outcomes, and accredited training pathways."
    r.font.size = Pt(7.5)
    r.font.color.rgb = GRAY_TEXT

    if os.path.exists("SIH 2.0/assets/india_map.svg.png"):
        slide2.shapes.add_picture("SIH 2.0/assets/india_map.svg.png", c2_left + Inches(5.02), r1_top + Inches(0.08), Inches(0.55), Inches(0.60))

    ic2 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left + Inches(0.12), r1_top + Inches(0.82), Inches(5.48), Inches(0.70))
    ic2.fill.solid()
    ic2.fill.fore_color.rgb = WHITE
    ic2.line.color.rgb = BORDER_LIGHT

    ch2a = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left + Inches(0.20), r1_top + Inches(0.90), Inches(1.30), inner_h)
    ch2a.fill.solid()
    ch2a.fill.fore_color.rgb = BLUE_BG
    ch2a.line.fill.background()
    p = ch2a.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "📍 District Cluster\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = BLUE_TEXT
    r = p.add_run()
    r.text = "Local ITI & Hubs"
    r.font.size = Pt(6.8)
    r.font.color.rgb = BLUE_TEXT

    arr2a = slide2.shapes.add_textbox(c2_left + Inches(1.52), r1_top + Inches(0.98), Inches(0.20), Inches(0.30))
    r = arr2a.text_frame.paragraphs[0].add_run()
    r.text = "→"
    r.font.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = TEAL

    ch2b = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left + Inches(1.74), r1_top + Inches(0.90), Inches(1.18), inner_h)
    ch2b.fill.solid()
    ch2b.fill.fore_color.rgb = CARD_BG
    ch2b.line.color.rgb = BORDER_LIGHT
    p = ch2b.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "₹ Regional Wages\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Estimated Wage Data"
    r.font.size = Pt(6.8)
    r.font.color.rgb = GRAY_TEXT

    ch2c = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left + Inches(2.98), r1_top + Inches(0.90), Inches(1.22), inner_h)
    ch2c.fill.solid()
    ch2c.fill.fore_color.rgb = CARD_BG
    ch2c.line.color.rgb = BORDER_LIGHT
    p = ch2c.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Placement Trends\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Proposed Sources"
    r.font.size = Pt(6.8)
    r.font.color.rgb = GRAY_TEXT

    ch2d = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left + Inches(4.26), r1_top + Inches(0.90), Inches(1.26), inner_h)
    ch2d.fill.solid()
    ch2d.fill.fore_color.rgb = CARD_BG
    ch2d.line.color.rgb = BORDER_LIGHT
    p = ch2d.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "NSQF Pathway\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "ITI → Poly → B.Voc"
    r.font.size = Pt(6.8)
    r.font.color.rgb = GRAY_TEXT

    # CARD 03: Explainable Career Trade-off Engine (Corrections C & D Applied)
    card3 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left, r2_top, col_w, card_h)
    card3.fill.solid()
    card3.fill.fore_color.rgb = CARD_BG
    card3.line.color.rgb = BORDER_GRAY

    tb3 = slide2.shapes.add_textbox(c1_left + Inches(0.12), r2_top + Inches(0.07), Inches(4.75), Inches(0.70))
    p = tb3.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "03. Explainable Career Trade-off Engine\n"
    r.font.bold = True
    r.font.size = Pt(9.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Compares career options based on family priorities, training costs, earnings, and NSQF progression."
    r.font.size = Pt(7.5)
    r.font.color.rgb = GRAY_TEXT

    if os.path.exists("SIH 2.0/assets/tradeoff_scale.svg.png"):
        slide2.shapes.add_picture("SIH 2.0/assets/tradeoff_scale.svg.png", c1_left + Inches(4.98), r2_top + Inches(0.08), Inches(0.60), Inches(0.50))

    ic3 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left + Inches(0.12), r2_top + Inches(0.82), Inches(5.48), Inches(0.70))
    ic3.fill.solid()
    ic3.fill.fore_color.rgb = WHITE
    ic3.line.color.rgb = BORDER_LIGHT

    ch3a = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left + Inches(0.20), r2_top + Inches(0.90), Inches(1.26), inner_h)
    ch3a.fill.solid()
    ch3a.fill.fore_color.rgb = CARD_BG
    ch3a.line.color.rgb = BORDER_LIGHT
    p = ch3a.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Family Priorities\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Budget & Values"
    r.font.size = Pt(6.8)
    r.font.color.rgb = GRAY_TEXT

    ch3b = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left + Inches(1.52), r2_top + Inches(0.90), Inches(1.26), inner_h)
    ch3b.fill.solid()
    ch3b.fill.fore_color.rgb = CARD_BG
    ch3b.line.color.rgb = BORDER_LIGHT
    p = ch3b.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Training Cost\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Fees vs Subsidy"
    r.font.size = Pt(6.8)
    r.font.color.rgb = GRAY_TEXT

    # Chip 3C: Training Duration & Time-to-Earn (Correction D applied)
    ch3c = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left + Inches(2.84), r2_top + Inches(0.90), Inches(1.30), inner_h)
    ch3c.fill.solid()
    ch3c.fill.fore_color.rgb = CARD_BG
    ch3c.line.color.rgb = BORDER_LIGHT
    p = ch3c.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Training Duration\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Time-to-Earn Clarity"
    r.font.size = Pt(6.8)
    r.font.color.rgb = GRAY_TEXT

    # Chip 3D: Career Progression Options (Correction C applied)
    ch3d = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c1_left + Inches(4.20), r2_top + Inches(0.90), Inches(1.32), inner_h)
    ch3d.fill.solid()
    ch3d.fill.fore_color.rgb = CARD_BG
    ch3d.line.color.rgb = BORDER_LIGHT
    p = ch3d.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "NSQF Pathway\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Progression Options"
    r.font.size = Pt(6.8)
    r.font.color.rgb = GRAY_TEXT

    # CARD 04: Parental Resistance Intelligence
    card4 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left, r2_top, col_w, card_h)
    card4.fill.solid()
    card4.fill.fore_color.rgb = CARD_BG
    card4.line.color.rgb = BORDER_GRAY

    tb4 = slide2.shapes.add_textbox(c2_left + Inches(0.12), r2_top + Inches(0.07), Inches(4.75), Inches(0.70))
    p = tb4.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "04. Parental Resistance Intelligence\n"
    r.font.bold = True
    r.font.size = Pt(9.5)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Transforms counselling concerns into aggregated insights and escalation pathways for scheme administrators."
    r.font.size = Pt(7.5)
    r.font.color.rgb = GRAY_TEXT

    if os.path.exists("SIH 2.0/assets/resistance_heatmap.svg.png"):
        slide2.shapes.add_picture("SIH 2.0/assets/resistance_heatmap.svg.png", c2_left + Inches(5.05), r2_top + Inches(0.08), Inches(0.55), Inches(0.52))

    ic4 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left + Inches(0.12), r2_top + Inches(0.82), Inches(5.48), Inches(0.70))
    ic4.fill.solid()
    ic4.fill.fore_color.rgb = WHITE
    ic4.line.color.rgb = BORDER_LIGHT

    ch4a = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left + Inches(0.20), r2_top + Inches(0.90), Inches(1.60), inner_h)
    ch4a.fill.solid()
    ch4a.fill.fore_color.rgb = ROSE_BG
    ch4a.line.fill.background()
    p = ch4a.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Unresolved Hesitation\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = ROSE_TEXT
    r = p.add_run()
    r.text = "Stigma / Financial Anxiety"
    r.font.size = Pt(6.8)
    r.font.color.rgb = ROSE_TEXT

    arr4 = slide2.shapes.add_textbox(c2_left + Inches(1.84), r2_top + Inches(0.98), Inches(0.20), Inches(0.30))
    r = arr4.text_frame.paragraphs[0].add_run()
    r.text = "→"
    r.font.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = TEAL

    ch4b = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left + Inches(2.08), r2_top + Inches(0.90), Inches(1.68), inner_h)
    ch4b.fill.solid()
    ch4b.fill.fore_color.rgb = BLUE_BG
    ch4b.line.fill.background()
    p = ch4b.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Human Counsellor Routing\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = BLUE_TEXT
    r = p.add_run()
    r.text = "1-on-1 Escalation Hand-off"
    r.font.size = Pt(6.8)
    r.font.color.rgb = BLUE_TEXT

    arr4b = slide2.shapes.add_textbox(c2_left + Inches(3.80), r2_top + Inches(0.98), Inches(0.18), Inches(0.30))
    r = arr4b.text_frame.paragraphs[0].add_run()
    r.text = "+"
    r.font.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = TEAL

    ch4c = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c2_left + Inches(4.02), r2_top + Inches(0.90), Inches(1.50), inner_h)
    ch4c.fill.solid()
    ch4c.fill.fore_color.rgb = LIGHT_TEAL
    ch4c.line.color.rgb = BORDER_TEAL
    p = ch4c.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Admin Heatmaps\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = "Participating Insights"
    r.font.size = Pt(6.8)
    r.font.color.rgb = DARK_TEAL

    print("Slide 2 (Idea Title): All corrections and footer restored successfully.")

    # =========================================================================
    # SLIDE 3 (Index 2): TECHNICAL APPROACH
    # =========================================================================
    slide3 = prs.slides[2]
    preserved_names_s3 = {"Rectangle 9", "Slide Number Placeholder 5", "Footer Placeholder 6", "Picture 2"}
    for s in list(slide3.shapes):
        if s.name not in preserved_names_s3:
            sp = s._element
            sp.getparent().remove(sp)

    # Team Name Badge
    tb3 = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(0.32), Inches(1.65), Inches(0.42))
    tb3.fill.solid()
    tb3.fill.fore_color.rgb = WHITE
    tb3.line.color.rgb = BORDER_TEAL
    tb3.line.width = Pt(1.5)
    p = tb3.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "TeamChargers"
    r.font.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = NAVY

    # Official Slide Title
    title3 = slide3.shapes.add_textbox(Inches(2.65), Inches(0.28), Inches(7.50), Inches(0.45))
    p = title3.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "TECHNICAL APPROACH: "
    r.font.name = "Georgia"
    r.font.size = Pt(20)
    r.font.bold = True
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "System Architecture & Implementation"
    r.font.bold = True
    r.font.size = Pt(18)
    r.font.color.rgb = TEAL

    # Sub-header Description (Correction A Applied)
    desc3 = slide3.shapes.add_textbox(Inches(0.80), Inches(0.80), Inches(8.50), Inches(0.36))
    p = desc3.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "Proposed end-to-end architecture for evidence-grounded family career counselling."
    r.font.bold = True
    r.font.size = Pt(10.0)
    r.font.color.rgb = DARK_TEAL

    # 4-Stage Architecture Cards
    card_w = Inches(2.62)
    stage_card_h = Inches(2.55)
    stage_top = Inches(1.24)

    stages = [
        {
            "num": "STAGE 01",
            "tag": "React Frontend [Active]",
            "title": "User Interface",
            "left": Inches(0.80),
            "border": BORDER_TEAL,
            "border_w": Pt(1.5),
            "bg": WHITE,
            "logos": [
                ("SIH 2.0/assets/react.svg.png", Inches(0.32), Inches(0.29)),
                ("SIH 2.0/assets/typescript.svg.png", Inches(0.30), Inches(0.30))
            ],
            "bullets": [
                "React + TypeScript + Vite [Active]",
                "Student & Parent Intake Interfaces",
                "Course Exploration & Rule Matching",
                "English, Hindi, Marathi Localization"
            ]
        },
        {
            "num": "STAGE 02",
            "tag": "FastAPI Services [Planned]",
            "title": "Backend & Data",
            "left": Inches(3.84),
            "border": BORDER_GRAY,
            "border_w": Pt(1.0),
            "bg": WHITE,
            "logos": [
                ("SIH 2.0/assets/python.svg.png", Inches(0.30), Inches(0.32)),
                ("SIH 2.0/assets/fastapi.svg.png", Inches(0.30), Inches(0.30))
            ],
            "bullets": [
                "FastAPI Architecture [Planned]",
                "TypeScript Data Contracts Scaffold",
                "Persistent Family Profiles & Sessions",
                "Planned Integration of Curated Data"
            ]
        },
        {
            "num": "STAGE 03",
            "tag": "Core Innovation [Proposed]",
            "title": "AI Decision Engine",
            "left": Inches(6.88),
            "border": TEAL,
            "border_w": Pt(2.0),
            "bg": WHITE,
            "logos": [
                ("SIH 2.0/assets/ai_brain.svg.png", Inches(0.36), Inches(0.36))
            ],
            "bullets": [
                "Evidence-Grounded AI Counselling",
                "Student-Parent Disagreement Detection",
                "Explainable Career Trade-offs",
                "Pre/Post Confidence Assessment"
            ]
        },
        {
            "num": "STAGE 04",
            "tag": "Action & Governance [Proposed]",
            "title": "Outcomes & Analytics",
            "left": Inches(9.91),
            "border": BORDER_GRAY,
            "border_w": Pt(1.0),
            "bg": WHITE,
            "logos": [
                ("SIH 2.0/assets/analytics.svg.png", Inches(0.36), Inches(0.33))
            ],
            "bullets": [
                "Joint Family Decision Summary",
                "Human Counsellor Escalation",
                "Participating Family Analytics",
                "AI Quality Evaluation Planned"
            ]
        }
    ]

    for stg in stages:
        sc = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, stg["left"], stage_top, card_w, stage_card_h)
        sc.fill.solid()
        sc.fill.fore_color.rgb = stg["bg"]
        sc.line.color.rgb = stg["border"]
        sc.line.width = stg["border_w"]

        # Logos at top-right
        lx = stg["left"] + card_w - Inches(0.14)
        for (l_path, lw, lh) in reversed(stg["logos"]):
            lx -= lw
            if os.path.exists(l_path):
                slide3.shapes.add_picture(l_path, lx, stage_top + Inches(0.12), lw, lh)
            lx -= Inches(0.06)

        # Header Text
        h_box = slide3.shapes.add_textbox(stg["left"] + Inches(0.14), stage_top + Inches(0.10), card_w - Inches(0.85), Inches(0.65))
        tf = h_box.text_frame
        tf.word_wrap = True
        tf.margin_left = 0
        tf.margin_top = 0
        p = tf.paragraphs[0]
        r = p.add_run()
        r.text = f"{stg['num']} • {stg['tag']}\n"
        r.font.bold = True
        r.font.size = Pt(7.5)
        r.font.color.rgb = DARK_TEAL
        r = p.add_run()
        r.text = stg["title"]
        r.font.bold = True
        r.font.size = Pt(13)
        r.font.color.rgb = NAVY

        # Bullets (Readable font: 8.5pt)
        b_box = slide3.shapes.add_textbox(stg["left"] + Inches(0.14), stage_top + Inches(0.86), card_w - Inches(0.28), Inches(1.58))
        tf = b_box.text_frame
        tf.word_wrap = True
        tf.margin_left = 0
        tf.margin_top = 0
        for b_idx, bullet in enumerate(stg["bullets"]):
            p = tf.paragraphs[0] if b_idx == 0 else tf.add_paragraph()
            p.space_after = Pt(4)
            r = p.add_run()
            r.text = "• "
            r.font.bold = True
            r.font.size = Pt(8.8)
            r.font.color.rgb = TEAL
            r = p.add_run()
            r.text = bullet
            r.font.size = Pt(8.5)
            r.font.color.rgb = GRAY_TEXT

    # Progression Arrows between stages
    for ax in [Inches(3.48), Inches(6.52), Inches(9.55)]:
        arr = slide3.shapes.add_textbox(ax, stage_top + Inches(1.10), Inches(0.30), Inches(0.35))
        p = arr.text_frame.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = "➔"
        r.font.bold = True
        r.font.size = Pt(16)
        r.font.color.rgb = TEAL

    # Central Data Grounding Engine Container (Corrections E Applied)
    dg_box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.30), Inches(4.04), Inches(3.80), Inches(0.68))
    dg_box.fill.solid()
    dg_box.fill.fore_color.rgb = WHITE
    dg_box.line.color.rgb = TEAL
    dg_box.line.width = Pt(1.5)

    if os.path.exists("SIH 2.0/assets/database.svg.png"):
        slide3.shapes.add_picture("SIH 2.0/assets/database.svg.png", Inches(6.44), Inches(4.14), Inches(0.34), Inches(0.48))

    tf_dg = dg_box.text_frame
    tf_dg.margin_left = Inches(0.56)
    tf_dg.margin_right = Inches(0.10)
    tf_dg.margin_top = Inches(0.10)
    p = tf_dg.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "DATA GROUNDING ENGINE\n"
    r.font.bold = True
    r.font.size = Pt(8.2)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = "Planned Integration of Curated Official Vocational Data"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = NAVY

    # Upward Arrow from Grounding Engine to AI Engine
    up_arr = slide3.shapes.add_textbox(Inches(8.05), Inches(3.78), Inches(0.30), Inches(0.26))
    p = up_arr.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "↑"
    r.font.bold = True
    r.font.size = Pt(15)
    r.font.color.rgb = TEAL

    # Left reference to Grounding
    ref_txt = slide3.shapes.add_textbox(Inches(4.80), Inches(4.15), Inches(1.45), Inches(0.45))
    p = ref_txt.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.RIGHT
    r = p.add_run()
    r.text = "Official Benchmarks ➔\n"
    r.font.bold = True
    r.font.size = Pt(7.5)
    r.font.color.rgb = GRAY_TEXT
    r = p.add_run()
    r.text = "(NCVET & NCS Data)"
    r.font.italic = True
    r.font.size = Pt(7.0)
    r.font.color.rgb = SLATE_LIGHT

    # Bottom Technology Strip Container
    tech_container = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(4.90), Inches(11.733), Inches(1.80))
    tech_container.fill.solid()
    tech_container.fill.fore_color.rgb = CARD_BG
    tech_container.line.color.rgb = BORDER_LIGHT

    tc_lbl = slide3.shapes.add_textbox(Inches(0.95), Inches(4.96), Inches(8.00), Inches(0.24))
    r = tc_lbl.text_frame.paragraphs[0].add_run()
    r.text = "TECHNOLOGY STACK & IMPLEMENTATION SCOPE"
    r.font.bold = True
    r.font.size = Pt(8.5)
    r.font.color.rgb = NAVY

    # 4 Bottom Tech Cards (Shortened, readable, non-repetitive - Corrections B, C, D, E Applied)
    t_cards = [
        {
            "tag": "FRONTEND [ACTIVE IN CODE]",
            "title": "React, TypeScript, Vite",
            "desc": "Modular component library, student/parent intake forms, course explorer & trilingual UI.",
            "logo": "SIH 2.0/assets/vite.svg.png",
            "logo_w": Inches(0.28), "logo_h": Inches(0.28)
        },
        {
            "tag": "BACKEND [PLANNED ARCHITECTURE]",
            "title": "FastAPI (Planned)",
            "desc": "TypeScript data contracts & REST client scaffold implemented; FastAPI/Pydantic backend planned.",
            "logo": None
        },
        {
            "tag": "AI & DATA [PROPOSED LOGIC]",
            "title": "Grounded AI + Curated Data",
            "desc": "Evidence-grounded counselling proposed using verified vocational standards; local baseline data in prototype.",
            "logo": None
        },
        {
            "tag": "OUTPUTS [PROPOSED SYSTEM]",
            "title": "Counselling & Analytics",
            "desc": "Joint decision summaries, human escalation handoff, and participating family insights.",
            "logo": None
        }
    ]

    t_card_w = Inches(2.76)
    t_card_gap = Inches(0.18)
    for idx, tc in enumerate(t_cards):
        tx = Inches(0.95) + idx * (t_card_w + t_card_gap)
        box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, tx, Inches(5.26), t_card_w, Inches(1.30))
        box.fill.solid()
        box.fill.fore_color.rgb = WHITE
        box.line.color.rgb = BORDER_LIGHT

        if tc["logo"] and os.path.exists(tc["logo"]):
            slide3.shapes.add_picture(tc["logo"], tx + t_card_w - Inches(0.38), Inches(5.34), tc["logo_w"], tc["logo_h"])

        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.12)
        tf.margin_right = Inches(0.12)
        tf.margin_top = Inches(0.10)
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = f"{tc['tag']}\n"
        r.font.bold = True
        r.font.size = Pt(7.5)
        r.font.color.rgb = DARK_TEAL
        r = p.add_run()
        r.text = f"{tc['title']}\n"
        r.font.bold = True
        r.font.size = Pt(9.0)
        r.font.color.rgb = NAVY
        p2 = tf.add_paragraph()
        p2.alignment = PP_ALIGN.LEFT
        p2.space_before = Pt(3)
        r = p2.add_run()
        r.text = tc["desc"]
        r.font.size = Pt(7.2)
        r.font.color.rgb = GRAY_TEXT

    print("Slide 3 (Technical Approach): All technical accuracy corrections applied.")

    # =========================================================================
    # SLIDE 4 (Index 3): FEASIBILITY AND VIABILITY
    # =========================================================================
    slide4 = prs.slides[3]
    preserved_names_s4 = {"Rectangle 9", "Slide Number Placeholder 5", "Footer Placeholder 6", "Picture 2"}
    for s in list(slide4.shapes):
        if s.name not in preserved_names_s4:
            sp = s._element
            sp.getparent().remove(sp)

    # Team Name Badge
    tb4 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(0.32), Inches(1.65), Inches(0.42))
    tb4.fill.solid()
    tb4.fill.fore_color.rgb = WHITE
    tb4.line.color.rgb = BORDER_TEAL
    tb4.line.width = Pt(1.5)
    p = tb4.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "TeamChargers"
    r.font.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = NAVY

    # Official Slide Title - STRICTLY "FEASIBILITY AND VIABILITY"
    title4 = slide4.shapes.add_textbox(Inches(2.65), Inches(0.28), Inches(7.50), Inches(0.45))
    p = title4.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "FEASIBILITY AND VIABILITY"
    r.font.name = "Georgia"
    r.font.size = Pt(21)
    r.font.bold = True
    r.font.color.rgb = NAVY

    # Sub-header Description
    desc4 = slide4.shapes.add_textbox(Inches(0.80), Inches(0.80), Inches(8.50), Inches(0.36))
    p = desc4.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "Execution Roadmap & Risk Mitigation — "
    r.font.bold = True
    r.font.size = Pt(10)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = "Demonstrating practical implementation through a 3-phase progression, grounded data controls, and modular architecture."
    r.font.size = Pt(9.5)
    r.font.color.rgb = GRAY_TEXT

    # Section 1: 3-Phase Implementation Roadmap (Left 55% -> width = 6.45")
    sec1_lbl4 = slide4.shapes.add_textbox(Inches(0.80), Inches(1.18), Inches(6.45), Inches(0.26))
    p = sec1_lbl4.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "SECTION 1: 3-PHASE IMPLEMENTATION ROADMAP"
    r.font.size = Pt(9.5)
    r.font.bold = True
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "   [ From Live Prototype to Phased Field Deployment ]"
    r.font.size = Pt(8.0)
    r.font.italic = True
    r.font.color.rgb = TEAL

    c_left4 = Inches(0.80)
    c_w4 = Inches(6.45)
    c_h4 = Inches(1.36)

    phases = [
        {
            "top": Inches(1.48),
            "num": "01",
            "badge_color": TEAL,
            "bg_color": LIGHT_TEAL,
            "border_color": BORDER_TEAL,
            "border_w": Pt(1.5),
            "title": "PHASE 01 — FOUNDATION",
            "tag": "[ ACTIVE IN CODE ]",
            "tag_color": GREEN_TEXT,
            "icon": "SIH 2.0/assets/phase1_code.svg.png",
            "icon_w": Inches(0.72), "icon_h": Inches(0.48),
            "bullets": [
                ("React + TypeScript Frontend: ", "Operational responsive UI, student & parent intake forms, trade explorer"),
                ("Trilingual Localization: ", "English, Hindi & Marathi interfaces implemented in frontend"),
                ("Course Exploration Engine: ", "Course exploration using structured demonstration data")
            ]
        },
        {
            "top": Inches(3.06),
            "num": "02",
            "badge_color": RGBColor(2, 132, 199),
            "bg_color": WHITE,
            "border_color": TEAL,
            "border_w": Pt(1.2),
            "title": "PHASE 02 — INTELLIGENCE",
            "tag": "[ PLANNED ARCHITECTURE ]",
            "tag_color": BLUE_TEXT,
            "icon": "SIH 2.0/assets/phase2_ai.svg.png",
            "icon_w": Inches(0.55), "icon_h": Inches(0.55),
            "bullets": [
                ("FastAPI Backend Integration (Planned): ", "REST API client, session state persistence & data contracts"),
                ("Evidence-Grounded AI Engine (Planned): ", "Proposed counselling anchored to official qualification standards"),
                ("Family Disagreement & Confidence Tracking: ", "Planned consensus scoring & objection analysis")
            ]
        },
        {
            "top": Inches(4.64),
            "num": "03",
            "badge_color": RGBColor(51, 65, 85),
            "bg_color": CARD_BG,
            "border_color": BORDER_GRAY,
            "border_w": Pt(1.0),
            "title": "PHASE 03 — DEPLOYMENT",
            "tag": "[ FUTURE PILOT ROLLOUT ]",
            "tag_color": GRAY_TEXT,
            "icon": "SIH 2.0/assets/phase3_deploy.svg.png",
            "icon_w": Inches(0.46), "icon_h": Inches(0.58),
            "bullets": [
                ("Rural Usability & Vernacular Testing (Future): ", "Field testing across diverse demographic cohorts"),
                ("Human Counsellor Escalation (Future): ", "Automated triage routing complex family hesitation to experts"),
                ("Admin Analytics & Pilot Testing (Future): ", "Participating family insights for scheme planners")
            ]
        }
    ]

    for p_info in phases:
        card = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c_left4, p_info["top"], c_w4, c_h4)
        card.fill.solid()
        card.fill.fore_color.rgb = p_info["bg_color"]
        card.line.color.rgb = p_info["border_color"]
        card.line.width = p_info["border_w"]

        # Number pill badge
        m_badge = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c_left4 + Inches(0.12), p_info["top"] + Inches(0.12), Inches(0.42), Inches(0.32))
        m_badge.fill.solid()
        m_badge.fill.fore_color.rgb = p_info["badge_color"]
        m_badge.line.fill.background()
        tf_m = m_badge.text_frame
        tf_m.word_wrap = False
        tf_m.margin_top = Inches(0.04)
        p = tf_m.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = p_info["num"]
        r.font.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = WHITE

        # Header Text
        h_box = slide4.shapes.add_textbox(c_left4 + Inches(0.60), p_info["top"] + Inches(0.08), Inches(4.80), Inches(0.30))
        tf_h = h_box.text_frame
        tf_h.margin_left = 0
        tf_h.margin_top = 0
        p = tf_h.paragraphs[0]
        r = p.add_run()
        r.text = p_info["title"] + "  "
        r.font.bold = True
        r.font.size = Pt(11)
        r.font.color.rgb = NAVY
        r = p.add_run()
        r.text = p_info["tag"]
        r.font.bold = True
        r.font.size = Pt(7.5)
        r.font.color.rgb = p_info["tag_color"]

        # Icon on right
        if os.path.exists(p_info["icon"]):
            icon_top = p_info["top"] + (c_h4 - p_info["icon_h"]) / 2
            slide4.shapes.add_picture(p_info["icon"], c_left4 + Inches(5.62), icon_top, p_info["icon_w"], p_info["icon_h"])

        # Bullets (Readable font: 8.5pt/7.8pt)
        b_box = slide4.shapes.add_textbox(c_left4 + Inches(0.60), p_info["top"] + Inches(0.36), Inches(4.95), Inches(0.92))
        tf_b = b_box.text_frame
        tf_b.word_wrap = True
        tf_b.margin_left = 0
        tf_b.margin_top = 0
        for b_idx, (b_title, b_desc) in enumerate(p_info["bullets"]):
            p = tf_b.paragraphs[0] if b_idx == 0 else tf_b.add_paragraph()
            p.space_after = Pt(2)
            r = p.add_run()
            r.text = "• " + b_title
            r.font.bold = True
            r.font.size = Pt(8.2)
            r.font.color.rgb = NAVY
            r = p.add_run()
            r.text = b_desc
            r.font.size = Pt(7.8)
            r.font.color.rgb = GRAY_TEXT

    # Progression Arrows
    arr1 = slide4.shapes.add_textbox(c_left4 + Inches(0.21), Inches(2.83), Inches(0.24), Inches(0.22))
    p = arr1.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "↓"
    r.font.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = TEAL

    arr2 = slide4.shapes.add_textbox(c_left4 + Inches(0.21), Inches(4.41), Inches(0.24), Inches(0.22))
    p = arr2.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "↓"
    r.font.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = TEAL

    # Section 2: Challenges & Mitigation Matrix (Right 45% -> width = 5.00")
    m_left = Inches(7.53)
    m_w = Inches(5.00)
    sec2_lbl4 = slide4.shapes.add_textbox(m_left, Inches(1.18), m_w, Inches(0.26))
    p = sec2_lbl4.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "SECTION 2: CHALLENGES & MITIGATION MATRIX"
    r.font.size = Pt(9.5)
    r.font.bold = True
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "   [ Technical Safeguards & Risk Controls ]"
    r.font.size = Pt(8.0)
    r.font.italic = True
    r.font.color.rgb = TEAL

    # Matrix items with exact prompt corrections applied (A, B, C, D)
    matrix = [
        {
            "top": Inches(1.48),
            "icon": "SIH 2.0/assets/risk_data.svg.png",
            "ch_title": "Limited Verified Data",
            "ch_sub": "Uncurated regional wage reports",
            "mit_title": "Curated Official-Source Ingestion",
            "mit_sub": "Curated official-source ingestion; API access subject to availability.",
            "accent": AMBER_TEXT
        },
        {
            "top": Inches(2.39),
            "icon": "SIH 2.0/assets/risk_shield.svg.png",
            "ch_title": "AI Hallucinations",
            "ch_sub": "Unverified claims or false guarantees",
            "mit_title": "Grounded Retrieval & Evidence Checks",
            "mit_sub": "Source citations, evidence checks, evaluation and human escalation.",
            "accent": ROSE_TEXT
        },
        {
            "top": Inches(3.30),
            "icon": "SIH 2.0/assets/risk_lang.svg.png",
            "ch_title": "Language Barriers",
            "ch_sub": "Vernacular hesitation among rural parents",
            "mit_title": "Regional UI & Simplified Terms",
            "mit_sub": "English/Hindi/Marathi UI tested with plain, family-friendly terms.",
            "accent": BLUE_TEXT
        },
        {
            "top": Inches(4.21),
            "icon": "SIH 2.0/assets/risk_privacy.svg.png",
            "ch_title": "Data Privacy Concerns",
            "ch_sub": "Sensitive family financial ambitions",
            "mit_title": "Consent Intake & Minimal Retention",
            "mit_sub": "Planned access controls, consent, minimal retention and session testing.",
            "accent": PURPLE_TEXT
        },
        {
            "top": Inches(5.12),
            "icon": "SIH 2.0/assets/risk_scale.svg.png",
            "ch_title": "System Scalability",
            "ch_sub": "Traffic surges during admission cycles",
            "mit_title": "Modular Backend Architecture",
            "mit_sub": "Modular backend architecture + phased pilot rollout.",
            "accent": DARK_TEAL
        }
    ]

    r_h = Inches(0.80)
    for row_info in matrix:
        rcard = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, m_left, row_info["top"], m_w, r_h)
        rcard.fill.solid()
        rcard.fill.fore_color.rgb = WHITE
        rcard.line.color.rgb = BORDER_LIGHT
        rcard.line.width = Pt(1.0)

        # Left accent pill
        pill = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, m_left + Inches(0.04), row_info["top"] + Inches(0.08), Inches(0.06), Inches(0.64))
        pill.fill.solid()
        pill.fill.fore_color.rgb = row_info["accent"]
        pill.line.fill.background()

        if os.path.exists(row_info["icon"]):
            slide4.shapes.add_picture(row_info["icon"], m_left + Inches(0.16), row_info["top"] + Inches(0.18), Inches(0.42), Inches(0.44))

        # Challenge
        ch_box = slide4.shapes.add_textbox(m_left + Inches(0.64), row_info["top"] + Inches(0.07), Inches(1.85), Inches(0.64))
        tf_ch = ch_box.text_frame
        tf_ch.word_wrap = True
        tf_ch.margin_left = 0
        tf_ch.margin_top = 0
        p = tf_ch.paragraphs[0]
        r = p.add_run()
        r.text = row_info["ch_title"] + "\n"
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = NAVY
        r = p.add_run()
        r.text = row_info["ch_sub"]
        r.font.size = Pt(7.0)
        r.font.color.rgb = GRAY_TEXT

        # Arrow
        arr = slide4.shapes.add_textbox(m_left + Inches(2.48), row_info["top"] + Inches(0.24), Inches(0.24), Inches(0.28))
        p = arr.text_frame.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = "→"
        r.font.bold = True
        r.font.size = Pt(11)
        r.font.color.rgb = TEAL

        # Mitigation (Readable: 8.5pt/7.2pt)
        mit_box = slide4.shapes.add_textbox(m_left + Inches(2.74), row_info["top"] + Inches(0.07), Inches(2.18), Inches(0.64))
        tf_mit = mit_box.text_frame
        tf_mit.word_wrap = True
        tf_mit.margin_left = 0
        tf_mit.margin_top = 0
        p = tf_mit.paragraphs[0]
        r = p.add_run()
        r.text = row_info["mit_title"] + "\n"
        r.font.bold = True
        r.font.size = Pt(8.5)
        r.font.color.rgb = DARK_TEAL
        r = p.add_run()
        r.text = row_info["mit_sub"]
        r.font.size = Pt(7.0)
        r.font.color.rgb = GRAY_TEXT

    # Bottom Highlight Banner
    ban4 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(6.16), Inches(11.733), Inches(0.48))
    ban4.fill.solid()
    ban4.fill.fore_color.rgb = LIGHT_TEAL
    ban4.line.color.rgb = BORDER_TEAL
    ban4.line.width = Pt(1.5)
    tf_ban = ban4.text_frame
    tf_ban.margin_top = Inches(0.08)
    tf_ban.word_wrap = False
    p = tf_ban.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "FEASIBILITY PRINCIPLE:  "
    r.font.name = "Georgia"
    r.font.bold = True
    r.font.size = Pt(9.8)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "Existing Frontend  +  Modular AI Architecture  +  Phased Deployment  =  Practical Implementation"
    r.font.bold = True
    r.font.size = Pt(9.8)
    r.font.color.rgb = DARK_TEAL

    print("Slide 4 (Feasibility & Viability): All roadmap & risk mitigation corrections applied.")

    # =========================================================================
    # SLIDE 5 (Index 4): IMPACT AND BENEFITS
    # =========================================================================
    slide5 = prs.slides[4]
    preserved_names_s5 = {"Rectangle 9", "Slide Number Placeholder 5", "Footer Placeholder 6", "Picture 2"}
    for s in list(slide5.shapes):
        if s.name not in preserved_names_s5:
            sp = s._element
            sp.getparent().remove(sp)

    # Team Name Badge
    tb5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(0.32), Inches(1.65), Inches(0.42))
    tb5.fill.solid()
    tb5.fill.fore_color.rgb = WHITE
    tb5.line.color.rgb = BORDER_TEAL
    tb5.line.width = Pt(1.5)
    p = tb5.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "TeamChargers"
    r.font.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = NAVY

    # Official Slide Title - STRICTLY "IMPACT AND BENEFITS"
    title5 = slide5.shapes.add_textbox(Inches(2.65), Inches(0.28), Inches(7.50), Inches(0.45))
    p = title5.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "IMPACT AND BENEFITS"
    r.font.name = "Georgia"
    r.font.size = Pt(21)
    r.font.bold = True
    r.font.color.rgb = NAVY

    # Sub-header Description (Constrained width = 7.70" to guarantee zero overlap with badge or logo)
    desc5 = slide5.shapes.add_textbox(Inches(0.80), Inches(0.80), Inches(7.70), Inches(0.36))
    tf = desc5.text_frame
    tf.word_wrap = True
    tf.margin_left = 0
    tf.margin_top = 0
    p = tf.paragraphs[0]
    r = p.add_run()
    r.text = "Transforming Vocational Decision-Making — "
    r.font.bold = True
    r.font.size = Pt(10)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = "Replacing family hesitation with evidence-backed consensus, clear pathways, and institutional alignment."
    r.font.size = Pt(9.5)
    r.font.color.rgb = GRAY_TEXT

    # Subtle Expected Impact Badge (Correction A Applied)
    exp_badge = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.65), Inches(0.80), Inches(2.95), Inches(0.28))
    exp_badge.fill.solid()
    exp_badge.fill.fore_color.rgb = LIGHT_TEAL
    exp_badge.line.color.rgb = BORDER_TEAL
    exp_badge.line.width = Pt(1.0)
    p = exp_badge.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "EXPECTED IMPACT — TO BE VALIDATED IN PILOT"
    r.font.bold = True
    r.font.size = Pt(7.6)
    r.font.color.rgb = DARK_TEAL

    # Section 1: Before vs After Container
    sec1_container5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(1.20), Inches(11.733), Inches(1.36))
    sec1_container5.fill.solid()
    sec1_container5.fill.fore_color.rgb = CARD_BG
    sec1_container5.line.color.rgb = BORDER_LIGHT

    # Before Pod
    pod_b = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.92), Inches(1.26), Inches(4.75), Inches(1.24))
    pod_b.fill.solid()
    pod_b.fill.fore_color.rgb = WHITE
    pod_b.line.color.rgb = RGBColor(254, 205, 211)

    tb_b_lbl = slide5.shapes.add_textbox(Inches(1.04), Inches(1.29), Inches(3.60), Inches(0.24))
    p = tb_b_lbl.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "BEFORE SKILLSAATHI  "
    r.font.bold = True
    r.font.size = Pt(9.5)
    r.font.color.rgb = ROSE_TEXT
    r = p.add_run()
    r.text = "[ Current Hesitation Reality ]"
    r.font.size = Pt(7.5)
    r.font.italic = True
    r.font.color.rgb = GRAY_TEXT

    if os.path.exists("SIH 2.0/assets/before_dilemma.svg.png"):
        slide5.shapes.add_picture("SIH 2.0/assets/before_dilemma.svg.png", Inches(4.88), Inches(1.36), Inches(0.68), Inches(0.63))

    tb_b_pts = slide5.shapes.add_textbox(Inches(1.04), Inches(1.54), Inches(3.75), Inches(0.90))
    tf_b = tb_b_pts.text_frame
    for idx, pt in enumerate(["Career Confusion", "Parental Hesitation", "Uncertain Earnings", "Fragmented Guidance"]):
        p = tf_b.paragraphs[0] if idx == 0 else tf_b.add_paragraph()
        p.space_after = Pt(2.2)
        r = p.add_run()
        r.text = "• "
        r.font.bold = True
        r.font.size = Pt(9.0)
        r.font.color.rgb = ROSE_TEXT
        r = p.add_run()
        r.text = pt
        r.font.bold = True
        r.font.size = Pt(8.8)
        r.font.color.rgb = NAVY

    # Center Catalyst Conduit
    cat5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.82), Inches(1.31), Inches(1.68), Inches(1.14))
    cat5.fill.solid()
    cat5.fill.fore_color.rgb = LIGHT_TEAL
    cat5.line.color.rgb = BORDER_TEAL
    cat5.line.width = Pt(1.5)
    p = cat5.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "SKILLSAATHI\n"
    r.font.bold = True
    r.font.size = Pt(8.5)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = "➔\n"
    r.font.bold = True
    r.font.size = Pt(15)
    r.font.color.rgb = TEAL
    r = p.add_run()
    r.text = "AI Evidence Mediation"
    r.font.bold = True
    r.font.size = Pt(7.2)
    r.font.color.rgb = NAVY

    # After Pod
    pod_a = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.65), Inches(1.26), Inches(4.75), Inches(1.24))
    pod_a.fill.solid()
    pod_a.fill.fore_color.rgb = WHITE
    pod_a.line.color.rgb = BORDER_TEAL

    tb_a_lbl = slide5.shapes.add_textbox(Inches(7.77), Inches(1.29), Inches(3.60), Inches(0.24))
    p = tb_a_lbl.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "WITH SKILLSAATHI  "
    r.font.bold = True
    r.font.size = Pt(9.5)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = "[ Evidence-Backed Consensus ]"
    r.font.size = Pt(7.5)
    r.font.italic = True
    r.font.color.rgb = GREEN_TEXT

    if os.path.exists("SIH 2.0/assets/after_consensus.svg.png"):
        slide5.shapes.add_picture("SIH 2.0/assets/after_consensus.svg.png", Inches(11.60), Inches(1.38), Inches(0.72), Inches(0.53))

    tb_a_pts = slide5.shapes.add_textbox(Inches(7.77), Inches(1.54), Inches(3.75), Inches(0.90))
    tf_a = tb_a_pts.text_frame
    for idx, pt in enumerate(["Clear Vocational Pathways", "Evidence-Backed Discussions", "Localized Career Insights", "Joint Family Counselling"]):
        p = tf_a.paragraphs[0] if idx == 0 else tf_a.add_paragraph()
        p.space_after = Pt(2.2)
        r = p.add_run()
        r.text = "• "
        r.font.bold = True
        r.font.size = Pt(9.0)
        r.font.color.rgb = TEAL
        r = p.add_run()
        r.text = pt
        r.font.bold = True
        r.font.size = Pt(8.8)
        r.font.color.rgb = DARK_TEAL

    # Section 2: 4 Stakeholder Cards (Correction D Applied)
    sec2_lbl5 = slide5.shapes.add_textbox(Inches(0.80), Inches(2.68), Inches(11.733), Inches(0.24))
    p = sec2_lbl5.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "SECTION 2: MULTI-STAKEHOLDER VALUE CREATION"
    r.font.size = Pt(9.0)
    r.font.bold = True
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "   [ Human-Centered Benefits Across the Vocational Skilling Ecosystem ]"
    r.font.size = Pt(8.0)
    r.font.italic = True
    r.font.color.rgb = TEAL

    stakeholders5 = [
        {
            "num": "01", "role": "STUDENTS", "tag": "Career Clarity & Opportunity", "accent": TEAL,
            "icon": "SIH 2.0/assets/stakeholder_student.svg.png",
            "bullets": ["Personalized career clarity", "NSQF progression awareness"]
        },
        {
            "num": "02", "role": "PARENTS & FAMILIES", "tag": "Trust & Informed Decisions", "accent": NAVY,
            "icon": "SIH 2.0/assets/stakeholder_parents.svg.png",
            "bullets": ["Evidence-backed confidence", "Shared family decisions"]
        },
        {
            "num": "03", "role": "TRAINING INSTITUTIONS", "tag": "Better-Informed Enrolment", "accent": RGBColor(2, 132, 199),
            "icon": "SIH 2.0/assets/stakeholder_institutes.svg.png",
            "bullets": ["Better-informed applicants", "Potential retention improvement"]
        },
        {
            "num": "04", "role": "GOVERNMENT / MSDE", "tag": "Data-Driven Skilling Decisions", "accent": DARK_TEAL,
            "icon": "SIH 2.0/assets/stakeholder_gov.svg.png",
            "bullets": ["Regional resistance insights (participating families)", "Targeted counselling outreach"]
        }
    ]

    c5_top = Inches(2.94)
    c5_w = Inches(2.76)
    c5_h = Inches(1.80)
    c5_gap = Inches(0.231)

    for idx, s in enumerate(stakeholders5):
        cx = Inches(0.80) + idx * (c5_w + c5_gap)
        scard = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, c5_top, c5_w, c5_h)
        scard.fill.solid()
        scard.fill.fore_color.rgb = WHITE
        scard.line.color.rgb = BORDER_LIGHT

        strip = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx + Inches(0.08), c5_top + Inches(0.06), c5_w - Inches(0.16), Inches(0.04))
        strip.fill.solid()
        strip.fill.fore_color.rgb = s["accent"]
        strip.line.fill.background()

        if os.path.exists(s["icon"]):
            slide5.shapes.add_picture(s["icon"], cx + Inches(0.14), c5_top + Inches(0.16), Inches(0.50), Inches(0.50))

        h_box = slide5.shapes.add_textbox(cx + Inches(0.70), c5_top + Inches(0.15), Inches(1.96), Inches(0.52))
        p = h_box.text_frame.paragraphs[0]
        r = p.add_run()
        r.text = f"{s['num']} — {s['role']}\n"
        r.font.bold = True
        r.font.size = Pt(9.5)
        r.font.color.rgb = NAVY
        r = p.add_run()
        r.text = s["tag"]
        r.font.bold = True
        r.font.size = Pt(7.5)
        r.font.color.rgb = s["accent"]

        div = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, cx + Inches(0.14), c5_top + Inches(0.72), c5_w - Inches(0.28), Inches(0.01))
        div.fill.solid()
        div.fill.fore_color.rgb = BORDER_LIGHT
        div.line.fill.background()

        b_box = slide5.shapes.add_textbox(cx + Inches(0.14), c5_top + Inches(0.85), c5_w - Inches(0.28), Inches(0.85))
        tf_b = b_box.text_frame
        for b_idx, bullet_text in enumerate(s["bullets"]):
            p = tf_b.paragraphs[0] if b_idx == 0 else tf_b.add_paragraph()
            p.space_after = Pt(7)
            r = p.add_run()
            r.text = "• "
            r.font.bold = True
            r.font.size = Pt(9.5)
            r.font.color.rgb = s["accent"]
            r = p.add_run()
            r.text = bullet_text
            r.font.bold = True
            r.font.size = Pt(8.8)
            r.font.color.rgb = NAVY

    # Section 3: PROPOSED IMPACT PATHWAY (Correction B & C Applied)
    sec3_top5 = Inches(4.94)
    sec3_lbl5 = slide5.shapes.add_textbox(Inches(0.80), sec3_top5, Inches(11.733), Inches(0.22))
    p = sec3_lbl5.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "SECTION 3: PROPOSED IMPACT PATHWAY"
    r.font.size = Pt(9.5)
    r.font.bold = True
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "   [ Sustainable Impact from Family Decision to Economic Growth ]"
    r.font.size = Pt(8.0)
    r.font.italic = True
    r.font.color.rgb = TEAL

    steps5 = [
        {"num": "STEP 1", "title": "Family Confidence", "sub": "Joint dialogue helps families discuss concerns", "bg": LIGHT_TEAL, "border": BORDER_TEAL, "tcolor": DARK_TEAL},
        {"num": "STEP 2", "title": "Informed Enrolment", "sub": "Learners choose verified vocational tracks", "bg": BLUE_BG, "border": RGBColor(125, 211, 252), "tcolor": BLUE_TEXT},
        {"num": "STEP 3", "title": "Improved Retention", "sub": "Family backing supports course completion", "bg": GREEN_BG, "border": RGBColor(134, 239, 172), "tcolor": GREEN_TEXT},
        {"num": "STEP 4", "title": "Skilled Workforce", "sub": "Employable, certified youth for industry", "bg": LIGHT_TEAL, "border": BORDER_TEAL, "tcolor": DARK_TEAL}
    ]

    p_step_w = Inches(2.55)
    p_step_h = Inches(0.62)
    p_step_top = Inches(5.22)
    p_step_gap = Inches(0.51)

    for idx, st in enumerate(steps5):
        sx = Inches(0.80) + idx * (p_step_w + p_step_gap)
        sbox = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx, p_step_top, p_step_w, p_step_h)
        sbox.fill.solid()
        sbox.fill.fore_color.rgb = st["bg"]
        sbox.line.color.rgb = st["border"]
        sbox.line.width = Pt(1.2)

        tf_s = sbox.text_frame
        p = tf_s.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = f"{st['title']}  "
        r.font.bold = True
        r.font.size = Pt(9.0)
        r.font.color.rgb = st["tcolor"]
        r = p.add_run()
        r.text = f"({st['num']})\n"
        r.font.size = Pt(7.2)
        r.font.color.rgb = GRAY_TEXT
        r = p.add_run()
        r.text = st["sub"]
        r.font.size = Pt(7.2)
        r.font.color.rgb = NAVY

        if idx < 3:
            arr_box = slide5.shapes.add_textbox(sx + p_step_w + Inches(0.10), p_step_top + Inches(0.15), Inches(0.31), Inches(0.32))
            p_arr = arr_box.text_frame.paragraphs[0]
            p_arr.alignment = PP_ALIGN.CENTER
            r_arr = p_arr.add_run()
            r_arr.text = "➔"
            r_arr.font.bold = True
            r_arr.font.size = Pt(14)
            r_arr.font.color.rgb = TEAL

    # Bottom Quote
    quote_banner = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(6.06), Inches(11.733), Inches(0.50))
    quote_banner.fill.solid()
    quote_banner.fill.fore_color.rgb = LIGHT_TEAL
    quote_banner.line.color.rgb = BORDER_TEAL
    quote_banner.line.width = Pt(1.5)
    p = quote_banner.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = '“ SkillSaathi empowers not just individual learners, but the '
    r.font.name = "Georgia"
    r.font.italic = True
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = 'families shaping their futures.'
    r.font.name = "Georgia"
    r.font.italic = True
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = ' ”'
    r.font.name = "Georgia"
    r.font.bold = True
    r.font.size = Pt(11.5)
    r.font.color.rgb = NAVY

    print("Slide 5 (Impact & Benefits): All impact corrections & pilot validation label applied.")

    # =========================================================================
    # SLIDE 6 (Index 5): RESEARCH AND REFERENCES
    # =========================================================================
    slide6 = prs.slides[5]
    preserved_names_s6 = {"Rectangle 9", "Slide Number Placeholder 5", "Footer Placeholder 6", "Picture 2"}
    for s in list(slide6.shapes):
        if s.name not in preserved_names_s6:
            sp = s._element
            sp.getparent().remove(sp)

    # Team Name Badge
    tb6 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(0.32), Inches(1.65), Inches(0.42))
    tb6.fill.solid()
    tb6.fill.fore_color.rgb = WHITE
    tb6.line.color.rgb = BORDER_TEAL
    tb6.line.width = Pt(1.5)
    p = tb6.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "TeamChargers"
    r.font.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = NAVY

    # Official Slide Title - STRICTLY "RESEARCH AND REFERENCES"
    title6 = slide6.shapes.add_textbox(Inches(2.65), Inches(0.28), Inches(7.50), Inches(0.45))
    p = title6.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "RESEARCH AND REFERENCES"
    r.font.name = "Georgia"
    r.font.size = Pt(21)
    r.font.bold = True
    r.font.color.rgb = NAVY

    # Sub-header Description (Constrained width = 8.50" to guarantee zero overlap with SIH logo)
    desc6 = slide6.shapes.add_textbox(Inches(0.80), Inches(0.80), Inches(8.50), Inches(0.36))
    tf = desc6.text_frame
    tf.word_wrap = True
    tf.margin_left = 0
    tf.margin_top = 0
    p = tf.paragraphs[0]
    r = p.add_run()
    r.text = "Foundational Policy & Academic Frameworks — "
    r.font.bold = True
    r.font.size = Pt(10)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = "Grounding SkillSaathi's vocational taxonomies, wage baselines, and family mediation models in verified standards."
    r.font.size = Pt(9.5)
    r.font.color.rgb = GRAY_TEXT

    # Section 1: IEEE Citations Label
    sec1_lbl6 = slide6.shapes.add_textbox(Inches(0.80), Inches(1.18), Inches(7.70), Inches(0.26))
    p = sec1_lbl6.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "SECTION 1: OFFICIAL FRAMEWORKS & RESEARCH REFERENCES"
    r.font.size = Pt(10.0)
    r.font.bold = True
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "   [ IEEE Citation Format ]"
    r.font.size = Pt(8.5)
    r.font.italic = True
    r.font.color.rgb = TEAL

    ref_w = Inches(7.70)
    ref_h = Inches(0.66)
    ref_gap = Inches(0.08)
    ref_top_start = Inches(1.46)

    # 6 IEEE References with prompt corrections (A, B, C, D, E, F)
    # E: Critical URL correction -> https://bharatskills.gov.in/
    references = [
        {
            "num": "[1]",
            "author": "National Council for Vocational Education and Training, ",
            "title": "“National Skills Qualification Framework (NSQF),” ",
            "venue": "NCVET, Ministry of Skill Development and Entrepreneurship, Govt. of India. [Online]. Available: ",
            "url": "https://ncvet.gov.in/national-skills-qualification-framework/",
            "accessed": " [Accessed: Oct. 19, 2026].",
            "tag": "NCrF-Aligned Qualification Levels & Progression"
        },
        {
            "num": "[2]",
            "author": "Ministry of Skill Development and Entrepreneurship, ",
            "title": "“Ministry of Skill Development and Entrepreneurship,” ",
            "venue": "Government of India. [Online]. Available: ",
            "url": "https://www.msde.gov.in/",
            "accessed": " [Accessed: Oct. 19, 2026].",
            "tag": "National Vocational Policies & Scheme Mandates"
        },
        {
            "num": "[3]",
            "author": "Directorate General of Training, ",
            "title": "“Craftsmen Training Scheme (CTS),” ",
            "venue": "Government of India. [Online]. Available: ",
            "url": "https://dgt.gov.in/en/CTS",
            "accessed": " [Accessed: Oct. 19, 2026].",
            "tag": "ITI Vocational Trades & Training Framework"
        },
        {
            "num": "[4]",
            "author": "Directorate General of Employment, ",
            "title": "“National Career Service,” ",
            "venue": "Ministry of Labour and Employment, Government of India. [Online]. Available: ",
            "url": "https://www.ncs.gov.in/",
            "accessed": " [Accessed: Oct. 19, 2026].",
            "tag": "Career Information & Employment Services"
        },
        {
            "num": "[5]",
            "author": "Directorate General of Training, ",
            "title": "“Bharat Skills,” ",
            "venue": "Ministry of Skill Development and Entrepreneurship, Government of India. [Online]. Available: ",
            "url": "https://bharatskills.gov.in/",
            "accessed": " [Accessed: Oct. 19, 2026].",
            "tag": "Trade Learning Resources & Question Banks"
        },
        {
            "num": "[6]",
            "author": "J. Dietrich and B. Kracke, ",
            "title": "“Career-specific parental behaviors in adolescents’ development,” ",
            "venue": "Journal of Vocational Behavior, vol. 75, no. 2, pp. 109–119, 2009. doi: ",
            "url": "https://doi.org/10.1016/j.jvb.2009.03.005",
            "accessed": "",
            "tag": "Parental Influence on Career Decisions — Academic Research"
        }
    ]

    for idx, ref in enumerate(references):
        r_top = ref_top_start + idx * (ref_h + ref_gap)

        rcard = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), r_top, ref_w, ref_h)
        rcard.fill.solid()
        rcard.fill.fore_color.rgb = WHITE
        rcard.line.color.rgb = BORDER_LIGHT
        rcard.line.width = Pt(1.0)

        badge = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.90), r_top + Inches(0.12), Inches(0.46), Inches(0.42))
        badge.fill.solid()
        badge.fill.fore_color.rgb = LIGHT_TEAL
        badge.line.color.rgb = BORDER_TEAL
        badge.line.width = Pt(1.0)
        tf_bg = badge.text_frame
        tf_bg.margin_left = 0
        tf_bg.margin_right = 0
        tf_bg.margin_top = Inches(0.08)
        p_bg = tf_bg.paragraphs[0]
        p_bg.alignment = PP_ALIGN.CENTER
        r = p_bg.add_run()
        r.text = ref["num"]
        r.font.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = DARK_TEAL

        tb = slide6.shapes.add_textbox(Inches(1.46), r_top + Inches(0.05), Inches(6.92), Inches(0.56))
        tf_r = tb.text_frame
        tf_r.word_wrap = True
        tf_r.margin_left = 0
        tf_r.margin_top = 0

        p1 = tf_r.paragraphs[0]
        p1.space_after = Pt(1.5)
        r = p1.add_run()
        r.text = ref["author"]
        r.font.bold = True
        r.font.size = Pt(9.8)
        r.font.color.rgb = NAVY

        r = p1.add_run()
        r.text = ref["title"]
        r.font.bold = True
        r.font.size = Pt(9.8)
        r.font.color.rgb = DARK_TEAL

        r = p1.add_run()
        r.text = f"  ({ref['tag']})"
        r.font.size = Pt(7.5)
        r.font.italic = True
        r.font.color.rgb = SLATE_LIGHT

        p2 = tf_r.add_paragraph()
        r = p2.add_run()
        r.text = ref["venue"]
        r.font.size = Pt(8.8)
        r.font.color.rgb = GRAY_TEXT

        r = p2.add_run()
        r.text = ref["url"]
        r.font.size = Pt(8.8)
        r.font.underline = True
        r.font.color.rgb = LINK_BLUE
        r.hyperlink.address = ref["url"]

        if ref["accessed"]:
            r = p2.add_run()
            r.text = ref["accessed"]
            r.font.size = Pt(8.2)
            r.font.italic = True
            r.font.color.rgb = GRAY_TEXT

    # Section 2: Refined Data Grounding Diagram (Correction H Applied)
    sec2_lbl6 = slide6.shapes.add_textbox(Inches(8.78), Inches(1.18), Inches(3.75), Inches(0.26))
    p = sec2_lbl6.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "SECTION 2: DATA GROUNDING ARCHITECTURE"
    r.font.size = Pt(10.0)
    r.font.bold = True
    r.font.color.rgb = NAVY

    right_box = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.78), Inches(1.46), Inches(3.75), Inches(4.36))
    right_box.fill.solid()
    right_box.fill.fore_color.rgb = CARD_BG
    right_box.line.color.rgb = BORDER_LIGHT
    right_box.line.width = Pt(1.0)

    # 2A. Layer 1: Official Government Sources
    l1 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.92), Inches(1.58), Inches(3.47), Inches(0.92))
    l1.fill.solid()
    l1.fill.fore_color.rgb = WHITE
    l1.line.color.rgb = BORDER_LIGHT

    if os.path.exists("SIH 2.0/assets/database.svg.png"):
        slide6.shapes.add_picture("SIH 2.0/assets/database.svg.png", Inches(9.02), Inches(1.74), Inches(0.42), Inches(0.55))

    tb_l1 = slide6.shapes.add_textbox(Inches(9.52), Inches(1.64), Inches(2.78), Inches(0.80))
    tf_l1 = tb_l1.text_frame
    tf_l1.word_wrap = True
    p = tf_l1.paragraphs[0]
    r = p.add_run()
    r.text = "OFFICIAL GOVERNMENT SOURCES\n"
    r.font.bold = True
    r.font.size = Pt(8.8)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "NCVET • MSDE • DGT • NCS • Bharat Skills\n"
    r.font.bold = True
    r.font.size = Pt(7.8)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = "Target sources for verified qualification information"
    r.font.size = Pt(7.2)
    r.font.color.rgb = GRAY_TEXT

    arr1_6 = slide6.shapes.add_textbox(Inches(10.45), Inches(2.51), Inches(0.40), Inches(0.24))
    p = arr1_6.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "↓"
    r.font.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = TEAL

    # 2B. Layer 2: Curated Vocational Information
    l2 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.92), Inches(2.76), Inches(3.47), Inches(0.96))
    l2.fill.solid()
    l2.fill.fore_color.rgb = WHITE
    l2.line.color.rgb = BORDER_LIGHT

    if os.path.exists("SIH 2.0/assets/tradeoff_scale.svg.png"):
        slide6.shapes.add_picture("SIH 2.0/assets/tradeoff_scale.svg.png", Inches(9.02), Inches(2.94), Inches(0.44), Inches(0.55))

    tb_l2 = slide6.shapes.add_textbox(Inches(9.52), Inches(2.82), Inches(2.78), Inches(0.84))
    tf_l2 = tb_l2.text_frame
    tf_l2.word_wrap = True
    p = tf_l2.paragraphs[0]
    r = p.add_run()
    r.text = "CURATED VOCATIONAL INFORMATION\n"
    r.font.bold = True
    r.font.size = Pt(8.8)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "• NCrF-aligned qualification standards & levels\n• CTS vocational trade curricula & duration\n• Career profiles & employment demand indicators"
    r.font.size = Pt(7.3)
    r.font.color.rgb = GRAY_TEXT

    arr2_6 = slide6.shapes.add_textbox(Inches(10.45), Inches(3.73), Inches(0.40), Inches(0.24))
    p = arr2_6.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "↓"
    r.font.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = TEAL

    # 2C. Layer 3: Proposed SkillSaathi AI Guidance
    l3 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.92), Inches(3.98), Inches(3.47), Inches(1.10))
    l3.fill.solid()
    l3.fill.fore_color.rgb = LIGHT_TEAL
    l3.line.color.rgb = BORDER_TEAL
    l3.line.width = Pt(1.2)

    if os.path.exists("SIH 2.0/assets/ai_brain.svg.png"):
        slide6.shapes.add_picture("SIH 2.0/assets/ai_brain.svg.png", Inches(9.02), Inches(4.24), Inches(0.44), Inches(0.44))

    tb_l3 = slide6.shapes.add_textbox(Inches(9.52), Inches(4.04), Inches(2.78), Inches(0.98))
    tf_l3 = tb_l3.text_frame
    tf_l3.word_wrap = True
    p = tf_l3.paragraphs[0]
    r = p.add_run()
    r.text = "PROPOSED SKILLSAATHI AI GUIDANCE\n"
    r.font.bold = True
    r.font.size = Pt(8.8)
    r.font.color.rgb = DARK_TEAL
    r = p.add_run()
    r.text = "• Evidence-grounded guidance using verified frameworks\n• Structured family trade-off & consensus analysis\n• Local mock/demo data utilized in current prototype"
    r.font.size = Pt(7.3)
    r.font.color.rgb = NAVY

    note_box = slide6.shapes.add_textbox(Inches(8.92), Inches(5.16), Inches(3.47), Inches(0.55))
    tf_n = note_box.text_frame
    tf_n.word_wrap = True
    p = tf_n.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "Note: Target integration sources for production rollout.\nCurrent prototype utilizes local mock/demo data."
    r.font.italic = True
    r.font.size = Pt(7.0)
    r.font.color.rgb = SLATE_LIGHT

    # Section 3: Refined Bottom Statement (Exact user statement)
    banner6 = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(6.04), Inches(11.733), Inches(0.50))
    banner6.fill.solid()
    banner6.fill.fore_color.rgb = LIGHT_TEAL
    banner6.line.color.rgb = BORDER_TEAL
    banner6.line.width = Pt(1.5)
    tf_ban6 = banner6.text_frame
    tf_ban6.margin_top = Inches(0.11)
    tf_ban6.word_wrap = False
    p = tf_ban6.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "“ SkillSaathi prioritizes verified government frameworks and evidence-grounded recommendations "
    r.font.name = "Georgia"
    r.font.bold = True
    r.font.size = Pt(9.8)
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "to improve the reliability of vocational career guidance. ”"
    r.font.name = "Georgia"
    r.font.bold = True
    r.font.size = Pt(9.8)
    r.font.color.rgb = DARK_TEAL

    print("Slide 6 (Research & References): All verified citations and data grounding corrections applied.")

    # Save to both target file and current presentation
    prs.save(out_ppt)
    prs.save(src_ppt)
    print("Successfully saved presentation to:")
    print("1.", out_ppt)
    print("2.", src_ppt)

if __name__ == "__main__":
    apply_all_final_corrections()
