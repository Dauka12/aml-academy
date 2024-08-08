import React, { useState } from "react";
import "./style.css";

const ToggleButton = () => {
  const [selected, setSelected] = useState("да");

  return (
    <div className="toggle-container">
      <div
        className={`toggle-button ${selected === "да" ? "selected" : ""}`}
        onClick={() => setSelected("да")}
      >
        Да
      </div>
      <div
        className={`toggle-button ${selected === "нет" ? "selected" : ""}`}
        onClick={() => setSelected("нет")}
      >
        Нет
      </div>
      <div className={`toggle-bg ${selected}`} />
    </div>
  );
};

export default ToggleButton;
