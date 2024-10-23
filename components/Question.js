import React from "react";

function Question({ question, selectedAnswer, onAnswerSelection }) {
  const handleAnswerClick = (answer) => {
    onAnswerSelection(answer);
  };

  return (
    <div>
      <p>{question.question}</p>
      <div className="category">
        {question.options.map((option) => (
          <label key={option} style={{ display: "block" }}>
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => handleAnswerClick(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;
