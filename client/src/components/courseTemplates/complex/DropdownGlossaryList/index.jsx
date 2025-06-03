import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

function DropdownGlossaryList({
    list,
    headerTextColor,
    activeHeaderTextColor,
    textColor,
    tabsTextColor,
    tabsBackgroundColor,
}) {
    if (!list || list.length === 0) return null;

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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
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
            className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="space-y-4">
                {list.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                    >
                        <DropDownData 
                            header={item.title}
                            data={item.description}
                            headerColor={headerTextColor}
                            headerActiveColor={activeHeaderTextColor}
                            dataColor={textColor}
                            index={index}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

const DropDownData = ({ header, data, headerColor, headerActiveColor, dataColor, index }) => {
    const defaultHeaderColor = '#374151';
    const defaultHeaderActiveColor = '#3B82F6';
    const defaultDataColor = '#6B7280';

    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(prev => !prev);
    };

    // Animation variants for dropdown content
    const contentVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            y: -10,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        visible: {
            opacity: 1,
            height: "auto",
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        closed: { rotate: 0 },
        open: { rotate: 180 }
    };

    const headerVariants = {
        rest: { scale: 1 },
        hover: { 
            scale: 1.01,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.99 }
    };

    return (
        <motion.div 
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <motion.div
                className="flex justify-between items-center p-4 sm:p-6 cursor-pointer select-none"
                onClick={handleOpen}
                variants={headerVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                style={{
                    background: isOpen 
                        ? 'linear-gradient(135deg, #F3F4F6, #E5E7EB)'
                        : 'transparent'
                }}
            >
                <h3
                    className="text-base sm:text-lg font-semibold leading-relaxed transition-colors duration-300 flex-1 pr-4"
                    style={{
                        color: isOpen 
                            ? (headerActiveColor || defaultHeaderActiveColor)
                            : (headerColor || defaultHeaderColor)
                    }}
                    dangerouslySetInnerHTML={{
                        __html: processTextWithFormattingHTML(header || '')
                    }}
                />
                
                <motion.div
                    className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    variants={iconVariants}
                    animate={isOpen ? "open" : "closed"}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? (
                        <AiOutlineMinus 
                            size={20} 
                            style={{
                                color: headerActiveColor || defaultHeaderActiveColor
                            }}
                        />
                    ) : (
                        <AiOutlinePlus 
                            size={20} 
                            style={{
                                color: headerColor || defaultHeaderColor
                            }}
                        />
                    )}
                </motion.div>
            </motion.div>

            {/* Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="overflow-hidden"
                    >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                            <div 
                                className="text-sm sm:text-base leading-relaxed border-t border-gray-200 pt-4"
                                style={{ color: dataColor || defaultDataColor }}
                                dangerouslySetInnerHTML={{
                                    __html: processTextWithFormattingHTML(data || '')
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative bottom border when open */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ originX: 0 }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default DropdownGlossaryList;