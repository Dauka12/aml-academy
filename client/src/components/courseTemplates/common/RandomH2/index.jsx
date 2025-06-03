import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';
import Centered from '../Centered';

function RandomH2({ 
    children, 
    style = {}, 
    text, 
    isCentered = false,
    color = '#1F3C88',
    fontSize = '32px'
}) {
    // Animation variants
    const headerVariants = {
        hidden: { 
            opacity: 0, 
            y: -30,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
            }
        }
    };

    const content = text || children;
    
    const headerElement = (
        <motion.h2
            className={`
                font-semibold leading-tight tracking-wide
                ${isCentered ? 'text-center' : 'text-left'}
                ${fontSize === '32px' ? 'text-3xl' : 
                  fontSize === '28px' ? 'text-2xl' :
                  fontSize === '36px' ? 'text-4xl' : 'text-3xl'}
                sm:text-4xl lg:text-5xl
                transition-all duration-300 ease-in-out
                hover:text-opacity-80 hover:transform hover:scale-105
                cursor-default select-none
            `}
            style={{
                color: color,
                fontSize: fontSize,
                fontFamily: 'Ubuntu, sans-serif',
                ...style
            }}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
        >
            {typeof content === 'string' ? 
                <span 
                    dangerouslySetInnerHTML={{ 
                        __html: processTextWithFormattingHTML(content) 
                    }} 
                />
                : 
                content
            }
        </motion.h2>
    );

    if (isCentered) {
        return (
            <Centered>
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {headerElement}
                </div>
            </Centered>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32">
            {headerElement}
        </div>
    );
}

export default RandomH2;