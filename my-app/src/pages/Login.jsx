gin;

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/solid'; // Add loader icon
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const brandColor = "#ff5a3c";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/auth/user/login", form);
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful");
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          transform: "scale(1.15)",
          zIndex: -1
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md px-8 py-10 bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl mx-4 border border-white/40">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.jpg" alt="FitTrack Pro" className="h-16 w-auto" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: brandColor }}>
            Welcome Back
          </h1>
          <p className="text-gray-600">Log in to continue your fitness journey</p>
        </div>

        {/* Message */}
        {msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            msg.includes("success") 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {msg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: brandColor }}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: brandColor }}>
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">       
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm" style={{ color: brandColor }}>
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm hover:underline" style={{ color: brandColor }}>
              Forgot password?
            </a>
          </div>

          {/* Submit button with loader */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium rounded-lg shadow-md transition-all duration-200 ${
              isLoading 
                ? "opacity-70 cursor-not-allowed" 
                : "hover:from-orange-600 hover:to-orange-500 hover:scale-[1.02] active:scale-100"
            }`}
          >
            {isLoading && (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            )}
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-sm" style={{ color: brandColor }}>
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
    </div>
  );
}

export default Login;
