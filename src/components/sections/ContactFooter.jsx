function ContactFooter({ t }) {
  return (
    <footer id="contact">
      <div>
        <h3>{t.footer.contact}</h3>
        <p>{t.footer.phone}</p>
        <p>{t.footer.email}</p>
      </div>
      <div>
        <h3>{t.footer.addressTitle}</h3>
        <p>{t.footer.address}</p>
        <p>{t.footer.hours}</p>
      </div>
      <p className="footer-note">{t.footer.note}</p>
    </footer>
  );
}

export default ContactFooter;
