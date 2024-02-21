import '../App.css';
import React from 'react';
import '@google/model-viewer';

export default function Math() {

  const ECHO3D_KEY = process.env.REACT_APP_ECHO3D_API_KEY

  return (
    <div className='homepage-image'>
        <Echo
          apiKey="square-dawn-8233"
          entryID="Dolphin.glb"
        />   
    </div>
  );
}