import React, {useState, useEffect} from 'react'
// import HashLoader from "react-spinners/HashLoader";
import { useLocation } from 'react-router-dom';
import './DriveDetails.css'
import { useSelector, useDispatch } from 'react-redux';
import Drive from "./Drive/Drive"
import { getDrives } from '../../actions/drives'

export default function DriveDetails({ setCurrentId }) {
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const dispatch = useDispatch()
    const drives = useSelector((state) => state.drives)
    console.log(drives);

    useEffect(()=>{
      dispatch(getDrives())
      setLoading(false)
    },[location])
    

    return (
        <div className='container'>
            <h2>Drive Details</h2>
                <div className="style">
                        { 
                            drives.map((drive)=>{
                                return <Drive key={drive._id} drive={drive} setCurrentId={setCurrentId}/>
                            })
                        }
                </div>
        </div>
    )
}
