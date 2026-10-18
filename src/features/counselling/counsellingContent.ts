import { Course } from '../../types/course';

export type CounsellingPerspective = 'student' | 'parent' | 'joint';
export type CounsellingLanguage = 'en' | 'mr' | 'hi';

export interface UIContent {
  headerTitle: string;
  headerSubtitle: string;
  prototypeBadge: string;
  resetButton: string;
  resetConfirmTitle: string;
  resetConfirmDesc: string;
  resetConfirmButton: string;
  cancelButton: string;
  perspectiveLabel: string;
  perspectives: {
    student: string;
    parent: string;
    joint: string;
  };
  inputPlaceholder: string;
  sendButton: string;
  typingText: string;
  suggestedHeading: string;
  courseContextPrefix: string;
  viewCourseDetails: string;
  clearCourseContext: string;
  humanCounsellorBtn: string;
  escalationModalTitle: string;
  escalationModalSubtitle: string;
  evidencePanelTitle: string;
  evidenceVerifiedBadge: string;
  evidenceIllustrativeBadge: string;
}

export const COUNSELLING_UI_TEXT: Record<CounsellingLanguage, UIContent> = {
  en: {
    headerTitle: 'AI Family Counsellor',
    headerSubtitle: 'Explore vocational courses, earning stability, and career progression together as a family.',
    prototypeBadge: 'Simulated AI Prototype · Local Guidance Engine',
    resetButton: 'New Conversation',
    resetConfirmTitle: 'Start a new counselling session?',
    resetConfirmDesc: 'This will clear the current conversation history. Any saved course selections will remain in your explorer.',
    resetConfirmButton: 'Start Fresh',
    cancelButton: 'Cancel',
    perspectiveLabel: 'Select Exploration Lens:',
    perspectives: {
      student: 'Student Perspective',
      parent: 'Parent Perspective',
      joint: 'Explore Together (Family)',
    },
    inputPlaceholder: 'Ask any question (e.g., job security, earning potential, B.Voc degree progression)...',
    sendButton: 'Send',
    typingText: 'SkillSaathi Counsellor is thinking...',
    suggestedHeading: 'Recommended Questions for this Discussion:',
    courseContextPrefix: 'Discussing Course:',
    viewCourseDetails: 'View Full Course Details',
    clearCourseContext: 'Clear Context',
    humanCounsellorBtn: 'Talk to a Certified Human Counsellor',
    escalationModalTitle: 'Schedule 1-on-1 Vocational Counselling',
    escalationModalSubtitle: 'Connect with a district vocational guidance expert for personalized family advising.',
    evidencePanelTitle: 'Course Evidence & Verification',
    evidenceVerifiedBadge: 'NCVET / NSDC Aligned',
    evidenceIllustrativeBadge: 'Illustrative Prototype Metric',
  },
  mr: {
    headerTitle: 'एआय कुटुंब करिअर समुपदेशक',
    headerSubtitle: 'व्यावसायिक कोर्सेस, कमाईची स्थिरता आणि करिअर प्रगतीबद्दल विद्यार्थी आणि पालकांनी एकत्र चर्चा करा.',
    prototypeBadge: 'प्रोटोटाइप सिम्युलेशन · स्थानिक मार्गदर्शन प्रणाली',
    resetButton: 'नवीन संभाषण (New Session)',
    resetConfirmTitle: 'नवीन समुपदेशन सत्र सुरू करायचे का?',
    resetConfirmDesc: 'यामुळे सध्याचे संभाषण रीसेट होईल. सेव्ह केलेले कोर्सेस तुमच्या एक्सप्लोररमध्ये सुरक्षित राहतील.',
    resetConfirmButton: 'सत्र पुन्हा सुरू करा',
    cancelButton: 'रद्द करा',
    perspectiveLabel: 'चर्चेचा दृष्टिकोन निवडा:',
    perspectives: {
      student: 'विद्यार्थी दृष्टिकोन (Student)',
      parent: 'पालक दृष्टिकोन (Parent)',
      joint: 'कुटुंब एकत्र (Family Together)',
    },
    inputPlaceholder: 'आपला प्रश्न विचारा (उदा. नोकरीची संधी, पगार, पदवीची तुलना, करिअर वाढ)...',
    sendButton: 'पाठवा',
    typingText: 'समुपदेशक उत्तर तयार करत आहेत...',
    suggestedHeading: 'या संभाषणासाठी सुचवलेले प्रश्न:',
    courseContextPrefix: 'निवडलेला कोर्स:',
    viewCourseDetails: 'संपूर्ण कोर्स माहिती पहा',
    clearCourseContext: 'कोर्स संदर्भ काढा',
    humanCounsellorBtn: 'मानवी तज्ज्ञ समुपदेशकांशी संपर्क साधा',
    escalationModalTitle: '१-ऑन-१ वैयक्तिक समुपदेशन बुक करा',
    escalationModalSubtitle: 'जिल्हास्तरीय व्यावसायिक करिअर तज्ज्ञांशी वैयक्तिक मार्गदर्शनासाठी संपर्क करा.',
    evidencePanelTitle: 'कोर्स पुरावे आणि पडताळणी',
    evidenceVerifiedBadge: 'NCVET / NSDC मान्यताप्राप्त',
    evidenceIllustrativeBadge: 'प्रात्यक्षिक मार्गदर्शक आकडेवारी',
  },
  hi: {
    headerTitle: 'एआई परिवार करियर काउंसलर',
    headerSubtitle: 'व्यावसायिक कोर्स, कमाई की स्थिरता और करियर में उन्नति के बारे में विद्यार्थी और अभिभावक मिलकर चर्चा करें।',
    prototypeBadge: 'प्रोटोटाइप सिमुलेशन · स्थानीय मार्गदर्शन प्रणाली',
    resetButton: 'नई बातचीत (New Session)',
    resetConfirmTitle: 'नया काउंसलिंग सत्र शुरू करें?',
    resetConfirmDesc: 'इससे वर्तमान बातचीत का इतिहास साफ हो जाएगा। सहेजे गए कोर्स आपके एक्सप्लोरर में सुरक्षित रहेंगे।',
    resetConfirmButton: 'सत्र दोबारा शुरू करें',
    cancelButton: 'रद्द करें',
    perspectiveLabel: 'चर्चा का दृष्टिकोण चुनें:',
    perspectives: {
      student: 'विद्यार्थी दृष्टिकोण (Student)',
      parent: 'अभिभावक दृष्टिकोण (Parent)',
      joint: 'परिवार साथ मिलकर (Family Together)',
    },
    inputPlaceholder: 'अपना प्रश्न पूछें (उदा. नौकरी के अवसर, वेतन, डिग्री की तुलना, करियर वृद्धि)...',
    sendButton: 'भेजें',
    typingText: 'काउंसलर उत्तर तैयार कर रहे हैं...',
    suggestedHeading: 'इस बातचीत के लिए सुझाए गए प्रश्न:',
    courseContextPrefix: 'चर्चा हेतु चुना गया कोर्स:',
    viewCourseDetails: 'कोर्स का पूरा विवरण देखें',
    clearCourseContext: 'कोर्स संदर्भ हटाएं',
    humanCounsellorBtn: 'मानव विशेषज्ञ काउंसलर से बात करें',
    escalationModalTitle: '1-ऑन-1 व्यक्तिगत काउंसलिंग बुक करें',
    escalationModalSubtitle: 'जिला स्तरीय व्यावसायिक करियर विशेषज्ञों से व्यक्तिगत मार्गदर्शन के लिए संपर्क करें।',
    evidencePanelTitle: 'कोर्स साक्ष्य और सत्यापन',
    evidenceVerifiedBadge: 'NCVET / NSDC मान्यता प्राप्त',
    evidenceIllustrativeBadge: 'प्रोटोटाइप मार्गदर्शक आंकड़े',
  },
};

