const mainController = require('../controllers/main')
const express = require('express')

const router = express.Router()

router.get('/main2', mainController.getMain)

module.exports = router