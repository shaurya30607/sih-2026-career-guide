import React, { useState, useEffect } from 'react';
import {
  User,
  Users,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { EducationLevelRequired, VocationalStream } from '../../types/course';
import { OnboardingPreferences, OnboardingRole, MAHARASHTRA_DISTRICTS } from './types';
import { getOnboardingPreferences, saveOnboardingPreferences } from './storage';
import { VOCATIONAL_STREAMS } from '../../services/courses/courseService';
import { apiClient } from '../../services/api/client';

export interface OnboardingFlowProps {
  onComplete: (preferences: OnboardingPreferences) => void;
  onSkip: () => void;
}

const TOTAL_STEPS = 3;

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<OnboardingRole>('student');
  const [educationLevel, setEducationLevel] = useState<EducationLevelRequired>('10th_pass');
  const [state] = useState<string>('Maharashtra');
  const [district, setDistrict] = useState<string>('Pune');
  const [careerInterests, setCareerInterests] = useState<VocationalStream[]>([
    'automotive',
    'renewable_energy',
  ]);

  // Load existing preferences if available
  useEffect(() => {
    const saved = getOnboardingPreferences();
    if (saved) {
      if (saved.role) setRole(saved.role);
      if (saved.educationLevel) setEducationLevel(saved.educationLevel);
      if (saved.district) setDistrict(saved.district);
      if (saved.careerInterests && saved.careerInterests.length > 0) {
        setCareerInterests(saved.careerInterests);
      }
    }
  }, []);

  const toggleInterest = (stream: VocationalStream) => {
    setCareerInterests((prev) =>
      prev.includes(stream) ? prev.filter((s) => s !== stream) : [...prev, stream]
    );
  };

  const handleFinish = (isSkipped = false) => {
    const prefs: OnboardingPreferences = {
      role: isSkipped ? undefined : role,
      educationLevel: isSkipped ? undefined : educationLevel,
      state: isSkipped ? undefined : state,
      district: isSkipped ? undefined : district,
      careerInterests: isSkipped ? [] : careerInterests,
      completed: true,
    };
    saveOnboardingPreferences(prefs);

    if (!isSkipped) {
      // Connect to persistent backend session
      apiClient
        .post<{ id: string }>('/families', {
          family_name: role === 'parent' ? 'Parent Onboarding Intake' : 'Student Onboarding Intake',
          language: 'en',
          district: district || 'Pune',
          state: state || 'Maharashtra',
        })
        .then(async (family) => {
          if (family && family.id) {
            prefs.familyId = family.id;
            saveOnboardingPreferences(prefs);
            if (typeof window !== 'undefined' && window.sessionStorage) {
              window.sessionStorage.setItem('skillsaathi_active_family_id', family.id);
            }

            if (role !== 'parent') {
              await apiClient
                .post(`/families/${family.id}/student`, {
                  student_name: 'Student Learner',
                  education_level: educationLevel || '10th_pass',
                  career_interests: careerInterests.length > 0 ? careerInterests : ['renewable_energy'],
                  preferred_location: district || 'Pune',
                  pre_confidence_score: 5.0,
                })
                .catch((err) => console.warn('Backend student profile save warning:', err));
            }
          }
        })
        .catch((err) => {
          console.warn('Backend family session init offline, using local storage:', err);
        });
    }

    if (isSkipped) {
      onSkip();
    } else {
      onComplete(prefs);
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    } else {
      handleFinish(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="onboarding-container" style={{ maxWidth: 720, margin: '0 auto', padding: '1rem 0' }}>
      {/* Step Header & Progress */}
      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Badge variant="primary" size="sm">
              Quick Setup · Step {step} of {TOTAL_STEPS}
            </Badge>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              (Takes ~45 seconds)
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleFinish(true)}
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              textDecoration: 'underline',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
            }}
          >
            Skip for now
          </button>
        </div>

        {/* Visual Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={(step / TOTAL_STEPS) * 100}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Onboarding progress: step ${step} of ${TOTAL_STEPS}`}
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'var(--color-border)',
            borderRadius: '9999px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(step / TOTAL_STEPS) * 100}%`,
              backgroundColor: 'var(--color-primary)',
              transition: 'width 250ms ease-out',
            }}
          />
        </div>
      </div>

      {/* Main Step Card */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
                Who is exploring vocational paths today?
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
                SkillSaathi tailors course comparisons, wage benchmarks, and counselling perspectives based on your role.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {/* Option 1: Student */}
              <button
                type="button"
                onClick={() => setRole('student')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${role === 'student' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  backgroundColor: role === 'student' ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '8px',
                    backgroundColor: role === 'student' ? 'var(--color-primary)' : 'var(--color-surface-muted)',
                    color: role === 'student' ? '#ffffff' : 'var(--color-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.875rem',
                  }}
                >
                  <User size={20} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                  Student
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  I want practical skills, apprenticeship links, and fast job placement.
                </div>
              </button>

              {/* Option 2: Parent */}
              <button
                type="button"
                onClick={() => setRole('parent')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${role === 'parent' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  backgroundColor: role === 'parent' ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '8px',
                    backgroundColor: role === 'parent' ? 'var(--color-primary)' : 'var(--color-surface-muted)',
                    color: role === 'parent' ? '#ffffff' : 'var(--color-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.875rem',
                  }}
                >
                  <Users size={20} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                  Parent / Guardian
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  I want verified job stability, social respect, and degree mobility info.
                </div>
              </button>

              {/* Option 3: Joint */}
              <button
                type="button"
                onClick={() => setRole('joint')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${role === 'joint' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  backgroundColor: role === 'joint' ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '8px',
                    backgroundColor: role === 'joint' ? 'var(--color-primary)' : 'var(--color-surface-muted)',
                    color: role === 'joint' ? '#ffffff' : 'var(--color-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.875rem',
                  }}
                >
                  <Compass size={20} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                  Explore Together
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  We are discussing choices together as a family to reach consensus.
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Education & Region */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
                Education level and regional district
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
                This helps match courses that fit your current qualifications and nearest training centers.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* Education Level */}
              <div>
                <label
                  htmlFor="education-select"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.5rem' }}
                >
                  <GraduationCap size={16} aria-hidden="true" style={{ color: 'var(--color-primary)' }} />
                  Current / Highest Education Level:
                </label>
                <select
                  id="education-select"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value as EducationLevelRequired)}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.875rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-strong)',
                    backgroundColor: 'var(--color-bg)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <option value="8th_pass">8th Pass</option>
                  <option value="10th_pass">10th Pass (SSC / Matriculation)</option>
                  <option value="12th_pass">12th Pass (HSC / Intermediate)</option>
                  <option value="diploma">ITI / Polytechnic Diploma</option>
                  <option value="graduate">Graduate (Any Stream)</option>
                  <option value="below_8th">Below 8th (Skill Orientation)</option>
                </select>
              </div>

              {/* State & District */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label
                    htmlFor="state-select"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.5rem' }}
                  >
                    <MapPin size={16} aria-hidden="true" style={{ color: 'var(--color-primary)' }} />
                    State:
                  </label>
                  <select
                    id="state-select"
                    disabled
                    value={state}
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.875rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-muted)',
                      fontSize: '0.9375rem',
                      color: 'var(--color-text-secondary)',
                      cursor: 'not-allowed',
                    }}
                  >
                    <option value="Maharashtra">Maharashtra (Prototype Focus)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="district-select"
                    style={{ display: 'block', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.5rem' }}
                  >
                    District:
                  </label>
                  <select
                    id="district-select"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.875rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-strong)',
                      backgroundColor: 'var(--color-bg)',
                      fontSize: '0.9375rem',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {MAHARASHTRA_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Career Interests */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
                Select vocational fields that interest you
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
                Choose one or more high-demand trades. You can adjust or reset these at any time in the course explorer.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {VOCATIONAL_STREAMS.map((st) => {
                const isSelected = careerInterests.includes(st.key);
                return (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => toggleInterest(st.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.875rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      backgroundColor: isSelected ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                      fontWeight: isSelected ? 600 : 500,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 150ms ease',
                    }}
                  >
                    <span>{st.label}</span>
                    {isSelected && <CheckCircle2 size={16} aria-hidden="true" style={{ color: 'var(--color-primary)', flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8125rem',
                color: 'var(--color-text-muted)',
                backgroundColor: 'var(--color-surface-muted)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <Sparkles size={16} style={{ color: 'var(--color-secondary)' }} aria-hidden="true" />
              <span>We will highlight courses matching your selections first in the explorer.</span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {step > 1 ? (
            <Button variant="outline" size="md" icon={<ArrowLeft size={16} />} onClick={handleBack}>
              Back
            </Button>
          ) : (
            <span />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Button
              variant="primary"
              size="md"
              icon={step === TOTAL_STEPS ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}
              iconPosition="right"
              onClick={handleNext}
            >
              {step === TOTAL_STEPS ? 'Go to Course Explorer' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
