import React, { useEffect, useState } from "react";
import "../css/WordOfTheDay.css";
import ApiServerClient from "../ApiServerClient";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faHouse,faArrowRotateBackward } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import PlaceholderLoader from "../components/PlaceholderLoader";
import HomeButtonHeader from "../components/HomeButtonHeader";


const WordOfTheDay = (props) => {
  const { setPage } = props;

  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [exampleTranslated, setExampleTranslated] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [wordDate, setWordDate] = useState("");

  useEffect(() => {
    getRandomWord();
  }, []);

  // change word in example color
  useEffect(() => {
    if (example.includes(word)) {
      const regex = new RegExp(`(${word}\\S*\\.?)`);
      const parts = example.split(regex);
      const newExample = parts.map((part, index) => {
        // if first 3 letters of part are the same as word, then highlight
        if (part.substring(0, 3) === word.substring(0, 3)) {
          return (
            <span key={index} className="highlighted">
              {part}
            </span>
          );
        } else {
          return part + " ";
        }
      });
      setExample(newExample);
    }
  }, [example, word]);

  // change translation in exampleTranslation color
  useEffect(() => {
    if (exampleTranslated.includes(translation)) {
      const regex = new RegExp(`(${translation}\\S*\\.?)`);
      const parts = exampleTranslated.split(regex);
      const newExample = parts.map((part, index) => {
        // if first 3 letters of part are the same as word, then highlight
        if (part.substring(0, 3) === translation.substring(0, 3)) {
          return (
            <span key={index} className="highlighted">
              {part}
            </span>
          );
        } else {
          return part + " ";
        }
      });
      setExampleTranslated(newExample);
    }
  }, [exampleTranslated, translation]);


  const getRandomWord = async () => {
    try {
      const response = await ApiServerClient.getRandomWord(); // Wait for the result
      console.log("showdata:", response); // Log the object
      console.log("showdata as string:", JSON.stringify(response, null, 2)); // Optional for debugging
      // const translation = await translateText(response.language.english.word, 'ar');
      console.log(translation);
      // Set individual pieces of data to state
      setWord(response.language.english.word); // e.g., "example"
      // setWordDate(response._id); // Assuming you want to use _id as the date placeholder
      setTranslation(response.language.english.word); // e.g., "ejemplo"
      // setTranslation(translation); 
      setDefinition(response.language.english.definition); // e.g., "A representative form or pattern"
      setExample(response.language.english.example); // e.g., "This is an example sentence."
      setExampleTranslated(response.language.english.example); // e.g., "Esto es una frase de ejemplo."
  
      setIsLoaded(true); // Mark as loaded
    } catch (error) {
      console.error("Error in getRandomWord:", error);
    }
  };
  
  

  const speakText = (text, lang) => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      synth.speak(utterance);
    } else {
      alert("Sorry, speech synthesis is not supported in your browser.");
    }
  };

  if (!isLoaded) {
    return (
      <motion.div
        className="wotd"
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container fluid className="wotd-container flex-row">
          <h1>Loading</h1>
          <PlaceholderLoader />
        </Container>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="wotd"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HomeButtonHeader navigateToPage={props.navigateToPage} />

      <Container fluid className="wotd-container">
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column">
            <h3>{wordDate}</h3>
            <h1>{translation}</h1>
          </div>
          <FontAwesomeIcon
            className="i"
            icon={faVolumeHigh}
            onClick={() => speakText(translation, "es-ES")}
          />
        </div>
        <h2>{word}</h2>
        <br />
        <br />
        <h2>{exampleTranslated}</h2>
        <h3>{example}</h3>
      </Container>
      <Container fluid className="descContainer">
        <div className="descBox">
          <div className="descTop">
            <h3>Definition</h3>
          </div>
          <hr />
          <h3>{definition}</h3>
        </div>
        <FontAwesomeIcon
            className="i"
            icon={faArrowRotateBackward}
            onClick={getRandomWord}
          />
        {/* <div className="d-flex justify-content-center mt-3">
          <Button variant="primary" onClick={getRandomWord}>
            Refresh Word
          </Button>
        </div> */}
      </Container>
    </motion.div>
  );
};

export default WordOfTheDay;
