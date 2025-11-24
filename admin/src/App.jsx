import { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import './App.css'
import Login from './pages/Login'
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import AllAppointments from './pages/admin/AllAppointments';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorsList from './pages/admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashBoard from './pages/doctor/DoctorDashBoard';
import DoctorAppointment from './pages/doctor/DoctorAppointment';
import DoctorProfile from './pages/doctor/DoctorProfile';

function App() {
  const [count, setCount] = useState(0)
  const {aToken}  = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);

  return aToken || dToken ? (
    <>

      <ToastContainer />
      <Navbar/>
      <div className='flex item-start'>
        <SideBar/>
        <Routes>

          {/* Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />

          {/* Doctor Routes */}
          <Route path='/doctor-dashboard' element={<DoctorDashBoard/>} />
          <Route path='/doctor-appointments' element={<DoctorAppointment/>} />
          <Route path='/doctor-profile' element={<DoctorProfile/>} />

        </Routes>

      </div>

    </>
  ) : (
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
