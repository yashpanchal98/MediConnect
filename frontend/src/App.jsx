import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import About from './pages/About'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className='mx-4 sm:mx-[10%]'>
        <Navbar/>
          <Routes>

            <Route path='/' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/doctors' element={<Doctors/>}></Route>
            <Route path='/doctors/:speciality' element={<Doctors/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/my-profile' element={<MyProfile/>}></Route>
            <Route path='/my-appointments' element={<MyAppointments/>}></Route>
            <Route path='/appointments/:docId' element={<Appointment/>}></Route>

          </Routes>
        <Footer/>

        </div>
    </>
  )
}

export default App
