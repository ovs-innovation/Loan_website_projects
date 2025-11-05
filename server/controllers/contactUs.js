const { sendMail } = require("../utlis/mailSender");

const contactUs = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    // Validate input
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    
    // =========================
    // Email to Admin
    // =========================
    const adminSubject = `📋 Loan Customer Details from ${name}`;
    const adminHtml = `
      <h2>New Loan Inquiry Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr/>
      <p style="color:#888;">This message was sent from your Loan Contact Form.</p>
    `;

   const response1 =  await sendMail({
      to: process.env.CLIENT_MAIL ||  process.env.EMAIL_USER,
      subject: adminSubject,
      text: `New loan inquiry from ${name} (${email}, ${mobile}): ${message}`,
      html: adminHtml,
    });

    // =========================
    // Thank You Email to Customer
    // =========================
    const customerSubject = " Thank You for Contacting Us!";
    const customerHtml = `
      <h2>Hello ${name},</h2>
      <p>Thank you for getting in touch with us regarding your loan inquiry.</p>
      <p>Our team will review your details and contact you soon on your registered mobile number or email.</p>
      <br/>
      <p>Warm regards,<br><strong>Customer Support Team</strong><br>${process.env.SENDER_NAME || "Loan Support"}</p>
    `;

    const response2 = await sendMail({
      to: email,
      subject: customerSubject,
      text: `Hi ${name}, thank you for contacting us. Our team will reach out to you soon.`,
      html: customerHtml,
    });

    console.log(" Email responses:", { response1, response2 });
    // =========================
    // Success Response
    // =========================
    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully. You will receive a confirmation email shortly.",
    });

  } catch (error) {
    console.error(" Error in contactUs controller:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending your message. Please try again later.",
    });
  }
};

module.exports = { contactUs };
