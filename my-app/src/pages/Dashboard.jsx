
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import API from '../utils/axios'; 

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [cardioData, setCardioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Calculate totals
  const totalCalories = cardioData.reduce((sum, cardio) => sum + Number(cardio.caloriesBurned), 0);
  const totalDistance = cardioData.reduce((sum, cardio) => sum + Number(cardio.distance), 0);
  const sessionCount = cardioData.length;

   const fetchCardioData = async () => {
      try {
        const res = await API.get('/auth/cardio/all');
        setCardioData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch cardio data');
        setLoading(false);
      }
    };

  useEffect(() => {
   

    fetchCardioData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCreateCardio = () => {
    navigate('/dashboard/cardio/create');
  };

  const handleGetCardio = () => {
    navigate('/dashboard/cardio/getAll');
  };
  const handleGetResistance = () => {
    navigate('/dashboard/resistance/getAll');
  };

  const hanndleCreateResistance = () => {
    navigate('/dashboard/resistance/create');
  };

  // Sleep data for the chart
  const sleepData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Hours Slept',
        data: [7, 6.5, 8, 7.5, 6, 9, 8.5],
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        
        borderColor: 'rgba(79, 70, 229, 0.9)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Sleep Schedule',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
         < img src="/logo.jpg" alt="FitTrack Pro" className="h-20 w-auto " />
          <h1 className="text-2xl font-bold text-orange-700">Fitness Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </header>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Cardio Section */}
  <div className="bg-white/60 p-6 rounded-xl shadow-md col-span-1">
    <h2 className="text-xl font-semibold text-orange-500  mb-4">Cardio Activities</h2>
    <div className="space-y-3">
      <button
        onClick={handleCreateCardio}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Create Cardio Session
      </button>
      <button
        onClick={handleGetCardio}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg transition duration-200 transform-3d hover:scale-105 active-scale-95 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
        View All Sessions
      </button>
    </div>
  </div>

  {/* Resistance Training Section */}
 <div className="bg-white/60 p-6 rounded-xl shadow-md col-span-1">
    <h2 className="text-xl font-semibold text-orange-500  mb-4">Resistance Training</h2>
    <div className="space-y-3">
      <button
        onClick={hanndleCreateResistance}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Create Resistance Session
      </button>
      <button
        onClick={handleGetResistance}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg transition duration-200 transform-3d hover:scale-105 active-scale-95 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
        View All Sessions
      </button>
    </div>
  </div>

  {/* Sleep Chart Section */}
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md col-span-1 md:col-span-2 w-full">
    <div className= " h-52 sm:h-64">
      <Bar data={sleepData} options={options}  />
    </div>
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
        <h3 className=" text-xs sm:text-sm font-medium text-blue-800">Average Sleep</h3>
        <p className=" text-xl sm:text-2xl font-bold text-blue-600">7.5 hours</p>
      </div>
      <div className="bg-blue-50 p-3 sm:p-4 shadow-md hover:shadow-lg  rounded-lg">
        <h3 className="text-xs sm:text-sm font-medium text-blue-800">Sleep Quality</h3>
        <p className="text-2xl font-bold text-blue-600">82%</p>
      </div>
    </div>
  </div>
</div>


        {/* Quick Stats Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <h3 className="text-lg  font-medium text-fuchsia-900">Weekly Activity</h3>
            {loading ? (
              <p className="text-3xl font-medum text-blue-600 mt-2">Loading...</p>
            ) : error ? (
              <p className="text-red-500 mt-2">Error loading data</p>
            ) : (
              <p className="text-3xl font-bold text-fuchsia-800 mt-2">{sessionCount} sessions</p>
            )}
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-fuchsia-600">Calories Burned</h3>
            {loading ? (
              <p className="text-3xl font-bold text-blue-600 mt-2">Loading...</p>
            ) : error ? (
              <p className="text-red-500 mt-2">Error loading data</p>
            ) : (
              <p className="text-3xl font-bold text-fuchsia-500 mt-2">{totalCalories} kcal</p>
            )}
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-teal-700">Total Distance</h3>
            {loading ? (
              <p className="text-3xl font-bold text-blue-600 mt-2">Loading...</p>
            ) : error ? (
              <p className="text-red-500 mt-2">Error loading data</p>
            ) : (
              <p className="text-3xl font-bold text-teal-600 mt-2">{totalDistance} km</p>
            )}
          </div>
        </div>
      </div>
      
    
    </main>
  );
};

export default Dashboard;