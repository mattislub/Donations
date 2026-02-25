import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import NavBar from '../components/NavBar';
import ContactFooter from '../components/sections/ContactFooter';

function DonateNowPage({ t, language, onLanguageChange, data, percent, isLoading }) {
  const [withoutPersonalStep, setWithoutPersonalStep] = useState(false);

  return (
    <>
      <HeroSection
        t={t}
        data={data}
        percent={percent}
        nav={<NavBar t={t} language={language} onLanguageChange={onLanguageChange} />}
      />
      <main>
        <section className="section" id="donation-paths">
          <div className="section-header">
            <h2>{t.donateNowFlow.title}</h2>
            <p>{t.donateNowFlow.description}</p>
          </div>

          {!withoutPersonalStep ? (
            <div className="donation-options">
              <article className="donation-option-card">
                <h3>{t.donateNowFlow.withPersonalTitle}</h3>
                <p>{t.donateNowFlow.withPersonalDescription}</p>
                <a className="primary" href="#personal-page">
                  {t.donateNowFlow.withPersonalAction}
                </a>
              </article>

              <article className="donation-option-card">
                <h3>{t.donateNowFlow.withoutPersonalTitle}</h3>
                <p>{t.donateNowFlow.withoutPersonalDescription}</p>
                <button className="primary" type="button" onClick={() => setWithoutPersonalStep(true)}>
                  {t.donateNowFlow.withoutPersonalAction}
                </button>
              </article>
            </div>
          ) : (
            <div className="donation-options">
              <article className="donation-option-card">
                <h3>{t.donateNowFlow.itemAmountTitle}</h3>
                <p>{t.donateNowFlow.itemAmountDescription}</p>
                {isLoading ? (
                  <p>{t.loading.title}</p>
                ) : (
                  <div className="budget-grid">
                    {data.budgetItems.map((item) => (
                      <article key={item.id} className="budget-card">
                        <h3>{item.name?.[language] ?? item.name?.en}</h3>
                        <p className="budget-cost">
                          {t.donations.itemCostLabel}: ${item.cost.toLocaleString()}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </article>

              <article className="donation-option-card">
                <h3>{t.donateNowFlow.directAmountTitle}</h3>
                <p>{t.donateNowFlow.directAmountDescription}</p>
                <div className="donation-option-amounts">
                  {t.donations.amountOptions.map((amount) => (
                    <span key={amount} className="donation-option-pill">
                      {amount}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          )}
        </section>
      </main>
      <ContactFooter t={t} />
    </>
  );
}

export default DonateNowPage;
