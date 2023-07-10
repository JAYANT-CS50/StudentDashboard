import React,  { useState } from 'react';
import axios from 'axios';


export const Subjects = ({subData, setSubData}) => {
  
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    time: ''
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


const handleSubmit = (event) => {
  event.preventDefault();
  axios.post('http://127.0.0.1:8000/dashboard/subjects/', formData)
    .then(response => {
      console.log(response.data);
      
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });

  axios.get('http://127.0.0.1:8000/dashboard/subjects/')
  .then(response => {
    setSubData(response.data);

  })
  .catch(error => {
    console.error(error);
    // Handle error
  });
  
};

  return (
    <main>
    <section className="max-w-7xl mx-auto py-7">
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Subject Name' className="rounded p-2 mx-8 bg-slate-200" autoComplete='off'/>
          <input type="text" name="about" value={formData.about} onChange={handleChange} placeholder='Description'className="rounded p-2 mx-8 bg-slate-200" autoComplete='off'/>
          <input type="number" name="time" value={formData.time} onChange={handleChange} placeholder='Time' className="rounded p-2 mx-8 bg-slate-200" />
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-8">Add Subject</button>
        </form>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Subject name
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Chapters
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Days Alloted
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
            {subData.map(item => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>

                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.name}
                  </th>
                  <td className="px-6 py-4">
                      {item.about}
                  </td>
                  <td className="px-6 py-4">
                      {item.chapter_count}
                  </td>
                  <td className="px-6 py-4">
                      {item.time}
                  </td>
                  <td className="px-6 py-4">
                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
    </section>

  </main>
  );
  
};
