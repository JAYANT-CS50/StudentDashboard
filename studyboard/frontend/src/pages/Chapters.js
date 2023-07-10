import React,  {useEffect, useState } from 'react';
import axios from 'axios';


export const Chapters = ({subData, setFormSubmitted, formSubmitted}) => {

  const [totalTime, setTotalTime] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    time: ''
  })
  
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  
  const handleChaptersShow = (event) => {
    const selectedValue = event.target.value;
    setSelectedSubject(selectedValue);
  };
  
  useEffect(() => {
    if (selectedSubject !== '') {
      axios
        .get(`http://127.0.0.1:8000/dashboard/subject/${selectedSubject}/`)
        .then(response => {
          setChapterData(response.data);
          const newData = response.data.map(item => ({
            id: item.id,
            name: item.name,
            about: item.about,
            time: item.time
          }));
          setTotalTime(newData.reduce((sum, item) => sum + item.time, 0))
          console.log(newData);
          console.log('Total Time:', totalTime);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedSubject, totalTime]);
  

  console.log(chapterData);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const url_post = `http://127.0.0.1:8000/dashboard/subject/${selectedOption}/`;
    axios.post(url_post, formData)
      .then(response => {
        setChapterData([...chapterData, response.data]);
        //console.log(response.data);
        // Handle successful response
        setFormSubmitted(true);// Set form submission to true for refreshing the data as soon as new chapter added . it has beed done to update chapter_count every time
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
            <select id="countries" value={selectedOption} onChange={handleSelectChange} className="rounded p-2 px-2 mx-8 bg-slate-200">
              <option value="">Select Subject</option>
                {subData.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Chapter Name' className="rounded p-2 mx-8 bg-slate-200" autoComplete='off'/>
              <input type="text" name="about" value={formData.about} onChange={handleChange} placeholder='description' className="rounded p-2 mx-8 bg-slate-200" autoComplete='off'/>
              <input type="number" name="time" value={formData.time} onChange={handleChange} placeholder='time' className="rounded p-2 mx-8 bg-slate-200" autoComplete='off'/>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Chapter</button>
          </form>
        </div>
        <div className='flex justify-center mt-5'>
          <label htmlFor="underline_select" className="sr-only">Underline select</label>
            <select onChange={handleChaptersShow} value={selectedSubject} id="underline_select" className="block py-2.5 px-0 w-1/2 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              {subData.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                    Chapter Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Time Alloted
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
              </tr>
            </thead>
            <tbody>
              {chapterData.map(item => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.name}
                  </th>
                  <td className="px-6 py-4">
                      {item.about}
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
            <tfoot>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Total Time:</th>
                
                <td className="px-6 py-4" ></td>
                <td className="px-6 py-4" >{totalTime} Hours</td>
                <td className="px-6 py-4" ></td>
                <td></td> 
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </main>


  );
}
