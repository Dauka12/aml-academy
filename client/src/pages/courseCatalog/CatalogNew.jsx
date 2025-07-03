import {
    ArrowRightIcon,
    Bars3Icon,
    BookOpenIcon,
    ClockIcon,
    ComputerDesktopIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    MagnifyingGlassIcon,
    Squares2X2Icon,
    UserGroupIcon,
    VideoCameraIcon
} from '@heroicons/react/24/outline';
import {
    FireIcon,
    StarIcon as StarIconSolid
} from '@heroicons/react/24/solid';
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

const CourseCard = ({ course, onClick, featured = false }) => {
    const { courseDTO } = course;
    const {
        course_name,
        course_price,
        course_image,
        duration,
        rating,
        course_for_member_of_the_system,
        type_of_study,
        typeOfStudy,
        courseCategory
    } = courseDTO;

    const isFree = course_price === 0 || course_price === 1;
    // Handle both field names for backward compatibility
    const studyType = typeOfStudy || type_of_study;
    const isOnline = studyType === 'онлайн';
    const isDistance = studyType === 'дистанционное';

    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer group relative ${featured ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
            onClick={onClick}
        >
            {featured && (
                <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                        <FireIcon className="w-3 h-3" />
                        <span>Популярный</span>
                    </div>
                </div>
            )}

            {/* Conditional image rendering - only for distance learning courses */}
            {isDistance && (
                <div className="relative">
                    <img
                        src={course_image || '/api/placeholder/400/200'}
                        alt={course_name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = '/api/placeholder/400/200';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Course Type Badge */}
                    <div className="absolute top-3 right-3">
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${isOnline
                                ? 'bg-green-100/90 text-green-800 border border-green-200'
                                : isDistance
                                    ? 'bg-blue-100/90 text-blue-800 border border-blue-200'
                                    : 'bg-purple-100/90 text-purple-800 border border-purple-200'
                            }`}>
                            {isOnline ? (
                                <VideoCameraIcon className="w-3 h-3" />
                            ) : isDistance ? (
                                <ComputerDesktopIcon className="w-3 h-3" />
                            ) : (
                                <DocumentTextIcon className="w-3 h-3" />
                            )}
                            <span>{studyType}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* For online courses - show header with gradient background instead of image */}
            {isOnline && (
                <div className="relative h-32 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                    <div className="text-center text-white">
                        <VideoCameraIcon className="w-12 h-12 mx-auto mb-2 opacity-80" />
                        <span className="text-sm font-medium">Онлайн курс</span>
                    </div>
                    
                    {/* Course Type Badge for online */}
                    <div className="absolute top-3 right-3">
                        <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100/90 text-green-800 border border-green-200 backdrop-blur-sm">
                            <VideoCameraIcon className="w-3 h-3" />
                            <span>{studyType}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors flex-1 mr-2">
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
                        <UserGroupIcon className="w-4 h-4" />
                        <span>Все уровни</span>
                    </div>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {course_for_member_of_the_system || "Для всех субъектов финансового мониторинга"}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {isFree ? (
                            <span className="text-lg font-bold text-green-600">Бесплатно</span>
                        ) : (
                            <div className="flex items-center space-x-1">
                                <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-lg font-bold text-gray-900">
                                    {course_price?.toLocaleString()} ₸
                                </span>
                            </div>
                        )}
                    </div>

                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                </div>

                {/* Category Badge */}
                {courseCategory && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {courseCategory.category_name}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const FilterSection = ({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    selectedFormat,
    onFormatChange,
    categories,
    viewMode,
    onViewModeChange
}) => {
    const formats = [
        { id: 'all', label: 'Все форматы', icon: <BookOpenIcon className="w-4 h-4" /> },
        { id: 'дистанционное', label: 'Дистанционно', icon: <ComputerDesktopIcon className="w-4 h-4" /> },
        { id: 'онлайн', label: 'Онлайн', icon: <VideoCameraIcon className="w-4 h-4" /> }
    ];

    return (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Поиск курсов..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Format Filter - Stack on mobile */}
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    {formats.map((format) => (
                        <button
                            key={format.id}
                            onClick={() => onFormatChange(format.id)}
                            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${selectedFormat === format.id
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {format.icon}
                            <span>{format.label}</span>
                        </button>
                    ))}
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1 self-start">
                    <button
                        onClick={() => onViewModeChange('grid')}
                        className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <Squares2X2Icon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onViewModeChange('list')}
                        className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <Bars3Icon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => onCategoryChange('all')}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === 'all'
                                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Все категории
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => onCategoryChange(category)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const HeroSection = () => (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className=""
    >
    </motion.div>
);

function CatalogNew() {
    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [coursesByCategory, setCoursesByCategory] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedFormat, setSelectedFormat] = useState('all'); // Changed from 'дистанционное' to 'all'
    const [viewMode, setViewMode] = useState('grid');

    const jwtToken = localStorage.getItem("jwtToken");

    const fetchCourses = useCallback(async () => {
        try {
            const url = jwtToken ? "/api/aml/course/getUserCourses" : "/api/aml/course/getUserCoursesNoPr";
            const config = jwtToken ? {
                headers: { Authorization: `Bearer ${jwtToken}` }
            } : {};

            const response = await axios.get(`${base_url}${url}`, config);

            if (response.status === 200) {
                const courses = response.data;
                setData(courses);

                // Group courses by category
                const categorized = {};
                courses.forEach((course) => {
                    const studyType = course.courseDTO.typeOfStudy || course.courseDTO.type_of_study;
                    const categoryName = course.courseDTO.courseCategory?.category_name || 'Общие';
                    if (!categorized[categoryName]) {
                        categorized[categoryName] = [];
                    }
                    categorized[categoryName].push(course);
                });

                setCoursesByCategory(categorized);
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
        const hash = location.hash;
        if (hash === '#top') {
            window.scrollTo(0, 0);
        }
    }, [location]);

    useEffect(() => {
        let filtered = data;

        // Filter by format
        if (selectedFormat !== 'all') {
            filtered = filtered.filter(course => {
                const studyType = course.courseDTO.typeOfStudy || course.courseDTO.type_of_study;
                return studyType === selectedFormat;
            });
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(course =>
                course.courseDTO.courseCategory?.category_name === selectedCategory
            );
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(course =>
                course.courseDTO.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.courseDTO.course_for_member_of_the_system?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort courses: distance learning first, then online when "all formats" is selected
        if (selectedFormat === 'all') {
            filtered = filtered.sort((a, b) => {
                const studyTypeA = a.courseDTO.typeOfStudy || a.courseDTO.type_of_study;
                const studyTypeB = b.courseDTO.typeOfStudy || b.courseDTO.type_of_study;
                
                // Distance learning courses first (дистанционное = 0, онлайн = 1)
                if (studyTypeA === 'дистанционное' && studyTypeB === 'онлайн') return -1;
                if (studyTypeA === 'онлайн' && studyTypeB === 'дистанционное') return 1;
                return 0;
            });
        }

        setFilteredCourses(filtered);
    }, [data, selectedFormat, selectedCategory, searchQuery]);

    const handleCourseClick = useCallback((course) => {
        navigate(`/courses/${course.courseDTO.course_id}`);
    }, [navigate]);

    const categories = Object.keys(coursesByCategory);

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden" style={{ 
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            height: '100%',
            minHeight: '100vh'
        }}>
            <Header dark={true} />

            {/* Добавляем отступ сверху для хедера */}
            <div className="pt-20 md:pt-24 pb-8" style={{ 
                minHeight: 'calc(100vh - 80px)',
                overflow: 'visible'
            }}>
                <div className="container mx-auto px-4 py-8 max-w-7xl" style={{
                    overflow: 'visible',
                    WebkitOverflowScrolling: 'touch'
                }}>
                    {/* Hero Section */}
                    <HeroSection />

                    {/* Filters */}
                    <FilterSection
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        selectedFormat={selectedFormat}
                        onFormatChange={setSelectedFormat}
                        categories={categories}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                    />

                  

                    {/* Results Section */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {searchQuery ? `Результаты поиска "${searchQuery}"` : 'Все курсы'}
                            </h2>
                            <div className="text-sm text-gray-600">
                                Найдено: {filteredCourses.length} курсов
                            </div>
                        </div>

                        {isLoading ? (
                            <div className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    : 'grid-cols-1 max-w-4xl'
                                }`}>
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
                                    <p className="text-red-600 mb-4">{error}</p>
                                    <button
                                        onClick={fetchCourses}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                                        {searchQuery ? 'Курсы не найдены' : 'Нет доступных курсов'}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {searchQuery
                                            ? 'Попробуйте изменить критерии поиска'
                                            : 'К сожалению, в данный момент нет доступных курсов'
                                        }
                                    </p>
                                    {searchQuery && (
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSelectedCategory('all');
                                                setSelectedFormat('all');
                                            }}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Сбросить фильтры
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    : 'grid-cols-1 max-w-4xl'
                                }`}>
                                <AnimatePresence mode="wait">
                                    {filteredCourses.map((course) => (
                                        <CourseCard
                                            key={course.courseDTO.course_id}
                                            course={course}
                                            onClick={() => handleCourseClick(course)}
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

export default CatalogNew;
