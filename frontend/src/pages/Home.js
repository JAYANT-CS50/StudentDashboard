import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';



export const Home = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  



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
        navigate('/subjects', { replace: true });
   
      })
      .catch((error) => {
        setError('Invalid username or password');
      });
  };

    // If redirectToSubjects is true, redirect to the dashboard page

  return (
    <main className="bg-gray-100 min-h-16">
      <section className="flex flex-col md:flex-row items-center justify-center gap-4 py-7">
        <div className="max-w-md p-4 border-4 rounded-md bg-white">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                autoComplete="off"
                className="rounded p-2 bg-slate-200"
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className="rounded p-2 bg-slate-200"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
          <div className="flex flex-col space-y-4 mt-5">
            <div className="text-center">OR</div>
            <div className="text-center">
              <NavLink to="/registration">
                <button
                  type="submit"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Register
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 border-4 rounded-md bg-white">
          <p className="text-justify leading-7">
            The project is a web application designed to assist students in planning their studies
            effectively. By inputting subjects and chapter names, students can visualize their
            workload through informative graphs. The app provides a user-friendly dashboard that
            helps manage time efficiently, optimize productivity, and enhance overall output. It
            empowers students to create better study plans, enabling them to effectively manage
            their workload and achieve improved academic results.
          </p>
        </div>
      </section>
    </main>
  );
};
