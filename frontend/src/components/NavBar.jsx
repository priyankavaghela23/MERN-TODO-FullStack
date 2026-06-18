import { Link, useNavigate } from "react-router-dom";
import '../styles/navbar.css';
import { useState } from "react";
import { useEffect } from "react";
function NavBar(){
    const [login, setLogin] = useState(localStorage.getItem('login'))
    const navigate = useNavigate()

    useEffect(()=>{
            const handleStorage = () => {
                setLogin(localStorage.getItem('login'))
            }
            window.addEventListener('localStorage-change',handleStorage)

            return() => {
                window.removeEventListener('localStorage-change',handleStorage)
            }
        },[])

    const logout = () => {
        localStorage.removeItem('login')
        setLogin(null)

        setTimeout(() => {
            navigate("/login")
        }, 0);

        

    }
    return(
        <nav className="navbar">
        <div className="logo">To Do App</div>
        <ul className="nav-links">
            {
                login ? 
                <>
                <li><Link to="/">List</Link></li>
                <li><Link to="/add">Add Task</Link></li>
                <li><Link onClick={logout}>Logout</Link></li>
                </>: null
            }
            
         
        </ul>
        </nav>
    )
}

export default NavBar;