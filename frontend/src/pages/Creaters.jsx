import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Creaters = () => {
  const [admin, setAdmin] = useState([])
   useEffect(()=>{
     const fetchAdmin = async()=>{
      const {data} = await axios.get("http://localhost:4040/api/users/admin",
        {
          withCredentials:true
        }
      )
      console.log(data)
      setAdmin(data)
     }
     fetchAdmin()
   },[])
  return (
<div className="flex flex-wrap justify-center items-center my-20 bg-gray-100">
      {admin.map((admin) => (
        <div
          key={admin._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2"
        >
          <div className="relative">
            <img
              src={admin.photo.url}
              alt="avatar"
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              <img
                src={admin.photo.url}
                alt="avatar"
                className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
              />
            </div>
          </div>
          <div className="px-4 py-6 mt-4">
            <h2 className="text-center text-xl font-semibold text-gray-800">
              {admin.name}
            </h2>
            <p className="text-center text-gray-600 mt-2">{admin.email}</p>
            <p className="text-center text-gray-600 mt-2">{admin.phone}</p>
            <p className="text-center text-gray-600 mt-2">{admin.role}</p>
          </div>
        </div>
      ))}
    </div>  )
}

export default Creaters