import React from "react";
import Sizebox from "../../../../../components/courseTemplates/common/Sizebox";
import image from '../../../assets/image.png';
import AnswerHandler from "../../../components/answer-handler/index.jsx";
import Divider from "../../../components/divider/index.jsx";
import DossierComponent from "../../../components/dossier/index";
import MessagesComponent from "../../MessagePage/MessagesPage.tsx";
import { chats1 } from '../../chat-datas/data2.tsx';

const DossierWithHandler = AnswerHandler(DossierComponent);

function Level_3_1() {
    return (
        <>
            <div className='message-page'>
                <div className='message-page-container'>
                    <MessagesComponent image={ image } chats={chats1}/>
                </div>
            </div>

            <Sizebox />

            <Divider />

            <h2>Задача 1</h2>

            <Sizebox height={40} />

            <DossierWithHandler
                levelId={3}
                subLevelId={1}
                taskId={1}
            />

        </>
    );
}

export default Level_3_1;
