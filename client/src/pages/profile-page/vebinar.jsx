import React, { useState, useEffect } from "react";

import VebinarTable from "../../components/vebinarTable/VebinarTable";

import { BiFilter } from "react-icons/bi";

import "./vebinar.scss";

import { useStyle } from "../../components/VisualModal/StyleContext";

function Vebinar(props) {
  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const { interval } = styles;

  const [filterValue, setFilterValue] = useState("Сначала новые");
  const { colorMode } = styles;

   const fontSizes = {
    small: {
      fontSize: "15px",
      lineHeight: "17px",
      caption: { fontSize: "18px", lineHeight: "20px" },
      subtitle: { fontSize: "14px", lineHeight: "16px" },
    },
    standard: {
      fontSize: "16px",
      lineHeight: "18px",
      caption: { fontSize: "26px", lineHeight: "28px" },
      subtitle: { fontSize: "18px", lineHeight: "20px" },
    },
    large: {
      fontSize: "24px",
      lineHeight: "26px",
      caption: { fontSize: "32px", lineHeight: "34px" },
      subtitle: { fontSize: "22px", lineHeight: "24px" },
    },
  };
  useEffect(() => {
    if (!checkStyle) return;
    console.log(userEntry);
    if (userEntry) return;

    const textContentElement = document.querySelectorAll(".text-content");
    const size = styles.fontSize;
    if (textContentElement) {
      textContentElement.forEach((item) => {
        switch (size) {
          case "small":
          case "large":
            // Use specified size for small and large modes
            item.style.fontSize = fontSizes[size].fontSize;
            item.style.lineHeight = fontSizes[size].lineHeight;

            // Adjust size for caption and subtitle in small and large modes
            if (item.classList.contains("caption")) {
              item.style.fontSize = fontSizes[size].caption.fontSize;
              item.style.lineHeight = fontSizes[size].caption.lineHeight;
            } else if (item.classList.contains("subtitle")) {
              item.style.fontSize = fontSizes[size].subtitle.fontSize;
              item.style.lineHeight = fontSizes[size].subtitle.lineHeight;
            }
            break;

          case "standard":
            // Use different sizes for different elements in standard mode
            if (item.classList.contains("caption")) {
              item.style.fontSize = fontSizes[size].caption.fontSize;
              item.style.lineHeight = fontSizes[size].caption.lineHeight;
            } else if (item.classList.contains("subtitle")) {
              item.style.fontSize = fontSizes[size].subtitle.fontSize;
              item.style.lineHeight = fontSizes[size].subtitle.lineHeight;
            } else {
              // Default size for other elements
              item.style.fontSize = fontSizes[size].fontSize;
              item.style.lineHeight = fontSizes[size].lineHeight;
            }
            break;

          default:
            break;
        }
      });
    }
    
  }, [checkStyle, userEntry, styles, fontSizes]);

  const getLetterSpacing = (interval) => {
    interval = styles.letterInterval;

    switch (interval) {
      case "medium":
        return "2px";
      case "large":
        return "4px";
      default:
        return "1px";
    }
  };

  const handleFilterChange = (option) => {
    setFilterValue(option);
  };

  return (
    <>
      <div
        className="vebinar-filter"
        style={{
          background:
            styles.colorMode === "dark"
              ? "#000"
              : styles.colorMode === "light"
              ? "#f9f9f9"
              : styles.colorMode === "blue"
              ? "#9dd1ff"
              : "#000",
        }}
      >
        <div className="text-content"
         style={{
          color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
          letterSpacing: getLetterSpacing(interval)
        }}
        >Календарь выбранных вебинаров:</div>
        <div>
          <BiFilter />
          <Select
            options={["Сначала новые", "Сначала старые"]}
            value={filterValue}
            handleChange={handleFilterChange}
          />
        </div>
      </div>
      <div
        className="vebinar-table-block"
        style={{
          background:
            styles.colorMode === "dark"
              ? "#000"
              : styles.colorMode === "light"
              ? "#f9f9f9"
              : styles.colorMode === "blue"
              ? "#9dd1ff"
              : "#000",
        }}
      >
        <VebinarTable data={[]} />
      </div>
    </>
  );
}

const Select = ({ value, options, handleChange }) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    handleChange(selectedValue);
  };

  return (
    <select value={value} onChange={handleSelectChange} className="text-content">
      {options.map((option) => {
        return (
          <option value={option} key={option} >
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default Vebinar;
