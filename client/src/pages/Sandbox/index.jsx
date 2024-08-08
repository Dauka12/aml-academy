import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import TestPage from '../../components/courseTemplates/complex/Test';
import lectorImage from './lectorImage.png';
import './style.scss';

function Sandbox() {
    const [courseName, setCourseName] = useState('');

    useEffect(() => {
        setCourseName('Базовый курс');

    }, [])

    const navigate = useNavigate();

    return (
        <div className="sandbox-page">
            <div className="course-wrapper">

                <div className="course-head">
                    <div>
                        {/* <div className="course-title">{courseName}</div> */}
                        <div className="course-subtitle">{courseName}</div>
                    </div>
                    <div className='close-icon' onClick={() => {
                        navigate('/courses/')
                    }}>
                        <AiOutlineClose />
                    </div>
                </div>

                <div className="course-body">

                    <div className="course-nav">

                        <div className="nav-head">
                            <div>
                                <h2>{courseName}</h2>
                                <div className='progress-bar'>
                                    <div>22% complete</div>
                                </div>
                            </div>
                        </div>
                        <div className="nav-body">
                            
                        </div>

                    </div>

                    <div className="course-content">
                        <div className="content">
                            <div className="content-header">
                                <h1>Введение</h1>
                                <div className='lector'>
                                    <img src={lectorImage} alt="lector-name" />
                                    <p>Автор курса</p>
                                </div>
                            </div>
                            <TestPage />


                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Sandbox;