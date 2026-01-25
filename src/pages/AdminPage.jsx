import { useState } from 'react';
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
  const [accessCodeForm, setAccessCodeForm] = useState({ code: '', confirm: '' });
  const [accessCodeStatus, setAccessCodeStatus] = useState(null);
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  });
  const [profileStatus, setProfileStatus] = useState(null);

  const handleAccessCodeChange = (field) => (event) => {
    setAccessCodeForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleProfileChange = (field) => (event) => {
    setProfileForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAccessCodeSubmit = async (event) => {
    event.preventDefault();
    setAccessCodeStatus(null);

    if (!accessCodeForm.code || accessCodeForm.code !== accessCodeForm.confirm) {
      setAccessCodeStatus({ type: 'error', message: t.admin.security.mismatch });
      return;
    }

    try {
      const response = await fetch('/api/admin/access-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCodeForm.code }),
      });

      if (!response.ok) {
        throw new Error('Failed to save access code');
      }

      setAccessCodeStatus({ type: 'success', message: t.admin.security.success });
      setAccessCodeForm({ code: '', confirm: '' });
    } catch (error) {
      setAccessCodeStatus({ type: 'error', message: t.admin.security.error });
    }
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileStatus(null);

    try {
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      setProfileStatus({ type: 'success', message: t.admin.profile.success });
    } catch (error) {
      setProfileStatus({ type: 'error', message: t.admin.profile.error });
    }
  };

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
                <article className="admin-card admin-card-wide">
                  <h4>{t.admin.management.title}</h4>
                  <p>{t.admin.management.description}</p>
                  <div className="admin-subgrid">
                    {t.admin.management.items.map((item) => (
                      <div key={item.title} className="admin-subcard">
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="admin-action-list admin-action-list-muted">
                    {t.admin.management.actions.map((action) => (
                      <button key={action} type="button">
                        {action}
                      </button>
                    ))}
                  </div>
                </article>
                <article className="admin-card">
                  <h4>{t.admin.security.title}</h4>
                  <p>{t.admin.security.description}</p>
                  <form className="admin-form" onSubmit={handleAccessCodeSubmit}>
                    <label>
                      {t.admin.security.codeLabel}
                      <input
                        type="password"
                        placeholder="••••••"
                        value={accessCodeForm.code}
                        onChange={handleAccessCodeChange('code')}
                      />
                    </label>
                    <label>
                      {t.admin.security.confirmLabel}
                      <input
                        type="password"
                        placeholder="••••••"
                        value={accessCodeForm.confirm}
                        onChange={handleAccessCodeChange('confirm')}
                      />
                    </label>
                    <p className="form-note">{t.admin.security.hint}</p>
                    {accessCodeStatus ? (
                      <p className={accessCodeStatus.type === 'success' ? 'form-success' : 'form-error'}>
                        {accessCodeStatus.message}
                      </p>
                    ) : null}
                    <button className="primary" type="submit">
                      {t.admin.security.save}
                    </button>
                  </form>
                </article>
                <article className="admin-card admin-card-wide">
                  <h4>{t.admin.profile.title}</h4>
                  <p>{t.admin.profile.description}</p>
                  <form className="admin-form" onSubmit={handleProfileSubmit}>
                    <div className="form-row">
                      <label>
                        {t.admin.profile.fullName}
                        <input
                          type="text"
                          placeholder={t.admin.profile.placeholders.fullName}
                          value={profileForm.fullName}
                          onChange={handleProfileChange('fullName')}
                        />
                      </label>
                      <label>
                        {t.admin.profile.phone}
                        <input
                          type="tel"
                          placeholder={t.admin.profile.placeholders.phone}
                          value={profileForm.phone}
                          onChange={handleProfileChange('phone')}
                        />
                      </label>
                    </div>
                    <div className="form-row">
                      <label>
                        {t.admin.profile.email}
                        <input
                          type="email"
                          placeholder={t.admin.profile.placeholders.email}
                          value={profileForm.email}
                          onChange={handleProfileChange('email')}
                        />
                      </label>
                      <label>
                        {t.admin.profile.address}
                        <input
                          type="text"
                          placeholder={t.admin.profile.placeholders.address}
                          value={profileForm.address}
                          onChange={handleProfileChange('address')}
                        />
                      </label>
                    </div>
                    {profileStatus ? (
                      <p className={profileStatus.type === 'success' ? 'form-success' : 'form-error'}>
                        {profileStatus.message}
                      </p>
                    ) : null}
                    <button className="primary" type="submit">
                      {t.admin.profile.save}
                    </button>
                  </form>
                </article>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default AdminPage;
