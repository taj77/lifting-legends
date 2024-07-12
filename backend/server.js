const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createClient } = require("redis");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => {
  console.error("Redis error: ", err);
});

client.connect().then(() => {
  console.log("Connected to Redis...");
});

// Root URL route
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// Base URL for the ExerciseDB API
const EXERCISE_API_URL = "https://exercisedb.p.rapidapi.com/exercises";

// Set up the headers for the ExerciseDB API
const API_HEADERS = {
  "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  "X-RapidAPI-Key": process.env.RAPID_API_KEY,
};

// Endpoint to fetch exercises
app.get("/api/exercises", async (req, res) => {
  try {
    const response = await axios.get(EXERCISE_API_URL, {
      headers: API_HEADERS,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from ExerciseDB API:", error);
    res
      .status(500)
      .json({ message: "Error fetching data from ExerciseDB API" });
  }
});

// User Registration
app.post("/register", async (req, res) => {
  const { username, password, height, weight, bodyType } = req.body;
  try {
    await client.hSet(`user:${username}`, {
      password: password,
      height: height,
      weight: weight,
      bodyType: bodyType,
    });
    res.status(200).send("User registered");
  } catch (err) {
    res.status(500).send(err);
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const storedPassword = await client.hGet(`user:${username}`, "password");
    if (storedPassword !== password) {
      res.status(401).send("Unauthorized");
    } else {
      res.status(200).send("Login successful");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create Workout Group
app.post("/create-group", async (req, res) => {
  const { groupName, members } = req.body;
  try {
    await client.sAdd(`group:${groupName}`, members);
    res.status(200).send("Group created");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Log Workout
app.post("/log-workout", async (req, res) => {
  const { username, workout } = req.body;
  try {
    await client.rPush(`workout:${username}`, JSON.stringify(workout));
    res.status(200).send("Workout logged");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get Workout History
app.get("/workout-history/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const workouts = await client.lRange(`workout:${username}`, 0, -1);
    res.status(200).send(workouts.map(JSON.parse));
  } catch (err) {
    res.status(500).send(err);
  }
});

// Share Progress in Group
app.post("/share-progress", async (req, res) => {
  const { groupName, username, workout } = req.body;
  try {
    await client.rPush(
      `group:${groupName}:progress`,
      JSON.stringify({ username, workout })
    );
    res.status(200).send("Progress shared");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get Group Progress
app.get("/group-progress/:groupName", async (req, res) => {
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