export interface SuggestedQuestionItem {
  id: string;
  category: string;
  en: string;
  mr: string;
  hi?: string;
}

export const SUGGESTED_QUESTIONS: Record<CounsellingPerspective, SuggestedQuestionItem[]> = {
  student: [
    {
      id: 'sq-s1',
      category: 'skills',
      en: 'What will I actually learn in this course?',
      mr: 'या कोर्समध्ये मला नेमके काय शिकायला मिळेल?',
      hi: 'इस कोर्स में मुझे वास्तव में क्या सीखने को मिलेगा?',
    },
    {
      id: 'sq-s2',
      category: 'workday',
      en: 'What does a typical workday look like in this trade?',
      mr: 'या क्षेत्रात दैनंदिन कामाचे स्वरूप कसे असते?',
      hi: 'इस ट्रेड में सामान्य कामकाजी दिन कैसा होता है?',
    },
    {
      id: 'sq-s3',
      category: 'jobs',
      en: 'What jobs can I apply for right after completing this course?',
      mr: 'हा कोर्स पूर्ण झाल्यावर मी कोणत्या नोकऱ्यांसाठी अर्ज करू शकेन?',
      hi: 'यह कोर्स पूरा करने के तुरंत बाद मैं किन नौकरियों के लिए आवेदन कर सकता हूँ?',
    },
    {
      id: 'sq-s4',
      category: 'education',
      en: 'Can I study further for a degree later without losing academic years?',
      mr: 'मी नंतर पदवीचे उच्च शिक्षण घेऊ शकेन का? माझे वर्ष वाया जाईल का?',
      hi: 'क्या मैं बाद में साल गंवाए बिना डिग्री की आगे की पढ़ाई कर सकता हूँ?',
    },
  ],
  parent: [
    {
      id: 'sq-p1',
      category: 'placement',
      en: 'Will this course genuinely lead to a real, verified job?',
      mr: 'हा कोर्स पूर्ण केल्यावर माझ्या पाल्याला खरी, खात्रीशीर नोकरी मिळेल का?',
      hi: 'क्या यह कोर्स पूरा करने के बाद मेरे बच्चे को वास्तव में प्रमाणित नौकरी मिलेगी?',
    },
    {
      id: 'sq-p2',
      category: 'earnings',
      en: 'How much can my child earn initially and after 3 years?',
      mr: 'सुरुवातीला आणि ३ वर्षांनंतर किती पगार मिळू शकतो?',
      hi: 'शुरुआत में और 3 साल बाद मेरा बच्चा कितना कमा सकता है?',
    },
    {
      id: 'sq-p3',
      category: 'respect',
      en: 'Is this a stable and respectable career in society?',
      mr: 'समाजात या करिअरला प्रतिष्ठा आणि स्थिरता आहे का?',
      hi: 'क्या समाज में इस करियर में स्थिरता और सम्मान है?',
    },
    {
      id: 'sq-p4',
      category: 'risks',
      en: 'What are the practical risks or limitations of choosing vocational path?',
      mr: 'पारंपरिक शिक्षणाऐवजी व्यावसायिक मार्ग निवडण्याचे काय तोटे किंवा धोके आहेत?',
      hi: 'पारंपरिक शिक्षा के बजाय वोकेशनल रास्ता चुनने की व्यावहारिक सीमाएं या जोखिम क्या हैं?',
    },
  ],
  joint: [
    {
      id: 'sq-j1',
      category: 'degree_comparison',
      en: "Let's compare this vocational course with a conventional 3-year BA/B.Com degree.",
      mr: 'या व्यावसायिक कोर्सची पारंपरिक ३ वर्षांच्या बीए/बीकॉम पदवीशी तुलना करूया.',
      hi: 'आइए इस वोकेशनल कोर्स की पारंपरिक 3-वर्षीय बीए/बीकॉम डिग्री से तुलना करें।',
    },
    {
      id: 'sq-j2',
      category: 'tradeoffs',
      en: 'What are the main advantages and trade-offs for our family?',
      mr: 'आमच्या कुटुंबासाठी याचे मुख्य फायदे आणि तडजोडी काय आहेत?',
      hi: 'हमारे परिवार के लिए इसके मुख्य फायदे और समझौते क्या हैं?',
    },
    {
      id: 'sq-j3',
      category: 'consensus',
      en: 'How can student and parents make an aligned decision without conflict?',
      mr: 'विद्यार्थी आणि पालकांनी वाद न घालता एकत्रित योग्य निर्णय कसा घ्यावा?',
      hi: 'विद्यार्थी और अभिभावक बिना किसी विवाद के मिलकर सही निर्णय कैसे लें?',
    },
    {
      id: 'sq-j4',
      category: 'nep_mobility',
      en: 'How does NEP 2020 allow moving between skills and formal university degrees?',
      mr: 'नवीन शैक्षणिक धोरण (NEP 2020) कौशल्य व विद्यापीठ पदवी यांच्यात कशी संधी देते?',
      hi: 'नई शिक्षा नीति (NEP 2020) कौशल और औपचारिक विश्वविद्यालय डिग्री के बीच कैसे अवसर देती है?',
    },
  ],
};

