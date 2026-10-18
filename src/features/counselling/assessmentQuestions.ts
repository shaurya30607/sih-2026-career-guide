import { AssessmentQuestion } from './assessmentTypes';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Question 1: Who is the guidance for?
  {
    id: 'q_participant',
    category: 'participant',
    categoryLabel: {
      en: 'Explorer Context',
      mr: 'सहभागी संदर्भ',
      hi: 'प्रतिभागी संदर्भ',
    },
    question: {
      en: 'Who is this career guidance for?',
      mr: 'हे करिअर मार्गदर्शन कोणासाठी आहे?',
      hi: 'यह करियर मार्गदर्शन किसके लिए है?',
    },
    description: {
      en: 'We’ll tailor our explanations and wording to who is exploring today.',
      mr: 'आज कोण मार्गदर्शन घेत आहे त्यानुसार आम्ही भाषा आणि माहिती सुचवू.',
      hi: 'आज कौन मार्गदर्शन ले रहा है, उसके अनुसार हम भाषा और जानकारी तैयार करेंगे।',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'myself',
        label: {
          en: 'Myself — I’m exploring my own future.',
          mr: 'माझ्या स्वतःसाठी — मी माझे भविष्य शोधत आहे.',
          hi: 'स्वयं के लिए — मैं अपने भविष्य की तलाश में हूँ।',
        },
        description: {
          en: 'Discovering vocational courses, hands-on skills, and first job pathways.',
          mr: 'प्रत्यक्ष कौशल्ये, तांत्रिक प्रशिक्षण आणि पहिल्या नोकरीच्या संधी शोधत आहे.',
          hi: 'व्यावसायिक प्रशिक्षण, प्रैक्टिकल कौशल और पहली नौकरी के रास्ते खोज रहे हैं।',
        },
        icon: 'user',
      },
      {
        id: 'child_student',
        label: {
          en: 'My child or student I support.',
          mr: 'माझा मुलगा/मुलगी किंवा ज्या विद्यार्थ्याला मी मदत करतो.',
          hi: 'मेरा बच्चा या छात्र जिसे मैं सहयोग करता हूँ।',
        },
        description: {
          en: 'Exploring reliable training, employment stability, and growth for them.',
          mr: 'पाल्यासाठी सुरक्षित प्रशिक्षण, रोजगाराची स्थिरता आणि प्रगती तपासत आहे.',
          hi: 'छात्र के लिए सुरक्षित प्रशिक्षण, रोजगार की स्थिरता और प्रगति का आकलन कर रहे हैं।',
        },
        icon: 'heart',
      },
      {
        id: 'together',
        label: {
          en: 'We are exploring together.',
          mr: 'आम्ही एकत्र मिळून शोधत आहोत.',
          hi: 'हम साथ मिलकर खोज रहे हैं।',
        },
        description: {
          en: 'Making a joint decision by balancing practical skills, degrees, and family priorities.',
          mr: 'व्यावसायिक कौशल्ये, पदवी आणि कौटुंबिक गरजा यांचा समतोल साधून एकत्र विचार करत आहोत.',
          hi: 'प्रैक्टिकल कौशल, डिग्री और पारिवारिक प्राथमिकताओं की तुलना करके साझा निर्णय ले रहे हैं।',
        },
        icon: 'users',
      },
    ],
  },

  // Question 2: Education Level
  {
    id: 'q_education',
    category: 'education',
    categoryLabel: {
      en: 'Education Level',
      mr: 'शैक्षणिक पात्रता',
      hi: 'शैक्षणिक स्तर',
    },
    question: {
      en: 'What is the current education level?',
      mr: 'सध्याचे शिक्षण काय आहे?',
      hi: 'वर्तमान शिक्षा का स्तर क्या है?',
    },
    description: {
      en: 'This helps show certified vocational courses matching eligibility criteria.',
      mr: 'यामुळे पात्रतेनुसार योग्य शासनमान्य कोर्सेस निवडता येतात.',
      hi: 'इससे पात्रता मानदंडों के अनुसार उपयुक्त प्रमाणित वोकेशनल कोर्स चुनने में मदद मिलती है।',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'class_8_10',
        label: {
          en: 'Studying in Class 8–10',
          mr: 'इयत्ता ८ वी ते १० वी मध्ये शिकत आहे',
          hi: 'कक्षा 8वीं से 10वीं में अध्ययनरत',
        },
      },
      {
        id: 'completed_10',
        label: {
          en: 'Completed Class 10 (SSC)',
          mr: '१० वी उत्तीर्ण (SSC Passed)',
          hi: '10वीं उत्तीर्ण (SSC)',
        },
      },
      {
        id: 'studying_11_12',
        label: {
          en: 'Studying in Class 11–12',
          mr: 'इयत्ता ११ वी किंवा १२ वी मध्ये शिकत आहे',
          hi: 'कक्षा 11वीं या 12वीं में अध्ययनरत',
        },
      },
      {
        id: 'completed_12',
        label: {
          en: 'Completed Class 12 (HSC)',
          mr: '१२ वी उत्तीर्ण (HSC Passed)',
          hi: '12वीं उत्तीर्ण (HSC)',
        },
      },
      {
        id: 'iti_vocational',
        label: {
          en: 'ITI or vocational training',
          mr: 'आयटीआय (ITI) किंवा व्यावसायिक प्रशिक्षण',
          hi: 'आईटीआई (ITI) या व्यावसायिक प्रशिक्षण',
        },
      },
      {
        id: 'diploma',
        label: {
          en: 'Polytechnic Diploma',
          mr: 'पॉलिटेक्निक डिप्लोमा (Diploma)',
          hi: 'पॉलिटेक्निक डिप्लोमा (Diploma)',
        },
      },
      {
        id: 'graduate',
        label: {
          en: 'College graduate',
          mr: 'पदवीधर (Graduate)',
          hi: 'कॉलेज स्नातक (Graduate)',
        },
      },
      {
        id: 'other_edu',
        label: {
          en: 'Other or not listed',
          mr: 'इतर किंवा यादीत नसलेले',
          hi: 'अन्य या सूची में नहीं',
        },
      },
    ],
  },

  // Question 3: Discover interests through activities
  {
    id: 'q_activities',
    category: 'interests',
    categoryLabel: {
      en: 'Everyday Activities',
      mr: 'आवडीचे उपक्रम',
      hi: 'पसंदीदा गतिविधियां',
    },
    question: {
      en: 'Which of these activities would you enjoy?',
      mr: 'खालीलपैकी कोणत्या उपक्रमांमध्ये तुम्हाला काम करायला आवडेल?',
      hi: 'इनमें से किन गतिविधियों में काम करना आपको अच्छा लगेगा?',
    },
    description: {
      en: 'Select up to 3 activities that sound interesting or fun to do.',
      mr: 'तुम्हाला मनोरंजक किंवा आवडणारे जास्तीत जास्त ३ उपक्रम निवडा.',
      hi: 'अधिकतम 3 गतिविधियां चुनें जो आपको रुचिकर या आनंददायक लगें।',
    },
    responseType: 'multiple_choice',
    maxSelections: 3,
    required: true,
    options: [
      {
        id: 'building_fixing',
        label: {
          en: 'Building and fixing',
          mr: 'यंत्रे आणि दुरुस्ती',
          hi: 'बनाना और रिपेयरिंग',
        },
        description: {
          en: 'Working with tools, machines, or vehicles.',
          mr: 'साधने, यंत्रे किंवा वाहने यांच्याशी संबंधित काम.',
          hi: 'टूल्स, मशीनों या वाहनों के साथ काम करना।',
        },
        icon: 'wrench',
      },
      {
        id: 'computers_tech',
        label: {
          en: 'Computers and technology',
          mr: 'कॉम्प्युटर आणि तंत्रज्ञान',
          hi: 'कंप्यूटर और तकनीक',
        },
        description: {
          en: 'Using computers, apps, or solving digital problems.',
          mr: 'कॉम्प्युटर, अ‍ॅप्स वापरणे किंवा डिजिटल समस्या सोडवणे.',
          hi: 'कंप्यूटर, ऐप्स का उपयोग या डिजिटल समस्याएं सुलझाना।',
        },
        icon: 'cpu',
      },
      {
        id: 'helping_people',
        label: {
          en: 'Helping people',
          mr: 'लोकांना मदत करणे',
          hi: 'लोगों की मदद करना',
        },
        description: {
          en: 'Care, healthcare support, and assistance.',
          mr: 'आरोग्यसेवा, रुग्णांची काळजी आणि सहाय्य करणे.',
          hi: 'देखभाल, स्वास्थ्य सहायता और लोगों का सहयोग।',
        },
        icon: 'heart',
      },
      {
        id: 'nature_outdoors',
        label: {
          en: 'Nature and outdoor work',
          mr: 'निसर्ग आणि मोकळे मैदान',
          hi: 'प्रकृति और खुले मैदान का काम',
        },
        description: {
          en: 'Agriculture, plants, or field activities.',
          mr: 'शेती, वनस्पती किंवा मोकळ्या जागेतील प्रत्यक्ष काम.',
          hi: 'कृषि, पौधे या खुले मैदान में गतिविधियां।',
        },
        icon: 'sprout',
      },
      {
        id: 'precision_making',
        label: {
          en: 'Precision and making things',
          mr: 'अचूकता आणि निर्मिती',
          hi: 'सटीकता और निर्माण कार्य',
        },
        description: {
          en: 'Measuring, assembling, or operating equipment.',
          mr: 'मोजमापे घेणे, जोडणी करणे किंवा यंत्रे चालवणे.',
          hi: 'मापना, पुर्जे जोड़ना या उपकरण संचालित करना।',
        },
        icon: 'ruler',
      },
      {
        id: 'electricity_energy',
        label: {
          en: 'Electricity and energy',
          mr: 'विद्युत आणि ऊर्जा',
          hi: 'बिजली और ऊर्जा',
        },
        description: {
          en: 'Electrical systems, wiring, or renewable energy.',
          mr: 'वायरिंग, विद्युत प्रणाली किंवा सौर ऊर्जा.',
          hi: 'इलेक्ट्रिकल सिस्टम, वायरिंग या नवीकरणीय ऊर्जा।',
        },
        icon: 'zap',
      },
      {
        id: 'communication_org',
        label: {
          en: 'Communication and organisation',
          mr: 'संवाद आणि व्यवस्थापन',
          hi: 'संवाद और संगठन',
        },
        description: {
          en: 'Explaining ideas, organising tasks, or working with customers.',
          mr: 'माहिती समजावून सांगणे, कामांचे नियोजन किंवा ग्राहकांशी संवाद.',
          hi: 'विचार समझाना, कार्यों का आयोजन या ग्राहकों के साथ कार्य।',
        },
        icon: 'message-square',
      },
      {
        id: 'design_creativity',
        label: {
          en: 'Design and creativity',
          mr: 'रचना आणि सर्जनशीलता',
          hi: 'डिज़ाइन और रचनात्मकता',
        },
        description: {
          en: 'Creating, drawing, or improving how things look and function.',
          mr: 'नवे काही तयार करणे, डिझाइन करणे किंवा सुधारणा करणे.',
          hi: 'चीजें बनाना, डिज़ाइन करना या बेहतर स्वरूप देना।',
        },
        icon: 'palette',
      },
      {
        id: 'not_sure_yet',
        label: {
          en: 'I’m not sure yet',
          mr: 'अजून निश्चित नाही',
          hi: 'अभी निश्चित नहीं',
        },
        description: {
          en: 'Keep options open — we will help you discover pathways.',
          mr: 'पर्याय खुले ठेवा — आम्ही तुम्हाला दिशा शोधण्यास मदत करू.',
          hi: 'विकल्प खुले रखें — हम आपको दिशा खोजने में मदद करेंगे।',
        },
        icon: 'help-circle',
      },
    ],
  },

  // Question 4: Discover strengths and comfortable activities
  {
    id: 'q_strengths',
    category: 'strengths',
    categoryLabel: {
      en: 'Personal Strengths',
      mr: 'वैयक्तिक सामर्थ्ये',
      hi: 'व्यक्तिगत ताकत',
    },
    question: {
      en: 'Which of these feel comfortable or interesting to you?',
      mr: 'खालीलपैकी कोणत्या गोष्टी करताना तुम्हाला सहज आणि आवडल्यासारखे वाटते?',
      hi: 'इनमें से कौन से काम करते समय आप सहज या रुचि महसूस करते हैं?',
    },
    description: {
      en: 'Choose any that apply. You can select multiple options.',
      mr: 'लागू पडणारे पर्याय निवडा. तुम्ही एकापेक्षा जास्त पर्याय निवडू शकता.',
      hi: 'जो भी लागू हों उन्हें चुनें। आप कई विकल्प चुन सकते हैं।',
    },
    responseType: 'multiple_choice',
    required: true,
    options: [
      {
        id: 'problem_solving',
        label: {
          en: 'Finding and solving problems',
          mr: 'समस्या शोधणे आणि ती सोडवणे',
          hi: 'समस्याओं को खोजना और सुलझाना',
        },
        description: {
          en: 'Figuring out why something isn’t working and fixing it.',
          mr: 'एखादी गोष्ट का चालत नाही हे शोधून ती पूर्ववत करणे.',
          hi: 'कोई चीज क्यों काम नहीं कर रही, यह जानकर उसे ठीक करना।',
        },
        icon: 'lightbulb',
      },
      {
        id: 'hands_on',
        label: {
          en: 'Working with my hands',
          mr: 'हाताने प्रत्यक्ष काम करणे',
          hi: 'हाथों से प्रैक्टिकल काम करना',
        },
        description: {
          en: 'Using tools, materials, and physical equipment.',
          mr: 'साधने, सुटे भाग आणि प्रत्यक्ष उपकरणे वापरणे.',
          hi: 'टूल्स, सामग्री और उपकरणों के साथ प्रत्यक्ष काम करना।',
        },
        icon: 'hammer',
      },
      {
        id: 'using_computers',
        label: {
          en: 'Using computers',
          mr: 'संगणक वापरणे',
          hi: 'कंप्यूटर का उपयोग करना',
        },
        description: {
          en: 'Typing, navigating software, websites, or digital tools.',
          mr: 'सॉफ्टवेअर, वेबसाइट्स किंवा डिजिटल टूल्स हाताळणे.',
          hi: 'सॉफ्टवेयर, वेबसाइट या डिजिटल टूल्स का संचालन करना।',
        },
        icon: 'monitor',
      },
      {
        id: 'helping_others',
        label: {
          en: 'Helping or explaining things to others',
          mr: 'दुसऱ्यांना मदत करणे किंवा समजावून सांगणे',
          hi: 'दूसरों की मदद करना या बातें समझाना',
        },
        description: {
          en: 'Supporting teammates, patients, or answering questions.',
          mr: 'सहकाऱ्यांना किंवा गरजू व्यक्तींना मार्गदर्शन आणि सहाय्य करणे.',
          hi: 'साथियों या मरीजों की सहायता करना और प्रश्नों के उत्तर देना।',
        },
        icon: 'users',
      },
      {
        id: 'details_measurements',
        label: {
          en: 'Working carefully with details or measurements',
          mr: 'अचूक मोजमापे आणि तपशिलांवर बारकाईने लक्ष ठेवणे',
          hi: 'बारीक विवरण और सटीक माप पर ध्यान देना',
        },
        description: {
          en: 'Paying attention to precision, sizes, and neatness.',
          mr: 'मोजमापांची अचूकता, सुबकपणा आणि नियम पाळणे.',
          hi: 'सटीकता, आकार और स्वच्छता पर विशेष ध्यान देना।',
        },
        icon: 'target',
      },
      {
        id: 'organising_tasks',
        label: {
          en: 'Organising tasks',
          mr: 'कामांची योग्य मांडणी व नियोजन',
          hi: 'कार्यों को व्यवस्थित करना',
        },
        description: {
          en: 'Keeping checklists, arranging materials, and planning steps.',
          mr: 'साहित्याची मांडणी, याद्या तयार करणे आणि वेळेचे नियोजन.',
          hi: 'चेकलिस्ट बनाना, सामग्री व्यवस्थित रखना और योजना बनाना।',
        },
        icon: 'check-square',
      },
      {
        id: 'learning_by_trying',
        label: {
          en: 'Learning by trying things out',
          mr: 'स्वतः प्रयोग करून शिकणे',
          hi: 'खुद प्रयास करके सीखना',
        },
        description: {
          en: 'Testing solutions, learning from small mistakes, and improving.',
          mr: 'नवीन गोष्टी करून पाहणे आणि अनुभवातून शिकत जाणे.',
          hi: 'समाधान आजमाना, छोटी गलतियों से सीखना और सुधार करना।',
        },
        icon: 'sparkles',
      },
      {
        id: 'discovering_strengths',
        label: {
          en: 'Still discovering my strengths',
          mr: 'माझी सामर्थ्ये अजून शोधत आहे',
          hi: 'अभी अपनी ताकत पहचान रहे हैं',
        },
        description: {
          en: 'Open to learning and trying new practical experiences.',
          mr: 'नवीन अनुभव घेऊन शिकण्याची तयारी आहे.',
          hi: 'नए व्यावहारिक अनुभव लेकर सीखने के लिए पूरी तरह तैयार हैं।',
        },
        icon: 'compass',
      },
    ],
  },

  // Question 5: Preferred working environment
  {
    id: 'q_environment',
    category: 'environment',
    categoryLabel: {
      en: 'Work Environment',
      mr: 'कामाचे वातावरण',
      hi: 'कार्य वातावरण',
    },
    question: {
      en: 'What kind of work setting would you prefer?',
      mr: 'तुम्हाला कोणत्या प्रकारच्या वातावरणात काम करायला आवडेल?',
      hi: 'आप किस प्रकार के कार्य वातावरण में काम करना पसंद करेंगे?',
    },
    description: {
      en: 'Select up to 2 environments that feel comfortable.',
      mr: 'तुम्हाला सोयीचे वाटणारे जास्तीत जास्त २ पर्याय निवडा.',
      hi: 'अधिकतम 2 वातावरण चुनें जो आपके लिए सहज हों।',
    },
    responseType: 'multiple_choice',
    maxSelections: 2,
    required: true,
    options: [
      {
        id: 'workshop_factory',
        label: {
          en: 'Workshop or factory',
          mr: 'वर्कशॉप किंवा कारखाना',
          hi: 'वर्कशॉप या फैक्ट्री',
        },
        description: {
          en: 'Industrial workshop, auto service bay, or manufacturing plant.',
          mr: 'औद्योगिक वर्कशॉप, ऑटोमोबाईल सर्व्हिस सेंटर किंवा कारखाना.',
          hi: 'औद्योगिक वर्कशॉप, ऑटो सर्विस सेंटर या निर्माण प्लांट।',
        },
        icon: 'factory',
      },
      {
        id: 'office_computer',
        label: {
          en: 'Office or computer-based environment',
          mr: 'कार्यालय किंवा संगणक कक्ष',
          hi: 'कार्यालय या कंप्यूटर आधारित वातावरण',
        },
        description: {
          en: 'Desk workspace, computer lab, or digital agency.',
          mr: 'ऑफिस डेस्क, कम्प्युटर लॅब किंवा सॉफ्टवेअर कार्यस्थळ.',
          hi: 'डेस्क कार्यस्थल, कंप्यूटर लैब या डिजिटल एजेंसी।',
        },
        icon: 'building',
      },
      {
        id: 'hospital_healthcare',
        label: {
          en: 'Hospital or healthcare setting',
          mr: 'रुग्णालय किंवा आरोग्य केंद्र',
          hi: 'अस्पताल या स्वास्थ्य सेवा केंद्र',
        },
        description: {
          en: 'Clinic, hospital ward, or diagnostic support center.',
          mr: 'हॉस्पिटल, क्लिनिक किंवा आरोग्य तपासणी केंद्र.',
          hi: 'अस्पताल वार्ड, क्लिनिक या डायग्नोस्टिक केंद्र।',
        },
        icon: 'activity',
      },
      {
        id: 'outdoor_fieldwork',
        label: {
          en: 'Outdoor or fieldwork environment',
          mr: 'मोकळे मैदान किंवा क्षेत्रीय काम',
          hi: 'खुला मैदान या फील्ड वर्क',
        },
        description: {
          en: 'Open sites, rooftop solar installations, or agricultural farms.',
          mr: 'सोलर रूफटॉप, मोकळी जागा किंवा शेतीची ठिकाणे.',
          hi: 'रूफटॉप सोलर स्थापना, खुली साइट या कृषि फार्म।',
        },
        icon: 'sun',
      },
      {
        id: 'customer_people',
        label: {
          en: 'Working with customers or people',
          mr: 'ग्राहक किंवा लोकांशी थेट संवाद',
          hi: 'ग्राहकों या लोगों के साथ कार्य',
        },
        description: {
          en: 'Client advisory, technical service desk, or patient assistance.',
          mr: 'ग्राहकांना सल्ला देणे, सेवा पुरवणे किंवा प्रत्यक्ष संवाद.',
          hi: 'परामर्श, तकनीकी सहायता या ग्राहकों से बातचीत।',
        },
        icon: 'user-check',
      },
      {
        id: 'open_environment',
        label: {
          en: 'Open to different environments',
          mr: 'विविध वातावरणात काम करण्याची तयारी',
          hi: 'विभिन्न परिस्थितियों में काम करने के लिए तैयार',
        },
        description: {
          en: 'Flexible across indoor workshops and outdoor field tasks.',
          mr: 'आतील व बाहेरील दोन्ही प्रकारच्या कामासाठी अनुकूल.',
          hi: 'इनडोर और आउटडोर दोनों प्रकार के कार्यों के लिए लचीला।',
        },
        icon: 'globe',
      },
      {
        id: 'not_sure_env',
        label: {
          en: 'Not sure yet',
          mr: 'अजून निश्चित नाही',
          hi: 'अभी निश्चित नहीं',
        },
        description: {
          en: 'Will explore during practical training.',
          mr: 'प्रशिक्षणादरम्यान प्रत्यक्ष अनुभव घेऊन ठरवू.',
          hi: 'प्रशिक्षण के दौरान अनुभव लेकर तय करेंगे।',
        },
        icon: 'help-circle',
      },
    ],
  },

  // Question 6: Preferred learning style
  {
    id: 'q_learning_style',
    category: 'learning_style',
    categoryLabel: {
      en: 'Learning Style',
      mr: 'शिकण्याची पद्धत',
      hi: 'सीखने का तरीका',
    },
    question: {
      en: 'How do you prefer to learn new things?',
      mr: 'नवीन गोष्टी शिकताना तुम्हाला कोणती पद्धत जास्त सोपी वाटते?',
      hi: 'नई चीजें सीखते समय आपको कौन सा तरीका सबसे अनुकूल लगता है?',
    },
    description: {
      en: 'Vocational courses emphasise practical training, but formats vary.',
      mr: 'व्यावसायिक अभ्यासक्रमांमध्ये प्रॅक्टिकलवर भर असतो, तरी पद्धती वेगवेगळ्या असू शकतात.',
      hi: 'व्यावसायिक कोर्सों में प्रैक्टिकल पर जोर होता है, फिर भी स्वरूप अलग हो सकते हैं।',
    },
    responseType: 'single_choice',
    required: true,
    options: [
      {
        id: 'practical_hands_on',
        label: {
          en: 'Learning by doing practical activities',
          mr: 'प्रत्यक्ष कृती आणि प्रॅक्टिकलमधून शिकणे',
          hi: 'प्रैक्टिकल गतिविधियां करके सीखना',
        },
        description: {
          en: 'Handling equipment, building circuits, coding, or workshop tasks (70%+ lab).',
          mr: 'साधने हाताळणे, जोडणी करणे आणि वर्कशॉपमध्ये प्रत्यक्ष सराव करणे.',
          hi: 'उपकरण संचालित करना, कोडिंग या वर्कशॉप लैब में प्रत्यक्ष अभ्यास (70%+ लैब)।',
        },
      },
      {
        id: 'mix_practical_classroom',
        label: {
          en: 'A mix of practical and classroom learning',
          mr: 'थिअरी आणि प्रॅक्टिकलचे समतोल मिश्रण',
          hi: 'प्रैक्टिकल और कक्षा अध्ययन का संतुलित मिश्रण',
        },
        description: {
          en: 'Understanding concepts in class and applying them in the lab.',
          mr: 'संकल्पना समजून घेऊन लगेच प्रॅक्टिकलमध्ये वापरणे.',
          hi: 'कक्षा में अवधारणाएं समझना और लैब में उनका प्रयोग करना।',
        },
      },
      {
        id: 'classroom_theory',
        label: {
          en: 'Mostly classroom study and theory',
          mr: 'मुख्यतः वर्गातील व्याख्याने आणि पुस्तकी अभ्यास',
          hi: 'मुख्य रूप से कक्षा व्याख्यान और थ्योरी अध्ययन',
        },
        description: {
          en: 'Reading, structured lectures, and guided assignments.',
          mr: 'वाचन, पद्धतशीर व्याख्याने आणि गृहपाठ.',
          hi: 'पढ़ना, सुनियोजित व्याख्यान और लिखित असाइनमेंट।',
        },
      },
      {
        id: 'not_sure_learning',
        label: {
          en: 'Not sure yet',
          mr: 'अजून निश्चित नाही',
          hi: 'अभी निश्चित नहीं',
        },
        description: {
          en: 'Open to discovering what works best.',
          mr: 'सुरुवातीला दोन्ही पद्धतींचा अनुभव घ्यायला तयार.',
          hi: 'शुरुआत में सभी तरीकों का अनुभव लेने के लिए तैयार।',
        },
      },
    ],
  },

  // Question 7: Career priorities
  {
    id: 'q_priorities',
    category: 'priorities',
    categoryLabel: {
      en: 'Career Priorities',
      mr: 'करिअर प्राधान्ये',
      hi: 'करियर प्राथमिकताएं',
    },
    question: {
      en: 'What matters most to you in a career?',
      mr: 'करिअर निवडताना तुमच्यासाठी सर्वाधिक महत्त्वाचे काय आहे?',
      hi: 'करियर चुनते समय आपके लिए सबसे महत्वपूर्ण क्या है?',
    },
    description: {
      en: 'Select up to 3 priorities that guide your direction.',
      mr: 'तुमच्या निर्णयाला दिशा देणारे जास्तीत जास्त ३ प्राधान्यक्रम निवडा.',
      hi: 'अधिकतम 3 प्राथमिकताएं चुनें जो आपकी दिशा तय करती हैं।',
    },
    responseType: 'multiple_choice',
    maxSelections: 3,
    required: true,
    options: [
      {
        id: 'work_soon',
        label: {
          en: 'Finding work soon',
          mr: 'लवकरात लवकर नोकरी मिळवणे',
          hi: 'जल्दी काम या नौकरी मिलना',
        },
        description: {
          en: 'Completing training in 4–8 months and starting to earn.',
          mr: '४ ते ८ महिन्यांत प्रशिक्षण पूर्ण करून स्वावलंबी होणे.',
          hi: '4 से 8 महीने में प्रशिक्षण पूरा करके आत्मनिर्भर बनना।',
        },
      },
      {
        id: 'stable_employment',
        label: {
          en: 'Stable employment',
          mr: 'कायमस्वरूपी आणि सुरक्षित रोजगार',
          hi: 'स्थिर और सुरक्षित रोजगार',
        },
        description: {
          en: 'Consistent company roles, timely wages, and job security.',
          mr: 'सुरक्षित कंपनी रोल, वेळेवर वेतन आणि शाश्वत काम.',
          hi: 'कंपनी पेरोल, समय पर वेतन और दीर्घकालिक सुरक्षा।',
        },
      },
      {
        id: 'earning_potential',
        label: {
          en: 'Earning potential',
          mr: 'चांगला पगार आणि वेगाने पगारवाढ',
          hi: 'अच्छी कमाई और वेतन वृद्धि',
        },
        description: {
          en: 'Strong wage milestones as skills improve.',
          mr: 'कौशल्यानुसार पुढील काळात वेगाने वाढणारे उत्पन्न.',
          hi: 'कौशल बढ़ने के साथ तेजी से बढ़ने वाली आय।',
        },
      },
      {
        id: 'affordable_training',
        label: {
          en: 'Affordable training',
          mr: 'कमी फी आणि परवडणारे प्रशिक्षण',
          hi: 'किफायती प्रशिक्षण और कम फीस',
        },
        description: {
          en: 'Low course fees, installments, or government fee subsidies.',
          mr: 'कमी प्रशिक्षण खर्च, शिष्यवृत्ती किंवा सरकारी सवलती.',
          hi: 'कम कोर्स फीस, किस्तें या सरकारी फीस सब्सिडी।',
        },
      },
      {
        id: 'near_home',
        label: {
          en: 'Studying near home',
          mr: 'घराजवळ किंवा स्वतःच्या जिल्ह्यात शिकणे',
          hi: 'घर के पास या अपने जिले में सीखना',
        },
        description: {
          en: 'Local training centers without costly relocation.',
          mr: 'घर सोडून लांब न जाता नजीकच्या केंद्रात शिक्षण.',
          hi: 'घर से दूर जाए बिना नजदीकी केंद्र में प्रशिक्षण।',
        },
      },
      {
        id: 'study_further',
        label: {
          en: 'Opportunities to study further',
          mr: 'पुढे पदवी किंवा डिप्लोमा घेण्याची संधी',
          hi: 'आगे उच्च शिक्षा (डिप्लोमा/डिग्री) के अवसर',
        },
        description: {
          en: 'Credit bridges toward Polytechnic Diploma or B.Voc degree.',
          mr: 'डिप्लोमा किंवा बी.व्होक पदवीत थेट प्रवेशाचा मार्ग खुला ठेवणे.',
          hi: 'पॉलिटेक्निक डिप्लोमा या बी.वॉक (B.Voc) डिग्री के रास्ते खुले रखना।',
        },
      },
      {
        id: 'enjoy_work',
        label: {
          en: 'Doing something I enjoy',
          mr: 'स्वतःच्या आवडीचे काम करणे',
          hi: 'अपनी पसंद का काम करना',
        },
        description: {
          en: 'Personal fulfillment and everyday satisfaction at work.',
          mr: 'कामातील आनंद आणि स्वतःची आंतरिक आवड.',
          hi: 'काम में खुशी और व्यक्तिगत संतुष्टि।',
        },
      },
      {
        id: 'own_business',
        label: {
          en: 'Starting my own business',
          mr: 'स्वतःचा स्वतंत्र व्यवसाय सुरू करणे',
          hi: 'अपना खुद का व्यवसाय शुरू करना',
        },
        description: {
          en: 'Independent technician service, workshop, or contracting.',
          mr: 'स्वतःचे सर्व्हिस सेंटर, दुकान किंवा व्यवसाय उभा करणे.',
          hi: 'स्वतंत्र सर्विस सेंटर, वर्कशॉप या स्वरोजगार।',
        },
      },
      {
        id: 'other_priority',
        label: {
          en: 'Other priority',
          mr: 'इतर विशेष प्राधान्य',
          hi: 'अन्य विशेष प्राथमिकता',
        },
        description: {
          en: 'Another circumstance you would like us to consider.',
          mr: 'तुमची इतर कोणतीही वैयक्तिक बाब.',
          hi: 'कोई अन्य परिस्थिति जिस पर आप ध्यान दिलाना चाहते हैं।',
        },
      },
    ],
  },

  // Question 8A: Adaptive Practical Follow-up - Affordable Training
  {
    id: 'q_followup_affordable',
    category: 'followup',
    categoryLabel: {
      en: 'Financial Options',
      mr: 'आर्थिक सहाय्य',
      hi: 'वित्तीय विकल्प',
    },
    question: {
      en: 'What financial or fee support would be most helpful to explore?',
      mr: 'फी किंवा आर्थिक मदतीबाबत कोणती माहिती जाणून घेणे उपयुक्त ठरेल?',
      hi: 'फीस या वित्तीय सहायता के बारे में कौन सी जानकारी जानना सबसे उपयोगी होगा?',
    },
    description: {
      en: 'Many certified vocational courses offer government subsidies or low-cost options.',
      mr: 'अनेक शासनमान्य कोर्सेसमध्ये शासकीय योजना किंवा सवलती उपलब्ध असतात.',
      hi: 'कई प्रमाणित वोकेशनल कोर्सों में सरकारी योजनाएं या कम लागत के विकल्प उपलब्ध हैं।',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) =>
      Array.isArray(answers.q_priorities) && answers.q_priorities.includes('affordable_training'),
    options: [
      {
        id: 'subsidy_scholarship',
        label: {
          en: 'Government scholarships and fee subsidies (e.g. PMKVY / MSSDS)',
          mr: 'शासकीय शिष्यवृत्ती आणि फी सवलत (उदा. PMKVY / कौशल्य योजना)',
          hi: 'सरकारी छात्रवृत्ति और फीस सब्सिडी (जैसे PMKVY / कौशल योजनाएं)',
        },
      },
      {
        id: 'budget_under_15k',
        label: {
          en: 'Low total course fee (under ₹15,000)',
          mr: 'कमी एकूण फी असलेले कोर्सेस (₹१५,००० पेक्षा कमी)',
          hi: 'कम कुल फीस वाले कोर्स (₹15,000 से कम)',
        },
      },
      {
        id: 'installment_options',
        label: {
          en: 'Flexible monthly installment payments',
          mr: 'दरमहा सुलभ हप्त्यांची (Installment) सोय',
          hi: 'आसान मासिक किस्तों (Installment) की सुविधा',
        },
      },
      {
        id: 'flexible_if_placed',
        label: {
          en: 'Flexible on fees if strong placement support is provided',
          mr: 'चांगल्या नोकरीची हमी असल्यास फी जास्त असली तरी चालेल',
          hi: 'यदि मजबूत प्लेसमेंट सहयोग हो तो फीस में लचीलापन संभव है',
        },
      },
    ],
  },

  // Question 8B: Adaptive Practical Follow-up - Employment & Job Evidence
  {
    id: 'q_followup_employment',
    category: 'followup',
    categoryLabel: {
      en: 'Employment Evidence',
      mr: 'रोजगार पुरावा',
      hi: 'रोजगार प्रमाण',
    },
    question: {
      en: 'What employment information would give you the most confidence?',
      mr: 'नोकरीबाबत कोणत्या प्रकारची माहिती पाहिल्यावर तुम्हाला सर्वाधिक खात्री वाटेल?',
      hi: 'नौकरी के बारे में किस तरह की जानकारी देखने पर आपको सबसे अधिक भरोसा होगा?',
    },
    description: {
      en: 'We highlight documented training outcomes to help you evaluate opportunities.',
      mr: 'आम्ही प्रशिक्षण केंद्रांचे पडताळलेले तपशील समजण्यास मदत करतो.',
      hi: 'हम प्रशिक्षण केंद्रों के सत्यापित परिणामों को समझने में आपकी मदद करते हैं।',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) =>
      Array.isArray(answers.q_priorities) &&
      (answers.q_priorities.includes('work_soon') || answers.q_priorities.includes('stable_employment')) &&
      !answers.q_priorities.includes('affordable_training'),
    options: [
      {
        id: 'placement_records',
        label: {
          en: 'Documented campus placement history and hiring companies',
          mr: 'संस्थेचा मागील प्लेसमेंट रेकॉर्ड आणि नोकरी देणाऱ्या कंपन्यांची यादी',
          hi: 'संस्थान का पिछला प्लेसमेंट रिकॉर्ड और भर्ती करने वाली कंपनियों की सूची',
        },
      },
      {
        id: 'naps_stipend',
        label: {
          en: 'Government NAPS apprenticeship contracts with monthly stipends',
          mr: 'शासकीय NAPS अप्रेंटिसशिप आणि हमी असलेले मासिक विद्यावेतन',
          hi: 'सरकारी NAPS अप्रेंटिसशिप और सुनिश्चित मासिक वजीफा',
        },
      },
      {
        id: 'role_clarity',
        label: {
          en: 'Clear explanation of everyday job responsibilities and safety standards',
          mr: 'प्रत्यक्ष नोकरीतील रोजचे काम आणि सुरक्षिततेचे नियम',
          hi: 'दैनिक नौकरी की जिम्मेदारियां और सुरक्षा मानकों का स्पष्ट विवरण',
        },
      },
      {
        id: 'company_mous',
        label: {
          en: 'Official tie-ups between the training institute and employers',
          mr: 'प्रशिक्षण संस्था आणि नामांकित कंपन्यांचे अधिकृत सामंजस्य करार (MoUs)',
          hi: 'प्रशिक्षण संस्थान और कंपनियों के बीच आधिकारिक समझौता (MoUs)',
        },
      },
    ],
  },

  // Question 8C: Adaptive Practical Follow-up - Further Study Pathways
  {
    id: 'q_followup_further_study',
    category: 'followup',
    categoryLabel: {
      en: 'Higher Studies',
      mr: 'उच्च शिक्षण पर्याय',
      hi: 'उच्च शिक्षा विकल्प',
    },
    question: {
      en: 'Which educational pathway would you like to keep open after this course?',
      mr: 'हा कोर्स पूर्ण केल्यानंतर पुढील शिक्षणाचा कोणता मार्ग खुला ठेवू इच्छिता?',
      hi: 'यह कोर्स पूरा करने के बाद आगे की शिक्षा का कौन सा रास्ता खुला रखना चाहते हैं?',
    },
    description: {
      en: 'National credit frameworks allow vocational training credits to transfer toward degrees.',
      mr: 'राष्ट्रीय क्रेडिट फ्रेमवर्कनुसार व्यावसायिक प्रशिक्षणातील क्रेडिट्स पदवीसाठी ग्राह्य धरले जातात.',
      hi: 'राष्ट्रीय क्रेडिट फ्रेमवर्क के तहत व्यावसायिक प्रशिक्षण के क्रेडिट्स डिग्री में जुड़ते हैं।',
    },
    responseType: 'single_choice',
    required: true,
    isApplicable: (answers) =>
      Array.isArray(answers.q_priorities) &&
      answers.q_priorities.includes('study_further') &&
      !answers.q_priorities.includes('affordable_training') &&
      !answers.q_priorities.includes('work_soon') &&
      !answers.q_priorities.includes('stable_employment'),
    options: [
      {
        id: 'polytechnic_diploma',
        label: {
          en: 'Direct lateral entry into 2nd year of Polytechnic Diploma',
          mr: 'पॉलिटेक्निक डिप्लोमाच्या दुसऱ्या वर्षात थेट प्रवेश (Lateral Entry)',
          hi: 'पॉलिटेक्निक डिप्लोमा के दूसरे वर्ष में सीधा प्रवेश (Lateral Entry)',
        },
      },
      {
        id: 'bvoc_degree',
        label: {
          en: 'Bachelor of Vocation (B.Voc) degree with work-integrated credits',
          mr: 'कामासह शिकण्याची शासकीय मान्यताप्राप्त बी.व्होक (B.Voc) पदवी',
          hi: 'कार्य के साथ सीखने वाली मान्यता प्राप्त बी.वॉक (B.Voc) डिग्री',
        },
      },
      {
        id: 'advanced_certs',
        label: {
          en: 'Advanced technical certifications and trade specialisations',
          mr: 'पुढील प्रगत तांत्रिक विशेषीकरण (उदा. प्रगत कोडिंग किंवा ड्रोन परवाना)',
          hi: 'उन्नत तकनीकी प्रमाणपत्र और विशेष ट्रेड प्रशिक्षण',
        },
      },
      {
        id: 'flexible_later',
        label: {
          en: 'Not decided yet; keep options flexible after starting work',
          mr: 'अजून ठरवले नाही; पहिल्या नोकरीच्या अनुभवानंतर निर्णय घेऊ',
          hi: 'अभी तय नहीं; पहली नौकरी के अनुभव के बाद तय करेंगे',
        },
      },
    ],
  },

  // Question 8D: Adaptive Practical Follow-up - Other Priority Free Text
  {
    id: 'q_followup_other',
    category: 'followup',
    categoryLabel: {
      en: 'Specific Circumstance',
      mr: 'विशिष्ट बाब',
      hi: 'विशिष्ट परिस्थिति',
    },
    question: {
      en: 'Please share what other priority or question matters most to you.',
      mr: 'कृपया तुमच्यासाठी महत्त्वाची असलेली इतर बाब किंवा प्रश्न थोडक्यात सांगा.',
      hi: 'कृपया बताएं कि आपके लिए अन्य कौन सी प्राथमिकता या प्रश्न महत्वपूर्ण है।',
    },
    description: {
      en: 'Optional. Please do not provide sensitive personal information.',
      mr: 'ऐच्छिक. कृपया कोणतीही संवेदनशील वैयक्तिक माहिती टाकू नका.',
      hi: 'वैकल्पिक। कृपया गोपनीय व्यक्तिगत विवरण न लिखें।',
    },
    responseType: 'free_text',
    required: false,
    isApplicable: (answers) =>
      Array.isArray(answers.q_priorities) &&
      answers.q_priorities.includes('other_priority') &&
      !answers.q_priorities.includes('affordable_training') &&
      !answers.q_priorities.includes('work_soon') &&
      !answers.q_priorities.includes('stable_employment') &&
      !answers.q_priorities.includes('study_further'),
    placeholder: {
      en: 'e.g., "Need evening batch timings", "Interested in solar but also want to explore web skills"...',
      mr: 'उदा. "संध्याकाळच्या बॅचची वेळ हवी आहे", "सोलरमध्ये रस आहे पण कॉम्प्युटर कौशल्येही हवी आहेत"...',
      hi: 'उदाहरण: "शाम के बैच का समय चाहिए", "सोलर में रुचि है लेकिन वेब स्किल्स भी सीखना चाहते हैं"...',
    },
  },

  // Question 9: Optional Final Notes
  {
    id: 'q_additional_notes',
    category: 'additional',
    categoryLabel: {
      en: 'Additional Notes',
      mr: 'अतिरिक्त माहिती',
      hi: 'अतिरिक्त विवरण',
    },
    question: {
      en: 'Is there anything else you’d like us to consider?',
      mr: 'आम्ही विचारात घ्यावी अशी इतर कोणतीही बाब आहे का?',
      hi: 'क्या कोई अन्य महत्वपूर्ण बात है जिसे हम ध्यान में रखें?',
    },
    description: {
      en: 'Optional. Share any location preferences or questions. You do not need to provide personal or sensitive information.',
      mr: 'ऐच्छिक. जिल्हा, स्थलांतराची तयारी किंवा इतर शंका सांगू शकता. कोणतीही गोपनीय वैयक्तिक माहिती टाकण्याची गरज नाही.',
      hi: 'वैकल्पिक। स्थान की पसंद या कोई प्रश्न साझा कर सकते हैं। गोपनीय व्यक्तिगत जानकारी देने की आवश्यकता नहीं है।',
    },
    responseType: 'free_text',
    required: false,
    placeholder: {
      en: 'Share any unique circumstances, preferred districts, or questions for discussion...',
      mr: 'पसंतीचा जिल्हा, विशेष परिस्थिती किंवा चर्चेसाठी असलेला प्रश्न येथे लिहा...',
      hi: 'अपनी पसंद का जिला, विशेष परिस्थिति या चर्चा के लिए कोई प्रश्न यहाँ लिखें...',
    },
  },
];
