import { createSlice } from "@reduxjs/toolkit";
import Sizebox from "../../../../../components/courseTemplates/common/Sizebox/index.jsx";
import VideoLine from "../../../../../components/courseTemplates/common/VideoLine/index.jsx";
import pc from '../../../assets/personal-computer.png';
import AnswerHandler from "../../../components/answer-handler/index.jsx";
import ClientReview from "../../../components/client-review/index.jsx";
import FolderQuiz from "../../../components/folder-quiz/index.jsx";
import Task2 from "../../../components/level_2_2_task2/index.jsx";
import Task2_5 from "../../../components/level_2_5_task2/index.jsx";
import DragAndDropComponent from "../../../components/matching/index.jsx";
import NameList from "../../../components/name-list/index.jsx";
import PdlComponent from "../../../components/pdl-component/index.jsx";
import PdlComponent1 from "../../../components/pdl-component1/index.jsx";
import QuestionMap from "../../../components/questien-map/index.jsx";
import Questionnaire from "../../../components/Questionnaire/Questionnaire.jsx";
import QuizCard from "../../../components/QuizCards/index.jsx";
import HexagonComponent from "../../../components/sfm-rating/index.jsx";
import Hex from "../../../components/soty-osa/index.jsx";
import TransactionForm from "../../../components/sumQuestions/TransactionForm.jsx";
import TagQuiz from "../../../components/tagQuiz/index.jsx";
import TranscriptSwitcher from "../../../components/Transcript/index.jsx";
import VerticalCarousel from "../../../components/VerticalCarousel/index.jsx";
import { chats } from "../../chat-datas/data1.tsx";
import MessagesComponent from "../../MessagePage/MessagesPage.tsx";
import { cardData, clients, clients1, clients2, clients3, clients4, clients5, folder_list_1, folder_list_2, peopleData, peopleData1, quizCardsData, tag_quiz_data, task, task1, testData, testData1, testData2, testData3, transcripts1, type1 } from "../../TaskMocks/data.jsx";

const VerticalCarouselWithHandler = AnswerHandler(VerticalCarousel);
const QuizCardWithHandler = AnswerHandler(QuizCard);
const TagQuizWithHandler = AnswerHandler(TagQuiz);
const FolderWithHandler = AnswerHandler(FolderQuiz);
const QuestionMapWithHandler = AnswerHandler(QuestionMap);
const NameListWithHandler = AnswerHandler(NameList);
const ClientReviewWithHandler = AnswerHandler(ClientReview);
const TransactionFormWithHandler = AnswerHandler(TransactionForm);
const QuestionnaireWithHandler = AnswerHandler(Questionnaire);
const Task2_5WithHandler = AnswerHandler(Task2_5)
const HexagonComponentWithHandler = AnswerHandler(HexagonComponent);
const DragAndDropComponentWithHandler = AnswerHandler(DragAndDropComponent)
const HexWithHandler = AnswerHandler(Hex);

// Load saved task index from localStorage
const savedTaskIndex = parseInt(localStorage.getItem('currentTaskIndex'), 10);

