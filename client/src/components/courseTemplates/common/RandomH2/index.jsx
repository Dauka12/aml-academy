import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';
import Centered from '../Centered';

function RandomH2({ 
    children, 
    style = {}, 
    text, 
    isCentered = false,
    color = '#1F3C88',
    fontSize = '32px',
    withHighlight = false,
    withUnderline = false,
    highlightColor = '#E6F2FF',
    animationDelay = 0,
    responsive = true
}) {
    // Animation variants
    const headerVariants = {
        hidden: { 
            opacity: 0, 
            y: -30,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 90,
                delay: animationDelay
            }
        }
    };

    const underlineVariants = {
        hidden: { 
            width: "0%", 
            opacity: 0 
        },
        visible: {
            width: "100%",
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeInOut",
                delay: animationDelay + 0.3
            }
        }
    };

    const content = text || children;    // Determine responsive font size classes
    const getFontSizeClasses = () => {
        if (!responsive) {
            return fontSize === '32px' ? 'text-2xl lg:text-3xl' : 
                  fontSize === '28px' ? 'text-xl lg:text-2xl' :
                  fontSize === '36px' ? 'text-3xl lg:text-4xl' : 
                  fontSize === '40px' ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl';
        }
        
        // For responsive behavior - mobile first, then gradually increase
        return fontSize === '32px' ? 'text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl' : 
              fontSize === '28px' ? 'text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl' :
              fontSize === '36px' ? 'text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl' :
              fontSize === '40px' ? 'text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl' : 
              'text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl';
    };

    const fontSizeClasses = getFontSizeClasses();
    
    // Create header element with possible highlight effect
    const headerContent = typeof content === 'string' ? (
        <span 
            className={`${withHighlight ? 'relative z-10' : ''}`}
            dangerouslySetInnerHTML={{ 
                __html: processTextWithFormattingHTML(content) 
            }} 
        />
    ) : content;    const headerElement = (
        <motion.div
            className={`relative ${withHighlight ? 'inline-block' : 'block'} max-w-3xl mx-auto w-full md:w-auto`}
        >
            {/* Background highlight effect */}
            {withHighlight && (
                <motion.span 
                    className="absolute inset-0 rounded-lg -z-10"
                    style={{ backgroundColor: highlightColor }}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: { 
                            duration: 0.6, 
                            delay: animationDelay + 0.2 
                        } 
                    }}
                />
            )}            <motion.h2
                className={`
                    font-semibold leading-normal tracking-wide
                    ${isCentered ? 'text-center' : 'text-left'}
                    ${fontSizeClasses}
                    transition-all duration-300 ease-in-out
                    hover:text-opacity-90 
                    cursor-default select-none
                    ${withHighlight ? 'px-3 py-2' : ''}
                    mb-3 md:mb-4 
                    max-w-3xl mx-auto
                    md:leading-normal lg:leading-normal
                    md:tracking-normal
                `}                style={{
                    color: color,
                    fontFamily: 'Ubuntu, sans-serif',
                    textShadow: withHighlight ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                    letterSpacing: '0.01em',
                    wordSpacing: '0.05em',
                    ...style
                }}
                variants={headerVariants}
                initial="hidden"
                animate="visible"                whileHover={{ 
                    scale: 1.005,
                    transition: { duration: 0.2 }
                }}
            >
                {headerContent}
            </motion.h2>
            
            {/* Optional underline element */}
            {withUnderline && (
                <motion.div 
                    className={`h-1 rounded-full ${isCentered ? 'mx-auto w-1/4' : 'w-1/3'} mt-1`}
                    style={{ 
                        backgroundColor: color,
                        opacity: 0.8,
                        maxWidth: '120px'
                    }}
                    variants={underlineVariants}
                    initial="hidden"
                    animate="visible"
                />
            )}
        </motion.div>
    );    // More controlled container width for better desktop display
    const wrapperClasses = isCentered 
        ? "w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10"
        : "w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20";
        
    if (isCentered) {
        return (
            <Centered>
                <div className={wrapperClasses}>
                    {headerElement}
                </div>
            </Centered>
        );
    }
    
    return (
        <div className={wrapperClasses}>
            {headerElement}
        </div>
    );
}

export default RandomH2;

