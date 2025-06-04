import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import Rating from 'react-rating-stars-component';
import { Link, useParams } from 'react-router-dom';
import VisualModal from '../../components/VisualModal';
import { useStyle } from "../../components/VisualModal/StyleContext";
import Header from '../../components/header/v2';
import ProfileEducation from '../../components/profile-education/ProfileEducationNew';
import ProfileGeneral from '../../components/profile-generalInfo/ProfileGeneralNew';
import ProfilePassword from '../../components/profile-password/ProfilePasswordNew';
import base_url from '../../settings/base_url';
import Vebinar from './VebinarNew';

// Optimized Rating component
const MemoizedRating = memo(({ stars, handleStarRatingChange }) => (
    <Rating
        count={5}
        size={50}
        value={stars}
        onChange={handleStarRatingChange}
        activeColor="#ffd700"
    />
));

function Profile() {
    const { styles, open, setOpen } = useStyle();
    const [stars, setStars] = useState(0);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");
    const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
    const [openVisualModal, setOpenVisualModal] = useState(open);
    const [currentTab, setCurrentTab] = useState(1);
    const { tabname } = useParams();
    const jwtToken = localStorage.getItem("jwtToken");

    const handleStarRatingChange = (newRating) => setStars(newRating);

    const handleOpenFeedbackModal = (courseId) => {
        setSelectedCourseId(courseId);
        setOpenFeedbackModal(true);
    };

    const handleCloseFeedbackModal = () => {
        setOpenFeedbackModal(false);
        setStars(0);
        setFeedbackText("");
    };

    const handleSendFeedback = async () => {
        try {
            if (!selectedCourseId) return;

            const data = {
                comment: feedbackText,
                courseId: selectedCourseId,
                rate: stars
            };

            const response = await axios.post(
                `${base_url}/api/aml/course/createCourseComments/${selectedCourseId}`,
                data,
                { headers: { Authorization: `Bearer ${jwtToken}` } }
            );

            if (response.status === 200) {
                console.log("Feedback sent successfully");
            }
        } catch (error) {
            console.error("Error sending feedback:", error);
        }
        handleCloseFeedbackModal();
    };

    const handleOpenVisualModal = () => {
        setOpenVisualModal(prev => !prev);
        setOpen(prev => !prev);
    };

    const handleTabClick = (tab) => setCurrentTab(tab);

    useEffect(() => {
        if (tabname) {
            if (tabname === "sertificates") setCurrentTab(4);
            if (tabname === "vebinars") setCurrentTab(2);
        }
    }, [tabname]);

    const getSection = () => {
        switch (currentTab) {
            case 1: return <ProfileGeneral />;
            case 2: return <Vebinar />;
            case 4: return <ProfileEducation handleOpenModal={handleOpenFeedbackModal} />;
            case 5: return <ProfilePassword />;
            default: return null;
        }
    };

    const isDark = styles.colorMode === "dark";
    const isBlue = styles.colorMode === "blue";

    const tabs = [
        { id: 1, label: "Личные данные", icon: "👤" },
        { id: 2, label: "Вебинары", icon: "🎥" },
        { id: 4, label: "Сертификаты", icon: "🏆" },
        { id: 5, label: "Сменить пароль", icon: "🔐" }
    ];

    return (
        <div className={`min-h-screen transition-all mt-4 duration-300 ${isDark ? 'bg-gray-900' : isBlue ? 'bg-blue-50' : 'bg-gray-50'
            }`}>
            {/* Feedback Modal */}
            {openFeedbackModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-slideIn">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Обратная связь</h2>
                                <button
                                    onClick={handleCloseFeedbackModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <MdClose size={24} />
                                </button>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Для нас важно Ваше мнение!<br />
                                Мы стремимся предоставить наилучший опыт обучения.<br />
                                Обратная связь помогает постоянно улучшать наши курсы.
                            </p>

                            <div className="flex justify-center mb-6">
                                <MemoizedRating
                                    stars={stars}
                                    handleStarRatingChange={handleStarRatingChange}
                                />
                            </div>

                            <textarea
                                className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none h-32 focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="Поделитесь своими впечатлениями..."
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                            />

                            <button
                                onClick={handleSendFeedback}
                                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                            >
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <VisualModal
                open={openVisualModal}
                onRemoveImages={() => { }}
                onShowImages={() => { }}
                onFontFamily={() => { }}
                onIntervalChange={() => { }}
                styles={styles}
            />

            <Header
                dark={!isDark}
                handleOpenVisualModal={handleOpenVisualModal}
            />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Back Navigation */}
                <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
                >
                    <IoIosArrowBack className="transform group-hover:-translate-x-1 transition-transform" />
                    <span>Назад к главной</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar with Tabs */}
                    <div className="lg:col-span-1">
                        <div className={`rounded-2xl shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : isBlue ? 'bg-white' : 'bg-white'
                            }`}>
                            <div className="p-6">
                                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'
                                    }`}>
                                    Профиль
                                </h3>
                                <nav className="space-y-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabClick(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${currentTab === tab.id
                                                    ? isDark
                                                        ? 'bg-blue-600 text-white shadow-lg'
                                                        : isBlue
                                                            ? 'bg-blue-500 text-white shadow-lg'
                                                            : 'bg-blue-500 text-white shadow-lg'
                                                    : isDark
                                                        ? 'text-gray-300 hover:bg-gray-700'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <span className="text-xl">{tab.icon}</span>
                                            <span className="font-medium">{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className={`rounded-2xl shadow-lg overflow-hidden min-h-[600px] ${isDark ? 'bg-gray-800' : isBlue ? 'bg-white' : 'bg-white'
                            }`}>
                            <div className="p-6 md:p-8">
                                {getSection()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
