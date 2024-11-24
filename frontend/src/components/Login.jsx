import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthProvider'; 

const Login = () => {
  const [username, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (!username || !password) {
        alert("All fields are required");
        return;  // Early Exit
      }

      // The POST request to the API
      const response = await axios.post(
        'http://localhost:1000/api/user/sign-in',
        { username, password }
      );

      const userData = {
        id: response.data.id,
        token: response.data.token,
        role: response.data.role,
        username: response.data.username,
      };

      login(userData); // Using the login function from context
      
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white rounded-lg p-8 w-96 shadow-lg">
        <h2 className="text-2xl font-semibold text-black mb-6 text-center">Login</h2>
        <form onSubmit={submit} className="flex flex-col">
          <label className="text-black mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="p-2 mb-4 rounded border border-zinc-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            name="username"
            required
            value={username}
            onChange={(e) => setuserName(e.target.value)}
          />
          <label className="text-black mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="p-2 mb-4 rounded border border-zinc-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-zinc-400">
          Don't have an account?
          <Link to="/Signup" className="text-black hover:underline"> Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;