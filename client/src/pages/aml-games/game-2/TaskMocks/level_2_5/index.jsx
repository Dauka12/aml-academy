import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { setTaskBySublevel } from "../../store/slices/taskSlice";
import { scrollToTopAnimated } from "../data";
import './style.css';

import '../style.css';
function Level_2_5() {
    const { tasks, currentTaskIndex } = useSelector((state) => state.tasks);
    const currentTask = tasks[currentTaskIndex];
    const dispatch = useDispatch();
    const { level, subLevel } = useParams();

    useEffect(() => {
        dispatch(setTaskBySublevel({ levelId: Number(level), subLevelId: Number(subLevel) }));
    }, [level, subLevel, dispatch]);

    useEffect(() => {
        scrollToTopAnimated(); // Scroll to top whenever the task changes
    }, [currentTaskIndex]);

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

export default Level_2_5;