import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DepartmentPage from '../page/Department/DepartmentPage'
import SideBar from '../component/SideBar/SideBar'

export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<SideBar/>}></Route>
        <Route path='/department' element={<DepartmentPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}
