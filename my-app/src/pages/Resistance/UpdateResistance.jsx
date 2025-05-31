import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import API from '../../utils/axios';

const UpdateResistance = () => {
  //fetch the cardioId from the url
  const resistanceId = window.location.pathname.split('/').pop();
  const [formData, setFormData] = useState({
    workoutType: '',
    cardioName: '',
    date: '',
    sets: '',
    reps: '',
    weightUsed: '',
    caloriesBurned: ''
  });
  const navigate = useNavigate();

  const [image, setImage] = useState(null); // image file
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      const res = await API.put(`/auth/resistance/update/${resistanceId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
       setFormData({
        workoutType: '',
        resistanceName: '',
        date: '',
        sets: '',
        reps: '',
        weightUsed: '',
        caloriesBurned: ''
      });
      setMessage(res.data.message);
      setError('');
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  }
  const handleDashboard = () => {
    navigate('/dashboard');
  }
  // return (
  //   <main>
  //     <h1 className='text-2xl font-bold mb-4'>Update Resistance</h1>
  //     <form onSubmit={handleSubmit} className='flex flex-col'>
  //       <input type="text" name="workoutType" placeholder='Workout Type' onChange={handleChange} className='border p-2 mb-2' />
  //       <input type="text" name="resistanceName" placeholder='Resistance Name' onChange={handleChange} className='border p-2 mb-2' />
  //       <input type="date" name="date" onChange={handleChange} className='border p-2 mb-2' />
  //       <input type="text" name="sets" placeholder='Sets' onChange={handleChange} className='border p-2 mb-2' />
  //       <input type="text" name="reps" placeholder='Reps' onChange={handleChange} className='border p-2 mb-2' />
  //       <input type="text" name="weightUsed" placeholder='Weight (kg)' onChange={handleChange} className='border p-2 mb-2' />
  //       <input type="text" name="caloriesBurned" placeholder='Calories Burned' onChange={handleChange} className='border p-2 mb-2' />
  //       <input type="file" name="image" accept="image/*" onChange={handleImageChange} className='border p-2 mb-2' />
  //       {error && <p className='text-red-500'>{error}</p>}
  //       {message && <p className='text-green-500'>{message}</p>}
  //     </form>
  //     <button onClick={handleSubmit} className='bg-blue-500 p-5'>Update</button>
        
      
  //     <button onClick={handleDashboard} className='bg-blue-500 ml-2 p-5'>back to dashboard</button>
      
  //   </main>
  // )
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
}

export default UpdateResistance
