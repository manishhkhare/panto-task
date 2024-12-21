import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element=<Login/>/>
        <Route path="/profile" element=<Profile/> />
      </Routes>
    </Router>
  );
};

export default App;
