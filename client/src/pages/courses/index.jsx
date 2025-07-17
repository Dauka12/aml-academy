import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultHeader from '../../components/defaultHeader/DefaultHeader';
import Footer from '../../components/footer/Footer';
import './index.scss';
import course1 from './../../assets/images/basic-course.svg';
import course2 from './../../assets/images/prof-course.svg';
import course3 from './../../assets/images/prod-course.svg';
import course4 from './../../assets/images/kval-course.svg';
import { AiFillStar, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import introImg from './../../assets/images/courseTypes_Intro.png'
import base_url from '../../settings/base_url';
import axios from 'axios';

function CoursesPage() {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/course/getCourses`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                console.log(response.data);

                if (response.status === 200) {
                    setData(response.data);
                } else {
                    // Handle other status codes if needed
                    setError(response.statusText);
                    console.log(response.statusText);
                }
            } catch (error) {
                setError(error);
                console.error(error);
            }

            setLoading(false);
        };
        
        fetchData();
      }, []);

    return ( 
        <div className="courses-page">
            <div>
                <div className="container">
                    <DefaultHeader />
                </div>
            </div>

            <main className='page-content'>
                
                <div className="intro-info">
                    <div className='container'>
                        <div className="text">
                            <h1>Все курсы</h1>
                            <div>
                                <p>Курсы AML ACADEMY составлены специалистами в области ПОД/ФТ с многолетним опытом работы в данной сфере, в том числе в уполномоченном государственном органе.</p>
                                <p>При создании программы курсов большое значение придавалось специфике каждой сферы деятельности субъектов финансового мониторинга для более четкого понимания ими своих обязанностей, и с учетом различий по требованиям законодательства для разных видов субъектов. </p>
                                <p>Возможность выбора наиболее удобного формата обучения позволяет пройти обучение из любой точки мира, в наиболее удобное для вас время.</p>
                            </div>
                        </div>
                        <img src={introImg} alt="image" />
                    </div>
                </div>

                {
                    isLoading 
                    ? (
                        <div className="container">
                            <div className="loading" style={{
                                margin: '20px 0px'
                            }}>
                                <div>загружаем</div>
                                <div>загружаем</div>
                                <div>загружаем</div>
                                <div>загружаем</div>
                                <div>загружаем</div>
                            </div>
                        </div>
                    )
                    : (
                        <div className="courses-row container">
                            {
                                data !== null ? data.map(course => (
                                    <CourseCard 
                                        id={course.course_id}
                                        img={course.course_image}
                                        title={course.course_name}
                                        lang={'РУС'}
                                        duration={'1ч 45мин'}
                                        rate={'5.0'}
                                        type={'Электронное обучение'}
                                    />
                                )) : null
                            }
                        </div>
                    )
                }

                <div className="container">
                    <div className="faq-wrapper">
                        <div className="faq-list">
                            <FAQ 
                                question={'What is Webflow and why is it the best website builаааder?'}
                                answer={'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.'}
                            />
                            <FAQ 
                                question={'What is Webflow and why is it the best website builder?'}
                                answer={'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.'}
                            />
                            <FAQ 
                                question={'What is Webflow and why is it the best website builder?'}
                                answer={'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.'}
                            />
                        </div>
                    </div>
                </div>
                
            </main>

            <Footer />
        </div>
    );
}

const FAQ = ({ question, answer }) => {
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className="faq">
            <div className="question">
                <p>{question}</p>
                {!isOpen 
                    ? <AiOutlinePlus size={20} className='icon' onClick={handleOpen}/>
                    : <AiOutlineMinus size={20} className='icon' onClick={handleOpen}/>
                }
            </div>
            <div className={`answer ${!isOpen ? 'hide' : ''}`}>
                <p>{answer}</p>
            </div>
        </div>
    )
}

const CourseCard = ({id, img, title, lang, duration, rate, type}) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => {
            navigate(`/courses/${id}`);
        }} key={id}>
            <img src={`${img}`} alt={title} />
            <div>
                <h3>{title}</h3>
                <div className='available'>Доступно</div>
                <div className='characteristics'>
                    <p>{lang} | {duration}</p>
                    <div className='rate'>
                        <AiFillStar className='icon' size={20}/>
                        <span>{rate}</span>
                    </div>
                </div>
                <div className='type'>
                    {type}
                </div>
            </div>
        </div>   
    )
}

export default CoursesPage;