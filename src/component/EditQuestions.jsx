import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditQuestions() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('question', question);
    formData.append('answer', answer);
    if (video) {
      formData.append('video', video);
    }

    fetch('https://robo-jq82.onrender.com/save-question', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse response as JSON
    })
    .then(data => {
      console.log('Question saved:', data);
      navigate('/'); // Navigate back to the ChatRecorder
    })
    .catch(error => console.error('Error saving question:', error));
  };

  return (
    <div>
      <h2>Edit Questions</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>
        <div>
          <label>Answer:</label>
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </div>
        <div>
          <label>Video:</label>
          <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  );
}

export default EditQuestions;
