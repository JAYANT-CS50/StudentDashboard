import { AllRoutes } from "./routes/AllRoutes";
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useDispatch } from 'react-redux';
import { add } from './store/dataSlice';
import axiosInstance from './axiosConfig';


function App() {
  const [subData, setSubData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');


  useEffect(() => {
    if (accessToken) {
      axiosInstance.get('subject/')
        .then(response => {
          console.log(response.data);
          setSubData(response.data);
          dispatch(add(response.data)); // Move dispatch inside the useEffect hook
        })
        .catch(error => {
          console.error(error);
        });

    }
  }, [accessToken]);






  return (
    <div className='App'>
      <Header />
      <AllRoutes subData={subData} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} setSubData={setSubData}/>
      <Footer />
    </div>
  );
}

export default App;
