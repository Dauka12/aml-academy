import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

function DropDownTextWithTabs({
    tabs,
    tabsData,
    headerTextColor,
    activeHeaderTextColor,
    textColor,
    tabsTextColor,
    tabsBackgroundColor,
}) {    // Normalize tabs to handle different formats
    const normalizedTabs = useMemo(() => {
        if (!Array.isArray(tabs)) {
            console.warn('DropDownTextWithTabs: tabs is not an array');
            return [];
        }
        
        // Handle both simple string arrays and complex objects
        return tabs.map(tab => {
            if (typeof tab === 'string') {
                return tab;
            } else if (tab && typeof tab === 'object' && tab.tab) {
                return tab.tab;
            } else if (tab && typeof tab === 'object' && tab.tabName) {
                return tab.tabName;
            }
            return String(tab);
        });
    }, [tabs]);
    
    // Normalize tabsData to handle different formats
    const normalizedTabsData = useMemo(() => {
        if (!Array.isArray(tabsData)) {
            console.warn('DropDownTextWithTabs: tabsData is not an array');
            return [];
        }
        
        return tabsData.map(item => {
            // Handle objects with tabsIndex
            if (item && typeof item === 'object' && item.tabsIndex) {
                const matchingTab = Array.isArray(tabs) ? 
                    tabs.find(t => t.id === item.tabsIndex) : null;
                    
                return {
                    tabName: matchingTab ? matchingTab.tab : '',
                    header: item.header || '',
                    data: item.data || ''
                };
            }
            
            // Already in the correct format
            if (item && typeof item === 'object' && item.tabName) {
                return item;
            }
            
            return item;
        });
    }, [tabsData, tabs]);
    
    // Initialize hooks first (before any early returns)
    const [currentTab, setCurrentTab] = useState(
        normalizedTabs.length > 0 ? normalizedTabs[0] : ''
    );
    
    // Safety checks to prevent crashes
    if (normalizedTabs.length === 0) {
        console.warn('DropDownTextWithTabs: No valid tabs available');
        return null;
    }
    
    if (normalizedTabsData.length === 0) {
        console.warn('DropDownTextWithTabs: No valid tabsData available');
        return null;
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
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
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
    };

    const contentVariants = {
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

    return (
        <motion.div 
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Tabs Navigation */}            <motion.div 
                className="flex flex-wrap justify-center gap-3 mb-8"
                variants={contentVariants}
            >
                {normalizedTabs.map((tab, index) => {
                    const isTabCurrent = tab === currentTab;

                    return (
                        <motion.button
                            key={index}
                            variants={tabVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className={`
                                relative px-6 py-3 rounded-lg font-medium text-sm sm:text-base
                                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                                ${isTabCurrent 
                                    ? 'shadow-lg transform -translate-y-1' 
                                    : 'hover:shadow-md'
                                }
                            `}
                            style={{
                                backgroundColor: isTabCurrent 
                                    ? (tabsBackgroundColor || '#3B82F6')
                                    : 'white',
                                color: isTabCurrent 
                                    ? 'white'
                                    : (tabsTextColor || '#374151'),
                                border: `2px solid ${tabsBackgroundColor || '#3B82F6'}`
                            }}
                            onClick={() => {
                                if (tab !== currentTab) {
                                    setCurrentTab(tab);
                                }
                            }}
                        >
                            {/* Active tab background effect */}
                            {isTabCurrent && (
                                <motion.div
                                    className="absolute inset-0 rounded-lg"
                                    style={{ 
                                        background: `linear-gradient(135deg, ${tabsBackgroundColor || '#3B82F6'}, ${tabsBackgroundColor ? `${tabsBackgroundColor}CC` : '#1D4ED8'})` 
                                    }}
                                    layoutId="activeTabBackground"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            
                            {/* Tab text */}
                            <span className="relative z-10 font-semibold">
                                {tab}
                            </span>
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* Content Area */}
            <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                variants={contentVariants}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTab}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="p-6 sm:p-8"
                    >                        <div className="space-y-4">
                            {normalizedTabs !== null && normalizedTabs !== undefined 
                                ? normalizedTabsData.filter(tab => currentTab === tab.tabName).map((tab, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                    >
                                        <DropDownData 
                                            header={tab.header}
                                            data={tab.data}
                                            headerColor={headerTextColor}
                                            headerActiveColor={activeHeaderTextColor}
                                            dataColor={textColor}
                                        />
                                    </motion.div>
                                )) : null
                            }
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

const DropDownData = ({ header, data, headerColor, headerActiveColor, dataColor }) => {
    const defaultHeaderColor = '#374151';
    const defaultHeaderActiveColor = '#3B82F6';
    const defaultDataColor = '#6B7280';

    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(prev => !prev);
    };

    // Animation variants
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
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden mb-4"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
        >
            {/* Header */}
            <motion.div
                className="flex justify-between items-center p-4 sm:p-6 cursor-pointer select-none bg-gradient-to-r from-gray-50 to-white"
                onClick={handleOpen}
                variants={headerVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
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
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-gray-100">
                            <div 
                                className="text-sm sm:text-base leading-relaxed space-y-3"
                                style={{ color: dataColor || defaultDataColor }}
                            >
                                {typeof data === 'string' && data.indexOf('\\n') !== -1 ? (
                                    <div className="space-y-4">
                                        {data.split('\\n').map((text, index) => {
                                            if (text === '') {
                                                return <div key={index} className="h-4" />;
                                            } else {
                                                return (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: processTextWithFormattingHTML(text)
                                                        }}
                                                    />
                                                );
                                            }
                                        })}
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        dangerouslySetInnerHTML={{
                                            __html: processTextWithFormattingHTML(data || '')
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default DropDownTextWithTabs;
