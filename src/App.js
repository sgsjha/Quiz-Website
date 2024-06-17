import React, { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import StartPage from './components/StartPage';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {quizStarted ? <Quiz /> : <StartPage onStart={handleStartQuiz} />}
      </header>
    </div>
  );
}

export default App;
