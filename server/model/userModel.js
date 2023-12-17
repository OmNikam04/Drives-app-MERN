import mongoose from 'mongoose'

const userSchema = {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String}
}

// const User = mongoose.model("User", userSchema);
// export default User
// ? Above statement can also be written as:

export default mongoose.model('User', userSchema)
