import { Box, CssBaseline } from '@mui/material';
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import backgroundVideoLight from "../../assets/video/sssssssss.mp4";
import Footer from "../../components/footer";
import Header from "../../components/header/v2";
import AboutUsSection from "./sections/AboutUsSection";
import SecondSection from "./sections/second-section/index";

function Home() {
  const location = useLocation();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  // Video loading handler
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleVideoLoaded = () => {
        console.log("Video loaded successfully");
        setVideoLoaded(true);
      };
      
      const handleVideoError = (e) => {
        console.error("Video error:", e);
        setVideoError(true);
      };
      
      videoElement.addEventListener('loadeddata', handleVideoLoaded);
      videoElement.addEventListener('canplay', handleVideoLoaded);
      videoElement.addEventListener('error', handleVideoError);
      
      // Force play the video
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Playback started successfully
        })
        .catch(error => {
          // Auto-play prevented - handle accordingly
          console.log("Autoplay prevented:", error);
        });
      }
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleVideoLoaded);
        videoElement.removeEventListener('canplay', handleVideoLoaded);
        videoElement.removeEventListener('error', handleVideoError);
      };
    }
  }, []);
  
  // Hash-based scrolling
  useEffect(() => {
    if (location.hash === "#coursesSection") {
      scrollToCourses();
    } else if (location.hash === "#newsSection") {
      scrollToNews();
    }
  }, [location.hash]);

  const scrollToCourses = () => {
    const coursesSection = document.getElementById("coursesSection");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToNews = () => {
    const newsSection = document.getElementById("newsSection");
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden',
      position: 'relative',
      bgcolor: videoError ? '#061c45' : 'transparent',
      // Add smooth scrolling behavior
      scrollBehavior: 'smooth',
    }}>
      <CssBaseline />
      
      {/* Full-page video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed', // Change to fixed to cover everything
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          top: 0,
          left: 0,
          zIndex: -2,
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in'
        }}
      >
        <source src={backgroundVideoLight} type="video/mp4" />
      </video>
        {/* Video loading overlay with beautiful animation */}
      <Box 
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(135deg, #061c45 0%, #1A2751 50%, #2A3F6B 100%)',
          zIndex: -2,
          opacity: videoLoaded ? 0 : 1,
          transition: 'opacity 1.5s ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"%3E%3Canimate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            animation: 'float 3s ease-in-out infinite',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' }
          }
        }}
      />
      
      {/* Dark overlay for better content visibility */}
      <Box 
        sx={{
          position: 'fixed', // Change to fixed
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: {
            xs: 'linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',  // Darker on mobile
            sm: 'linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)'
          },
          zIndex: -1,
        }}
      />
      
      {/* Content container */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        width: '100%',
        position: 'relative',
      }}>
        {/* Header now positioned with its own styles */}
        <Header />
        
        {/* Main content - removed margin top since header has its own positioning */}
        <Box sx={{ width: '100%' }}>
          <AboutUsSection />
          <SecondSection />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
