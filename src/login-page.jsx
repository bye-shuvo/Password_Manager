import React, { useEffect } from "react";
import { useState } from "react";
import { userContext } from "./context.jsx";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignup, setSignup] = useState(false);
  const [isUserSaved , setIsUserSaved] = useState(false);
  const { setUserID } = userContext();
  const navigate = useNavigate();

  const handleSavedUsers = () =>{   
    if(isUserSaved){
      navigate("/home");
    }
    else{
      console.log("Give Email and Password For Log In");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add your authentication logic here
    const response = await fetch("https://passbackend.vercel.app/getUser", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserID(data.email);
    if(data){
      if(rememberMe){
        localStorage.setItem("id" , data.email);
        localStorage.setItem("pass" , data.password);
      }
      else{
        localStorage.clear();
      }
      navigate("/home");
    }else{
      alert("Invalid email or password");
    }
    }

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Add your authentication logic here
    const response = await fetch("https://passbackend.vercel.app/createUser", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserID(data.email);
    navigate("/home");
    if(rememberMe){
      localStorage.setItem("id" , data.email);
      localStorage.setItem("pass" , data.password)
    }
    else{
      localStorage.clear();
    }
  };

  useEffect(() =>{
    if(localStorage.length > 0){
      setIsUserSaved(true);
      setUserID(localStorage.getItem("id"));
    }
    handleSavedUsers();
  } , []);

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-300 to-blue-500`}>
      <div className={`relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex ${isSignup ? "flex-row-reverse" : ""}`}>
        {/* Background patterns */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-teal-200/50"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-blue-300/50"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full border-4 border-teal-200/30"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-teal-100/20"></div>
        </div>

        {/* Left Panel */}
        <div className="relative w-2/5 bg-blue-500 p-12 text-white z-10">
          <div className="mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 text-center text-lg font-bold pt-2.5 rounded-full bg-white text-blue-400 mr-2">BYE</div>
              <span className="font-bold uppercase text-lg">PASSWORD MANAGER</span>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-4xl font-bold mb-2">Hello,</h2>
            <h2 className="text-4xl font-bold mb-6">welcome!</h2>
            <p className="text-md opacity-80 mb-8">
               <span className="text-lg opacity-100 font-bold">{isSignup ? "SIGN UP" : "LOGIN"}</span> and save your valuable password with our hash system to protect the passwords at most.
            </p>
          </div>

          {/* Wave pattern */}
          <div className="absolute bottom-12 left-12">
            <svg
              width="60"
              height="40"
              viewBox="0 0 60 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 20C10 10 20 30 30 20C40 10 50 30 60 20"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="2"
              />
              <path
                d="M0 10C10 0 20 20 30 10C40 0 50 20 60 10"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="2"
              />
              <path
                d="M0 30C10 20 20 40 30 30C40 20 50 40 60 30"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="relative w-3/5 bg-white p-12 z-10">
          <div className="flex justify-end mb-8">
            <div className="space-x-1">
              <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
            </div>
          </div>

          <form onSubmit={handleSignUp} className="mt-8">
            {isSignup && (
              <div className="mb-4">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full name"
                    className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-500"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <p className="text-center text-sm text-gray-500">
                {isSignup
                  ? "Aleady have an account?"
                  : "Don't have an account?"}
                <button
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={(e) => {
                    setSignup(!isSignup);
                    e.preventDefault();
                  }}
                >
                  {isSignup ? "Login" : "Sign up"}
                </button>
              </p>
              {isSignup ? (
                <button
                  type="submit"
                  className="w-full bg-white py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSignUp}
                  disabled={
                    !formData.name || !formData.email || !formData.password
                  }
                >
                  Sign up
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-500 py-2 px-4 border border-transparent rounded-md text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleLogin}
                  disabled={!formData.email || !formData.password}
                >
                  Login
                </button>
              )}
            </div>
          </form>

          <div className="mt-8">
            <p className="text-center text-sm text-gray-500 mb-4">FOLLOW</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
