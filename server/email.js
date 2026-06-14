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

  await transporter.sendMail({
    from: `"User Manager" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Verify your e-mail',
    html: `
      <h2>Welcome!</h2>
      <p>Click the link below to verify your e-mail address:</p>
      <p><a href="${link}">${link}</a></p>
      <p>If you did not register, ignore this message.</p>
    `,
  });
}

module.exports = { sendVerificationEmail };
