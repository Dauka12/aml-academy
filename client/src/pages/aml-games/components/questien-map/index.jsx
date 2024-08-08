import React, { useEffect, useState } from 'react';
import QuestionComponent from '../question-component';
import './style.css';

const QuestionMap = ({testData, typeOfQuestion}) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // const fetchQuestions = async () => {
        //     try {
        //         const response = await axios.get('/api/questions');
        setQuestions(testData);
        //     } catch (error) {
        //         console.error('Error fetching questions:', error);
        //     }
        // };

        // fetchQuestions();
    }, []);

    return (
        <div className='centering-questions'>
            <div className="main-container-questions">
            <p className='type-of-questions'>{ typeOfQuestion }</p>
                {questions.map(question => (
                    <QuestionComponent key={question.id} question={question} />
                ))}
            </div>
        </div>
    )
}

export default QuestionMap
