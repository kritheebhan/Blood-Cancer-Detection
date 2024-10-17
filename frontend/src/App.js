import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Model from "./pages/model";

function App() {
  return (
    <Router>
      <>
        {/* Navbar is outside of Routes but inside Router */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model" element={<Model />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
