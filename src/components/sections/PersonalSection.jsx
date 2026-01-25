import { personalPageNames } from '../../data/content';
import { translateValue } from '../../utils/translation';

function PersonalSection({ t, language, personalPages }) {
  return (
    <section id="personal" className="section">
      <div className="section-header">
        <h2>{t.personal.title}</h2>
        <p>{t.personal.description}</p>
      </div>
      <div className="personal-grid">
        {personalPages.map((page) => (
          <article key={page.name}>
            <h3>{translateValue(personalPageNames, language, page.name)}</h3>
            <p>
              {t.personal.goal}: ${page.goal.toLocaleString()}
            </p>
            <p>
              {t.personal.progress}: ${page.progress.toLocaleString()}
            </p>
            <button type="button">{t.personal.action}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PersonalSection;
