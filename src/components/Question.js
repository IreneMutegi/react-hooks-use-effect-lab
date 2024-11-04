import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onAnswered(false); // Call onAnswered with `false` when time runs out
      setTimeRemaining(10); // Reset time for the next question
      return; // Exit the effect early if time is up
    }

    // Set up a timeout to decrease timeRemaining by 1 after 1 second
    const timeoutId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer when an answer is clicked
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
