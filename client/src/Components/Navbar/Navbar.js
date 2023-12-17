import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

export default function Navbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    // const user = null //this for when we don't have any authentication information from backend or google Oauth

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))) // we are storing user data and token inside localstorage and getting that to check if user is there or not

    // console.log(user);


    const logout =()=>{
        dispatch({ type: 'LOGOUT'})
        navigate('/')
        setUser(null)
    }


    //? Whenever user logged in we have to refresh the page to avoid that we used here useEffect
    useEffect(()=>{
        const token = user?.token;
        //JWT Token expired or not
        if(token){
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()){
                // if token is expires after specified time then logout
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    // ! useLocation & useEffect info: in this case when we sign in we want to redirect user to home page and user's img and name should be there in navbar but to do this user need to reload page so to automatically reload the page we are using useEffect here with useLocation hook




    return (
        <nav className="navbar bg-dark container">
            <h4><Link className='link' to='/'>Home</Link></h4>
            <h4><Link className='link' to='drivedetails'>Drive Details</Link></h4>
            <h4><Link className='link' to='createdrive'>Create Drive</Link></h4>
            <div className='userProfile'>
                { // if there exist a user then show that users information
                    user ? 
                    <>
                        { // if there exist the profile pic of that user then show that 
                            user.result.imageUrl ? 
                            <img src={user.result.imageUrl} alt={user.result.name} /> 
                            : // else simply show the first character
                            <h5>{user.result.name.charAt(0)}</h5>
                        }
                        <h6>{user.result.name}</h6>
                        <button className='btn btn-secondary' onClick={logout}>Log out</button>
                    </>
                    : //else simply show sign in button
                    (
                        <Link to='/auth' className='btn btn-warning'>Sign in</Link>
                    )

                }

                
            </div>
        </nav>
    )
}
