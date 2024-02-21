import '../App.css';
import React from 'react';
import { Echo } from 'echo3d';
import '@google/model-viewer';

export default function Random() {

  const ECHO3D_KEY = process.env.REACT_APP_ECHO3D_API_KEY

  return (
    <div className='homepage-image'>
      <div className='container'>
        <Echo
          apiKey={ECHO3D_KEY}
          entryID="c7c14b91-c362-4c28-b70b-2f800156c1eb"
        />
      </div>
       
    </div>
  );
}