import jwt from 'jsonwebtoken'

//  wants to like a post
// click the like button => auth middleware to check the user exist or not => NEXT() => like controller///


const auth = async (req, res, next)=>{
    try {
        // ! Check if user is really the one who is logged in
        //  i.e. check that users token is valid or not

        const token = req.headers.authorization.split(" ")[1]

        // ? Now we had created token by 2 method i.e. 1. by Google OAuth 2. by ourselves so check which token is it
        // ? So generally google auth token length is greater than 500 
        const isCustomAuth = token.length < 500 // token created by us
        let decodedData

        if(token && isCustomAuth ){
            // if token is created by us then give data stored inside that token using jwt.verify(), providing the same SECRET_KEY
            decodedData = jwt.verify(token, 'test')

            req.userId = decodedData?.id;
        }else{
            // if token is created by Google
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub // sub is google way to differentiate every user i.e. it is an ID we can differentiate with
        }

        next()
    } catch (error) {
        console.log(error);
    }
}


export default auth