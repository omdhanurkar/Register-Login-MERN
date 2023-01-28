const express = require('express');
const router = express.Router();
const { registerUser,loginUser } = require("../controllers/userController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/register", registerUser)
router.post("/login", loginUser)



module.exports = router