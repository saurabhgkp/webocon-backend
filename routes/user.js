const userController = require('../controllers/user')
const router = require('express').Router()



// use routers

router.post("/register", userController.register);

router.post("/login", userController.login);

//display different types of messages, and implement logout.
router.get("/userDetails", userController.userDetails);
//update their profiles and change their passwords.
router.put("/userEdit", userController.userEdit);
//delete their accounts
router.delete("/userDelete", userController.userDelete);

module.exports = router