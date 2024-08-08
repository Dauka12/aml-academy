import axios from "axios";
import { useEffect, useState } from "react";
import base_url from "../../../../settings/base_url";
import "../editCatalog.scss";

export default function VebinarPage() {
    const [webinars, setWebinars] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [currentWebinar, setCurrentWebinar] = useState({
        type: '',
        name: '',
        webinar_for_member_of_the_system: '',
        description: '',
        date: '',
        link: '',
        multipartFile: null
    });
    const [showModal, setShowModal] = useState(false);
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        fetchWebinars();
    }, []);

    const fetchWebinars = () => {
        axios.get(`${base_url}/api/aml/webinar/getWebinars`, {
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

    const handleCreateWebinar = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('type', currentWebinar.type);
        formData.append('name', currentWebinar.name);
        formData.append('description', currentWebinar.description);
        formData.append('webinar_for_member_of_the_system', currentWebinar.webinar_for_member_of_the_system);

        // Format date to ISO string
        const isoDate = new Date(currentWebinar.date).toISOString();
        formData.append('date', isoDate);

        formData.append('link', currentWebinar.link);

        if (currentWebinar.multipartFile) {
            formData.append('multipartFile', currentWebinar.multipartFile);
        }

        axios.post(`${base_url}/api/aml/webinar/createWebinar`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(() => {
                fetchWebinars();
                alert('Вебинар успешно создан');
                setShowModal(false);
            })
            .catch((error) => {
                console.error('Error creating webinar:', error);
                alert('Ошибка');
            });
    };

    const openModal = () => {
        setCurrentWebinar({
            type: '',
            name: '',
            webinar_for_member_of_the_system: '',
            description: '',
            date: '',
            link: '',
            multipartFile: null
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentWebinar({
            type: '',
            name: '',
            webinar_for_member_of_the_system: '',
            description: '',
            date: '',
            link: '',
            multipartFile: null
        });
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
            <button className="create-button" onClick={openModal}>Создать вебинар</button>
            {isLoading ? (
                "Загрузка..."
            ) : (
                <div className="webinar-grid">
                    {webinars.map((webinar, index) => (
                        <div className="webinar-card" key={index}>
                            <div className="img-webinar">
                                <img src={webinar.image} alt="webinar" style={{ width: '290px', height: '300px' }} />
                            </div>
                            <div className="text-of-card">
                                <h2>{webinar.name}</h2>
                                <p>Дата: {webinar.date}</p>
                                <p>{webinar.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="modal-webinar">
                    <div className="modal-content-webinar">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <form onSubmit={handleCreateWebinar}>
                            <input
                                type="text"
                                name="type"
                                placeholder="Тип"
                                value={currentWebinar.type}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="name"
                                placeholder="Название"
                                value={currentWebinar.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="webinar_for_member_of_the_system"
                                placeholder="Аудитория"
                                value={currentWebinar.webinar_for_member_of_the_system}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Описание"
                                value={currentWebinar.description}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="datetime-local"
                                name="date"
                                placeholder="Дата"
                                value={currentWebinar.date}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="link"
                                placeholder="URL"
                                value={currentWebinar.link}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="file"
                                name="multipartFile"
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">Создать</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
