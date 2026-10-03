import { CollegeDetail, DocumentItem, ScholarshipScheme, AdmissionDeadline, ProblemSolution } from '../types/admission';

export const COLLEGES_DATABASE: CollegeDetail[] = [
  {
    id: 'coep-pune',
    name: 'COEP Technological University',
    shortCode: 'COEP Pune',
    location: 'Shivajinagar, Pune',
    affiliation: 'Unitary State University (Former Govt Autonomous)',
    type: 'State Public University',
    established: 1854,
    naacGrade: 'A+',
    nirfRank: 73,
    campusAcres: 38,
    branches: [
      { name: 'Computer Engineering', intake: 150, openCutoff: 99.85, obcCutoff: 99.62, scCutoff: 97.4, tfwsCutoff: 99.92, avgLpa: 17.5 },
      { name: 'Artificial Intelligence & Robotics', intake: 60, openCutoff: 99.65, obcCutoff: 99.35, scCutoff: 96.8, tfwsCutoff: 99.81, avgLpa: 15.8 },
      { name: 'Electronics & Telecommunication', intake: 120, openCutoff: 99.25, obcCutoff: 98.8, scCutoff: 94.5, tfwsCutoff: 99.45, avgLpa: 13.2 },
      { name: 'Mechanical Engineering', intake: 120, openCutoff: 97.5, obcCutoff: 96.1, scCutoff: 90.2, tfwsCutoff: 98.1, avgLpa: 9.8 },
      { name: 'Electrical Engineering', intake: 90, openCutoff: 98.1, obcCutoff: 97.2, scCutoff: 92.0, tfwsCutoff: 98.7, avgLpa: 10.4 }
    ],
    annualTuitionFee: 90500,
    developmentFee: 39500,
    hostelFeeAnnual: 35000,
    hostelCurfew: '9:30 PM (Biometric entry with SMS alert to parents)',
    hostelSecurity: '24/7 CCTV surveillance, biometric punch-in, dedicated female warden, doctor on call',
    messQualityRating: 4.3,
    transportBusRoutes: ['Shivajinagar Station (500m)', 'Pune Metro Line 1 COEP Station', 'Katraj-Swargate bus corridor', 'Nigdi-Pimpri direct PMT'],
    placementSummary: {
      overallRate: 94,
      medianLpa: 11.2,
      highestLpa: 50.5,
      topCompanies: ['Google', 'Microsoft', 'Goldman Sachs', 'Tata Motors', 'Bajaj Auto', 'NVIDIA']
    },
    safetyFeatures: ['Internal Complaints Committee (ICC)', 'Anti-Ragging Squad with Zero Tolerance', 'Pune Police beat outpost adjacent', '24/7 student counselor desk'],
    antiRaggingContact: '020-25507000 / antiragging@coep.ac.in'
  },
  {
    id: 'vjti-mumbai',
    name: 'Veermata Jijabai Technological Institute (VJTI)',
    shortCode: 'VJTI Mumbai',
    location: 'Matunga, Mumbai',
    affiliation: 'Autonomous State Govt Aided (Mumbai University)',
    type: 'Govt-Aided Autonomous',
    established: 1887,
    naacGrade: 'A+',
    nirfRank: 82,
    campusAcres: 16,
    branches: [
      { name: 'Computer Engineering', intake: 90, openCutoff: 99.91, obcCutoff: 99.71, scCutoff: 98.1, tfwsCutoff: 99.95, avgLpa: 18.2 },
      { name: 'Information Technology', intake: 60, openCutoff: 99.78, obcCutoff: 99.55, scCutoff: 97.6, tfwsCutoff: 99.85, avgLpa: 16.9 },
      { name: 'Electronics & Telecommunication', intake: 60, openCutoff: 99.3, obcCutoff: 98.9, scCutoff: 95.2, tfwsCutoff: 99.5, avgLpa: 14.1 },
      { name: 'Electrical Engineering', intake: 60, openCutoff: 98.4, obcCutoff: 97.4, scCutoff: 93.1, tfwsCutoff: 98.9, avgLpa: 11.0 },
      { name: 'Mechanical Engineering', intake: 60, openCutoff: 97.8, obcCutoff: 96.5, scCutoff: 91.5, tfwsCutoff: 98.3, avgLpa: 10.2 }
    ],
    annualTuitionFee: 85000,
    developmentFee: 32000,
    hostelFeeAnnual: 28000,
    hostelCurfew: '10:00 PM strictly monitored',
    hostelSecurity: 'RFID turnstiles, biometric register, 24-hr round guards, strictly restricted visitors',
    messQualityRating: 4.1,
    transportBusRoutes: ['Matunga Central & Western Railway stations walking 5-8 min', 'Wadala Monorail station', 'BEST Bus depot Dadar'],
    placementSummary: {
      overallRate: 95,
      medianLpa: 12.0,
      highestLpa: 62.0,
      topCompanies: ['Amazon', 'Morgan Stanley', 'Citi Bank', 'L&T', 'Texas Instruments', 'Apple']
    },
    safetyFeatures: ['Women Development Cell (WDC)', 'CCTV monitored campus boundaries', 'Emergency ambulance on premise', 'Mentor-mentee student tracking'],
    antiRaggingContact: '022-24198101 / dean_sa@vjti.ac.in'
  },
  {
    id: 'pict-pune',
    name: 'Pune Institute of Computer Technology (PICT)',
    shortCode: 'PICT Pune',
    location: 'Dhankawadi, Pune',
    affiliation: 'SPPU (Savitribai Phule Pune University)',
    type: 'Autonomous Private (Top Coding Rep)',
    established: 1983,
    naacGrade: 'A+',
    campusAcres: 5,
    branches: [
      { name: 'Computer Engineering', intake: 240, openCutoff: 99.6, obcCutoff: 99.2, scCutoff: 96.5, tfwsCutoff: 99.8, avgLpa: 14.5 },
      { name: 'Information Technology', intake: 180, openCutoff: 99.35, obcCutoff: 98.9, scCutoff: 95.8, tfwsCutoff: 99.6, avgLpa: 13.8 },
      { name: 'Artificial Intelligence & Data Science', intake: 120, openCutoff: 99.1, obcCutoff: 98.6, scCutoff: 94.9, tfwsCutoff: 99.4, avgLpa: 13.2 },
      { name: 'Electronics & Telecommunication', intake: 180, openCutoff: 98.2, obcCutoff: 97.1, scCutoff: 92.4, tfwsCutoff: 98.8, avgLpa: 10.5 }
    ],
    annualTuitionFee: 110000,
    developmentFee: 18000,
    hostelFeeAnnual: 55000,
    hostelCurfew: '9:00 PM for all students',
    hostelSecurity: 'Separate boy & girl hostel buildings, armed night security, mandatory guardian gate-pass',
    messQualityRating: 4.4,
    transportBusRoutes: ['Swargate to Katraj BRTS corridor', 'Padmavati bus stand (2 min)', 'Pune Railway station connecting PMT 24'],
    placementSummary: {
      overallRate: 92,
      medianLpa: 10.5,
      highestLpa: 45.0,
      topCompanies: ['Mastercard', 'Adobe', 'PhonePe', 'UBS', 'Siemens', 'Rakuten']
    },
    safetyFeatures: ['Intense peer-coding culture without distractions', 'Zero ragging incident record for 15+ years', 'CCTV on all corridors and entrances'],
    antiRaggingContact: '020-24371101 / principal@pict.edu'
  },
  {
    id: 'spit-mumbai',
    name: 'Sardar Patel Institute of Technology (SPIT)',
    shortCode: 'SPIT Andheri',
    location: 'Munshi Nagar, Andheri West, Mumbai',
    affiliation: 'Autonomous Private (Bhavans Campus)',
    type: 'Autonomous Private',
    established: 2005,
    naacGrade: 'A+',
    campusAcres: 47,
    branches: [
      { name: 'Computer Engineering', intake: 180, openCutoff: 99.68, obcCutoff: 99.3, scCutoff: 96.8, tfwsCutoff: 99.82, avgLpa: 15.2 },
      { name: 'Computer Science & Engineering (DS)', intake: 60, openCutoff: 99.45, obcCutoff: 99.0, scCutoff: 96.0, tfwsCutoff: 99.65, avgLpa: 14.6 },
      { name: 'Electronics & Telecommunication', intake: 120, openCutoff: 98.6, obcCutoff: 97.7, scCutoff: 93.5, tfwsCutoff: 99.05, avgLpa: 11.8 }
    ],
    annualTuitionFee: 155000,
    developmentFee: 22000,
    hostelFeeAnnual: 75000,
    hostelCurfew: '9:30 PM strictly',
    hostelSecurity: 'Bhavans campus gate security, electronic attendance, biometric scanner, female proctor',
    messQualityRating: 4.2,
    transportBusRoutes: ['Andheri West Metro Line 1 & Line 2A interchange (10 min)', 'Andheri Local Railway Station (1.2 km)', 'Bhavans bus stop directly outside'],
    placementSummary: {
      overallRate: 96,
      medianLpa: 12.5,
      highestLpa: 48.0,
      topCompanies: ['Microsoft', 'WorkIndia', 'Barclays', 'Morgan Stanley', 'JPMC']
    },
    safetyFeatures: ['Sprawling lush green Bhavans educational complex', 'High police vigilance zone', 'Proctorial system for student tracking'],
    antiRaggingContact: '022-26707440 / principal@spit.ac.in'
  },
  {
    id: 'walchand-sangli',
    name: 'Walchand College of Engineering',
    shortCode: 'WCE Sangli',
    location: 'Vishrambag, Sangli',
    affiliation: 'Autonomous State Govt-Aided (Shivaji University)',
    type: 'Govt-Aided Autonomous',
    established: 1947,
    naacGrade: 'A',
    nirfRank: 140,
    campusAcres: 90,
    branches: [
      { name: 'Computer Science & Engineering', intake: 120, openCutoff: 98.9, obcCutoff: 98.1, scCutoff: 94.2, tfwsCutoff: 99.3, avgLpa: 11.5 },
      { name: 'Information Technology', intake: 60, openCutoff: 98.4, obcCutoff: 97.5, scCutoff: 93.0, tfwsCutoff: 98.9, avgLpa: 10.8 },
      { name: 'Electronics Engineering', intake: 60, openCutoff: 96.8, obcCutoff: 95.2, scCutoff: 88.5, tfwsCutoff: 97.8, avgLpa: 8.5 },
      { name: 'Mechanical Engineering', intake: 60, openCutoff: 94.5, obcCutoff: 92.8, scCutoff: 84.1, tfwsCutoff: 96.0, avgLpa: 7.8 },
      { name: 'Civil Engineering', intake: 60, openCutoff: 91.2, obcCutoff: 88.4, scCutoff: 80.2, tfwsCutoff: 93.5, avgLpa: 6.5 }
    ],
    annualTuitionFee: 78000,
    developmentFee: 15000,
    hostelFeeAnnual: 22000,
    hostelCurfew: '9:00 PM',
    hostelSecurity: '90-acre gated residential campus, on-campus faculty quarters, 24/7 security patrol',
    messQualityRating: 4.5,
    transportBusRoutes: ['Vishrambag Railway Station (500m)', 'Sangli MSRTC Central Bus Stand (3 km)', 'Miraj Junction connecting Hubli/Pune railway (6 km)'],
    placementSummary: {
      overallRate: 91,
      medianLpa: 8.8,
      highestLpa: 38.0,
      topCompanies: ['TCS Digital', 'Infosys', 'Atlas Copco', 'Cummins India', 'John Deere', 'Persistent']
    },
    safetyFeatures: ['Fully residential campus', 'Tight warden supervision', 'Hospital adjacent to campus (Civil Hospital Sangli)'],
    antiRaggingContact: '0233-2228860 / director@walchandsangli.ac.in'
  },
  {
    id: 'cummins-pune',
    name: 'MKSSS Cummins College of Engineering for Women',
    shortCode: 'Cummins Pune (All Girls)',
    location: 'Karve Nagar, Pune',
    affiliation: 'Autonomous (SPPU affiliated, Maharshi Karve Stree Shikshan Samstha)',
    type: 'Autonomous All-Women Institution',
    established: 1991,
    naacGrade: 'A+',
    campusAcres: 12,
    branches: [
      { name: 'Computer Engineering', intake: 180, openCutoff: 98.6, obcCutoff: 97.4, scCutoff: 92.5, tfwsCutoff: 99.1, avgLpa: 12.2 },
      { name: 'Information Technology', intake: 120, openCutoff: 97.9, obcCutoff: 96.5, scCutoff: 90.8, tfwsCutoff: 98.6, avgLpa: 11.4 },
      { name: 'Electronics & Telecommunication', intake: 180, openCutoff: 95.8, obcCutoff: 93.6, scCutoff: 85.2, tfwsCutoff: 97.1, avgLpa: 9.2 },
      { name: 'Mechanical Engineering', intake: 60, openCutoff: 88.5, obcCutoff: 84.0, scCutoff: 74.0, tfwsCutoff: 91.0, avgLpa: 7.5 }
    ],
    annualTuitionFee: 138000,
    developmentFee: 21000,
    hostelFeeAnnual: 58000,
    hostelCurfew: '8:30 PM (Parents sent automatic SMS on exit/entry)',
    hostelSecurity: 'Highest level female security, female warden on every floor, CCTV cameras in public zones, on-campus health clinic',
    messQualityRating: 4.6,
    transportBusRoutes: ['Dedicated MKSSS fleet covering 25+ Pune & PCMC routes', 'Karve Road BRTS (500m)', 'Vanaz Metro station (2 km)'],
    placementSummary: {
      overallRate: 94,
      medianLpa: 9.6,
      highestLpa: 43.0,
      topCompanies: ['Cummins India', 'Salesforce', 'Microsoft', 'Citi', 'Mercedes-Benz', 'Schneider Electric']
    },
    safetyFeatures: ['100% dedicated to female education & empowerment', 'Secure residential enclosure', 'Full time psychologist & female doctor'],
    antiRaggingContact: '020-25477211 / principal@cumminscollege.in'
  },
  {
    id: 'vit-pune',
    name: 'Vishwakarma Institute of Technology (VIT Pune)',
    shortCode: 'VIT Bibwewadi Pune',
    location: 'Bibwewadi, Pune',
    affiliation: 'Autonomous Private (Bansilal Ramnath Agarwal Charitable Trust)',
    type: 'Autonomous Private',
    established: 1983,
    naacGrade: 'A++',
    campusAcres: 17,
    branches: [
      { name: 'Computer Engineering', intake: 240, openCutoff: 98.8, obcCutoff: 97.9, scCutoff: 93.5, tfwsCutoff: 99.2, avgLpa: 11.8 },
      { name: 'Artificial Intelligence & Data Science', intake: 180, openCutoff: 98.2, obcCutoff: 97.1, scCutoff: 91.8, tfwsCutoff: 98.9, avgLpa: 11.2 },
      { name: 'Information Technology', intake: 180, openCutoff: 98.4, obcCutoff: 97.3, scCutoff: 92.2, tfwsCutoff: 99.0, avgLpa: 11.0 },
      { name: 'Electronics & Telecommunication', intake: 180, openCutoff: 96.5, obcCutoff: 94.8, scCutoff: 87.5, tfwsCutoff: 97.8, avgLpa: 8.8 }
    ],
    annualTuitionFee: 152000,
    developmentFee: 24000,
    hostelFeeAnnual: 68000,
    hostelCurfew: '9:30 PM',
    hostelSecurity: 'Gated campus, digital card access, private security team',
    messQualityRating: 4.2,
    transportBusRoutes: ['Swargate Bus Terminal (3 km)', 'Market Yard route bus', 'VIT dedicated bus routes across Katraj and Kothrud'],
    placementSummary: {
      overallRate: 90,
      medianLpa: 9.0,
      highestLpa: 44.0,
      topCompanies: ['NVIDIA', 'Siemens', 'Cognizant', 'Accenture', 'ZS Associates', 'TCS']
    },
    safetyFeatures: ['Active mentor committee', 'Zero tolerance anti-ragging squad', 'CCTV coverage'],
    antiRaggingContact: '020-24202180 / antiragging@vit.edu'
  }
];

