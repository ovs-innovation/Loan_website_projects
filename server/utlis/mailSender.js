const nodemailer = require("nodemailer");
 require("dotenv").config();
 const sendMail = async ({ to, subject, text, html, attachments = [] }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use 'smtp.office365.com', etc.
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // app password (not your real password)
      },
    });

    // Mail options
    const mailOptions = {
      from: `"${process.env.EMAIL_MAIL}`,
      to,
      subject,
      text,
      html,
      attachments, // e.g. [{ filename: "note.pdf", path: "./uploads/note.pdf" }]
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error(" Error sending email:", error);
    throw error;
  }
};

module.exports = { sendMail };