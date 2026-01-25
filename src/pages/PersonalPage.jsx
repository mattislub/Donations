import { useEffect, useMemo, useState } from 'react';
import heroBackground from '../assets/hero-background.png';
import NavBar from '../components/NavBar';
import { personalPageNames } from '../data/content';
import { translateValue } from '../utils/translation';

function PersonalPage({ t, language, onLanguageChange, personalPages, isLoading }) {
  const [formState, setFormState] = useState({
    pageTitle: '',
    goal: '',
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginState, setLoginState] = useState({ email: '', accessCode: '' });
  const [loginStatus, setLoginStatus] = useState(null);
  const [loggedInPage, setLoggedInPage] = useState(null);
  const [inviteState, setInviteState] = useState({ recipients: '', message: '' });
  const [inviteStatus, setInviteStatus] = useState(null);
  const [isSendingInvites, setIsSendingInvites] = useState(false);
  const getSelectedSlug = () => {
    const [, query] = window.location.hash.split('?');
    if (!query) {
      return '';
    }
    return new URLSearchParams(query).get('slug') ?? '';
  };
  const [selectedSlug, setSelectedSlug] = useState(getSelectedSlug);

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedSlug(getSelectedSlug());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!selectedSlug) {
      return;
    }
    const element = document.getElementById(`personal-page-${selectedSlug}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedSlug, personalPages]);

  const handleFormChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

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

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    setFormStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/personal-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to create page');
      }

      setFormStatus({ type: 'success', message: t.personalPage.createSuccess });
      setFormState({
        pageTitle: '',
        goal: '',
        fullName: '',
        email: '',
        phone: '',
        notes: '',
      });
    } catch (error) {
      setFormStatus({ type: 'error', message: t.personalPage.createError });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoginStatus(null);
    setLoggedInPage(null);

    try {
      const response = await fetch('/api/personal-pages/login', {
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
      const response = await fetch(`/api/personal-pages/${loggedInPage.slug}/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessCode: loginState.accessCode,
          recipients: inviteState.recipients,
          message: inviteState.message,
          language,
        }),
      });

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
                <article
                  key={page.name}
                  id={page.slug ? `personal-page-${page.slug}` : undefined}
                  className={page.slug && page.slug === selectedSlug ? 'personal-page-highlight' : undefined}
                >
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
          <form className="personal-form" onSubmit={handleCreateSubmit}>
            <div className="form-row">
              <label htmlFor="pageTitle">
                {t.personalPage.fields.pageTitle}
                <input
                  id="pageTitle"
                  name="pageTitle"
                  placeholder={t.personalPage.placeholders.pageTitle}
                  value={formState.pageTitle}
                  onChange={handleFormChange('pageTitle')}
                  required
                />
              </label>
              <label htmlFor="goal">
                {t.personalPage.fields.goal}
                <input
                  id="goal"
                  name="goal"
                  placeholder={t.personalPage.placeholders.goal}
                  value={formState.goal}
                  onChange={handleFormChange('goal')}
                  type="number"
                  min="1"
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label htmlFor="fullName">
                {t.personalPage.fields.fullName}
                <input
                  id="fullName"
                  name="fullName"
                  placeholder={t.personalPage.placeholders.fullName}
                  value={formState.fullName}
                  onChange={handleFormChange('fullName')}
                  required
                />
              </label>
              <label htmlFor="email">
                {t.personalPage.fields.email}
                <input
                  id="email"
                  name="email"
                  placeholder={t.personalPage.placeholders.email}
                  value={formState.email}
                  onChange={handleFormChange('email')}
                  type="email"
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label htmlFor="phone">
                {t.personalPage.fields.phone}
                <input
                  id="phone"
                  name="phone"
                  placeholder={t.personalPage.placeholders.phone}
                  value={formState.phone}
                  onChange={handleFormChange('phone')}
                  type="tel"
                />
              </label>
              <label htmlFor="notes" className="full-width">
                {t.personalPage.fields.notes}
                <textarea
                  id="notes"
                  name="notes"
                  placeholder={t.personalPage.placeholders.notes}
                  rows={4}
                  value={formState.notes}
                  onChange={handleFormChange('notes')}
                />
              </label>
            </div>
            {formStatus ? (
              <p className={formStatus.type === 'success' ? 'form-success' : 'form-error'}>
                {formStatus.message}
              </p>
            ) : null}
            <button type="submit" className="primary" disabled={isSubmitting}>
              {isSubmitting ? t.personalPage.sending : t.personalPage.submit}
            </button>
          </form>
        </section>
        <section className="section personal-page-manage">
          <div className="section-header">
            <h2>{t.personalPage.manageTitle}</h2>
            <p>{t.personalPage.manageDescription}</p>
          </div>
          <div className="personal-manage-grid">
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
              {loggedInPage ? (
                <div className="personal-share">
                  <p>{t.personalPage.shareLabel}</p>
                  <a href={shareLink}>{shareLink}</a>
                </div>
              ) : null}
            </article>
            <article className="personal-manage-card">
              <h3>{t.personalPage.inviteTitle}</h3>
              <p>{t.personalPage.inviteDescription}</p>
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
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

export default PersonalPage;
