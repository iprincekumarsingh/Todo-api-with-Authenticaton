const express = require('express')

const router = express.Router()

const {AllTodo,create,deleteTodo,updateTodo}=require('../controllers/todoController')

const isAuth = require('../middlewares/auth')



router.route('/').get(isAuth,AllTodo)
router.route('/create').post(isAuth,create)
router.route('/update/:id').put(isAuth,updateTodo)
router.route('/delete/:id').delete(isAuth,deleteTodo)



module.exports = router