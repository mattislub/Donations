const copy = {
  en: {
    subjectAdmin: 'New donation inquiry received',
    subjectDonor: 'Thank you for supporting Beit Tefilah Givat Ze’ev',
    heading: 'Donation inquiry received',
    intro:
      'Thank you for reaching out! We received your donation details and will follow up shortly.',
    adminIntro: 'A new donation inquiry was submitted on the website.',
    detailTitle: 'Donation details',
    fields: {
      fullName: 'Full name',
      email: 'Email',
      donationLevel: 'Donation level',
      itemSelection: 'Item selection',
      dedication: 'Dedication',
      currency: 'Currency',
      message: 'Personal message',
    },
    footer:
      'If you have questions, reply to this email and our team will assist you.',
  },
  he: {
    subjectAdmin: 'נשלחה פנייה חדשה לתרומה',
    subjectDonor: 'תודה על התמיכה בבית תפילה גבעת זאב',
    heading: 'קיבלנו את פרטי התרומה שלך',
    intro:
      'תודה שפניתם! קיבלנו את פרטי התרומה ונחזור אליכם בהקדם.',
    adminIntro: 'התקבלה פנייה חדשה לתרומה דרך האתר.',
    detailTitle: 'פרטי התרומה',
    fields: {
      fullName: 'שם מלא',
      email: 'אימייל',
      donationLevel: 'רמת תרומה',
      itemSelection: 'פריט שנבחר',
      dedication: 'הקדשה',
      currency: 'מטבע',
      message: 'הודעה אישית',
    },
    footer: 'לשאלות נוספות ניתן להשיב למייל ונשמח לעזור.',
  },
};

const brand = {
  navy: '#0f2a55',
  gold: '#f6c453',
  background: '#f5f6f8',
  text: '#1f2937',
};

const formatFields = (data, labels) => [
  { label: labels.fullName, value: data.fullName },
  { label: labels.email, value: data.email },
  { label: labels.donationLevel, value: data.donationLevel },
  { label: labels.itemSelection, value: data.itemSelection },
  { label: labels.dedication, value: data.dedication },
  { label: labels.currency, value: data.currency },
  { label: labels.message, value: data.message },
];

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const buildDonationEmail = ({ data, language, isAdmin }) => {
  const lang = language === 'he' ? 'he' : 'en';
  const direction = lang === 'he' ? 'rtl' : 'ltr';
  const t = copy[lang];
  const fields = formatFields(data, t.fields);
  const subject = isAdmin ? t.subjectAdmin : t.subjectDonor;
  const intro = isAdmin ? t.adminIntro : t.intro;

  const rows = fields
    .filter((field) => field.value)
    .map(
      (field) => `
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: ${brand.navy}; width: 40%;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding: 10px 12px; color: ${brand.text};">
            ${escapeHtml(field.value)}
          </td>
        </tr>
      `,
    )
    .join('');

  const html = `
    <div style="background: ${brand.background}; padding: 32px; font-family: 'Segoe UI', Arial, sans-serif;">
      <table role="presentation" cellspacing="0" cellpadding="0" style="max-width: 680px; margin: 0 auto; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 16px 30px rgba(15, 23, 42, 0.12);" dir="${direction}">
        <tr style="background: ${brand.navy}; color: #fff;">
          <td style="padding: 24px;">
            <img src="cid:brand-logo" alt="Beit Tefilah Givat Ze’ev" style="height: 56px; display: block; margin-bottom: 12px;" />
            <h1 style="margin: 0; font-size: 22px; line-height: 1.4;">${escapeHtml(t.heading)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px;">
            <p style="margin: 0 0 18px; color: ${brand.text}; font-size: 16px; line-height: 1.6;">
              ${escapeHtml(intro)}
            </p>
            <div style="border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
              <div style="background: ${brand.gold}; padding: 12px 16px; font-weight: 700; color: #1a1405;">
                ${escapeHtml(t.detailTitle)}
              </div>
              <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse;">
                ${rows || ''}
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 24px 28px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
              ${escapeHtml(t.footer)}
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;

  const text = [
    t.heading,
    '',
    intro,
    '',
    t.detailTitle,
    ...fields
      .filter((field) => field.value)
      .map((field) => `${field.label}: ${field.value}`),
    '',
    t.footer,
  ].join('\n');

  return { subject, html, text };
};
