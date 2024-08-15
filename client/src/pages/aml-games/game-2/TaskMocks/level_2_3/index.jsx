import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Sizebox from "../../../../../components/courseTemplates/common/Sizebox";
import clientImg from '../../../assets/asian-woman.png';
import AnswerHandler from "../../../components/answer-handler";
import ClientReview from "../../../components/client-review";
import Divider from "../../../components/divider";
import QuestionMap from "../../../components/questien-map";
import Questionnaire from '../../../components/Questionnaire/Questionnaire';
import TransactionForm from "../../../components/sumQuestions/TransactionForm";

const QuestionMapWithHandler = AnswerHandler(QuestionMap);
const TransactionFormWithHandler = AnswerHandler(TransactionForm);
const QuestionnaireWithHandler = AnswerHandler(Questionnaire);
const ClientReviewWithHandler = AnswerHandler(ClientReview);
function Level_2_3() {
  const clients = [
    {
        description: 'Алибек Сеитов пришел в ювелирный магазин, чтобы купить золотое кольцо. Он часто посещает магазин, но его покупки обычно небольшие и разнообразные. Сегодня он приобрел кольцо на 500 000 тенге.',
        img: clientImg,
        fullName: 'Алибек Сеитов',
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

  const testData = [
    {
      id: 1,
      text: "Операции, превышающие пороговое значение",
      correctAnswer: false,
    },
    {
      id: 2,
      text: "Систематическое приобретение однотипных изделий",
      correctAnswer: true,
    },
    { id: 3, text: "Перечисление денег на третьих лиц", correctAnswer: false },
    { id: 4, text: "Необычные обстоятельства", correctAnswer: false },
    { id: 5, text: "Использование вымышленных имен", correctAnswer: false },
    {
      id: 6,
      text: "Операция, не имеющая экономического смысла",
      correctAnswer: false,
    },
    { id: 7, text: "Необычно крупная сумма операции", correctAnswer: false },
  ];
  return (
    <>
      <h2>Задача 1</h2>
      <p>
        Задание: Вам предстоит распределить следующие критерии по двум группам:
        повышающие риски и понижающие риски.
      </p>
      <Sizebox height={40} />
      <QuestionMapWithHandler testData={testData} typeOfQuestion={'По страновому риску'} levelId={2} subLevelId={3} taskId={1}/>
      <Sizebox height={50} />
      <Divider />
      <h2>Задача 2</h2>
      <p>
        Задание: Вам предстоит установить пороговые суммы по соответствующим
        видам операций. Для этого изучите предложенные виды операций и укажите
        пороговую сумму, при которой они подлежат мониторингу. Учтите, что виды
        операций относятся к разным субъектам финансового мониторинга, включая
        ювелирные организации и другие виды субъектов.
      </p>
      <TransactionFormWithHandler levelId={2} subLevelId={3} taskId={2}/>
      <Sizebox height={50} />
      <Divider />
      <h2>Задача 3</h2>
      <p>
        Задание: Вам представлены описания сделок с ювелирными изделиями и
        указанные суммы. Ваша задача определить, какие из этих операций
        относятся к пороговым. 
      </p>
      <QuestionnaireWithHandler levelId={2} subLevelId={3} taskId={3}/>
      <Sizebox />
      <Divider/>
      <h2>Задача 4</h2>
      <p>Задание: Изучите представленные данные по клиентам и определите, кто из них имеет риски, связанные риском продукта или услуги. </p>
      <Sizebox/>
      <ClientReviewWithHandler clients={clients} levelId={2} subLevelId={3} taskId={4}/>
    </>
  );
}

export default Level_2_3;
