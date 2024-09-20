const express = require('express')
const router = express.Router()

const Auth = require('../controller/auth')

router.get('/login', Auth.login)
router.get('/register', Auth.register)

module.exports = router