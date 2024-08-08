import React from 'react';
import { Link } from 'react-router-dom';
import cl from '../../Home.module.css';


const CourseBox = ({ link, imgSrc, text, imagesHidden }) => {
    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <div className={cl.aml_box}>
                {!imagesHidden && <img src={imgSrc} alt="" />}
                <p className={`${cl.course_box_name} text-content`}>{text}</p>
            </div>
        </Link>
    );
};

export default CourseBox;
