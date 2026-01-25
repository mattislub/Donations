import heroBackground from '../assets/hero-background.png';

function HeroSection({ t, data, percent, nav }) {
  return (
    <header className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="overlay" />
      {nav}
      <div id="home" className="hero-content">
        <p className="hero-eyebrow">{t.hero.eyebrow}</p>
        <h1>{t.hero.title}</h1>
        <p className="hero-description">{t.hero.description}</p>
        <div className="hero-actions">
          <a className="primary" href="#donations">
            {t.hero.donateNow}
          </a>
          <a className="secondary" href="#levels">
            {t.hero.chooseLevel}
          </a>
        </div>
        <div className="progress-card">
          <div>
            <p className="progress-label">{t.hero.totalGoal}</p>
            <p className="progress-value">${data.target.toLocaleString()}</p>
          </div>
          <div>
            <p className="progress-label">{t.hero.raisedSoFar}</p>
            <p className="progress-value">${data.progress.toLocaleString()}</p>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
          <p className="progress-percent">
            {percent}% {t.hero.progress}
          </p>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
