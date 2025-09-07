import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

function TextWithBackground({ header, text, color, backgroundColor }) {
    const defaultColor = '#3A3939';
    const defaultBackgroundColor = '#CADEFC';

    const _color = color || defaultColor;
    const _backgroundColor = backgroundColor || defaultBackgroundColor;

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

    const itemVariants = {
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

    return (
        <motion.div 
            className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 py-6 md:py-8 font-sans rounded-lg shadow-sm"
            style={{ backgroundColor: _backgroundColor }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="flex flex-col gap-4 md:gap-5">
                {header && (
                    <motion.h3 
                        className="text-xl md:text-2xl font-bold leading-tight text-center"
                        style={{ color: _color }}
                        variants={itemVariants}
                        dangerouslySetInnerHTML={{
                            __html: processTextWithFormattingHTML(header)
                        }}
                    />
                )}
                
                <div className="space-y-3 md:space-y-4">
                    {Array.isArray(text) ? 
                        text.map((t, i) => (
                            <motion.p 
                                key={i}
                                className="text-lg md:text-xl font-medium leading-relaxed"
                                style={{ color: _color }}
                                variants={itemVariants}
                                dangerouslySetInnerHTML={{
                                    __html: processTextWithFormattingHTML(t?.toString() || '')
                                }}
                            />
                        )) : (
                            <motion.p 
                                className="text-lg md:text-xl font-medium leading-relaxed"
                                style={{ color: _color }}
                                variants={itemVariants}
                                dangerouslySetInnerHTML={{
                                    __html: processTextWithFormattingHTML(text?.toString() || '')
                                }}
                            />
                        )
                    }
                </div>
            </div>
        </motion.div>
    );
}

export default TextWithBackground;