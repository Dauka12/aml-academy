import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Sizebox from '../../../common/Sizebox';

function InteractivePhases({
    phases,
    version = 1
}) {
    useEffect(() => {
        console.log('InteractivePhases useEffect', phases, version);
    }, [phases, version]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    if (version === 1) {
        return (
            <motion.div 
                className="w-full overflow-x-auto pb-2.5"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{
                    scrollbarHeight: '10px',
                    scrollbarColor: '#b0b0b0 #f0f0f0'
                }}
            >
                <div className="w-full">
                    <div className="flex flex-row justify-start gap-12 min-w-max px-16 py-4">
                        {[
                            <Phases 
                                title={'Двухфазная модель отмывания денег'}
                                phases={[
                                    {title: ' ', name: 'Предикат', shortDescription: 'Доход, полученный преступным путем', longDescription: ''},
                                    {title: 'I этап', name: 'Легализация', shortDescription: 'Обмен валюты или иного имущества', longDescription: 'Первый этап (легализация) - представляет собой отмывание денег, полученных непосредственно в результате совершения преступления путем обмена этих денежных средств на купюры иного достоинства, другой валюты, имущества.'},
                                    {title: 'II этап', name: 'Интеграция', shortDescription: 'Вводится легальный фин. оборот', longDescription: 'Второй этап (интеграция) заключается в совершении операций, в результате которых предварительно «отмытым» деньгам придается статус, полученных законными путями, и они вводятся в легальный финансовый оборот.'}
                                ]}
                            />, 
                            <Phases 
                                title={'Трехфазная модель отмывания денег'}
                                phases={[
                                    {title: ' ', name: 'Предикат', shortDescription: 'Доход полученный преступным путем', longDescription: ''},
                                    {title: 'I этап', name: 'Размещение', shortDescription: 'Размещение средств в финансовых институтах', longDescription: 'Первый этап (Размещение) – размещение денежных средств на счетах в банках и иных финансовых институтах, превращение в финансовые инструменты, товары и др.'},
                                    {title: 'II этап', name: 'Расслоение или запутывание следов', shortDescription: 'Финансовые операции и сделки', longDescription: 'Второй этап (Расслоение или запутывание следов) – реализация операций и сделок, в целях маскировки источника дохода, полученного преступным путем, тем самым осуществление схем и способов для легализации таких доходов.'},
                                    {title: 'III этап', name: 'Интеграция', shortDescription: 'Видимость правомерных доходов', longDescription: 'Третий этап (Интеграция) – придание видимости легальности доходов и их интеграция в законную среду экономики'}
                                ]}
                            />, 
                            <Phases 
                                title={'Четырехфазная модель отмывания денег'}
                                phases={[
                                    {title: 'I этап', name: 'Отмывание', shortDescription: 'Конвертация наличных денег, с передачей их на подставных лиц', longDescription: 'Первый этап - освобождение от наличных денег и перечисление их на счета подставных лиц.'},
                                    {title: 'II этап', name: 'Размещение', shortDescription: 'Размещение средств в финансовых институтах', longDescription: 'Второй этап (Размещение) – размещение денежных средств на счетах в банках и иных финансовых институтах, превращение в финансовые инструменты, товары и др.'},
                                    {title: 'III этап', name: 'Расслоение', shortDescription: 'Финансовые операции и сделки', longDescription: 'Третий этап (Расслоение или запутывание следов) – реализация операций и сделок, в целях маскировки источника дохода, полученного преступным путем, тем самым осуществление схем и способов для легализации таких доходов.'},
                                    {title: 'IV этап', name: 'Интеграция', shortDescription: 'Видимость правомерных доходов', longDescription: 'Четвертый этап (Интеграция) – придание видимости легальности доходов и их интеграция в законную среду экономики.'},
                                ]}
                            />
                        ].map((item, index) => (
                            <motion.div 
                                key={index}                                className="w-auto flex flex-col cursor-pointer active:cursor-grabbing"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }

    if (version === 2) {
        return (
            <motion.div 
                className="w-full overflow-x-auto pb-2.5"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="w-full">
                    <div className="flex flex-row justify-start gap-12 min-w-max px-16 py-4">
                        {phases.map((item, index) => (
                            <motion.div 
                                key={index}                                className="w-auto flex flex-col cursor-pointer"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Phases 
                                    title={item.title}
                                    phases={item.phases}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }
}

const Phases = ({
    title,
    phases = [
        {title: ' ', name: 'Предикат', shortDescription: 'Доход полученный преступным путем', longDescription: ''},
        {title: 'I этап', name: 'Легализация', shortDescription: 'Обмен валюты или иного имущества', longDescription: 'Первый этап (легализация) - представляет собой отмывание денег, полученных непосредственно в результате совершения преступления путем обмена этих денежных средств на купюры иного достоинства, другой валюты, имущества.'},
        {title: 'II этап', name: 'Интеграция', shortDescription: 'Вводится легальный фин. оборот', longDescription: 'Второй этап (интеграция) заключается в совершении операций, в результате которых предварительно «отмытым» деньгам придается статус полученных законными путями, и они вводятся в легальный финансовый оборот.'}
    ]
}) => {
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="flex flex-col">
            <motion.div 
                className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 px-4"
                variants={titleVariants}
            >
                {title}
            </motion.div>
            <Sizebox height={43}/>
            <div className="flex flex-col gap-6">
                {phases.map((phase, index) => (
                    <Phase key={index} phase={phase} index={index} />
                ))}
            </div>
        </div>
    );
};

const Phase = ({ phase, index }) => {
    const [open, setOpen] = useState(false);

    const phaseVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, delay: index * 0.1 }
        }
    };

    const expandVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            height: 'auto',
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            height: 0,
            scale: 0.9,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    return (
        <motion.div 
            className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-6 min-w-72 max-w-80 hover:shadow-xl transition-shadow duration-300"
            variants={phaseVariants}
            whileHover={{ y: -2 }}
        >
            <div className="text-sm font-semibold text-blue-600 mb-2">{phase.title}</div>
            <div className="text-lg font-bold text-gray-800 mb-3">{phase.name}</div>
            
            <motion.button
                className="absolute top-4 right-4 p-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-200"
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <PlusIcon className="w-5 h-5 text-blue-600" />
            </motion.button>
            
            <div className="text-sm text-gray-600 leading-relaxed pr-8">
                {phase.shortDescription}
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div 
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    >
                        <motion.div 
                            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto"
                            variants={expandVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-sm font-semibold text-blue-600 mb-1">{phase.title}</div>
                                        <div className="text-xl font-bold text-gray-800">{phase.name}</div>
                                    </div>
                                    <motion.button
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                        onClick={() => setOpen(false)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <XMarkIcon className="w-6 h-6 text-gray-600" />
                                    </motion.button>
                                </div>
                                <div className="text-gray-700 leading-relaxed">
                                    {phase.longDescription?.length > 0 ? phase.longDescription : phase.shortDescription}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default InteractivePhases;