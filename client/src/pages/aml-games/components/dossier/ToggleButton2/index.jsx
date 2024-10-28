import React, { useState } from "react";
import "./style.css";

const ToggleButton2 = () => {
  const [selected, setSelected] = useState("да");

  return (
    <div className="toggle-container">
      <div
        className={`toggle-button ${selected === "да" ? "selected" : ""}`}
        onClick={() => setSelected("да")}
      >
        при личном присутствии клиента
      </div>
      <div
        className={`toggle-button ${selected === "нет" ? "selected" : ""}`}
        onClick={() => setSelected("нет")}
      >
        без физического присутствия клиента
      </div>
      <div className={`toggle-bg ${selected}`} />
    </div>
  );
};

export default ToggleButton2;
