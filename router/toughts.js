const express = require('express')
const router = express.Router()

const Toughts = require('../controller/toughts')
const CheckUser = require('../helpers/authHelp').CheckUser

router.get('/', Toughts.Showall)
router.get('/dashboard', CheckUser, Toughts.dashboard)
router.get('/create', CheckUser, Toughts.Create)
router.post('/create', CheckUser, Toughts.CreateSave)

module.exports = router