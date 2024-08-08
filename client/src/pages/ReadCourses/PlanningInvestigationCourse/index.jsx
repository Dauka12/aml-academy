import React, { useEffect, useState } from 'react';

import file2 from './planning_slides.pdf';
import './style.scss';
import file3 from './образец 1 хронология событий.docx';
import file4 from './образец 2 Таблица доказательств.docx';
import file5 from './порядок планирования.xlsx';
import file1 from './Порядок.docx';

import { useNavigate, useParams } from 'react-router-dom';


import HeaderWithLine from '../../../components/courseTemplates/common/HeaderWithLine';
import Sizebox from '../../../components/courseTemplates/common/Sizebox';
import NextLesson from '../../../components/courseTemplates/complex/NextLesson';
import CourseHeader from '../../../components/courseTemplates/course-header';
import Reveal from '../../../components/Reveal';
import { Module, Session } from '../../../components/sessions/Sessions';

import Centered from '../../../components/courseTemplates/common/Centered';
import FileDownloader from '../../../components/courseTemplates/common/FileDownloader';
import ImageLine from '../../../components/courseTemplates/common/ImageLine';
import ImageWithText from '../../../components/courseTemplates/common/ImageWithText';
import NotNumberedDots from '../../../components/courseTemplates/common/NotNumberedDots';
import NumberedDots from '../../../components/courseTemplates/common/NumberedDots';
import RandomH2 from '../../../components/courseTemplates/common/RandomH2';
import RandomParapraph from '../../../components/courseTemplates/common/RandomParagraph';
import SimpleTable from '../../../components/courseTemplates/common/SimpleTable';
import TextWithBackground from '../../../components/courseTemplates/common/TextWithBackground';
import TextWithTitle from '../../../components/courseTemplates/common/TextWithTitle';
import VideoLine from '../../../components/courseTemplates/common/VideoLine';
import Report_Warning from '../../../components/courseTemplates/common/Warnings/Report';
import IconDots from '../../../components/courseTemplates/common_v2/IconDots';
import Image from '../../../components/courseTemplates/common_v2/Image';
import ImageSequence from '../../../components/courseTemplates/common_v2/ImageSequence';
import InTextFileDownloader from '../../../components/courseTemplates/common_v2/InTextFileDownloader';
import Quote from '../../../components/courseTemplates/common_v2/Quote';
import ThreeColumnsDivider from '../../../components/courseTemplates/common_v2/ThreeColumnsDivider';
import TextAndLink from '../../../components/courseTemplates/complex/TextAndLink';
import lectorImage from './lectorImage.png';


import fiveFingers from '../../../assets/icons/five-fingers.png';
import fourFingers from '../../../assets/icons/four-fingers.png';
import icon1 from '../../../assets/icons/planning1.png';
import icon10 from '../../../assets/icons/planning10.png';
import icon11 from '../../../assets/icons/planning11.png';
import icon12 from '../../../assets/icons/planning12.png';
import icon13 from '../../../assets/icons/planning13.png';
import icon14 from '../../../assets/icons/planning14.png';
import icon15 from '../../../assets/icons/planning15.png';
import icon16 from '../../../assets/icons/planning16.png';
import icon17 from '../../../assets/icons/planning17.png';
import icon18 from '../../../assets/icons/planning18.png';
import icon19 from '../../../assets/icons/planning19.png';
import icon2 from '../../../assets/icons/planning2.png';
import icon3 from '../../../assets/icons/planning3.png';
import icon4 from '../../../assets/icons/planning4.png';
import xIcon from '../../../assets/icons/planning5.png';
import acceptIcon from '../../../assets/icons/planning6.png';
import icon5 from '../../../assets/icons/planning7.png';
import icon6 from '../../../assets/icons/planning8.png';
import icon7 from '../../../assets/icons/planning9.png';
import AFM_logo from '../../../assets/images/crypto_AFM.png';
import paretto from '../../../assets/images/paretto.png';

import axios from 'axios';
import TestPage from '../../../components/courseTemplates/complex/Test';
import base_url from '../../../settings/base_url';

