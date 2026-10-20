import os
import subprocess
from PIL import Image

assets_dir = "SIH 2.0/assets"
os.makedirs(assets_dir, exist_ok=True)

# 1. Phase 1: Code / Frontend Foundation Icon
svg_p1 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect x="15" y="20" width="70" height="48" rx="6" fill="#F0FDFA" stroke="#0D9488" stroke-width="3"/>
  <line x1="15" y1="56" x2="85" y2="56" stroke="#2DD4BF" stroke-width="2"/>
  <!-- Code brackets -->
  <polyline points="38,34 30,40 38,46" stroke="#0B132B" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <polyline points="52,34 60,40 52,46" stroke="#0B132B" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <line x1="48" y1="32" x2="42" y2="48" stroke="#0D9488" stroke-width="2" stroke-linecap="round"/>
  <!-- Laptop base -->
  <path d="M 8 72 L 92 72 L 86 68 L 14 68 Z" fill="#0B132B"/>
  <!-- Active check badge -->
  <circle cx="76" cy="24" r="8" fill="#10B981"/>
  <polyline points="73,24 75,26 79,22" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>'''

# 2. Phase 2: AI Intelligence / Brain Services Icon
svg_p2 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="38" fill="#F0FDFA" stroke="#0284C7" stroke-width="3"/>
  <!-- Brain / Neural Nodes -->
  <circle cx="50" cy="28" r="6" fill="#0284C7"/>
  <circle cx="32" cy="45" r="6" fill="#0B132B"/>
  <circle cx="68" cy="45" r="6" fill="#0B132B"/>
  <circle cx="38" cy="66" r="6" fill="#0D9488"/>
  <circle cx="62" cy="66" r="6" fill="#0D9488"/>
  <circle cx="50" cy="50" r="8" fill="#2DD4BF"/>
  <!-- Connecting Synapses -->
  <line x1="50" y1="28" x2="32" y2="45" stroke="#64748B" stroke-width="2"/>
  <line x1="50" y1="28" x2="68" y2="45" stroke="#64748B" stroke-width="2"/>
  <line x1="32" y1="45" x2="50" y2="50" stroke="#0284C7" stroke-width="2"/>
  <line x1="68" y1="45" x2="50" y2="50" stroke="#0284C7" stroke-width="2"/>
  <line x1="50" y1="50" x2="38" y2="66" stroke="#0D9488" stroke-width="2"/>
  <line x1="50" y1="50" x2="62" y2="66" stroke="#0D9488" stroke-width="2"/>
</svg>'''

# 3. Phase 3: Deployment & Rollout Icon
svg_p3 = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <!-- Rocket / Rollout -->
  <path d="M 50 15 C 38 30 36 50 36 68 L 50 62 L 64 68 C 64 50 62 30 50 15 Z" fill="#0B132B"/>
  <circle cx="50" cy="38" r="6" fill="#2DD4BF"/>
  <!-- Fins -->
  <path d="M 36 52 L 22 66 L 36 64 Z" fill="#0D9488"/>
  <path d="M 64 52 L 78 66 L 64 64 Z" fill="#0D9488"/>
  <!-- Flame / Exhaust -->
  <polygon points="44,66 50,85 56,66 50,72" fill="#F59E0B"/>
</svg>'''

# 4. Risk 1: Verified Data Icon (Database with search filter)
svg_risk_data = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <ellipse cx="40" cy="22" rx="24" ry="9" fill="#CCFBF1" stroke="#0D9488" stroke-width="2.5"/>
  <path d="M 16 22 L 16 38 A 24 9 0 0 0 64 38 L 64 22 Z" fill="#F0FDFA" stroke="#0D9488" stroke-width="2.5"/>
  <path d="M 16 38 L 16 54 A 24 9 0 0 0 64 54 L 64 38 Z" fill="#E0F2FE" stroke="#0B132B" stroke-width="2.5"/>
  <!-- Magnifying check glass -->
  <circle cx="52" cy="52" r="10" fill="#FFFFFF" stroke="#0B132B" stroke-width="2"/>
  <line x1="59" y1="59" x2="68" y2="68" stroke="#0B132B" stroke-width="3" stroke-linecap="round"/>
</svg>'''

