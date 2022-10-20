import React, { useState } from "react";

const Flashcard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  return (
    <div
      className={`flashcard ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front">
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option, index) => (
            <div className="flashcard-option" key={index}>
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="back">{flashcard.answer}</div>
    </div>
  );
};

export default Flashcard;
