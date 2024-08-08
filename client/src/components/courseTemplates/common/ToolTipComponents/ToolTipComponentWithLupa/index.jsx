import React, { useState } from 'react';
import './style.scss'; // Импортируем стили из DraggableOption

const ToolTipComponentWithLupa = ({ imgUrl, Width, Height, another }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showResults, setShowResults] = useState();
    const [correctOptions] = useState(['- клиент (его представитель)...', '- клиент (его представитель)3...', '- клиент является лицом']); // Задаем correctOptions внутри компонента

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData('text/plain', option);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const option = e.dataTransfer.getData('text/plain');

    // Проверяем, чтобы выбранные ответы были не более двух
    if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleTryAgain = () => {
    setSelectedOptions([]);
    setShowResults(false);
  };

  const isCorrectAns = correctOptions.every((option) => selectedOptions.includes(option));
  const isIncorrectSelectionAns = selectedOptions.some((option) => !correctOptions.includes(option));

  return (
    <div>
      <div className="options-container">
        <div className="options">
          {/* Добавьте свои элементы здесь */}
          <div className="draggable-option-lupa" draggable="true" onDragStart={(e) => handleDragStart(e, "- клиент (его представитель)...")}>
          <div className="tooltipLupa">
          - клиент (его представитель) и бенефициарный собственник являются лицом, включенным в  <span className="highlightLupa" randomText="причастных к террористической деятельности">Список лиц</span>, а также<span className="highlightLupa" randomText="организаций и лиц, связанных с финансированием терроризма и экстремизма ">Перечень</span>и в<span className="highlightLupa" randomText="организаций и лиц, связанных с финансированием терроризма и экстремизма с финансированием оружия массового уничтожения;">Перечень ФРОМУ </span></div>
          </div>

          <div className="draggable-option-lupa" draggable="true" onDragStart={(e) => handleDragStart(e, " - аффилированные лица...")}>
            <div className="tooltipLupa">
            - аффилированные лица клиента ранее привлекались к административной ответственности;
            </div> 
          </div>

          <div className="draggable-option-lupa" draggable="true" onDragStart={(e) => handleDragStart(e, "- клиент (его представитель)3...")}>
          <div className="tooltipLupa">
          - клиент (его представитель) и бенефициарный собственник являются установленным лицом или организацией, в отношении которых применяются международные санкции в соответствии с резолюциями <span className="highlightLupa" randomText="Совет Безопасности ООН;">СОВБЕЗ ООН</span> 
            </div>
          </div>

          <div className="draggable-option-lupa" draggable="true" onDragStart={(e) => handleDragStart(e, " - клиент ранее имел гражданство...")}>
            <div className="tooltipLupa">
            - клиент ранее имел гражданство иностранного государства;
            </div>
          </div>

          <div className="draggable-option-lupa" draggable="true" onDragStart={(e) => handleDragStart(e, "- клиент является лицом")}>
          <div className="tooltipLupa">
          - клиент является лицом, которому присвоен уровень риска, требующий применения усиленных мер надлежащей проверки и <span className="highlightLupa" randomText="Правил внутреннего контроля">ПВК</span>, за исключением заключения страховыми организациями договоров страхования в электронной форме, страховая премия и (или) страховая выплата по которым осуществляются через банковские счета.
            </div>
          </div>

          <div className="draggable-option-lupa" draggable="true" onDragStart={(e) => handleDragStart(e, "- клиент является государственным служащим")}>
          <div className="tooltipLupa">
          - клиент является государственным служащим
            </div>
          </div>
        </div>

        <b className='B'></b>
        <div className='dropZoneParent'>
          <div
            className={`drop-zone ${isCorrectAns ? 'correct-lupa' : isIncorrectSelectionAns ? 'incorrect-lupa' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ backgroundImage: `url(${imgUrl})`, width: Width, height: Height }}
          >
            {isCorrectAns && another === 'true' && <span className="check-mark">✔</span>}
            <br />
            <ul>
              {selectedOptions.map((option, index) => (
                <li key={index}>{option.length > 40 ? option.slice(0, 40) + "......" : option}</li>
              ))}
            </ul>
          </div>
          <button className="BtnToolTipLupa" onClick={handleTryAgain}>
            Попробовать еще раз
          </button>
        </div>
      </div>
      <div className="selected-options"></div>
      {showResults && (
        <div className="results-message">
          {isCorrectAns ? 'Правильно!' : 'Попробуйте еще раз, выбрав правильные ответы.'}
        </div>
      )}
    </div>
  );
};

export default ToolTipComponentWithLupa;
