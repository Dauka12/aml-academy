import { motion } from 'framer-motion';
import React from 'react';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';
import Centered from '../Centered';
import Sizebox from '../Sizebox';

function RandomParapraph({ 
    children, 
    color = '#3A3939', 
    fontSize = '18px', 
    isCentered = false 
}) {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const paragraphVariants = {
        hidden: { 
            opacity: 0, 
            y: 20 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const renderParagraphs = (content) => {
        if (!content) return null;

        const paragraphs = typeof content === 'string' ? content.split('\\n') : [content];
        
        return (
            <motion.div 
                className={`
                    space-y-5 leading-relaxed
                    ${isCentered ? 'text-center' : 'text-left'}
                    transition-all duration-300
                `}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {paragraphs.map((paragraph, index) => {
                    const isLast = index === paragraphs.length - 1;
                    
                    return (
                        <React.Fragment key={index}>
                            <motion.p
                                className={`
                                    font-light leading-7 tracking-wide
                                    hover:text-opacity-80 transition-all duration-200
                                    ${fontSize === '18px' ? 'text-lg' : 
                                      fontSize === '16px' ? 'text-base' :
                                      fontSize === '20px' ? 'text-xl' : 'text-lg'}
                                `}
                                style={{
                                    color: color,
                                    fontSize: fontSize,
                                    fontFamily: 'Ubuntu, sans-serif'
                                }}
                                variants={paragraphVariants}
                                whileHover={{ 
                                    scale: 1.01,
                                    transition: { duration: 0.2 }
                                }}
                                dangerouslySetInnerHTML={{ 
                                    __html: processTextWithFormattingHTML(paragraph?.toString() || '') 
                                }}
                            />
                            {!isLast && <Sizebox height={20} />}
                        </React.Fragment>
                    );
                })}
            </motion.div>
        );
    };

    const content = renderParagraphs(children);

    if (isCentered) {
        return (
            <Centered>
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {content}
                </div>
            </Centered>
        );
    }    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32">
            {content}
        </div>
    );
}

export default RandomParapraph;