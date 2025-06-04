import {
    AcademicCapIcon,
    ArrowRightIcon,
    Bars3Icon,
    BookOpenIcon,
    CheckCircleIcon,
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
                    icon: <BookOpenIcon className="w-4 h-4" />
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
                    icon: <CheckCircleIcon className="w-4 h-4" />
                };
            default:
                return {
                    label: "Бесплатно",
                    color: "bg-purple-100 text-purple-800 border-purple-200",
                    icon: <AcademicCapIcon className="w-4 h-4" />
                };
        }
    };

    const statusConfig = getStatusConfig(status);

    if (viewMode === 'list') {
        return (
            <motion.div
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                onClick={onClick}
            >
                <div className="flex items-center p-6 space-x-6">
                    <div className="flex-shrink-0">
                        <img
                            src={course_image}
                            alt={course_name}
                            className="w-24 h-16 object-cover rounded-lg"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course_name}</h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                                <ClockIcon className="w-4 h-4" />
                                <span>{duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <StarIconSolid className="w-4 h-4 text-yellow-400" />
                                <span>{rating?.toFixed(1)}</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mb-2">{course_for_member_of_the_system}</p>
                    </div>

                    <div className="flex-shrink-0 text-right">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color} mb-3`}>
                            {statusConfig.icon}
                            <span>{statusConfig.label}</span>
                        </div>

                        {status === "process" && (
                            <div className="w-32">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Прогресс</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <ArrowRightIcon className="w-5 h-5 text-gray-400 mt-2 ml-auto" />
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer group"
            onClick={onClick}
        >
            <div className="relative">
                <img
                    src={course_image}
                    alt={course_name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className={`absolute top-3 right-3 inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${statusConfig.color}`}>
                    {statusConfig.icon}
                    <span>{statusConfig.label}</span>
                </div>

                {status === "process" && (
                    <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                            <div className="flex justify-between text-xs text-gray-700 mb-1">
                                <span>Прогресс</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course_name}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <StarIconSolid className="w-4 h-4 text-yellow-400" />
                        <span>{rating?.toFixed(1)}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course_for_member_of_the_system}</p>

                <div className="flex items-center justify-between">
                    <PlayIcon className="w-5 h-5 text-blue-500" />
                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                </div>
            </div>
        </motion.div>
    );
};

const FilterTabs = ({ activeFilter, onFilterChange }) => {
    const filters = [
        { id: 'all', label: 'Все курсы', icon: <BookOpenIcon className="w-4 h-4" /> },
        { id: 'available', label: 'Доступные', icon: <DocumentCheckIcon className="w-4 h-4" /> },
        { id: 'process', label: 'В процессе', icon: <ClockIcon className="w-4 h-4" /> },
        { id: 'finished', label: 'Завершенные', icon: <CheckCircleIconSolid className="w-4 h-4" /> }
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeFilter === filter.id
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                >
                    {filter.icon}
                    <span>{filter.label}</span>
                </button>
            ))}
        </div>
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
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const jwtToken = localStorage.getItem("jwtToken");

    const fetchCourses = useCallback(async () => {
        if (!jwtToken) {
            setError("Необходимо войти в систему");
            setLoading(false);
            return;
        }

        try {
            const url = "/api/aml/course/getUserUsingCourses";
            const response = await axios.get(`${base_url}${url}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
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
            filtered = courses.filter(course => {
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
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                                <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

                                <div className="flex items-center space-x-4">
                                    {/* Search */}
                                    <div className="relative">
                                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Поиск курсов..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* View Mode Toggle */}
                                    <div className="flex bg-gray-100 rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            <Squares2X2Icon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            <Bars3Icon className="w-5 h-5" />
                                        </button>
                                    </div>
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
                            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-md animate-pulse">
                                        <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                                        <div className="p-6">
                                            <div className="h-6 bg-gray-200 rounded mb-3"></div>
                                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-12">
                                <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                                    <h3 className="text-lg font-semibold text-red-800 mb-2">Ошибка загрузки</h3>
                                    <p className="text-red-600">{error}</p>
                                    <button
                                        onClick={fetchCourses}
                                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Попробовать снова
                                    </button>
                                </div>
                            </div>
                        ) : filteredCourses.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
                                    <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {searchQuery ? 'Курсы не найдены' : 'Нет курсов'}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {searchQuery
                                            ? 'Попробуйте изменить критерии поиска'
                                            : 'У вас пока нет зарегистрированных курсов'
                                        }
                                    </p>
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Очистить поиск
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={`grid gap-6 ${viewMode === 'grid'
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
