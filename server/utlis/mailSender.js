const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMail = async ({ to, subject, text, html, attachments = [] }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
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

// const { Resend } = require("resend");
// require("dotenv").config();

// const resend = new Resend("re_5YULLYkv_JFkBnvimBWMYKQWTZZrbtrFe");

// const sendMail = async ({ to, subject, text, html, attachments = [] }) => {
//   try {
//     // Map attachments to Resend format
//     const formattedAttachments = attachments.map((file) => ({
//       filename: file.filename,
//       content: file.path ? require("fs").readFileSync(file.path).toString("base64") : file.content,
//       encoding: "base64",
//     }));

//     // Send email via Resend API
//     const info = await resend.emails.send({
//       from: process.env.EMAIL_MAIL || "noreply@yourdomain.com",
//       to,
//       subject,
//       text,
//       html,
//       attachments: formattedAttachments.length > 0 ? formattedAttachments : undefined,
//     });
//     console.log("info:",info)
//     console.log("✅ Email sent:", info.id);
//     return info;
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     throw error;
//   }
// };

// module.exports = { sendMail };

