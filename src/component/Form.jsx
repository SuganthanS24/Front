import React, { useState } from 'react';
import './Form.css'; // Ensure this CSS file exists and is correctly styled

const Toast = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Display the toast message for 2 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      {message}
    </div>
  );
};

const Form = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Gender: '',
    Mobile: '',
    Email: '',
    Visit: '',
    Place: '',
  });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://sheetdb.io/api/v1/imlqj5ny1ag1e', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.created > 0) {
          setShowToast(true);
          setTimeout(() => {
            window.location.href = '/';
          }, 2000); // Redirect after 2 seconds
        } else {
          alert('There was an issue with your submission. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an error with your submission. Please try again.');
      });
  };

  return (
    <div className="Form-section">
      <div className="overlay"></div>
      <div className="cont">
        <h1>Welcome to Robomiracle</h1>
        <form id="sheetdb-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
          <div className="gender-group">
            <label>Gender:</label>
            <label>
              <input
                type="radio"
                name="Gender"
                value="Male"
                checked={formData.Gender === 'Male'}
                onChange={handleChange}
                required
              />{' '}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="Gender"
                value="Female"
                checked={formData.Gender === 'Female'}
                onChange={handleChange}
                required
              />{' '}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="Gender"
                value="Other"
                checked={formData.Gender === 'Other'}
                onChange={handleChange}
                required
              />{' '}
              Other
            </label>
          </div>

          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="Mobile"
            value={formData.Mobile}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />

          <label htmlFor="purpose">Purpose of Visit:</label>
          <textarea
            id="purpose"
            name="Visit"
            value={formData.Visit}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          <label htmlFor="place">Place:</label>
          <input
            type="text"
            id="place"
            name="Place"
            value={formData.Place}
            onChange={handleChange}
            required
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
      <button className="back-btn" onClick={() => window.location.href = '/'}> <img src="/home.png" alt="Home" /></button>
      {showToast && <Toast message="We have successfully collected your information." onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default Form;
