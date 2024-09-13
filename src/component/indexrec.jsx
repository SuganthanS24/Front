// import 'regenerator-runtime/runtime';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Recorder.css';

// function Recorder() {
//   const { listening, transcript } = useSpeechRecognition();
//   const [thinking, setThinking] = useState(false);
//   const [aiText, setAiText] = useState("");
//   const navigate = useNavigate();

//   // Function to format the transcript text
//   const formatTranscript = (text) => {
//     if (!text) return "";

//     let formattedText = text.trim();
//     formattedText = formattedText.charAt(0).toUpperCase() + formattedText.slice(1);

//     if (!/[.!?]$/.test(formattedText)) {
//       formattedText += ".";
//     }

//     return formattedText;
//   };

//   // Create a combined text to show in the input field
//   const combinedText = () => {
//     if (listening) {
//       return `${formatTranscript(transcript)} Go ahead, I'm listening...`;
//     } else if (thinking) {
//       return `${formatTranscript(transcript)} Thinking...`;
//     } else if (aiText) {
//       return `${formatTranscript(transcript)} ${aiText}`;
//     } else {
//       return formatTranscript(transcript) || "";
//     }
//   };

//   // Handle listen button click
//   const handleListenClick = () => {
//     SpeechRecognition.startListening();
//     navigate('/qa');
//   };

//   return (
//     <div className="custom-recorder-container">
//       <div className="custom-input-wrapper">
//         <input 
//           type="text" 
//           value={combinedText()}
//           placeholder="My name is Nilla...What can I do for you?" 
//           readOnly 
//           className="custom-transcript-input"
//         />
//         <button onClick={handleListenClick} className="custom-listen-button">
//           <img src="/bot.gif" alt="Bot Icon" className="custom-button-icon" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Recorder;
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recorder.css';

function Recorder() {
  const { listening, transcript } = useSpeechRecognition();
  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState("");
  const [introSpoken, setIntroSpoken] = useState(false); // Track if introduction has been spoken
  const [voices, setVoices] = useState([]); // To store available voices
  const navigate = useNavigate();

  // Function to format the transcript text
  const formatTranscript = (text) => {
    if (!text) return "";

    let formattedText = text.trim();
    formattedText = formattedText.charAt(0).toUpperCase() + formattedText.slice(1);

    if (!/[.!?]$/.test(formattedText)) {
      formattedText += ".";
    }

    return formattedText;
  };

  // Function to speak the introduction text using a female voice
  const speakIntro = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Find a female voice (preferably Google US English or Samantha)
      const selectedVoice = voices.find(voice => 
        voice.name.includes("Google US English") || voice.name.includes("Samantha") || voice.name.includes("Female")
      );

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech Synthesis not supported in this browser.');
    }
  };

  // Load the voices when the component mounts
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Load voices initially and whenever voices change
    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Trigger the introduction speech only once when the component mounts or page is refreshed
  useEffect(() => {
    if (!introSpoken && voices.length > 0) { // Check if voices are loaded and intro has not been spoken
      speakIntro("Hi, my name is Nilla, what can I do for you?");
      setIntroSpoken(true); // Mark that the intro has been spoken to avoid repetition
    }
  }, [voices, introSpoken]);

  // Handle page refresh (if the page is refreshed, reset the introSpoken state)
  useEffect(() => {
    const handlePageRefresh = () => {
      setIntroSpoken(false); // Reset introSpoken to allow the speech to trigger on page refresh
    };

    window.addEventListener('beforeunload', handlePageRefresh);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handlePageRefresh);
    };
  }, []);

  // Create a combined text to show in the input field
  const combinedText = () => {
    if (listening) {
      return `${formatTranscript(transcript)} Go ahead, I'm listening...`;
    } else if (thinking) {
      return `${formatTranscript(transcript)} Thinking...`;
    } else if (aiText) {
      return `${formatTranscript(transcript)} ${aiText}`;
    } else {
      return formatTranscript(transcript) || "";
    }
  };

  // Handle listen button click
  const handleListenClick = () => {
    SpeechRecognition.startListening();
    navigate('/qa');
  };

  return (
    <div className="custom-recorder-container">
      <div className="custom-input-wrapper">
        <input 
          type="text" 
          value={combinedText()}
          placeholder="My name is Nilla...What can I do for you?" 
          readOnly 
          className="custom-transcript-input"
        />
        <button onClick={handleListenClick} className="custom-listen-button">
          <img src="/bot.gif" alt="Bot Icon" className="custom-button-icon" />
        </button>
      </div>
    </div>
  );
}

export default Recorder;
