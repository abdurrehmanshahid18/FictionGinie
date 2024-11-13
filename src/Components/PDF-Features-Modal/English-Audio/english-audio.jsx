import React, { useState, useEffect } from "react";
import { AiOutlinePause } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { MdReplay } from "react-icons/md";
import "./style.css";

const EnglishAudio = (props) => {
  const {
    isModalBtnsClick,
    selectedButton,
    currentPageText,
    setIsModalBtnsClick,
    pageNumber,
  } = props;

  const [speech, setSpeech] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setSpeech(new SpeechSynthesisUtterance());
    window.speechSynthesis.cancel();
  }, []);

  const voices = window.speechSynthesis.getVoices();
  let customVoice = voices.find(
    (voice) => voice.name === "Google UK English Female"
  );

  const speakText = (text) => {
    if (speech && customVoice.name === "Google UK English Female") {
      speech.voice = customVoice;
      speech.text = text;
      window.speechSynthesis.speak(speech);
      speech.onstart = () => {
        setIsSpeaking(true);
      };

      speech.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  const pauseSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    }
  };

  const resumeSpeech = () => {
    if (!isSpeaking) {
      window.speechSynthesis.resume();
      setIsSpeaking(true);
    }
  };

  const replaySpeech = () => {
    if (speech) {
      window.speechSynthesis.cancel();
    }
  };

  const handleButtonClick = () => {
    if (!isSpeaking) {
      speakText(currentPageText);
    } else {
      pauseSpeech();
    }
  };

  return (
    <>
      {isModalBtnsClick && selectedButton === "EnglishAudio" && (
        <div className="modal-content-wrap">
          <div className="english-audio-container">
            <div className="english-audio-wrap">
              <div
                className="audio-btns-wrap"
                onClick={() => {
                  replaySpeech();
                }}
              >
                <MdReplay size={30} color="white" />
              </div>
              <div className="audio-btns-wrap" onClick={handleButtonClick}>
                {isSpeaking ? (
                  <AiOutlinePause size={30} color="white" />
                ) : (
                  <div onClick={resumeSpeech}>
                    <BsFillPlayFill size={30} color="white" />
                  </div>
                )}
              </div>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <div style={{ marginTop: "10px" }}>
                <p
                  style={{ margin: "0px", fontWeight: "bold", color: "black" }}
                >
                  Page {pageNumber}.
                </p>
              </div>
              <div className="current-page-text">
                <p>{currentPageText}</p>
              </div>
            </div>
          </div>
          <div className="back-link-wrap">
            <h5
              onClick={() => {
                setIsModalBtnsClick(false);
              }}
              className="back-link"
            >
              Back!
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default EnglishAudio;
