import React from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateCardio = () => {
  const navigate = useNavigate();
  const handleDashboard = () => {
    navigate('/dashboard');
  }
  return (
    <div>
      update Cardio
      <button onClick={handleDashboard} className='bg-blue-500 ml-2 p-5'>back to dashboard</button>
      
    </div>
  )
}

export default UpdateCardio
