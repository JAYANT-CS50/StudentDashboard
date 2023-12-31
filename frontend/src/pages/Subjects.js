import React,  { useState,  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, update } from '../store/dataSlice';
import axiosInstance from '../axiosConfig';



export const Subjects = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    time: ''
  })
  const subData = useSelector(state => state.userState.subList);
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
      if(id){
        axiosInstance.put(`subject/${id}/`, formData)
        .then((response) => {
          console.log(response.data, "updated subject");
          dispatch(update(response.data));
          setId("");
          setFormData({
            name: '',
            about: '',
            time: '',
      
          })
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
      }
      else{
        axiosInstance.post('subject/', formData)
        .then(response => {
          console.log(response.data);
          //setData([...data, response.data])
          dispatch(add(response.data));
          setFormData({
            name: '',
            about: '',
            time: '',
      
          })
          
        })
        .catch(error => {
          console.error(error);
          // Handle error
        });
      }
  };


  const handleDelete = (item) => {
    axiosInstance.delete(`subject/${item.id}/`)
    .then((response) => {
      console.log(response.data, "deleted subject")
      dispatch(remove(item));
    })
    .catch((error) => {
      console.error(error);
      // Handle error 
    });
  }

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      about: item.about,
      time: item.time,

    })
    setId(item.id)
  }


  return (
    <main>
    <section className="max-w-7xl mx-auto py-7">
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Subject Name' className="rounded p-2 mx-8 bg-slate-200" autoComplete='off' required/>
          <input type="text" name="about" value={formData.about} onChange={handleChange} placeholder='Description'className="rounded p-2 mx-8 bg-slate-200" autoComplete='off' required/>
          <input type="number" name="time" value={formData.time} onChange={handleChange} placeholder="Days" className="rounded p-2 mx-8 bg-slate-200" required min="1"/>
          <button type="submit"  className={id ? "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-8'}>{id ? 'Update Subject': 'Add Subject'}</button>
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

                  <button onClick={() => handleEdit(item)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>

                  <button onClick={() => handleDelete(item)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>

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
