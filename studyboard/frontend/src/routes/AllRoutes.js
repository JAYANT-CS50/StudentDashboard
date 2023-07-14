import { Routes, Route } from 'react-router-dom';
import { Chapters } from '../pages/Chapters.js';
import { Subjects } from '../pages/Subjects.js';
import { Dashboard } from '../pages/Dashboard.js';
import React from 'react';


export const AllRoutes = ({subData, setSubData, formSubmitted, setFormSubmitted}) => {
  return (
    <React.StrictMode>
    <Routes>
      <Route path="/subjects" element={<Subjects subData={subData} setSubData={setSubData} />} />
      <Route path="/chapters" element={<Chapters subData={subData} setFormSubmitted={setFormSubmitted} formSubmitted={formSubmitted}/>} />
      <Route path="/dashboard" element={ <Dashboard subData={subData} setSubData={setSubData} /> } />

    </Routes>
    </React.StrictMode>
    
  )
}
