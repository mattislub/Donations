function InfoSection({ t }) {
  return (
    <section className="section muted">
      <div className="section-header">
        <h2>{t.info.title}</h2>
        <p>{t.info.description}</p>
      </div>
      <div className="info-grid">
        {t.info.items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default InfoSection;
