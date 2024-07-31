import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import NavBar from './components/NavBar';
import DriverStandings from './components/DriverStandings';
import ConstructorStandings from './components/ConstructorStandings'; // Import your ConstructorStandings component
import HomePage from './components/HomePage';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Default route for Home Page */}
        <Route path="/drivers" element={<DriverStandings />} />
        <Route path="/constructors" element={<ConstructorStandings />} /> {/* Route to ConstructorStandings */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect undefined routes to the Home Page */}
      </Routes>
    </Router>
  );
};

export default App;