import React, { useRef, useState } from 'react';
import './style.css';

const RisksComponent = ({ selectedRisk, setSelectedRisk }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');
    const timeoutRef = useRef(null); // Use a ref to store the timeout ID

    const handleClick = (risk) => {
        // Show the modal with a specific message based on the risk
        setSelectedRisk(risk);
        showModal(risk);
    };

    const showModal = (risk) => {
        let riskText = '';

        // Define random risk factors based on the selected risk level
        switch (risk) {
            case 'Риск отсутствует':
                riskText = 'Факторы риска: Отсутствуют.\nОбщий балл: 0 (Отсутствует риск)';
                break;
            case 'Риск низкий':
                riskText = 'Факторы риска: Небольшая сумма операции (+1).\nОбщий балл: +1 (Низкий риск)';
                break;
            case 'Риск средний':
                riskText = 'Факторы риска: Пороговая операция (+1), Представляет некоммерческую организацию (+5), страна с высоким уровнем коррупции (+1).\nОбщий балл: +7 (Средний риск)';
                break;
            case 'Риск высокий':
                riskText = 'Факторы риска: Пороговая операция (+1), Ведение деятельности в оффшорной зоне (+7), Неизвестные источники средств (+5).\nОбщий балл: +13 (Высокий риск)';
                break;
            default:
                riskText = '';
                break;
        }

        // Clear any existing timeout to reset the countdown
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Immediately hide and then show the modal to reset the animation and visibility
        setIsModalVisible(false); // Hide the modal temporarily
        setModalText(riskText);

        // Using setTimeout to ensure the modal is hidden before showing again
        setTimeout(() => {
            setIsModalVisible(true); // Show the modal
        }, 0);

        // Set a new timeout to hide the modal after 3 seconds
        timeoutRef.current = setTimeout(() => {
            setIsModalVisible(false);
        }, 3000);
    };

    return (
        <div className='risks-component'>
            <div 
                className={`type-risk ${selectedRisk === 'Риск отсутствует' ? 'selected' : ''}`} 
                onClick={() => handleClick('Риск отсутствует')}
            >
                Риск отсутствует
            </div>
            <div 
                className={`type-risk ${selectedRisk === 'Риск низкий' ? 'selected' : ''}`} 
                onClick={() => handleClick('Риск низкий')}
            >
                Риск низкий
            </div>
            <div 
                className={`type-risk ${selectedRisk === 'Риск средний' ? 'selected' : ''}`} 
                onClick={() => handleClick('Риск средний')}
            >
                Риск средний
            </div>
            <div 
                className={`type-risk ${selectedRisk === 'Риск высокий' ? 'selected' : ''}`} 
                onClick={() => handleClick('Риск высокий')}
            >
                Риск высокий
            </div>

            {isModalVisible && (
                <div className='risk-modal'>
                    {modalText}
                </div>
            )}
        </div>
    );
}

export default RisksComponent;
