import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import base_url from "../../../../../settings/base_url";
import LevelSummary from "../../../components/LevelCircleResult";
import LevelProgress from "../../../components/LevelResult";
import './style.css';



function Level_Result({level}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwtToken")
    const [data, setData] = useState()

    useEffect(() => {
        axios.get(`${base_url}/api/aml/game/getResults`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(response => {
            console.log(response.data); // This will log the data correctly
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [token]);
    

    const subLevels = data ? [
        { title: 'Уровень 1.1 : Подача уведомления СФМ', progress: parseInt(data[0]?.userGameSubLevelList[0]?.percentage) },
        { title: 'Уровень 1.2 : Определение ответственного лица по ПОД/ФТ', progress: parseInt(data[0]?.userGameSubLevelList[1]?.percentage) },
        { title: 'Уровень 1.3 : Регистрация в личном кабинете', progress: parseInt(data[0]?.userGameSubLevelList[2]?.percentage) },
        { title: 'Уровень 1.4 : Формирование досье клиента', progress: parseInt(data[0]?.userGameSubLevelList[3]?.percentage) },
        { title: 'Уровень 1.5 : Формирование досье клиента', progress: parseInt(data[0]?.userGameSubLevelList[4]?.percentage) }
    ] : [];
    return (
        <>
            <div className="result-page">
                <div className="level-progress" >
                    <LevelProgress level={level} title="Организация внутреннего контроля" subLevels={subLevels} />
                </div>
                <div className="level-summary">
                    <LevelSummary
                        percentage={data? parseInt(data[0]?.percentage) : 70}
                        score={data? parseInt(data[0]?.percentage) : 70}
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
                            navigate(`/courses/aml-games/game/read/1/${Number(level) + 1}/1`);
                        }}
                    >
                        Следующий уровень
                    </button>
                </div>
            </div>
        </>
    );
}

export default Level_Result;