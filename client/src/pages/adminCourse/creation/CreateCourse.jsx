import React, { useState } from 'react'
import { useLocation } from 'react-router'
import TabBasicInfo from '../TabBasicInfo/TabBasicInfo'
import FAQStep from '../TabFAQ/FaqStep'
import { BuilderNavbar } from '../builderNavbar/BuilderNavbar'
import saveButton from '../images/save-button.svg'
import TabConstructor from '../tabConstructor/tabConstructor'
import './creation.scss'


const CreateCoursePage = () => {
    const location = useLocation();
    const axId = new URLSearchParams(location.search).get('id');
    const [currentID, setCurrentID] = useState(axId || 0)
    const [currentStep, setCurrentStep] = useState("basic-info")

    const [save, setSave] = useState(false)

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


    return (
        <div className='page'>
            <BuilderNavbar/>
            <div className='tab-and-content'>
                <div className='creation-left-bar'>
                    <a className='title'>Создание курса</a>
                    <div className='steps'>
                        <div className={`step ${currentStep == 'basic-info' ? 'active' : ''}`}>
                            <div className='step-button'/>
                            <p className='step-title'>Основные данные</p>
                        </div>
                        <div className={`step ${currentStep == 'faq' ? 'active' : ''}`}>
                            <div className='step-button'/>
                            <p className='step-title'>FAQ</p>
                        </div>
                        <div className={`step ${currentStep == 'constructor' ? 'active' : ''}`}>
                            <div className='step-button'/>
                            <p className='step-title'>Программа Курса</p>
                        </div>
                    </div>
                    {currentStep == 'constructor' ? 
                        <div onClick={() => setSave(true)} className='save-course-button'>
                            <img src={saveButton} alt="save"/>
                            <a>Сохранить изменения</a>
                        </div> : ''
                    }
                </div>
                {/* <TabConstructor saveCancel={saveCancel} save={save} id={currentID} /> */}
                {
                    currentStep === 'basic-info' ? <TabBasicInfo id={currentID} nextStep={toFAQ} /> :
                    currentStep === 'faq' ? <FAQStep id={currentID} nextStep={toConsctrutor} /> :
                    currentStep === 'constructor' ? <TabConstructor saveCancel={saveCancel} save={save} id={currentID} /> :
                    null
                }
            </div>
        </div>
    )
}



export default CreateCoursePage