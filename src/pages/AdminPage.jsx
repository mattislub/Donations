import NavBar from '../components/NavBar';
import heroBackground from '../assets/hero-background.png';

function AdminPage({
  t,
  language,
  onLanguageChange,
  adminForm,
  adminError,
  isAdminAuthenticated,
  onAdminChange,
  onAdminSubmit,
  onAdminSignOut,
}) {
  const adminSectionClassName = `section admin-section${isAdminAuthenticated ? ' muted' : ' admin-section-background'}`;
  const adminSectionStyle = !isAdminAuthenticated ? { backgroundImage: `url(${heroBackground})` } : undefined;

  return (
    <>
      <header className="hero">
        <div className="overlay" />
        <NavBar t={t} language={language} onLanguageChange={onLanguageChange} />
      </header>
      <main>
        <section className={adminSectionClassName} style={adminSectionStyle}>
          <div className="section-header">
            <h2>{t.admin.title}</h2>
            <p>{t.admin.description}</p>
          </div>
          <div className="admin-page-actions">
            <a className="secondary" href="#home">
              {t.admin.backHome}
            </a>
          </div>
          {!isAdminAuthenticated ? (
            <div className="admin-login">
              <div className="admin-login-card">
                <h3>{t.admin.loginTitle}</h3>
                <p>{t.admin.loginDescription}</p>
                <form onSubmit={onAdminSubmit}>
                  <label>
                    {t.admin.username}
                    <input
                      type="text"
                      value={adminForm.username}
                      onChange={onAdminChange('username')}
                      placeholder={t.admin.username}
                      autoComplete="username"
                    />
                  </label>
                  <label>
                    {t.admin.password}
                    <input
                      type="password"
                      value={adminForm.password}
                      onChange={onAdminChange('password')}
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
                <button type="button" className="secondary" onClick={onAdminSignOut}>
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
      </main>
    </>
  );
}

export default AdminPage;
