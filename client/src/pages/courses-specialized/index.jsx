import React, { useEffect, useState } from 'react';

import DefaultHeader from '../../components/defaultHeader/DefaultHeader';
import Footer from '../../components/footer/Footer';

import { t } from "i18next";
import { useTranslation } from "react-i18next";
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import Collapsable from '../../components/UI/collapsable-block/Collapsable';
import RoadList from '../../components/UI/roadList/RoadList';
import FeedBacks from '../../components/feedbackBlock/FeedBacks';
import Lectors from '../../components/lectors-block/Lectors';
import lectorImg from './../../assets/images/avatar-img.png';
import './index.scss';
console.log(t);
function SpecializedCourse() {
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();
    const [request, setRequest] = useState({
        email: '',
        name: '',
        phone: ''
    })

    const requestOnchange = (key, value) => {
        setRequest(
            {...request, [key]: value}
        )
    }

    useEffect(() => {
        // console.log(request)
    }, [request])

    return ( 
        <div className="specialized-course-page">
            <div>
                <div className="container">
                    <DefaultHeader />
                </div>
            </div>

            <div className="page-content container">

                <h1>Профильный курс</h1>
                <div className="collapsable-blocks">
                    <Collapsable title={'Что из себя представляет данный курс?'}>
                        <p>Данный курс предлагает подробное изучение требований законодательства в сфере ПОД/ФТ, с рассмотрением практических кейсов</p>
                    </Collapsable>
                    <Collapsable title={'Для кого предназначен курс?'}>
                        <p>
                            Курс могут пройти субъекты, уже имеющие представление о сфере ПОД/ФТ и желающие более подробно изучить ее для применения в своей деятельности.
                        </p>
                    </Collapsable>
                    <Collapsable title={'Длительность курса'}>
                        <p>
                            Курс состоит из 16 академических часов, которые разделены на два учебных дня.
                        </p>
                    </Collapsable>
                    <Collapsable title={'Стоимость курса'}>
                        <p>
                            1000000 тг
                        </p>
                    </Collapsable>
                    <Collapsable title={'Дата ближайшего курса'}>
                        <p>
                            21.10.2023
                        </p>
                    </Collapsable>
                    <Collapsable title={'Программа курса'}>
                        <p style={{lineHeight: '23px'}}>
                        1. Общая характеристика национальной системы противодействия отмыванию преступных доходов финансированию терроризма <br/>
                        2. Международная система противодействия отмыванию преступных доходов и финансированию терроризма <br/>
                        3. Нормы Закона Республики Казахстан от 28 августа 2009 года «О противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма <br/>
                        4. Государственный контроль/надзор за соблюдением законодательства Республики Казахстан о ПОД/ФТ <br/>
                        5. Подразделение финансовой разведки<br/>
                        6. Требования к внутренним нормативным документам<br/>
                        7. Требования к субъектам финансового мониторинга по подготовке и обучению в сфере ПОД/ФТ<br/>
                        8. Заключительная часть
                        </p>
                    </Collapsable>
                    <Collapsable title={'Дата ближайшего курса'}>
                        <p>
                            Доступ к просмотру записи лекции на 3 месяца, раздаточный материал, а также материалы лекции в личном кабинете
                        </p>
                    </Collapsable>
                </div>

                <h2 >{ t("learning process") }</h2>
                <RoadList items={[
                    'Подача заявки',
                    'Оплата',
                    'Предоставление доступа к Личному кабинету',
                    // 'Добавление в закрытый чат с лектором',
                    'Обучение',
                    'Выдача сертификатов'
                ]}/>

                <h2>Лекторы</h2>
                <Lectors 
                    lectors={[
                        { img: lectorImg, name: 'Larry W.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
                        // { img: lectorImg, name: 'Larry W.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
                        // { img: lectorImg, name: 'Larry W.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
                        // { img: lectorImg, name: 'Larry W.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
                    ]}
                />

                <h2>Отзывы</h2>
                <FeedBacks 
                    feedBacks={[
                        { img: lectorImg, name: 'Felipe M.1', text: '"Мне очень понравился гибкий график курсов. Я могу подстроить обучение под свое расписание и настроение."'},
                        { img: lectorImg, name: 'Felipe M.2', text: '"Мне очень понравился гибкий график курсов. Я могу подстроить обучение под свое расписание и настроение."'},
                        { img: lectorImg, name: 'Felipe M.3', text: '"Мне очень понравился гибкий график курсов. Я могу подстроить обучение под свое расписание и настроение."'},
                        { img: lectorImg, name: 'Felipe M.4', text: '"Мне очень понравился гибкий график курсов. Я могу подстроить обучение под свое расписание и настроение."'},
                        { img: lectorImg, name: 'Felipe M.5', text: '"Мне очень понравился гибкий график курсов. Я могу подстроить обучение под свое расписание и настроение."'},
                        // { img: letorImg, name: 'Felipe M.6', text: '"Мне очень понравился гибкий график курсов. Я могу подстроить обучение под свое расписание и настроение."'},
                    ]}
                />

                <div className='blue-btn'>
                    <div onClick={() => setShowModal(true)}>
                        Подать заявку
                    </div>
                </div>
            </div>

            <Footer />
            {
                showModal ? 
                    <ModalWindow title={'Подать заявку'} setShowModal={setShowModal}>
                        <FormInput title={'Почта'} field={'email'} onChange={requestOnchange}/>
                        <FormInput title={'ФИО'} field={'name'} onChange={requestOnchange}/>
                        <FormInput title={'Номер телефона'} field={'phone'} onChange={requestOnchange}/>
                        <div style={{display: 'flex', justifyContent: 'end', padding: '0px 20px'}}>
                            <div 
                                style={{background: '#1F3C88', padding: '10px 20px', color: 'white', fontSize: '16px', borderRadius: '5px', outline: 'none', cursor: 'pointer'}}
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                Отправить
                            </div>
                        </div>
                    </ModalWindow>
                :
                    <></>
            }
        </div>
    );
}

const FormInput = ({title, field, onChange}) => {
    const labelStyle = {
        'fontFamily': 'Inter',
        'fontSize': '1.2rem',
        paddingLeft: '10px',
    }

    const inputStyle = {
        color: 'black',
        // width: '500px',
        border: '1px solid black',
        borderRadius: '5px',
        fontSize: '1.2rem',
        padding: '10px'
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '20px', padding: '0px 20px'}}>

            <label style={labelStyle} htmlFor={field}>{title}</label>
            <input style={inputStyle} placeholder={field} type="text" name={field} onChange={(e) => {
                let value = e.target.value;
                onChange(field, value)
                // console.log(onChange)
            }}/>


        </div>
    )

}

export default SpecializedCourse;