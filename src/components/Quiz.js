// src/Quiz.js
import React, { useState } from 'react';
import quizData from '/Users/sarthakjha/Uni/projects/quizapp/src/quiz.json';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

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
  };

  return (
    <div>
      {showScore ? (
        <div>
          <h1>Your Score: {score} / {quizData.quiz.length}</h1>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
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
    </div>
  );
};

export default Quiz;
