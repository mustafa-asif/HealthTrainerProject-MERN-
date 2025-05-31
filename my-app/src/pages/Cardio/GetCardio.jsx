
import React, { useState, useEffect } from 'react';
import API from '../../utils/axios';
import Loader from '../../components/Loader';
import { TrashIcon } from "@heroicons/react/24/outline";


import { useNavigate } from 'react-router-dom';

const GetCardio = () => {
  const [cardioData, setCardioData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const fetchCardioData = async () => {
    try {
      const res = await API.get('/auth/cardio/all');
      setCardioData(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardioData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/auth/cardio/delete/${id}`);
      setCardioData(cardioData.filter(cardio => cardio._id !== id));
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/cardio/update/${id}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {loading ? (
        <div className="text-center">
          <Loader />
          <p className="text-gray-500 mt-2">Loading your cardio workouts...</p>
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <section>
          {cardioData.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Cardio Workouts Found</h2>
              <button
                onClick={handleDashboard}
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-200"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-semibold text-center text-orange-600 mb-10">All Cardio Workouts</h2>
              <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
                {cardioData.map((cardio) => (
                  <li
                    key={cardio._id}
                    className="bg-white border border-orange-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
                  >
                    {cardio.imageUrl && (
                      <div className="w-full h-48 flex justify-center items-center overflow-hidden bg-orange-50">
                        <img
                          src={cardio.imageUrl}
                          alt={cardio.cardioName}
                          className="object-contain h-full"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{cardio.cardioName}</h3>
                      <p className="text-gray-600">Workout Type: {cardio.workoutType}</p>
                      <p className="text-gray-600">Date: {new Date(cardio.date).toLocaleDateString()}</p>
                      <p className="text-gray-600">Duration: {cardio.duration} minutes</p>
                      <p className="text-gray-600">Distance: {cardio.distance} km</p>
                      <p className="text-gray-600 mb-4">Calories Burned: {cardio.caloriesBurned}</p>

                      <div className="mt-auto flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleUpdate(cardio._id)}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md w-full transition duration-200"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(cardio._id)}
                          className=" flex flex-row gap-4 bg-gray-800 hover:bg-gray-900 text-white align-middle px-4 py-2 rounded-md w-full transition duration-200"
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
  );
};

export default GetCardio;
