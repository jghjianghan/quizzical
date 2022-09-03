import React, { useEffect, useState } from "react";
import QuizEntry from "./QuizEntry";

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

function QuizPage() {
  const [quizes, setquizes] = useState();

  useEffect(() => {
    const apiURL = "https://opentdb.com/api.php?amount=10";
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setquizes(
          data.results.map((result) => ({
            question: result.question,
            correctAnswer: result.correct_answer,
            answers: shuffleArray([
              result.correct_answer,
              ...result.incorrect_answers,
            ]),
          }))
        );
      });
  }, []);

  console.log(quizes);

  return (
    <div className="quiz-container">
      <QuizEntry />
      <button id="submit-button">Check answers</button>
    </div>
  );
}

export default QuizPage;