export const MANDATORY_DOCUMENTS: DocumentItem[] = [
  {
    id: 'ssc-marksheet',
    name: 'SSC (Class 10th) Marksheet & Passing Certificate',
    nameMr: '१० वी गुणपत्रिका व उत्तीर्ण प्रमाणपत्र',
    nameHi: '१०वीं अंकतालिका व उत्तीर्ण प्रमाण पत्र',
    categoryApplicable: ['OPEN', 'OBC', 'EWS', 'TFWS', 'SC', 'ST', 'VJ/NT', 'SBC', 'PwD'],
    isMandatory: true,
    description: 'Verifies date of birth, mother name, and basic secondary school qualification.',
    issuingAuthority: 'State Board (MSBSHSE) / CBSE / ICSE',
    validityRequirement: 'Original + 3 attested xerox copies. No expiry date.',
    alternativeIfMissing: 'DigiLocker verified digital marksheet accepted for e-scrutiny; original required at institute reporting.',
    stageNeeded: 'Registration / Scrutiny'
  },
  {
    id: 'hsc-marksheet',
    name: 'HSC (Class 12th) Marksheet & Passing Certificate',
    nameMr: '१२ वी गुणपत्रिका व उत्तीर्ण प्रमाणपत्र',
    nameHi: '१२वीं अंकतालिका व उत्तीर्ण प्रमाण पत्र',
    categoryApplicable: ['OPEN', 'OBC', 'EWS', 'TFWS', 'SC', 'ST', 'VJ/NT', 'SBC', 'PwD'],
    isMandatory: true,
    description: 'Mandatory proof of 45% aggregate in Physics + Mathematics + Chemistry/CS for OPEN; 40% for Reserved categories.',
    issuingAuthority: 'State Board / CBSE / ISC',
    validityRequirement: 'Original marksheet. Passing certificate required if issued separately.',
    alternativeIfMissing: 'Online web marksheet with school principal counter-signature accepted temporarily.',
    stageNeeded: 'Registration / Scrutiny'
  },
  {
    id: 'entrance-scorecard',
    name: 'MHT-CET / JEE Main Official Score Card',
    nameMr: 'MHT-CET / JEE गुणपत्रिका (Score Card)',
    nameHi: 'MHT-CET / JEE स्कोर कार्ड',
    categoryApplicable: ['OPEN', 'OBC', 'EWS', 'TFWS', 'SC', 'ST', 'VJ/NT', 'SBC', 'PwD'],
    isMandatory: true,
    description: 'Scorecard showing Subject-wise and Total Percentile score.',
    issuingAuthority: 'State Common Entrance Test Cell, Maharashtra / NTA',
    validityRequirement: 'Valid for current academic admission year only.',
    alternativeIfMissing: 'Candidate can download authenticated score card directly from mahacet.org.',
    stageNeeded: 'Registration / Scrutiny'
  },
  {
    id: 'domicile-certificate',
    name: 'Domicile & Nationality Certificate of Maharashtra State',
    nameMr: 'अधिवास व राष्ट्रीयत्व प्रमाणपत्र (Domicile & Nationality)',
    nameHi: 'अधिवास व राष्ट्रीयता प्रमाण पत्र',
    categoryApplicable: ['OPEN', 'OBC', 'EWS', 'TFWS', 'SC', 'ST', 'VJ/NT', 'SBC', 'PwD'],
    isMandatory: true,
    description: 'Proves Maharashtra State Candidature (Type A/B). School Leaving Certificate mentioning Nationality as "Indian" & Place of Birth in Maharashtra can also be accepted for Type A.',
    issuingAuthority: 'Executive Magistrate / Tehsildar / Sub-Divisional Officer (SDO)',
    validityRequirement: 'Lifetime validity. Barcode digital certificate issued through Aaple Sarkar portal.',
    alternativeIfMissing: 'Birth Certificate showing birth in Maharashtra + School Leaving Certificate mentioning Nationality: Indian.',
    stageNeeded: 'Registration / Scrutiny'
  },
  {
    id: 'caste-certificate',
    name: 'Caste Certificate (Valid for Maharashtra State)',
    nameMr: 'जातीचे प्रमाणपत्र (Caste Certificate)',
    nameHi: 'जाति प्रमाण पत्र',
    categoryApplicable: ['OBC', 'SC', 'ST', 'VJ/NT', 'SBC'],
    isMandatory: true,
    description: 'Certifies category issued strictly by Government of Maharashtra Competent Authority.',
    issuingAuthority: 'Sub-Divisional Officer (SDO) / Deputy Collector / District Magistrate',
    validityRequirement: 'Lifetime validity. Must mention correct Maharashtra Govt Resolution (GR). Central format alone is NOT valid for State quota.',
    alternativeIfMissing: 'If not available, candidate will be converted into OPEN category automatically.',
    stageNeeded: 'Registration / Scrutiny'
  },
  {
    id: 'caste-validity',
    name: 'Caste / Tribe Validity Certificate',
    nameMr: 'जात पडताळणी प्रमाणपत्र (Caste Validity)',
    nameHi: 'जाति वैधता प्रमाण पत्र',
    categoryApplicable: ['OBC', 'SC', 'ST', 'VJ/NT', 'SBC'],
    isMandatory: true,
    description: 'Mandatory statutory requirement under Maharashtra Act XXIII of 2001. No reserved seat can be claimed without this.',
    issuingAuthority: 'Divisional Caste Scrutiny Committee (Dr. Babasaheb Ambedkar Research & Training Institute - BARTI)',
    validityRequirement: 'Original Validity Certificate. Online verification QR code.',
    alternativeIfMissing: 'At registration: Scrutiny Committee Application Receipt + Form 16 undertaking. Must submit original before final round reporting, else converted to OPEN.',
    stageNeeded: 'Registration / Scrutiny'
  },
  {
    id: 'non-creamy-layer',
    name: 'Non-Creamy Layer Certificate (NCL)',
    nameMr: 'उन्नत व प्रगत गटात मोडत नसलेबाबतचे प्रमाणपत्र (NCL)',
    nameHi: 'नॉन क्रीमी लेयर प्रमाण पत्र',
    categoryApplicable: ['OBC', 'VJ/NT', 'SBC'],
    isMandatory: true,
    description: 'Proves family income is within 8 Lakhs/year limit for backward class quota reservations.',
    issuingAuthority: 'Tehsildar / Sub-Divisional Officer',
    validityRequirement: 'Must be explicitly valid up to 31st March of current financial year (e.g. 31/03/2027).',
    alternativeIfMissing: 'Application receipt + Proforma H undertaking at form filling, original mandatory before seat confirmation.',
    stageNeeded: 'Registration / Scrutiny'
  },
  {
    id: 'income-certificate',
    name: 'Tahsildar Income Certificate (FY 2025-26)',
    nameMr: 'तहसीलदार उत्पन्न प्रमाणपत्र (वार्षिक उत्पन्न)',
    nameHi: 'तहसीलदार आय प्रमाण पत्र',
    categoryApplicable: ['EWS', 'TFWS', 'OBC', 'VJ/NT', 'SBC', 'OPEN'],
    isMandatory: false,
    description: 'Required for claiming TFWS (Tuition Fee Waiver Scheme), EWS, EBC 50% tuition waiver, and hostel allowance.',
    issuingAuthority: 'Competent Revenue Officer / Tehsildar via Aaple Sarkar',
    validityRequirement: 'Must cover preceding financial year income. Strictly must be below ₹8,00,000 for EBC/TFWS.',
    alternativeIfMissing: 'Form 16 or IT return not accepted in lieu of Tahsildar Certificate for Mahadbt scholarships.',
    stageNeeded: 'Registration / Scrutiny'
  },
  {
    id: 'ews-eligibility',
    name: 'Economically Weaker Section (EWS) Eligibility Certificate',
    nameMr: 'आर्थिकदृष्ट्या दुर्बल घटक पात्रता प्रमाणपत्र (EWS)',
    nameHi: 'ईडब्ल्यूएस पात्रता प्रमाण पत्र',
    categoryApplicable: ['EWS'],
    isMandatory: true,
    description: 'Grants 10% supernumerary quota in Maharashtra State seats for General/Open category candidates.',
    issuingAuthority: 'District Magistrate / SDO / Tehsildar as per Proforma V',
    validityRequirement: 'Valid for current financial year.',
    alternativeIfMissing: 'Cannot claim EWS 10% quota; will be treated as General Open.',
    stageNeeded: 'Registration / Scrutiny'
  },
  {
    id: 'gap-certificate',
    name: 'Gap Certificate (If 1 or more years gap after 12th)',
    nameMr: 'गॅप सर्टिफिकेट (शैक्षणिक खंड प्रतिज्ञापत्र)',
    nameHi: 'गैप प्रमाण पत्र',
    categoryApplicable: ['OPEN', 'OBC', 'EWS', 'TFWS', 'SC', 'ST', 'VJ/NT', 'SBC', 'PwD'],
    isMandatory: false,
    description: 'Sworn affidavit explaining break in education (e.g., preparation for JEE/CET/NEET, medical reasons).',
    issuingAuthority: 'Notary Public / Executive Magistrate on ₹100 Stamp Paper',
    validityRequirement: 'Original affidavit mentioning academic year of gap and reason.',
    alternativeIfMissing: 'Only required if there is a break year between 12th passing and engineering admission.',
    stageNeeded: 'College Reporting'
  },
  {
    id: 'aadhaar-npci',
    name: 'Aadhaar Card Linked & NPCI Seeded with Bank Account',
    nameMr: 'आधार कार्ड व बँक खाते NPCI मॅपिंग',
    nameHi: 'आधार कार्ड व बैंक खाता NPCI सीडिंग',
    categoryApplicable: ['OPEN', 'OBC', 'EWS', 'TFWS', 'SC', 'ST', 'VJ/NT', 'SBC', 'PwD'],
    isMandatory: true,
    description: 'Mandatory for direct benefit transfer (DBT) scholarship disbursement into candidate’s own active savings account.',
    issuingAuthority: 'UIDAI & Bank Branch NPCI Portal',
    validityRequirement: 'Aadhaar name and mobile number must match admission portal records.',
    alternativeIfMissing: 'Can be linked at bank branch before applying on Mahadbt portal.',
    stageNeeded: 'College Reporting'
  }
];

