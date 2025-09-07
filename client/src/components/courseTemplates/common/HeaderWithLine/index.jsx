import { motion } from 'framer-motion';
import React from 'react';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer';
import Sizebox from '../Sizebox';

function HeaderWithLine({ children, header, headerColor, lineColor, version = 1 }) {
    const defaultHeaderColor = '#3A3939';
    const defaultLineColor = '#CADEFC';

    const _headerColor = headerColor || defaultHeaderColor;
    const _lineColor = lineColor || defaultLineColor;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    const lineVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    // Helper function to render header text with formatting
    const renderHeaderText = (text, index = 0) => (
        <motion.h1 
            key={index}
            variants={textVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-0 transition-colors duration-300 hover:opacity-80"
            style={{ color: _headerColor }}
            dangerouslySetInnerHTML={{ 
                __html: processTextWithFormattingHTML(text) 
            }}
        />
    );    // Process header content using a simpler approach
    // Just determine what content to use: children or header prop
    const headerContent = children || header || '';
    
    // Always treat as one part for simplicity - the processTextWithFormattingHTML function
    // will handle the complex cases like React elements or fragments
    const headerParts = [headerContent];

    return (
        <motion.div 
            className="w-full my-6 md:my-8 lg:my-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Decorative line */}
            <motion.div 
                className="w-full h-0.5 mb-4 md:mb-6 origin-left"
                style={{ backgroundColor: _lineColor }}
                variants={lineVariants}
            />
            
            {/* Header content */}
            <div className="space-y-4">
                {headerParts.map((part, index) => (
                    <React.Fragment key={index}>
                        {renderHeaderText(part, index)}
                        {index < headerParts.length - 1 && (
                            <Sizebox height={20} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </motion.div>
    );
}

export default HeaderWithLine;