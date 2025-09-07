import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

function ImageAndColumns({
    image,
    list,
    header,
    headerColor = 'black',
    listColor,
}) {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 1.05 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const columnVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div 
            className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 py-6 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                {/* Image Section */}
                <div className="relative">
                    <motion.img 
                        src={image} 
                        alt={header || "Content image"}
                        className="w-full h-64 md:h-80 object-cover"
                        variants={imageVariants}
                    />
                    
                    {/* Header Overlay */}
                    {header && (
                        <motion.div 
                            className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6"
                            variants={headerVariants}
                        >
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 md:px-6 md:py-4 shadow-lg">
                                <h2 
                                    className="text-lg md:text-xl font-semibold leading-tight"
                                    style={{ color: headerColor }}
                                    dangerouslySetInnerHTML={{
                                        __html: processTextWithFormattingHTML(header)
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Columns Section */}
                <div className="flex flex-col md:flex-col md:divide-x divide-gray-200">
                    {list?.map((item, index) => (
                        <motion.div 
                            key={index}
                            className={`p-4 md:p-6 border-b border-gray-200 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0 ${
                                index === list.length - 1 && list.length % 3 !== 0 ? 'md:border-r-0' : ''
                            }`}
                            style={{ color: listColor }}
                            variants={columnVariants}
                        >
                            <div className="space-y-2">
                                {item.split('\\n').map((child, childIndex) => (
                                    <p
                                        key={childIndex}
                                        className="text-sm md:text-base font-light leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: processTextWithFormattingHTML(child)
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default ImageAndColumns;