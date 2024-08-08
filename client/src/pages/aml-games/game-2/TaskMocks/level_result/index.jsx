import { useNavigate } from "react-router";
import LevelSummary from "../../../components/LevelCircleResult";
import LevelProgress from "../../../components/LevelResult";
import './style.css';

const subLevels = [
    { title: 'Уровень 1.1 : Подача уведомления СФМ', progress: 100 },
    { title: 'Уровень 1.2 : Определение ответственного лица по ПОД/ФТ', progress: 20 },
    { title: 'Уровень 1.3 : Регистрация в личном кабинете', progress: 33 },
    { title: 'Уровень 1.4 : Формирование досье клиента', progress: 50 }

];

function Level_Result({level}) {
    const navigate = useNavigate();
    return (
        <>
            <div className="result-page">
                <div className="level-progress" >
                    <LevelProgress level={level} title="Организация внутреннего контроля" subLevels={subLevels} />
                </div>
                <div className="level-summary">
                    <LevelSummary
                        percentage={75}
                        score={10}
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