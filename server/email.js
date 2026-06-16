const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


async function sendVerificationEmail(toEmail, token) {
  const link = `${process.env.SERVER_URL}/api/auth/verify/${token}`;
  try {
    await transporter.sendMail({
      from: `"User Manager" <${process.env.EMAIL_USER}>`,
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
