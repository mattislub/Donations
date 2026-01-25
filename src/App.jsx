import { useEffect, useState } from 'react';
import './App.css';
import heroBackground from './assets/hero-background.png';
import logo from './assets/logo (2).png';

const initialDataState = {
  budgetItems: [],
  levels: [],
  statusMarkers: [],
  personalPages: [],
  progress: 0,
  target: 0,
};

const uiTranslations = {
  en: {
    logoTitle: 'Beit Tefilah Givat Ze’ev',
    logoSubtitle: 'Building a community synagogue together',
    nav: {
      home: 'Home',
      donations: 'Donations',
      levels: 'Donation Levels',
      status: 'Build Status',
      personal: 'Personal Pages',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'A community vision connecting generations',
      title: 'Building a community synagogue together',
      description:
        'We invite you to take part in building a new synagogue that will serve as a spiritual, educational, and social hub. Every contribution lays another stone, adds meaning, and leaves a lasting legacy.',
      donateNow: 'Donate now',
      chooseLevel: 'Choose a donation level',
      totalGoal: 'Total goal',
      raisedSoFar: 'Raised so far',
      progress: 'completed',
    },
    loading: {
      title: 'Loading data...',
      description: 'We are fetching the latest information from the database.',
    },
    donations: {
      title: 'Donation Page',
      description: 'Budget details and tangible items that make up the build.',
      costLabel: 'per unit',
      unitsLabel: 'Units',
      donatedLabel: 'Donated',
      action: 'Choose to donate',
    },
    levels: {
      title: 'Donation Levels',
      description: 'Three clear levels with meaningful value and benefits.',
      itemsTitle: 'Sample items',
      benefitsTitle: 'Benefits',
      action: 'Choose a',
    },
    steps: {
      title: 'Select a donation item',
      description: 'A simple, clear process for choosing an item and adding a dedication.',
      items: [
        {
          title: 'Choose a donation level',
          description: 'Gold, Silver, or Bronze based on your ability and desire.',
        },
        {
          title: 'Select an item',
          description: 'View available items and track remaining quantities.',
        },
        {
          title: 'Enter details',
          description: 'Donor name, contact details, and dedication.',
        },
        {
          title: 'Secure payment',
          description: 'Choose a currency and pay securely with instant confirmation.',
        },
      ],
    },
    form: {
      donationLevel: 'Donation level',
      itemSelection: 'Select an item',
      fullName: 'Full name',
      email: 'Email',
      dedication: 'Dedication / In memory / For healing',
      currency: 'Currency',
      message: 'Personal message',
      submit: 'Continue to payment and confirmation',
      note: 'A receipt and thank-you letter will be sent automatically after payment.',
      placeholders: {
        name: 'Jordan Levine',
        email: 'example@email.com',
        dedication: 'In memory of...',
        message: 'Write your dedication or blessing here.',
      },
    },
    status: {
      title: 'Donation Status',
      description: 'A live map showing donated and available items.',
      before: 'Before',
      beforeDescription: 'Initial planning, fundraising, and site preparation.',
      after: 'After',
      afterDescription: 'The synagogue will stand as a vibrant community center.',
    },
    personal: {
      title: 'Personal Donation Pages',
      description: 'Each donor or fundraiser can create a page with their own goal.',
      goal: 'Personal goal',
      progress: 'Raised so far',
      action: 'View personal page',
    },
    info: {
      title: 'More information',
      description: 'Optional pages for community updates and FAQs.',
      items: [
        {
          title: 'About the community',
          description: 'The community story, unique customs, and long-term vision.',
        },
        {
          title: 'Construction updates',
          description: 'Monthly reports, onsite photos, and progress timelines.',
        },
        {
          title: 'Frequently asked questions',
          description: 'How are receipts issued? What is the dedication policy?',
        },
      ],
    },
    footer: {
      contact: 'Contact us',
      phone: 'Phone: 02-0000000',
      email: 'Email: info@community.org',
      addressTitle: 'Address',
      address: '12 Community Blvd, Givat Ze’ev',
      hours: 'Hours: Sun-Thu 09:00-18:00',
      note: 'Thank you for building a warm, welcoming future with us.',
    },
    admin: {
      title: 'Admin Management',
      description: 'Secure area for staff to manage donations, content, and reports.',
      loginTitle: 'Admin login',
      loginDescription: 'Sign in to reach the management dashboard.',
      username: 'Username',
      password: 'Password',
      signIn: 'Sign in',
      signOut: 'Sign out',
      error: 'Incorrect credentials. Please try again.',
      dashboardTitle: 'Management dashboard',
      cards: [
        {
          title: 'Donation approvals',
          description: 'Review new pledges and approve or decline them.',
        },
        {
          title: 'Content updates',
          description: 'Update hero copy, progress numbers, and reports.',
        },
        {
          title: 'Community messages',
          description: 'Send updates to donors and volunteers.',
        },
      ],
      quickActions: {
        title: 'Quick actions',
        items: ['Export donation report', 'Open donor list', 'Add a new level'],
      },
    },
    languageLabel: 'Language',
  },
  he: {
    logoTitle: 'בית תפילה גבעת זאב',
    logoSubtitle: 'בונים יחד בית כנסת קהילתי',
    nav: {
      home: 'בית',
      donations: 'תרומות',
      levels: 'רמות תרומה',
      status: 'סטטוס בנייה',
      personal: 'דפי תרומה אישיים',
      contact: 'צרו קשר',
    },
    hero: {
      eyebrow: 'חזון קהילתי וחיבור בין דורות',
      title: 'בונים יחד בית כנסת קהילתי',
      description:
        'אנו מזמינים אתכם לקחת חלק בהקמת בית כנסת חדש שישמש מרכז רוחני, חינוכי וחברתי. כל תרומה בונה אבן נוספת, מעניקה משמעות ומשאירה חותם לדורות הבאים.',
      donateNow: 'לתרומה עכשיו',
      chooseLevel: 'לבחור רמת תרומה',
      totalGoal: 'יעד כולל',
      raisedSoFar: 'נאסף עד כה',
      progress: 'הושלמו',
    },
    loading: {
      title: 'טוען נתונים...',
      description: 'המערכת מושכת את המידע מהמסד הנתונים.',
    },
    donations: {
      title: 'עמוד תרומות',
      description: 'פירוט התקציב והפריטים המוחשיים שמרכיבים את הבנייה.',
      costLabel: 'ליחידה',
      unitsLabel: 'מספר יחידות',
      donatedLabel: 'נתרם',
      action: 'בחרו לתרום',
    },
    levels: {
      title: 'רמות תרומה',
      description: 'שלוש רמות ברורות עם ערך רגשי ותועלות משמעותיות.',
      itemsTitle: 'פריטים לדוגמה',
      benefitsTitle: 'הטבות',
      action: 'בחרו תרומת',
    },
    steps: {
      title: 'בחירת פריט לתרומה',
      description: 'תהליך פשוט וברור לבחירת פריט, מילוי פרטים והקדשה אישית.',
      items: [
        {
          title: 'בחירת רמת תרומה',
          description: 'זהב, כסף או ארד בהתאם ליכולת ולרצון.',
        },
        {
          title: 'בחירת פריט',
          description: 'צפייה בפריטים הזמינים ומעקב אחרי היתרה.',
        },
        {
          title: 'מילוי פרטים',
          description: 'שם התורם, פרטי קשר והקדשה אישית.',
        },
        {
          title: 'תשלום מאובטח',
          description: 'בחירת מטבע ותשלום מאובטח עם אישור מיידי.',
        },
      ],
    },
    form: {
      donationLevel: 'רמת תרומה',
      itemSelection: 'בחירת פריט',
      fullName: 'שם מלא',
      email: 'אימייל',
      dedication: 'הקדשה / לעילוי נשמה / לרפואה',
      currency: 'מטבע',
      message: 'הודעה אישית',
      submit: 'המשך לתשלום ואישור',
      note: 'לאחר התשלום תישלח קבלה ומכתב תודה אוטומטי.',
      placeholders: {
        name: 'ישראל ישראלי',
        email: 'example@email.com',
        dedication: 'לזכר...',
        message: 'כתבו כאן הקדשה או ברכה.',
      },
    },
    status: {
      title: 'עמוד סטטוס התרומות',
      description: 'מפת מצב מרגשת עם סימון הפריטים שכבר נתרמו והפריטים הזמינים.',
      before: 'לפני',
      beforeDescription: 'תכנון ראשוני, איסוף התרומות והכנת השטח.',
      after: 'אחרי',
      afterDescription: 'בית הכנסת יעמוד כמרכז קהילתי מלא חיים ומאור פנים.',
    },
    personal: {
      title: 'דפי תרומה אישיים',
      description: 'אפשרות לכל תורם או מגייס ליצור דף אישי עם יעד משלו.',
      goal: 'יעד אישי',
      progress: 'הושג עד כה',
      action: 'צפייה בדף האישי',
    },
    info: {
      title: 'עוד מידע',
      description: 'עמודים אופציונליים שניתן להוסיף לעדכוני קהילה ולשאלות נפוצות.',
      items: [
        {
          title: 'על הקהילה',
          description: 'סיפור הקהילה, המנהגים המיוחדים והחזון לשנים הבאות.',
        },
        {
          title: 'עדכוני בנייה',
          description: 'דוח חודשי, תמונות מהשטח ולוחות זמנים להתקדמות.',
        },
        {
          title: 'שאלות נפוצות',
          description: 'איך מתקבלת הקבלה? מהי מדיניות ההקדשות? איך מצטרפים?',
        },
      ],
    },
    footer: {
      contact: 'צרו קשר',
      phone: 'טלפון: 02-0000000',
      email: 'דוא"ל: info@community.org',
      addressTitle: 'כתובת',
      address: 'שדרות הקהילה 12, גבעת זאב',
      hours: 'שעות פעילות: א׳-ה׳ 09:00-18:00',
      note: 'תודה שאתם בונים איתנו עתיד קהילתי חם ומחבק.',
    },
    admin: {
      title: 'ניהול מנהל',
      description: 'אזור מאובטח לצוות לניהול תרומות, תוכן ודוחות.',
      loginTitle: 'התחברות מנהל',
      loginDescription: 'התחברו כדי להגיע ללוח הניהול.',
      username: 'שם משתמש',
      password: 'סיסמה',
      signIn: 'התחברות',
      signOut: 'התנתקות',
      error: 'פרטי ההתחברות שגויים. נסו שוב.',
      dashboardTitle: 'לוח ניהול',
      cards: [
        {
          title: 'אישורי תרומות',
          description: 'סקירת התחייבויות חדשות ואישור או דחייה שלהן.',
        },
        {
          title: 'עדכוני תוכן',
          description: 'עדכון טקסטים, נתוני התקדמות ודוחות.',
        },
        {
          title: 'הודעות קהילה',
          description: 'שליחת עדכונים לתורמים ולמתנדבים.',
        },
      ],
      quickActions: {
        title: 'פעולות מהירות',
        items: ['ייצוא דוח תרומות', 'פתיחת רשימת תורמים', 'הוספת רמת תרומה'],
      },
    },
    languageLabel: 'שפה',
  },
};

