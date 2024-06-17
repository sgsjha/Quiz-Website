// src/Quiz.js
import React, { useState, useEffect } from 'react';
import quizData from '/Users/sarthakjha/Uni/projects/quizapp/Quiz-Website/src/quiz.json';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes

   // Function to handle timer countdown
   useEffect(() => {
    if (timeLeft === 0) {
      // Time's up, show score
      setShowScore(true);
    } else {
      // Decrease time left every second
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      // Clear timeout on component unmount or when timeLeft changes to 0
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time left into minutes and seconds
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
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
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setShowScore(false);
    setTimeLeft(600); // Reset timer to 10 minutes
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
