import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillFolder, AiFillStar } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { MdOndemandVideo } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import base_url from "../../settings/base_url";
import { useCategoryFormat } from '../Context/Context.jsx';

function Catalog() {
    // Add this state to control dark mode
    const [darkMode, setDarkMode] = useState(false);
    const [imagesHidden, setImagesHidden] = useState(false);
    const [letterInterval, setLetterInterval] = useState("standard");
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const [modalOpen, setModalOpen] = useState(false);
    const [coursesData, setCoursesData] = useState("");

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "/api/aml/course/getUserCourses";
                const url1 = "/api/aml/course/getUserCoursesNoPr";
                let response = null;
                if (jwtToken != null) {
                    response = await axios.get(`${base_url}${url}`, {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    });
                } else {
                    response = await axios.get(`${base_url}${url1}`);
                }
                console.log(response.data);

                let courses = [
                    ...response.data,
                ];
                
                const _coursesByCategory = {};
                if (response.status === 200) {
                    courses.forEach((course) => {
                        if (course.courseDTO.type_of_study === 'дистанционное') {
                            const categoryName = course.courseDTO.courseCategory.category_name;
                            if (!_coursesByCategory[categoryName]) {
                                _coursesByCategory[categoryName] = [];
                            }
                            _coursesByCategory[categoryName].push(course);
                        }
                    });
                    
                    const _groupedCourses = {};
                    courses.forEach(course => {
                        if (course.courseDTO.type_of_study === 'онлайн') {
                            const group = course.courseDTO.course_image;
                            if (!_groupedCourses[group]) {
                                _groupedCourses[group] = [];
                            }
                            _groupedCourses[group].push(course);
                        }
                    });
                    console.log(_groupedCourses);

                    setCoursesByCategory(_coursesByCategory);
                    setGroupedCourses(_groupedCourses)
                    setData(response.data);
                } else {
                    setError(response.statusText);
                }
            } catch (error) {
                setError(error);
                console.error(error);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    const [activeTab, setActiveTab] = useState(1);

    const location = useLocation();
    
    useEffect(() => {
        const hash = location.hash;
        console.log(hash)
        if (hash === '#top') {
            window.scrollTo(0, 0);
        }
    }, []);

    const navigate = useNavigate();
    
    const handleApplication = (rowId) => {
        console.log('Application submitted for row:', rowId);
    };
    
    const ApplicationModal = ({ open, handleClose, courseId, courseName }) => {
        const [fullName, setFullName] = useState('');
        const [contacts, setContacts] = useState('');
        const [email, setEmail] = useState('');

        const handleSubmit = () => {
            setLoading(true);
            console.log('clicked')

            const fetchData = async () => {
                const formData = new FormData();
                formData.append('userCourse', JSON.stringify({
                    fio: fullName,
                    phone_number: contacts,
                    email: email,
                    progress_percentage: 0.0
                }));

                try {
                    const response = await axios.post(
                        `${base_url}/api/aml/course/saveUserRequest/course/${selectedCourseId}`,
                        formData,
                        {}
                    );
                    console.log(fullName);
                    alert("Заявка отправлена!!!");
                    handleCloseModal()
                } catch (error) {
                    console.log(error);
                    alert("Ошибка")
                }
            };
            
            const updatedCoursesData = { ...coursesData };
            Object.keys(updatedCoursesData).forEach(group => {
                updatedCoursesData[group].forEach(course => {
                    if (course.courseDTO.course_id === selectedCourseId) {
                        course.courseDTO.rating += 1;
                    }
                })
            });
            setCoursesData(updatedCoursesData);

            fetchData();
            setLoading(false);
        }

        return (
            <Dialog open={open} onClose={handleClose} PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    handleSubmit();
                    handleClose();
                },
            }}>
                <DialogTitle>Подать заявку на курс</DialogTitle>
                <DialogContent>
                    <TextField
                        label="ФИО"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        fullWidth
                        required
                        id="fio"
                        margin="normal"
                    />
                    <TextField
                        label="Контакты"
                        value={contacts}
                        onChange={(e) => setContacts(e.target.value)}
                        fullWidth
                        id="contacts"
                        required
                        margin="normal"
                    />
                    <TextField
                        required
                        margin="normal"
                        id="email"
                        label="Электронная почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        type="email"
                    />
                    <TextField
                        label="Курс"
                        value={courseName}
                        readOnly={true}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button type="submit" color="primary">
                        Отправить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const [data, setData] = useState(null);

    useEffect(() => {
        console.log('Число изменилось:', data);
    }, [data]);
    
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [coursesByCategory, setCoursesByCategory] = useState(null);
    console.log(coursesByCategory);

    const jwtToken = localStorage.getItem("jwtToken");
    const catalog = localStorage.getItem('catalog');
    console.log(catalog);
    
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedCourseName, setSelectedCourseName] = useState(null);

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categoryFormatOpen, setCategoryFormatOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterFormatOpen, setFilterFormatOpen] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(["Все категории"]);
    const [searchValue, setSearchValue] = useState("");
    const [groupedCourses, setGroupedCourses] = useState("");
    const { categoryFormat, handleChangeCategoryFormat } = useCategoryFormat();
    console.log(categoryFormat)
    
    const handleCheckCategory = (e) => {
        const selectedCategory = e.target.value;
        setCategoryFilter((prevFilters) => {
            if (!e.target.checked) {
                return prevFilters.filter((filter) => filter !== selectedCategory);
            } else {
                prevFilters = prevFilters.filter(
                    (filter) => filter !== "Все категории"
                );
                return [...prevFilters, selectedCategory];
            }
        });
    };

    const handleCheckAllCategories = (e) => {
        if (!e.target.checked) {
            setCategoryFilter([]);
        } else {
            setCategoryFilter(["Все категории"]);
        }
    };

    const handleChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        if (!data) return;

        if (searchValue === "") {
            const _coursesByCategory = {};
            data.forEach((course) => {
                const categoryName = course.courseDTO.courseCategory.category_name;
                if (!_coursesByCategory[categoryName]) {
                    _coursesByCategory[categoryName] = [];
                }
                _coursesByCategory[categoryName].push(course);
            });
            setCoursesByCategory(_coursesByCategory);
        } else {
            const _coursesByCategory = {};
            data
                .filter(
                    (course) =>
                        course.courseDTO.course_name
                            .toLowerCase()
                            .indexOf(searchValue.toLowerCase()) != -1 ||
                        course.courseDTO.courseCategory.category_name
                            .toLowerCase()
                            .indexOf(searchValue.toLowerCase()) != -1
                )
                .forEach((course) => {
                    const categoryName = course.courseDTO.courseCategory.category_name;
                    if (!_coursesByCategory[categoryName]) {
                        _coursesByCategory[categoryName] = [];
                    }
                    _coursesByCategory[categoryName].push(course);
                });
            setCoursesByCategory(_coursesByCategory);
        }
    }, [searchValue]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "/api/aml/course/getUserCourses";
                const url1 = "/api/aml/course/getUserCoursesNoPr";
                let response = null;
                if (jwtToken != null) {
                    response = await axios.get(`${base_url}${url}`, {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    });
                } else {
                    response = await axios.get(`${base_url}${url1}`);
                }
                console.log(response.data);

                let courses = [
                    ...response.data
                ];
                const _coursesByCategory = {};
                if (response.status === 200) {
                    courses.forEach((course) => {
                        if (course.courseDTO.type_of_study === 'дистанционное') {
                            const categoryName = course.courseDTO.courseCategory.category_name;
                            if (!_coursesByCategory[categoryName]) {
                                _coursesByCategory[categoryName] = [];
                            }
                            _coursesByCategory[categoryName].push(course);
                        }
                    });
                    const _groupedCourses = {};
                    courses.forEach(course => {
                        if (course.courseDTO.type_of_study === 'онлайн') {
                            const group = course.courseDTO.course_image;
                            if (!_groupedCourses[group]) {
                                _groupedCourses[group] = [];
                            }
                            _groupedCourses[group].push(course);
                        }
                    });
                    console.log(_groupedCourses);

                    setCoursesByCategory(_coursesByCategory);
                    setGroupedCourses(_groupedCourses)
                    setCoursesData(_groupedCourses)
                    setData(response.data);
                } else {
                    setError(response.statusText);
                }
            } catch (error) {
                setError(error);
                console.error(error);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="bg-white dark:bg-black text-gray-800 dark:text-white min-h-screen">
                <Header />
                
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-12">
                        <div className="container mx-auto">
                            <div className="mb-16">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {t('course catalog')}
                                </h3>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-10 border border-gray-200 dark:border-gray-700">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className="flex space-x-6 mb-4 sm:mb-0">
                                        {/* Categories dropdown */}
                                        <div className="relative">
                                            <div 
                                                onClick={() => {
                                                    setCategoryOpen((prev) => !prev);
                                                    setFilterOpen(false);
                                                }}
                                                className="flex items-center space-x-2 cursor-pointer"
                                            >
                                                <AiFillFolder className="text-blue-600" size={20} />
                                                <span className="text-gray-700 dark:text-gray-200">
                                                    {t("categories")}
                                                </span>
                                            </div>
                                            
                                            {categoryOpen && (
                                                <div 
                                                    className="absolute z-10 mt-2 w-60 bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 border border-gray-200 dark:border-gray-700"
                                                    onMouseLeave={() => setCategoryOpen(false)}
                                                >
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <input
                                                            onChange={handleCheckAllCategories}
                                                            checked={categoryFilter.includes("Все категории")}
                                                            type="checkbox"
                                                            id="all-categories"
                                                            value={"Все категории"}
                                                            className="rounded text-blue-600"
                                                        />
                                                        <label htmlFor="all-categories" className="text-sm">
                                                            {t("all categories")}
                                                        </label>
                                                    </div>
                                                    
                                                    {Object.keys(coursesByCategory || {}).map((category) => {
                                                        const isChecked =
                                                            categoryFilter.includes(category) &&
                                                            !category.includes("Все категории");

                                                        return (
                                                            <div
                                                                key={category}
                                                                className="flex items-center space-x-2 mb-2"
                                                            >
                                                                <input
                                                                    onChange={handleCheckCategory}
                                                                    checked={isChecked}
                                                                    type="checkbox"
                                                                    id={`category-${category}`}
                                                                    value={category}
                                                                    className="rounded text-blue-600"
                                                                />
                                                                <label htmlFor={`category-${category}`} className="text-sm">
                                                                    {category}
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Learning Format dropdown */}
                                        <div className="relative">
                                            <div 
                                                onClick={() => {
                                                    setCategoryFormatOpen((prev) => !prev);
                                                    setFilterFormatOpen(false);
                                                }}
                                                className="flex items-center space-x-2 cursor-pointer"
                                            >
                                                <AiFillFolder className="text-blue-600" size={20} />
                                                <span className="text-gray-700 dark:text-gray-200">
                                                    {t("learning format")}
                                                </span>
                                            </div>
                                            
                                            {categoryFormatOpen && (
                                                <div 
                                                    className="absolute z-10 mt-2 w-60 bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 border border-gray-200 dark:border-gray-700"
                                                    onMouseLeave={() => setCategoryFormatOpen(false)}
                                                >
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <input
                                                            onClick={() => handleChangeCategoryFormat('Онлайн')}
                                                            checked={categoryFormat === 'Онлайн'}
                                                            type="checkbox"
                                                            id="online-format"
                                                            className="rounded text-blue-600"
                                                        />
                                                        <label htmlFor="online-format" className="text-sm">
                                                            {t("online")}
                                                        </label>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <input
                                                            onClick={() => handleChangeCategoryFormat('Дистанционно')}
                                                            checked={categoryFormat === 'Дистанционно'}
                                                            type="checkbox"
                                                            id="remote-format"
                                                            className="rounded text-blue-600"
                                                        />
                                                        <label htmlFor="remote-format" className="text-sm">
                                                            {t("remote")}
                                                        </label>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            onClick={() => handleChangeCategoryFormat('Офлайн')}
                                                            checked={categoryFormat === 'Офлайн'}
                                                            type="checkbox"
                                                            id="offline-format"
                                                            className="rounded text-blue-600"
                                                        />
                                                        <label htmlFor="offline-format" className="text-sm">
                                                            {t("offline")}
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Search input */}
                                    <div className="relative w-full sm:w-64">
                                        <input
                                            type="text"
                                            value={searchValue}
                                            onChange={handleChangeSearchValue}
                                            placeholder={t("Поиск курсов")}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <BiSearch 
                                            size={20} 
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"></div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {coursesByCategory !== null && (
                                <>
                                    {categoryFormat === "Онлайн" && (
                                        <div className="overflow-x-auto mb-12">
                                            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                                                <thead className="bg-blue-900 text-white">
                                                    <tr>
                                                        <th className="py-3 px-4 text-left">Курсы</th>
                                                        <th className="py-3 px-4 text-left">Аудитория</th>
                                                        <th className="py-3 px-4 text-left">Формат</th>
                                                        <th className="py-3 px-4 text-left">Группа</th>
                                                        <th className="py-3 px-4 text-left">Стоимость</th>
                                                        <th className="py-3 px-4 text-left">Стоимость с учетом корпоративной скидки</th>
                                                        <th className="py-3 px-4 text-left">Заявка</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data && data?.length > 0 ? (
                                                        Object.entries(groupedCourses).map(([group, courses]) => (
                                                            <React.Fragment key={group}>
                                                                <tr>
                                                                    <td colSpan="8" className="bg-blue-900 text-white py-2 px-4 text-center font-semibold">
                                                                        {group}
                                                                    </td>
                                                                </tr>
                                                                {courses.filter(course => course.courseDTO.type_of_study === 'онлайн').map((course) => (
                                                                    <tr 
                                                                        key={course.courseDTO.course_id} 
                                                                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                    >
                                                                        <td className="py-3 px-4">{course.courseDTO.course_name}</td>
                                                                        <td className="py-3 px-4">{course.courseDTO.course_for_member_of_the_system}</td>
                                                                        <td className="py-3 px-4">{course.courseDTO.type_of_study}</td>
                                                                        <td className="py-3 px-4">{course.courseDTO.group_of_person}</td>
                                                                        <td className="py-3 px-4">{course.courseDTO.course_price}</td>
                                                                        <td className="py-3 px-4">{course.courseDTO.course_price_sale}</td>
                                                                        <td className="py-3 px-4">
                                                                            <Button 
                                                                                onClick={() => { 
                                                                                    setSelectedCourseId(course.courseDTO.course_id); 
                                                                                    setSelectedCourseName(course.courseDTO.course_name); 
                                                                                    handleOpenModal(); 
                                                                                }}
                                                                                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
                                                                            >
                                                                                Подать заявку
                                                                            </Button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </React.Fragment>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="8" className="py-4 px-6 text-center text-gray-500">Нет данных для отображения</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                    <ApplicationModal
                                        open={modalOpen}
                                        handleClose={handleCloseModal}
                                        courseId={selectedCourseId}
                                        courseName={selectedCourseName}
                                    />

                                    {categoryFormat === "Дистанционно" && (
                                        <>
                                            {Object.keys(coursesByCategory).map((categoryName) => {
                                                if (
                                                    !categoryFilter.includes("Все категории") &&
                                                    !categoryFilter.includes(categoryName)
                                                )
                                                    return null;

                                                return (
                                                    <CoursesBlock
                                                        key={categoryName}
                                                        categoryName={categoryName}
                                                        categoryDesc={categoryName}
                                                        courses={coursesByCategory[categoryName]}
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </main>

                <div className="py-12"></div>

                <Footer />
            </div>
        </div>
    );
}

const CoursesBlock = ({ categoryName, categoryDesc, courses }) => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const navigate = useNavigate();
    const {t} = useTranslation();
    const root = localStorage.getItem('member_of_the_system')

    const filteredCourses = courses.filter(
        (course) => root !== 'Правоохранительные органы' ? course.courseDTO.courseCategory.category_name === categoryName && course.courseDTO.course_for_member_of_the_system !== 'Для правоохранительных органов' : course.courseDTO.courseCategory.category_name === categoryName
    );
    const filteredProCourses = courses.filter(
        (course) => root !== 'Правоохранительные органы' ? course.courseDTO.course_for_member_of_the_system === 'Для правоохранительных органов' : null
    );

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-medium mb-1">{categoryName}</h2>
                <p className="text-gray-500">{t('Для участников системы ПОД/ФТ')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {filteredCourses
                    .sort((a, b) => a.shortStatus - b.shortStatus)
                    .map((course, index) => {
                        const courseDTO = course.courseDTO;
                        const { course_image, course_name } = courseDTO;
                        const { paymentInfo } = course;
                        const availability = courseDTO.group_of_person;

                        var status = paymentInfo === null ? "available" : paymentInfo.status;
                        if (courseDTO.course_id === (86 || 118)) {
                            status = "free";
                        }

                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    if ((status === "process" || status === "finished") && (availability !== "soon")) {
                                        navigate(`/courses/${course.courseDTO.course_id}/read`);
                                    }
                                    else if (availability === "soon") {
                                        navigate(`/courses`);
                                    }
                                    else {
                                        navigate(`/courses/${course.courseDTO.course_id}`);
                                    }
                                }}
                                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer 
                                hover:shadow-lg transform hover:scale-[1.02] transition-all ${availability === "soon" ? "bg-gray-500" : ""}`}
                            >
                                {availability === "soon" && (
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-medium z-10">
                                        Скоро . . .
                                    </div>
                                )}
                                <div className={`relative ${availability === "soon" ? "opacity-30" : ""}`}>
                                    <img 
                                        src={course_image} 
                                        alt={course_name}
                                        className="w-full h-60 object-cover"
                                    />
                                    <div className={`
                                        absolute right-3 top-3 px-6 py-1.5 rounded-full text-sm font-medium
                                        ${status === "available" ? "bg-blue-900 text-white" :
                                           status === "process" ? "bg-green-500 text-white" :
                                           status === "free" ? "bg-green-600 text-white" :
                                           "bg-blue-800 text-white opacity-80"}
                                    `}>
                                        {status === "available"
                                            ? t("Доступно")
                                            : status === "process"
                                                ? t("В процессе")
                                                : status === "free" ? t("Бесплатно") : t("Завершен")}
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    <h3 className="font-medium text-lg">{course_name}</h3>
                                    <div className="text-sm text-gray-500">
                                        {course_name === 'Базалық курс' ? 'ҚАЗ' : course_name === '"WEB SFM порталы" модулі' ? 'ҚАЗ' : 'РУС'} | {course.courseDTO.duration}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <AiFillStar key={i} className="text-amber-500" size={20} />
                                            ))}
                                        </div>
                                        <span className="font-semibold">
                                            {(course.courseDTO.rating % 1 === 0 ? course.courseDTO.rating?.toFixed(1) + '.0' : course.courseDTO.rating?.toFixed(1))?.replace(/\.0$/, '')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MdOndemandVideo size={20} />
                                        <span className="text-sm">
                                            {currentLanguage === 'kz' ? courseDTO.course_for_member_of_the_system === 'Для всех субъектов' ? 'Барлық субъектілер үшін' : courseDTO.course_for_member_of_the_system : courseDTO.course_for_member_of_the_system}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-medium mb-1">{categoryName}</h2>
                <p className="text-gray-500">{t('Для правоохранительных органов')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {filteredProCourses
                    .sort((a, b) => a.shortStatus - b.shortStatus)
                    .map((course, index) => {
                        const courseDTO = course.courseDTO;
                        const { course_image, course_name } = courseDTO;
                        const { paymentInfo } = course;
                        const availability = courseDTO.group_of_person;
                        const law_enforcement_agencies = courseDTO.course_for_member_of_the_system;

                        var status = paymentInfo === null ? "available" : paymentInfo.status;
                        if (courseDTO.course_id === (86 || 118)) {
                            status = "free";
                        }

                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    if ((status === "process" || status === "finished") && (law_enforcement_agencies !== "Для правоохранительных органов")) {
                                        navigate(`/courses/${course.courseDTO.course_id}/read`);
                                    }
                                    else if (law_enforcement_agencies === "Для правоохранительных органов") {
                                        navigate(`/courses`);
                                    }
                                    else {
                                        navigate(`/courses/${course.courseDTO.course_id}`);
                                    }
                                }}
                                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer 
                                hover:shadow-lg transform hover:scale-[1.02] transition-all ${law_enforcement_agencies === "Для правоохранительных органов" ? "bg-gray-500" : ""}`}
                            >
                                {law_enforcement_agencies === "Для правоохранительных органов" && (
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-medium z-10">
                                        {t('Для правоохранительных органов')}
                                    </div>
                                )}
                                <div className={`relative ${law_enforcement_agencies === "Для правоохранительных органов" ? "opacity-30" : ""}`}>
                                    <img 
                                        src={course_image} 
                                        alt={course_name}
                                        className="w-full h-60 object-cover"
                                    />
                                    <div className={`
                                        absolute right-3 top-3 px-6 py-1.5 rounded-full text-sm font-medium
                                        ${status === "available" ? "bg-blue-900 text-white" :
                                           status === "process" ? "bg-green-500 text-white" :
                                           status === "free" ? "bg-green-600 text-white" :
                                           "bg-blue-800 text-white opacity-80"}
                                    `}>
                                        {status === "available"
                                            ? t("Доступно")
                                            : status === "process"
                                                ? t("В процессе")
                                                : status === "free" ? t("Бесплатно") : t("Завершен")}
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    <h3 className="font-medium text-lg">{course_name}</h3>
                                    <div className="text-sm text-gray-500">
                                        {"РУС"} | {course.courseDTO.duration}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <AiFillStar key={i} className="text-amber-500" size={20} />
                                            ))}
                                        </div>
                                        <span className="font-semibold">
                                            {(course.courseDTO.rating % 1 === 0 ? course.courseDTO.rating?.toFixed(1) + '.0' : course.courseDTO.rating?.toFixed(1))?.replace(/\.0$/, '')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MdOndemandVideo size={20} />
                                        <span className="text-sm">{course.courseDTO.course_for_member_of_the_system}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Catalog;
