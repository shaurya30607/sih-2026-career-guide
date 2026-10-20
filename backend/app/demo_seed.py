"""
Repeatable Synthetic Demonstration Data Seeder for SkillSaathi
Creates realistic demonstration student-parent family sessions and counsellor escalations.
Safe and non-destructive: updates or seeds synthetic demo records without affecting user data.
"""

import sys
import os
from datetime import datetime, timezone

# Ensure project root is in sys.path when run directly
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, "..", ".."))
if project_root not in sys.path:
    sys.path.insert(0, project_root)
backend_dir = os.path.abspath(os.path.join(current_dir, ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

try:
    from app.database import SessionLocal, engine, Base
    from app.models import FamilySessionModel, CourseModel, CounsellorEscalationModel
    from app.consensus_engine import FamilyConsensusEngine
    from app.demo_courses_data import DEMO_COURSES
except ImportError:
    from backend.app.database import SessionLocal, engine, Base
    from backend.app.models import FamilySessionModel, CourseModel, CounsellorEscalationModel
    from backend.app.consensus_engine import FamilyConsensusEngine
    from backend.app.demo_courses_data import DEMO_COURSES

DEMO_FAMILIES = [
    {
        "id": "demo-family-pune-ev-solar",
        "language": "en",
        "district": "Pune",
        "state": "Maharashtra",
        "status": "analyzed",
        "student": {
            "student_name": "Aarav Deshmukh",
            "age": 17,
            "education_level": "10th_pass",
            "career_interests": ["renewable_energy", "automotive"],
            "hands_on_activities": ["circuit_assembly", "solar_cell_soldering", "bike_maintenance"],
            "preferred_duration_months": 6,
            "preferred_location": "Pune",
            "pre_confidence_score": 5.0,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "parent": {
            "parent_name": "Suresh Deshmukh",
            "primary_concerns": ["fees_cost", "job_security"],
            "max_monthly_budget_inr": 3000,
            "max_total_fees_inr": 15000,
            "preferred_streams": ["renewable_energy"],
            "location_preference": "Pune",
            "degree_continuation_important": True,
            "pre_confidence_score": 4.0,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "post_confidence_student": 8.5,
        "post_confidence_parent": 7.5,
        "confidence_feedback": "Comparison showed clear NCVET certification and apprenticeship stipend details that resolved fee worries."
    },
    {
        "id": "demo-family-pune-electrician",
        "language": "mr",
        "district": "Pune",
        "state": "Maharashtra",
        "status": "analyzed",
        "student": {
            "student_name": "Pranav Patil",
            "age": 16,
            "education_level": "10th_pass",
            "career_interests": ["manufacturing_engineering"],
            "hands_on_activities": ["wiring", "switchboard_repair"],
            "preferred_duration_months": 12,
            "preferred_location": "Pune",
            "pre_confidence_score": 6.0,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "parent": {
            "parent_name": "Santosh Patil",
            "primary_concerns": ["job_security"],
            "max_total_fees_inr": 10000,
            "preferred_streams": ["manufacturing_engineering"],
            "location_preference": "Pune",
            "degree_continuation_important": False,
            "pre_confidence_score": 5.0,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "post_confidence_student": 9.0,
        "post_confidence_parent": 8.0,
        "confidence_feedback": "Government ITI Craftsmen Training Scheme course fee is well under budget."
    },
    {
        "id": "demo-family-pune-web",
        "language": "en",
        "district": "Pune",
        "state": "Maharashtra",
        "status": "analyzed",
        "student": {
            "student_name": "Neha Kulkarni",
            "age": 18,
            "education_level": "12th_pass",
            "career_interests": ["it_tech"],
            "hands_on_activities": ["coding", "web_design"],
            "preferred_duration_months": 6,
            "preferred_location": "Pune",
            "pre_confidence_score": 6.5,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "parent": {
            "parent_name": "Meena Kulkarni",
            "primary_concerns": ["degree_progression", "social_respect"],
            "max_total_fees_inr": 25000,
            "preferred_streams": ["it_tech"],
            "location_preference": "Pune",
            "degree_continuation_important": True,
            "pre_confidence_score": 5.0,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "post_confidence_student": 8.5,
        "post_confidence_parent": 7.5,
        "confidence_feedback": "Learned about NCrF credit transfer to BCA and B.Voc programs."
    },
    {
        "id": "demo-family-pune-solar2",
        "language": "hi",
        "district": "Pune",
        "state": "Maharashtra",
        "status": "analyzed",
        "student": {
            "student_name": "Rohan Shinde",
            "age": 17,
            "education_level": "10th_pass",
            "career_interests": ["renewable_energy"],
            "hands_on_activities": ["solar_lanterns"],
            "preferred_duration_months": 6,
            "preferred_location": "Pune",
            "pre_confidence_score": 5.5,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "parent": {
            "parent_name": "Anil Shinde",
            "primary_concerns": ["fees_cost"],
            "max_total_fees_inr": 15000,
            "preferred_streams": ["renewable_energy"],
            "location_preference": "Pune",
            "degree_continuation_important": True,
            "pre_confidence_score": 5.0,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "post_confidence_student": 8.0,
        "post_confidence_parent": 8.0,
        "confidence_feedback": "PM Surya Ghar subsidy demand makes solar technician jobs very viable."
    },
    {
        "id": "demo-family-pune-auto",
        "language": "mr",
        "district": "Pune",
        "state": "Maharashtra",
        "status": "analyzed",
        "student": {
            "student_name": "Tanmay Jadhav",
            "age": 17,
            "education_level": "10th_pass",
            "career_interests": ["automotive"],
            "hands_on_activities": ["scooter_servicing"],
            "preferred_duration_months": 8,
            "preferred_location": "Pune",
            "pre_confidence_score": 6.0,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "parent": {
            "parent_name": "Rajendra Jadhav",
            "primary_concerns": ["job_security", "social_respect"],
            "max_total_fees_inr": 20000,
            "preferred_streams": ["automotive"],
            "location_preference": "Pune",
            "degree_continuation_important": True,
            "pre_confidence_score": 4.5,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "post_confidence_student": 8.5,
        "post_confidence_parent": 8.0,
        "confidence_feedback": "EV diagnostics offers much higher starting wage than traditional garage work."
    },
    # Small-cell district demo records (< 5 sessions to demonstrate privacy protection)
    {
        "id": "demo-family-nashik-agri",
        "language": "mr",
        "district": "Nashik",
        "state": "Maharashtra",
        "status": "analyzed",
        "student": {
            "student_name": "Kavita Gaikwad",
            "age": 18,
            "education_level": "10th_pass",
            "career_interests": ["agriculture_allied"],
            "hands_on_activities": ["drone_simulator", "vineyard_spraying"],
            "preferred_duration_months": 4,
            "preferred_location": "Nashik",
            "pre_confidence_score": 5.0,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "parent": {
            "parent_name": "Balasaheb Gaikwad",
            "primary_concerns": ["fees_cost", "relocation"],
            "max_total_fees_inr": 18000,
            "preferred_streams": ["agriculture_allied"],
            "location_preference": "Nashik",
            "degree_continuation_important": False,
            "pre_confidence_score": 4.0,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "post_confidence_student": 8.0,
        "post_confidence_parent": 7.0,
        "confidence_feedback": "Agri-drone training center is locally in Nashik, no relocation needed."
    },
    {
        "id": "demo-family-nagpur-health",
        "language": "hi",
        "district": "Nagpur",
        "state": "Maharashtra",
        "status": "analyzed",
        "student": {
            "student_name": "Sneha Meshram",
            "age": 19,
            "education_level": "10th_pass",
            "career_interests": ["healthcare"],
            "hands_on_activities": ["first_aid", "blood_pressure_monitoring"],
            "preferred_duration_months": 6,
            "preferred_location": "Nagpur",
            "pre_confidence_score": 6.0,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "parent": {
            "parent_name": "Vijay Meshram",
            "primary_concerns": ["degree_progression", "job_security"],
            "max_total_fees_inr": 12000,
            "preferred_streams": ["healthcare"],
            "location_preference": "Nagpur",
            "degree_continuation_important": True,
            "pre_confidence_score": 4.5,
            "submitted_at": datetime.now(timezone.utc).isoformat()
        },
        "post_confidence_student": 8.0,
        "post_confidence_parent": 7.5,
        "confidence_feedback": "General Duty Assistant certificate leads to recognized nursing bridge programs."
    }
]

DEMO_ESCALATIONS = [
    {
        "id": "demo-escalation-pune-01",
        "family_id": "demo-family-pune-ev-solar",
        "name": "Suresh Deshmukh",
        "phone": "+91 98220 12345",
        "role": "parent",
        "district": "Pune",
        "topic": "fee_assistance_pmkvy",
        "status": "pending_triage"
    },
    {
        "id": "demo-escalation-nashik-02",
        "family_id": "demo-family-nashik-agri",
        "name": "Balasaheb Gaikwad",
        "phone": "+91 94230 67890",
        "role": "joint",
        "district": "Nashik",
        "topic": "dgca_license_subsidies",
        "status": "in_review"
    }
]

def seed_demo_data(db_session=None):
    db: Session = db_session if db_session is not None else SessionLocal()
    should_close = db_session is None
    try:
        # Fetch courses for running consensus engine
        course_records = db.query(CourseModel).all()
        courses_dict_list = [
            {
                "id": c.id,
                "title": c.title,
                "stream": c.stream,
                "duration_months": c.duration_months,
                "fees_inr": c.fees_inr,
                "financial_aid_available": c.financial_aid_available,
                "nsqf_level": c.nsqf_level,
                "practical_hours": c.practical_hours,
                "certification_body": c.certification_body,
                "eligibility": c.eligibility,
                "career_outcome": c.career_outcome,
                "location": c.location
            }
            for c in course_records
        ]

        seeded_families = 0
        for f_data in DEMO_FAMILIES:
            existing = db.query(FamilySessionModel).filter(FamilySessionModel.id == f_data["id"]).first()
            if not existing:
                existing = FamilySessionModel(id=f_data["id"])
                db.add(existing)

            existing.language = f_data["language"]
            existing.district = f_data["district"]
            existing.state = f_data["state"]
            existing.status = f_data["status"]
            existing.student_data = f_data["student"]
            existing.parent_data = f_data["parent"]
            existing.post_confidence_student = f_data.get("post_confidence_student")
            existing.post_confidence_parent = f_data.get("post_confidence_parent")
            existing.confidence_feedback = f_data.get("confidence_feedback")
            existing.confidence_submitted_at = datetime.now(timezone.utc)

            # Generate consensus summary
            summary = FamilyConsensusEngine.analyze_family(
                family_id=f_data["id"],
                student=f_data["student"],
                parent=f_data["parent"],
                courses=courses_dict_list
            )
            # Add confidence stats to summary
            summary["post_confidence_student"] = f_data.get("post_confidence_student")
            summary["post_confidence_parent"] = f_data.get("post_confidence_parent")
            pre_st = f_data["student"].get("pre_confidence_score", 5.0)
            post_st = f_data.get("post_confidence_student", 8.0)
            summary["confidence_delta"] = round(post_st - pre_st, 1)
            summary["confidence_status"] = "actual_delta_recorded"
            existing.consensus_summary = summary
            seeded_families += 1

        # Seed Escalations
        seeded_escalations = 0
        for esc in DEMO_ESCALATIONS:
            existing_esc = db.query(CounsellorEscalationModel).filter(CounsellorEscalationModel.id == esc["id"]).first()
            if not existing_esc:
                existing_esc = CounsellorEscalationModel(id=esc["id"])
                db.add(existing_esc)
            existing_esc.family_id = esc["family_id"]
            existing_esc.name = esc["name"]
            existing_esc.phone = esc["phone"]
            existing_esc.role = esc["role"]
            existing_esc.district = esc["district"]
            existing_esc.topic = esc["topic"]
            existing_esc.status = esc["status"]
            seeded_escalations += 1

        db.commit()
        print(f"[SkillSaathi Demo Seed] Successfully seeded {seeded_families} synthetic family sessions.")
        print(f"[SkillSaathi Demo Seed] Successfully seeded {seeded_escalations} demonstration counsellor triage tickets.")
        print(f"[SkillSaathi Demo Seed] Primary demo family ID: 'demo-family-pune-ev-solar'")
    finally:
        if should_close:
            db.close()

if __name__ == "__main__":
    seed_demo_data()
