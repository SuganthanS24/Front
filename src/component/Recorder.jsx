// import 'regenerator-runtime/runtime';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { useEffect, useState } from 'react';
// import './Recorder.css';

// function ChatRecorder() {
//   const { listening, transcript, resetTranscript } = useSpeechRecognition();
//   const [thinking, setThinking] = useState(false);
//   const [aiText, setAiText] = useState("");
//   const [voices, setVoices] = useState([]);
//   const [userQuestion, setUserQuestion] = useState(""); // State to store the user's question
//   const [questions, setQuestions] = useState([]); // State to store fetched questions

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

//   // Function to call the API
//   const callGpt3API = async (message) => {
//     setThinking(true);

//     try {
//       const response = await fetch("https://robo-jq82.onrender.com/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ text: message })
//       });

//       if (!response.ok) {
//         throw new Error("Server response wasn't OK");
//       }

//       const { generatedText } = await response.json();
//       setAiText(generatedText);

//       // Speak the AI response using Speech Synthesis with a female voice
//       speak(generatedText);

//       setThinking(false);
//     } catch (error) {
//       console.error('Error calling API:', error);
//       setThinking(false);
//     }
//   };

//   // Function to synthesize speech from text with a female voice
//   const speak = (text) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
      
//       // Find and set a female voice
//       const femaleVoice = voices.find(voice => voice.name.includes("Female") || voice.name.includes("Samantha") || voice.name.includes("Google US English"));
//       if (femaleVoice) {
//         utterance.voice = femaleVoice;
//       }

//       speechSynthesis.speak(utterance);
//     } else {
//       console.warn('Speech Synthesis not supported in this browser.');
//     }
//   };

//   // Load voices and handle voice changes
//   useEffect(() => {
//     const loadVoices = () => {
//       const availableVoices = speechSynthesis.getVoices();
//       setVoices(availableVoices);
//     };

//     loadVoices(); // Initial load

//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.onvoiceschanged = loadVoices; // Reload voices if they change
//     }
//   }, []);

//   // Fetch questions from the backend when component mounts
  
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch('https://robo-jq82.onrender.com/get-questions');
//         const data = await response.json();
//         setQuestions(data);
//       } catch (error) {
//         console.error('Error loading questions:', error);
//       }
//     };

//     fetchQuestions();
//   }, []);
  

//   // Trigger the API call when the user finishes speaking
//   useEffect(() => {
//     if (transcript && !listening) {
//       const formattedTranscript = formatTranscript(transcript);
//       setUserQuestion(formattedTranscript); // Save the user's question

//       // Check if the transcript matches a predefined question
//       const matchedQuestion = questions.find(q => q.question === formattedTranscript);

//       if (matchedQuestion) {
//         const answer = matchedQuestion.answer;
//         setAiText(answer);
//         speak(answer); // Speak the predefined answer
//       } else {
//         // If not a predefined question, call the AI API for a custom response
//         callGpt3API(formattedTranscript);
//       }

//       resetTranscript(); // Reset the transcript after processing
//     }
//   }, [transcript, listening, resetTranscript, questions]);

//   // Function to handle clicking on predefined questions
//   const handleQuestionClick = (questionText) => {
//     resetTranscript(); // Ensure no old transcript remains

//     // Save the clicked question
//     setUserQuestion(questionText);

//     // Check if the clicked question has a predefined answer
//     const matchedQuestion = questions.find(q => q.question === questionText);

//     if (matchedQuestion) {
//       const answer = matchedQuestion.answer;
//       setAiText(answer);
//       speak(answer); // Speak the predefined answer
//     } else {
//       // If the question doesn't have a predefined answer, generate one using the AI
//       callGpt3API(formatTranscript(questionText));
//     }
//   };

