import React, { useState } from 'react';

import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router';
import base_url from '../../../settings/base_url';
import { BuilderNavbar } from '../../adminCourse/builderNavbar/BuilderNavbar';
import '../style.scss';

function CreateNewsNextStep() {

    const location = useLocation();
    const axId = new URLSearchParams(location.search).get('id');
    const [currentID, setCurrentID] = useState(axId || 0);
    const { id } = useParams();

    const [name, setName] = useState('');
    const [name_kz, setName_kz] = useState('');
    const [description, setDescription] = useState('');
    const [description_kz, setDescription_kz] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('news');
    const [image, setImage] = useState('');
    const [imageKz, setImageKz] = useState('');
    const [language, setLanguage] = useState('ru');

    const [jwtToken, setJwtToken] = useState('');

    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();

    const storedJwtToken = localStorage.getItem('jwtToken');


    const handleSaveCourse = () => {
        setLoading(true);
        console.log('clicked')

        const fetchData = async () => {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('list', [
                {
                    'kz_description': name_kz,
                    'description': name,
                    'file': image,
                    'kz_file':imageKz
                }
            ]);

            try {
                const response = await axios.post(
                    `${base_url}/api/aml/course/addDescription`,
                    formData, 
                    {
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`,
                            'Content-Type': 'multipart/form-data'
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
                        <label>Изображение на казахском</label>
                        <input 
                            type="file"
                            onChange={(e) => {
                                setImageKz(e.target.files[0])
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

export default CreateNewsNextStep;