import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Sizebox from '../../../../components/courseTemplates/common/Sizebox'
import bgIcon from "../../components/dndBox/flags/Bulgaria.svg"
import bfIcon from "../../components/dndBox/flags/BurkinaFaso.svg"
import cmIcon from "../../components/dndBox/flags/Cameroon.svg"
import hrIcon from "../../components/dndBox/flags/Croatia.svg"
import cgIcon from "../../components/dndBox/flags/DemocraticRepublicoftheCongo.svg"
import htIcon from "../../components/dndBox/flags/Haiti.svg"
import irIcon from "../../components/dndBox/flags/Iran.svg"
import kyIcon from "../../components/dndBox/flags/Kenya.svg"
import kndrIcon from "../../components/dndBox/flags/KNDRFlag.svg"
import mlIcon from "../../components/dndBox/flags/Mali.svg"
import mcIcon from "../../components/dndBox/flags/Monaco.svg"
import mzIcon from "../../components/dndBox/flags/Mozambique.svg"
import mmIcon from "../../components/dndBox/flags/Myanmar.svg"
import naIcon from "../../components/dndBox/flags/Namibia.svg"
import ngIcon from "../../components/dndBox/flags/Nigeria.svg"
import phIcon from "../../components/dndBox/flags/Philippines.svg"
import sgIcon from "../../components/dndBox/flags/Senegal.svg"
import saIcon from "../../components/dndBox/flags/SouthAfrica.svg"
import ssIcon from "../../components/dndBox/flags/SouthSudan.svg"
import syIcon from "../../components/dndBox/flags/Syria.svg"
import tzIcon from "../../components/dndBox/flags/Tanzania.svg"
import vzIcon from "../../components/dndBox/flags/Venezuela.svg"
import vtIcon from "../../components/dndBox/flags/VFlag.svg"
import yeIcon from "../../components/dndBox/flags/Yemen.svg"
import { nextTask } from '../../game-2/store/slices/taskSlice'
import { sendAnswerToBackend } from '../../utils/api'
import DnDContainer from '../dndBox/DnDContainer'
import SubmissionButton from '../sub-button'

const initialItems = [
    { id: 1, name: "Болгария", flag: bgIcon, initialZoneId: 0, correctZone: 1 },
    { id: 2, name: "Монако", flag: mcIcon, initialZoneId: 0, correctZone: 1 },
    { id: 3, name: "Хорватия", flag: hrIcon, initialZoneId: 0, correctZone: 1 },
    { id: 4, name: "Вьетнам", flag: vtIcon, initialZoneId: 0, correctZone: 1 },
    { id: 5, name: "КНДР", flag: kndrIcon, initialZoneId: 0, correctZone: 1 },
    { id: 6, name: "Нигерия", flag: ngIcon, initialZoneId: 0, correctZone: 1 },
    { id: 7, name: "Буркина-Фасо", flag: bfIcon, initialZoneId: 0, correctZone: 1 },
    { id: 8, name: "Камерун", flag: cmIcon, initialZoneId: 0, correctZone: 1 },
    { id: 10, name: "ДР Конго", flag: cgIcon, initialZoneId: 0, correctZone: 1 },
    { id: 11, name: "Гаити", flag: htIcon, initialZoneId: 0, correctZone: 1 },
    { id: 12, name: "Мали", flag: mlIcon, initialZoneId: 0, correctZone: 1 },
    { id: 13, name: "Мозамбик", flag: mzIcon, initialZoneId: 0, correctZone: 1 },
    { id: 14, name: "Филиппины", flag: phIcon, initialZoneId: 0, correctZone: 1 },
    { id: 15, name: "Сенегал", flag: sgIcon, initialZoneId: 0, correctZone: 1 },
    { id: 16, name: "ЮАР", flag: saIcon, initialZoneId: 0, correctZone: 1 },
    { id: 17, name: "Южный Судан", flag: ssIcon, initialZoneId: 0, correctZone: 1 },
    { id: 18, name: "Сирия", flag: syIcon, initialZoneId: 0, correctZone: 1 },
    { id: 19, name: "Танзания", flag: tzIcon, initialZoneId: 0, correctZone: 1 },
    { id: 20, name: "Венесуэла", flag: vzIcon, initialZoneId: 0, correctZone: 1 },
    { id: 21, name: "Йемен", flag: yeIcon, initialZoneId: 0, correctZone: 1 },
    { id: 22, name: "Кения", flag: kyIcon, initialZoneId: 0, correctZone: 1 },
    { id: 23, name: "Намибия", flag: naIcon, initialZoneId: 0, correctZone: 1 },
    { id: 24, name: "Иран", flag: irIcon, initialZoneId: 0, correctZone: 1 },
    { id: 26, name: "Мьянма", flag: mmIcon, initialZoneId: 0, correctZone: 1 },
];

