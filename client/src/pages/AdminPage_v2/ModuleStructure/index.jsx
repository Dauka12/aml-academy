import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import './style.scss';

import base_url from '../../../settings/base_url';
import hatIcon from '../images/hat-light-icon.svg';
import saveButton from '../images/save-button.svg';

// Debug filter function to troubleshoot filtering issues
function debugFilter(array, filterFn) {
    console.log('=== Debug Filter ===');
    console.log('Input array:', array);

    if (!array || !Array.isArray(array)) {
        console.log('❌ Input is not an array:', array);
        return [];
    }

    const result = array.reduce((filtered, item, index) => {
        // Check each item and log detailed information
        const passes = filterFn(item);
        console.log(
            `Item ${index}:`,
            {
                item,
                '_active property': item?._active,
                'typeof _active': item?._active !== undefined ? typeof item._active : 'undefined',
                'passes filter': passes
            }
        );

        if (passes) {
            filtered.push(item);
        }
        return filtered;
    }, []);

    console.log('Filtered result:', result);
    console.log('=== End Debug Filter ===');
    return result;
}

const ModuleStructure = ({ id, toQuestionnaire, lessonById, setLessonTitle }) => {
    const navigate = useNavigate()
    const [module, setModule] = useState({
        title: '',
        number_of_lessons: 0
    })
    const [currentLessons, setCurrentLessons] = useState([])

    //creation of newLesson
    const [newLessonName, setNewLessonName] = useState("Урок №" + (currentLessons?.length + 1))
    const [addingNewLesson, setAddingNewLesson] = useState(false)


    useEffect(() => {
        axios
            .get(base_url + '/api/aml/chapter/lessonsByModuleId', {
                params: {
                    id
                }
            })
            .then((res) => {
                console.log('res.data: ', res.data);

                // FIXED: res.data is already the array of lessons, not an object with a lessons property
                const lessons = Array.isArray(res.data) ? res.data : [];

                // Use debug filter with the correct data
                const activeLessons = debugFilter(
                    lessons,
                    x => x && x._active === true
                );

                setModule({
                    title: res.data?.name || "", // This may need to be set differently if data structure changed
                    number_of_lessons: activeLessons.length
                });
                setNewLessonName("Урок №" + (lessons.length + 1));
                setCurrentLessons(lessons);
            })
            .catch(function (error) {
                console.error("API Error:", error);
                const errorMessage = error?.response?.data?.message ||
                    error?.message ||
                    "Ошибка при загрузке данных";
                alert(errorMessage);
            });
    }, [id]);

    const addLesson = () => {
        if (newLessonName != '') {
            axios
                .post(base_url + '/api/aml/chapter/addLesson', { id, newLessonName })
                .then((res) => {
                    setAddingNewLesson(false)
                    setCurrentLessons(res.data)
                    setNewLessonName("Урок №" + (res.data?.length + 1))
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            alert('Пожалуйста введите название урока')
        }
    };

    const deleteLesson = (lessonId) => {
        if (window.confirm('Вы точно хотите удалить модуль?')) {
            axios
                .post(base_url + '/api/aml/chapter/deleteLesson', null, {
                    params: {
                        id: lessonId
                    }
                })
                .then((res) => {
                    setCurrentLessons(res.data)
                    setNewLessonName("Урок №" + (res.data?.length + 1))
                })
                .catch(function (error) {
                    // alert(error)
                })
        }
    };


    return (
        <div className="base">
            <a className="title">{module.title}<span>: {module.number_of_lessons} Уроков</span></a>
            <div>
                <div className='module-constructor'>
                    <div className="list-of-modules">
                        {/* Replace standard filter with debug filter */}
                        {debugFilter(currentLessons || [], x => x && x._active === true).map((x, index) => {
                            return (
                                <div className="module-line" key={index}>
                                    <div className='name-icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                                            <path d="M19 11.2743V17.3184C19 19.204 19 20.1468 18.4142 20.7326C17.8284 21.3184 16.8856 21.3184 15 21.3184H3.79003C2.24914 21.3184 1 20.0692 1 18.5283V18.5283C1 16.9874 2.24914 15.7383 3.79003 15.7383H15C16.8856 15.7383 17.8284 15.7383 18.4142 15.1525C19 14.5667 19 13.6239 19 11.7383V5.23016C19 3.34454 19 2.40174 18.4142 1.81595C17.8284 1.23016 16.8856 1.23016 15 1.23016H5C3.11438 1.23016 2.17157 1.23016 1.58579 1.81595C1 2.40174 1 3.34455 1 5.23016V18.5283" stroke="#374761" stroke-width="1.2" />
                                            <path d="M6.625 6.81021L13.375 6.81021" stroke="#374761" stroke-width="1.2" stroke-linecap="round" />
                                        </svg>
                                        <a><span>{x.topic}</span></a>
                                    </div>

                                    <div className='icons'>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                <circle cx="15" cy="15" r="4.4" stroke="#374761" stroke-width="1.2"/>
                                                <path d="M25.4469 13.9287C25.8314 14.4088 26.0237 14.6489 26.0237 15C26.0237 15.3511 25.8314 15.5912 25.4469 16.0713C23.7871 18.1438 19.7352 22.5 15 22.5C10.2648 22.5 6.21291 18.1438 4.55311 16.0713C4.16856 15.5912 3.97629 15.3511 3.97629 15C3.97629 14.6489 4.16856 14.4088 4.55311 13.9287C6.21291 11.8562 10.2648 7.5 15 7.5C19.7352 7.5 23.7871 11.8562 25.4469 13.9287Z" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
                                            </svg> */}
                                        <svg onClick={() => {
                                            setLessonTitle(x.topic)
                                            lessonById(x.lesson_id)
                                        }
                                        } xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path d="M15.625 9.375L7.30319 17.6968C7.09066 17.9093 6.98439 18.0156 6.91453 18.1462C6.84466 18.2767 6.81519 18.4241 6.75624 18.7188L5.77209 23.6396C5.70556 23.9722 5.6723 24.1385 5.76691 24.2331C5.86152 24.3277 6.02783 24.2944 6.36044 24.2279L11.2812 23.2438C11.5759 23.1848 11.7233 23.1553 11.8538 23.0855C11.9844 23.0156 12.0907 22.9093 12.3032 22.6968L20.625 14.375L15.625 9.375Z" fill="#374761" />
                                            <path d="M7.20397 24.13L7.05845 23.5479L7.20397 24.13L10.8581 23.2164C10.8743 23.2124 10.8904 23.2084 10.9065 23.2044C11.1253 23.15 11.3356 23.0978 11.5271 22.9894C11.7185 22.881 11.8715 22.7275 12.0307 22.5679C12.0424 22.5561 12.0542 22.5444 12.066 22.5326L21.5101 13.0885L21.5101 13.0885L21.5335 13.065L21.5369 13.0617C21.8472 12.7514 22.1215 12.4772 22.3128 12.2264C22.5202 11.9546 22.6858 11.641 22.6858 11.25C22.6858 10.859 22.5202 10.5454 22.3128 10.2736C22.1215 10.0228 21.8472 9.74864 21.5369 9.43835L21.51 9.41152L20.5885 8.48995L20.5617 8.46314C20.2514 8.1528 19.9772 7.87853 19.7264 7.6872C19.4546 7.47981 19.141 7.31421 18.75 7.31421C18.359 7.31421 18.0454 7.47981 17.7736 7.6872C17.5229 7.87853 17.2486 8.15278 16.9384 8.46311L16.9115 8.48995L7.46745 17.934C7.45565 17.9458 7.44386 17.9576 7.43211 17.9693C7.27249 18.1285 7.11904 18.2815 7.01064 18.4729C6.90225 18.6644 6.84999 18.8747 6.79562 19.0935C6.79162 19.1096 6.78761 19.1257 6.78356 19.1419L5.87003 22.796C5.86762 22.8057 5.86518 22.8154 5.86272 22.8252C5.82411 22.9793 5.78044 23.1535 5.76593 23.3018C5.74978 23.4669 5.75127 23.7662 5.99255 24.0074L6.39257 23.6074L5.99255 24.0075C6.23384 24.2487 6.53307 24.2502 6.6982 24.2341C6.84647 24.2196 7.02075 24.1759 7.17483 24.1373C7.18463 24.1348 7.19435 24.1324 7.20397 24.13Z" stroke="#374761" stroke-width="1.2" />
                                            <path d="M15.625 9.375L20.625 14.375" stroke="#374761" stroke-width="1.2" />
                                        </svg>
                                        <svg onClick={() => {
                                            deleteLesson(x.lesson_id)
                                        }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path d="M22.5 7.53308L7.5 22.5992" stroke="#374761" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7.5 7.53308L22.5 22.5992" stroke="#374761" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            )
                        })
                        }
                        {addingNewLesson ?
                            <div className="module-line">
                                <div className='name-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                                        <path d="M15 15.7383H5.94816C4.41663 15.7383 3.65086 15.7383 3.0037 16.0721C2.93764 16.1062 2.87286 16.1427 2.80951 16.1816C2.18893 16.5626 1.79262 17.2179 1 18.5283V5.23016C1 3.34455 1 2.40174 1.58579 1.81595C2.17157 1.23016 3.11438 1.23016 5 1.23016H15C16.8856 1.23016 17.8284 1.23016 18.4142 1.81595C19 2.40174 19 3.34454 19 5.23016V11.7383C19 13.6239 19 14.5667 18.4142 15.1525C17.8284 15.7383 16.8856 15.7383 15 15.7383Z" fill="#7E869E" fill-opacity="0.25" />
                                        <path d="M19 11.2743V17.3184C19 19.204 19 20.1468 18.4142 20.7326C17.8284 21.3184 16.8856 21.3184 15 21.3184H3.79003C2.24914 21.3184 1 20.0692 1 18.5283V18.5283C1 16.9874 2.24914 15.7383 3.79003 15.7383H15C16.8856 15.7383 17.8284 15.7383 18.4142 15.1525C19 14.5667 19 13.6239 19 11.7383V5.23016C19 3.34454 19 2.40174 18.4142 1.81595C17.8284 1.23016 16.8856 1.23016 15 1.23016H5C3.11438 1.23016 2.17157 1.23016 1.58579 1.81595C1 2.40174 1 3.34455 1 5.23016V18.5283" stroke="#374761" stroke-width="1.2" />
                                        <path d="M6.625 6.81021L13.375 6.81021" stroke="#374761" stroke-width="1.2" stroke-linecap="round" />
                                    </svg>
                                    {/* <a><span>{x.chapter_name}</span>: {x.number_of_lessons} Уроков</a> */}
                                    <a><input className="new-module-name" type="text" value={newLessonName} onChange={(e) => setNewLessonName(e.target.value)} /></a>
                                </div>

                                <div className='icons'>
                                    <div className='save-module' onClick={addLesson}>
                                        <img src={saveButton} alt="save" />
                                        <a>Сохранить</a>
                                    </div>
                                    <div className='save-module-cancel' onClick={() => {
                                        setNewLessonName("Урок №" + (currentLessons?.length + 1))
                                        setAddingNewLesson(false)
                                    }}>
                                        <a>Отменить</a>
                                    </div>
                                </div>
                            </div>
                            : ""
                        }
                        {!addingNewLesson ?
                            <div className='add-line' onClick={() => {
                                setAddingNewLesson(true)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="9.4" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2" />
                                    <path d="M10 13.3333L10 6.66666" stroke="#374761" stroke-width="1.2" stroke-linecap="square" />
                                    <path d="M13.3333 10L6.66659 10" stroke="#374761" stroke-width="1.2" stroke-linecap="square" />
                                </svg>
                                <a>Добавить урок</a>
                            </div>
                            : ""
                        }
                    </div>

                    <div className='add-questionare'>
                        <a>Заполнить вопросы для тестирования</a>
                        <div className='add-questionare-button' onClick={toQuestionnaire}>
                            <img src={hatIcon} alt="save" />
                            <a>Перейти</a>
                        </div>
                    </div>
                </div>

                <div className='annotations'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                            <path d="M10.8334 26.7843L14.7238 27.9866C18.1739 29.0528 21.6668 26.4617 21.6668 22.8361C21.6668 15.4733 30.0001 16.7402 30.0001 8.37009C30.0001 8.37009 12.5001 8.37009 10.2744 26.636L10.8334 26.7843Z" fill="#7E869E" fill-opacity="0.25" />
                            <path d="M10.8333 35.9913L10.2863 29.9485C9.23739 18.3594 18.3634 8.37009 29.9999 8.37009V8.37009" stroke="#374761" />
                        </svg>
                    </div>
                    <div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g opacity="0.75">
                                    <path d="M12.5 7.5L5.92819 14.0718C5.71566 14.2843 5.60939 14.3906 5.53953 14.5212C5.46966 14.6517 5.44019 14.7991 5.38124 15.0938L4.64709 18.7646C4.58057 19.0972 4.5473 19.2635 4.64191 19.3581C4.73652 19.4527 4.90283 19.4194 5.23544 19.3529L8.90621 18.6188C9.20093 18.5598 9.3483 18.5303 9.47885 18.4605C9.60939 18.3906 9.71566 18.2843 9.92819 18.0718L16.5 11.5L12.5 7.5Z" fill="#374761" />
                                    <path d="M5.95396 19.38L5.95397 19.38L5.9801 19.3734L5.98012 19.3734L8.60809 18.7164C8.62428 18.7124 8.64043 18.7084 8.65654 18.7044C8.87531 18.65 9.08562 18.5978 9.27707 18.4894C9.46852 18.381 9.62153 18.2275 9.7807 18.0679C9.79242 18.0561 9.80418 18.0444 9.81598 18.0325L17.0101 10.8385L17.0101 10.8385L17.0369 10.8117C17.3472 10.5014 17.6215 10.2272 17.8128 9.97638C18.0202 9.70457 18.1858 9.39104 18.1858 9C18.1858 8.60896 18.0202 8.29543 17.8128 8.02361C17.6215 7.77285 17.3472 7.49863 17.0369 7.18835L17.01 7.16152L16.8385 6.98995L16.8117 6.96314C16.5014 6.6528 16.2272 6.37853 15.9764 6.1872C15.7046 5.97981 15.391 5.81421 15 5.81421C14.609 5.81421 14.2954 5.97981 14.0236 6.1872C13.7729 6.37853 13.4986 6.65278 13.1884 6.96311L13.1615 6.98995L5.96745 14.184C5.95565 14.1958 5.94386 14.2076 5.93211 14.2193C5.77249 14.3785 5.61904 14.5315 5.51064 14.7229C5.40225 14.9144 5.34999 15.1247 5.29562 15.3435C5.29162 15.3596 5.28761 15.3757 5.28356 15.3919L4.62003 18.046C4.61762 18.0557 4.61518 18.0654 4.61272 18.0752C4.57411 18.2293 4.53044 18.4035 4.51593 18.5518C4.49978 18.7169 4.50127 19.0162 4.74255 19.2574C4.98383 19.4987 5.28307 19.5002 5.44819 19.4841C5.59646 19.4696 5.77072 19.4259 5.92479 19.3873C5.9346 19.3848 5.94433 19.3824 5.95396 19.38Z" stroke="#374761" stroke-width="1.2" />
                                    <path d="M12.5 7.5L16.5 11.5" stroke="#374761" stroke-width="1.2" />
                                </g>
                            </svg>
                            <a>Редактировать урок</a>
                        </div>
                        {/* <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="3.4" stroke="#374761" stroke-opacity="0.75" stroke-width="1.2"/>
                                    <path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
                                </svg>
                                <a>Скрыть урок</a>    
                            </div> */}
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g opacity="0.75">
                                    <path d="M18 6L6 18" stroke="#374761" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6 6L18 18" stroke="#374761" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                            <a>Удалить урок</a>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default ModuleStructure;