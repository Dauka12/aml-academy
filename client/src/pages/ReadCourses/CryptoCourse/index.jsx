import React, { useEffect, useState } from 'react';

import './style.scss';
import file1 from './Глоссарий.pdf';



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
import DotsOnRoad from '../../../components/courseTemplates/common_v2/DotsOnRoad';
import FancyList from '../../../components/courseTemplates/common_v2/FancyList';
import FlexBoxes from '../../../components/courseTemplates/common_v2/FlexBoxes';
import Image from '../../../components/courseTemplates/common_v2/Image';
import TwoColumnsDivider from '../../../components/courseTemplates/common_v2/TwoColumnsDivider';
import TextAndLink from '../../../components/courseTemplates/complex/TextAndLink';
import lectorImage from './lectorImage.png';

import blockchainTransactions from '../../../assets/images/blockchain-transactions.png';
import blockchainTransactions2 from '../../../assets/images/blockchain-transactions2.png';
import AFM_logo from '../../../assets/images/crypto_AFM.png';
import crypto21 from '../../../assets/images/cryptocurrentcy21.png';
import crypto210 from '../../../assets/images/cryptocurrentcy210.png';
import crypto211 from '../../../assets/images/cryptocurrentcy211.png';
import crypto212 from '../../../assets/images/cryptocurrentcy212.png';
import crypto22 from '../../../assets/images/cryptocurrentcy22.png';
import crypto23 from '../../../assets/images/cryptocurrentcy23.png';
import crypto24 from '../../../assets/images/cryptocurrentcy24.png';
import crypto25 from '../../../assets/images/cryptocurrentcy25.png';
import crypto26 from '../../../assets/images/cryptocurrentcy26.png';
import crypto27 from '../../../assets/images/cryptocurrentcy27.png';
import crypto28 from '../../../assets/images/cryptocurrentcy28.png';
import crypto29 from '../../../assets/images/cryptocurrentcy29.png';
import telegramSell1 from '../../../assets/images/telegramSell1.png';
import telegramSell2 from '../../../assets/images/telegramSell2.png';


