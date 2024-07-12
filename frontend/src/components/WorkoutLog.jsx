import React, { useState } from "react";
import axios from "axios";
import Exercises from "./Exercises"; // Import the Exercises component

const WorkoutLog = ({ username }) => {
  const [workout, setWorkout] = useState({
    Name: "",
    Target: "",
    Equipment: "",
    calories: "",
  });

  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/log-workout", { username, workout })
      .then((response) => {
        alert("Workout logged");
      })
      .catch((error) => {
        alert("Error logging workout");
      });
  };

  return (
    <div>
      <Exercises />
      <h2>Log Your Workout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Target"
          placeholder="Target"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Equipment"
          placeholder="Equipment"
          onChange={handleChange}
        />
        <input
          type="text"
          name="calories"
          placeholder="Calories Burned"
          onChange={handleChange}
        />
        <button type="submit">Log Workout</button>
      </form>
    </div>
  );
};

export default WorkoutLog;
