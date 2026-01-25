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
  personalPage: {
    en: {
      createdSubject: 'Your personal donation page is ready',
      createdHeading: 'Your personal page is live',
      createdIntro:
        'Thank you for creating a personal donation page. Share the link below to invite supporters.',
      accessCodeLabel: 'Access code',
      linkLabel: 'Your personal page link',
      createdFooter: 'Keep this email so you can manage your page later.',
      inviteSubject: 'Join me in supporting Beit Tefilah Givat Ze’ev',
      inviteHeading: 'I opened a personal donation page',
      inviteIntro:
        'I would love your support. Please visit the link below to donate through my page.',
      messageLabel: 'Personal message',
      inviteFooter: 'Thank you for considering a contribution.',
    },
    he: {
      createdSubject: 'הדף האישי שלך מוכן',
      createdHeading: 'דף התרומה האישי שלך עלה לאוויר',
      createdIntro:
        'תודה על יצירת דף תרומה אישי. ניתן לשתף את הקישור הבא עם תומכים.',
      accessCodeLabel: 'קוד גישה',
      linkLabel: 'קישור לדף האישי',
      createdFooter: 'שמרו את המייל כדי שתוכלו לנהל את הדף בהמשך.',
      inviteSubject: 'מזמין אתכם לתרום לבית תפילה גבעת זאב',
      inviteHeading: 'פתחתי דף תרומה אישי',
      inviteIntro:
        'אשמח לתמיכה שלכם. ניתן לתרום דרך הקישור האישי שלי למטה.',
      messageLabel: 'הודעה אישית',
      inviteFooter: 'תודה על הרצון לסייע.',
    },
  },
};

const brand = {
  navy: '#0f2a55',
  headerBackground: '#2f4f7f',
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
        <tr style="background: ${brand.headerBackground}; color: #fff;">
          <td style="padding: 26px 24px 24px; text-align: center;">
            <div style="text-align: center;">
              <img src="cid:brand-logo" alt="Beit Tefilah Givat Ze’ev" style="height: 72px; display: block; margin: 0 auto 10px;" />
              <img src="cid:brand-logo" alt="Beit Tefilah Givat Ze’ev background" style="height: 120px; display: block; margin: 0 auto 8px; opacity: 0.16;" />
            </div>
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

export const buildPersonalPageCreatedEmail = ({ language, pageLink, accessCode }) => {
  const lang = language === 'he' ? 'he' : 'en';
  const t = copy.personalPage[lang];
  const direction = lang === 'he' ? 'rtl' : 'ltr';

  const html = `
    <div style="background: ${brand.background}; padding: 32px; font-family: 'Segoe UI', Arial, sans-serif;">
      <table role="presentation" cellspacing="0" cellpadding="0" style="max-width: 680px; margin: 0 auto; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 16px 30px rgba(15, 23, 42, 0.12);" dir="${direction}">
        <tr style="background: ${brand.headerBackground}; color: #fff;">
          <td style="padding: 26px 24px 24px; text-align: center;">
            <div style="text-align: center;">
              <img src="cid:brand-logo" alt="Beit Tefilah Givat Ze’ev" style="height: 72px; display: block; margin: 0 auto 10px;" />
              <img src="cid:brand-logo" alt="Beit Tefilah Givat Ze’ev background" style="height: 120px; display: block; margin: 0 auto 8px; opacity: 0.16;" />
            </div>
            <h1 style="margin: 0; font-size: 22px; line-height: 1.4;">${escapeHtml(t.createdHeading)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px;">
            <p style="margin: 0 0 18px; color: ${brand.text}; font-size: 16px; line-height: 1.6;">
              ${escapeHtml(t.createdIntro)}
            </p>
            <div style="border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
              <div style="background: ${brand.gold}; padding: 12px 16px; font-weight: 700; color: #1a1405;">
                ${escapeHtml(t.linkLabel)}
              </div>
              <div style="padding: 16px;">
                <a href="${escapeHtml(pageLink)}" style="color: ${brand.navy}; font-weight: 600; word-break: break-all;">
                  ${escapeHtml(pageLink)}
                </a>
              </div>
            </div>
            <p style="margin: 18px 0 0; color: ${brand.text}; font-size: 15px; line-height: 1.6;">
              <strong>${escapeHtml(t.accessCodeLabel)}:</strong> ${escapeHtml(accessCode)}
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 24px 28px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
              ${escapeHtml(t.createdFooter)}
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;

  const text = [
    t.createdHeading,
    '',
    t.createdIntro,
    `${t.linkLabel}: ${pageLink}`,
    `${t.accessCodeLabel}: ${accessCode}`,
    '',
    t.createdFooter,
  ].join('\n');

  return { subject: t.createdSubject, html, text };
};

export const buildPersonalPageInviteEmail = ({
  language,
  pageLink,
  senderName,
  message,
}) => {
  const lang = language === 'he' ? 'he' : 'en';
  const t = copy.personalPage[lang];
  const direction = lang === 'he' ? 'rtl' : 'ltr';
  const safeMessage = message ? escapeHtml(message) : null;

  const html = `
    <div style="background: ${brand.background}; padding: 32px; font-family: 'Segoe UI', Arial, sans-serif;">
      <table role="presentation" cellspacing="0" cellpadding="0" style="max-width: 680px; margin: 0 auto; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 16px 30px rgba(15, 23, 42, 0.12);" dir="${direction}">
        <tr style="background: ${brand.headerBackground}; color: #fff;">
          <td style="padding: 26px 24px 24px; text-align: center;">
            <div style="text-align: center;">
              <img src="cid:brand-logo" alt="Beit Tefilah Givat Ze’ev" style="height: 72px; display: block; margin: 0 auto 10px;" />
              <img src="cid:brand-logo" alt="Beit Tefilah Givat Ze’ev background" style="height: 120px; display: block; margin: 0 auto 8px; opacity: 0.16;" />
            </div>
            <h1 style="margin: 0; font-size: 22px; line-height: 1.4;">${escapeHtml(t.inviteHeading)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px;">
            <p style="margin: 0 0 18px; color: ${brand.text}; font-size: 16px; line-height: 1.6;">
              ${escapeHtml(t.inviteIntro)}
            </p>
            <p style="margin: 0 0 18px; color: ${brand.text}; font-size: 16px; line-height: 1.6;">
              <strong>${escapeHtml(senderName)}</strong>
            </p>
            <div style="border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
              <div style="background: ${brand.gold}; padding: 12px 16px; font-weight: 700; color: #1a1405;">
                ${escapeHtml(t.linkLabel)}
              </div>
              <div style="padding: 16px;">
                <a href="${escapeHtml(pageLink)}" style="color: ${brand.navy}; font-weight: 600; word-break: break-all;">
                  ${escapeHtml(pageLink)}
                </a>
              </div>
            </div>
            ${
              safeMessage
                ? `<p style="margin: 18px 0 0; color: ${brand.text}; font-size: 15px; line-height: 1.6;">
                    <strong>${escapeHtml(t.messageLabel)}:</strong> ${safeMessage}
                  </p>`
                : ''
            }
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 24px 28px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
              ${escapeHtml(t.inviteFooter)}
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;

  const text = [
    t.inviteHeading,
    t.inviteIntro,
    senderName,
    `${t.linkLabel}: ${pageLink}`,
    message ? `${t.messageLabel}: ${message}` : null,
    '',
    t.inviteFooter,
  ]
    .filter(Boolean)
    .join('\n');

  return { subject: t.inviteSubject, html, text };
};
