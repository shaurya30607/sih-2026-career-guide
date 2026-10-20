import os
import subprocess
from PIL import Image

assets_dir = "SIH 2.0/assets"
os.makedirs(assets_dir, exist_ok=True)

# 1. Before: Dilemma / Diverging thoughts (Student + Parent with hesitation)
svg_before = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <!-- Student (left, confused) -->
  <circle cx="34" cy="42" r="13" fill="#E11D48"/>
  <path d="M16 88 C16 66 52 66 52 88 Z" fill="#E11D48"/>
  <text x="34" y="24" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#E11D48" text-anchor="middle">?</text>
  
  <!-- Parent (right, anxious) -->
  <circle cx="86" cy="38" r="15" fill="#475569"/>
  <path d="M66 88 C66 62 106 62 106 88 Z" fill="#475569"/>
  <text x="86" y="18" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#475569" text-anchor="middle">?</text>
  
  <!-- Disconnected / Broken vector between them -->
  <line x1="48" y1="58" x2="60" y2="52" stroke="#E11D48" stroke-width="2.5" stroke-dasharray="3,3"/>
  <line x1="60" y1="52" x2="72" y2="62" stroke="#475569" stroke-width="2.5" stroke-dasharray="3,3"/>
  <circle cx="60" cy="52" r="4" fill="#9F1239"/>
</svg>'''

# 2. After: Family Consensus (Student + Parent aligned with shared star)
svg_after = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <!-- Student (left, confident teal) -->
  <circle cx="36" cy="44" r="13" fill="#0D9488"/>
  <path d="M18 88 C18 66 54 66 54 88 Z" fill="#0D9488"/>
  
  <!-- Parent (right, supportive navy) -->
  <circle cx="84" cy="40" r="15" fill="#0B132B"/>
  <path d="M64 88 C64 62 104 62 104 88 Z" fill="#0B132B"/>

  <!-- Shared Consensus Star / Shield in center -->
  <circle cx="60" cy="54" r="12" fill="#2DD4BF"/>
  <polyline points="54,54 58,58 66,50" stroke="#0B132B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  
  <!-- Radiating confirmation rays -->
  <line x1="60" y1="36" x2="60" y2="30" stroke="#0D9488" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="45" y1="41" x2="41" y2="37" stroke="#0D9488" stroke-width="2" stroke-linecap="round"/>
  <line x1="75" y1="41" x2="79" y2="37" stroke="#0D9488" stroke-width="2" stroke-linecap="round"/>
</svg>'''

# 3. Stakeholder 1: Student
svg_student = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="42" fill="#F0FDFA" stroke="#0D9488" stroke-width="2.5"/>
  <!-- Graduation / Learner cap -->
  <polygon points="50,24 74,34 50,44 26,34" fill="#0B132B"/>
  <path d="M35 40 L35 52 C35 58 65 58 65 52 L65 40" fill="#0D9488"/>
  <line x1="70" y1="36" x2="70" y2="50" stroke="#F59E0B" stroke-width="2.5"/>
  <circle cx="70" cy="52" r="3" fill="#F59E0B"/>
  <!-- Smile / Confidence -->
  <circle cx="50" cy="68" r="12" fill="#0B132B"/>
  <path d="M30 92 C30 78 70 78 70 92 Z" fill="#0D9488"/>
</svg>'''

# 4. Stakeholder 2: Parents & Family
svg_parents = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="42" fill="#F0FDFA" stroke="#0B132B" stroke-width="2.5"/>
  <!-- Adult + Child protective silhouette -->
  <circle cx="42" cy="36" r="10" fill="#0B132B"/>
  <circle cx="64" cy="42" r="8" fill="#0D9488"/>
  <path d="M24 78 C24 58 56 58 56 78 Z" fill="#0B132B"/>
  <path d="M52 78 C52 64 78 64 78 78 Z" fill="#0D9488"/>
  <!-- Heart / Trust token -->
  <circle cx="50" cy="74" r="8" fill="#2DD4BF"/>
  <polyline points="46,74 49,77 54,71" stroke="#0B132B" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>'''

# 5. Stakeholder 3: Training Institutions
svg_institutes = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="42" fill="#F0FDFA" stroke="#0284C7" stroke-width="2.5"/>
  <!-- Institution building -->
  <polygon points="50,22 80,38 20,38" fill="#0B132B"/>
  <!-- Columns -->
  <rect x="26" y="42" width="8" height="28" rx="1.5" fill="#0284C7"/>
  <rect x="40" y="42" width="8" height="28" rx="1.5" fill="#0284C7"/>
  <rect x="54" y="42" width="8" height="28" rx="1.5" fill="#0284C7"/>
  <rect x="68" y="42" width="8" height="28" rx="1.5" fill="#0284C7"/>
  <!-- Base steps -->
  <rect x="18" y="72" width="64" height="6" rx="2" fill="#0B132B"/>
  <!-- Certification badge -->
  <circle cx="50" cy="33" r="4" fill="#2DD4BF"/>
</svg>'''

# 6. Stakeholder 4: Government / MSDE
svg_gov = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="42" fill="#F0FDFA" stroke="#0F766E" stroke-width="2.5"/>
  <!-- Ashoka / Governance Pillar structure & Analytics chart -->
  <path d="M30 76 L70 76" stroke="#0B132B" stroke-width="4" stroke-linecap="round"/>
  <!-- Bar chart nodes -->
  <rect x="32" y="52" width="8" height="20" rx="2" fill="#64748B"/>
  <rect x="46" y="40" width="8" height="32" rx="2" fill="#0D9488"/>
  <rect x="60" y="30" width="8" height="42" rx="2" fill="#0B132B"/>
  <!-- Trendline with arrow -->
  <polyline points="34,48 48,36 64,24" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <polygon points="68,22 62,22 65,28" fill="#F59E0B"/>
</svg>'''

icons = {
    "before_dilemma": svg_before,
    "after_consensus": svg_after,
    "stakeholder_student": svg_student,
    "stakeholder_parents": svg_parents,
    "stakeholder_institutes": svg_institutes,
    "stakeholder_gov": svg_gov
}

for name, svg_text in icons.items():
    svg_path = f"{assets_dir}/{name}.svg"
    with open(svg_path, "w") as f:
        f.write(svg_text)
    subprocess.run(["qlmanage", "-t", "-s", "512", "-o", assets_dir, svg_path], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Process transparency
    png_path = f"{assets_dir}/{name}.svg.png"
    if os.path.exists(png_path):
        im = Image.open(png_path).convert("RGBA")
        data = im.getdata()
        new_data = []
        for item in data:
            if item[0] > 245 and item[1] > 245 and item[2] > 245:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        im.putdata(new_data)
        bbox = im.getbbox()
        if bbox:
            im = im.crop(bbox)
        im.save(png_path)
        print(f"Rendered & made transparent: {png_path} ({im.size})")

print("All Slide 5 custom vector illustrations created successfully!")
