import React, { useState } from 'react';
import { Routes,  Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home, Navbar, CreateDrive, DriveDetails, Auth} from './Components/export'

function App() {
  const [currentId, setCurrentId] = useState(0);

  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/drivedetails" element={<DriveDetails setCurrentId={setCurrentId} />}></Route>
        <Route path="/createdrive" element={<CreateDrive currentId={currentId}  setCurrentId={setCurrentId} />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
    </Routes>
        
    </>
    
  );
}

export default App;
