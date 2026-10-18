import { Course } from '../../types/course';
import { CounsellingMessage, ParticipantRole } from '../../types/counselling';
import {
  CounsellingPerspective,
  CounsellingLanguage,
  RESPONSE_TEMPLATES,
  SUGGESTED_QUESTIONS,
  COUNSELLING_UI_TEXT,
} from './counsellingContent';

export class CounsellingService {
  /**
   * Produce the initial system welcome message for a fresh session
   */
  getInitialWelcomeMessage(
    perspective: CounsellingPerspective,
    language: CounsellingLanguage,
    course?: Course | null
  ): CounsellingMessage {
    const isMr = language === 'mr';
    const isHi = language === 'hi';
    let welcomeText = '';

    if (course) {
      if (isHi) {
        if (perspective === 'student') {
          welcomeText = `नमस्ते विद्यार्थी! हम **${course.title}** कोर्स पर चर्चा कर रहे हैं। प्रैक्टिकल वर्कशॉप, सिखाए जाने वाले कौशल और करियर के विकल्पों के बारे में आप क्या जानना चाहते हैं? नीचे दिए गए प्रश्नों में से चुनें या अपना प्रश्न पूछें।`;
        } else if (perspective === 'parent') {
          welcomeText = `नमस्ते अभिभावक जी! **${course.title}** कोर्स को लेकर माता-पिता के मन में आने वाले मुख्य प्रश्नों—जैसे नौकरी की गारंटी, शुरुआती वेतन, सरकारी मान्यता (NCVET) और करियर स्थिरता—पर चर्चा के लिए मैं उपस्थित हूँ। कृपया नीचे से कोई प्रश्न चुनें या अपना सवाल पूछें।`;
        } else {
          welcomeText = `नमस्ते! हम सब मिलकर **${course.title}** कोर्स का अन्वेषण कर रहे हैं। विद्यार्थी और अभिभावक दोनों के सवालों—जैसे काम का स्वरूप, शुरुआती मानदेय और डिग्री के अवसर—के समाधान के लिए मैं यहाँ हूँ। कोई प्रश्न चुनें या अपनी बात लिखें।`;
        }
      } else if (isMr) {
        if (perspective === 'student') {
          welcomeText = `नमस्कार विद्यार्थी मित्रा! आपण **${course.title}** या कोर्सचा अभ्यास करत आहोत. प्रत्यक्ष प्रॅक्टिकल वर्कशॉप, शिकवली जाणारी कौशल्ये आणि पुढील करिअर पर्यायांबद्दल तुला काय जाणून घ्यायचे आहे? खालीलपैकी प्रश्न निवडा किंवा तुझा प्रश्न विचार.`;
        } else if (perspective === 'parent') {
          welcomeText = `नमस्कार पालक महोदय! **${course.title}** या कोर्सबद्दल पालकांच्या मनात असणाऱ्या मुख्य शंका—जसे की रोजगाराची हमी, सुरुवातीचा पगार, शासकीय मान्यता (NCVET) आणि नोकरीची स्थिरता—यावर चर्चा करण्यासाठी मी येथे आहे. खालीलपैकी प्रश्न निवडा किंवा स्वतःचा प्रश्न विचारा.`;
        } else {
          welcomeText = `नमस्कार! आपण **${course.title}** या कोर्सबद्दल एकत्र चर्चा करत आहोत. विद्यार्थी आणि पालक या दोघांच्याही शंका—जसे की कामाचे स्वरूप, रोजगाराच्या संधी, सुरुवातीचा पगार आणि पुढील शिक्षण—यांचे निरसन करण्यासाठी मी येथे आहे. खालील प्रश्न निवडा किंवा स्वतःचा प्रश्न विचारा.`;
        }
      } else {
        if (perspective === 'student') {
          welcomeText = `Namaste! Exploring **${course.title}** as a student? I can help you understand the hands-on workshop training, day-to-day work, job titles you qualify for, and higher study options. Choose a suggested question below or type your inquiry!`;
        } else if (perspective === 'parent') {
          welcomeText = `Namaste! As a parent evaluating **${course.title}**, you want clarity on realistic starting wages, job security, NCVET/government accreditation, and long-term career respect. Select a question below or ask freely.`;
        } else {
          welcomeText = `Namaste! We are exploring **${course.title}** together. Whether you are a student evaluating hands-on workshop training or a parent inquiring about verified job outcomes and degree equivalence, I am here to assist your family. Select a question below or type your inquiry.`;
        }
      }
    } else {
      if (isHi) {
        if (perspective === 'student') {
          welcomeText = `नमस्ते! 'स्किलसाथी' विद्यार्थी करियर मार्गदर्शन में आपका स्वागत है। यहाँ आप विभिन्न वोकेशनल कोर्स, प्रैक्टिकल कौशल और भविष्य के अवसरों की जानकारी प्राप्त कर सकते हैं।`;
        } else if (perspective === 'parent') {
          welcomeText = `नमस्ते अभिभावक जी! 'स्किलसाथी' काउंसलिंग में आपका स्वागत है। अपने बच्चे के भविष्य के लिए वोकेशनल शिक्षा की स्थिरता, शुरुआती आय और डिग्री से तुलना पर हम यहाँ विस्तार से चर्चा कर सकते हैं।`;
        } else {
          welcomeText = `नमस्ते! 'स्किलसाथी' (SkillSaathi) एआई परिवार करियर काउंसलर में आपका स्वागत है। यहाँ विद्यार्थी और अभिभावक मिलकर वोकेशनल शिक्षा के लाभ, कमाई, नौकरी की सुरक्षा और भावी अवसरों पर एक साथ विचार कर सकते हैं।`;
        }
      } else if (isMr) {
        if (perspective === 'student') {
          welcomeText = `नमस्कार! 'स्किलसाथी' विद्यार्थी करिअर मार्गदर्शनात आपले स्वागत आहे. येथे तू विविध व्यावसायिक कोर्सेस, प्रत्यक्ष कौशल्ये आणि भविष्यातील संधींबद्दल माहिती मिळवू शकतोस.`;
        } else if (perspective === 'parent') {
          welcomeText = `नमस्कार पालक महोदय! 'स्किलसाथी' समुपदेशनात आपले स्वागत. आपल्या पाल्याच्या भविष्यासाठी व्यावसायिक शिक्षणाची स्थिरता, सुरुवातीचे उत्पन्न आणि पदवीशी तुलना यावर आपण येथे चर्चा करू शकता.`;
        } else {
          welcomeText = `नमस्कार! 'स्किलसाथी' (SkillSaathi) एआय कुटुंब करिअर समुपदेशकात आपले स्वागत आहे. येथे विद्यार्थी आणि पालक व्यावसायिक शिक्षणाचे खरे फायदे, उत्पन्न, नोकरीची सुरक्षा आणि भविष्यातील संधींबद्दल एकत्र चर्चा करू शकतात.`;
        }
      } else {
        if (perspective === 'student') {
          welcomeText = `Namaste and welcome to SkillSaathi! As a student, explore real-world vocational trades, industry apprenticeships, and hands-on careers here. Ask anything!`;
        } else if (perspective === 'parent') {
          welcomeText = `Namaste! Welcome to SkillSaathi parent advising. Review verified vocational outcomes, income milestones, and job security for your child without common myths or hype.`;
        } else {
          welcomeText = `Namaste and welcome to the SkillSaathi Career Counsellor. We help students and parents evaluate certified vocational trades, understand realistic earning trajectories, and make confident educational choices together.`;
        }
      }
    }

    const senderName = isHi
      ? 'स्किलसाथी काउंसलर (SkillSaathi)'
      : isMr
      ? 'स्किलसाथी समुपदेशक (SkillSaathi)'
      : 'SkillSaathi AI Counsellor';

    return {
      id: `msg-sys-welcome-${Date.now()}`,
      sessionId: 'session-local-simulated',
      senderRole: 'counsellor',
      senderName,
      content: welcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
      meta: {
        intent: 'welcome',
        referencedCourseIds: course ? [course.id] : undefined,
      },
    };
  }

