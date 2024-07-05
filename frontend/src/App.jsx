import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import WorkoutLog from './components/WorkoutLog';
import WorkoutHistory from './components/WorkoutHistory';

const App = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (loggedInUsername) => {
    setUsername(loggedInUsername);
    localStorage.setItem('username', loggedInUsername);
  }

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('username');
  }

  return (
    <Router>

    <div>
      <h1>Lifting Legends</h1>
      {!username ? (
        <>
          <UserRegistration handleLogin={handleLogin} />
          <UserLogin handleLogin={handleLogin} />
        </>
      ) : (
        <>
        <button onClick={handleLogout}>Logout</button>
        <nav>
          <ul>
            <li>
              <Link to="/log-workout">Log Workout</Link>
            </li>
            <li>
              <Link to={`/workout-history/${username}`}>Workout History</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/log-workout" element={<WorkoutLog username={username} />} />
          <Route path="/workout-history/:username" element={<WorkoutHistory username={username} />} />
          <Route path="*" element={<Navigate to="/log-workout" />} />
        </Routes>
      </>
    )}
    </div>
  </Router>
  );
};

export default App;