export const SCHOLARSHIPS_DATABASE: ScholarshipScheme[] = [
  {
    id: 'ebc-rajarshi-shahu',
    name: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)',
    nameMr: 'राजर्षी छत्रपती शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती योजना (ईबीसी)',
    nameHi: 'राजर्षि छत्रपति शाहू महाराज शिक्षण शुल्क छात्रवृत्ति योजना (ईबीसी)',
    department: 'Directorate of Technical Education (DTE), Maharashtra',
    categories: ['OPEN', 'EWS'],
    maxIncomeLimit: 800000,
    benefitSummary: '50% Tuition Fee & 50% Exam Fee concession in Govt, Aided & Un-aided Private Colleges.',
    tuitionFeeConcession: '50% Waiver (e.g., If fee is ₹1,40,000, student pays ₹70,000)',
    hostelMaintenanceAllowance: 'Eligible for Panjabrao Deshmukh hostel scheme in parallel',
    eligibilityNotes: 'Candidature of Maharashtra, max 2 children in family beneficiary, minimum 50% attendance.',
    officialPortal: 'https://mahadbt.maharashtra.gov.in',
    deadlineNotice: 'Applications open after CAP Round 3 reporting; usually open till December 31.'
  },
  {
    id: 'panjabrao-deshmukh-hostel',
    name: 'Dr. Panjabrao Deshmukh Vasatigruh Nirvah Bhatta Yojna (Hostel Allowance)',
    nameMr: 'डॉ. पंजाबराव देशमुख वसतिगृह निर्वाह भत्ता योजना',
    nameHi: 'डॉ. पंजाबराव देशमुख छात्रावास निर्वाह भत्ता योजना',
    department: 'Higher & Technical Education Department',
    categories: ['OPEN', 'EWS', 'OBC', 'SBC'],
    maxIncomeLimit: 800000,
    benefitSummary: 'Cash maintenance allowance for students residing in registered hostel or rented flat away from home.',
    tuitionFeeConcession: 'Hostel specific (Combine with EBC tuition fee waiver)',
    hostelMaintenanceAllowance: '₹30,000/year (for Mumbai, Pune, Nagpur, Aurangabad) or ₹20,000/year for other districts',
    eligibilityNotes: 'Children of marginal landholder farmers or registered construction workers get top priority with ₹8 Lakh income slab.',
    officialPortal: 'https://mahadbt.maharashtra.gov.in',
    deadlineNotice: 'Requires registered rent agreement / hostel warden certificate + land ownership 7/12 extract if applicable.'
  },
  {
    id: 'tfws-scheme',
    name: 'Tuition Fee Waiver Scheme (TFWS 100% Tuition Exemption)',
    nameMr: 'शिक्षण शुल्क माफी योजना (TFWS १००% ट्यूशन फी सूट)',
    nameHi: 'ट्यूशन फीस छूट योजना (टीएफडब्ल्यूएस १००% छूट)',
    department: 'AICTE & State CET Cell Maharashtra',
    categories: ['TFWS', 'OPEN', 'OBC', 'EWS', 'SC', 'ST'],
    maxIncomeLimit: 800000,
    benefitSummary: '100% Tuition Fee completely waived for all 4 years of engineering in top colleges.',
    tuitionFeeConcession: '100% Tuition Fee ZERO. Student only pays Development Fee + Library/Gymkhana (~₹15k-₹25k).',
    hostelMaintenanceAllowance: 'Hostel and mess fees are payable as usual',
    eligibilityNotes: 'Allocated via CAP merit choice with "T" choice codes (e.g. 617524510T). 5% extra seats reserved over and above approved intake.',
    officialPortal: 'https://cetcell.mahacet.org',
    deadlineNotice: 'Must select TFWS: YES in CAP registration form and upload Tahsildar Income Certificate < 8 Lakhs.'
  },
  {
    id: 'obc-ebc-freeship',
    name: 'Post Matric Scholarship / Tuition Fees for OBC, VJNT & SBC',
    nameMr: 'इतर मागासवर्गीय (OBC/VJNT/SBC) शिक्षण शुल्क व परीक्षा शुल्क प्रतिपूर्ती',
    nameHi: 'अन्य पिछड़ा वर्ग (ओबीसी/वीजेएनटी) शिक्षण शुल्क प्रतिपूर्ति योजना',
    department: 'OBC, SEBC, VJNT & SBC Welfare Department',
    categories: ['OBC', 'VJ/NT', 'SBC'],
    maxIncomeLimit: 800000,
    benefitSummary: '50% Tuition Fee waiver for income between 1.5L - 8L; 100% Tuition + Exam Fee waiver for income <= 1.5 Lakhs.',
    tuitionFeeConcession: '50% to 100% Tuition Fee exemption depending on verified income bracket.',
    hostelMaintenanceAllowance: 'Monthly stipend of ₹1,000/month for hostellers.',
    eligibilityNotes: 'Requires valid Caste Certificate, Caste Validity, and current financial year Non-Creamy Layer.',
    officialPortal: 'https://mahadbt.maharashtra.gov.in',
    deadlineNotice: 'Renewal required in every academic year based on passing marks.'
  },
  {
    id: 'sc-st-post-matric',
    name: 'Government of India Post-Matric Scholarship for SC & ST Students',
    nameMr: 'भारत सरकार अनुसूचित जाती (SC) व अनुसूचित जमाती (ST) मॅट्रिकोत्तर शिष्यवृत्ती',
    nameHi: 'भारत सरकार अनुसूचित जाति (एससी) व जनजाति (एसटी) पोस्ट-मैट्रिक छात्रवृत्ति',
    department: 'Social Justice and Special Assistance / Tribal Development Department',
    categories: ['SC', 'ST'],
    maxIncomeLimit: 250000,
    benefitSummary: '100% Tuition Fee + 100% Development Fee + Maintenance Allowance + Book bank support.',
    tuitionFeeConcession: '100% Total College Fee Waived directly by Government to College account.',
    hostelMaintenanceAllowance: '₹1,200 to ₹1,500/month stipend + Swayam / Swadhar scheme allowance up to ₹51,000/year for hostel.',
    eligibilityNotes: 'Income up to 2.5L gets 100% scholarship. Income > 2.5L gets Freeship (100% tuition/development fee waiver without monthly stipend).',
    officialPortal: 'https://mahadbt.maharashtra.gov.in',
    deadlineNotice: 'Income certificate issued by competent authority + Caste Validity is strictly mandatory.'
  },
  {
    id: 'aicte-pragati-girls',
    name: 'AICTE Pragati Scholarship for Girl Students',
    nameMr: 'एआयसीटीई प्रगती शिष्यवृत्ती (मुलींसाठी विशेष ₹५०,००० प्रति वर्ष)',
    nameHi: 'एआईसीटीई प्रगति छात्रवृत्ति (छात्राओं हेतु ₹५०,००० प्रति वर्ष)',
    department: 'All India Council for Technical Education (Central Govt)',
    categories: ['OPEN', 'OBC', 'EWS', 'TFWS', 'SC', 'ST'],
    maxIncomeLimit: 800000,
    benefitSummary: '₹50,000 per annum for every year of study directly credited to girl student’s bank account for college fees, laptop, and books.',
    tuitionFeeConcession: 'Cash assistance ₹50,000 per year directly to student',
    hostelMaintenanceAllowance: 'Can be used towards hostel fees, stationery, and computer equipment',
    eligibilityNotes: 'Admitted to 1st year degree level in AICTE approved college. Max 2 girls per family. Family income < 8 LPA.',
    officialPortal: 'https://scholarships.gov.in (National Scholarship Portal)',
    deadlineNotice: 'Applications typically invite in August-October each year on National Scholarship Portal.'
  }
];

