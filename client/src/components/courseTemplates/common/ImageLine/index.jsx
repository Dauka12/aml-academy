import { motion } from 'framer-motion';
import { useState } from 'react';

import image from './../../../../assets/images/Image_22.png';

function ImageLine({
    img,
    color,
    height,
    notCrop = true,
    adjustWidth = false,
    alignment = 'center',
}) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Clean URL from quotes
    const cleanUrl = (url) => {
        if (!url) return image;
        return url.replace(/&quot;|"|'/g, '');
    };

    const validatedImg = cleanUrl(img);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
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

    // Get alignment classes
    const getAlignmentClasses = () => {
        switch (alignment) {
            case 'left':
                return 'object-left';
            case 'right':
                return 'object-right';
            default:
                return 'object-center';
        }
    };

    // Get object-fit classes
    const getObjectFitClasses = () => {
        if (adjustWidth) return 'object-contain';
        if (notCrop) return 'object-scale-down';
        return 'object-cover';
    };

    if (img) {
        return (
            <motion.div 
                className="relative w-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.img 
                    src={imageError ? image : validatedImg}
                    alt="Content image"
                    className={`w-full transition-all duration-500 hover:scale-105 ${
                        getObjectFitClasses()
                    } ${getAlignmentClasses()} ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                        height: height ? `${height}px` : 'auto',
                        maxHeight: notCrop ? 'none' : '500px'
                    }}
                    variants={imageVariants}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
                
                {/* Loading skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                )}
            </motion.div>
        );
    }

    if (color) {
        return (
            <motion.div 
                className="w-full rounded-lg shadow-sm"
                style={{
                    backgroundColor: color, 
                    height: height ? `${height}px` : '20px'
                }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, margin: "-100px" }}
            />
        );
    }

    return null;
}


export default ImageLine;