import React, { useEffect, useState } from 'react';
import './style.scss';

import { AiOutlinePlus } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import Sizebox from '../../../common/Sizebox';

function InteractivePhases({
    phases,
    version=1
}) {
    const [activeItem, setActiveItem] = useState(0);

    useEffect(() => {

        console.log('InteractivePhases useEffect', phases, version)

    }, [])

    if (version === 1) {
        return ( 
            <div className="interactive-phases">
                <div className="wrapper">
                    <div 
                        className="body"
                    >
                        {
                            [
                                <Phases 
                                    title={'Двухфазная модель отмывания денег'}
                                    phases={[
                                        {title: ' ', name: 'Предикат', shortDescription: 'Доход, полученный преступным путем', longDescription: ''},
                                        {title: 'I этап', name: 'Легализация', shortDescription: 'Обмен валюты или иного имущества', longDescription: 'Первый этап (легализация) - представляет собой отмывание денег, полученных непосредственно в результате совершения преступления путем обмена этих денежных средств на купюры иного достоинства, другой валюты, имущества.'},
                                        {title: 'II этап', name: 'Интеграция', shortDescription: 'Вводится легальный фин. оборот', longDescription: 'Второй этап (интеграция) заключается в совершении операций, в результате которых предварительно «отмытым» деньгам придается статус, полученных законными путями, и они вводятся в легальный финансовый оборот.'}
                                    ]}
                                />, 
                                <Phases 
                                    title={'Трехфазная модель отмывания денег'}
                                    phases={[
                                        {title: ' ', name: 'Предикат', shortDescription: 'Доход полученный преступным путем', longDescription: ''},
                                        {title: 'I этап', name: 'Размещение', shortDescription: 'Размещение средств в финансовых институтах', longDescription: 'Первый этап (Размещение) – размещение денежных средств на счетах в банках и иных финансовых институтах, превращение в финансовые инструменты, товары и др.'},
                                        {title: 'II этап', name: 'Расслоение или запутывание следов', shortDescription: 'Финансовые операции и сделки', longDescription: 'Второй этап (Расслоение или запутывание следов) – реализация операций и сделок, в целях маскировки источника дохода, полученного преступным путем, тем самым осуществление схем и способов для легализации таких доходов.'},
                                        {title: 'III этап', name: 'Интеграция', shortDescription: 'Видимость правомерных доходов', longDescription: 'Третий этап (Интеграция) – придание видимости легальности доходов и их интеграция в законную среду экономики'}
                                    ]}
                                />, 
                                <Phases 
                                    title={'Четырехфазная модель отмывания денег'}
                                    phases={[
                                        {title: 'I этап', name: 'Отмывание', shortDescription: 'Конвертация наличных денег, с передачей их на подставных лиц', longDescription: 'Первый этап - освобождение от наличных денег и перечисление их на счета подставных лиц.'},
                                        {title: 'II этап', name: 'Размещение', shortDescription: 'Размещение средств в финансовых институтах', longDescription: 'Второй этап (Размещение) – размещение денежных средств на счетах в банках и иных финансовых институтах, превращение в финансовые инструменты, товары и др.'},
                                        {title: 'III этап', name: 'Расслоение', shortDescription: 'Финансовые операции и сделки', longDescription: 'Третий этап (Расслоение или запутывание следов) – реализация операций и сделок, в целях маскировки источника дохода, полученного преступным путем, тем самым осуществление схем и способов для легализации таких доходов.'},
                                        {title: 'IV этап', name: 'Интеграция', shortDescription: 'Видимость правомерных доходов', longDescription: 'Четвертый этап (Интеграция) – придание видимости легальности доходов и их интеграция в законную среду экономики.'},
                                    ]}
                                />
                            ].map((item, index) => {

                                return (
                                    <div 
                                        key={index}
                                        // ref={el => itemRefs.current[index] = el}
                                        className={`item active`}
                                        onClick={() => setActiveItem(index)}
                                    >
                                        { item }
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        );
    }
        

    if (version === 2) {
        return (
            <div className="interactive-phases">
                <div className="wrapper">
                    <div 
                        className="body"
                    >
                        {
                            phases.map((item, index) => {

                                return (
                                    <div 
                                        key={index}
                                        // ref={el => itemRefs.current[index] = el}
                                        className={`item active`}
                                        onClick={() => setActiveItem(index)}
                                    >
                                        <Phases 
                                            title={item.title}
                                            phases={item.phases}
                                        />
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const Phases = ({
    title,
    phases=[
        {title: ' ', name: 'Предикат', shortDescription: 'Доход полученный преступным путем', longDescription: ''},
        {title: 'I этап', name: 'Легализация', shortDescription: 'Обмен валюты или иного имущества', longDescription: 'Первый этап (легализация) - представляет собой отмывание денег, полученных непосредственно в результате совершения преступления путем обмена этих денежных средств на купюры иного достоинства, другой валюты, имущества.'},
        {title: 'II этап', name: 'Интеграция', shortDescription: 'Вводится легальный фин. оборот', longDescription: 'Второй этап (интеграция) заключается в совершении операций, в результате которых предварительно «отмытым» деньгам придается статус полученных законными путями, и они вводятся в легальный финансовый оборот.'}
    ]
}) => {

    return (
        <>
            <div className="title">
                {title}
            </div>
            <Sizebox height={43}/>
            <div className="phases">
                {
                    phases.map((phase, index) => {

                        return (
                            <>
                                <Phase phase={phase}/>
                                {/* {
                                    index !== phases.length - 1 
                                    ? (
                                        <div className={`next ${
                                            index % 2 === 1 ? 'flipped' : ''
                                        }`}>
                                            <MdOutlineNextPlan />
                                        </div>
                                    ) : null
                                } */}
                            </>
                        )
                    })
                }
            </div>
        </>
        
    )
}

const Phase = ({
    phase
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="phase">
            <div className='title'>{phase.title}</div>
            <div className="name">{phase.name}</div>
            <div className="open-icon" onClick={() => setOpen(true)}>
                <AiOutlinePlus size={25} />
            </div>
            <div className="short-description">{phase.shortDescription}</div>

            <div 
                className={`long-description ${open ? 'open' : ''}`}
            >
                <div className="close" onClick={() => setOpen(false)}>
                    <IoClose size={23} />
                </div>
                <div className="inner-text">
                    {phase.longDescription?.length > 0 ? phase.longDescription : phase.shortDescription}
                </div>
            </div>
        </div>
    )
}

export default InteractivePhases;