import React from 'react';
import { useNavigate } from "react-router";
import deletIcon from '../../images/delete.svg';
import editIcon from '../../images/edit-catalog.svg';
import '../editCatalog.scss';


const CourseBlock = ({ x, index, setDeletingCourse, setCourse, publishCourse }) => {
    const navigate = useNavigate();

    return (
        <div className="course-card" key={index}>
            <div className="img-course">
                <img src={x.course_image} alt="img" />
            </div>
            <div className="text-of-card">
                <h2>{x.course_name}</h2>
                <p>Цена: {x.course_price}₸</p>
                <p>Аудитория: {x.course_for_member_of_the_system}</p>
            </div>
            <div className="action-of-card">
                <div onClick={() => {
                    setDeletingCourse(true);
                    setCourse(x.course_id, x.course_name);
                }} className="delete">
                    <img src={deletIcon} alt="del" />
                </div>
                <div onClick={() => { navigate('/new-admin-page/?id=' + x.course_id); }} className="edit">
                    <img src={editIcon} alt="edit" />
                </div>
                <p onClick={() => publishCourse(x.course_id)} className="publish">Опубликовать</p>
            </div>
        </div>
    )
}

export default CourseBlock;