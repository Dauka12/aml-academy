// TableComponent.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';

const TableComponent = ({
  tableData = null
}) => {

  const [selectedRow, setSelectedRow] = useState(1);
  const [selectedRowBtn, setSelectedRowBtn] = useState(null);
  const { id } = useParams();
  const courseId = parseInt(id, 10);

  tableData = tableData ? tableData : [
    { id: 1, details: '=/< 50 МРП установленного на соответствующий финансовый год законом о республиканском бюджете', column1: 'осуществление неидентифицированными владельцами электронных денег – физическими лицами операций по приобретению и использованию электронных денег' },
    { id: 2, details: '< 500 000 тенге либо сумму в иностранной валюте, эквивалентную 500 000 тенге', column1: 'осуществление клиентом – физическим лицом операции по зачислению денег на банковский счет физического лица либо проведению платежа в пользу поставщика услуг посредством оборудования (устройства), предназначенного для приема наличных денег	< 500 000 тенге либо сумму в иностранной валюте, эквивалентную 500 000 тенге' },
    { id: 3, details: '< 500 000 тенге либо сумму в иностранной валюте, эквивалентную 500 000 тенге', column1: 'осуществление клиентом безналичного платежа или перевода денег без использования банковского счета, за исключением случаев совершения клиентом подозрительной операции' },
    { id: 4, details: '< 500 000 тенге либо сумму в иностранной валюте, эквивалентную 500 000 тенге', column1: 'осуществление клиентом – физическим лицом операции по покупке, продаже или обмену наличной иностранной валюты в обменном пункте, за исключением случаев совершения клиентом подозрительной операции' },
    { id: 5, details: '< 200 000 тенге либо сумму в иностранной валюте, эквивалентную 200 000 тенге', column1: 'осуществление клиентом – физическим лицом операции с использованием платежной карточки, не являющейся средством доступа к банковскому счету такого клиента' },
    { id: 6, details: 'в не зависимости от суммы', column1: 'осуществление клиентом – физическим лицом операции по оплате задолженности в рамках исполнительного производства в пользу государственных органов посредством оборудования (устройства), предназначенного для приема наличных денег' },
    { id: 7, details: '< 500 000 тенге либо сумму в иностранной валюте, эквивалентную 500 000 тенге', column1: 'осуществление клиентом – физическим лицом операции по покупке ювелирных изделий из драгоценных металлов и драгоценных камней в розницу, за исключением случаев совершения клиентом подозрительной операции' },
    { id: 8, details: '< 500 000 тенге либо сумму в иностранной валюте, эквивалентную 500 000 тенге', column1: 'осуществление клиентом – физическим лицом операции по покупке аффинированного золота в слитках через обменные пункты, за исключением случаев совершения клиентом подозрительной операции' },
    { id: 9, details: '< 100 000 тенге либо сумму в иностранной валюте, эквивалентную 100 000 тенге', column1: 'осуществление клиентом – физическим лицом операции по оплате страховой премии по договору страхования, за исключением случаев совершения клиентом подозрительной операции' },
  ];
  const handleShowDetails = (rowId) => {
    setSelectedRow(rowId === selectedRow ? null : rowId);
  };
  const handleShowDetailsBtn = (selectedrow) => {
    setSelectedRowBtn(selectedrow === selectedRowBtn ? null : selectedrow);
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>

              <th></th>

              {/* Добавьте заголовки для остальных столбцов по необходимости */}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className={selectedRow === row.id ? 'selected-row' : ''} onClick={() => { handleShowDetails(row.id); if (selectedRow === selectedRowBtn) { setSelectedRowBtn(null) } }}>

                <td>{row.column1}</td>

                {/* Добавьте ячейки для остальных столбцов по необходимости */}
              </tr>
            ))}
          </tbody>
        </table>
        <button className={`details-buttonGeneral ${selectedRow === selectedRowBtn && selectedRow !== null ? 'details-buttonGeneral' : 'details-button2General'}`} onClick={() => handleShowDetailsBtn(selectedRow)}>
          +
        </button>


        {selectedRowBtn !== null && (
          <div className="details-modal">
            <div className="details-content">
              <p className='details-info'>{tableData.find((row) => row.id === selectedRowBtn)?.details}</p>
              <button className="details-button1" onClick={() => handleShowDetailsBtn(selectedRowBtn)}>
                {courseId === 81 ? 'Жабу' : 'Закрыть'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
