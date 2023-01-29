const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const registerUser = async (req, res) => {
    try {
        let data = req.body;
        let { name, email, phone, password } = data

        const checkusedEmail = await User.findOne({ email });
        if (checkusedEmail) {
            return res.status(400).send({ status: false, message: "email already used" });
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        let registerUser =await User.create({
            name,
            email,
            phone,
            password: encryptedPassword

        });
        return res.status(201).send({ status: false, message: "Registered Sucessfully",data:registerUser });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-login=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const loginUser = async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        let { email, phone, password } = data

        let user = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
        if (!user) return res.status(400).send({ status: false, message: "Email is not correct, Please provide valid email" });

        if (!password) {
            return res.status(400).send({ status: false, message: "Password is required!!" })
        }

        let pass = await bcrypt.compare(password, user.password)
        if (!pass) return res.status(400).send({ status: false, message: "Password is not correct, Please provide valid password" });
        if(pass!=true){
            return res.status(404).send({ status: false, message: "Password is not correct, Please provide valid password" })
        }
        return res.status(200).send({ status: true, message: "signin successfully", data: user })

    } catch (error) {
        return res.status(500).send({ status: false, err: error.message })
    }
}

//-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const sendresetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'willie68@ethereal.email',        //https://ethereal.email/
                pass: 'hAgztBk8ZCSMFnpe1d'        
            }
        });

        const mailOptions = {
            from: "omdhanurkar@gmail.com",
            to: email,
            subject: 'For reset password',
            html: '<p>  hi ' + name + ' ,please copy the link and <a href="http:localhost:5000/api/forget-password?token=' + token + '"> reset your password </a>'
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail has been sent :-", info.response);
            }
        });

    } catch (err) {
        return res.status(400).send({ status: false, message: err.message });
    }
}
//-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const forget_password = async (req, res) => {
    try {
        let data = req.body.email;
        let { email } = data;

        const userdata = await User.findOne({ email })

        if (userdata) {
            const randomString = randomstring.generate();
            await User.updateOne({ email }, { $set: { token: randomString } });
            sendresetPasswordMail(userdata.name, userdata.email, randomString);

            res.status(200).send({ status: true, message: "please check your email and reset the password" })
        } else {
            return res.status(404).send({ status: true, message: "this email does not exist" });
        }

    } catch (error) {
        return res.status(400).send({ status: false, message: error.message });
    }
}

//-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const reset_password = async (req, res) => {
    try {
        const token = req.body.token

        const tokenData = await User.findOne({ token });
        const password = req.body.password;

        if (tokenData) {
            const hashPassword = await bcrypt.hash(password, 10);

            const userData = await User.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: hashPassword, token: '' } }, { new: true });

            return res.status(200).send({ status: true, message: "user password has been reset", data: userData })

        } else {
            return res.status(400).send({ status: false, message: "this link is wrong or expired" });
        }

    } catch (error) {
        return res.status(400).send({ status: false, message: error.message });
    }
}


module.exports = { registerUser, loginUser, forget_password, reset_password } 