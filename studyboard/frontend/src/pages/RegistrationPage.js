import React, { useState } from 'react';
import axios from 'axios';

export const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegistration = (event) => {
    event.preventDefault();

    axios
      .post('http://127.0.0.1:8000/dashboard/api/auth/register/', { username, email, password })
      .then((response) => {
        // Redirect or perform any other actions after successful registration
        // For example, navigate to the login page
        console.log("Registration successful");
        window.location.href = '/';
      })
      .catch((error) => {
        setError('Registration failed');
      });
  };

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
    <div className=' grid justify-items-center'>
      <form onSubmit={handleRegistration}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder='username'
            className="rounded p-2 mx-8 bg-slate-200 my-4"
            autoComplete='off'

          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='password'
            className="rounded p-2 mx-8 bg-slate-200 my-4 "
            autoComplete='off'
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder='email'
            className="rounded p-2 mx-8 bg-slate-200 my-4 "
            autoComplete='off'
          />
        </div>
        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
    </section>
    </main>
  );
};


