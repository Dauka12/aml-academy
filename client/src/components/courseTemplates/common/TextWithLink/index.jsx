import { motion } from 'framer-motion';
import { processTextWithFormatting } from '../../../../utils/TextFormattingEnhancer.jsx';

const TextWithLink = ({ 
  text, 
  link, 
  color, 
  linkColor = '#3B82F6',
  fontSize = 18,
  hoverColor = '#1D4ED8'
}) => {
  if (!text) {
    return null;
  }

  const defaultColor = '#000000';
  const _color = color || defaultColor;

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

  // Process text with special handling for links
  const processTextWithLinks = (text) => {
    if (!text) return '';
    
    // First apply our text formatting
    let processed = processTextWithFormatting(text);
    
    // Then handle link formatting - wrap quoted text with links if link is provided
    if (link) {
      processed = processed.replace(
        /<span style="font-weight: ?bold;">(.*?)<\/span>/g,
        `<a href="${link}" target="_blank" rel="noopener noreferrer" style="color: ${linkColor}; font-weight: bold; text-decoration: none; transition: color 0.3s ease; border-bottom: 2px solid transparent;" onmouseover="this.style.color='${hoverColor}'; this.style.borderBottomColor='${hoverColor}'" onmouseout="this.style.color='${linkColor}'; this.style.borderBottomColor='transparent'">$1</a>`
      );
    }
    
    return processed;
  };

  return (
    <motion.div 
      className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-4 font-ubuntu"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="flex flex-col gap-4">
        <motion.p 
          className="text-lg md:text-xl leading-relaxed text-justify whitespace-pre-wrap transition-colors duration-300"
          style={{ 
            color: _color,
            fontSize: `${fontSize}px`,
            fontFamily: 'Ubuntu, Montserrat, sans-serif'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          dangerouslySetInnerHTML={{
            __html: processTextWithLinks(text)
          }}
        />
      </div>
    </motion.div>
  );
};

export default TextWithLink;
