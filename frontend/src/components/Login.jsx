import { useState } from 'react';
import '../styles/addtask.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login(){
    const [userData,setUserData] = useState()
    const nevigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('login')){
            nevigate("/")
        }
    })

    const handleLogin = async () => {
        console.log(userData);
        
        let result = await fetch("http://localhost:3200/login",{
            method:'post',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type': 'Application/Json'
            }
        })
        result = await result.json()
        if(result.success){
        //    console.log(result);
           document.cookie = `token=${result.token}`;
           localStorage.setItem('login',userData.email)
           window.dispatchEvent(new Event('localStorage-change'))
           nevigate("/")
           
        }else{
            alert("Try AfterSometimes")
        }
        
    }
    return(
        <div className="container">
            <h1>Login Form</h1>

            <label htmlFor="">Email</label>
            <input onChange={(event)=>setUserData({...userData, email:event.target.value})} type="text" name='email' placeholder="Enter User Email" />

            <label htmlFor="">Password</label>
            <input onChange={(event)=>setUserData({...userData, password:event.target.value})} type="password" name='password' placeholder="Enter User password" />

            <button onClick={handleLogin} >Login</button>
            <Link className='link-nav' to="/signup">Sign Up</Link>


        </div>
    )
}
export default Login