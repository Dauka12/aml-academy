import Sizebox from "../../../../components/courseTemplates/common/Sizebox";
import pc from '../../assets/personal-computer.png';
import ImageCarousel from "../../components/ImageCarousel";
import Transcript from "../../components/Transcript";
import AnswerHandler from "../../components/answer-handler";
import TagQuiz from "../../components/tagQuiz";
import { images, tag_quiz_data } from "./data";

const transcripts = [
    {
        title: 'Транскрипт 1',
        content: <>
            <ul>
                <li>СФМ используют Портал Электронного правительства <a href="https://egov.kz/">https://egov.kz/</a>, перед подачей Уведомления необходимо авторизоваться на сайте.</li>
                <li>После этого необходимо найти вкладку в левой стороне на нижней части страницы (электронное лицензирование), далее будет осуществлен переход на сайт лицензирования Республики Казахстан <a href="https://elicense.kz/">https://elicense.kz/</a></li>
                <li>Для завершения процедуры необходимо выбрать категорию «Финансы» и кликнуть подкатегорию «Уведомительный порядок», после выбрать «Уведомление о начале или прекращении деятельности лиц, являющегося субъектом финансового мониторинга в соответствии с Законом Республики Казахстан «О противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма».</li>
                <li>Заказ услуги онлайн, во всплывающем окне выбрать «Агентство Республики Казахстан по финансовому мониторингу».</li>
            </ul>
        </>
    },
    {
        title: 'Транскрипт 2',
        content: <>
            <ul>
                <li>После отображения личных сведений СФМ необходимо указать адрес осуществления деятельности и выбрать соответствующий вид Субъекта финансового мониторинга, подписать ЭЦП СФМ и отправить.</li>
                <li>Выбрать «Поиск РД», указать БИН/ИИН организации, перейти кнопку «Действительный».  </li>
            </ul>
        </>
      },
    { title: 'Транскрипт 3', content: <><ul><li>Скачать документ «Талон о принятии уведомления»</li></ul></> },
];
const TagQuizWithHandler = AnswerHandler(TagQuiz);

function Level_1_3() {
    return (
        <>
            <ImageCarousel images={images} />
            <Transcript transcripts={transcripts} />
            <Sizebox height={60} />
            <h2>Задача 1</h2>
 
            <TagQuizWithHandler
                title={'Отметьте категории доступные в открытой версии Личного кабинета'}
                img={pc}
                answers={tag_quiz_data}
                levelId={1}
                subLevelId={3}
                taskId={1}
            /> 

            <Sizebox height={60} />

            <TagQuizWithHandler
                title={'Отметьте категории доступные в открытой версии Личного кабинета'}
                img={pc}
                answers={tag_quiz_data}
                levelId={1}
                subLevelId={3}
                taskId={2}
            />

        </>
    );
}

export default Level_1_3;