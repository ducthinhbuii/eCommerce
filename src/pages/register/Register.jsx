import React, { useState } from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import usePost from '../../hooks/usePost'
import Validation from './Validate';
import { postDataToAPI } from '../../ultis/postApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
    const notify = (text) => toast(text);
    const navigate = useNavigate();
    const [value, setValue] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        rePassword: ''
    })
    const jwt = localStorage.getItem("jwt");

    const [error, setError] = useState('')

    const handleInput = (e) => {
        const newObject = {...value, [e.target.name]: e.target.value}
        setValue(newObject)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errorInput = Validation(value)
        console.log(errorInput)
        setError(errorInput)
        if(Object.keys(errorInput).length === 0){
            console.log(value)
            const res =await postDataToAPI('/api/user/register', {
                firstName: value.firstName,
                lastName: value.lastName,
                password: value.password,
                username: value.username,
                email: value.email,
                role: "USER"
            }, jwt)
            console.log(res)
            // notify("Username is alredy exist")
            if(res === "User registered successfully"){
                notify("Create account succesfully")
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                notify(res?.message || "Error creating account")
                
            }
        }
    }

    return (
        <div className='login'>
            <div class="container">
                <div class="login-container">
                    {/* <div class="circle circle-one"></div> */}
                    <div class="form-container">
                        <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" class="illustration" />
                        <h1 class="opacity">REGISTER</h1>
                        {/* <div th:if="${param.logout}">
                            <p style="color: green">You have been logged out    </p>
                        </div> */}
                        <form action="#" method="post" onSubmit={handleSubmit}>
                            <input type="text" placeholder="First Name" name="firstName" onChange={handleInput}/>

                            <input type="text" placeholder="Last Name" name="lastName" onChange={handleInput} />
                            {error.lastName && <p style={{color: 'red'}}>{error.lastName}</p>}

                            <input type="text" placeholder="Username" name="username" onChange={handleInput}/>
                            {error.username && <p style={{color: 'red'}}>{error.username}</p>}

                            <input type="email" placeholder="Email" name="email" onChange={handleInput}/>
                            {error.email && <p style={{color: 'red'}}>{error.email}</p>}

                            <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                            {error.password && <p style={{color: 'red'}}>{error.password}</p>}

                            <input type="password" placeholder="Repeat your password" name="rePassword" onChange={handleInput}/>
                            {error.rePassword && <p style={{color: 'red'}}>{error.rePassword}</p>}

                            <button type="submit" class="opacity">SUBMIT</button>
                        </form>
                        {/* <div th:if="${param.error}">
                            <p style="color: red">Invalid Username or Password</p>
                        </div> */}
                        <div class="register-forget opacity">
                            <a onClick={() => navigate('/login')} className='register' href="">LOGIN</a>
                            <a className='forget' href="">FORGOT PASSWORD</a>
                        </div>
                    </div>
                    {/* <div class="circle circle-two"></div> */}
                </div>
                <div class="theme-btn-container"></div>
            </div>
        </div>
    )
}
