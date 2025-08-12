import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Универсальный хук для контроля воспроизведения видео
 * Предотвращает автозапуск и обеспечивает ручной контроль
 */
export const useVideoControl = (url, options = {}) => {
    const {
        autoDetectType = true,
        preventAutoplay = true,
        enableIntersectionObserver = true,
        observerOptions = { threshold: 0.1, rootMargin: '50px' }
    } = options;

    const [isPlaying, setIsPlaying] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const observerRef = useRef(null);

    // Определение типа видео
    const getVideoType = useCallback((videoUrl) => {
        if (!videoUrl) return 'unknown';
        
        const url = videoUrl.toLowerCase();
        
        // Прямые видео файлы
        if (url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg') || 
            url.includes('.mov') || url.includes('.avi') || url.includes('.mkv')) {
            return 'direct';
        }
        
        // Популярные платформы
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            return 'youtube';
        }
        if (url.includes('vimeo.com')) {
            return 'vimeo';
        }
        if (url.includes('sproutvideo.com')) {
            return 'sprout';
        }
        if (url.includes('wistia.com') || url.includes('wistia.net')) {
            return 'wistia';
        }
        if (url.includes('jwplayer.com')) {
            return 'jwplayer';
        }
        
        // Minio и другие хранилища
        if (url.includes('minio') || url.includes('/uploads/') || 
            url.includes('/media/') || url.includes('/storage/') ||
            url.includes('/files/')) {
            return 'storage';
        }
        
        return 'iframe';
    }, []);

    const videoType = autoDetectType ? getVideoType(url) : 'unknown';

    // Обработка URL для предотвращения автозапуска
    const processVideoUrl = useCallback((originalUrl, type) => {
        if (!originalUrl) return '';
        
        let processedUrl = originalUrl;
        
        try {
            switch (type) {
                case 'youtube':
                    // YouTube специальная обработка
                    processedUrl = processedUrl.replace(/[?&]autoplay=[^&]*/gi, '');
                    processedUrl = processedUrl.replace(/[?&]auto_play=[^&]*/gi, '');
                    const ytSeparator = processedUrl.includes('?') ? '&' : '?';
                    processedUrl = `${processedUrl}${ytSeparator}autoplay=0&controls=1&modestbranding=1&rel=0`;
                    break;
                    
                case 'vimeo':
                    processedUrl = processedUrl.replace(/[?&]autoplay=[^&]*/gi, '');
                    const vimeoSeparator = processedUrl.includes('?') ? '&' : '?';
                    processedUrl = `${processedUrl}${vimeoSeparator}autoplay=0&controls=1`;
                    break;
                    
                case 'sprout':
                    processedUrl = processedUrl.replace(/[?&]autoplay=[^&]*/gi, '');
                    processedUrl = processedUrl.replace(/[?&]autoPlay=[^&]*/gi, '');
                    const sproutSeparator = processedUrl.includes('?') ? '&' : '?';
                    processedUrl = `${processedUrl}${sproutSeparator}autoPlay=false&autoplay=false`;
                    break;
                    
                case 'direct':
                case 'storage':
                    // Для прямых файлов добавляем параметры кэширования
                    const urlObj = new URL(processedUrl);
                    urlObj.searchParams.set('response-content-disposition', 'inline');
                    urlObj.searchParams.set('response-cache-control', 'no-cache');
                    urlObj.searchParams.set('t', Date.now().toString());
                    processedUrl = urlObj.toString();
                    break;
                    
                default:
                    // Общая обработка для iframe
                    processedUrl = processedUrl.replace(/[?&]autoplay=[^&]*/gi, '');
                    processedUrl = processedUrl.replace(/[?&]auto_play=[^&]*/gi, '');
                    const separator = processedUrl.includes('?') ? '&' : '?';
                    processedUrl = `${processedUrl}${separator}autoplay=0&auto_play=false&controls=1`;
                    break;
            }
        } catch (error) {
            console.warn('Error processing video URL:', error);
            return originalUrl;
        }
        
        return processedUrl;
    }, []);

    // Intersection Observer для ленивой загрузки
    useEffect(() => {
        if (!enableIntersectionObserver || !containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            observerOptions
        );

        observer.observe(containerRef.current);
        observerRef.current = observer;

        return () => {
            observer.disconnect();
        };
    }, [enableIntersectionObserver, observerOptions]);

    // Предотвращение автозапуска для прямых видео
    useEffect(() => {
        if (!videoRef.current || !preventAutoplay) return;
        if (videoType !== 'direct' && videoType !== 'storage') return;

        const video = videoRef.current;

        const preventAutoplay = () => {
            if (video.autoplay) {
                video.autoplay = false;
            }
            
            if (!video.paused && video.currentTime > 0) {
                video.pause();
                video.currentTime = 0;
                console.log('VideoControl: Prevented autoplay');
            }
            
            video.removeAttribute('autoplay');
        };

        // Немедленная защита
        preventAutoplay();

        // Обработчики событий
        const eventTypes = ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'play'];
        eventTypes.forEach(eventType => {
            video.addEventListener(eventType, preventAutoplay);
        });

        // Дополнительная проверка через интервал
        const intervalId = setInterval(preventAutoplay, 100);
        const timeoutId = setTimeout(() => clearInterval(intervalId), 5000);

        return () => {
            eventTypes.forEach(eventType => {
                video.removeEventListener(eventType, preventAutoplay);
            });
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, [videoType, preventAutoplay]);

    // Обработчики действий пользователя
    const handlePlay = useCallback(() => {
        setIsPlaying(true);
        setShowVideo(true);
        setIsLoading(true);
        
        if (videoRef.current && (videoType === 'direct' || videoType === 'storage')) {
            videoRef.current.play().catch(error => {
                console.error('Video play error:', error);
                setError(error);
            });
        }
    }, [videoType]);

    const handlePause = useCallback(() => {
        setIsPlaying(false);
        
        if (videoRef.current && (videoType === 'direct' || videoType === 'storage')) {
            videoRef.current.pause();
        }
    }, [videoType]);

    const handleStop = useCallback(() => {
        setIsPlaying(false);
        
        if (videoRef.current && (videoType === 'direct' || videoType === 'storage')) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [videoType]);

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setShowVideo(false);
        setIsLoading(false);
        setError(null);
        setIsReady(false);
    }, []);

    // Обработчики событий видео
    const videoEventHandlers = {
        onLoadedData: () => {
            setIsLoading(false);
            setIsReady(true);
        },
        onPlay: () => setIsPlaying(true),
        onPause: () => setIsPlaying(false),
        onEnded: () => setIsPlaying(false),
        onError: (e) => {
            setError(e.target.error);
            setIsLoading(false);
        },
        onWaiting: () => setIsLoading(true),
        onCanPlay: () => setIsLoading(false)
    };

    return {
        // Состояние
        isPlaying,
        showVideo,
        isLoading,
        error,
        isReady,
        isIntersecting,
        videoType,
        
        // Refs
        videoRef,
        containerRef,
        
        // Методы
        handlePlay,
        handlePause,
        handleStop,
        handleReset,
        processVideoUrl: (url) => processVideoUrl(url, videoType),
        
        // Обработчики событий
        videoEventHandlers,
        
        // Утилиты
        hasValidUrl: url && url.trim() !== '',
        shouldShowVideo: showVideo || !enableIntersectionObserver || isIntersecting,
        isDirectVideo: videoType === 'direct' || videoType === 'storage'
    };
};

