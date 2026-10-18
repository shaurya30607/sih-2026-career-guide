import { AssessmentQuestion } from './assessmentTypes';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Question 1: Participant Role
  {
    id: 'q_participant',
    category: 'participant',
    categoryLabel: {
      en: 'Family Context',
      mr: 'कौटुंबिक संदर्भ',
    },
    question: {
      en: 'Who is participating in this guidance session?',
      mr: 'या मार्गदर्शन सत्रात कोण सहभागी होत आहे?',
    },
    description: {
      en: 'We tailor the discussion prompts and questions according to who is exploring together.',
      mr: 'चर्चेचे मुद्दे आणि प्रश्न आपण कोण एकत्र चर्चा करत आहात यावर आधारित ठरवले जातात.',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'student',
        label: { en: 'Student', mr: 'विद्यार्थी (Student)' },
        description: {
          en: 'Exploring vocational training, hands-on skills, and first job pathways.',
          mr: 'प्रत्यक्ष कौशल्ये, तांत्रिक प्रशिक्षण आणि पहिल्या नोकरीचे पर्याय शोधत आहे.',
        },
      },
      {
        id: 'parent',
        label: { en: 'Parent or Guardian', mr: 'पालक किंवा पालक प्रतिनिधी (Parent)' },
        description: {
          en: 'Evaluating employment stability, income potential, and social respect for my child.',
          mr: 'पाल्यासाठी रोजगाराची स्थिरता, उत्पन्नाची शक्यता आणि सामाजिक सन्मान तपासत आहे.',
        },
      },
      {
        id: 'joint',
        label: { en: 'Student and Parent Together', mr: 'विद्यार्थी आणि पालक एकत्र (Family)' },
        description: {
          en: 'Making a joint decision by comparing practical skills, degrees, and family priorities.',
          mr: 'व्यावसायिक कौशल्ये, पदवी आणि कौटुंबिक गरजा यांची तुलना करून एकत्र निर्णय घेत आहोत.',
        },
      },
    ],
  },

  // Question 2: Education Level
  {
    id: 'q_education',
    category: 'education',
    categoryLabel: {
      en: 'Academic Background',
      mr: 'शैक्षणिक पार्श्वभूमी',
    },
    question: {
      en: "What is the student's current education level?",
      mr: 'विद्यार्थ्याचे सध्याचे शिक्षण काय आहे?',
    },
    description: {
      en: 'This helps filter certified NSQF vocational courses with matching eligibility criteria.',
      mr: 'यामुळे विद्यार्थ्याच्या पात्रतेनुसार योग्य NCVET/NSQF कोर्सेस निवडता येतात.',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'class_8_10',
        label: { en: 'Studying in Class 8–10', mr: 'इयत्ता ८ वी ते १० वी मध्ये शिकत आहे' },
      },
      {
        id: 'completed_10',
        label: { en: 'Completed Class 10 (SSC)', mr: '१० वी उत्तीर्ण (SSC Passed)' },
      },
      {
        id: 'studying_11_12',
        label: { en: 'Studying in Class 11–12', mr: 'इयत्ता ११ वी किंवा १२ वी मध्ये शिकत आहे' },
      },
      {
        id: 'completed_12',
        label: { en: 'Completed Class 12 (HSC)', mr: '१२ वी उत्तीर्ण (HSC Passed)' },
      },
      {
        id: 'iti_vocational',
        label: { en: 'ITI or Vocational Certificate', mr: 'आयटीआय (ITI) किंवा व्यावसायिक प्रमाणपत्र' },
      },
      {
        id: 'diploma',
        label: { en: 'Polytechnic Diploma', mr: 'पॉलिटेक्निक डिप्लोमा (Diploma Holder)' },
      },
      {
        id: 'graduate',
        label: { en: 'College Graduate (BA / B.Sc / B.Com)', mr: 'पदवीधर (Graduate)' },
      },
      {
        id: 'other_edu',
        label: { en: 'Other Education Background', mr: 'इतर शैक्षणिक पार्श्वभूमी' },
      },
    ],
  },

  // Question 3: Career Areas of Interest
  {
    id: 'q_interests',
    category: 'interests',
    categoryLabel: {
      en: 'Career Sectors',
      mr: 'आवडीची क्षेत्रे',
    },
    question: {
      en: 'Which vocational career areas interest the student?',
      mr: 'विद्यार्थ्याला कोणत्या व्यावसायिक क्षेत्रांमध्ये रस आहे?',
    },
    description: {
      en: 'Select one or more sectors. We will highlight courses aligned with these technical streams.',
      mr: 'एक किंवा अनेक क्षेत्रे निवडा. आम्ही या क्षेत्रांनुसार उपलब्ध कोर्सेस सुचवू.',
    },
    responseType: 'multiple_choice',
    required: true,
    options: [
      {
        id: 'automotive',
        streamKey: 'automotive',
        label: { en: 'Electric Vehicles & Auto Tech', mr: 'इलेक्ट्रिक वाहने आणि ऑटोमोबाईल तंत्रज्ञान' },
        description: { en: 'EV powertrain, battery BMS, motor diagnostics', mr: 'ईव्ही बॅटरी, मोटर आणि कंट्रोलर दुरुस्ती' },
      },
      {
        id: 'renewable_energy',
        streamKey: 'renewable_energy',
        label: { en: 'Solar & Renewable Energy', mr: 'सौर ऊर्जा आणि हरित तंत्रज्ञान' },
        description: { en: 'Rooftop solar PV, inverter wiring, grid synchronization', mr: 'सोलर पॅनल उभारणी आणि इन्व्हर्टर वायरिंग' },
      },
      {
        id: 'healthcare',
        streamKey: 'healthcare',
        label: { en: 'Healthcare & Patient Care', mr: 'आरोग्यसेवा आणि रुग्ण सहाय्यक' },
        description: { en: 'General Duty Assistant, vitals monitoring, hospital safety', mr: 'हॉस्पिटल केअर, प्राथमिक उपचार आणि रुग्णसेवा' },
      },
      {
        id: 'it_tech',
        streamKey: 'it_tech',
        label: { en: 'Information Technology & Software', mr: 'माहिती तंत्रज्ञान आणि वेब डेव्हलपमेंट' },
        description: { en: 'Front-end web development, JavaScript, UI integration', mr: 'वेबसाईट तयार करणे, कोडिंग आणि डिजिटल कौशल्ये' },
      },
      {
        id: 'manufacturing_engineering',
        streamKey: 'manufacturing_engineering',
        label: { en: 'Precision Manufacturing & CNC', mr: 'उत्पादन आणि सीएनसी मशिनिंग' },
        description: { en: 'CNC turning, milling, G-code programming, tooling', mr: 'सीएनसी मशिन ऑपरेटिंग आणि औद्योगिक उत्पादन' },
      },
      {
        id: 'agriculture_allied',
        streamKey: 'agriculture_allied',
        label: { en: 'Agricultural Tech & Drone Sensing', mr: 'कृषी तंत्रज्ञान आणि ड्रोन फवारणी' },
        description: { en: 'DGCA certified drone flying, precision crop mapping', mr: 'शेतीसाठी ड्रोन पायलट आणि आधुनिक तंत्रज्ञान' },
      },
      {
        id: 'unsure_sector',
        label: { en: 'Not sure yet (Help us discover)', mr: 'अजून निश्चित नाही (योग्य दिशा दाखवा)' },
        description: { en: 'Recommend courses based on aptitude and market demand', mr: 'बाजारातील मागणीनुसार सर्वोत्तम कोर्सेस दाखवा' },
      },
    ],
  },

  // Question 4: Decision Priorities (Max 3)
  {
    id: 'q_priorities',
    category: 'priorities',
    categoryLabel: {
      en: 'Family Priorities',
      mr: 'प्राधान्यक्रम',
    },
    question: {
      en: 'What matters most when choosing a vocational career or course?',
      mr: 'करिअर किंवा कोर्स निवडताना तुमच्यासाठी सर्वाधिक महत्त्वाचे काय आहे?',
    },
    description: {
      en: 'Select up to 3 primary priorities that guide your decision.',
      mr: 'तुमच्या निर्णयाला दिशा देणारे सर्वाधिक ३ महत्त्वाचे पर्याय निवडा.',
    },
    responseType: 'multiple_choice',
    maxSelections: 3,
    required: true,
    options: [
      {
        id: 'job_quickly',
        label: { en: 'Getting a job quickly (within 6–9 months)', mr: 'लवकरात लवकर नोकरी मिळणे (६-९ महिन्यांत)' },
      },
      {
        id: 'job_stability',
        label: { en: 'Stable, long-term employment', mr: 'कायमस्वरूपी आणि सुरक्षित रोजगार' },
      },
      {
        id: 'earning_potential',
        label: { en: 'High earning potential and fast wage growth', mr: 'चांगला पगार आणि वेगाने पगारवाढ' },
      },
      {
        id: 'low_fees',
        label: { en: 'Low course fees and affordable training', mr: 'कमी फी आणि सरकारी शिष्यवृत्ती' },
      },
      {
        id: 'interest_enjoyment',
        label: { en: 'Student genuine interest and practical aptitude', mr: 'विद्यार्थ्याची खरी आवड आणि कामातील आनंद' },
      },
      {
        id: 'further_study',
        label: { en: 'Opportunities for further study (B.Voc / Diploma)', mr: 'पुढे पदवी (B.Voc/डिप्लोमा) घेण्याची संधी' },
      },
      {
        id: 'family_expectations',
        label: { en: 'Meeting family and community expectations', mr: 'कुटुंबाच्या अपेक्षा आणि सामाजिक प्रतिष्ठा' },
      },
      {
        id: 'near_home',
        label: { en: 'Training and working near home district', mr: 'घराजवळ किंवा स्वतःच्या जिल्ह्यात काम' },
      },
    ],
  },

  // Question 5: Student Confidence (Rating Scale 1 to 5)
  {
    id: 'q_confidence',
    category: 'confidence',
    categoryLabel: {
      en: 'Confidence Level',
      mr: 'आत्मविश्वास पातळी',
    },
    question: {
      en: 'How confident does the student feel about choosing a career path right now?',
      mr: 'करिअरचा मार्ग निवडण्याबाबत विद्यार्थ्याला सध्या किती आत्मविश्वास वाटतो?',
    },
    description: {
      en: 'Every student starts somewhere. Honest ratings help us frame realistic discussion steps.',
      mr: 'प्रत्येक विद्यार्थ्याची सुरुवात वेगळी असते. योग्य रेटिंगमुळे संभाषणाला योग्य दिशा मिळते.',
    },
    responseType: 'rating_scale',
    required: true,
    ratingConfig: {
      min: 1,
      max: 5,
      labels: {
        1: { en: 'Completely undecided', mr: 'अजून काहीच ठरले नाही' },
        2: { en: 'Exploring ideas', mr: 'पर्यायांचा विचार सुरू आहे' },
        3: { en: 'Moderately confident', mr: 'काही स्पष्टता आहे' },
        4: { en: 'Mostly decided', mr: 'जवळपास निश्चित' },
        5: { en: 'Very clear & ready', mr: 'पूर्णपणे ठाम व तयार' },
      },
    },
  },

  // Question 6: Family's Principal Concern
  {
    id: 'q_concern',
    category: 'concerns',
    categoryLabel: {
      en: 'Core Concern',
      mr: 'मुख्य चिंता',
    },
    question: {
      en: "What is the family's biggest question or concern about vocational education?",
      mr: 'व्यावसायिक शिक्षणाबाबत कुटुंबाच्या मनात सर्वाधिक मोठी शंका किंवा चिंता कोणती आहे?',
    },
    description: {
      en: 'We will ask one targeted follow-up question next to address this specific worry directly.',
      mr: 'या शंकेचे निरसन करण्यासाठी पुढील प्रश्न थेट या विषयावर विचारला जाईल.',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'employment',
        label: { en: 'Will this course genuinely lead to a verified job?', mr: 'या कोर्सनंतर खरंच खात्रीशीर नोकरी मिळेल का?' },
        description: { en: 'Placement verification, campus interviews, apprentice contracts', mr: 'प्लेसमेंटची वस्तुस्थिती आणि कॅम्पस मुलाखती' },
      },
      {
        id: 'earnings',
        label: { en: 'Will starting earnings be sufficient for the family?', mr: 'सुरुवातीचा पगार कुटुंबाच्या गरजा पूर्ण करेल का?' },
        description: { en: 'Starting wages, overtime, and salary milestones over 3 years', mr: 'सुरुवातीचे मानधन आणि पुढील ३-४ वर्षांतील पगारवाढ' },
      },
      {
        id: 'stability',
        label: { en: 'Is this career stable in changing market conditions?', mr: 'बदलत्या बाजारात हे करिअर दीर्घकाळ स्थिर राहील का?' },
        description: { en: 'Permanent company roles, automation risk, sector growth', mr: 'कायमस्वरूपी काम आणि दीर्घकालीन मागणी' },
      },
      {
        id: 'social_respect',
        label: { en: 'Will relatives and society respect this trade?', mr: 'नातेवाईक आणि समाजात या कामाला मान-सन्मान मिळेल का?' },
        description: { en: 'Prestige of technician careers compared to general degrees', mr: 'पारंपरिक पदवीच्या तुलनेत तंत्रज्ञाचे सामाजिक स्थान' },
      },
      {
        id: 'recognition',
        label: { en: 'Is the course officially recognized by the government?', mr: 'हा कोर्स शासकीय स्तरावर (NCVET/NSDC) मान्यताप्राप्त आहे का?' },
        description: { en: 'NSQF certification levels, authorized training centers', mr: 'अधिकृत प्रमाणपत्र आणि राष्ट्रीय कौशल्य प्रमाण' },
      },
      {
        id: 'progression',
        label: { en: 'Can the student still earn a college degree or diploma later?', mr: 'पुढे जाऊन पदवी किंवा डिप्लोमा पूर्ण करता येईल का?' },
        description: { en: 'NEP credit mobility, lateral entry to engineering diplomas or B.Voc', mr: 'नवीन शैक्षणिक धोरणांतर्गत (NEP) पदवीचे दरवाजे उघडे राहणे' },
      },
      {
        id: 'affordability',
        label: { en: 'Course fees and family affordability', mr: 'कोर्सची फी आणि कुटुंबाची आर्थिक क्षमता' },
        description: { en: 'Tuition fees, hostel costs, and government fee subsidies', mr: 'प्रशिक्षण खर्च, शिष्यवृत्ती आणि सरकारी सवलती' },
      },
      {
        id: 'unsure_path',
        label: { en: 'We are simply unsure which career direction suits best', mr: 'कोणता मार्ग निवडावा याबद्दल संभ्रम आहे' },
        description: { en: 'Need a structured comparison of aptitude and options', mr: 'क्षमता आणि संधी यांची सविस्तर तुलना हवी आहे' },
      },
      {
        id: 'other_concern',
        label: { en: 'Other specific personal or family circumstance', mr: 'इतर कोणतीही वैयक्तिक किंवा कौटुंबिक अडचण' },
        description: { en: 'Describe in your own words in the next step', mr: 'पुढील पायरीवर स्वतःच्या शब्दांत सांगा' },
      },
    ],
  },

  // Question 7A: Adaptive Branch - Employment Evidence
  {
    id: 'q_deepdive_employment',
    category: 'deep_dive',
    categoryLabel: {
      en: 'Job Evidence Focus',
      mr: 'रोजगार पुरावा पडताळणी',
    },
    question: {
      en: 'What kind of employment evidence would give your family the most confidence?',
      mr: 'कोणता पुरावा पाहिल्यावर तुमच्या कुटुंबाला नोकरीबद्दल सर्वाधिक खात्री पटेल?',
    },
    description: {
      en: 'SkillSaathi highlights verified data attributes on accredited courses.',
      mr: 'स्किलसाथी अधिकृत कोर्सेसवरील पडताळणी केलेले तपशील ठळकपणे दर्शवते.',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'employment',
    options: [
      {
        id: 'campus_placement_history',
        label: { en: 'Documented campus placement history and hiring companies', mr: 'गेल्या वर्षांच्या कॅम्पस प्लेसमेंटचा प्रत्यक्ष रेकॉर्ड' },
      },
      {
        id: 'naps_apprenticeship',
        label: { en: 'Guaranteed NAPS government apprenticeship with monthly stipend', mr: 'शासकीय NAPS अप्रेंटिसशिप करार आणि मासिक विद्यावेतन' },
      },
      {
        id: 'alumni_interaction',
        label: { en: 'Speaking with alumni working in the industry today', mr: 'सध्या नोकरी करत असलेल्या जुन्या विद्यार्थ्यांशी संवाद' },
      },
      {
        id: 'mou_employers',
        label: { en: 'Signed MOUs between the training institute and manufacturers', mr: 'प्रशिक्षण संस्था आणि नामांकित कंपन्यांचे अधिकृत करार' },
      },
    ],
  },

  // Question 7B: Adaptive Branch - Earnings Preference
  {
    id: 'q_deepdive_earnings',
    category: 'deep_dive',
    categoryLabel: {
      en: 'Income Expectations',
      mr: 'उत्पन्नाची अपेक्षा',
    },
    question: {
      en: "What starting monthly income would satisfy your family's baseline expectation?",
      mr: 'सुरुवातीला दरमहा किती पगार मिळाल्यास कुटुंबाचे समाधान होईल?',
    },
    description: {
      en: 'Note: This captures your family preference to filter matching job outcomes; actual salaries vary by performance.',
      mr: 'नोंद: ही तुमची अपेक्षा नोंदवते; प्रत्यक्ष पगार कौशल्य व कंपनीनुसार बदलतो.',
    },
    responseType: 'numeric_range',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'earnings',
    numericConfig: {
      min: 12000,
      max: 40000,
      step: 1000,
      defaultValue: 18000,
      prefix: '₹',
      suffix: ' / month',
      minLabel: { en: '₹12,000 / mo', mr: '₹१२,००० / महिना' },
      maxLabel: { en: '₹40,000+ / mo', mr: '₹४०,०००+ / महिना' },
      helperText: {
        en: 'Certified NSQF Level 4–5 vocational technicians typically begin at ₹16,000–₹24,000/month.',
        mr: 'प्रमाणित NSQF स्तर ४-५ तंत्रज्ञांचा सुरुवातीचा पगार सामान्यतः ₹१६,००० ते ₹२४,००० असतो.',
      },
    },
  },

  // Question 7C: Adaptive Branch - Stability Focus
  {
    id: 'q_deepdive_stability',
    category: 'deep_dive',
    categoryLabel: {
      en: 'Job Stability Focus',
      mr: 'स्थिरतेचे स्वरूप',
    },
    question: {
      en: 'Which employment structure feels most secure to your family?',
      mr: 'कोणत्या प्रकारच्या नोकरीमध्ये तुमच्या कुटुंबाला सर्वाधिक सुरक्षितता वाटते?',
    },
    description: {
      en: 'Different sectors offer varied stability models—from OEM factory payroll to licensed independent contracting.',
      mr: 'विविध क्षेत्रांत स्थिरतेचे वेगवेगळे मार्ग असतात—कंपनी रोल ते अधिकृत स्वतंत्र व्यवसाय.',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'stability',
    options: [
      {
        id: 'large_private_oem',
        label: { en: 'Large manufacturing or technology company with PF and medical benefits', mr: 'मोठी नामांकित कंपनी (PF, विमा आणि सुरक्षित सेवा)' },
      },
      {
        id: 'psu_contract',
        label: { en: 'Government / PSU or municipal infrastructure maintenance contract', mr: 'शासकीय किंवा निमशासकीय पायाभूत सुविधा कंत्राट' },
      },
      {
        id: 'self_employed_workshop',
        label: { en: 'Independent technician service center / entrepreneurship', mr: 'स्वतःचे स्वतंत्र सर्व्हिस सेंटर किंवा व्यवसाय' },
      },
      {
        id: 'open_stability',
        label: { en: 'Any verified role with good safety standards and timely payment', mr: 'वेळेवर पगार आणि सुरक्षित कामाची हमी असणारा कोणताही मार्ग' },
      },
    ],
  },

  // Question 7D: Adaptive Branch - Social Respect
  {
    id: 'q_deepdive_social',
    category: 'deep_dive',
    categoryLabel: {
      en: 'Social Standing',
      mr: 'सामाजिक दृष्टिकोन',
    },
    question: {
      en: 'How does your family view vocational careers compared to general degrees (BA/B.Com)?',
      mr: 'पारंपरिक पदवीच्या तुलनेत व्यावसायिक शिक्षणाकडे आपले कुटुंब कसे पाहते?',
    },
    description: {
      en: 'Understanding community perceptions helps us provide factual talking points for relatives.',
      mr: 'नातेवाईक आणि समाजाशी सकारात्मक चर्चा करण्यासाठी योग्य माहिती येथे दिली जाईल.',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'social_respect',
    options: [
      {
        id: 'practical_early_earner',
        label: { en: 'Proud of early earning and real hands-on technical expertise', mr: 'कौशल्याच्या जोरावर स्वतःच्या पायावर लवकर उभे राहण्याचा अभिमान' },
        description: { en: 'Becoming economically self-reliant before peers in general degrees', mr: 'मित्रांच्या आधी आर्थिकदृष्ट्या स्वावलंबी बनणे' },
      },
      {
        id: 'wants_degree_title',
        label: { en: 'Family still prefers a formal degree title alongside skill training', mr: 'कौशल्यासोबतच पदवीचे नाव (B.Voc) असावे अशी कुटुंबाची इच्छा' },
        description: { en: 'B.Voc programs bridge this need by awarding UGC recognized degrees', mr: 'B.Voc पदवीमुळे कौशल्य आणि शासकीय पदवी दोन्ही मिळतात' },
      },
      {
        id: 'modern_tech_respect',
        label: { en: 'New fields (EV, Solar, IT, Drone) have modern respect in our community', mr: 'नवीन तंत्रज्ञान (EV, सोलर, ड्रोन) या क्षेत्रांना आज समाजात मोठा मान आहे' },
        description: { en: 'High-tech vocational careers are seen as forward-looking engineering trades', mr: 'या क्षेत्रांकडे आधुनिक तंत्रज्ञानाची नवी संधी म्हणून पाहिले जाते' },
      },
    ],
  },

  // Question 7E: Adaptive Branch - Recognition Details
  {
    id: 'q_deepdive_recognition',
    category: 'deep_dive',
    categoryLabel: {
      en: 'Official Recognition',
      mr: 'शासकीय मान्यता',
    },
    question: {
      en: 'Which accreditation checks are most important for your family?',
      mr: 'शासकीय मान्यतेबाबत कोणत्या गोष्टी तपासणे आपल्यासाठी सर्वात महत्त्वाचे आहे?',
    },
    description: {
      en: 'SkillSaathi strictly marks official NCVET government alignment on every course.',
      mr: 'स्किलसाथी प्रत्येक कोर्सवर NCVET शासकीय मान्यतेचे स्पष्ट लेबल लावते.',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'recognition',
    options: [
      {
        id: 'ncvet_nsqf_badge',
        label: { en: 'National Council for Vocational Education and Training (NCVET) certificate', mr: 'NCVET राष्ट्रीय कौशल्य प्रमाणपत्र' },
      },
      {
        id: 'sector_skill_council',
        label: { en: 'Industry Sector Skill Council (e.g., ASDC for EV, SCGJ for Solar)', mr: 'संबंधित उद्योग कौशल्य परिषद (उदा. ऑटोमोटिव्ह किंवा ग्रीन जॉब्स कौन्सिल)' },
      },
      {
        id: 'university_credits',
        label: { en: 'University recognized academic credits for future degree entry', mr: 'विद्यापीठाशी संलग्न क्रेडिट्स ज्यामुळे पुढील पदवी प्रवेश सुलभ होतो' },
      },
      {
        id: 'all_verified',
        label: { en: 'All official government and industry credentials verified together', mr: 'शासकीय आणि औद्योगिक सर्व प्रकारच्या मान्यता एकाच ठिकाणी हव्यात' },
      },
    ],
  },

  // Question 7F: Adaptive Branch - Academic Progression
  {
    id: 'q_deepdive_progression',
    category: 'deep_dive',
    categoryLabel: {
      en: 'Higher Studies Mobility',
      mr: 'पुढील शिक्षणाचा मार्ग',
    },
    question: {
      en: 'Which higher educational pathway would you like to keep open after this certificate?',
      mr: 'हे प्रमाणपत्र पूर्ण केल्यानंतर पुढील शिक्षणाचा कोणता मार्ग खुला ठेवू इच्छिता?',
    },
    description: {
      en: 'NEP 2020 frameworks allow seamless credit transfers from certificate to degree.',
      mr: 'नवीन शैक्षणिक धोरणानुसार (NEP) प्रमाणपत्रातून पदवीत सहज प्रवेश घेता येतो.',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'progression',
    options: [
      {
        id: 'polytechnic_lateral',
        label: { en: 'Direct lateral entry into 2nd year of Polytechnic Diploma', mr: 'पॉलिटेक्निक डिप्लोमाच्या दुसऱ्या वर्षात थेट प्रवेश' },
      },
      {
        id: 'bvoc_degree',
        label: { en: 'Bachelor of Vocation (B.Voc) degree with work-integrated credits', mr: 'कामासह शिकण्याची बी.व्होक (B.Voc) पदवी' },
      },
      {
        id: 'advanced_specialization',
        label: { en: 'Advanced technical certifications (PLC, EV battery design, DGCA license)', mr: 'पुढील प्रगत तांत्रिक विशेषीकरण (उदा. प्रगत कोडिंग किंवा ड्रोन परवाना)' },
      },
      {
        id: 'undecided_progression',
        label: { en: 'Not decided yet; want flexibility to choose later', mr: 'अजून निश्चित नाही; नंतर निर्णय घेण्याची मुभा हवी आहे' },
      },
    ],
  },

  // Question 7G: Adaptive Branch - Affordability Budget
  {
    id: 'q_deepdive_affordability',
    category: 'deep_dive',
    categoryLabel: {
      en: 'Training Budget',
      mr: 'प्रशिक्षण बजेट',
    },
    question: {
      en: "What is the family's comfortable budget for this vocational training?",
      mr: 'या व्यावसायिक प्रशिक्षणासाठी कुटुंबाचे बजेट किती आहे?',
    },
    description: {
      en: 'Many courses offer PMKVY or state government fee subsidies for eligible students.',
      mr: 'अनेक कोर्सेसमध्ये सरकारी योजनांतर्गत मोफत किंवा सवलतीच्या दरात शिक्षण मिळते.',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'affordability',
    options: [
      {
        id: 'govt_subsidized_free',
        label: { en: 'Government subsidized or 100% scholarship funded', mr: 'शासकीय सवलत किंवा पूर्ण मोफत शिष्यवृत्ती' },
      },
      {
        id: 'under_15000',
        label: { en: 'Under ₹15,000 total course fee', mr: '₹१५,००० पेक्षा कमी एकूण फी' },
      },
      {
        id: '15000_30000',
        label: { en: '₹15,000 to ₹30,000 with installment options', mr: '₹१५,००० ते ₹३०,००० (हप्त्यांची सोय असल्यास)' },
      },
      {
        id: 'flexible_if_placed',
        label: { en: 'Flexible if industry placement is strongly supported', mr: 'चांगल्या नोकरीची हमी असल्यास फी जास्त असली तरी चालेल' },
      },
    ],
  },

  // Question 7H: Adaptive Branch - Unsure / Other Concern Text Area
  {
    id: 'q_deepdive_other',
    category: 'deep_dive',
    categoryLabel: {
      en: 'Personal Concern Details',
      mr: 'वैयक्तिक शंकेचे स्वरूप',
    },
    question: {
      en: 'Please share a brief note about what makes your family hesitant or uncertain.',
      mr: 'आपल्या कुटुंबाला नक्की कोणत्या गोष्टीबद्दल संभ्रम वाटतो ते थोडक्यात सांगा.',
    },
    description: {
      en: 'This helps us provide tailored discussion guidance. Please do not enter sensitive personal data.',
      mr: 'यामुळे अधिक योग्य मार्गदर्शन करता येईल. कृपया कोणतीही गोपनीय माहिती टाकू नका.',
    },
    responseType: 'free_text',
    required: false,
    isApplicable: (answers) => answers.q_concern === 'unsure_path' || answers.q_concern === 'other_concern',
    placeholder: {
      en: 'For example: "We want to know if relatives will judge this work" or "Student wants to work in solar but father prefers banking"...',
      mr: 'उदा. "विद्यार्थ्याला सोलरमध्ये जायचे आहे पण घरच्यांना बँकेतील नोकरी हवी आहे" किंवा "कमी वयात नोकरी करणे योग्य आहे का?"...',
    },
  },

  // Question 8: Learning Style
  {
    id: 'q_learning_style',
    category: 'learning_style',
    categoryLabel: {
      en: 'Learning Preference',
      mr: 'शिकण्याची पद्धत',
    },
    question: {
      en: 'What kind of learning environment suits the student best?',
      mr: 'विद्यार्थ्याला कोणत्या पद्धतीचे शिक्षण सर्वात सोपे आणि आवडीचे वाटते?',
    },
    description: {
      en: 'Vocational courses are heavily weighted toward physical practice and equipment handling.',
      mr: 'व्यावसायिक अभ्यासक्रम प्रामुख्याने प्रत्यक्ष काम आणि प्रॅक्टिकलवर आधारित असतात.',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'mostly_hands_on',
        label: { en: 'Mostly practical, hands-on workshop learning (70%+ lab work)', mr: 'प्रामुख्याने प्रत्यक्ष प्रॅक्टिकल, वर्कशॉप आणि मशिनवर काम (७०%+ प्रॅक्टिकल)' },
        description: { en: 'Enjoys building, repairing, wiring, coding, or handling equipment', mr: 'गोष्टी जोडणे, दुरुस्त करणे, कोड लिहिणे किंवा मशिन हाताळणे आवडते' },
      },
      {
        id: 'balanced_mix',
        label: { en: 'A balanced mix of technical theory and practical training', mr: 'तांत्रिक थिअरी आणि प्रॅक्टिकलचे समतोल मिश्रण' },
        description: { en: 'Likes understanding circuit diagrams, standards, and workshop execution', mr: 'नियम, डायग्राम समजून घेऊन प्रत्यक्ष काम करणे' },
      },
      {
        id: 'mostly_classroom',
        label: { en: 'Mostly structured classroom lectures and textbook learning', mr: 'प्रामुख्याने वर्गातील व्याख्याने आणि पुस्तकी अभ्यास' },
        description: { en: 'May prefer conventional university degrees or hybrid diplomas', mr: 'पारंपरिक पदवी किंवा थिअरी अभ्यासक्रमांकडे ओढा' },
      },
      {
        id: 'unsure_learning',
        label: { en: 'Not sure yet (Open to trying practical workshop sessions)', mr: 'अजून निश्चित नाही (वर्कशॉपमध्ये प्रत्यक्ष अनुभव घेऊन ठरवू)' },
      },
    ],
  },

  // Question 9: Preferred Work Environment
  {
    id: 'q_environment',
    category: 'environment',
    categoryLabel: {
      en: 'Work Setting',
      mr: 'कामाचे वातावरण',
    },
    question: {
      en: 'What daily work or training environment would the student enjoy most?',
      mr: 'विद्यार्थ्याला कोणत्या प्रकारच्या कामाच्या वातावरणात काम करायला आवडेल?',
    },
    description: {
      en: 'Choose up to 2 preferred environments.',
      mr: 'कमाल २ पसंतीची वातावरण निवडा.',
    },
    responseType: 'multiple_choice',
    maxSelections: 2,
    required: true,
    options: [
      {
        id: 'workshop_plant',
        label: { en: 'Industrial workshop, auto service bay, or manufacturing plant', mr: 'औद्योगिक वर्कशॉप, ऑटोमोबाईल सर्व्हिस सेंटर किंवा फॅक्टरी' },
      },
      {
        id: 'outdoor_fieldwork',
        label: { en: 'Outdoor field site, rooftop installations, agricultural farm', mr: 'खुल्या जागेत किंवा शेतात प्रत्यक्ष काम, सोलर रूफटॉप' },
      },
      {
        id: 'healthcare_hospital',
        label: { en: 'Hospital ward, diagnostic lab, or medical clinic', mr: 'हॉस्पिटल, क्लिनिक किंवा रुग्णालय' },
      },
      {
        id: 'office_digital',
        label: { en: 'Office workstation, computer lab, or software desk', mr: 'ऑफिस, कम्प्युटर लॅब किंवा डिजिटल डेस्क' },
      },
      {
        id: 'customer_service',
        label: { en: 'Customer-facing technical advisor or direct client consulting', mr: 'थेट ग्राहकांशी संवाद साधून समस्या सोडवणे' },
      },
      {
        id: 'self_employment',
        label: { en: 'Own independent shop, workshop, or mobile repair service', mr: 'स्वतःचे दुकान, वर्कशॉप किंवा स्वतंत्र व्यवसाय' },
      },
      {
        id: 'open_environment',
        label: { en: 'Flexible and open to different working conditions', mr: 'कोणत्याही चांगल्या वातावरणात काम करण्याची तयारी' },
      },
    ],
  },

  // Question 10: Higher Study Intent
  {
    id: 'q_progression_importance',
    category: 'progression',
    categoryLabel: {
      en: 'Career Pathway',
      mr: 'दीर्घकालीन योजना',
    },
    question: {
      en: 'How important is pursuing higher education after completing the initial course?',
      mr: 'पहिला कोर्स पूर्ण केल्यानंतर पुढील उच्च शिक्षण घेणे किती महत्त्वाचे वाटते?',
    },
    description: {
      en: 'Understanding this helps families balance immediate earning needs with degree aspirations.',
      mr: 'यामुळे तातडीने पैसे कमावणे आणि पदवीचे स्वप्न यांत योग्य सुवर्णमध्य साधता येतो.',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'start_earning_asap',
        label: { en: 'Want to start earning as soon as possible to support the family', mr: 'कुटुंबाला हातभार लावण्यासाठी लवकरात लवकर पगार सुरू करणे' },
      },
      {
        id: 'work_and_study_later',
        label: { en: 'Work full-time first, then self-fund higher studies after 1–2 years', mr: 'आधी १-२ वर्षे नोकरी करून अनुभवासह स्वतःच्या पैशाने पुढे शिकणे' },
      },
      {
        id: 'continuous_degree_path',
        label: { en: 'Must have a clear, accredited pathway toward a formal degree or diploma', mr: 'कौशल्यासोबतच अधिकृत पदवी मिळण्याचा पक्का मार्ग असावा' },
      },
      {
        id: 'not_decided_progression',
        label: { en: 'Not decided yet; will see based on early job performance', mr: 'अजून ठरवले नाही; पहिल्या नोकरीच्या अनुभवानंतर ठरवू' },
      },
    ],
  },

  // Question 11: Specific Course Exploration
  {
    id: 'q_target_course',
    category: 'course_explore',
    categoryLabel: {
      en: 'Course Match',
      mr: 'कोर्स निवड',
    },
    question: {
      en: 'Is there a particular vocational course from our catalogue your family wants to explore?',
      mr: 'स्किलसाथीवरील कोर्सेसपैकी कोणता विशिष्ट कोर्स आपल्याला विशेष जाणून घ्यायचा आहे?',
    },
    description: {
      en: 'Select a course if you have one in mind, or choose "Not sure yet" for tailored recommendations.',
      mr: 'मनात एखादा कोर्स असल्यास निवडा, किंवा योग्य सल्ल्यासाठी "निश्चित नाही" निवडा.',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'solar-pv-tech',
        label: { en: 'Solar PV Installation & Maintenance Technician', mr: 'सोलर पीव्ही इन्स्टॉलेशन आणि मेंटेनन्स टेक्निशियन' },
        description: { en: '6 Months (Hybrid) · NSQF Level 4 · Renewable Energy', mr: '६ महिने · NSQF स्तर ४ · सौर ऊर्जा क्षेत्र' },
      },
      {
        id: 'ev-service-specialist',
        label: { en: 'Electric Vehicle (EV) Powertrain & Diagnostics Specialist', mr: 'इलेक्ट्रिक व्हेईकल (EV) पॉवरट्रेन आणि डायग्नोस्टिक्स स्पेशालिस्ट' },
        description: { en: '8 Months (Offline) · NSQF Level 5 · Automotive', mr: '८ महिने · NSQF स्तर ५ · ऑटोमोबाईल क्षेत्र' },
      },
      {
        id: 'general-duty-assistant',
        label: { en: 'General Duty Assistant & Patient Care Technician', mr: 'जनरल ड्युटी असिस्टंट आणि पेशंट केअर टेक्निशियन' },
        description: { en: '6 Months (Hybrid) · NSQF Level 4 · Healthcare', mr: '६ महिने · NSQF स्तर ४ · आरोग्यसेवा क्षेत्र' },
      },
      {
        id: 'full-stack-web-dev',
        label: { en: 'Front-End & Full-Stack Web Development Associate', mr: 'फ्रंट-एंड आणि फुल-स्टॅक वेब डेव्हलपमेंट असोसिएट' },
        description: { en: '6 Months (Online/Hybrid) · NSQF Level 5 · IT & Software', mr: '६ महिने · NSQF स्तर ५ · आयटी आणि सॉफ्टवेअर' },
      },
      {
        id: 'cnc-machining-tech',
        label: { en: 'CNC Milling & Turning Machine Operator', mr: 'सीएनसी मिलिंग आणि टर्निंग मशिन ऑपरेटर' },
        description: { en: '6 Months (Offline) · NSQF Level 4 · Manufacturing', mr: '६ महिने · NSQF स्तर ४ · उत्पादन आणि मशिनिंग' },
      },
      {
        id: 'drone-survey-agri',
        label: { en: 'Agricultural Drone Pilot & Precision Farming Specialist', mr: 'अ‍ॅग्रीकल्चरल ड्रोन पायलट आणि प्रिसिजन फार्मिंग' },
        description: { en: '4 Months (Offline) · NSQF Level 4 · Agriculture Allied', mr: '४ महिने · NSQF स्तर ४ · आधुनिक शेती तंत्रज्ञान' },
      },
      {
        id: 'not_sure_course',
        label: { en: 'Not sure yet — Recommend based on my assessment answers', mr: 'अजून निश्चित नाही — आमच्या उत्तरांनुसार योग्य कोर्सेस दाखवा' },
        description: { en: 'We will match our top verified courses to your responses', mr: 'आम्ही आपल्या उत्तरांनुसार सर्वोत्तम कोर्सेस जुळवून दाखवू' },
      },
    ],
  },

  // Question 12: Additional Counselor Notes
  {
    id: 'q_additional_notes',
    category: 'additional',
    categoryLabel: {
      en: 'Additional Notes',
      mr: 'इतर माहिती',
    },
    question: {
      en: 'Is there anything else the student or family would like the counsellor to understand?',
      mr: 'समुपदेशकाने समजून घ्यावी अशी कुटुंबाची किंवा विद्यार्थ्याची इतर काही विशेष बाब आहे का?',
    },
    description: {
      en: 'Optional. This is a local frontend prototype session. Please do not submit real sensitive personal information.',
      mr: 'ऐच्छिक. हे स्थानिक प्रोटोटाइप सत्र आहे. कृपया कोणतीही संवेदनशील वैयक्तिक माहिती टाकू नका.',
    },
    responseType: 'free_text',
    required: false,
    placeholder: {
      en: 'Share any unique financial circumstances, location preferences, or family discussions...',
      mr: 'कौटुंबिक परिस्थिती, स्थलांतराची तयारी किंवा इतर कोणत्याही विचारांबद्दल थोडक्यात लिहा...',
    },
  },
];
