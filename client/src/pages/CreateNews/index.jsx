import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import base_url from '../../settings/base_url';
import { BuilderNavbar } from '../adminCourse/builderNavbar/BuilderNavbar';
import './style.scss';

function CreateNews() {

    const location = useLocation();
    const axId = new URLSearchParams(location.search).get('id');
    const [currentID, setCurrentID] = useState(axId || 0);

    const [name, setName] = useState('');
    const [name_kz, setName_kz] = useState('');
    const [description, setDescription] = useState('');
    const [description_kz, setDescription_kz] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('news');
    const [image, setImage] = useState('');
    const [language, setLanguage] = useState('ru');

    const [jwtToken, setJwtToken] = useState('');

    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(e => {
        const storedJwtToken = localStorage.getItem('jwtToken');
        if (storedJwtToken) {
            setJwtToken(storedJwtToken);
        }

        if (currentID === 0) {
            setDate(getDate())
        }

        setLoading(false);
    }, []);

    const handleSaveCourse = () => {
        setLoading(true);
        console.log('clicked')

        const fetchData = async () => {
            const formData = new FormData();
            formData.append('model', JSON.stringify({
                name: name,
                kz_name: name_kz,
                kz_description: description_kz,
                description: description,
                date: date,
                type: type,
                lang: 'eng'
            }));
            formData.append('file', image);

            try {
                const response = await axios.post(
                    `${base_url}/api/aml/course/createNews`, 
                    formData, 
                    {
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`,
                            'Content-Type': 'multipart/form-data' // This might be optional as axios sets it automatically when using FormData
                        },
                    }
                );

                alert("Новость создана");
                navigate('/manager');
            } catch (error) {
                console.log(error);
                alert("Ошибка")
            }
        };
        
        fetchData();
        setLoading(false);
    }

    const getDate = (date) => {
        let _date;

        if (date === null || date === undefined) {
            _date = new Date();
        } else {
            _date = new Date(date)
        }


        const day = String(_date.getDate()).padStart(2, '0');
        const month = String(_date.getMonth() + 1).padStart(2, '0'); // JavaScript months are 0-based
        const year = _date.getFullYear();

        // Assemble the components into the desired format
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }

    return ( 
        <div className="create-news-page">
            <BuilderNavbar />

            <div className="body">
                <div className="page-title">Создание новости</div>

                <div className="create-form">
                    <div>
                        <label>Название</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label>Название на казахском</label>
                        <input 
                            type="text" 
                            value={name_kz}
                            onChange={(e) => {
                                setName_kz(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label>Изображение</label>
                        <input 
                            type="file"
                            onChange={(e) => {
                                setImage(e.target.files[0])
                            }} 
                        />
                    </div>
                    <div>
                        <label>Описание</label>
                        <textarea
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label>Описание на казахском</label>
                        <textarea
                            value={description_kz}
                            onChange={(e) => {
                                setDescription_kz(e.target.value)
                            }}
                        />
                    </div>
                    <div className='actions'>
                        <div
                            className={`${isLoading ? 'loading' : null}`}
                            onClick={(e) => {
                                handleSaveCourse();
                            }}
                        >Сохранить</div>
                        <div
                            onClick={(e) => {
                                navigate('/manager');
                            }}
                        >Отменить</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateNews;