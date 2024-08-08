import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base_url from '../../../settings/base_url';

import componentMap from '../constructor/ComponentMap';
import Elements from '../constructor/Elements';
import generateUniqueId from '../utils/generateUniqueId';
import getKeyByValue from '../utils/getKeyByValue';

import Reveal from '../../../components/Reveal';
import Modal from '../../adminCourse/modalWindowOfInputs/ModalWindowInput';

import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BiCopyAlt } from "react-icons/bi";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

import Notification from '../main/notification-component';
import './style.scss';

function ContentConstructor({
    saveCancel,
    save,
    id,
    title,
    setStepConstructor,
    previous
}) {

    const [selectedComponent, setSelectedComponent] = useState(null);
    const [componentHistory, setComponentHistory] = useState([]);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [loading, setLoading] = useState(false);


    const [destination, setDestination] = useState(null);

    const [actionBtnsPosition, setActionBtnsPosition] = useState("calc(100% - 40px)");

    useEffect(() => {
        axios
            .get(base_url + '/api/aml/chapter/getComponents', { params: { id } })
            .then((res) => {
                let newComponents = res.data.map(item => {
                    // Find the category and component that matches the componentName
                    let inputs = null;
                    for (const category in Elements) {
                        for (const element in Elements[category]) {

                            if (Elements[category][element].name == item.componentName) {
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
            setLoading(true);
            let modifiedHistory = JSON.parse(JSON.stringify(componentHistory));
            modifiedHistory.forEach(item => {
                Object.keys(item.values).forEach(key => {
                    if (item.values[key] !== undefined) {
                        item.values[key] = JSON.stringify(item.values[key]);
                    }
                });
            });

            modifiedHistory = modifiedHistory.map(component => {
                if (component.componentName === "ComplexTable") {
                    return {
                        ...component,
                        "values": {
                            "columns": component.values.columns,
                            "data_row": component.values.data || component.values.data_row ,
                            "version": 3,
                        }
                    }
                }

                return component;
            })
            modifiedHistory = modifiedHistory.map(component => {
                if (component.componentName === "DataChain" || component.componentName === "FlexRow" ) {
                    return {
                        ...component,
                        "values": {
                            "columns": component.values.columns,
                            "data_row": component.values.data || component.values.data_row,
                        }
                    }
                }

                return component;
            })

            console.log(modifiedHistory);

            axios
                .post(base_url + '/api/aml/chapter/saveComponents/' + id, modifiedHistory, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    setNotification({ show: true, message: 'Компоненты успешно сохранены', type: 'success' });
                    saveCancel();
                })
                .catch((error) => {
                    setNotification({ show: true, message: error.message, type: 'error' });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [save, componentHistory, id, saveCancel]);

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

        const index = destination.split(':')[0];
        const dest_name = destination.split(':')[1];
        const detail = destination.split(':')[2]

        if (dest_name === 'TwoColumnsDivider') {
            setComponentHistory((prevHistory) => {

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
        } else if (dest_name === 'OneToFour') {
            setComponentHistory((prevHistory) => {

                if (detail === 'items') {
                    const updated = prevHistory[index].values.list;
                    const idx = parseInt(destination.substring(destination.lastIndexOf(':') + 1), 10);
                    updated[idx] = {
                        component_entry_id: generateUniqueId(), componentName: selectedComponent.componentName, inputs, values
                    }

                    console.log(updated)

                    return [
                        ...prevHistory.slice(0, index),
                        {
                            ...prevHistory[index],
                            values: {
                                ...prevHistory[index].values,
                                ['list']: updated
                            }
                        },
                        ...prevHistory.slice(index + 1),
                    ]
                }

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

    const handleDisplayScroll = (e) => {
        const element = e.currentTarget;
        const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

        const button = e.currentTarget.querySelector('.constructor-actions');

        setActionBtnsPosition(`${element.clientHeight + element.scrollTop - 60}px`);
    }

    const handleScrollDown = (e) => {
        e.preventDefault();

        const displayContainer = document.querySelector('.display');

        displayContainer.scrollTop = displayContainer.scrollHeight - displayContainer.clientHeight;
    }

    const handleScrollUp = (e) => {
        e.preventDefault();

        const displayContainer = document.querySelector('.display');

        displayContainer.scrollTop = '0px';
    }

    useEffect(() => {
        let timer;
        if (notification.show) {
            timer = setTimeout(() => {
                setNotification({ ...notification, show: false });
            }, 1500); // 3 seconds
        }
        return () => clearTimeout(timer);
    }, [notification.show]);

    return (
        <div className="content-constructor">
            <div className='display' onScroll={(e) => handleDisplayScroll(e)}>
                <div
                    className='constructor-actions'
                    style={{
                        top: actionBtnsPosition
                    }}
                >
                    <AiOutlineArrowUp
                        size={30}
                        onClick={(e) => handleScrollUp(e)}
                    />
                    <AiOutlineArrowDown
                        size={30}
                        onClick={(e) => handleScrollDown(e)}
                    />
                </div>

                <div className='button-title'>
                    <svg onClick={() => setStepConstructor(previous)} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <path d="M5.6665 14.1667L4.9594 14.8738L4.25229 14.1667L4.9594 13.4596L5.6665 14.1667ZM29.3332 25.5C29.3332 26.0523 28.8855 26.5 28.3332 26.5C27.7809 26.5 27.3332 26.0523 27.3332 25.5L29.3332 25.5ZM12.0427 21.9571L4.9594 14.8738L6.37361 13.4596L13.4569 20.5429L12.0427 21.9571ZM4.9594 13.4596L12.0427 6.37623L13.4569 7.79044L6.37361 14.8738L4.9594 13.4596ZM5.6665 13.1667L22.3332 13.1667L22.3332 15.1667L5.6665 15.1667L5.6665 13.1667ZM29.3332 20.1667L29.3332 25.5L27.3332 25.5L27.3332 20.1667L29.3332 20.1667ZM22.3332 13.1667C26.1992 13.1667 29.3332 16.3007 29.3332 20.1667L27.3332 20.1667C27.3332 17.4052 25.0946 15.1667 22.3332 15.1667L22.3332 13.1667Z" fill="#374761" />
                    </svg>
                    <h1 className='lesson-title'>{title}</h1>
                </div>

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

                        if (item.componentName === 'OneToFour') {
                            return <OneToFourConstuctor
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
                                    <div>
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
                                    <div>
                                        <svg onClick={() => handleDeleteComponent(index)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M1 1L15 15M1.00003 15L8.00003 8L15 1" stroke="#2D264B" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                    </div>
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

                                    if (ElementName === 'Раскрывающийся списиок(4)') {
                                        return <Element
                                            ElementName={ElementName}
                                            ElementIcon={ElementIcon}
                                            ElementComponent={ElementComponent}
                                            InputsOfElement={InputsOfElement}
                                            ElementExample={ElementExample}
                                            handleElementClick={() => {
                                                const _values = {
                                                    'header': null,
                                                    'list': [null, null, null, null],
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
            {loading && <div className="loading-spinner">Loading...</div>}
            {notification.show && <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ ...notification, show: false })} />}

        </div>
    );
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
                <IoMdArrowUp onClick={() => handleMoveUp(index)} size={20} />
                <IoMdArrowDown onClick={() => handleMoveDown(index)} size={20} />
            </div>

            <div className="c-two-columns-divider">
                <p>В самом курсе элемент будет выглядить по другому</p>
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
        </div>
    )
}

const OneToFourConstuctor = ({
    index,
    handleDeleteComponent,

    handleMoveUp,
    handleMoveDown,
    handleCopy,

    item,
    handleAdvancedSelect
}) => {
    console.log("One to four", item)

    const [highlighIndex, setHighlighIndex] = useState(0);

    useEffect(() => {
        if (highlighIndex === 1) {
            handleAdvancedSelect(`${index}:OneToFour:items:0`)
        } else if (highlighIndex === 2) {
            handleAdvancedSelect(`${index}:OneToFour:items:1`)
        } else if (highlighIndex === 3) {
            handleAdvancedSelect(`${index}:OneToFour:items:2`)
        } else if (highlighIndex === 4) {
            handleAdvancedSelect(`${index}:OneToFour:items:3`)
        } else if (highlighIndex === 5) {
            handleAdvancedSelect(`${index}:OneToFour:header`)
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
                <IoMdArrowUp onClick={() => handleMoveUp(index)} size={20} />
                <IoMdArrowDown onClick={() => handleMoveDown(index)} size={20} />
                {/* <BiCopyAlt onClick={() => handleCopy(index)} size={20}/> */}
            </div>

            <div className="c-one-to-four">
                <p>В самом курсе элемент будет выглядить по другому</p>

                <div className="wrapper">
                    <div>
                        <div
                            className={`title ${highlighIndex === 5 ? 'highlighted' : null}`}
                            onClick={() => {
                                setHighlighIndex(prev => {
                                    if (prev === 5) return 0;
                                    else return 5;
                                })
                            }}
                        >
                            {
                                item.values['header'] !== null
                                    ? (

                                        componentMap[item.values['header'].componentName] && (
                                            React.createElement(componentMap[item.values['header'].componentName], item.values['header'].values)
                                        )

                                    )
                                    : <p>Чтобы добавить элемент, выделите и нажмите на элемент</p>
                            }
                        </div>
                    </div>
                    <div>
                        {
                            [1, 2, 3, 4].map((nth, index) => {

                                return (
                                    <div
                                        className={`${highlighIndex === nth ? 'highlighted' : null}`}
                                        onClick={() => {
                                            console.log(highlighIndex)
                                            setHighlighIndex(prev => {
                                                if (prev === nth) return 0;
                                                else return nth;
                                            })
                                        }}
                                    >
                                        {
                                            item.values['list'] && item.values['list'][index] !== null
                                                ? (

                                                    componentMap[item.values['list'][index].componentName] && (
                                                        React.createElement(componentMap[item.values['list'][index].componentName], item.values['list'][index].values)
                                                    )

                                                )
                                                :
                                                <p>Чтобы добавить элемент, выделите и нажмите на элемент</p>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContentConstructor;