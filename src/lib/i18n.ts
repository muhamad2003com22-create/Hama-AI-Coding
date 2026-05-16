import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        projects: 'Projects',
        socials: 'Socials',
        admin: 'Admin'
      },
      hero: {
        greeting: "Hi, I'm",
        name: 'Hama',
        title: 'AI Coding - Developer, Website, Application',
        about: 'I am a highly driven AI and Full-Stack Developer proficient in Python, HTML5, CSS3, and JavaScript (JS). I specialize in architecting futuristic digital experiences, from intelligent AI systems to high-performance web applications.'
      },
      projects: {
        title: 'Featured Projects',
        visit: 'Visit Project'
      },
      stack: {
        title: 'Tech Stack'
      },
      chat: {
        placeholder: 'Ask me anything about my work...',
        title: 'AI Representative'
      },
      admin: {
        login: 'Admin Login',
        dashboard: 'Dashboard',
        username: 'Username',
        password: 'Password',
        cancel: 'Cancel'
      }
    }
  },
  ku: {
    translation: {
      nav: {
        home: 'سەرەتا',
        projects: 'پڕۆژەکان',
        socials: 'سۆشیاڵ میدیا',
        admin: 'ئەدمین'
      },
      hero: {
        greeting: 'سڵاو، من',
        name: 'حەمە',
        title: 'AI Coding - گەشەپێدەر، وێبسایت، ئەپڵیکەیشن',
        about: 'من گەشەپێدەرێکی لێهاتووی AI و Full-Stack م و شارەزاییم هەیە لە Python, HTML5, CSS3, و JavaScript (JS). پسپۆڕم لە دیزاینکردنی ئەزموونی دیجیتاڵی داهاتوو، لە سیستەمە زیرەکەکانەوە تا ئەپڵیکەیشنە پیشەگەرییەکان.'
      },
      projects: {
        title: 'پڕۆژە دیارەکان',
        visit: 'بینینی پڕۆژە'
      },
      stack: {
        title: 'تەکنەلۆژیاکان'
      },
      chat: {
        placeholder: 'هەر پرسیارێکت هەیە دەربارەی کارەکانم بپرسە...',
        title: 'نوێنەری AI'
      },
      admin: {
        login: 'چوونەژوورەوەی ئەدمین',
        dashboard: 'داشبۆرد',
        username: 'ناوی بەکارهێنەر',
        password: 'وشەی نهێنی',
        cancel: 'هەڵوەشاندنەوە'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        projects: 'المشاريع',
        socials: 'التواصل',
        admin: 'المدير'
      },
      hero: {
        greeting: 'مرحباً، أنا',
        name: 'حمة',
        title: 'AI Coding - مطور، موقع، تطبيق',
        about: 'أنا مطور ذكاء اصطناعي وFull-Stack طموح، متمرس في Python و HTML5 و CSS3 و JavaScript (JS). أتخصص في هندسة التجارب الرقمية المستقبلية، من أنظمة الذكاء الاصطناعي الذكية إلى تطبيقات الويب عالية الأداء.'
      },
      projects: {
        title: 'المشاريع المميزة',
        visit: 'زيارة المشروع'
      },
      stack: {
        title: 'التقنيات'
      },
      chat: {
        placeholder: 'اسألني أي شيء عن عملي...',
        title: 'ممثل الذكاء الاصطناعي'
      },
      admin: {
        login: 'دخول المسؤول',
        dashboard: 'لوحة التحكم',
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        cancel: 'إلغاء'
      }
    }
  },
  fa: {
    translation: {
      nav: {
        home: 'خانه',
        projects: 'پروژه‌ها',
        socials: 'شبکه‌های اجتماعی',
        admin: 'مدیریت'
      },
      hero: {
        greeting: 'سلام، من',
        name: 'حمه',
        title: 'AI Coding - توسعه‌دهنده، وب‌سایت، اپلیکیشن',
        about: 'من توسعه‌دهنده هوش مصنوعی و Full-Stack با مهارت بالا در Python، HTML5، CSS3 و JavaScript (JS) هستم. تخصص من طراحی تجربه‌های دیجیتال آینده، از سیستم‌های هوشمند تا اپلیکیشن‌های وب با کارایی بالا است.'
      },
      projects: {
        title: 'پروژه‌های شاخص',
        visit: 'مشاهده پروژه'
      },
      stack: {
        title: 'تکنولوژی‌ها'
      },
      chat: {
        placeholder: 'هر سوالی دارید بپرسید...',
        title: 'نماینده هوش مصنوعی'
      },
      admin: {
        login: 'ورود مدیر',
        dashboard: 'پنل مدیریت',
        username: 'نام کاربری',
        password: 'رمز عبور',
        cancel: 'لغو'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
