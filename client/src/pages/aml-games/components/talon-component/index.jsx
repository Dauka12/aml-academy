import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import GameQuiz from "../../components/quiz";
import SubmissionButton from '../../components/sub-button';
import { nextTask } from '../../game-2/store/slices/taskSlice';

const TalonComponent = ({ formData, questions, handleFinished, count, handleSubmit, levelId, subLevelId, taskId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };
    const handleResult = () => {
        handleFinished();
        handleNextTask()
        handleSubmit("talon", true)
        console.log(levelId, subLevelId, taskId);
    }
    
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
            <SubmissionButton handling={handleResult} levelId={levelId} subLevelId={subLevelId} taskId={taskId} />
        </div>
    );
};

export default TalonComponent;
