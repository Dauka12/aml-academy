import { useEffect, useRef, useState } from 'react';
import './style.scss';

function VideoWithTitleAndText({
    url,
    title,
    text,
    poster
}) {
    const videoRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Функция загрузки видео по клику
    const handleVideoLoad = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsVideoLoaded(true);
        }, 100);
    };

    // Очищенная обработка URL без автозапуска
    const getCleanUrl = (originalUrl) => {
        if (!originalUrl) return '';
        
        let cleanUrl = originalUrl;
        
        // Убираем все параметры автозапуска
        cleanUrl = cleanUrl.replace(/[?&]autoplay=[^&]*/gi, '');
        cleanUrl = cleanUrl.replace(/[?&]auto_play=[^&]*/gi, '');
        cleanUrl = cleanUrl.replace(/[?&]autoPlay=[^&]*/gi, '');
        
        // Добавляем безопасные параметры
        const separator = cleanUrl.includes('?') ? '&' : '?';
        cleanUrl = `${cleanUrl}${separator}autoplay=0&controls=1&rel=0`;
        
        return cleanUrl;
    };

    // Очистка при размонтировании компонента
    useEffect(() => {
        return () => {
            // Очищаем состояние при размонтировании
            setIsVideoLoaded(false);
            setIsClicked(false);
        };
    }, []);

    return (
        <div className="videoWithTitleAndText">
            <div className="videoWithTitleAndText-body">
                <div className="videoWithTitleAndText-text">
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
                
                <div className="videoWithTitleAndText-video">
                    {!isVideoLoaded ? (
                        <div 
                            className="video-placeholder"
                            onClick={handleVideoLoad}
                            style={{
                                width: '100%',
                                height: '315px',
                                backgroundImage: poster ? `url(${poster})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div 
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div 
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <svg 
                                        width="40" 
                                        height="40" 
                                        viewBox="0 0 24 24" 
                                        fill="none"
                                        style={{ marginLeft: '4px' }}
                                    >
                                        <path 
                                            d="M8 5v14l11-7z" 
                                            fill="#333"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {!isClicked && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    left: '20px',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                }}>
                                    Нажмите для воспроизведения
                                </div>
                            )}
                        </div>
                    ) : (
                        <iframe
                            ref={videoRef}
                            className='sproutvideo-player'
                            src={getCleanUrl(url)}
                            width='100%'
                            height='315'
                            frameBorder='0'
                            allowFullScreen={true}
                            referrerPolicy='no-referrer-when-downgrade'
                            title={title || 'Video Player'}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{ borderRadius: '12px' }}
                            loading="lazy"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoWithTitleAndText;