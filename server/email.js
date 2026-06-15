const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) console.error('Email transporter error:', error);
  else console.log('Email server ready');
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
