import { PlatformAnalytics } from '../../types/analytics';

export const MOCK_ANALYTICS: PlatformAnalytics = {
  lastUpdated: '2026-10-18T00:00:00Z',
  overviewMetrics: [
    {
      id: 'metric-students-guided',
      label: 'Students Guided',
      value: '24,580+',
      unit: 'youth',
      changePercent: 18.4,
      description: 'Secondary and higher secondary students completing career profiling',
    },
    {
      id: 'metric-parent-sessions',
      label: 'Parental Consensus Rate',
      value: '86.2%',
      unit: '%',
      changePercent: 6.1,
      description: 'Sessions resulting in mutual agreement between student and guardian',
    },
    {
      id: 'metric-avg-placement-time',
      label: 'Average Time to Employment',
      value: '4.2',
      unit: 'months',
      changePercent: -12.5,
      description: 'Post-course completion until first wage employment or apprenticeship',
    },
    {
      id: 'metric-median-starting-salary',
      label: 'Median Starting Salary',
      value: '₹22,500',
      unit: 'INR/mo',
      changePercent: 14.0,
      description: 'Certified graduates in automotive, renewable energy, and tech sectors',
    },
  ],
  streamDistributions: [
    {
      streamId: 'stream-ev',
      streamName: 'Electric Vehicle & Auto Diagnostics',
      studentInterestPercent: 32,
      parentAcceptancePercent: 28,
      totalEnquiries: 7850,
    },
    {
      streamId: 'stream-solar',
      streamName: 'Solar & Renewable Energy',
      studentInterestPercent: 26,
      parentAcceptancePercent: 31,
      totalEnquiries: 6420,
    },
    {
      streamId: 'stream-it',
      streamName: 'IT & Digital Technical Support',
      studentInterestPercent: 24,
      parentAcceptancePercent: 22,
      totalEnquiries: 5900,
    },
    {
      streamId: 'stream-health',
      streamName: 'Healthcare & Patient Care Assistance',
      studentInterestPercent: 18,
      parentAcceptancePercent: 19,
      totalEnquiries: 4410,
    },
  ],
  topParentalConcerns: [
    {
      concern: 'Long-term job stability vs traditional college degree',
      count: 4200,
      percentage: 42.5,
      typicalResolution: 'Explanation of NEP credit transferability to B.Voc degrees',
    },
    {
      concern: 'Government accreditation and validity of certificates',
      count: 2850,
      percentage: 28.8,
      typicalResolution: 'NCVET / NSDC national portal verification showcase',
    },
    {
      concern: 'Immediate training cost vs expected return on investment',
      count: 1820,
      percentage: 18.4,
      typicalResolution: 'Skill loan subsidy schemes and apprenticeship stipends overview',
    },
  ],
  regionalDistribution: [
    {
      state: 'Rajasthan',
      activeStudents: 6200,
      engagedParents: 5400,
      topStream: 'Solar & Renewable Energy',
    },
    {
      state: 'Maharashtra',
      activeStudents: 8100,
      engagedParents: 7200,
      topStream: 'Electric Vehicle & Auto Diagnostics',
    },
    {
      state: 'Uttar Pradesh',
      activeStudents: 5900,
      engagedParents: 4800,
      topStream: 'Healthcare & Patient Care Assistance',
    },
    {
      state: 'Karnataka',
      activeStudents: 4380,
      engagedParents: 3900,
      topStream: 'IT & Digital Technical Support',
    },
  ],
};
