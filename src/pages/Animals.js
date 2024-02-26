import '../App.css';
import React, { useState, useEffect } from 'react';
import { SubjectQuiz } from '../components/Quiz';
import ReactLoading from 'react-loading';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import Timer from '../components/GameTimer';

export default function Animals() {

  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  const displayEnd = (value) => {
    setShowConfetti(value);
    setQuizEnded(true);
  };

  const handleSeconds = (value) => {
    setSeconds(value);
  }

  return (
    <div className='homepage-image'>
      {showConfetti && <Confetti width={width} height={height} />}
      {loading ? 
        (
          <div className='loading'>
            <h1 className='font-face-pixel'>LOADING</h1>
            <ReactLoading type='cubes' color='black' />
          </div>
        ) : (
          <>
            <Timer quizEnded={quizEnded} secondsValue={handleSeconds}/>
            <div className='quizbox'>
              <SubjectQuiz subject="animals" displayEnd={displayEnd} secondsValue={seconds}/>
            </div>
          </>
          
        )
      }
    </div>
  );
}