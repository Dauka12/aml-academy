import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import base_url from "../../../settings/base_url";
import './faqStep.scss';

const FAQStep = ({ nextStep, id }) => {
    const [what_course_represents, setWhat_course_represents] = useState("")
    const [who_course_intended_for, setWho_course_intended_for] = useState("")
    const [what_is_duration, setWhat_is_duration] = useState("ru")
    const [what_is_availability, setWhat_is_availability] = useState("")
    const [what_is_agenda_of_course, setWhat_is_agenda_of_course] = useState("")
    const [what_you_will_get, setWhat_you_will_get] = useState("")
    const navigate = useNavigate()

    const [isMounted, setIsMounted] = useState(true);

    const [editingExisting, setEditingExisting] = useState(false)

    useEffect(() => {
        if (id != 0) {
            axios
                .get(base_url + "/api/aml/course/basicInfoCourse", {
                    params: {
                        id: id
                    }
                })
                .then((res) => {
                    setWhat_course_represents(res.data.what_course_represents || "")
                    setWho_course_intended_for(res.data.who_course_intended_for || "")
                    setWhat_is_duration(res.data.what_is_duration || "")
                    setWhat_is_availability(res.data.what_is_availability || "")
                    setWhat_is_agenda_of_course(res.data.what_is_agenda_of_course || "")
                    setWhat_you_will_get(res.data.what_you_will_get || "")
                    setEditingExisting(true)
                    console.log(res.data.what_course_represents)
                })
        }
    }, [id])
    const saveAndNext = () => {
        let urlPath = '/api/aml/course/saveBasicInfoDraft'

        if (editingExisting) {
            urlPath = '/api/aml/course/updateNoBasicInfo/' + id
        }
        let formData = {
            what_course_represents,
            what_is_availability,
            what_is_agenda_of_course,
            what_you_will_get,
            who_course_intended_for,
            what_is_duration,
        };

        // Check if any of the values are still in their initial state
        if (
            Object.values(formData).some(value => value === '' || value === 0)
        ) {
            // Alert the user to fill in all the fields
            alert('Для продолжения необходимо заполнить все поля');
        } else {
            formData = {
                what_course_represents,
                what_is_availability,
                what_is_agenda_of_course,
                what_you_will_get,
                who_course_intended_for,
                what_is_duration,
            };

            axios
                .post(base_url + urlPath, formData)
                .then((res) => {
                    // console.log(res.data)
                    nextStep(res.data);
                })

            // Call your nextStep function or perform any other action
        }
    }

    return (
        <div className="tab-container">
            <h1>Раздел FAQ</h1>
            <div className="questions">
                <a className="title">Ответьте на часто задаваемые вопросы</a>
                <div className="answers">
                    <div>
                        <label htmlFor="course-is">Что из себя представляет данный курс?</label>
                        <input value={what_course_represents} onChange={(e) => {
                            setWhat_course_represents(e.target.value)
                        }} type="text" name="course-is" id="course-is" placeholder="Введите ответ" />
                    </div>
                    <div>
                        <label htmlFor="course-for-whom">Для кого предназначен курс?</label>
                        <input value={who_course_intended_for} onChange={(e) => {
                            setWho_course_intended_for(e.target.value)
                        }} type="text" name="course-for-whom" id="course-for-whom" placeholder="Введите ответ" />
                    </div>
                    <div>
                        <label htmlFor="course-duration">Длительность курса</label>
                        <input value={what_is_duration} onChange={(e) => {
                            setWhat_is_duration(e.target.value)
                        }} type="text" name="course-duration" id="course-duration" placeholder="Введите ответ" />
                    </div>
                    <div>
                        <label htmlFor="course-near">Доступность курса</label>
                        <input value={what_is_availability} onChange={(e) => {
                            setWhat_is_availability(e.target.value)
                        }} type="text" name="course-near" id="course-near" placeholder="Введите ответ" />
                    </div>
                    <div>
                        <label htmlFor="course-content">Программа курса</label>
                        <input value={what_is_agenda_of_course} onChange={(e) => {
                            setWhat_is_agenda_of_course(e.target.value)
                        }} type="text" name="course-content" id="course-content" placeholder="Введите ответ" />
                    </div>
                    <div>
                        <label htmlFor="course-price">Что вы получите?</label>
                        <input value={what_you_will_get} onChange={(e) => {
                            setWhat_you_will_get(e.target.value)
                        }} type="text" name="course-price" id="course-price" placeholder="Введите ответ" />
                    </div>
                </div>
            </div>
            <div className='submit-or-back'>
                <a className='button-next' onClick={saveAndNext}>Перейти далее</a>
                <a className='button-back' onClick={() => window.location.href = `/new-admin-page/?id=${id}`}>Вернутся назад</a>
            </div>
        </div>
    )
}


export default FAQStep