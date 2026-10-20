import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from backend.app.database import Base, get_db
from backend.app.main import app
from backend.app.models import FamilySessionModel, CourseModel, CounsellorEscalationModel
from backend.app.demo_courses_data import DEMO_COURSES

# Single shared in-memory SQLite database across test session
TEST_SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    TEST_SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Ensure tables exist immediately upon engine creation
Base.metadata.create_all(bind=test_engine)

def _init_test_db():
    db = TestingSessionLocal()
    try:
        count = db.query(CourseModel).count()
        if count == 0:
            for item in DEMO_COURSES:
                course = CourseModel(
                    id=item["id"],
                    title=item["title"],
                    slug=item["slug"],
                    provider=item["provider"],
                    stream=item["stream"],
                    duration_months=item["duration_months"],
                    training_mode=item["training_mode"],
                    certification_body=item["certification_body"],
                    nsqf_level=item.get("nsqf_level"),
                    practical_hours=item.get("practical_hours"),
                    eligibility=item["eligibility"],
                    description=item["description"],
                    highlights=item["highlights"],
                    skills_acquired=item["skills_acquired"],
                    career_progression=item.get("career_progression"),
                    location=item["location"],
                    fees_inr=item["fees_inr"],
                    financial_aid_available=item.get("financial_aid_available", True),
                    career_outcome=item["career_outcome"],
                    rating=item.get("rating", 4.5),
                    enrolled_count=item.get("enrolled_count", 0),
                    is_demo=item.get("is_demo", True),
                    district=item.get("district"),
                    state=item.get("state", "Maharashtra"),
                    source_name=item.get("source_name"),
                    source_url=item.get("source_url"),
                    verification_status=item.get("verification_status", "verified_curriculum_framework"),
                    last_updated=item.get("last_updated", "2026-10-19"),
                    missing_evidence_flags=item.get("missing_evidence_flags", [])
                )
                db.add(course)
            db.commit()
    finally:
        db.close()

_init_test_db()


client = TestClient(app)

