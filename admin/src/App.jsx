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

function App() {
  const [count, setCount] = useState(0)
  const {aToken}  = useContext(AdminContext);

  return aToken ? (
    <>

      <ToastContainer />
      <Navbar/>
      <div className='flex item-start'>
        <SideBar/>
        <Routes>

          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />

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
