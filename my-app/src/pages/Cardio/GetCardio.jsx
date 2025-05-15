

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

    // function to handle update
    const handleUpdate = (id) => {
      navigate(`/dashboard/cardio/update/${id}`);
    };

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
           
                <main >
                  <section>
                    <p className="text-2xl font-bold mb-4 text-center">All Cardio Workouts</p>
                  </section>
                <section className='grid grid-cols-1 content-evenly  md:grid-cols-3 gap-4'>
                  <ul className=' '>
                    {cardioData.map((cardio) => (
                      <section className=' '>

                      <li key={cardio._id} className="grid grid-cols-1 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-shadow duration-300 ">
                        {cardio.imageUrl && (
                          <div className=' flex justify-center mb-4 w-48 h-48 overflow-hidden  items-center'>

                           <img
                            src={cardio.imageUrl}
                            alt={cardio.cardioName}
                            className=" mx-auto object-cover w-full h-full rounded"
                            />
                          </div>
                        )}
                        <section className='ml-4 p-4 flex flex-col flex-grow' >

                          <p className="text-xl font-semibold">{cardio.cardioName}</p>
                          <p>Workout Type: {cardio.workoutType}</p>
                          <p>Date: {new Date(cardio.date).toLocaleDateString()}</p>
                          <p>Duration: {cardio.duration} minutes</p>
                          <p>Distance: {cardio.distance} km</p>
                          <p>Calories Burned: {cardio.caloriesBurned}</p>
                        </section>
                        <section className='flex justify-between items-center p-4'>

                        <button onClick={() => handleDelete(cardio._id)} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                            Delete
                          </button>
                        <button onClick={() => handleUpdate(cardio._id)} className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
                            Update
                          </button>
                        </section>
                       
                      </li>
                      </section>
                    ))}
                  </ul>
                </section>
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