const budgetItemNames = {
  'ספסל תפילה': { en: 'Prayer Bench', he: 'ספסל תפילה' },
  'לבני קיר': { en: 'Wall Bricks', he: 'לבני קיר' },
  'חלון זכוכית': { en: 'Stained Glass Window', he: 'חלון זכוכית' },
  'חדר לימוד': { en: 'Study Room', he: 'חדר לימוד' },
  'ספרייה מרכזית': { en: 'Central Library', he: 'ספרייה מרכזית' },
};

const levelNames = {
  זהב: { en: 'Gold', he: 'זהב' },
  כסף: { en: 'Silver', he: 'כסף' },
  ארד: { en: 'Bronze', he: 'ארד' },
};

const levelSubtitles = {
  'תרומות גדולות ומשמעותיות': { en: 'Major gifts with lasting impact', he: 'תרומות גדולות ומשמעותיות' },
  'תרומות בינוניות לפריטים מרכזיים': {
    en: 'Mid-size gifts for central items',
    he: 'תרומות בינוניות לפריטים מרכזיים',
  },
  'תרומות קטנות ונגישות לכל אחד': {
    en: 'Accessible gifts for every supporter',
    he: 'תרומות קטנות ונגישות לכל אחד',
  },
};

const levelItems = {
  'חדר תפילה': { en: 'Prayer Hall', he: 'חדר תפילה' },
  'אגף לימוד': { en: 'Study Wing', he: 'אגף לימוד' },
  'ספרייה מרכזית': { en: 'Central Library', he: 'ספרייה מרכזית' },
  'חלון מעוטר': { en: 'Decorative Window', he: 'חלון מעוטר' },
  'ספסל מיוחד': { en: 'Special Bench', he: 'ספסל מיוחד' },
  'ארון קודש': { en: 'Holy Ark', he: 'ארון קודש' },
  לבנה: { en: 'Brick', he: 'לבנה' },
  כיסא: { en: 'Chair', he: 'כיסא' },
  'פריט עיצוב': { en: 'Design Feature', he: 'פריט עיצוב' },
};

