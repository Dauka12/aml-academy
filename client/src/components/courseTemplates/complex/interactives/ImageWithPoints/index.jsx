import { XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function ImageWithPoints({
    img,
    points = [
        { id: 0, x: 720, y: 380, name: 'ГО регуляторы (государтсвенные органы-регуляторы)' },
        { id: 1, x: 720, y: 640, name: 'БВУ'  },
        { id: 2, x: 720, y: 800, name: 'ФУ (финансовые учреждения)'  },
        { id: 3, x: 720, y: 960, name: 'УНФПП (установленные нефинансовые предприятия и профессии)'  },
        { id: 4, x: 720, y: 1220, name: 'Общественные организации     '  },
        { id: 5, x: 1604, y: 500, name: 'Правоохранительные органы'  },
        { id: 6, x: 1604, y: 928, name: 'Международные организации'  },
    ],
    list = [
        ['Агентство по регулированию и развитию финансового рынка РК', 'Национальный Банк РК', 'Агентство РК по финансовому мониторингу', 'Министерство финансов РК', 'Министерство юстиции РК', 'Министерство туризма и спорта РК', 'Агентство по защите и развитию конкуренции РК', 'Министерство здравоохранения РК', 'Министерство цифрового развития, инноваций и аэрокосмической промышленности РК', 'Комитет по регулированию финансовых услуг МФЦА'],
        [''],
        ['БВУ-Банки второго уровня', 'Обменные пункты', 'Организации, осуществляющие отдельные виды банковских операций', 'Фондовые биржи', 'Страховые организации и страховые брокеры, общества взаимного страхования', 'Профессиональные участники рынка ценных бумаг, центральный депозитарий', 'Операторы почты, оказывающие услуги по переводу денег', 'Организации, осуществляющие отдельные виды банковских операций', 'Платежные организации'],
        ['Нотариусы, осуществляющие нотариальные действия с деньгами и (или) иным имуществом', 'Адвокаты и юридические консультанты (в установленных Законом о ПОД/ФТ случаях)', 'Независимые специалисты по юридическим вопросам (в установленных Законом о ПОД/ФТ случаях)', 'Товарные биржи', 'Бухгалтерские организации', 'Профессиональные бухгалтеры, осуществляющие предпринимательскую деятельность в сфере бухгалтерского учета', 'Аудиторские организации', 'Организации игорного бизнеса и лотерей', 'ИП и ЮЛ, осуществляющие лизинговую деятельность в качестве лизингодателя без лицензии', 'ИП и ЮЛ, осуществляющие операции с драгоценными металлами и драгоценными камнями, ювелирными изделиями из них', 'ИП и ЮЛ, оказывающие посреднические услуги при осуществлении сделок купли-продажи недвижимого имущества', 'Лица, осуществляющие деятельность по выпуску цифровых активов, организации торгов ими, а также предоставлению услуг по обмену цифровых активов на деньги, ценности и иное имущество'],
        ['Объединения юридических лиц', 'Региональные палаты', 'Некоммерческие организации', 'Ассоциации', 'Иные организации'],
        ['Органы внутренних дел', 'Органы национальной безопасности', 'Уполномоченный орган по противодействию коррупции', 'Специальные государственные органы'],
        ['Организация Объединенных Наций', 'Евразийская группа по противодействию легализации преступных доходов и финансированию терроризма', 'Комитет экспертов по оценке мер по борьбе с отмыванием денег и финансированием терроризма', 'Иные организации']
    ]
}) {
    console.log('ImageWithPoints component received props:', {
        img,
        pointsCount: points?.length || 0,
        listCount: list?.length || 0,
        points: points?.slice(0, 3) // Log first 3 points to avoid console spam
    });
    const canvasRef = useRef(null);
    const imageRef = useRef(new Image());    const [activeList, setActiveList] = useState(null);
    const [activeName, setActiveName] = useState(null);    // Draw the image and points on the canvas
    const drawImageAndPoints = useCallback((hoverIndex = null) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.log('ImageWithPoints: No canvas element');
            return;
        }
        
        const context = canvas.getContext('2d');
        const image = imageRef.current;

        // Более надежная проверка состояния изображения
        if (!image || !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) {
            console.log('ImageWithPoints: Image not loaded or broken', {
                complete: image?.complete,
                naturalWidth: image?.naturalWidth,
                naturalHeight: image?.naturalHeight,
                src: image?.src
            });
            return;
        }

        // Get canvas display dimensions
        const rect = canvas.getBoundingClientRect();
        const displayWidth = rect.width;
        const displayHeight = rect.height;

        // Set canvas internal size to match display size for consistent scaling
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        console.log('ImageWithPoints: Drawing image and points', { 
            imageWidth: image.naturalWidth, 
            imageHeight: image.naturalHeight,
            displayWidth,
            displayHeight,
            pointsCount: points?.length || 0,
            hoverIndex 
        });

        // Безопасное рисование изображения с try-catch
        try {
            context.drawImage(image, 0, 0, displayWidth, displayHeight);
        } catch (error) {
            console.error('ImageWithPoints: Error drawing image', error);
            // Рисуем fallback фон
            context.fillStyle = '#f3f4f6';
            context.fillRect(0, 0, displayWidth, displayHeight);
            context.fillStyle = '#6b7280';
            context.font = '16px Arial';
            context.textAlign = 'center';
            context.fillText('Image failed to render', displayWidth / 2, displayHeight / 2);
            // Не продолжаем выполнение если изображение сломано
            return;
        }

        // Calculate scale factors for points (from original image coordinates to display coordinates)
        const scaleX = displayWidth / image.naturalWidth;
        const scaleY = displayHeight / image.naturalHeight;

        console.log('ImageWithPoints: Scale factors', { scaleX, scaleY });        // Draw the points with enhanced styling using scaled coordinates
        points.forEach((point, index) => {
            const scaledX = point.x * scaleX;
            const scaledY = point.y * scaleY;
            
            console.log(`ImageWithPoints: Drawing point ${index} - original(${point.x}, ${point.y}) scaled(${scaledX.toFixed(1)}, ${scaledY.toFixed(1)})`);
            
            context.beginPath();
            context.arc(scaledX, scaledY, 20, 0, Math.PI * 2, true);
            
            // Enhanced point styling
            if (index === hoverIndex) {
                context.fillStyle = 'rgba(59, 130, 246, 0.8)'; // blue-500 with opacity
                context.fill();
                context.strokeStyle = '#1d4ed8'; // blue-700
                context.lineWidth = 3;
            } else {
                context.fillStyle = 'rgba(255, 255, 255, 0.9)';
                context.fill();
                context.strokeStyle = '#374151'; // gray-700
                context.lineWidth = 2;
            }
            context.stroke();

            // Add a subtle glow effect for hovered points
            if (index === hoverIndex) {
                context.beginPath();
                context.arc(scaledX, scaledY, 25, 0, Math.PI * 2, true);
                context.strokeStyle = 'rgba(59, 130, 246, 0.3)';
                context.lineWidth = 6;
                context.stroke();
            }
        });
    }, [points]);    // Event listener for mouse move
    const handleMouseMove = useCallback((event) => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image || !image.complete || image.naturalWidth === 0) return;

        const rect = canvas.getBoundingClientRect();
        
        // Get mouse coordinates relative to the canvas element (already in display coordinates)
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Calculate scale factors (same as in draw function)
        const scaleX = rect.width / image.naturalWidth;
        const scaleY = rect.height / image.naturalHeight;

        let hoverIndex = null;
        points.forEach((point, index) => {
            // Scale point coordinates to display coordinates for comparison
            const scaledPointX = point.x * scaleX;
            const scaledPointY = point.y * scaleY;
            
            const dx = scaledPointX - mouseX;
            const dy = scaledPointY - mouseY;
            const distance = dx * dx + dy * dy;
            
            if (distance < 400) { // 20px radius squared
                hoverIndex = index;
                console.log(`ImageWithPoints: Hovering over point ${index} at scaled(${scaledPointX.toFixed(1)}, ${scaledPointY.toFixed(1)}) mouse(${mouseX.toFixed(1)}, ${mouseY.toFixed(1)}) distance: ${Math.sqrt(distance).toFixed(1)}`);
            }
        });

        canvas.style.cursor = hoverIndex !== null ? 'pointer' : 'default';
        drawImageAndPoints(hoverIndex);
    }, [points, drawImageAndPoints]);    // Event listener for mouse click
    const handleClick = useCallback((event) => {
        console.log('ImageWithPoints: Click event fired!');
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image || !image.complete || image.naturalWidth === 0) {
            console.log('ImageWithPoints: No canvas ref or image not loaded/broken');
            return;
        }

        const rect = canvas.getBoundingClientRect();
        
        // Get click coordinates relative to the canvas element (already in display coordinates)
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Calculate scale factors (same as in draw and mousemove functions)
        const scaleX = rect.width / image.naturalWidth;
        const scaleY = rect.height / image.naturalHeight;

        console.log('ImageWithPoints: Click details:', { 
            clickX: clickX.toFixed(1), 
            clickY: clickY.toFixed(1), 
            imageWidth: image.naturalWidth,
            imageHeight: image.naturalHeight,
            displayWidth: rect.width.toFixed(1),
            displayHeight: rect.height.toFixed(1),
            scaleX: scaleX.toFixed(3), 
            scaleY: scaleY.toFixed(3)
        });

        let clickedPoint = null;
        points.forEach((point, index) => {
            // Scale point coordinates to display coordinates for comparison
            const scaledPointX = point.x * scaleX;
            const scaledPointY = point.y * scaleY;
            
            const dx = scaledPointX - clickX;
            const dy = scaledPointY - clickY;
            const distance = dx * dx + dy * dy;
            const radius = Math.sqrt(distance);
            
            console.log(`ImageWithPoints: Point ${index} "${point.name}" - original(${point.x}, ${point.y}) scaled(${scaledPointX.toFixed(1)}, ${scaledPointY.toFixed(1)}) distance: ${radius.toFixed(1)}px threshold: 20px`);
            
            if (distance < 400) { // 20px radius squared
                clickedPoint = point;
                console.log(`ImageWithPoints: ✅ Point ${index} "${point.name}" clicked! Opening modal with ${list[point.id]?.length || 0} items`);
                setActiveList(list[point.id]);
                setActiveName(point.name);
            }
        });
        
        if (!clickedPoint) {
            console.log('ImageWithPoints: ❌ No point clicked');
        }
    }, [points, list]);// Effect for image loading
    useEffect(() => {
        const image = imageRef.current;
        
        // Сбрасываем предыдущее изображение
        image.src = '';
        
        // Add error handling for image loading
        image.onload = () => {
            console.log('ImageWithPoints: Image loaded successfully', { 
                width: image.naturalWidth, 
                height: image.naturalHeight,
                complete: image.complete,
                src: image.src
            });
            // Дополнительная проверка что изображение действительно загрузилось
            if (image.naturalWidth > 0 && image.naturalHeight > 0) {
                drawImageAndPoints();
            } else {
                console.error('ImageWithPoints: Image loaded but has zero dimensions');
            }
        };
        
        image.onerror = (error) => {
            console.error('ImageWithPoints: Error loading image', error, img);
            // Create a fallback canvas with just the points
            const canvas = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext('2d');
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width || 800;
                canvas.height = rect.height || 600;
                context.fillStyle = '#f3f4f6';
                context.fillRect(0, 0, canvas.width, canvas.height);
                
                // Add text indicating image failed to load
                context.fillStyle = '#6b7280';
                context.font = '16px Arial';
                context.textAlign = 'center';
                context.fillText('Image failed to load', canvas.width / 2, canvas.height / 2);
                context.fillText(img || 'No image URL', canvas.width / 2, canvas.height / 2 + 25);
                
                // Still draw the points if they exist
                if (points && points.length > 0) {
                    points.forEach((point, index) => {
                        context.beginPath();
                        context.arc(point.x, point.y, 20, 0, Math.PI * 2, true);
                        context.fillStyle = 'rgba(59, 130, 246, 0.8)';
                        context.fill();
                        context.strokeStyle = '#1d4ed8';
                        context.lineWidth = 2;
                        context.stroke();
                    });
                }
            }
        };
        
        // Проверяем что URL изображения валидный и очищаем от лишних кавычек
        if (!img || typeof img !== 'string' || img.trim() === '') {
            console.error('ImageWithPoints: Invalid image URL', img);
            image.onerror(new Error('Invalid image URL'));
            return;
        }
        
        // Очищаем URL от лишних кавычек
        let cleanUrl = img.trim();
        if ((cleanUrl.startsWith('"') && cleanUrl.endsWith('"')) || 
            (cleanUrl.startsWith("'") && cleanUrl.endsWith("'"))) {
            cleanUrl = cleanUrl.slice(1, -1);
        }
        
        // Set crossOrigin to handle CORS
        image.crossOrigin = 'anonymous';
        image.src = cleanUrl;
        console.log('ImageWithPoints: Loading image from', cleanUrl);

        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [img, drawImageAndPoints, points]);

    // Initial canvas setup effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        // Initialize canvas with default size
        canvas.width = 800;
        canvas.height = 600;
        
        const context = canvas.getContext('2d');
        context.fillStyle = '#f9fafb';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add loading text
        context.fillStyle = '#6b7280';
        context.font = '16px Arial';
        context.textAlign = 'center';
        context.fillText('Loading image...', canvas.width / 2, canvas.height / 2);
          console.log('ImageWithPoints: Canvas initialized', { 
            canvas: !!canvas, 
            width: canvas.width, 
            height: canvas.height,
            points: points?.length || 0,
            img: img
        });
    }, [img, points]); // Run when img or points change    // Effect for attaching event listeners
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.log('ImageWithPoints: No canvas for event listeners');
            return;
        }

        console.log('ImageWithPoints: Attaching event listeners to canvas');
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleClick);

        return () => {
            console.log('ImageWithPoints: Removing event listeners from canvas');
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
        };
    }, [handleMouseMove, handleClick]);

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

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 20,
            transition: {
                duration: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    const listContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const closeModal = () => {
        setActiveList(null);
        setActiveName(null);
    };    return (
        <>
            {/* Inject custom scrollbar styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
            
            <motion.div 
                className="px-8 lg:px-16 xl:px-32 2xl:px-64 mt-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
            <div className="relative flex flex-col items-center justify-center gap-8">
                <motion.canvas 
                    ref={canvasRef} 
                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] object-contain rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {createPortal(
                    <AnimatePresence>
                        {activeList && (
                            <>
                                {/* Backdrop */}
                                <motion.div 
                                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={closeModal}
                                />
                                
                                {/* Modal */}
                                <motion.div 
                                    className="fixed inset-0 flex items-center justify-center z-50 p-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <motion.div 
                                        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                                        variants={modalVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="relative p-6">
                                            {/* Close button */}
                                            <motion.button
                                                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                                onClick={closeModal}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <XMarkIcon className="w-6 h-6 text-gray-600" />
                                            </motion.button>

                                            {/* Header */}
                                            <motion.h3 
                                                className="text-xl font-semibold text-gray-800 mb-6 pr-12 leading-tight"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                {activeName}
                                            </motion.h3>

                                            {/* Items list */}
                                            <motion.div 
                                                className="max-h-[60vh] overflow-y-auto custom-scrollbar"
                                                variants={listContainerVariants}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                <div className="space-y-3">
                                                    {activeList.filter(item => item.trim() !== '').map((item, index) => (
                                                        <motion.div 
                                                            key={index}
                                                            className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500 hover:bg-gray-100 transition-colors duration-200"
                                                            variants={itemVariants}
                                                            whileHover={{ scale: 1.02, x: 4 }}
                                                        >
                                                            <span className="text-gray-700 text-sm leading-relaxed">
                                                                {item}
                                                            </span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
        </motion.div>
        </>
    );
}

export default ImageWithPoints;
