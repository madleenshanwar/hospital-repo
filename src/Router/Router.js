import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DepartmentPage from '../page/Department/DepartmentPage'
import AddDepartment from '../page/Department/AddDepartment'
import Login from '../page/Register/Login'
import SignUp from '../page/Register/SignUp'
import UpdateDepartment from '../page/Department/UpdateDepartment'
export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='department' element={<DepartmentPage/>}/>
        <Route path='adddepartment' element={<AddDepartment/>}/>
        <Route path='updatedepartment/:index' element={<UpdateDepartment/>}/>
    </Routes>
    </BrowserRouter>
  )
}
