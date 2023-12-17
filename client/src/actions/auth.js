import { AUTH } from "../constants/actionTypes";

import * as api from '../api/index'

// when our actions are async then we have to use redux-thunk 

export const signin = ( formData, navigate )=> async ( dispatch )=>{
    try {
        // log in user
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, data })
        navigate('/') 
    } catch (error) {
        console.log(error);
    }
}
export const signup = ( formData, navigate )=> async ( dispatch )=>{
    try {
        // sign up user
         const { data } = await api.signUp(formData)

        dispatch({ type: AUTH, data })
        navigate('/') 
    } catch (error) {
        console.log(error);
    }
}