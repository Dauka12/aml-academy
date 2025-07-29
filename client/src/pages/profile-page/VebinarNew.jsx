import axios from 'axios';
import { useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
import { FaExternalLinkAlt, FaPlay } from "react-icons/fa";
import { MdAccessTime, MdCalendarToday, MdPeople, MdVideoCall } from "react-icons/md";
import { useStyle } from "../../components/VisualModal/StyleContext";
import base_url from '../../settings/base_url';

// Modern Select Component
const Select = ({ options, value, handleChange, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 min-w-[200px] justify-between ${
          isDark 
            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
        }`}
      >
        <span>{value}</span>
        <BiFilter className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-lg z-10 ${
          isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
        }`}>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                handleChange(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left transition-colors first:rounded-t-xl last:rounded-b-xl ${
                value === option
                  ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                  : isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Webinar Card Component
const WebinarCard = ({ webinar, isDark, onJoin }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
    }`}>
      {/* Webinar Image */}
      <div className="relative mb-4 rounded-xl overflow-hidden">
        <img
          src={webinar.imageUrl}
          alt={webinar.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/api/placeholder/400/200';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-white">
            <MdVideoCall size={20} />
            <span className="text-sm font-medium">Онлайн вебинар</span>
          </div>
        </div>
      </div>

      {/* Webinar Info */}
      <div className="space-y-3">
        <h3 className={`text-xl font-bold line-clamp-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {webinar.name}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MdPeople className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {webinar.webinar_for_member_of_the_system}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MdCalendarToday className={isDark ? 'text-green-400' : 'text-green-600'} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {formatDate(webinar.date)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MdAccessTime className={isDark ? 'text-purple-400' : 'text-purple-600'} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {webinar.type}
            </span>
          </div>
        </div>

        <div className={`p-3 rounded-xl ${
          isDark ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50 border border-green-200'
        }`}>
          <span className="text-green-600 font-semibold text-sm">Бесплатно</span>
        </div>

        <button
          onClick={() => onJoin(webinar)}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <FaPlay size={16} />
          Принять участие
        </button>
      </div>
    </div>
  );
};

function Vebinar() {
  const { styles } = useStyle();
  const [filterValue, setFilterValue] = useState("Сначала новые");
  const [webinars, setWebinars] = useState([]);
  const [registeredWebinars, setRegisteredWebinars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const isDark = styles.colorMode === "dark";
  const isBlue = styles.colorMode === "blue";
  const jwtToken = localStorage.getItem('jwtToken');

  const fetchRegisteredWebinars = async () => {
    try {
      const response = await axios.get(`${base_url}/api/webinars`, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      setWebinars(response.data);
    } catch (error) {
      console.error('Error fetching registered webinars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegisteredWebinars();
  }, []);

  const handleFilterChange = (option) => {
    setFilterValue(option);
  };



  const tabs = [
    { id: 1, label: "Мои вебинары", icon: "📅" }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Загрузка вебинаров...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className={`p-6 rounded-xl ${isDark ? 'bg-red-900/20 border border-red-500/30' : 'bg-red-50 border border-red-200'}`}>
          <p className="text-red-600 font-semibold">Ошибка загрузки</p>
          <p className="text-sm text-red-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
          <MdVideoCall size={24} />
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Вебинары
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Онлайн обучение и интерактивные сессии
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? isDark
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-500 text-white shadow-lg'
                : isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl ${
        isDark ? 'bg-gray-800/50' : isBlue ? 'bg-blue-50' : 'bg-gray-50'
      }`}>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {activeTab === 0 ? 'Календарь доступных вебинаров:' : 'Календарь выбранных вебинаров:'}
        </h3>
        <div className="flex items-center gap-2">
          <BiFilter className={isDark ? 'text-gray-400' : 'text-gray-600'} size={20} />
          <Select
            options={["Сначала новые", "Сначала старые"]}
            value={filterValue}
            handleChange={handleFilterChange}
            isDark={isDark}
          />
        </div>
      </div>

      {/* Content */}
      <div className={`rounded-2xl overflow-hidden ${
        isDark ? 'bg-gray-800/30' : 'bg-white'
      } shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        
          <div className="p-6">
            {webinars.length > 0 ? (
              <div className="space-y-4">
                {webinars
                  .filter(webinar => webinar.isSignedUp === true)
                  .map((webinar, index) => (
                    <div
                      key={webinar.id}
                      className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                        isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        {/* Webinar Image */}
                        {webinar.imageUrl && (
                          <div className="lg:w-48 lg:h-32 w-full h-48 flex-shrink-0">
                            <img
                              src={webinar.imageUrl}
                              alt={webinar.title}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 space-y-3">
                          <h4 className={`text-lg font-semibold ${
                            isDark ? 'text-white' : 'text-gray-800'
                          }`}>
                            {webinar.title}
                          </h4>
                          
                          {webinar.description && (
                            <p className={`text-sm ${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            } line-clamp-2`}>
                              {webinar.description}
                            </p>
                          )}
                          
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <MdCalendarToday className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                {(() => {
                                  const [year, month, day, hour, minute] = webinar.startDate;
                                  return new Date(year, month - 1, day, hour, minute).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  });
                                })()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MdPeople className={isDark ? 'text-green-400' : 'text-green-600'} />
                              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                Участников: {webinar.signupsCount}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 lg:flex-col lg:items-end">
                          {webinar.link && (
                            <a
                              href={webinar.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                            >
                              <FaExternalLinkAlt size={14} />
                              Присоединиться
                            </a>
                          )}
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            webinar.isActive 
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}>
                            {webinar.isActive ? 'Активный' : 'Неактивный'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <MdCalendarToday className={`text-3xl ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  Нет зарегистрированных вебинаров
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Зарегистрируйтесь на вебинары во вкладке "Доступные вебинары"
                </p>
              </div>
            )}
          </div>

      </div>
    </div>
  );
}

export default Vebinar;
