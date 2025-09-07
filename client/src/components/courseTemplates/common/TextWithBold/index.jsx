import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';

const TextWithBold = ({ text, color, fontSize = 18 }) => {
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
            __html: processTextWithFormattingHTML(text)
          }}
        />
      </div>
    </motion.div>
  );
};

export default TextWithBold;
