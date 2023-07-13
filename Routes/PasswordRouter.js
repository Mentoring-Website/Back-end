const { forgetPassword, resetPassword } = require('../Controllers/PasswordController');
const express = require("express");
const router = express.Router();

router.post('/forgetPassword', forgetPassword)
router.post('/:id/:token', resetPassword)

module.exports = router;
