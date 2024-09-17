import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SliderAndCards.css'; // Create a new CSS file for combined styling
import ChatRecorder from './indexrec';


const slides = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
];

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="slides">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Image ${index + 1}`}
            style={{ display: index === slideIndex ? 'block' : 'none' }}
          />
        ))}
      </div>
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${slideIndex === index ? 'active' : ''}`}
            onClick={() => setSlideIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const Card = ({ href, className, title, subtitle }) => (
  <Link to={href} className={`card ${className}`}>
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
  </Link>
);

const Cards = () => (
  <div className="cards">
    <div className="card-group">
      <Card
        href="/form"
        className="form"
        title="I'd like to register"
        subtitle='"Admission form"'
      />
      <Card
        href="/qa"
        className="qa"
        title="I have a question"
        subtitle='"Kindly ask your queries"'
      />
      <Card
        href="/guided-tour"
        className="guided-tour"
        title="Show me around"
        subtitle="Explore Features"
      />
    </div>
    <div className="card-group">
      <Card
        href="/Visit-Robomiracle"
        className="facilities"
        title="What public facilities do you have"
        subtitle='"Amenities"'
      />
      <Card
        href="/weblinks"
        className="weblinks"
        title="Website Links"
        subtitle='"website"'
      />
      <Card
        href="https://robomiracle.com/"
        className="visit-robomiracle"
        title="I want to visit"
        subtitle='"Visit Robomiracle"'
      />
    </div>
  </div>
);

const SliderAndCards = () => (
  <div className="contain">
    <Slider />
    <Cards />
    <div className="recorder-input-wrapper">
        <ChatRecorder/>
      </div>
  </div>
);

export default SliderAndCards;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './SliderAndCards.css';
// import ChatRecorder from './indexrec';

// const Slider = ({ slides, onImageClick }) => {
//   const [slideIndex, setSlideIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [slides]);

//   return (
//     <div className="slider">
//       <div className="slides">
//         {slides.map((slide, index) => (
//           <img
//             key={index}
//             src={`https://robo-jq82.onrender.com/uploads/${slide}`}
//             alt={`Image ${index + 1}`}
//             style={{ display: index === slideIndex ? 'block' : 'none' }}
//             onClick={() => onImageClick()}
//           />
//         ))}
//       </div>
//       <div className="dots">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${slideIndex === index ? 'active' : ''}`}
//             onClick={() => setSlideIndex(index)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Card = ({ href, className, title, subtitle }) => (
//   <Link to={href} className={`card ${className}`}>
//     <h1>{title}</h1>
//     <h2>{subtitle}</h2>
//   </Link>
// );

// const Cards = () => (
//   <div className="cards">
//     <div className="card-group">
//       <Card
//         href="/form"
//         className="form"
//         title="I'd like to register"
//         subtitle='"Admission form"'
//       />
//       <Card
//         href="/qa"
//         className="qa"
//         title="I have a question"
//         subtitle='"Kindly ask your queries"'
//       />
//       <Card
//         href="/guided-tour"
//         className="guided-tour"
//         title="Show me around"
//         subtitle="Explore Features"
//       />
//     </div>
//     <div className="card-group">
//       <Card
//         href="/Visit-Robomiracle"
//         className="facilities"
//         title="What public facilities do you have"
//         subtitle='"Amenities"'
//       />
//       <Card
//         href="/weblinks"
//         className="weblinks"
//         title="Website Links"
//         subtitle='"website"'
//       />
//       <Card
//         href="https://robomiracle.com/"
//         className="visit-robomiracle"
//         title="I want to visit"
//         subtitle='"Visit Robomiracle"'
//       />
//     </div>
//   </div>
// );

// const SliderAndCards = () => {
//   const [slides, setSlides] = useState([]);
//   const [showFileInput, setShowFileInput] = useState(false);
  
//   useEffect(() => {
//     // Fetch the images
//     fetch('https://robo-jq82.onrender.com/get-images')
//       .then(response => response.json())
//       .then(data => setSlides(data.images || []))
//       .catch(error => console.error('Error fetching images:', error));
//   }, []);

//   const handleImageUpload = (event) => {
//     const formData = new FormData();
//     for (let i = 0; i < event.target.files.length; i++) {
//       formData.append('image', event.target.files[i]);
//     }

//     fetch('https://robo-jq82.onrender.com/upload-image', {
//       method: 'POST',
//       body: formData,
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.imageUrl) {
//         setSlides(prevSlides => [...prevSlides, data.imageUrl]);
//         setShowFileInput(false);
//       }
//     })
//     .catch(error => console.error('Error uploading image:', error));
//   };

//   return (
//     <div className="page-container">
//       <header className="header">
//         <h1>Robomiracle Private Limited</h1> {/* Static header */}
//       </header>
//       <div className="contain">
//         <Slider slides={slides} />
//         <Cards />
//         <div className="recorder-input-wrapper">
//           <ChatRecorder />
//         </div>
//         <button className="edit-button" onClick={() => setShowFileInput(!showFileInput)}>
//           {showFileInput ? 'Cancel' : 'Edit Slides'}
//         </button>
//         {showFileInput && (
//           <input 
//             type="file" 
//             accept="image/*" 
//             multiple 
//             onChange={handleImageUpload} 
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default SliderAndCards;