const initialState = {
    currentTaskIndex: isNaN(savedTaskIndex) ? 0 : savedTaskIndex, // Set from localStorage if available
    tasks: [
        {
            levelId: 1,
            subLevelId: 1,
            taskId: 1,
            content: (
                <div>
                    <h2>Уведомление о начале/прекращении деятельности</h2>
                </div>
            ),
        },
        {
            levelId: 1,
            subLevelId: 2,
            taskId: 1,
            content: (
                <div>
                    <div className='message-page'>
                        <div className='message-page-container'>
                            <MessagesComponent image={null} chats={chats} />
                        </div>
                    </div>
                    <Sizebox height={40} />
                    <h2>Задача 1</h2>
                    <div className='task1-national-id-card'>
                        <p className='task1-national-id-card-p-text' style={{fontSize:'18px', lineHeight:'1.5'}}>
                            Назначьте на должность сотрудника, который наилучшим образом соответствует требованиям ПОД/ФТ и потребностям вашей организации.
                        </p>
                        <VerticalCarouselWithHandler
                            cards={cardData}
                            levelId={1}
                            subLevelId={2}
                            taskId={1}
                        />
                    </div>
                </div>
            ),
        },
        {
            levelId: 1,
            subLevelId: 2,
            taskId: 2,
            content: (
                <div>
                    <h2>Определение функций ответственного лица по ПОД/ФТ</h2>
                    <Sizebox height={40} />
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <QuizCardWithHandler
                            quizCardsData={quizCardsData}
                            levelId={1}
                            subLevelId={2}
                            taskId={2}
                        />
                    </div>
                </div>
            ),
        },
        {
            levelId: 1,
            subLevelId: 3,
            taskId: 1,
            content: (
                <>
                    <VideoLine url={'https://videos.sproutvideo.com/embed/ea90d4b01d1ce7c263/7fc810ee3ff4ad50'} />
                    <TranscriptSwitcher transcripts={transcripts1} />
                    <Sizebox height={60} />
                    <h2>Доступные категории открытой версии портала ВЕБ-СФМ</h2>
                    <TagQuizWithHandler
                        title={''}
                        img={pc}
                        answers={tag_quiz_data}
                        levelId={1}
                        subLevelId={3}
                        taskId={1}
                        maxItems={4}
                    />
                </>
            ),
        },
        {
            levelId: 1,
            subLevelId: 3,
            taskId: 2,
            content: (
                <>
                    <h2>Повышение рейтинга в личном кабинете портала ВЕБ-СФМ</h2>
                    <HexWithHandler
                        levelId={1}
                        subLevelId={3}
                        taskId={2}
                    />
                </>
            ),
        },
        {
            levelId: 1,
            subLevelId: 3,
            taskId: 3,
            content: (
                <>
                    <HexagonComponentWithHandler levelId={1} subLevelId={3} taskId={3} />
                </>
            ),
        },
        {
            levelId: 1,
            subLevelId: 3,
            taskId: 4,
            content: (
                <>
                    <DragAndDropComponentWithHandler levelId={1} subLevelId={3} taskId={4} />
                </>
            ),
        },
        {
            levelId: 1,
            subLevelId: 4,
            taskId: 1,
            content: (
                <>
                    <h2>Определение минимальных данных, необходимых для Досье клиента</h2>
                    <FolderWithHandler
                        desc={
                            <></>
                        }
                        title={'Информация о клиенте'}
                        list={folder_list_1}
                        maxItems={6}
                        levelId={1}
                        subLevelId={4}
                        taskId={1}
                    />
                </>
            ),
        },
        {
            levelId: 1,
            subLevelId: 4,
            taskId: 2,
            content: (
                <>
                    <h2>Определение минимальных данных, необходимых для Досье клиента</h2>
                    <FolderWithHandler
                        desc={
                            <><p>

                            </p>
                                <p>

                                </p></>
                        }
                        title={'Информация по операции'}
                        list={folder_list_2}
                        maxItems={3}
                        levelId={1}
                        subLevelId={4}
                        taskId={2}
                    />
                </>
            ),
        },
        {
            levelId: 1,
            subLevelId: 5,
            taskId: 1,
            content: (
                <div>
                    <h2>Разработка анкеты</h2>
                </div>
            ),
        },
        {
            levelId: 1,
            subLevelId: 6,
            taskId: 1,
            content: (
                <div>
                    <h2>Задача 1</h2>
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 1,
            taskId: 1,
            content: (
                <div>
                    <h2>Проведение оценки рисков по типу клиента</h2>
                    <p>Задание: Вам предстоит распределить следующие критерии по двум группам: повышающие риски и понижающие риски.</p>
                    <Sizebox height={40} />
                    <QuestionMapWithHandler testData={testData} typeOfQuestion={'По типу клиента'} levelId={2} subLevelId={1} taskId={1} />
                    <Sizebox height={40} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 1,
            taskId: 2,
            content: (
                <div>
                    <h2>Проведение оценки рисков по типу клиента</h2>
                    <PdlComponent peopleData={peopleData} task={task} typeOfPdl={type1} />
                    <NameListWithHandler peopleData={peopleData} levelId={2} subLevelId={1} taskId={2} />
                    <Sizebox height={40} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 1,
            taskId: 3,
            content: (
                <div>
                    <h2>Проведение оценки рисков по типу клиента</h2>
                    <PdlComponent1 peopleData={peopleData1} task={task1} />
                    <NameListWithHandler peopleData={peopleData1} levelId={2} subLevelId={1} taskId={3} />
                    <Sizebox height={40} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 1,
            taskId: 4,
            content: (
                <div>
                    <h2>Проведение оценки рисков по типу клиента</h2>
                    <p>Задание: В этом задании вам предстоит определить клиентов с повышенными или пониженными рисками по типу клиента.</p>
                    <Sizebox height={40} />
                    <ClientReviewWithHandler clients={clients} levelId={2} subLevelId={1} taskId={4} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 2,
            taskId: 1,
            content: (
                <div>
                    <h2>Определение странового риска</h2>
                    <p>Задание: Вам предстоит распределить следующие критерии по двум группам: повышающие риски и понижающие риски. </p>
                    <Sizebox height={40} />
                    <QuestionMapWithHandler testData={testData1} typeOfQuestion={'По страновому риску'} levelId={2} subLevelId={2} taskId={1} />
                    <Sizebox height={40} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 2,
            taskId: 2,
            content: (
                <div>
                    <Task2 />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 2,
            taskId: 3,
            content: (
                <div>
                    <h2>Определение странового риска</h2>
                    <p>Задание: Изучите представленные данные по клиентам и определите, кто из них имеет риски, связанные с офшорными зонами. Отметьте тех клиентов, которые попадают под категорию «риска".</p>
                    <Sizebox />
                    <ClientReviewWithHandler clients={clients1} levelId={2} subLevelId={2} taskId={3} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 3,
            taskId: 1,
            content: (
                <div>
                    <h2>Определение рисков по продуктам и услугам</h2>
                    <p>
                        Задание: Вам предстоит распределить следующие критерии по двум группам:
                        повышающие риски и понижающие риски.
                    </p>
                    <Sizebox height={40} />
                    <QuestionMapWithHandler testData={testData2} typeOfQuestion={'По страновому риску'} levelId={2} subLevelId={3} taskId={1} />
                    <Sizebox height={50} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 3,
            taskId: 2,
            content: (
                <div>
                    <h2>Определение рисков по продуктам и услугам</h2>
                    <p>
                        Задание: Вам предстоит определить вид операции, относящейся к деятельности ювелирного сектора и указать пороговое значение установленную Законом о ПОД/ФТ
                    </p>
                    <TransactionFormWithHandler levelId={2} subLevelId={3} taskId={2} />
                    <Sizebox height={50} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 3,
            taskId: 3,
            content: (
                <div>
                    <h2>Определение рисков по продуктам и услугам</h2>
                    <p style={{fontSize:'18px'}}>
                        Задание: Вам представлены описания сделок с ювелирными изделиями и
                        указанные суммы. Ваша задача определить, какие из этих операций
                        относятся к пороговым.
                    </p>
                    <QuestionnaireWithHandler levelId={2} subLevelId={3} taskId={3} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 3,
            taskId: 4,
            content: (
                <div>
                    <h2>Определение рисков по продуктам и услугам</h2>
                    <p style={{fontSize:'18px'}}>Задание: Изучите представленные данные по клиентам и определите, кто из них имеет риски, связанные риском продукта или услуги. </p>
                    <Sizebox />
                    <ClientReviewWithHandler clients={clients2} levelId={2} subLevelId={3} taskId={4} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 4,
            taskId: 1,
            content: (
                <div>
                    <h2>Определение рисков по способам предоставления услуг</h2>
                    <p>Задание: Вам предстоит распределить следующие критерии по двум группам: повышающие риски и понижающие риски.</p>
                    <Sizebox height={40} />
                    <QuestionMapWithHandler testData={testData3} typeOfQuestion={'По способу предоставления услуг или продуктов'} levelId={2} subLevelId={4} taskId={1} />
                    <Sizebox height={40} />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 4,
            taskId: 2,
            content: (
                <>
                    <h2>Задача 2</h2>
                    <p>Задание: Вам необходимо проанализировать профили клиентов и определить, кто из них имеет риски. Для каждой ситуации будет дано краткое описание, включающее информацию о способе предоставления услуг или продуктов, и дополнительных условиях.</p>
                    <Sizebox />
                    <ClientReviewWithHandler clients={clients3} levelId={2} subLevelId={4} taskId={2} />
                </>
            ),
        },
        {
            levelId: 2,
            subLevelId: 4,
            taskId: 3,
            content: (
                <>
                    <h2>Задача 3</h2>
                    <p>Задание: Теперь вам предстоит применить все знания, полученные ранее, для комплексной оценки клиентов. Вам будут предоставлены профили клиентов с подробной информацией о каждом из них. Ваша задача — определить уровень риска для каждого клиента, исходя из совокупности следующих факторов:</p>
                    <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
                        <li>Тип клиента</li>
                        <li>Географический фактор (страна происхождения или пребывания клиента)</li>
                        <li>Риск услуг или продуктов</li>
                        <li>Способ предоставления услуг или продуктов</li>
                    </ul>
                    <Sizebox height={40}/>
                    <ClientReviewWithHandler clients={clients4} levelId={2} subLevelId={4} taskId={3}/>
                    <Sizebox height={40}/>
                </>
            ),
        },
        {
            levelId: 2,
            subLevelId: 4,
            taskId: 4,
            content: (
                <>
                    <h2>Задача 4</h2>
                    <Task2_5WithHandler levelId={2} subLevelId={4} taskId={4}/>
                </>
            ),
        },
        {
            levelId: 2,
            subLevelId: 4,
            taskId: 5,
            content: (
                <>
                    <h2>Задача 5</h2>
                    <p>Задание: Вам необходимо проанализировать пять профилей клиентов и определить, кто из них имеет риски. Для каждой ситуации будет дано краткое описание, включающее информацию о способе предоставления услуг или продуктов, и дополнительных условиях</p>
                    <Sizebox height={40} />
                    <ClientReviewWithHandler clients={clients5} namelist={false} levelId={2} subLevelId={4} taskId={5} />
                </>
            ),
        },
        {
            levelId: 2,
            subLevelId: 5,
            taskId: 1,
            content: (
                <>

                </>
            ),
        },
    ],
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        nextTask: (state, action) => {
            const navigate = action.payload;
            const currentTask = state.tasks[state.currentTaskIndex];
            const nextTask = state.tasks[state.currentTaskIndex + 1];

            if (nextTask && nextTask.subLevelId !== currentTask.subLevelId) {
                navigate(`/courses/aml-games/game/read/1/${nextTask.levelId}/${nextTask.subLevelId}`);
            }

            if (state.currentTaskIndex < state.tasks?.length - 1) {
                state.currentTaskIndex += 1;
                localStorage.setItem('currentTaskIndex', state.currentTaskIndex); // Save index to localStorage
            }
        },
        resetTask: (state) => {
            state.currentTaskIndex = 0;
            localStorage.setItem('currentTaskIndex', state.currentTaskIndex); // Reset index in localStorage
        },
        setTaskBySublevel: (state, action) => {
            const { levelId, subLevelId } = action.payload;

            // Find the first task that matches the given levelId and subLevelId
            const taskIndex = state.tasks.findIndex(task =>
                task.levelId === levelId && task.subLevelId === subLevelId
            );

            // If found, set currentTaskIndex to that task's index
            if (taskIndex !== -1) {
                state.currentTaskIndex = taskIndex;
                localStorage.setItem('currentTaskIndex', state.currentTaskIndex); // Save index to localStorage
                console.log(`Task found at index ${taskIndex} for level ${levelId} and sublevel ${subLevelId}`);
            } else {
                console.log(`No task found for level ${levelId} and sublevel ${subLevelId}`);
            }
        }
    }
});

export const { nextTask, resetTask, setTaskBySublevel } = taskSlice.actions;
export default taskSlice.reducer;
