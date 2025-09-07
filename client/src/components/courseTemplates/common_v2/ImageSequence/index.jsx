import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React from 'react';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

function ImageSequence({
    images,
    imageDescriptions,
    list
}) {

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    const arrowVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const numberVariants = {
        hidden: { opacity: 0, scale: 0, rotate: -45 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2
            }
        }
    };

    if (!images?.length) return null;

    // Colors for different steps (can be customized or passed as props)
    const stepColors = [
        'bg-gradient-to-br from-blue-600 to-blue-800',
        'bg-gradient-to-br from-teal-500 to-teal-700',
        'bg-gradient-to-br from-indigo-500 to-indigo-700',
        'bg-gradient-to-br from-purple-500 to-purple-700',
        'bg-gradient-to-br from-cyan-500 to-cyan-700',
    ];

    return (
        <motion.div 
            className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 py-10 md:py-12 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Mobile view: vertical layout */}
            <div className="md:hidden space-y-10">
                {images.map((image, index) => (                    <motion.div 
                        key={index}
                        className="flex flex-col items-center"
                        variants={itemVariants}
                    >
                        <div className="relative mb-6">
                            {/* Step number circle with gradient border */}
                            <motion.div 
                                className={`relative h-[120px] w-[120px] rounded-full overflow-hidden p-1 shadow-xl ${stepColors[index % stepColors.length]}`}
                                variants={numberVariants}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {/* Inner image container */}
                                <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white">
                                    <img 
                                        src={image} 
                                        alt={`Этап ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                {/* Prominent step number */}
                                <div 
                                    className={`absolute top-1 left-1 ${stepColors[index % stepColors.length]} text-white text-xl font-bold rounded-full w-9 h-9 flex items-center justify-center shadow-lg`}
                                >
                                    {index + 1}
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Description */}
                        <div className="max-w-[280px] text-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 + (index * 0.1) }}
                            >
                                {list ? (
                                    list[index] && (
                                        <p 
                                            className="text-base font-medium text-gray-800 leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: processTextWithFormattingHTML(list[index]?.toString() || '')
                                            }}
                                        />
                                    )
                                ) : (
                                    imageDescriptions?.[index] && (
                                        <p 
                                            className="text-base font-medium text-gray-800 leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: processTextWithFormattingHTML(imageDescriptions[index]?.toString() || '')
                                            }}
                                        />
                                    )
                                )}
                            </motion.div>
                        </div>
                        
                        {/* Arrow to next element */}
                        {index !== images.length - 1 && (
                            <motion.div 
                                className="my-3"
                                variants={arrowVariants}
                            >
                                <ArrowDownIcon className="w-6 h-6 text-blue-500" />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
            
            {/* Desktop view: horizontal layout with more visual appeal */}
            <div className="hidden md:flex md:items-center md:justify-center">
                {images.map((image, index) => (
                    <React.Fragment key={index}>
                        <motion.div 
                            className="flex flex-col items-center text-center group relative"
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        >
                            {/* Image container with fancy styling */}
                            <div className="relative mb-6">
                                <motion.div 
                                    className={`relative h-[160px] w-[160px] lg:h-[180px] lg:w-[180px] rounded-full overflow-hidden p-1 shadow-xl ${stepColors[index % stepColors.length]}`}
                                    variants={numberVariants}
                                >
                                    {/* Inner white border */}
                                    <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white">
                                        <img 
                                            src={image} 
                                            alt={`Этап ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    
                                    {/* Step number */}
                                    <div 
                                        className={`absolute top-2 left-2 ${stepColors[index % stepColors.length]} text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg`}
                                    >
                                        {index + 1}
                                    </div>
                                </motion.div>
                                
                                {/* Optional "STEP" label */}
                                <motion.div 
                                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${stepColors[index % stepColors.length]} text-white font-bold px-3 py-1 rounded-full text-xs tracking-wider shadow-md`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                >
                                    ЭТАП
                                </motion.div>
                            </div>
                            
                            {/* Text description */}
                            <div className="max-w-[180px] lg:max-w-[200px]">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                >
                                    {list ? (
                                        list[index] && (
                                            <p 
                                                className="text-sm lg:text-base font-medium text-gray-800 leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: processTextWithFormattingHTML(list[index]?.toString() || '')
                                                }}
                                            />
                                        )
                                    ) : (
                                        imageDescriptions?.[index] && (
                                            <p 
                                                className="text-sm lg:text-base font-medium text-gray-800 leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: processTextWithFormattingHTML(imageDescriptions[index]?.toString() || '')
                                                }}
                                            />
                                        )
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                        
                        {/* Arrow between items */}
                        {index !== images.length - 1 && (
                            <motion.div 
                                className="flex items-center justify-center mx-4 lg:mx-6"
                                variants={arrowVariants}
                            >
                                <div className="w-12 lg:w-16 flex items-center">
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ 
                                            repeat: Infinity, 
                                            duration: 1.5,
                                            ease: "easeInOut" 
                                        }}
                                    >
                                        <ArrowRightIcon className="w-8 h-8 lg:w-10 lg:h-10 text-blue-500" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </motion.div>
    );
}


export default ImageSequence;