import React,{ useState } from "react";
import "./auth.css";
import { GoogleLogin } from 'react-google-login'
import Input from "./Input";
import Icon from './icon'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signup, signin } from '../../actions/auth'

const initialState = { name: '', email: '', password: '', cpassword:''}


const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isSignup){
            dispatch(signup(formData, navigate)) // sending navigate object to redirect if something happens
        }else{
            //sign in user
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const switchMode = ()=>{
        setIsSignup((prevIsSignup)=> !prevIsSignup)
    }

    const googleSuccess = async (res)=>{// when we successfully log in we get a full response object
        // console.log(res)
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = ()=>{
        console.log('Google Sign in was unsuccessful. Try again later');
    }

    return (
        <div className="container">
        <div className="container">
            <div className="card">
            <div className="card-image">
                { !isSignup ? 
                        <h2 className="card-heading">Sign in
                            <small>Glad To see you back</small>
                        </h2>
                    :
                        <h2 className="card-heading">Sign up
                            <small>Let us create your account</small>
                        </h2>
                    }
            </div>
            <form onSubmit={handleSubmit} className="card-form">

                    {
                        isSignup && (
                            <>
                                <Input name="name" label="Full Name" type="text" handleChange={handleChange} />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" type="text" handleChange={handleChange} />
                    <Input name="password" label="Password" type="password"  handleChange={handleChange} />
                    {
                        isSignup && (
                            <>
                                <Input name="cpassword" label="Confirm Password" type="password"  handleChange={handleChange} />
                            </>
                        )
                    }
                    
                <div className="action">
                    <button type="submit" className="action-button">{isSignup? 'Sign Up': 'Sign in'}</button>
                </div>
                <div className="card-info-or">
                    <p>or</p>
                </div>
                <GoogleLogin
                    clientId="44814833111-buampdfi6i2memfhjd0r24ek7ahpdlr4.apps.googleusercontent.com"
                    render={(renderProps)=>(
                        <div className="action">
                            <button onClick={renderProps.onClick} className="action-button" disabled={renderProps.disabled} > <Icon/> Google Sign In</button>
                        </div>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
            </form>
            <div className="card-info">
                <a onClick={switchMode}>
                    { isSignup? "Already have an account? Sign In": "Don't have an account Sign up"}
                </a>
            </div>
            </div>
        </div>
        </div>
  );
};

export default Auth;
