import { AnimalQuestions, PlanetQuestions } from "../Questions/QuestionList";
import React, { useState, useEffect } from "react";
import { Dialog, Grow } from '@mui/material';
import { Echo } from 'echo3d';
import '@google/model-viewer';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import audio1 from '../audio/success.mp3';
import audio2 from '../audio/failure.mp3';
import audio3 from '../audio/results.wav';

export const SubjectQuiz = ({ subject, displayEnd, secondsValue }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEndScreen, setOpenEndScreen] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const questionSet = subject === "animals" ? AnimalQuestions : PlanetQuestions;

  // In-Game Sounds
  const correctNotification = new Audio(audio1);
  const incorrectNotification = new Audio(audio2);
  const resultsNotification = new Audio(audio3);
  
  // API Keys
  const ECHO3D_KEY = process.env.REACT_APP_ECHO3D_API_KEY;
  const ECHO3D_SECURITY_KEY = process.env.REACT_APP_ECHO3D_SECURITY_KEY;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if(currentIndex === questionSet.questions.length - 1) {
      setOpenEndScreen(true);
      resultsNotification.play();
    }
  };

  const checkCorrect = (option) => {
    setIsClicked(true);
    setAnswered(true);
    setUserAnswer(option);
    setCorrectAnswer(questionSet.questions[currentIndex].correctAnswer);
    if(option === questionSet.questions[currentIndex].correctAnswer) {
      setDisplayAnswer(true);
      setNumCorrect(numCorrect + 1);
      correctNotification.play();
    }
    else {
      setDisplayAnswer(false);
      incorrectNotification.play();
    }

    // Display confetti when user finishes quiz
    if(currentIndex === questionSet.questions.length - 1) {
      displayEnd(true)
    }
  }

  useEffect(() => {
    if(isClicked) {
      handleOpen();
    }
  }, [isClicked])

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setAnswered(false);
    setUserAnswer(null);
    setCorrectAnswer(null);
    setDisplayAnswer(false);
    setIsClicked(false);
  }

  return (
    <div className="vbox">
      <h3 className="font-face-pixel">
        {questionSet.questions[currentIndex].question}
      </h3>
      <div className="list">
        {questionSet.questions[currentIndex].choices.map((option, index) => (
          <button 
            key={index} 
            onClick={() => checkCorrect(option)} 
            disabled={isClicked}
            className={"choices font-face-pixel " + (answered ? (displayAnswer ? (userAnswer === option ? "correct" : "") : (userAnswer === option ? "incorrect" : (option === correctAnswer ? "correct" : ""))) : "")}>
            {option}
          </button>
        ))}
        <button onClick={nextQuestion} className={"next-button font-face-pixel " + (currentIndex < questionSet.questions.length - 1 && isClicked ? "makeVisible" : "makeInvisible")}>Next</button>
        <Dialog 
          onClose={handleClose} 
          open={open}
          TransitionComponent={Grow}
          transitionDuration={500}
          className="pixel-corners"
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 20,
              top: 15,
              color: "black",
            }}
          >
            <CloseIcon style={{ fontSize: 30 }}/>
          </IconButton>
          <div className="pop-up">
            <h4 className={"font-face-pixel " + (displayAnswer ? "correct-response" : "incorrect-response")}>{displayAnswer ? "Correct" : "Incorrect"}</h4>
            
            <div className="loading-image">
              <Echo
                securityKey={ECHO3D_SECURITY_KEY}
                apiKey={ECHO3D_KEY}
                entryID={questionSet.questions[currentIndex].id}
                className="echo-model"
              />
            </div>
            <p className="font-face-pixel">
              {questionSet.questions[currentIndex].fact}
            </p>
          </div>          
        </Dialog>
        <Dialog 
          open={openEndScreen}
          TransitionComponent={Grow}
          transitionDuration={500}
          className="pixel-corners"
        >
          <div className="pop-up">
            {/* <h3 className="font-face-pixel ending-style">CONGRATULATIONS!</h3> */}
            <h2 className="font-face-pixel" style={{ color: "red" }}>RESULTS</h2>
            <div className="scores">
              <h5 className="font-face-pixel">TIME...........{(secondsValue / 60) | 0}:{String(secondsValue % 60).padStart(2, '0')}</h5>
              <h5 className="font-face-pixel">CORRECT.........{ numCorrect }/5</h5>
              <h5 className="font-face-pixel">INCORRECT.......{ 5 - numCorrect }/5</h5>
            </div>
            <div className="scores">
              <h5 className="font-face-pixel">TIME BONUS.....{4999 - secondsValue}</h5>
              <h5 className="font-face-pixel">POINTS EARNED..{ String(numCorrect * 1000).padStart(4, '0') }</h5>
              {(5 - numCorrect) * -1000 < 0 &&
                <h5 className="font-face-pixel">PENALTY.......{ String((5 - numCorrect) * -1000).padStart(4, '0') }</h5>
              }
              {((4999 - secondsValue) + (numCorrect * 1000) + ((5 - numCorrect) * -1000)) > 0 ?
                  <h5 className="font-face-pixel"><span style={{ color:"rgb(255, 196, 4)"}}>FINAL SCORE</span>....{ String((4999 - secondsValue) + (numCorrect * 1000) + ((5 - numCorrect) * -1000)).padStart(4, '0') }</h5> 
                : 
                  <h5 className="font-face-pixel">FINAL SCORE....0000</h5>
              }
            </div>
            <img src="trophy.png" alt="Trophy" width={300} height={300} style={{ paddingBottom: "40px" }} />
            <button className="end-button"><a href="/" className="font-face-pixel end-button">PLAY AGAIN</a></button>
          </div>          
        </Dialog>
      </div>
    </div>
  )
}
