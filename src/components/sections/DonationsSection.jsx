import { budgetItemNames } from '../../data/content';
import { translateValue } from '../../utils/translation';

function DonationsSection({ t, language, budgetItems }) {
  return (
    <section id="donations" className="section">
      <div className="section-header">
        <h2>{t.donations.title}</h2>
        <p>{t.donations.description}</p>
      </div>
      <div className="budget-grid">
        {budgetItems.map((item) => (
          <article key={item.name} className="budget-card">
            <h3>{translateValue(budgetItemNames, language, item.name)}</h3>
            <p className="budget-cost">
              {item.cost} {t.donations.costLabel}
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
            <button type="button">{t.donations.action}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DonationsSection;