  /**
   * Fetch suggested questions for the given perspective and language
   */
  getSuggestedQuestions(
    perspective: CounsellingPerspective,
    language: CounsellingLanguage
  ): { id: string; text: string }[] {
    const list = SUGGESTED_QUESTIONS[perspective] || SUGGESTED_QUESTIONS.joint;
    return list.map((item) => ({
      id: item.id,
      text:
        language === 'hi' && item.hi
          ? item.hi
          : language === 'mr'
          ? item.mr
          : item.en,
    }));
  }

  /**
   * Simulated response generation with intentional realistic typing latency (~650ms)
   */
  async generateResponse(
    userQuery: string,
    perspective: CounsellingPerspective,
    language: CounsellingLanguage,
    course?: Course | null
  ): Promise<CounsellingMessage> {
    const normalizedQuery = userQuery.toLowerCase().trim();

    // Find best matching template
    let matchedTemplate = RESPONSE_TEMPLATES.find((tpl) => {
      if (tpl.category === 'general') return false;
      return tpl.keywords.some((keyword) => normalizedQuery.includes(keyword.toLowerCase()));
    });

    // Fallback if no specific keyword matched
    if (!matchedTemplate) {
      matchedTemplate = RESPONSE_TEMPLATES.find((tpl) => tpl.category === 'general')!;
    }

    // Generate language-specific response
    const content =
      language === 'hi' && matchedTemplate.hi
        ? matchedTemplate.hi(course, perspective)
        : language === 'mr'
        ? matchedTemplate.mr(course, perspective)
        : matchedTemplate.en(course, perspective);

    // Simulate realistic model thinking time
    await new Promise((resolve) => setTimeout(resolve, 650));

    const senderName =
      language === 'hi'
        ? 'स्किलसाथी काउंसलर'
        : language === 'mr'
        ? 'स्किलसाथी समुपदेशक'
        : 'SkillSaathi AI Counsellor';

    return {
      id: `msg-resp-${Date.now()}`,
      sessionId: 'session-local-simulated',
      senderRole: 'counsellor',
      senderName,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
      meta: {
        intent: matchedTemplate.category,
        referencedCourseIds: course ? [course.id] : undefined,
      },
    };
  }

  createUserMessage(
    text: string,
    perspective: CounsellingPerspective,
    language: CounsellingLanguage
  ): CounsellingMessage {
    let senderRole: ParticipantRole = 'student';
    let senderName = 'Student';

    if (perspective === 'parent') {
      senderRole = 'parent';
      senderName = language === 'hi' ? 'अभिभावक (Parent)' : language === 'mr' ? 'पालक (Parent)' : 'Parent';
    } else if (perspective === 'joint') {
      senderRole = 'student';
      senderName = language === 'hi' ? 'परिवार (Family)' : language === 'mr' ? 'कुटुंब (Family)' : 'Family';
    } else {
      senderName = language === 'hi' ? 'विद्यार्थी (Student)' : language === 'mr' ? 'विद्यार्थी (Student)' : 'Student';
    }

    return {
      id: `msg-user-${Date.now()}`,
      sessionId: 'session-local-simulated',
      senderRole,
      senderName,
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
    };
  }

  getUIText(language: CounsellingLanguage) {
    return COUNSELLING_UI_TEXT[language] || COUNSELLING_UI_TEXT.en;
  }
}

export const counsellingService = new CounsellingService();
