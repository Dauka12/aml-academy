import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Sizebox from "../../../../components/courseTemplates/common/Sizebox";
import AnswerHandler from "../../components/answer-handler";
import FinishSuccess from "../../components/finish-success";
import ImageCarousel from "../../components/ImageCarousel";
import TalonComponent from "../../components/talon-component";
import TranscriptSwitcher from "../../components/Transcript";
import { setTaskBySublevel } from "../store/slices/taskSlice";
import { mockTasks } from './../mockData';
import { formData, images, questions, scrollToTopAnimated, transcripts1 } from "./data";
import './style.css';
const TalonWithHandler = AnswerHandler(TalonComponent);

function Level_1_1() {
    const [finished, setFinished] = useState(false);
    const [count, setCount] = useState(0)

    const { tasks, currentTaskIndex } = useSelector((state) => state.tasks);
    const currentTask = tasks[currentTaskIndex];
    const dispatch = useDispatch();
    const { level, subLevel } = useParams(); 

    useEffect(() => {
        dispatch(setTaskBySublevel({ levelId: Number(level), subLevelId: Number(subLevel) }));
        scrollToTopAnimated()
    }, [level, subLevel, dispatch]);


    useEffect(() => {
        setFinished(mockTasks[0].status === 'finished' ? true : false);
    }, [])
    function handleFinished() {
        setFinished(true)
        setCount(1)
        setTimeout(() => {
            setFinished(false)
        }, 2000)
    }

    return ( 
        <>
            <h2>Презентация портала e-lisence</h2>
            <ImageCarousel images={images} /> 
            <TranscriptSwitcher transcripts={transcripts1} />

            <Sizebox height={40} />

            
            {currentTask?.content}
            <TalonWithHandler  
                formData={formData}
                questions={questions}
                handleFinished={handleFinished}
                count={count}
                levelId={1}
                subLevelId={1}
                taskId={1} />
            {
                finished 
                    ? (
                        <FinishSuccess>
                            Вы успешно получили свой талон!
                        </FinishSuccess>
                    ) 
                    : null
            }
        </>
    );
}

export default Level_1_1;