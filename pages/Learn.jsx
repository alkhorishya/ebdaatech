import "../css/learn.css";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as PlaySolid } from "../imgs/icons/play-solid.svg";
import { ReactComponent as Microphone } from "../imgs/icons/microphone-solid.svg";
import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import HomeButtonHeader from "../components/HomeButtonHeader";
import ApiServerClient from "../ApiServerClient";
import ReviewProgBar from "../components/ReviewProgBar";
import { ReactComponent as ArrowRight } from "../imgs/icons/arrow-right-solid.svg";
import AppContext from "../context/AppContext";

export default function Learn(props) {
  const wordClass = "";

  // States for the word, definition, and example
  const [word, setWord] = React.useState("");
  const [englishWord, setEnglishWord] = React.useState("");
  const [languageExample, setLanguageExample] = React.useState("");
  const [translatedExample, setTranslatedExample] = React.useState("");
  const [definition, setDefinition] = React.useState("");
  const [responseMessage, setResponseMessage] = React.useState("");

  // App context
  const { aVal } = useContext(AppContext);
  const { learnLanguage } = aVal;
  const language = learnLanguage.toString().toLowerCase();

  const knownLanguage = "english";

  const saveLearnedWord = async () => {
    try {
      const response = await ApiServerClient.saveLearnedWord(word);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomWord = async () => {
    try {
      const response = await ApiServerClient.getRandomWord();
      if (response.language && response.language[knownLanguage] && response.language[language]) {
        const newWordData = {
          index: props.questionIndex + 1,
          word: response.language[language].word,
          definition: response.language[knownLanguage].definition,
        };

        let newQuestions = [...props.questions];
        newQuestions[props.questionIndex] = newWordData;
        props.setQuestions(newQuestions);
        console.log(props.questions);

        setTranslatedExample(response.language[knownLanguage].example);
        setDefinition(response.language[knownLanguage].definition);
        setWord(response.language[language].word);
        setEnglishWord(response.language[knownLanguage].word);

        setLanguageExample(
          highlightWord(response.language[language].word, response.language[language].example)
        );
        setTranslatedExample(
          highlightWord(response.language[knownLanguage].word, response.language[knownLanguage].example)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  const playAudio = () => {
    speechSynthesis.cancel(); // Cancel ongoing speech
    const utterance = new SpeechSynthesisUtterance(word);
    console.log("playword:",word);
    speechSynthesis.speak(utterance);
  };

  const highlightWord = (word, languageExample) => {
    // Split the example into parts around the word variable
    const parts = languageExample.split(word);

    // Insert the highlighted word between each part
    const highlightedExample = parts.reduce((prev, curr, i) => {
      if (i === 0) {
        return [curr];
      } else {
        return [
          ...prev,
          <span
            key={i}
            className="highlight"
            style={{ color: "var(--main-purple)", fontWeight: "600" }}
          >
            {word}
          </span>,
          curr,
        ];
      }
    }, []);

    return highlightedExample;
  };

  // When microphone button is pressed, listen for user's response and compare to correct answer
  const useMicrophone = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
      console.log("Voice activated, please read the word");
      setResponseMessage(
        <span style={{ color: "green" }}>Voice activated, please read the word</span>
      );
    };

    recognition.onerror = function (event) {
      console.log("Error occurred in recognition: " + event.error);
      setResponseMessage(
        <span style={{ color: "red" }}>Error occurred in recognition: {event.error}</span>
      );
    };

    recognition.onresult = function (event) {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;

      console.log(transcript);
      if (transcript.toLowerCase().includes(word.toLowerCase())) {
        console.log("Word heard");
        setResponseMessage(<span style={{ color: "green" }}>Good job!</span>);
      } else {
        console.log("Word not heard");
        setResponseMessage(<span style={{ color: "red" }}>Please try again</span>);
      }
    };

    recognition.start();
    setTimeout(() => recognition.stop(), 5000);
  };

  const nextQuestion = async () => {
    if (props.questionIndex < props.initialQuestionLength - 1) {
      props.setQuestionIndex(props.questionIndex + 1);
      await getRandomWord();
    } else {
      props.navigateToPage("learn/results");
      props.setQuestionIndex(0);
    }
  };

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HomeButtonHeader navigateToPage={props.navigateToPage} />

      <Container
        fluid
        className="home-content learn"
        style={{
          display: "flex",
          justifyContent: "center",
          height: "calc(100vh - IconHeight)",
        }}
      >
        <div className="word-class">{wordClass}</div>

        <Container className="d-flex justify-content-center align-items-center gap-5 mb-4">
          <div className="word">{word}</div>

          <button onClick={playAudio} className="play-btn">
            <PlaySolid
              style={{
                width: "60%",
                height: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </button>
        </Container>
        <div className="translation">{definition}</div>
        <div className="language-example">{languageExample}</div>

        <div className="translated-example">{translatedExample}</div>
        <div className="microphone"> </div>

        <button onClick={useMicrophone} className="microphone-btn">
          <Microphone
            style={{
              width: "70%",
              height: "70%",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </button>
        <div className="response-message">{responseMessage}</div>
      </Container>

      <Container fluid className="btn-container">
        <button className="next-btn" onClick={nextQuestion}>
          <ArrowRight />
        </button>
      </Container>
      <Container fluid className="footer">
        <ReviewProgBar
          questionIndex={props.questionIndex}
          questions={props.questions}
          progress={props.progress}
        />
      </Container>
    </motion.div>
  );
}
