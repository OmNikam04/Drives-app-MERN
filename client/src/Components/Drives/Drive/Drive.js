import React from 'react';
import { Link } from 'react-router-dom'
import './drive.css'
import { useDispatch } from 'react-redux'
import { deleteDrive } from '../../../actions/drives';

export default function Drive({ drive , setCurrentId }) {
    const dispatch = useDispatch()

    console.log(drive._id);
  return(
        <div className="card" >
            <div className="card-body">
                <h1 className='card-title'>{drive.driveName}</h1>
                <p className='card-text'>{drive.driveDescription}</p>
                <Link to='/createdrive' onClick={()=> setCurrentId(drive._id)} className="btn btn-primary">Update</Link>
                <button onClick={()=> dispatch(deleteDrive(drive._id))} className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}
