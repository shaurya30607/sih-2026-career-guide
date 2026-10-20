"""
Structured Hyperlocal Vocational Courses Dataset
Curated records aligning with official NCVET, DGT (CTS), and MSDE qualification frameworks.
All wage benchmarks are regional demonstration indicators; no unverified placement rates are fabricated.
"""

DEMO_COURSES = [
    {
        "id": "course-electrician-cts-01",
        "title": "Electrician (Craftsmen Training Scheme)",
        "slug": "electrician-craftsmen-training-scheme",
        "provider": "Government Industrial Training Institute (ITI) Aundh, Pune",
        "stream": "manufacturing_engineering",
        "duration_months": 12,
        "training_mode": "offline",
        "certification_body": "DGT_ITI",
        "nsqf_level": 4,
        "practical_hours": 320,
        "eligibility": {
            "min_age": 14,
            "max_age": 40,
            "min_education": "10th_pass",
            "prior_experience_required": False
        },
        "description": "Foundational electrical training covering AC/DC machines, industrial wiring, transformer maintenance, earthing standards, and safety compliance under national CTS guidelines.",
        "highlights": [
            "Official DGT Craftsmen Training Scheme (CTS Code: 0231.0100)",
            "320 hours of hands-on workshop and motor control labs",
            "Direct eligibility for Maharashtra Electrical Contractor Wireman license"
        ],
        "skills_acquired": [
            "Industrial Conduit & Distribution Board Wiring",
            "Single-Phase & 3-Phase Motor Maintenance",
            "Transformer Testing & Oil Insulation Inspection",
            "Earthing & Surge Protection Installation",
            "Electrical Safety & First Aid Compliance"
        ],
        "career_progression": "Progression from Certified Wireman / Maintenance Electrician -> Electrical Supervisor -> Licensed Electrical Contractor. Credits articulate into 2nd year Polytechnic Diploma under NCrF.",
        "location": "Aundh, Pune, Maharashtra",
        "district": "Pune",
        "state": "Maharashtra",
        "fees_inr": 4500,
        "financial_aid_available": True,
        "career_outcome": {
            "role_title": "Industrial Maintenance Electrician / Licensed Wireman",
            "average_starting_salary_inr": 19000,
            "industry_demand": "very_high",
            "potential_employers": ["Tata Motors Pune", "Mahindra & Mahindra", "MSEDCL Contracting Partners", "Kirloskar Brothers"]
        },
        "rating": 4.9,
        "enrolled_count": 2840,
        "is_demo": True,
        "source_name": "Directorate General of Training (DGT) — Craftsmen Training Scheme (CTS)",
        "source_url": "https://dgt.gov.in/en/CTS",
        "verification_status": "verified_curriculum_framework",
        "last_updated": "2026-10-19",
        "missing_evidence_flags": [
            "Third-party audited institutional placement rate is not published in public DGT tables",
            "Monthly stipend governed by regional establishment apprenticeship contracts"
        ]
    },
    {
        "id": "course-solar-pv-02",
        "title": "Solar PV Installation & Maintenance Technician",
        "slug": "solar-pv-installation-technician",
        "provider": "National Skill Development Corporation (NSDC) Partner Hub, Pune",
        "stream": "renewable_energy",
        "duration_months": 6,
        "training_mode": "hybrid",
        "certification_body": "NCVET",
        "nsqf_level": 4,
        "practical_hours": 140,
        "eligibility": {
            "min_age": 18,
            "max_age": 35,
            "min_education": "10th_pass",
            "prior_experience_required": False
        },
        "description": "Comprehensive hands-on training on photovoltaic panel mounting, inverter wiring, grid connections, and safety compliance under PM Surya Ghar Muft Bijli Yojana standards.",
        "highlights": [
            "Government-recognized NCVET Level 4 certification",
            "140 hours of rooftop and ground-mount lab training",
            "Direct alignment with rooftop solar subsidy installation guidelines"
        ],
        "skills_acquired": [
            "PV Array Wiring & Testing",
            "Inverter Synchronization & DC Disconnects",
            "Rooftop Structural Anchoring & Water-Tight Sealing",
            "Earthing, Lightning Protection & Net Metering",
            "Electrical Hazard Safety & PPE Standards"
        ],
        "career_progression": "Progression from Solar Installer -> Site Supervisor -> EPC Project Lead. Credits count toward a 3-year Bachelor of Vocation (B.Voc) in Renewable Energy Systems under NEP 2020.",
        "location": "Pune Industrial Area, Maharashtra",
        "district": "Pune",
        "state": "Maharashtra",
        "fees_inr": 12000,
        "financial_aid_available": True,
        "career_outcome": {
            "role_title": "Certified Solar Technician / Site Supervisor",
            "average_starting_salary_inr": 22000,
            "industry_demand": "very_high",
            "potential_employers": ["Tata Power Solar", "Adani Solar", "Waaree Energies", "Local EPC Contractors"]
        },
        "rating": 4.8,
        "enrolled_count": 1420,
        "is_demo": True,
        "source_name": "National Council for Vocational Education and Training (NCVET)",
        "source_url": "https://ncvet.gov.in/national-skills-qualification-framework/",
        "verification_status": "verified_curriculum_framework",
        "last_updated": "2026-10-19",
        "missing_evidence_flags": [
            "Starting wages benchmarked on industry surveys; local EPC contractor rates vary",
            "Net-metering permissions require utility empanelment verification"
        ]
    },
    {
        "id": "course-ev-tech-03",
        "title": "Electric Vehicle (EV) Powertrain & Diagnostics Specialist",
        "slug": "ev-powertrain-diagnostics-specialist",
        "provider": "Automotive Skills Development Council (ASDC) Training Center",
        "stream": "automotive",
        "duration_months": 8,
        "training_mode": "offline",
        "certification_body": "Industry_Partner",
        "nsqf_level": 5,
        "practical_hours": 200,
        "eligibility": {
            "min_age": 18,
            "max_age": 30,
            "min_education": "10th_pass",
            "prior_experience_required": False
        },
        "description": "Focused training on electric 2-wheeler and 3-wheeler motor controllers, lithium-ion battery management systems (BMS), regenerative braking, and diagnostic software.",
        "highlights": [
            "Live workshop with battery pack assembly and teardown labs",
            "OEM-aligned curriculum supported by auto hub manufacturers",
            "Hands-on troubleshooting of BMS and charging stations"
        ],
        "skills_acquired": [
            "BLDC & PMSM Motor Controller Calibration",
            "Lithium-Ion Cell Health Diagnostics & Thermal Testing",
            "CAN Bus Telematics & Fault Code Reading (OBD-II)",
            "High-Voltage Safety Isolation & De-energization",
            "Regenerative Braking Troubleshooting"
        ],
        "career_progression": "Progression from EV Diagnostic Assistant -> Senior EV Service Engineer -> Workshop Manager. Direct bridge to Polytechnic Diploma in Mechatronics.",
        "location": "Waluj MIDC, Chhatrapati Sambhajinagar, Maharashtra",
        "district": "Chhatrapati Sambhajinagar",
        "state": "Maharashtra",
        "fees_inr": 24000,
        "financial_aid_available": True,
        "career_outcome": {
            "role_title": "EV Service Engineer / Battery Diagnostic Technician",
            "average_starting_salary_inr": 26000,
            "industry_demand": "very_high",
            "potential_employers": ["Bajaj Auto EV Division", "Ather Energy", "Greaves Electric Mobility", "Endurance Technologies"]
        },
        "rating": 4.7,
        "enrolled_count": 980,
        "is_demo": True,
        "source_name": "Automotive Skills Development Council (ASDC) / NCVET",
        "source_url": "https://www.msde.gov.in/",
        "verification_status": "verified_curriculum_framework",
        "last_updated": "2026-10-19",
        "missing_evidence_flags": [
            "High-voltage test bench access requires certified safety clearance",
            "Private sector starting compensation dependent on dealer technician tier"
        ]
    },
    {
        "id": "course-cnc-operator-04",
        "title": "CNC Milling & Lathe Operator Technician",
        "slug": "cnc-milling-lathe-operator-technician",
        "provider": "Directorate General of Training (DGT) / Advanced ITI Hub",
        "stream": "manufacturing_engineering",
        "duration_months": 6,
        "training_mode": "offline",
        "certification_body": "DGT_ITI",
        "nsqf_level": 4,
        "practical_hours": 240,
        "eligibility": {
            "min_age": 18,
            "max_age": 32,
            "min_education": "10th_pass",
            "prior_experience_required": False
        },
        "description": "Hands-on industrial machining curriculum on computer numerical control (CNC) mills and turning centers, precision blueprint reading, G-code editing, and quality inspection tools.",
        "highlights": [
            "240 hours of actual machine operating time on 3-axis CNC centers",
            "Precision measurement with vernier calipers, micrometers & CMM",
            "Apprenticeship placement under National Apprenticeship Promotion Scheme (NAPS)"
        ],
        "skills_acquired": [
            "G-Code & M-Code Programming Basics",
            "Tool Setting, Offset Calculation & Workpiece Clamping",
            "Engineering Drawing & GD&T Blueprint Reading",
            "Coolant Management & Machine Preventive Maintenance",
            "Quality Control Metrology & Tolerance Verification"
        ],
        "career_progression": "Progression from CNC Machine Operator -> CNC Programmer -> Shop Floor Supervisor -> Quality Lead. Credits count toward Diploma in Mechanical Engineering.",
        "location": "Waluj MIDC, Chhatrapati Sambhajinagar, Maharashtra",
        "district": "Chhatrapati Sambhajinagar",
        "state": "Maharashtra",
        "fees_inr": 11000,
        "financial_aid_available": True,
        "career_outcome": {
            "role_title": "CNC Machinist / Precision Tooling Operator",
            "average_starting_salary_inr": 21000,
            "industry_demand": "very_high",
            "potential_employers": ["Bharat Forge", "Mahindra & Mahindra Tier-1 Suppliers", "Endurance Technologies"]
        },
        "rating": 4.7,
        "enrolled_count": 1650,
        "is_demo": True,
        "source_name": "Directorate General of Training (DGT) — CTS Trade Syllabus",
        "source_url": "https://dgt.gov.in/en/CTS",
        "verification_status": "verified_curriculum_framework",
        "last_updated": "2026-10-19",
        "missing_evidence_flags": [
            "Shift allowances and production incentives excluded from base wage benchmark",
            "Placement numbers represent local industrial partner commitments"
        ]
    },
    {
        "id": "course-drone-agri-05",
        "title": "Agricultural Drone Pilot & Remote Sensing Associate",
        "slug": "agricultural-drone-pilot-remote-sensing",
        "provider": "National Skill Development Corporation (NSDC) Agri Tech Center, Nashik",
        "stream": "agriculture_allied",
        "duration_months": 4,
        "training_mode": "hybrid",
        "certification_body": "NSDC",
        "nsqf_level": 4,
        "practical_hours": 100,
        "eligibility": {
            "min_age": 18,
            "max_age": 35,
            "min_education": "10th_pass",
            "prior_experience_required": False
        },
        "description": "Specialized training covering DGCA-compliant small drone piloting, micro-spraying calibration for pesticide/fertilizer conservation, multispectral crop health survey, and flight simulator labs.",
        "highlights": [
            "Preparation for DGCA Remote Pilot Certificate (RPC)",
            "100 hours of simulator and outdoor open-field flight practice",
            "Training in Sub-Mission on Agricultural Mechanization (SMAM) subsidies"
        ],
        "skills_acquired": [
            "DGCA Air Regulations & Flight Safety Protocols",
            "Autonomous Mission Planning via Ground Control Station (GCS)",
            "Precision Liquid Spraying Calibration & Nozzle Selection",
            "NDVI Multispectral Imagery Capture & Analysis",
            "LiPo Battery Care, Emergency Failsafes & Maintenance"
        ],
        "career_progression": "Progression from Drone Pilot Assistant -> Certified Agri-Drone Operator -> Custom Hiring Center (CHC) Agri-Entrepreneur.",
        "location": "Dindori Road, Nashik, Maharashtra",
        "district": "Nashik",
        "state": "Maharashtra",
        "fees_inr": 16000,
        "financial_aid_available": True,
        "career_outcome": {
            "role_title": "Commercial Agricultural Drone Operator / Spraying Specialist",
            "average_starting_salary_inr": 25000,
            "industry_demand": "high",
            "potential_employers": ["IoTechWorld Avigation", "Farmer Producer Organizations (FPOs)", "Agri-Input Distributors"]
        },
        "rating": 4.8,
        "enrolled_count": 840,
        "is_demo": True,
        "source_name": "Ministry of Skill Development and Entrepreneurship (MSDE) & DGCA",
        "source_url": "https://www.msde.gov.in/",
        "verification_status": "verified_curriculum_framework",
        "last_updated": "2026-10-19",
        "missing_evidence_flags": [
            "DGCA official remote pilot certification fee payable to designated flight testing school",
            "Commercial revenue subject to regional seasonal crop spray cycles"
        ]
    },
    {
        "id": "course-fitter-cts-06",
        "title": "Fitter (Craftsmen Training Scheme)",
        "slug": "fitter-craftsmen-training-scheme",
        "provider": "Government Industrial Training Institute (ITI) Satpur, Nashik",
        "stream": "manufacturing_engineering",
        "duration_months": 12,
        "training_mode": "offline",
        "certification_body": "DGT_ITI",
        "nsqf_level": 4,
        "practical_hours": 300,
        "eligibility": {
            "min_age": 14,
            "max_age": 40,
            "min_education": "10th_pass",
            "prior_experience_required": False
        },
        "description": "Standard industrial fitting trade program covering bench work, precision measurement, drilling, lathe turning, pipe fitting, and pneumatic system assembly.",
        "highlights": [
            "Official DGT Craftsmen Training Scheme (CTS Code: 0232.0100)",
            "Extensive bench fitting and power saw workshops",
            "Direct apprenticeship eligibility in Nashik MIDC industrial belt"
        ],
        "skills_acquired": [
            "Precision Marking & Sawing / Filing Techniques",
            "Drilling, Reaming & Tapping Internal Threads",
            "Lathe Machine Turning & Face Grinding",
            "Mechanical Fasteners & Bearing Assembly",
            "Hydraulic & Pneumatic Circuit Diagnostics"
        ],
        "career_progression": "Progression from Maintenance Fitter -> Assembly Supervisor -> Plant Toolroom Specialist. Direct bridge to Polytechnic Mechanical Diploma.",
        "location": "Satpur MIDC, Nashik, Maharashtra",
        "district": "Nashik",
        "state": "Maharashtra",
        "fees_inr": 4200,
        "financial_aid_available": True,
        "career_outcome": {
            "role_title": "Industrial Assembly Fitter / Toolroom Specialist",
            "average_starting_salary_inr": 18500,
            "industry_demand": "very_high",
            "potential_employers": ["Bosch India Nashik", "Mahindra & Mahindra Nashik", "Siemens Energy", "VIP Industries"]
        },
        "rating": 4.8,
        "enrolled_count": 3100,
        "is_demo": True,
        "source_name": "Directorate General of Training (DGT) / Bharat Skills",
        "source_url": "https://bharatskills.gov.in/",
        "verification_status": "verified_curriculum_framework",
        "last_updated": "2026-10-19",
        "missing_evidence_flags": [
            "Tuition fee heavily subsidized by Maharashtra DVET; exam fee collected per semester",
            "Apprenticeship retention depends on candidate workshop performance evaluation"
        ]
    },
    {
        "id": "course-general-duty-assistant-07",
        "title": "General Duty Assistant & Patient Care Technician",
        "slug": "general-duty-assistant-healthcare",
        "provider": "Healthcare Sector Skill Council (HSSC) Academy, Nagpur",
        "stream": "healthcare",
        "duration_months": 6,
        "training_mode": "hybrid",
        "certification_body": "NSDC",
        "nsqf_level": 4,
        "practical_hours": 180,
        "eligibility": {
            "min_age": 18,
            "max_age": 35,
            "min_education": "10th_pass",
            "prior_experience_required": False
        },
        "description": "Prepares candidates to provide basic healthcare and daily patient assistance under the supervision of registered nurses and doctors in hospitals and eldercare facilities.",
        "highlights": [
            "3-month classroom learning + 3-month clinical hospital internship",
            "Basic life support (BLS) and infection control training",
            "Assistance for government and private hospital empanelment"
        ],
        "skills_acquired": [
            "Vital Signs Monitoring (BP, Pulse, SPO2, Glucose)",
            "Hospital Hygiene & Sterilization Protocols",
            "Emergency First Aid & Patient Mobility Support",
            "Medical Record Documentation & Patient Communication",
            "Bedside Care & Post-Operative Comfort"
        ],
        "career_progression": "Progression from Patient Care Assistant -> Senior Ward Technician -> Nursing Assistant. Recognized prerequisite for General Nursing and Midwifery (GNM) bridge programs.",
        "location": "Ramdaspeth, Nagpur, Maharashtra",
        "district": "Nagpur",
        "state": "Maharashtra",
        "fees_inr": 10000,
        "financial_aid_available": True,
        "career_outcome": {
            "role_title": "General Duty Assistant / Hospital Care Associate",
            "average_starting_salary_inr": 18000,
            "industry_demand": "high",
            "potential_employers": ["AIIMS Nagpur Empaneled Vendors", "Care Hospitals Nagpur", "Alexis Multispeciality", "Regional Civil Hospital"]
        },
        "rating": 4.6,
        "enrolled_count": 2150,
        "is_demo": True,
        "source_name": "Healthcare Sector Skill Council (HSSC) / NCVET",
        "source_url": "https://ncvet.gov.in/national-skills-qualification-framework/",
        "verification_status": "verified_curriculum_framework",
        "last_updated": "2026-10-19",
        "missing_evidence_flags": [
            "Hospital internship hours are mandatory to qualify for final NCVET competency assessment",
            "Shift allowances vary based on inpatient unit assignments"
        ]
    },
    {
        "id": "course-fullstack-web-08",
        "title": "Junior Web & Frontend Application Developer",
        "slug": "junior-web-frontend-developer",
        "provider": "National Skill Training Institute (NSTI), Mumbai Suburban",
        "stream": "it_tech",
        "duration_months": 6,
        "training_mode": "online",
        "certification_body": "NCVET",
        "nsqf_level": 5,
        "practical_hours": 160,
        "eligibility": {
            "min_age": 17,
            "max_age": 28,
            "min_education": "12th_pass",
            "prior_experience_required": False
        },
        "description": "Project-based foundational track covering HTML5, modern CSS, JavaScript, React basics, and responsive UI design tailored for junior software technician roles.",
        "highlights": [
            "Portfolio-first approach with 4 deployable projects",
            "Mentorship sessions with active tech industry professionals",
            "Placement support for IT/ITeS and SME digital agencies"
        ],
        "skills_acquired": [
            "Semantic HTML5 & Accessible CSS Layouts",
            "JavaScript ES6+ Fundamentals & DOM Manipulation",
            "Component Architecture in React & TypeScript",
            "Git Version Control & GitHub Team Workflows",
            "REST API Integration & JSON Data Handling"
        ],
        "career_progression": "Progression from Junior Frontend Trainee -> Frontend Web Developer -> UI Engineer. Credit transfer eligible for BCA or B.Voc in Software Development.",
        "location": "Sion, Mumbai Suburban, Maharashtra",
        "district": "Mumbai Suburban",
        "state": "Maharashtra",
        "fees_inr": 15000,
        "financial_aid_available": True,
        "career_outcome": {
            "role_title": "Junior Frontend Developer / Web Operations Associate",
            "average_starting_salary_inr": 28000,
            "industry_demand": "high",
            "potential_employers": ["Regional Digital Agencies", "TCS iON Partners", "Fintech Startups", "E-commerce Enablers"]
        },
        "rating": 4.9,
        "enrolled_count": 3200,
        "is_demo": True,
        "source_name": "DGT / National Skill Training Institute (NSTI)",
        "source_url": "https://bharatskills.gov.in/",
        "verification_status": "verified_curriculum_framework",
        "last_updated": "2026-10-19",
        "missing_evidence_flags": [
            "Hardware requirements (PC / Laptop and stable internet) are candidate responsibility",
            "Remote contract compensation fluctuates according to individual client deliverables"
        ]
    }
]
