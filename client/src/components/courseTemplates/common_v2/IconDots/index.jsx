import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

const IconDots = ({ 
    list, 
    color, 
    header, 
    gap = 20, 
    icons, 
    height = '40px', 
    width = '40px', 
    fontSize = '16px' 
}) => {
    const defaultColor = '#3A3939';
    const defaultIcon = 'https://static.thenounproject.com/png/4084271-200.png';

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.div 
            className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 py-6 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {header && (
                <motion.h3 
                    className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 text-center"
                    style={{ color: color || defaultColor }}
                    variants={headerVariants}
                    dangerouslySetInnerHTML={{
                        __html: processTextWithFormattingHTML(header?.toString() || '')
                    }}
                />
            )}
            
            <div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8"
                style={{ gap: `${gap}px` }}
            >
                {list?.map((item, index) => (
                    <motion.div 
                        key={index}
                        className="flex flex-col items-center text-center group"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <motion.div 
                            className="relative mb-4 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300"
                            style={{
                                height: height,
                                width: width,
                                color: color || defaultColor
                            }}
                            variants={iconVariants}
                            whileHover="hover"
                        >
                            <img 
                                src={icons?.[index] || defaultIcon}
                                alt={`Icon ${index + 1}`}
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                        
                        <div 
                            className="text-gray-700 leading-relaxed font-medium"
                            style={{ 
                                fontSize: fontSize,
                                color: color || defaultColor
                            }}
                            dangerouslySetInnerHTML={{
                                __html: processTextWithFormattingHTML(item?.toString() || '')
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};


export default IconDots;