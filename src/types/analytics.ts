/**
 * Platform analytics and reporting types for SkillSaathi
 */

export interface MetricSummary {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  changePercent?: number;
  description: string;
}

export interface StreamInterestDistribution {
  streamId: string;
  streamName: string;
  studentInterestPercent: number;
  parentAcceptancePercent: number;
  totalEnquiries: number;
}

export interface ParentalConcernMetric {
  concern: string;
  count: number;
  percentage: number;
  typicalResolution: string;
}

export interface RegionalMetric {
  state: string;
  activeStudents: number;
  engagedParents: number;
  topStream: string;
}

export interface PlatformAnalytics {
  lastUpdated: string;
  overviewMetrics: MetricSummary[];
  streamDistributions: StreamInterestDistribution[];
  topParentalConcerns: ParentalConcernMetric[];
  regionalDistribution: RegionalMetric[];
}
