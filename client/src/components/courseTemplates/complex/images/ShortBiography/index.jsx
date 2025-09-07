import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../../utils/TextFormattingEnhancer.jsx';

function ShortBiography({
    img,
    backgroundColor = '#f8f9fa',
    name,
    birthdate,
    deathdate,
    biography,
    color = '#2d3748',
    secondaryColor = '#718096'
}) {
    // Clean the text data from quotes
    const cleanName = typeof name === 'string' ? name.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"') : name || '';
    const cleanBiography = typeof biography === 'string' ? biography.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"') : biography || '';
    const cleanImg = typeof img === 'string' ? img.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"') : img || '';
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    // Split biography by newlines for better presentation
    const biographyParagraphs = cleanBiography.split('\\n').filter(p => p.trim());

    return (
        <motion.div 
            className="w-full max-w-5xl mx-auto my-8 px-4 sm:px-6 md:px-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div 
                className="flex flex-col md:flex-row overflow-hidden rounded-xl shadow-xl"
                style={{
                    backgroundColor: backgroundColor,
                    background: `linear-gradient(to right, ${backgroundColor}, ${adjustBrightness(backgroundColor, 10)})`
                }}
                variants={itemVariants}
                whileHover={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.3 }}
            >
                {/* Image container */}
                <motion.div 
                    className="w-full md:w-2/5 lg:w-1/3 relative"
                    variants={itemVariants}
                >
                    <div className="relative w-full h-64 md:h-full overflow-hidden">
                        <motion.img 
                            src={cleanImg} 
                            alt={cleanName || "Biography image"} 
                            className="w-full h-full object-cover object-center"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }}
                        />
                        {/* Gradient overlay */}
                        <div 
                            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-black/30 md:to-transparent"
                        />
                    </div>
                </motion.div>

                {/* Content container */}
                <motion.div 
                    className="w-full md:w-3/5 lg:w-2/3 p-6 md:p-8 flex flex-col justify-center"
                    variants={itemVariants}
                >
                    {/* Title area */}
                    <motion.h2 
                        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight"
                        style={{ color }}
                        dangerouslySetInnerHTML={{ __html: processTextWithFormattingHTML(cleanName) }}
                        variants={itemVariants}
                    />
                    
                    {/* Date section if applicable */}
                    {(birthdate || deathdate) && (
                        <motion.div 
                            className="flex items-center mb-4 text-sm md:text-base"
                            style={{ color: secondaryColor }}
                            variants={itemVariants}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                                {deathdate ? `${birthdate} - ${deathdate}` : birthdate}
                            </span>
                        </motion.div>
                    )}
                    
                    {/* Biography section */}
                    <motion.div 
                        className="space-y-3 text-base md:text-lg"
                        style={{ color }}
                        variants={itemVariants}
                    >
                        {biographyParagraphs.map((paragraph, index) => (
                            <motion.p 
                                key={index}
                                className="leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: processTextWithFormattingHTML(paragraph) }}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// Helper function to adjust color brightness
function adjustBrightness(hex, percent) {
    if (!hex || !hex.startsWith('#') || hex.length !== 7) {
        return hex || '#f8f9fa'; // Return original or default color if invalid
    }
    
    try {
        // Convert hex to RGB
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        // Adjust brightness
        const adjustedR = Math.min(255, Math.max(0, r + (r * (percent / 100))));
        const adjustedG = Math.min(255, Math.max(0, g + (g * (percent / 100))));
        const adjustedB = Math.min(255, Math.max(0, b + (b * (percent / 100))));

        // Convert back to hex
        return `#${Math.round(adjustedR).toString(16).padStart(2, '0')}${Math.round(adjustedG).toString(16).padStart(2, '0')}${Math.round(adjustedB).toString(16).padStart(2, '0')}`;
    } catch (error) {
        return hex || '#f8f9fa'; // Return original or default in case of errors
    }
}

/**
 * ShortBiography - A responsive component for displaying biographies or historical information
 * Features:
 * - Modern design with gradient background and shadow effects
 * - Responsive layout (stacked on mobile, side-by-side on desktop)
 * - Animated entrance and hover effects
 * - Support for dates (birth/death) if provided
 * - Processes text with HTML formatting
 * - Handles multi-paragraph biographies
 */
export default ShortBiography;
