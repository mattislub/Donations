import { budgetItemNames, levelItems, levelNames } from '../../data/content';
import { translateValue, translateWithFallback } from '../../utils/translation';

function StepsSection({ t, language }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>{t.steps.title}</h2>
        <p>{t.steps.description}</p>
      </div>
      <div className="steps-grid">
        {t.steps.items.map((step, index) => (
          <div key={step.title} className="step">
            <span>{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>

      <form className="donation-form">
        <div className="form-row">
          <label>
            {t.form.donationLevel}
            <select>
              {Object.keys(levelNames).map((level) => (
                <option key={level}>{translateValue(levelNames, language, level)}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            {t.form.itemSelection}
            <select>
              {['חדר לימוד', 'חלון מעוטר', 'לבני קיר'].map((item) => (
                <option key={item}>
                  {translateWithFallback(budgetItemNames, levelItems, language, item)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            {t.form.fullName}
            <input type="text" placeholder={t.form.placeholders.name} />
          </label>
          <label>
            {t.form.email}
            <input type="email" placeholder={t.form.placeholders.email} />
          </label>
        </div>
        <div className="form-row">
          <label>
            {t.form.dedication}
            <input type="text" placeholder={t.form.placeholders.dedication} />
          </label>
          <label>
            {t.form.currency}
            <select>
              <option>USD</option>
              <option>ILS</option>
              <option>EUR</option>
            </select>
          </label>
        </div>
        <label className="full-width">
          {t.form.message}
          <textarea rows="4" placeholder={t.form.placeholders.message} />
        </label>
        <button className="primary" type="button">
          {t.form.submit}
        </button>
        <p className="form-note">{t.form.note}</p>
      </form>
    </section>
  );
}

export default StepsSection;
