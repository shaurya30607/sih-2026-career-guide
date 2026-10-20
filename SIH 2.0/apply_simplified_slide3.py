import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def apply_slide_3():
    ppt_path = "SIH 2.0/SIH2025-IDEA-Presentation-Format.pptx"
    prs = Presentation(ppt_path)
    slide3 = prs.slides[2] # 0-indexed 2 is Slide 3
    
    # Preserve template essentials
    preserved_names = {"Rectangle 9", "Slide Number Placeholder 5", "Footer Placeholder 6", "Picture 2"}
    
    shapes_to_remove = [s for s in slide3.shapes if s.name not in preserved_names]
    for s in shapes_to_remove:
        sp = s._element
        sp.getparent().remove(sp)
        
    # Color palette
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
    TEXT_MUTED = RGBColor(100, 116, 139)
    GREEN_TEXT = RGBColor(22, 101, 52)   # #166534

    # 1. Team Name Badge
    team_badge = slide3.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(0.80), Inches(0.32), Inches(1.65), Inches(0.42)
    )
    team_badge.name = "Team_Badge"
    team_badge.fill.solid()
    team_badge.fill.fore_color.rgb = WHITE
    team_badge.line.color.rgb = BORDER_TEAL
    team_badge.line.width = Pt(1.5)
    tf_tb = team_badge.text_frame
    tf_tb.word_wrap = False
    tf_tb.margin_left = Inches(0.05)
    tf_tb.margin_right = Inches(0.05)
    tf_tb.margin_top = Inches(0.06)
    tf_tb.margin_bottom = Inches(0.06)
    p_tb = tf_tb.paragraphs[0]
    p_tb.alignment = PP_ALIGN.CENTER
    r_tb = p_tb.add_run()
    r_tb.text = "TeamChargers"
    r_tb.font.name = "Calibri"
    r_tb.font.size = Pt(12)
    r_tb.font.bold = True
    r_tb.font.color.rgb = NAVY

    # 2. Slide Title
    title_box = slide3.shapes.add_textbox(Inches(2.65), Inches(0.28), Inches(8.00), Inches(0.45))
    title_box.name = "Slide_Title_Box"
    tf_title = title_box.text_frame
    tf_title.word_wrap = False
    tf_title.margin_left = Inches(0)
    tf_title.margin_top = Inches(0)
    p_title = tf_title.paragraphs[0]
    p_title.alignment = PP_ALIGN.LEFT
    
    r_t1 = p_title.add_run()
    r_t1.text = "TECHNICAL APPROACH: "
    r_t1.font.name = "Georgia"
    r_t1.font.size = Pt(20)
    r_t1.font.bold = True
    r_t1.font.color.rgb = NAVY

    r_t2 = p_title.add_run()
    r_t2.text = "System Architecture & Implementation"
    r_t2.font.name = "Calibri"
    r_t2.font.size = Pt(18)
    r_t2.font.bold = True
    r_t2.font.color.rgb = TEAL

    # 3. Sub-header Description
    desc_box = slide3.shapes.add_textbox(Inches(0.80), Inches(0.82), Inches(9.80), Inches(0.28))
    desc_box.name = "Description_Box"
    tf_desc = desc_box.text_frame
    tf_desc.word_wrap = True
    tf_desc.margin_left = Inches(0)
    tf_desc.margin_top = Inches(0)
    p_desc = tf_desc.paragraphs[0]
    r_desc = p_desc.add_run()
    r_desc.text = "An end-to-end technical pipeline translating joint family dialogue into grounded, evidence-backed vocational pathways."
    r_desc.font.name = "Calibri"
    r_desc.font.size = Pt(10.5)
    r_desc.font.color.rgb = GRAY_TEXT

    # =========================================================================
    # SECTION 1: SYSTEM ARCHITECTURE (70% Area - 4 Prominent Horizontal Stages)
    # Total Width: 11.733" (0.80" to 12.533")
    # Top: 1.25" to 4.95" (Height = 3.70")
    # 4 Cards: Width = 2.62", Gap = 0.42"
    # Stage 1 Left: 0.80"
    # Stage 2 Left: 0.80 + 2.62 + 0.42 = 3.84"
    # Stage 3 Left: 3.84 + 2.62 + 0.42 = 6.88"
    # Stage 4 Left: 6.88 + 2.62 + 0.42 = 9.92" (Right reaches 12.54")
    # =========================================================================
    card_w = Inches(2.62)
    stage_card_h = Inches(2.55)
    stage_top = Inches(1.24)
    
    stages = [
        {
            "num": "STAGE 01",
            "title": "User Interface",
            "status": "React Frontend [Active]",
            "status_color": DARK_TEAL,
            "items": [
                "React + TypeScript",
                "Student & Parent Portals",
                "Multilingual Interaction"
            ],
            "highlight": False,
            "left": Inches(0.80)
        },
        {
            "num": "STAGE 02",
            "title": "Backend & Data",
            "status": "FastAPI Services [Planned]",
            "status_color": SLATE_LIGHT,
            "items": [
                "FastAPI Architecture",
                "Family Profiles & Sessions",
                "Vocational Outcome Datasets"
            ],
            "highlight": False,
            "left": Inches(3.84)
        },
        {
            "num": "STAGE 03",
            "title": "AI Decision Engine",
            "status": "Core Innovation [Proposed]",
            "status_color": TEAL,
            "items": [
                "Evidence-Grounded Counselling",
                "Disagreement Detection",
                "Career Comparison & Confidence Tracking"
            ],
            "highlight": True, # Primary innovation highlight
            "left": Inches(6.88)
        },
        {
            "num": "STAGE 04",
            "title": "Outcomes & Analytics",
            "status": "Action & Governance [Planned]",
            "status_color": SLATE_LIGHT,
            "items": [
                "Family Decision Summary",
                "Human Counsellor Escalation",
                "Administrator Dashboard"
            ],
            "highlight": False,
            "left": Inches(9.92)
        }
    ]

    for stage in stages:
        c_left = stage["left"]
        
        # Outer Card
        box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c_left, stage_top, card_w, stage_card_h)
        box.name = f"Card_{stage['num']}"
        box.fill.solid()
        if stage["highlight"]:
            box.fill.fore_color.rgb = LIGHT_TEAL
            box.line.color.rgb = TEAL
            box.line.width = Pt(2.0)
        else:
            box.fill.fore_color.rgb = WHITE
            box.line.color.rgb = BORDER_GRAY
            box.line.width = Pt(1.25)
            
        # Text Frame inside Card
        tf = box.text_frame
        tf.margin_left = Inches(0.14)
        tf.margin_right = Inches(0.14)
        tf.margin_top = Inches(0.15)
        tf.margin_bottom = Inches(0.12)
        tf.word_wrap = True
        
        # Paragraph 1: Stage Number + Status Badge
        p0 = tf.paragraphs[0]
        r_num = p0.add_run()
        r_num.text = stage["num"] + "  •  "
        r_num.font.name = "Calibri"
        r_num.font.size = Pt(8.5)
        r_num.font.bold = True
        r_num.font.color.rgb = stage["status_color"]
        
        r_stat = p0.add_run()
        r_stat.text = stage["status"]
        r_stat.font.name = "Calibri"
        r_stat.font.size = Pt(8.0)
        r_stat.font.bold = True
        r_stat.font.color.rgb = stage["status_color"]
        
        # Paragraph 2: Stage Title
        p_title = tf.add_paragraph()
        r_title = p_title.add_run()
        r_title.text = stage["title"]
        r_title.font.name = "Calibri"
        r_title.font.size = Pt(14)
        r_title.font.bold = True
        r_title.font.color.rgb = NAVY
        
        # Divider Spacing
        p_div = tf.add_paragraph()
        r_div = p_div.add_run()
        r_div.text = ""
        r_div.font.size = Pt(4)
        
        # Bullet Items (Clear, large, video-ready text)
        for item in stage["items"]:
            p_item = tf.add_paragraph()
            p_item.space_before = Pt(4)
            r_bullet = p_item.add_run()
            r_bullet.text = "•  "
            r_bullet.font.name = "Calibri"
            r_bullet.font.size = Pt(10)
            r_bullet.font.bold = True
            r_bullet.font.color.rgb = TEAL if stage["highlight"] else DARK_TEAL
            
            r_txt = p_item.add_run()
            r_txt.text = item
            r_txt.font.name = "Calibri"
            r_txt.font.size = Pt(10)
            r_txt.font.bold = (stage["highlight"] and "Evidence" in item)
            r_txt.font.color.rgb = NAVY if stage["highlight"] else GRAY_TEXT

    # Connecting Arrows between Stages (Horizontal Flow)
    # Arrow 1 -> 2: at Left 3.46", Top 2.30"
    # Arrow 2 -> 3: at Left 6.50", Top 2.30"
    # Arrow 3 -> 4: at Left 9.54", Top 2.30"
    arrow_positions = [Inches(3.46), Inches(6.50), Inches(9.54)]
    for ax in arrow_positions:
        arr = slide3.shapes.add_textbox(ax, Inches(2.25), Inches(0.34), Inches(0.40))
        arr.text_frame.margin_left = 0
        arr.text_frame.margin_top = 0
        p_a = arr.text_frame.paragraphs[0]
        p_a.alignment = PP_ALIGN.CENTER
        r_a = p_a.add_run()
        r_a.text = "➔"
        r_a.font.size = Pt(18)
        r_a.font.bold = True
        r_a.font.color.rgb = TEAL

    # =========================================================================
    # CRITICAL ADDITION: DATA GROUNDING DATABASE BOX UNDERNEATH STAGE 3
    # Connects Vocational Outcome Datasets directly into Stage 3 (AI Decision Engine)
    # =========================================================================
    db_left = Inches(6.40)
    db_w = Inches(3.58)
    db_top = Inches(4.04)
    db_h = Inches(0.68)
    
    # Connecting Upward Arrow '⬆' from Database Box to Stage 3
    arr_up = slide3.shapes.add_textbox(Inches(8.05), Inches(3.78), Inches(0.30), Inches(0.28))
    arr_up.text_frame.margin_left = 0
    arr_up.text_frame.margin_top = 0
    p_up = arr_up.text_frame.paragraphs[0]
    p_up.alignment = PP_ALIGN.CENTER
    r_up = p_up.add_run()
    r_up.text = "⬆"
    r_up.font.size = Pt(15)
    r_up.font.bold = True
    r_up.font.color.rgb = TEAL

    # Database Box
    db_box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, db_left, db_top, db_w, db_h)
    db_box.name = "Database_Grounding_Box"
    db_box.fill.solid()
    db_box.fill.fore_color.rgb = WHITE
    db_box.line.color.rgb = TEAL
    db_box.line.width = Pt(1.5)
    
    tf_db = db_box.text_frame
    tf_db.margin_left = Inches(0.10)
    tf_db.margin_right = Inches(0.10)
    tf_db.margin_top = Inches(0.06)
    tf_db.margin_bottom = Inches(0.06)
    tf_db.word_wrap = True
    
    p_db1 = tf_db.paragraphs[0]
    p_db1.alignment = PP_ALIGN.CENTER
    r_db1 = p_db1.add_run()
    r_db1.text = "🗄️  DATA GROUNDING ENGINE\n"
    r_db1.font.name = "Calibri"
    r_db1.font.size = Pt(8.5)
    r_db1.font.bold = True
    r_db1.font.color.rgb = DARK_TEAL
    
    p_db2 = tf_db.add_paragraph()
    p_db2.alignment = PP_ALIGN.CENTER
    r_db2 = p_db2.add_run()
    r_db2.text = "Vocational Data: Earnings • Placements • NSQF Pathways"
    r_db2.font.name = "Calibri"
    r_db2.font.size = Pt(9.0)
    r_db2.font.bold = True
    r_db2.font.color.rgb = NAVY

    # Context arrow from Stage 2 (Data) to Grounding Box
    flow_lbl = slide3.shapes.add_textbox(Inches(3.84), Inches(4.18), Inches(2.45), Inches(0.40))
    flow_lbl.text_frame.margin_left = 0
    flow_lbl.text_frame.margin_top = 0
    flow_lbl.text_frame.word_wrap = True
    p_fl = flow_lbl.text_frame.paragraphs[0]
    p_fl.alignment = PP_ALIGN.RIGHT
    r_fl = p_fl.add_run()
    r_fl.text = "Official Benchmarks  ➔\n(NCVET & NCS Data)"
    r_fl.font.name = "Calibri"
    r_fl.font.size = Pt(8.0)
    r_fl.font.italic = True
    r_fl.font.color.rgb = SLATE_LIGHT

    # =========================================================================
    # SECTION 2: TECHNOLOGY STACK (Compact Horizontal Strip - 30% Area)
    # Top: 4.96", Height: 1.82", Left: 0.80", Width: 11.733"
    # =========================================================================
    tech_container = slide3.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(0.80), Inches(4.96), Inches(11.733), Inches(1.82)
    )
    tech_container.name = "Technology_Stack_Container"
    tech_container.fill.solid()
    tech_container.fill.fore_color.rgb = CARD_BG
    tech_container.line.color.rgb = BORDER_LIGHT
    tech_container.line.width = Pt(1.0)

    # Section Label inside Technology Strip
    t_lbl_box = slide3.shapes.add_textbox(Inches(0.95), Inches(5.02), Inches(8.00), Inches(0.24))
    t_lbl_tf = t_lbl_box.text_frame
    t_lbl_tf.margin_left = 0
    t_lbl_tf.margin_top = 0
    p_tl = t_lbl_tf.paragraphs[0]
    r_tl = p_tl.add_run()
    r_tl.text = "TECHNOLOGY STACK & IMPLEMENTATION SCOPE"
    r_tl.font.name = "Calibri"
    r_tl.font.size = Pt(8.5)
    r_tl.font.bold = True
    r_tl.font.color.rgb = SLATE_LIGHT

    # 4 Category Columns inside Strip
    t_col_w = Inches(2.78)
    t_col_gap = Inches(0.15)
    t_base_x = Inches(0.92)
    t_col_top = Inches(5.30)
    t_col_h = Inches(1.36)

    tech_categories = [
        {
            "category": "FRONTEND",
            "tag": "[ACTIVE IN CODE]",
            "tag_color": DARK_TEAL,
            "headline": "React, TypeScript, Vite",
            "desc": "Modular component library, strict TypeScript contracts, responsive family UI & active mock services."
        },
        {
            "category": "BACKEND",
            "tag": "[PLANNED ARCHITECTURE]",
            "tag_color": SLATE_LIGHT,
            "headline": "FastAPI (Planned)",
            "desc": "Pre-architected REST API client (client.ts), typed Pydantic envelopes, family session & profile data models."
        },
        {
            "category": "AI & DATA",
            "tag": "[PROPOSED LOGIC]",
            "tag_color": TEAL,
            "headline": "Grounded AI + Vocational Data",
            "desc": "Evidence-grounded decision engine bound to official NCVET qualification packs and NCS wage benchmarks."
        },
        {
            "category": "OUTPUTS",
            "tag": "[PLANNED SYSTEM]",
            "tag_color": SLATE_LIGHT,
            "headline": "Counselling, Referrals, Analytics",
            "desc": "Family decision summaries, automated human counsellor escalation routing, and administrative district analytics."
        }
    ]

    for i, cat in enumerate(tech_categories):
        cx = t_base_x + i * (t_col_w + t_col_gap)
        cbox = slide3.shapes.add_shape(
            MSO_SHAPE.ROUNDED_RECTANGLE,
            cx, t_col_top, t_col_w, t_col_h
        )
        cbox.fill.solid()
        cbox.fill.fore_color.rgb = WHITE
        cbox.line.color.rgb = BORDER_GRAY
        cbox.line.width = Pt(0.75)
        
        tf_c = cbox.text_frame
        tf_c.margin_left = Inches(0.10)
        tf_c.margin_right = Inches(0.10)
        tf_c.margin_top = Inches(0.08)
        tf_c.margin_bottom = Inches(0.06)
        tf_c.word_wrap = True
        
        # Category + Tag
        p1 = tf_c.paragraphs[0]
        r1 = p1.add_run()
        r1.text = cat["category"] + " "
        r1.font.name = "Calibri"
        r1.font.size = Pt(8.5)
        r1.font.bold = True
        r1.font.color.rgb = NAVY
        
        r1_t = p1.add_run()
        r1_t.text = cat["tag"]
        r1_t.font.name = "Calibri"
        r1_t.font.size = Pt(7.5)
        r1_t.font.bold = True
        r1_t.font.color.rgb = cat["tag_color"]
        
        # Headline
        p2 = tf_c.add_paragraph()
        r2 = p2.add_run()
        r2.text = cat["headline"]
        r2.font.name = "Calibri"
        r2.font.size = Pt(10)
        r2.font.bold = True
        r2.font.color.rgb = DARK_TEAL if "AI" in cat["category"] else NAVY
        
        # Description
        p3 = tf_c.add_paragraph()
        r3 = p3.add_run()
        r3.text = cat["desc"]
        r3.font.name = "Calibri"
        r3.font.size = Pt(7.8)
        r3.font.color.rgb = GRAY_TEXT

    prs.save(ppt_path)
    print("Successfully built clean, balanced Slide 3 in:", ppt_path)

if __name__ == "__main__":
    apply_slide_3()
