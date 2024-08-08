import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import avatar from "./profileImg/profileIcon.png";
import "./style.scss";
import ToggleButton from "./ToggleButton/index";

const CustomRadioButton = ({ name, value, checked, onChange, label }) => {
  return (
    <label className="custom-radio">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="custom-radio-icon">
        {checked && <IoCheckmark />}
      </span>
      {label}
    </label>
  );
};

const DossierComponent = () => {
  const [participantType, setParticipantType] = useState("продавец");
  const [operationType, setOperationType] = useState("продажа ювелирных изделий");

  return (
    <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
        <div className="dossier-container">
        <div className="header-background">
          <div className="dossier-header">Д О С Ь Е</div>
        </div>
        <div className="client-info">
          <h2>Информация о клиенте</h2>
          <div className="info-section">
            <div className="form-fields">
              {["Фамилия", "Имя", "Отчество", "ИИН"].map((label) => (
                <div className="input-group" key={label}>
                  <label>{label}:</label>
                  <input type="text" />
                </div>
              ))}
            </div>
            <div className="avatar-container-dossier">
              <img src={avatar} alt="Avatar" />
            </div>
          </div>
          <div className="info-section-row">
            {[
              "Документ, удостоверяющий личность",
              "Бенефициарный собственник",
              "Адрес (юридический/фактический)",
              "Цель и характер деловых отношений",
            ].map((label) => (
              <div className="input-group" key={label}>
                <label>{label}:</label>
                <input type="text" />
              </div>
            ))}
          </div>
        </div>
        <div className="footer-strip"></div>
        <div className="operation-section">
          <h2>Информация по операции</h2>
          <div className="radio-group">
            <p>Вид участника:</p>
            {["покупатель", "продавец", "иное"].map((type) => (
              <CustomRadioButton
                key={type}
                name="participantType"
                value={type}
                checked={participantType === type}
                onChange={() => setParticipantType(type)}
                label={type}
              />
            ))}
          </div>
          <div className="radio-group">
            <p>Вид операции:</p>
            {["покупка", "продажа ювелирных изделий", "иное"].map((type) => (
              <CustomRadioButton
                key={type}
                name="operationType"
                value={type}
                checked={operationType === type}
                onChange={() => setOperationType(type)}
                label={type}
              />
            ))}
          </div>
          <div className="input-group">
            <label>Сумма:</label>
            <input type="text" />
          </div>
        </div>
        <div className="footer-strip"></div>
        <div className="risk-section">
          <h2>Риск-ориентированные показатели</h2>
          {[
            "Является ли клиент ПДЛ?",
            "Является ли клиент лицом без гражданства?",
            "Является ли клиент без адреса регистрации или пребывания в Республике Казахстан?",
            "Находится ли клиент в Списке ФТ/ФРОМУ?",
            "Имеются основания для сомнения в достоверности полученных данных?",
            "Предлагает ли клиент ускориться в проведении операции либо на нестандартных или необычно сложных схемах расчетов, использование которых отличаются от обычной практики?",
            "Ранее были ли в отношении данного клиента подозрения?",
            "Клиент совершает ли действия, направленные на уклонение от процедур надлежащей проверки клиента?",
          ].map((label) => (
            <div className="input-group" key={label}>
              <label>{label}</label>
              <ToggleButton />
            </div>
          ))}
        </div>
        <div className="footer-strip"></div>
        <div className="type-section">
          {[
            "Превышает ли операция 5 000 000 тенге?",
            "Совершается ли клиентом покупка ювелирного изделия, не обращая внимания на ценность приобретаемого товара, его размер, вес и природные особенности?",
          ].map((label) => (
            <div className="input-group" key={label}>
              <label>{label}</label>
              <ToggleButton />
            </div>
          ))}
        </div>
        <div className="footer-strip"></div>
        <div className="product-section">
          {[
            "Способ предоставления услуги (без физического присутствия клиента/при личном присутствии клиента) ?",
            "Будут ли дополнительные сведения, которые могут повысить риск?",
          ].map((label) => (
            <div className="input-group" key={label}>
              <label>{label}</label>
              <ToggleButton />
            </div>
          ))}
        </div>
        <div className="footer-strip"></div>
        <div className="rank-section">
          {[
            "Какой риск вы определите данному клиенту?",
            "Правильный ответ в случае, если был ответ «Нет» на вопрос «Будут ли дополнительные сведения, которые могут повысить риск?»",
          ].map((label) => (
            <div className="input-group" key={label}>
              <label>{label}</label>
              <ToggleButton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DossierComponent;
