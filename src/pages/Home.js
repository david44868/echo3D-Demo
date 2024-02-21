import '../App.css';
import React, {useState} from 'react';

export default function Welcome() {

  const [show, setShow] = useState(false);
  const [quizStart, setQuizStart] = useState(false);

  return (
      <div className='homepage-image'>
          <div className='container'>
            
            {
              !show &&
              <>
                <div className='heading move-up-down'>
                  <h1 className='font-face-pixel '>
                    QUIZ QUEST
                  </h1>
                  <img src="/magnifying_glass.png" alt="magnifying glass"/>
                </div>
                <button onClick={() => setShow(true)} className='home font-face-pixel animated-blink'>START</button>
              </>
            }
            {
              show &&
              <>
                <h2 className='font-face-pixel move-up-down'>SELECT A CATEGORY</h2>
                {/* <button className="home"><a href="/animals" className='home font-face-pixel'>ANIMALS</a></button>
                <button className='home'><a href="/math" className='home font-face-pixel'>MATH</a></button>
                <button href="/" className='home font-face-pixel'>RANDOM</button> */}
                <div className='categories'>
                  <button className='home'>
                    <a href="/animals" className='home'>
                      <div className='waves'>
                        <span className='font-face-pixel' style={{"--i":1}}>A</span>
                        <span className='font-face-pixel' style={{"--i":2}}>N</span>
                        <span className='font-face-pixel' style={{"--i":3}}>I</span>
                        <span className='font-face-pixel' style={{"--i":4}}>M</span>
                        <span className='font-face-pixel' style={{"--i":5}}>A</span>
                        <span className='font-face-pixel' style={{"--i":6}}>L</span>
                        <span className='font-face-pixel' style={{"--i":7}}>S</span>
                      </div>
                    </a>
                  </button>
                  <button className='home'>
                    <a href="/planets" className='home'>
                      <div className='waves'>
                        <span className='font-face-pixel' style={{"--i":1}}>P</span>
                        <span className='font-face-pixel' style={{"--i":2}}>L</span>
                        <span className='font-face-pixel' style={{"--i":3}}>A</span>
                        <span className='font-face-pixel' style={{"--i":4}}>N</span>
                        <span className='font-face-pixel' style={{"--i":5}}>E</span>
                        <span className='font-face-pixel' style={{"--i":6}}>T</span>
                        <span className='font-face-pixel' style={{"--i":7}}>S</span>
                      </div>
                    </a>  
                  </button>
                  <button className='home'>
                    <a href="/random" className='home'>
                      <div className='waves'>
                        <span className='font-face-pixel' style={{"--i":1}}>R</span>
                        <span className='font-face-pixel' style={{"--i":2}}>A</span>
                        <span className='font-face-pixel' style={{"--i":3}}>N</span>
                        <span className='font-face-pixel' style={{"--i":4}}>D</span>
                        <span className='font-face-pixel' style={{"--i":5}}>O</span>
                        <span className='font-face-pixel' style={{"--i":6}}>M</span>
                      </div>
                    </a>
                  </button>
                  
                </div>
              </>
            }
          </div>
      </div>
  );
}