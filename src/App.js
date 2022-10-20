import React, { useState } from "react";
import FlashcardList from "./components/FlashcardList";
import Header from "./components/Header";
import { Circles } from "react-loader-spinner";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  console.log(flashcards);
  return (
    <div className="container">
      <Header
        options={options}
        setOptions={setOptions}
        decodeString={decodeString}
        setFlashcards={setFlashcards}
        setLoading={setLoading}
        loading={loading}
      />
      {loading ? (
        <div className="loading">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            className="loading"
          />
        </div>
      ) : (
        <div className="app">
          <FlashcardList flashcards={flashcards} />
        </div>
      )}
    </div>
  );
}

export default App;
