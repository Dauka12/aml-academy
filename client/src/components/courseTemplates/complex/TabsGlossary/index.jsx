import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

function TabsGlossary({
    tabs,
    tabsGlossary,
    color = '#374151',
    tabsBackgroundColor = '#4F46E5',
    tabsActiveBackgroundColor = '#4338CA',
    glossaryBackgroundColor = '#F9FAFB',
    title,
    version = 2
}) {
    const [currentTab, setCurrentTab] = useState(tabs ? tabs[0] : null);
    const [expandedMobileTab, setExpandedMobileTab] = useState(null);

    if (!tabs || !tabsGlossary) return null;

    // Convert hex to rgba for shadows and overlays
    const hexToRgba = (hex, alpha = 1) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

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
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -3,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.98 }
    };

    const contentVariants = {
        hidden: {
            opacity: 0,
            y: 10,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.4
            }
        }
    };

    const mobileTabVariants = {
        closed: { 
            height: "auto", 
            marginBottom: "0px" 
        },
        open: { 
            height: "auto", 
            marginBottom: "16px",
            transition: {
                height: { duration: 0.3 },
                marginBottom: { duration: 0.3 }
            }
        }
    };

    const mobileContentVariants = {
        closed: { 
            opacity: 0, 
            height: 0,
            transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.3 }
            }
        },
        open: { 
            opacity: 1, 
            height: "auto",
            transition: {
                opacity: { duration: 0.3, delay: 0.1 },
                height: { duration: 0.4 }
            }
        }
    };

    // Toggle mobile accordion
    const toggleMobileTab = (tab) => {
        if (expandedMobileTab === tab) {
            setExpandedMobileTab(null);
        } else {
            setExpandedMobileTab(tab);
        }
    };

    return (
        <motion.div
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Optional Title */}
            {title && (
                <motion.h2 
                    className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center"
                    style={{ color }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h2>
            )}

            {/* Mobile Accordion View */}
            <div className="md:hidden space-y-3">
                {tabs.map((tab, index) => (
                    <motion.div 
                        key={`mobile-${index}`}
                        variants={mobileTabVariants}
                        initial="closed"
                        animate={expandedMobileTab === tab ? "open" : "closed"}
                        className="rounded-xl overflow-hidden shadow-lg"
                    >
                        {/* Accordion Header */}
                        <motion.button
                            onClick={() => toggleMobileTab(tab)}
                            className="w-full px-5 py-4 text-left flex justify-between items-center"
                            style={{ 
                                background: expandedMobileTab === tab 
                                    ? `linear-gradient(135deg, ${tabsBackgroundColor}, ${tabsActiveBackgroundColor})` 
                                    : '#FFFFFF',
                                boxShadow: expandedMobileTab === tab 
                                    ? `0 4px 12px ${hexToRgba(tabsBackgroundColor, 0.3)}` 
                                    : 'none'
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span 
                                className="font-medium text-base pr-3 leading-tight"
                                style={{ 
                                    color: expandedMobileTab === tab ? '#FFFFFF' : color
                                }}
                            >
                                {tab}
                            </span>
                            <motion.svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 20 20" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                animate={{ rotate: expandedMobileTab === tab ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <path 
                                    d="M5 7.5L10 12.5L15 7.5" 
                                    stroke={expandedMobileTab === tab ? '#FFFFFF' : color}
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </motion.svg>
                        </motion.button>
                          {/* Accordion Content */}
                        <motion.div
                            variants={mobileContentVariants}
                            className="overflow-hidden"
                            style={{ 
                                backgroundColor: glossaryBackgroundColor,
                            }}
                        >
                            <div className="px-5 py-4">
                                {tabsGlossary[tab] && (
                                    <div className="space-y-3 text-base">
                                        {typeof tabsGlossary[tab] === 'string' ? (
                                            // Handle string content by splitting into paragraphs
                                            tabsGlossary[tab].split('\\n').map((paragraph, paraIndex) => (
                                                <div 
                                                    key={`mobile-para-${paraIndex}`}
                                                    className="leading-relaxed"
                                                    style={{ color }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: processTextWithFormattingHTML(paragraph)
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            // Handle React elements and other non-string content
                                            <div 
                                                className="leading-relaxed"
                                                style={{ color }}
                                                dangerouslySetInnerHTML={{
                                                    __html: processTextWithFormattingHTML(tabsGlossary[tab])
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Desktop Tab View */}
            <div className="hidden md:block">
                {/* Tabs Navigation - Modern Pills */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
                    <motion.div 
                        className="inline-flex p-1 rounded-full bg-gray-100 shadow-inner"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {tabs.map((tab, index) => {
                            const isActive = tab === currentTab;
                            return (
                                <motion.button
                                    key={index}
                                    variants={tabVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="relative py-3 px-5 rounded-full font-medium text-base"
                                    onClick={() => setCurrentTab(tab)}
                                >
                                    {/* Active tab background */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full shadow-lg"
                                            style={{ 
                                                background: `linear-gradient(135deg, ${tabsBackgroundColor}, ${tabsActiveBackgroundColor})` 
                                            }}
                                            layoutId="activeDesktopTab"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    
                                    {/* Tab text */}
                                    <span 
                                        className="relative z-10"
                                        style={{ 
                                            color: isActive ? '#FFFFFF' : color,
                                        }}
                                    >
                                        {tab}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Content Area with Card Design */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTab}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="rounded-2xl shadow-lg overflow-hidden"
                        style={{
                            backgroundColor: glossaryBackgroundColor,
                            border: `1px solid ${hexToRgba(tabsBackgroundColor, 0.2)}`,
                            boxShadow: `0 8px 30px ${hexToRgba(tabsBackgroundColor, 0.15)}`
                        }}
                    >                        <div className="p-6 sm:p-8 lg:p-10">
                            {tabsGlossary[currentTab] && (
                                <div className="space-y-4">
                                    {typeof tabsGlossary[currentTab] === 'string' ? (
                                        // Handle string content by splitting into paragraphs
                                        tabsGlossary[currentTab].split('\\n').map((paragraph, paraIndex) => (
                                            <motion.div
                                                key={paraIndex}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: paraIndex * 0.1, duration: 0.4 }}
                                                className="text-base sm:text-lg leading-relaxed"
                                                style={{ color }}
                                                dangerouslySetInnerHTML={{
                                                    __html: processTextWithFormattingHTML(paragraph)
                                                }}
                                            />
                                        ))
                                    ) : (
                                        // Handle React elements and other non-string content
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-base sm:text-lg leading-relaxed"
                                            style={{ color }}
                                            dangerouslySetInnerHTML={{
                                                __html: processTextWithFormattingHTML(tabsGlossary[currentTab])
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default TabsGlossary;


