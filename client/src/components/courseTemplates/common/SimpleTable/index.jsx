import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

function SimpleTable({ columns, data }) {
    // Animation variants
    const tableVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const rowVariants = {
        hidden: { 
            opacity: 0, 
            x: -20 
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const headerVariants = {
        hidden: { 
            opacity: 0, 
            y: -10 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    // Function to handle newlines and formatting in table cell text
    const renderTextWithLineBreaks = (text) => {
        if (typeof text !== 'string') return text;

        return (
            <span 
                dangerouslySetInnerHTML={{ 
                    __html: processTextWithFormattingHTML(text.replace(/\n/g, '<br/>')) 
                }} 
            />
        );
    };

    if (!data || data.length === 0) return null;    return (
        <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-16 2xl:px-32 py-6 sm:py-8">
            <motion.div 
                className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 max-w-full"
                style={{
                    WebkitOverflowScrolling: 'touch'
                }}
                variants={tableVariants}
                initial="hidden"
                animate="visible"
            >
                <table className="min-w-full bg-white w-full">
                    {columns && columns.length > 0 && (
                        <motion.thead 
                            className="bg-gradient-to-r from-blue-50 to-indigo-50"
                            variants={headerVariants}
                        >
                            <tr>
                                {columns.map((column, index) => (
                                    <th 
                                        key={index}
                                        className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 font-semibold text-gray-800 text-xs sm:text-sm md:text-base text-left border-b border-gray-300 break-words"
                                        style={{
                                            minWidth: '80px',
                                            maxWidth: '200px',
                                            wordWrap: 'break-word',
                                            overflowWrap: 'break-word',
                                            hyphens: 'auto'
                                        }}
                                    >
                                        {renderTextWithLineBreaks(column)}
                                    </th>
                                ))}
                            </tr>
                        </motion.thead>
                    )}
                    <motion.tbody 
                        className="divide-y divide-gray-200"
                        variants={rowVariants}
                    >
                        {data.map((row, rowIndex) => (
                            <motion.tr 
                                key={rowIndex}
                                className="hover:bg-gray-50 transition-colors duration-200"
                                variants={rowVariants}
                                whileHover={{
                                    backgroundColor: "#f9fafb",
                                    scale: 1.01,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {Array.isArray(row) ? (
                                    row.map((cell, cellIndex) => (
                                        <td 
                                            key={cellIndex}
                                            className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base text-gray-700 border-b border-gray-200 break-words"
                                            style={{
                                                minWidth: '80px',
                                                maxWidth: '200px',
                                                wordWrap: 'break-word',
                                                overflowWrap: 'break-word',
                                                hyphens: 'auto'
                                            }}
                                        >
                                            {renderTextWithLineBreaks(cell)}
                                        </td>
                                    ))
                                ) : (
                                    <td 
                                        colSpan={columns ? columns.length : 1}
                                        className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base text-gray-700 border-b border-gray-200 break-words"
                                        style={{
                                            wordWrap: 'break-word',
                                            overflowWrap: 'break-word',
                                            hyphens: 'auto'
                                        }}
                                    >
                                        {renderTextWithLineBreaks(row)}
                                    </td>
                                )}
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </motion.div>
        </div>    );
}

export default SimpleTable;
