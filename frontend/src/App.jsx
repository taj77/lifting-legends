import React, { useState } from 'react';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import WorkoutLog from './components/WorkoutLog';
import WorkoutHistory from './components/WorkoutHistory';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <div>
      <h1>Lifting Legends</h1>
      {!username && (
        <>
          <UserRegistration />
          <UserLogin setUsername={setUsername} />
        </>
      )}
      {username && (
        <>
          <WorkoutLog username={username} />
          <WorkoutHistory username={username} />
        </>
      )}
    </div>
  );
};

export default App;
