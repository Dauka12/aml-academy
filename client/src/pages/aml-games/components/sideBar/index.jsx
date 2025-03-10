import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Accordion, AccordionDetails, AccordionSummary } from './AccordionOptions';

const SideBar = ({
    response
}) => {
    const { level } = useParams();
    const { tasks, currentTaskIndex } = useSelector((state) => state.tasks);

    // Получаем текущую задачу из состояния на основе индекса
    const currentTask = tasks[currentTaskIndex];
    useEffect(() => {
        console.log(currentTask);
        
    })

    return (
        <div className='aml-game-sidebar'>
            <div className='sidebar-container'>
                <h1 className='aml-game-level'>Уровень {level}</h1>
                {
                    response !== null && response !== undefined ? response.tasks.map((task, index) => {
                        if (task.task === currentTask.taskId) {
                            return <TaskNav key={index} task={task} />;
                        }
                        return null; 
                    }) : null
                }
            </div>
        </div>
    )
}

const TaskNav = ({
    task
}) => {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        console.log(event);
    };

    return (
        <div>
            <p className='aml-game-task'>{task.name}</p>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Описание текущей ситуации</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {task.description}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Ваша задача</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {task.goal}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Последовательное исполнение задания</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {task.steps}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Риск не исполнения</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {task.risk}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default SideBar;