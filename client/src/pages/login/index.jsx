import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import backgroundVideo from "../../assets/video/bg.mp4";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../auth/AuthContext";
import base_url from "../../settings/base_url";

import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import "./index.css";

const Login = () => {
  const { t } = useTranslation();
  const { setIsLoggedIn, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${base_url}/api/aml/auth/authenticate`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "role",
        response.data.body.user.authorities[0]?.authority
      );
      localStorage.setItem("jwtToken", response.data.body.token);
      localStorage.setItem("email", response.data.body.user.email);
      localStorage.setItem("user_id", response.data.body.user.user_id);
      localStorage.setItem("firstname", response.data.body.user.firstname);
      localStorage.setItem("lastname", response.data.body.user.lastname);
      localStorage.setItem(
        "member_of_the_system",
        response.data.body.user.member_of_the_system
      );
      console.log("Login successful:", response.data.body.user);

      setIsLoggedIn(true);
      setAuthUser(response.data.body.user);

      // Smooth navigation after successful login
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Неправильно указан логин или пароль!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };
  return (
    <div
      className="login-page min-h-screen flex overflow-hidden"
      onKeyDown={handleKeyDown}
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain",
        overflowX: "hidden",
      }}
    >
      <Helmet>
        <script type="application/ld+json">
          {`
                        {
                        "@context": "http://schema.org",
                        "@type": "VideoObject",
                        "name": "Задний фон",
                        "description": "Задний фон",
                        "thumbnailUrl": "https://www.amlacdemy.kz/static/media/image.png",
                        "uploadDate": "2024-07-14T08:57:20Z",
                        "contentUrl": "https://www.amlacdemy.kz/static/media/ssssssss.78b66217f6905b1add0c.mp4",
                        "embedUrl": "https://www.amlacdemy.kz/static/media/ssssssss.78b66217f6905b1add0c.mp4"
                        }
                    `}
        </script>
      </Helmet>

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
              Добро пожаловать в AML Academy
            </motion.h2>
          </div>
        </div>
      </motion.div>

      {/* Login Form Section */}
      <motion.div
        className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          overflow: "visible",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="max-w-md w-full space-y-8">
          <motion.div
            className="text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img
              className="mx-auto h-20 w-auto mb-6"
              src={logo}
              alt="Academy Logo"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("welcome")}
            </h1>
            <p className="text-gray-600">Войдите в свою учетную запись</p>
          </motion.div>

          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="space-y-4">
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
                name="password"
                label={t("password")}
                hint={t("hintPassword1")}
                icon={LockClosedIcon}
                isPassword={true}
              /> 
              <div className="flex justify-end">
              <Link
                  to="/reset"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                  Забыли пароль?
              </Link>
          </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExclamationCircleIcon className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Вход...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>{t("Логин")}</span>
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </motion.button>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <span className="text-gray-600">Нет аккаунта? </span>
              <Link
                to="/registration"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                {t("newaccount")}
              </Link>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

const InputField = ({
  name,
  label,
  hint,
  isPassword,
  formData,
  handleChange,
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
                        block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg
                        placeholder-gray-400 text-gray-900 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200
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
    </motion.div>
  );
};

export default Login;
