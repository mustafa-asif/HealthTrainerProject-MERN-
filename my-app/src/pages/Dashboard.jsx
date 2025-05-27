
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

  const handleUpdateCardio = () => {
    navigate('/dashboard/cardio/update');
  };

  // Sleep data for the chart
  const sleepData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Hours Slept',
        data: [7, 6.5, 8, 7.5, 6, 9, 8.5],
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
        borderColor: 'rgba(79, 70, 229, 1)',
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
          <h1 className="text-3xl font-bold text-gray-800">Fitness Dashboard</h1>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cardio Section */}
          <div className="bg-white p-6 rounded-xl shadow-md col-span-1">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Cardio Activities</h2>
            <div className="space-y-3">
              <button
                onClick={handleCreateCardio}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create Cardio Session
              </button>
              <button
                onClick={handleGetCardio}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                View All Sessions
              </button>
              <button
                onClick={handleUpdateCardio}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Update Session
              </button>
            </div>
          </div>

          {/* Sleep Chart Section */}
          <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sleep Tracking</h2>
            <div className="h-64">
              <Bar data={sleepData} options={options} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Average Sleep</h3>
                <p className="text-2xl font-bold text-blue-600">7.5 hours</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800">Sleep Quality</h3>
                <p className="text-2xl font-bold text-purple-600">82%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-700">Weekly Activity</h3>
            {loading ? (
              <p className="text-3xl font-bold text-indigo-600 mt-2">Loading...</p>
            ) : error ? (
              <p className="text-red-500 mt-2">Error loading data</p>
            ) : (
              <p className="text-3xl font-bold text-indigo-600 mt-2">{sessionCount} sessions</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-700">Calories Burned</h3>
            {loading ? (
              <p className="text-3xl font-bold text-green-600 mt-2">Loading...</p>
            ) : error ? (
              <p className="text-red-500 mt-2">Error loading data</p>
            ) : (
              <p className="text-3xl font-bold text-green-600 mt-2">{totalCalories} kcal</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-700">Total Distance</h3>
            {loading ? (
              <p className="text-3xl font-bold text-yellow-600 mt-2">Loading...</p>
            ) : error ? (
              <p className="text-red-500 mt-2">Error loading data</p>
            ) : (
              <p className="text-3xl font-bold text-yellow-600 mt-2">{totalDistance} km</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

