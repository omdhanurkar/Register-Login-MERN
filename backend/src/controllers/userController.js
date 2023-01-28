const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const isValid = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === "undefined" || value === null) return false
    return true;
};

const registerUser = async (req, res) => {
    try {
        let data = req.body;
        let { name, email, phone, password, confirmPassword } = data

        if (Object.keys(data).length === 0)
            return res.status(400).send({ status: false, message: "please enter author details" });

        if (!isValid(name))
            return res.status(400).send({ status: false, message: "please enter name" });
        if (!(/^[a-zA-Z]+$/i).test(name))
            return res.status(400).send({ status: false, message: "please provide valid first name It should be in Alphabet format" });

        if (!isValid(email))
            return res.status(400).send({ status: false, message: "please enter email address" });
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            return res.status(400).send({ status: false, message: "please enter valid email" });
        const checkusedEmail = await userModel.findOne({ email: email });
        if (checkusedEmail) {
            return res.status(400).send({ status: false, message: "email already used" });
        }

        if (!isValid(phone))
            return res.status(400).send({ status: false, message: "please enter phoen no. ..." });
        if (!(/^[6789]\d{9}$/i).test(phone))
            return res.status(400).send({ status: false, message: "Phone should be valid" });

        if (!isValid(password))
            return res.status(400).send({ status: false, message: "please enter password" });
        if (!/^[a-zA-Z0-9@*#]{8,15}$/.test(password))
            return res.status(400).send({ status: false, message: "Use any special character and Numbers password" });
        if (password != confirmPassword) {
            return res.status(400).send({ status: false, message: "password and confirmPassword should be same" })
        }
        const encryptedPassword = await bcrypt.hash(password, 10)


        const userDetails = { name, email, phone, password: encryptedPassword }
        let savedData = await userModel.create(userDetails)
        return res.status(201).send({ status: true, message: "register successfully ", data: savedData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

//-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-login=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const loginUser = async (req, res) => {
    try {
        let data = req.body

        let { email,phone, password } = data
        if (Object.keys(data).length === 0)
            return res.status(400).send({ status: false, message: "please enter author details" });

        let user = await userModel.findOne({ $or:[{email: email},{phone:phone}] });
        if (!user) return res.status(400).send({ status: false, message: "Email is not correct, Please provide valid email" });

        if (!password) {
            return res.status(400).send({ status: false, message: "Password is required!!" })
        }

        let pass = await bcrypt.compare(password, user.password)
        if (!pass) return res.status(400).send({ status: false, message: "Password is not correct, Please provide valid password" });

        return res.status(200).send({ status: true, message: "signin successfully", data: user });


    } catch (error) {
        return res.status(500).send({ status: false, err: error.message })
    }
}




module.exports = { registerUser, loginUser }