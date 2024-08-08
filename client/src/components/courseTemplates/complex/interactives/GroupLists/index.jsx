import React, { useState } from 'react';

import './style.scss';

const GroupList = ({
    list=[
        { 
            name: 'Превентивные меры', 
            side: 'right',
            items: [
                'Нормативно-правовая база (Закон о ПОД/ФТ, подзаконные акты и тд.)',
                'Рискориентированный подход (система управления рисками СФМ, АФМ, ПО, ГО и др.)',
                'Реализация СФМ требований ПВК (НПК, оценка рисков, обучение и повышение квалификации и др.)',
                'Система мониторинга и принятие мер по ним (ПО/СПО, в том числе об отказах, прекращении и приостановлении операций клиента)',
                'Профилактические меры контроля со стороны надзорных органов (камеральный контроль, уведомления, письма, встречи и др.)',
                'Иные меры, которые применяются в целях недопущения ОД/ФТ'
            ]
        },
        { 
            name: 'Превентивные мерыa', 
            side: 'right',
            items: [
                'Нормативно-правовая база (Закон о ПОД/ФТ, подзаконные акты и тд.)',
                'Рискориентированный подход (система управления рисками СФМ, АФМ, ПО, ГО и др.)',
                'Реализация СФМ требований ПВК (НПК, оценка рисков, обучение и повышение квалификации и др.)',
                'Система мониторинга и принятие мер по ним (ПО/СПО, в том числе об отказах, прекращении и приостановлении операций клиента)',
                'Профилактические меры контроля со стороны надзорных органов (камеральный контроль, уведомления, письма, встречи и др.)',
                'Иные меры, которые применяются в целях недопущения ОД/ФТ'
            ]
        },
        { 
            name: 'Превентивные мерыb', 
            side: 'left',
            items: [
                'Нормативно-правовая база (Закон о ПОД/ФТ, подзаконные акты и тд.)',
                'Рискориентированный подход (система управления рисками СФМ, АФМ, ПО, ГО и др.)',
                'Реализация СФМ требований ПВК (НПК, оценка рисков, обучение и повышение квалификации и др.)',
                'Система мониторинга и принятие мер по ним (ПО/СПО, в том числе об отказах, прекращении и приостановлении операций клиента)',
                'Профилактические меры контроля со стороны надзорных органов (камеральный контроль, уведомления, письма, встречи и др.)',
                'Иные меры, которые применяются в целях недопущения ОД/ФТ'
            ]
        },
    ],
    image='data:image/png;base64,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'
}) => {

    const [activeList, setActiveList] = useState(null);
    const [activeItem, setActiveItem] = useState('');

    const handleClick = (name) => {
        let active_item = list.find(item => item.name === name);
        setActiveItem(name)
        setActiveList(active_item.items)
    };

    return (
        <div className='group-list'>
            <div className="wrapper">

                <div className="left">
                    {
                        list
                            .filter(item => item.side === 'left')
                            .map((item, index) => {

                                return (
                                    <Item 
                                        key={index} 
                                        name={item.name} 
                                        handleClick={handleClick} 
                                        activeItem={activeItem}
                                    />
                                )
                            })
                    }
                </div>

                <div className="center">
                    {
                        activeList !== null ? (

                            <div className="list">
                                {
                                    activeList.map((item, index) => (
                                        <div className="list-item" key={index}>
                                            <div className="bullet"></div>
                                            <div className="text">{ item } </div>
                                        </div>
                                    ))
                                }
                            </div>

                        ) : (

                            <div className="icon">
                                <img src={image} alt="logo" />
                            </div>

                        )
                    }
                </div>

                <div className="right">
                    {
                        list
                            .filter(item => item.side === 'right')
                            .map((item, index) => {

                                return (
                                    <Item 
                                        key={index} 
                                        name={item.name} 
                                        handleClick={handleClick} 
                                        activeItem={activeItem}
                                    />
                                )
                            })
                    }
                </div>

            </div>
        </div>
    );
};

const Item = ({
    name,
    handleClick,
    activeItem
}) => {
    const isActive = activeItem === name;

    return (
        <div 
            className={`group-item ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(name)}
        >
            { name }
        </div>
    )
}

export default GroupList;
