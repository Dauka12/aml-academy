import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

const ComplexTable = ({ 
    columns, 
    data, 
    data_row, 
    showCollapseButton = true, 
    collapseButton = true,
    version = 1 
}) => {
    const { id } = useParams();
    const courseId = parseInt(id, 10);

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [showRows, setShowRows] = useState(5);

    const toggleCollapse = () => {
        setIsCollapsed(prevState => !prevState);
        if (isCollapsed) {
            setShowRows(version === 3 ? data_row?.length : data?.length);
        } else {
            setShowRows(5);
        }
    };

    const actualData = version === 3 ? data_row : data;
    const shouldShowButton = actualData?.length > 5;

    // Animation variants
    const tableVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.05
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    const buttonVariants = {
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

    const collapseButtonText = isCollapsed
        ? (courseId === 81 ? 'Кестені ашу' : 'Развернуть Таблицу')
        : (courseId === 81 ? 'Кестені жабу' : 'Свернуть Таблицу');    const renderCellContent = (cellContent) => {
        if (Array.isArray(cellContent)) {
            return cellContent.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {lineIndex > 0 && <hr className="my-1 border-gray-300" />}
                    <span dangerouslySetInnerHTML={{ 
                        __html: processTextWithFormattingHTML(line) 
                    }} />
                </React.Fragment>
            ));
        }
        
        // Handle React elements directly
        if (React.isValidElement(cellContent)) {
            return (
                <span dangerouslySetInnerHTML={{ 
                    __html: processTextWithFormattingHTML(cellContent) 
                }} />
            );
        }
        
        // Handle string or other primitive values
        return (
            <span dangerouslySetInnerHTML={{ 
                __html: processTextWithFormattingHTML(cellContent !== null && cellContent !== undefined ? cellContent : '') 
            }} />
        );
    };if (!columns || !actualData) return null;

    if (version === 3) {
        return (            <motion.div 
                className="w-full px-2 sm:px-4 py-4 sm:py-6 font-sans max-w-full"
                variants={tableVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 max-w-full">
                    {collapseButton && shouldShowButton && (
                        <motion.div 
                            className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200"
                            variants={buttonVariants}
                        >
                            <motion.button 
                                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
                                onClick={toggleCollapse}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isCollapsed ? (
                                    <ChevronDownIcon className="w-5 h-5" />
                                ) : (
                                    <ChevronUpIcon className="w-5 h-5" />
                                )}
                                {collapseButtonText}
                            </motion.button>
                        </motion.div>
                    )}
                      <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
                        <table className="w-full min-w-max">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    {columns.map((column, index) => (
                                        <th 
                                            key={index}
                                            className="px-2 sm:px-4 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 border-b-2 border-gray-200 min-w-[120px] whitespace-nowrap"
                                        >
                                            {typeof column === 'string' 
                                                ? column.split('\\n').map((child, childIndex) => (
                                                    <p 
                                                        key={childIndex}
                                                        className="leading-relaxed"
                                                        dangerouslySetInnerHTML={{ 
                                                            __html: processTextWithFormattingHTML(child) 
                                                        }}
                                                    />
                                                ))
                                                : <p 
                                                    className="leading-relaxed"
                                                    dangerouslySetInnerHTML={{ 
                                                        __html: processTextWithFormattingHTML(column?.header || column?.key || JSON.stringify(column)) 
                                                    }}
                                                />
                                            }
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <AnimatePresence>
                                <tbody>
                                    {data_row?.slice(0, showRows).map((row, rowIndex) => (
                                        <motion.tr 
                                            key={rowIndex}
                                            variants={rowVariants}
                                            className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                        >
                                            {columns.map((column, colIndex) => {
                                                const colSpan = row['colSpan'] || 1;
                                                const rowSpan = row['rowSpan'] || 1;

                                                if (colSpan > 1 && colIndex > 0) {
                                                    return null;
                                                }

                                                const cellContent = row[column];                                                return (
                                                    <td 
                                                        key={colIndex} 
                                                        colSpan={colSpan} 
                                                        rowSpan={rowSpan}
                                                        className={`px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 min-w-[120px] ${
                                                            colSpan === 3 ? 'text-center font-semibold' : 'text-left'
                                                        } break-words hyphens-auto`}
                                                    >
                                                        {renderCellContent(cellContent)}
                                                    </td>
                                                );
                                            })}
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </AnimatePresence>
                        </table>
                    </div>
                </div>
            </motion.div>
        );
    }
    
    return (        <motion.div 
            className="w-full px-2 sm:px-4 py-4 sm:py-6 font-sans max-w-full"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 max-w-full">
                {showCollapseButton && shouldShowButton && (
                    <motion.div 
                        className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200"
                        variants={buttonVariants}
                    >
                        <motion.button 
                            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
                            onClick={toggleCollapse}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isCollapsed ? (
                                <ChevronDownIcon className="w-5 h-5" />
                            ) : (
                                <ChevronUpIcon className="w-5 h-5" />
                            )}
                            {collapseButtonText}
                        </motion.button>
                    </motion.div>
                )}
                  <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
                    <table className="w-full min-w-max">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                {columns.map((column, index) => (
                                    <th 
                                        key={index}
                                        className="px-2 sm:px-4 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900 border-b-2 border-gray-200 min-w-[120px] whitespace-nowrap"                                    >
                                        {typeof column === 'string' 
                                            ? column.split('\\n').map((child, childIndex) => (
                                                <p 
                                                    key={childIndex}
                                                    className="leading-relaxed"
                                                    dangerouslySetInnerHTML={{ 
                                                        __html: processTextWithFormattingHTML(child) 
                                                    }}
                                                />
                                            ))
                                            : <p 
                                                className="leading-relaxed"
                                                dangerouslySetInnerHTML={{ 
                                                    __html: processTextWithFormattingHTML(column?.header || column?.key || JSON.stringify(column)) 
                                                }}
                                            />
                                        }
                                    </th>
                                ))}
                            </tr></thead>
                        <AnimatePresence>
                            <tbody>
                                {data?.slice(0, showRows).map((row, rowIndex) => (
                                    <motion.tr 
                                        key={rowIndex}
                                        variants={rowVariants}
                                        className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                    >
                                        {columns.map((column, colIndex) => {
                                            const colSpan = row['colSpan'] || 1;
                                            const rowSpan = row['rowSpan'] || 1;

                                            if (colSpan > 1 && colIndex > 0) {
                                                return null;
                                            }

                                            return (                                                <td 
                                                    key={colIndex} 
                                                    colSpan={colSpan} 
                                                    rowSpan={rowSpan}
                                                    className={`px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 min-w-[120px] ${
                                                        colSpan === 3 ? 'text-center font-semibold' : 'text-left'
                                                    } break-words hyphens-auto`}
                                                >
                                                    {renderCellContent(row[column])}
                                                </td>
                                            );
                                        })}
                                    </motion.tr>
                                ))}
                            </tbody>
                        </AnimatePresence>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default ComplexTable;