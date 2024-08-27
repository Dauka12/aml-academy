import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import GameQuiz from "../../components/quiz";
import SubmissionButton from '../../components/sub-button';
import { nextTask } from '../../game-2/store/slices/taskSlice';
import './style.scss';

const TalonComponent = ({ formData, questions, handleFinished, handleSubmit, levelId, subLevelId, taskId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState(
        formData.sections.map(section =>
            section.fields ? section.fields.map(() => "") : []
        )
    );
    const [isFormValid, setIsFormValid] = useState(false);
    const [showValidationMessage, setShowValidationMessage] = useState(false);

    const handleInputChange = (sectionIndex, fieldIndex, value) => {
        const newFormValues = [...formValues];
        newFormValues[sectionIndex][fieldIndex] = value;
        setFormValues(newFormValues);

        const allFieldsFilled = newFormValues.flat().every(val => val.trim() !== "");
        setIsFormValid(allFieldsFilled);
    };

    const handleNextTask = () => {
        dispatch(nextTask(navigate));
    };
    useEffect(() => {
        if (!isFormValid) {
            setShowValidationMessage(true);
        }
        if (isFormValid) {
            setShowValidationMessage(false);
        }
    }, [isFormValid])
    const handleResult = () => {
        handleFinished();
        handleNextTask();
        handleSubmit("talon", true);
        console.log(levelId, subLevelId, taskId);
    };

    return (
        <div className="vertical-tabs-form-quiz">
            {formData.sections.map((section, index) => (
                <div key={index}>
                    <div className="title">{section.title}</div>
                    <div className="inner">
                        <div className="left">
                            {section.fields && section.fields.map((field, i) => (
                                <div className="form-item" key={i}>
                                    <label>{field.label}</label>
                                    <input
                                        type={field.type}
                                        value={formValues[index][i]}
                                        onChange={(e) => handleInputChange(index, i, e.target.value)}
                                    />
                                </div>
                            ))}
                            {section.quizComponent && (
                                <GameQuiz questions={questions} />
                            )}
                        </div>
                    </div>
                </div>
            ))}
            {showValidationMessage && (
                <div className="validation-message">
                    Пожалуйста, заполните все поля.
                </div>
            )}
            <SubmissionButton 
                handling={handleResult}
                disabled={!isFormValid} // Заблокировать кнопку, если форма невалидна
                setDisabled = {setIsFormValid}
            />
        </div>
    );
};

export default TalonComponent;
