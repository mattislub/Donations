import heroBackground from '../assets/hero-background.png';
import NavBar from '../components/NavBar';
import { personalPageNames } from '../data/content';
import { translateValue } from '../utils/translation';

function PersonalPage({ t, language, onLanguageChange, personalPages, isLoading }) {
  return (
    <>
      <header className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="overlay" />
        <NavBar t={t} language={language} onLanguageChange={onLanguageChange} />
        <div className="hero-content personal-hero">
          <p className="hero-eyebrow">{t.personalPage.title}</p>
          <h1>{t.personalPage.title}</h1>
          <p className="hero-description">{t.personalPage.description}</p>
          <div className="personal-page-actions">
            <a className="primary" href="#personal">
              {t.personalPage.backToHome}
            </a>
            <a className="secondary" href="#contact">
              {t.nav.contact}
            </a>
          </div>
        </div>
      </header>
      <main>
        <section className="section personal-page">
          <div className="section-header">
            <h2>{t.personalPage.listTitle}</h2>
            <p>{t.personalPage.listDescription}</p>
          </div>
          {isLoading ? (
            <p>{t.loading.description}</p>
          ) : (
            <div className="personal-page-grid">
              {personalPages.map((page) => (
                <article key={page.name}>
                  <h3>{translateValue(personalPageNames, language, page.name)}</h3>
                  <p>
                    {t.personal.goal}: ${page.goal.toLocaleString()}
                  </p>
                  <p>
                    {t.personal.progress}: ${page.progress.toLocaleString()}
                  </p>
                  <button type="button">{t.personalPage.donateAction}</button>
                </article>
              ))}
            </div>
          )}
        </section>
        <section className="section">
          <div className="section-header">
            <h2>{t.personalPage.createTitle}</h2>
            <p>{t.personalPage.createDescription}</p>
          </div>
          <form className="personal-form">
            <div className="form-row">
              <label htmlFor="pageTitle">
                {t.personalPage.fields.pageTitle}
                <input
                  id="pageTitle"
                  name="pageTitle"
                  placeholder={t.personalPage.placeholders.pageTitle}
                />
              </label>
              <label htmlFor="goal">
                {t.personalPage.fields.goal}
                <input id="goal" name="goal" placeholder={t.personalPage.placeholders.goal} />
              </label>
            </div>
            <div className="form-row">
              <label htmlFor="fullName">
                {t.personalPage.fields.fullName}
                <input id="fullName" name="fullName" placeholder={t.personalPage.placeholders.fullName} />
              </label>
              <label htmlFor="email">
                {t.personalPage.fields.email}
                <input id="email" name="email" placeholder={t.personalPage.placeholders.email} />
              </label>
            </div>
            <div className="form-row">
              <label htmlFor="phone">
                {t.personalPage.fields.phone}
                <input id="phone" name="phone" placeholder={t.personalPage.placeholders.phone} />
              </label>
              <label htmlFor="notes" className="full-width">
                {t.personalPage.fields.notes}
                <textarea
                  id="notes"
                  name="notes"
                  placeholder={t.personalPage.placeholders.notes}
                  rows={4}
                />
              </label>
            </div>
            <button type="button" className="primary">
              {t.personalPage.submit}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default PersonalPage;