//   return (
//     <div className='chat-wrapper'>
//       <div className='chat-container'>
//         <div className="chat-header">
//           <div className="input-container">
//             {!listening && (
//               <button onClick={SpeechRecognition.startListening} className="ask-button">
//                 <img src="/bot.gif" alt="Bot Icon" className="button-icon" />
//               </button>
//             )}
//           </div>
//           <div className="status-message">
//             {listening ? (
//               <p>Go ahead, I'm listening...</p>
//             ) : (
//               <p>{transcript ? formatTranscript(transcript) : "What can I do for you?"}</p>
//             )}
//           </div>
//         </div>
//         <div className="chat-box">
//           {userQuestion && <div className="user-message">{userQuestion}</div>} 
//           {thinking && <div className="thinking">Thinking...</div>}
//           {aiText && !thinking && <div className="ai-message">{aiText}</div>}
//           <button className="home-button" onClick={() => window.location.href = '/'}>
//             <img src="/home.png" alt="Home" />
//           </button>
//         </div>
//       </div>
//       <div className='right-div'>
//         <ul>
//           {questions.map((q, index) => (
//             <li key={index} onClick={() => handleQuestionClick(q.question)} className="question-item">
//               {q.question}
//             </li>
//           ))}
//         </ul>
//         {/* <button onClick={() => window.location.href = '/edit-questions'}>Edit</button>  */}
//       </div>
//     </div>
//   );
// }

// export default ChatRecorder;





// import 'regenerator-runtime/runtime';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { useEffect, useState } from 'react';
// import './Recorder.css';

// function ChatRecorder() {
//   const { listening, transcript, resetTranscript } = useSpeechRecognition();
//   const [thinking, setThinking] = useState(false);
//   const [aiText, setAiText] = useState("");
//   const [voices, setVoices] = useState([]);
//   const [userQuestion, setUserQuestion] = useState(""); // State to store the user's question
//   const [questions, setQuestions] = useState([]); // State to store fetched questions

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

//   // Function to call the API
//   const callGpt3API = async (message) => {
//     setThinking(true);

//     try {
//       const response = await fetch("https://robo-jq82.onrender.com/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ text: message })
//       });

//       if (!response.ok) {
//         throw new Error("Server response wasn't OK");
//       }

//       const { generatedText } = await response.json();
//       setAiText(generatedText);

//       // Speak the AI response using Speech Synthesis with a female voice
//       speak(generatedText);

//       setThinking(false);
//     } catch (error) {
//       console.error('Error calling API:', error);
//       setThinking(false);
//     }
//   };

//   // Function to synthesize speech from text with a female voice
//   const speak = (text) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
      
//       // Find and set a female voice
//       const femaleVoice = voices.find(voice => voice.name.includes("Female") || voice.name.includes("Samantha") || voice.name.includes("Google US English"));
//       if (femaleVoice) {
//         utterance.voice = femaleVoice;
//       }

//       speechSynthesis.speak(utterance);
//     } else {
//       console.warn('Speech Synthesis not supported in this browser.');
//     }
//   };

//   // Load voices and handle voice changes
//   useEffect(() => {
//     const loadVoices = () => {
//       const availableVoices = speechSynthesis.getVoices();
//       setVoices(availableVoices);
//     };

//     loadVoices(); // Initial load

//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.onvoiceschanged = loadVoices; // Reload voices if they change
//     }
//   }, []);

//   // Fetch questions from the backend when component mounts
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch('https://robo-jq82.onrender.com/get-questions');
//         const data = await response.json();
//         setQuestions(data);
//       } catch (error) {
//         console.error('Error loading questions:', error);
//       }
//     };

//     fetchQuestions();
//   }, []);
  
//   // Trigger the API call when the user finishes speaking
//   useEffect(() => {
//     if (transcript && !listening) {
//       const formattedTranscript = formatTranscript(transcript);
//       setUserQuestion(formattedTranscript); // Save the user's question

//       // Check if the transcript matches a predefined question
//       const matchedQuestion = questions.find(q => q.question === formattedTranscript);

//       if (matchedQuestion) {
//         const answer = matchedQuestion.answer;
//         setAiText(answer);
//         speak(answer); // Speak the predefined answer
//       } else {
//         // If not a predefined question, call the AI API for a custom response
//         callGpt3API(formattedTranscript);
//       }

