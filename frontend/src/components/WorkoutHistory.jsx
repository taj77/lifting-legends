import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkoutHistory = ({ username }) => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/workout-history/${username}`
        );
        setWorkouts(response.data);
      } catch (err) {
        console.error("Failed to fetch workout history:", err);
        setError(err.message);
      }
    };

    fetchWorkouts();
  }, [username]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Workout History for {username}</h2>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            Name: {workout.Name}, Target: {workout.Target}, Equipment:{" "}
            {workout.Equipment}, Calories: {workout.calories}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutHistory;
