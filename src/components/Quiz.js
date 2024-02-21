import { AnimalQuestions, PlanetQuestions } from "../Questions/QuestionList";
import React, { useState, useEffect } from "react";
import { Dialog, Grow } from '@mui/material';

export const SubjectQuiz = ({ subject, displayEnd }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEndScreen, setOpenEndScreen] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);

  const ECHO3D_KEY = process.env.REACT_APP_ECHO3D_API_KEY
  const questionSet = subject === "animals" ? AnimalQuestions : PlanetQuestions;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenEndScreen = () => {
    setOpenEndScreen(true);
  }

  const handleClose = () => {
    setOpen(false);
    if(currentIndex === questionSet.questions.length - 1) {
      setOpenEndScreen(true);
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
    }
    else {
      setDisplayAnswer(false);
    }

    // Display confetti when user finishes quiz
    if(currentIndex === questionSet.questions.length - 1) {
      displayEnd()
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
          <div className="pop-up">
            <h4 className={"font-face-pixel " + (displayAnswer ? "correct-response" : "incorrect-response")}>{displayAnswer ? "Correct" : "Incorrect"}</h4>
            <iframe 
              src={`https://api.echo3D.com/webar?key=${ECHO3D_KEY}&entry=${questionSet.questions[currentIndex].id}`}
              title="echo3D iframe element"
              height="225" 
              width="225" 
            />
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
            <h3 className="font-face-pixel ending-style">CONGRATULATIONS!</h3>
            <h2 className="font-face-pixel" style={{ color: "red" }}>FINAL SCORE</h2>
            <h2 className="font-face-pixel" style={{ paddingBottom: "20px" }}>{ numCorrect } / 5</h2>
            <img src="trophy.png" alt="Trophy" width={300} height={300} style={{ paddingBottom: "50px" }} />
            <button className="end-button"><a href="/" className="font-face-pixel end-button">PLAY AGAIN</a></button>
          </div>          
        </Dialog>
      </div>
    </div>
  )
}
