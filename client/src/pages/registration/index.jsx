import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import backgroundVideo from "../../assets/video/bg.mp4";
import po_types from "../../components/data/po_types";
import po_typesEng from "../../components/data/po_typesEng";
import po_typesKz from "../../components/data/po_typesKz";
import go_types from "../../components/data/go_types";
import go_typesEng from "../../components/data/go_typesEng";
import go_typesKz from "../../components/data/go_typesKz";
import sfm_types from "../../components/data/sfm_types";
import sfm_typesEng from "../../components/data/sfm_typesEng";
import sfm_typesKz from "../../components/data/sfm_typesKz";

import {
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { useTranslation } from "react-i18next";
import base_url from "../../settings/base_url";
import "./index.css";

const Registration = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const getItems = (entity_type) => {
    const currentLang = i18n.language.toLowerCase().startsWith('ru') ? 'ru' 
      : i18n.language.toLowerCase().startsWith('kz') ? 'kz' 
      : 'en';
      
    if (entity_type === "Субъект финансового мониторнга") {
      return currentLang === "ru" 
        ? ["Выберите", ...sfm_types]
        : currentLang === "kz"
        ? ["Таңдаңыз", ...sfm_typesKz]
        : ["Select", ...sfm_typesEng];
    }
    if (entity_type === "Государственные органы-регуляторы") {
      return currentLang === "ru"
        ? ["Выберите", ...go_types]
        : currentLang === "kz"
        ? ["Таңдаңыз", ...go_typesKz]
        : ["Select", ...go_typesEng];
    }
    if (entity_type === "Правоохранительные органы") {
      return currentLang === "ru"
        ? ["Выберите", ...po_types]
        : currentLang === "kz"
        ? ["Таңдаңыз", ...po_typesKz]
        : ["Select", ...po_typesEng];
    }
    return currentLang === "ru" 
      ? ["Выберите"]
      : currentLang === "kz"
      ? ["Таңдаңыз"]
      : ["Select"];
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    firstname: "",
    lastname: "",
    patronymic: "",
    phone_number: "",
    iin: "",
    member_of_the_system: "Государственные органы-регуляторы",
    type_of_member: "",
  });

  const [requiredFields, setRequiredFields] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [policyChecked, setPolicyChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, name) => {
    e.preventDefault();
    setFormData({ ...formData, [name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const missingFields = {};
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    if (!formData["firstname"]) {
      missingFields["firstname"] = true;
    }
    if (!formData["lastname"]) {
      missingFields["lastname"] = true;
    }
    if (!formData["iin"]) {
      missingFields["iin"] = true;
    } else if (!/^\d{12}$/.test(formData["iin"])) {
      setErrorMessage("ИИН должен содержать ровно 12 цифр");
      setRequiredFields({ ...missingFields, iin: true });
      setIsLoading(false);
      return;
    }
    if (!policyChecked) {
      setErrorMessage("Необходимо согласие на обработку персональных данных");
      setIsLoading(false);
      return;
    }
    if (Object.keys(missingFields)?.length > 0) {
      setErrorMessage("Введите все обязательные поля");
      setRequiredFields(missingFields);
      setIsLoading(false);
      return;
    }

    if (formData["password"] === formData["confirm_password"]) {
      try {
        await axios.post(`${base_url}/api/aml/auth/register`, {
          firstname: formData["firstname"],
          lastname: formData["lastname"],
          patronymic: formData["patronymic"],
          email: formData["email"],
          phone_number: formData["phone_number"],
          iin: formData["iin"],
          password: formData["password"],
          member_of_the_system: formData["member_of_the_system"],
          type_of_member:
            formData["type_of_member"] === "Выберите"
              ? ""
              : formData["type_of_member"],
        });

        setSuccessMessage("Поздравляем с успешной регистрацией!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.error);
        } else if (error.request) {
          setErrorMessage("Ошибка сети. Попробуйте еще раз.");
        } else {
          setErrorMessage("Произошла ошибка. Попробуйте еще раз.");
        }
      }
    } else {
      setErrorMessage("Пароли не совпадают.");
    }
    setIsLoading(false);
  };

  return (
    <div
      className="registration-page min-h-screen flex overflow-hidden"
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain",
        overflowX: "hidden",
      }}
    >
      {/* Background Video Section */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-70 z-10"></div>
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="relative z-20 flex items-center justify-center w-full">
          <div className="text-center text-white p-8">
            <motion.h2
              className="text-4xl font-bold mb-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Присоединяйтесь к AML Academy
            </motion.h2>
            <motion.p
              className="text-xl opacity-90"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Создайте аккаунт и начните обучение
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Registration Form Section */}
      <motion.div
        className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-8"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          overflow: "visible",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="max-w-2xl w-full space-y-8">
          <motion.div
            className="text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img
              className="mx-auto h-16 w-auto mb-6"
              src={logo}
              alt="Academy Logo"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("welcome")}
            </h1>
            <p className="text-gray-600">Создайте новую учетную запись</p>
          </motion.div>

          <AnimatePresence>
            {successMessage && (
              <motion.div
                className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg flex items-center space-x-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                <span className="text-sm font-medium">{successMessage}</span>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center space-x-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ExclamationCircleIcon className="h-6 w-6 flex-shrink-0" />
                <span className="text-sm font-medium">{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                formData={formData}
                handleChange={handleChange}
                name="firstname"
                label={t("firstname")}
                hint={t("hintFirstname")}
                icon={UserIcon}
                required={requiredFields["firstname"]}
              />

              <InputField
                formData={formData}
                handleChange={handleChange}
                name="lastname"
                label={t("lastname")}
                hint={t("hintLastname")}
                icon={UserIcon}
                required={requiredFields["lastname"]}
              />

              <InputField
                formData={formData}
                handleChange={handleChange}
                name="patronymic"
                label={t("patronymic")}
                hint={t("hintPatronymic")}
                icon={UserIcon}
              />

              <InputField
                formData={formData}
                handleChange={handleChange}
                name="iin"
                label="ИИН"
                hint="Введите ваш ИИН"
                icon={UserIcon}
                required={requiredFields["iin"]}
              />

              <InputField
                formData={formData}
                handleChange={handleChange}
                name="email"
                label={t("email")}
                hint={t("hintEmail")}
                icon={EnvelopeIcon}
                type="email"
              />

              <InputField
                formData={formData}
                handleChange={handleChange}
                name="phone_number"
                label={t("phone_number")}
                hint={t("phone_number")}
                icon={PhoneIcon}
                type="tel"
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                name="password"
                label={t("password")}
                hint={t("hintPassword")}
                icon={LockClosedIcon}
                isPassword={true}
              />

              <InputField
                formData={formData}
                handleChange={handleChange}
                name="confirm_password"
                label={t("confirm_password")}
                hint={t("hintConfirm_password")}
                icon={LockClosedIcon}
                isPassword={true}
              />
            </div>

            <div className="space-y-4">
              <SelectField
                formData={formData}
                handleChange={handleChange}
                selectItems={[
                  t("member1"),
                  t("member2"),
                  t("member3"),
                  t("member4"),
                ]}
                name="member_of_the_system"
                label={t("member of the system")}
                icon={BuildingOfficeIcon}
              />

              {formData["member_of_the_system"] !==
              "Общественное объединение" ? (
                <SelectField
                  formData={formData}
                  handleChange={handleChange}
                  selectItems={getItems(formData["member_of_the_system"])}
                  name="type_of_member"
                  label={t("sfmType")}
                  icon={BuildingOfficeIcon}
                />
              ) : (
                <InputField
                  formData={formData}
                  handleChange={handleChange}
                  name="type_of_member"
                  label={t("sfmType")}
                  hint={t("hintSfm")}
                  icon={BuildingOfficeIcon}
                />
              )}
            </div>

            <motion.div
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <input
                type="checkbox"
                id="policy-checkbox"
                checked={policyChecked}
                onChange={(e) => setPolicyChecked(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="policy-checkbox"
                className="text-sm text-gray-700"
              >
                {t("consent1")}{" "}
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  {t("consent2")}
                </Link>
              </label>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Регистрация...</span>
                </div>
              ) : (
                t("regestration")
              )}
            </motion.button>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <span className="text-gray-600">{t("already")} </span>
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                {t("enters")}
              </Link>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

const SelectField = ({
  name,
  label,
  selectItems,
  formData,
  handleChange,
  icon: Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="space-y-2"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={(e) => handleChange(e, name)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
        >
          {selectItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

const InputField = ({
  name,
  label,
  hint,
  isPassword,
  formData,
  handleChange,
  required,
  icon: Icon,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="space-y-2"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={name}
          name={name}
          type={isPassword ? (showPassword ? "password" : "text") : type}
          value={formData[name]}
          onChange={(e) => handleChange(e, name)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={hint}
          className={`
                        block w-full pl-10 pr-12 py-3 border rounded-lg
                        placeholder-gray-400 text-gray-900 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200
                        ${required ? "border-red-300" : "border-gray-300"}
                        ${isFocused ? "shadow-lg" : "shadow-sm"}
                    `}
        />
        {isPassword && (
          <motion.button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword((prev) => !prev)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            )}
          </motion.button>
        )}
      </div>
      {required && (
        <motion.p
          className="text-red-500 text-xs mt-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          Это поле обязательно для заполнения
        </motion.p>
      )}
    </motion.div>
  );
};

export default Registration;
