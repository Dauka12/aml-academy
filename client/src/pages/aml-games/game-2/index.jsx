import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import SideBar from '../components/sideBar';
import { NavbarProfile } from '../navbar';
import { mockTasks } from './mockData';
import { store } from './store/index.js';
import './style.scss';
import Level_2_5 from './TaskMocks/level_2_5/index.jsx';
import Level_4_1 from './TaskMocks/level_4_1/index.jsx';

const Level_1_1 = lazy(() => import('./TaskMocks/level_1_1'));
const Level_1_2 = lazy(() => import('./TaskMocks/level_1_2'));
const Level_1_3 = lazy(() => import('./TaskMocks/level_1_3'));
const Level_1_4 = lazy(() => import('./TaskMocks/level_1_4'));
const Level_1_5 = lazy(() => import('./TaskMocks/level_1_5'));
const Level_2_1 = lazy(() => import('./TaskMocks/level_2_1/index.jsx'));
const Level_2_2 = lazy(() => import('./TaskMocks/level_2_2/index.jsx'));
const Level_2_3 = lazy(() => import('./TaskMocks/level_2_3/index.jsx'));
const Level_2_4 = lazy(() => import('./TaskMocks/level_2_4/index.jsx'));
const Level_3_1 = lazy(() => import('./TaskMocks/level_3_1/index.jsx'));
const Level_Result = lazy(() => import('./TaskMocks/level_result'));

const GameReader = () => {
    const navigate = useNavigate();
    const { level, subLevel } = useParams();
    const location = useLocation();

    const [response, setResponse] = useState(
        mockTasks.find(task => `${task.level}` === `${level}` && `${task.subLevel}` === `${subLevel}`) || null
    );

    useEffect(() => {
        setResponse(
            mockTasks.find(task => `${task.level}` === `${level}` && `${task.subLevel}` === `${subLevel}`) || null
        );
        scrollToTopAnimated();
    }, [level, subLevel, location]);

    const scrollToTopAnimated = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const courseContent = document.querySelector('.aml-game-2-main');
        if (courseContent) {
            courseContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const isResultPage = (subLevel === '6' && level === '1') || (subLevel === '6' && level === '2') || (subLevel === '2' && level === '3') || (subLevel === '2' && level === '4');

    return (
        <Provider store={store}>
            <div>
                <NavbarProfile />
                {!isResultPage && (
                    <div className="aml-game-2-main">
                        <SideBar response={response} />
                        <div className="aml-game-right">
                            <div className="aml-game-right-container">
                                <div className="sublevel-title">
                                    Задание {level}.{subLevel} : {response ? response.name : ''}
                                </div>
                                <div className="content">
                                    <GetTaskPage level={level} subLevel={subLevel} />
                                    <div className="page-actions">
                                        {level === 3 && subLevel === 1 ? (
                                            <button
                                                className="blue"
                                                onClick={() => {
                                                    navigate(`/courses/aml-games/game/read/1/${level}/${Number(subLevel) + 1}`); scrollToTopAnimated();
                                                }}
                                            >
                                                Продолжить
                                            </button>
                                        ) : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isResultPage && <GetTaskPage level={level} subLevel={subLevel} />}
            </div>
        </Provider>
    );
};

const GetTaskPage = ({ level, subLevel }) => {
    const levelNum = Number(level);
    const subLevelNum = Number(subLevel);

    if (levelNum === 1 && subLevelNum === 1) return <Suspense><Level_1_1 /></Suspense>;
    if (levelNum === 1 && subLevelNum === 2) return <Suspense><Level_1_2 /></Suspense>;
    if (levelNum === 1 && subLevelNum === 3) return <Suspense><Level_1_3 /></Suspense>;
    if (levelNum === 1 && subLevelNum === 4) return <Suspense><Level_1_4 /></Suspense>;
    if (levelNum === 1 && subLevelNum === 5) return <Suspense><Level_1_5 /></Suspense>;
    if (levelNum === 1 && subLevelNum === 6) return <Suspense><Level_Result level={1} /></Suspense>;

    if (levelNum === 2 && subLevelNum === 1) return <Suspense><Level_2_1 /></Suspense>;
    if (levelNum === 2 && subLevelNum === 2) return <Suspense><Level_2_2 /></Suspense>;
    if (levelNum === 2 && subLevelNum === 3) return <Suspense><Level_2_3 /></Suspense>;
    if (levelNum === 2 && subLevelNum === 4) return <Suspense><Level_2_4 /></Suspense>;
    if (levelNum === 2 && subLevelNum === 5) return <Suspense><Level_2_5 /></Suspense>;
    if (levelNum === 2 && subLevelNum === 6) return <Suspense><Level_Result level={2} /></Suspense>;

    if (levelNum === 3 && subLevelNum === 1) return <Suspense><Level_3_1 /></Suspense>;
    if (levelNum === 3 && subLevelNum === 2) return <Suspense><Level_Result level={3} /></Suspense>;

    if (levelNum === 4 && subLevelNum === 1) return <Suspense><Level_4_1 /></Suspense>;
    if (levelNum === 4 && subLevelNum === 2) return <Suspense><Level_Result level={4} /></Suspense>;


    return null;
};

export default GameReader;