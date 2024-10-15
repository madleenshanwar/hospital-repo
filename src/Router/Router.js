import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DepartmentPage from '../page/Department/DepartmentPage'
import AddDepartment from '../page/Department/AddDepartment'
import Login from '../page/Register/Login'
import SignUp from '../page/Register/SignUp'
import UpdateDepartment from '../page/Department/UpdateDepartment'
import RoomPage from '../page/Room/RoomPage'
import AddRoom from '../page/Room/AddRoom'
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
    </Routes>
    </BrowserRouter>
  )
}
