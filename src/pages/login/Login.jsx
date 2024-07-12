import React from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import usePost from '../../hooks/usePost'
import { postDataToAPI } from '../../ultis/postApi'
import axios from 'axios'

export const Login = () => {
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataRaw = new FormData(e.currentTarget);
        const userData = {
            username: dataRaw.get('username'),
            password: dataRaw.get('password')
        }
        
        console.log(userData)
        // const data = await postDataToAPI("/api/user/login", userData);
        // console.log(data)
        try {
            const {test} = await axios.get(
                "https://8081-idx-movie-project-1717140701197.cluster-bs35cdu5w5cuaxdfch3hqqt7zm.cloudworkstations.dev/api/order/",
                {
                    withCredentials: true,
                    headers: {
                        Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LW1vdmllLXByb2plY3QtMTcxNzE0MDcwMTE5Ny5jbHVzdGVyLWJzMzVjZHU1dzVjdWF4ZGZjaDNocXF0N3ptLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcyMDc2MDE3MywiZXhwIjoxNzIwNzYzNzczfQ.LsB4scgBCryeTQPsd33C6K7QKZBAMhN3JuzHjstAIxRf1rS12mYJBm5PBT_fzJWnUbJPBFP6lAMSHbFaXDJaO9MyXgFE2CMzBpSifvBFXn_wBxn13kRFAD0Ln9Bl6AQFHqsdjFJheX66m0xdxYiJXqUKeWf_0o2Qt9GIfqW5MZbcCgHyByaH2qkQ_jOGJUjaJ2Z-7qzfrieI5Y8lF2VUsPW1sycwXVVWBdyFI2QzvKX8EZDovKeKxYpOKQLNseRuT8wJpBVyT8_NZXFB64EJiBI_djLUfpBLiY-s-dggpEoWX3zKd9HDpPCrG4Q4Vs031IMIC1wy5TIaTFtTyIaoTg",
                    },
                }
            )
            console.log(test)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='login'>
            <div class="container">
                <div class="login-container">
                    {/* <div class="circle circle-one"></div> */}
                    <div class="form-container">
                        <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" class="illustration" />
                        <h1 class="opacity">LOGIN</h1>
                        {/* <div th:if="${param.logout}">
                            <p style="color: green">You have been logged out    </p>
                        </div> */}
                        <form onSubmit={handleSubmit} action="#" method="post">
                            <input type="text" placeholder="USERNAME" name="username"/>
                            <input type="password" placeholder="PASSWORD" name="password" />
                            <button type="submit" class="opacity">SUBMIT</button>
                        </form>
                        {/* <div th:if="${param.error}">
                            <p style="color: red">Invalid Username or Password</p>
                        </div> */}
                        <div class="register-forget opacity">
                            <a onClick={() => navigate('/register')} className='register' href="">REGISTER</a>
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
