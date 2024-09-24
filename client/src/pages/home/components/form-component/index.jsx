import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import base_url from '../../../../settings/base_url';
import qr from '../../assets/jpg/qr.jpg';
import './style.css';

const FormComponent= () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const { t } = useTranslation();
    const jwtToken = localStorage.getItem('jwtToken')

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value;
        const formattedPhone = phoneValue?.replace(/[^0-9]/g, ''); // Удаляем все символы, кроме цифр
        setPhone(`+7 ${formattedPhone.slice(1)}`);
    };
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = async () => {
        if (isAgreed) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showAlert('Введите корректный адрес электронной почты.', 'error');
                return;
            }

            try {
                await axios.post(`${base_url}/api/aml/auth/sendMessageToMail`, {
                    "name": name,
                    "phoneNumber": phone,
                    "email": email,
                    "comment": comment,
                    "isNews": isSubscribed,
                }, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}` // Add token to the request headers
                    }
                });

                showAlert('Заявка отправлена!', 'success');
            } catch (error) {
                showAlert('Произошла ошибка при отправке заявки.', 'error');
            }
        };
    }
    const showAlert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage('');
        }, 2000);
    };

    return (
        <div className='form-container-wrapper'>
            {alertMessage && (
                <div className={`custom-alert ${alertType}`}>
                    {alertMessage}
                </div>
            )}
            <div className="form-container-main">
                <div className="form-left">
                    <div style={{display:"flex", flexDirection:"column", gap:"10px", lineHeight:"1"}}>
                        <div>
                            <div>
                            {t('do you still have questions?')}
                            </div>
                            <strong className='aml-academy-name'>AML ACADEMY</strong>
                        </div>
                    </div>
                    <img className="qr-aml" src={qr} alt="AML QR" />
                    <div className='phone-number'>
                        <p>
                            {t('write to us at')} <a href="https://wa.me/77087168416" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        </p>
                        <p>{t('one phone number for all questions')}<br />+7 708 716 8416</p>
                    </div>
                </div>
                <div className="form-right">
                    <input
                        type="text"
                        placeholder={t('enter your name')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="+7 (__) ___-__-__"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                    <input
                        type="email"
                        placeholder={t('enter your email')}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <textarea
                        placeholder={t('your comment')}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                            />
                            {t('i agree 1')}
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={isSubscribed}
                                onChange={(e) => setIsSubscribed(e.target.checked)}
                            />
                            {t('i agree 2')}
                        </label>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={!isAgreed}
                        className={`submit-button ${isAgreed ? '' : 'disabled'}`}
                    >
                        {t('submit your application')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormComponent;
