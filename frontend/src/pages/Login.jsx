import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Login = () => {
    const {setIsAuthenticated} = useAuth()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const navigate = useNavigate()


  const handleLogin = async(e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.post('http://localhost:4040/api/users/login',{email,password,role},
        {
          withCredentials:true,
          headers: {
            "Content-Type":"multipart/form-data",
          }
        }
      )
      // console.log(data)
      localStorage.setItem("jwt", data.token);
      toast.success(data.message ||'user login successfull')
      setIsAuthenticated(true)
      setEmail("")
      setPassword("")
      setRole("")
      navigate("/")
      window.location.reload()

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message || "Please fill required fields")
    }

  }

  return (
    <>
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
    <div className='w-full max-w-md bg-white shadow-md rounded p-8'>
      <form onSubmit={handleLogin} action="">
      <Link to={'/'} className='font-semibold text-xl items-center text-center'>
          Cilli<span className='text-blue-500'>Blog</span>
        </Link>
        <h1 className='text-xl font-semibold mb-6'>Login</h1>
        <select onChange={(e)=>setRole(e.target.value)} value={role} className='w-full p-2 mb-4 border rounded-md'>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className='mb-4'>
          <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='Your Email' value={email} className='w-full p-2 border rounded-md' />
        </div>
        <div className='mb-4'>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password' value={password} className='w-full p-2 border rounded-md' />
        </div>
        <p className='text-center mb-4'>Already registerd? <Link to="/register" className='text-blue-600'>Register Now</Link></p>
        <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded text-white'>Login</button>

      </form>
    </div>

    </div>
    </>
  )
}

export default Login