import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DepartmentPage from '../page/Department/DepartmentPage'
import AddDepartment from '../page/Department/AddDepartment'
import Login from '../page/Register/Login'
export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='department' element={<DepartmentPage/>}/>
        <Route path='adddepartment' element={<AddDepartment/>}/>
    </Routes>
    </BrowserRouter>
  )
}
