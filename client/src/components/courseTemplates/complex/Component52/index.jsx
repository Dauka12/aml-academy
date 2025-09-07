import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';
import line from './static/line.png';
import icon from './static/stage.svg';

function Component52(props) {
    // Extract props with all possible data structures
    let title, img, version, isKazakh = false;
    
    // Handle if data is passed directly in props
    if (props.data) {
        
        // Handle nested data structure from backend
        if (typeof props.data === 'object' && props.data !== null) {
            // If data has direct values property
            if (props.data.values) {
                if (props.data.values.values) {
                    // Handle doubly nested values (common in API responses)
                    title = props.data.values.values.title;
                    img = props.data.values.values.img;
                    version = props.data.values.values.version;
                } else {
                    // Handle singly nested values
                    title = props.data.values.title;
                    img = props.data.values.img;
                    version = props.data.values.version;
                }
            } else if (props.data.componentName === 'Component52') {
                // API response structure from some endpoints
                if (props.data.values && props.data.values.values) {
                    title = props.data.values.values.title;
                    img = props.data.values.values.img;
                    version = props.data.values.values.version;
                }
            }
            
            // Handle array data structure
            if (Array.isArray(props.data)) {
                props.data.forEach(item => {
                    if (item.key === 'title') title = item.value;
                    if (item.key === 'img') img = item.value;
                    if (item.key === 'version') version = item.value;
                    if (item.key === 'isKazakh') isKazakh = item.value;
                });
            }
        }
    }
    
    // Handle direct props
    if (props.title) title = props.title;
    if (props.img) img = props.img;
    if (props.version !== undefined) version = props.version;
    if (props.isKazakh !== undefined) isKazakh = props.isKazakh;
      // Convert version to number if it's a string
    const versionNum = typeof version === 'string' ? parseInt(version, 10) : (version || 1);
    
    // Clean title string by removing extra quotes if needed
    const cleanTitle = typeof title === 'string' 
        ? title.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"') 
        : title || '';
        
    // Clean image URL by removing quotes if needed
    const cleanImgSrc = typeof img === 'string'
        ? img.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"')
        : img || '';
    
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
    };

    const textVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const schemeVariants = {
        hidden: { opacity: 0, rotateY: -10 },
        visible: {
            opacity: 1,
            rotateY: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3
            }
        }
    };

    const itemVariants = {
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
      // Version 2 - Simple image display
    if (versionNum === 2 || versionNum === "2") {
        return (
            <motion.div
                className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Title Section */}
                    <motion.div
                        variants={textVariants}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 sm:px-8 py-6"
                    >
                        <h2 
                            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: processTextWithFormattingHTML(cleanTitle)
                            }}
                        />
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                        variants={schemeVariants}
                        className="p-6 sm:p-8 bg-gray-50 flex justify-center"
                    >
                        <div className="relative max-w-full">
                            {cleanImgSrc && (
                                <img 
                                    src={cleanImgSrc} 
                                    alt={cleanTitle || 'Component Diagram'} 
                                    className="max-w-full h-auto rounded-lg shadow-lg"
                                    onError={(e) => {
                                        console.error('Image failed to load:', cleanImgSrc);
                                        e.target.onerror = null;
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iMTIiIHk9IjEyIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZpbGw9IiM5OTk5OTkiPj8/PC90ZXh0Pjwvc3ZnPg=='; // Fallback empty image
                                    }}
                                />
                            )}
                            
                            {/* Decorative border */}
                            <div className="absolute inset-0 rounded-lg border-4 border-blue-200 opacity-50 pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        );
    }
    
    // Version 1 - Complex diagram layout
    console.log('Component52 version 1 rendering');
    
    // Use provided title content or fallback to default
    const textContent = cleanTitle || (!isKazakh 
        ? '"Запутывание следов - направлено на маскировку проверяемого следа происхождения "грязных" денег в преддверии возможного расследования"'
        : '"Іздерді шатастыру – ықтимал тергеу қарсаңында «лас» ақшаның пайда болуының тексерілетін ізін жасыруға бағытталған"');    return (
        <motion.div
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Quote Section */}
                <motion.div
                    variants={textVariants}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 sm:px-8 py-8"
                >
                    <blockquote 
                        className="text-lg sm:text-xl lg:text-2xl font-medium text-white text-center leading-relaxed italic"
                        dangerouslySetInnerHTML={{
                            __html: processTextWithFormattingHTML(textContent)
                        }}
                    />
                </motion.div>

                {/* Scheme Section */}
                <motion.div
                    variants={schemeVariants}
                    className="p-6 sm:p-8 lg:p-12 bg-gray-50"
                >
                    <div className="flex flex-col items-center space-y-8">
                        {/* Row 1 - Оборот/Айналым */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg text-lg sm:text-xl font-bold"
                        >
                            {!isKazakh ? 'Оборот' : 'Айналым'}
                        </motion.div>

                        {/* Row 2 - Законные/Незаконные */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 w-full max-w-4xl"
                        >
                            {/* Законные */}
                            <div className="flex flex-col items-center space-y-3">
                                <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md text-base sm:text-lg font-semibold">
                                    {!isKazakh ? 'Законные' : 'Заңды'}
                                </div>
                                <img 
                                    src={line} 
                                    alt="connection line" 
                                    className="w-8 h-12 sm:w-12 sm:h-16"
                                    onError={(e) => {
                                        console.error('Line image failed to load');
                                        e.target.onerror = null;
                                    }}
                                />
                            </div>

                            {/* Central Icon */}
                            <motion.div
                                className="bg-yellow-400 p-4 rounded-full shadow-lg"
                                whileHover={{ 
                                    scale: 1.1, 
                                    rotate: 5,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <img 
                                    src={cleanImgSrc || icon} 
                                    alt="central process" 
                                    className="w-12 h-12 sm:w-16 sm:h-16"
                                    onError={(e) => {
                                        console.error('Icon image failed to load:', e.target.src);
                                        e.target.onerror = null;
                                        e.target.src = icon; // Fallback to default icon
                                    }}
                                />
                            </motion.div>

                            {/* Незаконные */}
                            <div className="flex flex-col items-center space-y-3">
                                <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md text-base sm:text-lg font-semibold">
                                    {!isKazakh ? 'Незаконные' : 'Заңсыз'}
                                </div>
                                <img 
                                    src={line} 
                                    alt="connection line" 
                                    className="w-8 h-12 sm:w-12 sm:h-16"
                                    onError={(e) => {
                                        console.error('Line image failed to load');
                                        e.target.onerror = null;
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Row 3 - Смешивается */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-purple-600 text-white px-8 py-4 rounded-lg shadow-lg text-lg sm:text-xl font-bold"
                        >
                            {!isKazakh ? 'Смешивается' : 'Араласады'}
                        </motion.div>

                        {/* Decorative Elements */}
                        <motion.div
                            className="flex justify-center space-x-4 pt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Component52;