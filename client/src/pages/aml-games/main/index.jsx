import React, { useEffect, useState } from 'react';

import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { NavbarProfile } from '../navbar';
import headerBg from './../assets/main-header-background.png';
import ringImage from './../assets/ring-image.png';
import './style.scss';

import axios from 'axios';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { useNavigate } from 'react-router';
import base_url from '../../../settings/base_url';
import { initialLevels } from './mockDatas';

function GameMain() {
    const [tabIndex, setTabIndex] = useState(1);
    const tabNames = ['Материал курса', 'Отметки', 'AML GAME'];

    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();
    const [levels, setLevels] = useState(initialLevels);

    useEffect(() => {
        axios.get(`${base_url}/api/aml/game/getResults`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(response => {
            const fetchedData = response.data;
            
            // Merge initial levels with fetched data
            const updatedLevels = levels.map((level, index) => {
                const backendLevel = fetchedData.find(item => item.user_game_level_id === index + 1);

                if (backendLevel) {
                    return {
                        ...level,
                        status: backendLevel.isActive ? 'finished' : 'closed', // Use isActive to determine status
                        grade: backendLevel.percentage !== null ? Math.round(backendLevel.percentage) : level.grade,
                        subLevels: level.subLevels.map((subLevel, subIndex) => ({
                            ...subLevel,
                            progress: backendLevel.userGameSubLevelList[subIndex]?.percentage || 0
                        }))
                    };
                }
                return level;
            });

            setLevels(updatedLevels); // Update state with the new levels
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [token]);

    return ( 
        <div className="game-main">
            <NavbarProfile />
            <div className="container">

                <div className="header">
                    <img src={headerBg} alt="" className="background" />
                    <img src={ringImage} alt="" />
                    <h1>Добро пожаловать в симулятор компании в сфере ПОД/ФТ!</h1>
                    <div className="desc">
                        <div className="title">Описание компании и задачи игры</div>
                        <div>Желаем успехов в освоении новых знаний в области противодействия отмыванию денег и финансированию терроризма.</div>
                        <div><span>Ваша главная задача</span> - внедрить внутреннюю политику в сфере ПОД/ФТ.</div>

                    </div>
                </div>

                <section>
                    <div className="left">
                        <div className="role-name">Ювелирный магазин</div>
                        <div className="navigation">
                            <div 
                                className={`${tabIndex === 1 ? 'active' : ''}`}
                                onClick={(e) => setTabIndex(1)}
                            >
                                <FaChevronRight />
                                <div>Материал курса</div>
                            </div>
                            <div 
                                className={`${tabIndex === 2 ? 'active' : ''}`}
                                onClick={(e) => setTabIndex(2)}
                            >
                                <FaChevronRight />
                                <div>Отметки</div>
                            </div>
                            <div 
                                className={`${tabIndex === 3 ? 'active' : ''}`}
                                onClick={(e) => setTabIndex(3)}
                            >
                                <FaChevronRight />
                                <div>Информация о курсе</div>
                            </div>
                            <div 
                                className={`${tabIndex === 4 ? 'active' : ''}`}
                                onClick={(e) => setTabIndex(4)}
                            >
                                <FaChevronRight />
                                <div>Как играть?</div>
                            </div>
                            <div 
                                style={{display:'flex', justifyContent:'center', backgroundColor:'#3c7bc4', color:'white'}}
                                onClick={(e) => navigate(`/courses/aml-games/game/read/1/1/1`)}
                            >
                                <div>Начать игру &#10148;</div>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <h3>Описание</h3>
                        <p>Вы открыли ювелирный салон, осуществляющий деятельность в сфере купли-продажи ювелирных изделий, и, следовательно, являетесь одним из субъектов финансового мониторинга. Ваш магазин пока еще не открылся и не проводил операций, но планируется запустить свою деятельность в ближайшее время.</p>
                        <p>Важно понимать, что ваша организация еще не настроила политику в сфере противодействия легализации доходов, полученных преступным путем, и финансированию терроризма (ПОД/ФТ). Ваши задачи включают разработку и внедрение всех необходимых мер для соблюдения требований законодательства о ПОД/ФТ.</p>

                        <div className="tab">
                            <div className="title">
                                <div className="inner">{tabNames[tabIndex-1]}</div>
                            </div>

                            {
                                tabIndex === 1 
                                    ? (
                                        <div className="levels">
                                            {
                                                levels.map((level, index) => {

                                                    return <LevelCard level={level} index={index} />;
                                                })
                                            }
                                            
                                        </div>
                                    )
                                : tabIndex === 2 
                                    ? (
                                        <div className='level-statuses'>
                                            <div className='header-row'>
                                                <div>Элемент</div>
                                                <div>Статус</div>
                                                <div>Оценка</div>
                                            </div>
                                            {
                                                levels.map((level, index) => {

                                                    return (
                                                        <div>
                                                            <div>
                                                                <div>{index+1} уровень</div>
                                                                <div>{level.name}</div>
                                                            </div>
                                                            <div>
                                                                {
                                                                    level.status === 'finished'
                                                                        ? "Пройден"
                                                                    : level.status === 'closed'
                                                                        ? <span><AiOutlineExclamationCircle/> Заблокирован</span>
                                                                    : ''
                                                                }
                                                            </div>
                                                            <div>
                                                                {level.grade ? `${level.grade}%` : '--'}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                : tabIndex === 3
                                    ? (
                                        <div className='game-info'>
                                            <p><span className="bold">Цель игры "AML GAME"</span> заключается в обучении субъектов финансового мониторинга через интерактивные задания и симуляции, предоставляя им возможность получить знания и навыки, необходимые для эффективного выполнения требований законодательства о противодействии легализации доходов, полученных преступным путем (ПОД/ФТ), а также подготовки к различным реальным ситуациям. Игра способствует систематическому улучшению компетентности участников, повышению их уровня знаний и практическому применению этих знаний в профессиональной деятельности.</p>
                                            
                                            <DropDownContent title={'Цель и задачи игры'}>
                                                <div className='goal'>
                                                    <div><span>1.</span><span>Обучение субъектов финансового мониторинга основам ПОД/ФТ.</span></div>
                                                    <div><span>2.</span><span>Практическое применение полученных знаний через интерактивные задания и симуляции.</span></div>
                                                    <div><span>3.</span><span>Оценка и управление рисками, связанными с клиентами и операциями.</span></div>
                                                    <div><span>4.</span><span>Мониторинг операций и подготовка отчетов.</span></div>
                                                    <div><span>5.</span><span>Повышение профессиональной компетентности через постепенное усложнение заданий.</span></div>
                                                </div>
                                            </DropDownContent>
                                            <DropDownContent title={'Условия прохождения игры'}>
                                                <div className='statement'>
                                                    <div><span></span><span>Сроки прохождения игры: Время, отведенное на завершение всех уровней игры – 30 дней.</span></div>
                                                    <div><span></span><span>Длительность обучения: Общая продолжительность времени, необходимая для прохождения всех этапов определены на каждом уровне игры.</span></div>
                                                    <div><span></span><span>Условия прохождения игры: Для успешного прохождения уровней игроку необходимо выполнить задания с результатом не менее 70%.</span></div>
                                                    <div><span></span><span>Количество попыток: Игроку предоставляется 3 попытки для выполнения заданий и прохождения уровней. При превышении 3 попыток, необходимо начать уровень заново.</span></div>
                                                    <div><span></span><span>Оценка и обратная связь: Система автоматически оценивает правильность выполнения заданий и отображает процент выполнения. Игрокам также доступна обратная связь. В чате можно задать вопросы, и мы обязательно предоставим ответ.</span></div>
                                                    <div><span></span><span>Сертификация: После успешного выполнения всех заданий в игре вам будет предоставлен сертификат, который можно будет найти в вашем личном кабинете.</span></div>
                                                    <div><span></span><span>Технические требования: Необходимые технические условия для прохождения игры (хорошее интернет-соединение и компьютер).</span></div>
                                                    <div><span></span><span>Поддержка и помощь: Вы можете обратиться в чат «Обратной связи» или по тел. +7 708 716 84 16, для получения помощи в случае возникновения вопросов или проблем.</span></div>
                                                </div>
                                            </DropDownContent>
                                            <DropDownContent title={'Нормативная основа игры'}>
                                                <div className="normative">
                                                    <p>При формировании материалов курса были использованы следующие нормативные правовые акты:</p>
                                                    <div>
                                                        <div><span></span><span className='underlined'>Закон РК «О противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма»;</span></div>
                                                        <div><span></span><span>Приказ Председателя АФМ РК от 22.02.2022 года № 13 «Об утверждении Правил представления субъектами финансового мониторинга сведений и информации об операциях, подлежащих финансовому мониторингу, и признаков определения подозрительной операции»;</span></div>
                                                        <div><span></span><span>Приказ Председателя АФМ РК от 06.08.2021 года № 4 «Об утверждении Требований к правилам внутреннего контроля в целях противодействия легализации (отмыванию) доходов, полученных преступным путем, финансированию терроризма и финансированию распространения оружия массового уничтожения для не финансового сектора»;</span></div>
                                                        <div><span></span><span>Международные стандарты в сфере ПОД/ФТ и др.</span></div>
                                                    </div>
                                                </div>
                                            </DropDownContent>

                                        </div>
                                    )
                                : null
                            }
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

const DropDownContent = ({
    title,
    children
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="dropDownContent" >
            <div className={`title ${open ? 'open' : ''}`} onClick={(e) => setOpen(prev => !prev)}>
                <FaChevronRight />
                <div>{title}</div>
            </div>
            {
                open 
                    ? <div className="inner">{children}</div>
                    : null
            }
        </div>
    )
}

const LevelCard = ({
    index,
    level
}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    return (
        <div className={`level ${open ? 'open' : ''}`} key={index}>
            <div className="name-row">
                <FaChevronRight onClick={(e) => setOpen(prev => !prev)}/>
                <div className='num'>{index + 1} уровень</div>
                <div className="name">{level.name}</div>
            </div>
            {
                open ? (
                    <div className="sublevels">
                        {
                            level.subLevels.map((subLevel, idx) => {

                                return <div >
                                    <MdOutlineAlternateEmail />
                                    <div className="sublevel-name">Задание {index + 1}.{idx + 1} : {subLevel.name}</div>
                                </div>
                            })
                        }
                    </div>
                ) : null

            }
        </div>
    )
}

export default GameMain;