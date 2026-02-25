import HeroSection from '../components/HeroSection';
import NavBar from '../components/NavBar';
import DonationsSection from '../components/sections/DonationsSection';
import LevelsSection from '../components/sections/LevelsSection';
import StepsSection from '../components/sections/StepsSection';
import StatusSection from '../components/sections/StatusSection';
import PersonalSection from '../components/sections/PersonalSection';
import InfoSection from '../components/sections/InfoSection';
import ContactFooter from '../components/sections/ContactFooter';

function HomePage({ t, language, onLanguageChange, data, percent, isLoading, currentView }) {
  const renderSection = () => {
    switch (currentView) {
      case 'donations':
        return <DonationsSection t={t} language={language} budgetItems={data.budgetItems} />;
      case 'levels':
        return <LevelsSection t={t} language={language} levels={data.levels} />;
      case 'steps':
        return <StepsSection t={t} language={language} />;
      case 'status':
        return <StatusSection t={t} language={language} statusMarkers={data.statusMarkers} />;
      case 'personal':
        return <PersonalSection t={t} language={language} personalPages={data.personalPages} />;
      case 'info':
        return <InfoSection t={t} />;
      case 'contact':
        return null;
      case 'home':
      default:
        return (
          <section className="section">
            <div className="section-header">
              <h2>{t.hero.title}</h2>
              <p>{t.hero.description}</p>
            </div>
          </section>
        );
    }
  };

  return (
    <>
      <HeroSection
        t={t}
        data={data}
        percent={percent}
        nav={<NavBar t={t} language={language} onLanguageChange={onLanguageChange} />}
      />
      <main>
        {isLoading ? (
          <section className="section">
            <div className="section-header">
              <h2>{t.loading.title}</h2>
              <p>{t.loading.description}</p>
            </div>
          </section>
        ) : null}
        {renderSection()}
      </main>
      {currentView === 'contact' ? <ContactFooter t={t} /> : null}
    </>
  );
}

export default HomePage;
