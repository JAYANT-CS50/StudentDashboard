import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegistration = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    axios
      .post('http://127.0.0.1:8000/dashboard/api/auth/register/', { username, email, password })
      .then((response) => {
        // Redirect or perform any other actions after successful registration
        // For example, navigate to the login page
        toast.success('Registration Successful Redirecting to Login page!', {
          position: 'top-right',
          autoClose: 3000, // Close after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        console.log('Registration successful');
        // Delay for 4 seconds before redirecting to another page
        setTimeout(() => {
          // Redirect to the login page or any other page
          window.location.href = '/';
        }, 4000);
      })
      .catch((error) => {
        setError('Registration failed');
      });
  };

  return (
    <main>
      <section className='bg-gray-100 min-h-16 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg'>
          <div>
            <h2 className='text-3xl font-bold text-center text-gray-900'>Register</h2>
          </div>
          <form onSubmit={handleRegistration} className='space-y-6'>
            <div>
              <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                Username:
              </label>
              <input
                type='text'
                id='username'
                value={username}
                onChange={handleUsernameChange}
                placeholder='Username'
                className='mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-3'
                autoComplete='off'
              />
            </div>
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password:
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='Password'
                className='mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-3'
                autoComplete='off'
              />
            </div>
            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
                Confirm Password:
              </label>
              <input
                type='password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder='Confirm Password'
                className='mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-3'
                autoComplete='off'
              />
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email:
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='Email'
                className='mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-3'
                autoComplete='off'
              />
            </div>
            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Register
              </button>
            </div>
            {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
          </form>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};
