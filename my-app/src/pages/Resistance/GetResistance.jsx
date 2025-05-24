

import React, { useState, useEffect } from 'react';
import API from '../../utils/axios';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

const GetResistance = () => {
  const [resistanceData, setResistanceData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const fetchResistanceData = async () => {
    try {
      const res = await API.get('/auth/resistance/all');
      setResistanceData(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResistanceData();
  }, []);

  // Function to handle delete
    const handleDelete = async (id) => {
      try {
        const res = await API.delete(`/auth/resistance/delete/${id}`)
        setResistanceData(resistanceData.filter(resistance => resistance._id !== id))
        setError('')
      } catch (err) {
        setError(err.response?.data?.error || 'Something went wrong')
      }
    }

    // function to handle update
    const handleUpdate = (id) => {
      navigate(`/dashboard/resistance/update/${id}`);
    };

  return (
    <>
    <main className="max-w-6xl mx-auto p-4">
  {loading ? (
    <div className="text-center">
      <Loader />
      <p className="text-gray-500 mt-2">Loading your resistance workouts...</p>
    </div>
  ) : error ? (
    <p className="text-red-600">{error}</p>
  ) : (
    <section>
      {resistanceData.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">No resistance Workouts Found</h2>
          <button
            onClick={handleDashboard}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">All Resistance Workouts</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resistanceData.map((resistance) => (
              <li
                key={resistance._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {resistance.imageUrl && (
                  <div className="flex align-middle justify-center mb-4 w-full h-48 overflow-hidden">
                    <img
                      src={resistance.imageUrl}
                      alt={resistance.resistanceName}
                      className=" aspect-3/4 object-contain"
                    />
                  </div>
                )}

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{resistance.resistanceName}</h3>
                  <p className="text-gray-700">Workout Type: {resistance.workoutType}</p>
                  <p className="text-gray-700">Date: {new Date(resistance.date).toLocaleDateString()}</p>
                  <p className="text-gray-700">Sets: {resistance.sets} </p>
                  <p className="text-gray-700">Reps: {resistance.reps} </p>
                  <p className="text-gray-700">Weight Used: {resistance.weightUsed} </p>
                  <p className="text-gray-700 mb-4">Calories Burned: {resistance.caloriesBurned}</p>

                  <div className="mt-auto flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleUpdate(resistance._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(resistance._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center mt-8">
            <button
              onClick={handleDashboard}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Back to Dashboard
            </button>
          </div>
        </>
      )}
    </section>
  )}
</main>

   
      </>
  );
};

export default GetResistance;

