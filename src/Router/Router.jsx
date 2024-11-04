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
import AddSchedules from '../Pages/Schedules/AddSchedules';
import SchedulesPage from '../Pages/Schedules/SchedulesPage';
import UpdateSchedules from '../Pages/Schedules/UpdateSchedules';
import ServicesInfo from '../Pages/Services/ServicesInfo';
import AddRays from '../Pages/Services/Rays/AddRays';
import UpdateRays from '../Pages/Services/Rays/UpdateRays'
import AddTest from '../Pages/Services/Test/AddTest'
import UpdateTest from '../Pages/Services/Test/UpdateTest'

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
        {/* shift */}
        <Route path='schedules' element={<SchedulesPage/>}></Route>
        <Route path="addnewday" element={<AddSchedules/>}/>
        <Route path='updateshift/:index' element={<UpdateSchedules/>}/>
        {/* service */}
        <Route path='services' element={<ServicesInfo/>}></Route>
        {/* rays */}
        <Route path='addray' element={<AddRays/>}/>
        <Route path='updaterays/:index' element={<UpdateRays/>}/>
        {/* test */}
        <Route path='addtest' element={<AddTest/>}/>
        <Route path='updatetest/:index' element={<UpdateTest/>}/>
    </Routes>
  </BrowserRouter>
  )
}
