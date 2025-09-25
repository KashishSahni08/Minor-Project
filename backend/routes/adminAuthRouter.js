const express = require("express");
const router = express.Router();

// Fake admin login (no JWT)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@lifeconnect.com" && password === "admin123") {
    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
