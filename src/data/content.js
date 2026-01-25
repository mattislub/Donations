export const initialDataState = {
  budgetItems: [],
  levels: [],
  statusMarkers: [],
  personalPages: [],
  progress: 0,
  target: 0,
};

export const uiTranslations = {
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
      admin: 'Admin',
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
      sending: 'Sending...',
      success: 'Thank you! Your details were sent successfully.',
      error: 'Something went wrong. Please try again shortly.',
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
    personalPage: {
      title: 'Personal donation pages',
      description:
        'Browse community members who fundraise through personal pages and choose to donate through them.',
      listTitle: 'Active personal pages',
      listDescription: 'Pick a fundraiser to donate through their personal link.',
      donateAction: 'Donate through this page',
      createTitle: 'Create a new personal page',
      createDescription:
        'Fill in the details to open a new fundraising page with a private goal and contact details.',
      backToHome: 'Back to main page',
      fields: {
        pageTitle: 'Page title',
        goal: 'Donation goal',
        fullName: 'Full name',
        email: 'Email address',
        phone: 'Phone number',
        notes: 'Additional details',
      },
      placeholders: {
        pageTitle: 'Levi family campaign',
        goal: '50000',
        fullName: 'Jordan Levine',
        email: 'example@email.com',
        phone: '050-0000000',
        notes: 'Share a short description or dedication.',
      },
      submit: 'Create personal donation page',
      sending: 'Sending...',
      createSuccess: 'Your page request was received. A link has been sent by email.',
      createError: 'Unable to create the page. Please try again.',
      manageTitle: 'Manage your personal page',
      manageDescription:
        'Log in with the access code from your email to share your link and invite supporters.',
      loginTitle: 'Login to your page',
      loginDescription: 'Enter the email and access code we sent you.',
      loginFields: {
        email: 'Email address',
        accessCode: 'Access code',
      },
      loginPlaceholders: {
        email: 'example@email.com',
        accessCode: '••••••',
      },
      loginAction: 'Sign in',
      loginSuccess: 'Login successful. You can now send invitations.',
      loginError: 'Login failed. Please check your email and access code.',
      shareLabel: 'Share your personal page link',
      inviteTitle: 'Send donation requests',
      inviteDescription:
        'Add a list of emails (one per line or separated by commas) and we will send your request.',
      inviteFields: {
        recipients: 'Recipients list',
        message: 'Personal message (optional)',
      },
      invitePlaceholders: {
        recipients: 'name1@email.com, name2@email.com',
        message: 'Write a short note to your supporters.',
      },
      inviteAction: 'Send requests',
      inviteSuccess: 'Your invitations were sent successfully.',
      inviteError: 'Unable to send invitations. Please try again.',
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
      description: 'Secure area for staff to manage CRM tasks, users, and donation settings.',
      loginTitle: 'Admin login',
      loginDescription: 'Sign in to reach the management dashboard.',
      backHome: 'Back to home',
      username: 'Username',
      password: 'Password',
      signIn: 'Sign in',
      signOut: 'Sign out',
      error: 'Incorrect credentials. Please try again.',
      dashboardTitle: 'Management dashboard',
      crm: {
        title: 'CRM Command Center',
        description: 'A unified view for managing every donation touchpoint in real time.',
        actions: ['Create report', 'Sync payments', 'Add user'],
        stats: [
          {
            label: 'Active users',
            value: '1,284',
            meta: '32 new this week',
          },
          {
            label: 'Personal pages',
            value: '86',
            meta: '12 awaiting approval',
          },
          {
            label: 'Donation items',
            value: '214',
            meta: '24 fully funded',
          },
          {
            label: 'General goal',
            value: '₪1.8M',
            meta: '68% collected',
          },
        ],
        modules: [
          {
            title: 'User management',
            description: 'Segment donors, volunteers, and staff with clear roles.',
            meta: '4 segments · 18 pending requests',
          },
          {
            title: 'Personal donation pages',
            description: 'Review, publish, and optimize personalized fundraising pages.',
            meta: '9 drafts · 5 scheduled updates',
          },
          {
            title: 'Donation items',
            description: 'Track physical items, milestones, and remaining inventory.',
            meta: '12 items low on supply',
          },
          {
            title: 'General donation goal',
            description: 'Monitor the overall campaign progress and goal alignment.',
            meta: 'Target reached in 9 weeks at current pace',
          },
        ],
        sidebar: {
          eyebrow: 'Quick view',
          title: 'CRM Highlights',
          description: 'Stay aligned with the fundraising team’s daily priorities.',
          tasksTitle: 'Today’s focus',
          tasks: ['Approve new user accounts', 'Review donation pages', 'Update item availability'],
        },
      },
      security: {
        title: 'Password code',
        description: 'Define a shared access code for trusted administrators.',
        codeLabel: 'New access code',
        confirmLabel: 'Confirm access code',
        hint: 'Use 6-10 digits and update it at least once per quarter.',
        save: 'Save code',
        success: 'Access code saved to the database.',
        error: 'Unable to save the access code. Please try again.',
        mismatch: 'The access codes do not match.',
      },
      profile: {
        title: 'Personal details',
        description: 'Update the contact details shown to donors and staff.',
        fullName: 'Full name',
        phone: 'Phone number',
        email: 'Email address',
        address: 'Mailing address',
        save: 'Save details',
        success: 'Profile details saved to the database.',
        error: 'Unable to save profile details. Please try again.',
        placeholders: {
          fullName: 'Moshe Cohen',
          phone: '050-123-4567',
          email: 'admin@community.org',
          address: '12 Community Blvd, Givat Ze’ev',
        },
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
      admin: 'מנהל',
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
      sending: 'שולח...',
      success: 'תודה! הפרטים נשלחו בהצלחה.',
      error: 'אירעה תקלה. נסו שוב בעוד רגע.',
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
    personalPage: {
      title: 'דפי תרומה אישיים',
      description:
        'עמוד ייעודי עם רשימת מגייסים והאפשרות לתרום דרך דף אישי של כל אחד.',
      listTitle: 'רשימת דפי תרומה פעילים',
      listDescription: 'בחרו מגייס ותרמו דרך הדף האישי שלו.',
      donateAction: 'תרומה דרך הדף',
      createTitle: 'יצירת דף תרומה חדש',
      createDescription:
        'מלאו פרטים ליצירת דף אישי עם יעד פרטי ופרטי קשר מלאים.',
      backToHome: 'חזרה לעמוד הראשי',
      fields: {
        pageTitle: 'שם הדף',
        goal: 'יעד סכום תרומה',
        fullName: 'שם מלא',
        email: 'אימייל',
        phone: 'טלפון',
        notes: 'פרטים נוספים',
      },
      placeholders: {
        pageTitle: 'קמפיין משפחת לוי',
        goal: '50000',
        fullName: 'ישראל ישראלי',
        email: 'example@email.com',
        phone: '050-0000000',
        notes: 'כתבו כאן תיאור קצר או הקדשה.',
      },
      submit: 'יצירת דף תרומה אישי',
      sending: 'שולח...',
      createSuccess: 'הבקשה התקבלה וקישור נשלח למייל.',
      createError: 'לא ניתן ליצור את הדף. נסו שוב.',
      manageTitle: 'ניהול דף תרומה אישי',
      manageDescription:
        'התחברו עם קוד הגישה שקיבלתם במייל כדי לשתף את הקישור ולבקש תרומות.',
      loginTitle: 'התחברות לדף האישי',
      loginDescription: 'הזינו את המייל וקוד הגישה שקיבלתם.',
      loginFields: {
        email: 'דוא״ל',
        accessCode: 'קוד גישה',
      },
      loginPlaceholders: {
        email: 'example@email.com',
        accessCode: '••••••',
      },
      loginAction: 'התחברות',
      loginSuccess: 'ההתחברות הצליחה. ניתן לשלוח בקשות.',
      loginError: 'ההתחברות נכשלה. בדקו את המייל וקוד הגישה.',
      shareLabel: 'קישור לדף האישי שלכם',
      inviteTitle: 'שליחת בקשות תרומה',
      inviteDescription:
        'הוסיפו רשימת מיילים (שורה לכל כתובת או מופרדים בפסיקים) והמערכת תשלח עבורכם.',
      inviteFields: {
        recipients: 'רשימת נמענים',
        message: 'הודעה אישית (אופציונלי)',
      },
      invitePlaceholders: {
        recipients: 'name1@email.com, name2@email.com',
        message: 'כתבו הודעה קצרה לתומכים.',
      },
      inviteAction: 'שליחת בקשה',
      inviteSuccess: 'ההודעות נשלחו בהצלחה.',
      inviteError: 'לא ניתן לשלוח הודעות. נסו שוב.',
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
      description: 'אזור מאובטח לניהול CRM, משתמשים והגדרות תרומה.',
      loginTitle: 'התחברות מנהל',
      loginDescription: 'התחברו כדי להגיע ללוח הניהול.',
      backHome: 'חזרה לדף הבית',
      username: 'שם משתמש',
      password: 'סיסמה',
      signIn: 'התחברות',
      signOut: 'התנתקות',
      error: 'פרטי ההתחברות שגויים. נסו שוב.',
      dashboardTitle: 'לוח ניהול',
      crm: {
        title: 'מרכז שליטה CRM',
        description: 'תצוגה אחודה לניהול כל נקודות המגע עם תורמים בזמן אמת.',
        actions: ['יצירת דוח', 'סנכרון תשלומים', 'הוספת משתמש'],
        stats: [
          {
            label: 'משתמשים פעילים',
            value: '1,284',
            meta: '32 חדשים השבוע',
          },
          {
            label: 'דפים אישיים',
            value: '86',
            meta: '12 ממתינים לאישור',
          },
          {
            label: 'פריטים לתרומה',
            value: '214',
            meta: '24 מומנו במלואם',
          },
          {
            label: 'יעד כללי',
            value: '₪1.8M',
            meta: '68% נאסף',
          },
        ],
        modules: [
          {
            title: 'ניהול משתמשים',
            description: 'סיווג תורמים, מתנדבים וצוות לפי הרשאות.',
            meta: '4 קבוצות · 18 בקשות פתוחות',
          },
          {
            title: 'דפי תרומה אישיים',
            description: 'בדיקה, פרסום ושיפור דפי גיוס מותאמים.',
            meta: '9 טיוטות · 5 עדכונים מתוזמנים',
          },
          {
            title: 'פריטים לתרומה',
            description: 'מעקב אחר פריטים מוחשיים, אבני דרך ומלאי.',
            meta: '12 פריטים במלאי נמוך',
          },
          {
            title: 'יעד תרומה כללי',
            description: 'מעקב אחר התקדמות הקמפיין מול היעד הכולל.',
            meta: 'קצב נוכחי: יעד בעוד 9 שבועות',
          },
        ],
        sidebar: {
          eyebrow: 'סקירה מהירה',
          title: 'דגשים יומיים',
          description: 'יישור קו עם סדרי העדיפויות של צוות הגיוס.',
          tasksTitle: 'מיקוד להיום',
          tasks: ['אישור משתמשים חדשים', 'בדיקת דפי תרומה', 'עדכון זמינות פריטים'],
        },
      },
      security: {
        title: 'קוד סיסמה',
        description: 'הגדירו קוד גישה משותף למנהלים המורשים.',
        codeLabel: 'קוד גישה חדש',
        confirmLabel: 'אימות קוד גישה',
        hint: 'מומלץ קוד בן 6-10 ספרות ולעדכן אחת לרבעון.',
        save: 'שמירת קוד',
        success: 'קוד הגישה נשמר במסד הנתונים.',
        error: 'לא ניתן לשמור את קוד הגישה. נסו שוב.',
        mismatch: 'קודי הגישה אינם תואמים.',
      },
      profile: {
        title: 'פרטים אישיים',
        description: 'עדכון פרטי הקשר שמוצגים לתורמים ולצוות.',
        fullName: 'שם מלא',
        phone: 'טלפון',
        email: 'דוא״ל',
        address: 'כתובת למשלוח',
        save: 'שמירת פרטים',
        success: 'הפרטים נשמרו במסד הנתונים.',
        error: 'לא ניתן לשמור את הפרטים. נסו שוב.',
        placeholders: {
          fullName: 'משה כהן',
          phone: '050-123-4567',
          email: 'admin@community.org',
          address: 'שדרות הקהילה 12, גבעת זאב',
        },
      },
    },
    languageLabel: 'שפה',
  },
};

export const budgetItemNames = {
  'ספסל תפילה': { en: 'Prayer Bench', he: 'ספסל תפילה' },
  'לבני קיר': { en: 'Wall Bricks', he: 'לבני קיר' },
  'חלון זכוכית': { en: 'Stained Glass Window', he: 'חלון זכוכית' },
  'חדר לימוד': { en: 'Study Room', he: 'חדר לימוד' },
  'ספרייה מרכזית': { en: 'Central Library', he: 'ספרייה מרכזית' },
};

export const levelNames = {
  זהב: { en: 'Gold', he: 'זהב' },
  כסף: { en: 'Silver', he: 'כסף' },
  ארד: { en: 'Bronze', he: 'ארד' },
};

export const levelSubtitles = {
  'תרומות גדולות ומשמעותיות': {
    en: 'Major gifts with lasting impact',
    he: 'תרומות גדולות ומשמעותיות',
  },
  'תרומות בינוניות לפריטים מרכזיים': {
    en: 'Mid-size gifts for central items',
    he: 'תרומות בינוניות לפריטים מרכזיים',
  },
  'תרומות קטנות ונגישות לכל אחד': {
    en: 'Accessible gifts for every supporter',
    he: 'תרומות קטנות ונגישות לכל אחד',
  },
};

export const levelItems = {
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

export const levelBenefits = {
  'שלט קבוע בכניסה': { en: 'Permanent entrance plaque', he: 'שלט קבוע בכניסה' },
  'אזכור בולט באתר': { en: 'Featured mention on the site', he: 'אזכור בולט באתר' },
  'דוא"ל עם תמונת הפריט שנתרם': {
    en: 'Email with a photo of the donated item',
    he: 'דוא"ל עם תמונת הפריט שנתרם',
  },
  'אזכור באתר': { en: 'Mention on the site', he: 'אזכור באתר' },
  'אזכור ברשימת התורמים': { en: 'Mention in the donor list', he: 'אזכור ברשימת התורמים' },
};

export const statusNames = {
  'ספרייה מרכזית': { en: 'Central Library', he: 'ספרייה מרכזית' },
  'אגף לימוד': { en: 'Study Wing', he: 'אגף לימוד' },
  'חלון דרומי': { en: 'Southern Window', he: 'חלון דרומי' },
  'ספסל צפוני': { en: 'Northern Bench', he: 'ספסל צפוני' },
};

export const statusDedications = {
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

export const statusLabels = {
  'זמין לתרומה': { en: 'Available', he: 'זמין לתרומה' },
  נתרם: { en: 'Donated', he: 'נתרם' },
};

export const statusKeyMap = {
  'זמין לתרומה': 'available',
  Available: 'available',
  נתרם: 'donated',
  Donated: 'donated',
};

export const personalPageNames = {
  'משפחת לוי': { en: 'Levi Family', he: 'משפחת לוי' },
  'נוער גבעת זאב': { en: 'Givat Ze’ev Youth', he: 'נוער גבעת זאב' },
  'קבוצת המתנדבים': { en: 'Volunteer Group', he: 'קבוצת המתנדבים' },
};
