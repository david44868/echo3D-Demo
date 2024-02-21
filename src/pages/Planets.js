import '../App.css';
import React, { useState, useEffect } from 'react';
import '@google/model-viewer';
import { SubjectQuiz } from '../components/Quiz';
import ReactLoading from 'react-loading';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import Timer from '../components/GameTimer';

export default function Planets() {

  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  const displayEnd = () => {
    setShowConfetti(true);
  };

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
          <div className='quizbox'>
            {/* <Echo
              apiKey="square-dawn-8233"
              entryID="Dolphin.glb"
            /> */}
            <SubjectQuiz subject="planets" displayEnd={displayEnd}/>
          </div>
        )
      }
    </div>
  );
}