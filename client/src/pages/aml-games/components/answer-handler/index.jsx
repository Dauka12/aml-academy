// src/components/AnswerHandler.jsx
import React from 'react';
import { sendAnswerToBackend } from '../../utils/api';

const AnswerHandler = (WrappedComponent) => {
    return ({ levelId, subLevelId, taskId, ...props }) => {
        const handleSubmit = (answers, isCorrect) => {
            sendAnswerToBackend(levelId, subLevelId, taskId, answers, isCorrect);
        };

        return <WrappedComponent {...props} handleSubmit={handleSubmit} />;
    };
};

export default AnswerHandler;
