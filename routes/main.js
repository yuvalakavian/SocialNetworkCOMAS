const mainController = require('../controllers/main')
const express = require('express')

const router = express.Router()

router.get('/main', mainController.getMain)

module.exports = router