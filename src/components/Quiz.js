// src/Quiz.js
//import quizData from '/Users/sarthakjha/Uni/projects/quizapp/Quiz-Website/src/quiz.json';

import React, { useState, useEffect } from 'react';
import quizData from '/Users/sarthakjha/Uni/projects/quizapp/Quiz-Website/src/quiz.json';

const Quiz = () => {
  // Initialize state variables with localStorage values or default values
  const initialCurrentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 0;
  const initialSelectedOption = localStorage.getItem('selectedOption') || '';
  const initialScore = parseInt(localStorage.getItem('score')) || 0;
  const initialShowScore = localStorage.getItem('showScore') === 'true' || false;
  const initialTimeLeft = parseInt(localStorage.getItem('timeLeft')) || 600; // 600 seconds = 10 minutes
  const initialTimerExpired = localStorage.getItem('timerExpired') === 'true' || false;

  const [currentQuestion, setCurrentQuestion] = useState(initialCurrentQuestion);
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const [score, setScore] = useState(initialScore);
  const [showScore, setShowScore] = useState(initialShowScore);
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [timerExpired, setTimerExpired] = useState(initialTimerExpired);

  // Update localStorage whenever state variables change
  useEffect(() => {
    localStorage.setItem('currentQuestion', currentQuestion.toString());
    localStorage.setItem('selectedOption', selectedOption);
    localStorage.setItem('score', score.toString());
    localStorage.setItem('showScore', showScore.toString());
    localStorage.setItem('timeLeft', timeLeft.toString());
    localStorage.setItem('timerExpired', timerExpired.toString());
  }, [currentQuestion, selectedOption, score, showScore, timeLeft, timerExpired]);

  // Function to handle timer countdown
  useEffect(() => {
    let timer = null;
    if (!timerExpired) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            setTimerExpired(true);
            setShowScore(true);
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    // Clear timeout on component unmount or when timer expires
    return () => clearTimeout(timer);
  }, [timeLeft, timerExpired]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizData.quiz[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.quiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      setTimerExpired(true); // Stop the timer when quiz is completed
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setShowScore(false);
    setTimeLeft(600); // Reset timer to 10 minutes
    setTimerExpired(false); // Reset timer expired state
  };

  // Format time left into minutes and seconds
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <div>
        <h2>Time Left: {formatTime()}</h2>
      </div>
      {showScore ? (
        <div>
          <h1>Your Score: {score} / {quizData.quiz.length}</h1>
        </div>
      ) : (
        <div>
          <h1>{quizData.quiz[currentQuestion].question}</h1>
          <div>
            {quizData.quiz[currentQuestion].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quiz-option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
          <button onClick={handleNextQuestion} disabled={!selectedOption}>
            Next
          </button>
        </div>
      )}
      <button onClick={handleRestartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Quiz;
