// src/App.tsx
// import React from 'react';
import './App.css';
import { Home } from './views/Home';
import Login from './views/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
