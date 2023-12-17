import express from 'express'
import mongoose from 'mongoose'

import driveModel from '../model/driveModel.js'

const router = express.Router()

export const getDrives = async (req, res)=>{

    try {
        const allDrives = await driveModel.find()
        console.log('inside server controller drives.js');
        console.log(allDrives);
        res.status(200).json(allDrives)

    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createtDrives = async (req, res)=>{
    const{ driveName, driveDescription } = req.body

    if(!driveName || !driveDescription){
       return res.status(422).send({message:'plz fill all the details '})
    }
    const newDrive = new driveModel({driveName, driveDescription})
    try {
       await newDrive.save()
       res.status(201).json(newDrive );
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteDrive = async (req, res)=>{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await driveModel.findByIdAndRemove(id);

    res.json( { message: "Post Deleted successfully "});
}

export const updateDrive = async (req, res) =>{
    const { id } = req.params
    const { driveName, driveDescription } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updateDrive = { driveName, driveDescription, _id: id }

    await driveModel.findByIdAndUpdate(id, updateDrive, { new : true })

    res.json( updateDrive )

    // const { id: _id } = req.params
    // const drive = req.body
    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    // const updatedDrive = await driveModel.findByIdAndUpdate(_id, drive, { new: true })
    // res.json( updatedDrive )  
}

export default router;