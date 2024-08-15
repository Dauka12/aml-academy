import Sizebox from "../../../../components/courseTemplates/common/Sizebox";
import pc from '../../assets/personal-computer.png';
import ImageCarousel from "../../components/ImageCarousel";
import Transcript from "../../components/Transcript";
import AnswerHandler from "../../components/answer-handler";
import TagQuiz from "../../components/tagQuiz";
import { images, tag_quiz_data } from "./data";

const transcripts = [
    { title: 'Транскрипт 1', content: 'Переходит сдавать уведомление: Егов – войти – электронное лицензирование – Финансы – Уведомительный порядок (Уведомление о начале или прекращении деятельности лица, являющегося субъектом финансового мониторинга в соответствии с Законом Республики Казахстан «О противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма») – заполняет форму – подписывает – скачивает уведомление' },
    { title: 'Транскрипт 2', content: 'Содержание транскрипта 2' },
    { title: 'Транскрипт 3', content: 'Содержание транскрипта 3' },
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
                subLevelId={2}
                taskId={1}
            />

            <Sizebox height={60} />

            <TagQuizWithHandler
                title={'Отметьте категории доступные в открытой версии Личного кабинета'}
                img={pc}
                answers={tag_quiz_data}
                levelId={1}
                subLevelId={2}
                taskId={1}
            />

        </>
    );
}

export default Level_1_3;