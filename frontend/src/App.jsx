import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Blogs from './pages/Blogs'
import About from './pages/About'
import Contect from './pages/Contect'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashbord from './pages/Dashbord'
import { useAuth } from './context/AuthProvider'
import Creaters from './pages/Creaters'
import toast, { Toaster } from 'react-hot-toast';
import UpdateBlock from './dashbord/UpdateBlock'
import Detail from './pages/Detail'
import Notfound from './pages/Notfound'

const App = () => {
  const location = useLocation()
  const hideNavbarFooter = ["/dashboard","/login","/register"].includes(location.pathname)
  const {blogs, isAuthenticated}=useAuth()
  console.log(isAuthenticated)
  return (
    <div>
      <Toaster/>
     {!hideNavbarFooter && <Navbar/>}
      {/* definng Routes */}
      
      <Routes>
      {/* <Route exact path="/" element={<Home/>}/> */}
      <Route exact path="/" element={isAuthenticated===true?<Home/>:<Navigate to={"/login"}/>}/>
      <Route exact path="/blogs" element={<Blogs/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/contact" element={<Contect/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/dashboard" element={<Dashbord/>}/>
      <Route exact path="/creators" element={<Creaters/>}/>
      <Route exact path="/blog/update/:id" element={<UpdateBlock/>}/>
      <Route exact path="/blog/:id" element={<Detail/>}/>
      {/* universal route */}
      <Route exact path="*" element={<Notfound/>}/>


      </Routes>
     {!hideNavbarFooter&& <Footer/>}
    </div>
  )
}

export default App