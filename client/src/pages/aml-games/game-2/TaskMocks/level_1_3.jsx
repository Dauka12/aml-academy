import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Sizebox from "../../../../components/courseTemplates/common/Sizebox";
import { setTaskBySublevel } from "../store/slices/taskSlice";
import { scrollToTopAnimated } from "./data";
import './style.css';
function Level_1_3() {
    const dispatch = useDispatch();
    const { tasks, currentTaskIndex } = useSelector((state) => state.tasks);  // Get the tasks and current task index from Redux
    const currentTask = tasks[currentTaskIndex];  // Get the current task to display
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
                    timeout={550}
                    classNames="zoom"
                >
                    <div className="task-content">
                        {currentTask?.content}
                    </div>
                </CSSTransition>
            </TransitionGroup>
            <Sizebox height={60} />
        </>
    );
}

export default Level_1_3;
