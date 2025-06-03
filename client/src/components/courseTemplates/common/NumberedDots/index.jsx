import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';
import Sizebox from '../Sizebox';

const NumberedDots = ({ list, dotsColor, color, header, gap = 20 }) => {
    const defaultDotsColor = '#F9CB36';
    const defaultColor = '#3A3939';
    
    const _dotsColor = dotsColor || defaultDotsColor;
    const _color = color || defaultColor;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const numberVariants = {
        hidden: { scale: 0, rotate: -90 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1
            }
        }
    };

    if (!list || list.length === 0) {
        return null;
    }

    return (
        <motion.div 
            className="w-full my-6 md:my-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Header */}
            {header && (
                <>
                    <motion.h3 
                        className="text-xl md:text-2xl lg:text-3xl font-semibold mb-0 transition-colors duration-300"
                        style={{ color: _color }}
                        variants={headerVariants}
                        dangerouslySetInnerHTML={{
                            __html: processTextWithFormattingHTML(header)
                        }}
                    />
                    <Sizebox height={30} />
                </>
            )}

            {/* Numbered List */}
            <div 
                className="flex flex-col space-y-4 md:space-y-6"
                style={{ gap: `${gap}px` }}
            >
                {list.map((item, index) => {
                    const number = index + 1;
                    
                    return (
                        <motion.div 
                            key={index}
                            className="flex items-start space-x-4 md:space-x-6 group"
                            variants={itemVariants}
                        >
                            {/* Number Circle */}
                            <motion.div 
                                className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base lg:text-lg shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110"
                                style={{ backgroundColor: _dotsColor }}
                                variants={numberVariants}
                            >
                                {number}
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1 pt-1 md:pt-2">
                                {typeof item === 'string' ? (
                                    <div className="space-y-2">
                                        {item.split('\\n').map((line, lineIndex) => (
                                            <p
                                                key={lineIndex}
                                                className="text-sm md:text-base lg:text-lg leading-relaxed font-light transition-colors duration-300 group-hover:opacity-80"
                                                style={{ color: _color }}
                                                dangerouslySetInnerHTML={{
                                                    __html: processTextWithFormattingHTML(line)
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p
                                        className="text-sm md:text-base lg:text-lg leading-relaxed font-light transition-colors duration-300 group-hover:opacity-80"
                                        style={{ color: _color }}
                                        dangerouslySetInnerHTML={{
                                            __html: processTextWithFormattingHTML(String(item))
                                        }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default NumberedDots;