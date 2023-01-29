import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../App.css"
import axios from "axios"

export default function ForgetPasswordPage() {

    const [user, setUser] = useState({
        email: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user, //spread operator 
            [name]: value

        })
    }

    const login = () => {
        const { email } = user
        if (email) {
            axios.post("http://localhost:5000/api/forget-password", user)
                .then(res => console.log(res))
        }
        else {
            alert("invalid input")
        };
    }

    const onSuccess = () => {
        alert("succesfully")
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Reset your password</h2>
            <h5>Enter your email address and we will send you a new password</h5>
            <form action="/login" onSubmit={onSuccess}>
                <p>
                    <label id="reset_pass_lbl">Email address</label><br />
                    <input type="email" name="email" required onChange={handleChange} />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={login}>Send password reset email</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}