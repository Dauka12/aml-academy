import { PlayIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

import img from './../../../../assets/images/Lesson_2_img_1.png';

function VideoLine({
    poster = img,
    url
}) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const videoRef = useRef(null);

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

    // Обработка Minio URL для предотвращения автозапуска
    const getProcessedMinioUrl = (originalUrl) => {
        if (!originalUrl || !isDirectVideoFile) return originalUrl;
        
        try {
            // Добавляем параметры к Minio URL чтобы браузер не автоматически воспроизводил
            const url = new URL(originalUrl);
            
            // Множественные параметры для предотвращения автозапуска
            url.searchParams.set('response-content-disposition', 'inline; filename="video"');
            url.searchParams.set('response-content-type', 'video/mp4');
            url.searchParams.set('response-cache-control', 'no-cache, no-store, must-revalidate');
            url.searchParams.set('response-pragma', 'no-cache');
            url.searchParams.set('response-expires', '0');
            
            // Добавляем timestamp чтобы избежать кэширования
            url.searchParams.set('t', Date.now().toString());
            
            console.log('Processed Minio URL:', url.toString());
            return url.toString();
        } catch (error) {
            console.error('Error processing Minio URL:', error);
            return originalUrl;
        }
    };

    // Обработка URL для iframe (YouTube и другие платформы)
    const getProcessedIframeUrl = (originalUrl) => {
        if (!originalUrl) return '';
        
        let processedUrl = originalUrl;
        
        // Специальная обработка YouTube URL
        if (originalUrl.includes('youtube.com') || originalUrl.includes('youtu.be')) {
            // Убираем существующие параметры автозапуска если есть
            processedUrl = processedUrl.replace(/[?&]autoplay=[^&]*/gi, '');
            processedUrl = processedUrl.replace(/[?&]auto_play=[^&]*/gi, '');
            
            // Добавляем наши параметры
            const separator = processedUrl.includes('?') ? '&' : '?';
            processedUrl = `${processedUrl}${separator}autoplay=0&auto_play=false&controls=1&modestbranding=1`;
        } else {
            // Для других платформ
            const separator = processedUrl.includes('?') ? '&' : '?';
            processedUrl = `${processedUrl}${separator}autoplay=0&auto_play=false&controls=1`;
        }
        
        return processedUrl;
    };

    // Принудительно останавливаем автозапуск для видео
    useEffect(() => {
        if (videoRef.current && isDirectVideoFile) {
            const video = videoRef.current;
            
            // Множественная защита от автозапуска
            const preventAutoplay = () => {
                if (video.autoplay) {
                    video.autoplay = false;
                }
                if (!video.paused) {
                    video.pause();
                }
                video.currentTime = 0;
                video.muted = false; // Убираем muted чтобы избежать автозапуска
            };
            
            // Вызываем сразу
            preventAutoplay();
            
            // Добавляем обработчики для всех возможных событий
            const events = [
                'loadstart',
                'loadedmetadata', 
                'loadeddata',
                'canplay',
                'canplaythrough',
                'play',
                'playing'
            ];
            
            events.forEach(eventType => {
                video.addEventListener(eventType, preventAutoplay);
            });
            
            // Дополнительная защита через MutationObserver
            const observer = new MutationObserver(() => {
                if (video.autoplay) {
                    video.autoplay = false;
                    video.pause();
                }
            });
            
            observer.observe(video, {
                attributes: true,
                attributeFilter: ['autoplay', 'muted']
            });
            
            return () => {
                events.forEach(eventType => {
                    video.removeEventListener(eventType, preventAutoplay);
                });
                observer.disconnect();
            };
        }
    }, [url, isDirectVideoFile]);

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
                    {isDirectVideoFile ? (
                        <video 
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            controls
                            preload="metadata"
                            poster={poster}
                            playsInline
                            controlsList="nodownload"
                            // Принудительно отключаем автозапуск на уровне HTML
                            data-autoplay="false"
                            // Добавляем все возможные атрибуты для блокировки автозапуска
                            autoPlay={false}
                            muted={false}
                            loop={false}
                            // Дополнительные атрибуты
                            webkit-playsinline="true"
                            x5-playsinline="true"
                            x5-video-player-type="h5"
                            x5-video-player-fullscreen="true"
                        >
                            <source src={getProcessedMinioUrl(url)} type="video/mp4" />
                            <source src={getProcessedMinioUrl(url)} type="video/webm" />
                            <source src={getProcessedMinioUrl(url)} type="video/ogg" />
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
                            className="w-full h-full"
                            src={getProcessedIframeUrl(url)} 
                            frameBorder="0" 
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade" 
                            title="Video Player"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            sandbox="allow-scripts allow-same-origin allow-presentation"
                            loading="lazy"
                        />
                    )}
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