import { Routes, Route } from 'react-router-dom';
import { Chapters } from '../pages/Chapters.js';
import { Subjects } from '../pages/Subjects.js';
import { Dashboard } from '../pages/Dashboard.js';



export const AllRoutes = ({subData, setSubData, formSubmitted, setFormSubmitted}) => {
  return (
    <>
    <Routes>
      <Route path="/subjects" element={<Subjects subData={subData} setSubData={setSubData} />} />
      <Route path="/chapters" element={<Chapters subData={subData} setFormSubmitted={setFormSubmitted} formSubmitted={formSubmitted}/>} />
      <Route path="/dashboard" element={ <Dashboard /> } />

    </Routes>
    </>
    
  )
}
