import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router';
import base_url from '../../settings/base_url';
import { BuilderNavbar } from '../adminCourse/builderNavbar/BuilderNavbar';
import './style.scss';

function CreateNews() {
    const [newsList, setNewsList] = useState([
        { name: '', name_kz: '', name_eng: '', image: '', image_kz: '', image_eng: ''}
    ]);
    const [name, setName] = useState('');
    const [nameKz, setNameKz] = useState('');
    const [nameEng, setEng] = useState('');
    const [file, setFile] = useState(null);
    const [fileKz, setFileKz] = useState(null);
    const [fileEng, setFileEng] = useState(null);

    const jwtToken = localStorage.getItem('jwtToken');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddNews = () => {
        setNewsList([...newsList, { name: '', name_kz: '', name_eng: '', image: '', image_kz: '', image_eng: ''}]);
    };
    const handleRemoveLastNews = () => {
        if (newsList?.length > 1) {
            setNewsList(newsList.slice(0, -1));
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedNewsList = [...newsList];
        updatedNewsList[index][field] = value;
        setNewsList(updatedNewsList);
    };

    const handleFileChange = (index, field, file) => {
        const updatedNewsList = [...newsList];
        updatedNewsList[index][field] = file;
        setNewsList(updatedNewsList);
    };

    const handleSaveNews = async () => {
        setLoading(true);

        const convertFileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };

        try {
            const newsDataPromises = newsList.map(async (newsItem) => {
                const imageBase64 = newsItem.image ? await convertFileToBase64(newsItem.image) : '';
                return {
                    description: newsItem.name,
                    image: imageBase64,
                };
            });
            const newsDataPromisesKz = newsList.map(async (newsItem) => {
                const imageKzBase64 = newsItem.image_kz ? await convertFileToBase64(newsItem.image_kz) : '';
                return {
                    description: newsItem.name_kz,
                    image: imageKzBase64,
                };
            });
            const newsDataPromisesEng = newsList.map(async (newsItem) => {
                const imageEngBase64 = newsItem.image_eng ? await convertFileToBase64(newsItem.image_eng) : '';
                return {
                    description: newsItem.name_eng,
                    image: imageEngBase64,
                };
            });

            const newsData = await Promise.all(newsDataPromises);
            const newsDataKz = await Promise.all(newsDataPromisesKz);
            const newsDataEng = await Promise.all(newsDataPromisesEng);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('kz_name', nameKz);
            formData.append('eng_name', nameEng);
            formData.append('file', file);
            formData.append('kz_file', fileKz);
            formData.append('eng_file', fileEng);
            formData.append('description', JSON.stringify(newsData));
            formData.append('kz_description', JSON.stringify(newsDataKz));
            formData.append('eng_description', JSON.stringify(newsDataEng));

            const response = await axios.post(
                `${base_url}/api/aml/course/createNews`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );
            alert("Новость создано");
            navigate(`/news-page/${response.data.id}`);
        } catch (error) {
            console.log(error);
            alert("Ошибка");
        } finally {
            setLoading(false);
        }
    };

    // Dropzone для главного изображения
    const MainImageDropzone = ({ onDrop, file }) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: 'image/*'
        });

        return (
            <div {...getRootProps({ className: 'dropzone' })} className="file-dropzone">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Перетащите сюда файл...</p>
                ) : (
                    <p>{file ? file.name : 'Перетащите файл или нажмите для выбора'}</p>
                )}
            </div>
        );
    };

    return (
        <div className="create-news-page">
            <BuilderNavbar />

            <div className="body">
                <div className="page-title">Создание новостей</div>

                <div className="create-form">
                    <div>
                        <label>Название</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Название на казахском</label>
                        <input
                            type="text"
                            value={nameKz}
                            onChange={(e) => setNameKz(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Название на английском</label>
                        <input
                            type="text"
                            value={nameEng}
                            onChange={(e) => setEng(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Изображение</label>
                        <MainImageDropzone
                            onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
                            file={file}
                        />
                    </div>
                    <div>
                        <label>Изображение на казахском</label>
                        <MainImageDropzone
                            onDrop={(acceptedFiles) => setFileKz(acceptedFiles[0])}
                            file={fileKz}
                        />
                    </div>
                    <div>
                        <label>Изображение на английском</label>
                        <MainImageDropzone
                            onDrop={(acceptedFiles) => setFileEng(acceptedFiles[0])}
                            file={fileEng}
                        />
                    </div>

                    {newsList.map((newsItem, index) => (
                        <div key={index} className="news-item">
                            <div>
                                <label>Описание</label>
                                <textarea
                                    type="text"
                                    value={newsItem.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Описание на казахском</label>
                                <textarea
                                    type="text"
                                    value={newsItem.name_kz}
                                    onChange={(e) => handleInputChange(index, 'name_kz', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Описание на английском</label>
                                <textarea
                                    type="text"
                                    value={newsItem.name_eng}
                                    onChange={(e) => handleInputChange(index, 'name_eng', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Изображение</label>
                                <MainImageDropzone
                                    onDrop={(acceptedFiles) => handleFileChange(index, 'image', acceptedFiles[0])}
                                    file={newsItem.image}
                                />
                            </div>
                            <div>
                                <label>Изображение на казахском</label>
                                <MainImageDropzone
                                    onDrop={(acceptedFiles) => handleFileChange(index, 'image_kz', acceptedFiles[0])}
                                    file={newsItem.image_kz}
                                />
                            </div>
                            <div>
                                <label>Изображение на английском</label>
                                <MainImageDropzone
                                    onDrop={(acceptedFiles) => handleFileChange(index, 'image_eng', acceptedFiles[0])}
                                    file={newsItem.image_eng}
                                />
                            </div>
                        </div>
                    ))}

                    <div className='actions' style={{display:'flex', justifyContent:'space-between'}}>
                        <div onClick={handleAddNews}>Добавить еще поле</div>
                        <div onClick={handleRemoveLastNews}>Удалить последнее поле</div>
                    </div>

                    <div className='actions'>
                        <div
                            className={`${isLoading ? 'loading' : null}`}
                            onClick={handleSaveNews}
                        >
                            Сохранить
                        </div>
                        <div
                            onClick={() => navigate('/manager')}
                        >
                            Отменить
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateNews;
