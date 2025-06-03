import { motion } from 'framer-motion';
import HeaderWithLine from "../../common/HeaderWithLine";
import TextWithTitle from "../../common/TextWithTitle";

function HeaderWithTitleAndText({ header, title, text }) {
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

    const itemVariants = {
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
            className="w-full space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Header Section */}
            <motion.div variants={itemVariants}>
                <HeaderWithLine header={header} />
            </motion.div>

            {/* Content Section */}
            <motion.div variants={itemVariants}>
                <TextWithTitle title={title} text={text} />
            </motion.div>
        </motion.div>
    );
}

export default HeaderWithTitleAndText;