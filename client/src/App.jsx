// Copyright © 2024 Venkata Lingarao. All Right Reserved 💓
import React, { useState } from "react";
import ParticlesComponent from "./ParticlesComponent";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSpeak = () => {
    if (!text.trim()) {
      setAlertMessage("Please enter some text to speak.");
      return;
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setAlertMessage("");

      utterance.onend = () => {
        setIsSpeaking(false);
      };
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="main-texttospeech-container">
      <ParticlesComponent id="particles" />

      <div className="heading-container">
        <h2>Text to Speech Converter</h2>
      </div>

      <div className="card-container">

        <div className="main-card-container">
          <div className="input-container">
            <input
              className="input-feild"
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setAlertMessage("");
              }}
              placeholder="Enter text here"
            />
          </div>

          <div className="button-container">
            <button
              className="speak-button"
              onClick={isSpeaking ? handleStop : handleSpeak}
            >
              {isSpeaking ? "Stop" : "Speak"}
            </button>
            {alertMessage && <div style={{marginTop:"4px"}}>{alertMessage}</div>}
          </div>
        </div>

      </div>
      <div></div>
    </div>
  );
};

export default App;
