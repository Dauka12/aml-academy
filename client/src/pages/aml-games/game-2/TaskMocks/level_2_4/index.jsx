import Sizebox from "../../../../../components/courseTemplates/common/Sizebox";
import clientImg from '../../../assets/asian-woman.png';
import AnswerHandler from "../../../components/answer-handler";
import ClientReview from "../../../components/client-review";
import QuestionMap from "../../../components/questien-map";

const QuestionMapWithHandler = AnswerHandler(QuestionMap);
const ClientReviewWithHandler = AnswerHandler(ClientReview);
function Level_2_4() {
    const testData = [
        { id: 1, text: 'Онлайн', correctAnswer: false },
        { id: 2, text: 'НПК проводится через третьих лиц', correctAnswer: true },
        { id: 3, text: 'Оффлайн', correctAnswer: false },
    ];
    const clients = [
        {
            description: 'Анна заказала ювелирное украшение через онлайн-магазин. Процедура надлежащей проверки клиента (НПК) была проведена через третьих лиц.',
            img: clientImg,
            fullName: 'Анна Иванова',
            shouldBeSwitched: false
        },
        {
            description: 'Описание третьего клиента...',
            img: clientImg,
            fullName: 'ФИО третьего клиента',
            shouldBeSwitched: false
        },
        {
            description: 'Описание четвертого клиента...',
            img: clientImg,
            fullName: 'ФИО четвертого клиента',
            shouldBeSwitched: false
        },
        {
            description: 'Описание пятого клиента...',
            img: clientImg,
            fullName: 'ФИО пятого клиента',
            shouldBeSwitched: false
        },
        {
            description: 'Описание шестого клиента...',
            img: clientImg,
            fullName: 'ФИО шестого клиента',
            shouldBeSwitched: false
        },
    ];
    return (
        <>
            <h2>Задача 1</h2>
            <p>Задание: Вам предстоит распределить следующие критерии по двум группам: повышающие риски и понижающие риски.</p>
            <Sizebox height={40} />
            <QuestionMapWithHandler testData={testData} typeOfQuestion={'По способу предоставления услуг или продуктов'} levelId={2} subLevelId={4} taskId={1}/>
            <Sizebox height={40} />
            <h2>Задача 2</h2>
            <p>Задание: Вам необходимо проанализировать десять профилей клиентов и определить, кто из них имеет риски. Для каждой ситуации будет дано краткое описание, включающее информацию о способе предоставления услуг или продуктов, и дополнительных условиях.</p>
            <Sizebox />
            <ClientReviewWithHandler clients={clients} levelId={2} subLevelId={4} taskId={2} /> 
        </>
    );
}

export default Level_2_4;