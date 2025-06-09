import { motion } from 'framer-motion';

import './style.scss';

const RandomGlossary = ({ title, text, color, backgroundColor }) => {
    const defaultColor = '#3A3939';
    const defaultBackgroundColor = '#CADEFC';
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };
    
    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.1, duration: 0.4 }
        }
    };

    return (
        <motion.div 
            className="w-full max-w-full mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-6 sm:py-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                style={{
                    backgroundColor: backgroundColor || defaultBackgroundColor,
                }}
                variants={contentVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex flex-col p-6 sm:p-8">
                    {title && (
                        <h3 
                            className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left"
                            style={{
                                color: color || defaultColor,
                            }}
                        >
                            {title}
                        </h3>
                    )}
                    
                    <div 
                        className="text-base sm:text-lg font-medium leading-relaxed"
                        style={{
                            color: color || defaultColor,
                        }}
                    >
                        {text}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default RandomGlossary;