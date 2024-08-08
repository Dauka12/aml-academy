import React, { useState } from 'react';

import { useLocation } from 'react-router';
import TabBasicInfo from '../../adminCourse/TabBasicInfo/TabBasicInfo';
import FAQStep from '../../adminCourse/TabFAQ/FaqStep';
import { BuilderNavbar } from '../../adminCourse/builderNavbar/BuilderNavbar';
import NewTabConstructor from '../constructor';
import saveButton from '../images/save-button.svg';
import './style.scss';

import { FaChevronRight } from "react-icons/fa";

function AdminPage_Main() {

    const location = useLocation();
    const axId = new URLSearchParams(location.search).get('id');
    const [currentID, setCurrentID] = useState(axId || 0)
    const [currentStep, setCurrentStep] = useState("basic-info")

    const [save, setSave] = useState(false)
    const [showNotification, setShowNotification] = useState(false);

    const toFAQ = (id) => {
        setCurrentID(id)
        setCurrentStep("faq")
    }

    const toConsctrutor = () => {
        setCurrentStep("constructor")
    }

    const saveCancel = () => {
        setSave(false)
    }

    const handleSave = () => {
        setSave(true);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
      };

    return ( 
        <div className="admin-page-main">
            <BuilderNavbar />
            <div className="body">

                <div className="creation-navigation">
                    <a className='title'>Создание курса</a>
                    <div className='steps'>
                        <div className={`step ${currentStep == 'basic-info' ? 'active' : ''}`}>
                            <div className='step-button'/>
                            <p className='step-title'>Основные данные</p>
                        </div>
                        <FaChevronRight className='sm-step'/>
                        <div className={`step ${currentStep == 'faq' ? 'active' : ''}`}>
                            <div className='step-button'/>
                            <p className='step-title'>FAQ</p>
                        </div>
                        <FaChevronRight className='sm-step'/>
                        <div className={`step ${currentStep == 'constructor' ? 'active' : ''}`}>
                            <div className='step-button'/>
                            <p className='step-title'>Программа Курса</p>
                        </div>
                    </div>
                    {currentStep === 'constructor' ? 
                        <div onClick={handleSave} className='save-course-button'>
                            <img src={saveButton} alt="save"/>
                            <a>Сохранить изменения</a>
                        </div> : ''
                    }
                </div>

                <div className="sub-page">

                {
                    currentStep === 'basic-info' 
                        ? <TabBasicInfo id={currentID} nextStep={toFAQ} /> 
                    : currentStep === 'faq' 
                        ? <FAQStep id={currentID} nextStep={toConsctrutor} /> 
                    : currentStep === 'constructor' 
                        ? <NewTabConstructor saveCancel={saveCancel} save={save} id={currentID} /> 
                        // ? <TabConstructor saveCancel={saveCancel} save={save} id={currentID} /> 
                    : null
                }

                </div>

            </div>
            {/* {showNotification && <Notification message="Изменения сохранены" onClose={() => setShowNotification(false)} />} */}
        </div>
    );
}

export default AdminPage_Main;