const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

router.post("/register", (req, res, next) => {
    console.log("✅ Hit /api/auth/register");
    next();
  }, register);
  
router.post("/login", login);

module.exports = router;