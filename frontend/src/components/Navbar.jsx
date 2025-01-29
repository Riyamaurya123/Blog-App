import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const {blogs, isAuthenticated, profile, setIsAuthenticated} = useAuth()
  // console.log(profile?.role)
  const [show, setShow] = useState(false)
  const navigateTo = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      
      const { data } = await axios.get(
        "http://localhost:4040/api/users/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
       localStorage.removeItem("jwt"); 
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
    <nav className='shadow-lg px-4 py-3'>
      <div className='flex justify-between items-center lg:px-20'>
        <div className='font-semibold text-xl'>
          Cilli<span className='text-blue-500'>Blog</span>
        </div>
        {/* desktop */}
        <div className='mx-3'>
          <ul className='space-x-6 hidden md:flex'>
            <Link to={"/"} className='hover:text-blue-500'>HOME</Link>
            <Link to={"/blogs"} className='hover:text-blue-500'>BLOGS</Link>
            <Link to={"/creators"} className='hover:text-blue-500'>CREATORS</Link>
            <Link to={"/about"} className='hover:text-blue-500'>ABOUT</Link>
            <Link to={"/contact"} className='hover:text-blue-500'>CONTACT</Link>

          </ul>
          <div  className='md:hidden' onClick={()=> setShow(!show)} >{show?<RxCross2 size={24}/> :<RxHamburgerMenu size={24}/> }</div>
        </div>
        <div className='flex space-x-2'>
        {isAuthenticated && profile?.role==="admin"?(<Link to={"/dashboard"} className='bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded'>DASHBOARD</Link>):("")}
          {!isAuthenticated?(
                      <Link to={"/login"} className='bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded'>LOGIN</Link>
          ):(<div>
            <button onClick={handleLogout} className='bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded'>LOGOUT</button>
            </div>
          )}

        </div>
      </div>
      {/* mobile navbar */}
      {
        show && (
          <div className='bg-white'>
                      <ul className='flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl '>
            <Link to="/" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active"  className='hover:text-blue-500'>HOME</Link>
            <Link to="/blogs" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>BLOGS</Link>
            <Link to="/creators" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>CREATORS</Link>
            <Link to="/about" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>ABOUT</Link>
            <Link to="/contact" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>CONTACT</Link>

          </ul>

          </div>
        )
      }
      
    </nav>

    </>
  )
}

export default Navbar