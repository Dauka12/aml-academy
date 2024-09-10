import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import logo from '../../assets/images/logo.svg';
import axios from 'axios';

import logo from '../../assets/images/logo.svg';
import backgroundVideo from '../../assets/video/bg.mp4';
import po_types from '../../components/data/po_types';
import po_typesEng from '../../components/data/po_typesEng';
import po_typesKz from '../../components/data/po_typesKz';
import go_types from './../../components/data/go_types';
import go_typesEng from './../../components/data/go_typesEng';
import go_typesKz from './../../components/data/go_typesKz';
import sfm_types from './../../components/data/sfm_types';
import sfm_typesEng from './../../components/data/sfm_typesEng';
import sfm_typesKz from './../../components/data/sfm_typesKz';
import './registration.scss';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { Box, Modal } from '@mui/material';
import base_url from '../../settings/base_url';

import { useTranslation } from 'react-i18next';


const Registration = () => {

    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        firstname: '',
        lastname: '',
        patronymic: '',
        phone_number: '',
        member_of_the_system: 'Государственные органы-регуляторы',
        type_of_member: '',
    });
    const [requiredFields, setRequiredFields] = useState({});

    useEffect(() => {

    }, [formData])

    const [errorMessage, setErrorMessage] = useState('');
    const [policyChecked, setPolicyChecked] = useState(false);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const handleChange = (e, name) => {
        e.preventDefault();
        setFormData({ ...formData, [name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const missingFields = {};
        console.log(policyChecked, ' adwa ', errorMessage);
        if (!formData['firstname']) {
            missingFields['firstname'] = true;
        }
        if (!formData['lastname']) {
            missingFields['lastname'] = true;
        }
        if (Object.keys(missingFields)?.length > 0) {
            setRequiredFields(missingFields);
            return;
        }

        // console.log(formData['password'], formData['confirm_password'])

        if (formData['password'] === formData['confirm_password']) {
            axios
                .post(`${base_url}/api/aml/auth/register`,
                    {
                        "firstname": formData['firstname'],
                        "lastname": formData['lastname'],
                        "patronymic": formData['patronymic'],
                        "email": formData['email'],
                        "phone_number": formData['phone_number'],
                        "password": formData['password'],
                        "member_of_the_system": formData['member_of_the_system'],
                        "type_of_member": formData['type_of_member'] === 'Выберите' ? '' : formData['type_of_member'],
                    }
                )
                .then(res => {
                    // console.log(res.data)
                    setOpenModal(true);
                    // navigate('/login');
                })
                .catch(error => {
                    // console.error('Registration failed:', error);
                    if (error.response) {
                        setErrorMessage(error.response.data.error)
                        // // console.log('Server Error:', error.response.data);
                    } else if (error.request) {
                        setErrorMessage(error.request.error)
                        // // console.log('Request Error:', error.request);
                    } else {
                        setErrorMessage(error.message.error)
                        // // console.log('Error:', error.message);
                    }
                })
        } else {
            alert('Пароли не совпадают.');
        }
    };

    const getItems = (entity_type) => {
        if (entity_type === (i18n.language === 'ru'
            ? 'Субъект финансового мониторнга'
            : i18n.language === 'kz'
                ? 'Қаржы мониторингі субъектісі'
                : 'The subject of financial monitoring')) {

            return (
                i18n.language === 'ru'
                    ? sfm_types
                    : i18n.language === 'kz'
                        ? sfm_typesKz
                        : sfm_typesEng
            );;
        }
        if (entity_type === (i18n.language === 'ru'
            ? 'Государственные органы-регуляторы'
            : i18n.language === 'kz'
                ? 'Мемлекеттік реттеуші органдар'
                : 'Government regulatory agencies')) {
            return (
                i18n.language === 'ru'
                    ? go_types
                    : i18n.language === 'kz'
                        ? go_typesKz
                        : go_typesEng
            );
        }
        if (entity_type === (i18n.language === 'ru'
            ? 'Правоохранительные органы'
            : i18n.language === 'kz'
                ? 'Құқық қорғау органдары'
                : 'Law enforcement agencies')) {
            return (
                i18n.language === 'ru'
                    ? po_types
                    : i18n.language === 'kz'
                        ? po_typesKz
                        : po_typesEng
            );
        } else {
            return [t('choice')];
        }
    };

    return (
        <div className='register-page'>
            <RegistationModal handleClose={() => {
                setOpenModal(false);
                navigate('/login')
            }} open={openModal} />
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
                        <InputField formData={formData} handleChange={handleChange} name={'firstname'} label={t('firstname')} hint={t('hintFirstname')} required={requiredFields['firstname']} />
                        {requiredFields['firstname'] && <div className='failedLogin' style={{ position: 'absolute', color: 'red', top: '290px', marginLeft: '10px' }}>{t('requiredField')}</div>}
                        <InputField formData={formData} handleChange={handleChange} name={'lastname'} label={t('lastname')} hint={t('hintLastname')} required={requiredFields['lastname']} />
                        <InputField formData={formData} handleChange={handleChange} name={'patronymic'} label={t('patronymic')} hint={t('hintPatronymic')} />
                        <InputField formData={formData} handleChange={handleChange} isPassword={true} name={'password'} label={t('password')} hint={t('hintPassword')} />
                        <InputField formData={formData} handleChange={handleChange} isPassword={true} name={'confirm_password'} label={t('confirm_password')} hint={t('hintConfirm_password')} />
                        <InputField formData={formData} handleChange={handleChange} name={'email'} label={t('email')} hint={t('hintEmail')} />
                        <InputField formData={formData} handleChange={handleChange} name={'phone_number'} label={t('phone_number')} hint={t('phone_number')} />
                        <SelectField
                            formData={formData}
                            handleChange={handleChange}
                            selectItems={[
                                t('member1'),
                                t('member2'),
                                t('member3'),
                                t('member4')
                            ]}
                            name={'member_of_the_system'}
                            label={t('member of the system')}
                        />

                        {
                            formData['member_of_the_system'] !== 'Общественное объединение'
                                ? (
                                    <SelectField
                                        formData={formData}
                                        handleChange={handleChange}
                                        selectItems={getItems(formData['member_of_the_system'])}
                                        name={'type_of_member'}
                                        label={t('sfmType')}
                                    />
                                )
                                : <InputField formData={formData} handleChange={handleChange} name={'type_of_member'} label={t('sfmType')} hint={t('hintSfm')} />
                        }
                    </div>
                    <div className='actions'>
                        <div className='policy'>
                            <div>
                                <input type="checkbox" onChange={(e) => {
                                    setPolicyChecked(e.target.checked);
                                }} />
                                <p>{t('consent1')} <Link to={'/privacy-policy'} target="_blank"><a>{t('consent2')}</a></Link></p>
                            </div>
                            {false ? <p className='policy-error'>Даю согласие на обработку</p> : null}
                        </div>
                        <div className='reg-btn' onClick={handleSubmit}>{t('regestration')}</div>
                        <div className='have-account'>{t('already')} <Link to={'/login'}><span>{t('enters')}</span></Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SelectField = ({ name, label, selectItems, formData, handleChange }) => {
    return (
        <div className='field'>
            <label htmlFor={name}>{label}</label>
            <div className="custom-select">
                <select id={name} value={formData[name]} onChange={(e) => handleChange(e, name)}>
                    {selectItems.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
                <div className="dropdown-icon" onClick={() => {
                    document.getElementById(name).click();
                }}></div>
            </div>
        </div>
    )
}

const InputField = ({ name, label, hint, isPassword, formData, handleChange, required }) => {
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
                    required={required}
                />
                {isPassword
                    ? (
                        <div className='show-password'>
                            {
                                !showPassword ?
                                    <AiFillEye style={{ cursor: 'pointer' }} size={23} onClick={() => {
                                        setShowPassword(prev => !prev)
                                    }} />
                                    :
                                    <AiFillEyeInvisible style={{ cursor: 'pointer' }} size={23} onClick={() => {
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

const RegistationModal = ({ open, handleClose }) => {
    return <Modal
        open={open}
        onClose={() => {
            handleClose();
        }}
    >
        <Box sx={{
            width: '590px',
            padding: '30px 55px',
            boxSizing: 'border-box',
            background: '#FFFFFF',
            borderRadius: '10px',
            outline: 'none',
            border: 'none',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <h1
                style={{
                    color: '#3A3939',
                    textAlign: 'center',
                    fontFamily: 'Ubuntu',
                    fontSize: '22px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '26px',

                    marginBottom: '15px'
                }}
            >Поздравляем с успешной регистрацией на нашем сайте</h1>
            <p style={{
                color: '#3A3939',
                textAlign: 'center',
                fontFeatureSettings: `'clig' off, 'liga' off`,
                fontFamily: 'Ubuntu',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '26px',

                marginBottom: '15px'
            }}>
                Для завершения процесса активации вашей учетной записи и получения дополнительной информации, <strong style={{ fontWeight: '700' }}>перейдите в свою почту</strong>.
            </p>
            <p style={{
                color: '#4D4D4D',
                textAlign: 'center',
                fontFeatureSettings: `'clig' off, 'liga' off`,
                fontFamily: 'Ubuntu',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '26px', /* 162.5% */

                marginBottom: '15px'
            }}>
                Если вы не видите наше сообщение в папке "Входящие", проверьте папку "Спам". Иногда письма могут туда попадать.
            </p>
            <a href={'https://mail.google.com'}
                style={{
                    width: 'max-content',
                    margin: '0 auto',
                    borderRadius: '8px',
                    background: '#1F3C88',
                    padding: '12px 96px',
                    color: '#FFF',
                    fontFeatureSettings: `'clig' off, 'liga' off`,
                    fontFamily: 'Manrope',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '24px', /* 150% */
                    letterSpacing: '0.2px',
                    cursor: 'pointer',
                    textDecoration: 'none'
                }}>
                Перейти на почту
            </a>
        </Box>
    </Modal>
}

export default Registration;
