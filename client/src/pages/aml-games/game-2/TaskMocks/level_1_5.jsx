import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import DnDContainer from '../../components/dndBox/DnDContainer'; // Импортируем новый компонент
import SubmissionButton from "../../components/sub-button";
import { sendAnswerToBackend } from "../../utils/api";
import { nextTask, setTaskBySublevel } from "../store/slices/taskSlice";
import { initialItems, scrollToTopAnimated } from "./data";



const Level_1_5 = () => {
  const [items, setItems] = useState(initialItems);
  const [zones, setZones] = useState({
    '1': { id: 1, title: 'Идентификационные данные', items: [] },
    '2': { id: 2, title: 'Контактные данные', items: [] },
    '3': { id: 3, title: 'Общие сведения', items: [] },
  });

  const { tasks, currentTaskIndex } = useSelector((state) => state.tasks);
  const currentTask = tasks[currentTaskIndex];
  const dispatch = useDispatch();
  const { level, subLevel } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setTaskBySublevel({ levelId: Number(level), subLevelId: Number(subLevel) }));
  }, [level, subLevel, dispatch]);

  useEffect(() => {
    scrollToTopAnimated(); // Scroll to top whenever the task changes
}, [currentTaskIndex]);

  const handleSubmit = (answers, isCorrect) => {
    sendAnswerToBackend(1, 5, 1, answers, isCorrect);
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
    console.log(zones);

  };

  const calculateScore = () => {
    let correctCount = 0;
    let totalItems = initialItems.length;

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
  const handleNextTask = () => {
    dispatch(nextTask(navigate)); // Dispatch action to go to the next task
};

  const handleConfirm = () => {
    const score = calculateScore();
    handleSubmit(zones, score);  // Send the score to the backend
    handleNextTask()
    console.log("Score:", score);
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

  return (
    <div>
      {currentTask?.content}
      <DnDContainer items={items} zones={zones} handleDrop={handleDrop} onRemove={handleRemove} />
      <div style={{ textAlign: 'right', marginRight: '30px' }}>
        <SubmissionButton handling={handleConfirm} />
      </div>
    </div>
  );
};

export default Level_1_5;
