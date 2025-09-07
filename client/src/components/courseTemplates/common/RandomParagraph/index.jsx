import { motion } from 'framer-motion';
import React from 'react';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';
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
    };    const renderParagraphs = (content) => {
        if (!content) return null;
        
        // Determine paragraphs based on content type
        let paragraphs = [];
        
        if (typeof content === 'string') {
            // If content is a string, split by newlines
            paragraphs = content.split('\\n');
        } else if (React.isValidElement(content)) {
            // If content is a React element (including Fragment), treat as a single paragraph
            paragraphs = [content];
        } else if (Array.isArray(content)) {
            // If content is an array, treat each item as a separate paragraph
            paragraphs = content;
        } else {
            // For any other type, convert to string and use as one paragraph
            paragraphs = [String(content)];
        }
        
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
                                    __html: processTextWithFormattingHTML(paragraph) 
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