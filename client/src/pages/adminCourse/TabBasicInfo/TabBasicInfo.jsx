import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base_url from '../../../settings/base_url';
import plusSign from '../images/pluc-image.svg';
import base64Course from './course-default';
import './tabBasicInfo.scss';

function fileToBase64(file, callback) {
    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
        if (typeof callback === 'function') {
            callback(reader.result);
        }
    };

    reader.readAsDataURL(file);
}

const TabBasicInfo = ({ id, nextStep, title: initialTitle, audience: initAud, lang: initLang, category: initCTG, price: initPrice, image: initImage }) => {
    const [title, setTitle] = useState(initialTitle || "")
    const [audience, setAudience] = useState(initAud || "")
    const [lang, setLang] = useState(initLang || "ru")
    const [category, setCategory] = useState(initCTG || 0)
    const [price, setPrice] = useState(initPrice || 0)
    const [image, setImage] = useState(initImage || "")

    const [imageSource, setImageSource] = useState('');

    const [defImage, setDefImage] = useState(true)

    const [editingExisting, setEditingExisting] = useState(false)

    useEffect(() => {
        if (id != 0) {
            axios
                .get(base_url + "/api/aml/course/basicInfoCourse", {
                    params: {
                        id: id
                    }
                })
                .then((res) => {
                    setTitle(res.data.course_name || "")
                    setAudience(res.data.course_for_member_of_the_system || "")
                    setCategory(res.data.courseCategory ? res.data.courseCategory.category_id : 0)
                    setPrice(res.data.course_price || 0)
                    setImage(res.data.course_image || "")
                    setEditingExisting(true)
                })
        }
    }, [id])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        fileToBase64(selectedFile, (base64String) => {
            setImage(base64String)
            setDefImage(false)
        });
    };

    const saveAndNext = () => {

        let urlPath = '/api/aml/course/saveBasicInfoDraft'

        if (editingExisting) {
            urlPath = '/api/aml/course/updateBasicInfo/' + id
        }
        let formData = {
            title,
            audience,
            lang,
            category,
            price,
            image,
        };

        // Check if any of the values are still in their initial state
        if (
            Object.values(formData).some(value => value === '' || value === 0)
        ) {
            // Alert the user to fill in all the fields
            alert('Для продолжения необходимо заполнить все поля');
        } else {
            formData = {
                title,
                audience,
                lang,
                category,
                price,
                image: image,
            };

            axios
                .post(base_url + urlPath, formData)
                .then((res) => {
                    // console.log(res.data)
                    nextStep(res.data);
                })

            // Call your nextStep function or perform any other action
        }
    }

    return (
        <div className="tab-container">
            <h1>Основные данные</h1>
            <div className="inputs">
                <div className="text-inputs">
                    <div className="input-title">
                        <label htmlFor="title">Введите название курса</label>
                        <input value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }} type="text" name="title" id="cheese" placeholder="" />
                    </div>
                    <div className="other-basic-inputs">
                        <div className="input-audience">
                            <label htmlFor="audience">Аудитория (Тип Субъекта)</label>
                            <select value={audience} onChange={(e) => {
                                setAudience(e.target.value)
                            }} name="audience" id="audience">
                                <option value="">--Выберите тип субъекта--</option>
                                <option value="Государственные органы-регуляторы">Государственные органы-регуляторы</option>
                                <option value="Субъект финансового мониторнга">Субъект финансового мониторнга</option>
                                <option value="Правоохранительные">Правоохранительные органы</option>
                                <option value="Общественное объединение">Общественное объединение</option>
                                <option value="Для всех субъектов">Для всех субъектов</option>
                            </select>
                        </div>
                        <div className="input-lang">
                            <label htmlFor="language">Язык курса</label>
                            <select value={lang} onChange={(e) => {
                                setLang(e.target.value)
                            }} name="language" id="language">
                                <option value="">--Выберите язык курса--</option>
                                <option value="ru">Русский</option>
                                <option value="en">Английский</option>
                                <option value="kz">Казахский</option>
                            </select>
                        </div>
                        <div className="input-category">
                            <label htmlFor="category">Категория</label>
                            <select value={category} onChange={(e) => {
                                setCategory(e.target.value)
                            }} name="category" id="category">
                                <option value="">--Выберите категорию--</option>
                                <option value={1}>AML Academy</option>
                            </select>
                        </div>
                        <div className="input-price">
                            <label htmlFor="price">Цена</label>
                            <input value={price} onChange={(e) => {
                                setPrice(e.target.value)
                            }} type="number" min="0" name="price" id="price" />
                        </div>
                    </div>
                </div>
                <div className="photo-input">
                    <h1>Обложка курса</h1>

                    <div className='image-box'>

                        {image == "" ?
                            <label htmlFor="photo">
                                <img className="plus-sign" src={plusSign} alt="+"></img>
                            </label>
                            :
                            <label htmlFor="photo">
                                <img className="image-album" src={image} alt="+"></img>
                            </label>
                        }
                        <input onChange={handleFileChange} className="input-image" type="file" id="photo" name="photo" accept="image/png, image/jpeg, image/jpg" />

                    </div>
                    <div>
                        <input onChange={handleFileChange} type="file" id="photo" name="photo" accept="image/png, image/jpeg" />
                    </div>
                    <div className={` ${defImage ? 'checked' : 'unchecked'}`} >
                        <input checked={defImage} onChange={(e) => {
                            if (defImage) {
                                setImage("")
                                setDefImage(!defImage)
                            } else {
                                setImage(base64Course)
                                setImageSource(plusSign)
                                setDefImage(!defImage)
                            }
                        }} type="checkbox" id="default" name="default" value="default" />
                        <label htmlFor="default">Использовать обложку по умолчанию</label>
                    </div>
                </div>

            </div>
            <div className='submit-or-back'>
                <a className='button-next' onClick={saveAndNext}>Перейти далее</a>
                <a className='button-back'>Вернутся назад</a>
            </div>
        </div>
    )
}

export default TabBasicInfo