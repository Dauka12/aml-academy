import {
    AcademicCapIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import React from 'react';
import { LessonPage } from './SpecialCaseLessons';
import ImageLine from '../../components/courseTemplates/common/ImageLine';
import Centered from '../../components/courseTemplates/common/Centered';
import courseaftor from '../../assets/images/avtory.png';
import RandomH2 from '../../components/courseTemplates/common/RandomH2';
import NumberedDots from '../../components/courseTemplates/common/NumberedDots';

// About Course Lesson Component
export function AboutCourseLesson({ CheckCurrentChapter, isKazakh }) {
    return (
        <LessonPage name={isKazakh ? "Курс туралы" : "О курсе"}>
            
            <div className="mt-10">
                <ImageLine img={courseaftor}></ImageLine>
            </div>
            <div className="mt-10">
                
                    <RandomH2>
                        {isKazakh ? 'Курстың мазмұны' : 'Содержание курса'}
                    </RandomH2>
            </div>
            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={isKazakh ? [
                        'Негізгі түсініктер мен қысқартулар',
                        'КЖ/ТҚҚ жүйесі',
                        'Кірісті жылыстатудың алғашқы «сызбаларының» пайда болу тарихы',
                        'Қазақстан Республикасындағы «кірістерді заңдастыру» түсінігінің құқықтық негізі',
                        'Кірістерді жылыстатудың негізгі сатылары (кезеңдері)',
                        'Кірістерді жылыстату схемалары ',
                        'Терроризмді қаржыландыру'
                    ] : [
                        'Основные понятия и сокращения',
                        'Система ПОД/ФТ',
                        'История возникновения первых «схем» отмывания денег',
                        'Правовой фундамент понятия «легализации денег» в Республике Казахстан',
                        'Основные стадии отмывания денег',
                        'Схемы отмывания денег',
                        'Финансирование терроризма'
                    ]}
                    header={isKazakh ? 'КЖ/ТҚҚ ұлттық жүйесінің жалпы сипаттамасы:' : 'Общая характеристика национальной системы ПОД/ФТ:'}
                />
            </div>
            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={isKazakh ? [
                        'Кірістерді жылыстатуға қарсы қаржылық шараларды әзірлеу тобы (ФАТФ)',
                        'ФАТФ типі бойынша аймақтық топтар',
                        'ФАТФ ұсынымдары',
                        '«Алдын алу шараларының» 4 тікелей нәтижесі',
                        'Өзара бағалау туралы есеп',
                        'Тәуекелдерді ұлттық бағалау ',
                        'ФАТФ тізімі',
                        'ЕАТ'
                    ] : [
                        'Группа разработки финансовых мер борьбы с отмыванием денег (ФАТФ)',
                        'Региональные группы по типу ФАТФ',
                        'Рекомендации ФАТФ',
                        'Непосредственный результат 4 «Превентивные меры»',
                        'Отчет о Взаимной оценке',
                        'Национальная оценка рисков',
                        'Списки ФАТФ',
                        'ЕАГ'
                    ]}
                    header={isKazakh ? 'КЖ/ТҚҚ халықаралық жүйесі:' : 'Международная система ПОД/ФТ:'}
                />
            </div>

            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={isKazakh ? [
                        'Заңнама',
                        'Қаржы мониторингі субъектілері ',
                        'Қаржы мониторингі субъектілерінің клиенттерін тиісінше тексеруі',
                        'Қаржы мониторингіне жататын, ақшамен және (немесе) өзге мүлікпен жасалатын операциялар',
                        'Қаржы мониторингіне жататын операциялар туралы мәліметтер мен ақпарат жинау',
                        'Терроризмнің және терроризмді қаржыландырудың алдын алуға және оны болғызбауға қатысты нысаналы қаржылық санкциялар',
                        'Операцияларды жүргізуден бас тарту және оларды тоқтата тұру ',
                    ] : [
                        'Законодательство',
                        'Субъекты финансового мониторинга',
                        'Надлежащая проверка субъектами финансового мониторинга клиентов',
                        'Операции с деньгами и (или) иным имуществом, подлежащие финансовому мониторингу',
                        'Сбор сведений и информации об операциях, подлежащих финансовому мониторингу',
                        'Целевые финансовые санкции, относящиеся к предупреждению и предотвращению терроризма и финансирования терроризма',
                        'Отказ от проведения и приостановление',
                    ]}
                    header={isKazakh ? 'КЖ/ТҚҚ туралы заңнама:' : 'Законодательство о ПОД/ФТ:'}
                />
            </div>

            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={[
                        isKazakh ? 'Мемлекеттік бақылау' : 'Государственный контроль',
                    ]}
                    header={isKazakh ? 'Қазақстан Республикасының КЖ/ТҚҚ туралы заңнамасының сақталуын мемлекеттік бақылау:' : 'Государственный контроль за соблюдением законодательства Республики Казахстан о ПОД/ФТ:'}
                />
            </div>
            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={isKazakh ? [
                        'Қазақстан Республикасының Қаржылық мониторинг агенттігі',
                        'Ведомствоаралық органдар мен жұмыс топтары',
                    ] : [
                        'Агентство Республики Казахстан по финансовому мониторингу',
                        'Межведомственные органы и рабочие группы',
                    ]}
                    header={isKazakh ? 'Қаржылық барлау бөлімшесі:' : 'Подразделение финансовой разведки:'}
                />
            </div>
            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={[
                        isKazakh ? 'Ішкі бақылау қағидалары' : 'Правила внутреннего контроля',
                    ]}
                    header={isKazakh ? 'Ішкі нормативтік құжаттарға қойылатын талаптар:' : 'Требования к внутренним нормативным документам:'}
                />
            </div>
            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={[
                        isKazakh ? 'Қаржы мониторинг субъектілеріне КЖ/ТҚҚ саласындағы даяралу және оқыту бойынша қойылатын талаптар' : 'Требования к СФМ по подготовке и обучению в сфере ПОД/ФТ',
                    ]}
                    header={isKazakh ? 'Даярлау және оқыту:' : 'Подготовка и обучение:'}
                />
            </div>
            <div className="mt-10 flex justify-end">
                <button 
                    className="bg-[#1F3C88] text-white py-3 px-10 rounded-lg hover:bg-[#162a5f] transition-colors"
                    onClick={() => CheckCurrentChapter(0, isKazakh ? -4 : -114)}
                >
                    {isKazakh ? "Жалғастыру" : "Продолжить"}
                </button>
            </div>
        </LessonPage>
    );
}

// Conclusion Lesson Component
export const ConclusionLesson = ({ isKazakh }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 md:p-8 text-center"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircleIcon className="w-10 h-10 text-green-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {isKazakh ? 'Құттықтаймыз!' : 'Поздравляем!'}
      </h1>
      
      <p className="text-xl text-gray-600 mb-8">
        {isKazakh 
          ? 'Сіз курсты сәтті аяқтадыңыз!'
          : 'Вы успешно завершили курс!'
        }
      </p>

      <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
        <p className="text-blue-800">
          {isKazakh 
            ? 'Алған білімдеріңізді практикада қолданып, одан әрі дамытуды жалғастырыңыз.'
            : 'Применяйте полученные знания на практике и продолжайте развиваться дальше.'
          }
        </p>
      </div>
    </motion.div>
  );
};

