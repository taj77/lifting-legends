// src/components/UserLogin.js
import React, { useState } from 'react';
import axios from 'axios';

const UserLogin = ({ setUsername }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/login', formData)
      .then(response => {
        alert('Login successful');
        setUsername(formData.username);
      })
      .catch(error => {
        alert('Error logging in');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default UserLogin;
