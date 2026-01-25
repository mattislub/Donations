import logo from '../assets/logo (2).png';

function NavBar({ t, language, onLanguageChange }) {
  return (
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
        <a href="#personal-page">{t.nav.personal}</a>
        <a href="#contact">{t.nav.contact}</a>
        <a href="#admin">{t.nav.admin}</a>
      </div>
      <div className="lang-toggle" aria-label={t.languageLabel}>
        <button
          type="button"
          className={language === 'en' ? 'active' : ''}
          onClick={() => onLanguageChange('en')}
        >
          EN
        </button>
        <button
          type="button"
          className={language === 'he' ? 'active' : ''}
          onClick={() => onLanguageChange('he')}
        >
          עברית
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
