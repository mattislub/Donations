import './App.css';
const heroBackground =
  'https://images.unsplash.com/photo-1504542522245-7f57b2e1641a?auto=format&fit=crop&w=1600&q=80';
const logo =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Star_of_David.svg/240px-Star_of_David.svg.png';

const budgetItems = [
  {
    name: 'ספסל תפילה',
    cost: '$500',
    units: 120,
    donated: 62,
  },
  {
    name: 'לבני קיר',
    cost: '$80',
    units: 18000,
    donated: 10250,
  },
  {
    name: 'חלון זכוכית',
    cost: '$3,000',
    units: 48,
    donated: 19,
  },
  {
    name: 'חדר לימוד',
    cost: '$50,000',
    units: 6,
    donated: 2,
  },
  {
    name: 'ספרייה מרכזית',
    cost: '$120,000',
    units: 1,
    donated: 0,
  },
];

const levels = [
  {
    name: 'זהב',
    subtitle: 'תרומות גדולות ומשמעותיות',
    items: ['חדר תפילה', 'אגף לימוד', 'ספרייה מרכזית'],
    benefits: [
      'שלט קבוע בכניסה',
      'אזכור בולט באתר',
      'דוא"ל עם תמונת הפריט שנתרם',
    ],
  },
  {
    name: 'כסף',
    subtitle: 'תרומות בינוניות לפריטים מרכזיים',
    items: ['חלון מעוטר', 'ספסל מיוחד', 'ארון קודש'],
    benefits: ['אזכור באתר', 'דוא"ל עם תמונת הפריט שנתרם'],
  },
  {
    name: 'ארד',
    subtitle: 'תרומות קטנות ונגישות לכל אחד',
    items: ['לבנה', 'כיסא', 'פריט עיצוב'],
    benefits: ['אזכור ברשימת התורמים', 'דוא"ל עם תמונת הפריט שנתרם'],
  },
];

const statusMarkers = [
  {
    name: 'ספרייה מרכזית',
    dedication: 'מוקדש לזכר הרב שלמה',
    status: 'זמין לתרומה',
    top: '22%',
    left: '18%',
  },
  {
    name: 'אגף לימוד',
    dedication: 'נחנך ע"י משפחת כהן',
    status: 'נתרם',
    top: '38%',
    left: '48%',
  },
  {
    name: 'חלון דרומי',
    dedication: 'לע"נ לאה בת רחל',
    status: 'נתרם',
    top: '58%',
    left: '32%',
  },
  {
    name: 'ספסל צפוני',
    dedication: 'לרפואת דוד בן רבקה',
    status: 'זמין לתרומה',
    top: '68%',
    left: '65%',
  },
];

const progress = 865000;
const target = 2000000;
const percent = Math.round((progress / target) * 100);

