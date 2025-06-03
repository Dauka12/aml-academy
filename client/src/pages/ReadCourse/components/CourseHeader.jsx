import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CourseHeader = ({ courseName, onToggleNav, isNavOpen }) => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-b border-gray-200 shadow-sm z-30 relative"
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Navigation Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleNav}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            aria-label="Toggle navigation"
          >
            {isNavOpen ? (
              <HiX className="w-6 h-6 text-gray-600" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-600" />
            )}
          </motion.button>

          {/* Desktop Navigation Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleNav}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation"
          >
            <HiMenu className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/courses')}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
          >
            <IoArrowBack className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Назад к курсам</span>
          </motion.button>
        </div>

        {/* Center Section - Course Title */}
        <div className="flex-1 max-w-2xl mx-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl font-semibold text-gray-900 truncate text-center"
            title={courseName}
          >
            {courseName}
          </motion.h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Course Actions could be added here */}
          <div className="w-16"></div> {/* Spacer for balance */}
        </div>
      </div>
    </motion.header>
  );
};

export default CourseHeader;
