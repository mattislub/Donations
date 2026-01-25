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
  const [campaignForm, setCampaignForm] = useState({
    totalGoal: '1800000',
    defaultPersonalGoal: '50000',
    allowPersonalGoals: true,
    requireApproval: true,
  });
  const adminSectionClassName = 'section admin-section admin-section-background';
  const adminSectionStyle = { backgroundImage: `url(${heroBackground})` };
  const adminPages = [
    { id: 'users', ...t.admin.pages.users },
    { id: 'campaign', ...t.admin.pages.campaign },
    { id: 'items', ...t.admin.pages.items },
    { id: 'donors', ...t.admin.pages.donors },
  ];
  const [activePage, setActivePage] = useState(adminPages[0].id);
  const activePageContent = adminPages.find((page) => page.id === activePage);

  const handleAccessCodeChange = (field) => (event) => {
    setAccessCodeForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleProfileChange = (field) => (event) => {
    setProfileForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleCampaignChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setCampaignForm((prev) => ({ ...prev, [field]: value }));
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
      <header className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
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
              <div className="admin-page-layout">
                <aside className="admin-page-nav">
                  <div className="admin-crm-card admin-crm-card-primary">
                    <p className="admin-crm-eyebrow">{t.admin.crm.sidebar.eyebrow}</p>
                    <h4>{t.admin.crm.sidebar.title}</h4>
                    <p>{t.admin.crm.sidebar.description}</p>
                  </div>
                  <div className="admin-page-tab-list">
                    {adminPages.map((page) => (
                      <button
                        key={page.id}
                        type="button"
                        className={`admin-page-tab ${activePage === page.id ? 'is-active' : ''}`}
                        onClick={() => setActivePage(page.id)}
                      >
                        <span>{page.title}</span>
                        <small>{page.subtitle}</small>
                      </button>
                    ))}
                  </div>
                  <div className="admin-crm-card">
                    <h5>{t.admin.crm.sidebar.tasksTitle}</h5>
                    <ul className="admin-crm-task-list">
                      {t.admin.crm.sidebar.tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </aside>
                <section className="admin-page-body">
                  <div className="admin-page-header">
                    <div>
                      <h4>{activePageContent?.title}</h4>
                      <p>{activePageContent?.description}</p>
                    </div>
                    <div className="admin-crm-actions">
                      {activePageContent?.actions?.map((action) => (
                        <button key={action} type="button" className="secondary">
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                  {activePage === 'users' ? (
                    <div className="admin-page-content">
                      <div className="admin-crm-stats">
                        {t.admin.pages.users.stats.map((stat) => (
                          <div key={stat.label} className="admin-crm-stat">
                            <p className="admin-crm-stat-label">{stat.label}</p>
                            <p className="admin-crm-stat-value">{stat.value}</p>
                            <p className="admin-crm-stat-meta">{stat.meta}</p>
                          </div>
                        ))}
                      </div>
                      <div className="admin-crm-modules">
                        {t.admin.pages.users.roles.map((role) => (
                          <article key={role.title} className="admin-crm-module">
                            <h5>{role.title}</h5>
                            <p>{role.description}</p>
                            <span>{role.meta}</span>
                          </article>
                        ))}
                      </div>
                      <div className="admin-crm-forms">
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
                  ) : null}
                  {activePage === 'campaign' ? (
                    <div className="admin-page-content">
                      <div className="admin-crm-stats">
                        {t.admin.pages.campaign.stats.map((stat) => (
                          <div key={stat.label} className="admin-crm-stat">
                            <p className="admin-crm-stat-label">{stat.label}</p>
                            <p className="admin-crm-stat-value">{stat.value}</p>
                            <p className="admin-crm-stat-meta">{stat.meta}</p>
                          </div>
                        ))}
                      </div>
                      <div className="admin-card admin-card-wide">
                        <h4>{t.admin.pages.campaign.formTitle}</h4>
                        <p>{t.admin.pages.campaign.formDescription}</p>
                        <form className="admin-form">
                          <div className="form-row">
                            <label>
                              {t.admin.pages.campaign.fields.totalGoal}
                              <input
                                type="text"
                                value={campaignForm.totalGoal}
                                onChange={handleCampaignChange('totalGoal')}
                              />
                            </label>
                            <label>
                              {t.admin.pages.campaign.fields.defaultPersonalGoal}
                              <input
                                type="text"
                                value={campaignForm.defaultPersonalGoal}
                                onChange={handleCampaignChange('defaultPersonalGoal')}
                              />
                            </label>
                          </div>
                          <label className="admin-checkbox">
                            <input
                              type="checkbox"
                              checked={campaignForm.allowPersonalGoals}
                              onChange={handleCampaignChange('allowPersonalGoals')}
                            />
                            <span>{t.admin.pages.campaign.fields.allowPersonalGoals}</span>
                          </label>
                          <label className="admin-checkbox">
                            <input
                              type="checkbox"
                              checked={campaignForm.requireApproval}
                              onChange={handleCampaignChange('requireApproval')}
                            />
                            <span>{t.admin.pages.campaign.fields.requireApproval}</span>
                          </label>
                          <button className="primary" type="button">
                            {t.admin.pages.campaign.save}
                          </button>
                        </form>
                      </div>
                      <div className="admin-crm-modules">
                        {t.admin.pages.campaign.guidelines.map((item) => (
                          <article key={item.title} className="admin-crm-module">
                            <h5>{item.title}</h5>
                            <p>{item.description}</p>
                            <span>{item.meta}</span>
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {activePage === 'items' ? (
                    <div className="admin-page-content">
                      <div className="admin-crm-stats">
                        {t.admin.pages.items.stats.map((stat) => (
                          <div key={stat.label} className="admin-crm-stat">
                            <p className="admin-crm-stat-label">{stat.label}</p>
                            <p className="admin-crm-stat-value">{stat.value}</p>
                            <p className="admin-crm-stat-meta">{stat.meta}</p>
                          </div>
                        ))}
                      </div>
                      <div className="admin-items-grid">
                        {t.admin.pages.items.list.map((item) => (
                          <article key={item.title} className="admin-crm-module">
                            <div className="admin-item-header">
                              <h5>{item.title}</h5>
                              <span className={`admin-item-status status-${item.statusStyle}`}>
                                {item.status}
                              </span>
                            </div>
                            <p>{item.description}</p>
                            <span>{item.meta}</span>
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {activePage === 'donors' ? (
                    <div className="admin-page-content">
                      <div className="admin-crm-stats">
                        {t.admin.pages.donors.stats.map((stat) => (
                          <div key={stat.label} className="admin-crm-stat">
                            <p className="admin-crm-stat-label">{stat.label}</p>
                            <p className="admin-crm-stat-value">{stat.value}</p>
                            <p className="admin-crm-stat-meta">{stat.meta}</p>
                          </div>
                        ))}
                      </div>
                      <div className="admin-card admin-card-wide">
                        <h4>{t.admin.pages.donors.tableTitle}</h4>
                        <p>{t.admin.pages.donors.tableDescription}</p>
                        <div className="admin-table">
                          <div className="admin-table-row admin-table-header">
                            {t.admin.pages.donors.tableHeaders.map((header) => (
                              <span key={header}>{header}</span>
                            ))}
                          </div>
                          {t.admin.pages.donors.list.map((donor) => (
                            <div key={donor.name} className="admin-table-row">
                              <span>{donor.name}</span>
                              <span>{donor.amount}</span>
                              <span>{donor.item}</span>
                              <span>{donor.source}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </section>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default AdminPage;