export interface ResponseTemplate {
  category: string;
  keywords: string[];
  en: (course?: Course | null, perspective?: CounsellingPerspective) => string;
  mr: (course?: Course | null, perspective?: CounsellingPerspective) => string;
  hi: (course?: Course | null, perspective?: CounsellingPerspective) => string;
}

export const RESPONSE_TEMPLATES: ResponseTemplate[] = [
  // 1. Practical Skills & Learning
  {
    category: 'skills',
    keywords: [
      'learn', 'actual', 'curriculum', 'practical', 'hands-on', 'tools', 'workday',
      'काम', 'शिकायला', 'कौशल्य', 'प्रात्यक्षिक',
      'सीखना', 'प्रैक्टिकल', 'ट्रेनिंग', 'कार्यशाला', 'औजार',
    ],
    en: (course) => {
      if (course) {
        const skillsList = course.skillsAcquired?.join(', ') || 'practical workshop operations and fault diagnostics';
        const hours = course.practicalHours ? `${course.practicalHours} hours of dedicated laboratory practice` : 'significant workshop training';
        return `In the **${course.title}** program, learning is 70% hands-on rather than book memorization. You will gain direct experience in ${skillsList}. The course includes ${hours} where you work on real industrial equipment. A typical day combines safety briefings, component diagnostics, and supervised tool operation under experienced instructors.`;
      }
      return `Vocational courses emphasize applied competence over rote theory. Students spend approximately 60-70% of their curriculum in workshops and field labs—operating diagnostic tools, assembling components, and working through live industry simulations.`;
    },
    mr: (course) => {
      if (course) {
        const skillsList = course.skillsAcquired?.join(', ') || 'प्रात्यक्षिक कार्यशाळा आणि उपकरण दुरुस्ती';
        return `**${course.title}** या कोर्समध्ये ७०% शिक्षण हे थेट प्रात्यक्षिकांवर (Hands-on) आधारित असते, केवळ पुस्तकी पाठांतरावर नाही. यामध्ये तुम्हाला ${skillsList} या कौशल्यांचे सखोल प्रशिक्षण मिळेल. यामध्ये विद्यार्थी खऱ्या औद्योगिक उपकरणांवर काम करतात. दैनंदिन कामात सुरक्षेचे नियम, मशीन टेस्टिंग आणि प्रत्यक्ष टूल हँडलिंगचा समावेश असतो.`;
      }
      return `व्यावसायिक अभ्यासक्रमांचे वैशिष्ट्य म्हणजे यात ७०% वेळ प्रत्यक्ष प्रॅक्टिकल आणि कार्यशाळेत व्यतीत होतो. विद्यार्थी स्वतः उपकरणांवर काम करून कौशल्ये आत्मसात करतात.`;
    },
    hi: (course) => {
      if (course) {
        const skillsList = course.skillsAcquired?.join(', ') || 'प्रैक्टिकल वर्कशॉप संचालन और उपकरण रिपेयरिंग';
        const hours = course.practicalHours ? `${course.practicalHours} घंटे की विशेष प्रयोगशाला प्रैक्टिस` : 'पर्याप्त वर्कशॉप प्रशिक्षण';
        return `**${course.title}** प्रोग्राम में 70% पढ़ाई पुस्तकीय रटने के बजाय हैंड्स-ऑन प्रैक्टिकल वर्कशॉप पर आधारित है। इसमें आपको ${skillsList} का प्रत्यक्ष प्रशिक्षण मिलेगा। कोर्स में ${hours} शामिल हैं जहाँ आप वास्तविक औद्योगिक उपकरणों पर काम करते हैं। सामान्य दिन में सुरक्षा निर्देश, कंपोनेंट टेस्टिंग और अनुभवी प्रशिक्षकों की देखरेख में टूल्स का संचालन शामिल होता है।`;
      }
      return `व्यावसायिक पाठ्यक्रमों की विशेषता यह है कि इनमें 70% समय प्रत्यक्ष प्रैक्टिकल और कार्यशाला में बीतता है। छात्र खुद उपकरणों पर काम करके उपयोगी कौशल सीखते हैं।`;
    },
  },

  // 2. Earnings and Income Reality
  {
    category: 'earnings',
    keywords: [
      'earn', 'salary', 'income', 'money', 'wage', 'stipend',
      'किती', 'पगार', 'कमाई', 'वेतन',
      'वेतन', 'कमाई', 'रुपये', 'पैसे', 'वजीफा',
    ],
    en: (course) => {
      if (course) {
        const salary = course.careerOutcome.averageStartingSalaryInr.toLocaleString();
        return `Regarding compensation for **${course.title}**:\n\n- **Illustrative Entry Benchmark:** Surveyed entry-level technician roles report an initial wage guideline around **₹${salary} per month** in industrial corridors like Pune, Nashik, or Chhatrapati Sambhajinagar.\n- **Apprenticeship Stipend:** During the initial 6–12 months of NAPS apprenticeships, candidates typically receive ₹8,000–₹12,000/month as government/industry stipends.\n- **Growth Outlook:** Technicians who master diagnostics, PLC controls, or supervisory duties often advance to ₹35,000–₹45,000/month within 3 to 4 years.\n\n*Important Prototype Transparency Note: These figures represent illustrative regional survey guidelines, not guaranteed contractual salaries. Actual compensation depends on student competency, overtime allowances, and hiring organization scale.*`;
      }
      return `Starting earnings in certified vocational sectors range from ₹16,000 to ₹28,000 per month depending on technical discipline (such as EV, Solar, CNC machining, or healthcare). Furthermore, structured apprenticeships under the National Apprenticeship Promotion Scheme (NAPS) offer legal monthly stipends during on-the-job training. Note: Salary figures in this prototype are illustrative benchmarks based on industry surveys.`;
    },
    mr: (course) => {
      if (course) {
        const salary = course.careerOutcome.averageStartingSalaryInr.toLocaleString();
        return `**${course.title}** या कोर्समधील उत्पन्नाबाबत खरी माहिती:\n\n- **सुरुवातीचा मार्गदर्शक पगार:** पुणे, नाशिक किंवा औरंगाबाद (संभाजीनगर) औद्योगिक भागात सुरुवातीला अंदाजे **₹${salary} दरमहा** मानधन/पगार मिळतो.\n- **शिकाऊ उमेदवारी (Apprenticeship):** सुरुवातीच्या ६ ते १२ महिन्यांच्या अप्रेंटिसशिपमध्ये दरमहा ₹८,००० ते ₹१२,००० विद्यावेतन (Stipend) मिळते.\n- **३-४ वर्षांनंतरची प्रगती:** कामाचा अनुभव, मशीन हाताळणी आणि सुपरवायझर पदावर पदोन्नती मिळाल्यास पगार ₹३५,००० ते ₹४५,००० पर्यंत वाढू शकतो.\n\n*नोंद: ही आकडेवारी औद्योगिक पाहणीवर आधारित प्रात्यक्षिक मार्गदर्शक अंदाज आहे, ही कोणतीही हमी नाही. प्रत्यक्ष पगार विद्यार्थ्याचे कौशल्य आणि कंपनीच्या नियमांवर अवलंबून असतो.*`;
      }
      return `प्रमाणित व्यावसायिक क्षेत्रात सुरुवातीला मासिक ₹१६,००० ते ₹२८,००० पर्यंत पगार मिळू शकतो. प्रत्यक्ष पगार कौशल्य, कामाचा अनुभव आणि कंपनीवर अवलंबून असतो. ही आकडेवारी केवळ मार्गदर्शक संदर्भासाठी आहे.`;
    },
    hi: (course) => {
      if (course) {
        const salary = course.careerOutcome.averageStartingSalaryInr.toLocaleString();
        return `**${course.title}** में आय और वेतन से जुड़ी वास्तविक स्थिति:\n\n- **शुरुआती बेंचमार्क वेतन:** औद्योगिक क्षेत्रों (जैसे पुणे, नाशिक, संभाजीनगर आदि) में एंट्री-लेवल तकनीशियन के लिए शुरुआती दिशानिर्देश वेतन लगभग **₹${salary} प्रति माह** रहता है।\n- **अप्रेंटिसशिप वजीफा (Stipend):** NAPS अप्रेंटिसशिप के शुरुआती 6–12 महीनों के दौरान छात्रों को प्रति माह ₹8,000–₹12,000 सरकारी/औद्योगिक वजीफा मिलता है।\n- **3-4 वर्षों में विकास:** डायग्नोस्टिक्स, ऑटोमेशन या सुपरवाइजरी में निपुण तकनीशियन 3–4 वर्षों में ₹35,000–₹45,000/माह तक आसानी से प्रगति करते हैं।\n\n*महत्वपूर्ण प्रोटोटाइप पारदर्शिता नोट: ये आंकड़े औद्योगिक सर्वेक्षणों पर आधारित मार्गदर्शक अनुमान हैं, कोई कानूनी गारंटी नहीं। वास्तविक वेतन छात्र की दक्षता और कंपनी के पैमाने पर निर्भर करता है।*`;
      }
      return `प्रमाणित वोकेशनल क्षेत्रों में शुरुआती मासिक वेतन ₹16,000 से ₹28,000 तक हो सकता है। इसके अलावा, NAPS के तहत कानूनी मासिक वजीफा भी ऑन-द-जॉब ट्रेनिंग में मिलता है।`;
    },
  },

  // 3. Placement & Real Job Verification
  {
    category: 'placement',
    keywords: [
      'real job', 'job', 'placement', 'company', 'hiring', 'companies', 'employers',
      'नोकरी', 'कंपनी', 'प्लेसमेंट',
      'नौकरी', 'कंपनी', 'प्लेसमेंट', 'रोजगार', 'भर्ती',
    ],
    en: (course) => {
      if (course) {
        const employers = course.careerOutcome.potentialEmployers?.join(', ') || 'major regional industrial contractors';
        return `Yes, **${course.title}** is tied directly to verified hiring demand. Representative employers in this domain include **${employers}**. Unlike general academic programs with vague job links, accredited NCVET/NSDC courses mandate active industry tie-ups, campus job fairs, and direct empanelment on the National Apprenticeship Portal. You can verify the training center's accreditation on the official skill development portal.`;
      }
      return `Accredited vocational programs under NSDC and NCVET partner with organized sector employers. Institutes are required to maintain placement assistance cells, tie-ups with district industrial clusters (such as MIDC zones), and register apprentices on the government's official portals.`;
    },
    mr: (course) => {
      if (course) {
        const employers = course.careerOutcome.potentialEmployers?.join(', ') || 'स्थानिक औद्योगिक कंपन्या';
        return `होय, **${course.title}** हा कोर्स थेट औद्योगिक मागणीशी जोडलेला आहे. या क्षेत्रात **${employers}** सारख्या नामांकित कंपन्या आणि त्यांचे पुरवठादार तंत्रज्ञांची भरती करतात. सामान्य पदवीच्या तुलनेत, शासकीय मान्यताप्राप्त NCVET कोर्सेसमध्ये थेट कॅम्पस इंटरव्ह्यू आणि राष्ट्रीय अप्रेंटिसशिप पोर्टलद्वारे कंपन्यांमध्ये संधी उपलब्ध होते.`;
      }
      return `शासकीय कौशल्य विकास मोहिमेअंतर्गत प्रमाणित कोर्सेसचे थेट औद्योगिक वसाहतींशी (MIDC) सामंजस्य करार असतात. त्यामुळे कुशल उमेदवारांना वेगाने नोकरीची संधी उपलब्ध होते.`;
    },
    hi: (course) => {
      if (course) {
        const employers = course.careerOutcome.potentialEmployers?.join(', ') || 'क्षेत्रीय औद्योगिक कंपनियाँ';
        return `हाँ, **${course.title}** सीधे वास्तविक औद्योगिक मांग से जुड़ा हुआ है। इस क्षेत्र में भर्ती करने वाले प्रमुख नियोक्ताओं में **${employers}** शामिल हैं। सामान्य शैक्षणिक डिग्रियों के विपरीत, NCVET/NSDC से मान्यता प्राप्त कोर्सों में कैंपस इंटरव्यू, अप्रेंटिसशिप पोर्टल पर सीधा पंजीकरण और औद्योगिक प्लेसमेंट की मजबूत व्यवस्था होती है।`;
      }
      return `सरकारी कौशल विकास मिशन के तहत प्रमाणित कोर्सों के औद्योगिक क्लस्टरों (MIDC) के साथ सीधे अनुबंध होते हैं, जिससे कुशल युवाओं को त्वरित रोजगार मिलता है।`;
    },
  },

  // 4. Job Security & Longevity
  {
    category: 'security',
    keywords: [
      'security', 'stable', 'permanent', 'stability', 'future',
      'लांब पल्ल्याची', 'स्थिरता', 'सुरक्षा', 'भविष्य',
      'स्थिरता', 'सुरक्षा', 'स्थायी', 'सुरक्षित',
    ],
    en: () => {
      return `Job security in technical vocational trades is anchored in practical indispensability: machinery, electrical infrastructure, renewable solar grids, and EV fleets cannot be operated or maintained by pure software. Skilled technicians who possess formal certification, adhere to safety standards, and continuously upgrade their skills maintain high job security and quick re-employment even during broader economic slowdowns.`;
    },
    mr: () => {
      return `तांत्रिक व्यावसायिक क्षेत्रातील नोकरीची सुरक्षा ही प्रत्यक्ष कौशल्यावर अवलंबून असते. सौरऊर्जा प्रकल्प, ईव्ही वाहने, सीएनसी मशीन्स किंवा आरोग्य सेवा या गोष्टी केवळ संगणकावर चालत नाहीत; त्यांना प्रत्यक्ष दुरुस्त करणारे आणि हाताळणारे तंत्रज्ञ नेहमी आवश्यक असतात. प्रमाणपत्रधारक आणि कामात निष्णात तंत्रज्ञांना कायमस्वरूपी मागणी राहते.`;
    },
    hi: () => {
      return `तकनीकी वोकेशनल क्षेत्रों में नौकरी की सुरक्षा प्रैक्टिकल अपरिहार्यता पर टिकी है: मशीनरी, सोलर ग्रिड, ईवी इंफ्रास्ट्रक्चर या हेल्थकेयर सिर्फ सॉफ्टवेयर से नहीं चल सकते। उनके रख-रखाव और संचालन के लिए कुशल तकनीशियनों की हमेशा जरूरत रहती है। औपचारिक प्रमाणपत्र और उच्च सुरक्षा मानकों वाले कुशल कारीगरों को मंदी के दौर में भी रोजगार की सुरक्षा मिलती है।`;
    },
  },

  // 5. Social Perception & Respect
  {
    category: 'respect',
    keywords: [
      'respect', 'society', 'dignity', 'prestige', 'relatives', 'social',
      'प्रतिष्ठा', 'समाज', 'मान', 'आदर', 'नातेवाईक',
      'सम्मान', 'प्रतिष्ठा', 'समाज', 'रिश्तेदार', 'मान',
    ],
    en: () => {
      return `This is a very common concern among parents. Traditionally, vocational trades were seen as a fallback. However, modern vocational careers in sectors like Electric Mobility, Solar Engineering, and Advanced Precision Machining are recognized technical professions. Technicians operate high-value electronic and robotic equipment in uniform, professional environments. Under India's National Education Policy (NEP 2020), vocational qualifications now carry equal academic standing and credit parity with traditional degrees.`;
    },
    mr: () => {
      return `हा बहुतांश पालकांचा सर्वात महत्त्वाचा प्रश्न असतो. पूर्वी व्यावसायिक शिक्षणाकडे पर्याय म्हणून पाहिले जायचे. परंतु आज आधुनिक ईव्ही, सोलर किंवा सीएनसी टेक्नॉलॉजी ही अतिशय सन्मानाची आणि तांत्रिक ज्ञानाची क्षेत्रे बनली आहेत. तंत्रज्ञ गणवेशात, अत्याधुनिक लॅब आणि सुसज्ज वर्कशॉपमध्ये काम करतात. नवीन शैक्षणिक धोरण (NEP 2020) अंतर्गत या कौशल्यांना विद्यापीठ पदवीइतकेच कायदेशीर वजन व सन्मान प्राप्त झाला आहे.`;
    },
    hi: () => {
      return `यह अभिभावकों की सबसे आम चिंताओं में से एक है। पहले वोकेशनल कोर्स को केवल अंतिम विकल्प माना जाता था। लेकिन आज इलेक्ट्रिक मोबिलिटी, सोलर इंजीनियरिंग और प्रिसिजन सीएनसी जैसे क्षेत्र अत्यधिक सम्मानित तकनीकी पेशे हैं। तकनीशियन आधुनिक लैब में वर्दी पहनकर उच्च तकनीक उपकरणों पर काम करते हैं। इसके अलावा राष्ट्रीय शिक्षा नीति (NEP 2020) के तहत वोकेशनल योग्यताओं को पारंपरिक विश्वविद्यालय डिग्रियों के समान कानूनी वजन और अकादमिक क्रेडिट दिया गया है।`;
    },
  },

  // 6. Career Progression & Further Learning (NEP 2020)
  {
    category: 'education',
    keywords: [
      'study', 'further', 'degree', 'b.voc', 'bvoc', 'diploma', 'credit',
      'उच्च शिक्षण', 'पुढे शिकणे', 'पदवी', 'क्रेडिट',
      'डिग्री', 'पढ़ाई', 'आगे की शिक्षा', 'क्रेडिट', 'डिप्लोमा',
    ],
    en: (course) => {
      const progression = course?.careerProgression || 'Progression from Technician -> Senior Specialist -> Workshop In-charge';
      return `Under the **National Credit Framework (NCrF)** and NEP 2020, vocational learning is no longer a dead-end street. Here is how your pathway stays open:\n\n1. **Academic Bank of Credits (ABC):** Training hours and skill levels earn academic credits stored in your DigiLocker/ABC account.\n2. **Lateral Entry to B.Voc / Polytechnic:** You can start earning at age 18-19, and later join a Bachelor of Vocation (B.Voc) degree in lateral 2nd year without restarting.\n3. **Career Progression:** ${progression}.`;
    },
    mr: (course) => {
      const progression = course?.careerProgression || 'तंत्रज्ञ -> वरिष्ठ सुपरवायझर -> कार्यशाळा प्रमुख';
      return `नवीन शैक्षणिक धोरणानुसार (NEP 2020) व्यावसायिक शिक्षण घेतल्यावर पुढील शिक्षणाचा मार्ग बंद होत नाही:\n\n१. **अकॅडेमिक बँक ऑफ क्रेडिट्स (ABC):** तुमच्या कोर्सच्या तासांचे क्रेडिट्स तुमच्या खात्यात जमा होतात.\n२. **बी.व्होक (B.Voc) किंवा डिप्लोमा संधी:** विद्यार्थी वयाच्या १८-१९ व्या वर्षी कमावता होऊन, नंतर थेट बॅचलर ऑफ व्होकेशन (B.Voc) पदवीला प्रवेश घेऊ शकतो.\n३. **करिअर वाढ:** ${progression}.`;
    },
    hi: (course) => {
      const progression = course?.careerProgression || 'तकनीशियन -> वरिष्ठ विशेषज्ञ -> कार्यशाला प्रमुख';
      return `राष्ट्रीय क्रेडिट फ्रेमवर्क (NCrF) और NEP 2020 के तहत, वोकेशनल शिक्षा के बाद आगे की पढ़ाई का रास्ता कभी बंद नहीं होता:\n\n1. **एकेडमिक बैंक ऑफ क्रेडिट्स (ABC):** आपके ट्रेनिंग घंटों और कौशल स्तर के क्रेडिट्स डिजीडॉकर में सुरक्षित रहते हैं।\n2. **B.Voc / पॉलिटेक्निक में सीधी एंट्री:** आप 18-19 वर्ष की उम्र में कमाई शुरू कर सकते हैं और बाद में बिना साल गंवाए बैचलर ऑफ वोकेशन (B.Voc) डिग्री के दूसरे वर्ष में सीधा प्रवेश ले सकते हैं।\n3. **करियर उन्नति:** ${progression}।`;
    },
  },

  // 7. Course vs Degree Comparison
  {
    category: 'degree_comparison',
    keywords: [
      'compare', 'degree', 'ba', 'bcom', 'bsc', 'college', 'versus', 'vs',
      'तुलना', 'कॉलेज', 'बीए', 'बीकॉम',
      'तुलना', 'कॉलेज', 'बीए', 'बीकॉम', 'डिग्री',
    ],
    en: () => {
      return `**Vocational Course vs. Traditional 3-Year General Degree (BA/B.Com):**\n\n| Dimension | Vocational Training (6–8 Months) | Traditional General Degree (3 Years) |\n| :--- | :--- | :--- |\n| **Time to Earning** | 6–8 Months to apprentice/job | 3 Years with zero industry exposure |\n| **Practical Skills** | 70% lab & workshop practice | Mostly written exam theory |\n| **Job Market Fit** | Direct technician & operator roles | High competition for general clerical roles |\n| **Academic Door** | Credits transfer to B.Voc later | Conventional post-graduate options |\n\nFor families needing dependable, fast economic stability, vocational programs allow the student to begin earning early and self-fund higher studies later.`;
    },
    mr: () => {
      return `**व्यावसायिक कोर्स विरुद्ध पारंपरिक ३ वर्षांची पदवी (BA/B.Com):**\n\n- **उत्पन्न सुरू होण्याचा काळ:** व्यावसायिक कोर्समध्ये ६ ते ८ महिन्यांत नोकरी किंवा अप्रेंटिसशिप सुरू होते; पारंपरिक पदवीत ३ वर्षे केवळ शिकण्यात जातात.\n- **कौशल्याचा भर:** ७०% प्रत्यक्ष प्रॅक्टिकल काम; पदवीत केवळ पुस्तकी व परीक्षांचे ज्ञान असते.\n- **नोकरीची खात्री:** उद्योगांना कुशल तंत्रज्ञांची तातडीची गरज असते; साध्या पदवीधरांना नोकरीसाठी पुन्हा वेगळे कोर्स करावे लागतात.\n- **कुटुंबाचा फायदा:** विद्यार्थी लवकर स्वावलंबी बनून स्वतःच्या पायावर उभा राहतो आणि नंतरही नोकरी सांभाळून उच्च पदवी घेऊ शकतो.`;
    },
    hi: () => {
      return `**व्यावसायिक कोर्स बनाम पारंपरिक 3-वर्षीय सामान्य डिग्री (BA/B.Com):**\n\n- **कमाई शुरू होने का समय:** वोकेशनल कोर्स में 6–8 महीनों में अप्रेंटिसशिप या नौकरी शुरू हो जाती है; पारंपरिक डिग्री में 3 वर्ष केवल कॉलेज की कक्षाओं में बीतते हैं।\n- **प्रैक्टिकल कौशल:** 70% लैब और वर्कशॉप का वास्तविक अभ्यास; सामान्य डिग्री में अधिकांशतः लिखित परीक्षा की थ्योरी होती है।\n- **नौकरी की तैयारी:** उद्योगों में कुशल तकनीशियनों की तुरंत मांग होती है; सामान्य डिग्रीधारकों को नौकरी के लिए फिर से अलग से कोर्स करना पड़ता है।\n- **पारिवारिक लाभ:** छात्र जल्दी आत्मनिर्भर बनकर अपने पैरों पर खड़ा होता है और बाद में नौकरी के साथ उच्च डिग्री भी पूरी कर सकता है।`;
    },
  },

  // 8. Eligibility and Duration
  {
    category: 'eligibility',
    keywords: [
      'eligible', 'eligibility', 'duration', 'months', 'age', 'qualification',
      'पात्रता', 'कालावधी', 'महिने', 'वय',
      'पात्रता', 'अवधि', 'महीने', 'आयु', 'उम्र', 'फीस',
    ],
    en: (course) => {
      if (course) {
        return `For **${course.title}**:\n- **Minimum Education:** ${course.eligibility.minEducation.replace('_', ' ').toUpperCase()}\n- **Minimum Age:** ${course.eligibility.minAge} years\n- **Course Duration:** ${course.durationMonths} Months (${course.trainingMode} mode)\n- **Fee & Subsidy:** ₹${course.feesInr.toLocaleString()} (Government fee subsidy and installment support available for eligible candidates).`;
      }
      return `Most foundational vocational courses require 10th Pass (SSC) or 12th Pass, with candidate age generally 18 years and above. Durations range from 4 to 12 months with flexible offline and hybrid schedules.`;
    },
    mr: (course) => {
      if (course) {
        return `**${course.title}** साठी पात्रता व कालावधी:\n- **किमान शिक्षण:** १० वी किंवा १२ वी उत्तीर्ण\n- **किमान वय:** ${course.eligibility.minAge} वर्षे\n- **कालावधी:** ${course.durationMonths} महिने (${course.trainingMode} स्वरूप)\n- **फी:** ₹${course.feesInr.toLocaleString()} (पात्र उमेदवारांसाठी सरकारी शिष्यवृत्ती व सवलत उपलब्ध).`;
      }
      return `बहुतांश व्यावसायिक कोर्सेससाठी किमान १० वी उत्तीर्ण असणे आवश्यक असते. कालावधी सामान्यतः ४ ते १२ महिने असतो.`;
    },
    hi: (course) => {
      if (course) {
        return `**${course.title}** के लिए पात्रता और अवधि:\n- **न्यूनतम शिक्षा:** 10वीं या 12वीं उत्तीर्ण\n- **न्यूनतम आयु:** ${course.eligibility.minAge} वर्ष\n- **कोर्स अवधि:** ${course.durationMonths} महीने (${course.trainingMode} माध्यम)\n- **फीस व सहायता:** ₹${course.feesInr.toLocaleString()} (पात्र छात्रों के लिए सरकारी फीस सब्सिडी और किस्तों की सुविधा उपलब्ध)।`;
      }
      return `अधिकांश बुनियादी वोकेशनल कोर्सों के लिए 10वीं पास (SSC) या 12वीं पास आवश्यक होता है। अवधि सामान्यतः 4 से 12 महीने होती है।`;
    },
  },

  // 9. Human Counsellor Referral
  {
    category: 'human_referral',
    keywords: [
      'human', 'person', 'talk to someone', 'advisor', 'contact',
      'कौन्सिलर', 'माणूस', 'फोन', 'भेटणे',
      'काउंसलर', 'सलाहकार', 'व्यक्ति', 'फोन', 'बातचीत',
    ],
    en: () => {
      return `You can connect directly with a certified district vocational counsellor! Please click the **"Talk to a Certified Human Counsellor"** button above or in the menu. You can request a 30-minute phone call, WhatsApp guidance, or center appointment tailored to your family's specific questions.`;
    },
    mr: () => {
      return `तुम्ही आमच्या प्रमाणित जिल्हास्तरीय समुपदेशकांशी थेट बोलू शकता! कृपया वरील **"मानवी तज्ज्ञ समुपदेशकांशी संपर्क साधा"** बटणावर क्लिक करा. तुम्ही फोन कॉल, व्हॉट्सअॅप किंवा व्हिडिओ कॉलसाठी मोफत वेळ बुक करू शकता.`;
    },
    hi: () => {
      return `आप हमारे प्रमाणित जिला वोकेशनल काउंसलर से सीधे संपर्क कर सकते हैं! कृपया ऊपर या मेनू में दिए गए **"मानव विशेषज्ञ काउंसलर से बात करें"** बटन पर क्लिक करें। आप अपने परिवार के सवालों के अनुसार 30 मिनट का फोन कॉल, व्हाट्सएप मार्गदर्शन या केंद्र पर व्यक्तिगत मुलाकात का समय तय कर सकते हैं।`;
    },
  },

  // 10. Fallback / General questions
  {
    category: 'general',
    keywords: [],
    en: (course) => {
      const courseMention = course ? ` in regards to **${course.title}**` : '';
      return `Thank you for sharing this family question${courseMention}. When evaluating vocational career decisions, we recommend focusing on three core pillars: (1) **Verified accreditation** under NCVET/NSDC, (2) **Realistic entry stipends** rather than exaggerated promises, and (3) **NEP credit mobility** so your student can attain a university degree in the future. Feel free to ask about specific job roles, earnings benchmarks, or course comparisons!`;
    },
    mr: (course) => {
      const courseMention = course ? ` **${course.title}** च्या संदर्भात` : '';
      return `कुटुंबाच्या दृष्टीने हा अतिशय महत्त्वाचा विचार आहे${courseMention}. व्यावसायिक शिक्षणाचा विचार करताना तीन गोष्टी लक्षात ठेवाव्यात: (१) संस्थेला **NCVET/NSDC ची अधिकृत मान्यता** असावी, (२) **सुरुवातीच्या खऱ्या पगाराची माहिती** घ्यावी आणि (३) भविष्यात **NEP 2020 अंतर्गत पदवी घेण्याची सोय** असावी. आपण पगार, कामाचे स्वरूप किंवा पदवीच्या तुलनेबद्दल अधिक विचारू शकता.`;
    },
    hi: (course) => {
      const courseMention = course ? ` **${course.title}** के संदर्भ में` : '';
      return `परिवार के दृष्टिकोण से यह बहुत महत्वपूर्ण विचार है${courseMention}। वोकेशनल शिक्षा का मूल्यांकन करते समय तीन बुनियादी बातों पर ध्यान दें: (1) **NCVET/NSDC की सरकारी मान्यता**, (2) बढ़ा-चढ़ाकर किए गए दावों के बजाय **वास्तविक शुरुआती वजीफा**, और (3) **NEP 2020 क्रेडिट ट्रांसफर** ताकि भविष्य में विश्वविद्यालय डिग्री हासिल की जा सके। आप विशिष्ट जॉब रोल, वेतन या कोर्स की तुलना के बारे में बेझिझक और सवाल पूछ सकते हैं!`;
    },
  },
];
