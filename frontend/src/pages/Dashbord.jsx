import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import SideBar from '../dashbord/SideBar'
import MyProfile from '../dashbord/MyProfile'
import CreateBlog from '../dashbord/CreateBlog'
import UpdateBlock from '../dashbord/UpdateBlock'
import MyBloge from '../dashbord/MyBloge'
import { Navigate, useNavigate } from 'react-router-dom'

const Dashbord = () => {
  const [component, setComponent] = useState("My Blogs")
  const { profile, isAuthenticated} = useAuth()

  console.log(profile)
  console.log(isAuthenticated)

  return (
    <div>
      <div>
      <SideBar component={component} setComponent={setComponent} />
      {component==="my Profile"?(<MyProfile/>):component==="Create Blog"?(<CreateBlog/>):component==="Update Blog"?(<UpdateBlock/>):(<MyBloge/>)}
      </div>
    </div>
  )
}

export default Dashbord