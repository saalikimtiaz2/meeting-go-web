/* eslint-disable no-undef */
// src/SpeechToText.tsx
import React, { useEffect, useState } from 'react';
import { PiSubtitlesSlashThin, PiSubtitlesThin } from 'react-icons/pi';

const SpeechToText: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [interimTranscript, setInterimTranscript] = useState<string>('');

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + ' ';
          } else {
            interimTranscript += transcriptPiece;
          }
        }
        setInterimTranscript(interimTranscript);
        setTranscript((prev) => {
          const updatedTranscript = prev + finalTranscript;
          if (updatedTranscript.length >= 35) {
            return '';
          }
          return updatedTranscript;
        });
      };

      recognitionInstance.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error', event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error('Web Speech API is not supported in this browser.');
    }
  }, []);

  const startRecognition = () => {
    recognition?.start();
    setShowTranscript(true);
  };

  const stopRecognition = () => {
    recognition?.stop();
    setShowTranscript(false);
  };

  return (
    <div className="flex items-center gap-x-4 mt-4 relative pl-20">
      {!showTranscript ? (
        <button
          onClick={startRecognition}
          className="h-10 w-10 text-white bg-blue-500 hover:bg-primary absolute bottom-3 right-0 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
        >
          <PiSubtitlesThin size={30} />
        </button>
      ) : (
        <button
          onClick={stopRecognition}
          className="h-10 w-10 text-white bg-blue-500 hover:bg-primary absolute bottom-3 right-0 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
        >
          <PiSubtitlesSlashThin size={30} />
        </button>
      )}
      {showTranscript && (transcript.length > 1 || interimTranscript.length > 1) && (
        <p className="bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-xl w-max mx-auto">
          {transcript + interimTranscript}
        </p>
      )}
    </div>
  );
};

export default SpeechToText;
