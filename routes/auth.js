const express = require('express')
const authController = require('../controller/auth')
const router = express.Router()
// console.log('inside routes');
router.get('/login', authController.getLogin)

module.exports = router