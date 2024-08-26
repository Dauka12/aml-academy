import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AnswerHandler from "../../../components/answer-handler";
import ClientReview from "../../../components/client-review";
import NameList from "../../../components/name-list";
import QuestionMap from "../../../components/questien-map";
import { setTaskBySublevel } from '../../store/slices/taskSlice';
import './style.css';

const QuestionMapWithHandler = AnswerHandler(QuestionMap);
const NameListWithHandler = AnswerHandler(NameList); 
const ClientReviewWithHandler = AnswerHandler(ClientReview);

function Level_2_1() {

    const { tasks, currentTaskIndex } = useSelector((state) => state.tasks);
    const currentTask = tasks[currentTaskIndex];
    const dispatch = useDispatch();
    const { level, subLevel } = useParams(); 

    useEffect(() => {
        dispatch(setTaskBySublevel({ levelId: Number(level), subLevelId: Number(subLevel) }));
    }, [level, subLevel, dispatch]);
    
    return ( 
        <>
        <TransitionGroup>
            <CSSTransition
                key={currentTaskIndex}
                timeout={500} // Duration of the transition
                classNames="fade"
            >
                <div className="task-content">
                    {currentTask?.content}
                </div>
            </CSSTransition>
        </TransitionGroup>
    </>
    );
}

export default Level_2_1;
