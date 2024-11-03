import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Register/Login';
import SignUp from '../Pages/Register/SignUp';
import AddDepartment from '../Pages/Department/AddDepartment';
import DepartmentPage from '../Pages/Department/DepartmentPage';
import UpdateDepartment from '../Pages/Department/UpdateDepartment';
import AddRoom from '../Pages/Room/AddRoom';
import UpdateRoom from '../Pages/Room/UpdateRoom';
import RoomPage from '../Pages/Room/RoomPage';
import DoctorPage from '../Pages/Doctors/DoctorPage';
import AddDoctor from '../Pages/Doctors/AddDoctor';
import UpdateDoctor from '../Pages/Doctors/UpdateDoctor';




export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>}></Route>
        {/* department */}
        <Route path='register' element={<SignUp/>}/>
        <Route path='department' element={<DepartmentPage/>}/>
        <Route path='adddepartment' element={<AddDepartment/>}/>
        <Route path='updatedepartment/:index' element={<UpdateDepartment/>}/>
        {/* room */}
        <Route path='room' element={<RoomPage/>}/>
        <Route path='addroom' element={<AddRoom/>}/>
        <Route path='updatedroom/:index' element={<UpdateRoom/>}/>
        {/* doctor */}
        <Route path="doctor" element={<DoctorPage/>}/>
        <Route path="adddoctor" element={<AddDoctor/>}/>
        <Route path="updatedoctor/:index" element={<UpdateDoctor/>}/>
    </Routes>
  </BrowserRouter>
  )
}
