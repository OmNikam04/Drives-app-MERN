import axios from "axios";


// ! Previous code
// const url = 'http://localhost:8080'
// export const fetchDrives = () => axios.get(`${url}/drivedetails`)
// export const createDrive = (newDrive) => axios.post(`${url}/createdrive`, newDrive); 
// export const deleteDrive = (id) => axios.delete(`${url}/${id}`); 
// export const updateDrive = (id, updatedDrive) => axios.patch(`${url}/drivedetails/${id}`,updatedDrive)

const API = axios.create({ baseURL:'http://localhost:8080' })

// Now we need to send our token to backend so that our auth middleware at backend can make use of it 
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    {
        // this req.headers.Authorization you can found in our backend middleware-> auth.js file
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;

    // so by doing this our backend will know that user is signed in and can process the next() 
})

export const fetchDrives = () => API.get(`/drivedetails`)
export const createDrive = (newDrive) => API.post(`/createdrive`, newDrive); 
export const deleteDrive = (id) => API.delete(`/${id}`); 
export const updateDrive = (id, updatedDrive) => API.patch(`/drivedetails/${id}`,updatedDrive)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)