function PlanningInvestigationCourse() {
    const [courseName, setCourseName] = useState('Общий порядок планирования досудебного расследования');
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [activeSessionId, setActiveSessionId] = useState(1);

    const jwtToken = localStorage.getItem('jwtToken');

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [courseProgress, setCourseProgress] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState([])

    const navigate = useNavigate();

    const handleNavOpen = () => {
        setIsNavOpen(prev => !prev);
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    function scrollToTopAnimated() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const courseContent = document.querySelector('.course-content');
        const courseContentScroll = courseContent.scrollTop;

        if (courseContentScroll > 0) {
            //   window.requestAnimationFrame(scrollToTopAnimated);
            courseContent.scrollTo(0, 0);
        }
    }

    const handleWindowResolution = () => {
        const { width, height } = getWindowDimensions();
        if (width <= 1300) {
            setIsNavOpen(false);
        }
    }

    useEffect(() => {
        handleWindowResolution();
        window.addEventListener('resize', handleWindowResolution);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/course/getCourseById/${101}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                // console.log(response.data)

                if (response.status === 200) {
                    setData(response.data);
                    setCourseProgress(response.data.progress_percentage)
                    setQuizQuestions(response.data.course.modules[0].quiz.quizList)
                    console.log(response.data)
                    // console.log(response.data.course.chapters[0].quiz.quizList)

                } else {
                    // Handle other status codes if needed
                    setError(response.statusText);
                    // console.log(response.statusText);
                }


            } catch (error) {
                setError(error);
                console.error(error);
            }

            setLoading(false);
        };

        // console.log(jwtToken);
        fetchData();
    }, [])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${base_url}/api/aml/course/getCourseById/${1}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${jwtToken}`,
    //                 },
    //             });

    //             if (response.status === 200) {
    //                 setCourseProgress(response.data.progress_percentage)
    //             } else {
    //                 // Handle other status codes if needed
    //                 setError(response.statusText);
    //                 // console.log(response.statusText);
    //             }


    //         } catch (error) {
    //             setError(error);
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, [activeSessionId])

    const handleSessionClick = (id) => {
        scrollToTopAnimated();
        setActiveSessionId(id);
    }

    const CheckCurrentChapter = (chapterNum) => {
        // const fetchData = async () => {
        //     try {
        //         const response = await axios.post(
        //             `${base_url}/api/aml/chapter/checked/${chapterNum}`,
        //             {},
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${jwtToken}`,
        //                 },
        //             }
        //         );


        //         if (response.status === 200) {
        //             // console.log(response.data);
        //         } else {
        //             // Handle other status codes if needed
        //             setError(response.statusText);
        //             // console.log(response.statusText);
        //         }
        //     } catch (error) {
        //         if (error.response) {
        //             setError(error.response.data.message || 'An error occurred');
        //             console.error(error.response.data);
        //         } else {
        //             setError(error.message || 'An error occurred');
        //             console.error(error.message);
        //         }
        //     }
        // };

        // // console.log(jwtToken);
        // fetchData();
        scrollToTopAnimated();
        setActiveSessionId(activeSessionId + 1);
    };

    const getLesson = (id) => {
        // console.log('getLesson', quizQuestions)
        switch (id) {
            case 1:
                return (<LessonPage name={'О курсе'}>
                    <Sizebox height={30}/>

                    <Reveal>

                        <div 
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0px 210px',
                                width: '100%',
                                boxSizing: 'border-box',
                            }}
                        >
                            <img 
                                src={AFM_logo} 
                                style={{
                                    height: '100px'
                                }}    
                            />
                            <img 
                                src={'https://gurk.kz/uploads/images/b2/d9/b5/b20d97b5ba0a593e567752302b279da7.jpg'} 
                                style={{
                                    height: '100px'
                                }}        
                            />

                        </div>

                    </Reveal>

                    <Sizebox height={30}/>

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                Авторы учебного курса
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={20}/>
                    <Reveal>
                        <SimpleTable 
                            data={[
                                [
                                    'САУКОМБЕКОВ Саят Махметович', 'Руководитель Следственного департамента АФМ'
                                ],
                                ['ФИНАНСОВ Максим Николаевич', 'Руководитель 3 Следственного управления СД АФМ'],
                                ['БРОВКИНА Анель Николаевна', 'Следователь по особо важным делам 1 СУ СД'],
                                ['СОЛТАНҒАЗЫ Сабит', 'Следователь по особо важным делам 1 СУ СД'],
                                ['БАЕТОВ Канат Жамалханович', 'помощник Ректора AML ACADEMY'],
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={100}/>

                    <Reveal>
                        <Report_Warning>
                            <span className="bold">Целью</span> настоящего Учебного курса является <span className="bold">совершенствование теоретических и практических навыков</span> планирование досудебного расследования <span className="bold">на постоянной основе.</span>
                        </Report_Warning>
                    </Reveal>

                    <Sizebox height={100}/>

                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>

                </LessonPage>)
            case 2:
                    return (<LessonPage name={'Общее понятие планирования, его структура и задачи'}>
                        <Sizebox height={30}/>
    
                        <Reveal>
                            <Quote 
                                text={'Планы-бесполезны, планирование – бесценно'}
                                author={'Дуайт Эйзенхауэр, американский государственный и военный деятель'}
                                img={'https://rus.team/images/article/6770/2020-10-12_618-159183_599.webp'}
                            />
                        </Reveal>
                        <Sizebox height={100}/>
    
                        

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            >
                                Общее понятие планирования, его структура и задачи
                            </HeaderWithLine>
                        </Reveal>

                        <Sizebox height={40}/>
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <>В организации расследования преступления большое значение имеет <span className="bold">планирование</span>. Правильно организованное планирование дает возможность проводить расследование целеустремленно, позволяет закончить следствие в установленные законом сроки, дисциплинирует следователя, обеспечивает полноту и объективность следствия, способствует получению максимума эффекта при наименьшей затрате <span className="bold">следователем</span> времени, сил и средств.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={40}/>

                        <Reveal>
                            <TextAndLink 
                                text={
                                    <Image 
                                        src={'https://simg.marwin.kz/media/catalog/product/cache/8d1771fdd19ec2393e47701ba45e606d/_/-/ugolovnoprocessualnyy_kodeks_respubliki_kazahstan_2020_g_kazyaz.jpg'} 
                                        style={{
                                            width: '200px'
                                        }}
                                    />
                                }
                                link={'https://adilet.zan.kz/rus/docs/K1400000231#z457'}
                            />
                        </Reveal>

                        <Sizebox height={40}/>
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <span className='bold'>Благодаря планированию упорядочиваются процесс расследования преступления. Недооценка вопросов планирования и организации расследования на практике приводит к целому ряду негативных обстоятельств:</span>
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={20}/>
                        <Reveal>
                            <NotNumberedDots 
                                dotsColor={'black'}
                                list={[
                                    <>необоснованная продолжительность сроков расследования;</>,
                                    <>хаотичность и непоследовательность проведения следственных действий и оперативно-розыскных мероприятий (далее - ОРМ). – <a href='https://adilet.zan.kz/rus/docs/Z940004000_#z0' className='red'>ссылка на Закон Об ОРД;</a></>,
                                    <>неэффективное использование человеческих и материальных ресурсов;</>,
                                    <>отсутствие взаимодействия между органами и службами, что принимают участие в расследовании;</>,
                                    <>отсутствие научной организации работы и руководства;</>,
                                    <>нарушение процессуальных норм;</>,
                                    <>низкое качество досудебного следствия.</>,
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={60}/>
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <>Процесс планирования расследования имеет определенную структуру, он состоит из ряда взаимоувязанных элементов, которые одновременно служат этапами этого процесса.</>,
                                    <><span className="bold">Такими элементами является:</span></>
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={20}/>
                        <Reveal>
                            <NumberedDots 
                                dotsColor={'#e0e03f'}
                                list={[
                                    <>изучение начальной информации;</>,
                                    <>выдвижение версий;</>,
                                    <>определение обстоятельств которые необходимо довести, и решение других заданий расследования;</>,
                                    <>определения путей, средств и методов расследования;</>,
                                    <>определение последовательности и сроков решения отдельных заданий и выполнения отдельных действий;</>,
                                    <>определение исполнителей;</>,
                                    <>определение организационных мероприятий по привлечению исполнителей, обеспечению использования отдельных средств и проведению тех или других действий;</>,
                                    <>составление письменного плана;</>,
                                    <>коррекция и развитие плана.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={80}/>
                        <Reveal>
                            <div style={{
                                backgroundColor: '#eded64',
                                padding: '20px 0px'
                            }}>
                                <Centered>
                                    <RandomH2>
                                        Общие положения планирования расследования преступлений
                                    </RandomH2>
                                </Centered>
                                <Sizebox height={40}/>
                                <ThreeColumnsDivider 
                                    gap={40}
                                    left={
                                        <>
                                            <Centered>
                                                <RandomH2>
                                                    ЦЕЛЬ
                                                </RandomH2>
                                            </Centered>
                                            <Sizebox height={20} />
                                            <RandomParapraph>
                                                Логическая  последовательность расследования,   определение необходимых   шагов   и  этапов,  рациональное  распределение    времени    и  ресурсов   для   быстрого,  полного  и  качественного  закрепления   доказательств
                                            </RandomParapraph>
                                        </>
                                    }
                                    middle={
                                        <>
                                            <Centered>
                                                <RandomH2>
                                                    ПЛАНИРОВАНИЕ
                                                </RandomH2>
                                            </Centered>
                                            <Sizebox height={20} />
                                            <RandomParapraph>
                                                Творческий   процесс, заключающийся в    определении следователем   задач расследования   и оптимальных   путей   их решения
                                            </RandomParapraph>
                                        </>
                                    }
                                    right={
                                        <>
                                            <Centered>
                                                <RandomH2>
                                                    ИНДИВИДУАЛЬНОСТЬ
                                                </RandomH2>
                                            </Centered>
                                            <Sizebox height={20} />
                                            <RandomParapraph>
                                                Расследование    каждого   конкретного     дела    имеет    свои   особенности
                                            </RandomParapraph>
                                        </>
                                    }
                                />
                            </div>
                        </Reveal>
                        <Sizebox height={80}/>

                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    'Действующим законодательством составление плана не предусмотрено, хотя он является важным и неотъемлемым процессом расследования преступлений, обеспечивающим быстрое изобличение и привлечение к уголовной ответственности лиц их совершивших.',
                                    'В связи с чем составление Плана расследования регламентировано разделом 3 Порядка организации досудебного расследования в службе экономических расследований Агентства РК по финансовому мониторингу, утвержденного приказом № 235-НҚ от 18.07.2022 года (далее – Порядок организации расследования).'
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={40}/>
                        <FileDownloader 
                            type={'doc'}
                            file={file1}
                            fileName={'Приказ Председателя АФМ №235-НҚ'}
                        />
                        <Sizebox height={40}/>
                        <Reveal>
                            <IconDots 
                                header={'Порядок  составления  Плана  расследования'}
                                gap={40}
                                dotsColor={'white'}
                                list={[
                                    'В 3-х  дневный  срок  с  момента  принятия  в  свое производство',
                                    <>
                                        Утверждается   руководителем   следственного подразделения   либо <InTextFileDownloader 
                                            text={'курирующим  заместителем руководителя ДЭР'} 
                                            file={file2}
                                            style={{
                                                color: 'blue',
                                                textDecoration: 'underline',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </>,
                                    'План  расследования  составляется  по  утвержденному  образцу',
                                    <>
                                        Составляется  с  учетом  требований  норм  <InTextFileDownloader 
                                            text={'уголовно-процессуального  законодательства'} 
                                            file={file5}
                                            style={{
                                                color: 'blue',
                                                textDecoration: 'underline',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </>,
                                ]}
                                icons={[
                                    icon1,
                                    icon2,
                                    icon3,
                                    icon4
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={100}/>
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <>Следует отметить, что под <span className="bold">начальной информацией</span> понимается весь объем фактических данных, которыми владеет <span className="bold">следователь</span> на каждый момент планирования расследования.</>,
                                    <>Во время изучения и оценки информации обращаются к сопоставлению фактических данных, полученных из разных источников, что позволяет выявить противоречия, неточности или неполноту данных. </>,
                                    <>На данном этапе следователь решает, какие данные не вызывают сомнения и могут быть оценены как достоверные, а какие, напротив, сомнительные и требуют проверки; на какие вопросы можно ответить утвердительно, а на какие невозможно; какие данные относятся к делу, а какие - нет. </>,
                                    <>Кроме материалов, полученных процессуальным путем, при планировании расследования, изучается также информация, собранная посредством ОРМ. </>,
                                    <>В процессе изучения содержания полученной информации следователь решает: есть признаки совершения уголовного правонарушения, какие обстоятельства преступления есть, имеются ли сведения о лице, которое совершило общественно опасное деяние, его причастность, возможные соучастники, способы совершения преступления. В процессе указанной деятельности определяются конкретные обстоятельства, которые подлежат доказыванию по делу. Главными началами в этом плане служат общие положения закона о предмете доказывания (Раздел 3. УПК РК - Доказательства и доказывание. Глава 15. Доказательства) и уголовно - правовые признаки соответствующего состава преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={100}/>
                        <Reveal>
                            <ImageWithText 
                                img={'https://www.leadertask.ru/images/all_images/planirovanie-raboty-menedzhera.jpg'}
                                imageText={'Задачи'}
                                color={'white'}
                            />
                        </Reveal>
                        <Sizebox height={40}/>
                        <Reveal>
                            <NumberedDots 
                                dotsColor={'#e0e03f'}
                                header={'Планирование расследования определяет постановку определенных задач. Это установление:'}
                                list={[
                                    'события преступления;',
                                    'лиц, что совершили преступление;',
                                    'степени участия каждого из них в преступлении;',
                                    'способов совершения и сокрытия следов преступления;',
                                    'размеров нанесенных убытков;',
                                    'причин и условий, что способствовали совершению преступления.',
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={30}/>
                        <Reveal>
                            <RandomParapraph>
                                Например, <span className="bold italic">преступления, совершаемые путем мошенничества с финансовыми ресурсами</span>, относятся к той группе преступлений, которые в большинстве случаев раскрываются оперативным путем. Планирование расследования дел, возбужденным на основе оперативно-розыскных материалов, является специфическим. Одна из особенностей планирования расследования дел этой категории - обеспечение путей получения данных о лицах, которые совершили преступление, необходимость сочетания следственных действий с оперативно-розыскными мероприятиями в процессе всего следствия, а также обеспечение возможности легализации информации, полученной оперативным путем.
                            </RandomParapraph>
                        </Reveal>
                        <Sizebox height={20}/>
                        <Reveal>
                            <RandomParapraph>
                                <span className="bold">План расследования</span> складывается в зависимости от объема информации, которую имеет в распоряжении следователь. Одним из самых важных требований <span className="bold">к Плану расследования уголовного дела</span> и выполнения отдельного следственного действия является их максимальная обоснованность информацией, которую имеет в распоряжении следователь, и, в первую очередь, той, которая содержится в материалах уголовного дела.
                            </RandomParapraph>
                        </Reveal>

                        <Sizebox height={100}/>
                        
    
                        <Reveal>
                            <NextLesson handleOnClick={() => {
                                CheckCurrentChapter(1);
                            }}/>
                        </Reveal>
    
                    </LessonPage>)
                case 3:
                    return <LessonPage name={'Проблемные и актуальные вопросы планирования'}>
                        <Sizebox height={30}/>
                        
                        <Reveal>
                            <RandomParapraph>
                                Одной из причин низкого качества расследования является плохое знание следователем материалов дела, не использование им тех данных, которые содержатся в материалах следствия. Это характерно, в известной мере, для расследования преступлений, совершаемых путем мошенничества с <span className="bold">финансовыми ресурсами</span>, (ложного банкротства, преднамеренного банкротства и др.)
                            </RandomParapraph>
                        </Reveal>
                        <Sizebox height={30}/>

                        <Reveal>
                            <IconDots 
                                gap={40}
                                list={[
                                    'Формальное   составление, либо расследование без него',
                                    'Планы   не   содержат   целей   проводимых   следственных    действий',
                                    'Не   определяется   их   структура   и   тактическая последовательность,   сроки   проведения   и   ответственные лица   за   их   исполнение',
                                    'Хаотичное,    непоследовательное     расследование',
                                ]}
                                icons={[
                                    xIcon,
                                    xIcon,
                                    xIcon,
                                    xIcon
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={60}/>
                        
                        <Reveal>
                            <Report_Warning>
                                <>Как вы обратили внимание, в вышеприведенных планах расследований <span className="bold">следователи и их непосредственные руководители</span> к планированию расследования <span className="bold">относятся формально.</span></>
                            </Report_Warning>
                        </Reveal>
                        <Sizebox height={20}/>
                        <Reveal>
                            <Centered>
                                <Image 
                                    style={{
                                        width: '500px'
                                    }}
                                    src={'https://катюша-садик.рф/wp-content/uploads/2019/12/zasedanie.jpg'} 
                                />
                            </Centered>
                        </Reveal>
                        <Sizebox height={20}/>
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <>Составляемые планы не содержат целей проводимых следственных действий и сроки их проведения, а также не определяются их структура, тактическая последовательность и ответственные лица за их исполнение.</>,
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={20}/>
                        <Report_Warning>
                            <span className="bold red">К примеру, изучение плана расследования по выписке фиктивных счет-фактур на 528,1 млн тенге в ТОО «К» за поставку зерна показало, что первые два пункта плана предусматривают проведение НСД-7,1 в отношении гражданина «И» и НСД-6,4,1 в офисном помещении.</span>
                        </Report_Warning>
                        <Sizebox height={20}/>
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <>При этом не указываются адреса офиса и проживания указанного гражданина.</>,
                                    <>Кроме того, предусмотрено направление поручения в оперативные подразделения с целью установления соучастников преступления, бухгалтера, обнальщиков и других лиц, которых возможно определить в результате анализа имеющихся материалов, применение мер безопасности подставным директорам крестьянских хозяйств, однако, с чем это связано и какие для этого существуют правовые механизмы не указывается.</>,
                                    <>Имеют место факты составления планов в произвольной форме, с включением продления сроков следствия, то есть процессуального действия, регламентированного УПК и допросов неопределенного круга лиц.</>,
                                    <>Как показывает анализ, при расследовании уголовных дел, связанных с реализацией подакцизной продукции, в планы включаются заведомо невыполнимые следственные действия, такие как, дословно - <span className="italic">«отработать все базары и магазины, в которых имеются указанные подакцизные сигареты», «выставить контроль на въезд, выезд с границы РФ»</span> и т.д.</>,
                                    <>Утверждая подобные планы, заместители руководителей ДЭР и руководители следственных управлений не вникают в детали планируемых следственных действий, чем способствуют их формальному составлению.</>,
                                    <>Хаотичное, непоследовательное расследование приводит к нерациональному использованию средств и времени, неправильной квалификации деяний подозреваемых, нарушению конституционных прав граждан и жалобам участников уголовного процесса.</>,
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={20}/>
                        <Report_Warning>
                            <span className="bold red">Так, например, по делам о выписке фиктивных счетов-фактур следователь, после начала расследования, либо получения уголовного дела в производство, не изучив акты налогового органа, отчеты, сведения о движении денежных средств по счетам в банке, приступает к допросу руководителей и учредителей юридических лиц-контрагентов, количество которых, как правило, исчисляется сотнями.</span>
                        </Report_Warning>
                        <Sizebox height={20}/>
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <>Единственный вопрос, который следователь может выяснить у руководителей и учредителей юридических лиц на данном этапе, это - «отношение их к регистрации».</>,
                                    <>Даже если руководители компаний действительно имеют отношение к регистрации, ответить на вопросы о взаиморасчетах, без предоставления на обозрение соответствующих документов, они не смогут.</>,
                                    <>Такое отношение приводит к волоките расследования и повторному вызову предпринимателей на допрос.</>,
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={20}/>
                        <Report_Warning>
                            <span className="bold red">Поэтому время, затраченное на составление качественного плана, позволит сформировать логическую последовательность проведения следственных действий, определить наиболее важные и срочные задачи, рационально распределить время и ресурсы в целях быстрого, полного и качественного закрепления доказательств.</span>
                        </Report_Warning>

                        <Sizebox height={100}/>
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            >
                                РАССЛЕДОВАНИЕ ДЕЛ О ВЫПИСКЕ СЧЕТ-ФАКТУР
                            </HeaderWithLine>
                        </Reveal>
                        <Sizebox height={40}/>
                        <Reveal>
                            <IconDots 
                                gap={80}
                                list={[
                                    <>
                                        <Centered>
                                            <ImageSequence 
                                                images={[
                                                    icon5,
                                                    icon7
                                                ]}
                                                imageDescriptions={[
                                                    'ЕРДР',
                                                    'ДОПРОС'
                                                ]}
                                            />
                                        </Centered>
                                        <Sizebox height={20} />
                                        <RandomParapraph>
                                            <span className="red bold">Не  изучив</span>   акты   Налогового органа,   отчеты,   сведения  о движении   денежных   средств   по  счетам   в   банке, приступает   к   допросу
                                        </RandomParapraph>
                                    </>,
                                    <>
                                        <Centered>
                                            <ImageSequence 
                                                images={[
                                                    icon5,
                                                    icon6,
                                                    icon7
                                                ]}
                                                imageDescriptions={[
                                                    'ЕРДР',
                                                    'АНАЛИЗ',
                                                    'ДОПРОС'
                                                ]}
                                            />
                                        </Centered>
                                        <Sizebox height={20} />
                                        <IconDots
                                            width='20px'
                                            height='20px' 
                                            icons={[
                                                acceptIcon,
                                                acceptIcon,
                                                acceptIcon,
                                            ]}
                                            list={[
                                                'ПРОВЕДЕНИЕ  АНАЛИЗА',
                                                'ФОРМИРОВАНИЕ  ВОПРОСОВ, ПОДЛЕЖАЩИХ  ВЫЯСНЕНИЮ',
                                                'ГОТОВНОСТЬ ТЕХНИЧЕСКИХ СРЕДСТВ   ФИКСАЦИИ   И   Т.Д. ',
                                            ]}
                                        />
                                    </>,
                                ]}
                                icons={[
                                    xIcon,
                                    acceptIcon,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={100}/>
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            >
                                При  составлении  Плана  <span className="bold">необходимо:</span> 
                            </HeaderWithLine>
                        </Reveal>
                        <Sizebox height={40}/>
                        <Reveal>
                            <IconDots 
                                gap={40}
                                dotsColor={'white'}
                                list={[
                                    'Тщательно  изучить  и  проанализировать  материалы, предоставленные  для   начала  досудебного   расследования',
                                    'Определить   круг   обстоятельств   совершенного   преступления, подлежащих   доказыванию',
                                    'Определить   перечень   следственных   действий,   подлежащих проведению   в   первую   очередь   и   недопущения  их  утраты',
                                    'Установить   последовательность   запланированных следственных  действий',
                                    'Определить  какие  научно – технические  средства   могут   быть использованы  для  закрепления  доказательств',
                                    'Определить  за  каждым   пунктом   плана   и   следственным действием   ответственного   исполнителя',
                                    'Указать   конкретные   сроки   выполнения   намеченных мероприятий',
                                    'Излагать   предусмотренные   планом   мероприятия   максимально  ясно   и   понятно   для   других   участников   СОГ',
                                    'Предусмотреть  мероприятия   по   подготовке   к   следственным действиям  с  формированием  вопросов,   подлежащих выяснению,   готовности   технических   средств   фиксации   и  т.д. ',
                                ]}
                                icons={[
                                    icon1,
                                    icon10,
                                    icon4,
                                    icon2,
                                    icon11,
                                    icon12,
                                    icon13,
                                    icon14,
                                    icon10,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={100}/>
                        <Reveal>
                            <Centered>
                                <Image 
                                    src={'https://woodysbar.com/2017/wp-content/uploads/2019/09/Stop-Sign-PNG-Transparent.png'} 
                                    style={{
                                        width: '300px'
                                    }}
                                />
                            </Centered>
                        </Reveal>
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            >
                                ПРИ ПЛАНИРОВАНИИ <span className="bold red">НЕ ДОПУСКАЕТСЯ:</span>
                            </HeaderWithLine>
                        </Reveal>
                        <Sizebox height={40}/>
                        <Reveal>
                            <IconDots 
                                gap={40}
                                dotsColor={'white'}
                                fontSize={'20px'}
                                list={[
                                    'Формальный,   шаблонный   подход',
                                    'Проведение  и  включение  в  план  следственных действий, которые   не   имеют   доказательственного   значения',
                                    'Включение   в   план   следственных   действий  без конкретизации  места,   способа   их   проведения   и вопросов,   подлежащих   выяснению',
                                ]}
                                icons={[
                                    xIcon,
                                    xIcon,
                                    xIcon,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={100}/>
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#40ccdb'} lineColor={'#CADEFC'}
                            >
                                <span className="bold">ПРИНЦИПЫ УСПЕШНОГО ПЛАНИРОВАНИЯ</span>
                            </HeaderWithLine>
                        </Reveal>
                        <Sizebox height={40}/>
                        <Reveal>
                            <ThreeColumnsDivider 
                                left={
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Centered>
                                            <Image src={icon15} style={{width: '100px'}}/>
                                        </Centered>
                                        <Sizebox height={10} />
                                        <RandomH2>
                                            ДИНАМИЧНЫЙ
                                        </RandomH2>
                                        <Sizebox height={10} />
                                        <RandomParapraph>
                                            Следственные  действия должны быть  активные и наступательные
                                        </RandomParapraph>
                                    </div>
                                }
                                middle={
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Centered>
                                            <Image src={icon16} style={{width: '100px'}}/>
                                        </Centered>
                                        <Sizebox height={10} />
                                        <RandomH2>
                                            РЕАЛЬНЫЙ
                                        </RandomH2>
                                        <Sizebox height={10} />
                                        <RandomParapraph>
                                            Конкретные следственные действия, которые могут быть выполнены на основе имеющейся информации и материалов
                                        </RandomParapraph>
                                    </div>
                                }
                                right={
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Centered>
                                            <Image src={icon17} style={{width: '100px'}}/>
                                        </Centered>
                                        <Sizebox height={10} />
                                        <RandomH2>
                                            ГИБКИЙ
                                        </RandomH2>
                                        <Sizebox height={10} />
                                        <RandomParapraph>
                                            Возможность адаптировать план  к изменяющимся  обстоятельствам и новой информации
                                        </RandomParapraph>
                                    </div>
                                }
                            />
                        </Reveal>

                        <Sizebox height={60}/>
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <>Следует иметь в виду, что план должен быть динамичным, реальным и гибким, что означает возможность его изменения и восполнения в зависимости от возникающих в ходе следствия новых фактов, версий, вопросов, подлежащих дополнительному исследованию.</>,
                                    <>Корректировки необходимо вносить своевременно, не дожидаясь выполнения всех предусмотренных планом следственных действий.</>,
                                    <>Для этого следователю необходимо пересматривать составленный им план после выполнения каждого следственного действия.</>,
                                    <>Также необходимо учитывать позицию защиты и других участников уголовного процесса, отраженных в ходатайствах и жалобах.</>,
                                    <>Важно в процессе всего расследования письменно составлять и регулярно обновлять хронологию событий совершенного <InTextFileDownloader 
                                        file={file3} text={'уголовного правонарушения.'} 
                                        fileName={'Хронология событий'} 
                                        style={{
                                            color: 'blue',
                                            textDecoration: 'underline',
                                            cursor: 'pointer'
                                        }}
                                    /></>,
                                    <>Собранные доказательства рекомендуется отражать в <InTextFileDownloader 
                                        file={file4} text={'Таблице доказательств'} 
                                        fileName={'Таблица доказательств'} 
                                        style={{
                                            color: 'blue',
                                            textDecoration: 'underline',
                                            cursor: 'pointer'
                                        }}
                                    />, которая будет способствовать их анализу, правильной оценке и качественному составлению процессуальных документов.</>,
                                    <>Тщательно продуманный План расследования позволит должным образом составить процессуальные документы, убедиться, что все доказательства собраны в соответствии с требованиями закона, достаточно надежны и достоверны для правильной квалификации уголовного правонарушения.</>,
                                ]}
                            />
                        </Reveal>

                        

                        <Sizebox height={100}/>

                        <Reveal>
                            <NextLesson handleOnClick={() => {
                                CheckCurrentChapter(1);
                            }}/>
                        </Reveal>
                    </LessonPage>
                case 4:
                    return <LessonPage name={'Некоторые методы и формы планирования досудебного расследования'} >
                        <Sizebox height={30} />

                        <Reveal>
                            <RandomParapraph
                                fontSize={23}
                            >
                                <span className="bold red">План расследования - программа деятельности следователя.</span>
                            </RandomParapraph>                            
                        </Reveal>
                        <Sizebox height={10} />
                        <Reveal>
                            <IconDots 
                                height='60px'
                                width='60px'
                                icons={[
                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Emoji_u261d.svg/2048px-Emoji_u261d.svg.png',
                                    'https://i.pinimg.com/originals/cf/d7/ca/cfd7caaa52fae7b61cee67d7a14b5770.png',
                                    'https://cdn3d.iconscout.com/3d/premium/thumb/three-fingers-hand-gesture-3209116-2680653.png?f=webp',
                                    fourFingers,
                                    fiveFingers
                                ]}
                                header={'Наиболее распространенной формой Плана расследования является план, состоящий из следующих элементов:'}
                                list={[
                                    'следственные версии;',
                                    'обстоятельства, подлежащие выяснению;',
                                    'действия, которые необходимо выполнить для проверки версии;',
                                    'исполнители;',
                                    'сроки.',
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={40} />
                        <Reveal>
                            <RandomParapraph>
                            Процесс расследования разделяется обычно <span className="bold">на три этапа:</span>
                            </RandomParapraph>                            
                        </Reveal>
                        <Sizebox height={20} />
                        <Reveal>
                            <NotNumberedDots 
                                dotsColor={'black'}
                                list={[
                                    <span className='bold'>первоначальный;</span>,
                                    <span className='bold'>последующий;</span>,
                                    <span className='bold'>завершающий.</span>
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={40} />
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <>Следовательно, уместно и в планировании различать те же этапы, что и в самом расследовании. Для планирования <span className="bold">на начальном этапе</span> расследования преступлений, совершаемых путем мошенничества <span className="bold">с финансовыми ресурсами</span>, характерна информационная неопределенность. Фрагментарный и проблематичный характер первоначальной информации о преступном событии, личности преступника, формы вины и другие существенные обстоятельства мешают разработке плана по делу.</>,
                                    <>Дефицит информации в первоначальных данных часто вынуждает следователя удовлетворяться в начале этого этапа лишь типичными версиями. На этом этапе важно определить круг таких следственных действий, которые способны устранить информационную неопределенность, расширить доказательную базу. План расследования на начальном этапе должен быть ориентирован на проверку достоверности, уточнение фактических данных, которые послужили основой для возбуждения уголовного дела, сбора новых фактических данных и предупреждения возможных попыток заинтересованных лиц скрыть следы преступления.</>,
                                    <><span className="bold">Планируя следственные действия на первоначальном этапе расследования, стоит учитывать их взаимодействие с ОРМ, которые проводятся одновременно.</span></>,
                                    <><span className="bold">Действия следователя и оперативных подразделений Служб экономических расследований должны быть согласованы по времени и цели.</span></>,
                                    <>При планировании <span className="bold">на последующем этапе</span> планируются не только действия, что помогают собрать доказательства, но и те, посредством которых осуществляется проверка имеющейся доказательной информации, систематизация собранного материала, устраняются возможные противоречия.</>,
                                    <>С учетом собранной информации на данном этапе корректируются версии и выдвигаются новые. На этом этапе планируется <span className="bold">назначение и проведение необходимых экспертиз</span> (судебно-экономических, почерковедческих, технико-криминалистических экспертиз документов и т.п.), проведение обысков, выемок, очных ставок, дополнительных и повторных допросов. </>,
                                    <><span className="bold">На завершающем этапе</span> расследования планируются предусмотренные уголовно-процессуальным законом: процессуальные действия по ознакомлению участников с материалами уголовного дела; процессуальные и иные действия, связанные с удовлетворением заявленных ходатайств; дополнительные следственные действия, на которые указывает <span className="bold">прокурор</span> или <span className="bold">начальник следственного подразделения</span>; дополнительные действия, проведенные по инициативе самого следователя в результате оценки собранных доказательств перед составлением обвинительного заключения.</>,
                                    <><span className="bold">Расследование преступлений, совершаемых путем мошенничества с кредитными и другими финансовыми ресурсами, представляет сложность в силу того, что большинство уголовных дел являются многоэпизодными.</span></>,
                                    <><span className="bold">Для расследования такой категории преступлений целесообразно создавать следственно-оперативную группу.</span></>,
                                    <>Так, согласно ст. 194 УПК РК, в случае расследования особенно сложного дела создается группа из нескольких следователей. При создании следственной группы один из следователей назначается старшим, он принимает дело в свое производство и непосредственно руководит действиями других следователей.</>,
                                    <>В процессе расследования преступлений, совершаемых путем мошенничества с кредитными и другими финансовыми ресурсами, обычно приходится работать с большим количеством финансово-бухгалтерской документации, готовить материалы и назначать различные судебные экспертизы. Поэтому желательно включать в СОГ включаются опытные следователи.</>,
                                    <>Планирование расследования, проводимое СОГ отличается от планирования работы одного следователя и осуществляется обычно в два этапа.</>,
                                
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={20} />
                        <Reveal>
                            <NumberedDots 
                                dotsColor={'#ede56d'}
                                header={<><span className="bold">На первом этапе</span> руководитель группы изучает дело и составляет общий план расследования. <span className="bold">Особенное внимание уделяется основным направлениям будущего расследования. В общем плане находит отображение распределение обязанностей. Распределение обязанностей возможно по нескольким направлениям:</span></>}
                                list={[
                                    <>по эпизодам, когда следователю или нескольким следователям поручается ведение расследования по отдельным эпизодам;</>,
                                    <>по обвиняемым (подозреваемым), когда следователю или следователям поручается ведение расследования всего того, что относится к определенному лицу;</>,
                                    <>по организациям, предприятиям, учреждениям, когда следователь отрабатывает все то, что имеет отношение к указанному объекту;</>,
                                    <>по территориальному признаку, когда событие преступления или его существенные обстоятельства происходили в разных местах. В таких случаях следователь закрепляется за определенным местом, где и осуществляется вся работа по делу.</>,
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={40} />
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <><span className="bold">На втором этапе</span> планирования следователи составляют план расследования по порученным им направлениям. Такие планы незначительно отличаются от обычных планов расследования. Важным требованием планирования выступает координация действий следователей относительно выполнения индивидуальных планов, которая способствует выявлению «узких мест» первоначального этапа расследования, конкретизация заданий каждому члену группы или бригады.</>,
                                    <>Обеспечивая контроль за выполнением индивидуальных планов, <span className="bold">руководитель следственной группы</span> одновременно концентрирует собранные данные в виде детальных схем преступных связей лиц, проходящих по делу; графиков отработки версий и эпизодов, что облегчают взаимное информирование следователей, которыми он руководит. </>,
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={60} />
                        
                        <Reveal>
                            <ImageLine 
                                img={'https://bainews.kz/wp-content/uploads/2023/08/dd7e1eb2b0f047468e41b1180c45ce8b.jpeg'} 
                                notCrop={false}
                            />
                        </Reveal>
                        <Sizebox height={40} />
                        <Reveal>
                У            <TextWithTitle 
                                text={[
                                    <><span className="bold">Вместе с тем, при планировании расследования уголовных дел важное значение имеет изучение судебно-следственной практики по обвинительным актам и приговорам (в том числе оправдательным), которые имеются в открытом доступе на сайте Верховного Суда РК «www.office.sud.kz».</span></>,
                                    <>Данный метод поможет устранить лишнюю работу, определить рамки расследования и объем следственных действий, чтобы добиться успешных результатов не в ущерб полноте и всесторонности следствия.</>,
                                    <>При применении судебно-следственной практики также необходимо руководствоваться методиками расследования отдельных видов преступлений, таких как хищение, выписка фиктивных счет-фактур, деятельность финансовых пирамид и т.д.</>
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={60} />
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#a19b42'} lineColor={'#CADEFC'}
                            >
                                Изучение судебно-следственной практики
                            </HeaderWithLine>
                        </Reveal>
                        <Sizebox height={40} />
                        <Reveal>
                            <IconDots 
                                height={'40px'}
                                width={'40px'}
                                icons={[
                                    icon18,
                                    icon19,
                                ]}
                                gap={40}
                                list={[
                                    <>
                                        <TextWithTitle 
                                            text={[
                                                <>РЕКОМЕНДУЕТСЯ   БРАТЬ   ЗА   ОСНОВУ   ОБВИНИТЕЛЬНЫЕ   АКТЫ   ЛИБО  ПРИГОВОРЫ    ПО   АНАЛОГИЧНЫМ   ПРЕСТУПЛЕНИЯМ   ДЛЯ  ПРИМЕНЕНИЯ   ТАКТИЧЕСКИХ   ПРИЕМОВ  В   ПЛАНИРОВАНИИ</>
                                            ]}  
                                        />
                                    </>,
                                    <>
                                        <TextWithTitle 
                                            text={[
                                                <>ЭТО ПОМОЖЕТ   ОПРЕДЕЛИТЬ:</>
                                            ]}  
                                        />
                                        <Sizebox height={10} />
                                        <NumberedDots 
                                            dotsColor={'#ede56d'}
                                            list={[
                                                <>ОБЪЕМ   ОБСТОЯТЕЛЬСТВ,   ПОДЛЕЖАЩИХ   ДОКАЗЫВАНИЮ</>,
                                                <>РАЦИОНАЛЬНОЕ   ИСПОЛЬЗОВАНИЕ   СИЛ   И   СРЕДСТВ</>,
                                                <>СОКРАТИТЬ  СРОКИ   РАССЛЕДОВАНИЯ</>,
                                            ]}
                                        />
                                    </>
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={100}/>
                        <Reveal>
                            <Centered>
                                <RandomH2>
                                    «ПРИНЦИП ПАРЕТТО»
                                </RandomH2>
                            </Centered>
                        </Reveal>
                        <Sizebox height={20}/>
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <>Необходимо отметить важность использования современных методов при планировании расследования уголовного дела, которые способствуют эффективному использованию ресурсов и времени.</>,
                                    <>При    правильном  и  качественном     планировании 20 %     следственных     действий должны дать    80 %    доказательств</>,
                                    <><span className="red bold">Одним из таких методов является <span className="bold">«Принцип Паретто»</span>, который гласит: <span className="italic">«20 % усилий дают 80 % результата, а остальные 80 % – лишь 20 % результата».</span></span></>,
                                    <>Применительно к расследованию уголовного дела данный метод означает, что при правильном и качественном планировании 20 % следственных действий должны дать 80 % доказательств.</>,
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={20}/>
                        <TextWithBackground 

                            text={[
                                <>К примеру, в рамках расследования уголовного дела о хищении дизельного топлива в АО «КТЖ ГП», следователем, вместо изъятия и изучения документов учета ГСМ и назначения соответствующих экспертиз, первые два месяца расследования потрачены на допросы 273 машинистов тепловозов и их помощников, показания которых доказательственного значения не имели.</>,
                                <>Спустя пять месяцев с момента начала расследования, после изъятия и изучения документации о порядке учета топлива, четверть из них пришлось допрашивать повторно ввиду установления новых обстоятельств.</>,
                                <>Повторный вызов на допросы свидетелей и длительное расследование дела повлекли обоснованные жалобы на действия следователя, в том числе в надзорные и судебные органы.</>,
                                <><span className="red">Несвоевременное изъятие документов</span> также повлекло назначение соответствующих экспертиз по истечении пяти месяцев расследования.</>,
                                <>Поэтому необходимо регулярно анализировать процесс и текущие результаты. Применение этого принципа позволит своевременно определить, на чем именно в первую очередь нужно сосредоточиться, чтобы достичь эффективного расследования.</>
                            ]}
                        />
                        <Sizebox height={20} />
                        <Reveal>    
                            <Centered>
                                <Image 
                                    src={paretto}
                                    style={{
                                        width: '600px',
                                        // padding: '0px auto'
                                    }}
                                />
                            </Centered>                                
                        </Reveal>

                        <Sizebox height={100}/>
                        <Reveal>
                            <Centered>
                                <RandomH2>
                                    «МОЗГОВОЙ ШТУРМ»
                                </RandomH2>
                            </Centered>
                        </Reveal>
                        <Sizebox height={20}/>
                        <Reveal>
                            <TextWithTitle 
                                text={[
                                    <>Метод «Мозговой штурм» широко распространен в современном мире и предусматривает решение задач таким образом, когда участники обсуждения предлагают максимальное количество идей, из которых выбираются лучшие решения.</>,
                                    <>Такой метод может быть применим при расследовании уголовного дела следственно-оперативной группой.</>,
                                    <>В результате коллективного обсуждения различных выдвинутых версий и способов закрепления доказательств выбираются наиболее эффективные и включаются в <span className="bold">План расследования.</span></>,
                                    <><span className="red bold">Следует отметить, что вышеперечисленные методы планирования не являются исчерпывающими, а приведены в качестве примеров.</span></>,
                                ]}
                            />
                        </Reveal>
                        <Sizebox height={20}/>
                        <Reveal>    
                            <Centered>
                                <Image 
                                    src={'https://metro.co.uk/wp-content/uploads/2015/03/office-441179.jpg?quality=90&strip=all'}
                                    style={{
                                        width: '600px'
                                    }}
                                />  
                            </Centered>                              
                        </Reveal>

                        <Sizebox height={100}/>

                        <Reveal>
                            <NextLesson handleOnClick={() => {
                                CheckCurrentChapter(1);
                            }}/>
                        </Reveal>
                    </LessonPage> 
                case 5:
                    return <LessonPage name={'Ситуационные задачи'}>
                        <Sizebox height={30} />
                        <Reveal>
                            <RandomParapraph>
                                Для закрепления теоретических знаний предлагаем решить следующие ситуационные задачи:
                            </RandomParapraph>
                        </Reveal>
                        <Sizebox height={60} />

                        <Reveal>
                            <Centered>
                                <TextAndLink 
                                    text={
                                        <Image 
                                            src={'https://simg.marwin.kz/media/catalog/product/d/1/azastan_respublikasyny_ylmysty_kodeks_2021_j.jpg'} 
                                            style={{
                                                width: '200px'
                                            }}
                                        />
                                    }
                                    link={'https://adilet.zan.kz/kaz/docs/K1400000226/k14226_.htm'}
                                />
                            </Centered>
                        </Reveal>

                        <Sizebox height={60} />
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                                header={<><span className="bold">Ситуационная задача по ст.189 УК РК</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>25 января 2023 года руководителем управления государственных закупок акимата города Сарань Карагандинской области Акаевым А. проведен конкурс государственных закупок работ по проведению топографической съемки городских коммуникаций.</>,
                                    <>Сумма, выделенная на государственные закупки, составила 498 млн тенге.</>,
                                    <>Акаев А., с целью хищения бюджетных средств, принял незаконные меры по объявлению победителем конкурса ТОО «Байтерек» в лице директора Айтбаева Б., которое фактически лицензию на проведение таких работ не имело.</>,
                                    <>Установлено, что ТОО «Байтерек» создано в декабре 2022 года, опыта работы по государственным закупкам не имело, а Айтбаев Б. является одноклассником Акаева А., с которым вместе закончил школу в пос. Аршалы Акмолинской области в 1995 году.</>,
                                    <>На основании фиктивных актов выполненных работ № 1 и 2 от 15 февраля 2019 года акиматом города Сарань перечислены денежные средства в размере 498 млн тенге, из которых на 59 млн тенге оплачены налоговые обязательства, а 438 млн тенге сняты с расчетного счета ТОО директором Айтбаевым.</>,
                                    <>По заключению специалиста ДВГА Карагандинской области Усенова К. № 52 от 23 августа 2023 года, ТОО «Байтерек» объявлено победителем конкурса в нарушение требований статьи 12 ч. 4 Закона РК «О государственных закупках» от 14 декабря 2015 года, а также отражена необоснованность перечисления 498 млн тенге ТОО «Байтерек» ввиду невыполнения работ по топографической сьемке.</>,
                                    <>25 августа 2023 года по данному факту в отношении Акаева и Айтбаева начато досудебное расследование по ст. 189 ч. 4 УК РК.</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />
                        
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#d14747'}
                                header={<><span className="bold">Ситуационная задача по ст. 189 УК РК</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>Маслихатом Северо-Казахстанской области на 2021 год выделены денежные средства в размере 3 млрд тенге, предназначенные для ремонта котельного оборудования АО «ТЭЦ».</>,
                                    <>Председателем правления АО «ТЭЦ» Сергеевым А. утверждена проектно-сметная документация по капитальному ремонту котельного оборудования.</>,
                                    <>Однако Сергеев А., путем дачи указаний ремонтным нарядам АО «ТЭЦ», организовал текущий ремонт оборудования, а денежные средства в размере 3 млрд тенге перечислил по 1 млрд тенге в подконтрольные его сыну – Сергееву Б. – компании: ТОО «Орда», «Батыс», «Солтустик» по фиктивным договорам на капитальный ремонт оборудования.</>,
                                    <>Номинальными директорами вышеуказанных предприятий Ивановым, Андреевым и Петровым перечисленные денежные средства обналичены с расчетных счетов и переданы Сергееву Б.</>,
                                    <>В результате некачественного проведенного ремонта в декабре 2022 года котельное оборудование, подлежащее ремонту, вышло из строя, оставив без отопления весь город, а инфраструктуре города нанесен материальный ущерб.</>,
                                    <>Согласно заключению специалиста ДВГА по СКО Каиржанова А. № 52 от 23 декабря 2022 года по котельным «Центр», «РК-1», «РК-2» не выполнены работы по замене оборудования на общую сумму 3 млрд тенге.</>,
                                    <>25 декабря 2022 года в отношении Сергеевых начато досудебное расследование по ст. 189 ч. 4 УК РК.</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />
                        
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                                header={<><span className="bold">Ситуационная задача по ст. 189 УК РК</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>Между ГУ «Отдел строительства города Аксу» в лице руководителя Муздыбаева Т.У. (заказчик) и ТОО «Дала» в лице директора Рысбекова Б.А. (подрядчик) по госпрограмме «Развитие регионов» заключен договор о государственных закупках работ № 44 от 15 апреля 2020 года по объекту «Реконструкция магистральных сетей водопровода протяженностью 15 км в городе Аксу, Павлодарской области» на общую сумму 1 630 950 015 тенге.</>,
                                    <>В ходе осмотра водопровода города Аксу установлено, что на участках 6-8 км и 10-12 км установлены невыполненные работы по прокладке и изолированию металлических труб, тогда как эти работы отражены в подписанных Муздыбаевым и Рысбековым актах выполненных работ и оплачены в полном объеме.</>,
                                    <>Согласно заключению специалиста № 2/11.1 от 21 января 2023 года сумма ущерба, причиненного государству, в виде невыполненных работ составила 268 750 015 тенге (ИП «Исакова А.Т., лицензия № 16014218 от 13.09.2016 г.).</>,
                                    <>24 января 2023 года в отношении Муздыбаева и Рысбекова начато досудебное расследование по ст. 189 ч. 4 УК РК.</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />
                        
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#d14747'}
                                header={<><span className="bold">Ситуационная задача по ст. 190 УК РК</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>В ходе проведенной проверки прокуратурой г. Туркестан в деятельности ГУ «Управление культуры акимата Туркестанской области» (далее – «Управление») установлен факт необоснованного перечисления бюджетных средств поставщику государственного творческого заказа «Артспорт» ИП «АЙСУЛТАН».</>,
                                    <>Проверкой установлено, что руководитель ИП «АЙСУЛТАН» Жукебаев А.А. в период с декабря 2021 года по август 2022 года в заявках намерено увеличивал количество обучаемых детей, в целях получения субсидий в размере 3,5 млн тенге из средств местного бюджета за 1 ребенка.</>,
                                    <>Установлено, что из заявленных 203 детей, 53 ребенка занятия не посещали и в списках обучаемых групп не состояли.</>,
                                    <>При этом Управлением произведена оплата за 203 ребенка, однако фактически услуга оказана только 150 ученикам.</>,
                                    <>Согласно аудиторскому отчету № 2 от 5 февраля 2023 года ДВГА по Туркестанской области определено о необоснованном перечислении 26 650 015 тенге за невыполненный объем оказанных услуг по обучению 53 детей.</>,
                                    <>8 февраля 2023 года в отношении должностных лиц Управления и Жукебаева начато досудебное расследование по ст. 190 ч. 4 п. 2 УК РК.</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />
                        
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                                header={<><span className="bold">Ситуационная задача по ст. 286 ч. 1 УК РК</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>3 июля 2023 года на участке контроля международных почтовых отправлений филиала «Казпочта» г. Шымкент при осуществлении таможенного контроля сотрудниками таможенного поста выявлено международное почтовое отправление (наименование, указанное в накладной «головные уборы, перчатки, полотенца»), прибывшее из Узбекистана, получателем которой является Ибрагимов Н., проживающий на территории г. Шымкент.</>,
                                    <>В целях контроля за соблюдением требований по перемещению товаров, запрещенных, ограниченных к ввозу/вывозу, на стадии проведения таможенного осмотра с использованием рентген-аппарата обнаружено наркотическое вещество – гашиш, весом 1,5 гр.</>,
                                    <>По данному факту 3 июля 2023 года начато досудебное расследование по ст. 286 ч. 1 УК РК.</>,
                                    <>В этот же день, в ходе проведения ОРМ по контролю почтовых отправлений Ибрагимов задержан с поличным при получении и попытке сбыта наркотических средств.</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#d14747'}
                                header={<><span className="bold">Ситуационная задача по ст. 216 УК РК</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>Согласно полученной информации подразделением финансовой разведки АФМ (далее – ПФР) установлено, что в период с 1 января 2023 года по 30 июня 2023 года на территории Павлодарской области директор ТОО «Жаңа жол» Сабитов И. обналичил с расчетного счета ТОО в АО «Народный Банк Казахстана» денежные средства в размере 373,5 млн тенге, которые поступили за указанный период со счета ТОО «БК-строй», зарегистрированного в АО «Жусан Банк».</>,
                                    <>10 июля 2023 года ПФР операции по счету ТОО «Жаңа жол» приостановлены на 10 дней, так как на счету имеются денежные средства в сумме 46,1 млн тенге.</>,
                                    <>Кроме этого, за период с 2021-2023 годы общий оборот ТОО «Жаңа жол» составил 8,4 млрд тенге, из которых 4,1 млрд тенге обналичены Сабитовым И. в АО «Сбербанк» – 2 млрд тенге и АО «Народный Банк Казахстана» – 2,1 млрд тенге.</>,
                                    <>Согласно заключению ДГД от 15.07.2023 года ТОО «Жаңа жол» за период 2021-2023 годы имело взаиморасчеты с ТОО «Кентуки» на сумму 3,2 млрд тенге, ТОО «Стройком ЛТД» на сумму 1,8 млрд тенге, ТОО «Ланбо» на сумму 2,3 млрд. тенге, ТОО «БК-строй» на сумму 1,1 млрд тенге за строительные виды работ.</>,
                                    <>В случае признания сделок ТОО «Жаңа жол» между 4 предприятиями недействительными, сумма налогов, подлежащих доначислению контрагентам-покупателям, составляет 840 млн тенге, из них (НДС – 280 млн, КПН – 560 млн).</>,
                                    <>Согласно сведениям СИОПСО ТОО «Жаңа жол» зарегистрировано по адресу г. Павлодар, ул. Толстова, зд. 98. Вид деятельности – прочие строительно-монтажные работы, штат – 5 человек, пенсионные отчисления отсутствуют.</>,
                                    <>По данному факту 20 июля 2023 года начато досудебное расследование по ст. 216 ч. 3 УК РК.</>
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />
                        
                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                                header={<><span className="bold">Ситуационная задача по ст.216 УК РК</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>В ходе оперативно-розыскных мероприятий установлено, что в период с 2021-2022 годы на территории Восточно-Казахстанской области Исаков Д. зарегистрировал 9 крестьянских хозяйств (далее – «КХ») на подставных лиц, выписывал фиктивные счета-фактуры на общую сумму 528,1 млн тенге в адрес ТОО «Кыран» за поставку зерна.</>,
                                    <>Согласно заключениям ДГД области от 20 сентября 2023 года за период 2021-2022 годов выписаны следующие счета-фактуры в адрес ТОО «Кыран»:</>,
                                ]}
                            />
                            <Sizebox height={20}/>
                            <NumberedDots 
                                dotsColor={'#CADEFC'}
                                list={[
                                    'КХ «Дос» на сумму 50,1 млн тенге;',
                                    'КХ «Халык» на сумму 51,2 млн тенге;',
                                    'КХ «Эхо» на сумму 53,7 млн тенге;',
                                    'КХ «Бобер К.» на сумму 48,3 млн тенге;',
                                    'КХ «Орда» на сумму 50,8 млн тенге;',
                                    'КХ «Кайрат» на сумму 51,6 млн тенге;',
                                    'КХ «Агро-су» на сумму 55,3 млн тенге;',
                                    'КХ «Кристалл» на сумму 57,3 млн тенге;',
                                    'КХ «Сапаров Д.» на сумму 56,4 млн тенге;',
                                    'КХ «Глобал» на сумму 53,3 млн тенге.',
                                ]}
                            />
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>Сумма налогов, подлежащих доначислению по взаиморасчетам 9 предприятий с ТОО «Кыран» за период с 20 октября 2021 года по 21 апреля 2022 года, составляет 168,9 млн тенге (КПН – 105,6 млн, ИПН 63,3 млн).</>,
                                    <>Согласно решениям СМЭС от 13 декабря 2022 года регистрации 9 КХ «Дос», «Халык», «Эхо», «Бобер К.», «Орда», «Кайрат», «Агро-су», «Кристалл», «Сапаров Д.», «Глобал» признаны недействительными (решения судов вступили в законную силу).</>,
                                    <>По данному факту 25 сентября 2023 года начато досудебное расследование по ст. 216 ч. 3 УК РК.</>
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#d14747'}
                                header={<><span className="bold">Ситуационная задача по ст.216 УК РК</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>В ходе оперативно-розыскных мероприятий установлено, что в период с 10 февраля 2022 года по 5 мая 2022 года на территории г. Шымкент директор ТОО «АБЗ плюс» Ибраев С. выписывал фиктивные счета-фактуры на сумму 1,6 млрд. тенге в адрес ТОО «ШНПЗ» за поставку пластин для компрессоров и пружин для клапанов компрессора.</>,
                                    <>Согласно заключению ДГД от 20 июля 2023 года сумма налогов, подлежащих доначислению за 2022 год по взаиморасчетам ТОО «АБЗ плюс» с ТОО «ШНПЗ» составляет 512 млн. тенге (НДС – 192 млн, КПН – 320 млн.).</>,
                                    <>Согласно информации ПФР ТОО «ШНПЗ» денежные средства в сумме 1,6 млрд. тенге, перечисленные со счета АО «Народный Банк» на счет АО «Жусан Банк», принадлежащий ТОО «АБЗ плюс», обналичены по доверенности Ибраевым Дамиром (брат Ибраева Серика) в период с 1 апреля 2022 года по 20 марта 2023 года.</>,
                                    <>В этот же день, в ходе проведения ОРМ по контролю почтовых отправлений Ибрагимов задержан с поличным при получении и попытке сбыта наркотических средств.</>,
                                    <>Согласно сведениям КГД от ТОО «АБЗ плюс» на территорию РК товары не импортировались.</>,
                                    <>В ходе ОРМ установлено, что на территорию завода ТОО «ШНПЗ» от имени ТОО «АБЗ плюс» товары не завозились, пропуски не выдавались.</>,
                                    <>Согласно решениям СМЭС от 16 апреля 2023 года взаиморасчеты ТОО «ШНПЗ» с ТОО «АБЗ плюс» признаны недействительными (решения судов вступили в законную силу).</>,
                                    <>По данному факту 25 апреля 2023 года начато досудебное расследование по ст. 216 ч. 3 УК РК.</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                                header={<><span className="bold">Ситуационная задача по ст. 245 УК РК</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>21 января 2023 года специалистом ДГД по Акмолинской области Абаевым А. завершена документальная налоговая проверка по результатам которой вынесен акт № 63 от (проведенной за период с 1 января 2021 года по 31 декабря 2022 года)  в ТОО «Азот».</>,
                                    <>Сумма доначисленных налогов по акту составила 1 617 280 588 тенге, и превышает 10 % от суммы налогов, исчисленной налогоплательщиком к уплате за указанный период.</>,
                                    <>Основанием для доначисления сумм налогов послужили вступившие в силу приговоры судов в отношении ТОО «Меркурий», «Венера», «Марс» и «Юпитер», по которым их руководитель Иванов С. признан виновным в совершение действий по выписке фиктивных счетов-фактур на сумму 10 млрд тенге в адрес ТОО «Азот».</>,
                                    <>Согласно решению экономического суда г. Кокшетау от 15 апреля 2023 года по иску ТОО «Азот» о несогласии с выводами специалистов налогового органа, акт документальной налоговой проверки признан обоснованным и законным.</>,
                                    <>На основании указанного факта, в отношении руководителей ТОО «Азот» начато досудебное расследование по ст. 245 ч. 3 УК РК.</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#d14747'}
                                header={<><span className="bold">Ситуационная задача по ст. 307 УК РК (игровой аппарат)</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>В ходе ОРМ установлено, что Аяпов Б.А. с 10 июня 2022 года организовал незаконный игорный бизнес путем установления игровых аппаратов в нежилом помещении по адресу: г. Астана, ул. Момушылы, 12.</>,
                                    <>Собственником помещений является Шаймерденов К.М.</>,
                                    <>Согласно заключению криминалиста от 11 декабря 2022 года за период с 10 июня 2022 года по 10 декабря 2022 года на игровых аппаратах осуществлены игры, функционирующие на условиях денежных ставок и получения выигрыша. Всего в игровые аппараты внесены денежные средства в размере 38 450 112 тенге из которых выдан выигрыш 4 500 232 тенге.</>,
                                    <>Оперативным путем зафиксирован факт передачи Аяповым Б.А. денежных средств Шаймерденову К.М. за аренду помещения, а также обнаружены переписки в социальных сетях по вопросам аренды.</>,
                                    <>12 декабря 2022 года в отношении Аяпова начато досудебное расследование по ст. 307 ч. 2 п. 3 УК РК.</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                                header={<><span className="bold">Ситуационная задача по ст. 307 УК РК (онлайн-казино)</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>Согласно оперативной разработке Абаева, Жакупов <span className="italic">(супруг Абаевой)</span>, Лесбекова, Ахметов и Гаитов <span className="italic">(бывший сотрудник правоохранительных органов)</span> в период с января 2022 года по январь 2023 года организовали незаконный игорный бизнес в виде онлайн-казино на общедоступных интернет сайтах: www.win.kz, www/monkey.kz и www.1b.kz на территории РК.</>,
                                    <>Согласно данным финансовой разведки в незаконный игорный бизнес вовлечено более 8 тысяч игроков.</>,
                                    <>Для приема ставок и выплаты выигрыша денежных средств использовались карточные счета, открытые в АО «Каспи Банк» на граждан РФ: Смирнова, Олегова, Ищенко, Беловой и Ожегова.</>,
                                    <>Карточные счета иностранных лиц привязывались к игровым платформам, тем самым выполняли функцию оплаты за участие и выплаты выигрыша.</>,
                                    <>Для работы онлайн-казино группа лиц арендовала 7 квартир в г.г. Алматы (2), Костанай (2), Семей (1) и Актау (2) для размещения в них оборудования <span className="italic">(ноутбуков, телефонов с банковскими приложениями)</span>.</>,
                                    <>В этих квартирах находились 20 кассиров, граждан РК, которые круглосуточно через Интернет принимали оплату от игроков за участие в онлайн-казино.</>,
                                    <>29 июля 2023 года в отношении Абаевой, Жакупова, Лесбековой, Ахметова и Гаитова начато досудебное расследование по ст. 307 ч. 3 УК РК.</>,
                                    <>30 июля 2023 года при проведении обысков преступная деятельность группы пресечена, изъято оборудование в количестве 15 ноутбуков, 25 телефонов, 8 модемов, 17 банковских карточек.</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#d14747'}
                                header={<><span className="bold">Ситуационная задача по ст. 307 УК РК (покер)</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>По оперативной информации установлено, что Ким А.В. в январе 2022 года через арендовал 3-комнатную квартиру у Серикбаева С.М., расположенную по адресу: г. Шымкент ул. Гани Ильяева дом № 113/4, кв. № 5.</>,
                                    <>В период с 15 января 2022 года по 10 января 2023 года Ким А.В. с ранее знакомым Мамбетовым Ж.Ш. в указанной квартире открыли игорное заведение для проведения азартных игр по правилам покера.</>,
                                    <>Для этого Ким и Мамбетов приобрели столы, стулья, стол с сукном, где нанесли обозначения разметок для игры в покер, а также несколько колод карт и фишки для обмена на деньги.</>,
                                    <>Через социальные сети и мессенджер «WhatsApp» Ким и Мамбетов приглашали потенциальных клиентов-игроков в игорное заведение.</>,
                                    <>По приглашению Мамбетова и Ким клиенты-игроки посещали игорное заведение, где передавали Ким наличными денежные средства или путем перевода на его карточный счет в АО «Kaspi Bank». </>,
                                    <>С целью создания дополнительных условий для игроков, Ким А.В. нанимал крупье – дилера Акаеву Ж., 2006 года рождения, для раздачи карт и принятия ставок. </>,
                                    <>Установлено, что владелец помещения Серикбаев является одноклассником Мамбетова и в 2022 году вызывался для допроса в качестве свидетеля по уголовному делу в отношении Абаева, который организовал в его квартире аналогичное игорное заведение. </>,
                                    <>По данному факту 11 января 2023 года в отношении Ким и Мамбетова начато досудебное расследование по ст. 307 ч. 2 п. 2 УК РК. </>,
                                    <>В тот же день, при проведении контрольного закупа преступная деятельность Ким и Мамбетова была пресечена, задокументировано проведение игры в покер с участием 9 игроков, трое из которых 2003 года рождения и двое 2005 года рождения. </>,
                                    <>При проведении осмотра в кассе игорного заведения обнаружены и изъяты денежные средства в размере 15 млн тенге, 43 фишки синего цвета, 8 колод карт.  </>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                                header={<><span className="bold">Ситуационная задача по ст.307 УК РК (букмекерская контора)</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>При проведении досудебного расследования в отношении кассира банка Актаевой, по фактам присвоения наличных денежных средств банка в размере 50 млн тенге установлено, что последняя, являясь лудоманом, использовала похищенные денежные средства для ставок в игорном заведении под видом букмекерской конторы «1Хплюс».</>,
                                    <>Установлено, что Аяпов Б.А. 10 июня 2022 года под видом букмекерской конторы в г. Астана, ул. Момушылы, 12 (собственник – Шаймерденов К.М.) открыл незаконное игорное заведение «1Хплюс», которое действовало до 10 декабря 2022 года. </>,
                                    <>Игорное заведение «1Хплюс» осуществляло деятельность по приему ставок на исход спортивных мероприятий. </>,
                                    <>10 декабря 2022 года в отношении Аяпова начато досудебное расследование по ст. 307 ч. 3 УК РК и в этот же день он задержан с поличным при проведении контрольного закупа при получении денежных средств от Иванова С. в качестве ставки на исход футбольного матча «Челси-Ливерпуль». </>,
                                    <>Согласно заключению криминалиста КУ АФМ РК № 123 от 11 декабря 2023 года осуществление ставок и функционирование кассового аппарата осуществлялось в период с 10 июня 2022 года по 10 декабря 2022 года. За указанный период поступило 138 450 112 тенге, выдано в качестве выигрыша 8 500 232 тенге.</>,
                                    <>Оперативным путем зафиксирован факт передачи Аяповым Б.А. денежных средств Шаймерденову К.М. за аренду помещения, обнаружены телефонные переписки по вопросам аренды. </>,
                                    <>В период деятельности незаконного игорного бизнеса Аяповым Б.А. приобретено движимое и недвижимое имущество (квартира. в г. Костанай, ул. Мамырова, 12, кв. 110 за 13 000 000 тенге и автомашина марки «Lada priora» 2018 г.в. за 4 100 000 тенге).</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#d14747'}
                                header={<><span className="bold">Ситуационная задача по ст.307 УК РК (букмекерская контора)</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>При проведении досудебного расследования в отношении кассира банка Актаевой, по фактам присвоения наличных денежных средств банка в размере 50 млн тенге установлено, что последняя, являясь лудоманом, использовала похищенные денежные средства для ставок в игорном заведении под видом букмекерской конторы «1Хплюс».</>,
                                    <>Установлено, что Аяпов Б.А. 10 июня 2022 года под видом букмекерской конторы в г. Астана, ул. Момушылы, 12 (собственник – Шаймерденов К.М.) открыл незаконное игорное заведение «1Хплюс», которое действовало до 10 декабря 2022 года.</>,
                                    <>Игорное заведение «1Хплюс» осуществляло деятельность по приему ставок на исход спортивных мероприятий.</>,
                                    <>10 декабря 2022 года в отношении Аяпова начато досудебное расследование по ст. 307 ч. 3 УК РК и в этот же день он задержан с поличным при проведении контрольного закупа при получении денежных средств от Иванова С. в качестве ставки на исход футбольного матча «Челси-Ливерпуль». </>,
                                    <>Согласно заключению криминалиста КУ АФМ РК № 123 от 11 декабря 2023 года осуществление ставок и функционирование кассового аппарата осуществлялось в период с 10 июня 2022 года по 10 декабря 2022 года. За указанный период поступило 138 450 112 тенге, выдано в качестве выигрыша 8 500 232 тенге. </>,
                                    <>Оперативным путем зафиксирован факт передачи Аяповым Б.А. денежных средств Шаймерденову К.М. за аренду помещения, обнаружены телефонные переписки по вопросам аренды. </>,
                                    <>В период деятельности незаконного игорного бизнеса Аяповым Б.А. приобретено движимое и недвижимое имущество (квартира. в г. Костанай, ул. Мамырова, 12, кв. 110 за 13 000 000 тенге и автомашина марки «Lada priora» 2018 г.в. за 4 100 000 тенге).</>,
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                                header={<><span className="bold">Ситуационная задача по ст. 217 УК РК</span></>}
                            />
                            <Sizebox height={20}/>
                            <RandomH2>Обстоятельства дела:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>В ДЭР по Атырауской области поступило заявление от Зуевой В. в отношении Хамзина Н. по факту получения им денег в размере 1 млн тенге, которые он обещал вернуть с процентами при условии вовлечения ею не менее пяти человек.</>,
                                    <>После получения 5 января 2023 года 1 млн тенге Хамзин Н. отказался возвращать деньги, так как Зуева не выполнила условия привлечения для вложения 1 млн тенге еще пяти.</>,
                                    <>Установлено, что Хамзин в декабре 2021 года создал и руководил ТОО «Мебель в дом» которое осуществляло деятельность по извлечению дохода от привлечения денег физических лиц и перераспределяло доходы, для обогащения одних участников за счет взносов других.</>,
                                    <>Установлено, что в конце 2021 года Хамзин Н. начал свою деятельность по продаже мебели в Атырауской области и создал группу в мессенджере «WhatsApp» для ее реализации.</>,
                                    <>В связи с низким спросом использовал созданное ТОО по привлечению вкладчиков, проведения розыгрыша, выигрыша в виде мебели или денежных средств.</>,
                                    <>Участие в проекте заключалось в привлечении одним вкладчиком не менее пяти вкладчиков, который становился так называемым «лидером» и должен был получить сумму вклада обратно с вознаграждением 200 тыс. тенге либо мебель на такую стоимость.</>,
                                    <>Все лидеры проекта вступали в группу «WhatsApp» и приглашали вкладчиков за собой. Далее, собирали денежные средства с вкладчиков в размере не менее 1 млн тенге.</>,
                                    <>Известно о 460 вкладчиков из которых 94 <span className="bold">(в разных регионах страны)</span> не получили обратно 94 млн тенге.</>,
                                    <>25 февраля 2023 года в отношении Хамзина начато досудебное расследование по ст. 217 ч. 3 п. 2 УК РК.</>
                                ]}
                            />
                            <Sizebox height={40}/>
                            <RandomH2>Задание:</RandomH2>
                            <Sizebox height={20}/>
                            <TextWithTitle 
                                text={[
                                    <>1. Составить План расследования совершенного преступления.</>,
                                ]}
                            />
                        </Reveal>

                        <Sizebox height={150} />

                        <Reveal>
                            <HeaderWithLine 
                                headerColor={'#3A3939'} lineColor={'#CADEFC'}
                                header={<><span className="bold">КРИТЕРИИ ОЦЕНКИ ВЫПОЛНЕНИЯ ЗАДАЧ</span></>}
                            />
                            <Sizebox height={20}/>
                            <SimpleTable 
                                columns={[
                                    '№',
                                    'Вопросы, включенные в план расследования',
                                    <><span className="bold">Выполнение 1 - 5 баллов</span> (1-очень плохо, 5-отлично)</>,
                                ]}
                                data={[
                                    [ '1.', 'Соответствует ли План типовому образцу.', '' ],
                                    [ '2.', 'Анализ и оценка оперативных материалов (результаты ОРМ) и материалов уполномоченных органов (акты ревизии, заключений, справок, обращений и т.д.).', '' ],
                                    [ '3.', 'Дача поручения на проведение НСД (указать вид НСД).', '' ],
                                    [ 
                                        '4.', 
                                        <>
                                            <RandomParapraph>Сбор и анализ данных о лицах, подлежащих проверке, по средствам:</RandomParapraph>
                                            <Sizebox height={5} />
                                            <NotNumberedDots
                                                gap={'5px'}
                                                dotsColor={'black'}
                                                list={[
                                                    'СИОПСО;',
                                                    'открытых источников (соцсети, поисковые сервисы);',
                                                    'информации уполномоченных госорганов, организаций (БВУ, ПФР, BINANCE и др.)',
                                                ]}
                                            />
                                        </>, 
                                        '' 
                                    ],
                                    [ '5.', 'Обыск.', '' ],
                                    [ '6.', 'Выемка', '' ],
                                    [ '7.', 'Осмотр места происшествия и вещественных доказательств.', '' ],
                                    [ '8.', <>Назначение соответствующих экспертиз <span className="italic">(исследований)</span>, анализ и оценка их результатов.</>, '' ],
                                    [ '9.', 'Подготовка и допрос свидетелей.', '' ],
                                    [ '10.', 'Направление МСП.', '' ],
                                    [ '11.', 'Дача оценки собранным доказательствам и доводам защиты.', '' ],
                                    [ '12.', 'Подготовка и допрос подозреваемого. ', '' ],
                                    [ '13.', 'Квалификация деяния подозреваемого.', '' ],
                                    [ '14.', 'Избрание меры пресечения или иных мер процессуального принуждения.', '' ],
                                    [ 
                                        '15.', 
                                        <>
                                            <RandomParapraph>Обеспечительные меры для возможной конфискации:</RandomParapraph>
                                            <Sizebox height={5} />
                                            <NotNumberedDots
                                                gap={'5px'}
                                                dotsColor={'black'}
                                                list={[
                                                    'приостановление операций с имуществом сроком до 10 суток;',
                                                    'оценка имущества;',
                                                    'ходатайство перед судом о наложении ареста.',
                                                ]}
                                            />
                                        </>, 
                                        '' ],
                                    [ '16.', 'Очная ставка.', '' ],
                                    [ '17.', 'Обвинительный акт.', '' ],
                                    [ '18.', 'Последовательность проведения следственных действий и подготовка к ним.', '' ],
                                    [ '19.', 'Содержит ли План подготовку для проведения следственных действий.', '' ],

                                ]}
                            />
                        </Reveal>

                        <Sizebox height={100} />
                        <Reveal>
                            <NextLesson handleOnClick={() => {
                                CheckCurrentChapter(1);
                            }}/>
                        </Reveal>

                    </LessonPage> 
                case 6:
                    return <TestPage 
                    
                        name={'Тест'}
                        questions={quizQuestions}
                        quizId={5}
                        handleOpenModal={() => { 

                        }}
                    />
                case 7: 
                    return (<LessonPage name={'ПОСЛЕСЛОВИЕ'}>
                        <Sizebox height={28} />

                        <TextWithTitle 
                            text={[
                                'В заключении данного Учебного курса подведем некоторые итоги и обратим внимание на ключевые моменты.',
                                'Вы изучили наглядные примеры того, как не должны планироваться следственные действия, ознакомились с наиболее действенными методами планирования расследования для эффективного использования сил и средств.',
                                'Убедились как важно анализировать собранные доказательства и давать им оценку по завершении каждого пункта плана.',
                                'Полагаем, что Учебный курс стал полезным и поможет улучшить навыки в планировании расследования для достижения положительных результатов.',
                                'Суммируя изложенное, также нужно сделать вывод о том, что для эффективного расследования преступлений в целом, и совершаемых путем мошенничества с финансовыми ресурсами в частности, необходимо своевременно разработать согласованный план мероприятий для организации расследования, что даст возможность наладить взаимодействие между следователем, оперативными работниками, специалистами; обеспечить квалифицированное руководство СОГ; наладить систематический обмен информацией и отчетностью о результатах работы следственной группы и каждого следователя; обеспечить необходимые условия работы следователя для собирания, исследования и оценки доказательств.',
                                
                            ]}
                        />
                        <Sizebox height={40} />
                        <Reveal>
                            <ImageWithText
                                color={'white'}
                                imageText={'Дальнейших Вам профессиональных успехов и процветания!'} 
                                img={'https://corporate.waterlogic.com/fileadmin/_processed_/f/4/csm_banner-hands-shaking-3_c621f2a33f.jpg'} 
                            />
                        </Reveal>

                        <Sizebox height={100} />
                        <Reveal>
                            <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                                Завершение Учебного курса
                            </HeaderWithLine>
                        </Reveal>
        
                        <Sizebox height={50}/>
                        <Reveal>
                            <NextLesson handleOnClick={() => {
                                CheckCurrentChapter(1);
                            }}/>
                        </Reveal>
        
                    </LessonPage>)
                case 8:
                    return <LessonPage name={'Видео урок'}>
                        <Sizebox height={30} />
                        <Reveal>
                            <RandomParapraph>
                                Для совершенствования практических навыков предлагаем посмотреть видео-ролик <span className="bold">"Планирование расследования преступлений"</span>
                            </RandomParapraph>
                        </Reveal>

                        <Sizebox height={30} />
                        <Reveal>
                            <VideoLine 
                                url={'https://videos.sproutvideo.com/embed/a790d1b01c19e6c32e/a1dd78e0120e7923'}
                            />
                        </Reveal>

                    </LessonPage>

        }
    }

    return ( 
        <div className="planning-investigation-course">
            <div className="course-wrapper">

                <CourseHeader
                    handleNavOpen={handleNavOpen}
                    courseName={courseName}
                />
                <div className="course-body">

                    <CourseNavigation
                        isNavOpen={isNavOpen}
                        activeSessionId={activeSessionId}
                        handleSessionClick={handleSessionClick}
                        courseProgress={courseProgress}
                        courseName={courseName}
                    />

                    <div className={isNavOpen ? "course-content open" : "course-content"}>
                        <div className="content">
                            {
                                getLesson(activeSessionId)
                            }
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

const CourseNavigation = ({
    isNavOpen,
    activeSessionId,
    handleSessionClick,
    courseProgress,
    courseName,
}) => {

    const [currentModule, setCurrentModule] = useState(1);

    const handleModuleOpen = (id) => {
        if (currentModule === id) {
            setCurrentModule(-1);
            return;
        }
        setCurrentModule(id);
    }

    return (
        <div className={isNavOpen ? "course-nav" : "course-nav hide"}>

            <div className="nav-head">
                <div>
                    <h2>{courseName}</h2>
                    <div className='progress-bar'>
                        <div>Прогресс {parseFloat(courseProgress).toFixed(1)}%</div>
                        <progress id="courseProgress" max="100" value={`${parseFloat(courseProgress).toFixed(2)}`}>{parseFloat(courseProgress).toFixed(2)}</progress>
                    </div>
                </div>
            </div>
            <div className="nav-body">
                <Session
                    session={{
                        id: 1,
                        group: 'О курсе',
                        name: 'О курсе',
                        progress: 0,
                    }}
                    handleSessionClick={handleSessionClick}
                    isActive={1 === activeSessionId}
                />
                <Module
                    moduleId={1}
                    isOpen={currentModule === 1}
                    handleModuleOpen={handleModuleOpen}
                    name={'Общий порядок планирования досудебного расследования'}
                >
                    <Session
                        session={{
                            id: 2,
                            group: 'Введение',
                            name: 'Общее понятие планирования, его структура и задачи',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={2 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 3,
                            group: 'Введение',
                            name: 'Проблемные и актуальные вопросы планирования',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={3 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 4,
                            group: 'Введение',
                            name: 'Некоторые методы и формы планирования досудебного расследования',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={4 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 8,
                            group: 'Введение',
                            name: 'Видео урок',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={8 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 5,
                            group: 'Введение',
                            name: 'Ситуационные задачи',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={5 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 6,
                            group: 'Введение',
                            name: 'Тесты',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={6 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 7,
                            group: 'Введение',
                            name: 'Послесловие',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={7 === activeSessionId}
                    />
                </Module>
            </div>

        </div>
    )
}

const LessonPage = ({ children, name, lecturer }) => {

    return (
        <>
            <div className="content-header">
                <h1>{name}</h1>
                {
                    lecturer ? 
                    (
                        <div className='lector'>
                            <img src={lectorImage} alt="lector-name" />
                            <p>{lecturer}</p>
                        </div>
                    ) : null
                }                
            </div>
            {children}
        </>
    ); 
}

export default PlanningInvestigationCourse;