function CryptoCourse() {
    const courseName = 'Учебный модуль по навыкам работы с виртуальными активами';
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [activeSessionId, setActiveSessionId] = useState(1);

    const courseProgress = 0;

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
        const courseContent = document.querySelector('.course-content');
        const courseContentScroll = courseContent.scrollTop;

        if (courseContentScroll > 0) {
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
    }, [])

    const handleSessionClick = (id) => {
        scrollToTopAnimated();
        setActiveSessionId(id);
    }

    const CheckCurrentChapter = (chapterNum) => {
        scrollToTopAnimated();
        setActiveSessionId(activeSessionId + 1);
    };


    const getLesson = (id) => {
        // console.log('getLesson', quizQuestions)
        // eslint-disable-next-line default-case
        switch (id) {
            case 1:
                return (<LessonPage name={'О модуле'}>
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
                                    'ОРАЗБЕК Рашид', 'руководитель Управления «Криптон» АФМ'
                                ],
                                ['АККИСЕВ Санжар Серикказыевич', 'заместитель руководителя Управления «Криптон»'],
                                ['АЙБАТОВ Эрнест Айбатович', 'оперуполномоченный Управления «Криптон»'],
                                ['ОРЫНГАЛИЕВ Нурали Аскарулы', 'оперуполномоченный Управления «Криптон»'],
                                ['ПЕРНЕБАЕВ Санжар Серикулы', 'оперуполномоченный Управления «Криптон»'], 
                                ['БАЕТОВ  Канат Жамалханович', 'помощник Ректора AML ACADEMY']
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100}/>

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                Содержание курса
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={30}/>

                    <NumberedDots 
                        dotsColor={'white'}
                        list={[
                            'Введение в криптовалюты',
                            'Как использовать криптовалюты',
                            'Юридический статус криптовалют'
                        ]}
                        header={'ПЕРВЫЙ МОДУЛЬ:'}
                    />

                    <Sizebox height={50}/>

                    <Reveal>
                        <NumberedDots 
                            dotsColor={'white'}
                            list={[
                                'Применение криптовалют в преступной деятельности',
                                'Отслеживание криптовалютных транзакций',
                                'Конфискация и изъятие криптовалют',
                                'Сотрудничество с криптовалютными платформами'
                            ]}
                            header={'ВТОРОЙ МОДУЛЬ:'}
                        />
                    </Reveal>

                    <Sizebox height={50}/>

                    <Reveal>
                        <NumberedDots 
                            dotsColor={'white'}
                            list={[
                                'Кейсы',
                                'Практические упражнения',
                                'Видео-уроки',
                                'Вопросы и определения для самоконтроля',
                            ]}
                            header={'ТРЕТИЙ МОДУЛЬ:'}
                        />
                    </Reveal>
                    
                    <Sizebox height={100}/>

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                НА ЭТОМ КУРСЕ ВЫ УЗНАЕТЕ
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={30}/>
                    <Reveal>
                        <FancyList 
                            listColor='#ccc'
                            list={[
                                'ЧТО ТАКОЕ КРИПТОВАЛЮТА?',
                                'РИСКИ: ОТМЫВАНИЕ ДОХОДОВ, НАРКОТИКИ, КОРРУПЦИЯ',
                                'ОТСЛЕЖИВАНИЕ КРИПТОВАЛЮТ',
                                'ОСОБЕННОСТИ ПРОВЕДЕНИЯ ОПЕРАТИВНО-СЛЕДСТВЕННЫХ МЕРОПРИЯТИЙ',
                                'РЕГУЛИРОВАНИЕ'
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100}/>

                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>

                </LessonPage>)
            case 2: 
                return (<LessonPage name={'Введение в криптовалюты'}>

                    <Sizebox height={28} />

                    <Reveal>
                        <HeaderWithLine header="Что такое криптовалюты и как они работают?" />
                    </Reveal>
                    <Sizebox height={60} />

                    <ImageLine img={'https://content.fortune.com/wp-content/uploads/2016/08/510368092.jpg'} />

                    <Sizebox height={30} />

                    <FlexBoxes
                        list={[
                            `Цифровая форма наличных денег. С её помощью можно рапоряжаться как с деньгами, которые мы привыкли видеть`,
                            'Не принадлежит какой-либо организации, является децентрализованной',
                            `Для использования достаточно иметь мобильное приложение`,
                        ]}
                    />

                    <Sizebox height={60} />

                    <Reveal>
                        <Report_Warning 
                            text={`<span className="bold">Криптовалюты</span> представляют собой цифровые активы, использующие криптографию для обеспечения безопасности и подтверждения транзакций, а также контроля над созданием новых единиц.\n
                            Они функционируют в сети компьютеров и серверов, что обеспечивает их <span className="bold">децентрализованность</span> и <span className="bold">независимость</span> от центральных учреждений, таких как банки или правительства.\n
                            Криптовалюты позволяют пользователям осуществлять денежные переводы и хранить их в цифровой форме.
                            `}
                        />
                    </Reveal>
                    <Sizebox height={80} />

                    <Reveal>
                        <Centered>
                            <RandomH2 
                                text={'Основные термины и понятия'}
                            />
                        </Centered>
                    </Reveal>
                    <Sizebox height={50} />

                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <><span className="bold">Блокчейн</span> - это цепочка блоков, каждый из которых содержит записи о транзакциях.</>,
                                'Каждый блок ссылается на предыдущий блок, создавая непрерывную цепочку.',
                                'Блокчейн обеспечивает надежность и прозрачность записей, так как изменение одного блока требует изменения всех последующих блоков, что затруднительно исключает манипуляции с данными.'
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={50} />

                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <><span className="bold">Майнинг</span> - это процесс проверки и добавления новых транзакций в блокчейн.</>,
                                'Майнеры используют вычислительные ресурсы для решения сложных криптографических задач. Когда задача решена, майнер добавляет новый блок с подтвержденными транзакциями в блокчейн и получает вознаграждение в виде криптовалюты.',
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={50} />

                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <><span className="bold">Криптовалютный кошелек</span> - это программное или аппаратное решение для хранения, отправки и получения криптовалют.</>,
                                'В кошельке хранятся публичные и приватные ключи.',
                                'Публичный ключ используется для получения средств, а приватный ключ – для подписи транзакций.',
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={50} />

                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <><span className="bold">Приватный и публичный ключи:</span></>,
                                <><span className="italic">Приватный ключ</span> – это уникальная строка символов, которая используется для подписи транзакций кошелька.</>,
                                <><span className="italic">Публичный ключ</span> – это адрес кошелька, который можно раскрывать для получения средств.</>,
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />

                    <Reveal>
                        <HeaderWithLine header="Как работает блокчейн?" />
                    </Reveal>
                    <Sizebox height={60} />

                    
                    <Reveal>
                        <RandomParapraph>
                            <span className="bold">Блокчейн</span>  – это распределенная база данных, хранящая информацию о транзакциях и других данных в виде блоков. Каждый блок содержит:
                        </RandomParapraph>
                    </Reveal>
                    <Sizebox height={20}/>
                    <Reveal>
                        <NotNumberedDots 
                            dotsColor={'black'}
                            list={[
                                <><span className="bold">Хэш</span> предыдущего блока, что обеспечивает связь между блоками;</>,
                                <><span className="bold">Транзакции или другие данные.</span></>
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={20}/>
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <>Новые транзакции отправляются в сеть узлов. Майнеры конкурируют за решение криптографических задач, чтобы создать новый блок. Как только задача решена, новый блок добавляется в цепочку блоков. Этот процесс обеспечивает безопасность и надежность, так как изменение одного блока потребует пересчета всей цепочки, что практически невозможно.</>,
                                <>Благодаря распределенной природе блокчейна, нет единого пункта отказа, и сеть продолжает функционировать даже при отказе нескольких узлов. Это обеспечивает надежную и устойчивую среду для проведения транзакций и хранения данных.</>,
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />

                    <Reveal>
                        <HeaderWithLine header="Что такое децентрализация и почему она важна?" />
                    </Reveal>
                    <Sizebox height={60} />

                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <><span className="bold">Децентрализация </span>– это принцип, при котором власть, контроль и решения распределены между множеством участников или узлов, вместо того чтобы быть сосредоточенными в одном центре.</>,
                                'В контексте криптовалют и блокчейна, децентрализация означает отсутствие центрального контроля над сетью или валютой.',
                                'Это достигается путем распределения данных и функций между множеством участников, называемых узлами, которые работают вместе для поддержания сети.'
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={60} />

                    <Reveal>
                        <NotNumberedDots 
                            header={<><span className="bold">Децентрализация играет важную роль в криптовалютных системах по нескольким причинам:</span></>}
                            dotsColor={'black'}
                            list={[
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Безопасность</span>: децентрализованная сеть менее подвержена атакам, так как злоумышленнику потребуется контролировать большую часть узлов, чтобы изменить данные или провести мошеннические операции.</>,
                                        <>Это делает криптовалюты более устойчивыми к взломам.</>
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Инклюзивность</span>: децентрализованные сети доступны для всех пользователей, независимо от их местоположения или финансового положения.</>,
                                        <>Это позволяет более широкому кругу людей использовать финансовые услуги и участвовать в экономике.</>
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Устойчивость</span>: децентрализация уменьшает риск выхода из строя всей сети из-за отказа одного или нескольких узлов.</>,
                                        <>Сеть продолжает функционировать, пока есть достаточное количество работающих узлов.</>
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Инновации</span>: децентрализация стимулирует инновации, так как она позволяет разработчикам создавать новые децентрализованные приложения и сервисы на основе блокчейна, без необходимости получения разрешения от центральных властей.</>,
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Прозрачность</span>: децентрализованный характер блокчейна обеспечивает прозрачность транзакций.</>,
                                        <>Любой участник сети может проверить транзакции и историю операций, что создает доверие и уменьшает риски фальсификации данных.</>,
                                    ]}/>
                                </>,
                            ]}

                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <ImageWithText 
                            imageText='Основные криптовалюты и их особенности'
                            color={'white'}
                            img={'https://dev.gamblingnews.com/wp-content/uploads/2023/01/pile-of-cryptocurrencies-on-a-black-surface.jpeg'}
                        />
                    </Reveal>
                    <Sizebox height={60} />

                    <Reveal>
                        <NotNumberedDots 
                            header={<><span className="bold">Децентрализация играет важную роль в криптовалютных системах по нескольким причинам:</span></>}
                            dotsColor={'black'}
                            list={[
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Bitcoin (BTC)</span>: Первая и самая известная криптовалюта, созданная Сатоши Накамото в 2009 году.</>,
                                        <>Она предназначена для электронных платежей.</>,
                                        <>Однако она не обладает сложными смарт-контрактами, что ограничивает её функциональность по сравнению с некоторыми другими криптовалютами.</>,
                                    ]}/>
                                    <Sizebox height={20} />
                                    <TextAndLink
                                        text={'Создатель Bitcoin Сатоши Накамото'}
                                        link={'https://bitcoinwiki.org/ru/wiki/satoshi-nakamoto'} 
                                    />
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Ethereum (ETH)</span>: Созданная Виталием Бутериным в 2015 году, Ethereum – это платформа для создания смарт-контрактов и децентрализованных приложений.</>,
                                        <>Она отличается от Bitcoin тем, что поддерживает более сложные программные коды, что позволяет разработчикам создавать разнообразные децентрализованные приложения, такие как децентрализованные финансовые сервисы, игры и даже целые организации.</>
                                    ]}/>
                                    <Sizebox height={20} />
                                    <TextAndLink
                                        text={'Создатель Ethereum Виталик Бутерин'}
                                        link={'https://pro.rbc.ru/demo/620ba9e09a794787baad8bc6'} 
                                    />
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">USDТ– Стейблкойн</span>, то есть криптовалюта, цена которой привязана к традиционным фиатным валютам, таким как доллар США.</>,
                                        <>Это позволяет использовать USDT в качестве стабильного средства обмена и хранения ценности в криптовалютном мире.</>
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Monero (XMR)</span>: Криптовалюта с акцентом на конфиденциальность и анонимность.</>,
                                        <>Она использует различные технологии, такие как кольцевые подписи и скрытые адреса, чтобы обеспечивать приватность транзакций и участников.</>,
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Litecoin (LTC)</span>: Создан Charlie Lee в 2011 году, Litecoin был задуман как «серебро» к «золоту» Bitcoin.</>,
                                        <>Он имеет более короткое время генерации блока и более легковесный алгоритм для майнинга, что делает его более быстрым и доступным для широкой аудитории.</>,
                                    ]}/>
                                </>,
                            ]}

                        />
                    </Reveal>
                    <Sizebox height={100} />

                    <Reveal>
                        <HeaderWithLine header="Давайте сделаем небольшое отступление, и взглянем на краткую историю, например, BITCOIN и ETHEREUM" />
                    </Reveal>
                    <Sizebox height={60} />
                    
                    <Reveal>
                        <ImageWithText 
                            imageText="ИСТОРИЯ – НАЗНАЧЕНИЕ - КАК РАБОТАЕТ"
                            color="white"
                            img="https://wallpapersmug.com/download/2560x1024/4c063c/bitcoin-crypto-currency.jpg"
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <>Биткойн, созданный под псевдонимом Сатоши Накамото, был представлен <span className="bold">в 2008 году</span> через белую бумагу «Bitcoin: A Peer-to-Peer Electronic Cash System».</>,
                                <>В <span className="bold">январе 2009</span> года был выпущен первый блок цепочки блоков биткойна, начиная с генезис-блока. Это была первая криптовалюта, основанная на технологии блокчейн, которая обеспечивает децентрализованный и безопасный способ записи транзакций.</>,
                                <>Сначала биткойн использовался в основном энтузиастами криптографии и технологий. В течение нескольких лет цена биткойна была низкой, но с течением времени его популярность и цена начали расти. Интерес со стороны инвесторов и институциональных игроков также способствовал увеличению цены.</>,
                                <><span className="bold">В 2017 году</span> биткойн привлек большое внимание, достигнув исторического максимума около <span className="bold">20 000 долларов</span> за монету. Однако после этого произошло значительное падение цены, и биткойн столкнулся с волатильностью.</>,
                                <>С тех пор биткойн продолжает колебаться в цене, но он остается самой известной и широко используемой криптовалютой. Его технология блокчейн стала исходной точкой для разработки многих других криптовалют и блокчейн-приложений.</>,
                                <>Со временем он также получил поддержку от некоторых компаний и финансовых институций.</>,
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={120} />
                    <Reveal>
                        <ImageWithText 
                            imageText="ETHEREUM: ЧТО ЭТО ТАКОЕ, ГЛАВНОЕ ЕГО ОТЛИЧИЕ ОТ BITCOIN"
                            color="white"
                            img="https://s3.tradingview.com/timeline/1-min_83653730.jpg"
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <><span className="bold">Ethereum</span> – это платформа и криптовалюта, созданные Виталием Бутериным в 2015 году. Она разработана как децентрализованная среда для создания и выполнения смарт-контрактов и децентрализованных приложений (DApps). </>,
                                <>Отличие Ethereum от Bitcoin заключается в его функциональности.</>,
                                <>Ethereum позволяет разработчикам создавать более сложные программные коды, что является предпосылкой создания автономных приложений с автоматизированными функциями.</>,
                                <>В смарт-контрактах Ethereum можно встроить различные условия, при выполнении которых будет автоматически инициирована соответствующая операция.</>,
                                <>Например, можно создать смарт-контракт для автоматической выплаты страхового возмещения при определенных условиях. Эта способность делает Ethereum более гибким для создания разнообразных децентрализованных приложений.</>,
                            ]}
                        />
                    </Reveal>


                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            <>
                            Перейдем к следующему блоку обучения
                            </>
                        </HeaderWithLine>
                    </Reveal>
    
                    <Sizebox height={50}/>
    
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
            case 3: 
                return (<LessonPage name={'Как использовать криптовалюты?'}>
                    <Sizebox height={28} />

                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <>В мире современных финансов <span className="bold">криптовалюты</span> представляют собой одну из самых <span className="bold">инновационных</span> и <span className="bold">интересных</span> областей.</>,
                                <>Их использование не ограничивается только спекуляциями на биржах – <span className="bold">криптовалюты</span> также могут быть использованы <span className="bold">для реальных финансовых операций</span>, покупок и даже создания собственных приложений на основе технологии блокчейн.</>,
                                <>В этой части обучения мы рассмотрим, как начать использовать криптовалюты, включая создание кошелька, безопасное хранение средств и работу с транзакциями</>
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={60} />
                    
                    

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                КАК СОЗДАТЬ КРИПТОВАЛЮТНЫЙ КОШЕЛЕК:
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={40} />

                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <><span className="red bold">NB! (Nota bene – обратите внимание)</span></>,
                                <>Прежде чем начать использовать криптовалюты, вам понадобится специальное место для их хранения – <span className="bold">криптовалютный кошелек.</span></>,
                                <>Существует несколько видов кошельков, каждый из которых имеет свои особенности и уровни безопасности:</>
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={30} />

                    <Reveal>
                        <div>
                            <img 
                                src="https://www.forbes.com/advisor/wp-content/uploads/2022/10/best_crypto_wallets.jpg" 
                                style={{
                                    height: '300px',
                                    padding: '0px 210px'
                                }}
                            />
                        </div>
                    </Reveal>

                    <Sizebox height={30} />


                    <Reveal>
                        <NumberedDots 
                            dotsColor={'white'}
                            list={[
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Онлайн-кошельки</span>: это веб-приложения, которые позволяют вам хранить и управлять своими криптовалютами через интернет.</>,
                                        <>Они удобны в использовании, но могут быть менее безопасными из-за возможности взлома.</>
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Мобильные кошельки</span>: эти приложения можно установить на ваш смартфон и иметь доступ к своим криптовалютам в любое время.</>,
                                        <>Они более удобны, чем онлайн-кошельки, и обычно имеют высокие уровни безопасности.</>
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Аппаратные кошельки</span>: это физические устройства, спроектированные специально для хранения криптовалют.</>,
                                        <>Они обеспечивают наивысший уровень безопасности, так как ваши приватные ключи хранятся офлайн.</>
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <>
                                            <img 
                                                src="https://i.ytimg.com/vi/cOgoSy6sMCo/maxresdefault.jpg" 
                                                style={{
                                                    height: '300px',
                                                    padding: '0px 210px'
                                                }}
                                            />
                                        </>,
                                        <><span className="bold">Бумажные кошельки</span>: это записи в бумажном виде, на которых написаны ваш публичный и приватный ключи.</>,
                                        <>Они практически не подвержены взлому, но могут быть потеряны или повреждены.</>
                                    ]}/>
                                </>,
                            ]}

                        />
                    </Reveal>
                    <Sizebox height={80} />

                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <><span className="bold red">PS (Post scriptum - послесловие).</span></>,
                                <>Для создания кошелька:</>,
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={30} />
                    <Reveal>
                        <NotNumberedDots 
                            dotsColor={'black'}
                            list={[
                                'следует выбрать подходящий вид необходимого кошелька;',
                                'зарегистрироваться на платформе (в случае онлайн-кошельков);',
                                'или установить приложение (для мобильных кошельков);',
                                'либо приобрести аппаратное устройство;',
                                'или создать бумажный кошелек в соответствии с инструкциями ',
                            ]}

                        />
                    </Reveal>

                    <Sizebox height={50} />

                    <DotsOnRoad
                        data={[
                            { title: 'Seed-фраза из 12-24  слов английского языка', desc: 'abort bird cat fly estimate came eight city map study agency space' },
                            { title: 'Приватный ключ', desc: '5JPeWYZx922hXi49Lg2RIPWLIqcmDGS9YegMNgANvx8cJa6kNK8' },
                            { title: 'Публичный ключ', desc: '03D7A51212E4EEFE40C72B201E74AA3557DEFD940ACESC3E107687577CD45FF962' },
                            { title: 'Адрес кошелька', desc: '1DcEeFRGc4mfRLXWiVZySpmmXk7SsVLfNO' },
                        ]}
                    />

                    <Sizebox height={60} />
                    <Reveal>
                        <TextAndLink 
                            text='Генератор Биткоин кошельков на стороне клиента с открытым исходным кодом'
                            link={'https://www.bitaddress.org/bitaddress.org-v3.3.0-SHA256-dec17c07685e1870960903d8f58090475b25af946fe95a734f88408cef4aa194.html'}
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <Centered>
                            <RandomH2>
                                КРИПТОКОШЕЛЬКИ
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <div className='two-columns' 
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '50px',
                                padding: '0px 210px'
                            }}
                        >
                            <div style={{
                                    backgroundColor: '#34d3eb',
                                    padding: '20px'
                                }}> 
                                <div 
                                    className="title" 
                                    style={{
                                        fontSize: '1.3rem',
                                        fontWeight: '600',
                                        marginBottom: '20px',
                                        fontFamily: 'Ubuntu',

                                    }}
                                >
                                    Контролируемые
                                </div>
                                <ul
                                    style={{
                                        listStyle: 'disc',
                                        listStylePosition: 'inside',
                                        fontSize: '1.2rem',
                                    }}
                                >
                                    <li style={{marginBottom: '10px'}}>Адреса, контролируемые организациями (крипто биржи)</li>
                                    <li style={{marginBottom: '10px'}}>Управлять активами может 3-е лицо (криптовалютная биржа)</li>
                                    <li style={{marginBottom: '10px'}}>Как правило, криптокошельки создаются на криптовалютных биржах</li>
                                </ul>
                            </div>
                            <div 
                                style={{
                                    backgroundColor: '#ebdb34',
                                    padding: '20px'
                                }}
                            >
                                <div 
                                    className="title"
                                    style={{
                                        fontSize: '1.3rem',
                                        fontFamily: 'Ubuntu',
                                        fontWeight: '600',
                                        marginBottom: '20px',

                                    }}
                                >
                                    Не контролируемые
                                </div>
                                <ul
                                    style={{
                                        listStyle: 'disc',
                                        listStylePosition: 'inside',
                                        fontSize: '1.2rem',
                                        gap: '0.5rem',
                                    }}
                                >
                                    <li style={{marginBottom: '10px'}}>Приватные адреса, контролируемые личностями</li>
                                    <li style={{marginBottom: '10px'}}>Управление активами полностью лежит на владельце</li>
                                    <li style={{marginBottom: '10px'}}>Как правило, криптокошельки создаются на децентрализованных приложениях</li>
                                </ul>
                            </div>
                        </div>
                    </Reveal>

                    <Sizebox height={100} />

                    {/* <Reveal>
                        <VideoLine
                            url={'https://videos.sproutvideo.com/embed/7090d1b31716e5c4f9/3cc8a905da62dcd7?playerColor=1496e0'}
                        />
                    </Reveal>
                    <Sizebox height={100} /> */}
                    
                    <Reveal>
                        <Centered>
                            <RandomH2>
                                ЧТО ТАКОЕ ТРАНЗАКЦИИ И КАК ОНИ РАБОТАЮТ?
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <>Транзакции – это основной способ передачи криптовалюты между участниками сети.</>,
                                <>В каждой транзакции содержится информация о том, кто отправляет средства, кому и сколько.</>,
                                <>Ключевыми понятиями в контексте транзакций являются:</>
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={30} />
                    <Reveal>
                        <NotNumberedDots 
                            dotsColor={'black'}
                            list={[
                                <><span className="bold">Адрес получателя:</span> это публичный ключ, который уникально идентифицирует адресата транзакции.</>,
                                <><span className="bold">Сумма:</span> это количество криптовалюты, которое вы хотите отправить.</>,
                                <><span className="bold">Комиссия:</span> в большинстве сетей требуется уплатить небольшую комиссию майнерам за обработку транзакции.</>,
                            ]}
                        />
                    </Reveal>
                    
                    <Sizebox height={60} />

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                Валидация блоков на примере биткойна
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <div
                            style={{
                                padding: '0px 210px'
                            }}
                        >
                            <img 
                                src={blockchainTransactions2} 
                                style={{
                                    height: '600px'
                                }}    
                            />
                        </div>
                    </Reveal>
                    <Sizebox height={60} />

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                Блоки и Транзакции
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <NotNumberedDots 
                            dotsColor={'black'}
                            list={[
                                'Когда транзакция добавляется в блок, она проверяется сетью.',
                                'После проверки блок "запечатывается" и добавляется в цепочку.',
                                'Каждый блок содержит уникальный код, называемый хешем, который связывает его с предыдущим блоком.'
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <div
                            style={{
                                padding: '0px 210px'
                            }}
                        >
                            <img 
                                src={blockchainTransactions} 
                                style={{
                                    height: '600px'
                                }}    
                            />
                        </div>
                    </Reveal>
                    <Sizebox height={40} />


                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <>Транзакции начинаются с подписания приватным ключом отправителя. Подписанные данные отправляются в сеть, где майнеры проверяют их и добавляют в новый блок, который включает транзакцию в блокчейн.</>,
                                <>Таким образом, транзакция становится неизменной и доступной для проверки всем участникам сети.</>,
                                <>Ключевыми понятиями в контексте транзакций являются:</>
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={30} />
                    <Reveal>
                        <Report_Warning>
                            Важно понимать, что криптовалютные транзакции не обратимы.
                        </Report_Warning>
                    </Reveal>
                    <Sizebox height={30} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <>Как только транзакция подтверждена и включена в блокчейн, её нельзя отменить.</>,
                                <>Поэтому перед выполнением транзакции рекомендуется внимательно проверить данные и адрес получателя</>,
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            <>
                            Перейдем к следующему блоку обучения
                            </>
                        </HeaderWithLine>
                    </Reveal>
    
                    <Sizebox height={50}/>
    
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
            case 4: 
                return (<LessonPage name={'Юридический статус криптовалют'}>
                    <Sizebox height={28} />

                    <Reveal>
                        <HeaderWithLine 
                            header={<>
                                В настоящее время криптовалюты стали значимой частью глобальной экономической системы и вызвали интерес у правительств и регуляторов по всему миру. <br/>
                                Однако <span className="bold">юридический статус криптовалют</span> до сих пор остается сложным и многогранным вопросом. <br />
                                В разных странах существуют разные подходы к регулированию и классификации криптовалют, что создает смешанный набор правил и норм.
                            </>}    
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    
                    <Reveal>
                        <ImageLine 
                            img={'https://assets-global.website-files.com/5fc4e8e30f3f81037c021859/6000b933299ec36e7557c64c_AdobeStock_185020169-scaled.jpeg'}
                        />
                    </Reveal>

                    <Sizebox height={40} />

                    <Reveal>
                        <HeaderWithLine 
                            header={'Закон «О цифровых активах»'}
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'В Республике Казахстан порядок и процесс работы с криптовалютами регламентирован Законом от 6 февраля 2023 года «О цифровых активах», согласно которому цифровым активом считается имущество, созданное в электронно-цифровой форме с присвоением цифрового кода, в том числе с применением средств криптографии и компьютерных вычислений, зарегистрированное и обеспеченное неизменностью информации на основе технологии распределенной формы данных.',
                                'На основании этого же Закона выпуск и оборот необеспеченных цифровых активов, а также деятельность бирж цифровых активов по необеспеченным цифровым активам на территории РК запрещена, за исключением территории Международного финансового центра «Астана»'
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={60} />

                    <Reveal>
                        <TextAndLink
                            text={'Закон «О цифровых активах»'}
                            link={'https://adilet.zan.kz/rus/docs/Z2300000193'}
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <TextAndLink
                            text={'Положение о МФЦ «Астана»'}
                            link={'https://adilet.zan.kz/rus/docs/Z2300000193'}
                        />
                    </Reveal>
                    <Sizebox height={100} />

                    <Reveal>
                        <HeaderWithLine 
                            header={'ДАВАЙТЕ ПРОВЕДЕМ НЕБОЛЬШОЙ СРАВНИТЕЛЬНЫЙ АНАЛИЗ ЗАКОНОДАТЕЛЬСТВ НЕКОТОРЫХ ЗАРУБЕЖНЫХ СТРАН В СФЕРЕ ЦИФРОВЫХ АКТИВОВ и КАК КРИПТОВАЛЮТЫ КЛАССИФИЦИРУЮТСЯ В РАЗНЫХ ЮРИСДИКЦИЯХ'}
                        />
                    </Reveal>
                    <Sizebox height={60} />
                    <Reveal>
                        <HeaderWithLine 
                            header={'ЗАКОНОДАТЕЛЬСТВО ПО КРИПТОВАЛЮТАМ В НЕКОТОРЫХ СТРАНАХ:'}
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'Законодательство, регулирующее криптовалюты разнится в разных странах.',
                                <>Некоторыми странами в целях <span className="bold">поддержания инновации</span> и обеспечения защиту <span className="bold">пользователей</span> разработаны и внедрены положительные правовые рамки.</>,
                                <>В то время как другие страны остаются <span className="bold">осторожными</span> и взвешивают плюсы и минусы регулирования.</>
                            ]}
                        />
                    </Reveal>


                    <Sizebox height={100} />
                    <Reveal>
                        <Centered>
                            <RandomH2>
                                ПРИМЕРЫ РАЗЛИЧНЫХ ПОДХОДОВ:
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <NotNumberedDots 
                            dotsColor={'black'}
                            list={[
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">В США</span> криптовалюты признаны виртуальной валютой, и их регулирование осуществляется через различные органы, такие как Комиссия по ценным бумагам и биржам (SEC) и Финансовая преступность и борьба с собирательством (FinCEN).</>,
                                        <>Однако регулирование криптовалют разнообразно в зависимости от того, являются ли они ценными бумагами, сырьем или валютой.</>
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Япония</span> является одной из наиболее криптодружелюбных стран, которая создала специальную систему лицензирования для криптовалютных бирж и обеспечивает правовую защиту потребителей.</>,
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Китай</span> ранее был одной из ведущих стран по добыче и использованию криптовалют, но правительство ввело жесткие ограничения на использование и добычу криптовалют из-за беспокойства по поводу финансовой стабильности.</>,
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">В Казахстане</span> криптовалюты также получили внимание со стороны правительства.</>,
                                        <>В 2020 году был принят закон «О внесении изменений и дополнений в некоторые законодательные акты Республики Казахстан по вопросам регулирования цифровых активов», который установил правовую основу для использования технологии блокчейн и криптовалют.</>,
                                        <>Этот закон установил определенные правила для криптовалютных операций и обеспечивает некоторую степень защиты для пользователей.</>
                                    ]}/>
                                </>,
                            ]}

                        />
                    </Reveal>
                    
                    
                    <Sizebox height={100} />
                    <Reveal>
                        <Centered>
                            <RandomH2>
                                КЛАССИФИКАЦИЯ КРИПТОВАЛЮТ В РАЗНЫХ ЮРИСДИКЦИЯХ
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <NotNumberedDots 
                            dotsColor={'black'}
                            list={[
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Валюта:</span> в Италии, Германии, Сальвадоре и в других странах криптовалюты классифицируются как <span className="bold">альтернативные формы валюты</span> или <span className="bold">денежные единицы</span>.</>,
                                        <>Это позволяет им использоваться в качестве средства обмена и платежей.</>
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Товар:</span> в Канаде, Новой Зеландии и Австралии криптовалюты рассматриваются как <span className="bold">товары, подобно золоту</span> или <span className="bold">нефти </span>.</>,
                                        'Это может повлечь налогообложение при продаже или использовании криптовалют.'
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Ценные бумаги:</span> в определенных случаях криптовалюты могут рассматриваться как <span className="bold">ценные бумаги</span>, например, в США, особенно если они представляют <span className="bold">инвестиционные возможности</span>.</>,
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Цифровые активы:</span> этот термин также используется для описания криптовалют и других цифровых форм стоимости.</>,
                                        <>Он охватывает широкий спектр виртуальных активов, включая <span className="bold">криптовалюты</span> и <span className="bold">токены</span>, которые могут обозначать <span className="bold">права, акции</span> или <span className="bold">доступ</span> к определенным ресурсам.</>,
                                    ]}/>
                                </>,
                                <>
                                    <TextWithTitle text={[
                                        <><span className="bold">Прочие:</span> существуют и другие классификации, включая «виртуальные активы», «финансовые инструменты» и другие.</>,
                                    ]}/>
                                </>,
                            ]}

                        />
                    </Reveal>
                    <Sizebox height={60} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <><span className="bold">В Казахстане</span> для криптовалют используется термин <span className="bold">«Цифровой актив»</span>, и криптовалюта <span className="bold">не является платежным средством</span>, но <span className="bold">является имуществом.</span></>,
                                'На территории Казахстана утверждены 2 вида цифровых активов:'
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <div className='two-columns' 
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '50px',
                                padding: '0px 210px'
                            }}
                        >
                            <div style={{
                                    backgroundColor: '#34d3eb',
                                    padding: '20px'
                                }}> 
                                <div 
                                    className="title" 
                                    style={{
                                        fontSize: '1.3rem',
                                        fontWeight: '600',
                                        marginBottom: '20px',
                                        fontFamily: 'Ubuntu',

                                    }}
                                >
                                    обеспеченный цифровой актив
                                </div>
                                <div
                                    style={{
                                        fontSize: '1.2rem',
                                    }}
                                >
                                    цифровой актив, зарегистрированный посредством цифровой платформы по хранению и обмену обеспеченными цифровыми активами, который удостоверяет права на материальные, интеллектуальные услуги и активы, за исключением денег и ценных бумаг;
                                </div>
                            </div>
                            <div 
                                style={{
                                    backgroundColor: '#ebdb34',
                                    padding: '20px'
                                }}
                            >
                                <div 
                                    className="title"
                                    style={{
                                        fontSize: '1.3rem',
                                        fontFamily: 'Ubuntu',
                                        fontWeight: '600',
                                        marginBottom: '20px',

                                    }}
                                >
                                    необеспеченный цифровой актив
                                </div>
                                <ulv
                                    style={{
                                        fontSize: '1.2rem',
                                        gap: '0.5rem',
                                    }}
                                >
                                    цифровой актив, полученный в информационной системе в виде вознаграждения за участие в поддержании консенсуса в блокчейне и не выражающий чьи-либо денежные обязательства, которыми можно торговать в цифровой форме на бирже цифровых активов.
                                </ulv>
                            </div>
                        </div>
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine 
                            header={'РИСКИ И ПРОБЛЕМЫ, СВЯЗАННЫЕ С ОТСУТСТВИЕМ ЕДИНОГО ЮРИДИЧЕСКОГО СТАТУСА:'}
                        />
                    </Reveal>

                    <Sizebox height={40} />

                    <Reveal>
                        <div 
                        style={{
                            padding: '0px 210px'
                        }}
                        >
                            <img src='https://t3.ftcdn.net/jpg/04/55/01/76/360_F_455017644_Ro7CZfHj3vSU7sMqQRAqsVN8p3dCpjIW.jpg' />
                        </div> 
                    </Reveal>


                    <Sizebox height={60} />
                    <Reveal>
                        <NumberedDots 
                            dotsColor={'white'}
                            header={<><span className="bold">Отсутствие единого юридического статуса криптовалют</span> создает ряд <span className="red">рисков и проблем:</span></>}
                            list={[
                                <><span className="bold">Правовая неопределенность:</span> отсутствие четких и ясных норм и правил может привести к правовой неопределенности, что затрудняет понимание и соблюдение правил.</>,
                                <><span className="bold">Несогласованность:</span> разные юрисдикции могут иметь различные определения и правила для криптовалют, что затрудняет международную деятельность и сотрудничество.</>,
                                <><span className="bold">Уязвимость к мошенничеству:</span> отсутствие единого регулирования может способствовать появлению мошеннических схем и нечестных действий.</>,
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />

                    <ImageLine 
                        notCrop={true}
                        img={'https://www.sygna.io/wp-content/uploads/2019/11/Graphic_Nov.20_twitter-1-scaled.png'}
                    />

                    <Reveal>
                        <HeaderWithLine 
                            header={'РОЛЬ ФАТФ ПРИ РАБОТЕ С ВИРТУАЛЬНЫМИ АКТИВАМИ'}
                        />
                    </Reveal>
                    <Sizebox height={60} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'Группа разработки финансовых мер борьбы с отмыванием денег (ФАТФ) – это межправительственная организация, занимающаяся разработкой мировых стандартов в области борьбы с отмыванием денег и финансированием терроризма.',
                                'Целью ФАТФ является создание эффективных мер и рекомендаций, способствующих противостоянию финансовым преступлениям, а также обеспечение соответствия национальных систем противодействия отмыванию денег и финансированию терроризма (ПОД/ФТ) установленным стандартам.',
                                '40 Рекомендаций ФАТФ: Руководство по противодействию отмыванию денег и финансированию терроризма.',
                                'Основным инструментом ФАТФ являются 40 рекомендаций, охватывающих множество аспектов ПОД/ФТ и регулирования финансовых операций. Эти рекомендации регулярно пересматриваются и обновляются, а в 2021 году были дополнены изменениями, направленными на регулирование финансовой деятельности, связанной с виртуальными активами.'
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={60} />
                    <Reveal>
                        <TextWithTitle 
                            title={'Виртуальные активы и роль ФАТФ'}
                            text={[
                                'Понятие виртуальных активов становится всё более актуальным в современной финансовой панораме. ФАТФ приняла решение включить виртуальные активы в область своих рекомендаций, чтобы гарантировать безопасность и соблюдение стандартов в этой сфере.',
                                'Для этого были внесены изменения в Рекомендацию 15 «Новые технологий», обязывающие провайдеров услуг виртуальных активов подвергаться регулированию, лицензированию или регистрации, а также реализовывать эффективные системы контроля и надзора.',
                                'Провайдеры услуг виртуальных активов (ПУВА) играют важную роль в современной финансовой среде, предоставляя доступ к виртуальным активам, таким как криптовалюты и токены. С их появлением возникла необходимость в установлении регулирования, способного обеспечить безопасность и соблюдение стандартов в этой новой сфере финансовых операций.',
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={60} />
                    <Reveal>
                        <TextAndLink 
                            text={'Группа разработки финансовых мер борьбы с отмыванием денег (ФАТФ)'}
                            link={'https://ru.wikipedia.org/wiki/%D0%93%D1%80%D1%83%D0%BF%D0%BF%D0%B0_%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8_%D1%84%D0%B8%D0%BD%D0%B0%D0%BD%D1%81%D0%BE%D0%B2%D1%8B%D1%85_%D0%BC%D0%B5%D1%80_%D0%B1%D0%BE%D1%80%D1%8C%D0%B1%D1%8B_%D1%81_%D0%BE%D1%82%D0%BC%D1%8B%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%D0%BC_%D0%B4%D0%B5%D0%BD%D0%B5%D0%B3'}
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextAndLink 
                            text={'40 рекомендаций ФАТФ'}
                            link={'https://www.fatf-gafi.org/content/dam/fatf-gafi/translations/Recommendations/FATF-40-Rec-2012-Russian.pdf.coredownload.inline.pdf'}
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine 
                            header={'KYC и AML: ОСНОВОПОЛАГАЮЩИЕ ПРИНЦИПЫ РЕГУЛИРОВАНИЯ'}
                        />
                    </Reveal>
                    <Sizebox height={60} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                <><span className="bold">Принципы идентификации клиентов</span> (KYC) и <span className="bold">мониторинга операций</span> (AML) остаются ключевыми в регулировании финансовых операций, включая виртуальные активы.</>,
                                <><span className="bold">KYC</span> обеспечивает безопасность финансовых операций и предотвращает отмывание денег и финансирование терроризма.</>,
                                <><span className="bold">AML</span> направлен на систематическое отслеживание и анализ финансовых операций для выявления незаконной деятельности.</>,
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={60} />

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                Обязательная отчетность и управление рисками
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'Обязательная отчетность в области виртуальных активов является инструментом для обеспечения прозрачности и контроля.',
                                'Она позволяет регуляторам эффективно противостоять незаконным действиям.',
                                'Управление рисками в сфере виртуальных активов позволяет выявить и снизить потенциальные угрозы, способствуя стабильности и безопасности операций.'
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={60} />

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                Баланс между регулированием и инновациями
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'ФАТФ стремится обеспечить баланс между предотвращением незаконной деятельности и поддержанием инноваций в области криптовалют и виртуальных активов.',
                                'Регулирование направлено не только на обеспечение безопасности, но и на поддержание развития новых технологий и финансовых инструментов.',
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={60} />

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                Заключение
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'Роль ФАТФ в борьбе с отмыванием денег и финансированием терроризма становится особенно актуальной в контексте роста виртуальных активов.',
                                'Принятие Рекомендаций и стандартов ФАТФ позволяет обеспечить безопасность, прозрачность и соблюдение стандартов в области финансовых операций с виртуальными активами, способствуя развитию инноваций в сфере криптовалют.',
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            <>
                            Завершение первого модуля
                            </>
                        </HeaderWithLine>
                    </Reveal>
    
                    <Sizebox height={50}/>
    
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
            case 5: 
                return (<LessonPage name={'Применение криптовалют в преступной деятельности'}>
                    <Sizebox height={28} />

                    <Reveal>
                        <ImageLine 
                            img={'https://www.chainalysis.com/wp-content/uploads/2022/08/chainalysis-social-share.png'}
                        />
                    </Reveal>
                    <Sizebox height={30} />
                    <Reveal>
                        <RandomParapraph>
                            Рынок криптовалюты растёт быстрее, чем когда-либо прежде. Только в 2021 году общий объём транзакций составил 15,8 трлн долларов против 2,3 трлн годом ранее. Такие данные приводят аналитики блокчейн-платформы <span className="bold">Chainalysis</span> в ежегодном исследовании. Но вместе с ростом сферы активизировались и мошенники, которые успели присвоить себе рекордные суммы.
                        </RandomParapraph>
                    </Reveal>

                    <Sizebox height={50} />

                    <Reveal>
                        <TwoColumnsDivider 
                            left={
                                <RandomParapraph>Объём криптовалютных преступлений в 2021 году вырос на 79%. Злоумышленники получили рекордную сумму в 14 млрд долларов (против 7,8 млрд в 2020-м). К концу года они держали на своих криптокошельках более 10 млрд долларов. Правда, изначально капитал был меньше, но он увеличивался из-за повышения цен на криптоактивы.</RandomParapraph>
                            }
                            right={
                                <img src={crypto21} />
                            }
                        />
                    </Reveal>
                    <Sizebox height={100} />

                    <Reveal>
                        <HeaderWithLine 
                            headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            header={'КАК КРИПТОВАЛЮТЫ ИСПОЛЬЗУЮТСЯ В НЕЗАКОННОЙ ДЕЯТЕЛЬНОСТИ:'}
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <NumberedDots 
                            dotsColor={'white'}
                            list={[
                                <><span className="bold">Отмывание денег и легализация преступных доходов:</span> Криптовалюты предоставляют анонимную и глобальную среду для перемещения и перевода денег. Преступники могут использовать криптовалюты для сокрытия происхождения незаконных доходов, смешивая их с легальными транзакциями. </>,
                                <><span className="bold">Мошенничество:</span> Преступники могут создавать фальшивые криптовалютные проекты, обещающие высокие доходы, и привлекать инвесторов. Затем они исчезают, унося с собой инвестированные средства. </>,
                                <><span className="bold">Киберпреступность:</span> Киберпреступники могут требовать выкуп в криптовалюте после блокировки данных жертвы с помощью вредоносного программного обеспечения. Они также могут использовать криптовалюты для продажи украденных данных или доступа к учетным записям. </>,
                                <><span className="bold">Торговля незаконными товарами:</span> Темная сеть (Darknet) предоставляет платформу для продажи незаконных товаров и услуг за криптовалюты. Это может включать наркотики, оружие, украденные данные и другие запрещенные материалы</>,
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine 
                            headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            header={'ПРИМЕРЫ ПРЕСТУПЛЕНИЙ С ИСПОЛЬЗОВАНИЕМ КРИПТОВАЛЮТЫ'}
                        />
                    </Reveal>

                    <Sizebox height={50} />
                    <Reveal>
                        <RandomH2>
                            Продажа товаров на даркнет маркетплейсах
                        </RandomH2>
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <TwoColumnsDivider 
                            left={
                                <div>
                                    <img src={crypto22} style={{width: 'auto'}}/>
                                    <img src={crypto23} />
                                </div>
                            }
                            right={
                                <img src={crypto24} />
                            }
                        />
                    </Reveal>

                    <Sizebox height={50} />
                    <Reveal>
                        <RandomH2>
                            Продажа товаров в Telegram каналах
                        </RandomH2>
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <RandomParapraph>
                            Набирает обороты продажа наркотиков за криптовалюту
                        </RandomParapraph>
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <TwoColumnsDivider 
                            left={
                                <img src={telegramSell1} />
                            }
                            right={
                                <img src={telegramSell2} />
                            }
                        />
                    </Reveal>

                    <Sizebox height={50} />
                    <Reveal>
                        <RandomH2>
                            Мошеннические ICO, инвестиции
                        </RandomH2>
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <TwoColumnsDivider 
                            left={
                                <img src={'https://stcdn.business-online.ru/v2/20-12-07/40936/finiko.jpg'} />
                            }
                            right={
                                <img src={'https://bitside.org/wp-content/uploads/2018/07/ico-cover-2.jpg'} />
                            }
                        />
                    </Reveal>

                    <Sizebox height={100} />

                    <Reveal>
                        <HeaderWithLine 
                            headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            header={'Как противодействовать рискам?'}
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <Image src={crypto25} />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            Перейдем к следующему блоку обучения
                        </HeaderWithLine>
                    </Reveal>
    
                    <Sizebox height={50}/>
    
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
            case 6: 
                return (<LessonPage name={'Отслеживание криптовалютных транзакций'}>
                    <Sizebox height={28} />

                    <Reveal>
                        <ImageLine 
                            img={'https://rsv.ru/blog/wp-content/uploads/2020/11/rabota-za-kompyuterom-918x516.jpg'}
                        />
                    </Reveal>

                    <Reveal>
                        <TextWithBackground
                            backgroundColor={'black'} 
                            color={'white'}
                            text={[
                                'Криптовалютные транзакции представляют собой записи о перемещении криптовалюты между адресами в блокчейне. Каждая транзакция содержит информацию об отправителе, получателе, сумме и других деталях. Отслеживание криптовалютных транзакций - это процесс анализа и следования за перемещением средств между адресами в блокчейне. Это важный инструмент для идентификации потенциальных мошенников, отмывания денег и других незаконных операций.',
                                'Управление КРИПТОН АФМ РК имеет доступ к действенным и современным инструментам, предназначенных для отслеживания криптовалют добытых преступным путем. В управлении работают квалифицированные сотрудники, имеющие навыки проведения блокчейн-аналитики, деанонимизации и проведения собственных исследований, имеющих значения для полноценного расследования уголовных дел. '
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={50} />
                    
                    <Reveal>
                        <TextWithTitle 
                            title={'КАК РАБОТАЮТ КРИПТОВАЛЮТНЫЕ ТРАНЗАКЦИИ И КАК ИХ ОТСЛЕЖИВАТЬ:'}
                            text={[
                                'Криптовалютные транзакции проходят через процесс верификации и добавляются в блокчейн для надежности и невозможности изменения данных. Транзакции создаются отправителем и подписываются его приватным ключом. Затем транзакция транслируется в сеть и подвергается проверке майнерами или участниками сети.',
                                'Для отслеживания транзакций используются общедоступные ресурсы, такие как браузеры блокчейна, которые предоставляют информацию о транзакциях, адресах и балансах. Большинство криптовалют имеют публичные блокчейны, где можно видеть все транзакции.',
                                'Профильным Управлением КРИПТОН в целях обнаружения преступных активов проводится подробный анализ перемещения цифровых средств по цепочке транзакций, начиная с адреса отправителя и до адреса получателя. '
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={50} />
                    
                    <Reveal>
                        <TextWithTitle 
                            color={'#186287'}
                            title={'ИНСТРУМЕНТЫ И МЕТОДЫ АНАЛИЗА БЛОКЧЕЙН-ТРАНЗАКЦИЙ:'}
                            text={[
                                'Существует несколько инструментов и методов анализа блокчейн-транзакций:',
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <TwoColumnsDivider 
                            gap={50}
                            right={
                                <TextWithTitle 
                                    color={'#186287'}
                                    text={[
                                        <>
                                            <span className="bold">Браузеры блокчейна:</span> Это онлайн-инструменты, которые позволяют просматривать транзакции, адреса и блоки в блокчейне. Например, для Bitcoin это может быть Blockchain.info.
                                        </>,
                                        <>
                                            <span className="bold">Кластерный анализ:</span> Этот метод объединяет связанные адреса и транзакции, что помогает выявить связи между разными аккаунтами.
                                        </>,
                                        <>
                                            <span className="bold">Кластеризация по объемам:</span> Анализ крупных сумм криптовалюты, перемещаемых одновременно, может указывать на действия инвесторов или трейдеров.
                                        </>,
                                    ]}
                                />
                            }
                            left={
                                <TextWithTitle 
                                    color={'#186287'}
                                    text={[
                                        <>
                                            <span className="bold">Аналитические платформы:</span> Специализированные платформы, такие как Chainalysis или Crystal, предоставляют расширенные аналитические возможности для отслеживания транзакций и выявления необычных шаблонов.

                                        </>,
                                        <>
                                            <span className="bold">Анализ времени:</span> Изучение временных интервалов между транзакциями может помочь идентифицировать определенные шаблоны поведения.
                                        </>,
                                    ]}
                                />
                            }
                        />
                    </Reveal>

                    <Sizebox height={80} />

                    <Reveal>
                        <HeaderWithLine 
                            headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            header={'3 ПРИНЦИПА БЛОКЧЕЙНА'}
                        />
                    </Reveal>
                    <Sizebox height={50} />
                    <Reveal>
                        <NumberedDots
                            gap={50} 
                            dotsColor={'white'}
                            list={[
                                <TextWithTitle 
                                    title={'Блокчейн публичный'}
                                    text={'Все транзакции находятся в блокчейне, их может увидеть любой желающий'}
                                />,
                                <TextWithTitle 
                                    title={'Владелец приватного ключа-владелец кошелька'}
                                    text={'Все транзакции криптокошелька происходят после подписания приватным ключем. Имея приватный ключ, можно производить операции со средствами. Приватный ключ невозможно изменить, восстановить.'}
                                />,
                                <TextWithTitle 
                                    title={'Нам нужны шлюзы'}
                                    text={'Блокчейн прозрачен, но содержит только адреса, то есть только числа и буквы. Чтобы связать их с реальным миром, нам нужна информация от шлюзов - тех, кто обменивает криптовалюту на реальные (фиатные) деньги и наоборот. Итак, нам нужно отследить реализацию и/или приобретение'}
                                />,
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={80} />
                    <Reveal>
                        <HeaderWithLine 
                            headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            header={'СВОЙСТВА ТРАНЗАКЦИИ'}
                        />
                    </Reveal>
                    <Sizebox height={50} />
                    <Reveal>
                        <NotNumberedDots
                            gap={50} 
                            dotsColor={'black'}
                            list={[
                                'Комиссия списывается немедленно',
                                'У транзакции может быть сдача',
                                'У одной транзакции могут быть много входящих и исходящих транзакций'
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={80} />
                    <Reveal>
                        <HeaderWithLine 
                            headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            header={'ПОТОКИ КРИПТОВАЛЮТНЫХ ТРАНЗАКЦИЙ'}
                        />
                    </Reveal>
                    <Sizebox height={50} />
                    <Reveal>
                        <TwoColumnsDivider 
                            left={<>
                                <Centered>
                                    <RandomH2>
                                        Прямые
                                    </RandomH2>
                                </Centered>
                                <Sizebox height={10} />
                                <Image src={crypto26} />
                            </>}
                            right={<>
                                <Centered>
                                    <RandomH2>
                                        Не прямые
                                    </RandomH2>
                                </Centered>
                                <Sizebox height={10} />
                                <Image src={crypto27} />
                            </>}
                        />
                    </Reveal>

                    <Sizebox height={80} />
                    <Reveal>
                        <HeaderWithLine 
                            headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            header={'Алгоритм отслеживания'}
                        />
                    </Reveal>
                    <Sizebox height={50} />
                    <Reveal>
                        <FancyList 
                            listColor='#ccc'
                            list={[
                                'Записи всех транзакции хранятся на специальных блокчейн серверах - нодах',
                                'Главная цель во время отслеживания - найти входную и выходную точку (шлюзы)',
                                'Криптовалюту обычно обналичивают используя криптообменники и криптобиржи',
                                'Для этого нужны специальные инстрмуенты блокчейн-аналитики, а так же обученные сотрудники'
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={80} />
                    <Reveal>
                        <HeaderWithLine 
                            headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            header={'Рассмотрим пример'}
                        />
                    </Reveal>
                    <Sizebox height={50} />
                    <Reveal>
                        <TextWithTitle 
                            title={'Дело о создании финансовой пирамиды'}
                            text={[
                                'Предыстория: Гражданин К., узнав о возможности приумножить свой капитал за счёт покупки новой, недавно разработанной криптовалюты связался с менеджером "инвестиционной компании". Менеджер сообщил, что новая криптовалюта покупается через перевод USDT на определенный криптокошелек. После этого создается личный кабинет в "инвестиционной компании". Информация о личном кабинете и имеющегося капитала в дальнейшем сообщалось через менеджера. Через некоторое время, менеджер перестал выходить на связь, что встревожило гражданина К. Вскоре гражданин К. обратился в Агентство по финансовому мониторингу.',
                                'Вводные данные:'
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <NotNumberedDots
                            dotsColor={'black'}
                            list={[
                                <>Криптокошелёк, куда был осуществлен перевод: <span className="bold">0xdc3b89536911150ece5e2cdb3fe312a182cc8b4e</span></>,
                                'Перевод был выполнен посредством криптовалютной биржи Binance.',
                                'Количество выполненных переводов из биржи: 2',
                                'Даты переводов: 10.05.2023 и 11.05.2023',
                                <>Общая сумма перевода: <span className="bold">69 416 USDT</span> и <span className="bold">69 456 USDT</span>.</>
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <RandomParapraph>
                        Для анализа примера используется инструмент блокчейн-аналитики <span className="bold">Crystal</span>.
                        </RandomParapraph>
                    </Reveal>

                    <Sizebox height={50} />
                    <Reveal>
                        <RandomH2>
                            Шаг №1
                        </RandomH2>
                        <Sizebox height={20} />
                        <RandomParapraph>
                            В поле поиска вводим адреc из вводных данных, то есть адрес получателя криптоактивов. Инструмент перенаправляет нас на страницу с общей информацией о криптокошельке. В этой странице нажимаем кнопку Visualization, которая открывает возможность просмотра взаимодействия криптокошелька в сети блокчейн
                        </RandomParapraph>
                        <Sizebox height={20} />
                        <Image src={crypto28}/>
                    </Reveal>

                    <Sizebox height={50} />
                    <Reveal>
                        <RandomH2>
                            Шаг №2
                        </RandomH2>
                        <Sizebox height={20} />
                        <RandomParapraph>
                        На данном этапе мы видим криптокошелёк в центре рабочей среды, информацию о транзакциях в правой боковой панели. Наша задача, раскрыть все связи с другими криптокошельками.
                        </RandomParapraph>
                        <Sizebox height={20} />
                        <Image src={crypto29}/>
                    </Reveal>

                    <Sizebox height={50} />
                    <Reveal>
                        <RandomH2>
                            Шаг №3
                        </RandomH2>
                        <Sizebox height={20} />
                        <RandomParapraph>
                        Здесь мы видим, как и описывалось в вводных данных поступление средств двумя траншами, далее появилась информация, что средства с кошелька фигуранта в тот же день были переведены на другие кошельки. Нужно дальше раскрыть связи кошельков.
                        </RandomParapraph>
                        <Sizebox height={20} />
                        <Image src={crypto210}/>
                    </Reveal>

                    <Sizebox height={50} />
                    <Reveal>
                        <RandomH2>
                            Шаг №4
                        </RandomH2>
                        <Sizebox height={20} />
                        <RandomParapraph>
                        Раскрыв движение криптоактивов с кошелька выше, мы видим, что средства были разделены на 7 частей и отправлены на один кошелек тем же днём. Такие действия делаются для того, чтобы запутать следы внутри самой сети блокчейн. Люди, имеющие понимание и инструменты аналитики могут увидеть перемещение средств без сложностей. В конце, все средства поступают на "шлюз" Binance. Делаем те же шаги с кошельком ниже.
                        </RandomParapraph>
                        <Sizebox height={20} />
                        <Image src={crypto211}/>
                    </Reveal>

                    <Sizebox height={50} />
                    <Reveal>
                        <RandomH2>
                            Шаг №5
                        </RandomH2>
                        <Sizebox height={20} />
                        <RandomParapraph>
                            По итогу, раскрыв все связи, мы видим, что все средства поступили на криптобиржу Binance.
                        </RandomParapraph>
                        <Sizebox height={20} />
                        <Image src={crypto212}/>
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <ImageWithText 
                            color={'white'}
                            img={'https://www.fairobserver.com/wp-content/uploads/2023/02/cryptocurrencies.jpg'}
                            imageText={'КАК ИДЕНТИФИЦИРОВАТЬ ВЛАДЕЛЬЦЕВ КОШЕЛЬКОВ?'}
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <RandomParapraph>
                            Идентификация владельцев кошельков в блокчейне является сложной задачей из-за анонимности и псевдонимов, используемых в криптовалютных транзакциях. Однако есть несколько методов для попытки идентификации:
                        </RandomParapraph>
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <NumberedDots 
                            dotsColor={'white'}
                            list={[
                                <><span className="bold">Ассоциация с реальными данными:</span> Если пользователь связал свой кошелек с реальным именем или адресом электронной почты при регистрации на бирже или сервисе, это может быть использовано для идентификации</>,
                                <><span className="bold">Публичные заявления:</span> Владельцы криптовалютных кошельков могут делать публичные заявления о своих адресах, например, через социальные сети или блоги</>,
                                <><span className="bold">Ассоциация с другими активами:</span>  Если владелец кошелька совершает транзакции, связанные с покупкой товаров или услуг, это может помочь идентифицировать его.</>,
                                <><span className="bold">Паттерны поведения:</span> Анализ паттернов и временных интервалов транзакций может помочь выявить уникальные особенности в поведении владельцев кошельков.</>,
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'Для идентификации криптокошелька Управлением КРИПТОН проводится всесторонний анализ входящих и исходящих транзакций, при котором устанавливаются связи с другими кошельками и участниками сети, а также связи с уже известными адресами кошельков. ',
                                'Кроме того, широко используются данные, полученные в ходе изучения открытых данных, благодаря которым можно установить: использовал ли владелец свой адрес в публичных источниках, таких как форумы, социальные сети или другие интернет-ресурсы. Также, одним из действенных методов является взаимодействие с криптобиржами, в которых запрашивается информация о владельце и обо всех его транзакциях. '
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            Самостоятельная работа
                        </HeaderWithLine>
                        <Sizebox height={20} />
                        <TextWithTitle 
                            text={[
                                'Сделайте анализ криптокошелька и его транзакций. Определите шлюзы:',
                                <><span className="bold">bc1q6es8zjmk47n0wlw7u9k99z4dl8m7w64h92ev3c</span></>
                            ]}
                        />
                    </Reveal>
    
                    <Sizebox height={50}/>
    
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
            case 7: 
                return (<LessonPage name={'Конфискация и изъятие криптовалют'}>
                    <Sizebox height={28} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'Конфискация и изъятие криптовалют становятся все более актуальными вопросами в контексте оперативно-следственной работы правоохранительных органов. Криптовалюты предоставляют новые вызовы, связанные с технической сложностью, анонимностью и глобальностью операций.',
                                'При этом важно понимать, что для правильного и надлежащего изъятия криптовалют, одним из важнейших факторов является присутствие сотрудника Управления КРИПТОН, который обладает необходимыми техническими знаниями и навыками. ',
                                <span className="bold">В этой связи, в АФМ создан специализированный кошелек (криптосчет) для хранения преступных цифровых активов до окончательного процессуального решения по уголовному делу либо иного счета с обеспечением гарантийного хранения.</span>,
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={50} />
                    <Reveal>
                        <NumberedDots 
                            header={'Как правильно провести изъятие криптовалют в рамках расследования:'}
                            dotsColor={'white'}
                            list={[
                                'Идентификация активов: Сначала необходимо идентифицировать активы, которые требуется изъять. Это может потребовать анализа блокчейн-транзакций и выявления связанных адресов.',
                                'Сбор доказательств: Важно собрать доказательства, связанные с преступной деятельностью, которые могут быть использованы в суде. Это - данные о транзакциях, связанные документы и другие сведения',
                                'Судебное решение: Для проведения изъятия криптовалют обычно требуется судебное решение. Суд может выдать санкцию на изъятие, указав, какие активы следует конфисковать',
                                'Сотрудничество с биржами: Если активы находятся на биржах, правоохранительные органы могут запросить сотрудничество с биржей для блокировки аккаунта и предотвращения дальнейших операций',
                                'Техническая сложность: Перед проведением изъятия необходимо понять технические аспекты работы с криптовалютами. Это может включать в себя работу с приватными ключами, перевод средств и другие операции',
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={50} />
                    <Reveal>
                        <NumberedDots 
                            header={'Юридические аспекты конфискации криптовалют:'}
                            dotsColor={'white'}
                            list={[
                                'Определение собственности: В некоторых юрисдикциях вопрос о том, являются ли криптовалюты собственностью, может быть сложным. Необходимо иметь четкое определение этого понятия для применения конфискации. ',
                                'Соблюдение законодательства: Конфискация криптовалют должна осуществляться в соответствии с законодательством, предусмотренным в соответствующей юрисдикции',
                                'Прозрачность: Важно, чтобы процесс конфискации был прозрачным и документированным, чтобы избежать возможных обвинений в неправомерных действиях. ',
                                'Сохранность средств: После конфискации криптовалюты должны быть сохранены в безопасности и не подвергаться риску кражи или утери.',
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            ПРЕОБРАЗОВАНИЕ КРИПТОВАЛЮТ В ФИАТНЫЕ ДЕНЬГИ
                        </HeaderWithLine>
                    </Reveal>
                    <Sizebox height={80} />

                    <Reveal>
                        <TextAndLink 
                            text='Что такое Фиатные деньги'
                            link={'https://www.banki.ru/wikibank/fiatnyie_dengi/'}
                        />
                    </Reveal>

                    <Sizebox height={80} />
                    <Reveal>
                        <Report_Warning>
                            Преобразование криптовалют в фиатные деньги - это процесс, который позволяет перевести криптовалюты в традиционные деньги, такие как доллары, евро и другие национальные валюты
                        </Report_Warning>
                    </Reveal>
                    <Sizebox height={40} />

                    <Reveal>
                        <NumberedDots 
                            header={'Этот процесс может быть сложным из-за технических, юридических и финансовых аспектов. '}
                            dotsColor={'white'}
                            list={[
                                'Криптовалютные биржи: Одним из способов преобразования криптовалют в фиатные деньги является использование криптовалютных бирж. На биржах можно продать криптовалюту и получить за нее фиатные деньги',
                                'ОТС-сделки: Оффшорные торговые платформы и частные сделки могут предоставить возможность преобразования больших сумм криптовалюты в фиатные деньги без необходимости продажи на публичных биржах',
                                'Платежные системы: Некоторые платежные системы позволяют покупать товары и услуги, используя криптовалюту, при этом мгновенно преобразовывать ее в фиатные деньги для продавца',
                                'Платежные карты: На рынке существуют криптовалютные платежные карты, которые позволяют использовать криптовалюту для оплаты, а она автоматически конвертируется в фиатные деньги. ',
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <TextWithTitle 
                            title={'SWOT Анализ:'}
                            text={[
                                'S: Основной положительной стороной при преобразовании криптовалют в фиат, является то что, фиатные валюты менее волатильны, чем криптовалюты, что делает их более привлекательным выбором для долгосрочного хранения средств, а слабой стороной является время обработки затрачиваемое на проведение обмена, а также комиссии и сборы за проведенную операцию',
                                'W: Главной угрозой при конвертации валюты с одного состояния на другое является высокая волотильность криптовалюты, что может привести как и к обогащению, так и к потере финансовых средств.',
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            title={'Юридические и налоговые аспекты:'}
                            text={'Преобразование криптовалют в фиатные деньги может быть связано с юридическими и налоговыми обязательствами:'}
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <NumberedDots 
                            dotsColor={'white'}
                            list={[
                                'Обязательное декларирование: В некоторых юрисдикциях требуется декларировать операции с криптовалютами и выплачивать налоги с полученных средств.',
                                'Конформность бирж: При использовании криптовалютных бирж для обмена на фиатные деньги, пользователи могут столкнуться с требованиями к личной идентификации и соблюдением антиотмывочных (AML) и к нелегальной торговле (KYC) политик',
                                '.Специфические правила: Различные юрисдикции имеют различные правила и налоговые ставки для операций с криптовалютами, поэтому важно ознакомиться с конкретными требованиями в вашей стране',
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            Перейдем к следующему блоку обучения
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
                return (<LessonPage name={'Сотрудничество с криптовалютными платформами'}>
                    <Sizebox height={28} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'Сотрудничество с криптовалютными платформами является неотъемлемой частью расследований, связанных с криптовалютами. Криптобиржи и другие криптовалютные сервисы могут предоставить важную информацию о транзакциях, аккаунтах и пользователях, что существенно облегчает процесс выявления незаконной деятельности и раскрытия преступлений',
                                'Агентством РК по финансовому мониторингу в целях безопасного развития рынка цифровых активов в стране заключен меморандум с международными криптобиржами:'
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <NotNumberedDots 
                            dotsColor={'black'}
                            list={[
                                <>
                                    <RandomH2>Bybit</RandomH2>
                                    <Sizebox height={10}/>
                                    <Image 
                                        src={'https://fh-static.bycsi.com/images/home/official-image.png'}
                                        style={{width: '500px'}}
                                    />
                                </>,
                                <>
                                    <RandomH2>Binance</RandomH2>
                                    <Sizebox height={10}/>
                                    <Image 
                                        src={'https://public.bnbstatic.com/image/cms/blog/20230927/061b8876-956c-46ce-8123-643902a04d70.png'}
                                        style={{width: '500px'}}
                                    />
                                </>,
                                <>
                                    <RandomH2>ATAIX</RandomH2>
                                    <Sizebox height={10}/>
                                    <Image 
                                        src={'https://web-api.ataix.com/uploads/media/metadata/0001/02/d2ef0166fb452610291f9cb384b45a53b2ca31f2.jpeg'}
                                        style={{width: '500px'}}
                                    />
                                </>,
                                <>
                                    <RandomH2>INTEBIX</RandomH2>
                                    <Sizebox height={10}/>
                                    <Image 
                                        src={'https://www.tadviser.ru/images/6/6f/Intebix_2022_Logo.png'}
                                        style={{width: 'auto'}}
                                    />
                                </>,
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={20}/>
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'Основной целью подписания меморандума является сотрудничество и взаимоподдержка сторон в сфере оборота крипто активов и обмена информации, по установлению и блокировке цифровых активов, добытых преступным путем, а также предназначенных для легализации (отмыванию) доходов, полученных преступным путем, и финансирования терроризма.',
                                'В соответствии с 15-й рекомендацией ФАТФ, меморандум также подразумевает, что криптобиржи будут обязаны проводить процедуру верификации личности своих пользователей (KYC), а также мониторить транзакции, проводимые через их платформу, для выявления подозрительной или аномальной активности',
                                'Кроме того, криптобиржа должна сотрудничать с Агентством и предоставлять им информацию, необходимую для расследований, связанных с отмыванием денег и финансированием терроризма'
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <RandomH2>
                            Как работать с криптобиржами и другими платформами в рамках расследования:
                        </RandomH2>
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <NumberedDots 
                            dotsColor={'white'}
                            list={[
                                <>
                                    <span className="bold">Планирование и подготовка:</span> Перед началом сотрудничества с криптовалютными платформами необходимо тщательно спланировать расследование. Определите, какие данные и информацию вы хотите получить, и какие законодательные положения применяются.
                                </>,
                                <>
                                    <span className="bold">Законодательный фреймворк:</span> Познакомьтесь с законодательством вашей страны и страны, в которой находится платформа. Это поможет вам понять, какие права и обязанности у вас и платформы в рамках запроса на данные.
                                </>,
                                <>
                                    <span className="bold">Соблюдение антиотмывочных (AML) и политик по знанию своего клиента (KYC):</span> Многие платформы криптовалют следуют политикам, направленным на предотвращение отмывания денег и выявление незаконных операций. Обратите внимание, что при этом может потребоваться предоставление персональных данных пользователей.
                                </>,
                            ]}
                        />
                    </Reveal>
                    
                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            Запросы на предоставление данных от криптовалютных сервисов
                        </HeaderWithLine>
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextAndLink 
                            text={'Ссылка на Регламент'}
                            link={'https://www.gov.kz/memleket/entities/afm/press/news/details/434468?lang=ru&ysclid=lpqezvo4vo355492236'}
                        />
                    </Reveal>
                    <Sizebox height={40} />
                    <Reveal>
                        <RandomParapraph>
                            Агентством разработан Регламент взаимодействия с криптобиржами, согласно которому офицерами связи являются сотрудники Управления КРИПТОН. При направлении запросов необходимо учитывать:
                        </RandomParapraph>
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <NotNumberedDots 
                            dotsColor={'black'}
                            list={[
                                <>
                                    <span className="bold">Формат запросов:</span> Все запросы, направляемые в адрес криптобиржи, должны составляться в письменной форме на официальном бланке АФМ.
                                </>,
                                <>
                                    <span className="bold">Обязательная информация в запросах:</span> ФИО (если есть) и контактные данные исполнителя запроса, все известные сведения о лице, основание запроса (транзакция, адрес кошелька или номер банковского счета) и другие соответствующие детали.
                                </>,
                                <>
                                    <span className="bold">Приложения к запросам:</span> К запросу прилагается электронная копия официального запроса. Если имеются, к запросам также прилагаются санкционированные постановления или решения суда.
                                </>,
                                <>
                                    <span className="bold">Направление запросов:</span> Запросы от структурных подразделений и территориальных органов АФМ направляются в адрес Управление КРИПТОН c сохранением режима конфиденциальности и обязательным уведомлением ответственного в лица.
                                </>,
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={50} />
                    <Reveal>
                        <RandomParapraph>
                            После рассмотрения запроса, криптобиржа предоставляет следующие сведения: 
                        </RandomParapraph>
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <NotNumberedDots 
                            dotsColor={'black'}
                            list={[
                                'информация о владельце учетной записи;', 'история депонирования и выводов цифровых активов;', 'депозитные адреса, торговая история, IP-адреса;', 'информация об устройстве;', 'ФИО (при наличии), контактные данные, фотографии;', 'документы, которые были использованы при регистрации и документы надлежащей проверки клиентов.'
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={80} />

                    <Reveal>
                        <NumberedDots 
                            header={'Международное сотрудничество в расследованиях, связанных с криптовалютами:'}
                            dotsColor={'white'}
                            list={[
                                <>
                                    <span className="bold">Обмен информацией:</span> В случае, если расследование пересекает границы, сотрудничество с криптовалютными платформами и другими странами может понадобиться для обмена информацией о пользователях и транзакциях.
                                </>,
                                <>
                                    <RandomParapraph>
                                        <span className="bold">Международные организации:</span> Существуют международные организации, такие как INTERPOL и FATF, которые работают над сотрудничеством в борьбе с криптовалютными преступлениями. Они разрабатывают стандарты и рекомендации для международного сотрудничества. 
                                    </RandomParapraph>
                                    <Sizebox height={10} />
                                    <TwoColumnsDivider 
                                        left={
                                            <Image src={'https://uvelir.info/media/digest/photos/fatf.jpg'} />
                                        }
                                        right={
                                            <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2YwTQEo-sg3BHqjP53R_c0e4lipzz0IOnVA&usqp=CAU'} />
                                        }
                                    />
                                </>,
                                <>
                                    <span className="bold">Двусторонние договоренности:</span> Некоторые страны могут иметь двусторонние договоренности о сотрудничестве в сфере правопорядка. Это может упростить процесс обмена информацией.
                                </>
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <RandomParapraph>
                            В настоящее время АФМ поддерживает тесные взаимоотношения с мировыми организациями, такими как ООН, Интерпол, ФАТФ, ЕАГ и др. 
                        </RandomParapraph>
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            Завершение второго модуля
                        </HeaderWithLine>
                    </Reveal>
    
                    <Sizebox height={50}/>
    
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
            case 9: 
                return (<LessonPage name={'Кейсы'}>
                    <Sizebox height={28} />
                    <Reveal>
                        <HeaderWithLine 
                            headerColor={'#3A3939'} lineColor={'#CADEFC'}
                            header={'Рассмотрение реальных примеров расследований с использованием криптовалют'}
                        />
                    </Reveal>

                    <Sizebox height={40} />
                    <Reveal>
                        <RandomParapraph>
                            Данный раздел представляет собой подборку реальных случаев расследований, в которых криптовалюты играли ключевую роль. Кейсы рассматриваются с позиции анализа использования криптовалют в криминальной деятельности, методов расследования и опыта правоохранительных органов.
                        </RandomParapraph>
                    </Reveal>

                    <Sizebox height={80} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            КЕЙС 1: ТОРГОВЛЯ НАРКОТИКАМИ ЧЕРЕЗ ТОРГОВУЮ ПЛОЩАДКУ SILK ROAD
                        </HeaderWithLine>
                    </Reveal>
                    <Sizebox height={40} />
                    <Centered>
                        <Image 
                            src={'https://syntheticdrugs.unodc.org/uploads/syntheticdrugs/res/cybercrime/onlinetrafficking/index_html/cybercrime_1500x644-RU.jpg'} 
                            style={{width: '500px'}}
                        />
                    </Centered>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithBackground 
                            backgroundColor={'#d91c32'}
                            color={'white'}

                            text={
                                <RandomParapraph
                                    color={'#fff'}
                                >
                                    Рассмотрим более подробно расследование, связанное с Silk Road и арестом Росса Ульбрихта, с акцентом на технические детали:
                                </RandomParapraph>
                            }   
                        />
                    </Reveal>
                    <Reveal>
                        <TextWithBackground 
                            backgroundColor={'#80d2f2'}
                            text={
                                <TwoColumnsDivider 
                                    gap={50}
                                    left={
                                        <NotNumberedDots 
                                            dotsColor={'black'}
                                            list={[
                                                <TextWithTitle 
                                                    text={[
                                                        <><span className="bold">Анализ транзакций Bitcoin:</span> При расследовании Silk Road следователи использовали анализ блокчейна для выявления взаимосвязей между Bitcoinкошельками. Поскольку все транзакции в блокчейне являются публичными, следователи смогли анализировать потоки криптовалюты, чтобы выявить связанные с рынком кошельки. Они обнаружили регулярные транзакции с крупными суммами на личные кошельки, которые, как оказалось, принадлежали Ульбрихту.</>
                                                    ]}
                                                />,
                                                <TextWithTitle 
                                                    text={[
                                                        <><span className="bold">Сопоставление цифровых следов:</span> Следователи обнаружили, что Ульбрихт использовал псевдоним "Dread Pirate Roberts" в различных интернет-форумах и чатах, связанных с Silk Road.</>,
                                                        'Они провели анализ стилометрии, сравнивая тексты, написанные под этим псевдонимом, с текстами, написанными Ульбрихтом под его настоящим именем.  Таким образом, они смогли установить связь между Ульбрихтом и псевдонимом.'
                                                    ]}
                                                />,
                                                <TextWithTitle 
                                                    text={[
                                                        <><span className="bold">Анализ интернет-трафика:</span> ФБР отслеживало интернет-трафик, связанный с серверами Silk Road, и обнаружило, что один из серверов находился в СанФранциско и использовался для управления сайтом. Следователи выяснили, что Ульбрихт имел доступ к этому серверу, и использовали эту информацию для установления его идентичности как оператора Silk Road</>
                                                    ]}
                                                />,
                                            ]}
                                        />
                                    }
                                    right={
                                        <NotNumberedDots 
                                            dotsColor={'black'}
                                            list={[
                                                <TextWithTitle 
                                                    text={[
                                                        <><span className="bold">Онлайн-наблюдение:</span> ФБР провело длительное наблюдение за онлайн-деятельностью Ульбрихта, отслеживая его действия на форумах, в социальных сетях и других платформах. Они также использовали информацию от инсайдеров и информаторов внутри Silk Road, чтобы получить дополнительные доказательства.</>
                                                    ]}
                                                />,
                                                <TextWithTitle 
                                                    text={[
                                                        <><span className="bold">Арест и конфискация:</span> ФБР арестовало Ульбрихта в библиотеке в Сан-Франциско, когда он был в сети под псевдонимом "Dread Pirate Roberts". Во время ареста агенты захватили его открытый ноутбук, на котором находилась вся необходимая информация для доказательства его вины, включая личные ключи для доступа к кошелькам Silk Road. </>,
                                                        'Также были конфискованы около 144 000 BTC, которые находились на кошельках Ульбрихта. ',
                                                        'Эти многочисленные доказательства, собранные с использованием различных технических методов, позволили убедительно доказать вину Ульбрихта в создании и управлении незаконным онлайнрынком Silk Road. ',
                                                    ]}
                                                />,
                                                <TextWithTitle 
                                                    text={[
                                                        <><span className="bold">ВЕРДИКТ:</span> В 2015 году он был приговорен к пожизненному заключению без права на условно-досрочное освобождение.</>
                                                    ]}
                                                />
                                            ]}
                                        />
                                    }
                                />
                            }
                        />
                    </Reveal>

                    <Sizebox height={140} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            КЕЙС 2: РАСПРОСТРАНЕНИЕ ВРЕДОНОСНОГО ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ WANNACRY
                        </HeaderWithLine>
                    </Reveal>
                    <Sizebox height={40} />
                    <Centered>
                        <Image 
                            src={'https://informationage-production.s3.amazonaws.com/uploads/2022/10/wannacry-five-years-on-what-have-we-learned.jpeg'} 
                            style={{width: '500px'}}
                        />
                    </Centered>
                    <Sizebox height={40} />
                    <Reveal>
                        <TwoColumnsDivider 
                            gap={50}
                            left={
                                <NotNumberedDots 
                                    dotsColor={'black'}
                                    list={[
                                        <TextWithTitle 
                                            text={[
                                                <><span className="bold">Применение миксеров:</span> Для усиления анонимности транзакций, злоумышленники могут использовать миксеры криптовалют. Это сервисы, которые смешивают транзакции разных пользователей, чтобы усложнить отслеживание. Миксеры разбивают входящие транзакции на множество меньших транзакций, которые затем пересылаются на разные кошельки, создавая тем самым цепочку транзакций, сложную для анализа.</>
                                            ]}
                                        />,
                                        <TextWithTitle 
                                            text={[
                                                <><span className="bold">Сотрудничество с частными компаниями:</span> В расследовании атаки WannaCry важную роль сыграли частные компании в сфере кибербезопасности. Они помогли в анализе вредоносного кода, а также в отслеживании криптовалютных транзакций. Такое сотрудничество позволило собрать больше данных для расследования и предоставило экспертный взгляд на происходящее.</>,
                                            ]}
                                        />,
                                    ]}
                                />
                            }
                            right={
                                <NotNumberedDots 
                                    dotsColor={'black'}
                                    list={[
                                        <TextWithTitle 
                                            text={[
                                                <><span className="bold">Заключение:</span> Атака WannaCry показала, как киберпреступники могут использовать криптовалюты для анонимного получения выкупов. Она также продемонстрировала, как технология блокчейна может быть использована для отслеживания транзакций и следования за деньгами. Однако, анонимность криптовалюты делает трудным определение личности злоумышленников, что является проблемой для правоохранительных органов. </>,
                                                'Сотрудничество с частными компаниями в сфере кибербезопасности, применение современных методов анализа блокчейна и использование искусственного интеллекта для анализа больших объемов данных могут усилить расследования и помочь в борьбе с киберпреступностью. ',
                                            ]}
                                        />,

                                    ]}
                                />
                            }
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'Для успешного расследования и борьбы с киберпреступностью, правоохранительным органам важно укреплять свои технические навыки, развивать сотрудничество с частными компаниями и международным сообществом, а также разрабатывать новые подходы к расследованиям, учитывающие специфику использования криптовалют. ',
                                'В заключении отмечаем, что киберпреступность и использование криптовалют для анонимных транзакций представляют серьезную угрозу безопасности. Однако совместные усилия правоохранительных органов, частных компаний и международного сообщества могут противостоять этой угрозе и создать более безопасное цифровое пространство для всех. '
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={140} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            КЕЙС 3: ОСУЩЕСТВЛЕНИЕ НЕЗАКОННОЙ ДЕЯТЕЛЬНОСТИ В СФЕРЕ ОБМЕНА КРИПТОВАЛЮТ В КАЗАХСТАНЕ
                        </HeaderWithLine>
                    </Reveal>
                    <Sizebox height={40} />
                    <Centered>
                        <Image 
                            src={'https://bits.media/upload/resize_cache/webp/iblock/ad0/k3imufeh0detqzsqma6lgdgmr20a3uw5/zhitelya_almaty_oshtrafovali_za_nezakonnyy_obmen_kriptovalyut.webp'} 
                            style={{width: '500px'}}
                        />
                    </Centered>
                    <Sizebox height={40} />
                    <Reveal>
                        <TwoColumnsDivider 
                            gap={50}
                            left={
                                <TextWithTitle 
                                    text={[
                                        'В ходе проведения мониторинга интернетресурсов, установлен сервис, осуществляющий обмен криптовалют на фиатные деньги и наборот. После получения данной информации проведены первичные проверочные мероприятия, а именно проверено за кем зарегистрировано доменное имя сервиса, когда проводились последние изменения на ресурсе, с какими криптовалютами производится обмен, а также установление местонахождения предполагаемого офиса',
                                        'Проведенными оперативными мероприятиями установлен офис, где производилась противоправная деятельность по незаконному обмену криптовалют',
                                        'По результатам длительного наблюдения установлены покупатели и круг лиц, причастных к данному обменнику. ',
                                        'Установлено, что организатором являлся гр.А, имевший опыт работы на руководящих должностях в банковской сфере и широкий круг связей среди предпринимателей города, который для создания успешного имиджа в медиа-пространстве позиционировал себя как финансовый аналитик и эксперт по высокодоходным инвестициям. В последующем, гр.А нанял дополнительных операторов, которые содействовали ему осуществлять противозаконную деятельность. ',
                                    ]}    
                                />
                            }
                            right={
                                <TextWithTitle 
                                    text={[
                                        'После идентификации личностей данной группы, в целях установления проведенных транзакции, направлен запрос в криптобиржы (binance, bybit и др.).',
                                        'Параллельно направлен запрос в Международный финансовый центр «Астана» о наличии лицензии на управление платформой цифровых активов и оказание кастодиальных услуг у вышеуказанных лиц. ',
                                        'На основании полученной информации, с целью получения дополнительных сведений по неустановленным криптокошелькам и используемых кредитных карт, проведен оперативный закуп. В ходе проведения оперативной комбинации установлено, что вышеуказанный взымал комиссию в размере 1,7% от меняемой суммы. ',
                                        'После получения всех финансовых инструментов, которыми пользовалась данная преступная группа, в целях получения сведений о движений денежных и криптовалютных средств, а также установления наличия движимого и недвижимого имущества заграницей, направлены запросы в Подразделения финансовой разведки и Управление «КРИПТОН» Агентства. ',
                                        'По результатам стало известно, что гр.А приобрел более 20квартир, которые были оформлены на его близких родственников, и квартиру в Северном Кипре.'
                                    ]}    
                                />
                            }
                        />
                    </Reveal>
                    <Sizebox height={30} />
                    <Reveal>
                        <TextWithBackground 
                            backgroundColor={'#ecf56e'}
                            text={
                                <TextWithTitle 
                                    text={[
                                        'На основании собранной информации возбуждено уголовное дело, в рамках которого инициированы обыски в офисе, квартирах и машинах фигурантов. Изъяты ноутбуки, компьютеры, планшеты, USB носители информации, блокноты с рукописными записями и холодные кошельки (марки trezor, ledger).',
                                        'После вынесено постановление о проведении комплексного исследования, которое было поручено криминалистам и сотрудникам Управления «КРИПТОН». ',
                                        'В ходе проведения исследования обнаружено, что на персональном компьютере гр.А имелись текстовые файлы, в которых хранились приватные ключи криптокошелька «Electrum».',
                                        'Установлено, что в данном кошельке хранилось свыше 300 криптоадресов, с которых было проведено более 4000 транзакции на сумму свыше 300 биткойнов.',
                                        <>В ходе анализа транзакций с помощью инструментов блокчейн-аналитики установлено, что часть криптоактивов на данные адреса поступала с даркнетсервисов <span className="bold">«Hydra marketplace», «Mega marketplace», «OMG!OMG!», «Xnova LTD» «BlackSprut»</span>, которые реализуют наркотические и психотропные вещеста, подложные документы, оказывают услуги по взлому, «пробиву» и осуществляют иные противоправные действия.</>,
                                        'Таким образом, установлено криминальное происхождение полученных криптоактивов, которые в последующем отмывались посредством данного обменника.',
                                        'В результате правильно выстроенных тактических оперативно-следственных действий наложен арест на криптоактивы и денежные средства на сумму свыше 420 000 долларов, имущество (23 квартиры, 2 офиса) на сумму свыше 700 млн тенге. ',
                                    ]}
                                />
                            }
                        />
                    </Reveal>

                    <Sizebox height={140} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            КЕЙС 4: ДЕЛО ОБ ОТМЫВАНИИ ДОХОДОВ ЧЕРЕЗ ЦИФРОВЫЕ АКТИВЫ РОМАНА СТЕРЛИНГОВА. 
                        </HeaderWithLine>
                    </Reveal>
                    <Sizebox height={40} />
                    <Centered>
                        <Image 
                            src={'https://coredo.eu/wp-content/uploads/2023/12/we-helped-our-client-launch-a-cryptocurrency-exchange-in-the-czech-republic-main.jpg'} 
                            style={{width: '500px'}}
                        />
                    </Centered>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithBackground 
                            backgroundColor={'#9cdef7'}
                            text={
                                <TwoColumnsDivider 
                                    gap={50}
                                    left={
                                        <TextWithTitle 
                                            text={[
                                                'На территории США задержан гражданин РФ Роман Стерлингов. Ему предъявлены обвинения в отмывании средств с использованием криптовалюты. Согласно американским органам, Стерлингов причастен к созданию и управлению сервисом микширования Bitcoin Fog, который используется для сокрытия источников транзакций цифровых валют.',
                                                'В результате допущенной ошибки подозреваемым специалисты налоговой службы США в сотрудничестве с оперативными службами выявили фигуранта, который длительное время участвовал в отмывании биткоинов и маскировке соответствующих транзакций. Через сервис Bitcoin Fog было осуществлено транзакций на сумму, эквивалентную более чем миллиону биткоинов, что составляет приблизительно $335 млн по курсу на момент совершения операций. Через данную платформу проходили средства из даркнет-рынков и скомпрометированных криптобирж',
                                                'На рынке криптовалют функционируют специализированные сервисы, называемые криптовалютными микшерами. Эти сервисы предоставляют возможность "очистки" криптовалютных активов от связанных с ними исторических данных, что облегчает их последующую конвертацию в традиционные фиатные деньги без идентификации владельца. ',
                                            ]}    
                                        />
                                    }
                                    right={
                                        <TextWithTitle 
                                            text={[
                                                'В 2011 году Стерлингов провел ряд финансовых операций для оплаты хостинга своего проекта, связанного с отмыванием биткоинов. Он использовал биржу Mt. Gox для конвертации евро в биткоины, после чего провел несколько транзакций между различными криптовалютными кошельками, тем самым создавал неоднозначные пути передвижения средств, усложняя связь между исходными и конечными адресами криптокошельков. Этот метод, известный как "кошелек-кошелек" (wallet-to-wallet), часто применяется для усложнения анализа транзакций. Далее он конвертировал биткоины на другой криптовалютной бирже в виртуальные монеты Liberty Reserve и использовал их для оплаты сервера для своего проекта Bitcoin Fog. ',
                                                'Однако, ключевой информацией, позволившей налоговому управлению США идентифицировать Стерлингова, стал его аккаунт на бирже Mt. Gox. В данном аккаунте Стерлингов указал свои личные данные, включая домашний адрес, номер телефона и аккаунт Google. В последующей проверке его облачного хранилища Google Drive был найден текстовый документ на русском языке, содержащий методы маскировки платежей в системе Bitcoin, которые Стерлингов использовал для затруднения анализа его операций. Данный документ стал отправной точкой для дальнейшей оперативной работы правоохранительных органов США. ',
                                            ]}    
                                        />
                                    }
                                />
                            }
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'Комбинирование технической информации с аналитическими инструментами дало правоохранительным органам возможность построить более полное представление о деятельности Стерлингова. Связывание его личных данных с анонимными транзакциями, конвертированными в Liberty Reserve, и обнаружение документа с методами маскировки транзакций позволило понять масштаб и сложность его операций. ',
                                'В декабре 2013 года сервис Bitcoin Fog был задействован в процессе отмывания порядка 96 тыс. биткоинов. Среди этих средств была часть, присвоенная с онлайнплощадки Sheep Marketplace. Данная платформа, расположенная в сети даркнет, занималась реализацией различных запрещенных товаров и услуг. Однако её существование было коротким: менее года после запуска сайт прекратил работу. Причиной закрытия, согласно утверждению администрации площадки, стало присвоение крупной суммы виртуальных активов (эквивалент $6 млн на тот момент) в результате эксплуатации уязвимости в программном обеспечении сайта. ',
                                'В результате расследования, проведенного правоохранительными органами на территории США, Роман Стерлингов был задержан и подвергнут судебному преследованию. Ему были предъявлены обвинения в отмывании средств с использованием криптовалюты. ',
                                'Подробное аналитическое расследование, поддержанное техническими аспектами выявления транзакций и анализом путей движения криптовалютных средств, помогли правоохранительным органам выявить связь между действиями Стерлингова и использованием им Bitcoin Fog для сокрытия источников транзакций цифровых валют. Этот случай показал, как современные методы анализа блокчейна и криптовалютных транзакций могут быть использованы для выявления и расследования криптовалютных преступлений',
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={140} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            КЕЙС 5. ОРГАНИЗАЦИЯ ФИНАНСОВОЙ ПИРАМИДЫ С ИСПОЛЬЗОВАНИЕМ ЦИФРОВЫХ АКТИВОВ
                        </HeaderWithLine>
                    </Reveal>
                    <Sizebox height={40} />
                    <Centered>
                        <Image 
                            src={'https://forklog.com/wp-content/uploads/pyramid.webp'} 
                            style={{width: '500px'}}
                        />
                    </Centered>
                    <Sizebox height={40} />
                    <Reveal>
                        <TextWithTitle 
                            text={[
                                'В начале 2010-х годов, когда интерес к криптовалютам начал расти, Мэтью Гетце, Йобадиа Уикс и Джозеф Абель основали BitClub Network. Схема мошенничества начала действовать с апреля 2014 года и продолжала до декабря 2019 года. Они привлекли инвесторов обещаниями огромных прибылей взамен инвестиций в общий пул майнинга криптовалюты. ',
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={20} />
                    <Reveal>
                        <NotNumberedDots 
                            dotsColor={'black'}
                            list={[
                                <TextWithTitle 
                                    title={'Создание ложной идентичности:'}
                                    text={[
                                        'BitClub Network активно продвигала себя как надежная и прозрачная компания, предоставляя услуги по майнингу биткоинов. Сайты компании заявляли, что она расположена в Рейкьявике, хотя на самом деле о местоположении компании было известно очень мало. Это создавало иллюзию надежности и серьезности проекта.'
                                    ]}
                                />,
                                <TextWithTitle 
                                    title={'Ложные обещания и схема пирамиды:'}
                                    text={[
                                        'BitClub Network использовала традиционные принципы схемы пирамиды, обещая инвесторам награды за привлечение новых участников. Инвесторы вкладывали деньги в виде депозитов на определенный срок, взамен получая обещания о высоких доходах. Тем самым, старшие инвесторы получали деньги новичков, поддерживая систему.'
                                    ]}
                                />,
                                <TextWithTitle 
                                    title={'Фальсификация данных и обман:'}
                                    text={[
                                        'Чтобы поддерживать интерес инвесторов, BitClub Network предоставляла им ложные отчеты о доходах, представляя их как результат майнинга их пула. Компания также продавала фейковые токены и позиционировала себя как надежный майнинговый пул. Однако на деле большая часть доходов компании шла от новых вкладчиков. '
                                    ]}
                                />,
                                <TextWithTitle 
                                    title={'Создание иллюзии безопасности:'}
                                    text={[
                                        'BitClub Network утверждала, что ее услуги обеспечены страховкой, защищающей инвесторов от потерь. На сайте компании не было лицензий или регулирующих документов, что позволяло им действовать в серой зоне. '
                                    ]}
                                />,
                                <TextWithTitle 
                                    title={'Сбор доказательств и разоблачение:'}
                                    text={[
                                        'Благодаря совместным усилиям органов правопорядка, криптосообщества и инвесторов началась тщательная проверка деятельности BitClub Network. Применяя методы анализа данных, сравнение обещаний с реальностью и взаимодействуя с партнерами и провайдерами, власти собрали необходимые доказательства.'
                                    ]}
                                />,
                                <TextWithTitle 
                                    title={'Аресты и судебное разбирательство:'}
                                    text={[
                                        'Власти Нью-Джерси предъявили обвинения Мэтью Гетце, Йобадиа Уиксу и Джозефу Абелю в сговоре с целью совершения мошенничества, предложения и продажи незарегистрированных ценных бумаг, а также налоговых преступлений. Обвиняемые были арестованы, и судебное разбирательство началось. '
                                    ]}
                                />,
                                <TextWithTitle 
                                    title={'Судебное разбирательство и приговор:'}
                                    text={[
                                        'В ходе судебного процесса Мэтью Гетце и Йобадиа Уикс были признаны виновными и осуждены за мошенничество, сговор и нарушение налогового законодательства. Власти вынесли приговор в январе 2021 года. Джозеф Абель также признал вину и был осужден за участие в схеме. '
                                    ]}
                                />,
                                <TextWithTitle 
                                    title={'Урок и заключение:'}
                                    text={[
                                        'Расследование и разоблачение BitClub Network стали важным уроком для инвесторов о необходимости осторожности при инвестировании в криптовалютные проекты. Органы правопорядка, работая с криптосообществом и инвесторами, смогли предотвратить продолжение мошенничества и наказать виновных. '
                                    ]}
                                />
                            ]}  
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            Переходим к практическим упражнениям
                        </HeaderWithLine>
                    </Reveal>
    
                    <Sizebox height={50}/>
    
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
            case 10: 
                return (<LessonPage name={'Практические упражнения'}>
                    <Sizebox height={28} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            Практические упражнения по трассировке транзакций, идентификации владельцев кошельков и другим аспектам расследования
                        </HeaderWithLine>
                    </Reveal>
                    <Sizebox height={80} />
                    <Reveal>
                        <TextWithTitle 
                            title={'Упражнение 1: Отслеживание транзакций'}
                            text={[
                                <>
                                    <Image 
                                        src={'https://images.emojiterra.com/google/android-12l/512px/1f3af.png'}
                                        style={{
                                            width: '50px'
                                        }}
                                        padding={'0px'}
                                        display='inline'
                                    />
                                    <span className="bold">Цель:</span> Изучить процесс отслеживания транзакций через блокчейн и определения, как связаны различные кошельки.
                                </>,
                                <>
                                    <Image 
                                        src={'https://emojiisland.com/cdn/shop/products/Thinking_Face_Emoji_large.png?v=1571606036'}
                                        style={{
                                            width: '50px'
                                        }}
                                        padding={'0px'}
                                        display='inline'
                                    />
                                    <span className="bold">Задача:</span> Вам предоставляется информация о подозрительной транзакции, включая хеш транзакции и адреса кошельков.  Ваша задача - проследить за перемещением средств и определить, на какие кошельки они были переведены.'
                                </>,
                                <>
                                    <Image 
                                        src={'https://static-00.iconduck.com/assets.00/brain-emoji-1024x798-spi2i3dv.png'}
                                        style={{
                                            width: '50px'
                                        }}
                                        padding={'0px'}
                                        display='inline'
                                    />
                                    <span className="bold">Ресурсы:</span> Используйте блокчейн-эксплореры, такие как Chainalysis или Crystal, для просмотра деталей транзакции и отслеживания средств.'
                                </>,
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={50} />
                    <Reveal>
                        <TextWithTitle 
                            title={'Упражнение 2: Идентификация владельцев кошельков'}
                            text={[
                                <>
                                    <Image 
                                        src={'https://images.emojiterra.com/google/android-12l/512px/1f3af.png'}
                                        style={{
                                            width: '50px'
                                        }}
                                        padding={'0px'}
                                        display='inline'
                                    />
                                    <span className="bold">Цель:</span>  Понимание процесса идентификации владельцев кошельков и выявление информации о них.'
                                </>,
                                <>
                                    <Image 
                                        src={'https://emojiisland.com/cdn/shop/products/Thinking_Face_Emoji_large.png?v=1571606036'}
                                        style={{
                                            width: '50px'
                                        }}
                                        padding={'0px'}
                                        display='inline'
                                    />
                                    <span className="bold">Задача:</span> Исследуйте транзакции, связанные с подозрительным кошельком, и попробуйте установить владельца кошелька на основе анализа транзакций и доступной в открытом доступе информации. '
                                </>,
                                <>
                                    <Image 
                                        src={'https://static-00.iconduck.com/assets.00/brain-emoji-1024x798-spi2i3dv.png'}
                                        style={{
                                            width: '50px'
                                        }}
                                        padding={'0px'}
                                        display='inline'
                                    />
                                    <span className="bold">Ресурсы:</span> Используйте криптобиржи, социальные медиа, обменники криптовалют и другие ресурсы для сбора информации о владельце кошелька.'
                                </>,
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={50} />
                    <Reveal>
                        <TextWithTitle 
                            title={'Упражнение 3: Расследование ICO-мошенничества'}
                            text={[
                                <>
                                    <Image 
                                        src={'https://images.emojiterra.com/google/android-12l/512px/1f3af.png'}
                                        style={{
                                            width: '50px'
                                        }}
                                        padding={'0px'}
                                        display='inline'
                                    />
                                    <span className="bold">Цель:</span> Изучить процесс выявления и расследования мошеннических ICO.
                                </>,
                                <>
                                <Image 
                                    src={'https://emojiisland.com/cdn/shop/products/Thinking_Face_Emoji_large.png?v=1571606036'}
                                    style={{
                                        width: '50px'
                                    }}
                                    padding={'0px'}
                                    display='inline'
                                />
                                <span className="bold">Задача:</span> Вам предоставляется информация о подозрительном ICO, включая документы и информацию о транзакциях. Ваша задача - проанализировать предоставленные данные и определить, является ли это ICO мошенничеством. 
                                </>,
                                <>
                                    <Image 
                                        src={'https://static-00.iconduck.com/assets.00/brain-emoji-1024x798-spi2i3dv.png'}
                                        style={{
                                            width: '50px'
                                        }}
                                        padding={'0px'}
                                        display='inline'
                                    />
                                    <span className="bold">Ресурсы:</span> Используйте доступные вам данные, а также дополнительные ресурсы, такие как отчеты о компании, обзоры и отзывы, для сбора информации о ICO. 
                                </>,
                            ]}
                        />
                    </Reveal>
                    <Sizebox height={50} />
                    <Reveal>
                        <Report_Warning>
                            Эти практические упражнения и кейсы помогут сотрудникам правоохранительных органов лучше понять процесс расследования криптовалютных транзакций и применять свои знания на практике. Помимо того, это даст им возможность развивать свои навыки анализа и расследования в области криптовалют
                        </Report_Warning>
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            Перейдем к видео-урокам
                        </HeaderWithLine>
                    </Reveal>
    
                    <Sizebox height={50}/>
    
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
            case 11: 
                return (<LessonPage name={'Видео урок'}>
                    <Sizebox height={28} />
                    
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            <span className="bold">Алгоритм следственных действий, необходимых для установления цифровых активов и их изъятия</span>
                        </HeaderWithLine>
                    </Reveal>

                    <Sizebox height={40} />
                    <Reveal>
                        <Report_Warning
                            backgroundColor='#f5f52f'
                            borderColor='#c9c928'
                        >
                            Для выработки практических навыков предлагаем внимательно посмотреть следующее видео
                        </Report_Warning>
                    </Reveal>

                    <Sizebox height={80} />
                    <VideoLine 
                        url={'https://videos.sproutvideo.com/embed/7090d1b31716e5c4f9/3cc8a905da62dcd7?playerColor=1496e0'}
                    />

                    <Sizebox height={80} />
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
            case 12: 
                return (<LessonPage name={'Вопросы и определения для самоконтроля'}>
                    <Sizebox height={28} />

                    <Reveal>
                        <Report_Warning
                            backgroundColor='#f5f52f'
                            borderColor='#c9c928'
                        >
                            В завершении для закрепления материалов пройденного Учебного курса предлагаем проверить себя в рамках нижеприведенных определний
                        </Report_Warning>
                    </Reveal>

                    <Sizebox height={80} />
                    <FileDownloader 
                        file={file1}
                        fileName={'Вопросы и определения'}
                    />

                    <Sizebox height={80} />
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
            case 13: 
                return (<LessonPage name={'ПОСЛЕСЛОВИЕ'}>
                    <Sizebox height={28} />

                    <TextWithTitle 
                        text={[
                            'Этот курс предоставил Вам введение в мир криптовалют и методы их расследований. Курс обеспечивает понимание сущности криптовалют и их воздействия на финансовую сферу. Вы изучили ключевые термины, включая блокчейн, майнинг и криптокошельки.',
                            'Более того, Вы овладели практическими навыками, научились создавать криптокошельки, эффективно обеспечивать их безопасность и разбирались в сути криптовалютных транзакций. Юридические аспекты регулирования криптовалют, их классификация и риски также усвоены в их контексте. ',
                            'С фокусом на преступные аспекты, курс дал полное представление о том, как криптовалюты могут быть использованы в незаконных действиях и как расследовать такие случаи. Важность сотрудничества с криптовалютными платформами также была выделена, и Вы изучили эффективные способы взаимодействия.',
                            'Вы рассмотрели практические кейсы, реальные примеры расследований с использованием криптовалют и выполнили задания, связанные с трассировкой транзакций и идентификацией владельцев кошельков.',
                            'Данный курс предоставил и теоретические знания, и практические навыки, необходимые для успешной работы с криптовалютами в рамках правоохранительных функций. ',
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
                            Завершение учебного курса
                        </HeaderWithLine>
                    </Reveal>
    
                    <Sizebox height={50}/>
                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(1);
                        }}/>
                    </Reveal>
    
                </LessonPage>)
        }
    }

    return ( 
        <div className="crypto-course">
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

export default CryptoCourse;


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
                        name: 'О модуле',
                        progress: 0,
                    }}
                    handleSessionClick={handleSessionClick}
                    isActive={1 === activeSessionId}
                />
                <Module
                    moduleId={1}
                    isOpen={currentModule === 1}
                    handleModuleOpen={handleModuleOpen}
                    name={'Первый модуль'}
                >
                    
                    <Session
                        session={{
                            id: 2,
                            group: 'Введение',
                            name: 'Введение в криптовалюты',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={2 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 3,
                            group: 'Введение',
                            name: 'Как использовать криптовалюты?',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={3 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 4,
                            group: 'Введение',
                            name: 'Юридический статус криптовалют',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={4 === activeSessionId}
                    />
                </Module>
                <Module
                    moduleId={2}
                    isOpen={currentModule === 2}
                    handleModuleOpen={handleModuleOpen}
                    name={'Второй модуль'}
                >
                    
                    <Session
                        session={{
                            id: 5,
                            group: 'Введение',
                            name: 'Применение криптовалют в преступной деятельности',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={5 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 6,
                            group: 'Введение',
                            name: 'Отслеживание криптовалютных транзакций',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={6 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 7,
                            group: 'Введение',
                            name: 'Конфискация и изъятие криптовалют',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={7 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 8,
                            group: 'Введение',
                            name: 'Сотрудничество с криптовалютными платформами',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={8 === activeSessionId}
                    />
                </Module>
                <Module
                    moduleId={3}
                    isOpen={currentModule === 3}
                    handleModuleOpen={handleModuleOpen}
                    name={'Третий модуль'}
                >
                    <Session
                        session={{
                            id: 9,
                            group: 'Введение',
                            name: 'Кейсы',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={9 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 10,
                            group: 'Введение',
                            name: 'Практические упражнения',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={10 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 11,
                            group: 'Введение',
                            name: 'Видео-урок',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={11 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 12,
                            group: 'Введение',
                            name: 'Вопросы и определения для самоконтроля',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={12 === activeSessionId}
                    />
                    <Session
                        session={{
                            id: 13,
                            group: 'Введение',
                            name: 'ПОСЛЕСЛОВИЕ',
                            progress: 0,
                        }}
                        handleSessionClick={handleSessionClick}
                        isActive={13 === activeSessionId}
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