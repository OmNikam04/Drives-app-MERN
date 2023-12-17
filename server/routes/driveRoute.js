import express from 'express'
import { getDrives, createtDrives, deleteDrive, updateDrive } from '../controllers/drives.js'
import auth from '../middleware/auth.js'
const router = express.Router();


router.get('/drivedetails', getDrives)
router.post('/createdrive', auth, createtDrives) // only user who logged in can create, delete, and update a drive
router.delete('/:id', auth, deleteDrive);
router.patch('/drivedetails/:id', auth, updateDrive)
export default router