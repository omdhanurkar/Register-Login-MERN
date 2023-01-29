import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../App.css"
import axios from "axios"

export default function ResetPasswordPage() {

    const [user, setUser] = useState({
        token: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value

        })

    }

    const reset = () => {
        const { token, password } = user
        if (token && password) {
            axios.post("http://localhost:5000/api/reset-password", user)
                .then(res => console.log(res))
        }
        else {
            alert("invalid input")
        };
    }

const onSuccess =()=>{
    alert("succesfully")
}
    return (


        <div className="text-center m-5-auto">
            <h2>Reset your password</h2>
            <h5>Enter your token and new password</h5>
            <form action="/login" onSubmit={onSuccess}>
                <p>
                    <label id="reset_pass_lbl">token</label><br />
                    <input type="token" name="token" required onChange={handleChange} />
                </p>
                <p>
                    <label id="reset_pass_lbl">password</label><br />
                    <input type="password" name="password" required onChange={handleChange} />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={reset} >Reset</button>
                    
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}