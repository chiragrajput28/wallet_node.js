const express = require('express')
const authController = require('../controller/auth')
const router = express.Router()
const userDB = require('../models/user') 
const transDB = require('../models/transaction')

// console.log('inside routes');
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

router.get('/', async(req, res) => {
    try {
        const user = await userDB.find()
        const trans = await transDB.find()
        res.json(user)
        res.json(trans)
    } catch(err) {
        res.send('error', err)
    }
})

module.exports = router