import { useEffect, useRef } from 'react';
import './style.scss';

function VideoWithTitleAndText({
    url,
    title,
    text,
    poster
}) {
    const videoRef = useRef(null);

    // Обработка URL для iframe (убираем автозапуск) - защита как в VideoLine
    const getProcessedUrl = (originalUrl) => {
        if (!originalUrl) return '';
        
        let processedUrl = originalUrl;
        
        // Убираем существующие параметры автозапуска
        processedUrl = processedUrl.replace(/[?&]autoplay=[^&]*/gi, '');
        processedUrl = processedUrl.replace(/[?&]auto_play=[^&]*/gi, '');
        processedUrl = processedUrl.replace(/[?&]autoPlay=[^&]*/gi, '');
        
        // Добавляем параметры отключения автозапуска
        const separator = processedUrl.includes('?') ? '&' : '?';
        processedUrl = `${processedUrl}${separator}autoplay=0&auto_play=false&autoPlay=false`;
        
        return processedUrl;
    };

    // Принудительная защита от автозапуска видео (как в VideoLine)
    useEffect(() => {
        // Для iframe защита от autoplay происходит через обработку URL
        // Дополнительная глобальная защита от всех видео на странице
        const preventGlobalAutoplay = () => {
            const allVideos = document.querySelectorAll('video');
            allVideos.forEach((video, index) => {
                if (!video.paused && video.currentTime > 0) {
                    console.log(`VideoWithTitleAndText: Stopping video ${index + 1}`);
                    video.pause();
                    video.currentTime = 0;
                }
            });
        };

        // Проверяем сразу и каждые 200ms первые 5 секунд
        preventGlobalAutoplay();
        const globalInterval = setInterval(preventGlobalAutoplay, 200);
        
        // Останавливаем через 5 секунд
        const globalTimeout = setTimeout(() => {
            clearInterval(globalInterval);
        }, 5000);

        return () => {
            clearInterval(globalInterval);
            clearTimeout(globalTimeout);
        };
    }, [url]);

    return (
        <div className="videoWithTitleAndText">
            <div className="videoWithTitleAndText-body">
                <div className="videoWithTitleAndText-text">
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
                
                <div className="videoWithTitleAndText-video">
                    <iframe
                        ref={videoRef}
                        className='sproutvideo-player'
                        src={getProcessedUrl(url)}
                        width='100%'
                        height='315'
                        frameBorder='0'
                        allowFullScreen={true}
                        referrerPolicy='no-referrer-when-downgrade'
                        title={title || 'Video Player'}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{ borderRadius: '12px' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default VideoWithTitleAndText;