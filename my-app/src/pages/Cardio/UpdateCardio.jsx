import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../../utils/axios';

const UpdateCardio = () => {
  //fetch the cardioId from the url
  const cardioId = window.location.pathname.split('/').pop();
  const [formData, setFormData] = useState({
    workoutType: '',
    cardioName: '',
    date: '',
    duration: '',
    distance: '',
    caloriesBurned: ''
  });
  const [image, setImage] = useState(null); // image file
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
  }
  const navigate = useNavigate();
  const handleDashboard = () => {
    navigate('/dashboard');
  }
  return (
    <main>
      <h1 className='text-2xl font-bold mb-4'>Update Cardio</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input type="text" name="workoutType" placeholder='Workout Type' onChange={handleChange} className='border p-2 mb-2' />
        <input type="text" name="cardioName" placeholder='Cardio Name' onChange={handleChange} className='border p-2 mb-2' />
        <input type="date" name="date" onChange={handleChange} className='border p-2 mb-2' />
        <input type="text" name="duration" placeholder='Duration' onChange={handleChange} className='border p-2 mb-2' />
        <input type="text" name="distance" placeholder='Distance' onChange={handleChange} className='border p-2 mb-2' />
        <input type="text" name="caloriesBurned" placeholder='Calories Burned' onChange={handleChange} className='border p-2 mb-2' />
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} className='border p-2 mb-2' />
        {error && <p className='text-red-500'>{error}</p>}
        {message && <p className='text-green-500'>{message}</p>}
      </form>
      <button onClick={handleSubmit} className='bg-blue-500 p-5'>Update</button>
        
      
      <button onClick={handleDashboard} className='bg-blue-500 ml-2 p-5'>back to dashboard</button>
      
    </main>
  )
}

export default UpdateCardio
