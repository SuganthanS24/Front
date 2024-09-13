import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderEditComponent = () => {
  const [headerInput, setHeaderInput] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setHeaderInput(e.target.value);
  };

  const handleSave = () => {
    fetch('https://robo-jq82.onrender.com/save-header', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ header: headerInput }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Header saved:', data);
        navigate('/');
      })
      .catch(error => console.error('Error saving header:', error));
  };

  return (
    <div>
      <h1>Edit Header</h1>
      <input
        type="text"
        value={headerInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default HeaderEditComponent;
