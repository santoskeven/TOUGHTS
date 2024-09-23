const express = require('express')
const router = express.Router()

const Toughts = require('../controller/toughts')
const CheckUser = require('../helpers/authHelp').CheckUser

router.get('/', Toughts.Showall)
router.get('/dashboard', CheckUser, Toughts.dashboard)
router.get('/create', CheckUser, Toughts.Create)
router.get('/edit/:id',CheckUser, Toughts.edit)
router.post('/create', CheckUser, Toughts.CreateSave)
router.post('/delete', CheckUser, Toughts.delete)
router.post('/edit', CheckUser, Toughts.editSave)   

module.exports = router