import Divider from '@mui/material/Divider';
import React from 'react';
import Sizebox from "../../../../components/courseTemplates/common/Sizebox/index.jsx";
import AnswerHandler from '../../components/answer-handler/index.jsx';
import QuizCards from '../../components/QuizCards';
import VerticalCarousel from '../../components/VerticalCarousel/index.jsx';
import { chats } from "../chat-datas/data1.tsx";
import MessagesPage from "../MessagePage/MessagesPage.tsx";
import { cardData, quizCardsData } from './data.js';

const VerticalCarouselWithHandler = AnswerHandler(VerticalCarousel);
const QuizCardWithHandler = AnswerHandler(QuizCards);


function Level_1_2() {


    return ( 
        <>
            <div className='message-page'>
                <div className='message-page-container'>
                    <MessagesPage image={null} chats={chats} />
                </div>
            </div>

            <Sizebox height={100} />

            <Divider sx={{ backgroundColor: "rgba(31, 60, 136, 0.7)" }} />
            
            <div>
                <h2>Задача 1</h2>
                <div className='task1-national-id-card'>
                    <p className='task1-national-id-card-p-text'>
                        Назначьте на должность сотрудника, который наилучшим образом соответствует требованиям ПОД/ФТ и потребностям вашей организации.
                    </p>
                    <VerticalCarouselWithHandler 
                        cards={cardData} 
                        levelId={1}
                        subLevelId={1}
                        taskId={1} 
                    />
                </div>
            </div>
            
            <Sizebox height={100} />
            <Divider sx={{ backgroundColor: "rgba(31, 60, 136, 0.7)" }} />
            <div>
                <h2>Задача 2</h2>
                <p>После определения правильного кандидата на должность ответственного сотрудника, требуется определить его функции в сфере ПОД/ФТ</p>
                <Sizebox height={40} />

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <QuizCardWithHandler
                        quizCardsData={quizCardsData}
                        levelId={1}
                        subLevelId={1}
                        taskId={2}
                    />
                </div>
            </div>
        </>
    );
}

export default Level_1_2;
