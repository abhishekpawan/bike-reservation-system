import './App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom"
import Home from './Components/Home';
import Login from './Components/Login&Register/Login';
import Register from './Components/Login&Register/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  );
}

export default App;
