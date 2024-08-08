import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';

const DragAndDropComponent = ({
  answerOptions = [
    { id: 1, text: 'если сумма операции равна или превышает сумму, установленную Законом о ПОД/ФТ;' },
    { id: 2, text: 'подлежат финансовому мониторингу независимо от формы их осуществления и суммы, на которую они совершены либо могут или могли быть совершены.' }
  ],
  fieldOptions = [
    { text: '- пороговые операции', correctId: 1 },
    { text: '- подозрительные операции', correctId: 2 }
  ]
}) => {
  const { id } = useParams();
  const courseId = parseInt(id, 10);

  const [answers, setAnswers] = useState(answerOptions);
  const [fields, setFields] = useState({ field1: [], field2: [] });
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);
  const [_fieldOptions, setFieldOptions] = useState(fieldOptions);

  const handleDragStart = (event, answer) => {
    event.dataTransfer.setData('text/plain', answer.id.toString());
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetField) => {
    event.preventDefault();
    const answerId = event.dataTransfer.getData('text/plain');
    const draggedAnswer = answers.find((answer) => answer.id.toString() === answerId);

    if (draggedAnswer && fields[targetField].length === 0) {
      setFields((prevFields) => ({ ...prevFields, [targetField]: [draggedAnswer] }));
    }
  };

  const checkAnswers = () => {
    if (fields.field1.length === 1 && fields.field2.length === 1) {
      const allCorrect =
        fields.field1[0].id === _fieldOptions[0].correctId &&
        fields.field2[0].id === _fieldOptions[1].correctId;

      setIsCorrect(allCorrect);
      setShowResetButton(true);
    } else {
      setIsCorrect(false);
      setShowResetButton(false);
    }
  };

  const handleReset = () => {
    setFields({ field1: [], field2: [] });
    setIsCorrect(false);
    setShowResetButton(false);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  return (
    <div className={`drag-and-drop-component ${isCorrect ? 'correctDouble' : ''}`}>
      <div className="description">
        {courseId === 81 ? 'Жауаптарды Сәйкестендіріңіз' : 'Перетащите варианты ответов в правильные поля. Один вариант в одно поле.'}
      </div>
      <div className="fields-container">
        <div
          className={`answer-field ${fields.field1.length > 0 ? 'dropped' : ''} ${isCorrect ? 'correct' : ''}`}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, 'field1')}
        >
          <div>{_fieldOptions[0] ? _fieldOptions[0].text : 'Text 1'}</div>
          {fields.field1.map((answer) => (
            <div key={answer.id} className="dragged-answer">
              {answer.text}
            </div>
          ))}
        </div>
        {console.log(_fieldOptions)}
        <div
          className={`answer-field ${fields.field2.length > 0 ? 'dropped' : ''} ${isCorrect ? 'correct' : ''}`}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, 'field2')}
        >
          <div>{_fieldOptions[1] ? _fieldOptions[1].text : 'Text 2'}</div>
          {fields.field2.map((answer) => (
            <div key={answer.id} className="dragged-answer">
              {answer.text}
            </div>
          ))}
        </div>
      </div>
      <div className="options-container">
        {shuffleArray([...answers]).map((answer) => (
          <div
            key={answer.id}
            className="option"
            draggable
            onDragStart={(event) => handleDragStart(event, answer)}
          >
            {answer.text}
          </div>
        ))}
      </div>
      <div className="check-button">
        <button className="btnCheck" onClick={checkAnswers}>
          {courseId === 81 ? 'Тексеру' : 'Проверить'}
        </button>
      </div>
      {showResetButton && !isCorrect && (
        <div className="reset-button">
          <button className="btnReset" onClick={handleReset}>
            {courseId === 81 ? 'Қате қайтадан көру!' : 'Неправильно Повторить!'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DragAndDropComponent;
