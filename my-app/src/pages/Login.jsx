// // import React,{ useState } from "react"

// // import { EyeIcon,EyeSlashIcon } from '@heroicons/react/24/outline';


// // import API from "../utils/axios";
// // import { useNavigate } from "react-router-dom";
// // import Loader from "../components/Loader";

// // function Login() {
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const [msg, setMsg] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const navigate = useNavigate();
// // // set logout function

// //   const handleChange =(e) =>{

// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   }
// //   const handleRegister=()=>{
// //     navigate("/register")
// //   }

// //   const handleSubmit = async e => {
// //     e.preventDefault();
// //     try {
// //       const res = await API.post("/auth/user/login", form);
// //       localStorage.setItem("token", res.data.token);
// //       setMsg("Login successful");
// //       navigate("/dashboard");
// //     } catch (err) {
// //       setMsg(err.response?.data?.error || "Login failed");
// //     }finally{
// //       setLoading(true);

// //     }
// //   };

// //   return (
// //     <>
// //     <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
// //         <section className="sm:mx-auto sm:w-full sm:max-w-sm">
// //           <img
// //             alt="Your Company"
// //             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
// //             className="mx-auto h-10 w-auto"
// //           />
// //           <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
// //             Login your account
// //           </h2>
// //         </section>

// //         <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
// //           <form onSubmit={handleSubmit} className="space-y-6">
            
// //             <div>
// //               <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
// //                 Email address
// //               </label>
// //               <div className="mt-2">
// //                 <input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   onChange={handleChange}
// //                   required
// //                   autoComplete="email"
// //                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <div className="flex items-center justify-between">
// //                 <label  className="block text-sm/6 font-medium text-gray-900">
// //                   Password
// //                 </label>
// //               </div>
// //               <div className="mt-2 relative">
// //                 <input
// //                   id="password"
// //                   name="password"
// //                   type={showPassword ? "text" : "password"}
// //                   required
// //                   onChange={handleChange}
// //                   autoComplete="current-password"
// //                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
// //                 >{}
// //                   {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500"/> : <EyeIcon className="h-5 w-5 text-gray-500" />}
// //                 </button>
                  
                
// //               </div>
// //             </div>

// //             <div>
// //               <button
// //                 type="submit"
// //                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
// //               >{loading ?(
// //                 <Loader/>
// //               ): ("login")}
                
// //               </button>
// //               <p>{msg}</p>
// //             </div>
// //           </form>
// //           <div>
// //             <p className="mt-10 text-center text-sm/6 text-gray-500">
// //               Not a member?{" "}
// //               <button
// //                 onClick={handleRegister}
// //                 className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
// //               >
// //                 Register
// //               </button>
// //             </p>
// //           </div>
// //         </section>
// //       </main>
// //     </>
// //   );
// // }

// // export default Login;


// import React, { useState } from "react";
// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import API from "../utils/axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [msg, setMsg] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = () => {
//     navigate("/register");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/user/login", form);
//       localStorage.setItem("token", res.data.token);
//       setMsg("Login successful");
//       navigate("/dashboard");
//     } catch (err) {
//       setMsg(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* Zoomed-out background image */}
//       <div 
//         className="fixed inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ 
//           backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
//           transform: "scale(1.15)",
//           zIndex: -1
//         }}
//       >
//         <div className="absolute inset-0 bg-black/40"></div>
//       </div>
      
//       {/* Login card */}
//      <div className="relative w-full max-w-md px-8 py-10 bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl mx-4 border border-white/40">

//         {/* Logo */}
//         <div className="flex justify-center mb-8">
//           <img 
//             src="/logo.jpg" 
//             alt="FitTrack Pro" 
//             className="h-16 w-auto"
//           />
//         </div>
        
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Welcome Back
//           </h1>
//           <p className="text-gray-600">
//             Log in to continue your fitness journey
//           </p>
//         </div>
        
//         {/* Message alert */}
//         {msg && (
//           <div className={`mb-4 p-3 rounded-lg text-sm ${
//             msg.includes("success") 
//               ? "bg-green-100 text-green-800" 
//               : "bg-red-100 text-red-800"
//           }`}>
//             {msg}
//           </div>
//         )}
        
//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               onChange={handleChange}
//               required
//               autoComplete="email"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//               placeholder="your@email.com"
//             />
//           </div>

//           {/* Password field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 onChange={handleChange}
//                 autoComplete="current-password"
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-10"
//                 placeholder="••••••••"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 {showPassword ? (
//                   <EyeSlashIcon className="h-5 w-5" />
//                 ) : (
//                   <EyeIcon className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Remember me & Forgot password */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                 Remember me
//               </label>
//             </div>
//             <a href="#" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
//               Forgot password?
//             </a>
//           </div>

//           {/* Submit button */}
//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-100"
//           >
//             Log In
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="relative my-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center">
//             <span className="px-2 bg-white text-sm text-gray-500">
//               New to FitTrack?
//             </span>
//           </div>
//         </div>

//         {/* Register button */}
//         <button
//           onClick={handleRegister}
//           className="w-full py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
//         >
//           Create your account
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/user/login", form);
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful");
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Zoomed-out background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          transform: "scale(1.15)",
          zIndex: -1,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Login card */}
      <div className="relative w-full max-w-md px-6 sm:px-8 py-10 bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl mx-4 border border-white/40">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.jpg" alt="FitTrack Pro" className="h-16 w-auto" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Log in to continue your fitness journey
          </p>
        </div>

        {/* Message alert */}
        {msg && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              msg.includes("success")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {msg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="your@email.com"
            />
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between flex-wrap gap-y-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-100"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-sm text-gray-500">
              New to FitTrack?
            </span>
          </div>
        </div>

        {/* Register button */}
        <button
          onClick={handleRegister}
          className="w-full py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
        >
          Create your account
        </button>
      </div>
    </main>
  );
}

export default Login;