// Feedback Lesson Component
export const FeedbackLesson = ({ navigate, stars, setStars, isKazakh }) => {
  const [feedback, setFeedback] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (stars === 0) {
      alert(isKazakh ? 'Баға қойыңыз' : 'Поставьте оценку');
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit feedback logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (navigate) {
        navigate('/profile/sertificates');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 md:p-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isKazakh ? 'Пікіріңіз' : 'Ваш отзыв'}
        </h1>
        <p className="text-gray-600">
          {isKazakh 
            ? 'Курс туралы пікіріңізбен бөлісіңіз'
            : 'Поделитесь своим мнением о курсе'
          }
        </p>
      </div>

      {/* Star Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {isKazakh ? 'Баға қойыңыз:' : 'Поставьте оценку:'}
        </label>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setStars && setStars(star)}
              className="transition-colors duration-200"
            >
              {star <= stars ? (
                <StarIconSolid className="w-8 h-8 text-yellow-400" />
              ) : (
                <StarIcon className="w-8 h-8 text-gray-300 hover:text-yellow-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Text */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isKazakh ? 'Пікіріңіз (міндетті емес):' : 'Ваш отзыв (необязательно):'}
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={isKazakh 
            ? 'Курс туралы пікіріңізді жазыңыз...'
            : 'Напишите ваше мнение о курсе...'
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="5"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || stars === 0}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              {isKazakh ? 'Жіберілуде...' : 'Отправляется...'}
            </>
          ) : (
            isKazakh ? 'Пікір жіберу' : 'Отправить отзыв'
          )}
        </button>
      </div>
    </motion.div>
  );
};

// Conclusion Course Lesson Component
export const ConclusionCourseLesson = ({ navigate, stars, setStars, isKazakh, id }) => {
  const [feedback, setFeedback] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (stars === 0) {
      alert(isKazakh ? 'Баға қойыңыз' : 'Поставьте оценку');
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit final course feedback logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (navigate) {
        navigate('/profile/sertificates');
      }
    } catch (error) {
      console.error('Error submitting course feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 md:p-8"
    >
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AcademicCapIcon className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {isKazakh ? 'Курс аяқталды!' : 'Курс завершен!'}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {isKazakh 
            ? 'Курсты толық аяқтағаныңызды құттықтаймыз!'
            : 'Поздравляем с полным завершением курса!'
          }
        </p>
      </div>

      {/* Achievement Badge */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-8 border border-green-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircleIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isKazakh ? 'Сертификат алуға дайынсыз!' : 'Готов получить сертификат!'}
          </h3>
          <p className="text-gray-600">
            {isKazakh 
              ? 'Курсты сәтті аяқтағаныңыз үшін сертификат аласыз'
              : 'Вы получите сертификат за успешное завершение курса'
            }
          </p>
        </div>
      </div>

      {/* Final Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {isKazakh ? 'Курсқа жалпы баға қойыңыз:' : 'Поставьте общую оценку курсу:'}
        </label>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setStars && setStars(star)}
              className="transition-colors duration-200"
            >
              {star <= stars ? (
                <StarIconSolid className="w-8 h-8 text-yellow-400" />
              ) : (
                <StarIcon className="w-8 h-8 text-gray-300 hover:text-yellow-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Final Feedback */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isKazakh ? 'Соңғы пікіріңіз:' : 'Финальный отзыв:'}
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={isKazakh 
            ? 'Курс туралы жалпы пікіріңізді жазыңыз...'
            : 'Напишите общее мнение о курсе...'
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || stars === 0}
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              {isKazakh ? 'Аяқталуда...' : 'Завершается...'}
            </>
          ) : (
            isKazakh ? 'Курсты аяқтау' : 'Завершить курс'
          )}
        </button>
        
        <button
          onClick={() => {
            // Handle certificate download
            console.log('Download certificate for course:', id);
          }}
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          {isKazakh ? 'Сертификат жүктеу' : 'Скачать сертификат'}
        </button>
      </div>
    </motion.div>
  );
};
