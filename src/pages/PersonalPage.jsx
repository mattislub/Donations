import { useEffect, useMemo, useState } from 'react';
import heroBackground from '../assets/hero-background.png';
import NavBar from '../components/NavBar';
import { personalPageNames } from '../data/content';
import { buildApiUrl } from '../utils/api';
import { translateValue } from '../utils/translation';

const normalizeSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\u0590-\u05ff]+/gi, '-')
    .replace(/^-+|-+$/g, '');

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
  const getSelectedSlug = () => {
    const [, query] = window.location.hash.split('?');
    if (!query) {
      return '';
    }
    return new URLSearchParams(query).get('slug') ?? '';
  };
  const [selectedSlug, setSelectedSlug] = useState(getSelectedSlug);
  const selectedPage = useMemo(() => {
    if (!selectedSlug) {
      return null;
    }
    return (
      personalPages.find((page) => page.slug === selectedSlug) ??
      personalPages.find((page) => normalizeSlug(page.name) === selectedSlug) ??
      null
    );
  }, [personalPages, selectedSlug]);
  const selectedPageSlug = selectedPage ? selectedPage.slug ?? normalizeSlug(selectedPage.name) : '';
  const donationList = useMemo(() => {
    if (!selectedPage) {
      return [];
    }
    const total = Math.max(Number(selectedPage.progress) || 0, 0);
    if (total === 0) {
      return [];
    }
    const ratios = [0.45, 0.3, 0.25];
    const donors = t.personalPage.sampleDonors ?? [];
    let remaining = total;
    return ratios.map((ratio, index) => {
      const amount =
        index === ratios.length - 1
          ? Math.max(remaining, 0)
          : Math.max(Math.floor(total * ratio), 1);
      remaining -= amount;
      return {
        id: `${selectedPageSlug}-donation-${index}`,
        donor: donors[index % donors.length] ?? t.personalPage.anonymousDonor,
        amount,
      };
    });
  }, [selectedPage, selectedPageSlug, t.personalPage.anonymousDonor, t.personalPage.sampleDonors]);
  const goalStats = useMemo(() => {
    if (!selectedPage) {
      return null;
    }
    const goal = Number(selectedPage.goal) || 0;
    const progress = Number(selectedPage.progress) || 0;
    const percent = goal > 0 ? Math.min(Math.round((progress / goal) * 100), 100) : 0;
    const remaining = Math.max(goal - progress, 0);
    return {
      goal,
      progress,
      percent,
      remaining,
    };
  }, [selectedPage]);

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

  const handleSelectPage = (slug) => () => {
    if (!slug) {
      return;
    }
    window.location.hash = `#personal-page?slug=${slug}`;
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    setFormStatus(null);
    setIsSubmitting(true);
    console.info('Submitting personal page creation request.', {
      pageTitle: formState.pageTitle,
      goal: formState.goal,
      fullName: formState.fullName,
      email: formState.email,
    });

    try {
      const response = await fetch(buildApiUrl('/api/personal-pages'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, language }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        console.error('Personal page creation failed (client).', {
          status: response.status,
          statusText: response.statusText,
          payload: errorPayload,
        });
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
      console.error('Personal page creation error (client).', error);
      setFormStatus({ type: 'error', message: t.personalPage.createError });
    } finally {
      setIsSubmitting(false);
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
            <a className="secondary" href="#personal-manage">
              {t.personalPage.manageAction}
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
                  id={`personal-page-${page.slug ?? normalizeSlug(page.name)}`}
                  className={
                    (page.slug ?? normalizeSlug(page.name)) === selectedSlug
                      ? 'personal-page-highlight'
                      : undefined
                  }
                >
                  <h3>{translateValue(personalPageNames, language, page.name)}</h3>
                  <p>
                    {t.personal.goal}: ${page.goal.toLocaleString()}
                  </p>
                  <p>
                    {t.personal.progress}: ${page.progress.toLocaleString()}
                  </p>
                  <button
                    type="button"
                    onClick={handleSelectPage(page.slug ?? normalizeSlug(page.name))}
                  >
                    {t.personalPage.donateAction}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
        <section className="section personal-page-detail">
          <div className="section-header">
            <h2>{t.personalPage.detailTitle}</h2>
            <p>{t.personalPage.detailDescription}</p>
          </div>
          {selectedPage && goalStats ? (
            <article className="personal-detail-card">
              <div className="personal-detail-header">
                <div>
                  <p className="detail-eyebrow">{t.personalPage.detailEyebrow}</p>
                  <h3>{translateValue(personalPageNames, language, selectedPage.name)}</h3>
                  <p className="detail-meta">
                    {t.personalPage.goalLabel}: ${goalStats.goal.toLocaleString()}
                  </p>
                </div>
                <button type="button" className="primary">
                  {t.personalPage.newDonationAction}
                </button>
              </div>
              <div className="personal-detail-progress">
                <div className="goal-metrics">
                  <div className="goal-metric">
                    <span>{t.personalPage.raisedLabel}</span>
                    <strong>${goalStats.progress.toLocaleString()}</strong>
                  </div>
                  <div className="goal-metric">
                    <span>{t.personalPage.remainingLabel}</span>
                    <strong>${goalStats.remaining.toLocaleString()}</strong>
                  </div>
                  <div className="goal-metric">
                    <span>{t.personalPage.percentLabel}</span>
                    <strong>{goalStats.percent}%</strong>
                  </div>
                </div>
                <div className="progress-track" role="presentation">
                  <div className="progress-bar" style={{ width: `${goalStats.percent}%` }} />
                </div>
              </div>
              <div className="personal-detail-grid">
                <div>
                  <h4>{t.personalPage.donationListTitle}</h4>
                  {donationList.length > 0 ? (
                    <ul className="donation-list">
                      {donationList.map((donation) => (
                        <li key={donation.id} className="donation-card">
                          <span>{donation.donor}</span>
                          <strong>${donation.amount.toLocaleString()}</strong>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="donation-empty">{t.personalPage.donationListEmpty}</p>
                  )}
                </div>
                <div>
                  <h4>{t.personalPage.statusTitle}</h4>
                  <p className="detail-meta">{t.personalPage.statusDescription}</p>
                  <div className="goal-summary">
                    <div className="goal-summary-row">
                      <span>{t.personalPage.goalLabel}</span>
                      <strong>${goalStats.goal.toLocaleString()}</strong>
                    </div>
                    <div className="goal-summary-row">
                      <span>{t.personalPage.raisedLabel}</span>
                      <strong>${goalStats.progress.toLocaleString()}</strong>
                    </div>
                    <div className="goal-summary-row">
                      <span>{t.personalPage.remainingLabel}</span>
                      <strong>${goalStats.remaining.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <p className="detail-empty">{t.personalPage.selectPrompt}</p>
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
      </main>
    </>
  );
}

export default PersonalPage;
