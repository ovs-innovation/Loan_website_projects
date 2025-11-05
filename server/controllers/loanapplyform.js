const { sendMail } = require("../utlis/mailSender");

const applyForLoan = async (req, res) => {
  try {
    const { phone, name, loanType, applicantType, loanAmount, email } = req.body;

    // Basic validation
    if (!phone || !name || !loanType || !applicantType || !loanAmount || !email) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // =========================
    // Email to Admin
    // =========================
    const adminSubject = ` New Loan Application from ${name}`;
    const adminHtml = `
      <h2>New Loan Application Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Loan Type:</strong> ${loanType}</p>
      <p><strong>Applicant Type:</strong> ${applicantType}</p>
      <p><strong>Loan Amount:</strong> ₹${loanAmount}</p>
      <hr/>
      <p style="color:#888;">This message was sent from your loan application form.</p>
    `;

    const response1 = await sendMail({
      to: process.env.CLIENT_MAIL || process.env.EMAIL_USER,
      subject: adminSubject,
      text: `New loan application from ${name} (${phone}) — ${loanType}, ${applicantType}, Amount: ₹${loanAmount}`,
      html: adminHtml,
    });

    // =========================
    // Thank You Email to Customer
    // =========================
    const customerSubject = " Your Loan Application Has Been Received";
    const customerHtml = `
      <h2>Hello ${name},</h2>
      <p>Thank you for applying for a <strong>${loanType}</strong> with us.</p>
      <p>We’ve received your loan application details and our team will reach out to you soon to assist further.</p>
      <br/>
      <p><strong>Application Summary:</strong></p>
      <ul>
        <li><strong>Applicant Type:</strong> ${applicantType}</li>
        <li><strong>Requested Amount:</strong> ₹${loanAmount}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Email:</strong> ${email}</li>
      </ul>
      <br/>
      <p>Warm regards,<br><strong>Customer Support Team</strong><br>${process.env.SENDER_NAME || "Loan Support"}</p>
    `;

    const response2 = await sendMail({
      to: req.body.email || "", // optional if you collect email later
      subject: customerSubject,
      text: `Hi ${name}, your ${loanType} application has been received. We'll contact you soon.`,
      html: customerHtml,
    });

    console.log("📨 Loan Email Responses:", { response1, response2 });

    // =========================
    // Success Response
    // =========================  
    res.status(200).json({
      success: true,
      message: "Loan application submitted successfully. You will receive a confirmation email shortly.",
    });

  } catch (error) {
    console.error(" Error in applyForLoan controller:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while submitting your loan application. Please try again later.",
    });
  }
};

module.exports = { applyForLoan };
