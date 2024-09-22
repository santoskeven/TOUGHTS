const express = require('express')
const router = express.Router()

const Auth = require('../controller/auth')

router.get('/login', Auth.login)
router.get('/register', Auth.register)
router.get('/logout', Auth.logout)
router.post('/create', Auth.Create)
router.post('/login', Auth.loginSave)

module.exports = router