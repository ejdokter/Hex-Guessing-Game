import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState();
  const [answers, setAnswers] = useState();
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);

  function getRandomColor() {
    const hex = "01234567890abcdef".split("");

    const result = new Array(6)
      .fill("")
      .map(() => hex[Math.floor(Math.random() * hex.length)])
      .join("");

    return `#${result}`;
  }

  function getColor() {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  }

  function handleSelection(answer) {
    if (answer === color) {
      setCorrect(true);
      setScore(score + 1);
      getColor();
    } else {
      setCorrect(false);
      console.log("incorrect", color);
    }
  }

  useEffect(() => {
    getColor();
  }, []);

  return (
    <div className="app">
      <div className="score">Score: {score}</div>
      <div className="color-box" style={{ background: color }}></div>
      <div className="button-container">
        {answers?.map((answer) => (
          <button key={answer} onClick={() => handleSelection(answer)}>
            {answer}
          </button>
        ))}
      </div>
      {correct && <div className="correct">Correct!</div>}
      {!correct && <div className="incorrect">Incorrect</div>}
    </div>
  );
}

export default App;
