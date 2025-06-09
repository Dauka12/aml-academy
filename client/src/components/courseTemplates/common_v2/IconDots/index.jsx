import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

const IconDots = ({
    list,
    color,
    header,
    gap = 20,
    icons,
    height = '16px',
    width = '16px',
    fontSize = '16px'
}) => {
    const defaultColor = '#3A3939';
    const defaultIcon = 'https://static.thenounproject.com/png/4084271-200.png';

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
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

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };    const iconVariants = {
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.1
            }
        }
    };

    return (        <motion.div
            className="w-full px-3 md:px-4 py-2 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {header && (
                <motion.h3
                    className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 text-center"
                    style={{ color: color || defaultColor }}
                    variants={headerVariants}
                    dangerouslySetInnerHTML={{
                        __html: processTextWithFormattingHTML(header?.toString() || '')
                    }}
                />
            )}            <div
                className="flex flex-col justify-center w-full"
                style={{ gap: `${Math.min(gap, 12)}px` }}
            >
                {list?.map((item, index) => (                    <motion.div
                        key={index}
                        className="flex items-center gap-2 group"
                        variants={itemVariants}
                        whileHover={{ y: -1 }}
                    ><motion.div                            className="relative flex-shrink-0 flex items-center justify-center bg-transparent rounded-full"
                            style={{
                                height: height,
                                width: width,
                                minHeight: '16px',
                                minWidth: '16px',
                                color: color || defaultColor,
                                overflow: 'hidden'
                            }}
                            variants={iconVariants}
                            whileHover="hover"
                        >                            <img
                                src={icons?.[index] || defaultIcon}
                                alt={`Icon ${index + 1}`}
                                className="w-full h-full object-contain"
                                style={{ 
                                    maxWidth: '40px', 
                                    maxHeight: '40px',
                                    display: 'block'
                                }}
                                onError={(e) => {
                                    console.error(`Error loading icon at index ${index}`);
                                    e.target.src = defaultIcon;
                                }}
                            />
                        </motion.div>                        <div
                            className="text-gray-700 leading-normal font-medium text-left flex-1"
                            style={{
                                fontSize: fontSize,
                                color: color || defaultColor,
                                marginTop: '-2px'
                            }}
                            dangerouslySetInnerHTML={{
                                __html: processTextWithFormattingHTML(item?.toString() || '')
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};


export default IconDots;