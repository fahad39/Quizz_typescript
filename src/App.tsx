import React from "react";
import QuestionCards from "./components/QuestionCards";

function App() {
  const startTrivia = async () => {};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      <p className="score">Score: </p>
      <p>Loading Questions ...</p>
      {/* <QuestionCards /> */}
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default App;

// https://opentdb.com/api.php?amount=10
