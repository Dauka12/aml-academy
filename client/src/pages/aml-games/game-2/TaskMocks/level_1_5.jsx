import React, { useState } from "react";
import DnDContainer from '../../components/dndBox/DnDContainer'; // Импортируем новый компонент
import { sendAnswerToBackend } from "../../utils/api";

const initialItems = [
  { id: 1, name: 'ФИО', initialZoneId: 0, correctZone: 1 },
  { id: 2, name: 'Документ удостоверяющий личность', initialZoneId: 0, correctZone: 1 },
  { id: 3, name: 'ИИН', initialZoneId: 0, correctZone: 2 },
  { id: 4, name: 'Номер и серия документа', initialZoneId: 0, correctZone: 2 },
  { id: 5, name: 'Электронная почта', initialZoneId: 0, correctZone: 2 },
  { id: 6, name: 'Адрес места регистрации', initialZoneId: 0, correctZone: 3 },
  { id: 7, name: 'Номер контактного телефона', initialZoneId: 0, correctZone: 1 },
  { id: 8, name: 'Дата заполнения анкеты', initialZoneId: 0, correctZone: 2 },
  { id: 9, name: 'Кем выдан документ', initialZoneId: 0, correctZone: 3 },
  { id: 10, name: 'Когда выдан документ', initialZoneId: 0, correctZone: 3 },
  { id: 11, name: 'Дата рождения', initialZoneId: 0, correctZone: 1 },
  { id: 12, name: 'Происхождение денежных средств', initialZoneId: 0, correctZone: 1 },
];

const Level_1_5 = () => {
  const [items, setItems] = useState(initialItems);
  const [zones, setZones] = useState({
    '1': { id: 1, title: 'Идентификационные данные', items: [] },
    '2': { id: 2, title: 'Контактные данные', items: [] },
    '3': { id: 3, title: 'Общие сведения', items: [] },
  });

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

  const handleConfirm = () => {
    const score = calculateScore();
    handleSubmit(zones, score);  // Send the score to the backend
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
      <h2>Задание 1</h2>
      <DnDContainer items={items} zones={zones} handleDrop={handleDrop} onRemove={handleRemove} />
      <div className="actions">
        <button
          className='blue'
          onClick={handleConfirm}  // Call handleConfirm on button click
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
};

export default Level_1_5;
