import React from "react";

function TitlePage(props) {
  return (
    <div className="title-container">
      <h1>Quizzical</h1>
      <p>Your everyday trivia quiz</p>
      <button onClick={props.startHandler}>Start quiz</button>
    </div>
  );
}

export default TitlePage;
