# lifting-legends

## Step 1: Set Up Your Development Environment

- **Install Node.js and npm:**
  - Download and install Node.js from [nodejs.org](https://nodejs.org/). This will also install npm (Node Package Manager).

- **Install Redis:**
  - Follow the installation instructions for Redis on your operating system from the [Redis documentation](https://redis.io/download).

- **Install Git:**
  - If you haven't already, install Git from [git-scm.com](https://git-scm.com/).

- **Languages Used:**
  - **JavaScript:** Primary language for both backend (Node.js) and frontend (React).
  - **HTML:** Markup language for structuring the frontend.
  - **CSS:** Styling language for designing the frontend.

- **Libraries and Tools Used:**
  - **Node.js:** JavaScript runtime [nodejs.org](https://nodejs.org/)
  - **Express:** Web framework for Node.js [expressjs.com](https://expressjs.com/)
  - **Redis:** In-memory data structure store [redis.io](https://redis.io/)
  - **Axios:** Promise-based HTTP client [axios-http.com](https://axios-http.com/)
  - **React:** JavaScript library for building user interfaces [reactjs.org](https://reactjs.org/)
  - **dotenv:** Module to load environment variables [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)


## Step 2: Clone the Project Repository

- **Clone the repository and navigate to the project directory:**
  1. `git clone <repository-url>`
  2. `cd <repository-directory>`

Replace `<repository-url>` with the URL of your project's repository and `<repository-directory>` with the name of the directory created by the clone command.

## Step 3: Set Up the Backend (Node.js with Express and Redis)

- **Navigate to the backend directory:**
  - `cd backend`

- **Install dependencies:**
  - `npm install`

- **Create a `.env` file in the backend directory:**

  ```plaintext```
  RAPIDAPI_KEY=your_rapidapi_key
  REDIS_URL=redis://localhost:6379
  PORT=3000
  
Replace `your_rapidapi_key` with your actual RapidAPI key.

### Start Redis server:

Follow the instructions specific to your operating system to start the Redis server. Typically, you can start Redis with:
`bash`
redis-server

### Start the backend server:

```bash```
node server.js

### Step 4: Set Up the Frontend (React)

#### Navigate to the frontend directory:

```bash```
cd ../frontend

### Install dependencies:

```bash```
npm install

### Start the frontend development server:

```bash```
npm start

This command should automatically open your default web browser and navigate to `http://localhost:3000`.
