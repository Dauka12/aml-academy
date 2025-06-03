import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium', message = null, isKazakh = false }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const defaultMessage = isKazakh ? 'Жүктелуде...' : 'Загрузка...';

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className={`${sizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {(message || defaultMessage) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-600 text-center"
        >
          {message || defaultMessage}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
