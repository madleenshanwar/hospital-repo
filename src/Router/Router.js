import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DepartmentPage from '../page/Department/DepartmentPage'
import AddDepartment from '../page/Department/AddDepartment'
import Login from '../page/Register/Login'
import SignUp from '../page/Register/SignUp'
import UpdateDepartment from '../page/Department/UpdateDepartment'
import RoomPage from '../page/Room/RoomPage'
import AddRoom from '../page/Room/AddRoom'
import UpdateRoom from '../page/Room/UpdateRoom'
import PatientPage from '../page/Patient/PatientPage'
import AddPatient from '../page/Patient/AddPatient'
import UpdatePatient from '../page/Patient/UpdatePatient'
import DoctorPage from '../page/Doctors/DoctorPage'
import AddDoctor from '../page/Doctors/AddDoctor'
import UpdateDoctor from '../page/Doctors/UpdateDoctor'
import ServicesInfo from '../page/Services/ServicesInfo'
import SchedulesPage from '../page/Schedules/SchedulesPage'
import AddSchedules from '../page/Schedules/AddSchedules'
import UpdateSchedules from '../page/Schedules/UpdateSchedules'
import AddRays from '../page/Services/Rays/AddRays'
import UpdateRays from '../page/Services/Rays/UpdateRays'
import AddTest from '../page/Services/Test/AddTest'
import UpdateTest from '../page/Services/Test/UpdateTest'
import ReadMore from '../page/Patient/ReadMore'
import Discharge from '../page/Patient/Discharge'
import AddSurgery from '../page/surgery/AddSurgery'
import SurgeryPage from '../page/surgery/SurgeryPage'
import UpdateSurgery from '../page/surgery/UpdateSurgery'
export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='register' element={<SignUp/>}/>
        <Route path='department' element={<DepartmentPage/>}/>
        <Route path='adddepartment' element={<AddDepartment/>}/>
        <Route path='updatedepartment/:index' element={<UpdateDepartment/>}/>
        <Route path='room' element={<RoomPage/>}/>
        <Route path='addroom' element={<AddRoom/>}/>
        <Route path='updatedroom/:index' element={<UpdateRoom/>}/>
        <Route path='patient' element={<PatientPage/>}/>
        <Route path='addpatient' element={<AddPatient/>}/>
        <Route path="updatePatient/:index" element={<UpdatePatient/>}/>
        <Route path='readmore/:index' element={<ReadMore/>}/>
        <Route path="doctor" element={<DoctorPage/>}/>
        <Route path="adddoctor" element={<AddDoctor/>}/>
        <Route path="updatedoctor/:index" element={<UpdateDoctor/>}/>
        <Route path='services' element={<ServicesInfo/>}></Route>
        <Route path='schedules' element={<SchedulesPage/>}></Route>
        <Route path="addnewday" element={<AddSchedules/>}/>
        <Route path='updateshift/:index' element={<UpdateSchedules/>}/>
        <Route path='addray' element={<AddRays/>}/>
        <Route path='updaterays/:index' element={<UpdateRays/>}/>
        <Route path='addtest' element={<AddTest/>}/>
        <Route path='updatetest/:index' element={<UpdateTest/>}/>
        <Route path='discharge/:id' element={<Discharge/>}/>
        <Route path='surgery' element={<SurgeryPage/>}/>
        <Route path='addsurgery' element={<AddSurgery/>}></Route>
        <Route path='updatesurgery/:index' element={<UpdateSurgery/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}
