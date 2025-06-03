import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsArrowClockwise } from "react-icons/bs";
import { useLocation } from 'react-router';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

const DragAndDropTwoSide = ({ questions, leftAnswer, rightAnswer }) => {
    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    useEffect(() => {
        if (
            (location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)
        ) {
            setKazakh(true);
        }
    }, [])

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    const handleOnDragStart = (e, side, answer) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ answer, side }));
    };

    const showUserFeedback = (message, type = 'info') => {
        setFeedbackMessage(message);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 3000);
    };

    if (!questions) return null;
    if (questions?.length === 0) return null;

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
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const questionVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            x: 20,
            transition: { duration: 0.3 }
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
            {/* Feedback Message */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg"
                    >
                        {feedbackMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Question Card Container */}
            <motion.div 
                className="flex justify-center mb-8"
                variants={itemVariants}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        variants={questionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 
                                 hover:border-blue-400 transition-all duration-300 cursor-move
                                 p-6 min-w-[300px] max-w-md text-center"
                        draggable
                        onDragStart={(e) => {
                            if (currentQuestion < questions?.length) {
                                handleOnDragStart(e, questions[currentQuestion].side, questions[currentQuestion].answer);
                            } else {
                                const endText = isKazakh ? 'Сұрақтар бітті' : 'Вопросы закончились';
                                handleOnDragStart(e, { endText }, { endText });
                            }
                        }}
                        onDragEnd={(e) => {
                            if (currentQuestion < questions?.length) {
                                setCurrentQuestion(prev => prev + 1);
                            }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileDrag={{ scale: 0.95, rotate: 2 }}
                    >
                        <div className="text-lg font-semibold text-gray-800 leading-relaxed">
                            {currentQuestion < questions?.length 
                                ? (
                                    <div dangerouslySetInnerHTML={{
                                        __html: processTextWithFormattingHTML(questions[currentQuestion].answer)
                                    }} />
                                ) : (
                                    isKazakh ? 'Сұрақтар бітті' : 'Вопросы закончились'
                                )
                            }
                        </div>
                        
                        {/* Drag Indicator */}
                        <div className="mt-4 flex justify-center">
                            <div className="flex space-x-1">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-gray-400 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Drop Zones */}
            <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
                variants={itemVariants}
            >
                <DropZone 
                    answer={leftAnswer}
                    isKazakh={isKazakh}
                    onFeedback={showUserFeedback}
                />
                <DropZone 
                    answer={rightAnswer}
                    isKazakh={isKazakh}
                    onFeedback={showUserFeedback}
                />
            </motion.div>

            {/* Reset Button */}
            <motion.div 
                className="flex justify-center"
                variants={itemVariants}
            >
                <motion.button
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 
                             text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setCurrentQuestion(0)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span>
                        {isKazakh ? 'Басынан бастау' : 'Начать заново'}
                    </span>
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                    >
                        <BsArrowClockwise size={20} />
                    </motion.div>
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

const DropZone = ({ answer, isKazakh, onFeedback }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [status, setStatus] = useState('initial'); // 'initial', 'correct', 'wrong'
    const mainControls = useAnimation();

    const variants = {
        initial: {
            borderColor: '#D1D5DB',
            backgroundColor: '#F9FAFB',
            scale: 1
        },
        hover: {
            borderColor: '#3B82F6',
            backgroundColor: '#EFF6FF',
            scale: 1.02,
            transition: { duration: 0.2 }
        },
        correct: {
            borderColor: '#10B981',
            backgroundColor: '#ECFDF5',
            scale: 1.05,
            transition: { duration: 0.3 }
        },
        wrong: {
            borderColor: '#EF4444',
            backgroundColor: '#FEF2F2',
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };

    const handleOnDragOver = (e) => {
        e.preventDefault();
        setIsHovering(true);
        mainControls.start('hover');
    };

    const handleOnDragLeave = (e) => {
        e.preventDefault();
        setIsHovering(false);
        if (status === 'initial') {
            mainControls.start('initial');
        }
    };

    const handleOnDrop = (e, dropSide) => {
        e.preventDefault();
        setIsHovering(false);
        
        const data = e.dataTransfer.getData('text/plain');
        const { answer: draggedAnswer, side } = JSON.parse(data);

        if (dropSide === side) {
            setStatus('correct');
            mainControls.start('correct');
            onFeedback(isKazakh ? 'Дұрыс!' : 'Правильно!');
        } else {
            setStatus('wrong');
            mainControls.start('wrong');
            onFeedback(isKazakh ? 'Қате!' : 'Неправильно!');
        }
        
        setTimeout(() => {
            setStatus('initial');
            mainControls.start('initial');
        }, 2000);
    };

    return (
        <motion.div
            className="relative bg-white rounded-xl shadow-lg border-2 border-dashed 
                     min-h-[200px] flex flex-col items-center justify-center p-6 text-center
                     transition-all duration-300 cursor-pointer"
            variants={variants}
            animate={mainControls}
            initial="initial"
            onDragOver={handleOnDragOver}
            onDragLeave={handleOnDragLeave}
            onDrop={(e) => handleOnDrop(e, answer)}
            whileHover="hover"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" 
                     style={{
                         backgroundImage: `radial-gradient(circle, #3B82F6 1px, transparent 1px)`,
                         backgroundSize: '20px 20px'
                     }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Drop Zone Icon */}
                <motion.div
                    className="mb-4"
                    animate={isHovering ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 
                                  rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                </motion.div>

                {/* Answer Text */}
                <div className="text-lg font-semibold text-gray-800 mb-2">
                    <div dangerouslySetInnerHTML={{
                        __html: processTextWithFormattingHTML(answer || '')
                    }} />
                </div>

                {/* Drop Instruction */}
                <div className="text-sm text-gray-500">
                    {isKazakh ? 'Сюда сүйреп салыңыз' : 'Перетащите сюда'}
                </div>

                {/* Status Indicator */}
                <AnimatePresence>
                    {status === 'correct' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 
                                     flex items-center justify-center"
                        >
                            ✓
                        </motion.div>
                    )}
                    {status === 'wrong' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 
                                     flex items-center justify-center"
                        >
                            ✗
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default DragAndDropTwoSide;
