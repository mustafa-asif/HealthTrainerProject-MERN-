import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const logout = () =>
    {
      localStorage.removeItem("token");
      navigate("/");
    }
  return (
    <div>
      this is dashboard page
      <button className='m-4' onClick={()=>{
        logout()
        navigate("/")
      }}> logout</button>
    </div>
  )
}

export default Dashboard
