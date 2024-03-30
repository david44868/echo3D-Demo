import '../App.css';
import React, { useState, useEffect, useRef } from 'react';
import { SubjectQuiz } from '../components/Quiz';
import ReactLoading from 'react-loading';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import Timer from '../components/GameTimer';
import audio1 from '../audio/Journey Across the Blue.ogg';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

export default function Animals() {

  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); 
  const music = useRef(new Audio(audio1));

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = music.current;
    audio.loop = true;

    if (isPlaying) {
      audio.play().then(() => {
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('ended', () => {}); 
    };
  }, [isPlaying]);

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
      <button className="music-button " onClick={toggleMusic}>
        {isPlaying ? <MusicNoteIcon style={{ fontSize: 64 }}/> : <MusicOffIcon style={{ fontSize: 64 }}/>}
      </button>
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