//       resetTranscript(); // Reset the transcript after processing
//     }
//   }, [transcript, listening, resetTranscript, questions]);

//   // Function to handle clicking on predefined questions
//   const handleQuestionClick = (questionText) => {
//     resetTranscript(); // Ensure no old transcript remains

//     // Save the clicked question
//     setUserQuestion(questionText);

//     // Check if the clicked question has a predefined answer
//     const matchedQuestion = questions.find(q => q.question === questionText);

//     if (matchedQuestion) {
//       const answer = matchedQuestion.answer;
//       setAiText(answer);
//       speak(answer); // Speak the predefined answer
//     } else {
//       // If the question doesn't have a predefined answer, generate one using the AI
//       callGpt3API(formatTranscript(questionText));
//     }
//   };

//   return (
//     <div className='chat-wrapper'>
//       <div className='chat-container'>
//         <div className="chat-header">
//           <div className="input-container">
//             {!listening && (
//               <button onClick={SpeechRecognition.startListening} className="ask-button">
//                 <img src="/bot.gif" alt="Bot Icon" className="button-icon" />
//               </button>
//             )}
//           </div>
//           <div className="status-message">
//             {listening ? (
//               <p>Go ahead, I'm listening...</p>
//             ) : (
//               <p>{transcript ? formatTranscript(transcript) : "What can I do for you?"}</p>
//             )}
//           </div>
//         </div>
//         <div className="chat-box">
//           {userQuestion && <div className="user-message">{userQuestion}</div>} 
//           {thinking && <div className="thinking">Thinking...</div>}
//           {aiText && !thinking && <div className="ai-message">{aiText}</div>}
//           <button className="home-button" onClick={() => window.location.href = '/'}>
//             <img src="/home.png" alt="Home" />
//           </button>
//         </div>
//       </div>
//       <div className='right-div'>
//         <ul>
//           {questions.map((q, index) => (
//             <li key={index} onClick={() => handleQuestionClick(q.question)} className="question-item">
//               {q.question}
//             </li>
//           ))}
//         </ul>
        
//       </div>
//       <div className='videodisplay'>

//       </div>
//     </div>
//   );
// }

// export default ChatRecorder;
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recorder.css';

