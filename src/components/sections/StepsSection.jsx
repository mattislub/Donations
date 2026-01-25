import { useState } from 'react';
import { budgetItemNames, levelItems, levelNames } from '../../data/content';
import { translateValue, translateWithFallback } from '../../utils/translation';

function StepsSection({ t, language }) {
  const levelOptions = Object.keys(levelNames);
  const itemOptions = ['חדר לימוד', 'חלון מעוטר', 'לבני קיר'];
  const [formData, setFormData] = useState({
    donationLevel: levelOptions[0] ?? '',
    itemSelection: itemOptions[0] ?? '',
    fullName: '',
    email: '',
    dedication: '',
    currency: 'USD',
    message: '',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'sending', message: t.form.sending });

    try {
      const response = await fetch('/api/donation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          donationLevel: translateValue(levelNames, language, formData.donationLevel),
          itemSelection: translateWithFallback(
            budgetItemNames,
            levelItems,
            language,
            formData.itemSelection,
          ),
          dedication: formData.dedication,
          currency: formData.currency,
          message: formData.message,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setStatus({ type: 'success', message: t.form.success });
      setFormData((prev) => ({
        ...prev,
        fullName: '',
        email: '',
        dedication: '',
        message: '',
      }));
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: t.form.error });
    }
  };

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

      <form className="donation-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            {t.form.donationLevel}
            <select name="donationLevel" value={formData.donationLevel} onChange={handleChange}>
              {levelOptions.map((level) => (
                <option key={level} value={level}>
                  {translateValue(levelNames, language, level)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            {t.form.itemSelection}
            <select name="itemSelection" value={formData.itemSelection} onChange={handleChange}>
              {itemOptions.map((item) => (
                <option key={item} value={item}>
                  {translateWithFallback(budgetItemNames, levelItems, language, item)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            {t.form.fullName}
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t.form.placeholders.name}
              required
            />
          </label>
          <label>
            {t.form.email}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.form.placeholders.email}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            {t.form.dedication}
            <input
              type="text"
              name="dedication"
              value={formData.dedication}
              onChange={handleChange}
              placeholder={t.form.placeholders.dedication}
            />
          </label>
          <label>
            {t.form.currency}
            <select name="currency" value={formData.currency} onChange={handleChange}>
              <option>USD</option>
              <option>ILS</option>
              <option>EUR</option>
            </select>
          </label>
        </div>
        <label className="full-width">
          {t.form.message}
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.form.placeholders.message}
          />
        </label>
        {status.type === 'error' && <p className="form-error">{status.message}</p>}
        {status.type === 'success' && <p className="form-success">{status.message}</p>}
        <button className="primary" type="submit" disabled={status.type === 'sending'}>
          {status.type === 'sending' ? t.form.sending : t.form.submit}
        </button>
        <p className="form-note">{t.form.note}</p>
      </form>
    </section>
  );
}

export default StepsSection;
