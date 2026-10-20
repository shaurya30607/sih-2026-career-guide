import os
import subprocess
from PIL import Image

assets_dir = "SIH 2.0/assets"
os.makedirs(assets_dir, exist_ok=True)

# 1. Family Convergence SVG
# Two silhouettes (Student + Parent) with arrows converging into a verified agreement star/checkmark
svg_family = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <!-- Student figure (left, blue) -->
  <circle cx="28" cy="36" r="12" fill="#0D9488"/>
  <path d="M12 78 C12 58 44 58 44 78 Z" fill="#0D9488"/>
  <text x="28" y="94" font-family="Calibri, sans-serif" font-size="11" font-weight="bold" fill="#0F766E" text-anchor="middle">Student</text>
  
  <!-- Parent figure (right, navy) -->
  <circle cx="92" cy="34" r="14" fill="#0B132B"/>
  <path d="M74 78 C74 54 110 54 110 78 Z" fill="#0B132B"/>
  <text x="92" y="94" font-family="Calibri, sans-serif" font-size="11" font-weight="bold" fill="#0B132B" text-anchor="middle">Parent</text>
  
  <!-- Left arrow to center -->
  <path d="M42 50 L56 50" stroke="#0D9488" stroke-width="3" stroke-linecap="round" marker-end="url(#arrow)"/>
  <polygon points="56,46 62,50 56,54" fill="#0D9488"/>

  <!-- Right arrow to center -->
  <path d="M78 50 L64 50" stroke="#0B132B" stroke-width="3" stroke-linecap="round"/>
  <polygon points="64,46 58,50 64,54" fill="#0B132B"/>
  
  <!-- Center Consensus Hub -->
  <circle cx="60" cy="50" r="10" fill="#2DD4BF"/>
  <path d="M56 50 L59 53 L65 47" stroke="#0B132B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>'''

# 2. India Map Outline with Location Pin SVG
# Stylized recognizable geometric contour of India with vibrant pin
svg_india = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <!-- India outline path -->
  <path d="M 58 14 
           L 66 22 L 64 30 L 76 34 L 84 32 L 88 38 L 84 44 L 96 46 L 102 52 L 96 58 L 88 56 L 82 62 L 76 60 L 72 66 L 70 78 L 64 96 L 60 106 L 56 96 L 50 82 L 46 72 L 36 68 L 28 62 L 24 50 L 32 46 L 38 48 L 44 42 L 50 42 L 54 32 L 52 24 Z" 
        fill="#F0FDFA" stroke="#0D9488" stroke-width="2.5" stroke-linejoin="round"/>
  
  <!-- Location Pin in central region -->
  <circle cx="58" cy="54" r="14" fill="#0D9488" opacity="0.2"/>
  <path d="M 58 40 C 52 40 48 44 48 50 C 48 58 58 68 58 68 C 58 68 68 58 68 50 C 68 44 64 40 58 40 Z" fill="#0B132B"/>
  <circle cx="58" cy="49" r="4.5" fill="#2DD4BF"/>
</svg>'''

# 3. Trade-off Balance Scale SVG
svg_tradeoff = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <!-- Base & Pole -->
  <line x1="28" y1="104" x2="92" y2="104" stroke="#0B132B" stroke-width="5" stroke-linecap="round"/>
  <line x1="60" y1="32" x2="60" y2="104" stroke="#0B132B" stroke-width="4.5" stroke-linecap="round"/>
  <circle cx="60" cy="32" r="5" fill="#0D9488"/>

  <!-- Tilting Lever Beam -->
  <line x1="22" y1="42" x2="98" y2="34" stroke="#0D9488" stroke-width="4" stroke-linecap="round"/>

  <!-- Left Pan (Costs/Time) -->
  <line x1="24" y1="42" x2="16" y2="64" stroke="#64748B" stroke-width="2"/>
  <line x1="24" y1="42" x2="32" y2="64" stroke="#64748B" stroke-width="2"/>
  <path d="M 12 64 Q 24 74 36 64 Z" fill="#E2E8F0" stroke="#0B132B" stroke-width="2"/>
  <rect x="20" y="55" width="8" height="9" fill="#F59E0B" rx="1.5"/>

  <!-- Right Pan (ROI/Wages Higher) -->
  <line x1="96" y1="34" x2="88" y2="56" stroke="#64748B" stroke-width="2"/>
  <line x1="96" y1="34" x2="104" y2="56" stroke="#64748B" stroke-width="2"/>
  <path d="M 84 56 Q 96 66 108 56 Z" fill="#CCFBF1" stroke="#0D9488" stroke-width="2"/>
  <circle cx="96" cy="50" r="5" fill="#0D9488"/>
  <text x="96" y="53" font-family="Calibri" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">₹</text>
</svg>'''

