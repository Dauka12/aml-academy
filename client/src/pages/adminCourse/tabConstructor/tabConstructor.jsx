import React, { useEffect, useState } from 'react'
import Modal from '../modalWindowOfInputs/ModalWindowInput'
import './tabConstructor.scss'

import QuestionnaireForm from '../fillQuestionnaire/Questionnaire'

//Components

import Reveal from '../../../components/Reveal'
import saveButton from '../images/save-button.svg'

import { BiCopyAlt } from "react-icons/bi"
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io"
import hatIcon from '../images/hat-light-icon.svg'

import axios from 'axios'

import { useNavigate } from 'react-router'
import base_url from '../../../settings/base_url'

import componentMap from './ComponentMap'
import Elements from './Elements'

const ModalConfirm = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onClose}>Отмена</button>
                    <button onClick={onConfirm}>Удалить</button>
                </div>
            </div>
        </div>
    );
};

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}



function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
}

const TabConstructor = ({ saveCancel, save, id }) => {
    const [stepConstructor, setStepConstructor] = useState('structure')
    const [currentModules, setCurrentModules] = useState([])
    const [addingNewModule, setAddingNewModule] = useState(false)
    const [newModuleName, setNewModuleName] = useState("Модуль №" + (currentModules.length + 1))
    const [lesson, setLesson] = useState(0)
    const [title, setTitle] = useState("")
    const [previous, setPrevious] = useState("structure")


    // Try to fetch data of Course using Id propery 
    // if not set modules as empty list and after PRESSING BUTTON of entering into different step
    // execute post method into the API and send current modules into DB
    useEffect(() => {
        axios
            .get(base_url + '/api/aml/chapter/modulesOfCourse', {
                params: {
                    id: id
                }
            })
            .then((res) => {
                setCurrentModules(res.data)
            })
            .catch(function (error) {
                // alert(error)
            })
    }, [id])

    const addModule = () => {
        if (newModuleName !== '') {
            axios
                .post(base_url + '/api/aml/chapter/addModule', { id, newModuleName })
                .then((res) => {
                    setAddingNewModule(false)
                    setCurrentModules(res.data)
                    setNewModuleName("Модуль №" + (res.data.length + 1))
                })
                .catch(function (error) {
                    // alert(error)
                })

        } else {
            alert('Пожалуйста введите название модуля')
        }
    };

    const deleteModule = (moduleId) => {
        axios
            .post(base_url + '/api/aml/chapter/deleteModule', null, {
                params: {
                    id: moduleId
                }
            })
            .then((res) => {
                setCurrentModules(res.data)
                setNewModuleName("Модуль №" + (res.data.length + 1))
            })
            .catch(function (error) {
                // alert(error)
            })
    };



    const lessonsById = (x) => {
        setPrevious("structure")
        setStepConstructor(x.module_id)
    }

    const lessonById = (x) => {
        setPrevious(stepConstructor)
        setStepConstructor('constructor')
        setLesson(x)
    }

    const setLessonTitle = (title) => {
        setTitle(title)
    }

    const toQuestionnaire = () => {
        setPrevious(stepConstructor)
        setStepConstructor('questionnaire')
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const handleDeleteClick = (moduleId) => {
        setModalMessage('Вы точно хотите удалить модуль?');
        setIsModalOpen(true);
    };
    const handleConfirmDelete = ({x}) => {
        // Добавьте ваш метод удаления здесь, например:
        // deleteModule(moduleId);
        deleteModule(x.module_id)
        setIsModalOpen(false);
    };


    return (
        <div className="tab-container">
            {stepConstructor === 'structure' ?
                <h1>Программа курса - конструктор</h1>
                : stepConstructor === 'questionnaire' ?
                    <div className='button-title'>
                        <svg onClick={() => setStepConstructor(previous)} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <path d="M5.6665 14.1667L4.9594 14.8738L4.25229 14.1667L4.9594 13.4596L5.6665 14.1667ZM29.3332 25.5C29.3332 26.0523 28.8855 26.5 28.3332 26.5C27.7809 26.5 27.3332 26.0523 27.3332 25.5L29.3332 25.5ZM12.0427 21.9571L4.9594 14.8738L6.37361 13.4596L13.4569 20.5429L12.0427 21.9571ZM4.9594 13.4596L12.0427 6.37623L13.4569 7.79044L6.37361 14.8738L4.9594 13.4596ZM5.6665 13.1667L22.3332 13.1667L22.3332 15.1667L5.6665 15.1667L5.6665 13.1667ZM29.3332 20.1667L29.3332 25.5L27.3332 25.5L27.3332 20.1667L29.3332 20.1667ZM22.3332 13.1667C26.1992 13.1667 29.3332 16.3007 29.3332 20.1667L27.3332 20.1667C27.3332 17.4052 25.0946 15.1667 22.3332 15.1667L22.3332 13.1667Z" fill="#374761" />
                        </svg>
                        <h1>Тестирование модуля</h1>
                    </div>
                    :
                    stepConstructor !== 'constructor' ?
                        <div className='button-title'>
                            <svg onClick={() => setStepConstructor("structure")} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                <path d="M5.6665 14.1667L4.9594 14.8738L4.25229 14.1667L4.9594 13.4596L5.6665 14.1667ZM29.3332 25.5C29.3332 26.0523 28.8855 26.5 28.3332 26.5C27.7809 26.5 27.3332 26.0523 27.3332 25.5L29.3332 25.5ZM12.0427 21.9571L4.9594 14.8738L6.37361 13.4596L13.4569 20.5429L12.0427 21.9571ZM4.9594 13.4596L12.0427 6.37623L13.4569 7.79044L6.37361 14.8738L4.9594 13.4596ZM5.6665 13.1667L22.3332 13.1667L22.3332 15.1667L5.6665 15.1667L5.6665 13.1667ZM29.3332 20.1667L29.3332 25.5L27.3332 25.5L27.3332 20.1667L29.3332 20.1667ZM22.3332 13.1667C26.1992 13.1667 29.3332 16.3007 29.3332 20.1667L27.3332 20.1667C27.3332 17.4052 25.0946 15.1667 22.3332 15.1667L22.3332 13.1667Z" fill="#374761" />
                            </svg>
                            <h1>Структура модуля</h1>
                        </div>
                        :
                        <div className='button-title'>
                            <svg onClick={() => setStepConstructor(previous)} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                <path d="M5.6665 14.1667L4.9594 14.8738L4.25229 14.1667L4.9594 13.4596L5.6665 14.1667ZM29.3332 25.5C29.3332 26.0523 28.8855 26.5 28.3332 26.5C27.7809 26.5 27.3332 26.0523 27.3332 25.5L29.3332 25.5ZM12.0427 21.9571L4.9594 14.8738L6.37361 13.4596L13.4569 20.5429L12.0427 21.9571ZM4.9594 13.4596L12.0427 6.37623L13.4569 7.79044L6.37361 14.8738L4.9594 13.4596ZM5.6665 13.1667L22.3332 13.1667L22.3332 15.1667L5.6665 15.1667L5.6665 13.1667ZM29.3332 20.1667L29.3332 25.5L27.3332 25.5L27.3332 20.1667L29.3332 20.1667ZM22.3332 13.1667C26.1992 13.1667 29.3332 16.3007 29.3332 20.1667L27.3332 20.1667C27.3332 17.4052 25.0946 15.1667 22.3332 15.1667L22.3332 13.1667Z" fill="#374761" />
                            </svg>
                            <h1 className='lesson-title'>{title}</h1>
                        </div>
            }
            {stepConstructor === 'structure' ?
                <div className="base">
                    <a className="title">Структура</a>
                    <div className="list-of-modules">
                        {currentModules.map((x) => {
                            return (
                                <div className="module-line">
                                    <div className="name-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                                            <path d="M15 15.7383H5.94816C4.41663 15.7383 3.65086 15.7383 3.0037 16.0721C2.93764 16.1062 2.87286 16.1427 2.80951 16.1816C2.18893 16.5626 1.79262 17.2179 1 18.5283V5.23016C1 3.34455 1 2.40174 1.58579 1.81595C2.17157 1.23016 3.11438 1.23016 5 1.23016H15C16.8856 1.23016 17.8284 1.23016 18.4142 1.81595C19 2.40174 19 3.34454 19 5.23016V11.7383C19 13.6239 19 14.5667 18.4142 15.1525C17.8284 15.7383 16.8856 15.7383 15 15.7383Z" fill="#7E869E" fill-opacity="0.25" />
                                            <path d="M19 11.2743V17.3184C19 19.204 19 20.1468 18.4142 20.7326C17.8284 21.3184 16.8856 21.3184 15 21.3184H3.79003C2.24914 21.3184 1 20.0692 1 18.5283V18.5283C1 16.9874 2.24914 15.7383 3.79003 15.7383H15C16.8856 15.7383 17.8284 15.7383 18.4142 15.1525C19 14.5667 19 13.6239 19 11.7383V5.23016C19 3.34454 19 2.40174 18.4142 1.81595C17.8284 1.23016 16.8856 1.23016 15 1.23016H5C3.11438 1.23016 2.17157 1.23016 1.58579 1.81595C1 2.40174 1 3.34455 1 5.23016V18.5283" stroke="#374761" stroke-width="1.2" />
                                            <path d="M6.625 6.81021L13.375 6.81021" stroke="#374761" stroke-width="1.2" stroke-linecap="round" />
                                        </svg>
                                        <a><span>{x.name}</span>: {x.lessons != null ? x.lessons.length : 0} Уроков</a>
                                    </div>

                                    <div className='icons'>
                                        <svg onClick={() => lessonsById(x)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path d="M15.625 9.375L7.30319 17.6968C7.09066 17.9093 6.98439 18.0156 6.91453 18.1462C6.84466 18.2767 6.81519 18.4241 6.75624 18.7188L5.77209 23.6396C5.70556 23.9722 5.6723 24.1385 5.76691 24.2331C5.86152 24.3277 6.02783 24.2944 6.36044 24.2279L11.2812 23.2438C11.5759 23.1848 11.7233 23.1553 11.8538 23.0855C11.9844 23.0156 12.0907 22.9093 12.3032 22.6968L20.625 14.375L15.625 9.375Z" fill="#374761" />
                                            <path d="M7.20397 24.13L7.05845 23.5479L7.20397 24.13L10.8581 23.2164C10.8743 23.2124 10.8904 23.2084 10.9065 23.2044C11.1253 23.15 11.3356 23.0978 11.5271 22.9894C11.7185 22.881 11.8715 22.7275 12.0307 22.5679C12.0424 22.5561 12.0542 22.5444 12.066 22.5326L21.5101 13.0885L21.5101 13.0885L21.5335 13.065L21.5369 13.0617C21.8472 12.7514 22.1215 12.4772 22.3128 12.2264C22.5202 11.9546 22.6858 11.641 22.6858 11.25C22.6858 10.859 22.5202 10.5454 22.3128 10.2736C22.1215 10.0228 21.8472 9.74864 21.5369 9.43835L21.51 9.41152L20.5885 8.48995L20.5617 8.46314C20.2514 8.1528 19.9772 7.87853 19.7264 7.6872C19.4546 7.47981 19.141 7.31421 18.75 7.31421C18.359 7.31421 18.0454 7.47981 17.7736 7.6872C17.5229 7.87853 17.2486 8.15278 16.9384 8.46311L16.9115 8.48995L7.46745 17.934C7.45565 17.9458 7.44386 17.9576 7.43211 17.9693C7.27249 18.1285 7.11904 18.2815 7.01064 18.4729C6.90225 18.6644 6.84999 18.8747 6.79562 19.0935C6.79162 19.1096 6.78761 19.1257 6.78356 19.1419L5.87003 22.796C5.86762 22.8057 5.86518 22.8154 5.86272 22.8252C5.82411 22.9793 5.78044 23.1535 5.76593 23.3018C5.74978 23.4669 5.75127 23.7662 5.99255 24.0074L6.39257 23.6074L5.99255 24.0075C6.23384 24.2487 6.53307 24.2502 6.6982 24.2341C6.84647 24.2196 7.02075 24.1759 7.17483 24.1373C7.18463 24.1348 7.19435 24.1324 7.20397 24.13Z" stroke="#374761" stroke-width="1.2" />
                                            <path d="M15.625 9.375L20.625 14.375" stroke="#374761" stroke-width="1.2" />
                                        </svg>
                                        <svg onClick={() => handleDeleteClick(x.module_id)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path d="M22.5 7.53308L7.5 22.5992" stroke="#374761" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7.5 7.53308L22.5 22.5992" stroke="#374761" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>

                                    <ModalConfirm
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        onConfirm={handleConfirmDelete(x.module_id)}
                                        message={modalMessage}
                                    />
                                </div>
                            );
                        })
                        }
                        {addingNewModule ?
                            <div className="module-line">
                                <div className='name-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                                        <path d="M15 15.7383H5.94816C4.41663 15.7383 3.65086 15.7383 3.0037 16.0721C2.93764 16.1062 2.87286 16.1427 2.80951 16.1816C2.18893 16.5626 1.79262 17.2179 1 18.5283V5.23016C1 3.34455 1 2.40174 1.58579 1.81595C2.17157 1.23016 3.11438 1.23016 5 1.23016H15C16.8856 1.23016 17.8284 1.23016 18.4142 1.81595C19 2.40174 19 3.34454 19 5.23016V11.7383C19 13.6239 19 14.5667 18.4142 15.1525C17.8284 15.7383 16.8856 15.7383 15 15.7383Z" fill="#7E869E" fill-opacity="0.25" />
                                        <path d="M19 11.2743V17.3184C19 19.204 19 20.1468 18.4142 20.7326C17.8284 21.3184 16.8856 21.3184 15 21.3184H3.79003C2.24914 21.3184 1 20.0692 1 18.5283V18.5283C1 16.9874 2.24914 15.7383 3.79003 15.7383H15C16.8856 15.7383 17.8284 15.7383 18.4142 15.1525C19 14.5667 19 13.6239 19 11.7383V5.23016C19 3.34454 19 2.40174 18.4142 1.81595C17.8284 1.23016 16.8856 1.23016 15 1.23016H5C3.11438 1.23016 2.17157 1.23016 1.58579 1.81595C1 2.40174 1 3.34455 1 5.23016V18.5283" stroke="#374761" stroke-width="1.2" />
                                        <path d="M6.625 6.81021L13.375 6.81021" stroke="#374761" stroke-width="1.2" stroke-linecap="round" />
                                    </svg>
                                    {/* <a><span>{x.chapter_name}</span>: {x.number_of_lessons} Уроков</a> */}
                                    <a><input className="new-module-name" type="text" value={newModuleName} onChange={(e) => setNewModuleName(e.target.value)} /></a>
                                </div>

                                <div className='icons'>
                                    <div className='save-module' onClick={addModule}>
                                        <img src={saveButton} alt="save" />
                                        <a>Сохранить</a>
                                    </div>
                                    <div className='save-module-cancel' onClick={() => {
                                        setNewModuleName("Модуль №" + (currentModules.length + 1))
                                        setAddingNewModule(false)
                                    }}>
                                        <a>Отменить</a>
                                    </div>
                                </div>
                            </div>
                            : ""
                        }
                        {!addingNewModule ?
                            <div className='add-line' onClick={() => {
                                setAddingNewModule(true)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="9.4" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2" />
                                    <path d="M10 13.3333L10 6.66666" stroke="#374761" stroke-width="1.2" stroke-linecap="square" />
                                    <path d="M13.3333 10L6.66659 10" stroke="#374761" stroke-width="1.2" stroke-linecap="square" />
                                </svg>
                                <a>Добавить модуль</a>
                            </div>
                            : ""
                        }
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
                                <a>Редактировать модуль</a>
                            </div>
                            {/* <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="3.4" stroke="#374761" stroke-opacity="0.75" stroke-width="1.2"/>
                                <path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
                            </svg>
                            <a>Скрыть модуль</a>    
                        </div> */}
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g opacity="0.75">
                                        <path d="M18 6L6 18" stroke="#374761" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 6L18 18" stroke="#374761" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                                <a>Удалить модуль</a>
                            </div>
                        </div>
                    </div>

                </div>
                : stepConstructor === 'questionnaire' ?
                    <QuestionnaireForm id={previous} saveCancel={saveCancel} save={save} />
                    :
                    stepConstructor !== 'constructor' ? <ModuleStructure id={stepConstructor} toQuestionnaire={toQuestionnaire} setLessonTitle={setLessonTitle} lessonById={lessonById} />
                        :
                        <Constructor saveCancel={saveCancel} save={save} id={lesson} title={title} />
            }


        </div>
    )
}

const Constructor = ({ saveCancel, save, id, title }) => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [componentHistory, setComponentHistory] = useState([]);

    const [destination, setDestination] = useState(null);

    useEffect(() => {
        axios
            .get(base_url + '/api/aml/chapter/getComponents', { params: { id } })
            .then((res) => {
                let newComponents = res.data.map(item => {
                    // Find the category and component that matches the componentName
                    let inputs = null;
                    for (const category in Elements) {
                        for (const element in Elements[category]) {

                            if (Elements[category][element].name === item.componentName) {
                                inputs = Elements[category][element].inputs;
                                break;
                            }
                        }
                    }

                    let values = item.values.values;
                    // Reverse the stringification for each value
                    Object.keys(values).forEach(key => {
                        try {
                            // Attempt to parse each value; if it's not JSON, it'll throw an error and just use the original value
                            values[key] = JSON.parse(values[key]);
                        } catch (e) {
                            // If parsing fails, keep the original value
                            values[key] = values[key];
                        }
                    });

                    return {
                        component_entry_id: item.component_entry_id,
                        componentName: item.componentName,
                        values: values,
                        inputs: inputs,
                    };
                });
                setComponentHistory(newComponents)
            })
    }, [])

    useEffect(() => {

        if (save) {
            // Clone the componentHistory to avoid direct state mutation
            let modifiedHistory = JSON.parse(JSON.stringify(componentHistory));
            modifiedHistory.forEach(item => {
                Object.keys(item.values).forEach(key => {
                    // Stringify every value, regardless of its type
                    if (item.values[key] !== undefined) {
                        item.values[key] = JSON.stringify(item.values[key]);
                    }
                });
            });

            axios
                .post(base_url + '/api/aml/chapter/saveComponents/' + id,
                    modifiedHistory, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    saveCancel()
                })
                .catch(function (error) {
                    console.error(error); // Handle error
                })
        }
    }, [save, componentHistory, id, saveCancel])


    const handleElementClick = ({ ElementComponent, InputsOfElement, ElementExample }) => {
        // const newComponent = { componentName: ElementComponent.name, inputs: InputsOfElement, values: {} };
        // setSelectedComponent(newComponent);
        let key = getKeyByValue(componentMap, ElementComponent);
        const newComponent = {
            component_entry_id: generateUniqueId(),
            componentName: key,
            example: ElementExample,
            inputs: InputsOfElement || [],
            values: {},
        };

        // Check if the clicked element is an existing component from componentHistory
        const existingComponentIndex = componentHistory.findIndex(
            (item) => item.component_entry_id === newComponent.component_entry_id
        );

        if (existingComponentIndex !== -1) {
            // If it's an existing component, trigger editing
            handleEditComponent(existingComponentIndex);
        } else {
            // If it's a new element, set as selected component
            setSelectedComponent(newComponent);
        }
    };

    const handleAdvancedSelect = (destination) => {
        setDestination(destination);
    }

    const handleEditComponent = (index) => {
        const editedComponent = componentHistory[index];
        setSelectedComponent(editedComponent);
        // Open the modal for editing
    };

    const handleCloseModal = () => {
        setSelectedComponent(null);
    };

    const handleModalSubmit = ({ inputs, values }) => {
        const existingComponentIndex = componentHistory.findIndex(
            (item) => item.component_entry_id === selectedComponent.component_entry_id
        );
        if (existingComponentIndex !== -1) {
            // If it's an existing component, update the values
            setComponentHistory((prevHistory) => [
                ...prevHistory.slice(0, existingComponentIndex),
                { ...prevHistory[existingComponentIndex], values },
                ...prevHistory.slice(existingComponentIndex + 1),
            ]);
        } else {

            if (destination === null) {

                setComponentHistory((prevHistory) => {
                    console.log(values)
                    return [
                        ...prevHistory,
                        { component_entry_id: generateUniqueId(), componentName: selectedComponent.componentName, inputs, values },
                    ]
                });

            } else {

                handleAddToDestination(destination, inputs, values);

            }
        }

        handleCloseModal();
    };

    const handleAddToDestination = (destination, inputs, values) => {
        const colon_i = destination.indexOf(':');
        const second_colon_i = destination.indexOf(':', colon_i + 1);

        const index = destination.substring(0, colon_i);
        const dest_name = destination.substring(colon_i + 1, second_colon_i);
        const detail = destination.substring(second_colon_i + 1)

        if (dest_name === 'TwoColumnsDivider') {
            setComponentHistory((prevHistory) => {
                // let _updated = [...prevHistory]
                // _updated[index] = 

                return [
                    ...prevHistory.slice(0, index),
                    {
                        ...prevHistory[index],
                        values: {
                            ...prevHistory[index].values,
                            [detail]: {
                                component_entry_id: generateUniqueId(), componentName: selectedComponent.componentName, inputs, values
                            }
                        }
                    },
                    ...prevHistory.slice(index + 1),
                ]
            });
        }

        console.log(index, dest_name, detail);
    }

    const handleDeleteComponent = (index) => {
        const updatedHistory = [...componentHistory];

        updatedHistory.splice(index, 1);

        setComponentHistory(updatedHistory);
    };

    const handleMoveUp = (index) => {
        if (index > 0) {
            const updatedHistory = [...componentHistory];
            [updatedHistory[index], updatedHistory[index - 1]] = [updatedHistory[index - 1], updatedHistory[index]];


            setComponentHistory(updatedHistory);
        }
    };

    const handleMoveDown = (index) => {
        if (index < componentHistory.length - 1) {
            const updatedHistory = [...componentHistory];
            [updatedHistory[index], updatedHistory[index + 1]] = [updatedHistory[index + 1], updatedHistory[index]];

            setComponentHistory(updatedHistory);
        }
    };

    const handleCopy = (index) => {
        const original = componentHistory[index];
        const duplicate = { ...original, component_entry_id: generateUniqueId() };

        const updatedHistory = [...componentHistory];
        // Insert the duplicate right after the original component
        updatedHistory.splice(index + 1, 0, duplicate);

        setComponentHistory(updatedHistory);
    };

    return (
        <div className='constructor'>
            <div className='display'>
                <div className='components'>

                    {componentHistory.map((item, index) => {

                        if (item.componentName === 'TwoColumnsDivider') {
                            return <TwoColumnsDividerConstuctor
                                index={index}
                                handleDeleteComponent={handleDeleteComponent}
                                handleMoveUp={handleMoveUp}
                                handleMoveDown={handleMoveDown}
                                handleCopy={handleCopy}
                                item={item}

                                handleAdvancedSelect={handleAdvancedSelect}
                            />
                        }

                        return (

                            <div className='component-display' key={index}>
                                <div className='component-edit'>
                                    <svg onClick={() => handleDeleteComponent(index)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M1 1L15 15M1.00003 15L8.00003 8L15 1" stroke="#2D264B" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                    <svg onClick={() => handleEditComponent(index)} xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18" fill="none">
                                        <path d="M6.53118 16.0199L6.25825 15.3213L6.53118 16.0199ZM2.47478 16.7988L2.09978 17.4483L2.09978 17.4483L2.47478 16.7988ZM1.12116 12.8964L0.379715 13.0093L1.12116 12.8964ZM1.61146 10.2941L2.26098 10.6691L1.61146 10.2941ZM1.02731 11.5314L0.290281 11.3925H0.290281L1.02731 11.5314ZM8.53967 14.2941L9.18918 14.6691L8.53967 14.2941ZM7.76024 15.4186L8.24902 15.9875H8.24902L7.76024 15.4186ZM5.4099 3.71503L4.76038 3.34003L5.4099 3.71503ZM11.6886 7.34003L7.89015 13.9191L9.18918 14.6691L12.9876 8.09003L11.6886 7.34003ZM2.26098 10.6691L6.05942 4.09003L4.76038 3.34003L0.961943 9.91912L2.26098 10.6691ZM6.25825 15.3213C5.16178 15.7497 4.41502 16.0394 3.83854 16.1741C3.28167 16.3042 3.02898 16.2527 2.84978 16.1493L2.09978 17.4483C2.75305 17.8255 3.45392 17.8044 4.17981 17.6348C4.88609 17.4698 5.75129 17.1298 6.80411 16.7184L6.25825 15.3213ZM0.379715 13.0093C0.549904 14.1267 0.688048 15.046 0.898285 15.7402C1.11436 16.4536 1.44651 17.0712 2.09978 17.4483L2.84978 16.1493C2.67059 16.0458 2.49965 15.8527 2.33389 15.3054C2.16229 14.7388 2.03986 13.9472 1.86261 12.7835L0.379715 13.0093ZM0.961943 9.91912C0.640122 10.4765 0.382457 10.9033 0.290281 11.3925L1.76434 11.6702C1.7983 11.49 1.88802 11.3151 2.26098 10.6691L0.961943 9.91912ZM1.86261 12.7835C1.7503 12.046 1.73039 11.8505 1.76434 11.6702L0.290281 11.3925C0.198105 11.8817 0.282803 12.373 0.379715 13.0093L1.86261 12.7835ZM7.89015 13.9191C7.51719 14.5651 7.41055 14.7303 7.27146 14.8498L8.24902 15.9875C8.62661 15.6631 8.86736 15.2265 9.18918 14.6691L7.89015 13.9191ZM6.80411 16.7184C7.40362 16.4842 7.87142 16.3119 8.24902 15.9875L7.27146 14.8498C7.13237 14.9693 6.95303 15.0498 6.25825 15.3213L6.80411 16.7184ZM10.499 2.90045C11.3339 3.38245 11.8939 3.70761 12.2797 4.00537C12.6483 4.28983 12.7658 4.48144 12.8135 4.65945L14.2623 4.27123C14.0956 3.64904 13.6976 3.20485 13.1961 2.81785C12.7119 2.44416 12.0471 2.06221 11.249 1.60141L10.499 2.90045ZM12.9876 8.09003C13.4484 7.29189 13.8331 6.62875 14.0657 6.06299C14.3065 5.47711 14.4291 4.89341 14.2623 4.27123L12.8135 4.65945C12.8612 4.83747 12.8553 5.06212 12.6783 5.49278C12.493 5.94357 12.1706 6.50517 11.6886 7.34003L12.9876 8.09003ZM11.249 1.60141C10.4509 1.1406 9.78772 0.755898 9.22197 0.523373C8.63608 0.282573 8.05238 0.159968 7.4302 0.326681L7.81843 1.77557C7.99644 1.72787 8.22109 1.73376 8.65175 1.91076C9.10254 2.09604 9.66414 2.41844 10.499 2.90045L11.249 1.60141ZM6.05942 4.09003C6.54142 3.25517 6.86658 2.69516 7.16434 2.30931C7.4488 1.9407 7.64041 1.82327 7.81843 1.77557L7.4302 0.326681C6.80801 0.493395 6.36382 0.891423 5.97683 1.39291C5.60313 1.87716 5.22118 2.54189 4.76038 3.34003L6.05942 4.09003ZM12.7131 7.06551L5.7849 3.06551L5.0349 4.36455L11.9631 8.36455L12.7131 7.06551Z" fill="#2D264B" />
                                    </svg>
                                    <IoMdArrowUp onClick={() => handleMoveUp(index)} size={20} />
                                    <IoMdArrowDown onClick={() => handleMoveDown(index)} size={20} />
                                    {item.componentName === 'Sizebox'
                                        ? (
                                            <BiCopyAlt onClick={() => handleCopy(index)} size={20} />
                                        ) : null}
                                    {/* <BiCopyAlt onClick={() => handleCopy(index)} size={20}/> */}
                                </div>
                                <Reveal>
                                    {
                                        componentMap[item.componentName] && (
                                            React.createElement(componentMap[item.componentName], item.values)
                                        )
                                    }
                                </Reveal>
                            </div>
                        )
                    })}

                </div>

                {selectedComponent && (
                    <div className='modal-window'>
                        <Modal
                            onClose={handleCloseModal}
                            example={selectedComponent.example}
                            inputs={selectedComponent.inputs}
                            onSubmit={handleModalSubmit}
                            exValues={selectedComponent.values || {}}
                        />
                    </div>
                )}


            </div>
            <div className='tool-bar'>

                <h3>Элементы</h3>
                <a onClick={() => {
                    console.log(componentHistory)
                }} style={{ color: 'white', cursor: 'default' }}>CONSOLE.LOG</a>
                <div className='elements'>
                    {Object.entries(Elements).map(([groupName, groupElements]) => (
                        <div className='element-group' key={groupName}>
                            <h4>{groupName}</h4>
                            <div className='element-grid'>
                                {Object.entries(groupElements).map((item) => {
                                    const [ElementName, { component: ElementComponent, name: ComponentName, icon: ElementIcon, inputs: InputsOfElement, example: ElementExample }] = item;

                                    if (ElementName === 'Разделитель на две колонны') {
                                        return <Element
                                            ElementName={ElementName}
                                            ElementIcon={ElementIcon}
                                            ElementComponent={ElementComponent}
                                            InputsOfElement={InputsOfElement}
                                            ElementExample={ElementExample}
                                            handleElementClick={() => {
                                                const _values = {
                                                    'left': null,
                                                    'right': null,
                                                    'gap': 10,
                                                    'version': 2
                                                }

                                                setComponentHistory((prevHistory) => {
                                                    return [
                                                        ...prevHistory,
                                                        { component_entry_id: generateUniqueId(), componentName: ComponentName, InputsOfElement, values: _values },
                                                    ]
                                                });
                                            }}
                                        />
                                    }

                                    return <Element
                                        ElementName={ElementName}
                                        ElementIcon={ElementIcon}
                                        ElementComponent={ElementComponent}
                                        InputsOfElement={InputsOfElement}
                                        ElementExample={ElementExample}
                                        handleElementClick={handleElementClick}
                                    />
                                })}
                            </div>
                        </div>
                    ))}
                </div>


            </div>


        </div>
    )
}

const TwoColumnsDividerConstuctor = ({
    index,
    handleDeleteComponent,

    handleMoveUp,
    handleMoveDown,
    handleCopy,

    item,
    handleAdvancedSelect
}) => {
    console.log("Two Columns Divider", item)

    const [highlighIndex, setHighlighIndex] = useState(0);

    useEffect(() => {
        if (highlighIndex === 1) {
            handleAdvancedSelect(`${index}:TwoColumnsDivider:left`)
        } else if (highlighIndex === 2) {
            handleAdvancedSelect(`${index}:TwoColumnsDivider:right`)
        } else if (highlighIndex === 0) {
            handleAdvancedSelect(null)
        }
    }, [highlighIndex])

    return (

        <div className='component-display' key={index}>
            <div className='component-edit'>
                <svg onClick={() => handleDeleteComponent(index)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 1L15 15M1.00003 15L8.00003 8L15 1" stroke="#2D264B" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                {/* <svg onClick={() => handleEditComponent(index)} xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18" fill="none">
                    <path d="M6.53118 16.0199L6.25825 15.3213L6.53118 16.0199ZM2.47478 16.7988L2.09978 17.4483L2.09978 17.4483L2.47478 16.7988ZM1.12116 12.8964L0.379715 13.0093L1.12116 12.8964ZM1.61146 10.2941L2.26098 10.6691L1.61146 10.2941ZM1.02731 11.5314L0.290281 11.3925H0.290281L1.02731 11.5314ZM8.53967 14.2941L9.18918 14.6691L8.53967 14.2941ZM7.76024 15.4186L8.24902 15.9875H8.24902L7.76024 15.4186ZM5.4099 3.71503L4.76038 3.34003L5.4099 3.71503ZM11.6886 7.34003L7.89015 13.9191L9.18918 14.6691L12.9876 8.09003L11.6886 7.34003ZM2.26098 10.6691L6.05942 4.09003L4.76038 3.34003L0.961943 9.91912L2.26098 10.6691ZM6.25825 15.3213C5.16178 15.7497 4.41502 16.0394 3.83854 16.1741C3.28167 16.3042 3.02898 16.2527 2.84978 16.1493L2.09978 17.4483C2.75305 17.8255 3.45392 17.8044 4.17981 17.6348C4.88609 17.4698 5.75129 17.1298 6.80411 16.7184L6.25825 15.3213ZM0.379715 13.0093C0.549904 14.1267 0.688048 15.046 0.898285 15.7402C1.11436 16.4536 1.44651 17.0712 2.09978 17.4483L2.84978 16.1493C2.67059 16.0458 2.49965 15.8527 2.33389 15.3054C2.16229 14.7388 2.03986 13.9472 1.86261 12.7835L0.379715 13.0093ZM0.961943 9.91912C0.640122 10.4765 0.382457 10.9033 0.290281 11.3925L1.76434 11.6702C1.7983 11.49 1.88802 11.3151 2.26098 10.6691L0.961943 9.91912ZM1.86261 12.7835C1.7503 12.046 1.73039 11.8505 1.76434 11.6702L0.290281 11.3925C0.198105 11.8817 0.282803 12.373 0.379715 13.0093L1.86261 12.7835ZM7.89015 13.9191C7.51719 14.5651 7.41055 14.7303 7.27146 14.8498L8.24902 15.9875C8.62661 15.6631 8.86736 15.2265 9.18918 14.6691L7.89015 13.9191ZM6.80411 16.7184C7.40362 16.4842 7.87142 16.3119 8.24902 15.9875L7.27146 14.8498C7.13237 14.9693 6.95303 15.0498 6.25825 15.3213L6.80411 16.7184ZM10.499 2.90045C11.3339 3.38245 11.8939 3.70761 12.2797 4.00537C12.6483 4.28983 12.7658 4.48144 12.8135 4.65945L14.2623 4.27123C14.0956 3.64904 13.6976 3.20485 13.1961 2.81785C12.7119 2.44416 12.0471 2.06221 11.249 1.60141L10.499 2.90045ZM12.9876 8.09003C13.4484 7.29189 13.8331 6.62875 14.0657 6.06299C14.3065 5.47711 14.4291 4.89341 14.2623 4.27123L12.8135 4.65945C12.8612 4.83747 12.8553 5.06212 12.6783 5.49278C12.493 5.94357 12.1706 6.50517 11.6886 7.34003L12.9876 8.09003ZM11.249 1.60141C10.4509 1.1406 9.78772 0.755898 9.22197 0.523373C8.63608 0.282573 8.05238 0.159968 7.4302 0.326681L7.81843 1.77557C7.99644 1.72787 8.22109 1.73376 8.65175 1.91076C9.10254 2.09604 9.66414 2.41844 10.499 2.90045L11.249 1.60141ZM6.05942 4.09003C6.54142 3.25517 6.86658 2.69516 7.16434 2.30931C7.4488 1.9407 7.64041 1.82327 7.81843 1.77557L7.4302 0.326681C6.80801 0.493395 6.36382 0.891423 5.97683 1.39291C5.60313 1.87716 5.22118 2.54189 4.76038 3.34003L6.05942 4.09003ZM12.7131 7.06551L5.7849 3.06551L5.0349 4.36455L11.9631 8.36455L12.7131 7.06551Z" fill="#2D264B"/>
                </svg> */}
                <IoMdArrowUp onClick={() => handleMoveUp(index)} size={20} />
                <IoMdArrowDown onClick={() => handleMoveDown(index)} size={20} />
                {/* <BiCopyAlt onClick={() => handleCopy(index)} size={20}/> */}
            </div>

            <div className="c-two-columns-divider">
                <p>В самом курсе элемент будет выглядить по другому</p>
                {/* <div className='gap-input'>
                    <label>Расстояние</label>
                    <input type="text" />
                </div> */}
                <div className="wrapper">

                    <div
                        className={`left ${highlighIndex === 1 ? 'highlighted' : null}`}
                        onClick={() => {
                            setHighlighIndex(prev => {
                                if (prev === 1) return 0;
                                else return 1;
                            })
                        }}
                    >
                        {
                            item.values['left'] !== null
                                ? (

                                    componentMap[item.values['left'].componentName] && (
                                        React.createElement(componentMap[item.values['left'].componentName], item.values['left'].values)
                                    )

                                )
                                : <p>Чтобы добавить элемент, выделите и нажмите на элемент</p>
                        }
                    </div>

                    <div
                        className={`right ${highlighIndex === 2 ? 'highlighted' : null}`}
                        onClick={() => {
                            setHighlighIndex(prev => {
                                if (prev === 2) return 0;
                                else return 2;
                            })
                        }}
                    >
                        {
                            item.values['right'] !== null
                                ? (

                                    componentMap[item.values['right'].componentName] && (
                                        React.createElement(componentMap[item.values['right'].componentName], item.values['right'].values)
                                    )

                                )
                                : <p>Чтобы добавить элемент, выделите и нажмите на элемент</p>
                        }
                    </div>

                </div>
            </div>

            {/* <Reveal>
                {
                    componentMap[item.componentName] && (
                        React.createElement(componentMap[item.componentName], item.values)
                    ) 
                }
            </Reveal> */}
        </div>
    )
}

const Element = ({
    ElementName,
    ElementIcon,
    ElementComponent,
    InputsOfElement,
    ElementExample,
    handleElementClick
}) => {
    const handleElementMouseEnter = () => {
        setShowExample(true);
    }

    const handleElementMouseExit = () => {
        setShowExample(false);
    }

    const [showExample, setShowExample] = useState(false);

    return (
        <div
            className='element'
            key={ElementName}
            onClick={() => handleElementClick({ ElementComponent, InputsOfElement, ElementExample })}
            onMouseEnter={() => handleElementMouseEnter()}
            onMouseLeave={() => handleElementMouseExit()}

        >                                        {/* Display the icon */}
            <img src={ElementIcon} alt={`Icon for ${ElementName}`} />

            <a>{ElementName}</a>

            {/* {
                ElementExample && showExample
                    ? <div className="example-image-wrapper">
                        <p>Как будет выглядеть: </p>
                        <img 
                            className='example-image'
                            src={ElementExample}
                        />
                    </div>
                    : null
            } */}
        </div>
    )
}

const ModuleStructure = ({ id, toQuestionnaire, lessonById, setLessonTitle }) => {
    const navigate = useNavigate()
    const [module, setModule] = useState({
        title: '',
        number_of_lessons: 0
    })
    const [currentLessons, setCurrentLessons] = useState([])

    //creation of newLesson
    const [newLessonName, setNewLessonName] = useState("Урок №" + (currentLessons.length + 1))
    const [addingNewLesson, setAddingNewLesson] = useState(false)


    useEffect(() => {
        axios
            .get(base_url + '/api/aml/chapter/lessonsByModuleId', {
                params: {
                    id
                }
            })
            .then((res) => {
                setModule({
                    title: res.data.name || "",
                    number_of_lessons: res.data.lessons.filter(x => x._active === true).length || 0
                })
                setNewLessonName("Урок №" + (res.data.lessons.length + 1))
                setCurrentLessons(res.data.lessons || [])
            })
            .catch(function (error) {
                alert(error)
            })

    }, [id])

    const addLesson = () => {
        if (newLessonName !== '') {
            axios
                .post(base_url + '/api/aml/chapter/addLesson', { id, newLessonName })
                .then((res) => {
                    setAddingNewLesson(false)
                    setCurrentLessons(res.data)
                    setNewLessonName("Урок №" + (res.data.length + 1))
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            alert('Пожалуйста введите название урока')
        }
    };

    const deleteLesson = (lessonId) => {
        axios
            .post(base_url + '/api/aml/chapter/deleteLesson', null, {
                params: {
                    id: lessonId
                }
            })
            .then((res) => {
                setCurrentLessons(res.data)
                setNewLessonName("Урок №" + (res.data.length + 1))
            })
            .catch(function (error) {
                // alert(error)
            })
    };


    return (
        <div className="base">
            <a className="title">{module.title}<span>: {module.number_of_lessons} Уроков</span></a>
            <div className="list-of-modules">
                {currentLessons.filter(x => x._active === true).map((x, index) => {
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
                                setNewLessonName("Урок №" + (currentLessons.length + 1))
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
    )
}

export default TabConstructor