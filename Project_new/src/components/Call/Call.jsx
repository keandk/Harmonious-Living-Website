// Call.jsx
import React, { useState } from 'react';
import styles from './Call.module.css';
import { VideoRoom } from './VideoRoom';
import { Analytics } from '@vercel/analytics/react';


function Call() {
  const [joined, setJoined] = useState(false);
  return (
    <div className="Call">
      <h1>Tại đây là nơi trò chuyện 1 - 1</h1>

      {!joined && (
        <button onClick={() => setJoined(true)}>
        Join Room
      </button>
    )}

    {joined && <VideoRoom />}
    <Analytics />
  </div>
);
}

export default Call;