export const CAP_DEADLINES_SCHEDULE: AdmissionDeadline[] = [
  {
    id: 'd1-registration',
    phase: 'Phase 1: Registration',
    eventTitle: 'Online Registration & Document Uploading',
    eventTitleMr: 'ऑनलाईन अर्ज नोंदणी व कागदपत्रे अपलोड करणे',
    startDate: 'June 20, 2026',
    endDate: 'July 10, 2026',
    isUrgent: false,
    actionRequired: 'Fill candidate details, choose E-Scrutiny or Physical Scrutiny, and upload scanned original documents.',
    portalLink: 'https://fe2026.mahacet.org'
  },
  {
    id: 'd2-scrutiny',
    phase: 'Phase 2: Verification',
    eventTitle: 'Document Verification & Confirmation at Scrutiny Center (FC)',
    eventTitleMr: 'कागदपत्र पडताळणी व अर्ज निश्चितीकरण (स्क्रूटिनी केंद्र)',
    startDate: 'June 21, 2026',
    endDate: 'July 11, 2026',
    isUrgent: false,
    actionRequired: 'Ensure acknowledgement receipt is generated. In E-Scrutiny, check dashboard daily for any scrutiny discrepancy/rejection remarks.',
    portalLink: 'https://fe2026.mahacet.org',
    penaltyNotice: 'If unconfirmed by scrutiny center, candidate cannot participate in CAP rounds.'
  },
  {
    id: 'd3-provisional-merit',
    phase: 'Phase 3: Merit List',
    eventTitle: 'Display of Provisional Merit List (State & All India)',
    eventTitleMr: 'तात्पुरती गुणवत्ता यादी जाहीर (Provisional Merit List)',
    startDate: 'July 14, 2026',
    endDate: 'July 14, 2026',
    isUrgent: false,
    actionRequired: 'Check your State General Merit Number, Category Merit Number, and verified marks.',
    portalLink: 'https://fe2026.mahacet.org'
  },
  {
    id: 'd4-grievance',
    phase: 'Phase 4: Grievance',
    eventTitle: 'Submission of Grievances for Provisional Merit List',
    eventTitleMr: 'गुणवत्ता यादीतील त्रुटी व हरकती नोंदविणे (Grievances)',
    startDate: 'July 15, 2026',
    endDate: 'July 17, 2026',
    isUrgent: true,
    actionRequired: 'If marks, category, TFWS, gender, or domicile status is wrongly reflected, submit grievance with supporting proof online immediately.',
    portalLink: 'https://fe2026.mahacet.org',
    penaltyNotice: 'No correction permitted after final merit list under any circumstances.'
  },
  {
    id: 'd5-final-merit',
    phase: 'Phase 5: Final Merit',
    eventTitle: 'Display of Final Merit List & Seat Matrix for CAP Round 1',
    eventTitleMr: 'अंतिम गुणवत्ता यादी व रिक्त जागांचा तक्ता (Seat Matrix)',
    startDate: 'July 19, 2026',
    endDate: 'July 19, 2026',
    isUrgent: false,
    actionRequired: 'Download your final State Merit Number. Study Category-wise Seat Matrix before arranging option form choices.',
    portalLink: 'https://fe2026.mahacet.org'
  },
  {
    id: 'd6-cap1-options',
    phase: 'Phase 6: Option Form',
    eventTitle: 'Online Submission & Confirmation of Option Form for CAP Round 1',
    eventTitleMr: 'कॅप फेरी १ साठी पसंतीक्रम अर्ज भरणे व लॉक करणे',
    startDate: 'July 20, 2026',
    endDate: 'July 22, 2026',
    isUrgent: true,
    actionRequired: 'Fill minimum 1 and maximum 300 choices in decreasing preference order. Double-check choice 1 because allotment is Auto-Freeze!',
    portalLink: 'https://fe2026.mahacet.org',
    penaltyNotice: 'Unconfirmed / unlocked option form will not be considered for seat allotment.'
  },
  {
    id: 'd7-cap1-allotment',
    phase: 'Phase 7: Allotment',
    eventTitle: 'Display of Provisional Allotment of CAP Round 1',
    eventTitleMr: 'कॅप फेरी १ चे तात्पुरते जागा वाटप (CAP-1 Allotment)',
    startDate: 'July 25, 2026',
    endDate: 'July 25, 2026',
    isUrgent: false,
    actionRequired: 'Log in to portal, check allotted college and branch, download provisional allotment letter.',
    portalLink: 'https://fe2026.mahacet.org'
  },
  {
    id: 'd8-seat-acceptance',
    phase: 'Phase 8: Seat Acceptance',
    eventTitle: 'Online Seat Acceptance & Self-Verification (Freeze / Betterment)',
    eventTitleMr: 'जागा स्वीकृती निश्चित करणे (Freeze / Betterment व शुल्क भरणे)',
    startDate: 'July 26, 2026',
    endDate: 'July 29, 2026',
    isUrgent: true,
    actionRequired: 'Pay ₹1,000 non-refundable seat acceptance fee online. Choose "Freeze" to lock or "Not Freeze (Betterment)" to participate in CAP 2 while holding this seat.',
    portalLink: 'https://fe2026.mahacet.org',
    penaltyNotice: 'If seat acceptance fee is not paid within this window, allotted seat will be cancelled and candidate disqualified from CAP 2!'
  },
  {
    id: 'd9-reporting',
    phase: 'Phase 9: Reporting',
    eventTitle: 'Reporting to Allotted Institute for Admission & Fee Payment',
    eventTitleMr: 'वाटप झालेल्या महाविद्यालयात जाऊन मूळ कागदपत्रे व शुल्क जमा करणे',
    startDate: 'July 26, 2026',
    endDate: 'July 29, 2026',
    isUrgent: true,
    actionRequired: 'Visit the college in person with original documents, 3 photocopies, passport photos, and demand draft / online payment of fees.',
    portalLink: 'https://fe2026.mahacet.org'
  },
  {
    id: 'd10-cap2',
    phase: 'Phase 10: CAP Round 2',
    eventTitle: 'CAP Round 2 Option Form, Allotment & Reporting',
    eventTitleMr: 'कॅप फेरी २ प्रक्रिया (Option Form, वाटप व प्रवेश)',
    startDate: 'July 31, 2026',
    endDate: 'August 07, 2026',
    isUrgent: false,
    actionRequired: 'Students who opted for Betterment can reshuffle options for higher ranked colleges.',
    portalLink: 'https://fe2026.mahacet.org'
  }
];

