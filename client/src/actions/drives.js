import { CREATE, DELETE, FETCH_ALL, UPDATE } from "../constants/actionTypes";

import * as api from '../api/index'

export const getDrives = () => async (dispatch) =>{
    try {
        const { data } = await api.fetchDrives()

        dispatch({ type:FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}


export const createDrive = (drive) => async (dispatch)=>{
    try {
        const { data } = await api.createDrive(drive)

        dispatch({ type: CREATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const deleteDrive = (id) => async (dispatch) =>{
    try {
        await api.deleteDrive(id)

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateDrive = (id, drive) => async (dispatch) =>{
    try {
        const { data } = await api.updateDrive( id, drive )

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}