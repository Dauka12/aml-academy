import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React from 'react';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

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
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
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
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    if (!images?.length) return null;

    return (
        <motion.div 
            className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 py-6 md:py-8 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8">
                {images.map((image, index) => (
                    <React.Fragment key={index}>
                        <motion.div 
                            className="flex flex-col items-center text-center group"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className="relative mb-4 overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                <img 
                                    src={image} 
                                    alt={`Sequence step ${index + 1}`}
                                    className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                
                                {/* Step number overlay */}
                                <div className="absolute top-2 left-2 bg-blue-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                    {index + 1}
                                </div>
                            </div>
                            
                            {/* Description */}
                            <div className="max-w-40 md:max-w-48">
                                {list ? (
                                    list[index] && (
                                        <p 
                                            className="text-sm md:text-base font-medium text-gray-700 leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: processTextWithFormattingHTML(list[index]?.toString() || '')
                                            }}
                                        />
                                    )
                                ) : (
                                    imageDescriptions?.[index] && (
                                        <p 
                                            className="text-sm md:text-base font-medium text-gray-700 leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: processTextWithFormattingHTML(imageDescriptions[index]?.toString() || '')
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        </motion.div>
                        
                        {/* Arrow between items */}
                        {index !== images.length - 1 && (
                            <motion.div 
                                className="flex items-center justify-center"
                                variants={arrowVariants}
                            >
                                <div className="hidden md:block">
                                    <ArrowRightIcon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500" />
                                </div>
                                <div className="block md:hidden">
                                    <div className="w-0.5 h-8 bg-blue-500 mx-auto" />
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