import { useState } from 'react';

function DonateNowPage({ t }) {
  const [customAmount, setCustomAmount] = useState('');

  const normalizedAmount = Number(customAmount);
  const hasValidAmount = Number.isFinite(normalizedAmount) && normalizedAmount > 0;

  const handleContinueToDonorDetails = () => {
    if (!hasValidAmount) {
      return;
    }
    window.location.hash = '#donations';
  };

  return (
    <>
      <main>
        <section className="section donate-now-minimal" id="donation-paths">
          <div className="donate-now-header">
            <h1>{t.logoTitle}</h1>
            <p>{t.logoSubtitle}</p>
          </div>

          <div className="donation-options donate-now-options-stack">
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
                <button
                  type="button"
                  className="secondary donate-now-continue"
                  onClick={handleContinueToDonorDetails}
                  disabled={!hasValidAmount}
                >
                  {hasValidAmount
                    ? `${t.donateNowFlow.customAmountAction}: ${customAmount}`
                    : t.donateNowFlow.selectAmountFirstAction}
                </button>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

export default DonateNowPage;
