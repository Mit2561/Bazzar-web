import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './AuthPage.css'
import { Context } from '../../App'
import { useCookies } from "react-cookie";
const Login = () => {
    const navigate = useNavigate();
    const [cookies,setCookie] = useCookies(["status"]);
    const {token,addToken} = useContext(Context);
    const [email,setEmail] = useState("");
    const [password,setPasssword] = useState("");
    const uploadUserData = async (email,password) => {
        try {
            const response = await fetch('/api/login', {
            method: 'POST',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
                client_id:1,
            },
            body: JSON.stringify({
                    email:email,
                    password:password,
                })
            });
        
            if (!response.ok) {
            throw new Error('User Login failed');
            }
            const data = await response.json();
            console.log('User Loged in:', data.success);
            if(data.success === true){
                setCookie("status","123")
                setCookie("name","meet")
                addToken();
                navigate('/home')
            }
        } catch (error) {
            console.error('Error while login user:', error);
        }
    };
    console.log(cookies.token);
    console.log(cookies.status);
    const handleSubmit = () => {
        uploadUserData(email,password);
    }
    return (
        <div className='authpage'>
            {/* {token && <Navigate to='/home'/>} */}
            <Navbar reloadnavbar={false}/>

            <div className='authcont'>
                {/* <img src='https://images.unsplash.com/photo-1495480137269-ff29bd0a695c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                    alt='login' /> */}

                <form className='authform'>
                    <h1>Login</h1>
                    <div className='formgroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>

                    <div className='formgroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={password} onChange={(e)=>{setPasssword(e.target.value)}}/>
                    </div>

                    <Link to='/forgotpassword'
                        className='stylenone'
                    >
                        <p>Forgot password?</p>
                    </Link>
                    <Link to='/'
                        className='stylenone'

                    >
                        <button className='btn' onClick={handleSubmit}>Login</button>
                    </Link>
                    <h2 className='or'>OR</h2>
                    <Link to='/signup'
                        className='stylenone'
                    >
                        <button className='btn' >Signup</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login