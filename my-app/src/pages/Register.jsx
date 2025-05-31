
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/");
  };
 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post("/auth/user/register", form);
      setMsg("Registration successful!");
      loginHandler();
    } catch (err) {
      setMsg(err.response?.data?.error || "Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      {/* Background Image */}
  
      <div className=" lg:block fixed inset-0 overflow-hidden bg-no-repeat bg-cover  bg-center z-0 ">
        <img
        src='/background.jpg'
          alt="Fitness background"
          className="w-full h-full object-cover"
        />
        
      </div>
     

      <main className="flex min-h-full flex-1 flex-col  justify-center px-6 py-12 lg:px-8 z-10 w-full max-w-md  ">
        <section className="sm:mx-auto sm:w-full sm:max-w-sm  bg-black/20 p-8 rounded-xl shadow-2xl">
          <div className="flex justify-center">
            <img
              alt="Fitness Tracker Logo"
              src="/logo.jpg"
              className="mx-auto h-12 w-auto"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#FF6B35]">
            Join Fitness Tracker
          </h2>
          <p className="mt-2 text-center text-sm text-[#FF6B35]">
            Start your fitness journey today
          </p>

          <section className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#FF6B35]">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="block w-full px-4 py-3 rounded-lg border border-[#FFA07A] placeholder-[#FFA07A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#FF6B35]"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="block w-full px-4 py-3 rounded-lg border border-[#FFA07A] placeholder-[#FFA07A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-[#FF6B35]">
                    Password
                  </label>
                </div>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    autoComplete="current-password"
                    className="block w-full px-4 py-3 rounded-lg border border-[#FFA07A] placeholder-[#FFA07A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#FF6B35] hover:text-[#D45B2D]"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#FF6B35] hover:bg-[#D45B2D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] transition duration-150 ease-in-out relative"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
                {msg && (
                  <p
                    className={`mt-2 text-center text-sm ${
                      msg.includes("successful") ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {msg}
                  </p>
                )}
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#FFA07A]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[#FF6B35]">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={loginHandler}
                  className="w-full flex justify-center py-2 px-4 border border-[#FFA07A] rounded-lg shadow-sm text-sm font-medium text-[#FF6B35] bg-white hover:bg-[#FFF5F0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35]"
                >
                  Sign in
                </button>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Register;

