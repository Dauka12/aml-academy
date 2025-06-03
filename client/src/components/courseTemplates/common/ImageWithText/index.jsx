import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer';

import defaultImage from './../../../../assets/images/Image_231.png';

function ImageWithText({ img, imageText, color, children, version = 1 }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Clean URL from quotes
    const cleanUrl = (url) => {
        if (!url) return defaultImage;
        return url.replace(/&quot;|"|'/g, '');
    };

    const validatedImg = cleanUrl(img);
    const validatedColor = color || '#000000';
    const validatedImageText = imageText || '';

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

    const imageVariants = {
        hidden: { opacity: 0, scale: 1.1 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const textVariants = {
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

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
    };

    return (
        <motion.div 
            className="relative w-full my-6 md:my-8 lg:my-10 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Image Container */}
            <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-100">
                <motion.img 
                    src={imageError ? defaultImage : validatedImg}
                    alt={validatedImageText || "Course content image"}
                    className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    variants={imageVariants}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
                
                {/* Loading skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Text Content */}
            <motion.div 
                className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8"
                variants={textVariants}
            >
                {/* Decorative border */}
                <div 
                    className="w-16 md:w-20 h-1 mb-3 md:mb-4 rounded-full"
                    style={{ backgroundColor: validatedColor }}
                />
                
                {/* Text content */}
                <div className="text-white">                    {version === 2 ? (
                        <div 
                            className="text-sm md:text-base lg:text-lg leading-relaxed"
                            style={{ color: validatedColor === '#000000' ? '#ffffff' : validatedColor }}
                            dangerouslySetInnerHTML={{
                                __html: processTextWithFormattingHTML(validatedImageText)
                            }}
                        />
                    ) : (
                        children ? (
                            <div 
                                className="text-sm md:text-base lg:text-lg leading-relaxed"
                                style={{ color: validatedColor === '#000000' ? '#ffffff' : validatedColor }}
                            >
                                {children}
                            </div>                        ) : (
                            <div 
                                className="text-sm md:text-base lg:text-lg leading-relaxed"
                                style={{ color: validatedColor === '#000000' ? '#ffffff' : validatedColor }}
                                dangerouslySetInnerHTML={{
                                    __html: processTextWithFormattingHTML(validatedImageText)
                                }}
                            />
                        )
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

ImageWithText.propTypes = {
    img: PropTypes.string,
    imageText: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.node,
    version: PropTypes.number,
};

export default ImageWithText;