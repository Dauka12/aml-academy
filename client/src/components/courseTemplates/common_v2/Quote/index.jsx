import { ArrowLongUpIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

function Quote({
    text,
    author,
    img
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
                staggerChildren: 0.3
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 1.1 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const quoteVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div 
            className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 py-6 md:py-8 font-sans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {img && (
                <motion.div 
                    className="flex justify-center mb-6"
                    variants={imageVariants}
                >
                    <img 
                        src={img} 
                        alt="Quote illustration"
                        className="max-h-72 w-auto rounded-lg shadow-md object-contain"
                    />
                </motion.div>
            )}
            
            <motion.div 
                className="max-w-4xl mx-auto"
                variants={quoteVariants}
            >
                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 shadow-lg border-l-4 border-blue-500">
                    {/* Quote Icon */}
                    <ArrowLongUpIcon className="absolute top-4 left-4 w-8 h-8 text-blue-500 opacity-30" />
                    
                    <blockquote className="relative">
                        <p 
                            className="text-lg md:text-xl lg:text-2xl font-medium text-gray-800 leading-relaxed italic pl-6 mb-4"                            dangerouslySetInnerHTML={{
                                __html: `"${processTextWithFormattingHTML(text?.toString() || '')}"`
                            }}
                        />
                        
                        {author && (
                            <footer className="flex items-center justify-end">
                                <div className="w-12 h-0.5 bg-blue-500 mr-4" />
                                <cite 
                                    className="text-base md:text-lg font-semibold text-blue-700 not-italic"
                                    dangerouslySetInnerHTML={{
                                        __html: processTextWithFormattingHTML(author?.toString() || '')
                                    }}
                                />
                            </footer>
                        )}
                    </blockquote>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Quote;

