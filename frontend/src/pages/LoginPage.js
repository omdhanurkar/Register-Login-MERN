import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import "../App.css"

export default function SignInPage() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value

        })

    }
    const login = () => {
        const { email, password } = user
        if (email && password) {
            axios.post("http://localhost:5000/Login", user)
                .then(res => console.log(res.data))
                
        }
        else {
            alert("invalid input")
        };
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form action="/home">
                <p>
                    <label>Username or email address</label><br />
                    <input type="email" name="email" value={user.email} onChange={handleChange} />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password/</label></Link> <br />
                    <Link to="/reset-password"><label className="right-label">Reset password</label></Link>
                    <br />
                    <input type="password" name="password" value={user.password} onChange={handleChange} />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={login}>Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}