import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Register/Login";
import SignUp from "../Pages/Register/SignUp";
import AddDepartment from "../Pages/Department/AddDepartment";
import DepartmentPage from "../Pages/Department/DepartmentPage";
import UpdateDepartment from "../Pages/Department/UpdateDepartment";
import AddRoom from "../Pages/Room/AddRoom";
import UpdateRoom from "../Pages/Room/UpdateRoom";
import RoomPage from "../Pages/Room/RoomPage";
import DoctorPage from "../Pages/Doctors/DoctorPage";
import AddDoctor from "../Pages/Doctors/AddDoctor";
import UpdateDoctor from "../Pages/Doctors/UpdateDoctor";
import AddSchedules from "../Pages/Schedules/AddSchedules";
import SchedulesPage from "../Pages/Schedules/SchedulesPage";
import UpdateSchedules from "../Pages/Schedules/UpdateSchedules";
import ServicesInfo from "../Pages/Services/ServicesInfo";
import AddRays from "../Pages/Services/Rays/AddRays";
import UpdateRays from "../Pages/Services/Rays/UpdateRays";
import AddTest from "../Pages/Services/Test/AddTest";
import UpdateTest from "../Pages/Services/Test/UpdateTest";
import AddPatient from "../Pages/Patient/AddPatient";
import UpdatePatient from "../Pages/Patient/UpdatePatient";
import ReadMore from "../Pages/Patient/ReadMore";
import PatientPage from "../Pages/Patient/PatientPage";
import Admission from "../Pages/Patient/Admission";
import SurgeryPage from "../Pages/surgery/SurgeryPage";
import AddSurgery from "../Pages/surgery/AddSurgery";
import UpdateSurgery from "../Pages/surgery/UpdateSurgery";
import ForgetPass from "../Pages/Register/ForgetPass";
import ResetPass from "../Pages/Register/ResetPass";
import Discharge from "../Pages/Patient/Discharge";
import BookARoom from "../Pages/Room/BookARoom";
import ProvideTest from "../Pages/ProvideService/Test/ProvideTest";
import PatientTest from "../Pages/ProvideService/Test/PatientTest";
import ProvideService from "../Pages/ProvideService/ProvideService";
import UpdatePatientTest from "../Pages/ProvideService/Test/UpdatePatientTest";
import PatientRay from "../Pages/ProvideService/Rays/PatientRay";
import ProvideRay from "../Pages/ProvideService/Rays/ProvideRay";
import UpdatePatientRay from "../Pages/ProvideService/Rays/UpdatePatientRay";
import ReadMoreRay from "../Pages/ProvideService/Rays/ReadMoreRay";
import ReadMoreTest from "../Pages/ProvideService/Test/ReadMoreTest";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth */}
        <Route path="/" element={<Login />}></Route>
        <Route path="forgetpass" element={<ForgetPass />}></Route>
        <Route path="resetpass" element={<ResetPass />}></Route>
        {/* department */}
        <Route path="register" element={<SignUp />} />
        <Route path="department" element={<DepartmentPage />} />
        <Route path="adddepartment" element={<AddDepartment />} />
        <Route path="updatedepartment/:index" element={<UpdateDepartment />} />
        {/* room */}
        <Route path="room" element={<RoomPage />} />
        <Route path="addroom" element={<AddRoom />} />
        <Route path="updatedroom/:index" element={<UpdateRoom />} />
        <Route path="bookaroom/:index" element={<BookARoom />} />
        {/* doctor */}
        <Route path="doctor" element={<DoctorPage />} />
        <Route path="adddoctor" element={<AddDoctor />} />
        <Route path="updatedoctor/:index" element={<UpdateDoctor />} />
        {/* shift */}
        <Route path="schedules" element={<SchedulesPage />}></Route>
        <Route path="addnewday" element={<AddSchedules />} />
        <Route path="updateshift/:index" element={<UpdateSchedules />} />
        {/* service */}
        <Route path="services" element={<ServicesInfo />}></Route>
        {/* rays */}
        <Route path="addray" element={<AddRays />} />
        <Route path="updaterays/:index" element={<UpdateRays />} />
        {/* test */}
        <Route path="addtest" element={<AddTest />} />
        <Route path="updatetest/:index" element={<UpdateTest />} />
        {/* patient */}
        <Route path="patient" element={<PatientPage />} />
        <Route path="addpatient" element={<AddPatient />} />
        <Route path="updatePatient/:index" element={<UpdatePatient />} />
        <Route path="readmore/:index" element={<ReadMore />} />
        <Route path="admission/:index" element={<Admission />}></Route>
        <Route path="discharge/:id" element={<Discharge />} />
        {/* surgery */}
        <Route path="surgery" element={<SurgeryPage />} />
        <Route path="addsurgery" element={<AddSurgery />}></Route>
        <Route path="updatesurgery/:index" element={<UpdateSurgery />}></Route>
        {/* provide service */}
        <Route path="provideservice" element={<ProvideService />} />
        {/* patient test */}
        <Route path="patienttest" element={<PatientTest />}></Route>
        <Route path="addpatienttest" element={<ProvideTest />}></Route>
        <Route path="updatepatienttest/:id" element={<UpdatePatientTest />} />
        <Route path="readmoretest/:id" element={<ReadMoreTest/>}/>
        {/*patient ray */}
        <Route path="patientray" element={<PatientRay />}></Route>
        <Route path="addpatientray" element={<ProvideRay />}></Route>
        <Route path="updatepatientray/:id" element={<UpdatePatientRay />} />
        <Route path="readmoreray/:id" element={<ReadMoreRay/>}/>
      </Routes>
    </BrowserRouter>
  );
}
