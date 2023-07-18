import React from "react";
type Props = {
  question: string;
  answer: string[];
  callback: any;
  userAnswer: string;
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
  return <div>QuestionCards</div>;
}

export default QuestionCards;
