const { forgetPassword, resetPassword } = require('../Controllers/passwordController');
const express = require("express");
const router = express.Router();

router.post('/password/forgetPassword', forgetPassword)
router.post('/password/:id/:token', resetPassword)

module.exports = router;
