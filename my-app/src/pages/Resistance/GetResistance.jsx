

import React, { useState, useEffect } from 'react';
import API from '../../utils/axios';
import Loader from '../../components/Loader';
import { TrashIcon } from "@heroicons/react/24/outline";
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
    <main className="max-w-7xl mx-auto px-4 py-10">
      {loading ? (
        <div className="text-center">
          <Loader />
          <p className="text-gray-500 mt-2">Loading your resistance workouts...</p>
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <section>
          {resistanceData.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No resistance Workouts Found</h2>
              <button
                onClick={handleDashboard}
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-200"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-semibold text-center text-orange-600 mb-10">All Resistance Workouts</h2>
              <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {resistanceData.map((resistance) => (
                  <li
                    key={resistance._id}
                    className="bg-white border border-orange-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
                  >
                    {resistance.imageUrl && (
                      <div className="w-full h-48 flex justify-center items-center overflow-hidden bg-orange-50">
                        <img
                          src={resistance.imageUrl}
                          alt={resistance.resistanceName}
                          className="object-contain h-full"
                        />
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{resistance.resistanceName}</h3>
                      <p className="text-gray-600">Workout Type: {resistance.workoutType}</p>
                      <p className="text-gray-600">Date: {new Date(resistance.date).toLocaleDateString()}</p>
                      <p className="text-gray-600">Sets: {resistance.sets}</p>
                      <p className="text-gray-600">Reps: {resistance.reps}</p>
                      <p className="text-gray-600">Weight Used: {resistance.weightUsed}</p>
                      <p className="text-gray-600 mb-4">Calories Burned: {resistance.caloriesBurned}</p>

                      <div className="mt-auto flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleUpdate(resistance._id)}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md w-full transition duration-200"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(resistance._id)}
                          className=" flex flex-row gap-4 bg-red-600 hover:bg-red-900 text-white align-middle px-4 py-2 rounded-md w-full transition duration-200"
                        >
                          <TrashIcon className="h-6 w-6 text-red" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="text-center mt-12">
                <button
                  onClick={handleDashboard}
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-200"
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

