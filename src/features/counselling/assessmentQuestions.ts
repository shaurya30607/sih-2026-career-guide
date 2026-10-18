import { AssessmentQuestion } from './assessmentTypes';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Question 1: Participant Role
  {
    id: 'q_participant',
    category: 'participant',
    categoryLabel: {
      en: 'Family Context',
      mr: 'कौटुंबिक संदर्भ',
      hi: 'पारिवारिक संदर्भ',
    },
    question: {
      en: 'Who is participating in this guidance session?',
      mr: 'या मार्गदर्शन सत्रात कोण सहभागी होत आहे?',
      hi: 'इस मार्गदर्शन सत्र में कौन भाग ले रहा है?',
    },
    description: {
      en: 'We tailor the discussion prompts and questions according to who is exploring together.',
      mr: 'चर्चेचे मुद्दे आणि प्रश्न आपण कोण एकत्र चर्चा करत आहात यावर आधारित ठरवले जातात.',
      hi: 'हम चर्चा के संकेत और प्रश्न इस आधार पर तैयार करते हैं कि कौन मिलकर विचार कर रहा है।',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'student',
        label: { en: 'Student', mr: 'विद्यार्थी (Student)', hi: 'विद्यार्थी (Student)' },
        description: {
          en: 'Exploring vocational training, hands-on skills, and first job pathways.',
          mr: 'प्रत्यक्ष कौशल्ये, तांत्रिक प्रशिक्षण आणि पहिल्या नोकरीचे पर्याय शोधत आहे.',
          hi: 'व्यावसायिक प्रशिक्षण, प्रैक्टिकल कौशल और पहली नौकरी के रास्ते खोज रहे हैं।',
        },
      },
      {
        id: 'parent',
        label: { en: 'Parent or Guardian', mr: 'पालक किंवा पालक प्रतिनिधी (Parent)', hi: 'अभिभावक या माता-पिता (Parent)' },
        description: {
          en: 'Evaluating employment stability, income potential, and social respect for my child.',
          mr: 'पाल्यासाठी रोजगाराची स्थिरता, उत्पन्नाची शक्यता आणि सामाजिक सन्मान तपासत आहे.',
          hi: 'बच्चे के लिए रोजगार की स्थिरता, कमाई की संभावना और सामाजिक सम्मान का आकलन कर रहे हैं।',
        },
      },
      {
        id: 'joint',
        label: { en: 'Student and Parent Together', mr: 'विद्यार्थी आणि पालक एकत्र (Family)', hi: 'विद्यार्थी और अभिभावक साथ मिलकर (Family)' },
        description: {
          en: 'Making a joint decision by comparing practical skills, degrees, and family priorities.',
          mr: 'व्यावसायिक कौशल्ये, पदवी आणि कौटुंबिक गरजा यांची तुलना करून एकत्र निर्णय घेत आहोत.',
          hi: 'प्रैक्टिकल कौशल, डिग्री और पारिवारिक प्राथमिकताओं की तुलना करके साझा निर्णय ले रहे हैं।',
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
      hi: 'शैक्षणिक पृष्ठभूमि',
    },
    question: {
      en: "What is the student's current education level?",
      mr: 'विद्यार्थ्याचे सध्याचे शिक्षण काय आहे?',
      hi: 'विद्यार्थी की वर्तमान शिक्षा का स्तर क्या है?',
    },
    description: {
      en: 'This helps filter certified NSQF vocational courses with matching eligibility criteria.',
      mr: 'यामुळे विद्यार्थ्याच्या पात्रतेनुसार योग्य NCVET/NSQF कोर्सेस निवडता येतात.',
      hi: 'इससे पात्रता मानदंडों के अनुसार प्रमाणित NSQF वोकेशनल कोर्स चुनने में मदद मिलती है।',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'class_8_10',
        label: { en: 'Studying in Class 8–10', mr: 'इयत्ता ८ वी ते १० वी मध्ये शिकत आहे', hi: 'कक्षा 8वीं से 10वीं में अध्ययनरत' },
      },
      {
        id: 'completed_10',
        label: { en: 'Completed Class 10 (SSC)', mr: '१० वी उत्तीर्ण (SSC Passed)', hi: '10वीं उत्तीर्ण (SSC)' },
      },
      {
        id: 'studying_11_12',
        label: { en: 'Studying in Class 11–12', mr: 'इयत्ता ११ वी किंवा १२ वी मध्ये शिकत आहे', hi: 'कक्षा 11वीं या 12वीं में अध्ययनरत' },
      },
      {
        id: 'completed_12',
        label: { en: 'Completed Class 12 (HSC)', mr: '१२ वी उत्तीर्ण (HSC Passed)', hi: '12वीं उत्तीर्ण (HSC)' },
      },
      {
        id: 'iti_vocational',
        label: { en: 'ITI or Vocational Certificate', mr: 'आयटीआय (ITI) किंवा व्यावसायिक प्रमाणपत्र', hi: 'आईटीआई (ITI) या व्यावसायिक प्रमाणपत्र' },
      },
      {
        id: 'diploma',
        label: { en: 'Polytechnic Diploma', mr: 'पॉलिटेक्निक डिप्लोमा (Diploma Holder)', hi: 'पॉलिटेक्निक डिप्लोमा (Diploma)' },
      },
      {
        id: 'graduate',
        label: { en: 'College Graduate (BA / B.Sc / B.Com)', mr: 'पदवीधर (Graduate)', hi: 'कॉलेज स्नातक (BA / B.Sc / B.Com)' },
      },
      {
        id: 'other_edu',
        label: { en: 'Other Education Background', mr: 'इतर शैक्षणिक पार्श्वभूमी', hi: 'अन्य शैक्षणिक पृष्ठभूमि' },
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
      hi: 'रुचि के क्षेत्र',
    },
    question: {
      en: 'Which vocational career areas interest the student?',
      mr: 'विद्यार्थ्याला कोणत्या व्यावसायिक क्षेत्रांमध्ये रस आहे?',
      hi: 'विद्यार्थी की रुचि किन व्यावसायिक क्षेत्रों में है?',
    },
    description: {
      en: 'Select one or more sectors. We will highlight courses aligned with these technical streams.',
      mr: 'एक किंवा अनेक क्षेत्रे निवडा. आम्ही या क्षेत्रांनुसार उपलब्ध कोर्सेस सुचवू.',
      hi: 'एक या अधिक क्षेत्र चुनें। हम इन तकनीकी शाखाओं से जुड़े कोर्स सुझाएंगे।',
    },
    responseType: 'multiple_choice',
    required: true,
    options: [
      {
        id: 'automotive',
        streamKey: 'automotive',
        label: { en: 'Electric Vehicles & Auto Tech', mr: 'इलेक्ट्रिक वाहने आणि ऑटोमोबाईल तंत्रज्ञान', hi: 'इलेक्ट्रिक वाहन (EV) और ऑटो टेक' },
        description: { en: 'EV powertrain, battery BMS, motor diagnostics', mr: 'ईव्ही बॅटरी, मोटर आणि कंट्रोलर दुरुस्ती', hi: 'ईवी पावरट्रेन, बैटरी प्रबंधन (BMS), मोटर डायग्नोस्टिक्स' },
      },
      {
        id: 'renewable_energy',
        streamKey: 'renewable_energy',
        label: { en: 'Solar & Renewable Energy', mr: 'सौर ऊर्जा आणि हरित तंत्रज्ञान', hi: 'सौर ऊर्जा और नवीकरणीय ऊर्जा' },
        description: { en: 'Rooftop solar PV, inverter wiring, grid synchronization', mr: 'सोलर पॅनल उभारणी आणि इन्व्हर्टर वायरिंग', hi: 'रूफटॉप सोलर पीवी, इन्वर्टर वायरिंग, ग्रिड सिंक्रोनाइज़ेशन' },
      },
      {
        id: 'healthcare',
        streamKey: 'healthcare',
        label: { en: 'Healthcare & Patient Care', mr: 'आरोग्यसेवा आणि रुग्ण सहाय्यक', hi: 'स्वास्थ्य सेवा और रोगी देखभाल' },
        description: { en: 'General Duty Assistant, vitals monitoring, hospital safety', mr: 'हॉस्पिटल केअर, प्राथमिक उपचार आणि रुग्णसेवा', hi: 'जनरल ड्यूटी असिस्टेंट, वाइटल्स मॉनिटरिंग, अस्पताल सुरक्षा' },
      },
      {
        id: 'it_tech',
        streamKey: 'it_tech',
        label: { en: 'Information Technology & Software', mr: 'माहिती तंत्रज्ञान आणि वेब डेव्हलपमेंट', hi: 'सूचना प्रौद्योगिकी और सॉफ्टवेयर' },
        description: { en: 'Front-end web development, JavaScript, UI integration', mr: 'वेबसाईट तयार करणे, कोडिंग आणि डिजिटल कौशल्ये', hi: 'फ्रंट-एंड वेब डेवलपमेंट, जावास्क्रिप्ट, डिजिटल कौशल' },
      },
      {
        id: 'manufacturing_engineering',
        streamKey: 'manufacturing_engineering',
        label: { en: 'Precision Manufacturing & CNC', mr: 'उत्पादन आणि सीएनसी मशिनिंग', hi: 'प्रिसिजन मैन्युफैक्चरिंग और CNC' },
        description: { en: 'CNC turning, milling, G-code programming, tooling', mr: 'सीएनसी मशिन ऑपरेटिंग आणि औद्योगिक उत्पादन', hi: 'सीएनसी टर्निंग, मिलिंग, जी-कोड प्रोग्रामिंग और मशीनिंग' },
      },
      {
        id: 'agriculture_allied',
        streamKey: 'agriculture_allied',
        label: { en: 'Agricultural Tech & Drone Sensing', mr: 'कृषी तंत्रज्ञान आणि ड्रोन फवारणी', hi: 'कृषि तकनीक और ड्रोन सेंसिंग' },
        description: { en: 'DGCA certified drone flying, precision crop mapping', mr: 'शेतीसाठी ड्रोन पायलट आणि आधुनिक तंत्रज्ञान', hi: 'डीजीसीए प्रमाणित ड्रोन फ्लाइंग, आधुनिक फसल मैपिंग' },
      },
      {
        id: 'unsure_sector',
        label: { en: 'Not sure yet (Help us discover)', mr: 'अजून निश्चित नाही (योग्य दिशा दाखवा)', hi: 'अभी निश्चित नहीं (सही दिशा खोजने में मदद करें)' },
        description: { en: 'Recommend courses based on aptitude and market demand', mr: 'बाजारातील मागणीनुसार सर्वोत्तम कोर्सेस दाखवा', hi: 'क्षमता और बाजार की मांग के आधार पर सर्वश्रेष्ठ कोर्स सुझाएं' },
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
      hi: 'पारिवारिक प्राथमिकताएं',
    },
    question: {
      en: 'What matters most when choosing a vocational career or course?',
      mr: 'करिअर किंवा कोर्स निवडताना तुमच्यासाठी सर्वाधिक महत्त्वाचे काय आहे?',
      hi: 'वोकेशनल करियर या कोर्स चुनते समय आपके लिए सबसे महत्वपूर्ण क्या है?',
    },
    description: {
      en: 'Select up to 3 primary priorities that guide your decision.',
      mr: 'तुमच्या निर्णयाला दिशा देणारे सर्वाधिक ३ महत्त्वाचे पर्याय निवडा.',
      hi: 'अपने निर्णय को दिशा देने वाली अधिकतम 3 मुख्य प्राथमिकताएं चुनें।',
    },
    responseType: 'multiple_choice',
    maxSelections: 3,
    required: true,
    options: [
      {
        id: 'job_quickly',
        label: { en: 'Getting a job quickly (within 6–9 months)', mr: 'लवकरात लवकर नोकरी मिळणे (६-९ महिन्यांत)', hi: 'जल्दी नौकरी मिलना (6–9 महीनों के भीतर)' },
      },
      {
        id: 'job_stability',
        label: { en: 'Stable, long-term employment', mr: 'कायमस्वरूपी आणि सुरक्षित रोजगार', hi: 'स्थिर और दीर्घकालिक रोजगार' },
      },
      {
        id: 'earning_potential',
        label: { en: 'High earning potential and fast wage growth', mr: 'चांगला पगार आणि वेगाने पगारवाढ', hi: 'अच्छी कमाई की संभावना और तेज वेतन वृद्धि' },
      },
      {
        id: 'low_fees',
        label: { en: 'Low course fees and affordable training', mr: 'कमी फी आणि सरकारी शिष्यवृत्ती', hi: 'कम कोर्स फीस और किफायती प्रशिक्षण' },
      },
      {
        id: 'interest_enjoyment',
        label: { en: 'Student genuine interest and practical aptitude', mr: 'विद्यार्थ्याची खरी आवड आणि कामातील आनंद', hi: 'विद्यार्थी की वास्तविक रुचि और प्रैक्टिकल रुझान' },
      },
      {
        id: 'further_study',
        label: { en: 'Opportunities for further study (B.Voc / Diploma)', mr: 'पुढे पदवी (B.Voc/डिप्लोमा) घेण्याची संधी', hi: 'उच्च शिक्षा के अवसर (B.Voc / डिप्लोमा)' },
      },
      {
        id: 'family_expectations',
        label: { en: 'Meeting family and community expectations', mr: 'कुटुंबाच्या अपेक्षा आणि सामाजिक प्रतिष्ठा', hi: 'परिवार और समाज की अपेक्षाओं के अनुरूप' },
      },
      {
        id: 'near_home',
        label: { en: 'Training and working near home district', mr: 'घराजवळ किंवा स्वतःच्या जिल्ह्यात काम', hi: 'घर के पास या गृह जिले में प्रशिक्षण व काम' },
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
      hi: 'आत्मविश्वास का स्तर',
    },
    question: {
      en: 'How confident does the student feel about choosing a career path right now?',
      mr: 'करिअरचा मार्ग निवडण्याबाबत विद्यार्थ्याला सध्या किती आत्मविश्वास वाटतो?',
      hi: 'करियर का रास्ता चुनने को लेकर विद्यार्थी अभी कितना आश्वस्त महसूस करता है?',
    },
    description: {
      en: 'Every student starts somewhere. Honest ratings help us frame realistic discussion steps.',
      mr: 'प्रत्येक विद्यार्थ्याची सुरुवात वेगळी असते. योग्य रेटिंगमुळे संभाषणाला योग्य दिशा मिळते.',
      hi: 'हर छात्र की शुरुआत अलग होती है। सही रेटिंग से बातचीत को सही दिशा मिलती है।',
    },
    responseType: 'rating_scale',
    required: true,
    ratingConfig: {
      min: 1,
      max: 5,
      labels: {
        1: { en: 'Completely undecided', mr: 'अजून काहीच ठरले नाही', hi: 'पूरी तरह अनिश्चित' },
        2: { en: 'Exploring ideas', mr: 'पर्यायांचा विचार सुरू आहे', hi: 'विकल्पों पर विचार जारी' },
        3: { en: 'Moderately confident', mr: 'काही स्पष्टता आहे', hi: 'कुछ हद तक स्पष्ट' },
        4: { en: 'Mostly decided', mr: 'जवळपास निश्चित', hi: 'लगभग तय' },
        5: { en: 'Very clear & ready', mr: 'पूर्णपणे ठाम व तयार', hi: 'पूरी तरह स्पष्ट और तैयार' },
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
      hi: 'मुख्य चिंता',
    },
    question: {
      en: "What is the family's biggest question or concern about vocational education?",
      mr: 'व्यावसायिक शिक्षणाबाबत कुटुंबाच्या मनात सर्वाधिक मोठी शंका किंवा चिंता कोणती आहे?',
      hi: 'व्यावसायिक शिक्षा को लेकर परिवार के मन में सबसे बड़ा सवाल या चिंता क्या है?',
    },
    description: {
      en: 'We will ask one targeted follow-up question next to address this specific worry directly.',
      mr: 'या शंकेचे निरसन करण्यासाठी पुढील प्रश्न थेट या विषयावर विचारला जाईल.',
      hi: 'इस चिंता के समाधान के लिए अगला प्रश्न सीधे इसी विषय पर होगा।',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'employment',
        label: { en: 'Will this course genuinely lead to a verified job?', mr: 'या कोर्सनंतर खरंच खात्रीशीर नोकरी मिळेल का?', hi: 'क्या इस कोर्स के बाद सचमुच प्रमाणित नौकरी मिलेगी?' },
        description: { en: 'Placement verification, campus interviews, apprentice contracts', mr: 'प्लेसमेंटची वस्तुस्थिती आणि कॅम्पस मुलाखती', hi: 'प्लेसमेंट रिकॉर्ड, कैंपस इंटरव्यू और अप्रेंटिसशिप अनुबंध' },
      },
      {
        id: 'earnings',
        label: { en: 'Will starting earnings be sufficient for the family?', mr: 'सुरुवातीचा पगार कुटुंबाच्या गरजा पूर्ण करेल का?', hi: 'क्या शुरुआती कमाई परिवार की जरूरतों के लिए पर्याप्त होगी?' },
        description: { en: 'Starting wages, overtime, and salary milestones over 3 years', mr: 'सुरुवातीचे मानधन आणि पुढील ३-४ वर्षांतील पगारवाढ', hi: 'शुरुआती वेतन, मानदेय और अगले 3 वर्षों में वेतन वृद्धि' },
      },
      {
        id: 'stability',
        label: { en: 'Is this career stable in changing market conditions?', mr: 'बदलत्या बाजारात हे करिअर दीर्घकाळ स्थिर राहील का?', hi: 'क्या बदलते बाजार में यह करियर लंबे समय तक सुरक्षित रहेगा?' },
        description: { en: 'Permanent company roles, automation risk, sector growth', mr: 'कायमस्वरूपी काम आणि दीर्घकालीन मागणी', hi: 'कंपनी पेरोल पर स्थायी नौकरी, ऑटोमेशन का प्रभाव और विकास' },
      },
      {
        id: 'social_respect',
        label: { en: 'Will relatives and society respect this trade?', mr: 'नातेवाईक आणि समाजात या कामाला मान-सन्मान मिळेल का?', hi: 'क्या समाज और रिश्तेदारों में इस काम को सम्मान मिलेगा?' },
        description: { en: 'Prestige of technician careers compared to general degrees', mr: 'पारंपरिक पदवीच्या तुलनेत तंत्रज्ञाचे सामाजिक स्थान', hi: 'पारंपरिक डिग्री की तुलना में कुशल तकनीशियन की सामाजिक प्रतिष्ठा' },
      },
      {
        id: 'recognition',
        label: { en: 'Is the course officially recognized by the government?', mr: 'हा कोर्स शासकीय स्तरावर (NCVET/NSDC) मान्यताप्राप्त आहे का?', hi: 'क्या यह कोर्स सरकारी स्तर (NCVET/NSDC) पर मान्यता प्राप्त है?' },
        description: { en: 'NSQF certification levels, authorized training centers', mr: 'अधिकृत प्रमाणपत्र आणि राष्ट्रीय कौशल्य प्रमाण', hi: 'NSQF कौशल स्तर और अधिकृत सरकारी प्रशिक्षण केंद्र' },
      },
      {
        id: 'progression',
        label: { en: 'Can the student still earn a college degree or diploma later?', mr: 'पुढे जाऊन पदवी किंवा डिप्लोमा पूर्ण करता येईल का?', hi: 'क्या बाद में कॉलेज डिग्री या डिप्लोमा पूरा किया जा सकता है?' },
        description: { en: 'NEP credit mobility, lateral entry to engineering diplomas or B.Voc', mr: 'नवीन शैक्षणिक धोरणांतर्गत (NEP) पदवीचे दरवाजे उघडे राहणे', hi: 'NEP 2020 क्रेडिट ट्रांसफर, पॉलिटेक्निक या B.Voc में सीधी एंट्री' },
      },
      {
        id: 'affordability',
        label: { en: 'Course fees and family affordability', mr: 'कोर्सची फी आणि कुटुंबाची आर्थिक क्षमता', hi: 'कोर्स की फीस और परिवार की आर्थिक क्षमता' },
        description: { en: 'Tuition fees, hostel costs, and government fee subsidies', mr: 'प्रशिक्षण खर्च, शिष्यवृत्ती आणि सरकारी सवलती', hi: 'प्रशिक्षण शुल्क, छात्रवृत्ति और सरकारी फीस सब्सिडी' },
      },
      {
        id: 'unsure_path',
        label: { en: 'We are simply unsure which career direction suits best', mr: 'कोणता मार्ग निवडावा याबद्दल संभ्रम आहे', hi: 'हमें समझ नहीं आ रहा कि कौन सा करियर मार्ग सबसे उपयुक्त रहेगा' },
        description: { en: 'Need a structured comparison of aptitude and options', mr: 'क्षमता आणि संधी यांची सविस्तर तुलना हवी आहे', hi: 'रुझान और विकल्पों की क्रमबद्ध तुलना की आवश्यकता है' },
      },
      {
        id: 'other_concern',
        label: { en: 'Other specific personal or family circumstance', mr: 'इतर कोणतीही वैयक्तिक किंवा कौटुंबिक अडचण', hi: 'अन्य कोई व्यक्तिगत या पारिवारिक परिस्थिति' },
        description: { en: 'Describe in your own words in the next step', mr: 'पुढील पायरीवर स्वतःच्या शब्दांत सांगा', hi: 'अगले कदम पर अपने शब्दों में बताएं' },
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
      hi: 'रोजगार प्रमाण सत्यापन',
    },
    question: {
      en: 'What kind of employment evidence would give your family the most confidence?',
      mr: 'कोणता पुरावा पाहिल्यावर तुमच्या कुटुंबाला नोकरीबद्दल सर्वाधिक खात्री पटेल?',
      hi: 'किस तरह का प्रमाण देखने पर आपके परिवार को नौकरी के प्रति सबसे अधिक भरोसा होगा?',
    },
    description: {
      en: 'SkillSaathi highlights verified data attributes on accredited courses.',
      mr: 'स्किलसाथी अधिकृत कोर्सेसवरील पडताळणी केलेले तपशील ठळकपणे दर्शवते.',
      hi: 'स्किलसाथी मान्यताप्राप्त कोर्सों पर सत्यापित विवरण स्पष्ट रूप से दिखाता है।',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'employment',
    options: [
      {
        id: 'campus_placement_history',
        label: { en: 'Documented campus placement history and hiring companies', mr: 'गेल्या वर्षांच्या कॅम्पस प्लेसमेंटचा प्रत्यक्ष रेकॉर्ड', hi: 'पिछले वर्षों का कैंपस प्लेसमेंट रिकॉर्ड और भर्ती करने वाली कंपनियां' },
      },
      {
        id: 'naps_apprenticeship',
        label: { en: 'Guaranteed NAPS government apprenticeship with monthly stipend', mr: 'शासकीय NAPS अप्रेंटिसशिप करार आणि मासिक विद्यावेतन', hi: 'सरकारी NAPS अप्रेंटिसशिप अनुबंध और मासिक वजीफा' },
      },
      {
        id: 'alumni_interaction',
        label: { en: 'Speaking with alumni working in the industry today', mr: 'सध्या नोकरी करत असलेल्या जुन्या विद्यार्थ्यांशी संवाद', hi: 'उद्योग में कार्यरत पूर्व छात्रों (Alumni) से बातचीत' },
      },
      {
        id: 'mou_employers',
        label: { en: 'Signed MOUs between the training institute and manufacturers', mr: 'प्रशिक्षण संस्था आणि नामांकित कंपन्यांचे अधिकृत करार', hi: 'प्रशिक्षण संस्थान और प्रतिष्ठित कंपनियों के बीच आधिकारिक समझौता (MoU)' },
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
      hi: 'वेतन की अपेक्षा',
    },
    question: {
      en: "What starting monthly income would satisfy your family's baseline expectation?",
      mr: 'सुरुवातीला दरमहा किती पगार मिळाल्यास कुटुंबाचे समाधान होईल?',
      hi: 'शुरुआत में प्रति माह कितने वेतन से परिवार की बुनियादी अपेक्षा पूरी होगी?',
    },
    description: {
      en: 'Note: This captures your family preference to filter matching job outcomes; actual salaries vary by performance.',
      mr: 'नोंद: ही तुमची अपेक्षा नोंदवते; प्रत्यक्ष पगार कौशल्य व कंपनीनुसार बदलतो.',
      hi: 'नोट: यह आपकी पसंद दर्ज करता है; वास्तविक वेतन कौशल व कंपनी के अनुसार अलग हो सकता है।',
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
      minLabel: { en: '₹12,000 / mo', mr: '₹१२,००० / महिना', hi: '₹12,000 / माह' },
      maxLabel: { en: '₹40,000+ / mo', mr: '₹४०,०००+ / महिना', hi: '₹40,000+ / माह' },
      helperText: {
        en: 'Certified NSQF Level 4–5 vocational technicians typically begin at ₹16,000–₹24,000/month.',
        mr: 'प्रमाणित NSQF स्तर ४-५ तंत्रज्ञांचा सुरुवातीचा पगार सामान्यतः ₹१६,००० ते ₹२४,००० असतो.',
        hi: 'प्रमाणित NSQF स्तर 4–5 के तकनीशियन आमतौर पर ₹16,000–₹24,000/माह से शुरुआत करते हैं।',
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
      hi: 'स्थिरता का स्वरूप',
    },
    question: {
      en: 'Which employment structure feels most secure to your family?',
      mr: 'कोणत्या प्रकारच्या नोकरीमध्ये तुमच्या कुटुंबाला सर्वाधिक सुरक्षितता वाटते?',
      hi: 'किस तरह के रोजगार ढांचे में आपके परिवार को सबसे अधिक सुरक्षा महसूस होती है?',
    },
    description: {
      en: 'Different sectors offer varied stability models—from OEM factory payroll to licensed independent contracting.',
      mr: 'विविध क्षेत्रांत स्थिरतेचे वेगवेगळे मार्ग असतात—कंपनी रोल ते अधिकृत स्वतंत्र व्यवसाय.',
      hi: 'अलग-अलग क्षेत्रों में स्थिरता के विभिन्न मॉडल हैं—कंपनी पेरोल से लेकर अधिकृत स्वतंत्र सेवा केंद्र तक।',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'stability',
    options: [
      {
        id: 'large_private_oem',
        label: { en: 'Large manufacturing or technology company with PF and medical benefits', mr: 'मोठी नामांकित कंपनी (PF, विमा आणि सुरक्षित सेवा)', hi: 'बड़ी प्रतिष्ठित निर्माण कंपनी (PF, बीमा और सुरक्षित सेवाएं)' },
      },
      {
        id: 'psu_contract',
        label: { en: 'Government / PSU or municipal infrastructure maintenance contract', mr: 'शासकीय किंवा निमशासकीय पायाभूत सुविधा कंत्राट', hi: 'सरकारी / सार्वजनिक क्षेत्र (PSU) या बुनियादी ढांचा अनुबंध' },
      },
      {
        id: 'self_employed_workshop',
        label: { en: 'Independent technician service center / entrepreneurship', mr: 'स्वतःचे स्वतंत्र सर्व्हिस सेंटर किंवा व्यवसाय', hi: 'स्वतंत्र तकनीशियन सर्विस सेंटर / स्वरोजगार' },
      },
      {
        id: 'open_stability',
        label: { en: 'Any verified role with good safety standards and timely payment', mr: 'वेळेवर पगार आणि सुरक्षित कामाची हमी असणारा कोणताही मार्ग', hi: 'समय पर वेतन और सुरक्षित कार्य मानकों वाला कोई भी सत्यापित काम' },
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
      hi: 'सामाजिक दृष्टिकोण',
    },
    question: {
      en: 'How does your family view vocational careers compared to general degrees (BA/B.Com)?',
      mr: 'पारंपरिक पदवीच्या तुलनेत व्यावसायिक शिक्षणाकडे आपले कुटुंब कसे पाहते?',
      hi: 'पारंपरिक डिग्री की तुलना में आपका परिवार वोकेशनल करियर को कैसे देखता है?',
    },
    description: {
      en: 'Understanding community perceptions helps us provide factual talking points for relatives.',
      mr: 'नातेवाईक आणि समाजाशी सकारात्मक चर्चा करण्यासाठी योग्य माहिती येथे दिली जाईल.',
      hi: 'रिश्तेदारों और समाज के साथ सकारात्मक बातचीत के लिए सटीक तथ्य उपलब्ध कराए जाएंगे।',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'social_respect',
    options: [
      {
        id: 'practical_early_earner',
        label: { en: 'Proud of early earning and real hands-on technical expertise', mr: 'कौशल्याच्या जोरावर स्वतःच्या पायावर लवकर उभे राहण्याचा अभिमान', hi: 'कौशल के बल पर जल्दी आत्मनिर्भर बनने और प्रैक्टिकल काम का गर्व' },
        description: { en: 'Becoming economically self-reliant before peers in general degrees', mr: 'मित्रांच्या आधी आर्थिकदृष्ट्या स्वावलंबी बनणे', hi: 'पारंपरिक डिग्री वाले साथियों से पहले आर्थिक रूप से स्वावलंबी होना' },
      },
      {
        id: 'wants_degree_title',
        label: { en: 'Family still prefers a formal degree title alongside skill training', mr: 'कौशल्यासोबतच पदवीचे नाव (B.Voc) असावे अशी कुटुंबाची इच्छा', hi: 'कौशल के साथ-साथ औपचारिक डिग्री (B.Voc) का नाम भी परिवार चाहता है' },
        description: { en: 'B.Voc programs bridge this need by awarding UGC recognized degrees', mr: 'B.Voc पदवीमुळे कौशल्य आणि शासकीय पदवी दोन्ही मिळतात', hi: 'B.Voc प्रोग्राम कौशल्य और यूजीसी मान्यता प्राप्त डिग्री दोनों प्रदान करते हैं' },
      },
      {
        id: 'modern_tech_respect',
        label: { en: 'New fields (EV, Solar, IT, Drone) have modern respect in our community', mr: 'नवीन तंत्रज्ञान (EV, सोलर, ड्रोन) या क्षेत्रांना आज समाजात मोठा मान आहे', hi: 'नई तकनीकों (EV, सोलर, आईटी, ड्रोन) को आज समाज में बड़ा सम्मान प्राप्त है' },
        description: { en: 'High-tech vocational careers are seen as forward-looking engineering trades', mr: 'या क्षेत्रांकडे आधुनिक तंत्रज्ञानाची नवी संधी म्हणून पाहिले जाते', hi: 'हाई-टेक वोकेशनल क्षेत्रों को भविष्योन्मुखी इंजीनियरिंग शाखा माना जाता है' },
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
      hi: 'आधिकारिक मान्यता',
    },
    question: {
      en: 'Which accreditation checks are most important for your family?',
      mr: 'शासकीय मान्यतेबाबत कोणत्या गोष्टी तपासणे आपल्यासाठी सर्वात महत्त्वाचे आहे?',
      hi: 'आधिकारिक मान्यता के संदर्भ में कौन सी बातें जांचना आपके परिवार के लिए सबसे महत्वपूर्ण हैं?',
    },
    description: {
      en: 'SkillSaathi strictly marks official NCVET government alignment on every course.',
      mr: 'स्किलसाथी प्रत्येक कोर्सवर NCVET शासकीय मान्यतेचे स्पष्ट लेबल लावते.',
      hi: 'स्किलसाथी हर कोर्स पर NCVET सरकारी मान्यता को स्पष्ट रूप से दर्शाता है।',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'recognition',
    options: [
      {
        id: 'ncvet_nsqf_badge',
        label: { en: 'National Council for Vocational Education and Training (NCVET) certificate', mr: 'NCVET राष्ट्रीय कौशल्य प्रमाणपत्र', hi: 'राष्ट्रीय व्यावसायिक शिक्षा और प्रशिक्षण परिषद (NCVET) प्रमाणपत्र' },
      },
      {
        id: 'sector_skill_council',
        label: { en: 'Industry Sector Skill Council (e.g., ASDC for EV, SCGJ for Solar)', mr: 'संबंधित उद्योग कौशल्य परिषद (उदा. ऑटोमोटिव्ह किंवा ग्रीन जॉब्स कौन्सिल)', hi: 'संबंधित सेक्टर स्किल काउंसिल (जैसे EV के लिए ASDC, सोलर के लिए SCGJ)' },
      },
      {
        id: 'university_credits',
        label: { en: 'University recognized academic credits for future degree entry', mr: 'विद्यापीठाशी संलग्न क्रेडिट्स ज्यामुळे पुढील पदवी प्रवेश सुलभ होतो', hi: 'विश्वविद्यालय से संबद्ध एकेडमिक क्रेडिट्स, जिससे भविष्य में डिग्री प्रवेश आसान हो' },
      },
      {
        id: 'all_verified',
        label: { en: 'All official government and industry credentials verified together', mr: 'शासकीय आणि औद्योगिक सर्व प्रकारच्या मान्यता एकाच ठिकाणी हव्यात', hi: 'सभी सरकारी और औद्योगिक प्रमाण-पत्र एक साथ सत्यापित होने चाहिए' },
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
      hi: 'उच्च शिक्षा के रास्ते',
    },
    question: {
      en: 'Which higher educational pathway would you like to keep open after this certificate?',
      mr: 'हे प्रमाणपत्र पूर्ण केल्यानंतर पुढील शिक्षणाचा कोणता मार्ग खुला ठेवू इच्छिता?',
      hi: 'यह प्रमाणपत्र पूरा करने के बाद आप आगे की शिक्षा का कौन सा रास्ता खुला रखना चाहते हैं?',
    },
    description: {
      en: 'NEP 2020 frameworks allow seamless credit transfers from certificate to degree.',
      mr: 'नवीन शैक्षणिक धोरणानुसार (NEP) प्रमाणपत्रातून पदवीत सहज प्रवेश घेता येतो.',
      hi: 'राष्ट्रीय शिक्षा नीति (NEP 2020) के तहत सर्टिफिकेट से डिग्री में सहज प्रवेश संभव है।',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'progression',
    options: [
      {
        id: 'polytechnic_lateral',
        label: { en: 'Direct lateral entry into 2nd year of Polytechnic Diploma', mr: 'पॉलिटेक्निक डिप्लोमाच्या दुसऱ्या वर्षात थेट प्रवेश', hi: 'पॉलिटेक्निक डिप्लोमा के दूसरे वर्ष में सीधा प्रवेश (Lateral Entry)' },
      },
      {
        id: 'bvoc_degree',
        label: { en: 'Bachelor of Vocation (B.Voc) degree with work-integrated credits', mr: 'कामासह शिकण्याची बी.व्होक (B.Voc) पदवी', hi: 'कार्य के साथ सीखने वाली बैचलर ऑफ वोकेशन (B.Voc) डिग्री' },
      },
      {
        id: 'advanced_specialization',
        label: { en: 'Advanced technical certifications (PLC, EV battery design, DGCA license)', mr: 'पुढील प्रगत तांत्रिक विशेषीकरण (उदा. प्रगत कोडिंग किंवा ड्रोन परवाना)', hi: 'उन्नत तकनीकी प्रमाणपत्र (जैसे PLC, EV बैटरी डिजाइन, DGCA ड्रोन लाइसेंस)' },
      },
      {
        id: 'undecided_progression',
        label: { en: 'Not decided yet; want flexibility to choose later', mr: 'अजून निश्चित नाही; नंतर निर्णय घेण्याची मुभा हवी आहे', hi: 'अभी तय नहीं; बाद में निर्णय लेने की सुविधा चाहते हैं' },
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
      hi: 'प्रशिक्षण बजट',
    },
    question: {
      en: "What is the family's comfortable budget for this vocational training?",
      mr: 'या व्यावसायिक प्रशिक्षणासाठी कुटुंबाचे बजेट किती आहे?',
      hi: 'इस व्यावसायिक प्रशिक्षण के लिए परिवार का सहज बजट कितना है?',
    },
    description: {
      en: 'Many courses offer PMKVY or state government fee subsidies for eligible students.',
      mr: 'अनेक कोर्सेसमध्ये सरकारी योजनांतर्गत मोफत किंवा सवलतीच्या दरात शिक्षण मिळते.',
      hi: 'कई कोर्सों में PMKVY या राज्य सरकार की योजनाओं के तहत फीस सब्सिडी मिलती है।',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) => answers.q_concern === 'affordability',
    options: [
      {
        id: 'govt_subsidized_free',
        label: { en: 'Government subsidized or 100% scholarship funded', mr: 'शासकीय सवलत किंवा पूर्ण मोफत शिष्यवृत्ती', hi: 'सरकारी सब्सिडी या 100% छात्रवृत्ति आधारित' },
      },
      {
        id: 'under_15000',
        label: { en: 'Under ₹15,000 total course fee', mr: '₹१५,००० पेक्षा कमी एकूण फी', hi: '₹15,000 से कम कुल कोर्स फीस' },
      },
      {
        id: '15000_30000',
        label: { en: '₹15,000 to ₹30,000 with installment options', mr: '₹१५,००० ते ₹३०,००० (हप्त्यांची सोय असल्यास)', hi: '₹15,000 से ₹30,000 (किस्तों की सुविधा के साथ)' },
      },
      {
        id: 'flexible_if_placed',
        label: { en: 'Flexible if industry placement is strongly supported', mr: 'चांगल्या नोकरीची हमी असल्यास फी जास्त असली तरी चालेल', hi: 'यदि अच्छी नौकरी का मजबूत सहयोग हो तो फीस में लचीलापन संभव है' },
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
      hi: 'व्यक्तिगत चिंता का विवरण',
    },
    question: {
      en: 'Please share a brief note about what makes your family hesitant or uncertain.',
      mr: 'आपल्या कुटुंबाला नक्की कोणत्या गोष्टीबद्दल संभ्रम वाटतो ते थोडक्यात सांगा.',
      hi: 'संक्षेप में बताएं कि परिवार को किस बात पर संकोच या असमंजस है।',
    },
    description: {
      en: 'This helps us provide tailored discussion guidance. Please do not enter sensitive personal data.',
      mr: 'यामुळे अधिक योग्य मार्गदर्शन करता येईल. कृपया कोणतीही गोपनीय माहिती टाकू नका.',
      hi: 'इससे सटीक मार्गदर्शन देने में सहायता मिलती है। कृपया गोपनीय व्यक्तिगत विवरण न लिखें।',
    },
    responseType: 'free_text',
    required: false,
    isApplicable: (answers) => answers.q_concern === 'unsure_path' || answers.q_concern === 'other_concern',
    placeholder: {
      en: 'For example: "We want to know if relatives will judge this work" or "Student wants to work in solar but father prefers banking"...',
      mr: 'उदा. "विद्यार्थ्याला सोलरमध्ये जायचे आहे पण घरच्यांना बँकेतील नोकरी हवी आहे" किंवा "कमी वयात नोकरी करणे योग्य आहे का?"...',
      hi: 'उदाहरण: "छात्र सोलर में जाना चाहता है लेकिन परिवार बैंकिंग पसंद करता है" या "क्या कम उम्र में काम शुरू करना सही है?"...',
    },
  },

  // Question 8: Learning Style
  {
    id: 'q_learning_style',
    category: 'learning_style',
    categoryLabel: {
      en: 'Learning Preference',
      mr: 'शिकण्याची पद्धत',
      hi: 'सीखने का तरीका',
    },
    question: {
      en: 'What kind of learning environment suits the student best?',
      mr: 'विद्यार्थ्याला कोणत्या पद्धतीचे शिक्षण सर्वात सोपे आणि आवडीचे वाटते?',
      hi: 'विद्यार्थी के लिए किस प्रकार का शिक्षण सबसे अनुकूल और रुचिकर है?',
    },
    description: {
      en: 'Vocational courses are heavily weighted toward physical practice and equipment handling.',
      mr: 'व्यावसायिक अभ्यासक्रम प्रामुख्याने प्रत्यक्ष काम आणि प्रॅक्टिकलवर आधारित असतात.',
      hi: 'व्यावसायिक कोर्स मुख्य रूप से प्रैक्टिकल काम और उपकरणों के संचालन पर केंद्रित होते हैं।',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'mostly_hands_on',
        label: { en: 'Mostly practical, hands-on workshop learning (70%+ lab work)', mr: 'प्रामुख्याने प्रत्यक्ष प्रॅक्टिकल, वर्कशॉप आणि मशिनवर काम (७०%+ प्रॅक्टिकल)', hi: 'मुख्यतः प्रैक्टिकल, वर्कशॉप और मशीनों पर काम (70%+ लैब कार्य)' },
        description: { en: 'Enjoys building, repairing, wiring, coding, or handling equipment', mr: 'गोष्टी जोडणे, दुरुस्त करणे, कोड लिहिणे किंवा मशिन हाताळणे आवडते', hi: 'चीजें बनाना, रिपेयरिंग, वायरिंग, कोडिंग या उपकरण संचालित करना पसंद है' },
      },
      {
        id: 'balanced_mix',
        label: { en: 'A balanced mix of technical theory and practical training', mr: 'तांत्रिक थिअरी आणि प्रॅक्टिकलचे समतोल मिश्रण', hi: 'तकनीकी थ्योरी और प्रैक्टिकल प्रशिक्षण का संतुलित मिश्रण' },
        description: { en: 'Likes understanding circuit diagrams, standards, and workshop execution', mr: 'नियम, डायग्राम समजून घेऊन प्रत्यक्ष काम करणे', hi: 'सर्किट डायग्राम और मानक समझकर प्रैक्टिकल काम करना' },
      },
      {
        id: 'mostly_classroom',
        label: { en: 'Mostly structured classroom lectures and textbook learning', mr: 'प्रामुख्याने वर्गातील व्याख्याने आणि पुस्तकी अभ्यास', hi: 'मुख्य रूप से कक्षा व्याख्यान और पाठ्यपुस्तकों से अध्ययन' },
        description: { en: 'May prefer conventional university degrees or hybrid diplomas', mr: 'पारंपरिक पदवी किंवा थिअरी अभ्यासक्रमांकडे ओढा', hi: 'पारंपरिक विश्वविद्यालय डिग्री या हाइब्रिड डिप्लोमा की ओर रुझान' },
      },
      {
        id: 'unsure_learning',
        label: { en: 'Not sure yet (Open to trying practical workshop sessions)', mr: 'अजून निश्चित नाही (वर्कशॉपमध्ये प्रत्यक्ष अनुभव घेऊन ठरवू)', hi: 'अभी तय नहीं (वर्कशॉप में प्रत्यक्ष अनुभव लेकर तय करेंगे)' },
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
      hi: 'कार्य वातावरण',
    },
    question: {
      en: 'What daily work or training environment would the student enjoy most?',
      mr: 'विद्यार्थ्याला कोणत्या प्रकारच्या कामाच्या वातावरणात काम करायला आवडेल?',
      hi: 'विद्यार्थी को दैनिक कार्य या प्रशिक्षण के लिए कैसा वातावरण सबसे अधिक पसंद आएगा?',
    },
    description: {
      en: 'Choose up to 2 preferred environments.',
      mr: 'कमाल २ पसंतीची वातावरण निवडा.',
      hi: 'अपनी पसंद के अधिकतम 2 वातावरण चुनें।',
    },
    responseType: 'multiple_choice',
    maxSelections: 2,
    required: true,
    options: [
      {
        id: 'workshop_plant',
        label: { en: 'Industrial workshop, auto service bay, or manufacturing plant', mr: 'औद्योगिक वर्कशॉप, ऑटोमोबाईल सर्व्हिस सेंटर किंवा फॅक्टरी', hi: 'औद्योगिक वर्कशॉप, ऑटो सर्विस सेंटर या फैक्ट्री प्लांट' },
      },
      {
        id: 'outdoor_fieldwork',
        label: { en: 'Outdoor field site, rooftop installations, agricultural farm', mr: 'खुल्या जागेत किंवा शेतात प्रत्यक्ष काम, सोलर रूफटॉप', hi: 'खुले मैदान में काम, रूफटॉप सोलर स्थापना, या कृषि फार्म' },
      },
      {
        id: 'healthcare_hospital',
        label: { en: 'Hospital ward, diagnostic lab, or medical clinic', mr: 'हॉस्पिटल, क्लिनिक किंवा रुग्णालय', hi: 'अस्पताल वार्ड, डायग्नोस्टिक लैब या मेडिकल क्लिनिक' },
      },
      {
        id: 'office_digital',
        label: { en: 'Office workstation, computer lab, or software desk', mr: 'ऑफिस, कम्प्युटर लॅब किंवा डिजिटल डेस्क', hi: 'कार्यालय वर्कस्टेशन, कंप्यूटर लैब या सॉफ्टवेयर डेस्क' },
      },
      {
        id: 'customer_service',
        label: { en: 'Customer-facing technical advisor or direct client consulting', mr: 'थेट ग्राहकांशी संवाद साधून समस्या सोडवणे', hi: 'ग्राहकों से प्रत्यक्ष संवाद करने वाला तकनीकी सलाहकार' },
      },
      {
        id: 'self_employment',
        label: { en: 'Own independent shop, workshop, or mobile repair service', mr: 'स्वतःचे दुकान, वर्कशॉप किंवा स्वतंत्र व्यवसाय', hi: 'अपनी स्वतंत्र दुकान, वर्कशॉप या मोबाइल रिपेयरिंग सेवा' },
      },
      {
        id: 'open_environment',
        label: { en: 'Flexible and open to different working conditions', mr: 'कोणत्याही चांगल्या वातावरणात काम करण्याची तयारी', hi: 'लचीला और विभिन्न कार्य परिस्थितियों के लिए तैयार' },
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
      hi: 'दीर्घकालिक योजना',
    },
    question: {
      en: 'How important is pursuing higher education after completing the initial course?',
      mr: 'पहिला कोर्स पूर्ण केल्यानंतर पुढील उच्च शिक्षण घेणे किती महत्त्वाचे वाटते?',
      hi: 'पहला कोर्स पूरा करने के बाद आगे की उच्च शिक्षा प्राप्त करना कितना महत्वपूर्ण है?',
    },
    description: {
      en: 'Understanding this helps families balance immediate earning needs with degree aspirations.',
      mr: 'यामुळे तातडीने पैसे कमावणे आणि पदवीचे स्वप्न यांत योग्य सुवर्णमध्य साधता येतो.',
      hi: 'इससे तुरंत कमाई की जरूरत और डिग्री के सपनों में संतुलन बनाने में मदद मिलती है।',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'start_earning_asap',
        label: { en: 'Want to start earning as soon as possible to support the family', mr: 'कुटुंबाला हातभार लावण्यासाठी लवकरात लवकर पगार सुरू करणे', hi: 'परिवार को सहयोग देने के लिए जल्द से जल्द कमाई शुरू करना' },
      },
      {
        id: 'work_and_study_later',
        label: { en: 'Work full-time first, then self-fund higher studies after 1–2 years', mr: 'आधी १-२ वर्षे नोकरी करून अनुभवासह स्वतःच्या पैशाने पुढे शिकणे', hi: 'पहले 1-2 वर्ष नौकरी करना, फिर अपनी कमाई से आगे की पढ़ाई करना' },
      },
      {
        id: 'continuous_degree_path',
        label: { en: 'Must have a clear, accredited pathway toward a formal degree or diploma', mr: 'कौशल्यासोबतच अधिकृत पदवी मिळण्याचा पक्का मार्ग असावा', hi: 'कौशल के साथ औपचारिक डिग्री या डिप्लोमा का स्पष्ट सरकारी रास्ता होना चाहिए' },
      },
      {
        id: 'not_decided_progression',
        label: { en: 'Not decided yet; will see based on early job performance', mr: 'अजून ठरवले नाही; पहिल्या नोकरीच्या अनुभवानंतर ठरवू', hi: 'अभी तय नहीं; पहली नौकरी के अनुभव के बाद निर्णय लेंगे' },
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
      hi: 'कोर्स चयन',
    },
    question: {
      en: 'Is there a particular vocational course from our catalogue your family wants to explore?',
      mr: 'स्किलसाथीवरील कोर्सेसपैकी कोणता विशिष्ट कोर्स आपल्याला विशेष जाणून घ्यायचा आहे?',
      hi: 'स्किलसाथी कैटलॉग में से क्या कोई विशेष वोकेशनल कोर्स है जिसके बारे में परिवार जानना चाहता है?',
    },
    description: {
      en: 'Select a course if you have one in mind, or choose "Not sure yet" for tailored recommendations.',
      mr: 'मनात एखादा कोर्स असल्यास निवडा, किंवा योग्य सल्ल्यासाठी "निश्चित नाही" निवडा.',
      hi: 'यदि कोई कोर्स ध्यान में है तो चुनें, या सटीक सिफारिशों के लिए "अभी निश्चित नहीं" चुनें।',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'solar-pv-tech',
        label: { en: 'Solar PV Installation & Maintenance Technician', mr: 'सोलर पीव्ही इन्स्टॉलेशन आणि मेंटेनन्स टेक्निशियन', hi: 'सोलर पीवी इंस्टॉलेशन और मेंटेनेंस तकनीशियन' },
        description: { en: '6 Months (Hybrid) · NSQF Level 4 · Renewable Energy', mr: '६ महिने · NSQF स्तर ४ · सौर ऊर्जा क्षेत्र', hi: '6 महीने (हाइब्रिड) · NSQF स्तर 4 · नवीकरणीय ऊर्जा' },
      },
      {
        id: 'ev-service-specialist',
        label: { en: 'Electric Vehicle (EV) Powertrain & Diagnostics Specialist', mr: 'इलेक्ट्रिक व्हेईकल (EV) पॉवरट्रेन आणि डायग्नोस्टिक्स स्पेशालिस्ट', hi: 'इलेक्ट्रिक वाहन (EV) पावरट्रेन और डायग्नोस्टिक्स विशेषज्ञ' },
        description: { en: '8 Months (Offline) · NSQF Level 5 · Automotive', mr: '८ महिने · NSQF स्तर ५ · ऑटोमोबाईल क्षेत्र', hi: '8 महीने (ऑफलाइन) · NSQF स्तर 5 · ऑटोमोटिव' },
      },
      {
        id: 'general-duty-assistant',
        label: { en: 'General Duty Assistant & Patient Care Technician', mr: 'जनरल ड्युटी असिस्टंट आणि पेशंट केअर टेक्निशियन', hi: 'जनरल ड्यूटी असिस्टेंट और रोगी देखभाल तकनीशियन' },
        description: { en: '6 Months (Hybrid) · NSQF Level 4 · Healthcare', mr: '६ महिने · NSQF स्तर ४ · आरोग्यसेवा क्षेत्र', hi: '6 महीने (हाइब्रिड) · NSQF स्तर 4 · स्वास्थ्य सेवा' },
      },
      {
        id: 'full-stack-web-dev',
        label: { en: 'Front-End & Full-Stack Web Development Associate', mr: 'फ्रंट-एंड आणि फुल-स्टॅक वेब डेव्हलपमेंट असोसिएट', hi: 'फ्रंट-एंड और फुल-स्टैक वेब डेवलपमेंट एसोसिएट' },
        description: { en: '6 Months (Online/Hybrid) · NSQF Level 5 · IT & Software', mr: '६ महिने · NSQF स्तर ५ · आयटी आणि सॉफ्टवेअर', hi: '6 महीने (ऑनलाइन/हाइब्रिड) · NSQF स्तर 5 · आईटी और सॉफ्टवेयर' },
      },
      {
        id: 'cnc-machining-tech',
        label: { en: 'CNC Milling & Turning Machine Operator', mr: 'सीएनसी मिलिंग आणि टर्निंग मशिन ऑपरेटर', hi: 'सीएनसी मिलिंग और टर्निंग मशीन ऑपरेटर' },
        description: { en: '6 Months (Offline) · NSQF Level 4 · Manufacturing', mr: '६ महिने · NSQF स्तर ४ · उत्पादन आणि मशिनिंग', hi: '6 महीने (ऑफलाइन) · NSQF स्तर 4 · निर्माण और मशीनिंग' },
      },
      {
        id: 'drone-survey-agri',
        label: { en: 'Agricultural Drone Pilot & Precision Farming Specialist', mr: 'अ‍ॅग्रीकल्चरल ड्रोन पायलट आणि प्रिसिजन फार्मिंग', hi: 'कृषि ड्रोन पायलट और प्रिसिजन फार्मिंग विशेषज्ञ' },
        description: { en: '4 Months (Offline) · NSQF Level 4 · Agriculture Allied', mr: '४ महिने · NSQF स्तर ४ · आधुनिक शेती तंत्रज्ञान', hi: '4 महीने (ऑफलाइन) · NSQF स्तर 4 · कृषि व संबंद्ध क्षेत्र' },
      },
      {
        id: 'not_sure_course',
        label: { en: 'Not sure yet — Recommend based on my assessment answers', mr: 'अजून निश्चित नाही — आमच्या उत्तरांनुसार योग्य कोर्सेस दाखवा', hi: 'अभी निश्चित नहीं — मेरे मूल्यांकन उत्तरों के आधार पर सुझाव दें' },
        description: { en: 'We will match our top verified courses to your responses', mr: 'आम्ही आपल्या उत्तरांनुसार सर्वोत्तम कोर्सेस जुळवून दाखवू', hi: 'हम आपके उत्तरों के आधार पर सर्वश्रेष्ठ सत्यापित कोर्स सुझाएंगे' },
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
      hi: 'अतिरिक्त विवरण',
    },
    question: {
      en: 'Is there anything else the student or family would like the counsellor to understand?',
      mr: 'समुपदेशकाने समजून घ्यावी अशी कुटुंबाची किंवा विद्यार्थ्याची इतर काही विशेष बाब आहे का?',
      hi: 'क्या कोई अन्य महत्वपूर्ण बात है जो छात्र या परिवार काउंसलर को बताना चाहते हैं?',
    },
    description: {
      en: 'Optional. This is a local frontend prototype session. Please do not submit real sensitive personal information.',
      mr: 'ऐच्छिक. हे स्थानिक प्रोटोटाइप सत्र आहे. कृपया कोणतीही संवेदनशील वैयक्तिक माहिती टाकू नका.',
      hi: 'वैकल्पिक। यह स्थानीय प्रोटोटाइप सत्र है। कृपया वास्तविक संवेदनशील व्यक्तिगत जानकारी न भरें।',
    },
    responseType: 'free_text',
    required: false,
    placeholder: {
      en: 'Share any unique financial circumstances, location preferences, or family discussions...',
      mr: 'कौटुंबिक परिस्थिती, स्थलांतराची तयारी किंवा इतर कोणत्याही विचारांबद्दल थोडक्यात लिहा...',
      hi: 'आर्थिक स्थिति, स्थान की पसंद या पारिवारिक चर्चा से जुड़ी कोई भी बात साझा करें...',
    },
  },
];
