import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import base_url from "../../../../../settings/base_url";
import LevelSummary from "../../../components/LevelCircleResult";
import LevelProgress from "../../../components/LevelResult";
import './style.css';

function Level_Result({ level }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwtToken");
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${base_url}/api/aml/game/getResults`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(response => {
            setData(response.data);
            setIsLoading(false); // Устанавливаем isLoading в false после получения данных
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setIsLoading(false); // Устанавливаем isLoading в false в случае ошибки
        });
    }, [token]);

    const subLevels1 = data ? [
        { title: 'Задание 1.1 : Подача уведомления СФМ', progress: parseInt(data[0]?.userGameSubLevelList[0]?.percentage) },
        { title: 'Задание 1.2 : Определение ответственного лица по ПОД/ФТ', progress: parseInt(data[0]?.userGameSubLevelList[1]?.percentage) },
        { title: 'Задание 1.3 : Регистрация в личном кабинете', progress: parseInt(data[0]?.userGameSubLevelList[2]?.percentage) },
        { title: 'Задание 1.4 : Формирование досье клиента', progress: parseInt(data[0]?.userGameSubLevelList[3]?.percentage) },
        { title: 'Задание 1.5 : Разработка анкеты «Знай своего клиента»', progress: parseInt(data[0]?.userGameSubLevelList[4]?.percentage) }
    ] : [];
    const subLevels2 = data ? [
        { title: 'Задание 2.1 : Оценка риска в зависимости от типа клиента', progress: parseInt(data[1]?.userGameSubLevelList[0]?.percentage) },
        { title: 'Задание 2.2 : Оценка странового риска', progress: parseInt(data[1]?.userGameSubLevelList[1]?.percentage) },
        { title: 'Задание 2.3 : Оценка риска услуги и продукта', progress: parseInt(data[1]?.userGameSubLevelList[2]?.percentage) },
        { title: 'Задание 2.4 : Оценка риска способа предоставления услуги', progress: parseInt(data[1]?.userGameSubLevelList[3]?.percentage) },
        { title: 'Задание 2.5 : Оценка риска способа предоставления услуги', progress: parseInt(data[1]?.userGameSubLevelList[3]?.percentage) },
    ] : [];
    const subLevels3 = data ? [
        { title: 'Задание 3.1 :  Надлежащая проверка клиента', progress: parseInt(data[2]?.userGameSubLevelList[0]?.percentage) },
    ] : [];
    const subLevels4 = data ? [
        { title: 'Задание 4.1 :  Мониторинг операции', progress: parseInt(data[3]?.userGameSubLevelList[0]?.percentage) },
    ] : [];

    const subLevel = data ?
        (level === 1 ? subLevels1 : level === 2 ? subLevels2 : level === 3 ? subLevels3 : subLevels4) : [];

    const Level = data ?
        (level === 1 ? parseInt(data[0]?.percentage) : level === 2 ? parseInt(data[1]?.percentage) : level === 3 ? parseInt(data[2]?.percentage) : parseInt(data[3]?.percentage)) : '';

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loading-text">Подсчет результатов</div>
                <div className="loading-icon">&#8635;</div>
            </div>
        );
    }

    const isButtonDisabled = Level < 70;

    return (
        <>
            <div className="result-page">
                <div className="level-progress">
                    <LevelProgress level={level} title="Организация внутреннего контроля" subLevels={subLevel} />
                </div>
                <div className="level-summary">
                    <LevelSummary
                        percentage={data ? Level : 70}
                        score={data ? Level : 70}
                        level={level}
                        description="Ты выполнил некоторые задания неверно. Возможно, тебе еще не до конца понятен учебный материал этого уровня. Для того чтобы пройти этот уровень нужно набрать больше 70%."
                        recommendations="Для дальнейшего прогресса тебе важно активно работать над исправлением ошибок и заполнением пробелов в практических знаниях."
                    />
                </div>
            </div>
            <div className="result-button-wrapper">
                <div className="result-button">
                    <button
                        className="blue"
                        onClick={() => {
                            if (!isButtonDisabled) {
                                navigate(`/courses/aml-games/game/read/1/${Number(level) + 1}/1`);
                            }
                        }}
                        disabled={isButtonDisabled} // Отключаем кнопку, если Level < 70
                    >
                        Следующий уровень
                    </button>
                </div>
            </div>
        </>
    );
}

export default Level_Result;
