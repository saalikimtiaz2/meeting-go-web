/* eslint-disable no-unused-vars */
import 'styles/video.scss';

import React from 'react';

// Define the prop types with explicit return types
interface HomeScreenProps {
  createCall: () => Promise<string>;
  startHairCheck: (url: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ createCall, startHairCheck }) => {
  const startDemo = async () => {
    try {
      const url = await createCall();
      startHairCheck(url);
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  return (
    <div className="home-screen">
      <h1>Daily React custom video application</h1>
      <p>Start the demo with a new unique room by clicking the button below.</p>
      <button onClick={startDemo} type="button">
        Click to start a call
      </button>
      <p className="small">
        Select “Allow” to use your camera and mic for this call if prompted
      </p>
    </div>
  );
};

export default HomeScreen;
