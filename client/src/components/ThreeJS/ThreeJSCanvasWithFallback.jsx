import React, { Suspense, Component } from 'react';
import ThreeJSCanvas from './ThreeJSCanvas';

// Error Boundary Component
class ThreeJSErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.warn('Three.js error detected:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Three.js component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ThreeJSFallback />;
    }

    return this.props.children;
  }
}

// Simple fallback component when Three.js fails
function ThreeJSFallback() {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated gradient sphere */}
      <div style={{
        width: '200px',
        height: '200px',
        background: 'linear-gradient(135deg, #4fc3f7, #ff6b35)',
        borderRadius: '50%',
        animation: 'float 3s ease-in-out infinite, rotate 10s linear infinite',
        boxShadow: '0 0 100px rgba(79, 195, 247, 0.5)',
      }} />
      
      {/* Floating particles */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: '#4fc3f7',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleFloat ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 4}s`,
              boxShadow: '0 0 10px rgba(79, 195, 247, 0.5)',
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        
        @keyframes particleFloat {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) translateX(10px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Main component with error handling
function ThreeJSCanvasWithFallback() {
  return (
    <ThreeJSErrorBoundary>
      <Suspense fallback={<ThreeJSFallback />}>
        <ThreeJSCanvas />
      </Suspense>
    </ThreeJSErrorBoundary>
  );
}

export default ThreeJSCanvasWithFallback;
