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
export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='department' element={<DepartmentPage/>}/>
        <Route path='adddepartment' element={<AddDepartment/>}/>
        <Route path='updatedepartment/:index' element={<UpdateDepartment/>}/>
        <Route path='room' element={<RoomPage/>}/>
        <Route path='addroom' element={<AddRoom/>}/>
        <Route path='updatedroom/:index' element={<UpdateRoom/>}/>
        <Route path='patient' element={<PatientPage/>}/>
        <Route path='addpatient' element={<AddPatient/>}/>
        <Route path="updatePatient/:index" element={<UpdatePatient/>}/>
    </Routes>
    </BrowserRouter>
  )
}
