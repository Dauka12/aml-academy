import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import avatar from "./profileImg/profileIcon.png";
import ToggleButton from "./ToggleButton/index";
import ToggleButton2 from "./ToggleButton2";
import SubmissionButton from "../sub-button";
import { useNavigate } from "react-router-dom";
import "./style.scss";

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
      <span className="custom-radio-icon">{checked && <IoCheckmark />}</span>
      {label}
    </label>
  );
};

const DossierComponent = ({ handleSubmit, onRiskChange }) => {
  const [participantType, setParticipantType] = useState("продавец");
  const [operationType, setOperationType] = useState(
    "продажа ювелирных изделий"
  );
  const [additionalInfoRisk, setAdditionalInfoRisk] = useState(false);
  const navigate = useNavigate();

  const handleToggleChange = (value) => {
    setAdditionalInfoRisk(value);
    onRiskChange(value ? "high" : "low");
  };

  const handling = () => {
    handleSubmit("talon", 1);
    navigate("/courses/aml-games/game/read/1/3/2");
  };

  return (
    <div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
            <h2>Тип услуги или продукта</h2>
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
            <h2>Способ предоставления продукта или услуги</h2>
            <div className="input-group">
              <label>Способ предоставления услуги ?</label>
              <ToggleButton2 />
            </div>
            <div className="input-group">
              <label>
                Будут ли дополнительные сведения, которые могут повысить риск?
              </label>
              <ToggleButton onChange={handleToggleChange} />
            </div>
          </div>
          <div className="footer-strip"></div>
          <div className="rank-section">
            <h2>Оценка риска</h2>
            Какой риск вы определите данному клиенту?
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <SubmissionButton handling={handling} />
      </div>
    </div>
  );
};

export default DossierComponent;
