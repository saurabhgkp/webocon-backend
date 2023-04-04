const userController = require('../controllers/user')
const router = require('express').Router()



// use routers

router.post("/register", userController.register);
//router.get("/verify/:userId/:uniqueString", userController.verify);
router.post("/login", userController.login);
// router.post("/Adminlogin", userController.Adminlogin);


module.exports = router