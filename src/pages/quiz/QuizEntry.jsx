import React from "react";
import OptionButton from "./OptionButton";
import OptionState from "./OptionState";

function QuizEntry(props) {
  const { question, options, selectOptionHandler } = props;

  return (
    <div className="quiz-entry">
      <h1>{question}</h1>
      <div className="option-container">
        {options &&
          options.map((option) => (
            <OptionButton
              key={option.value}
              text={option.value}
              optionState={option.state}
              clickHandler={() => selectOptionHandler(option.value)}
            />
          ))}
      </div>
      <hr />
    </div>
  );
}

export default QuizEntry;
