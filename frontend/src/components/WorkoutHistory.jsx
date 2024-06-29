// src/components/WorkoutHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutHistory = ({ username }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/workout-history/${username}`)
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        alert('Error fetching workout history');
      });
  }, [username]);

  return (
    <div>
      <h2>Workout History</h2>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            Exercise: {workout.exercise}, Weight: {workout.weight}, Duration: {workout.duration}, Calories Burned: {workout.calories}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutHistory;
