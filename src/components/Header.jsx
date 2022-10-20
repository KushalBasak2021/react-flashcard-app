import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = ({
  options,
  setOptions,
  decodeString,
  setFlashcards,
  setLoading,
  loading,
}) => {
  const [category, setCategory] = useState(0);
  const [amount, setAmount] = useState(10);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => setOptions(res.data.trivia_categories));
  }, [setOptions]);

  function handleClick(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`
      )
      .then((res) => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
        setLoading(false);
      });
  }
  return (
    <div>
      <form className="header">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" onChange={(e) => setCategory(e.target.value)}>
            {options.length === 0 ? (
              <option>Categories are Loading</option>
            ) : (
              options.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="question-no">Number of Questions</label>
          <input
            type="number"
            id="question-no"
            min="1"
            max="20"
            step="1"
            defaultValue={10}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Generate</button>
      </form>
    </div>
  );
};

export default Header;
