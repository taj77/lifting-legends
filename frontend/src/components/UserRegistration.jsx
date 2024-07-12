import axios from "axios";
import React, { useState } from "react";

const UserRegistration = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    height: "",
    weight: "",
    bodyType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      if (response.status === 200) {
        handleLogin(formData.username);
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="height"
        placeholder="Height"
        onChange={handleChange}
      />
      <input
        type="text"
        name="weight"
        placeholder="Weight"
        onChange={handleChange}
      />
      <input
        type="text"
        name="bodyType"
        placeholder="Body Type"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default UserRegistration;
