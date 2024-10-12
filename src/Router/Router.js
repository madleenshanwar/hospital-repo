import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DepartmentPage from '../page/Department/DepartmentPage'
import AddDepartment from '../page/Department/AddDepartment'

export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<DepartmentPage/>}></Route>
        <Route path='department' element={<DepartmentPage/>}/>
        <Route path='adddepartment' element={<AddDepartment/>}/>
    </Routes>
    </BrowserRouter>
  )
}
