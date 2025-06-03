import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

function FlexBoxes({
    list,
    color = 'black',
    backgroundColor = '#CCCCCC',
    shadowColor = 'rgba(0, 0, 0, 0.2)',
    gap = 20
}) {
    if (!list || list.length === 0) return null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const boxVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.9,
            rotateX: -15
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
            }
        }
    };

    const hoverVariants = {
        hover: {
            scale: 1.03,
            y: -5,
            rotateX: 5,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
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
            <div 
                className="flex flex-wrap justify-start items-stretch"
                style={{ gap: `${gap}px` }}
            >
                {list.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex-grow min-w-[300px] max-w-[400px] min-h-[300px] flex items-center justify-center p-6 md:p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
                        style={{
                            backgroundColor,
                            color,
                            boxShadow: `5px 5px 15px ${shadowColor}`,
                            fontFamily: 'Ubuntu, sans-serif',
                            perspective: '1000px'
                        }}
                        whileHover="hover"
                        variants={{...boxVariants, ...hoverVariants}}
                    >
                        <div className="text-center">
                            {item.split('\\n').map((child, childIndex) => (
                                <motion.p
                                    key={childIndex}
                                    className="text-lg md:text-xl font-light leading-relaxed tracking-wide mb-3 last:mb-0"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        delay: index * 0.1 + childIndex * 0.05,
                                        duration: 0.4 
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: processTextWithFormattingHTML(child)
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default FlexBoxes;