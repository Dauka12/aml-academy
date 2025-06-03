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

    if (!data || data.length === 0) return null;

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32 py-8">
            <motion.div 
                className="overflow-x-auto shadow-lg rounded-lg border border-gray-200"
                variants={tableVariants}
                initial="hidden"
                animate="visible"
            >
                <table className="min-w-full bg-white">
                    {columns && columns.length > 0 && (
                        <motion.thead 
                            className="bg-gradient-to-r from-blue-50 to-indigo-50"
                            variants={headerVariants}
                        >
                            <tr>
                                {columns.map((column, index) => (
                                    <th 
                                        key={index}
                                        className={`
                                            px-6 py-4 font-semibold text-gray-800
                                            border-b-2 border-blue-200
                                            ${columns.length === 1 ? 'text-center' : 'text-left'}
                                            transition-colors duration-200
                                            hover:bg-blue-100
                                        `}
                                        style={{ fontFamily: 'Ubuntu, sans-serif' }}
                                    >
                                        {typeof column === 'string' ? 
                                            renderTextWithLineBreaks(column) 
                                            : column
                                        }
                                    </th>
                                ))}
                            </tr>
                        </motion.thead>
                    )}
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row, rowIndex) => (
                            <motion.tr 
                                key={rowIndex}
                                className="hover:bg-gray-50 transition-colors duration-200"
                                variants={rowVariants}
                                whileHover={{ 
                                    backgroundColor: '#f9fafb',
                                    scale: 1.01
                                }}
                            >
                                {row.map((cell, columnIndex) => (
                                    <td 
                                        key={columnIndex}
                                        className="px-6 py-4 text-gray-700 leading-relaxed border-b border-gray-100"
                                        style={{ fontFamily: 'Ubuntu, sans-serif' }}
                                    >
                                        {renderTextWithLineBreaks(cell)}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}

export default SimpleTable;
