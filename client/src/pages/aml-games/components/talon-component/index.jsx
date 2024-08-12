import React from 'react';
import GameQuiz from "../../components/quiz";
;

const TalonComponent = ({ formData, questions, handleFinished, count }) => {
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
                                    <input type={field.type} />
                                </div>
                            ))}
                            {section.quizComponent && (
                                <GameQuiz questions={questions} />
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <div className="actions">
                <button
                    className='blue'
                    style={{ pointerEvents: count === 1 ? "none" : "" }}
                    onClick={(e) => handleFinished()}
                >
                    Подтвердить
                </button>
            </div>
        </div>
    );
};

export default TalonComponent;
