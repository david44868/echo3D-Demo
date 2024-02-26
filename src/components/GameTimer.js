import React, { useState, useEffect } from 'react';

const Timer = ({ quizEnded, secondsValue }) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let interval;
    if(!quizEnded) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
    else if (quizEnded) {
      clearInterval(interval);
      secondsValue(seconds);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '50px',
      display: 'flex',
    }}>
      <h2 className="font-face-pixel corner-timer">{(seconds / 60) | 0}:{String(seconds % 60).padStart(2, '0')}</h2>
    </div>
  );
};

export default Timer;
