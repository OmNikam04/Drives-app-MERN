import { FETCH_ALL , CREATE, DELETE, UPDATE } from "../constants/actionTypes"


export default ( drives = [], action)=>{
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE:
            alert(`Drive with title ${action.payload.driveName} has been created`)
            return [...drives, action.payload]
        case UPDATE: 
            // output of any array map method is array
            // action.payload is newly updated drive
            // alert(drives)
            // return drives.map((drive) => (drive._id === action.payload.id ? action.payload : drive ))
            return drives.map((drive) =>{
                alert(`Drive with title ${action.payload.driveName} has been updated`)
                (drive._id === action.payload.id ? action.payload : drive )
            })
        case DELETE:
            return drives.filter((drive) => drive._id !== action.payload )
        default:
            return drives 
    }
}