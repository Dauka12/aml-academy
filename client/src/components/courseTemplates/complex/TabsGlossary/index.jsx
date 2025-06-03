import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

function TabsGlossary({
    tabs,
    tabsGlossary,
    color,
    tabsBackgroundColor,
    tabsActiveBackgroundColor,
    glossaryBackgroundColor,
    version = 1
}) {
    const [currentTab, setCurrentTab] = useState(tabs ? tabs[0] : null);

    if (!tabs || !tabsGlossary) return null;

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

    const tabVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.02,
            y: -2,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.98 }
    };

    const contentVariants = {
        hidden: {
            opacity: 0,
            x: -20,
            rotateY: -5
        },
        visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            x: 20,
            rotateY: 5,
            transition: {
                duration: 0.3
            }
        }
    };

    if (version >= 2) {
        return (
            <motion.div
                className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {/* Tabs Navigation */}
                <motion.div className="flex flex-wrap gap-2 sm:gap-3 mb-8 border-b border-gray-200 dark:border-gray-700">
                    {tabs.map((tab, index) => {
                        const isActive = tab === currentTab;
                        return (
                            <motion.button
                                key={index}
                                variants={tabVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className={`
                                    relative px-4 sm:px-6 py-3 rounded-t-lg font-medium text-sm sm:text-base
                                    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                                    ${isActive 
                                        ? 'text-white shadow-lg transform -translate-y-0.5' 
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                    }
                                `}
                                style={{
                                    backgroundColor: isActive 
                                        ? (tabsBackgroundColor || '#3B82F6')
                                        : 'transparent',
                                    color: isActive 
                                        ? 'white' 
                                        : (color || '#374151'),
                                    borderBottom: isActive 
                                        ? `3px solid ${tabsBackgroundColor || '#3B82F6'}` 
                                        : '3px solid transparent'
                                }}
                                onClick={() => setCurrentTab(tab)}
                            >
                                {tab}
                                
                                {/* Active tab indicator */}
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-t-lg shadow-inner"
                                        style={{ 
                                            background: `linear-gradient(135deg, ${tabsBackgroundColor || '#3B82F6'}, ${tabsActiveBackgroundColor || '#1D4ED8'})` 
                                        }}
                                        layoutId="activeTab"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                
                                {/* Tab text with z-index to appear above background */}
                                <span className="relative z-10">{tab}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTab}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="rounded-lg shadow-lg overflow-hidden"
                        style={{
                            backgroundColor: glossaryBackgroundColor || '#F9FAFB',
                            border: `1px solid ${tabsBackgroundColor || '#E5E7EB'}`
                        }}
                    >
                        <div className="p-6 sm:p-8">
                            {tabsGlossary[currentTab] && (
                                <div className="space-y-4">
                                    {tabsGlossary[currentTab].split('\\n').map((paragraph, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.4 }}
                                            className="text-base sm:text-lg leading-relaxed"
                                            style={{ color: color || '#374151' }}
                                            dangerouslySetInnerHTML={{
                                                __html: processTextWithFormattingHTML(paragraph)
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        );
    }

    // Legacy version (version 1) with modern styling
    return (
        <motion.div
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Tabs Navigation */}
            <motion.div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
                {tabs.map((tab, index) => {
                    const isActive = tab === currentTab;
                    return (
                        <motion.button
                            key={index}
                            variants={tabVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className={`
                                px-4 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base
                                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                                ${isActive 
                                    ? 'shadow-lg transform -translate-y-0.5' 
                                    : 'hover:shadow-md'
                                }
                            `}
                            style={{
                                backgroundColor: isActive 
                                    ? (tabsBackgroundColor || '#3B82F6')
                                    : 'white',
                                color: isActive 
                                    ? 'white'
                                    : (color || '#374151'),
                                border: `1px solid ${tabsBackgroundColor || '#E5E7EB'}`
                            }}
                            onClick={() => setCurrentTab(tab)}
                        >
                            {tab}
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTab}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="rounded-lg shadow-lg p-6 sm:p-8"
                    style={{
                        backgroundColor: glossaryBackgroundColor || '#F9FAFB',
                        color: color || '#374151',
                        border: `1px solid ${tabsBackgroundColor || '#E5E7EB'}`
                    }}
                >
                    <div
                        className="text-base sm:text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: processTextWithFormattingHTML(tabsGlossary[currentTab] || '')
                        }}
                    />
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default TabsGlossary;