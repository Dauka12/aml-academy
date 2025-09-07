
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

function TextAndLink({ 
    children, 
    text = 'Ссылка', 
    link, 
    linkText, 
    textColor, 
    linkColor, 
    linkBackgroundColor 
}) {
    if (!link) return null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const linkVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.9,
            rotateX: -10
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
            }
        },
        hover: {
            scale: 1.02,
            y: -2,
            rotateX: 2,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1 }
        }
    };

    const iconVariants = {
        rest: { rotate: 0 },
        hover: { 
            rotate: 15,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div 
            className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="space-y-6">
                {/* Text Section */}
                <motion.div
                    variants={textVariants}
                    className="text-base sm:text-lg lg:text-xl leading-relaxed"
                    style={{ color: textColor || '#374151' }}
                    dangerouslySetInnerHTML={{
                        __html: processTextWithFormattingHTML(text)
                    }}
                />

                {/* Link Section */}
                <motion.div
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="inline-block"
                >
                    <Link 
                        to={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 px-6 py-4 rounded-xl 
                                 font-medium text-sm sm:text-base transition-all duration-300
                                 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-opacity-50
                                 shadow-lg hover:shadow-xl"
                        style={{
                            backgroundColor: linkBackgroundColor || '#3B82F6',
                            color: linkColor || '#FFFFFF'
                        }}
                    >
                        {/* Background Gradient Overlay */}
                        <div 
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                                     transition-opacity duration-300"
                            style={{
                                background: `linear-gradient(135deg, 
                                    ${linkBackgroundColor || '#3B82F6'}, 
                                    ${linkBackgroundColor ? `${linkBackgroundColor}CC` : '#1D4ED8'})`
                            }}
                        />
                        
                        {/* Link Text */}
                        <span className="relative z-10 font-semibold tracking-wide">
                            {linkText || 'Перейти по ссылке'}
                        </span>

                        {/* Arrow Icon */}
                        <motion.svg
                            variants={iconVariants}
                            className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                            />
                        </motion.svg>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                                          opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full 
                                          group-hover:translate-x-full transition-all duration-700" />
                        </div>
                    </Link>
                </motion.div>

                {/* Additional Visual Elements */}
                <motion.div 
                    className="flex justify-center pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <div 
                        className="w-16 h-1 rounded-full opacity-30"
                        style={{ backgroundColor: linkBackgroundColor || '#3B82F6' }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default TextAndLink;