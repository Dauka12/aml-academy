import React, { useState, useEffect } from 'react';

import './style.scss';
import ArrowRightIcon from './Arrow-right.svg'; 
import HackerIcon from './Hacker.svg'; 
import PaymentIcon from './Payment.svg'; 

function FlexRow({
    icons=[ArrowRightIcon, HackerIcon, PaymentIcon],
    data = [
        { icon: ArrowRightIcon, title: 'Свобода от ограничении', description: 'Вы можете использовать криптовалюту беспрепятственно. Централизованные платежные сервисы в свою очередь могут замораживать учетные записи или препятствовать совершению транзакций.' },
        { icon: HackerIcon, title: 'Устойчива к взлому', description: 'Устройство сети делает ее устойчивой к атакам хакеров и других злоумышленников' },
        { icon: PaymentIcon, title: 'Дешевый и быстрый способ оплаты', description: 'Человек на другом конце света может получить от вас средства в считанные секунды. Комиссия за транзакцию значительно меньше, чем комиссия за международный денежный перевод.' },
    ],
    textColor
}) {
    return ( 
        <div className="flex-row">
            {
                data.map(({ icon, title, description }, index) => {
                    
                    return <div className="item"
                        key={index}
                        style={{
                            color: textColor
                        }}
                    >

                        <div className="icon">
                            <img src={icons[index]} alt="Icon" />
                        </div>

                        <div className="title">{ title }</div>
                        <div className="desc">{ description }</div>

                    </div>
                })
            }
        </div>
    );
}

export default FlexRow;