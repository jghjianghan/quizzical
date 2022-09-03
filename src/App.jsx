import { useState } from "react";
import blueBlob from "./assets/blue-blob.svg";
import yellowBlob from "./assets/yellow-blob.svg";
import "./App.css";
import TitlePage from "./pages/TitlePage";
import QuizPage from "./pages/quiz/QuizPage";

function App() {
  const [isTitlePage, setIsTitlePage] = useState(false);
  // const [isTitlePage, setIsTitlePage] = useState(true);

  const toQuiz = () => setIsTitlePage(false);
  const toTitle = () => setIsTitlePage(true);

  return (
    <div className="App">
      <img id="blue-blob" className="blob" src={blueBlob} />
      <img id="yellow-blob" className="blob" src={yellowBlob} />

      {isTitlePage ? (
        <TitlePage startHandler={toQuiz} />
      ) : (
        <QuizPage playAgainHandler={toTitle} />
      )}
    </div>
  );
}

export default App;