# 5. Risk 2: Anti-Hallucination Shield Icon
svg_risk_shield = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <path d="M 40 14 Q 58 18 64 26 Q 64 52 40 68 Q 16 52 16 26 Q 22 18 40 14 Z" fill="#F0FDFA" stroke="#0D9488" stroke-width="2.5"/>
  <!-- Verification Checkmark -->
  <polyline points="28,40 36,48 52,32" stroke="#0B132B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>'''

# 6. Risk 3: Language Barrier / Translation Icon
svg_risk_lang = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <circle cx="40" cy="40" r="26" fill="#F8FAFC" stroke="#0B132B" stroke-width="2.5"/>
  <!-- Globe Meridians -->
  <ellipse cx="40" cy="40" rx="12" ry="26" fill="none" stroke="#0D9488" stroke-width="2"/>
  <line x1="14" y1="40" x2="66" y2="40" stroke="#0D9488" stroke-width="2"/>
  <line x1="20" y1="26" x2="60" y2="26" stroke="#64748B" stroke-width="1.5"/>
  <line x1="20" y1="54" x2="60" y2="54" stroke="#64748B" stroke-width="1.5"/>
  <!-- Small 'A/अ' badge -->
  <rect x="42" y="44" width="22" height="18" rx="4" fill="#0B132B"/>
  <text x="53" y="57" font-family="Calibri" font-size="11" font-weight="bold" fill="#2DD4BF" text-anchor="middle">अ</text>
</svg>'''

# 7. Risk 4: Privacy & Consent Lock Icon
svg_risk_privacy = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <!-- Shackle -->
  <path d="M 28 36 L 28 26 C 28 17 52 17 52 26 L 52 36" stroke="#0B132B" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Lock Body -->
  <rect x="22" y="36" width="36" height="30" rx="6" fill="#F0FDFA" stroke="#0D9488" stroke-width="2.5"/>
  <!-- Keyhole -->
  <circle cx="40" cy="48" r="4" fill="#0B132B"/>
  <line x1="40" y1="52" x2="40" y2="58" stroke="#0B132B" stroke-width="2.5" stroke-linecap="round"/>
</svg>'''

# 8. Risk 5: Scalability / Modular Cloud Icon
svg_risk_scale = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <!-- Stacked Server Blades -->
  <rect x="18" y="18" width="44" height="14" rx="3" fill="#F8FAFC" stroke="#0B132B" stroke-width="2"/>
  <circle cx="26" cy="25" r="2.5" fill="#10B981"/>
  <line x1="36" y1="25" x2="52" y2="25" stroke="#64748B" stroke-width="2"/>

  <rect x="18" y="36" width="44" height="14" rx="3" fill="#F8FAFC" stroke="#0B132B" stroke-width="2"/>
  <circle cx="26" cy="43" r="2.5" fill="#10B981"/>
  <line x1="36" y1="43" x2="52" y2="43" stroke="#64748B" stroke-width="2"/>

  <rect x="18" y="54" width="44" height="14" rx="3" fill="#F0FDFA" stroke="#0D9488" stroke-width="2.5"/>
  <circle cx="26" cy="61" r="2.5" fill="#2DD4BF"/>
  <line x1="36" y1="61" x2="52" y2="61" stroke="#0D9488" stroke-width="2"/>
</svg>'''

icons = {
    "phase1_code": svg_p1,
    "phase2_ai": svg_p2,
    "phase3_deploy": svg_p3,
    "risk_data": svg_risk_data,
    "risk_shield": svg_risk_shield,
    "risk_lang": svg_risk_lang,
    "risk_privacy": svg_risk_privacy,
    "risk_scale": svg_risk_scale,
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

print("All Slide 4 icons created successfully!")
