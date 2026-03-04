import { useState } from 'react';
import { budgetItemNames } from '../../data/content';
import { translateValue } from '../../utils/translation';

function DonationsSection({ t, language, budgetItems, onSelectDonation }) {
  const [customAmount, setCustomAmount] = useState('');

  const normalizedAmount = Number(customAmount);
  const hasValidAmount = Number.isFinite(normalizedAmount) && normalizedAmount > 0;

  const goToDonorDetails = () => {
    window.location.hash = '#donor-details';
  };

  const handleSelectAmount = (amount) => {
    onSelectDonation?.({ amount: String(amount) });
    goToDonorDetails();
  };

  const handleContinueToDonorDetails = () => {
    if (!hasValidAmount) {
      return;
    }

    onSelectDonation?.({ amount: String(normalizedAmount) });
    goToDonorDetails();
  };

  const handleSelectItem = (item) => {
    onSelectDonation?.({ item: translateValue(budgetItemNames, language, item.name) });
    goToDonorDetails();
  };

  return (
    <section id="donations" className="section">
      <div className="section-header">
        <h2>{t.donations.title}</h2>
        <p>{t.donations.description}</p>
      </div>
      <div className="donation-options" role="list" aria-label={t.donations.optionsTitle}>
        <article className="donation-option-card" role="listitem">
          <h3>{t.donations.amountOptionTitle}</h3>
          <p>{t.donations.amountOptionDescription}</p>
          <div className="donation-option-amounts">
            {t.donations.amountOptions.map((amount) => (
              <button
                key={amount}
                type="button"
                className="donation-option-pill"
                onClick={() => handleSelectAmount(amount)}
              >
                {amount}
              </button>
            ))}
          </div>
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
        <article className="donation-option-card" role="listitem">
          <h3>{t.donations.itemOptionTitle}</h3>
          <p>{t.donations.itemOptionDescription}</p>
        </article>
      </div>
      <div className="budget-grid">
        {budgetItems.map((item) => (
          <article key={item.name} className="budget-card">
            <h3>{translateValue(budgetItemNames, language, item.name)}</h3>
            <p className="budget-cost">
              {t.donations.itemCostLabel}: {item.cost} {t.donations.costLabel}
            </p>
            <div className="budget-stats">
              <div>
                <span>{t.donations.unitsLabel}</span>
                <strong>{item.units}</strong>
              </div>
              <div>
                <span>{t.donations.donatedLabel}</span>
                <strong>{item.donated}</strong>
              </div>
            </div>
            <button type="button" onClick={() => handleSelectItem(item)}>
              {t.donations.action}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DonationsSection;
