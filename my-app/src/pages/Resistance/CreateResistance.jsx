
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/axios';

const CreateResistance = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // image file
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    workoutType: '',
    resistanceName: '',
    date: '',
    sets: '',
    reps: '',
    weightUsed: '',
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

      const res = await API.post('/auth/resistance/create', data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage(res.data.message);
      setError('');
      setFormData({
        workoutType: '',
        resistanceName: '',
        date: '',
        sets: '',
        reps: '',
        weightUsed: '',
        caloriesBurned: ''
      });
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setMessage('');
    }
  };

//  return (
  //  <main className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-6">
    //  <h2 className="text-2xl font-bold mb-4">Add Resistance Workout</h2>
     // <form onSubmit={handleSubmit} className="space-y-4">
       // <input type="text" name="workoutType" placeholder="Workout Type" value={formData.workoutType} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
       // <input type="text" name="resistanceName" placeholder="Resistance Name" value={formData.resistanceName} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        //<input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        // <input type="number" name="sets" placeholder="Sets"  value={formData.sets} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        // <input type="number" name="reps" placeholder="Reps" value={formData.reps} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        //<input type="number" name="weightUsed" placeholder="Weight (kg)" value={formData.weightUsed} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
       // <input type="number" name="caloriesBurned" placeholder="Calories Burned" value={formData.caloriesBurned} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        
        // {/* Image input */}
       // <button>
         // <label className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer">
            
       // <input type="file" accept="image/*" placeholder='Add Image' onChange={handleImageChange} className="w-full border px-3 py-2 rounded" />
         // </label>
       // </button>

       // <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
      //</form>

      //{message && <p className="mt-4 text-green-600">{message}</p>}
     // {error && <p className="mt-4 text-red-600">{error}</p>}
      
      //<button onClick={handleDashboard} className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Back to Dashboard</button>
    return (
  <main className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-8 mt-10 border border-orange-200">
    <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-6">Add Resistance Workout</h2>
    
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="workoutType"
        placeholder="Workout Type"
        value={formData.workoutType}
        onChange={handleChange}
        className="w-full border border-orange-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      <input
        type="text"
        name="resistanceName"
        placeholder="Resistance Name"
        value={formData.resistanceName}
        onChange={handleChange}
        className="w-full border border-orange-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border border-orange-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      <input
        type="number"
        name="sets"
        placeholder="Sets"
        value={formData.sets}
        onChange={handleChange}
        className="w-full border border-orange-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      <input
        type="number"
        name="reps"
        placeholder="Reps"
        value={formData.reps}
        onChange={handleChange}
        className="w-full border border-orange-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      <input
        type="number"
        name="weightUsed"
        placeholder="Weight (kg)"
        value={formData.weightUsed}
        onChange={handleChange}
        className="w-full border border-orange-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      <input
        type="number"
        name="caloriesBurned"
        placeholder="Calories Burned"
        value={formData.caloriesBurned}
        onChange={handleChange}
        className="w-full border border-orange-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
<div className="w-full">
  <label
    htmlFor="imageUpload"
    className="block text-sm font-medium text-orange-600 mb-1"
  >
    Upload an Image (JPG, PNG)
  </label>
  <input 
    id="imageUpload"
    type="file" 
    required
    accept="image/*"
    onChange={handleImageChange}
    className="w-full border border-orange-300 px-4 py-2 rounded-lg text-sm cursor-pointer bg-orange-50 hover:bg-orange-100"
  />
</div>

      {/* <label className="block text-center">

        <span className="inline-block mb-2 text-sm font-medium text-gray-600">Add an Image</span>
        <input 
          type="file" required
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-orange-300 px-4 py-2 rounded-lg text-sm cursor-pointer bg-orange-50 hover:bg-orange-100"
        />
      </label> */}
       {/* Image input
        <button>
          <label className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer">
            
        <input type="file" accept="image/*" placeholder='Add Image' onChange={handleImageChange} className="w-full border px-3 py-2 rounded" required />
          </label>
        </button> */}

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
      >
        Submit
      </button>
    </form>

    {message && (
      <p className="mt-6 text-center text-green-600 font-medium">{message}</p>
    )}

    {error && (
      <p className="mt-6 text-center text-red-600 font-medium">{error}</p>
    )}

    <button
      onClick={handleDashboard}
      className="mt-6 w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
    >
      Back to Dashboard
    </button>
  </main>
);

     
  
};

export default CreateResistance;

