import React, { useRef, useEffect, useState } from 'react';

import './style.scss';

import { MdOutlineClose } from "react-icons/md";

function ImageWithPoints({
    img,
    points = [
        { id: 0, x: 720, y: 380, name: 'ГО регуляторы (государтсвенные органы-регуляторы)' },
        { id: 1, x: 720, y: 640, name: 'БВУ'  },
        { id: 2, x: 720, y: 800, name: 'ФУ (финансовые учреждения)'  },
        { id: 3, x: 720, y: 960, name: 'УНФПП (установленные нефинансовые предприятия и профессии)'  },
        { id: 4, x: 720, y: 1220, name: 'Общественные организации     '  },
        { id: 5, x: 1604, y: 500, name: 'Правоохранительные органы'  },
        { id: 6, x: 1604, y: 928, name: 'Международные организации'  },
    ],
    list = [
        ['Агентство по регулированию и развитию финансового рынка РК', 'Национальный Банк РК', 'Агентство РК по финансовому мониторингу', 'Министерство финансов РК', 'Министерство юстиции РК', 'Министерство туризма и спорта РК', 'Агентство по защите и развитию конкуренции РК', 'Министерство здравоохранения РК', 'Министерство цифрового развития, инноваций и аэрокосмической промышленности РК', 'Комитет по регулированию финансовых услуг МФЦА'],
        [''],
        ['БВУ-Банки второго уровня', 'Обменные пункты', 'Организации, осуществляющие отдельные виды банковских операций', 'Фондовые биржи', 'Страховые организации и страховые брокеры, общества взаимного страхования', 'Профессиональные участники рынка ценных бумаг, центральный депозитарий', 'Операторы почты, оказывающие услуги по переводу денег', 'Организации, осуществляющие отдельные виды банковских операций', 'Платежные организации'],
        ['Нотариусы, осуществляющие нотариальные действия с деньгами и (или) иным имуществом', 'Адвокаты и юридические консультанты (в установленных Законом о ПОД/ФТ случаях)', 'Независимые специалисты по юридическим вопросам (в установленных Законом о ПОД/ФТ случаях)', 'Товарные биржи', 'Бухгалтерские организации', 'Профессиональные бухгалтеры, осуществляющие предпринимательскую деятельность в сфере бухгалтерского учета', 'Аудиторские организации', 'Организации игорного бизнеса и лотерей', 'ИП и ЮЛ, осуществляющие лизинговую деятельность в качестве лизингодателя без лицензии', 'ИП и ЮЛ, осуществляющие операции с драгоценными металлами и драгоценными камнями, ювелирными изделиями из них', 'ИП и ЮЛ, оказывающие посреднические услуги при осуществлении сделок купли-продажи недвижимого имущества', 'Лица, осуществляющие деятельность по выпуску цифровых активов, организации торгов ими, а также предоставлению услуг по обмену цифровых активов на деньги, ценности и иное имущество'],
        ['Объединения юридических лиц', 'Региональные палаты', 'Некоммерческие организации', 'Ассоциации', 'Иные организации'],
        ['Органы внутренних дел', 'Органы национальной безопасности', 'Уполномоченный орган по противодействию коррупции', 'Специальные государственные органы'],
        ['Организация Объединенных Наций', 'Евразийская группа по противодействию легализации преступных доходов и финансированию терроризма', 'Комитет экспертов по оценке мер по борьбе с отмыванием денег и финансированием терроризма', 'Иные организации']
    ]
}) {
    const canvasRef = useRef(null);
    const imageRef = useRef(new Image());

    const [activeList, setActiveList] = useState(null);
    const [activeName, setActiveName] = useState(null);

    // Draw the image and points on the canvas
    const drawImageAndPoints = (hoverIndex = null) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = imageRef.current;

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        // Draw the points
        points.forEach((point, index) => {
            context.beginPath();
            context.arc(point.x, point.y, 20, 0, Math.PI * 2, true);
            context.strokeStyle = index === hoverIndex ? 'blue' : 'white';
            context.lineWidth = 4;
            context.stroke();
        });
    };

    // Event listener for mouse move
    const handleMouseMove = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for X
        const scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

        const x = (event.clientX - rect.left) * scaleX;  // scale mouse coordinates after they have
        const y = (event.clientY - rect.top) * scaleY;   // been adjusted to be relative to element

        let hoverIndex = null;
        points.forEach((point, index) => {
            const dx = point.x - x;
            const dy = point.y - y;
            if (dx * dx + dy * dy < 250) { // 25 is the radius squared
                hoverIndex = index;
            }
        });

        canvas.style.cursor = hoverIndex !== null ? 'pointer' : 'default';
        drawImageAndPoints(hoverIndex);
    };

    // Event listener for mouse click
    const handleClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        points.forEach((point) => {
            const dx = point.x - x;
            const dy = point.y - y;
            if (dx * dx + dy * dy < 250) { // 25 is the radius squared
                console.log('Point ID clicked:', point.id);
                setActiveList(list[point.id]); // Assuming the list array is aligned with point ids
                setActiveName(point.name)
            }
        });
    };

    // Effect for image loading
    useEffect(() => {
        const image = imageRef.current;
        image.onload = () => {
            drawImageAndPoints(); // Draw when image is loaded
        };
        image.src = img;

        // Cleanup the effect
        return () => {
            image.onload = null;
        };
    }, [img]);

    // Effect for attaching event listeners
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleClick);

        // Cleanup event listeners
        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
        };
    }, [points, list]); // Added list as a dependency if list changes

    return (
        <div className="image-with-points" onClick={(e) => {
            console.log(e.target)
        }}>
            <div className="wrapper">
                <canvas ref={canvasRef} className="image-canvas"></canvas>
                {/* You can also display the active list here if needed */}
                {activeList && (
                    <div className='list'>
                        <div className="inner">
                            <div className="close" onClick={() => setActiveList(null)}>
                                <MdOutlineClose size={25}/>
                            </div>
                            <div className="header">{ activeName }</div>
                            <div className="items">
                                {activeList.map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageWithPoints;
