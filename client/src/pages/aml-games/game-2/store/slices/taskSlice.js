import { Divider } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import Sizebox from "../../../../../components/courseTemplates/common/Sizebox";
import pc from '../../../assets/personal-computer.png';
import AnswerHandler from "../../../components/answer-handler";
import ClientReview from "../../../components/client-review/index.jsx";
import FolderQuiz from "../../../components/folder-quiz/index.jsx";
import ImageCarousel from "../../../components/ImageCarousel";
import NameList from "../../../components/name-list/index.jsx";
import PdlComponent from "../../../components/pdl-component/index.jsx";
import PdlComponent1 from "../../../components/pdl-component1/index.jsx";
import QuestionMap from "../../../components/questien-map/index.jsx";
import QuizCard from "../../../components/QuizCards";
import TagQuiz from "../../../components/tagQuiz";
import TranscriptSwitcher from "../../../components/Transcript";
import VerticalCarousel from "../../../components/VerticalCarousel";
import { chats } from "../../chat-datas/data2.tsx";
import MessagesComponent from "../../MessagePage/MessagesPage.tsx";
import { cardData, clients, folder_list_1, folder_list_2, images, peopleData, peopleData1, quizCardsData, tag_quiz_data, task, task1, testData, transcripts1, type1 } from "../../TaskMocks/data";

const VerticalCarouselWithHandler = AnswerHandler(VerticalCarousel);
const QuizCardWithHandler = AnswerHandler(QuizCard);
const TagQuizWithHandler = AnswerHandler(TagQuiz);
const FolderWithHandler = AnswerHandler(FolderQuiz);
const QuestionMapWithHandler = AnswerHandler(QuestionMap);
const NameListWithHandler = AnswerHandler(NameList);
const ClientReviewWithHandler = AnswerHandler(ClientReview);

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
                    <h2>Задача 1</h2>
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
                        <p className='task1-national-id-card-p-text'>
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
                    <h2>Задача 2</h2>
                    <p>
                        После определения правильного кандидата на должность ответственного сотрудника, требуется определить его функции в сфере ПОД/ФТ
                    </p>
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
                    <ImageCarousel images={images} />
                    <TranscriptSwitcher transcripts={transcripts1} />
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
                </>
            ),
        },
        {
            levelId: 1,
            subLevelId: 3,
            taskId: 2,
            content: (
                <>
                    <Sizebox height={60} />
                    <h2>Задача 2</h2>
                    <TagQuizWithHandler
                        title={'Отметьте категории доступные в открытой версии Личного кабинета'}
                        img={pc}
                        answers={tag_quiz_data}
                        levelId={1}
                        subLevelId={3}
                        taskId={2}
                    />
                </>
            ),
        },
        {
            levelId: 1,
            subLevelId: 4,
            taskId: 1,
            content: (
                <>
                    <h2>Задача 1</h2>
                    <FolderWithHandler
                        desc={
                            <><p>
                                Задание: необходимо определить минимальное количество данных, которые войдут в «Досье» на каждого клиента (ФЛ). Помните, что правильно составленное Досье поможет снизить риски и обеспечить соблюдение законодательства о ПОД/ФТ.
                            </p>
                                <p>
                                    Перетащите или оставьте необходимую вам информацию для дальнейшей работы.
                                </p></>
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
                    <h2>Задача 2</h2>
                    <FolderWithHandler
                        desc={
                            <><p>
                                Задание: необходимо определить минимальное количество данных, которые войдут в «Досье» на каждого клиента (ФЛ). Помните, что правильно составленное Досье поможет снизить риски и обеспечить соблюдение законодательства о ПОД/ФТ.
                            </p>
                                <p>
                                    Перетащите или оставьте необходимую вам информацию для дальнейшей работы.
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
                    <h2>Задача 1</h2>
                    <p>Задание: Вам предстоит распределить следующие критерии по двум группам: повышающие риски и понижающие риски.</p>
                    <Sizebox height={40} />
                    <QuestionMapWithHandler testData={testData} typeOfQuestion={'По типу клиента'} levelId={2} subLevelId={1} taskId={1} />
                    <Sizebox height={40} />
                    <Divider />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 1,
            taskId: 2,
            content: (
                <div>
                    <h2>Задача 2</h2>
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
                    <h2>Задача 3</h2>
                    <PdlComponent1 peopleData={peopleData1} task={task1} />
                    <NameListWithHandler peopleData={peopleData1} levelId={2} subLevelId={1} taskId={3} />
                    <Sizebox height={40} />
                    <Divider />
                </div>
            ),
        },
        {
            levelId: 2,
            subLevelId: 1,
            taskId: 4,
            content: (
                <div>
                    <h2>Задача 4</h2>
                    <p>Задание: В этом задании вам предстоит определить клиентов с повышенными или пониженными рисками по типу клиента.</p>
                    <Sizebox height={40} />
                    <ClientReviewWithHandler clients={clients} levelId={2} subLevelId={1} taskId={4} />
                </div>
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

            if (state.currentTaskIndex < state.tasks.length - 1) {
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
