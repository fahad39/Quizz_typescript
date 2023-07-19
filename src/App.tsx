import React, { useState } from "react";
import QuestionCards from "./components/QuestionCards";
import { Difficulty, QuestionState, fetchQuizQuestions } from "./api/Api";

const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<QuestionState[]>([]);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [number, setNumber] = useState(0);

  const startTrivia = async () => {
    console.log("inside start trivia");
    setLoading(true);
    setGameOver(false);
    try {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.Easy
      );
      console.log("new ", newQuestions);
      setQuestion(newQuestions);
      setScore(0);
      setUserAnswer([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      console.log("error has occurred while fetching questions");
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : (
        <></>
      )}
      {!gameOver && <p className="score">Score: </p>}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCards
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={question[number].question}
          answer={question[number].answer}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswer.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
