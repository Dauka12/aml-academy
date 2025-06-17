import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoClose } from "react-icons/io5";
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

import stage_1 from './static/stage_1.svg';
import stage_2 from './static/stage_2.svg';
import stage_3 from './static/stage_3.svg';

function StageDropDown({
    version = 1,
    stages = [
        {icon: stage_1, text: 'Ст. 165 УК КазССР', innerText: 'Использование денежных средств и иного имущества, приобретенных или добытых преступным путем, для занятия предпринимательской деятельностью или иной не запрещенной законом деятельностью'},
        {icon: stage_2, text: 'Ст. 193 УК РК', innerText: 'Легализация денежных средств или иного имущества, проиобретенного незаконным путем'},
        {icon: stage_3, text: 'Ст. 218 УК РК', innerText: 'Легализация (отмывание) денег и (или) иного имущества, полученных преступным путем'},
    ],
    backgroundColor = '#F9F9F9'
}) {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };    return (
        <motion.div 
            className="w-full min-h-[500px] px-4 sm:px-8 md:px-12 lg:px-16 py-16"
            style={{ 
                backgroundColor,
                backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.05) 100%)'
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="flex flex-col items-center justify-center space-y-8">
                {/* Title Section */}
                <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                        Этапы развития
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
                </motion.div>

                {/* Stages Container */}
                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 lg:gap-12 max-w-7xl w-full">
                    {stages && stages.map((item, index) => (
                        <div key={index} className="flex flex-col lg:flex-row items-center">
                            <StageItem 
                                icon={item.icon}
                                text={item.text}
                                innerText={item.innerText}
                                version={version}
                                index={index}
                            />
                            {/* Connector Arrow (except for last item) */}
                            {index < stages.length - 1 && (
                                <motion.div 
                                    className="hidden lg:flex items-center justify-center mx-6"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: (index + 1) * 0.2, duration: 0.4 }}
                                >
                                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500"></div>
                                    <div className="w-0 h-0 border-l-[8px] border-l-blue-500 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

const StageItem = ({ icon, text, innerText, version, index }) => {
    const [open, setOpen] = useState(false);

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 40,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1
            }
        }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };    return (
        <>
            <motion.div
                className="flex flex-col items-center justify-center w-full max-w-[320px] relative group"
                variants={itemVariants}
            >
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 w-full border border-gray-100 hover:border-blue-200 group-hover:scale-105">
                    {/* Icon Container */}
                    <motion.div
                        className="flex justify-center mb-6"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center shadow-md">
                            <img 
                                src={version === 1 ? icon : `${icon}`} 
                                alt={`Stage ${index + 1}`}
                                className="w-12 h-12 md:w-14 md:h-14 object-contain filter drop-shadow-sm"
                            />
                        </div>
                    </motion.div>

                    {/* Stage Number */}
                    <div className="text-center mb-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white text-sm font-bold rounded-full">
                            {index + 1}
                        </span>
                    </div>

                    {/* Text Content */}
                    <motion.div
                        className="text-center mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                    >
                        <h3 
                            className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 leading-tight mb-3"
                            style={{ fontFamily: 'Ubuntu, sans-serif' }}
                            dangerouslySetInnerHTML={{
                                __html: processTextWithFormattingHTML(text)
                            }}
                        />
                        <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-3">
                            {innerText?.substring(0, 100)}...
                        </p>
                    </motion.div>

                    {/* Action Button */}
                    <div className="flex justify-center">
                        <motion.button
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() => setOpen(true)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="mr-2">Подробнее</span>
                            <AiOutlinePlus size={16} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>            {/* Modal */}
            {open && createPortal(
                <AnimatePresence>
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm"
                        style={{ zIndex: 9999 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    ><motion.div
                            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-gray-200"
                            style={{ zIndex: 10000 }}
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal header */}
                            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{index + 1}</span>
                                    </div>
                                    <h2 
                                        className="text-xl md:text-2xl font-bold text-gray-800"
                                        style={{ fontFamily: 'Ubuntu, sans-serif' }}
                                    >
                                        Этап {index + 1}: Подробное описание
                                    </h2>
                                </div>
                                <motion.button
                                    className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200"
                                    onClick={() => setOpen(false)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <IoClose size={24} className="text-gray-600" />
                                </motion.button>
                            </div>

                            {/* Modal content */}
                            <div className="p-8">
                                {/* Stage title in modal */}
                                <div className="mb-6">
                                    <h3 
                                        className="text-lg md:text-xl font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-100"
                                        style={{ fontFamily: 'Ubuntu, sans-serif' }}
                                        dangerouslySetInnerHTML={{
                                            __html: processTextWithFormattingHTML(text)
                                        }}
                                    />
                                </div>
                                
                                {/* Full description */}
                                <div 
                                    className="text-base md:text-lg leading-relaxed text-gray-700 text-justify space-y-4"
                                    style={{ fontFamily: 'Ubuntu, sans-serif' }}
                                    dangerouslySetInnerHTML={{
                                        __html: processTextWithFormattingHTML(innerText)
                                    }}
                                />                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default StageDropDown;
