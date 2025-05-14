import React,{useState,useEffect} from 'react'
import API from '../../utils/axios'
import { useNavigate } from 'react-router-dom';

const GetCardio = () => {
  const [cardioData, setCardioData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const handleDashboard = () => {
    navigate('/dashboard');
  }

  const fetchCardioData = async () => {
    try {
      const res = await API.get('/auth/cardio/all');
        // headers: {  
        //   Authorization: `Bearer ${token}`
        // }
        // });
      setCardioData(res.data);
      console.log(res.data);
      setLoading(false);
    }
    catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCardioData();
  }, []);

  return (
    <div>
    {/* display all cardio data */}
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p className="mt-4 text-red-600">{error}</p>
    ) : (
      <div>
        <h2 className="text-2xl font-bold mb-4">All Cardio Workouts</h2>
        <ul>
          {cardioData.map((cardio) => (
            <li key={cardio._id} className="border p-4 mb-4">
              <h3 className="text-xl font-semibold">{cardio.cardioName}</h3>
              <p>Workout Type: {cardio.workoutType}</p>
              <p>Date: {new Date(cardio.date).toLocaleDateString()}</p>
              <p>Duration: {cardio.duration} minutes</p>
              <p>Distance: {cardio.distance} km</p>
              <p>Calories Burned: {cardio.caloriesBurned}</p>
            </li>
          ))}
        </ul>
        <button onClick={handleDashboard} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Back to Dashboard</button>
      </div>
    )}
      
    </div>
  )
}

export default GetCardio
