import { PlayIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useState } from 'react';

import img from './../../../../assets/images/Lesson_2_img_1.png';

function VideoLine({
    poster = img,
    url
}) {
    const [imageLoaded, setImageLoaded] = useState(false);

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

    const playButtonVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.3
            }
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.2
            }
        }
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const hasValidUrl = url && url.trim() !== '';

    return (
        <motion.div 
            className="relative w-full bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {hasValidUrl ? (
                <div className="relative w-full h-64 md:h-80 lg:h-96">
                    <iframe 
                        className="w-full h-full"
                        src={`${url}${url.includes('?') ? '&' : '?'}autoplay=0&auto_play=false`} 
                        frameBorder="0" 
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade" 
                        title="Video Player"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                </div>
            ) : (
                <div className="relative w-full h-64 md:h-80 lg:h-96 group cursor-pointer">
                    {/* Poster Image */}
                    <img 
                        src={poster} 
                        alt="Video thumbnail"
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={handleImageLoad}
                    />
                    
                    {/* Loading skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 animate-pulse" />
                    )}
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Play Button */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        variants={playButtonVariants}
                        whileHover="hover"
                    >
                        <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-300">
                            <PlayIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-800 ml-1" />
                        </div>
                    </motion.div>
                    
                    {/* Video unavailable message */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                            <p className="text-white text-sm md:text-base font-medium">
                                Video preview - Click to play when available
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default VideoLine;