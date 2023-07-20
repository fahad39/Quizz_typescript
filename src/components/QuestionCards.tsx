import React from "react";
import { AnswerObject } from "../App";
import { ButtonWrapper, QuestionWrapper } from "../styles/QuestionCard.style";

type Props = {
  question: string;
  answer: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

function QuestionCards({
  question,
  answer,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}: Props) {
  return (
    <QuestionWrapper>
      <p className="number">
        Question : {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answer.map((answer, index) => (
          <ButtonWrapper
            correct={userAnswer?.correctAnswer === answer ? true : false}
            userClicked={userAnswer?.answer === answer ? true : false}
            key={index}
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </QuestionWrapper>
  );
}

export default QuestionCards;
