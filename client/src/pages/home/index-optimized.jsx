import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, CssBaseline, Typography } from '@mui/material';
import { Suspense, lazy, memo, useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backgroundVideoLight from "../../assets/video/sssssssss.mp4";

// Критические компоненты загружаются сразу
import Header from "../../components/header/v2";
import LoadingSpinner from "../../components/LoadingSpinner";

// Ленивая загрузка некритических компонентов
const AboutUsSection = lazy(() => import("./sections/AboutUsSection"));
const SecondSection = lazy(() => import("./sections/second-section/index"));
const Footer = lazy(() => import("../../components/footer"));

// Мемоизированный компонент для видео
const VideoBackground = memo(({ src, onLoaded, onError }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
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
  }, []);
  
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
const CriticalContent = memo(({ children }) => (
  <Box sx={{ 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  }}>
    {children}
  </Box>
));

CriticalContent.displayName = 'CriticalContent';

function HomeOptimized() {
  const location = useLocation();
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [showFiniqDialog, setShowFiniqDialog] = useState(false);
  
  // Оптимизированные обработчики
  const handleVideoLoaded = useCallback(() => {
    // Placeholder callback to keep API consistent if future actions are needed on load
  }, []);
  
  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);
  
  // Быстрая инициализация критического контента
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 50); // Очень быстрая "загрузка"
    
    return () => clearTimeout(timer);
  }, []);
  
  // Обработка хэш-навигации с оптимизацией
  useEffect(() => {
    if (!contentLoaded) return;
    
    const handleHashNavigation = () => {
      if (location.hash === "#coursesSection") {
        const coursesSection = document.getElementById("coursesSection");
        if (coursesSection) {
          coursesSection.scrollIntoView({ behavior: "smooth" });
        }
      } else if (location.hash === "#newsSection") {
        const newsSection = document.getElementById("newsSection");
        if (newsSection) {
          newsSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    
    // Отложенное выполнение для лучшей производительности
    const timeoutId = setTimeout(handleHashNavigation, 100);
    return () => clearTimeout(timeoutId);
  }, [location.hash, contentLoaded]);

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
      
      {/* Ленивая загрузка видео только если нет ошибки */}
      {!videoError && (
        <VideoBackground 
          src={backgroundVideoLight}
          onLoaded={handleVideoLoaded}
          onError={handleVideoError}
        />
      )}
      
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
      
      <CriticalContent>
        <Header />
        <Dialog
          open={showFiniqDialog}
          onClose={() => setShowFiniqDialog(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              p: 2
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 700, textAlign: 'center', fontSize: { xs: '1.2rem', sm: '1.4rem' } }}>
            Вы пришли на Республиканский диктант по финансовой безопасности?
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Мы подготовили отдельный раздел с информацией и регистрацией для участников диктанта.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowFiniqDialog(false);
                navigate('/finiq');
              }}
              fullWidth
              sx={{
                maxWidth: { sm: 200 },
                fontWeight: 600
              }}
            >
              Перейти
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setShowFiniqDialog(false)}
              fullWidth
              sx={{
                maxWidth: { sm: 200 },
                fontWeight: 600
              }}
            >
              Остаться здесь
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Основной контент с ленивой загрузкой */}
        <Box sx={{ width: '100%' }}>
          <Suspense fallback={
            <Box sx={{ 
              height: '80vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              Загрузка контента...
            </Box>
          }>
            <AboutUsSection />
          </Suspense>
          
          <Suspense fallback={
            <Box sx={{ 
              height: '200px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white'
            }}>
              Загрузка секций...
            </Box>
          }>
            <SecondSection />
          </Suspense>
          
          <Suspense fallback={<div style={{ height: '100px' }} />}>
            <Footer />
          </Suspense>
        </Box>
      </CriticalContent>
    </Box>
  );
}

export default memo(HomeOptimized);
