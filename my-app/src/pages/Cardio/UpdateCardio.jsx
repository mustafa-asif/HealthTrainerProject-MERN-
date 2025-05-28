// import React,{useState,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom';
// import API from '../../utils/axios';

// const UpdateCardio = () => {
//   //fetch the cardioId from the url
//   const cardioId = window.location.pathname.split('/').pop();
//   const [formData, setFormData] = useState({
//     workoutType: '',
//     cardioName: '',
//     date: '',
//     duration: '',
//     distance: '',
//     caloriesBurned: ''
//   });
//   const [image, setImage] = useState(null); // image file
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   }
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       // Append form fields
//       for (const key in formData) {
//         data.append(key, formData[key]);
//       }
//       // Append image file
//       if (image) {
//         data.append("image", image);
//       }
//       const res = await API.put(`/auth/cardio/update/${cardioId}`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });
//       setMessage(res.data.message);
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Something went wrong');
//     }
//   }
//   const navigate = useNavigate();
//   const handleDashboard = () => {
//     navigate('/dashboard');
//   }
//   return (
//     <main>
//       <h1 className='text-2xl font-bold mb-4'>Update Cardio</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col'>
//         <input type="text" name="workoutType" placeholder='Workout Type' onChange={handleChange} className='border p-2 mb-2' />
//         <input type="text" name="cardioName" placeholder='Cardio Name' onChange={handleChange} className='border p-2 mb-2' />
//         <input type="date" name="date" onChange={handleChange} className='border p-2 mb-2' />
//         <input type="text" name="duration" placeholder='Duration' onChange={handleChange} className='border p-2 mb-2' />
//         <input type="text" name="distance" placeholder='Distance' onChange={handleChange} className='border p-2 mb-2' />
//         <input type="text" name="caloriesBurned" placeholder='Calories Burned' onChange={handleChange} className='border p-2 mb-2' />
//         <input type="file" name="image" accept="image/*" onChange={handleImageChange} className='border p-2 mb-2' />
//         {error && <p className='text-red-500'>{error}</p>}
//         {message && <p className='text-green-500'>{message}</p>}
//       </form>
//       <button onClick={handleSubmit} className='bg-blue-500 p-5'>Update</button>
        
      
//       <button onClick={handleDashboard} className='bg-blue-500 ml-2 p-5'>back to dashboard</button>
      
//     </main>
//   )
// }

// export default UpdateCardio

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/axios';

const UpdateCardio = () => {
  const cardioId = window.location.pathname.split('/').pop();
  const [formData, setFormData] = useState({
    workoutType: '',
    cardioName: '',
    date: '',
    duration: '',
    distance: '',
    caloriesBurned: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (image) {
        data.append("image", image);
      }

      const res = await API.put(`/auth/cardio/update/${cardioId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Update Cardio Workout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="workoutType"
          placeholder="Workout Type"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="cardioName"
          placeholder="Cardio Name"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (in minutes)"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="distance"
          placeholder="Distance (in km)"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="caloriesBurned"
          placeholder="Calories Burned"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {error && <p className="text-red-600 font-medium">{error}</p>}
        {message && <p className="text-green-600 font-medium">{message}</p>}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-md transition duration-200"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDashboard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md transition duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </main>
  );
};

export default UpdateCardio;
