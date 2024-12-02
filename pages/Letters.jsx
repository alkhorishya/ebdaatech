import React from "react";
import "../css/Landing.css";
import { Container } from "react-bootstrap";

const Letters = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const playSound = (letter) => {
    speechSynthesis.cancel(); // Cancel ongoing speech
    const utterance = new SpeechSynthesisUtterance(letter);
    console.log("playword:", letter);
    speechSynthesis.speak(utterance);
  };

  return (
    <Container>
      <h1>تعلم الحروف</h1>
      <div className="grid">
        {letters.map((letter) => (
          <div
            className="letter"
            key={letter}
            onClick={() => playSound(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Letters;
