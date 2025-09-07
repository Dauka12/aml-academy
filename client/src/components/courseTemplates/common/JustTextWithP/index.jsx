import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../utils/TextFormattingEnhancer.jsx';
import './style.scss';

const JustTextWithP = ({ textData, color }) => {
  // Check if textData is an array, if not convert it to an array with a single element
  const dataArray = Array.isArray(textData) ? textData : [textData];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
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
  return (
    <motion.div 
      style={{
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%',
        padding: '0 20px',
        boxSizing: 'border-box'
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div 
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        {dataArray.map((text, index) => { 
          if (!text) return null;
          
          return (
            <motion.div key={index} variants={textVariants}>
              <motion.p 
                className="abzac"
                style={{ color: color || undefined }}
                whileHover={{ boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)' }}
                dangerouslySetInnerHTML={{ __html: processTextWithFormattingHTML(text) }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default JustTextWithP;
