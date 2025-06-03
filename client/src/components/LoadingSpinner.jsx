import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className={`${sizes[size]} border-4 border-blue-100 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner spinning ring */}
        <motion.div
          className={`absolute inset-0 ${sizes[size]} border-4 border-transparent border-t-blue-600 border-r-blue-500 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-2 h-2 bg-blue-600 rounded-full" />
        </motion.div>
      </div>

      {/* AML ACADEMY Text */}
      <div className="text-center space-y-2">
        <motion.div
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-blue-600">AML</span>
          <span className="text-gray-700"> ACADEMY</span>
        </motion.div>
        
        {/* Loading dots animation */}
        <motion.div
          className={`${textSizes[size]} text-gray-600 flex items-center justify-center space-x-1`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>{message}</span>
          <div className="flex space-x-1">
            <motion.div
              className="w-1 h-1 bg-blue-600 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0
              }}
            />
            <motion.div
              className="w-1 h-1 bg-blue-600 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.2
              }}
            />
            <motion.div
              className="w-1 h-1 bg-blue-600 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.4
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Full page loading spinner overlay
export const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingSpinner size="large" message={message} />
    </motion.div>
  );
};

// Inline loading spinner for smaller sections
export const InlineLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner size="small" message={message} />
    </div>
  );
};

export default LoadingSpinner;
