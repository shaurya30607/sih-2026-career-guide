import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.app.database import Base, get_db
from backend.app.main import app, seed_courses

from backend.tests.conftest import client, TestingSessionLocal


def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["database"] == "connected"
    assert "SkillSaathi" in data["service"]

def test_create_family_session():
    payload = {
        "family_name": "Sharma Family",
        "language": "en",
        "district": "Pune",
        "state": "Maharashtra"
    }
    response = client.post("/api/families", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["district"] == "Pune"
    assert data["has_student_profile"] is False
    assert data["has_parent_profile"] is False
    assert data["has_analysis"] is False

def test_submit_student_profile():
    # 1. Create family
    fam_res = client.post("/api/families", json={"family_name": "Test Family"})
    fam_id = fam_res.json()["id"]

    # 2. Submit student profile
    student_payload = {
        "student_name": "Aarav Sharma",
        "age": 17,
        "education_level": "10th_pass",
        "career_interests": ["renewable_energy", "automotive"],
        "hands_on_activities": ["building_fixing", "electricity_energy"],
        "preferred_duration_months": 6,
        "preferred_location": "Pune",
        "pre_confidence_score": 6.5
    }
    res = client.post(f"/api/families/{fam_id}/student", json=student_payload)
    assert res.status_code == 200
    data = res.json()
    assert data["family_id"] == fam_id
    assert data["student_name"] == "Aarav Sharma"
    assert "renewable_energy" in data["career_interests"]

def test_submit_parent_profile():
    fam_res = client.post("/api/families", json={"family_name": "Test Family 2"})
    fam_id = fam_res.json()["id"]

    parent_payload = {
        "parent_name": "Suresh Sharma",
        "primary_concerns": ["job_security", "social_respect", "degree_progression"],
        "max_monthly_budget_inr": 5000,
        "max_total_fees_inr": 15000,
        "preferred_streams": ["manufacturing_engineering"],
        "location_preference": "Pune",
        "degree_continuation_important": True,
        "pre_confidence_score": 5.0
    }
    res = client.post(f"/api/families/{fam_id}/parent", json=parent_payload)
    assert res.status_code == 200
    data = res.json()
    assert data["family_id"] == fam_id
    assert data["parent_name"] == "Suresh Sharma"
    assert data["max_total_fees_inr"] == 15000

def test_missing_data_for_analysis():
    # Family with only student profile
    fam_res = client.post("/api/families", json={"family_name": "Incomplete Family"})
    fam_id = fam_res.json()["id"]

    client.post(f"/api/families/{fam_id}/student", json={
        "education_level": "10th_pass",
        "career_interests": ["renewable_energy"]
    })

    # Try analyzing before parent profile submitted
    res = client.post(f"/api/families/{fam_id}/analyze")
    assert res.status_code == 400
    assert "Missing: parent profile" in res.json()["detail"]

def test_invalid_input_validation():
    fam_res = client.post("/api/families", json={"family_name": "Validation Family"})
    fam_id = fam_res.json()["id"]

    # Missing required 'education_level' and 'career_interests'
    res = client.post(f"/api/families/{fam_id}/student", json={"age": 17})
    assert res.status_code == 422

    # Invalid age (below 14)
    res_age = client.post(f"/api/families/{fam_id}/student", json={
        "age": 10,
        "education_level": "10th_pass",
        "career_interests": ["it_tech"]
    })
    assert res_age.status_code == 422

def test_family_consensus_engine_and_persistence():
    # 1. Create family
    fam_res = client.post("/api/families", json={"family_name": "Verma Family", "district": "Pune"})
    fam_id = fam_res.json()["id"]

    # 2. Student wants Renewable Energy & EV
    client.post(f"/api/families/{fam_id}/student", json={
        "student_name": "Rahul Verma",
        "age": 17,
        "education_level": "10th_pass",
        "career_interests": ["renewable_energy", "automotive"],
        "hands_on_activities": ["building_fixing", "electricity_energy"],
        "preferred_duration_months": 6,
        "preferred_location": "Pune",
        "pre_confidence_score": 6.0
    })

    # 3. Parent prefers Manufacturing/CNC, fears lack of degree progression and sets max fee of 15,000
    client.post(f"/api/families/{fam_id}/parent", json={
        "parent_name": "Ramesh Verma",
        "primary_concerns": ["job_security", "degree_progression", "social_respect"],
        "max_total_fees_inr": 15000,
        "preferred_streams": ["manufacturing_engineering"],
        "location_preference": "Pune",
        "degree_continuation_important": True,
        "pre_confidence_score": 5.0
    })

    # 4. Run Analysis
    res_analyze = client.post(f"/api/families/{fam_id}/analyze")
    assert res_analyze.status_code == 200
    data = res_analyze.json()

    assert data["family_id"] == fam_id
    assert data["is_demo_data"] is True
    assert "Milestone 2" in data["disclaimer"]

    # Check shared priorities
    assert len(data["shared_strengths"]) >= 1
    shared_topics = [s["topic"] for s in data["shared_strengths"]]
    assert "Government-Recognized Qualification" in shared_topics

    # Check identified disagreements
    assert len(data["identified_disagreements"]) >= 1
    disagreement_topics = [d["topic"] for d in data["identified_disagreements"]]
    assert "Vocational Stream Preference" in disagreement_topics
    assert "Degree Equivalency & Social Standing" in disagreement_topics

    # Check recommendations
    assert len(data["top_pathway_recommendations"]) > 0
    top_course = data["top_pathway_recommendations"][0]
    assert "fit_score" in top_course
    assert "student_rationale" in top_course
    assert "parent_rationale" in top_course
    assert len(top_course["trade_offs"]) > 0

    # Check discussion guide
    assert len(data["discussion_guide"]) >= 3

    # Check pre-confidence scores are faithfully reported without fake claims
    assert data["pre_confidence_student"] == 6.0
    assert data["pre_confidence_parent"] == 5.0

    # 5. Retrieve summary endpoint (persistence check)
    res_summary = client.get(f"/api/families/{fam_id}/summary")
    assert res_summary.status_code == 200
    summary_data = res_summary.json()
    assert summary_data["family_id"] == fam_id
    assert summary_data["status"] == "analyzed"
    assert len(summary_data["top_pathway_recommendations"]) == len(data["top_pathway_recommendations"])

def test_courses_listing_and_filtering():
    # 1. List all
    res_all = client.get("/api/courses")
    assert res_all.status_code == 200
    courses = res_all.json()
    assert len(courses) >= 6

    # 2. Filter by stream
    res_solar = client.get("/api/courses?stream=renewable_energy")
    assert res_solar.status_code == 200
    solar_courses = res_solar.json()
    assert len(solar_courses) >= 1
    assert solar_courses[0]["stream"] == "renewable_energy"

    # 3. Filter by max fees
    res_affordable = client.get("/api/courses?max_fees=12000")
    assert res_affordable.status_code == 200
    for c in res_affordable.json():
        assert c["fees_inr"] <= 12000

    # 4. Filter by education (10th pass student should NOT see courses requiring 12th pass)
    res_edu = client.get("/api/courses?min_education=10th_pass")
    assert res_edu.status_code == 200
    for c in res_edu.json():
        assert c["eligibility"]["min_education"] != "12th_pass"

def test_v1_prefix_compatibility():
    # Verify that /api/v1 routes resolve identically
    res_health = client.get("/api/v1/health")
    assert res_health.status_code == 200
    assert res_health.json()["status"] == "ok"

    res_courses = client.get("/api/v1/courses")
    assert res_courses.status_code == 200
    assert len(res_courses.json()) >= 6

def test_counsellor_escalation_request():
    payload = {
        "name": "Sunita Patil",
        "phone": "+91 98765 43210",
        "role": "parent",
        "district": "Pune",
        "topic": "fee_assistance"
    }
    res = client.post("/api/counsellor/request", json=payload)
    assert res.status_code == 201
    data = res.json()
    assert data["name"] == "Sunita Patil"
    assert data["status"] == "pending"
    assert "counsellor" in data["message"].lower()

def test_admin_analytics_endpoints():
    # Overview
    res_ov = client.get("/api/analytics/overview")
    assert res_ov.status_code == 200
    data_ov = res_ov.json()
    assert len(data_ov["overview_metrics"]) >= 4
    assert "Participating" in data_ov["disclaimer"]

    # Resistance
    res_res = client.get("/api/analytics/resistance")
    assert res_res.status_code == 200
    data_res = res_res.json()
    assert len(data_res["top_resistance_topics"]) >= 4
    assert "Pune" in data_res["district_insights"]
