import React, { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/axios';

const CreateCardio = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
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
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <main className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-orange-100">
      <h2 className="text-3xl font-semibold text-orange-600 mb-6 text-center">Add Cardio Workout</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <input 
          type="text" 
          name="workoutType" 
          placeholder="Workout Type" 
          value={formData.workoutType} 
          onChange={handleChange} 
          className="w-full border border-orange-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" 
          required 
        />
        <input 
          type="text" 
          name="cardioName" 
          placeholder="Cardio Name" 
          value={formData.cardioName} 
          onChange={handleChange} 
          className="w-full border border-orange-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" 
          required 
        />
        <input 
          type="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          className="w-full border border-orange-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" 
          required 
        />
        <input 
          type="number" 
          name="duration" 
          placeholder="Duration (minutes)" 
          value={formData.duration} 
          onChange={handleChange} 
          className="w-full border border-orange-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" 
          required 
        />
        <input 
          type="number" 
          name="distance" 
          placeholder="Distance (km)" 
          value={formData.distance} 
          onChange={handleChange} 
          className="w-full border border-orange-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" 
          required 
        />
        <input 
          type="number" 
          name="caloriesBurned" 
          placeholder="Calories Burned" 
          value={formData.caloriesBurned} 
          onChange={handleChange} 
          className="w-full border border-orange-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" 
          required 
        />

        {/* Image input */}
        <div>
          <label className="block w-full bg-orange-500 text-white text-center py-2 rounded-md cursor-pointer hover:bg-orange-600 transition duration-200">
            <span>Select Image</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="hidden" 
            />
          </label>
        </div>

          {/* Submit button with loader */}
        <button
            type="submit"
            // disabled={isLoading}
            className={`w-full py-3 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium rounded-lg shadow-md transition-all duration-200 ${
              isLoading 
                ? "opacity-70 cursor-not-allowed" 
                : "hover:from-orange-600 hover:to-orange-500 hover:scale-[1.02] active:scale-100"
            }`}
          >
            {isLoading && (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            )}
            {isLoading ? "Submitting" : "Submit"}
          </button>
      </form>

      { message && <p className="mt-4 text-green-600 text-center font-medium">{message}</p>}
      {error && <p className="mt-4 text-red-600 text-center font-medium">{error}</p>}
      

      <button 
        onClick={handleDashboard} 
        className="mt-6 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition duration-200"
      >
        Back to Dashboard
      </button>
    </main>
  );
};

export default CreateCardio;

