import {
  levelBenefits,
  levelItems,
  levelNames,
  levelSubtitles,
} from '../../data/content';
import { translateValue } from '../../utils/translation';

function LevelsSection({ t, language, levels }) {
  return (
    <section id="levels" className="section muted">
      <div className="section-header">
        <h2>{t.levels.title}</h2>
        <p>{t.levels.description}</p>
      </div>
      <div className="levels-grid">
        {levels.map((level) => (
          <article key={level.name} className="level-card">
            <h3>
              {t.levels.action} {translateValue(levelNames, language, level.name)}
            </h3>
            <p className="level-subtitle">
              {translateValue(levelSubtitles, language, level.subtitle)}
            </p>
            <div>
              <h4>{t.levels.itemsTitle}</h4>
              <ul>
                {level.items.map((item) => (
                  <li key={item}>{translateValue(levelItems, language, item)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{t.levels.benefitsTitle}</h4>
              <ul>
                {level.benefits.map((benefit) => (
                  <li key={benefit}>{translateValue(levelBenefits, language, benefit)}</li>
                ))}
              </ul>
            </div>
            <button type="button">
              {t.levels.action} {translateValue(levelNames, language, level.name)}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LevelsSection;
