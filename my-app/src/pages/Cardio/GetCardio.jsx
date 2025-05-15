

import React, { useState, useEffect } from 'react';
import API from '../../utils/axios';
import Loader from '../../components/Loader';
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

  // Function to handle delete
    const handleDelete = async (id) => {
      try {
        const res = await API.delete(`/auth/cardio/delete/${id}`)
        setCardioData(cardioData.filter(cardio => cardio._id !== id))
        setError('')
      } catch (err) {
        setError(err.response?.data?.error || 'Something went wrong')
      }
    }

  return (
    <>
    <main className="max-w-3xl mx-auto p-4">
      {loading ? (
        <div>
          <Loader />
          <p className="text-gray-500 text-center">Loading your cardio workouts...</p>
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <section>
          {cardioData.length==0 ?(
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">No Cardio Workouts Found</h2>
              <button onClick={handleDashboard} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Back to Dashboard
              </button>
            </div>
          ) : (
           
                <main>

                  <p className="text-2xl font-bold mb-4">All Cardio Workouts</p>
                  <ul>
                    {cardioData.map((cardio) => (
                      <li key={cardio._id} className="border p-4 mb-4 rounded shadow-md">
                        {cardio.imageUrl && (
                          <img
                            src={cardio.imageUrl}
                            alt={cardio.cardioName}
                            className="w-full max-h-64 object-cover mb-4 rounded"
                            />
                        )}
                        <p className="text-xl font-semibold">{cardio.cardioName}</p>
                        <p>Workout Type: {cardio.workoutType}</p>
                        <p>Date: {new Date(cardio.date).toLocaleDateString()}</p>
                        <p>Duration: {cardio.duration} minutes</p>
                        <p>Distance: {cardio.distance} km</p>
                        <p>Calories Burned: {cardio.caloriesBurned}</p>
                        <button onClick={() => handleDelete(cardio._id)} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                            Delete
                          </button>
                      </li>
                    ))}
                  </ul>
                    <button onClick={handleDashboard} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                      Back to Dashboard
                    </button>
                </main>
          )}
          
        </section>
      )}
    </main>
      </>
  );
};

export default GetCardio;

