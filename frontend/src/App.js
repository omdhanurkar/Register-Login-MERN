

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

import HomePage from './pages/HomePage'

import './App.css'

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forget-password" element={<ForgetPasswordPage />} />
                    <Route path='/reset-password' element={<ResetPasswordPage/>}/>
                    <Route path="/home" element={<HomePage />} />
                </Routes>

            </div>
        </BrowserRouter>
    )
}

export default App;