import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";
import WorkoutLog from "./components/WorkoutLog";
import WorkoutHistory from "./components/WorkoutHistory";
import ShareProgress from "./components/ShareProgress";
import GroupProgress from "./components/GroupProgress";

const App = () => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (loggedInUsername) => {
    setUsername(loggedInUsername);
    localStorage.setItem("username", loggedInUsername);
  };

  const handleLogout = () => {
    setUsername("");
    localStorage.removeItem("username");
    navigate("/"); // Redirect to home URL
  };

  return (
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
          <button onClick={() => navigate("/log-workout")}>Log Workout</button>
          <button onClick={() => navigate(`/workout-history/${username}`)}>
            Workout History
          </button>
          <button onClick={() => navigate("/share-progress")}>
            Share Progress
          </button>
          <button onClick={() => navigate("/group-progress")}>
            Group Progress
          </button>
          <Routes>
            <Route
              path="/log-workout"
              element={<WorkoutLog username={username} />}
            />
            <Route
              path="/workout-history/:username"
              element={<WorkoutHistory username={username} />}
            />
            <Route
              path="/share-progress"
              element={
                <ShareProgress
                  username={username}
                  setGroupName={setGroupName}
                />
              }
            />
            <Route
              path="/group-progress"
              element={<GroupProgress groupName={groupName} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppWrapper;
