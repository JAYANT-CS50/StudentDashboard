import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';




export const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post('http://127.0.0.1:8000/dashboard/api/token/', { username, password })
      .then((response) => {
        // Save the token in local storage or Redux store
        console.log(response.data);
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
       

        // Redirect or perform any other actions after successful login
        // For example, navigate to the dashboard page
        window.location.href = '/subjects';
        
      })
      .catch((error) => {
        setError('Invalid username or password');
      });
  };

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <div className='flex flex-row justify-between'>
        <div className='justify-left basis-1/3 rounded-md border-4 hover:bg-red-50'>
        <form onSubmit={handleLogin}>
          <div className='ml-10 mb-4 mt-4' >
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder='username'
              className="rounded p-2 mx-7 bg-slate-200" autoComplete='off'
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder='password'
              className="rounded p-2 mx-8 bg-slate-200 my-4"
            />
          </div>
          <section className='flex justify-center'>
          <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login</button>
          {error && <p>{error}</p>}
          </section>
        </form>
        <div className='flex flex-col space-y-4 mt-5  '>
          <div className='ml-40 pl-7'>OR</div>
          <div className='ml-40 '>
          <NavLink to="/registration" >
            <button type="submit"  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ">Register</button>
          </NavLink>
          </div>
          </div>
          </div>
          <div className="basis-1/2 rounded-md border-4 p-4 hover:bg-red-50">
            <p className='text-justify  leading-[2]'>The project is a web application designed to assist students in planning their studies effectively. By inputting subjects and chapter names, students can visualize their workload through informative graphs. The app provides a user-friendly dashboard that helps manage time efficiently, optimize productivity, and enhance overall output. It empowers students to create better study plans, enabling them to effectively manage their workload and achieve improved academic results.</p>
          </div>
          </div>
    </section>
    </main>
  );
};


