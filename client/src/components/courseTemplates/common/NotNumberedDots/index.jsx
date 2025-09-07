import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';
import Sizebox from '../Sizebox';

const NotNumberedDots = ({ 
    list, 
    header, 
    dotsColor = '#F9CB36', 
    color = '#3A3939', 
    gap = '27px', 
    fontWeight = '600', 
    isSublist = false
}) => {
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

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            x: -20,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const dotVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    if (!list || list.length === 0) return null;

    return (
        <div className="w-full">
            {header && (
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h3 
                        className={`
                            text-2xl font-semibold leading-relaxed mb-6
                            ${isSublist ? 'text-lg' : 'text-2xl'}
                            transition-colors duration-200
                        `}
                        style={{
                            fontWeight: fontWeight,
                            color: color,
                            fontFamily: 'Ubuntu, sans-serif'
                        }}
                    >
                        {header}
                    </h3>
                    <Sizebox height={37} />
                </motion.div>
            )}
            
            <motion.div 
                className={`
                    flex flex-col space-y-4
                    ${isSublist ? 'ml-8 space-y-2' : ''}
                    transition-all duration-300 ease-in-out
                `}
                style={{ gap: isSublist ? '8px' : gap }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {list.map((item, index) => (
                    <motion.div 
                        key={index}
                        className="flex items-start gap-4 group hover:transform hover:translate-x-1 transition-all duration-200"
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.01,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <motion.div
                            className={`
                                w-3 h-3 rounded-full flex-shrink-0 mt-2
                                shadow-sm transition-all duration-200
                                group-hover:shadow-md group-hover:scale-110
                                ${isSublist ? 'w-2 h-2 mt-1.5' : 'w-3 h-3 mt-2'}
                            `}
                            style={{ backgroundColor: dotsColor }}
                            variants={dotVariants}
                            whileHover={{ 
                                scale: isSublist ? 1.3 : 1.2,
                                boxShadow: `0 0 8px ${dotsColor}40`
                            }}
                        />
                        
                        <div 
                            className={`
                                flex-1 leading-relaxed
                                ${isSublist ? 'text-sm' : 'text-base'}
                                transition-colors duration-200
                            `}
                            style={{ 
                                color: color,
                                fontFamily: 'Ubuntu, sans-serif'
                            }}
                        >
                            {typeof item === 'string' ? 
                                item.split('\\n').map((child, childIndex) => (
                                    <p 
                                        key={childIndex}
                                        className="mb-1 last:mb-0 font-light leading-6"
                                        dangerouslySetInnerHTML={{ 
                                            __html: processTextWithFormattingHTML(child) 
                                        }}
                                    />
                                ))
                                : 
                                <p className="font-light leading-6">
                                    {item}
                                </p>
                            }
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};


export default NotNumberedDots;