import { useEffect, useRef } from 'react';
import './style.scss';

function VideoWithTitleAndText({
    url,
    title,
    text,
    poster
}) {
    const videoRef = useRef(null);

    // Обработка URL для iframe с усиленной защитой от автозапуска
    const getProcessedUrl = (originalUrl) => {
        if (!originalUrl) return '';
        
        let processedUrl = originalUrl;
        
        // Убираем все возможные параметры автозапуска
        processedUrl = processedUrl.replace(/[?&]autoplay=[^&]*/gi, '');
        processedUrl = processedUrl.replace(/[?&]auto_play=[^&]*/gi, '');
        processedUrl = processedUrl.replace(/[?&]autoPlay=[^&]*/gi, '');
        processedUrl = processedUrl.replace(/[?&]muted=[^&]*/gi, '');
        processedUrl = processedUrl.replace(/[?&]mute=[^&]*/gi, '');
        
        // Добавляем строгие параметры отключения автозапуска
        const separator = processedUrl.includes('?') ? '&' : '?';
        processedUrl = `${processedUrl}${separator}autoplay=0&auto_play=false&autoPlay=false&muted=false&controls=1&rel=0&modestbranding=1&playsinline=1`;
        
        // Для YouTube добавляем дополнительные параметры
        if (processedUrl.includes('youtube.com') || processedUrl.includes('youtu.be')) {
            processedUrl += '&enablejsapi=0&origin=' + window.location.origin;
        }
        
        return processedUrl;
    };

    // Усиленная защита от автозапуска для продакшена
    useEffect(() => {
        // Глобальная защита от автозапуска всех видео
        const preventGlobalAutoplay = () => {
            // Останавливаем HTML5 видео
            const allVideos = document.querySelectorAll('video');
            allVideos.forEach((video, index) => {
                if (!video.paused && video.currentTime > 0) {
                    console.log(`VideoWithTitleAndText: Stopping video ${index + 1}`);
                    video.pause();
                    video.currentTime = 0;
                    video.autoplay = false;
                    video.muted = false;
                }
            });

            // Дополнительная защита для iframe видео
            const allIframes = document.querySelectorAll('iframe');
            allIframes.forEach((iframe, index) => {
                try {
                    const src = iframe.src;
                    if (src && (src.includes('autoplay=1') || src.includes('auto_play=true'))) {
                        console.log(`VideoWithTitleAndText: Fixing iframe autoplay ${index + 1}`);
                        iframe.src = getProcessedUrl(src);
                    }
                } catch (e) {
                    // Игнорируем ошибки кросс-домена
                }
            });
        };

        // Проверяем сразу после рендера
        const initialCheck = setTimeout(preventGlobalAutoplay, 100);
        
        // Периодическая проверка первые 10 секунд
        const globalInterval = setInterval(preventGlobalAutoplay, 300);
        
        const globalTimeout = setTimeout(() => {
            clearInterval(globalInterval);
        }, 10000);

        // Добавляем обработчик для динамически добавляемых видео
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    setTimeout(preventGlobalAutoplay, 50);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            clearTimeout(initialCheck);
            clearInterval(globalInterval);
            clearTimeout(globalTimeout);
            observer.disconnect();
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
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
                    />
                </div>
            </div>
        </div>
    );
}

export default VideoWithTitleAndText;