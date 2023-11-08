const authController = require("../controllers/auth/authController")

const router = require("express").Router();

// Auth
router.post("/login", authController.login);



module.exports = router
