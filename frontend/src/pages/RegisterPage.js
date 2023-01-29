import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import "../App.css"


export default function SignUpPage() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser(user => ({
            ...user,//spread operator 
            [name]: value

        }))
        validateInput(e);
    }


    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (user.confirmPassword && value !== user.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = user.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (user.password && value !== user.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }

    const egister = () => {
        const { name, email, password, confirmPassword } = user
        if (name && email && password && confirmPassword) {
            axios.post("http://localhost:5000/register", user)
                .then(res => console.log(res))
        }
        else {
            alert("invalid input")
        };
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Welcome to Registration Page</h2>
            <h5>Create your personal account</h5>
            <form action="/home">
                <p>
                    <label>Name</label><br />
                    <input type="text" name="name" required value={user.name} onChange={handleChange} />

                </p>
                <p>
                    <label>Email address</label><br />
                    <input type="email" name="email" required value={user.email} onChange={handleChange} />

                </p>
                <p>
                    <label>Phone</label><br />
                    <input type="number" name="phone" required value={user.phone} onChange={handleChange} />
                </p>
                <p>
                    <label>Password</label><br />

                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        onBlur={validateInput}></input>
                    {error.password && <span className='err'>{error.password}</span>}

                </p>
                <p>
                    <label>confirmPassword</label><br />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        onBlur={validateInput}></input>
                    {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                </p>
                <br />
                <p>
                    <button id="sub_btn" type="submit" onClick={egister}>Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
