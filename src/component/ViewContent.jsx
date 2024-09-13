import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ViewContent.css';

const ViewContent = () => {
  const [content, setContent] = useState({
    question: '',
    answer: '',
    videoPath: ''
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const question = params.get('question') || '';
    const answer = params.get('answer') || '';
    const videoPath = params.get('videoPath') || '';

    setContent({ question, answer, videoPath });
  }, [location.search]);

  return (
    <div className="content-display">
      <h2>{content.question}</h2>
      <p>{content.answer || 'No answer found.'}</p>
      {content.videoPath ? (
        <div className="video-container">
          <video controls src={`https://robo-jq82.onrender.com/uploads/${content.videoPath}`} />
        </div>
      ) : (
        <p>No video available for this question.</p>
      )}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default ViewContent;
