import React from "react";
import "./style.css";

export const FormAibek = () => {
  const valutas = [
    { value: "KZT", label: "KZT" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];
  const operations = [
    { value: "completed", label: "Завершена" },
    { value: "pending", label: "В ожидании" },
  ];
  const messages = [
    { value: "", label: "Выберите значение" },
    { value: "reason1", label: "Основание 1" },
    { value: "reason1", label: "Основание 2" },
  ];
  const formGroup = [
    { label: "Код субъекта фин. мониторинга" },
    { label: "Организационная форма" },
    { label: "Фамилия физ. лица" },
    { label: "Имя физ. лиц" },
    { label: "Отчество физ. лица" },
    { label: "Наименование СФМ" },
    { label: "ИИН/БИН" },
  ];
  return (
    <>
      <div className="fm1-form">
        <h3 className="form-aibek-h3" style={{ marginTop: "0px" }}>
          Форма ФМ-1
        </h3>

        <div className="form-group">
          <label>Номер формы ФМ-1</label>
          <input type="text" value="1" readOnly />
        </div>

        <div className="form-group">
          <label>Дата формы ФМ-1</label>
          <input type="date" value="2024-05-27" readOnly />
        </div>

        <div className="form-group">
          <label>Состояние операции</label>
          <select>
            <option value="">Выберите значение</option>
            {operations.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
            ;
          </select>
        </div>

        <div className="form-group">
          <label>Дата и время операции</label>
          <input type="datetime-local" value="2024-05-22T10:00" readOnly />
        </div>

        <div className="form-group">
          <label>Основание для подачи сообщения</label>
          <select>
            {messages.map((soob) => (
              <option key={soob.value} value={soob.value}>
                {soob.label}
              </option>
            ))}
          </select>
        </div>

        <h3 className="section-title">
          Сведения о субъекте финансового мониторинга, направившем форму ФМ-1
        </h3>
        <div className="right-section-container">
          <div className="fm1-form section-container">
            <div className="form-container">
              {/* Left section with form inputs */}
              <div className="left-section">
                {formGroup.map((forms) => (
                  <div className="form-group">
                    <label>{forms.label}</label>
                    <input type="text" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right-section">
            <label>Адрес местонахождения</label>
            <label>Документ удостоверяющий личность (для ФЛ)</label>
            <label>Ответственное должностное лицо</label>
          </div>
        </div>

        <h3 className="section-title">Сведения об операции</h3>
        <div className="fm1-form section-container">
          <div className="form-group">
            <label>Номер операции</label>
            <input type="text" value="1" readOnly />
          </div>

          <div className="form-group">
            <label>Код вида операции</label>
            <input type="text" value="27/05/2024" readOnly />
          </div>

          <div className="form-group">
            <label>Количество участников операции</label>
            <input type="number" value="1" readOnly />
          </div>

          <div className="form-group">
            <label>Код валюты операции</label>
            <select>
              <option value="">Выберите значение</option>
              {valutas.map((valuta) => (
                <option key={valuta.value} value={valuta.value}>
                  {valuta.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Сумма операции</label>
            <input type="number" placeholder="Введите сумму" />
          </div>
        </div>
      </div>
    </>
  );
};
