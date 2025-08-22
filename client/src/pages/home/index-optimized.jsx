import { Box, CssBaseline } from '@mui/material';
import { Suspense, lazy, memo, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePerformanceOptimization } from "../../utils/performance";

// Критические компоненты загружаются сразу
import Header from "../../components/header/v2";

// Ленивая загрузка некритических компонентов
const AboutUsSection = lazy(() => import("./sections/AboutUsSection"));
const SecondSection = lazy(() => import("./sections/second-section/index"));
const Footer = lazy(() => import("../../components/footer"));

// Мемоизированный компонент для видео
const VideoBackground = memo(({ src, onLoaded, onError }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { shouldPreload } = usePerformanceOptimization();
  
  useEffect(() => {
    // Проверяем, стоит ли загружать видео на основе соединения
    if (!shouldPreload('video')) {
      onError();
      return;
    }
    
    // Intersection Observer для ленивой загрузки видео
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => observer.disconnect();
  }, [shouldPreload, onError]);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleVideoLoaded = () => {
        console.log("Video loaded successfully");
        onLoaded();
      };
      
      const handleVideoError = (e) => {
        console.error("Video error:", e);
        onError();
      };
      
      videoElement.addEventListener('loadeddata', handleVideoLoaded);
      videoElement.addEventListener('canplay', handleVideoLoaded);
      videoElement.addEventListener('error', handleVideoError);
      
      // Предзагрузка только metadata
      videoElement.preload = 'metadata';
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleVideoLoaded);
        videoElement.removeEventListener('canplay', handleVideoLoaded);
        videoElement.removeEventListener('error', handleVideoError);
      };
    }
  }, [isVisible, onLoaded, onError]);
  
  return (
    <div ref={videoRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -2 }}>
      {isVisible && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            opacity: 0,
            transition: 'opacity 1s ease-in',
            animation: 'fadeIn 1s ease-in forwards'
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
});

VideoBackground.displayName = 'VideoBackground';

// Компонент для быстрой загрузки критического контента
const CriticalContent = memo(() => (
  <Box sx={{ 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #061c45 0%, #1A2751 50%, #2A3F6B 100%)',
    position: 'relative'
  }}>
    <Header />
    
    {/* Быстро отображаемый заголовок */}
    <Box sx={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      px: 2
    }}>
      <Box>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 4rem)', 
          margin: 0, 
          fontWeight: 700,
          lineHeight: 1.2 
        }}>
          Академия финансового мониторинга
        </h1>
        <p style={{ 
          fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', 
          margin: '1rem 0', 
          opacity: 0.9 
        }}>
          Профессиональное обучение и развитие
        </p>
      </Box>
    </Box>
  </Box>
));

CriticalContent.displayName = 'CriticalContent';

// Компонент загрузки
const LoadingSpinner = memo(() => (
  <Box sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #061c45 0%, #1A2751 50%, #2A3F6B 100%)',
    zIndex: 9999
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '3px solid rgba(255,255,255,0.3)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </Box>
));

LoadingSpinner.displayName = 'LoadingSpinner';

function HomeOptimized() {
  const location = useLocation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  
  // Предзагрузка критических ресурсов
  useEffect(() => {
    // Предзагрузка шрифтов и критических CSS
    const preloadCriticalResources = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };
    
    preloadCriticalResources();
    
    // Симуляция загрузки критического контента
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 100); // Очень быстрая "загрузка" критического контента
    
    return () => clearTimeout(timer);
  }, []);
  
  // Обработка хэш-навигации
  useEffect(() => {
    if (location.hash === "#coursesSection") {
      setTimeout(() => {
        const coursesSection = document.getElementById("coursesSection");
        if (coursesSection) {
          coursesSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Даем время на загрузку компонента
    } else if (location.hash === "#newsSection") {
      setTimeout(() => {
        const newsSection = document.getElementById("newsSection");
        if (newsSection) {
          newsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [location.hash]);

  // Если контент еще не загружен, показываем спиннер
  if (!contentLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden',
      position: 'relative',
      bgcolor: videoError ? '#061c45' : 'transparent',
      scrollBehavior: 'smooth',
    }}>
      <CssBaseline />
      
      {/* Ленивая загрузка видео */}
      <VideoBackground 
        src="./src/assets/video/sssssssss.mp4"
        onLoaded={() => setVideoLoaded(true)}
        onError={() => setVideoError(true)}
      />
      
      {/* Overlay для лучшей видимости контента */}
      <Box 
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: {
            xs: 'linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
            sm: 'linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)'
          },
          zIndex: -1,
        }}
      />
      
      {/* Основной контент */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        width: '100%',
        position: 'relative',
      }}>
        <Header />
        
        {/* Ленивая загрузка остального контента */}
        <Box sx={{ width: '100%' }}>
          <Suspense fallback={
            <Box sx={{ 
              height: '100vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white'
            }}>
              Загрузка...
            </Box>
          }>
            <AboutUsSection />
          </Suspense>
          
          <Suspense fallback={<div style={{ height: '50px' }} />}>
            <SecondSection />
          </Suspense>
          
          <Suspense fallback={<div style={{ height: '50px' }} />}>
            <Footer />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(HomeOptimized);
