import HeroSection from '../components/HeroSection';
import NavBar from '../components/NavBar';
import DonationsSection from '../components/sections/DonationsSection';
import LevelsSection from '../components/sections/LevelsSection';
import StepsSection from '../components/sections/StepsSection';
import StatusSection from '../components/sections/StatusSection';
import PersonalSection from '../components/sections/PersonalSection';
import InfoSection from '../components/sections/InfoSection';
import ContactFooter from '../components/sections/ContactFooter';

function HomePage({ t, language, onLanguageChange, data, percent, isLoading }) {
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
        <DonationsSection t={t} language={language} budgetItems={data.budgetItems} />
        <LevelsSection t={t} language={language} levels={data.levels} />
        <StepsSection t={t} language={language} />
        <StatusSection t={t} language={language} statusMarkers={data.statusMarkers} />
        <PersonalSection t={t} language={language} personalPages={data.personalPages} />
        <InfoSection t={t} />
      </main>
      <ContactFooter t={t} />
    </>
  );
}

export default HomePage;
