import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email, password });
      localStorage.setItem("token", response.data.jwtToken);
      setIsLoggedIn(true);
      console.log("token",response.data);
      
      navigate("/casino/home");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-100 rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
