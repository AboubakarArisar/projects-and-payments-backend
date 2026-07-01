const express = require("express");
const notifyEmail =  require( "../mail/notify");
const router = express.Router();



// Assuming you are using Express
router.post("/send", async (req, res) => {
  try {
    const { sendTo, subject, username, description } = req.body;

    const emailOptions = {
      sendTo,
      subject,
      username,
      description,
    };

    const emailSent = await notifyEmail(emailOptions);

    if (emailSent) {
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } else {
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  } catch (error) {
    console.error("Error in sending notification email:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router; 
