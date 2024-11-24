import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

   const[username , setuserName] = useState('');
   const[email , setEmail] = useState('');
   const[password , setPassword ] = useState('');
  

   const navigate = useNavigate();  

   const submit = async (e) => {
      e.preventDefault();  

      console.log("Submit function triggered");

      try {
         // Validation: if all feilds are filled
         if (!username || !email  || !password) {
            alert("All fields are required");
            return;  
         }

         
         const response = await axios.post(
            'http://localhost:1000/api/user/sign-up', 
            { username , email , password}
         );

         alert(response.data.message);  
         navigate('/Login');  // Redirecting to login page

      } catch (error) {
         console.error("Error during signup:", error);
         alert("An error occurred during signup");
      }
   };

   return (
      <div className="h-screen flex items-center justify-center bg-slate-200">
         <div className="bg-white rounded-lg p-8 w-[500px] shadow-lg">  
            <h2 className="text-2xl font-semibold text-black mb-6 text-center">Sign Up</h2>
            <form className="flex flex-col">
               <label className="text-black mb-2" htmlFor="username">Username</label>
               <input 
                  type="text" 
                  id="username" 
                  name="username"
                  className="p-2 mb-4 rounded border border-slate-400 focus:outline-none focus:border-blue-500" 
                  placeholder="Enter your username" 
                  required 
                  value={username}
                  onChange = {(e) => setuserName(e.target.value)}
               />
               <label className="text-black mb-2" htmlFor="email">Email</label>
               <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="p-2 mb-4 rounded border border-slate-400 focus:outline-none focus:border-blue-500" 
                  placeholder="Enter your email" 
                  required 
                  value={email}
                  onChange = {(e) => setEmail(e.target.value)}
               />
               <label className="text-black mb-2" htmlFor="password">Password</label>
               <input 
                  type="password" 
                  id="password" 
                  name="password"
                  className="p-2 mb-4 rounded border border-slate-400 focus:outline-none focus:border-blue-500" 
                  placeholder="Enter your password" 
                  required 
                  value={password}
                  onChange = {(e) => setPassword(e.target.value)}
               />

               <button 
                  type="submit" 
                  className="bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-300"
                  onClick={submit}
               >
                  Sign Up
               </button>
            </form>
            <p className="mt-4 text-center text-slate-600">
               Already have an account? 
               <Link to="/login" className="text-black hover:underline"> Login</Link>
            </p>
         </div>
      </div>
   );
};

export default Signup;
