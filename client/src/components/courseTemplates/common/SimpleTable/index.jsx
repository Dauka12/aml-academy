import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

const SimpleTable = ({ columns, data }) => {
    const [isMobile, setIsMobile] = useState(false);
    
    // Check for mobile view on component mount and window resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile(); // Initial check
        
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };
    
    // Render formatted text properly
    const renderFormattedText = (text) => {
        if (typeof text !== 'string') return text;
        return <span dangerouslySetInnerHTML={{ __html: processTextWithFormattingHTML(text.replace(/\n/g, '<br/>')) }} />;
    };

    if (!data || data.length === 0) return null;

    // Mobile card view rendering
    if (isMobile) {
        return (
            <div className="w-full px-4 py-6">
                <motion.div 
                    className="space-y-4"
                    variants={fadeIn}
                    initial="hidden" 
                    animate="visible"
                >
                    {data.map((row, rowIndex) => (
                        <motion.div
                            key={rowIndex}
                            className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                            variants={itemVariant}
                        >
                            {Array.isArray(row) ? (
                                <div className="divide-y divide-gray-200">
                                    {row.map((cell, cellIndex) => (
                                        <div key={cellIndex} className="p-4">
                                            {columns && columns.length > cellIndex && (
                                                <div className="font-semibold text-sm text-gray-700 mb-1">
                                                    {renderFormattedText(columns[cellIndex])}
                                                </div>
                                            )}
                                            <div className="text-sm text-gray-800 break-words">
                                                {renderFormattedText(cell)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 text-sm text-gray-800 break-words">
                                    {renderFormattedText(row)}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        );
    }

    // Desktop table view rendering
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <motion.div
                className="overflow-hidden rounded-lg border border-gray-200 shadow"
                variants={fadeIn}
                initial="hidden" 
                animate="visible"
            >{/* HTML comment to prevent whitespace text node issues */}
                <div className="">
                    <table className="min-w-full bg-white border-collapse">
                        {columns && columns.length > 0 && (
                            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                <tr>{/* HTML comment to prevent whitespace text node issues */}
                                    {columns.map((column, index) => (
                                        <th 
                                            key={index} 
                                            className="px-4 py-3 text-left font-semibold text-gray-800 border-b border-gray-300"
                                            style={{
                                                width: `${100 / columns.length}%`,
                                                maxWidth: '1fr'
                                            }}
                                        >{renderFormattedText(column)}</th>
                                    ))}
                                </tr>
                            </thead>
                        )}{/* HTML comment to prevent whitespace text node issues */}
                        <tbody className="divide-y divide-gray-200">
                            {data.map((row, rowIndex) => (
                                <motion.tr
                                    key={rowIndex}
                                    className="hover:bg-gray-50"
                                    variants={itemVariant}
                                >{/* HTML comment to prevent whitespace text node issues */}
                                    {Array.isArray(row) ? 
                                        row.map((cell, cellIndex) => (
                                            <td 
                                                key={cellIndex} 
                                                className="px-4 py-4 text-gray-700 border-b border-gray-200"
                                                style={{
                                                    width: columns && columns.length ? `${100 / columns.length}%` : 'auto'
                                                }}
                                            >{renderFormattedText(cell)}</td>
                                        )) : 
                                        <td 
                                            colSpan={columns ? columns.length : 1} 
                                            className="px-4 py-4 text-gray-700 border-b border-gray-200"
                                        >{renderFormattedText(row)}</td>
                                    }
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default SimpleTable;
