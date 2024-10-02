import React from "react";
import "./style.css";

export const FormAibek = () => {
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
            <option value="completed">Завершена</option>
            <option value="pending">В ожидании</option>
          </select>
        </div>

        <div className="form-group">
          <label>Дата и время операции</label>
          <input type="datetime-local" value="2024-05-22T10:00" readOnly />
        </div>

        <div className="form-group">
          <label>Основание для подачи сообщения</label>
          <select>
            <option value="">Выберите значение</option>
            <option value="reason1">Основание 1</option>
            <option value="reason2">Основание 2</option>
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
                <div className="form-group">
                  <label>Код субъекта фин. мониторинга</label>
                  <input type="text" />
                </div>

                <div className="form-group">
                  <label>Организационная форма</label>
                  <input type="text" />
                </div>

                <div className="form-group">
                  <label>Фамилия физ. лица</label>
                  <input type="text" />
                </div>

                <div className="form-group">
                  <label>Имя физ. лица</label>
                  <input type="text" />
                </div>

                <div className="form-group">
                  <label>Отчество физ. лица</label>
                  <input type="text" />
                </div>

                <div className="form-group">
                  <label>Наименование СФМ</label>
                  <input type="text" />
                </div>

                <div className="form-group">
                  <label>ИИН/БИН</label>
                  <input type="text" />
                </div>
              </div>
            </div>

            {/* Right section with dropdown buttons */}
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
              <option value="KZT">KZT</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
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
