// Book.jsx
import React, { useState } from 'react';
import '../styles/book.css'


        const Book = () => {
        const [showQuiz, setShowQuiz] = useState(false);

        const startQuiz = () => {
            setShowQuiz(true);
        };

        return (
            <div className="book-page">
            <h2>Welcome to Bangladesh Tour Booking</h2>
            {!showQuiz && <button className="quiz-btn" onClick={startQuiz}>Take Quiz</button>}
            {showQuiz && <Quiz />}
            </div>
        );
        };

        const Quiz = () => {
        const questions = [
            {
                question: 'Which city is known as the port city of Bangladesh?',
                options: ['Chittagong', 'Sylhet', 'Rajshahi', 'Khulna'],
                answer: 'Chittagong'
              },
              {
                question: 'What is the highest peak of Bangladesh?',
                options: ['Sajek', 'Sundarban', 'Keokradong', 'Bandarban'],
                answer: 'Keokradong'
              },
              {
                question: 'Which of the following is a famous tourist destination in Bangladesh known for its beaches?',
                options: ['Sundarban', 'Cox\'s Bazar', 'Sylhet', 'Rangamati'],
                answer: 'Cox\'s Bazar'
              },
              {
                question: 'What is the nickname of Bangladesh?',
                options: ['The Land of Rivers', 'The Land of Tigers', 'The Land of Festivals', 'The Land of Smiles'],
                answer: 'The Land of Rivers'
              },

              {
                question: 'What is the national flower of Bangladesh?',
                options: ['Rose', 'Lotus', 'Sunflower', 'Water Lily'],
                answer: 'Water Lily'
              },
              
        ];

        const [questionIndex, setQuestionIndex] = useState(0);
        const [selectedOption, setSelectedOption] = useState('');
        const [score, setScore] = useState(0);
        const [showResult, setShowResult] = useState(false);
        const [couponCode, setCouponCode] = useState('');

        const handleOptionSelect = (option) => {
            setSelectedOption(option);
        };

        const nextQuestion = () => {
            if (selectedOption === questions[questionIndex].answer) {
            setScore(score + 1);
            }
            setSelectedOption('');
            if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
            } else {
            generateCouponCode();
            }
        };

        const generateCouponCode = () => {
            const discountPercentage = Math.min(score, 5); // Maximum discount of 5%
            const coupon = `BDTOUR${discountPercentage}`;
            setCouponCode(coupon);
            setShowResult(true);
        };

        return (
            <div className="quiz-container">
            {!showResult ? (
                <div className="question-container">
                <h3>Question {questionIndex + 1}</h3>
                <p>{questions[questionIndex].question}</p>
                <div className="options">
                    {questions[questionIndex].options.map((option, index) => (
                    <button key={index} className={`option-btn ${selectedOption === option ? 'selected' : ''}`} onClick={() => handleOptionSelect(option)}>{option}</button>
                    ))}
                </div>
                <button className="next-btn" onClick={nextQuestion}>Next</button>
                </div>
            ) : (
                <div className="result-container">
                <h3>Congratulations!</h3>
                <p>You have completed the quiz.</p>
                <p>Your score: {score} out of {questions.length}</p>
                <p>Your discount coupon: {couponCode}</p>
                </div>
            )}
            </div>
        );
        };

        export default Book
 
