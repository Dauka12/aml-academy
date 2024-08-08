import Sizebox from "../../../../../components/courseTemplates/common/Sizebox";
import clientImg from '../../../assets/asian-woman.png';
import ClientReview from "../../../components/client-review";
import QuestionMap from "../../../components/questien-map";

function Level_2_5() {
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
        },
        {
            description: 'Описание третьего клиента...',
            img: clientImg,
            fullName: 'ФИО третьего клиента',
        },
        {
            description: 'Описание четвертого клиента...',
            img: clientImg,
            fullName: 'ФИО четвертого клиента',
        },
        {
            description: 'Описание пятого клиента...',
            img: clientImg,
            fullName: 'ФИО пятого клиента',
        },
        {
            description: 'Описание шестого клиента...',
            img: clientImg,
            fullName: 'ФИО шестого клиента',
        },
    ];
    return (
        <>
            <h2>Задача 1</h2>
            <p>Задание: Вам предстоит распределить следующие критерии по двум группам: повышающие риски и понижающие риски.</p>
            <Sizebox height={40} />
            <QuestionMap testData={testData} typeOfQuestion={'По способу предоставления услуг или продуктов'} />
            <Sizebox height={40} />
            <h2>Задача 2</h2>
            <p>Задание: Вам необходимо проанализировать десять профилей клиентов и определить, кто из них имеет риски. Для каждой ситуации будет дано краткое описание, включающее информацию о способе предоставления услуг или продуктов, и дополнительных условиях.</p>
            <Sizebox />
            <ClientReview clients={clients} />
        </>
    );
}

export default Level_2_5;