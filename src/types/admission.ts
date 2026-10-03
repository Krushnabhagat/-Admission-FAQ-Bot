export type UserPersona = 'student' | 'parent';
export type Language = 'en' | 'hi' | 'mr';

export type Category = 'OPEN' | 'OBC' | 'EWS' | 'TFWS' | 'SC' | 'ST' | 'VJ/NT' | 'SBC' | 'PwD';

export interface StudentProfile {
  name: string;
  twelfthPercentage: number;
  entranceExam: 'MHT-CET' | 'JEE Main' | 'NEET' | 'Diploma (DSE)';
  entrancePercentile: number;
  category: Category;
  annualFamilyIncome: number; // in INR
  preferredBranch: string;
  preferredCity: string;
  hostelNeeded: boolean;
  gender: 'all' | 'female' | 'male';
}

export interface CourseRecommendation {
  id: string;
  collegeName: string;
  shortName: string;
  branch: string;
  city: string;
  type: 'Govt Autonomous' | 'Govt Aided' | 'Autonomous Private' | 'University Dept';
  previousCutoff: number; // percentile
  userChances: 'Safe' | 'Moderate' | 'Ambitious';
  annualFee: number;
  scholarshipFee: number;
  avgPackageLpa: number;
  highestPackageLpa: number;
  naacGrade: string;
  placementPercent: number;
  topRecruiters: string[];
  capSuggestedOrder: number;
  highlight: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  nameMr: string;
  nameHi: string;
  categoryApplicable: Category[];
  isMandatory: boolean;
  description: string;
  issuingAuthority: string;
  validityRequirement: string;
  alternativeIfMissing: string;
  stageNeeded: 'Registration / Scrutiny' | 'Seat Acceptance' | 'College Reporting';
  status?: 'verified' | 'uploaded' | 'missing' | 'in_progress';
}

export interface ScholarshipScheme {
  id: string;
  name: string;
  nameMr: string;
  nameHi: string;
  department: string;
  categories: Category[];
  maxIncomeLimit: number; // INR
  benefitSummary: string;
  tuitionFeeConcession: string;
  hostelMaintenanceAllowance: string;
  eligibilityNotes: string;
  officialPortal: string;
  deadlineNotice: string;
}

export interface CollegeDetail {
  id: string;
  name: string;
  shortCode: string;
  location: string;
  affiliation: string;
  type: string;
  established: number;
  naacGrade: string;
  nirfRank?: number;
  campusAcres: number;
  branches: {
    name: string;
    intake: number;
    openCutoff: number;
    obcCutoff: number;
    scCutoff: number;
    tfwsCutoff: number;
    avgLpa: number;
  }[];
  annualTuitionFee: number;
  developmentFee: number;
  hostelFeeAnnual: number;
  hostelCurfew: string;
  hostelSecurity: string;
  messQualityRating: number; // out of 5
  transportBusRoutes: string[];
  placementSummary: {
    overallRate: number;
    medianLpa: number;
    highestLpa: number;
    topCompanies: string[];
  };
  safetyFeatures: string[];
  antiRaggingContact: string;
}

export interface AdmissionDeadline {
  id: string;
  phase: string;
  eventTitle: string;
  eventTitleMr: string;
  startDate: string;
  endDate: string;
  isUrgent: boolean;
  actionRequired: string;
  portalLink: string;
  penaltyNotice?: string;
}

export interface ProblemSolution {
  id: string;
  topic: string;
  title: string;
  titleMr: string;
  iconName: string;
  urgency: 'high' | 'medium' | 'low';
  summary: string;
  solutionSteps: string[];
  helpline: string;
  statutoryRuleRef: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  persona: UserPersona;
  language: Language;
  suggestions?: string[];
  recommendedModules?: ('eligibility' | 'documents' | 'scholarships' | 'colleges' | 'deadlines' | 'problem_solver')[];
}
