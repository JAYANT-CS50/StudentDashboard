import { AllRoutes} from "./routes/AllRoutes";
import {useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useDispatch } from 'react-redux';
import { add } from './store/dataSlice';
import axios from 'axios';



function App() {
  const url = 'http://127.0.0.1:8000/dashboard/subjects/';
  const [subData, setSubData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log(response.data);
        setSubData(response.data);
        dispatch(add(response.data)); // Move dispatch inside the useEffect hook
      })
      .catch(error => {
        console.error(error);
      });
  }, [url, formSubmitted, dispatch]);

  return (
    <div className='App'>
      <Header />
      <AllRoutes subData={subData} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} setSubData={setSubData}/>
      <Footer />
    </div>
  );
}

export default App;

