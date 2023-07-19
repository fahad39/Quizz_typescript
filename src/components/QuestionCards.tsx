import React from "react";

type Props = {
  question: string;
  answer: string[];
  callback: any;
  userAnswer: any;
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
    <div>
      <p className="number">
        Question : {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answer.map((answer, index) => (
          <div key={index}>
            <button disabled={userAnswer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionCards;
