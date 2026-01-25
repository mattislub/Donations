import { useEffect, useState } from 'react';
import './App.css';
import { initialDataState, uiTranslations } from './data/content';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import PersonalPage from './pages/PersonalPage';

function App() {
  const [data, setData] = useState(initialDataState);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [adminForm, setAdminForm] = useState({ username: '', password: '' });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');
  const getViewFromHash = () => {
    if (window.location.hash === '#admin') {
      return 'admin';
    }
    if (window.location.hash === '#personal-page') {
      return 'personal-page';
    }
    return 'home';
  };
  const [currentView, setCurrentView] = useState(getViewFromHash);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/initial-data');
        if (!response.ok) {
          throw new Error('Failed to fetch initial data');
        }
        const payload = await response.json();
        setData(payload);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentView(getViewFromLocation());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const percent = data.target > 0 ? Math.round((data.progress / data.target) * 100) : 0;
  const t = uiTranslations[language];
  const isRtl = language === 'he';
  const adminCredentials = { username: 'admin', password: 'donations2024' };

  const handleAdminChange = (field) => (event) => {
    setAdminForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAdminSubmit = (event) => {
    event.preventDefault();
    if (
      adminForm.username.trim() === adminCredentials.username &&
      adminForm.password === adminCredentials.password
    ) {
      setIsAdminAuthenticated(true);
      setAdminError('');
      setAdminForm({ username: '', password: '' });
      return;
    }
    setAdminError(t.admin.error);
  };

  const handleAdminSignOut = () => {
    setIsAdminAuthenticated(false);
    setAdminError('');
  };

  return (
    <div className="app" dir={isRtl ? 'rtl' : 'ltr'}>
      {currentView === 'admin' ? (
        <AdminPage
          t={t}
          language={language}
          onLanguageChange={setLanguage}
          adminForm={adminForm}
          adminError={adminError}
          isAdminAuthenticated={isAdminAuthenticated}
          onAdminChange={handleAdminChange}
          onAdminSubmit={handleAdminSubmit}
          onAdminSignOut={handleAdminSignOut}
        />
      ) : currentView === 'personal-page' ? (
        <PersonalPage
          t={t}
          language={language}
          onLanguageChange={setLanguage}
          personalPages={data.personalPages}
          isLoading={isLoading}
        />
      ) : (
        <HomePage
          t={t}
          language={language}
          onLanguageChange={setLanguage}
          data={data}
          percent={percent}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
