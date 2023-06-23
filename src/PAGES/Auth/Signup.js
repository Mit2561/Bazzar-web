import React, { useContext, useState } from 'react'
import { Link,Navigate,useNavigate } from 'react-router-dom'
// import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './AuthPage.css'
import { Context } from '../../App'


const Signup = () => {
    const {token,addToken} = useContext(Context);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPasssword] = useState("");
    const [phoneNO,setPhoneNO] = useState("");
    const [loading,setLoading] = useState(false);
    const uploadUserData = async (name,email,password,phone) => {
        try {
          const response = await fetch('http://localhost:8005/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              client_id:1,
            },
            body: JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                    phone:phone,
                })
          });
      
          if (!response.ok) {
            throw new Error('Registration failed');
          }
          const data = await response.json();
          console.log('User registered:', data.success);
          if(data.success === true){
            // console.log();
            addToken();
            // showCookie();
            // navigate('/home');
          }
        } catch (error) {
          console.error('Error registering user:', error);
        }
    };
    const registerUser = () => {
        uploadUserData(name,email,password,phoneNO);
        console.log(token);
    }
    return (
            <div className='authpage'>
                {/* <Navbar reloadnavbar={false}/> */}
                <p>{token}</p>
                {token && <Navigate to='/home'/>}
                <div className='authcont'>
                    {/* <img src='https://images.unsplash.com/photo-1495480137269-ff29bd0a695c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                        alt='signup' /> */}

                    <form className='authform'>
                        <h1>Signup</h1>
                        <div className='form-group-row'>
                            <div className='formgroup'>
                                <label htmlFor='fname'>First Name</label>
                                <input type='text' id='fname' value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className='formgroup'>
                                <label htmlFor='lname'>Last Name</label>
                                <input type='text' id='lname' />
                            </div>
                        </div>
                        <div className='formgroup'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div className='form-group-row'>
                            <div className='formgroup'>
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' value={password} onChange={(e)=>setPasssword(e.target.value)}/>
                            </div>
                            <div className='formgroup'>
                            <label htmlFor='phone'>Phone Number</label>
                            <input type='tel' id='phone' value={phoneNO} onChange={(e)=>setPhoneNO(e.target.value)}/>
                        </div>
                        </div>

                        <Link to='/login'
                            className='stylenone'
                        >
                            <p>Already have an account?</p>
                        </Link>
                        <Link to='/signup'
                            className='stylenone'
                        >
                            <button className='btn' onClick={()=>{registerUser()}}>Signup</button>
                        </Link>
                    </form>
                </div>
            </div>    
    )
}

export default Signup