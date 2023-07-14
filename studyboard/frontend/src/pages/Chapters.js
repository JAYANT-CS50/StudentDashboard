import React,  {useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


export const Chapters = ({setFormSubmitted, formSubmitted}) => {

  const [totalTime, setTotalTime] = useState();
  const [chapterData, setChapterData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [id, setId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    time: ''
  })
  const subData = useSelector(state => state.userState);
  
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  
  const handleChaptersShow = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleDelete = (item) => {
    axios.delete(`http://127.0.0.1:8000/dashboard/subject/chapter/${item.id}/`)
    .then((response) => {
      console.log(response.data, "deleted subject")
      setChapterData(chapterData.filter((u) => u.id !== item.id));
      setFormSubmitted(prevValue => !prevValue);
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




  useEffect(() => {
    if (selectedSubject !== '') {
      axios
        .get(`http://127.0.0.1:8000/dashboard/subject/${selectedSubject}/chapter/`)
        .then(response => {
          setChapterData(response.data);
          
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedSubject]);


  useEffect(() => {
    setTotalTime(chapterData.reduce((total, chapter) => total + chapter.time, 0));

  },[chapterData])
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if(id){
      axios.put(`http://127.0.0.1:8000/dashboard/subject/chapter/${id}/`, formData)
      .then((response) => {
        console.log(response.data, "updated subject");
        setChapterData(chapterData.map((subject) => {
          if (subject.id === id) {
            return response.data; // Replace the subject with the updated data
          } else {
            return subject; // Keep the other subjects unchanged
          }
          
        }));
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
      axios.post(`http://127.0.0.1:8000/dashboard/subject/${selectedSubject}/chapter/`, formData)
      .then(response => {
        setChapterData([...chapterData, response.data]);
        //console.log(response.data);
        // Handle successful response
        setFormSubmitted(prevValue => !prevValue);// Set form submission to true for refreshing the data as soon as new chapter added . it has beed done to update chapter_count every time
        setFormData({
          name: '',
          about: '',
          time: ''
        })


      
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });

    }
  };


  return (
    <main>
      <section className="max-w-7xl mx-auto py-7"> 
        <div className='flex justify-center'>
          <form onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Chapter Name' className="rounded p-2 mx-8 bg-slate-200" autoComplete='off' required/>
              <input type="text" name="about" value={formData.about} onChange={handleChange} placeholder='description' className="rounded p-2 mx-8 bg-slate-200" autoComplete='off' required/>
              <input type="number" name="time" value={formData.time} onChange={handleChange} placeholder='time' className="rounded p-2 mx-8 bg-slate-200" autoComplete='off' required />
              <button type="submit"  className={id ? "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-8'}>{id ? 'Update Chapter': 'Add Chapter'}</button>
              <div className='flex justify-center mt-5'>
            <label htmlFor="underline_select" className="sr-only">Underline select</label>
            <select onChange={handleChaptersShow} id="underline_select" value={selectedSubject} className="block py-2.5 px-0 w-1/2 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" required>
            <option disabled value="">
              Select Subject
            </option>
            {subData.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          </div>
          </form>
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

                  <button onClick={() => handleEdit(item)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>

                  <button onClick={() => handleDelete(item)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
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
