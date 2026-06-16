const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationEmail(toEmail, token) {
  const link = `${process.env.SERVER_URL}/api/auth/verify/${token}`;
  try {
    const { error } = await resend.emails.send({
      from: 'User Manager <onboarding@resend.dev>',
      to: toEmail,
      subject: 'Verify your e-mail',
      html: `
        <h2>Welcome!</h2>
        <p>Click below to verify your email:</p>
        <a href="${link}">${link}</a>
      `,
    });
    if (error) console.error('Resend error:', error);
    else console.log('Verification email sent to:', toEmail);
  } catch (err) {
    console.error('Failed to send email:', err.message);
  }
}

module.exports = { sendVerificationEmail };