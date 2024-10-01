import React, { useState } from "react";
import "./style.css";

const Customer = ({ customer }) => {
  const [selectedOperations, setSelectedOperations] = useState({}); // Store selected operation for each customer
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // Track which dropdown is open

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleSelectOperation = (operation, index) => {
    setSelectedOperations((prevState) => ({
      ...prevState,
      [index]: operation,
    }));
    setOpenDropdownIndex(null); // Close the dropdown after selecting
  };

  return (
    <div className="customer-container">
      {customer.map((customer, index) => (
        <div key={index} className="customer-item">
          <div className="customer-info">
            <img
              src={customer.avatar || "default-avatar.png"}
              alt="avatar"
              className="customer-avatar"
            />
            <div className="customer-name">{customer.name}</div>
          </div>
          <div className="operation-select">
            <div
              className="operation-selector"
              onClick={() => toggleDropdown(index)}
            >
              {selectedOperations[index] || <>вид операций</>}
            </div>
            {openDropdownIndex === index && (
              <div className="operation-dropdown">
                <div
                  className="operation-option"
                  onClick={() =>
                    handleSelectOperation("пороговые операции", index)
                  }
                >
                  пороговые операции
                </div>
                <div
                  className="operation-option"
                  onClick={() =>
                    handleSelectOperation("подозрительные операции", index)
                  }
                >
                  подозрительные операции
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Customer;
