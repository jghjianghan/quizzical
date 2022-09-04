import React, { useEffect, useState } from "react";
import OptionState from "./OptionState";
import QuizEntry from "./QuizEntry";
// import { Buffer } from "buffer";

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function decodeData(str) {
  return decodeURIComponent(str);
}

function QuizPage() {
  const [quizes, setquizes] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState();

  useEffect(() => {
    const apiURL =
      "https://opentdb.com/api.php?amount=5&encode=url3986&type=multiple";
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setquizes(
          data.results.map((result) => {
            const correctAnswer = decodeData(result.correct_answer);
            const shuffledOptions = shuffleArray([
              correctAnswer,
              ...result.incorrect_answers.map((ans) => decodeData(ans)),
            ]);
            return {
              question: decodeData(result.question),
              correctAnswer,
              answers: shuffledOptions.map((option) => ({
                state: OptionState.NOT_SELECTED,
                value: option,
              })),
              selectedAnswer: "",
            };
          })
        );
      });
  }, []);

  function answerSelected(quizNo, answer) {
    if (isChecked) return;

    setquizes((prev) =>
      prev.map((quiz, idx) => {
        if (idx == quizNo) {
          quiz.selectedAnswer = answer;
          quiz.answers = quiz.answers.map((qanswer) =>
            qanswer.value === answer
              ? {
                  ...qanswer,
                  state: OptionState.SELECTED,
                }
              : {
                  ...qanswer,
                  state: OptionState.NOT_SELECTED,
                }
          );
        }
        return quiz;
      })
    );
  }

  function checkAnswers() {
    if (isChecked) return;

    let countScore = 0;
    setIsChecked(true);

    for (let quiz of quizes) {
      if (quiz.correctAnswer === quizes.selectedAnswer) {
        countScore++;
      }
    }

    setScore(countScore);

    setquizes((prev) =>
      prev.map((quiz) => {
        quiz.answers = quiz.answers.map((qanswer) => {
          const newAnswer = { ...qanswer };
          switch (newAnswer.state) {
            case OptionState.SELECTED:
              if (newAnswer.value === quiz.correctAnswer) {
                newAnswer.state = OptionState.CHECKED_CORRECT;
              } else {
                newAnswer.state = OptionState.CHECKED_WRONG;
              }
              break;
            case OptionState.NOT_SELECTED:
              if (newAnswer.value === quiz.correctAnswer) {
                newAnswer.state = OptionState.NOT_SELECTED_CORRECT;
              } else {
                newAnswer.state = OptionState.CHECKED_NOT_SELECTED;
              }
              break;
          }
          return newAnswer;
        });

        return quiz;
      })
    );
  }

  return (
    <div className="quiz-container">
      {quizes &&
        quizes.map((quiz, idx) => (
          <QuizEntry
            key={quiz.question}
            question={quiz.question}
            options={quiz.answers}
            selectOptionHandler={(answer) => answerSelected(idx, answer)}
          />
        ))}

      <button id="submit-button" onClick={checkAnswers}>
        Check answers
      </button>
    </div>
  );
}

export default QuizPage;
