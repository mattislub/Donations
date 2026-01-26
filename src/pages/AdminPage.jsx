import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import heroBackground from '../assets/hero-background.png';
import { buildApiUrl } from '../utils/api';

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
  const cloneAdminContent = (source) => JSON.parse(JSON.stringify(source));
  const [adminContent, setAdminContent] = useState(() => cloneAdminContent(t.admin));
  const [adminDraft, setAdminDraft] = useState(() => cloneAdminContent(t.admin));
  const [isEditMode, setIsEditMode] = useState(false);
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
  const adminText = isEditMode ? adminDraft : adminContent;
  const adminPages = [
    { id: 'users', ...adminText.pages.users },
    { id: 'campaign', ...adminText.pages.campaign },
    { id: 'items', ...adminText.pages.items },
    { id: 'donors', ...adminText.pages.donors },
  ];
  const [activePage, setActivePage] = useState(adminPages[0].id);
  const activePageContent = adminPages.find((page) => page.id === activePage);

  useEffect(() => {
    const nextAdminContent = cloneAdminContent(t.admin);
    setAdminContent(nextAdminContent);
    setAdminDraft(nextAdminContent);
    setIsEditMode(false);
  }, [t]);

  const updateAdminDraft = (path, value) => {
    setAdminDraft((prev) => {
      const next = cloneAdminContent(prev);
      let cursor = next;
      for (let i = 0; i < path.length - 1; i += 1) {
        cursor = cursor[path[i]];
      }
      cursor[path[path.length - 1]] = value;
      return next;
    });
  };

  const handleAdminInputChange = (path) => (event) => {
    updateAdminDraft(path, event.target.value);
  };

  const handleEditStart = () => {
    setAdminDraft(cloneAdminContent(adminContent));
    setIsEditMode(true);
  };

  const handleEditCancel = () => {
    setAdminDraft(cloneAdminContent(adminContent));
    setIsEditMode(false);
  };

  const handleEditSave = () => {
    setAdminContent(cloneAdminContent(adminDraft));
    setIsEditMode(false);
  };

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
      setAccessCodeStatus({ type: 'error', message: adminText.security.mismatch });
      return;
    }

    try {
      const response = await fetch(buildApiUrl('/api/admin/access-code'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCodeForm.code }),
      });

      if (!response.ok) {
        throw new Error('Failed to save access code');
      }

      setAccessCodeStatus({ type: 'success', message: adminText.security.success });
      setAccessCodeForm({ code: '', confirm: '' });
    } catch (error) {
      setAccessCodeStatus({ type: 'error', message: adminText.security.error });
    }
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileStatus(null);

    try {
      const response = await fetch(buildApiUrl('/api/admin/profile'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      setProfileStatus({ type: 'success', message: adminText.profile.success });
    } catch (error) {
      setProfileStatus({ type: 'error', message: adminText.profile.error });
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
            {isEditMode ? (
              <>
                <input
                  className="admin-edit-input"
                  type="text"
                  value={adminDraft.title}
                  onChange={handleAdminInputChange(['title'])}
                />
                <textarea
                  className="admin-edit-textarea"
                  value={adminDraft.description}
                  onChange={handleAdminInputChange(['description'])}
                />
              </>
            ) : (
              <>
                <h2>{adminText.title}</h2>
                <p>{adminText.description}</p>
              </>
            )}
          </div>
          <div className="admin-page-actions">
            <a className="secondary" href="#home">
              {adminText.backHome}
            </a>
          </div>
          {!isAdminAuthenticated ? (
            <div className="admin-login">
              <div className="admin-login-card">
                <h3>{adminText.loginTitle}</h3>
                <p>{adminText.loginDescription}</p>
                <form onSubmit={onAdminSubmit}>
                  <label>
                    {adminText.username}
                    <input
                      type="text"
                      value={adminForm.username}
                      onChange={onAdminChange('username')}
                      placeholder={adminText.username}
                      autoComplete="username"
                    />
                  </label>
                  <label>
                    {adminText.password}
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
                    {adminText.signIn}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h3>{adminText.dashboardTitle}</h3>
                  <p>{adminText.description}</p>
                </div>
                <div className="admin-panel-header-actions">
                  {isEditMode ? (
                    <>
                      <button type="button" className="secondary" onClick={handleEditCancel}>
                        {adminText.editing.cancel}
                      </button>
                      <button type="button" className="primary" onClick={handleEditSave}>
                        {adminText.editing.save}
                      </button>
                    </>
                  ) : (
                    <button type="button" className="secondary" onClick={handleEditStart}>
                      {adminText.editing.start}
                    </button>
                  )}
                  <button type="button" className="secondary" onClick={onAdminSignOut}>
                    {adminText.signOut}
                  </button>
                </div>
              </div>
              <div className="admin-page-layout">
                <aside className="admin-page-nav">
                  <div className="admin-crm-card admin-crm-card-primary">
                    <p className="admin-crm-eyebrow">{adminText.crm.sidebar.eyebrow}</p>
                    <h4>{adminText.crm.sidebar.title}</h4>
                    <p>{adminText.crm.sidebar.description}</p>
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
                    <h5>{adminText.crm.sidebar.tasksTitle}</h5>
                    <ul className="admin-crm-task-list">
                      {adminText.crm.sidebar.tasks.map((task, index) => (
                        <li key={`${task}-${index}`}>
                          {isEditMode ? (
                            <input
                              className="admin-edit-input"
                              type="text"
                              value={task}
                              onChange={handleAdminInputChange(['crm', 'sidebar', 'tasks', index])}
                            />
                          ) : (
                            task
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
                <section className="admin-page-body">
                  <div className="admin-page-header">
                    <div>
                      {isEditMode ? (
                        <>
                          <input
                            className="admin-edit-input"
                            type="text"
                            value={activePageContent?.title ?? ''}
                            onChange={handleAdminInputChange(['pages', activePage, 'title'])}
                          />
                          <textarea
                            className="admin-edit-textarea"
                            value={activePageContent?.description ?? ''}
                            onChange={handleAdminInputChange(['pages', activePage, 'description'])}
                          />
                        </>
                      ) : (
                        <>
                          <h4>{activePageContent?.title}</h4>
                          <p>{activePageContent?.description}</p>
                        </>
                      )}
                    </div>
                    <div className="admin-crm-actions">
                      {activePageContent?.actions?.map((action, index) => (
                        <span key={`${action}-${index}`}>
                          {isEditMode ? (
                            <input
                              className="admin-edit-input"
                              type="text"
                              value={action}
                              onChange={handleAdminInputChange(['pages', activePage, 'actions', index])}
                            />
                          ) : (
                            <button type="button" className="secondary">
                              {action}
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  {activePage === 'users' ? (
                    <div className="admin-page-content">
                      <div className="admin-crm-stats">
                        {adminText.pages.users.stats.map((stat, index) => (
                          <div key={`${stat.label}-${index}`} className="admin-crm-stat">
                            {isEditMode ? (
                              <div className="admin-edit-group">
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.label}
                                  onChange={handleAdminInputChange(['pages', 'users', 'stats', index, 'label'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.value}
                                  onChange={handleAdminInputChange(['pages', 'users', 'stats', index, 'value'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.meta}
                                  onChange={handleAdminInputChange(['pages', 'users', 'stats', index, 'meta'])}
                                />
                              </div>
                            ) : (
                              <>
                                <p className="admin-crm-stat-label">{stat.label}</p>
                                <p className="admin-crm-stat-value">{stat.value}</p>
                                <p className="admin-crm-stat-meta">{stat.meta}</p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="admin-crm-modules">
                        {adminText.pages.users.roles.map((role, index) => (
                          <article key={`${role.title}-${index}`} className="admin-crm-module">
                            {isEditMode ? (
                              <div className="admin-edit-group">
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={role.title}
                                  onChange={handleAdminInputChange(['pages', 'users', 'roles', index, 'title'])}
                                />
                                <textarea
                                  className="admin-edit-textarea"
                                  value={role.description}
                                  onChange={handleAdminInputChange(['pages', 'users', 'roles', index, 'description'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={role.meta}
                                  onChange={handleAdminInputChange(['pages', 'users', 'roles', index, 'meta'])}
                                />
                              </div>
                            ) : (
                              <>
                                <h5>{role.title}</h5>
                                <p>{role.description}</p>
                                <span>{role.meta}</span>
                              </>
                            )}
                          </article>
                        ))}
                      </div>
                      <div className="admin-crm-forms">
                        <article className="admin-card">
                          <h4>{adminText.security.title}</h4>
                          <p>{adminText.security.description}</p>
                          <form className="admin-form" onSubmit={handleAccessCodeSubmit}>
                            <label>
                              {adminText.security.codeLabel}
                              <input
                                type="password"
                                placeholder="••••••"
                                value={accessCodeForm.code}
                                onChange={handleAccessCodeChange('code')}
                              />
                            </label>
                            <label>
                              {adminText.security.confirmLabel}
                              <input
                                type="password"
                                placeholder="••••••"
                                value={accessCodeForm.confirm}
                                onChange={handleAccessCodeChange('confirm')}
                              />
                            </label>
                            <p className="form-note">{adminText.security.hint}</p>
                            {accessCodeStatus ? (
                              <p className={accessCodeStatus.type === 'success' ? 'form-success' : 'form-error'}>
                                {accessCodeStatus.message}
                              </p>
                            ) : null}
                            <button className="primary" type="submit">
                              {adminText.security.save}
                            </button>
                          </form>
                        </article>
                        <article className="admin-card admin-card-wide">
                          <h4>{adminText.profile.title}</h4>
                          <p>{adminText.profile.description}</p>
                          <form className="admin-form" onSubmit={handleProfileSubmit}>
                            <div className="form-row">
                              <label>
                                {adminText.profile.fullName}
                                <input
                                  type="text"
                                  placeholder={adminText.profile.placeholders.fullName}
                                  value={profileForm.fullName}
                                  onChange={handleProfileChange('fullName')}
                                />
                              </label>
                              <label>
                                {adminText.profile.phone}
                                <input
                                  type="tel"
                                  placeholder={adminText.profile.placeholders.phone}
                                  value={profileForm.phone}
                                  onChange={handleProfileChange('phone')}
                                />
                              </label>
                            </div>
                            <div className="form-row">
                              <label>
                                {adminText.profile.email}
                                <input
                                  type="email"
                                  placeholder={adminText.profile.placeholders.email}
                                  value={profileForm.email}
                                  onChange={handleProfileChange('email')}
                                />
                              </label>
                              <label>
                                {adminText.profile.address}
                                <input
                                  type="text"
                                  placeholder={adminText.profile.placeholders.address}
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
                              {adminText.profile.save}
                            </button>
                          </form>
                        </article>
                      </div>
                    </div>
                  ) : null}
                  {activePage === 'campaign' ? (
                    <div className="admin-page-content">
                      <div className="admin-crm-stats">
                        {adminText.pages.campaign.stats.map((stat, index) => (
                          <div key={`${stat.label}-${index}`} className="admin-crm-stat">
                            {isEditMode ? (
                              <div className="admin-edit-group">
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.label}
                                  onChange={handleAdminInputChange(['pages', 'campaign', 'stats', index, 'label'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.value}
                                  onChange={handleAdminInputChange(['pages', 'campaign', 'stats', index, 'value'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.meta}
                                  onChange={handleAdminInputChange(['pages', 'campaign', 'stats', index, 'meta'])}
                                />
                              </div>
                            ) : (
                              <>
                                <p className="admin-crm-stat-label">{stat.label}</p>
                                <p className="admin-crm-stat-value">{stat.value}</p>
                                <p className="admin-crm-stat-meta">{stat.meta}</p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="admin-card admin-card-wide">
                        {isEditMode ? (
                          <div className="admin-edit-group">
                            <input
                              className="admin-edit-input"
                              type="text"
                              value={adminText.pages.campaign.formTitle}
                              onChange={handleAdminInputChange(['pages', 'campaign', 'formTitle'])}
                            />
                            <textarea
                              className="admin-edit-textarea"
                              value={adminText.pages.campaign.formDescription}
                              onChange={handleAdminInputChange(['pages', 'campaign', 'formDescription'])}
                            />
                          </div>
                        ) : (
                          <>
                            <h4>{adminText.pages.campaign.formTitle}</h4>
                            <p>{adminText.pages.campaign.formDescription}</p>
                          </>
                        )}
                        <form className="admin-form">
                          <div className="form-row">
                            <label>
                              {adminText.pages.campaign.fields.totalGoal}
                              <input
                                type="text"
                                value={campaignForm.totalGoal}
                                onChange={handleCampaignChange('totalGoal')}
                              />
                            </label>
                            <label>
                              {adminText.pages.campaign.fields.defaultPersonalGoal}
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
                            <span>{adminText.pages.campaign.fields.allowPersonalGoals}</span>
                          </label>
                          <label className="admin-checkbox">
                            <input
                              type="checkbox"
                              checked={campaignForm.requireApproval}
                              onChange={handleCampaignChange('requireApproval')}
                            />
                            <span>{adminText.pages.campaign.fields.requireApproval}</span>
                          </label>
                          <button className="primary" type="button">
                            {adminText.pages.campaign.save}
                          </button>
                        </form>
                      </div>
                      <div className="admin-crm-modules">
                        {adminText.pages.campaign.guidelines.map((item, index) => (
                          <article key={`${item.title}-${index}`} className="admin-crm-module">
                            {isEditMode ? (
                              <div className="admin-edit-group">
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={item.title}
                                  onChange={handleAdminInputChange([
                                    'pages',
                                    'campaign',
                                    'guidelines',
                                    index,
                                    'title',
                                  ])}
                                />
                                <textarea
                                  className="admin-edit-textarea"
                                  value={item.description}
                                  onChange={handleAdminInputChange([
                                    'pages',
                                    'campaign',
                                    'guidelines',
                                    index,
                                    'description',
                                  ])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={item.meta}
                                  onChange={handleAdminInputChange(['pages', 'campaign', 'guidelines', index, 'meta'])}
                                />
                              </div>
                            ) : (
                              <>
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                                <span>{item.meta}</span>
                              </>
                            )}
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {activePage === 'items' ? (
                    <div className="admin-page-content">
                      <div className="admin-crm-stats">
                        {adminText.pages.items.stats.map((stat, index) => (
                          <div key={`${stat.label}-${index}`} className="admin-crm-stat">
                            {isEditMode ? (
                              <div className="admin-edit-group">
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.label}
                                  onChange={handleAdminInputChange(['pages', 'items', 'stats', index, 'label'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.value}
                                  onChange={handleAdminInputChange(['pages', 'items', 'stats', index, 'value'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.meta}
                                  onChange={handleAdminInputChange(['pages', 'items', 'stats', index, 'meta'])}
                                />
                              </div>
                            ) : (
                              <>
                                <p className="admin-crm-stat-label">{stat.label}</p>
                                <p className="admin-crm-stat-value">{stat.value}</p>
                                <p className="admin-crm-stat-meta">{stat.meta}</p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="admin-items-grid">
                        {adminText.pages.items.list.map((item, index) => (
                          <article key={`${item.title}-${index}`} className="admin-crm-module">
                            {isEditMode ? (
                              <div className="admin-edit-group">
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={item.title}
                                  onChange={handleAdminInputChange(['pages', 'items', 'list', index, 'title'])}
                                />
                                <textarea
                                  className="admin-edit-textarea"
                                  value={item.description}
                                  onChange={handleAdminInputChange(['pages', 'items', 'list', index, 'description'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={item.meta}
                                  onChange={handleAdminInputChange(['pages', 'items', 'list', index, 'meta'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={item.status}
                                  onChange={handleAdminInputChange(['pages', 'items', 'list', index, 'status'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={item.statusStyle}
                                  onChange={handleAdminInputChange(['pages', 'items', 'list', index, 'statusStyle'])}
                                />
                              </div>
                            ) : (
                              <>
                                <div className="admin-item-header">
                                  <h5>{item.title}</h5>
                                  <span className={`admin-item-status status-${item.statusStyle}`}>
                                    {item.status}
                                  </span>
                                </div>
                                <p>{item.description}</p>
                                <span>{item.meta}</span>
                              </>
                            )}
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {activePage === 'donors' ? (
                    <div className="admin-page-content">
                      <div className="admin-crm-stats">
                        {adminText.pages.donors.stats.map((stat, index) => (
                          <div key={`${stat.label}-${index}`} className="admin-crm-stat">
                            {isEditMode ? (
                              <div className="admin-edit-group">
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.label}
                                  onChange={handleAdminInputChange(['pages', 'donors', 'stats', index, 'label'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.value}
                                  onChange={handleAdminInputChange(['pages', 'donors', 'stats', index, 'value'])}
                                />
                                <input
                                  className="admin-edit-input"
                                  type="text"
                                  value={stat.meta}
                                  onChange={handleAdminInputChange(['pages', 'donors', 'stats', index, 'meta'])}
                                />
                              </div>
                            ) : (
                              <>
                                <p className="admin-crm-stat-label">{stat.label}</p>
                                <p className="admin-crm-stat-value">{stat.value}</p>
                                <p className="admin-crm-stat-meta">{stat.meta}</p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="admin-card admin-card-wide">
                        {isEditMode ? (
                          <div className="admin-edit-group">
                            <input
                              className="admin-edit-input"
                              type="text"
                              value={adminText.pages.donors.tableTitle}
                              onChange={handleAdminInputChange(['pages', 'donors', 'tableTitle'])}
                            />
                            <textarea
                              className="admin-edit-textarea"
                              value={adminText.pages.donors.tableDescription}
                              onChange={handleAdminInputChange(['pages', 'donors', 'tableDescription'])}
                            />
                          </div>
                        ) : (
                          <>
                            <h4>{adminText.pages.donors.tableTitle}</h4>
                            <p>{adminText.pages.donors.tableDescription}</p>
                          </>
                        )}
                        <div className="admin-table">
                          <div className="admin-table-row admin-table-header">
                            {adminText.pages.donors.tableHeaders.map((header, index) => (
                              <span key={`${header}-${index}`}>
                                {isEditMode ? (
                                  <input
                                    className="admin-edit-input"
                                    type="text"
                                    value={header}
                                    onChange={handleAdminInputChange(['pages', 'donors', 'tableHeaders', index])}
                                  />
                                ) : (
                                  header
                                )}
                              </span>
                            ))}
                          </div>
                          {adminText.pages.donors.list.map((donor, index) => (
                            <div key={`${donor.name}-${index}`} className="admin-table-row">
                              {isEditMode ? (
                                <>
                                  <input
                                    className="admin-edit-input"
                                    type="text"
                                    value={donor.name}
                                    onChange={handleAdminInputChange(['pages', 'donors', 'list', index, 'name'])}
                                  />
                                  <input
                                    className="admin-edit-input"
                                    type="text"
                                    value={donor.amount}
                                    onChange={handleAdminInputChange(['pages', 'donors', 'list', index, 'amount'])}
                                  />
                                  <input
                                    className="admin-edit-input"
                                    type="text"
                                    value={donor.item}
                                    onChange={handleAdminInputChange(['pages', 'donors', 'list', index, 'item'])}
                                  />
                                  <input
                                    className="admin-edit-input"
                                    type="text"
                                    value={donor.source}
                                    onChange={handleAdminInputChange(['pages', 'donors', 'list', index, 'source'])}
                                  />
                                </>
                              ) : (
                                <>
                                  <span>{donor.name}</span>
                                  <span>{donor.amount}</span>
                                  <span>{donor.item}</span>
                                  <span>{donor.source}</span>
                                </>
                              )}
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
