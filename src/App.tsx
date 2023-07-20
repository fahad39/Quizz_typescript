import React, { useState } from "react";
import QuestionCards from "./components/QuestionCards";
import { Difficulty, QuestionState, fetchQuizQuestions } from "./api/Api";
import { GlobalStyle, Wrapper } from "./styles/App.style";

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
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
    setLoading(true);
    setGameOver(false);
    try {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.Easy
      );
      setQuestion(newQuestions);
      setScore(0);
      setUserAnswer([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      console.log("error has occurred while fetching questions");
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //get user answer
      const answer = e.currentTarget.value;
      //check answer against correct option
      const correct = question[number].correct_answer === answer;
      //add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // save answer in the array for user answers
      const answerObject = {
        question: question[number].question,
        answer,
        correct,
        correctAnswer: question[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //move onto the next question if not on the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : (
          <></>
        )}
        {!gameOver && <p className="score">Score: {score}</p>}
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
      </Wrapper>
    </>
  );
}

export default App;
