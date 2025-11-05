const {contactUs} = require("../controllers/contactUs");
const { applyForLoan } = require("../controllers/loanapplyform");
const express = require("express");
const router = express.Router();

router.post("/contact-us", contactUs);
router.post("/loan/apply-loan", applyForLoan);
 

module.exports = router;
