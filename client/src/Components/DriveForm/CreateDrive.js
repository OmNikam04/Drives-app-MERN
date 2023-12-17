import React, {useState, useEffect} from 'react'
import './createDrive.css'
import { useDispatch } from 'react-redux'
import { createDrive, updateDrive } from '../../actions/drives'
import { useSelector } from 'react-redux'
import { useNavigate  } from 'react-router-dom'

const initialState = {
    driveName:"", 
    driveDescription:""
}

export default function CreateDrive({ currentId, setCurrentId }) {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('profile'))
    const drive = useSelector((state)=> currentId ? state.drives.find((p)=> p._id === currentId ): null)// make sure that we only find that specific drive

    const [driveData, setDriveData] = useState(initialState)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(drive) setDriveData(drive)
    },[currentId,drive])

    const handleDrive = (e)=>{
        const {name , value} = e.target
        setDriveData({
            ...driveData,
            [name]:value
        })
    }

    const submitDrive = async (e)=>{
        e.preventDefault();
        
        // ! If we don't have currently selected Id then it must means we are creating post
        if(currentId){
            dispatch(updateDrive(currentId, driveData))
        }else{
            dispatch(createDrive(driveData))
        }

        setDriveData(initialState)
        navigate('/drivedetails')
    }

    if(!user?.result?.name){
        // if user is not logged in the he can't create an drive
        return(
            <div className="container card" style={{width:'100%'}}>
                <h1 style={{color:'red'}}>Please sign in to create your own drive</h1>
            </div>
        )
    }
    return (
        <div className='container'>
            <h1>{currentId ? 'Updating ': 'Creating '} a Drive</h1>
            <form onSubmit={submitDrive}>
                <div className="form-group">
                    <label>Company Name</label>
                    <input autoComplete='off' type="text"  value={driveData.driveName} onChange={handleDrive} name='driveName' className="form-control" placeholder="Name of company for which drive is being created.."/>
                </div>
                <div className="form-group">
                    <label>Drive Details</label>
                    <textarea type="text" value={driveData.driveDescription} onChange={handleDrive} name='driveDescription' className="form-control" placeholder="Description"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">{currentId ? 'Update ': 'Submit '} </button>
            </form>
        </div>
    )
}
