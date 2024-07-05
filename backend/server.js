const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = createClient({
  url: 'redis://localhost:6379'
});

client.on('error', (err) => {
  console.error('Redis error: ', err);
});

client.connect().then(() => {
  console.log('Connected to Redis...');
});

// Root URL route
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// User Registration
app.post('/register', async (req, res) => {
  const { username, password, height, weight, bodyType } = req.body;
  try {
    await client.hSet(`user:${username}`, {
      password: password,
      height: height,
      weight: weight,
      bodyType: bodyType
    });
    res.status(200).send('User registered');
  } catch (err) {
    res.status(500).send(err);
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const storedPassword = await client.hGet(`user:${username}`, 'password');
    if (storedPassword !== password) {
      res.status(401).send('Unauthorized');
    } else {
      res.status(200).send('Login successful');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create Workout Group
app.post('/create-group', async (req, res) => {
  const { groupName, members } = req.body;
  try {
    await client.sAdd(`group:${groupName}`, members);
    res.status(200).send('Group created');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Log Workout
app.post('/log-workout', async (req, res) => {
  const { username, workout } = req.body;
  try {
    await client.rPush(`workout:${username}`, JSON.stringify(workout));
    res.status(200).send('Workout logged');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get Workout History
app.get('/workout-history/:username', async (req, res) => {
  const { username } = req.params;

  // Simulate fetching workout data from a database or other source
  const workouts = [
    { exercise: 'Squats', weight: 100, duration: '30 mins', calories: 200 },
    { exercise: 'Bench Press', weight: 80, duration: '20 mins', calories: 150 },
    // Add more workout data as needed
  ];

  res.json(workouts); // Ensure the response is JSON and is an array

  try {
    const workouts = await client.lRange(`workout:${username}`, 0, -1);
    res.status(200).send(workouts.map(JSON.parse));
  } catch (err) {
    res.status(500).send(err);
  }
});

// Share Progress in Group
app.post('/share-progress', async (req, res) => {
  const { groupName, username, workout } = req.body;
  try {
    await client.rPush(`group:${groupName}:progress`, JSON.stringify({ username, workout }));
    res.status(200).send('Progress shared');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get Group Progress
app.get('/group-progress/:groupName', async (req, res) => {
  const { groupName } = req.params;
  try {
    const progress = await client.lRange(`group:${groupName}:progress`, 0, -1);
    res.status(200).send(progress.map(JSON.parse));
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
