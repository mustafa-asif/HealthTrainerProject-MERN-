import React from 'react'
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');   
    navigate('/');
  }

  const handleCreateCardio = () => {
    navigate('/dashboard/cardio/create');
  }
  const handleGetCardio = () => {
    navigate('/dashboard/cardio/getAll');
  }
  const handleUpdateCardio = () => {
    navigate('/dashboard/cardio/update/:id');
  }
  return (
    <main>
      <section>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        <div className="mt-4">
          <button onClick={handleCreateCardio} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Create Cardio</button>
          <button onClick={handleGetCardio} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Get Cardio</button>
          <button onClick={handleUpdateCardio} className="bg-yellow-500 text-white px-4 py-2 rounded">Update Cardio</button>
        </div>
      </section>
    </main>
   
  )
}

export default Dashboard