const Task2 = () => {

    const [items, setItems] = useState(initialItems);
    const [zones, setZones] = useState({
        1: { id: 1, title: "Зеленый список", items: [] },
        2: { id: 2, title: "Серый список", items: [] },
        3: { id: 3, title: "Черный список", items: [] },
    });
    const handleSubmit = (answers, isCorrect) => {
        sendAnswerToBackend(2, 2, 2, isCorrect, isCorrect);
    };
    const { tasks, currentTaskIndex } = useSelector((state) => state.tasks);
    const currentTask = tasks[currentTaskIndex];
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };

    const handleDrop = (zoneId, item) => {
        setZones((prevZones) => {
            const newZones = { ...prevZones };

            // Remove the item from the previous zone if it exists
            Object.values(newZones).forEach((zone) => {
                zone.items = zone.items.filter((zoneItem) => zoneItem.id !== item.id);
            });

            // Add the item to the new zone if it's not the initial list (zoneId 0)
            if (zoneId !== 0) {
                newZones[zoneId].items = [...newZones[zoneId].items, item];
            }

            return newZones;
        });

        // Add the item back to the items list if it's returned to the initial list
        if (zoneId === 0) {
            setItems((prevItems) => [...prevItems, item]);
        } else {
            setItems((prevItems) => prevItems.filter((prevItem) => prevItem.id !== item.id));
        }
    };

    const handleRemove = (itemId) => {
        setZones((prevZones) => {
            const newZones = { ...prevZones };
            Object.values(newZones).forEach((zone) => {
                zone.items = zone.items.filter((item) => item.id !== itemId);
            });
            return newZones;
        });

        // Add the item back to the initial list
        setItems((prevItems) => {
            const item = initialItems.find((i) => i.id === itemId);
            return item ? [...prevItems, item] : prevItems;
        });
    };
    const calculateScore = () => {
        let correctCount = 0;
        let totalItems = initialItems?.length;

        // Count correct items in each zone
        Object.values(zones).forEach(zone => {
            zone.items.forEach(item => {
                if (item.correctZone === zone.id) {
                    correctCount++;
                }
            });
        });

        // Return the score as a fraction between 0 and 1
        return correctCount / totalItems;
    };
    const handleConfirm = () => {
        const score = calculateScore();
        handleNextTask()
        handleSubmit(zones, score);  // Send the score to the backend
        console.log("Score:", score);
    };

    return (
        <div>
            <>
                <h2>Задача 2</h2>
                <p>
                    Задание: В этом задании вам предстоит распределить страны по трем
                    группам риска: зеленый список, серый список и черный список. Вашей
                    задачей будет определить, к какой группе риска относится каждая из
                    представленных стран.
                </p>
                <DnDContainer items={items} zones={zones} handleDrop={handleDrop} onRemove={handleRemove} />
                <div className="actions" style={{ textAlign: 'right' }}>
                    <SubmissionButton handling={handleConfirm} />
                </div>
                <Sizebox height={40} />
                <Divider />
            </>
        </div>
    )
}

export default Task2
