const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

router.post("/register", (req, res, next) => {
    next();
  }, register);
  
router.post("/login", login);

module.exports = router;