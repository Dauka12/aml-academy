import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

function TextWithTitle({ title, text, color, fontWeight }) {
    const defaultColor = '#000000';
    const _color = color || defaultColor;
    const defaultFontWeight = '500';
    const _fontWeight = fontWeight || defaultFontWeight;

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

    const titleVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
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

    // Helper function to get font weight class
    const getFontWeightClass = (weight) => {
        const weightMap = {
            '100': 'font-thin',
            '200': 'font-extralight',
            '300': 'font-light',
            '400': 'font-normal',
            '500': 'font-medium',
            '600': 'font-semibold',
            '700': 'font-bold',
            '800': 'font-extrabold',
            '900': 'font-black'
        };
        return weightMap[weight] || 'font-medium';
    };

    return (
        <motion.div 
            className="w-full my-4 md:my-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Title */}
            {title && (
                <motion.h4 
                    className={`text-lg md:text-xl lg:text-2xl ${getFontWeightClass(_fontWeight)} mb-3 md:mb-4 leading-tight transition-colors duration-300`}
                    style={{ color: _color }}
                    variants={titleVariants}
                    dangerouslySetInnerHTML={{
                        __html: processTextWithFormattingHTML(title)
                    }}
                />
            )}

            {/* Text Content */}
            <motion.div variants={textVariants}>
                {Array.isArray(text) ? (
                    <div className="space-y-2 md:space-y-3">
                        {text.map((item, index) => (
                            <p
                                key={index}
                                className="text-sm md:text-base lg:text-lg leading-relaxed transition-colors duration-300"
                                style={{ color: _color }}
                                dangerouslySetInnerHTML={{
                                    __html: processTextWithFormattingHTML(item)
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <p 
                        className="text-sm md:text-base lg:text-lg leading-relaxed transition-colors duration-300"
                        style={{ color: _color }}
                        dangerouslySetInnerHTML={{
                            __html: processTextWithFormattingHTML(text)
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
}

export default TextWithTitle;