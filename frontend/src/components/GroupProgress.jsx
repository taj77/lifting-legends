// src/components/GroupProgress.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const GroupProgress = ({ groupName }) => {
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/group-progress/${groupName}`
        );
        setProgress(response.data);
      } catch (err) {
        console.error("Failed to fetch group progress:", err);
        setError(err.message);
      }
    };

    if (groupName) {
      fetchGroupProgress();
    }
  }, [groupName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Group Progress for {groupName}</h2>
      <ul>
        {progress.map((entry, index) => (
          <li key={index}>
            User: {entry.username}, Name: {entry.workout.Name}, Target:{" "}
            {entry.workout.Target}, Equipment: {entry.workout.Equipment},
            Calories: {entry.workout.calories}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupProgress;
