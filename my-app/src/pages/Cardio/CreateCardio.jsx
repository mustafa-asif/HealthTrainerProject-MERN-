
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/axios';

const CreateCardio = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // image file
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    workoutType: '',
    cardioName: '',
    date: '',
    duration: '',
    distance: '',
    caloriesBurned: ''
  });


  const handleDashboard = () => {
    navigate('/dashboard');
  };

  

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append form fields
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      // Append image file
      if (image) {
        data.append("image", image);
      }

      const res = await API.post('/auth/cardio/create', data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage(res.data.message);
      setError('');
      setFormData({
        workoutType: '',
        cardioName: '',
        date: '',
        duration: '',
        distance: '',
        caloriesBurned: ''
      });
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <main className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Add Cardio Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="workoutType" placeholder="Workout Type" value={formData.workoutType} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input type="text" name="cardioName" placeholder="Cardio Name" value={formData.cardioName} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input type="number" name="duration" placeholder="Duration (minutes)" value={formData.duration} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input type="number" name="distance" placeholder="Distance (km)" value={formData.distance} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input type="number" name="caloriesBurned" placeholder="Calories Burned" value={formData.caloriesBurned} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        
        {/* Image input */}
        <button>
          <label className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer">
            
        <input type="file" accept="image/*" placeholder='Add Image' onChange={handleImageChange} className="w-full border px-3 py-2 rounded" />
          </label>
        </button>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      
      <button onClick={handleDashboard} className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Back to Dashboard</button>
    </main>
  );
};

export default CreateCardio;

