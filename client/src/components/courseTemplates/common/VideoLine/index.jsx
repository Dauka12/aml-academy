import { PlayIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useId } from 'react';

import img from './../../../../assets/images/Lesson_2_img_1.png';
import './style.scss';

function VideoLine({
    poster = img,
    url
}) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const uniqueId = useId(); // Уникальный ID для каждого экземпляра видео

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
    
    // Check if the URL is a direct video file (Minio or other direct links)
    const isDirectVideoFile = url && (
        // Direct file extensions
        url.toLowerCase().includes('.mp4') || 
        url.toLowerCase().includes('.webm') || 
        url.toLowerCase().includes('.ogg') || 
        url.toLowerCase().includes('.mov') || 
        url.toLowerCase().includes('.avi') ||
        url.toLowerCase().includes('.mkv') ||
        // Minio and storage paths
        url.toLowerCase().includes('minio') ||
        url.includes('/uploads/') ||
        url.includes('/media/') ||
        url.includes('/video/') ||
        url.includes('/storage/') ||
        url.includes('/files/') ||
        // Check if it's not a known video platform but looks like a direct link
        (!url.includes('youtube') && 
         !url.includes('youtu.be') && 
         !url.includes('vimeo') && 
         !url.includes('dailymotion') &&
         !url.includes('twitch') &&
         !url.includes('embed') &&
         // And contains http/https but no platform indicators
         url.includes('http'))
    );

    // Debug logging
    if (url) {
        console.log('VideoLine URL:', url);
        console.log('Is direct video file:', isDirectVideoFile);
    }

    // Ленивая загрузка видео с помощью Intersection Observer
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !hasValidUrl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !shouldLoadVideo) {
                        console.log('VideoLine: Video is in viewport, enabling loading');
                        setShouldLoadVideo(true);
                        observer.unobserve(container);
                    }
                });
            },
            {
                rootMargin: '200px', // Загружаем видео когда оно в 200px от viewport
                threshold: 0.1
            }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, [hasValidUrl, shouldLoadVideo]);

    return (
        <motion.div 
            ref={containerRef}
            className="video-line relative w-full bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {hasValidUrl && shouldLoadVideo ? (
                <div className="relative w-full h-96 md:h-[450px] lg:h-[500px] overflow-hidden">
                    {isDirectVideoFile ? (
                        <video 
                            ref={videoRef}
                            key={uniqueId}
                            id={`video-${uniqueId}`}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            controls
                            preload="none"
                            poster={poster}
                            playsInline
                            controlsList="nodownload"
                        >
                            <source src={url} type="video/mp4" />
                            <source src={url} type="video/webm" />
                            <source src={url} type="video/ogg" />
                            <p className="text-white p-4">
                                Ваш браузер не поддерживает воспроизведение видео.
                                <br />
                                <a href={url} className="text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                                    Скачать видео
                                </a>
                            </p>
                        </video>
                    ) : (
                        <iframe 
                            key={uniqueId}
                            className="absolute top-0 left-0 w-full h-full border-0"
                            src={url} 
                            frameBorder="0" 
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade" 
                            title={`Video Player ${uniqueId}`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            loading="lazy"
                        />
                    )}
                </div>
            ) : hasValidUrl && !shouldLoadVideo ? (
                // Показываем плейсхолдер пока видео не должно загружаться
                <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] group cursor-pointer overflow-hidden">
                    <img 
                        src={poster} 
                        alt="Video thumbnail"
                        className={`w-full h-full object-cover transition-all duration-500 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={handleImageLoad}
                    />
                    
                    {/* Loading skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 animate-pulse" />
                    )}
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 transition-colors duration-300" />
                    
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
                    
                    {/* Video loading message */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                            <p className="text-white text-sm md:text-base font-medium">
                                Preparing video...
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] group cursor-pointer overflow-hidden">
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