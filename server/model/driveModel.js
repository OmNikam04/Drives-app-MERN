import mongoose from 'mongoose'

const driveSchema = {
    driveName:String,
    driveDescription: String
}

const Drive = mongoose.model("Drive", driveSchema);

export default Drive