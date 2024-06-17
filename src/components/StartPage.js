import React from 'react';

const StartPage = ({ onStart }) => {
  const handleClick = () => {
    const quizState = localStorage.getItem('currentQuestion');
    if (quizState !== null && quizState !== undefined) {
      // Quiz state found in localStorage, continue quiz
      onStart(true); // Pass true to indicate continuing quiz
    } else {
      // No quiz state found, start new quiz
      onStart(false); // Pass false to indicate starting new quiz
    }
  };

  return (
    <div>
      <h1>Welcome to the Country Capitals Quiz</h1>
      <button onClick={handleClick}>
        {localStorage.getItem('currentQuestion') ? 'Continue Quiz' : 'Start Quiz'}
      </button>
    </div>
  );
};

export default StartPage;