const levelBenefits = {
  'שלט קבוע בכניסה': { en: 'Permanent entrance plaque', he: 'שלט קבוע בכניסה' },
  'אזכור בולט באתר': { en: 'Featured mention on the site', he: 'אזכור בולט באתר' },
  'דוא"ל עם תמונת הפריט שנתרם': {
    en: 'Email with a photo of the donated item',
    he: 'דוא"ל עם תמונת הפריט שנתרם',
  },
  'אזכור באתר': { en: 'Mention on the site', he: 'אזכור באתר' },
  'אזכור ברשימת התורמים': { en: 'Mention in the donor list', he: 'אזכור ברשימת התורמים' },
};

const statusNames = {
  'ספרייה מרכזית': { en: 'Central Library', he: 'ספרייה מרכזית' },
  'אגף לימוד': { en: 'Study Wing', he: 'אגף לימוד' },
  'חלון דרומי': { en: 'Southern Window', he: 'חלון דרומי' },
  'ספסל צפוני': { en: 'Northern Bench', he: 'ספסל צפוני' },
};

const statusDedications = {
  'מוקדש לזכר הרב שלמה': {
    en: 'Dedicated to the memory of Rabbi Shlomo',
    he: 'מוקדש לזכר הרב שלמה',
  },
  'נחנך ע"י משפחת כהן': {
    en: 'Dedicated by the Cohen family',
    he: 'נחנך ע"י משפחת כהן',
  },
  'לע"נ לאה בת רחל': {
    en: 'In memory of Leah bat Rachel',
    he: 'לע"נ לאה בת רחל',
  },
  'לרפואת דוד בן רבקה': {
    en: 'For the healing of David ben Rivka',
    he: 'לרפואת דוד בן רבקה',
  },
};

