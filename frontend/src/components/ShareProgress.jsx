// src/components/ShareProgress.jsx
import React, { useState } from "react";
import axios from "axios";

const ShareProgress = ({ username, setGroupName }) => {
  const [localGroupName, setLocalGroupName] = useState("");
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

  const handleGroupNameChange = (e) => {
    const groupName = e.target.value;
    setLocalGroupName(groupName);
    setGroupName(groupName); // Update the parent state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/share-progress", {
        groupName: localGroupName,
        username,
        workout,
      })
      .then((response) => {
        alert("Progress shared");
      })
      .catch((error) => {
        alert("Error sharing progress");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Group Name"
        value={localGroupName}
        onChange={handleGroupNameChange}
        required
      />
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
      <button type="submit">Share Progress</button>
    </form>
  );
};

export default ShareProgress;
