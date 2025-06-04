import {
    AcademicCapIcon,
    ArrowRightIcon,
    Bars3Icon,
    BookOpenIcon,
    ClockIcon,
    DocumentCheckIcon,
    PlayIcon,
    MagnifyingGlassIcon as SearchIcon,
    Squares2X2Icon
} from '@heroicons/react/24/outline';
import {
    CheckCircleIcon as CheckCircleIconSolid,
    StarIcon as StarIconSolid
} from '@heroicons/react/24/solid';
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";

import Footer from "../../components/footer/Footer";
import Header from "../../components/header/v2";
import base_url from "../../settings/base_url";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const stagger = {
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const CourseCard = ({ course, onClick, viewMode = 'grid' }) => {
    const { courseDTO, paymentInfo } = course;
    const { course_image, course_name, duration, rating, course_for_member_of_the_system } = courseDTO;
    const status = paymentInfo === null ? "available" : paymentInfo.status;
    const progress = paymentInfo?.progress_percentage || 0;

    const getStatusConfig = (status) => {
        switch (status) {
            case "available":
                return {
                    label: "Доступно",
                    color: "bg-blue-100 text-blue-800 border-blue-200",
                    icon: <DocumentCheckIcon className="w-4 h-4" />
                };
            case "process":
                return {
                    label: "В процессе",
                    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                    icon: <ClockIcon className="w-4 h-4" />
                };
            case "finished":
                return {
                    label: "Завершен",
                    color: "bg-green-100 text-green-800 border-green-200",
                    icon: <CheckCircleIconSolid className="w-4 h-4" />
                };
            default:
                return {
                    label: "Недоступно",
                    color: "bg-gray-100 text-gray-800 border-gray-200",
                    icon: <DocumentCheckIcon className="w-4 h-4" />
                };
        }
    };

    const statusConfig = getStatusConfig(status);
    const isGridView = viewMode === 'grid';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden ${
                isGridView ? 'flex flex-col' : 'flex flex-row'
            }`}
            onClick={() => onClick(course)}
        >
            {/* Image */}
            <div className={`relative ${isGridView ? 'w-full h-48' : 'w-48 h-full flex-shrink-0'}`}>
                <img
                    src={course_image || "/api/placeholder/400/300"}
                    alt={course_name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        {statusConfig.icon}
                        {statusConfig.label}
                    </span>
                </div>

                {/* Progress Bar for ongoing courses */}
                {status === "process" && (
                    <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/20 rounded-full h-2">
                            <div
                                className="bg-white rounded-full h-2 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-white text-xs mt-1 font-medium">{progress}% завершено</p>
                    </div>
                )}

                {/* Play Button Overlay */}
                {(status === "process" || status === "finished") && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                            <PlayIcon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={`p-6 ${isGridView ? 'flex-1' : 'flex-1'}`}>
                <div className="flex items-start justify-between mb-3">
                    <h3 className={`font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors flex-1 mr-2 ${
                        isGridView ? 'text-lg' : 'text-xl'
                    }`}>
                        {course_name}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-yellow-500 flex-shrink-0">
                        <StarIconSolid className="w-4 h-4" />
                        <span className="font-medium">{(rating || 5.0).toFixed(1)}</span>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
                    <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{duration || "1 час"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <AcademicCapIcon className="w-4 h-4" />
                        <span>Все уровни</span>
                    </div>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {course_for_member_of_the_system || "Для всех субъектов финансового мониторинга"}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {status === "process" && (
                            <span className="text-sm font-medium text-yellow-600">
                                Продолжить изучение
                            </span>
                        )}
                        {status === "finished" && (
                            <span className="text-sm font-medium text-green-600">
                                Пересмотреть
                            </span>
                        )}
                        {status === "available" && (
                            <span className="text-sm font-medium text-blue-600">
                                Начать изучение
                            </span>
                        )}
                    </div>

                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                </div>
            </div>
        </motion.div>
    );
};

const EmptyState = ({ activeFilter }) => {
    const getEmptyMessage = () => {
        switch (activeFilter) {
            case 'available':
                return {
                    title: "Нет доступных курсов",
                    description: "В данный момент у вас нет доступных курсов для изучения."
                };
            case 'process':
                return {
                    title: "Нет курсов в процессе",
                    description: "У вас нет курсов, которые вы изучаете в данный момент."
                };
            case 'finished':
                return {
                    title: "Нет завершенных курсов",
                    description: "Вы еще не завершили ни одного курса."
                };
            default:
                return {
                    title: "Курсы не найдены",
                    description: "У вас пока нет курсов. Посетите каталог курсов, чтобы начать обучение."
                };
        }
    };

    const { title, description } = getEmptyMessage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
        >
            <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{description}</p>
            <motion.a
                href="/courses"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
                <BookOpenIcon className="w-5 h-5" />
                <span>Перейти к каталогу</span>
            </motion.a>
        </motion.div>
    );
};

function MyCoursesNew() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    const jwtToken = localStorage.getItem("jwtToken");

    const fetchCourses = useCallback(async () => {
        if (!jwtToken) {
            setError("Требуется авторизация");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${base_url}/api/aml/course/getUserCourses`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });

            if (response.status === 200) {
                setCourses(response.data);
            } else {
                setError(response.statusText);
            }
        } catch (error) {
            setError(error.message);
            console.error(error);
        }

        setLoading(false);
    }, [jwtToken]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    useEffect(() => {
        let filtered = courses;

        // Filter by status
        if (activeFilter !== 'all') {
            filtered = filtered.filter(course => {
                const status = course.paymentInfo === null ? "available" : course.paymentInfo.status;
                return status === activeFilter;
            });
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(course =>
                course.courseDTO.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.courseDTO.course_for_member_of_the_system?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredCourses(filtered);
    }, [courses, activeFilter, searchQuery]);

    const handleCourseClick = useCallback((course) => {
        const status = course.paymentInfo === null ? "available" : course.paymentInfo.status;

        if (status === "process" || status === "finished") {
            navigate(`/courses/${course.courseDTO.course_id}/read`);
        } else {
            navigate(`/courses/${course.courseDTO.course_id}`);
        }
    }, [navigate]);

    const getStats = () => {
        const stats = {
            total: courses.length,
            available: courses.filter(c => c.paymentInfo === null || c.paymentInfo.status === "available").length,
            inProgress: courses.filter(c => c.paymentInfo?.status === "process").length,
            completed: courses.filter(c => c.paymentInfo?.status === "finished").length
        };
        return stats;
    };

    const stats = getStats();

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Мои курсы - AML Academy</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <Header dark={true} />

            {/* Add top padding for header */}
            <div className="pt-20 md:pt-24">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Header Section */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="mb-8"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Мои курсы
                            </h1>
                            <p className="text-lg text-gray-600">
                                Управляйте своим обучением и отслеживайте прогресс
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            {[
                                { label: "Всего курсов", value: stats.total, color: "blue", icon: <BookOpenIcon className="w-8 h-8" /> },
                                { label: "Доступно", value: stats.available, color: "green", icon: <DocumentCheckIcon className="w-8 h-8" /> },
                                { label: "В процессе", value: stats.inProgress, color: "yellow", icon: <ClockIcon className="w-8 h-8" /> },
                                { label: "Завершено", value: stats.completed, color: "purple", icon: <CheckCircleIconSolid className="w-8 h-8" /> }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`bg-white p-6 rounded-xl shadow-md border-l-4 border-${stat.color}-500`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                            <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                                        </div>
                                        <div className={`text-${stat.color}-500`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Filters and Search */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="mb-8"
                    >
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                {/* Search */}
                                <div className="flex-1 lg:max-w-md">
                                    <div className="relative">
                                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Поиск курсов..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Filter Buttons */}
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { key: 'all', label: 'Все', count: stats.total },
                                        { key: 'available', label: 'Доступно', count: stats.available },
                                        { key: 'process', label: 'В процессе', count: stats.inProgress },
                                        { key: 'finished', label: 'Завершено', count: stats.completed }
                                    ].map((filter) => (
                                        <button
                                            key={filter.key}
                                            onClick={() => setActiveFilter(filter.key)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                activeFilter === filter.key
                                                    ? 'bg-blue-500 text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            {filter.label} ({filter.count})
                                        </button>
                                    ))}
                                </div>

                                {/* View Mode Toggle */}
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-md transition-all duration-200 ${
                                            viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    >
                                        <Squares2X2Icon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-md transition-all duration-200 ${
                                            viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    >
                                        <Bars3Icon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Courses Grid/List */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        {isLoading ? (
                            <div className="flex justify-center items-center py-16">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-16">
                                <p className="text-red-600 text-lg">{error}</p>
                            </div>
                        ) : filteredCourses.length === 0 ? (
                            <EmptyState activeFilter={activeFilter} />
                        ) : (
                            <div className={`grid gap-6 ${
                                viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    : 'grid-cols-1'
                            }`}>
                                <AnimatePresence mode="wait">
                                    {filteredCourses.map((course, index) => (
                                        <CourseCard
                                            key={course.courseDTO.course_id}
                                            course={course}
                                            onClick={() => handleCourseClick(course)}
                                            viewMode={viewMode}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default MyCoursesNew;
