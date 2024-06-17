import React, { useEffect, useState } from 'react';

const StartPage = ({ onStart }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Check if full-screen mode is enabled
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  // Request full-screen mode
  const requestFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
    }
  };

  const handleStartQuiz = () => {
    if (isFullScreen) {
      localStorage.setItem('quizStarted', 'true');
      onStart();
    } else {
      requestFullScreen();
    }
  };

  return (
    <div>
      {!isFullScreen && (
        <div className="fullscreen-popup">
          <p>Please enter full-screen mode to start the quiz.</p>
          <button onClick={requestFullScreen}>Enter Full-Screen</button>
        </div>
      )}
      <h1>Welcome to the Country Capitals Quiz</h1>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default StartPage;
