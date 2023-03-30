const express = require('express')
const router = express.Router()


const { createAccount,login } = require('../controllers/userController')

router.route('/create-account').post(createAccount)
router.route('/login').post(login)


module.exports = router