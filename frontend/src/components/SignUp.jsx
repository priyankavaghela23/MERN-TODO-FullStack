import { useState } from 'react';
import '../styles/addtask.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function SignUp(){

    const [userData,setUserData] = useState()
    const nevigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('login')){
            nevigate("/")

        }
    })

    const handleSignup = async () => {
        console.log(userData);
        
        let result = await fetch("http://localhost:3200/signup",{
            method:'post',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type': 'Application/Json'
            }
        })
        result = await result.json()
        if(result.success){
           console.log(result);
           document.cookie = `token=${result.token}`;
           localStorage.setItem('login',userData.email)
           nevigate("/")
           
        }else{
            alert("Try after Sometimes")
        }
        
    }
    return(
        <div className="container">
            <h1>SignUp Form</h1>

            <label htmlFor="">Name</label>
            <input onChange={(event)=>setUserData({...userData, name:event.target.value})} type="text" name='name' placeholder="Enter User Name" />

            <label htmlFor="">Email</label>
            <input onChange={(event)=>setUserData({...userData, email:event.target.value})} type="text" name='email' placeholder="Enter User Email" />

            <label htmlFor="">Password</label>
            <input onChange={(event)=>setUserData({...userData, password:event.target.value})} type="text" name='password' placeholder="Enter User password" />

            <button onClick={handleSignup} >Signup</button>
            <Link className='link-nav' to="/login">Login</Link>


        </div>
    )
}

export default SignUp;