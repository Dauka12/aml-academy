import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './DnDContainer.scss'; // Импортируем стили
import DraggableItem from './DraggableItem';
import DropZone from './DropZone';

const DnDContainer = ({ items, zones, handleDrop, onRemove }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container5">
        <div className="item-container">
          {items.map((item) => (
            <DraggableItem key={item.id} id={item.id} name={item.name} flag={item.flag} correctZone={ item.correctZone } />
          ))}
        </div>
        <div className="zones-container">
          {Object.values(zones).map((zone) => (
            <DropZone key={zone.id} id={zone.id} title={zone.title} items={zone.items} onDrop={handleDrop} onRemove={onRemove} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default DnDContainer;
