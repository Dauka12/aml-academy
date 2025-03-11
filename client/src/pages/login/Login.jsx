import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import logo from '../../assets/images/favicon.ico';
import axios from 'axios';

import logo from '../../assets/images/logo.svg';
import backgroundVideo from '../../assets/video/bg.mp4';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import './login.scss';

import { useAuth } from '../../auth/AuthContext';
import base_url from '../../settings/base_url';

import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import OlympiadPromoButton from '../../features/olympiad/components/OlympiadPromoButton';

const Registration = () => {

    const { t } = useTranslation();

    const { setIsLoggedIn, setAuthUser } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [rememberMe, setRememberMe] = useState(true);
    const [openModal, setOpenModal] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

    }, [formData])

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e, name) => {
        e.preventDefault();
        setFormData({ ...formData, [name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        axios
            .post(`${base_url}/api/aml/auth/authenticate`,
                {
                    "email": formData['email'],
                    "password": formData['password'],
                }
            ).then(res => {
                // console.log(res.data)

                localStorage.setItem('role', res.data.body.user.authorities[0]?.authority)
                localStorage.setItem('jwtToken', res.data.body.token);
                localStorage.setItem('email', res.data.body.user.email);
                localStorage.setItem('user_id', res.data.body.user.user_id);
                localStorage.setItem('firstname', res.data.body.user.firstname);
                localStorage.setItem('lastname', res.data.body.user.lastname);
                localStorage.setItem('member_of_the_system', res.data.body.user.member_of_the_system);

                // console.log(res.data)

                setIsLoggedIn(true);
                setAuthUser(res.data.body.user);
                setError('');
            })
            .catch(error => {
                console.error('Registration failed:', error);
                setError('Неправильно указан логин или пароль!')
                console.log(error);
                if (error.response) {
                    setErrorMessage(error.response.data.error)
                    // console.log('Server Error:', error.response.data);
                } else if (error.request) {
                    setErrorMessage(error.request.error)

                    // console.log('Request Error:', error.request);
                } else {
                    setErrorMessage(error.message.error)

                    // console.log('Error:', error.message);
                }

                // console.log(error)
            })
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };


    return (
        <div className='login-page' onKeyDown={handleKeyDown}>
            <OlympiadPromoButton />
            <Helmet>
                <script type="application/ld+json">
                    {`
                        {
                        "@context": "http://schema.org",
                        "@type": "VideoObject",
                        "name": "Задний фон",
                        "description": "Задний фон",
                        "thumbnailUrl": "https://www.amlacdemy.kz/static/media/image.png",
                        "uploadDate": "2024-07-14T08:57:20Z",
                        "contentUrl": "https://www.amlacdemy.kz/static/media/ssssssss.78b66217f6905b1add0c.mp4",
                        "embedUrl": "https://www.amlacdemy.kz/static/media/ssssssss.78b66217f6905b1add0c.mp4"
                        }
                    `}
                </script>
            </Helmet>
            <div className='backgroundVideo'>
                <video autoPlay loop muted className='bg-video'>
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            </div>
            <div className='form-container'>

                <img className='logo' src={logo} alt="academy logo" />
                <h1>{t('welcome')}</h1>


                <div className="form-body">
                    <div className='fields'>
                        <InputField
                            formData={formData}
                            handleChange={handleChange}
                            name={'email'}
                            label={t('email')}
                            hint={t('hintEmail')}
                        />

                        <InputField
                            formData={formData}
                            handleChange={handleChange}
                            name={'password'}
                            label={t('password')}
                            hint={t('hintPassword1')}
                            isPassword={true}
                        />
                    </div>
                    {error && <div className="failedLogin">{error}</div>}
                    <div className='actions'>
                        <div className='reg-btn' onClick={(event) => handleSubmit(event)}>{t('login')}</div>
                        <div className='have-account'><Link to={'/registration'}><span>{t('newaccount')}</span></Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ name, label, hint, isPassword, formData, handleChange }) => {
    const [showPassword, setShowPassword] = useState(
        isPassword
    );

    return (
        <div className='field'>
            <label htmlFor={name}>{label}</label>
            <div>
                <input
                    placeholder={hint}
                    value={formData[name]}
                    type={showPassword
                        ? 'password'
                        : 'text'}
                    name={name}
                    onChange={(e) => handleChange(e, name)}
                />
                {isPassword
                    ? (
                        <div className='show-password'>
                            {
                                !showPassword ?
                                    <AiFillEyeInvisible style={{ cursor: 'pointer' }} size={23} onClick={() => {
                                        setShowPassword(prev => !prev)
                                    }} />
                                    :
                                    <AiFillEye style={{ cursor: 'pointer' }} size={23} onClick={() => {
                                        setShowPassword(prev => !prev)
                                    }} />
                            }
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Registration;
