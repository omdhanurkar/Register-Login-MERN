const express = require('express');
const router = express.Router();
const { registerUser, loginUser,forget_password ,reset_password } = require("../controllers/userController");

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/Register", registerUser)
router.post("/Login", loginUser)

router.post("/api/forget-password" ,forget_password);

router.post("/api/reset-password" ,reset_password);


module.exports = router