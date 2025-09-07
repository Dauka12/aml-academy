import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

function FancyList({
    list,
    textColor = 'black',
    numberColor = '#151515a8',
    listColor = 'burlywood'
}) {
    if (!list || list.length === 0) return null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            x: -30,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
            }
        }
    };

    const numberVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
            }
        }
    };

    const getZeroPrefixNum = (num) => {
        return num > 9 ? `${num}` : `0${num}`;
    };

    return (
        <motion.div 
            className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="space-y-6">
                {list.map((item, index) => (
                    <motion.div 
                        key={index}
                        className="flex items-start gap-6 group"
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <motion.div
                            className={`
                                w-16 h-16 rounded-lg flex items-center justify-center
                                text-xl font-bold shadow-lg flex-shrink-0
                                transition-all duration-300 ease-in-out
                                group-hover:shadow-xl group-hover:scale-110
                            `}
                            style={{
                                backgroundColor: listColor,
                                color: numberColor,
                                fontFamily: 'Ubuntu, sans-serif'
                            }}
                            variants={numberVariants}
                            whileHover={{ 
                                rotate: 5,
                                boxShadow: `0 8px 25px ${listColor}40`
                            }}
                        >
                            {getZeroPrefixNum(index + 1)}
                        </motion.div>

                        <div 
                            className="flex-1 space-y-2 leading-relaxed transition-all duration-200"
                            style={{ 
                                color: textColor,
                                fontFamily: 'Ubuntu, sans-serif'
                            }}
                        >
                            {item.split('\\n').map((child, childIndex) => (
                                <p 
                                    key={childIndex}
                                    className="text-lg font-medium leading-7 hover:text-opacity-80 transition-opacity duration-200"
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


export default FancyList;