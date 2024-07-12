import React, { useState, useEffect } from "react";
import axios from "axios";

function Exercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/exercises")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the exercises!", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Exercise List</h1>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            Name: {exercise.name}, Target Body Part: {exercise.target},
            Equipment: {exercise.equipment}, Instructions:{" "}
            {exercise.instructions}, Image: {exercise.gifUrl}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Exercises;
