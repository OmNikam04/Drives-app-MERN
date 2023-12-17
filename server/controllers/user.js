import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' // store the user in browser for some time
import User from '../model/userModel.js'

export const signup = async(req, res) =>{
    const { name, email, password, cpassword } = req.body

    try {
        const existingUser = await User.findOne({ email })// we can't create an account if user already exist
        if(existingUser) return res.status(400).json({ message: 'User already exists'})

        if(password !== cpassword) return res.status(400).json({ message: 'Password not match with confirm password'})

        // Before storing data into DB, convert password into bcrypt
        const hashedPassword = await bcrypt.hash(password, 12) // 12 is level of difficulty

        const result = await User.create({ email, password: hashedPassword, name })

        // Now that user is created we have to create token for that user
        const token = jwt.sign({ email: result.email, id: result.id }, 'test', { expiresIn: '1h'})

        res.status(200).json({ result: result, token })
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while register'})
    }
}


export const signin = async(req, res) =>{
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if(!existingUser) return res.status(404).json({ message: 'User doesnt exit'})

        // if user exit is DB then check password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).send({ message: 'Invalid credentials'})

        // if both email and password are correct then store that user's token 

        const token = jwt.sign({ email: existingUser.email, id:existingUser.id }, 'test', { expiresIn: '1h'})// here test is SECRET_KEY


        // return that json result
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while log in'})
    }
}


