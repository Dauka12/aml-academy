import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import whatsappIcon from '../../assets/icons/ic_outline-whatsapp.svg';
import instructionsImg from '../../assets/images/instractions.svg';
import qrImg from '../../assets/images/qr.svg';
import base_url from '../../settings/base_url';
import cl from './PaymentPage.module.css';

function PaymentPage(props) {
    const {id} = useParams()

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/course/justGetCourseById/${id}`);

                // console.log(response.data);

                if (response.status === 200) {
                    setData(response.data);
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
        
        fetchData();
      }, []);

    return (
        <div className={cl.wrapper}>
            <div className={cl.qr_wrapper}>
                <div className={cl.headline}>
                    <p className={cl.headline_text}>"AML ACADEMY" қаржылық мониторинг академиясы " АҚ қызмет ақысын қалай төлейді</p>
                    <div className={cl.line}></div>
                    <p className={cl.headline_text}>Как оплатить услугу в АО «Академия финансового мониторинга «AML ACADEMY»</p>
                    {data !== null ? 
                        <p className={cl.headline_text}>{data.course_name}</p>
                        : null
                    }
                </div>
                <div className={cl.qr}>
                    <p className={cl.price}>
                        Цена
                        <span>
                            {isLoading 
                                ? "loading" 
                                : data !== null 
                                    ? data.course_price
                                    : ""
                            }тг
                        </span>
                    </p>
                    <img style={{pointerEvents: 'none', userSelect: 'none'}} src={qrImg} alt="QR" />
                    <p className={cl.qr_text}>Отсканируйте QR-код в мобильном  приложении банка Kaspi.kz</p>
                </div>
            </div>
                
            <div className={cl.gray_wrapper}>
                <div className={cl.individual}>
                    <div className={cl.headline_block}>
                        <div className={cl.circle}></div>
                        <p className={cl.headline_block_text}>Если вы являетесь физическим лицом</p>
                    </div>
                    <img src={instructionsImg} alt="Инструкция" className={cl.instructions_img} />
                    <div className={cl.whatsapp}>
                        <img src={whatsappIcon} alt="whatsappIcon" />
                        <p className={cl.whatsapp_text}>Отправьте платежное поручение через WhatsApp по номеру +7 708 716 8416</p>

                    </div>
                    <div className={cl.whatsapp_button}>
                        <a href='https://wa.me/77087168416' target="_blank" className={cl.whatsapp_link}>Открыть Whatsapp</a>
                    </div>
                    
                </div>
                <div className={cl.legal_entity}>
                    <div className={cl.headline_block}>
                        <div className={cl.circle}></div>
                        <p className={cl.headline_block_text}>Если вы являетесь юридическим лицом</p>
                    </div>
                    <p className={cl.payment_text}>Произведите оплату по счету</p>
                    <div>
                        <p className={cl.payment}>
                            АО «Академия финансового мониторинга «AML ACADEMY»
                        <br></br>Юридический адрес: ул. Ш. Уалиханова, 11
                        <br></br>БИН 190 840 027 374
                        <br></br>ИИК KZ67601A871023277481
                        <br></br>в АО «Народный Банк Казахстан»
                        <br></br>БИК : HSBKKZKX
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default PaymentPage;