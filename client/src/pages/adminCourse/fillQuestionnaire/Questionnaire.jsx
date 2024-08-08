import {useState, useNavigate, useEffect} from 'react'
import './questionnaire.scss'
import axios from 'axios'
import base_url from '../../../settings/base_url'


const transformQuizData = (responseData) => {
    const transformedQuestions = responseData.quizList.map(item => {

        if (item.mcqOption.length > 0 && item.matchingPairs.length == 0) {
            let questionStructure = {
                question: {
                    question_title: item.question_title
                },
                mcqOptionList: item.mcqOption.map(option => ({
                    mcq_option_title: option.mcq_option_title,
                    is_true: option.is_true
                }))
            };
            
            return questionStructure;

        } else if (item.matchingPairs.length > 0 && item.mcqOption.length == 0) {
            let questionStructure = {
                question: {
                    question_title: item.question_title
                },
                matchingPairs: item.matchingPairs.map(option => ({
                    leftPart: option.leftPart,
                    rightPart: option.rightPart
                }))
            };
            
            return questionStructure;
        }
    });

    return transformedQuestions.filter(question => question !== undefined && question !== null);
}



const QuestionnaireForm = ({saveCancel, save, id}) => {
    const token = localStorage.getItem('jwtToken')

    const [title, setTitle] = useState("QUIZ")
    const [questions, setQuestions] = useState([])
    

    useEffect(() => {
        axios
            .get(base_url + "/api/aml/quiz/getQuiz/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res.data)

                if (res.data) {
                    console.log(res.data)
                    setTitle(res.data.quiz_title)
                    const transformedData = transformQuizData(res.data);

                    setQuestions(transformedData);
                }
            })
            .catch((Error) => {
                setTitle("Новое тестирование")
                setQuestions([])
            })
    }, [])

    useEffect(() => {

        if (save) {
            const quizData = {
                module_id: id,
                quiz: {
                    quiz_title: title
                    // add other quiz fields if necessary
                },
                questions: questions
            };

            console.log(quizData)

            
            axios
                .post(base_url + '/api/aml/quiz/saveQuiz', quizData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log('Quiz saved successfully', response);
                    alert('Тест сохранен');
                    saveCancel()
                    // Handle any additional logic after successful save
                })
                .catch(error => {
                    console.error('Error saving quiz', error);
                    alert('Ошибка! Тест не сохранен');
                    saveCancel()

                    // Handle errors here
                });
            
        }
    }, [save, id, questions, title])


    

    

    const handleInputChange =(questionIndex, index, newValue, type, field) => {
        if (type === 'mcqOptionList') {
            const updatedQuestions = [...questions];

            if (field == 'is_true') {
                if (updatedQuestions[questionIndex] && updatedQuestions[questionIndex][type][index]) {
                    // Toggle the is_true value
                    updatedQuestions[questionIndex][type][index][field] = !updatedQuestions[questionIndex][type][index][field];
    
                    setQuestions(updatedQuestions);
                }
            } else {
                if (updatedQuestions[questionIndex] && updatedQuestions[questionIndex][type][index]) {
                    if (newValue === '') {
                        // Remove the object if newValue is an empty string
                        updatedQuestions[questionIndex][type].splice(index, 1);
                    } else {
                        // Update the field with the new value
                        updatedQuestions[questionIndex][type][index][field] = newValue;
                    }
                    setQuestions(updatedQuestions);
                }
            }
        } else if (type == 'matchingPairs') {
            const updatedQuestions = [...questions];
            if (updatedQuestions[questionIndex] && updatedQuestions[questionIndex][type][index]) {
                updatedQuestions[questionIndex][type][index][field] = newValue;

                const pair = updatedQuestions[questionIndex][type][index];
                if (pair.leftPart === '' && pair.rightPart === '') {
                    updatedQuestions[questionIndex][type].splice(index, 1);
                }

                setQuestions(updatedQuestions);
            }
        }
    }

    const handleValueChange = (index, newValue) => {
        const updatedQuestions = [...questions];

        if (updatedQuestions[index] && updatedQuestions[index]['question']) {
            if (newValue === '') {
                // Remove the object if newValue is an empty string
                updatedQuestions[index].question.question_title = newValue;
                // updatedQuestions[index].splice(index, 1);
            } else {
                // Update the field with the new value
                updatedQuestions[index].question.question_title = newValue;
            }
            setQuestions(updatedQuestions);
        }
    }

    const handleAddToList = (questionIndex) => {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];

        if (question.mcqOptionList) {
            // Add a new empty MCQ option
            question.mcqOptionList.push({
                mcq_option_title: '', // Or some default value
                is_true: false
            });
        } else if (question.matchingPairs) {
            // Add a new empty matching pair
            question.matchingPairs.push({
                leftPart: '', // Or some default value
                rightPart: '' // Or some default value
            });
        }

        setQuestions(updatedQuestions);
    }

    const handleAddQuestion = () => {
        const updatedQuestions = [...questions];
    
        // Define the structure of a new question with the default type mcqOptionList
        const newQuestion = {
            question: {
                question_title: ""
            },
            mcqOptionList: []
        };
    
        // Add the new question to the updatedQuestions array
        updatedQuestions.push(newQuestion);
    
        // Update the state with the new list of questions
        setQuestions(updatedQuestions);
    };
    
    const handleQuestionTypeChange = (index, newValue) => {
        const updatedQuestions = [...questions]
        const currentQuestion = updatedQuestions[index];

        if (currentQuestion.matchingPairs) {
            delete currentQuestion.matchingPairs;
        }
        if (currentQuestion.mcqOptionList) {
            delete currentQuestion.mcqOptionList;
        }
        // Add the new question type with an initial structure
        if (newValue === 'mcqOptionList') {
            currentQuestion.mcqOptionList = [];
        } else if (newValue === 'matchingPairs') {
            currentQuestion.matchingPairs = [];
        }
        setQuestions(updatedQuestions);
    }

    const deleteQuestion = (index) => {
        const updatedQuestions = [...questions]
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions) 
    }

    const getQType = (x) => {
        if (x.mcqOptionList) {
            return 'mcqOptionList';
        } else if (x.matchingPairs) {
            return 'matchingPairs';
        } else {
            return 'Unknown'; // or any other default string you prefer
        }
    }
    
    return (
        <div className="questionnaire-page">
            <input className='title-input' placeholder="Введите название тестирования" type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>

            <h1 className='text'>Вопросы тестирования</h1>
            <div className='questions-block'>
            {questions.map((x, index) => {
                if (!x) return null;

                return (
                    <div className='single-question-block'>
                        <div className='title-type'>
                            <div className='number'>
                                <a>{index + 1}</a>
                            </div>
                            <input 
                                className='question-title'  
                                placeholder='Введите вопрос'
                                type='text' 
                                value={x.question.question_title} 
                                onChange={(e) => handleValueChange(index, e.target.value)}/>
                            <div className='select-question-type'>
                                <select value={getQType(x)} onChange={(e) => handleQuestionTypeChange(index, e.target.value)}>
                                    <option value="mcqOptionList">MCQ</option>
                                    <option value="matchingPairs">Пары</option>
                                </select>
                            </div>
                            <div className='delete-question'>
                                <svg onClick={() => deleteQuestion(index)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M1 1L15 15M1.00003 15L8.00003 8L15 1" stroke="#2D264B" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className='answers-block'>
                        {x.mcqOptionList ? x.mcqOptionList.map((y, answersIndex) => {
                            return (
                                <div className='answer-mark-mcqOptionList'>
                                    <input placeholder='Введите ответ' type='text' value={y.mcq_option_title} onChange={(e) => handleInputChange(index, answersIndex, e.target.value, 'mcqOptionList', 'mcq_option_title' )}/>
                                    <input 
                                        checked={y.is_true} 
                                        type="checkbox" 
                                        id="default" 
                                        name="default" 
                                        // value={y.is_true} 
                                        onChange={(e) => handleInputChange(index, answersIndex, e.target.value, 'mcqOptionList', 'is_true' )}/>
                                </div>
                            )
                        }) 
                        : x.matchingPairs ? x.matchingPairs.map((y, answersIndex) => {
                            return (
                                <div className='answer-mark-matchingPairs'>
                                    <input 
                                        type='text' 
                                        value={y.leftPart}
                                        placeholder='Введите левую часть ответа'
                                        onChange={(e) => handleInputChange(index, answersIndex, e.target.value, 'matchingPairs', 'leftPart' )}/>
                                    -
                                    <input 
                                        type='text' 
                                        value={y.rightPart}
                                        placeholder='Введите превую часть ответа'
                                        onChange={(e) => handleInputChange(index, answersIndex, e.target.value, 'matchingPairs', 'rightPart' )}/>
                                </div>
                            )
                        }) : ""}
                        <div className='add-new-answer'>
                            <svg onClick={() => handleAddToList(index)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="9.4" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
                                <path d="M10 13.3333L10 6.66666" stroke="#374761" stroke-width="1.2" stroke-linecap="square"/>
                                <path d="M13.3333 10L6.66659 10" stroke="#374761" stroke-width="1.2" stroke-linecap="square"/>
                            </svg>
                        </div>

                        </div>
                    </div>
                )
            })}
            </div>
            <div className='add-new-question'>
                <button onClick={handleAddQuestion}>Добавить новый вопрос</button>
            </div>
        </div>
    )
}

export default QuestionnaireForm