import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import componentMap_level_2 from './../../../../../pages/AdminPage_v2/constructor/ComponentMap_level_2';

function OneToFour({
    header,
    list,
    version=1
}) {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(prev => !prev);

    // Animation variants
    const headerVariants = {
        initial: { scale: 0.97 },
        hover: { scale: 1.01, transition: { duration: 0.3 } },
        tap: { scale: 0.99, transition: { duration: 0.1 } },
    };

    const iconContainerVariants = {
        initial: { rotate: 0 },
        open: { rotate: 180, transition: { duration: 0.4 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: { 
                delay: custom * 0.1,
                duration: 0.4,
            }
        })
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const contentVariants = {
        hidden: {
            height: 0,
            opacity: 0,
        },
        visible: {
            height: 'auto',
            opacity: 1,
            transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.3, delay: 0.1 },
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    if (version === 2) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
                <motion.div 
                    className="rounded-lg bg-white shadow-md overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div 
                        className="relative bg-gray-50 px-6 py-8 cursor-pointer"
                        variants={headerVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={toggleOpen}
                    >
                        <div className="max-w-lg mx-auto text-center font-medium text-xl text-gray-800">
                            {componentMap_level_2[header.componentName] && 
                                React.createElement(componentMap_level_2[header.componentName], header.values)
                            }
                        </div>
                        <motion.div 
                            className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100"
                            variants={iconContainerVariants}
                            animate={open ? "open" : "initial"}
                        >
                            {open 
                                ? <MinusIcon className="w-5 h-5 text-blue-600" />
                                : <PlusIcon className="w-5 h-5 text-blue-600" />
                            }
                        </motion.div>
                    </motion.div>
                    
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={contentVariants}
                                className="overflow-hidden pt-6 pb-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6">
                                    {list && list.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-gray-50 rounded-lg shadow-sm p-4 h-full border border-gray-100"
                                            variants={itemVariants}
                                            custom={index}
                                        >
                                            {componentMap_level_2[item.componentName] && 
                                                React.createElement(componentMap_level_2[item.componentName], item.values)
                                            }
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
            <motion.div 
                className="rounded-lg bg-white shadow-md overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    className="relative bg-gray-50 px-6 py-8 cursor-pointer"
                    variants={headerVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={toggleOpen}
                >
                    <div className="max-w-lg mx-auto text-center font-medium text-xl text-gray-800">
                        {header}
                    </div>
                    <motion.div 
                        className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100"
                        variants={iconContainerVariants}
                        animate={open ? "open" : "initial"}
                    >
                        {open 
                            ? <MinusIcon className="w-5 h-5 text-blue-600" />
                            : <PlusIcon className="w-5 h-5 text-blue-600" />
                        }
                    </motion.div>
                </motion.div>
                
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={contentVariants}
                            className="overflow-hidden pt-6 pb-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6">
                                {list && list.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-gray-50 rounded-lg shadow-sm p-4 h-full border border-gray-100"
                                        variants={itemVariants}
                                        custom={index}
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default OneToFour;
