import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Education from './pages/Education';

import Certifications from './pages/Certifications';
import './App.css';
import Analytics, { initGA } from './components/common/Analytics';

// Initialize Google Analytics
// You must replace "YOUR_MEASUREMENT_ID" in src/components/common/Analytics.jsx
initGA();

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Analytics />
      <Navbar />
      <div className="app-container">
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/education" element={<Education />} />

              <Route path="/certifications" element={<Certifications />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
