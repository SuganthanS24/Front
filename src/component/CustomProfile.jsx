import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomProfile.css';

const capitalizeAndFormat = (text) => {
    if (!text) return '';
    // Capitalize first letter and add period at the end
    const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
    return formattedText.endsWith('.') ? formattedText : formattedText + '.';
};

const CustomProfile = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [video, setVideo] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);

    useEffect(() => {
        loadQuestions();
    }, []);

    const handleSave = async () => {
        if (!question || !answer) {
            alert('Please fill out both question and answer fields.');
            return;
        }

        const formattedQuestion = capitalizeAndFormat(question);

        const formData = new FormData();
        formData.append('question', formattedQuestion);
        formData.append('answer', answer);
        if (video) formData.append('video', video);

        try {
            const response = await axios.post('https://robo-jq82.onrender.com/save-question', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.data.message === 'Question saved successfully') {
                alert('Question saved successfully!');
                setQuestion('');
                setAnswer('');
                setVideo(null);
                setIsEditing(false);
                setEditingQuestion(null);
                loadQuestions();
            } else {
                alert('Failed to save question.');
            }
        } catch (error) {
            console.error('Error saving question:', error);
            alert('An error occurred while saving the question.');
        }
    };

    const loadQuestions = async () => {
        try {
            const response = await axios.get('https://robo-jq82.onrender.com/get-questions');
            setQuestions(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error loading questions:', error);
            alert('An error occurred while loading the questions.');
        }
    };

    const handleDelete = async (questionToDelete, videoPath) => {
        try {
            const response = await axios.delete('https://robo-jq82.onrender.com/delete_custom_question', {
                headers: { 'Content-Type': 'application/json' },
                data: { question: questionToDelete, video_path: videoPath },
            });
            if (response.data.message === 'Question and video deleted successfully.') {
                alert('Question and video deleted successfully!');
                loadQuestions();
            } else {
                alert('Error deleting question: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error deleting question:', error);
            alert('An error occurred while deleting the question.');
        }
    };

    const handleEdit = (entry) => {
        setQuestion(entry.question);
        setAnswer(entry.answer);
        setIsEditing(true);
        setEditingQuestion(entry.question);
    };

    return (
        <div className="container">
            <h1>{isEditing ? 'Edit Custom Question' : 'Add Custom Question'}</h1>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="question">Question:</label>
                    <input
                        type="text"
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter Question"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer">Answer:</label>
                    <textarea
                        id="answer"
                        rows="5"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter Answer"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="video">Select Video:</label>
                    <input
                        type="file"
                        id="video"
                        accept=".mp4"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />
                </div>
            </div>
            <div className="form-actions">
                <button className="save-button" onClick={handleSave}>{isEditing ? 'Update' : 'Save'}</button>
                <button className="back-button" onClick={() => window.location.href = '/visit-robomiracle'}>
                    Back to Visit Page
                </button>
            </div>
            <div className="table-container">
                <h2>Uploaded Questions</h2>
                <table id="questions-table">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Video</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.question}</td>
                                <td>{entry.answer}</td>
                                <td>
                                    {entry.video_path ? (
                                        <a href={`/uploads/${entry.video_path}`} target="_blank" rel="noopener noreferrer">
                                            View Video
                                        </a>
                                    ) : 'No video'}
                                </td>
                                <td>
                                    <button className="action-button" onClick={() => handleEdit(entry)}>Edit</button>
                                    <button className="action-button" onClick={() => handleDelete(entry.question, entry.video_path)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomProfile;