# 4. Regional Heatmap / Analytics Grid SVG
svg_heatmap = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <!-- Heatmap Matrix Grid -->
  <!-- Row 1 -->
  <rect x="20" y="20" width="22" height="22" rx="4" fill="#0D9488"/>
  <rect x="48" y="20" width="22" height="22" rx="4" fill="#2DD4BF"/>
  <rect x="76" y="20" width="22" height="22" rx="4" fill="#99F6E4"/>
  
  <!-- Row 2 -->
  <rect x="20" y="48" width="22" height="22" rx="4" fill="#F43F5E"/>
  <rect x="48" y="48" width="22" height="22" rx="4" fill="#FB7185"/>
  <rect x="76" y="48" width="22" height="22" rx="4" fill="#0D9488"/>
  
  <!-- Row 3 -->
  <rect x="20" y="76" width="22" height="22" rx="4" fill="#0B132B"/>
  <rect x="48" y="76" width="22" height="22" rx="4" fill="#FDA4AF"/>
  <rect x="76" y="76" width="22" height="22" rx="4" fill="#2DD4BF"/>

  <!-- Analytic Trendline Overlay -->
  <path d="M 22 84 Q 50 30 96 30" stroke="#0B132B" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <circle cx="96" cy="30" r="5" fill="#0B132B"/>
</svg>'''

# 5. Slide 3: AI Neural Network / Brain SVG
svg_brain = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <circle cx="60" cy="60" r="46" fill="#F0FDFA" stroke="#0D9488" stroke-width="2"/>
  <!-- Neural Nodes -->
  <circle cx="60" cy="32" r="7" fill="#0D9488"/>
  <circle cx="36" cy="50" r="7" fill="#0B132B"/>
  <circle cx="84" cy="50" r="7" fill="#0B132B"/>
  <circle cx="44" cy="80" r="7" fill="#0D9488"/>
  <circle cx="76" cy="80" r="7" fill="#0D9488"/>
  <circle cx="60" cy="60" r="9" fill="#2DD4BF"/>
  <!-- Synaptic Connectors -->
  <line x1="60" y1="32" x2="36" y2="50" stroke="#0D9488" stroke-width="2"/>
  <line x1="60" y1="32" x2="84" y2="50" stroke="#0D9488" stroke-width="2"/>
  <line x1="36" y1="50" x2="60" y2="60" stroke="#0B132B" stroke-width="2"/>
  <line x1="84" y1="50" x2="60" y2="60" stroke="#0B132B" stroke-width="2"/>
  <line x1="60" y1="60" x2="44" y2="80" stroke="#0D9488" stroke-width="2"/>
  <line x1="60" y1="60" x2="76" y2="80" stroke="#0D9488" stroke-width="2"/>
  <line x1="44" y1="80" x2="76" y2="80" stroke="#64748B" stroke-width="2" stroke-dasharray="3,3"/>
</svg>'''

# 6. Slide 3: Database Grounding Cylinder SVG
svg_db = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <!-- Top disk -->
  <ellipse cx="60" cy="30" rx="36" ry="14" fill="#2DD4BF" stroke="#0D9488" stroke-width="2.5"/>
  <!-- Middle disk -->
  <path d="M 24 30 L 24 55 A 36 14 0 0 0 96 55 L 96 30 Z" fill="#F0FDFA" stroke="#0D9488" stroke-width="2.5"/>
  <!-- Bottom disk -->
  <path d="M 24 55 L 24 80 A 36 14 0 0 0 96 80 L 96 55 Z" fill="#CCFBF1" stroke="#0D9488" stroke-width="2.5"/>
  <!-- Base disk -->
  <path d="M 24 80 L 24 95 A 36 14 0 0 0 96 95 L 96 80 Z" fill="#0D9488" stroke="#0B132B" stroke-width="2.5"/>
</svg>'''

# 7. Slide 3: Dashboard Analytics SVG
svg_analytics = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <rect x="16" y="20" width="88" height="80" rx="10" fill="#F8FAFC" stroke="#0B132B" stroke-width="2.5"/>
  <!-- Bars -->
  <rect x="28" y="60" width="12" height="30" rx="3" fill="#64748B"/>
  <rect x="46" y="44" width="12" height="46" rx="3" fill="#0D9488"/>
  <rect x="64" y="32" width="12" height="58" rx="3" fill="#2DD4BF"/>
  <rect x="82" y="52" width="12" height="38" rx="3" fill="#0B132B"/>
  <!-- Line connecting tops -->
  <polyline points="34,58 52,42 70,30 88,50" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" fill="none"/>
</svg>'''

icons = {
    "family_convergence": svg_family,
    "india_map": svg_india,
    "tradeoff_scale": svg_tradeoff,
    "resistance_heatmap": svg_heatmap,
    "ai_brain": svg_brain,
    "database": svg_db,
    "analytics": svg_analytics
}

for name, svg_text in icons.items():
    svg_path = f"{assets_dir}/{name}.svg"
    with open(svg_path, "w") as f:
        f.write(svg_text)
    subprocess.run(["qlmanage", "-t", "-s", "512", "-o", assets_dir, svg_path], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"Generated and rendered {name}.svg.png")

print("All custom vector SVGs and PNGs created successfully!")
