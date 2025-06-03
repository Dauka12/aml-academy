import { motion } from 'framer-motion';
import { processTextWithFormattingHTML } from '../../../../util/TextFormattingEnhancer.jsx';

import ArrowRightIcon from './Arrow-right.svg';
import HackerIcon from './Hacker.svg';
import PaymentIcon from './Payment.svg';

function FlexRow({
    icons = [ArrowRightIcon, HackerIcon, PaymentIcon],
    data = [
        { icon: ArrowRightIcon, title: 'Свобода от ограничении', description: 'Вы можете использовать криптовалюту беспрепятственно. Централизованные платежные сервисы в свою очередь могут замораживать учетные записи или препятствовать совершению транзакций.' },
        { icon: HackerIcon, title: 'Устойчива к взлому', description: 'Устройство сети делает ее устойчивой к атакам хакеров и других злоумышленников' },
        { icon: PaymentIcon, title: 'Дешевый и быстрый способ оплаты', description: 'Человек на другом конце света может получить от вас средства в считанные секунды. Комиссия за транзакцию значительно меньше, чем комиссия за международный денежный перевод.' },
    ],
    textColor = '#000000',
    gap = 30
}) {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

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
                type: "spring",
                stiffness: 100
            }
        }
    };

    const iconVariants = {
        hidden: { 
            scale: 0,
            rotate: -180
        },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 120
            }
        }
    };

    return (
        <motion.div 
            className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-32 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <div 
                className="flex flex-wrap justify-center lg:justify-start items-start"
                style={{ gap: `${gap}px` }}
            >
                {data.map(({ icon, title, description }, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center text-center min-w-[280px] max-w-[380px] flex-1 group"
                        style={{ color: textColor }}
                        variants={itemVariants}
                        whileHover={{ 
                            y: -8,
                            transition: { duration: 0.3 }
                        }}
                    >
                        {/* Icon */}
                        <motion.div
                            className="w-24 h-24 md:w-28 md:h-28 mb-6 md:mb-8 flex items-center justify-center"
                            variants={iconVariants}
                            whileHover={{ 
                                scale: 1.1,
                                rotate: 5,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <img 
                                src={icons[index] || icon} 
                                alt={title}
                                className="w-full h-full object-contain filter transition-all duration-300 group-hover:drop-shadow-lg"
                            />
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                            className="text-xl md:text-2xl font-semibold mb-4 md:mb-5 leading-tight transition-colors duration-300"
                            style={{ 
                                color: textColor,
                                fontFamily: 'Ubuntu, sans-serif'
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                            dangerouslySetInnerHTML={{
                                __html: processTextWithFormattingHTML(title)
                            }}
                        />

                        {/* Description */}
                        <motion.div
                            className="text-base md:text-lg leading-relaxed text-justify transition-colors duration-300"
                            style={{ 
                                color: textColor,
                                fontFamily: 'Ubuntu, sans-serif'
                            }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                            dangerouslySetInnerHTML={{
                                __html: processTextWithFormattingHTML(description)
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default FlexRow;
