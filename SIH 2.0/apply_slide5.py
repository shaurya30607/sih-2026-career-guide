import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def update_slide5():
    ppt_path = "SIH 2.0/SIH2025-IDEA-Presentation-Format.pptx"
    prs = Presentation(ppt_path)
    
    NAVY = RGBColor(11, 19, 43)          # #0B132B
    TEAL = RGBColor(13, 148, 136)        # #0D9488
    DARK_TEAL = RGBColor(15, 118, 110)   # #0F766E
    LIGHT_TEAL = RGBColor(240, 253, 250) # #F0FDFA
    BORDER_TEAL = RGBColor(45, 212, 191) # #2DD4BF
    WHITE = RGBColor(255, 255, 255)
    GRAY_TEXT = RGBColor(71, 85, 105)    # #475569
    SLATE_LIGHT = RGBColor(100, 116, 139)# #64748B
    CARD_BG = RGBColor(248, 250, 252)    # #F8FAFC
    BORDER_GRAY = RGBColor(203, 213, 225)# #CBD5E1
    BORDER_LIGHT = RGBColor(226, 232, 240)# #E2E8F0
    AMBER_BG = RGBColor(254, 243, 199)   # #FEF3C7
    BLUE_BG = RGBColor(224, 242, 254)    # #E0F2FE
    BLUE_TEXT = RGBColor(7, 89, 133)     # #075985
    GREEN_BG = RGBColor(220, 252, 231)   # #DCFCE7
    GREEN_TEXT = RGBColor(22, 101, 52)   # #166534
    ROSE_TEXT = RGBColor(159, 18, 57)    # #9F1239

    # =========================================================================
    # REBUILD SLIDE 5 (Index 4) - PERFECTLY PROPORTIONED & BALANCED
    # =========================================================================
    slide5 = prs.slides[4]
    preserved_names = {"Rectangle 9", "Slide Number Placeholder 5", "Footer Placeholder 6", "Picture 2"}
    for s in list(slide5.shapes):
        if s.name not in preserved_names:
            sp = s._element
            sp.getparent().remove(sp)

    # 1. Team Name Badge (Left-aligned, standard placement)
    team_badge5 = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(0.32), Inches(1.65), Inches(0.42))
    team_badge5.fill.solid()
    team_badge5.fill.fore_color.rgb = WHITE
    team_badge5.line.color.rgb = BORDER_TEAL
    team_badge5.line.width = Pt(1.5)
    tf = team_badge5.text_frame
    tf.word_wrap = False
    tf.margin_top = Inches(0.06)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "TeamChargers"
    r.font.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = NAVY

    # 2. Official Slide Title - STRICTLY "IMPACT AND BENEFITS"
    title_box5 = slide5.shapes.add_textbox(Inches(2.65), Inches(0.28), Inches(7.50), Inches(0.45))
    tf = title_box5.text_frame
    tf.word_wrap = False
    p = tf.paragraphs[0]
    r = p.add_run()
    r.text = "IMPACT AND BENEFITS"
    r.font.name = "Georgia"
    r.font.size = Pt(21)
    r.font.bold = True
    r.font.color.rgb = NAVY

    # 3. Sub-header Description (Constrained width = 8.50" to guarantee zero overlap with SIH logo)
    desc_box5 = slide5.shapes.add_textbox(Inches(0.80), Inches(0.80), Inches(8.50), Inches(0.36))
    tf = desc_box5.text_frame
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
    r.text = "Unlocking learner potential by replacing family hesitation with evidence-backed consensus, structured pathways, and institutional alignment."
    r.font.size = Pt(9.5)
    r.font.color.rgb = GRAY_TEXT

    # =========================================================================
    # SECTION 1: SIMPLIFIED BEFORE VS. AFTER (Top ~26% -> height = 1.36")
    # =========================================================================
    sec1_container = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(1.20), Inches(11.733), Inches(1.36))
    sec1_container.fill.solid()
    sec1_container.fill.fore_color.rgb = CARD_BG
    sec1_container.line.color.rgb = BORDER_LIGHT
    sec1_container.line.width = Pt(1.0)

    # 1A. Left Pod: BEFORE SKILLSAATHI (Current Reality)
    pod_before = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.92), Inches(1.26), Inches(4.75), Inches(1.24))
    pod_before.fill.solid()
    pod_before.fill.fore_color.rgb = WHITE
    pod_before.line.color.rgb = RGBColor(254, 205, 211) # Rose border
    pod_before.line.width = Pt(1.0)

    # Before Tag & Title
    tb_bef = slide5.shapes.add_textbox(Inches(1.04), Inches(1.29), Inches(3.60), Inches(0.24))
    tf = tb_bef.text_frame
    tf.margin_left = 0
    tf.margin_top = 0
    p = tf.paragraphs[0]
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

    # Before Illustration (Right of Pod)
    icon_before = "SIH 2.0/assets/before_dilemma.svg.png"
    if os.path.exists(icon_before):
        slide5.shapes.add_picture(icon_before, Inches(4.88), Inches(1.36), Inches(0.68), Inches(0.63))

    # Before Simplified Points (4 clear, punchy transformations)
    bef_points = [
        "Career Confusion",
        "Parental Hesitation",
        "Uncertain Earnings",
        "Fragmented Guidance"
    ]
    tb_bef_b = slide5.shapes.add_textbox(Inches(1.04), Inches(1.54), Inches(3.75), Inches(0.90))
    tf_b = tb_bef_b.text_frame
    tf_b.word_wrap = True
    tf_b.margin_left = 0
    tf_b.margin_top = 0
    for idx, pt in enumerate(bef_points):
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

    # 1B. Center Transformation Conduit
    cat_card = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.82), Inches(1.31), Inches(1.68), Inches(1.14))
    cat_card.fill.solid()
    cat_card.fill.fore_color.rgb = LIGHT_TEAL
    cat_card.line.color.rgb = BORDER_TEAL
    cat_card.line.width = Pt(1.5)
    tf_cat = cat_card.text_frame
    tf_cat.margin_top = Inches(0.08)
    tf_cat.word_wrap = False
    p = tf_cat.paragraphs[0]
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

    # 1C. Right Pod: WITH SKILLSAATHI (Transformed State)
    pod_after = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.65), Inches(1.26), Inches(4.75), Inches(1.24))
    pod_after.fill.solid()
    pod_after.fill.fore_color.rgb = WHITE
    pod_after.line.color.rgb = BORDER_TEAL
    pod_after.line.width = Pt(1.2)

    # After Tag & Title
    tb_aft = slide5.shapes.add_textbox(Inches(7.77), Inches(1.29), Inches(3.60), Inches(0.24))
    tf = tb_aft.text_frame
    tf.margin_left = 0
    tf.margin_top = 0
    p = tf.paragraphs[0]
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

    # After Illustration (Right of Pod)
    icon_after = "SIH 2.0/assets/after_consensus.svg.png"
    if os.path.exists(icon_after):
        slide5.shapes.add_picture(icon_after, Inches(11.60), Inches(1.38), Inches(0.72), Inches(0.53))

    # After Simplified Points (Corresponding 4 transformations)
    aft_points = [
        "Clear Vocational Pathways",
        "Evidence-Backed Discussions",
        "Localized Career Insights",
        "Joint Family Counselling"
    ]
    tb_aft_b = slide5.shapes.add_textbox(Inches(7.77), Inches(1.54), Inches(3.75), Inches(0.90))
    tf_b = tb_aft_b.text_frame
    tf_b.word_wrap = True
    tf_b.margin_left = 0
    tf_b.margin_top = 0
    for idx, pt in enumerate(aft_points):
        p = tf_b.paragraphs[0] if idx == 0 else tf_b.add_paragraph()
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

    # =========================================================================
    # SECTION 2: PROPORTIONED STAKEHOLDER BENEFITS (Middle -> height = 1.82")
    # =========================================================================
    sec2_lbl = slide5.shapes.add_textbox(Inches(0.80), Inches(2.68), Inches(11.733), Inches(0.24))
    p = sec2_lbl.text_frame.paragraphs[0]
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

    card_top = Inches(2.94)
    card_w = Inches(2.76)
    card_h = Inches(1.80)
    card_gap = Inches(0.231)

    stakeholders = [
        {
            "num": "01",
            "role": "STUDENTS",
            "tag": "Career Clarity & Opportunity",
            "accent": TEAL,
            "icon": "SIH 2.0/assets/stakeholder_student.svg.png",
            "bullets": [
                "Personalized career clarity",
                "NSQF progression awareness"
            ]
        },
        {
            "num": "02",
            "role": "PARENTS & FAMILIES",
            "tag": "Trust & Informed Decisions",
            "accent": NAVY,
            "icon": "SIH 2.0/assets/stakeholder_parents.svg.png",
            "bullets": [
                "Evidence-backed confidence",
                "Shared family decisions"
            ]
        },
        {
            "num": "03",
            "role": "TRAINING INSTITUTIONS",
            "tag": "Better-Informed Enrolment",
            "accent": RGBColor(2, 132, 199), # Sky Blue
            "icon": "SIH 2.0/assets/stakeholder_institutes.svg.png",
            "bullets": [
                "Better-informed applicants",
                "Potential retention improvement"
            ]
        },
        {
            "num": "04",
            "role": "GOVERNMENT / MSDE",
            "tag": "Data-Driven Skilling Decisions",
            "accent": DARK_TEAL,
            "icon": "SIH 2.0/assets/stakeholder_gov.svg.png",
            "bullets": [
                "Regional resistance insights",
                "Targeted counselling outreach"
            ]
        }
    ]

    for idx, s in enumerate(stakeholders):
        c_left = Inches(0.80) + idx * (card_w + card_gap)
        
        # Outer Card
        scard = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c_left, card_top, card_w, card_h)
        scard.fill.solid()
        scard.fill.fore_color.rgb = WHITE
        scard.line.color.rgb = BORDER_LIGHT
        scard.line.width = Pt(1.0)

        # Top Accent Strip
        strip = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c_left + Inches(0.08), card_top + Inches(0.06), card_w - Inches(0.16), Inches(0.04))
        strip.fill.solid()
        strip.fill.fore_color.rgb = s["accent"]
        strip.line.fill.background()

        # Icon (Top Left)
        if os.path.exists(s["icon"]):
            slide5.shapes.add_picture(s["icon"], c_left + Inches(0.14), card_top + Inches(0.16), Inches(0.50), Inches(0.50))

        # Title & Subtitle
        h_box = slide5.shapes.add_textbox(c_left + Inches(0.70), card_top + Inches(0.15), Inches(1.96), Inches(0.52))
        tf_h = h_box.text_frame
        tf_h.word_wrap = True
        tf_h.margin_left = 0
        tf_h.margin_top = 0
        p = tf_h.paragraphs[0]
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

        # Divider line
        div = slide5.shapes.add_shape(MSO_SHAPE.RECTANGLE, c_left + Inches(0.14), card_top + Inches(0.72), card_w - Inches(0.28), Inches(0.01))
        div.fill.solid()
        div.fill.fore_color.rgb = BORDER_LIGHT
        div.line.fill.background()

        # Simplified Bullets (Larger font, centered/well-proportioned in card)
        b_box = slide5.shapes.add_textbox(c_left + Inches(0.14), card_top + Inches(0.85), card_w - Inches(0.28), Inches(0.85))
        tf_b = b_box.text_frame
        tf_b.word_wrap = True
        tf_b.margin_left = 0
        tf_b.margin_top = 0
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

    # =========================================================================
    # SECTION 3: PRESERVED LONG-TERM IMPACT PATHWAY & VISION
    # =========================================================================
    sec3_top = Inches(4.94)
    
    sec3_lbl = slide5.shapes.add_textbox(Inches(0.80), sec3_top, Inches(11.733), Inches(0.22))
    p = sec3_lbl.text_frame.paragraphs[0]
    r = p.add_run()
    r.text = "SECTION 3: LONG-TERM SYSTEMIC MULTIPLIER PATHWAY"
    r.font.size = Pt(9.0)
    r.font.bold = True
    r.font.color.rgb = NAVY
    r = p.add_run()
    r.text = "   [ Sustainable Impact from Family Decision to Economic Growth ]"
    r.font.size = Pt(8.0)
    r.font.italic = True
    r.font.color.rgb = TEAL

    # 4 Horizontal Pathway Step Blocks
    p_step_w = Inches(2.55)
    p_step_h = Inches(0.62)
    p_step_top = Inches(5.22)
    p_step_gap = Inches(0.51)

    steps = [
        {"num": "STEP 1", "title": "Family Confidence", "sub": "Joint dialogue resolves parental hesitation", "bg": LIGHT_TEAL, "border": BORDER_TEAL, "tcolor": DARK_TEAL},
        {"num": "STEP 2", "title": "Informed Enrolment", "sub": "Learners choose verified vocational tracks", "bg": BLUE_BG, "border": RGBColor(125, 211, 252), "tcolor": BLUE_TEXT},
        {"num": "STEP 3", "title": "Improved Retention", "sub": "Family backing supports course completion", "bg": GREEN_BG, "border": RGBColor(134, 239, 172), "tcolor": GREEN_TEXT},
        {"num": "STEP 4", "title": "Skilled Workforce", "sub": "Employable, certified youth for industry", "bg": LIGHT_TEAL, "border": BORDER_TEAL, "tcolor": DARK_TEAL}
    ]

    for idx, st in enumerate(steps):
        s_left = Inches(0.80) + idx * (p_step_w + p_step_gap)
        
        # Step block
        sbox = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, s_left, p_step_top, p_step_w, p_step_h)
        sbox.fill.solid()
        sbox.fill.fore_color.rgb = st["bg"]
        sbox.line.color.rgb = st["border"]
        sbox.line.width = Pt(1.2)

        tf_s = sbox.text_frame
        tf_s.word_wrap = True
        tf_s.margin_left = Inches(0.08)
        tf_s.margin_right = Inches(0.08)
        tf_s.margin_top = Inches(0.07)
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

        # Arrow to next step
        if idx < 3:
            arr_box = slide5.shapes.add_textbox(s_left + p_step_w + Inches(0.10), p_step_top + Inches(0.15), Inches(0.31), Inches(0.32))
            p_arr = arr_box.text_frame.paragraphs[0]
            p_arr.alignment = PP_ALIGN.CENTER
            r_arr = p_arr.add_run()
            r_arr.text = "➔"
            r_arr.font.bold = True
            r_arr.font.size = Pt(14)
            r_arr.font.color.rgb = TEAL

    # Memorable Highlight Statement Banner (Bottom)
    quote_banner = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(6.06), Inches(11.733), Inches(0.50))
    quote_banner.fill.solid()
    quote_banner.fill.fore_color.rgb = LIGHT_TEAL
    quote_banner.line.color.rgb = BORDER_TEAL
    quote_banner.line.width = Pt(1.5)
    
    tf_q = quote_banner.text_frame
    tf_q.margin_top = Inches(0.10)
    tf_q.word_wrap = False
    p = tf_q.paragraphs[0]
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

    prs.save(ppt_path)
    print("Successfully rebuilt Slide 5 with perfect vertical harmony in:", ppt_path)

if __name__ == "__main__":
    update_slide5()
