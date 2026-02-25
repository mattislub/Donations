function DonateNowPage({ t }) {
  return (
    <>
      <main>
        <section className="section donate-now-minimal" id="donation-paths">
          <div className="donate-now-header">
            <h1>{t.logoTitle}</h1>
            <p>{t.logoSubtitle}</p>
          </div>

          <div className="donation-options">
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
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

export default DonateNowPage;
