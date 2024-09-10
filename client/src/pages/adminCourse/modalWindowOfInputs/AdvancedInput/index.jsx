import React, { useEffect, useState } from 'react';
import Elements_level_2 from '../../../AdminPage_v2/constructor/Elements_level_2';

import { AiTwotoneDelete } from "react-icons/ai";
import { CiEdit, CiSquarePlus } from "react-icons/ci";
import { FiCornerLeftUp, FiCornerRightDown, FiSave } from "react-icons/fi";
import './style.scss';

import componentMap_level_2 from '../../../AdminPage_v2/constructor/ComponentMap_level_2';
import Modal from '../ModalWindowInput';

const AdvancedInput = ({
    handleSave,
    content
}) => {

    const [componentHistory, setComponentHistory] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [inputs, setInputs] = useState([]);
    const [componentIndex, setComponentIndex] = useState(0);

    const handleChoseComponent = (chosenComponent) => {
        setComponentHistory(prev => {
            return [
                ...prev,
                {
                    component: chosenComponent.component,
                    inputs: chosenComponent.inputs,
                    name: chosenComponent.name,
                    values: null
                }
            ]
        })
    }
    
    useEffect(() => {
        setComponentHistory(content);
    }, [content])

    return (
        <div className='advancedInput'>
            {
                openModal 
                    ? (
                        <Modal
                            width={300}
                            onClose={() => {
                                setOpenModal(false);
                            }}
                            onSubmit={({inputs, values}) => {
                                console.log(values);
                                setComponentHistory(prev => {
                                    const updated = prev;
                                    updated[componentIndex].values = values;

                                    return updated;
                                })
                            }}
                            inputs={inputs}
                            exValues={componentHistory[componentIndex].values}
                        />
                    ) : null

            }

            <label>Содержимое</label>
            {
                componentHistory.map((component, index) => {
                    return (
                        <div 
                            key={index}
                            className={`component ${component.values !== null ? 'non-empty': 'empty'}`}
                        >
                            {
                                component.values !== null
                                ? (
                                    <>
                                        <div>
                                            {
                                                componentMap_level_2[component.name] && (
                                                    React.createElement(componentMap_level_2[component.name], {...component.values, ['key']: index})
                                                ) 
                                            }
                                        </div>
                                        <div>
                                            <FiCornerLeftUp 
                                                onClick={() => {
                                                    if (index > 0) { 
                                                        const updatedHistory = [...componentHistory];
                                                        [updatedHistory[index], updatedHistory[index - 1]] = [updatedHistory[index - 1], updatedHistory[index]];
                                            
                                                        
                                                        setComponentHistory(updatedHistory);
                                                    }
                                                }}
                                            />
                                            <FiCornerRightDown 
                                                onClick={() => {
                                                    if (index < componentHistory?.length - 1) {
                                                        const updatedHistory = [...componentHistory];
                                                        [updatedHistory[index], updatedHistory[index + 1]] = [updatedHistory[index + 1], updatedHistory[index]];
                                                        
                                                        setComponentHistory(updatedHistory);
                                                    }
                                                }}
                                            />
                                            <CiEdit
                                                onClick={() => {
                                                    setInputs(component.inputs);
                                                    setComponentIndex(index);
                                                    setOpenModal(true);
                                                }}
                                            />
                                            <AiTwotoneDelete 
                                                onClick={() => {
                                                    setComponentHistory(prev => {

                                                        let updated = prev.filter((item, idx) => idx !== index)

                                                        return updated;

                                                    })
                                                }}
                                            />
                                        </div>
                                    </>
                                ) 
                                : (
                                    <>
                                        <p>{component.name}</p>
                                        <CiEdit 
                                            style={{
                                                fontSize: '25px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={(e) => {
                                                setInputs(component.inputs);
                                                setComponentIndex(index);
                                                setOpenModal(true);
                                            }}
                                        />
                                    </>
                                )
                            }
                        </div>
                    )
                })
            }
            <div className='pallete-wrapper'>
                <AdvancedInputComponentPallete handleChoseComponent={handleChoseComponent} />
                <FiSave 
                    style={{
                        display: 'inline',
                        fontSize: '25px',
                        cursor: 'pointer',
                    }}
                    onClick={(e) => {
                        handleSave(componentHistory);
                    }}
                />
            </div>
        </div>
    )
}

const AdvancedInputComponentPallete = ({
    handleChoseComponent
}) => {

    const [category, setCategory] = useState('');
    const [open, setOpen] = useState(false);

    if (!open) {
        return (
            <CiSquarePlus 
                style={{
                    display: 'inline',
                    fontSize: '30px',
                    cursor: 'pointer'
                }}
                onClick={(e) => setOpen(true)}
            />
        )
    }

    if (open)
        return (
            <div className='pallete'>
                {
                    category === '' ? Object.keys(Elements_level_2).map((elementCategory, index) => {

                        return (
                            <div key={index} onClick={() => setCategory(elementCategory)}>
                                {elementCategory}
                            </div>
                        )
                    }) : null
                }

                {
                    category === '' && open 
                    ?
                        (
                            <div className='back' onClick={() => setOpen(false)}>
                                Назад
                            </div>
                        )
                    : null
                }

                {
                    category !== '' && Elements_level_2[category] ? Object.keys(Elements_level_2[category]).map((element, index) => {

                        return (
                            <div key={index} onClick={() => {
                                setCategory('');
                                handleChoseComponent(Elements_level_2[category][element]);
                                setOpen(false);
                            }}>
                                {element}
                            </div>
                        )
                    }) : null
                }

                {
                    category !== '' && Elements_level_2[category] 
                    ?
                        (
                            <div className='back' onClick={() => setCategory('')}>
                                Назад
                            </div>
                        )
                    : null
                }
            </div>
        )
}

export default AdvancedInput;