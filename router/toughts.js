const express = require('express')
const router = express.Router()

const Toughts = require('../controller/toughts')

router.get('/', Toughts.Showall)

module.exports = router