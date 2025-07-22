import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import backgroundVideo from "../../assets/video/bg.mp4";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet";
import "./index.css";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      await axios.post("/api/aml/auth/reset", { email });
      setMessage("Ссылка для восстановления пароля отправлена на ваш email.");
    } catch (error) {
      setError("Не удалось отправить ссылку для восстановления пароля.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="login-page min-h-screen flex overflow-hidden"
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
      {/* Reset Form Section */}
      <motion.div
        className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ overflow: "visible", WebkitOverflowScrolling: "touch" }}
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
              Восстановление пароля
            </h1>
          
          </motion.div>
          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Введите ваш email"
              />
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
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? "Отправка..." : "Отправить верификационный код"}
            </motion.button>
            {message && (
              <div className="text-green-600 text-sm text-center mt-2">
                Код отправлен на ваш email
              </div>
            )}
            <Link
              to="/login"
              className="group relative w-full flex justify-center py-3 px-4 mt-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              style={{ textAlign: "center" }}
            >
              <span className="flex items-center justify-center">
                <span className="font-bold">Войти</span>
                <svg
                  className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </span>
            </Link>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Reset;
