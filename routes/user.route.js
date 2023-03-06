const express = require('express');
const router = express.Router()
const { SignUp, logIn } = require('../controllers/user.controller')
const {protect} = require('../auth_Middleware/auth')

router.route('/signup').post(SignUp)
router.route('/login').post(logIn)
//router.route('/login').post(logIn)

module.exports = router