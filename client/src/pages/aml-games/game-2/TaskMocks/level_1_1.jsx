import { useEffect, useState } from "react";
import Sizebox from "../../../../components/courseTemplates/common/Sizebox";
import CustomCarousel from "../../../../components/courseTemplates/complex/CustomCarousel";
import FinishSuccess from "../../components/finish-success";
import GameQuiz from "../../components/quiz";

import carousel_11 from './../../../../assets/images/Carousel_11.png';
import carousel_110 from './../../../../assets/images/Carousel_110.png';
import carousel_111 from './../../../../assets/images/Carousel_111.png';
import carousel_12 from './../../../../assets/images/Carousel_12.png';
import carousel_13 from './../../../../assets/images/Carousel_13.png';
import carousel_14 from './../../../../assets/images/Carousel_14.png';
import carousel_15 from './../../../../assets/images/Carousel_15.png';
import carousel_16 from './../../../../assets/images/Carousel_16.png';
import carousel_17 from './../../../../assets/images/Carousel_17.png';
import carousel_18 from './../../../../assets/images/Carousel_18.png';
import carousel_19 from './../../../../assets/images/Carousel_19.png';

import { mockTasks } from './../mockData';

function Level_1_1() {
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        setFinished(mockTasks[0].status === 'finished' ? true : false);
    }, [])

    return ( 
        <>
            <CustomCarousel
                data={[
                    {
                        header: [],
                        image: carousel_11,
                        imageText: 'Рисунок 11',
                    },
                    {
                        header: [],
                        image: carousel_12,
                        imageText: 'Рисунок 1',
                    },
                    {
                        header: [
                            'Для завершения процедуры необходимо: 1. Выбрать категорию «Финансы»;',
                        ],
                        image: carousel_13,
                    },
                    {
                        header: [
                            '2. Кликнуть на подкатегорию «Уведомительный порядок»;',
                            '3. Выбирать «Уведомление о начале или прекращении деятельности лица, являющегося субъектом финансового мониторинга в соответствии с Законом Республики Казахстан «О противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма»);',
                        ],
                        image: carousel_14,
                    },
                    {
                        header: ['4. Заказать услугу онлайн;'],
                        image: carousel_15,
                    },
                    {
                        header: [
                            '5. Во всплывающем окне выбрать Агентство Республики Казахстан по финансовому мониторингу;',
                        ],
                        image: carousel_16,
                    },
                    {
                        header: [
                            '6. Далее отображаются личные сведения Субъекта;',
                            '7. В данной вкладке необходимо указать адрес осуществления деятельности и выбрать соответствующий вид Субъекта финансового мониторинга, далее подписать с помощью ЭЦП и отправить;',
                        ],
                        image: carousel_17,
                    },
                    {
                        header: [
                            '8. Также можно проверить информацию о поданном уведомлении и при необходимости скачать талон о принятии уведомления. Для этого на главной странице сайта elicense.kz  необходимо выбрать «Поиск РД»;',
                        ],
                        image: carousel_18,
                    },
                    {
                        header: [
                            '9. Указать БИН/ИИН организации;',
                            '10. Перейти на кнопку «Действительный»;',
                        ],
                        image: carousel_19,
                    },
                    {
                        header: [
                            '11. Скачать документ «Талон о принятии уведомления».',
                        ],
                        image: carousel_110,
                    },
                    {
                        header: [
                            'Уведомление заверяется электронной цифровой подписью субъекта.',
                        ],
                        image: carousel_111,
                    },
                ]}
            />

            <Sizebox height={40} />

            
            <h2>Задача 1</h2>
            <div className="vertical-tabs-form-quiz">
                <div>
                    <div className="title">Данные СФМ</div>
                    <div className="inner">
                        <div className="left">
                            <div className="form-item">
                                <label>Фамилия</label>
                                <input type="text" />
                            </div>
                            <div className="form-item">
                                <label>Имя</label>
                                <input type="text" />
                            </div>
                            <div className="form-item">
                                <label>Отчество</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="right">
                            <h4>Период осуществления деятельности</h4>
                            <div className="form-item">
                                <label>Дата начала осуществления деятельности:</label>
                                <input type="date" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="title">Адрес объектов</div>
                    <div className="inner">
                        <div className="left">
                            <div className="form-item">
                                <label>Почтовый индекс</label>
                                <input type="text" />
                            </div>
                            <div className="form-item">
                                <label>Место положение</label>
                                <input type="text" />
                            </div>
                            <div className="form-item">
                                <label>Название улицы</label>
                                <input type="text" />
                            </div>
                            <div className="form-item">
                                <label>Номер дома</label>
                                <input type="text" />
                            </div>
                            <div className="form-item">
                                <label>Номер квартиры/дома</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="title">Вид субъекта финансового мониторинга</div>
                    <div className="inner">
                        <div className="left">
                            <GameQuiz 
                                questions={[
                                    {
                                        question: 'Выбрать из списка',
                                        answers: [
                                            'независимые специалисты по юридическим вопросам',
                                            'индивидуальные предприниматели и юридические лица, осуществляющие лизинговую деятельность в качестве лизингодателя без лицензии',
                                            'индивидуальные предприниматели и юридические лица, осуществляющие операции с драгоценными металлами и драгоценными камнями, ювелирными изделиями из них',
                                            'индивидуальные предприниматели и юридические лица, оказывающие посреднические услуги при осуществлении сделок купли-продажи недвижимого имуществ'
                                        ]
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <button 
                        className='blue'
                        onClick={(e) => {
                            setFinished(true);
                        }}
                    >Подтвердить</button>
                </div>
            </div>
            
            {
                finished 
                    ? (
                        <FinishSuccess>
                            Вы успешно получили свой талон!
                        </FinishSuccess>
                    ) 
                    : null
            }
        </>
    );
}

export default Level_1_1;