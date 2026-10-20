from backend.tests.conftest import client, TestingSessionLocal
from backend.app.demo_seed import seed_demo_data

def test_hyperlocal_district_and_state_filtering():
    # Test Pune district filter
    res_pune = client.get("/api/courses?district=Pune")
    assert res_pune.status_code == 200
    pune_courses = res_pune.json()
    assert len(pune_courses) >= 1
    for c in pune_courses:
        assert "pune" in (c.get("district") or "").lower() or "pune" in c["location"].lower()

    # Test Nashik district filter
    res_nashik = client.get("/api/courses?district=Nashik")
    assert res_nashik.status_code == 200
    nashik_courses = res_nashik.json()
    assert len(nashik_courses) >= 1
    for c in nashik_courses:
        assert "nashik" in (c.get("district") or "").lower() or "nashik" in c["location"].lower()

    # Test State filter
    res_state = client.get("/api/courses?state=Maharashtra")
    assert res_state.status_code == 200
    assert len(res_state.json()) >= 6

def test_course_verifiable_sources_and_evidence_flags():
    res = client.get("/api/courses")
    assert res.status_code == 200
    courses = res.json()
    assert len(courses) >= 6

    # Verify at least one DGT / CTS trade course exists
    cts_courses = [c for c in courses if "dgt" in (c.get("source_name") or "").lower() or "cts" in (c.get("title") or "").lower()]
    assert len(cts_courses) >= 1
    sample = cts_courses[0]
    assert sample["source_name"] is not None
    assert "dgt.gov.in" in sample["source_url"] or "bharatskills.gov.in" in sample["source_url"]
    assert sample["verification_status"] == "verified_curriculum_framework"
    assert isinstance(sample["missing_evidence_flags"], list)
    assert len(sample["missing_evidence_flags"]) > 0

def test_explainable_pathway_trade_offs_and_unknown_values():
    # Seed demo data into test database session
    db = TestingSessionLocal()
    try:
        seed_demo_data(db)
    finally:
        db.close()

    # Retrieve demo family analysis
    res = client.get("/api/families/demo-family-pune-ev-solar/analysis")
    assert res.status_code == 200
    data = res.json()

    comparison = data.get("pathway_comparison")
    assert comparison is not None
    assert "pathway_a_title" in comparison
    assert "pathway_b_title" in comparison
    assert "affordability_explanation" in comparison
    assert "₹" in comparison["affordability_explanation"]
    assert "eligibility_explanation" in comparison
    assert "unknown_values_disclaimer" in comparison
    assert "unverified in public government data" in comparison["unknown_values_disclaimer"]

def test_parental_resistance_analytics_privacy_safeguards():
    # Seed demo data into test database session
    db = TestingSessionLocal()
    try:
        seed_demo_data(db)
    finally:
        db.close()

    res_res = client.get("/api/analytics/resistance")
    assert res_res.status_code == 200
    data = res_res.json()

    assert data["total_sessions_analyzed"] >= 7
    assert len(data["top_resistance_topics"]) >= 4

    # Check district privacy suppression
    district_insights = data["district_insights"]
    assert "Pune" in district_insights
    assert "Nashik" in district_insights

    # Pune has 5 sessions -> should NOT be suppressed
    pune_data = district_insights["Pune"]
    assert pune_data["is_suppressed"] is False
    assert isinstance(pune_data["sessions"], int)
    assert pune_data["sessions"] >= 5

    # Nashik has 1 session -> MUST be suppressed for privacy protection
    nashik_data = district_insights["Nashik"]
    assert nashik_data["is_suppressed"] is True
    assert "<5" in str(nashik_data["sessions"])
    assert "Protected" in nashik_data["top_concern"]

    # Verify disclaimer highlights privacy safeguard
    assert "suppressed for privacy" in data["disclaimer"].lower()
