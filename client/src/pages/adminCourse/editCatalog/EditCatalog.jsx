import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import base_url from "../../../settings/base_url";
import { BuilderNavbar } from "../builderNavbar/BuilderNavbar";
import archiveIcon from '../images/archive-icon.svg';
import folderIcon from '../images/folder-icon.png';
import AddToCourse from "./add-to-course";
import Confirm from "./confirm";
import CourseBlock from './courseBlock';
import CourseBlockSkeleton from './courseBlock/CourseBlockSkeleton';
import './editCatalog.scss';
import EventAdminPage from "./event-admin-page";
import NewsList from './news-list';
import RequestTable from './requests-to-course';
import VebinarArchivePage from "./vebinar-archive-page";
import VebinarPage from "./vebinar-page";
import StatsPage from "./stats-page";





const EditCatalog = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [deletingCourse, setDeletingCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState({ course_id: 0, course_name: "" });
    const [selectedPage, setSelectedPage] = useState('draftPage');
    const [requestData, setRequestData] = useState([]);
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [count, setCount] = useState(1);

    const fetchDataCourses = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(base_url + '/api/aml/course/editcatalog');
            setCourses(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (selectedPage === 'draftPage') {
            fetchDataCourses();
        }
    }, [fetchDataCourses, selectedPage]);

    useEffect(() => {
        axios.get(base_url + "/api/aml/course/getRequest")
            .then((res) => {
                setRequestData(res.data);
            });
    }, []);

    useMemo(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${base_url}/api/aml/course/getAllNews`, {
                    params: {
                        type: 'news',
                    },
                });
                setNewsData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        if (selectedPage === 'newsPage') {
            fetchData();
        }
    }, [selectedPage, count]);

    useMemo(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(base_url + "/api/aml/course/getRequest");
                setRequestData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        if (selectedPage === 'requestPage') {
            fetchData();
        }
    }, [selectedPage]);

    const closeModal = () => {
        setDeletingCourse(false);
    };
    const token = localStorage.getItem('jwtToken')
    const handleDelete = (id) => {
        axios.delete(`${base_url}/api/aml/course/deleteNews`, {
            headers: {
                'Authorizaton': 'Bearer ' + token
            },
            params: {
                'id': id
            }
        }).then(() => {
            setCount(count + 1)
            alert('новость удалена')
        })
    }

    const deleteCourse = (course_id) => {
        axios.post(base_url + '/api/aml/course/deleteCourse', null, {
            params: {
                id: course_id,
            },
        })
            .then((res) => {
                setCourses(res.data.body);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const setCourse = (course_id, course_name) => {
        setSelectedCourse({ course_id, course_name });
    };

    const publishCourse = (course_id) => {
        axios.post(base_url + '/api/aml/course/publishCourse', null, {
            params: {
                id: course_id,
            },
        })
            .then((res) => {
                // Optionally update the course list
            });
    };

    return (
        <div>
            <BuilderNavbar />
            <div className="tab-content">
                {deletingCourse ? (
                    <Confirm course_title={selectedCourse.course_name} course_id={selectedCourse.course_id} closeModal={closeModal} deleteCourse={deleteCourse} />
                ) : ""}
                <div className="tab">
                    <div className='creation-left-bar'>
                        <p className='title'>Админ панель</p>
                        <div className='folders'>
                            <div onClick={() => setSelectedPage('draftPage')}
                                 className={`folder ${selectedPage === 'draftPage' ? "active" : ""}`}>
                                <img src={archiveIcon} alt="arch"/>
                                <p>Архив курсов</p>
                            </div>
                            <div onClick={() => setSelectedPage('coursesPage')}
                                 className={`folder ${selectedPage === 'coursesPage' ? "active" : ""}`}>
                                <img src={folderIcon} alt=""/>
                                <p>Курсы</p>
                            </div>
                            <div onClick={() => setSelectedPage('newsPage')}
                                 className={`folder ${selectedPage === 'newsPage' ? "active" : ""}`}>
                                <img src={folderIcon} alt=""/>
                                <p>Новости</p>
                            </div>
                            <div onClick={() => setSelectedPage('requestPage')}
                                 className={`folder ${selectedPage === 'requestPage' ? "active" : ""}`}>
                                <img src={folderIcon} alt=""/>
                                <p>Заявки</p>
                            </div>
                            <div onClick={() => setSelectedPage('VebinarArchivePage')}
                                 className={`folder ${selectedPage === 'VebinarArchivePage' ? "active" : ""}`}>
                                <img src={folderIcon} alt=""/>
                                <p>Архив Вебинаров</p>
                            </div>
                            <div onClick={() => setSelectedPage('VebinarPage')}
                                 className={`folder ${selectedPage === 'VebinarPage' ? "active" : ""}`}>
                                <img src={folderIcon} alt=""/>
                                <p>Активные Вебинары</p>
                            </div>
                            <div onClick={() => setSelectedPage('EventPage')}
                                 className={`folder ${selectedPage === 'EventPage' ? "active" : ""}`}>
                                <img src={folderIcon} alt=""/>
                                <p>Мероприятия</p>
                            </div>
                            <div onClick={() => setSelectedPage('StatsPage')}
                                 className={`folder ${selectedPage === 'StatsPage' ? "active" : ""}`}>
                                <img src={folderIcon} alt=""/>
                                <p>Статистика по сайту</p>
                            </div>
                        </div>
                        <div onClick={() => {
                            navigate(
                                selectedPage === 'newsPage'
                                    ? "/create-news"
                                    : selectedPage === 'requestPage'
                                        ? ""
                                        : selectedPage === 'EventPage' ? "/create-event" : '/new-admin-page'
                            );
                        }} className='create-course-button'>
                            <p>
                                {
                                    selectedPage === 'newsPage'
                                        ? "Добавить новость"
                                        : selectedPage === 'requestPage'
                                            ? null
                                            : selectedPage === 'EventPage' ? "Создать мероприятие" : "Создать курс"
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="builder-body">
                    <div className="catalog">
                        <div className="drafts">
                            <h1>
                                {
                                    selectedPage === 'draftPage'
                                        ? "Архив курсов"
                                        : selectedPage === 'coursesPage'
                                            ? "Курсы"
                                            : selectedPage === 'newsPage'
                                                ? "Новости"
                                                : selectedPage === 'requestPage'
                                                    ? "Заявки на курсы"
                                                    : selectedPage === 'VebinarArchivePage'
                                                        ? "Архив Вебинаров"
                                                        : selectedPage === 'EventPage'
                                                            ? "Мероприятия"
                                                            : selectedPage === 'StatsPage'
                                                                ? "Статистика по сайту"
                                                                : "Активные Вебинары"
                                }
                            </h1>
                            <div className={selectedPage === 'StatsPage' ? '' : 'course-grid' }>
                                {isLoading ? [...new Array(12)].map((i) => <CourseBlockSkeleton key={i} />) : (
                                    selectedPage === 'draftPage' || selectedPage === 'coursesPage'
                                        ? (
                                            courses.filter((x) => x.draft === (selectedPage === 'draftPage')).map((x, index) => (
                                                <CourseBlock x={x} index={index} setDeletingCourse={setDeletingCourse}
                                                    setCourse={setCourse} publishCourse={publishCourse}
                                                />
                                            ))
                                        ) : selectedPage === 'newsPage' ? (
                                            <NewsList newsData={newsData} handleDelete={handleDelete} />
                                        ) : selectedPage === 'requestPage' ? (
                                            <RequestTable requestData={requestData} />
                                        ) : selectedPage === 'VebinarArchivePage' ? (
                                            <VebinarArchivePage />
                                        ) : selectedPage === 'EventPage' ? (
                                            <EventAdminPage />
                                        ) : selectedPage === 'StatsPage' ? (
                                            <StatsPage/>
                                        ) : (
                                            <VebinarPage />
                                        )
                                )}
                            </div>
                            {(selectedPage === 'draftPage' || selectedPage === 'coursesPage') && (
                                <AddToCourse/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCatalog;
