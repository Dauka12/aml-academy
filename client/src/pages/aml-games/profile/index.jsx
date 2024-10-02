import React, { useEffect, useState } from 'react';

import './style.scss';

import axios from 'axios';
import { FaAngleLeft, FaAngleRight, FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft, FaRegNewspaper } from "react-icons/fa6";
import { LuTimerReset } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import base_url from '../../../settings/base_url';
import { NavbarProfile } from '../navbar';
import asianMan from './../assets/asian-man.png';
import asianWoman from './../assets/asian-woman.png';
import whiteMan from './../assets/white-man.png';
import whiteWoman from '../assets/white-woman.jpg';
import levelLogo from './level-logo.png';
import ringImg from './ring-image.png';

function GameProfile() {

    const token = localStorage.getItem("jwtToken")
    const [data, setData] = useState()
    const [data1, setData1] = useState()

    const handleClick = () => window.history.back();

        useEffect(() => {
            axios.get(`${base_url}/api/aml/game/getAvatarInfo`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
                .then(response => {
                    console.log(response.data);
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }, [token]);

        useEffect(() => {
            axios.get(`${base_url}/api/aml/game/getUserGame`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
                .then(response => {
                    console.log(response.data);
                    setData1(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }, [token]);
        const handleLevelCount = () => {
            let count = 0;
            for (let i = 0; i < data1?.userGameLevel?.length; i++) {
                if (data1?.userGameLevel[i].isPassed) {
                    count = count + 1
                }
            }
            return count
        }

        return (
            <div className="game-profile">
                <NavbarProfile />
                <div className="container">
                    <section className="main">
                        <button className="nav-back-btn" onClick={()=>handleClick()}>
                            <div><FaArrowLeft /></div>
                            <span>Назад</span>
                        </button>

                        <div className="header">
                            <div className="subject-role">
                                <img src={ringImg} alt="" />
                                <div className="info">
                                    <div className="name">Ювелирный магазин</div>
                                    <div className="date">12.03.2024 - 12.04.2024</div>
                                    <button>Узнать больше</button>
                                </div>
                            </div>

                            <div className="analytic-block">
                                <div className="analytic-container">
                                    <div className="title">
                                        <LuTimerReset />
                                        <span>Аналитика игры</span>
                                    </div>

                                    <div className="levels">
                                        <div className="all">
                                            <div className="logo">
                                                <FaRegNewspaper />
                                            </div>
                                            <div>Уровни</div>
                                            <div>6</div>
                                        </div>
                                        <div className="finished">
                                            <div className="logo">
                                                <FaCheckCircle />
                                            </div>
                                            <div>Завершенные</div>
                                            <div>{handleLevelCount()}</div>
                                        </div>
                                    </div>

                                    <div className="finish-progress">
                                        <span>Уровень завершения</span>
                                        <div>{data1?.percentage}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="levels-block">
                            <div className="title">
                                <span>Уровни</span>
                            </div>

                            <div className="levels">
                                <LevelCard
                                    color="#80D473"
                                    progress={parseInt(data1?.userGameLevel[0]?.percentage)}
                                    name={'Организация внутреннего контроля'}
                                    level={1}
                                    logo={levelLogo}
                                />
                                <LevelCard
                                    color="#1F3C88"
                                    progress={parseInt(data1?.userGameLevel[1]?.percentage)}
                                    name={'Риск-ориентированный подход'}
                                    level={2}
                                    logo={levelLogo}
                                />
                                <LevelCard
                                    color="#E16666"
                                    progress={parseInt(data1?.userGameLevel[2]?.percentage)}
                                    name={'Надлежащая проверка клиента'}
                                    level={3}
                                    logo={levelLogo}
                                />
                                <LevelCard
                                    color="#bf2ccc"
                                    progress={parseInt(data1?.userGameLevel[3]?.percentage)}
                                    name={'Мониторинг операции'}
                                    level={4}
                                    logo={levelLogo}
                                />
                            </div>

                            <div className="recomendations-block">
                                <div className="title">Рекомендации</div>
                                <div className="recomendations">
                                    <RecomendationCard />
                                    <RecomendationCard />
                                    <RecomendationCard />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="right-bar">
                        <div className="info-block">
                            <div className="avatar">
                                <img src={data?.id === 1 ? whiteMan : data?.id === 2 ? asianMan : data?.id === 3 ? asianWoman : whiteWoman} alt="" />
                            </div>
                            <div className="info">
                                <div className="name">
                                    {data?.first_name}
                                </div>

                                <div className="fio">
                                    <div>Фамилия: <span>{data?.last_name}</span></div>
                                    <div>Имя: <span>{data?.first_name}</span></div>
                                    <div>Отчество: <span>{data?.middle_name}</span></div>
                                    <div>Дата: <span>{data?.date_of_birth}</span></div>
                                    <div>ИИН: <span>{data?.iin}</span></div>
                                </div>

                                <div className='adv-info'>
                                    <div>
                                        <div className="title">Период осуществления деятельности</div>
                                        <div>
                                            <div>Дата начала осуществления деятельности: <span>{data?.start_date}</span></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="title">Адрес</div>
                                        <div>
                                            <div>Почтовый индекс: <span>{data?.postal_code}</span></div>
                                            <div>Место положение: <span>{data?.location}</span></div>
                                            <div>Название улицы: <span>{data?.street_name}</span></div>
                                            <div>Номер дома: <span>{data?.house_number}</span></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="title">Вид субъекта финансового мониторинга</div>
                                        <div>
                                            <div>индивидуальные предприниматели и юридические лица, осуществляющие операции с драгоценными металлами и драгоценными камнями, ювелирными изделиями из них</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="calendar">
                            <div className="title">
                                <div className="date">Май 2024</div>
                                <div className="actions">
                                    <div className="prev"><FaAngleLeft /></div>
                                    <div className="next"><FaAngleRight /></div>
                                </div>
                            </div>
                            <div className='week'>
                                <div className='active'>
                                    <div>Пн</div>
                                    <div>27</div>
                                </div>
                                <div>
                                    <div>Вт</div>
                                    <div>28</div>
                                </div>
                                <div>
                                    <div>Ср</div>
                                    <div>29</div>
                                </div>
                                <div>
                                    <div>Чт</div>
                                    <div>30</div>
                                </div>
                                <div>
                                    <div>Пт</div>
                                    <div>31</div>
                                </div>
                                <div>
                                    <div>Сб</div>
                                    <div>1</div>
                                </div>
                                <div>
                                    <div>Вс</div>
                                    <div>2</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    const LevelCard = ({
        color,
        progress,
        name,
        level,
        logo
    }) => {
        const navigate = useNavigate();

        const handleClick = () => {
            navigate(`/courses/aml-games/game/read/${1}/${level}/1/`);
        }

        return (
            <div className="level-card" onClick={(e) => handleClick()}>
                <div className="left">
                    <img src={logo} alt="" />
                    <div className="info">
                        <div className="name">{name}</div>
                        <div className="step">Уровень {level}</div>
                    </div>
                </div>
                <div className="progress-bar-container">
                    <div className="progress" style={{ borderColor: color }}>
                        <div className="fill" style={{ width: `${progress}%`, backgroundColor: color }}></div>
                    </div>
                    <div className="percentage">{progress}%</div>
                </div>
            </div>
        )
    }

    const RecomendationCard = () => {

        return (
            <div className="recomendation">
                <div className="logo">
                    <img src={levelLogo} alt="" />
                </div>
                <div className="name">Обменные пункты</div>
            </div>
        )
    }

    export default GameProfile;