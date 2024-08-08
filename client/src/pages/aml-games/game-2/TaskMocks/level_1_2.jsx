import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sizebox from "../../../../components/courseTemplates/common/Sizebox/index.jsx";
import AsianMan from "../../assets/asian-man.png";
import AsianWomen from "../../assets/asian-woman.png";
import CardAmlLogo from "../../assets/card-aml-logo.svg";
import WhiteMan from "../../assets/white-man.png";
import QuizCards from "../../components/QuizCards";
import VerticalCarousel from '../../components/VerticalCarousel/index.jsx';
import { chats } from "../chat-datas/data1.tsx";
import MessagesPage from "../MessagePage/MessagesPage.tsx";
import { addAnswer } from '../store/slices/answersSlice.ts'; // Импортируйте действие

const cardData = [
    { name: 'Айжан', date: '01.02.1998', id: '**KAZAKHSTAN001**', characterImg: AsianWomen },
    { name: 'Дамир', date: '01.02.1999', id: '**KAZAKHSTAN002**', characterImg: AsianMan },
    { name: 'Дархан', date: '01.02.2000', id: '**KAZAKHSTAN003**', characterImg: WhiteMan }
];

const quizCardsData = [
    { id: 1, text: 'Разработку и согласование, внесение изменений и (или) дополнений в ПВК, а также мониторинг реализации и соблюдения ПВК' },
    { id: 2, text: 'Разработку и согласование, внесение изменений и (или) дополнений в ПВК, а также мониторинг реализации и соблюдения ПВК' },
];

function Level_1_2() {
    const [finished, setFinished] = useState(false);
    const dispatch = useDispatch(); // Используйте хук useDispatch

    useEffect(() => {
    }, [finished]);

    const handleConfirm = (pageId, taskId, answer) => {
        dispatch(addAnswer({ pageId, taskId, answer }));
        setFinished(true);
    };

    return ( 
        <>
            <div className='message-page'>
                <div className='message-page-container'>
                    <MessagesPage image={ null } chats={chats}/>
                </div>
            </div>
            <Sizebox height={100} />
            <Divider sx={{backgroundColor:"rgba(31, 60, 136, 0.7)"}} />
            <div>
                <h2>
                    Задача 1
                </h2>
                <div className='task1-national-id-card'>
                    <p className='task1-national-id-card-p-text'>Назначьте на должность сотрудника, который наилучшим образом соответствует требованиям ПОД/ФТ и потребностям вашей организации.</p>
                    <VerticalCarousel cards={cardData} />
                </div>
                <div className="actions">
                    <button 
                        className='blue'
                        onClick={() => handleConfirm(1, 1, 'Айжан')} // Пример передачи данных
                    >Подтвердить</button>
                </div>
            </div>
            
            <Sizebox height={100} />
            <Divider sx={{ backgroundColor: "rgba(31, 60, 136, 0.7)" }} />
            <div>
                <h2>
                    Задача 2
                </h2>
                <p>После определения правильного кандидата на должность ответственного сотрудника, требуется определить его функции в сфере ПОД/ФТ</p>
                <Sizebox height={40} />
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {quizCardsData.map(card => (
                    <QuizCards key={card.id} logo={CardAmlLogo} text={card.text} />
                ))}
        </div>
            </div>

        </>
    );
}

export default Level_1_2;
