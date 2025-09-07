import { motion } from 'framer-motion';
import React from 'react';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

function DataChain({
    data_row,
    lineColor = '#3b3d42',
    blockColor = 'rgb(31, 60, 136)',
    textColor = 'black',
    spacing = 20
}) {
    if (!data_row || data_row.length === 0) return null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 40,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
            }
        }
    };

    const lineVariants = {
        hidden: { 
            scaleY: 0,
            opacity: 0
        },
        visible: {
            scaleY: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2
            }
        }
    };

    return (
        <motion.div 
            className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="flex flex-col items-center max-w-4xl mx-auto">
                {data_row.map((item, index) => (
                    <React.Fragment key={index}>
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02,
                                y: -4,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Block 
                                item={item} 
                                borderColor={blockColor}
                                textColor={textColor}
                                index={index}
                            />
                        </motion.div>
                        
                        {index !== data_row.length - 1 && (
                            <motion.div 
                                className="flex items-center justify-center my-4"
                                variants={lineVariants}
                                style={{ height: `${spacing * 2}px` }}
                            >
                                <div 
                                    className="w-1 h-full rounded-full opacity-60 shadow-sm"
                                    style={{ backgroundColor: lineColor }}
                                />
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </motion.div>
    );
}

const Block = ({ item, borderColor, textColor, index }) => {
    const blockVariants = {
        hidden: { opacity: 0, rotateY: -15 },
        visible: {
            opacity: 1,
            rotateY: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1
            }
        }
    };

    return (
        <motion.div 
            className="w-full max-w-2xl bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            style={{
                borderLeft: `6px solid ${borderColor}`,
                color: textColor
            }}
            variants={blockVariants}
            whileHover={{
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
            }}
        >
            <div className="p-6 md:p-8 space-y-4">
                {/* Title */}
                <motion.h3
                    className="text-xl md:text-2xl font-semibold leading-tight transition-colors duration-300"
                    style={{ 
                        color: textColor,
                        fontFamily: 'Ubuntu, sans-serif'
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    dangerouslySetInnerHTML={{
                        __html: processTextWithFormattingHTML(item.title || '')
                    }}
                />

                {/* Description */}
                <motion.div
                    className="text-base md:text-lg leading-relaxed transition-colors duration-300"
                    style={{ 
                        color: textColor,
                        fontFamily: 'Ubuntu, sans-serif'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    dangerouslySetInnerHTML={{
                        __html: processTextWithFormattingHTML(item.description || '')
                    }}
                />

                {/* Decorative element */}
                <motion.div
                    className="absolute top-0 right-0 w-16 h-16 opacity-10 rounded-bl-full"
                    style={{ backgroundColor: borderColor }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 0.4 }}
                />
            </div>
        </motion.div>
    );
};

export default DataChain;
