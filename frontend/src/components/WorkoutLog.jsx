import React, { useState } from 'react';

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
    // Simulate logging a workout
    console.log(`Workout logged for ${username}:`, workout);
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