function ChatRecorder() {
  const { listening, transcript, resetTranscript } = useSpeechRecognition();
  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState("");
  const [voices, setVoices] = useState([]);
  const [userQuestion, setUserQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [videoUrl, setVideoUrl] = useState(""); // State to hold the video URL
  const [introSpoken, setIntroSpoken] = useState(false); // Track if the introduction has been spoken
  const [prevVideoPath, setPrevVideoPath] = useState(""); // Track the previous video path


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

  // Function to call the API
  // const callGpt3API = async (message) => {
  //   setThinking(true);
  //   try {
  //     const response = await fetch("https://robo-jq82.onrender.com/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ text: message })
  //     });

  //     if (!response.ok) {
  //       throw new Error("Server response wasn't OK");
  //     }

  //     const { generatedText } = await response.json();
  //     setAiText(generatedText);
  //     speak(generatedText, () => SpeechRecognition.startListening()); // Automatically listen after speaking
  //     setThinking(false);
  //   } catch (error) {
  //     console.error('Error calling API:', error);
  //     setThinking(false);
  //   }
  // };
  const callGpt3API = async (message) => {
    setThinking(true);
    try {
        // Update URL to match the existing route in your Express server
        const response = await fetch("https://robo-jq82.onrender.com/api/generate-audio?text=" + encodeURIComponent(message), {
            method: "GET", // Use GET if your server route expects a GET request
        });

        if (!response.ok) {
            throw new Error("Server response wasn't OK");
        }

        const { generatedText, audioBuffer } = await response.json();
        setAiText(generatedText);
        speak(generatedText, () => SpeechRecognition.startListening()); // Automatically listen after speaking
        setThinking(false);
    } catch (error) {
        console.error('Error calling API:', error);
        setThinking(false);
    }
};

  // Function to synthesize speech from text with a female voice option
  const speak = (text, onEndCallback) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const selectedVoice = voices.find(voice => voice.name.includes("Female") || voice.name.includes("Samantha") || voice.name.includes("Google US English"));

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = onEndCallback;  // Callback to start listening after speech
      speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech Synthesis not supported in this browser.');
    }
  };

  // Load voices and handle voice changes
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Automatically start with an introduction once
  useEffect(() => {
    if (!introSpoken && voices.length > 0) {  // Only speak the intro once
      const introText = "Hi, my name is Nilla, what can I do for you?";
      speak(introText, () => SpeechRecognition.startListening()); // Start listening after introduction
      setIntroSpoken(true);  // Mark intro as spoken
    }
  }, [voices, introSpoken]);

  // Fetch questions and video data from the backend when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://robo-jq82.onrender.com/get-questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Trigger the API call when the user finishes speaking
  useEffect(() => {
    if (transcript && !listening) {
      const formattedTranscript = formatTranscript(transcript);
      setUserQuestion(formattedTranscript);

      const matchedQuestion = questions.find(q => q.question === formattedTranscript);

      if (matchedQuestion) {
        const answer = matchedQuestion.answer;
        setAiText(answer);
        speak(answer, () => SpeechRecognition.startListening()); // Automatically listen after speaking answer
        if (matchedQuestion.video_path) {
          setVideoUrl(`https://robo-jq82.onrender.com/uploads/${matchedQuestion.video_path}`); // Update the video URL
        } else {
          setVideoUrl(""); // Clear the video URL if no video is associated
        }
      } else {
        callGpt3API(formattedTranscript);
      }

      resetTranscript();
    }
  }, [transcript, listening, resetTranscript, questions]);

  // Function to handle clicking on predefined questions
  const handleQuestionClick = (questionText) => {
    resetTranscript();
    setUserQuestion(questionText);
    const matchedQuestion = questions.find(q => q.question === questionText);
  
    if (matchedQuestion) {
      const answer = matchedQuestion.answer;
      setAiText(answer);
      speak(answer, () => SpeechRecognition.startListening()); // Automatically listen after speaking answer
  
      const newVideoPath = matchedQuestion.video_path || "";
      if (newVideoPath !== prevVideoPath) {
        setVideoUrl(newVideoPath ? `https://robo-jq82.onrender.com/uploads/${newVideoPath}` : ""); // Update video URL if different
        setPrevVideoPath(newVideoPath); // Update the previous video path
      }
    } else {
      callGpt3API(formatTranscript(questionText));
    }
  };
  

  return (
    <div className='chat-wrapper'>
      <div className='right-section'>
        <div className='question-list'>
          <ul>
            {questions.map((q, index) => (
              <li key={index} onClick={() => handleQuestionClick(q.question)} className="question-item">
                {q.question}
              </li>
            ))}
          </ul>
        </div>
        <div className='video-display'>
  {videoUrl && (
    <video width="100%" autoPlay muted>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )}
</div>
      </div>

      <div className='chat-container'>
        <div className="chat-header">
          <div className="input-container">
            {!listening && (
              <button onClick={SpeechRecognition.startListening} className="ask-button">
                <img src="/bot.gif" alt="Bot Icon" className="button-icon" />
              </button>
            )}
          </div>
          <div className="status-message">
            {listening ? (
              <p>Go ahead, I'm listening...</p>
            ) : (
              <p>{transcript ? formatTranscript(transcript) : "What can I do for you?"}</p>
            )}
          </div>
        </div>
        <div className="chat-box">
          {userQuestion && <div className="user-message">{userQuestion}</div>}
          {thinking && <div className="thinking">Thinking...</div>}
          {aiText && !thinking && <div className="ai-message">{aiText}</div>}
          <button className="home-button" onClick={() => window.location.href = '/'}>
            <img src="/home.png" alt="Home" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRecorder;
