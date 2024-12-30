import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home.jsx';
import Create from './Create.jsx';
import Read from './Read.jsx';
import Edit from './Edit.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
   <Routes>

    <Route path='/' element={<Home/>} /> 
    <Route path='/create' element={<Create/>} /> 
    <Route path='/read/:id' element={<Read/>} /> 
    <Route path='/edit/:id' element={<Edit/>} /> 
    
   </Routes>
   </BrowserRouter>
  );
}

export default App;
