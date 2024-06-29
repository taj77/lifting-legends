// src/components/WorkoutLog.js
import React, { useState } from 'react';
import axios from 'axios';

const WorkoutLog = ({ username }) => {
  const [workout, setWorkout] = useState({
    exercise: '',
    weight: '',
    duration: '',
    calories: ''
  });

  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/log-workout', { username, workout })
      .then(response => {
        alert('Workout logged');
      })
      .catch(error => {
        alert('Error logging workout');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="exercise" placeholder="Exercise" onChange={handleChange} required />
      <input type="text" name="weight" placeholder="Weight" onChange={handleChange} />
      <input type="text" name="duration" placeholder="Duration" onChange={handleChange} />
      <input type="text" name="calories" placeholder="Calories Burned" onChange={handleChange} />
      <button type="submit">Log Workout</button>
    </form>
  );
};

export default WorkoutLog;
