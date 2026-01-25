import heroBackground from '../../assets/hero-background.png';
import {
  statusDedications,
  statusKeyMap,
  statusLabels,
  statusNames,
} from '../../data/content';
import { translateValue } from '../../utils/translation';

function StatusSection({ t, language, statusMarkers }) {
  return (
    <section id="status" className="section muted">
      <div className="section-header">
        <h2>{t.status.title}</h2>
        <p>{t.status.description}</p>
      </div>
      <div className="status-board">
        <img src={heroBackground} alt={t.status.title} />
        {statusMarkers.map((marker) => (
          <div
            key={marker.name}
            className={`marker ${statusKeyMap[marker.status] || 'available'}`}
            style={{ top: marker.top, left: marker.left }}
          >
            <span>{translateValue(statusNames, language, marker.name)}</span>
            <div className="marker-card">
              <strong>{translateValue(statusLabels, language, marker.status)}</strong>
              <p>{translateValue(statusDedications, language, marker.dedication)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="before-after">
        <div>
          <h3>{t.status.before}</h3>
          <p>{t.status.beforeDescription}</p>
        </div>
        <div>
          <h3>{t.status.after}</h3>
          <p>{t.status.afterDescription}</p>
        </div>
      </div>
    </section>
  );
}

export default StatusSection;
