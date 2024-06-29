// src/components/UserRegistration.js
import React, { useState } from 'react';
import axios from 'axios';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    height: '',
    weight: '',
    bodyType: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/register', formData)
      .then(response => {
        alert('User registered');
      })
      .catch(error => {
        alert('Error registering user');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="height" placeholder="Height" onChange={handleChange} />
      <input type="text" name="weight" placeholder="Weight" onChange={handleChange} />
      <input type="text" name="bodyType" placeholder="Body Type" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default UserRegistration;
