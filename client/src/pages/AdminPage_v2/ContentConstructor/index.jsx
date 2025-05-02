import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import base_url from '../../../settings/base_url';

import componentMap from '../constructor/ComponentMap';
import Elements from '../constructor/Elements';
import generateUniqueId from '../utils/generateUniqueId';
import getKeyByValue from '../utils/getKeyByValue';

import Reveal from '../../../components/Reveal';
import Modal from '../../adminCourse/modalWindowOfInputs/ModalWindowInput';

import Notification from '../main/notification-component';
import './style.scss';

// Material UI Components
import {
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Tab,
    Tabs,
    Tooltip,
    Typography,
    Zoom
} from '@mui/material';
import { ThemeProvider, alpha, createTheme } from '@mui/material/styles';

// Material UI Icons
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// React DnD imports
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Create a theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#374761',
        },
        secondary: {
            main: '#7E869E',
        },
    },
});

// Define the drag item type
const ItemTypes = {
    COMPONENT: 'component'
};

// Define the autoscroll settings
const AUTOSCROLL_THRESHOLD = 100; // px from top/bottom to trigger scroll
const AUTOSCROLL_SPEED = 5; // pixels per frame

// Draggable component wrapper with enhanced features
const DraggableComponent = ({ id, index, moveComponent, children }) => {
    const ref = useRef(null);
    const containerRef = useRef(document.querySelector('.display'));
    const autoScrollIntervalRef = useRef(null);

    const startAutoScroll = (direction) => {
        if (autoScrollIntervalRef.current) return;

        autoScrollIntervalRef.current = setInterval(() => {
            if (containerRef.current) {
                if (direction === 'up') {
                    containerRef.current.scrollTop -= AUTOSCROLL_SPEED;
                } else {
                    containerRef.current.scrollTop += AUTOSCROLL_SPEED;
                }
            }
        }, 16); // ~60fps
    };

    const stopAutoScroll = () => {
        if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current);
            autoScrollIntervalRef.current = null;
        }
    };

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.COMPONENT,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            stopAutoScroll();
        }
    });

    const [, drop] = useDrop({
        accept: ItemTypes.COMPONENT,
        hover: (item, monitor) => {
            if (!ref.current || !containerRef.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // Check if we should autoscroll
            const mouseY = clientOffset.y;
            if (mouseY - containerRect.top < AUTOSCROLL_THRESHOLD) {
                startAutoScroll('up');
            } else if (containerRect.bottom - mouseY < AUTOSCROLL_THRESHOLD) {
                startAutoScroll('down');
            } else {
                stopAutoScroll();
            }

            // Only perform the move when the mouse has crossed half of the items height
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveComponent(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    useEffect(() => {
        return () => stopAutoScroll();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            {children}
        </div>
    );
};

// Component selection dialog that appears when clicking "+" button
const ComponentSelectionDialog = ({ open, onClose, onSelectComponent, position }) => {
    const [tabValue, setTabValue] = useState(0);
    const groupNames = Object.keys(Elements);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            PaperProps={{
                sx: {
                    width: '80%',
                    maxHeight: '80vh',
                    borderRadius: 2
                }
            }}
        >
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Выберите компонент</Typography>
                <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {groupNames.map((groupName, index) => (
                        <Tab key={index} label={groupName} />
                    ))}
                </Tabs>
            </Box>

            <DialogContent>
                <Grid container spacing={2} sx={{ p: 1 }}>
                    {Object.entries(Elements[groupNames[tabValue]] || {}).map(([elementName, elementDetails], index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 2,
                                    height: '100%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: 3
                                    }
                                }}
                                onClick={() => {
                                    if (elementName === 'Разделитель на две колонны') {
                                        onSelectComponent({
                                            componentName: elementDetails.name,
                                            values: {
                                                'left': null,
                                                'right': null,
                                                'gap': 10,
                                                'version': 2
                                            }
                                        }, position);
                                    } else if (elementName === 'Раскрывающийся списиок(4)') {
                                        onSelectComponent({
                                            componentName: elementDetails.name,
                                            values: {
                                                'header': null,
                                                'list': [null, null, null, null],
                                                'version': 2
                                            }
                                        }, position);
                                    } else {
                                        onSelectComponent(
                                            {
                                                ElementComponent: elementDetails.component,
                                                InputsOfElement: elementDetails.inputs,
                                                ElementExample: elementDetails.example
                                            },
                                            position
                                        );
                                    }
                                    onClose();
                                }}
                            >
                                <Box
                                    component="img"
                                    src={elementDetails.icon}
                                    alt={elementName}
                                    sx={{ height: 30, mb: 1 }}
                                />
                                <Typography
                                    variant="body2"
                                    align="center"
                                    sx={{
                                        color: '#374761',
                                        fontSize: '14px',
                                        fontWeight: 300
                                    }}
                                >
                                    {elementName}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

// Component that renders insertion points between components
const ComponentInsertionPoint = ({ index, onInsert }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            sx={{
                height: isHovered ? '30px' : '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.2s',
                position: 'relative',
                my: 0.5,
                '&:hover': {
                    height: '30px',
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    bgcolor: isHovered ? 'primary.main' : alpha(theme.palette.primary.main, 0.1),
                    transition: 'all 0.2s',
                }}
            />
            <Zoom in={isHovered}>
                <IconButton
                    size="small"
                    color="primary"
                    sx={{
                        bgcolor: 'white',
                        boxShadow: 1,
                        position: 'absolute',
                        zIndex: 10,
                        transform: 'scale(0.9)',
                        '&:hover': {
                            transform: 'scale(1)'
                        }
                    }}
                    onClick={() => onInsert(index)}
                >
                    <AddIcon fontSize="small" />
                </IconButton>
            </Zoom>
        </Box>
    );
};

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
    const [insertPosition, setInsertPosition] = useState(-1);

    // State for component selection dialog
    const [componentDialogOpen, setComponentDialogOpen] = useState(false);

    useEffect(() => {
        axios
            .get(base_url + '/api/aml/chapter/getComponents', { params: { id } })
            .then((res) => {
                let newComponents = res.data.map(item => {
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
                    Object.keys(values).forEach(key => {
                        try {
                            values[key] = JSON.parse(values[key]);
                        } catch (e) {
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
                            "data_row": component.values.data || component.values.data_row,
                            "version": 3,
                        }
                    }
                }

                return component;
            })
            modifiedHistory = modifiedHistory.map(component => {
                if (component.componentName === "DataChain" || component.componentName === "FlexRow") {
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
        let key = getKeyByValue(componentMap, ElementComponent);
        const newComponent = {
            component_entry_id: generateUniqueId(),
            componentName: key,
            example: ElementExample,
            inputs: InputsOfElement || [],
            values: {},
        };

        const existingComponentIndex = componentHistory.findIndex(
            (item) => item.component_entry_id === newComponent.component_entry_id
        );

        if (existingComponentIndex !== -1) {
            handleEditComponent(existingComponentIndex);
        } else {
            setSelectedComponent(newComponent);
        }
    };

    const handleSpecialComponentAdd = (componentData, position) => {
        if (position === undefined) position = insertPosition;

        if (typeof componentData.ElementComponent === 'function') {
            // Handle normal components
            handleElementClick(componentData);
        } else {
            // Handle special components like TwoColumnsDivider, etc.
            const newComponent = {
                component_entry_id: generateUniqueId(),
                componentName: componentData.componentName,
                values: componentData.values
            };

            if (position >= 0) {
                setComponentHistory((prevHistory) => [
                    ...prevHistory.slice(0, position),
                    newComponent,
                    ...prevHistory.slice(position)
                ]);
            } else {
                setComponentHistory((prevHistory) => [...prevHistory, newComponent]);
            }
        }
    };

    const handleAdvancedSelect = (destination) => {
        setDestination(destination);
    }

    const handleEditComponent = (index) => {
        const editedComponent = componentHistory[index];
        setSelectedComponent(editedComponent);
    };

    const handleCloseModal = () => {
        setSelectedComponent(null);
    };

    const handleModalSubmit = ({ inputs, values }) => {
        const existingComponentIndex = componentHistory.findIndex(
            (item) => item.component_entry_id === selectedComponent.component_entry_id
        );

        if (existingComponentIndex !== -1) {
            setComponentHistory((prevHistory) => [
                ...prevHistory.slice(0, existingComponentIndex),
                { ...prevHistory[existingComponentIndex], values },
                ...prevHistory.slice(existingComponentIndex + 1),
            ]);
        } else {
            if (destination === null) {
                const newComponent = {
                    component_entry_id: generateUniqueId(),
                    componentName: selectedComponent.componentName,
                    inputs,
                    values
                };

                if (insertPosition >= 0) {
                    setComponentHistory((prevHistory) => [
                        ...prevHistory.slice(0, insertPosition),
                        newComponent,
                        ...prevHistory.slice(insertPosition)
                    ]);
                    setInsertPosition(-1);
                } else {
                    setComponentHistory((prevHistory) => [...prevHistory, newComponent]);
                }
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
        if (index < componentHistory?.length - 1) {
            const updatedHistory = [...componentHistory];
            [updatedHistory[index], updatedHistory[index + 1]] = [updatedHistory[index + 1], updatedHistory[index]];
            setComponentHistory(updatedHistory);
        }
    };

    const handleCopy = (index) => {
        const original = componentHistory[index];
        const duplicate = { ...original, component_entry_id: generateUniqueId() };

        const updatedHistory = [...componentHistory];
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

    const handleInsertAtPosition = (position) => {
        setInsertPosition(position);
        setComponentDialogOpen(true);
    };

    useEffect(() => {
        let timer;
        if (notification.show) {
            timer = setTimeout(() => {
                setNotification({ ...notification, show: false });
            }, 1500);
        }
        return () => clearTimeout(timer);
    }, [notification.show]);

    const moveComponent = (dragIndex, hoverIndex) => {
        const updatedHistory = [...componentHistory];
        const draggedItem = updatedHistory[dragIndex];

        updatedHistory.splice(dragIndex, 1);
        updatedHistory.splice(hoverIndex, 0, draggedItem);

        setComponentHistory(updatedHistory);
    };

    return (
        <ThemeProvider theme={theme}>
            <DndProvider backend={HTML5Backend}>
                <div className="content-constructor">
                    <div className='display' onScroll={(e) => handleDisplayScroll(e)}>
                        <Box
                            className='constructor-actions'
                            sx={{
                                position: 'fixed',
                                right: '400px',
                                top: actionBtnsPosition,
                                display: 'flex',
                                gap: 1,
                                padding: '8px 16px',
                                bgcolor: 'white',
                                borderRadius: '4px',
                                boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
                                zIndex: 10
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={(e) => handleScrollUp(e)}
                                sx={{ color: 'primary.main' }}
                            >
                                <KeyboardArrowUpIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={(e) => handleScrollDown(e)}
                                sx={{ color: 'primary.main' }}
                            >
                                <KeyboardArrowDownIcon />
                            </IconButton>
                        </Box>

                        <Box className='button-title' sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <IconButton
                                onClick={() => setStepConstructor(previous)}
                                sx={{ color: 'primary.main' }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography
                                variant="h5"
                                component="h1"
                                className='lesson-title'
                                sx={{
                                    pl: 1,
                                    color: 'rgba(55, 71, 97, 0.50)',
                                    fontWeight: 500,
                                    fontSize: '30px'
                                }}
                            >
                                {title}
                            </Typography>
                        </Box>

                        <div className='components'>
                            <ComponentInsertionPoint
                                index={0}
                                onInsert={handleInsertAtPosition}
                            />

                            {componentHistory.map((item, index) => {
                                const componentElement = item.componentName === 'TwoColumnsDivider' ? (
                                    <DraggableComponent
                                        key={item.component_entry_id}
                                        id={item.component_entry_id}
                                        index={index}
                                        moveComponent={moveComponent}
                                    >
                                        <TwoColumnsDividerConstuctor
                                            index={index}
                                            handleDeleteComponent={handleDeleteComponent}
                                            handleMoveUp={handleMoveUp}
                                            handleMoveDown={handleMoveDown}
                                            handleCopy={handleCopy}
                                            item={item}
                                            handleAdvancedSelect={handleAdvancedSelect}
                                        />
                                    </DraggableComponent>
                                ) : item.componentName === 'OneToFour' ? (
                                    <DraggableComponent
                                        key={item.component_entry_id}
                                        id={item.component_entry_id}
                                        index={index}
                                        moveComponent={moveComponent}
                                    >
                                        <OneToFourConstuctor
                                            index={index}
                                            handleDeleteComponent={handleDeleteComponent}
                                            handleMoveUp={handleMoveUp}
                                            handleMoveDown={handleMoveDown}
                                            handleCopy={handleCopy}
                                            item={item}
                                            handleAdvancedSelect={handleAdvancedSelect}
                                        />
                                    </DraggableComponent>
                                ) : (
                                    <DraggableComponent
                                        key={item.component_entry_id || index}
                                        id={item.component_entry_id || index}
                                        index={index}
                                        moveComponent={moveComponent}
                                    >
                                        <div className='component-display'>
                                            <Box
                                                className='component-edit'
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    p: '4px 8px',
                                                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                                                    borderRadius: '4px'
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Tooltip title="Перетащить для изменения порядка">
                                                        <DragIndicatorIcon
                                                            sx={{
                                                                color: 'primary.main',
                                                                mr: 1,
                                                                cursor: 'move'
                                                            }}
                                                        />
                                                    </Tooltip>
                                                    <Tooltip title="Редактировать">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleEditComponent(index)}
                                                            sx={{ color: 'primary.main' }}
                                                        >
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Переместить вверх">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleMoveUp(index)}
                                                            sx={{ color: 'primary.main' }}
                                                        >
                                                            <ArrowUpwardIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Переместить вниз">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleMoveDown(index)}
                                                            sx={{ color: 'primary.main' }}
                                                        >
                                                            <ArrowDownwardIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    {item.componentName === 'Sizebox' && (
                                                        <Tooltip title="Копировать">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleCopy(index)}
                                                                sx={{ color: 'primary.main' }}
                                                            >
                                                                <ContentCopyIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                                <Tooltip title="Удалить">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDeleteComponent(index)}
                                                        sx={{ color: 'primary.main' }}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                            <Reveal>
                                                {
                                                    componentMap[item.componentName] && (
                                                        React.createElement(componentMap[item.componentName], item.values)
                                                    )
                                                }
                                            </Reveal>
                                        </div>
                                    </DraggableComponent>
                                );

                                return (
                                    <React.Fragment key={`fragment-${item.component_entry_id || index}`}>
                                        {componentElement}
                                        <ComponentInsertionPoint
                                            index={index + 1}
                                            onInsert={handleInsertAtPosition}
                                        />
                                    </React.Fragment>
                                );
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

                        {/* Component Selection Dialog */}
                        <ComponentSelectionDialog
                            open={componentDialogOpen}
                            onClose={() => setComponentDialogOpen(false)}
                            onSelectComponent={handleSpecialComponentAdd}
                            position={insertPosition}
                        />

                    </div>
                    <div className='tool-bar'>
                        <Typography variant="h5" component="h3" sx={{ color: '#374761', fontWeight: 700, mb: 2 }}>
                            Элементы
                        </Typography>
                        <Box component="a" sx={{ color: 'white', cursor: 'default' }}
                            onClick={() => { console.log(componentHistory) }}>
                            CONSOLE.LOG
                        </Box>
                        <div className='elements'>
                            {Object.entries(Elements).map(([groupName, groupElements]) => (
                                <div className='element-group' key={groupName}>
                                    <Typography
                                        variant="h6"
                                        component="h4"
                                        sx={{
                                            color: 'rgba(55, 71, 97, 0.75)',
                                            fontSize: '18px',
                                            fontWeight: 400
                                        }}
                                    >
                                        {groupName}
                                    </Typography>
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
                    {loading && (
                        <Box
                            sx={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'rgba(255, 255, 255, 0.7)',
                                zIndex: 1000
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                    {notification.show && <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ ...notification, show: false })} />}
                </div>
            </DndProvider>
        </ThemeProvider>
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
    const [showExample, setShowExample] = useState(false);

    return (
        <Paper
            elevation={0}
            className='element'
            sx={{
                cursor: 'pointer',
                borderRadius: '5px',
                border: '1px solid rgba(55, 71, 97, 0.15)',
                bgcolor: 'rgba(55, 71, 97, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '10px',
                position: 'relative',
                transition: 'background-color 0.2s',
                '&:hover': {
                    bgcolor: 'rgba(55, 71, 97, 0.1)'
                }
            }}
            onClick={() => handleElementClick({ ElementComponent, InputsOfElement, ElementExample })}
            onMouseEnter={() => setShowExample(true)}
            onMouseLeave={() => setShowExample(false)}
        >
            <Box
                component="img"
                src={ElementIcon}
                alt={`Icon for ${ElementName}`}
                sx={{ height: 15 }}
            />
            <Typography
                sx={{
                    color: '#374761',
                    fontSize: '14px',
                    fontWeight: 300
                }}
            >
                {ElementName}
            </Typography>
        </Paper>
    );
};

const TwoColumnsDividerConstuctor = ({
    index,
    handleDeleteComponent,
    handleMoveUp,
    handleMoveDown,
    handleCopy,
    item,
    handleAdvancedSelect
}) => {
    const [highlighIndex, setHighlighIndex] = useState(0);

    useEffect(() => {
        if (highlighIndex === 1) {
            handleAdvancedSelect(`${index}:TwoColumnsDivider:left`)
        } else if (highlighIndex === 2) {
            handleAdvancedSelect(`${index}:TwoColumnsDivider:right`)
        } else if (highlighIndex === 0) {
            handleAdvancedSelect(null)
        }
    }, [highlighIndex]);

    return (
        <div className='component-display' key={index}>
            <Box
                className='component-edit'
                sx={{
                    display: 'flex',
                    gap: 1,
                    p: 1
                }}
            >
                <Tooltip title="Удалить">
                    <IconButton
                        size="small"
                        onClick={() => handleDeleteComponent(index)}
                        sx={{ color: 'primary.main' }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Переместить вверх">
                    <IconButton
                        size="small"
                        onClick={() => handleMoveUp(index)}
                        sx={{ color: 'primary.main' }}
                    >
                        <ArrowUpwardIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Переместить вниз">
                    <IconButton
                        size="small"
                        onClick={() => handleMoveDown(index)}
                        sx={{ color: 'primary.main' }}
                    >
                        <ArrowDownwardIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>

            <div className="c-two-columns-divider">
                <Typography variant="body2">В самом курсе элемент будет выглядить по другому</Typography>
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
                                : <Typography>Чтобы добавить элемент, выделите и нажмите на элемент</Typography>
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
                                : <Typography>Чтобы добавить элемент, выделите и нажмите на элемент</Typography>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

const OneToFourConstuctor = ({
    index,
    handleDeleteComponent,
    handleMoveUp,
    handleMoveDown,
    handleCopy,
    item,
    handleAdvancedSelect
}) => {
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
    }, [highlighIndex]);

    return (
        <div className='component-display' key={index}>
            <Box
                className='component-edit'
                sx={{
                    display: 'flex',
                    gap: 1,
                    p: 1
                }}
            >
                <Tooltip title="Удалить">
                    <IconButton
                        size="small"
                        onClick={() => handleDeleteComponent(index)}
                        sx={{ color: 'primary.main' }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Переместить вверх">
                    <IconButton
                        size="small"
                        onClick={() => handleMoveUp(index)}
                        sx={{ color: 'primary.main' }}
                    >
                        <ArrowUpwardIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Переместить вниз">
                    <IconButton
                        size="small"
                        onClick={() => handleMoveDown(index)}
                        sx={{ color: 'primary.main' }}
                    >
                        <ArrowDownwardIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>

            <div className="c-one-to-four"></div>
            <Typography variant="body2">В самом курсе элемент будет выглядить по другому</Typography>

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
                                : <Typography>Чтобы добавить элемент, выделите и нажмите на элемент</Typography>
                        }
                    </div>
                </div>
                <div>
                    {
                        [1, 2, 3, 4].map((nth, index) => (
                            <div
                                key={index}
                                className={`${highlighIndex === nth ? 'highlighted' : null}`}
                                onClick={() => {
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
                                        : <Typography>Чтобы добавить элемент, выделите и нажмите на элемент</Typography>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >

    );
};

export default ContentConstructor;