import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import { useLocation } from 'react-router';

function NextLesson({ nextLessonName, handleOnClick }) {
    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    useEffect(() => {
        if (
            (location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)
        ) {
            setKazakh(true);
        }
    }, [location.pathname, location.search]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        rest: { scale: 1, x: 0 },
        hover: { 
            scale: 1.05, 
            x: 10,
            transition: { 
                duration: 0.3,
                ease: "easeOut"
            }
        },
        tap: { scale: 0.95 }
    };

    const iconVariants = {
        rest: { rotate: 0, x: 0 },
        hover: { 
            rotate: 15,
            x: 5,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div 
            className="w-full bg-gradient-to-r from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="max-w-4xl mx-auto flex justify-end">
                <motion.button
                    className="group relative flex items-center gap-4 px-8 py-4 bg-white rounded-xl 
                             shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200
                             focus:outline-none focus:ring-4 focus:ring-blue-100"
                    onClick={handleOnClick}
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                >
                    {/* Background Gradient Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 
                                  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-4">
                        {/* Text */}
                        <span className="text-base sm:text-lg font-semibold text-gray-700 
                                       group-hover:text-blue-600 transition-colors duration-300">
                            {nextLessonName ? 
                                nextLessonName : 
                                isKazakh 
                                    ? 'Келесі сабақ' 
                                    : 'Следующая лекция'
                            }
                        </span>

                        {/* Icon Container */}
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center
                                      group-hover:bg-blue-200 transition-colors duration-300">
                            <motion.div
                                variants={iconVariants}
                                className="text-blue-600"
                            >
                                <GrLinkNext size={20} />
                            </motion.div>
                        </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r 
                                      from-transparent via-white to-transparent opacity-20 
                                      group-hover:left-full transition-all duration-700 skew-x-12" />
                    </div>
                </motion.button>
            </div>
        </motion.div>
    );
}

export default NextLesson;