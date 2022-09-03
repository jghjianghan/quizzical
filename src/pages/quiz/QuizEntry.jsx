import React from "react";

function QuizEntry(props) {
  const { question, options, selectOptionHandler } = props;
  return (
    <div>
      <h1>{question}</h1>
      {options && options.map((option) => <button>{option}</button>)}
    </div>
  );
}

export default QuizEntry;