const statusLabels = {
  'זמין לתרומה': { en: 'Available', he: 'זמין לתרומה' },
  נתרם: { en: 'Donated', he: 'נתרם' },
};

const statusKeyMap = {
  'זמין לתרומה': 'available',
  Available: 'available',
  נתרם: 'donated',
  Donated: 'donated',
};

const personalPageNames = {
  'משפחת לוי': { en: 'Levi Family', he: 'משפחת לוי' },
  'נוער גבעת זאב': { en: 'Givat Ze’ev Youth', he: 'נוער גבעת זאב' },
  'קבוצת המתנדבים': { en: 'Volunteer Group', he: 'קבוצת המתנדבים' },
};

const translateValue = (map, language, value) => map[value]?.[language] ?? value;
const translateWithFallback = (primaryMap, fallbackMap, language, value) =>
  primaryMap[value]?.[language] ?? fallbackMap[value]?.[language] ?? value;

function App() {
  const [data, setData] = useState(initialDataState);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [adminForm, setAdminForm] = useState({ username: '', password: '' });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/initial-data');
        if (!response.ok) {
          throw new Error('Failed to fetch initial data');
        }
        const payload = await response.json();
        setData(payload);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const percent =
    data.target > 0 ? Math.round((data.progress / data.target) * 100) : 0;
  const t = uiTranslations[language];
  const isRtl = language === 'he';
  const adminCredentials = { username: 'admin', password: 'donations2024' };

  const handleAdminChange = (field) => (event) => {
    setAdminForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAdminSubmit = (event) => {
    event.preventDefault();
    if (
      adminForm.username.trim() === adminCredentials.username &&
      adminForm.password === adminCredentials.password
    ) {
      setIsAdminAuthenticated(true);
      setAdminError('');
      setAdminForm({ username: '', password: '' });
      return;
    }
    setAdminError(t.admin.error);
  };

  const handleAdminSignOut = () => {
    setIsAdminAuthenticated(false);
    setAdminError('');
  };

  return (
    <div className="app" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="overlay" />
        <nav className="nav">
          <div className="logo-group">
            <img src={logo} alt={t.logoTitle} />
            <div>
              <p className="logo-title">{t.logoTitle}</p>
              <p className="logo-subtitle">{t.logoSubtitle}</p>
            </div>
          </div>
          <div className="nav-links">
            <a href="#home">{t.nav.home}</a>
            <a href="#donations">{t.nav.donations}</a>
            <a href="#levels">{t.nav.levels}</a>
            <a href="#status">{t.nav.status}</a>
            <a href="#personal">{t.nav.personal}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div className="lang-toggle" aria-label={t.languageLabel}>
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={language === 'he' ? 'active' : ''}
              onClick={() => setLanguage('he')}
            >
              עברית
            </button>
          </div>
        </nav>

        <div id="home" className="hero-content">
          <p className="hero-eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions">
            <a className="primary" href="#donations">
              {t.hero.donateNow}
            </a>
            <a className="secondary" href="#levels">
              {t.hero.chooseLevel}
            </a>
          </div>
          <div className="progress-card">
            <div>
              <p className="progress-label">{t.hero.totalGoal}</p>
              <p className="progress-value">${data.target.toLocaleString()}</p>
            </div>
            <div>
              <p className="progress-label">{t.hero.raisedSoFar}</p>
              <p className="progress-value">${data.progress.toLocaleString()}</p>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <p className="progress-percent">
              {percent}% {t.hero.progress}
            </p>
          </div>
        </div>
      </header>

      <main>
        {isLoading ? (
          <section className="section">
            <div className="section-header">
              <h2>{t.loading.title}</h2>
              <p>{t.loading.description}</p>
            </div>
          </section>
        ) : null}
        <section id="donations" className="section">
          <div className="section-header">
            <h2>{t.donations.title}</h2>
            <p>{t.donations.description}</p>
          </div>
          <div className="budget-grid">
            {data.budgetItems.map((item) => (
              <article key={item.name} className="budget-card">
                <h3>{translateValue(budgetItemNames, language, item.name)}</h3>
                <p className="budget-cost">
                  {item.cost} {t.donations.costLabel}
                </p>
                <div className="budget-stats">
                  <div>
                    <span>{t.donations.unitsLabel}</span>
                    <strong>{item.units}</strong>
                  </div>
                  <div>
                    <span>{t.donations.donatedLabel}</span>
                    <strong>{item.donated}</strong>
                  </div>
                </div>
                <button type="button">{t.donations.action}</button>
              </article>
            ))}
          </div>
        </section>

        <section id="levels" className="section muted">
          <div className="section-header">
            <h2>{t.levels.title}</h2>
            <p>{t.levels.description}</p>
          </div>
          <div className="levels-grid">
            {data.levels.map((level) => (
              <article key={level.name} className="level-card">
                <h3>
                  {t.levels.action}{' '}
                  {translateValue(levelNames, language, level.name)}
                </h3>
                <p className="level-subtitle">
                  {translateValue(levelSubtitles, language, level.subtitle)}
                </p>
                <div>
                  <h4>{t.levels.itemsTitle}</h4>
                  <ul>
                    {level.items.map((item) => (
                      <li key={item}>{translateValue(levelItems, language, item)}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>{t.levels.benefitsTitle}</h4>
                  <ul>
                    {level.benefits.map((benefit) => (
                      <li key={benefit}>
                        {translateValue(levelBenefits, language, benefit)}
                      </li>
                    ))}
                  </ul>
                </div>
                <button type="button">
                  {t.levels.action} {translateValue(levelNames, language, level.name)}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>{t.steps.title}</h2>
            <p>{t.steps.description}</p>
          </div>
          <div className="steps-grid">
            {t.steps.items.map((step, index) => (
              <div key={step.title} className="step">
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

          <form className="donation-form">
            <div className="form-row">
              <label>
                {t.form.donationLevel}
                <select>
                  {Object.keys(levelNames).map((level) => (
                    <option key={level}>
                      {translateValue(levelNames, language, level)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {t.form.itemSelection}
                <select>
                  {['חדר לימוד', 'חלון מעוטר', 'לבני קיר'].map((item) => (
                    <option key={item}>
                      {translateWithFallback(
                        budgetItemNames,
                        levelItems,
                        language,
                        item
                      )}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                {t.form.fullName}
                <input type="text" placeholder={t.form.placeholders.name} />
              </label>
              <label>
                {t.form.email}
                <input type="email" placeholder={t.form.placeholders.email} />
              </label>
            </div>
            <div className="form-row">
              <label>
                {t.form.dedication}
                <input type="text" placeholder={t.form.placeholders.dedication} />
              </label>
              <label>
                {t.form.currency}
                <select>
                  <option>USD</option>
                  <option>ILS</option>
                  <option>EUR</option>
                </select>
              </label>
            </div>
            <label className="full-width">
              {t.form.message}
              <textarea rows="4" placeholder={t.form.placeholders.message} />
            </label>
            <button className="primary" type="button">
              {t.form.submit}
            </button>
            <p className="form-note">{t.form.note}</p>
          </form>
        </section>

        <section id="status" className="section muted">
          <div className="section-header">
            <h2>{t.status.title}</h2>
            <p>{t.status.description}</p>
          </div>
          <div className="status-board">
            <img src={heroBackground} alt={t.status.title} />
            {data.statusMarkers.map((marker) => (
              <div
                key={marker.name}
                className={`marker ${statusKeyMap[marker.status] || 'available'}`}
                style={{ top: marker.top, left: marker.left }}
              >
                <span>{translateValue(statusNames, language, marker.name)}</span>
                <div className="marker-card">
                  <strong>{translateValue(statusLabels, language, marker.status)}</strong>
                  <p>{translateValue(statusDedications, language, marker.dedication)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="before-after">
            <div>
              <h3>{t.status.before}</h3>
              <p>{t.status.beforeDescription}</p>
            </div>
            <div>
              <h3>{t.status.after}</h3>
              <p>{t.status.afterDescription}</p>
            </div>
          </div>
        </section>

        <section id="personal" className="section">
          <div className="section-header">
            <h2>{t.personal.title}</h2>
            <p>{t.personal.description}</p>
          </div>
          <div className="personal-grid">
            {data.personalPages.map((page) => (
              <article key={page.name}>
                <h3>{translateValue(personalPageNames, language, page.name)}</h3>
                <p>
                  {t.personal.goal}: ${page.goal.toLocaleString()}
                </p>
                <p>
                  {t.personal.progress}: ${page.progress.toLocaleString()}
                </p>
                <button type="button">{t.personal.action}</button>
              </article>
            ))}
          </div>
        </section>

        <section id="admin" className="section muted admin-section">
          <div className="section-header">
            <h2>{t.admin.title}</h2>
            <p>{t.admin.description}</p>
          </div>
          {!isAdminAuthenticated ? (
            <div className="admin-login">
              <div className="admin-login-card">
                <h3>{t.admin.loginTitle}</h3>
                <p>{t.admin.loginDescription}</p>
                <form onSubmit={handleAdminSubmit}>
                  <label>
                    {t.admin.username}
                    <input
                      type="text"
                      value={adminForm.username}
                      onChange={handleAdminChange('username')}
                      placeholder={t.admin.username}
                      autoComplete="username"
                    />
                  </label>
                  <label>
                    {t.admin.password}
                    <input
                      type="password"
                      value={adminForm.password}
                      onChange={handleAdminChange('password')}
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                  </label>
                  {adminError ? <p className="form-error">{adminError}</p> : null}
                  <button className="primary" type="submit">
                    {t.admin.signIn}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h3>{t.admin.dashboardTitle}</h3>
                  <p>{t.admin.description}</p>
                </div>
                <button type="button" className="secondary" onClick={handleAdminSignOut}>
                  {t.admin.signOut}
                </button>
              </div>
              <div className="admin-grid">
                {t.admin.cards.map((card) => (
                  <article key={card.title} className="admin-card">
                    <h4>{card.title}</h4>
                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
              <div className="admin-actions">
                <h4>{t.admin.quickActions.title}</h4>
                <div className="admin-action-list">
                  {t.admin.quickActions.items.map((item) => (
                    <button key={item} type="button">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="section muted">
          <div className="section-header">
            <h2>{t.info.title}</h2>
            <p>{t.info.description}</p>
          </div>
          <div className="info-grid">
            {t.info.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact">
        <div>
          <h3>{t.footer.contact}</h3>
          <p>{t.footer.phone}</p>
          <p>{t.footer.email}</p>
        </div>
        <div>
          <h3>{t.footer.addressTitle}</h3>
          <p>{t.footer.address}</p>
          <p>{t.footer.hours}</p>
        </div>
        <p className="footer-note">{t.footer.note}</p>
      </footer>
    </div>
  );
}

export default App;
