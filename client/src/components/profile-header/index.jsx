import React, { useState, useEffect } from 'react';

import './style.scss'
import {BiSolidMessageDetail} from 'react-icons/bi';

import ProfileImg from './profile-img.png'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

import base_url from '../../settings/base_url';

function ProfileHeader({ handleRedact }) {
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');

    const [isEdit, setIsEdit] = useState(false);

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/auth/userInfo`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                // console.log(response);

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

    const _handleRedact = () => {
        setIsEdit(prev => !prev)
        // console.log(isEdit)
        handleRedact();
    }

    return ( 
        <div className="profile-header">
            <div className="profile-img">
                <div className="gradient"></div>
                {/* <img src={ProfileImg} alt=""/> */}
                <div className="initials-img">
                    <span>{data ? data['firstname'].substring(0, 1) : ''}</span>
                    <span>{data ? data['lastname'].substring(0, 1) : ''}</span>
                </div>
            </div>
            <div className="profile-header-info">
                <div>
                    <div className="name">
                        {data ? data['firstname'] : ''} {data ? data['lastname'] : ''} { data ? data['patronymic'] : ''}
                    </div>
                    <div className="subject-org">
                        {data ? data['type_of_member'] : ''}
                    </div>
                </div>
                <div className="actions">
                    <div className="message">
                        <BiSolidMessageDetail/>
                    </div>
                    <div className="redact" onClick={_handleRedact}>
                        {
                            isEdit ? 'Сохранить' : 'Редактировать'
                        }
                    </div>
                    <div className="upload-img">
                        Загрузить фото
                    </div>
                </div>
            </div>
        </div>
     );
}

export default ProfileHeader;