/**
 * Хук для глобального контроля всех видео на странице
 */
export const useGlobalVideoControl = () => {
    const stopAllVideos = useCallback(() => {
        // Останавливаем все HTML5 видео
        const videos = document.querySelectorAll('video');
        videos.forEach((video, index) => {
            if (!video.paused) {
                video.pause();
                console.log(`Global control: Stopped video ${index + 1}`);
            }
        });

        // Пытаемся остановить YouTube видео через postMessage
        const iframes = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="youtu.be"]');
        iframes.forEach((iframe) => {
            try {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch (error) {
                console.warn('Could not pause YouTube video:', error);
            }
        });
    }, []);

    const muteAllVideos = useCallback(() => {
        const videos = document.querySelectorAll('video');
        videos.forEach((video) => {
            video.muted = true;
        });
    }, []);

    const unmuteAllVideos = useCallback(() => {
        const videos = document.querySelectorAll('video');
        videos.forEach((video) => {
            video.muted = false;
        });
    }, []);

    // Автоматическая остановка всех видео при загрузке страницы
    useEffect(() => {
        const timer = setTimeout(() => {
            stopAllVideos();
        }, 1000);

        return () => clearTimeout(timer);
    }, [stopAllVideos]);

    return {
        stopAllVideos,
        muteAllVideos,
        unmuteAllVideos
    };
};

export default useVideoControl;
