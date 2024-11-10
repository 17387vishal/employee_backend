const express = require("express");
const { check } = require("express-validator"); 
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");

// POST /api/auth/register
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Password must be 8 characters long and include at least one letter and one number"
    )
      .isLength({ min: 8 })
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
      ),
  ],
  registerUser
);

// POST /api/auth/login
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  loginUser
);

// POST /api/auth/logout
router.post("/logout", logout);

module.exports = router;
