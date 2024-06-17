// src/StartPage.js
import React from 'react';

const StartPage = ({ onStart }) => {
  return (
    <div>
      <h1>Welcome to the Country Capitals Quiz</h1>
      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
};

export default StartPage;
