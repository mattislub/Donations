import { useState } from 'react';

function DonateNowPage({ t }) {
  const [customAmount, setCustomAmount] = useState('');

  return (
    <>
      <main>
        <section className="section donate-now-minimal" id="donation-paths">
          <div className="donate-now-header">
            <h1>{t.logoTitle}</h1>
            <p>{t.logoSubtitle}</p>
          </div>

          <div className="donation-options">
            <article className="donation-option-card">
              <h3>{t.donateNowFlow.withPersonalTitle}</h3>
              <a className="primary" href="#personal-page">
                {t.donateNowFlow.withPersonalAction}
              </a>
            </article>

            <article className="donation-option-card">
              <h3>{t.donateNowFlow.withoutPersonalTitle}</h3>
              <a className="primary" href="#donations">
                {t.donateNowFlow.withoutPersonalAction}
              </a>

              <div className="custom-amount-box">
                <label htmlFor="custom-amount">{t.donateNowFlow.customAmountLabel}</label>
                <input
                  id="custom-amount"
                  type="number"
                  min="1"
                  step="1"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  placeholder={t.donateNowFlow.customAmountPlaceholder}
                />
                <a className="secondary" href="#donations">
                  {t.donateNowFlow.customAmountAction}
                  {customAmount ? `: ${customAmount}` : ''}
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

export default DonateNowPage;
