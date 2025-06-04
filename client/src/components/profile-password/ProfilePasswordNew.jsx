import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaKey, FaShieldAlt } from 'react-icons/fa';
import { MdCancel, MdEdit, MdLock, MdSave, MdSecurity } from 'react-icons/md';
import base_url from '../../settings/base_url';
import { useStyle } from "../VisualModal/StyleContext";

// Input Field Component with Password Toggle
const PasswordInputField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  isEdit, 
  isDark,
  name,
  error 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          disabled={!isEdit}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 pr-12 ${
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
              : isEdit
              ? `border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                  isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                }`
              : `border-gray-200 ${
                  isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'
                }`
          } focus:outline-none`}
        />
        {isEdit && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

function ProfilePassword() {
  const { styles } = useStyle();
  const [isEdit, setEdit] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const jwtToken = localStorage.getItem('jwtToken');
  const isDark = styles.colorMode === "dark";
  const isBlue = styles.colorMode === "blue";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${base_url}/api/aml/auth/userInfo`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.status === 200) {
          setData(response.data);
        } else {
          setError('Ошибка загрузки данных пользователя');
        }
      } catch (error) {
        console.error(error);
        setError('Ошибка сети при загрузке данных');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jwtToken]);

  const handlePasswordChange = (password) => {
    setPassword(password);
    if (passwordMismatchError) {
      setPasswordMismatchError(false);
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handlePasswordConfirmChange = (password) => {
    setConfirmPassword(password);
    if (passwordMismatchError) {
      setPasswordMismatchError(false);
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validatePasswords = () => {
    if (!password) {
      setError('Введите новый пароль');
      return false;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordMismatchError(true);
      return false;
    }
    return true;
  };

  const handleSaveChanges = async () => {
    if (!validatePasswords()) return;

    setIsSaving(true);
    setPasswordMismatchError(false);
    setError(null);

    const params = {
      user_id: data.user_id,
      lastname: data.lastname,
      firstname: data.firstname,
      patronymic: data.patronymic,
      email: data.email,
      password: password,
    };

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      await axios.patch(`${base_url}/api/aml/auth/change_user`, params, options);
      
      setSuccessMessage('Пароль успешно изменен!');
      setPassword('');
      setConfirmPassword('');
      setEdit(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error(error);
      setError('Ошибка при изменении пароля');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelChanges = () => {
    setEdit(false);
    setPassword('');
    setConfirmPassword('');
    setPasswordMismatchError(false);
    setError(null);
    setSuccessMessage('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl text-white">
          <MdSecurity size={24} />
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Безопасность
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Управление паролем и настройки безопасности
          </p>
        </div>
      </div>

      {/* Security Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-700/50' : isBlue ? 'bg-blue-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
        } border ${isDark ? 'border-gray-600' : 'border-blue-100'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <FaKey size={20} />
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Надежный пароль
            </h3>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Используйте минимум 6 символов, включая буквы и цифры
          </p>
        </div>

        <div className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-700/50' : isBlue ? 'bg-green-50' : 'bg-gradient-to-br from-green-50 to-emerald-50'
        } border ${isDark ? 'border-gray-600' : 'border-green-100'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500 rounded-lg text-white">
              <FaShieldAlt size={20} />
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Безопасность данных
            </h3>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Ваши данные защищены современным шифрованием
          </p>
        </div>
      </div>

      {/* Password Change Form */}
      <div className={`rounded-xl overflow-hidden ${
        isDark ? 'bg-gray-800/50' : 'bg-white'
      } shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        
        {/* Form Header */}
        <div className={`px-6 py-4 border-b ${
          isDark ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center gap-3">
            <MdLock className={isDark ? 'text-gray-400' : 'text-gray-600'} size={20} />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Сменить пароль
            </h3>
          </div>
        </div>

        <div className="p-6">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-green-700 font-medium">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PasswordInputField
                label="Новый пароль"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Введите новый пароль"
                isEdit={isEdit}
                isDark={isDark}
                name="password"
              />
              
              <PasswordInputField
                label="Повторите пароль"
                value={confirmPassword}
                onChange={handlePasswordConfirmChange}
                placeholder="Повторите новый пароль"
                isEdit={isEdit}
                isDark={isDark}
                name="confirmPassword"
                error={passwordMismatchError ? "Пароли не совпадают" : null}
              />
            </div>

            {/* Security Tips */}
            {isEdit && (
              <div className={`p-4 rounded-xl ${
                isDark ? 'bg-gray-700/30' : 'bg-yellow-50'
              } border ${isDark ? 'border-gray-600' : 'border-yellow-200'}`}>
                <h4 className={`font-medium mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-800'}`}>
                  💡 Рекомендации по безопасности:
                </h4>
                <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-400' : 'text-yellow-700'}`}>
                  <li>• Используйте минимум 6 символов</li>
                  <li>• Включите буквы, цифры и специальные символы</li>
                  <li>• Не используйте личную информацию</li>
                  <li>• Не используйте этот пароль на других сайтах</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`px-6 py-4 border-t ${
          isDark ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            {!isEdit ? (
              <button
                onClick={() => setEdit(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
              >
                <MdEdit size={20} />
                Изменить пароль
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancelChanges}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MdCancel size={20} />
                  Отменить
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving || !password || !confirmPassword}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <MdSave size={20} />
                      Сохранить пароль
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Additional Security Info */}
      <div className={`p-6 rounded-xl ${
        isDark ? 'bg-gray-800/30' : 'bg-gray-50'
      } border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg mt-1">
            <MdSecurity className="text-blue-600" size={20} />
          </div>
          <div>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Безопасность аккаунта
            </h4>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
              Регулярно обновляйте пароль для обеспечения безопасности вашего аккаунта. 
              При смене пароля вы останетесь авторизованы на этом устройстве, но будете 
              автоматически выйти из системы на всех других устройствах.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePassword;
