import { useMemo, useState } from 'react';
import heroBackground from '../assets/hero-background.png';
import NavBar from '../components/NavBar';
import { buildApiUrl } from '../utils/api';

function PersonalManagePage({ t, language, onLanguageChange }) {
  const [loginState, setLoginState] = useState({ email: '', accessCode: '' });
  const [loginStatus, setLoginStatus] = useState(null);
  const [loggedInPage, setLoggedInPage] = useState(null);
  const [inviteState, setInviteState] = useState({ recipients: '', message: '' });
  const [inviteStatus, setInviteStatus] = useState(null);
  const [isSendingInvites, setIsSendingInvites] = useState(false);

  const handleLoginChange = (field) => (event) => {
    setLoginState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleInviteChange = (field) => (event) => {
    setInviteState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const shareLink = useMemo(() => {
    if (!loggedInPage?.slug) {
      return '';
    }
    return `${window.location.origin}/#personal-page?slug=${loggedInPage.slug}`;
  }, [loggedInPage]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoginStatus(null);
    setLoggedInPage(null);

    try {
      const response = await fetch(buildApiUrl('/api/personal-pages/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginState),
      });

      if (!response.ok) {
        throw new Error('Failed login');
      }

      const payload = await response.json();
      setLoggedInPage(payload.page);
      setLoginStatus({ type: 'success', message: t.personalPage.loginSuccess });
    } catch (error) {
      setLoginStatus({ type: 'error', message: t.personalPage.loginError });
    }
  };

  const handleInviteSubmit = async (event) => {
    event.preventDefault();
    if (!loggedInPage) {
      return;
    }
    setInviteStatus(null);
    setIsSendingInvites(true);

    try {
      const response = await fetch(
        buildApiUrl(`/api/personal-pages/${loggedInPage.slug}/invite`),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessCode: loginState.accessCode,
            recipients: inviteState.recipients,
            message: inviteState.message,
            language,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to send invites');
      }

      setInviteStatus({ type: 'success', message: t.personalPage.inviteSuccess });
      setInviteState({ recipients: '', message: '' });
    } catch (error) {
      setInviteStatus({ type: 'error', message: t.personalPage.inviteError });
    } finally {
      setIsSendingInvites(false);
    }
  };

  return (
    <>
      <header className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="overlay" />
        <NavBar t={t} language={language} onLanguageChange={onLanguageChange} />
        <div className="hero-content personal-hero">
          <p className="hero-eyebrow">{t.personalPage.manageEyebrow}</p>
          <h1>{t.personalPage.manageTitle}</h1>
          <p className="hero-description">{t.personalPage.manageDescription}</p>
          <div className="personal-page-actions">
            <a className="primary" href="#personal-page">
              {t.personalPage.backToPersonal}
            </a>
            <a className="secondary" href="#personal">
              {t.personalPage.backToHome}
            </a>
          </div>
        </div>
      </header>
      <main>
        <section className="section personal-page-manage">
          <div className="section-header">
            <h2>{t.personalPage.manageTitle}</h2>
            <p>{t.personalPage.manageDescription}</p>
          </div>
          <div className="personal-manage-grid">
            {!loggedInPage ? (
              <article className="personal-manage-card">
                <h3>{t.personalPage.loginTitle}</h3>
                <p>{t.personalPage.loginDescription}</p>
                <form className="personal-form" onSubmit={handleLoginSubmit}>
                  <label>
                    {t.personalPage.loginFields.email}
                    <input
                      type="email"
                      value={loginState.email}
                      onChange={handleLoginChange('email')}
                      placeholder={t.personalPage.loginPlaceholders.email}
                      required
                    />
                  </label>
                  <label>
                    {t.personalPage.loginFields.accessCode}
                    <input
                      type="password"
                      value={loginState.accessCode}
                      onChange={handleLoginChange('accessCode')}
                      placeholder={t.personalPage.loginPlaceholders.accessCode}
                      required
                    />
                  </label>
                  {loginStatus ? (
                    <p className={loginStatus.type === 'success' ? 'form-success' : 'form-error'}>
                      {loginStatus.message}
                    </p>
                  ) : null}
                  <button type="submit" className="primary">
                    {t.personalPage.loginAction}
                  </button>
                </form>
              </article>
            ) : null}
            {loggedInPage ? (
              <article className="personal-manage-card">
                <h3>{t.personalPage.inviteTitle}</h3>
                <p>{t.personalPage.inviteDescription}</p>
                {loginStatus?.type === 'success' ? (
                  <p className="form-success">{loginStatus.message}</p>
                ) : null}
                <form className="personal-form" onSubmit={handleInviteSubmit}>
                  <label>
                    {t.personalPage.inviteFields.recipients}
                    <textarea
                      rows={4}
                      value={inviteState.recipients}
                      onChange={handleInviteChange('recipients')}
                      placeholder={t.personalPage.invitePlaceholders.recipients}
                    />
                  </label>
                  <label>
                    {t.personalPage.inviteFields.message}
                    <textarea
                      rows={3}
                      value={inviteState.message}
                      onChange={handleInviteChange('message')}
                      placeholder={t.personalPage.invitePlaceholders.message}
                    />
                  </label>
                  {inviteStatus ? (
                    <p className={inviteStatus.type === 'success' ? 'form-success' : 'form-error'}>
                      {inviteStatus.message}
                    </p>
                  ) : null}
                  <button type="submit" className="primary" disabled={isSendingInvites || !loggedInPage}>
                    {isSendingInvites ? t.personalPage.sending : t.personalPage.inviteAction}
                  </button>
                </form>
                <div className="personal-share">
                  <p>{t.personalPage.shareLabel}</p>
                  <a href={shareLink}>{shareLink}</a>
                </div>
              </article>
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
}

export default PersonalManagePage;
