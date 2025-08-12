import React, { useEffect } from 'react';
import { useGlobalVideoControl } from '../hooks/useVideoControl';

/**
 * Глобальный контроллер видео для страниц с множественными видео
 * Предотвращает одновременное воспроизведение нескольких видео
 */
const GlobalVideoController = ({ children }) => {
    const { stopAllVideos, muteAllVideos } = useGlobalVideoControl();

    useEffect(() => {
        // Дополнительная защита - останавливаем все видео через 2 секунды после загрузки
        const timer = setTimeout(() => {
            stopAllVideos();
        }, 2000);

        // Обработчик для остановки всех видео при клике где-то на странице
        const handlePageClick = (e) => {
            // Если клик не по видео элементу, останавливаем все видео
            const isVideoElement = e.target.closest('video, iframe, .video-preview, .play-icon-overlay');
            if (!isVideoElement) {
                // Небольшая задержка, чтобы не мешать нормальному воспроизведению
                setTimeout(() => {
                    const playingVideos = document.querySelectorAll('video:not([paused])');
                    if (playingVideos.length > 1) {
                        stopAllVideos();
                    }
                }, 100);
            }
        };

        // Обработчик для предотвращения одновременного воспроизведения
        const handleVideoPlay = (e) => {
            const currentVideo = e.target;
            const allVideos = document.querySelectorAll('video');
            
            allVideos.forEach(video => {
                if (video !== currentVideo && !video.paused) {
                    video.pause();
                    console.log('GlobalVideoController: Paused conflicting video');
                }
            });
        };

        // Добавляем обработчики событий
        document.addEventListener('click', handlePageClick);
        document.addEventListener('play', handleVideoPlay, true);

        // Мониторинг автозапуска видео каждые 500ms первые 10 секунд
        const monitoringInterval = setInterval(() => {
            const playingVideos = document.querySelectorAll('video:not([paused])');
            if (playingVideos.length > 0) {
                console.log(`GlobalVideoController: Found ${playingVideos.length} playing videos`);
                
                // Если играет больше одного видео, останавливаем все
                if (playingVideos.length > 1) {
                    stopAllVideos();
                }
            }
        }, 500);

        // Останавливаем мониторинг через 10 секунд
        const monitoringTimeout = setTimeout(() => {
            clearInterval(monitoringInterval);
        }, 10000);

        return () => {
            clearTimeout(timer);
            clearInterval(monitoringInterval);
            clearTimeout(monitoringTimeout);
            document.removeEventListener('click', handlePageClick);
            document.removeEventListener('play', handleVideoPlay, true);
        };
    }, [stopAllVideos]);

    // Обработчик для видео в iframe (YouTube, Vimeo и т.д.)
    useEffect(() => {
        const handleMessage = (event) => {
            // Обработка сообщений от YouTube iframe API
            if (event.data && typeof event.data === 'string') {
                try {
                    const data = JSON.parse(event.data);
                    if (data.event === 'video-progress' || data.info?.playerState === 1) {
                        // Видео начало воспроизводиться
                        console.log('GlobalVideoController: Detected iframe video playback');
                        
                        // Останавливаем все HTML5 видео
                        const htmlVideos = document.querySelectorAll('video:not([paused])');
                        htmlVideos.forEach(video => video.pause());
                    }
                } catch (e) {
                    // Игнорируем ошибки парсинга
                }
            }
        };

        window.addEventListener('message', handleMessage);
        
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return <>{children}</>;
};

export default GlobalVideoController;
