import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useParams } from 'react-router';
import base_url from '../../../settings/base_url';
import { BuilderNavbar } from '../../adminCourse/builderNavbar/BuilderNavbar';
import '../style.scss';

function ChangeNews() {
    const [newsList, setNewsList] = useState([
        { name: '', name_kz: '', image: '', image_kz: '' }
    ]);
    const [name, setName] = useState('');
    const [nameKz, setNameKz] = useState('');
    const [file, setFile] = useState(null);
    const [fileKz, setFileKz] = useState(null);

    const jwtToken = localStorage.getItem('jwtToken');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/course/getNewsById`, {
                    params: {
                        id: id
                    }
                });
                const fetchedDescription = JSON.parse(response.data.description);
                const fetchedKzDescription = JSON.parse(response.data.kz_description);
                setName(response.data.name);
                setNameKz(response.data.kz_name);
                const combinedNewsList = fetchedDescription.map((item, index) => ({
                    name: item.description,
                    name_kz: fetchedKzDescription[index]?.description || '',
                    image: item.image,
                    image_kz: fetchedKzDescription[index]?.image || ''
                }));
                setFile(response.data.image)
                setFileKz(response.data.kz_image)
                setNewsList(combinedNewsList)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const handleAddNews = () => {
        setNewsList([...newsList, { name: '', name_kz: '', image: '', image_kz: '' }]);
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
                const imageBase64 = typeof newsItem.image !== 'string' && newsItem.image  ? await convertFileToBase64(newsItem.image) : typeof newsItem.image === 'string' && newsItem.image ? newsItem.image : '';
                return {
                    description: newsItem.name,
                    image: imageBase64,
                };
            });
            const newsDataPromisesKz = newsList.map(async (newsItem) => {
                const imageKzBase64 = typeof newsItem.image_kz !== 'string' && newsItem.image_kz ? await convertFileToBase64(newsItem.image) : typeof newsItem.image_kz === 'string' && newsItem.image_kz ? newsItem.image_kz : '';
                return {
                    description: newsItem.name_kz,
                    image: imageKzBase64,
                };
            });

            const newsData = await Promise.all(newsDataPromises);
            const newsDataKz = await Promise.all(newsDataPromisesKz);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('kz_name', nameKz);
            formData.append('file', typeof file === 'string' ? null : file);
            formData.append('kz_file', typeof fileKz === 'string' ? null : fileKz);
            formData.append('description', JSON.stringify(newsData));
            formData.append('kz_description', JSON.stringify(newsDataKz));
            formData.append('id', id);

            const response = await axios.put(
                `${base_url}/api/aml/course/editNews`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'multipart/form-data'
                    },
                },
            );
            alert("Новость изменена");
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
                <div className="page-title">Изменение новостей</div>

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
                        <label>Обложка</label>
                        <MainImageDropzone
                            onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
                            file={file}
                        />
                        <img src={file} style={{width:'80px', marginLeft:'30px'}} alt="Изображение" />
                    </div>
                    <div>
                        <label>Обложка казахской версии</label>
                        <MainImageDropzone
                            onDrop={(acceptedFiles) => setFileKz(acceptedFiles[0])}
                            file={fileKz}
                        />
                        <img src={fileKz} style={{width:'80px', marginLeft:'30px'}} alt="Изображение на казахском" />
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
                                <label>Изображение</label>
                                <MainImageDropzone
                                    onDrop={(acceptedFiles) => handleFileChange(index, 'image', acceptedFiles[0])}
                                    file={newsItem.image}
                                />
                                <img src={newsItem?.image} style={{width:'80px', marginLeft:"30px"}} alt="Изображение" />
                            </div>
                            <div>
                                <label>Изображение на казахском</label>
                                <MainImageDropzone
                                    onDrop={(acceptedFiles) => handleFileChange(index, 'image_kz', acceptedFiles[0])}
                                    file={newsItem.image_kz}
                                />
                                <img src={newsItem?.image_kz} style={{width:'80px', marginLeft:"30px"}} alt="Изображение" />
                            </div>
                        </div>
                    ))}

                    <div className='actions' style={{ display: 'flex', justifyContent: 'space-between' }}>
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

export default ChangeNews;
