import axios from "axios";
import { useEffect, useState } from "react";
import base_url from "../../../../settings/base_url";
import "../editCatalog.scss";

export default function VebinarArchivePage() {
    const [webinars, setWebinars] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [modalType, setModalType] = useState(null);
    const [currentWebinar, setCurrentWebinar] = useState({});
    const [showModal, setShowModal] = useState(false);
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        fetchWebinars();
    }, []);

    const fetchWebinars = () => {
        axios.get(`${base_url}/api/aml/webinar/archive/getWebinars`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
        })
            .then((res) => {
                setWebinars(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching webinars:", error);
                setLoading(false);
            });
    };

    const handleCreateUpdateWebinar = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Добавление текстовых данных как multipart/form-data
        formData.append('data', JSON.stringify({
            webinar_name: currentWebinar.webinar_name,
            webinar_description: currentWebinar.webinar_description,
            webinar_url: currentWebinar.webinar_url,
            webinar_date: currentWebinar.webinar_date,
            webinar_for_member_of_the_system: currentWebinar.webinar_for_member_of_the_system
        }));

        // Добавление файла, если он существует
        if (currentWebinar.webinar_image) {
            formData.append('file', currentWebinar.webinar_image);
        }

        const url = modalType === 'create'
            ? `${base_url}/api/aml/webinar/archive/createWebinar`
            : `${base_url}/api/aml/webinar/archive/updateWebinar/${currentWebinar.webinarA_id}`;

        axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(() => {
                fetchWebinars();
                alert(`Вебинар успешно ${modalType === 'create' ? 'создан' : 'изменен'}`);
                setShowModal(false);
            })
            .catch((error) => {
                if (error.response && error.response.status === 403) {
                    console.error("Authorization error. Please check your permissions.");
                } else {
                    console.error(`Error ${modalType === 'create' ? 'creating' : 'updating'} webinar:`, error);
                }
            });
    };


    const handleDeleteWebinar = (id) => {
        if (window.confirm('Вы точно хотите удалить этот вебинар?')) {
            axios.delete(`${base_url}/api/aml/webinar/archive/deleteWebinar/${id}`, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            })
                .then(() => {
                    fetchWebinars();
                    alert('Вебинар успешно удален');
                })
                .catch((error) => {
                    console.error("Error deleting webinar:", error);
                });
        }
    };

    const openModal = (type, webinar = {}) => {
        setModalType(type);
        setCurrentWebinar(webinar);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentWebinar({});
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setCurrentWebinar({ ...currentWebinar, [name]: files[0] });
        } else {
            setCurrentWebinar({ ...currentWebinar, [name]: value });
        }
    };

    return (
        <div>
            <button className="create-button" onClick={() => openModal('create')}>Создать вебинар</button>
            {isLoading ? (
                "Загрузка..."
            ) : (
                <div className="webinar-grid">
                    {webinars.map((webinar, index) => (
                        <div className="webinar-card" key={index}>
                            <div className="img-webinar">
                                <img src={webinar.webinar_image} alt="webinar" style={{ width: '290px', height: '300px' }} />
                            </div>
                            <div className="text-of-card">
                                <h2>{webinar.webinar_name}</h2>
                                <p>Дата: {webinar.webinar_date}</p>
                                <p>{webinar.webinar_description}</p>
                            </div>
                            <button className="edit-button" onClick={() => openModal('edit', webinar)}>Изменить</button>
                            <button className="delete-button" onClick={() => handleDeleteWebinar(webinar.webinarA_id)}>Удалить</button>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="modal-webinar">
                    <div className="modal-content-webinar">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <form onSubmit={handleCreateUpdateWebinar}>
                            <input
                                type="text"
                                name="webinar_name"
                                placeholder="Название"
                                value={currentWebinar.webinar_name || ''}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="webinar_description"
                                placeholder="Описание"
                                value={currentWebinar.webinar_description || ''}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="webinar_date"
                                placeholder="Дата"
                                value={currentWebinar.webinar_date || ''}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="webinar_url"
                                placeholder="URL"
                                value={currentWebinar.webinar_url || ''}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="webinar_for_member_of_the_system"
                                placeholder="Для участников системы"
                                value={currentWebinar.webinar_for_member_of_the_system || ''}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="file"
                                name="webinar_image"
                                onChange={handleChange}
                                required={modalType === 'create'}
                            />
                            <button type="submit">{modalType === 'create' ? 'Создать' : 'Изменить'}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};