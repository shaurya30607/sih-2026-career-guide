import { CounsellingSession } from '../../types/counselling';

export const MOCK_COUNSELLING_SESSIONS: CounsellingSession[] = [
  {
    id: 'session-demo-001',
    familyProfile: {
      studentName: 'Rahul Verma',
      studentAge: 17,
      currentEducation: 'Completed Class 10 (CBSE - 72%)',
      studentInterests: ['Electronics', 'Automobiles', 'Hands-on hardware troubleshooting'],
      parentName: 'Ramesh Verma',
      parentOccupation: 'Small Business Retail Owner',
      parentPrimaryConcerns: [
        'Need steady income within 1-2 years',
        'Respectable social standing for vocational careers',
        'Concerns about job longevity vs traditional degree',
      ],
      preferredLocation: 'Delhi NCR or Jaipur',
      monthlyBudgetInr: 15000,
    },
    status: 'active',
    startedAt: '2026-10-18T09:30:00Z',
    updatedAt: '2026-10-18T10:15:00Z',
    messages: [
      {
        id: 'msg-01',
        sessionId: 'session-demo-001',
        senderRole: 'system',
        senderName: 'SkillSaathi AI Counsellor',
        content:
          'Namaste Rahul and Ramesh ji. Welcome to SkillSaathi. We help students and parents find accredited vocational pathways that offer fast skill acquisition, reliable earnings, and formal certification.',
        timestamp: '2026-10-18T09:30:05Z',
        language: 'en',
      },
      {
        id: 'msg-02',
        sessionId: 'session-demo-001',
        senderRole: 'student',
        senderName: 'Rahul Verma',
        content:
          'Sir, I just finished 10th. I like working on bikes and gadgets, but my relatives are asking me to take commerce or general BA. I want to build a career in electric vehicles or green energy.',
        timestamp: '2026-10-18T09:32:00Z',
        language: 'en',
        meta: {
          intent: 'explore_vocational_interest',
          suggestedAction: 'address_interest_and_validate_with_parent',
        },
      },
      {
        id: 'msg-03',
        sessionId: 'session-demo-001',
        senderRole: 'parent',
        senderName: 'Ramesh Verma',
        content:
          'Is an EV technician diploma recognized by the government? We want to make sure Rahul gets a permanent, respected job and can also pursue higher education later if he wants.',
        timestamp: '2026-10-18T09:35:10Z',
        language: 'en',
        meta: {
          intent: 'parental_reassurance_certification',
          identifiedConcerns: ['Government Recognition', 'Career Progression to B.Voc/B.Tech'],
        },
      },
      {
        id: 'msg-04',
        sessionId: 'session-demo-001',
        senderRole: 'counsellor',
        senderName: 'SkillSaathi AI Counsellor',
        content:
          'Ramesh ji, that is an essential question. Under the National Education Policy (NEP 2020) and the National Credit Framework (NCrF), NCVET-certified diploma programs carry academic credits. Rahul can start with an ASDC-certified EV technician program, begin earning at 18-20, and later transfer credits into a Bachelor of Vocation (B.Voc) degree without restarting.',
        timestamp: '2026-10-18T09:36:30Z',
        language: 'en',
        meta: {
          referencedCourseIds: ['course-ev-tech-02', 'course-solar-pv-01'],
        },
      },
    ],
    recommendations: [
      {
        id: 'rec-ev-tech',
        streamTitle: 'Electric Vehicle & Clean Mobility Technician',
        fitScore: 94,
        keySkills: ['Battery Management Systems', 'Motor Control Diagnostics', 'High-Voltage Safety'],
        rationaleForStudent:
          'Directly matches your passion for electronics and vehicle mechanics with practical workshop training.',
        rationaleForParent:
          'Fastest-growing sector with formal corporate placements, NSDC certification, and clear vertical ladder to service manager.',
        estimatedTimelineMonths: 8,
        expectedSalaryRangeInr: {
          min: 22000,
          max: 30000,
        },
        recommendedCourseIds: ['course-ev-tech-02'],
      },
      {
        id: 'rec-solar-pv',
        streamTitle: 'Solar Photovoltaic Site Supervisor Track',
        fitScore: 88,
        keySkills: ['Solar Inverter Calibration', 'Grid Connections', 'Preventive Maintenance'],
        rationaleForStudent:
          'Practical outdoor engineering with high autonomy and rapid demand in commercial and residential sectors.',
        rationaleForParent:
          'Supported by central government subsidies (PM Surya Ghar Scheme) with guaranteed demand across tier-2 and tier-3 cities.',
        estimatedTimelineMonths: 6,
        expectedSalaryRangeInr: {
          min: 20000,
          max: 28000,
        },
        recommendedCourseIds: ['course-solar-pv-01'],
      },
    ],
  },
];