function App() {
  return (
    <div className="app">
      <header className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="overlay" />
        <nav className="nav">
          <div className="logo-group">
            <img src={logo} alt="לוגו בית תפילה" />
            <div>
              <p className="logo-title">בית תפילה גבעת זאב</p>
              <p className="logo-subtitle">בונים יחד בית כנסת קהילתי</p>
            </div>
          </div>
          <div className="nav-links">
            <a href="#home">בית</a>
            <a href="#donations">תרומות</a>
            <a href="#levels">רמות תרומה</a>
            <a href="#status">סטטוס בנייה</a>
            <a href="#personal">דפי תרומה אישיים</a>
            <a href="#contact">צרו קשר</a>
          </div>
        </nav>

        <div id="home" className="hero-content">
          <p className="hero-eyebrow">חזון קהילתי וחיבור בין דורות</p>
          <h1>בונים יחד בית כנסת קהילתי</h1>
          <p className="hero-description">
            אנו מזמינים אתכם לקחת חלק בהקמת בית כנסת חדש שישמש מרכז רוחני, חינוכי וחברתי.
            כל תרומה בונה אבן נוספת, מעניקה משמעות ומשאירה חותם לדורות הבאים.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#donations">
              לתרומה עכשיו
            </a>
            <a className="secondary" href="#levels">
              לבחור רמת תרומה
            </a>
          </div>
          <div className="progress-card">
            <div>
              <p className="progress-label">יעד כולל</p>
              <p className="progress-value">${target.toLocaleString()}</p>
            </div>
            <div>
              <p className="progress-label">נאסף עד כה</p>
              <p className="progress-value">${progress.toLocaleString()}</p>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <p className="progress-percent">{percent}% הושלמו</p>
          </div>
        </div>
      </header>

      <main>
        <section id="donations" className="section">
          <div className="section-header">
            <h2>עמוד תרומות</h2>
            <p>פירוט התקציב והפריטים המוחשיים שמרכיבים את הבנייה.</p>
          </div>
          <div className="budget-grid">
            {budgetItems.map((item) => (
              <article key={item.name} className="budget-card">
                <h3>{item.name}</h3>
                <p className="budget-cost">{item.cost} ליחידה</p>
                <div className="budget-stats">
                  <div>
                    <span>מספר יחידות</span>
                    <strong>{item.units}</strong>
                  </div>
                  <div>
                    <span>נתרם</span>
                    <strong>{item.donated}</strong>
                  </div>
                </div>
                <button type="button">בחרו לתרום</button>
              </article>
            ))}
          </div>
        </section>

        <section id="levels" className="section muted">
          <div className="section-header">
            <h2>רמות תרומה</h2>
            <p>שלוש רמות ברורות עם ערך רגשי ותועלות משמעותיות.</p>
          </div>
          <div className="levels-grid">
            {levels.map((level) => (
              <article key={level.name} className="level-card">
                <h3>רמת {level.name}</h3>
                <p className="level-subtitle">{level.subtitle}</p>
                <div>
                  <h4>פריטים לדוגמה</h4>
                  <ul>
                    {level.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>הטבות</h4>
                  <ul>
                    {level.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <button type="button">בחרו תרומת {level.name}</button>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>בחירת פריט לתרומה</h2>
            <p>תהליך פשוט וברור לבחירת פריט, מילוי פרטים והקדשה אישית.</p>
          </div>
          <div className="steps-grid">
            <div className="step">
              <span>1</span>
              <h3>בחירת רמת תרומה</h3>
              <p>זהב, כסף או ארד בהתאם ליכולת ולרצון.</p>
            </div>
            <div className="step">
              <span>2</span>
              <h3>בחירת פריט</h3>
              <p>צפייה בפריטים הזמינים ומעקב אחרי היתרה.</p>
            </div>
            <div className="step">
              <span>3</span>
              <h3>מילוי פרטים</h3>
              <p>שם התורם, פרטי קשר והקדשה אישית.</p>
            </div>
            <div className="step">
              <span>4</span>
              <h3>תשלום מאובטח</h3>
              <p>בחירת מטבע ותשלום מאובטח עם אישור מיידי.</p>
            </div>
          </div>

          <form className="donation-form">
            <div className="form-row">
              <label>
                רמת תרומה
                <select>
                  <option>זהב</option>
                  <option>כסף</option>
                  <option>ארד</option>
                </select>
              </label>
              <label>
                בחירת פריט
                <select>
                  <option>חדר לימוד</option>
                  <option>חלון מעוטר</option>
                  <option>לבני קיר</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                שם מלא
                <input type="text" placeholder="ישראל ישראלי" />
              </label>
              <label>
                אימייל
                <input type="email" placeholder="example@email.com" />
              </label>
            </div>
            <div className="form-row">
              <label>
                הקדשה / לעילוי נשמה / לרפואה
                <input type="text" placeholder="לזכר..." />
              </label>
              <label>
                מטבע
                <select>
                  <option>USD</option>
                  <option>ILS</option>
                  <option>EUR</option>
                </select>
              </label>
            </div>
            <label className="full-width">
              הודעה אישית
              <textarea rows="4" placeholder="כתבו כאן הקדשה או ברכה." />
            </label>
            <button className="primary" type="button">
              המשך לתשלום ואישור
            </button>
            <p className="form-note">לאחר התשלום תישלח קבלה ומכתב תודה אוטומטי.</p>
          </form>
        </section>

        <section id="status" className="section muted">
          <div className="section-header">
            <h2>עמוד סטטוס התרומות</h2>
            <p>מפת מצב מרגשת עם סימון הפריטים שכבר נתרמו והפריטים הזמינים.</p>
          </div>
          <div className="status-board">
            <img src={heroBackground} alt="הדמיית בית הכנסת" />
            {statusMarkers.map((marker) => (
              <div
                key={marker.name}
                className={`marker ${marker.status === 'נתרם' ? 'donated' : 'available'}`}
                style={{ top: marker.top, left: marker.left }}
              >
                <span>{marker.name}</span>
                <div className="marker-card">
                  <strong>{marker.status}</strong>
                  <p>{marker.dedication}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="before-after">
            <div>
              <h3>לפני</h3>
              <p>תכנון ראשוני, איסוף התרומות והכנת השטח.</p>
            </div>
            <div>
              <h3>אחרי</h3>
              <p>בית הכנסת יעמוד כמרכז קהילתי מלא חיים ומאור פנים.</p>
            </div>
          </div>
        </section>

        <section id="personal" className="section">
          <div className="section-header">
            <h2>דפי תרומה אישיים</h2>
            <p>אפשרות לכל תורם או מגייס ליצור דף אישי עם יעד משלו.</p>
          </div>
          <div className="personal-grid">
            <article>
              <h3>משפחת לוי</h3>
              <p>יעד אישי: $150,000</p>
              <p>הושג עד כה: $68,000</p>
              <button type="button">צפייה בדף האישי</button>
            </article>
            <article>
              <h3>נוער גבעת זאב</h3>
              <p>יעד אישי: $45,000</p>
              <p>הושג עד כה: $31,500</p>
              <button type="button">צפייה בדף האישי</button>
            </article>
            <article>
              <h3>קבוצת המתנדבים</h3>
              <p>יעד אישי: $80,000</p>
              <p>הושג עד כה: $52,300</p>
              <button type="button">צפייה בדף האישי</button>
            </article>
          </div>
        </section>

        <section className="section muted">
          <div className="section-header">
            <h2>עוד מידע</h2>
            <p>עמודים אופציונליים שניתן להוסיף לעדכוני קהילה ולשאלות נפוצות.</p>
          </div>
          <div className="info-grid">
            <article>
              <h3>על הקהילה</h3>
              <p>סיפור הקהילה, המנהגים המיוחדים והחזון לשנים הבאות.</p>
            </article>
            <article>
              <h3>עדכוני בנייה</h3>
              <p>דוח חודשי, תמונות מהשטח ולוחות זמנים להתקדמות.</p>
            </article>
            <article>
              <h3>שאלות נפוצות</h3>
              <p>איך מתקבלת הקבלה? מהי מדיניות ההקדשות? איך מצטרפים?</p>
            </article>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div>
          <h3>צרו קשר</h3>
          <p>טלפון: 02-0000000</p>
          <p>דוא"ל: info@community.org</p>
        </div>
        <div>
          <h3>כתובת</h3>
          <p>שדרות הקהילה 12, גבעת זאב</p>
          <p>שעות פעילות: א׳-ה׳ 09:00-18:00</p>
        </div>
        <p className="footer-note">תודה שאתם בונים איתנו עתיד קהילתי חם ומחבק.</p>
      </footer>
    </div>
  );
}

export default App;
