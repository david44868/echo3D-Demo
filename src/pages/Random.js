import '../App.css';
import React from 'react';
import { Echo } from 'echo3d';
import '@google/model-viewer';

export default function Random() {

  const ECHO3D_KEY = process.env.REACT_APP_ECHO3D_API_KEY;
  const ECHO3D_SECURITY_KEY = process.env.REACT_APP_ECHO3D_SECURITY_KEY;

  return (
    <div className='homepage-image'>
      <div className='container'>
        <Echo style={{ height: "225px" }}
          securityKey={ECHO3D_SECURITY_KEY}
          apiKey={ECHO3D_KEY}
          entryID="3a3b8335-af13-4760-93ed-0d1009009c1a"
        />
      </div>
    </div>
  );
}