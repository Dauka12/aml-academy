import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdCancel, MdEdit, MdSave } from "react-icons/md";
import base_url from "../../settings/base_url";
import { useStyle } from "../VisualModal/StyleContext";

// Data imports
import go_types from "../data/go_types";
import po_types from "../data/po_types";
import sfm_types from "../data/sfm_types";

const getItems = (entity_type) => {
  if (entity_type === "Субъект финансового мониторнга") return sfm_types;
  if (entity_type === "Государственные органы-регуляторы") return go_types;
  if (entity_type === "Правоохранительные органы") return po_types;
  return ["Выберите"];
};

function ProfileGeneral({ isEdit: externalIsEdit }) {
  const { styles } = useStyle();
  const [data, setData] = useState(null);
  const [localData, setLocalData] = useState({});
  const [changedData, setChangedData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const [job, setJob] = useState("");
  const [localJob, setLocalJob] = useState("");

  const jwtToken = localStorage.getItem("jwtToken");
  const isDark = styles.colorMode === "dark";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/aml/auth/userInfo`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });

        if (response.status === 200) {
          setData(response.data);
          setJob(response.data.job_name);
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
  }, [jwtToken]);

  const handleInfoChange = (name, value) => {
    setChangedData({ ...changedData, [name]: value });
    setLocalData({ ...localData, [name]: value });
  };

  const handleSaveChanges = async () => {
    const params = {
      user_id: localData.user_id,
      lastname: localData.lastname,
      firstname: localData.firstname,
      patronymic: localData.patronymic,
      email: localData.email,
      password: localData.password,
      job_name: localJob,
      ...changedData,
    };

    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
    };

    try {
      await axios.patch(`${base_url}/api/aml/auth/change_user`, params, options);
    } catch (error) {
      console.error(error);
    }

    setJob(localJob);
    setEdit(false);
  };

  const updateLocalData = useCallback(() => {
    setLocalJob(job);
    setLocalData(data);
  }, [job, data]);

  const handleCancelChanges = () => {
    updateLocalData();
    setEdit(false);
  };

  useEffect(() => {
    updateLocalData();
  }, [updateLocalData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Ошибка загрузки данных</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Avatar */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {(localData?.firstname || "").charAt(0)}
            {(localData?.lastname || "").charAt(0)}
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            {localData?.firstname} {localData?.lastname}
          </h2>
          <p className="text-gray-600">{localData?.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {localData?.member_of_the_system || "Не указано"}
            </span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Имя"
          value={localData?.firstname || ""}
          isEdit={isEdit}
          name="firstname"
          placeholder="Введите имя"
          onChange={handleInfoChange}
          isDark={isDark}
        />
        
        <InputField
          label="Номер телефона"
          value={localData?.phone_number || ""}
          isEdit={isEdit}
          name="phone_number"
          placeholder="+7 (777) 777 77 77"
          onChange={handleInfoChange}
          isDark={isDark}
        />
        
        <InputField
          label="Фамилия"
          value={localData?.lastname || ""}
          isEdit={isEdit}
          name="lastname"
          placeholder="Введите фамилию"
          onChange={handleInfoChange}
          isDark={isDark}
        />
        
        <InputField
          label="Email"
          value={localData?.email || ""}
          isEdit={isEdit}
          name="email"
          placeholder="email@example.com"
          onChange={handleInfoChange}
          isDark={isDark}
        />
        
        <InputField
          label="Отчество"
          value={localData?.patronymic || ""}
          isEdit={isEdit}
          name="patronymic"
          placeholder="Введите отчество"
          onChange={handleInfoChange}
          isDark={isDark}
        />
        
        <SelectField
          label="Участник системы"
          value={localData?.member_of_the_system || ""}
          isEdit={isEdit}
          name="member_of_the_system"
          options={[
            "Государственные органы-регуляторы",
            "Субъект финансового мониторнга",
            "Правоохранительные органы",
            "Общественное объединение",
          ]}
          onChange={handleInfoChange}
          isDark={isDark}
        />

        {localData?.member_of_the_system !== "Общественное объединение" ? (
          <SelectField
            label="Вид"
            value={localData?.type_of_member || ""}
            isEdit={isEdit}
            name="type_of_member"
            options={getItems(localData?.member_of_the_system || "")}
            onChange={handleInfoChange}
            isDark={isDark}
          />
        ) : (
          <InputField
            label="Вид"
            value={localData?.type_of_member || ""}
            isEdit={isEdit}
            name="type_of_member"
            placeholder="Введите вид"
            onChange={handleInfoChange}
            isDark={isDark}
          />
        )}

        {localData?.member_of_the_system === "Субъект финансового мониторнга" && (
          <InputField
            label="Занимаемая должность"
            value={localJob || ""}
            isEdit={isEdit}
            name="jobName"
            placeholder="Введите должность"
            onChange={(_, job) => setLocalJob(job)}
            isDark={isDark}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
        {!isEdit ? (
          <button
            onClick={() => setEdit(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <MdEdit size={20} />
            Изменить
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <MdSave size={20} />
              Сохранить
            </button>
            <button
              onClick={handleCancelChanges}
              className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <MdCancel size={20} />
              Отменить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Input Field Component
const InputField = ({ label, value, isEdit, name, placeholder, onChange, isDark, isPassword }) => {
  const [showPassword, setShowPassword] = useState(isPassword);

  return (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "password" : "text"}
          value={value}
          disabled={!isEdit}
          placeholder={placeholder}
          onChange={(e) => onChange(name, e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
            isEdit
              ? `border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                  isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                }`
              : `border-gray-200 ${
                  isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'
                }`
          } focus:outline-none`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

// Select Field Component
const SelectField = ({ label, value, isEdit, name, options, onChange, isDark }) => {
  return (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <select
        value={value}
        disabled={!isEdit}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
          isEdit
            ? `border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              }`
            : `border-gray-200 ${
                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'
              }`
        } focus:outline-none`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfileGeneral;
