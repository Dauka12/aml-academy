import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCertificate, FaGraduationCap } from 'react-icons/fa';
import { MdDownload, MdStar } from 'react-icons/md';
import base_url from '../../settings/base_url';
import { useStyle } from "../VisualModal/StyleContext";

function ProfileEducation({ handleOpenModal }) {
  const { styles } = useStyle();
  const [eduRows, setEduRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const jwtToken = localStorage.getItem('jwtToken');
  const isDark = styles.colorMode === "dark";
  const isBlue = styles.colorMode === "blue";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${base_url}/api/aml/course/getUserCourses`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.status === 200) {
          // Filter out courses that don't issue certificates
          const filteredCourses = response.data.filter(course => 
            course.paymentInfo && 
            course.paymentInfo.status === 'finished' &&
            ![86, 118, 104, 41, 47].includes(course.courseDTO.course_id)
          );

          if (filteredCourses.length > 0) {
            const _edu = filteredCourses.map(course => ({
              id: course.courseDTO.course_id,
              org_name: course.courseDTO.course_name || 'Нет названия',
              position: course.courseDTO.course_for_member_of_the_system || 'Не указан',
              start_date: course.startDate || new Date(course.paymentInfo?.payment_date).toLocaleDateString() || 'Не указана',
              end_date: course.endDate || 'Не указана',
            }));

            setEduRows(_edu);
          } else {
            setEduRows([{ 
              org_name: 'Нет завершенных курсов', 
              position: '-', 
              start_date: '-', 
              end_date: '-' 
            }]);
          }
        }
      } catch (error) {
        console.error(error);
        setError('Ошибка загрузки данных');
        setEduRows([{ 
          org_name: 'Ошибка загрузки', 
          position: '-', 
          start_date: '-', 
          end_date: '-' 
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jwtToken]);

  const getFile = async (id) => {
    if (id) {
      // Check if course should not issue certificates
      if (id === '86' || id === '118' || id === '104' || id === '41' || id === '47' || id === 86 || id === 118 || id === 104 || id === 41 || id === 47) {
        alert('Для данного курса сертификат не выдается');
        return;
      }

      try {
        const response = await axios.get(
          `${base_url}/api/aml/course/getCertificateByCourseId/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            responseType: 'blob',
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Сертификат.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } catch (error) {
        console.error('Ошибка скачивания сертификата:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === '-') return '-';
    try {
      return new Date(dateString).toLocaleDateString('ru-RU');
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Загрузка курсов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className={`p-6ё rounded-xl ${isDark ? 'bg-red-900/20 border border-red-500/30' : 'bg-red-50 border border-red-200'}`}>
          <p className="text-red-600 font-semibold">Ошибка загрузки данных</p>
          <p className="text-sm text-red-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn g">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
          <FaGraduationCap size={24} />
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Сертификаты
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Ваши завершенные курсы и сертификаты
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-700/50' : isBlue ? 'bg-blue-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
        } border ${isDark ? 'border-gray-600' : 'border-blue-100'}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <FaCertificate size={20} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {eduRows.filter(row => row.org_name !== 'Нет завершенных курсов' && row.org_name !== 'Ошибка загрузки').length}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Завершено курсов
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-700/50' : isBlue ? 'bg-green-50' : 'bg-gradient-to-br from-green-50 to-emerald-50'
        } border ${isDark ? 'border-gray-600' : 'border-green-100'}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg text-white">
              <MdDownload size={20} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {eduRows.filter(row => row.id).length}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Доступных сертификатов
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className={`rounded-xl overflow-hidden ${
        isDark ? 'bg-gray-700/30' : 'bg-white'
      } shadow-lg border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
        
        {/* Table Header */}
        <div className={`px-6 py-4 border-b ${
          isDark ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            История обучения
          </h3>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <table className="w-full table-fixed">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`w-2/5 px-4 py-4 text-left text-sm font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  Курс
                </th>
                <th className={`w-1/5 px-4 py-4 text-left text-sm font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  Тип курса
                </th>
                <th className={`w-1/6 px-3 py-4 text-left text-sm font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  Начало
                </th>
                <th className={`w-1/6 px-3 py-4 text-left text-sm font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  Окончание
                </th>
                <th className={`w-[220px] px-3 py-4 text-center text-sm font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {eduRows.map((row, index) => (
                <tr 
                  key={index}
                  className={`transition-colors ${
                    isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className={`px-4 py-4 border-b ${
                    isDark ? 'border-gray-600 text-white' : 'border-gray-200 text-gray-900'
                  }`}>
                    <div className="font-medium truncate" title={row.org_name}>{row.org_name}</div>
                  </td>
                  <td className={`px-4 py-4 border-b ${
                    isDark ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-600'
                  }`}>
                    <div className="truncate" title={row.position}>{row.position}</div>
                  </td>
                  <td className={`px-3 py-4 border-b ${
                    isDark ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-600'
                  }`}>
                    {formatDate(row.start_date)}
                  </td>
                  <td className={`px-3 py-4 border-b ${
                    isDark ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-600'
                  }`}>
                    {formatDate(row.end_date)}
                  </td>
                  <td className={`px-3 py-4 border-b ${
                    isDark ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                                          {row.id && !([86, 118, 104, 41, 47].includes(row.id)) && (
                      <button
                        onClick={() => getFile(row.id)}
                        className="flex items-center gap-1 px-2 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-xs font-medium"
                        title="Скачать сертификат"
                      >
                        <MdDownload size={14} />
                        <span>Сертификат</span>
                      </button>
                    )}
                      {row.id && (
                        <button
                          onClick={() => handleOpenModal(row.id)}
                          className="flex items-center gap-1 px-2 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs font-medium"
                          title="Оставить отзыв"
                        >
                          <MdStar size={14} />
                          <span>Отзыв</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4 p-4">
          {eduRows.map((row, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-50'
              } border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}
            >
              <div className="space-y-3">
                <div>
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {row.org_name}
                  </h4>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {row.position}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className={`block ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>Начало:</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
                      {formatDate(row.start_date)}
                    </span>
                  </div>
                  <div>
                    <span className={`block ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>Окончание:</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
                      {formatDate(row.end_date)}
                    </span>
                  </div>
                </div>

                {row.id && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    {!([86, 118, 104, 41, 47].includes(row.id)) && (
                      <button
                        onClick={() => getFile(row.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                      >
                        <MdDownload size={16} />
                        Скачать сертификат
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenModal(row.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      <MdStar size={16} />
                      Оставить отзыв
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(eduRows.length === 0 || (eduRows.length === 1 && (eduRows[0].org_name === 'Нет завершенных курсов' || eduRows[0].org_name === 'Ошибка загрузки'))) && (
          <div className="text-center py-16">
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <FaGraduationCap className={`text-3xl ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Нет завершенных курсов
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Завершите курс, чтобы получить сертификат
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileEducation;
