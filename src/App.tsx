import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import './App.css';
import MainComp from './Component/MainComp';

function App() {
  return (
    <Routes>
          <Route path="/" element={<MainComp />} />
          </Routes>
  );
}

export default App;