export const EMERGENCY_SOLUTIONS: ProblemSolution[] = [
  {
    id: 'prob-payment-failed',
    topic: 'Payment & Fee Transactions',
    title: 'Payment Debited from Bank, but CET Portal says Unpaid / Failed',
    titleMr: 'बँकेतून पैसे कापले गेले परंतु पोर्टलवर "Unpaid" किंवा "Failed" दिसत आहे',
    iconName: 'CreditCard',
    urgency: 'high',
    summary: 'Bank server handshake timed out while returning transaction status to CET Cell gateway.',
    solutionSteps: [
      'Do NOT immediately make a second payment within 30 minutes! Often the bank reconciliation runs automatically.',
      'Log out, clear browser cookies, and log back in to CET Cell portal. Check the "Payment History" / "Check Transaction Status" button.',
      'Click the "Re-check with Bank Gateway" link if available on the payment receipt page.',
      'Check your bank SMS or netbanking statement for the 12-digit UTR or Reference Number (e.g. UPI / BillDesk / SBI ePay ref).',
      'If not updated after 24 hours, write an email to CET Cell Helpdesk (helpdesk@mahacet.org) with subject: "Payment Deduction Discrepancy - Application ID - UTR No" with bank debit screenshot.',
      'If deadline is ending within 2 hours, proceed with a fresh payment using a different card or UPI; double deducted money is auto-refunded to your source account within 5 to 7 working days.'
    ],
    helpline: 'State CET Cell Technical Support: 022-22016157 / 59 / 53',
    statutoryRuleRef: 'DTE Information Brochure - Clause 7: Payment Gateway Dispute Guidelines'
  },
  {
    id: 'prob-name-mismatch',
    topic: 'Identity & Marksheet Verification',
    title: 'Name Spelling Mismatch between Aadhaar Card and 10th/12th Marksheet',
    titleMr: 'आधार कार्ड आणि १२वी गुणपत्रिकेवरील नावाच्या स्पेलिंगमध्ये फरक असणे',
    iconName: 'FileCheck',
    urgency: 'medium',
    summary: 'Minor typo or father/surname order difference between school records and UIDAI Aadhaar database.',
    solutionSteps: [
      'The primary official benchmark for admission eligibility is ALWAYS your 10th (SSC) Passing Certificate.',
      'At registration time, enter your name EXACTLY as it appears on your SSC Marksheet, word for word.',
      'If Aadhaar has initials or swapped surname, upload a simple ₹100 Notarized "Affidavit for Name Clarification" stating that both names refer to one and the same person.',
      'In parallel, visit any nearby Aadhaar Seva Kendra (ASK) or post office to update your Aadhaar card name as per 10th marksheet; biometric update takes only 48-72 hours.',
      'Scrutiny Officers are instructed by CET Cell circular to NOT reject applications solely for minor order discrepancies if an affidavit or school leaving certificate matches.'
    ],
    helpline: 'UIDAI Aadhaar Helpline: 1947 | CET Scrutiny Grievance Desk',
    statutoryRuleRef: 'Government Resolution No. Sankirna-2016/CR-101/TE-4 on Name Consistency'
  },
  {
    id: 'prob-validity-pending',
    topic: 'Caste & Reservation Proof',
    title: 'Caste Validity / NCL Applied but Original Certificate Not Received Yet',
    titleMr: 'जात पडताळणी किंवा नॉन-क्रीमी लेयर अर्ज केला आहे पण मूळ प्रमाणपत्र मिळालेले नाही',
    iconName: 'AlertTriangle',
    urgency: 'high',
    summary: 'District Scrutiny Committee processing delay before the official cutoff date of CAP round confirmation.',
    solutionSteps: [
      'At the time of Online Application, upload the official "Acknowledgment Receipt / Token Number" issued by CCVIS / BARTI / Aaple Sarkar.',
      'Also download and upload "Proforma H" (Undertaking for submission of Caste Validity Certificate within stipulated deadline).',
      'The portal allows registration under your category based on receipt + undertaking.',
      'Visit the Divisional Caste Scrutiny Committee office in person with your Application ID and show your CAP Provisional Allotment letter to request expedited Tatkal clearance.',
      'CRITICAL WARNING: If you do not produce the original Caste Validity before the final cutoff reporting date of CAP Round 3, your category allotment will be cancelled and you will be converted into OPEN category for subsequent rounds.'
    ],
    helpline: 'BARTI Caste Scrutiny Helpdesk: 020-26333330 / 26343600',
    statutoryRuleRef: 'Maharashtra Act XXIII of 2001 & DTE Admission Rule 9(c)'
  },
  {
    id: 'prob-freeze-vs-betterment',
    topic: 'CAP Allotment Strategy',
    title: 'Confused between Auto-Freeze, Self-Freeze, and Betterment in CAP 1',
    titleMr: 'कॅप १ वाटपानंतर Auto-Freeze, Self-Freeze आणि Betterment यात कोणता पर्याय निवडावा?',
    iconName: 'HelpCircle',
    urgency: 'high',
    summary: 'Choosing the wrong seat acceptance action can cause unintentional seat loss or permanent locking.',
    solutionSteps: [
      '1. AUTO-FREEZE: If you are allotted your FIRST (Preference 1) choice, it is automatically FROZEN by the system. You HAVE to take admission in that college. You cannot participate in CAP Round 2 or 3.',
      '2. SELF-FREEZE: If you are allotted Preference 2 or below, and you are 100% satisfied with this college and do NOT want any other college, select "Self-Freeze", pay ₹1,000 seat acceptance fee, and report to the college to take final admission.',
      '3. NOT-FREEZE (BETTERMENT): If you are allotted Preference 2 or below, and you want to try for higher ranked colleges in CAP Round 2 while STILL SAFELY HOLDING this allotted seat: Select "Not Freeze (Betterment)", pay ₹1,000 seat acceptance fee online, and DO NOT report to college yet.',
      'Rule of Betterment: In CAP Round 2, if you get a higher choice, your Round 1 seat is cancelled automatically and given to another student. If you DO NOT get any higher choice in Round 2, your Round 1 seat remains 100% intact!'
    ],
    helpline: 'CET Cell Guidance Toll Free: 1800-209-0191',
    statutoryRuleRef: 'Rules of Admission for First Year Engineering - Regulation 10'
  },
  {
    id: 'prob-scrutiny-rejected',
    topic: 'Application Form Discrepancy',
    title: 'E-Scrutiny Officer Rejected Document / Marked Defect in Form',
    titleMr: 'ई-स्क्रूटिनी अधिकाऱ्याने कागदपत्र फेटाळले किंवा अर्जात त्रुटी काढली',
    iconName: 'FileX',
    urgency: 'high',
    summary: 'Blurry scan, missing stamp, wrong category certificate, or missing English translation.',
    solutionSteps: [
      'Immediately log in to your candidate portal and view the exact "Scrutiny Remarks" on your dashboard.',
      'Re-scan the original document in high resolution (minimum 200 DPI, color PDF, max 500 KB) using a flatbed scanner or CamScanner/Adobe Scan with good lighting.',
      'Click "Edit Application Form", navigate to the specific rejected document section, delete the old file and upload the clear copy.',
      'Click "Re-submit to Scrutiny Center" before 5:00 PM of the scrutiny deadline date.',
      'If the discrepancy cannot be solved online (e.g. signature dispute or category dispute), you have the right to switch your mode to "Physical Scrutiny" and visit the nearest Facilitation Center (FC) in person with original files.'
    ],
    helpline: 'FC Center Directorate Liaison: 022-22641150',
    statutoryRuleRef: 'DTE Standard Operating Procedure for Scrutiny Verification'
  }
];
