import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Register = () => {
  const {setIsAuthenticated,isAuthenticated, setProfile} = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [education, setEducation] = useState("")
  const [photo, setPhoto] = useState("")
  const [photoPreview, setphotoPreview] = useState("")

  const changePhotoHandler = (e)=>{
    console.log(e)
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload=()=>{
      setphotoPreview(reader.result)
      setPhoto(file)
    }
  }

  const handleRegister = async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('name',name)
    formData.append('email', email)
    formData.append('phone',phone)
    formData.append('password',password)
    formData.append('role',role)
    formData.append('education',education)
    formData.append('photo',photo)
    try {
      const {data}=await axios.post('http://localhost:4040/api/users/register',formData,
        {
          withCredentials:true,
          headers: {
            "Content-Type":"multipart/form-data",
          }
        }
      )
      console.log(data)
      toast.success(data.message ||'user register successfull')
      // setProfile(data)
      setIsAuthenticated(true)
      setName("")
      setEmail("")
      setPassword("")
      setPhone("")
      setPhoto("")
      setphotoPreview("")
      setEducation("")
      setRole("")
      navigate("/")

    } catch (error) {
      console.log(error)
      toast.error(error.message || "Please fill required fields")
    }

  }

  return (
    <>
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
    <div className='w-full max-w-md bg-white shadow-md rounded p-8'>
      <form onSubmit={handleRegister} action="">
      <div className='font-semibold text-xl items-center text-center'>
          Cilli<span className='text-blue-500'>Blog</span>
        </div>
        <h1 className='text-xl font-semibold mb-6'>Register</h1>
        <select onChange={(e)=>setRole(e.target.value)} value={role} className='w-full p-2 mb-4 border rounded-md'>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className='mb-4'>
          <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Your Name' value={name} className='w-full p-2 border rounded-md' />
        </div>
        <div className='mb-4'>
          <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='Your Email' value={email} className='w-full p-2 border rounded-md' />
        </div>
        <div className='mb-4'>
          <input type="number" onChange={(e)=>setPhone(e.target.value)} placeholder='Your phone Number' value={phone} className='w-full p-2 border rounded-md' />
        </div>
        <div className='mb-4'>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password' value={password} className='w-full p-2 border rounded-md' />
        </div>
        <select value={education} onChange={(e)=>setEducation(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
          <option value="" >Select Your Education</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="MBA">MBA</option>
          <option value="BBA">BBA</option>
        </select>
        <div className='flex items-center mb-4'>
          <div className='photo w-20 h-20 mr-4'>
            <img src={photoPreview?`${photoPreview}`:"photo"} alt="photo" />
          </div>
          <input type="file"  onChange={changePhotoHandler} className='w-full p-2 border rounded-md'  />
        </div>
        <p className='text-center mb-4'>Already registerd? <Link to="/login" className='text-blue-600'>Login Now</Link></p>
        <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded text-white'>Register</button>

      </form>
    </div>

    </div>
    </>
  )
}

export default Register