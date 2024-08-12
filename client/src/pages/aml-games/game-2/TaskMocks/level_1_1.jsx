import { useEffect, useState } from "react";
import Sizebox from "../../../../components/courseTemplates/common/Sizebox";
import FinishSuccess from "../../components/finish-success";
import ImageCarousel from "../../components/ImageCarousel";
import TalonComponent from "../../components/talon-component";
import TranscriptSwitcher from "../../components/Transcript";
import { mockTasks } from './../mockData';
import { formData, images, questions, transcripts } from "./data";

function Level_1_1() {
    const [finished, setFinished] = useState(false);
    const [count, setCount] = useState(0)

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
            <ImageCarousel images={images} /> 
            <TranscriptSwitcher transcripts={transcripts} />

            <Sizebox height={40} />

            
            <h2>Задача 1</h2>
            
            <TalonComponent formData={formData} questions={questions} handleFinished={handleFinished} count={count}/>
            
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