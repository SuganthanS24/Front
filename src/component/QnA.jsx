import React, { useState, useEffect } from 'react';
import './QnA.css'; // Import CSS if needed

const QnA = () => {
    const [mainQuestion, setMainQuestion] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState('');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    const maxQuestions = 3;

    useEffect(() => {
        fetchResponses();
    }, []);

    const addQuestion = () => {
        if (questions.length < maxQuestions) {
            setQuestions([...questions, { id: questions.length + 1, value: '' }]);
        }
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(question => question.id !== id));
    };

    const handleQuestionChange = (id, value) => {
        setQuestions(questions.map(question =>
            question.id === id ? { ...question, value } : question
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const trimmedQuestions = questions.map(q => q.value.trim()).filter(value => value);
        const trimmedMainQuestion = mainQuestion.trim();
        const trimmedAnswer = answer.trim();
    
        if (trimmedMainQuestion && trimmedAnswer) {
            // Check if there is at least one alternative question
            if (trimmedQuestions.length > 0 || questions.length === 0) {
                const data = { mainQuestion: trimmedMainQuestion, answer: trimmedAnswer, questions: trimmedQuestions };
    
                try {
                    const response = await fetch('https://robomiracle.onrender.com/update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
    
                    const result = await response.json();
                    console.log('Response from server:', result);
    
                    if (result.success) {
                        setMainQuestion('');
                        setAnswer('');
                        setQuestions([]);
                        alert('Response updated successfully!');
                    } else {
                        alert('Failed to update response');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while updating the response');
                }
            } else {
                alert('Please provide at least one alternative question or remove all alternative questions.');
            }
        } else {
            alert('Please fill out the main question and the answer.');
        }
    };
    

    const fetchResponses = async () => {
        try {
            const response = await fetch('https://robomiracle.onrender.com/responses');
            const data = await response.json();
            const formattedResponses = Object.entries(data).map(([answer, questions]) => ({
                answer,
                questions,
            }));
            setResponses(formattedResponses);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching responses:', error);
            setLoading(false);
        }
    };

    return (
        <section className="qna">
            <div className="cont">
                <h1>Update Q&A</h1>
                <form className="qa-form" onSubmit={handleSubmit}>
                    <div className="qa-right">
                        <div id="questionsContainer">
                            <div className="question-input">
                                <label htmlFor="mainQuestion">Main Question:</label>
                                <input
                                    type="text"
                                    id="mainQuestion"
                                    value={mainQuestion}
                                    onChange={(e) => setMainQuestion(e.target.value)}
                                    className="question"
                                    required
                                />
                            </div>
                            {questions.map(question => (
                                <div key={question.id} className="question-input">
                                    <label htmlFor={`question-${question.id}`}>Alternative Question:</label>
                                    <input
                                        type="text"
                                        id={`question-${question.id}`}
                                        value={question.value}
                                        onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                                        className="question"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="remove-question"
                                        onClick={() => removeQuestion(question.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        {questions.length < maxQuestions && (
                            <button type="button" id="addQuestion" onClick={addQuestion}>
                                Add Question
                            </button>
                        )}
                    </div>
                    <div className="qa-left">
                        <label htmlFor="answer">Answer:</label>
                        <textarea
                            id="answer"
                            name="answer"
                            rows="5"
                            cols="30"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <button className="back-btn" onClick={() => window.location.href = '/'}>
                Back
            </button>
        </section>
    );
};

export default QnA;
