import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

function CustomCarousel({
    data = [],
    autoPlay = false,
    autoPlayInterval = 4000,
    showDots = true,
    showArrows = true
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoadingStates, setImageLoadingStates] = useState({});
    const [direction, setDirection] = useState(0);
    useEffect(() => {
        if (autoPlay && data.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => 
                    prevIndex === data.length - 1 ? 0 : prevIndex + 1
                );
            }, autoPlayInterval);

            return () => clearInterval(interval);
        }
    }, [autoPlay, autoPlayInterval, data.length]);

    // Handle image loading states
    const handleImageLoad = (index) => {
        setImageLoadingStates(prev => ({
            ...prev,
            [index]: true
        }));
    };

    const handleImageError = (index) => {
        setImageLoadingStates(prev => ({
            ...prev,
            [index]: false
        }));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
    };

    if (!data || data.length === 0) return null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };


    const paginate = (newDirection) => {
        setDirection(newDirection);
        if (newDirection === 1) {
            goToNext();
        } else {
            goToPrevious();
        }
    };

    return (
        <motion.div
            className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-32 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="relative max-w-6xl mx-auto">
                {/* Main carousel content */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl min-h-[400px]">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.3 }
                            }}
                            className="flex flex-col w-full"
                        >
                            <CarouselItem 
                                item={data[currentIndex]} 
                                index={currentIndex}
                                imageLoadingStates={imageLoadingStates}
                                onImageLoad={handleImageLoad}
                                onImageError={handleImageError}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation arrows */}
                    {showArrows && data.length > 1 && (
                        <>
                            <button
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                                onClick={() => paginate(-1)}
                                aria-label="Previous slide"
                            >
                                <IoChevronBack className="w-6 h-6" />
                            </button>
                            <button
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                                onClick={() => paginate(1)}
                                aria-label="Next slide"
                            >
                                <IoChevronForward className="w-6 h-6" />
                            </button>
                        </>
                    )}
                </div>

                {/* Dots indicator */}
                {showDots && data.length > 1 && (
                    <div className="flex justify-center space-x-3 mt-6">
                        {data.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'bg-blue-600 scale-125 shadow-lg'
                                        : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                                }`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Slide counter */}
                <div className="text-center mt-4 text-sm text-gray-600 font-medium">
                    {currentIndex + 1} / {data.length}
                </div>
            </div>
        </motion.div>
    );
}

const CarouselItem = ({ item, index, imageLoadingStates, onImageLoad, onImageError }) => {
    const { header, image, imageText } = item;

    return (
        <div className="flex flex-col w-full gap-6">
            {/* Content section */}
            <div className="w-full p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="space-y-4"
                >
                    {/* Header content */}
                    {header && (
                        <div className="space-y-3">
                            {Array.isArray(header) ? 
                                header.map((item, i) => (
                                    <motion.h2
                                        key={i}
                                        className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight"
                                        style={{ fontFamily: 'Ubuntu, sans-serif' }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                        dangerouslySetInnerHTML={{
                                            __html: processTextWithFormattingHTML(item)
                                        }}
                                    />
                                )) : (
                                    <motion.h2
                                        className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight"
                                        style={{ fontFamily: 'Ubuntu, sans-serif' }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        dangerouslySetInnerHTML={{
                                            __html: processTextWithFormattingHTML(header)
                                        }}
                                    />
                                )
                            }
                        </div>
                    )}

                    {/* Image text */}
                    {imageText && (
                        <motion.p
                            className="text-lg md:text-xl text-gray-600 leading-relaxed"
                            style={{ fontFamily: 'Ubuntu, sans-serif' }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            dangerouslySetInnerHTML={{
                                __html: processTextWithFormattingHTML(imageText)
                            }}
                        />
                    )}
                </motion.div>
            </div>

            {/* Image section */}
            {image && (
                <div className="w-full relative min-h-[300px] max-h-[70vh] flex items-center justify-center bg-gray-50 overflow-hidden">
                    {!imageLoadingStates[index] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <div className="animate-pulse">
                                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                    <motion.img
                        src={image}
                        alt={imageText || `Slide ${index + 1}`}
                        className="max-h-[70vh] w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ 
                            opacity: imageLoadingStates[index] ? 1 : 0, 
                            scale: 1 
                        }}
                        transition={{ duration: 0.6 }}
                        onLoad={() => onImageLoad(index)}
                        onError={() => onImageError(index)}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomCarousel;