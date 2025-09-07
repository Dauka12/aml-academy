import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

import docx from './../../../../assets/icons/docx_icon.png';
import pdf from './pdf-file.png';

function FileDownloader({
    file,
    fileName,
    type,
    color
}) {
    const defaultType = 'pdf';
    const _type = type || defaultType;
    const borderColor = color || '#CADEFC';

    // Animation variants
    const containerVariants = {
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

    const downloadVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2
            }
        },
        tap: {
            scale: 0.95
        }
    };

    const iconVariants = {
        hover: {
            rotate: 5,
            transition: {
                duration: 0.2
            }
        }
    };

    const getFileIcon = () => {
        switch (_type) {
            case 'doc':
            case 'docx':
                return docx;
            default:
                return pdf;
        }
    };

    const getFileTypeColor = () => {
        switch (_type) {
            case 'doc':
            case 'docx':
                return 'text-blue-600';
            case 'pdf':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const initiateDownload = async () => {
        if (!file) return;
        
        try {
            const response = await fetch(file);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName || 'download';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading the file: ', error);
        }
    };

    return (
        <motion.div 
            className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 py-4 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.div 
                className="flex items-center justify-between p-4 md:p-6 bg-white border-2 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                style={{ borderColor }}
                variants={downloadVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={initiateDownload}
            >
                {/* File Icon and Info */}
                <div className="flex items-center gap-4">
                    <motion.div 
                        className="flex-shrink-0"
                        variants={iconVariants}
                        whileHover="hover"
                    >
                        <img 
                            src={getFileIcon()} 
                            alt={`${_type} file icon`}
                            className="w-12 h-12 md:w-14 md:h-14"
                        />
                    </motion.div>
                    
                    <div className="flex flex-col">
                        <h6 
                            className={`text-base md:text-lg font-semibold ${getFileTypeColor()} group-hover:opacity-80 transition-opacity`}
                            dangerouslySetInnerHTML={{
                                __html: processTextWithFormattingHTML(fileName || 'Download File')
                            }}
                        />
                        <p className="text-sm text-gray-500 mt-1 uppercase font-medium">
                            {_type} File
                        </p>
                    </div>
                </div>
                
                {/* Download Button */}
                <motion.div 
                    className="flex-shrink-0 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowDownTrayIcon className="w-6 h-6 md:w-7 md:h-7 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}


export default FileDownloader;