import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header/v2";
import cl from "./Subjects.module.css";

import data_eng from '../../../components/data/subjectsData eng.json';
import data_kz from '../../../components/data/subjectsData kz.json';
import data_ru from '../../../components/data/subjectsData ru.json';

import { useTranslation } from "react-i18next";
import { useStyle } from "../../../components/VisualModal/StyleContext";
import VisualModal from "../../../components/VisualModal/VisualModal";

function Subjects() {
  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();

    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [letterInterval, setLetterInterval] = useState("standard");


    const fontSizes = {
      small: {
        fontSize: "15px",
        lineHeight: "17px",
        caption: { fontSize: "18px", lineHeight: "20px" },
        subtitle: { fontSize: "14px", lineHeight: "16px" },
        numbers: { fontSize: "30px", lineHeight: "35px" }, // New size for numbers in small
      },
      standard: {
        fontSize: "16px",
        lineHeight: "18px",
        caption: { fontSize: "26px", lineHeight: "28px" },
        subtitle: { fontSize: "18px", lineHeight: "20px" },
        numbers: { fontSize: "33px", lineHeight: "35px" }, // Size for numbers in standard
      },
      large: {
        fontSize: "24px",
        lineHeight: "26px",
        caption: { fontSize: "32px", lineHeight: "34px" },
        subtitle: { fontSize: "22px", lineHeight: "24px" },
        numbers: { fontSize: "35px", lineHeight: "37px" }, // New size for numbers in large
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
    
              // Adjust size for caption, subtitle, and numbers in small and large modes
              if (item.classList.contains("caption")) {
                item.style.fontSize = fontSizes[size].caption.fontSize;
                item.style.lineHeight = fontSizes[size].caption.lineHeight;
              } else if (item.classList.contains("subtitle")) {
                item.style.fontSize = fontSizes[size].subtitle.fontSize;
                item.style.lineHeight = fontSizes[size].subtitle.lineHeight;
              } else if (item.classList.contains("numbers")) {
                item.style.fontSize = fontSizes[size].numbers.fontSize;
                item.style.lineHeight = fontSizes[size].numbers.lineHeight;
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
              } else if (item.classList.contains("numbers")) {
                item.style.fontSize = fontSizes[size].numbers.fontSize;
                item.style.lineHeight = fontSizes[size].numbers.lineHeight;
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
//currentLanguage, styles.fontSize, styles.showImage
  const handleColorModeChange = (mode) => {
    // Remove previous color mode classes
    const containerElement = document.querySelector(".text-content");
    if (containerElement) {
      containerElement.classList.remove(
        "light-mode",
        "dark-mode",
        "inverted-mode",
        "blue-mode"
      );
    }

    const { colorMode } = styles;

    if (containerElement) {
      containerElement.classList.add(colorMode + "-mode");
    }
  };

  
  useEffect(() => {
    const textContentElement = document.querySelector(".text-content");
    const family = styles.fontFamily;

    if (family) {
      textContentElement.style.fontFamily = family;
    }
  }, []);

  const handleOpenVisualModal = () => {
    console.log("OPEN");
    setOpenVisualModal((prev) => !prev);
    setOpen((prev) => !prev);
  };

  const [openVisualModal, setOpenVisualModal] = useState(open);
  const handleRemoveImages = () => {
    console.log("Images hidden");
  };

  const handleShowImages = () => {
  };

  const handleIntervalChange = (interval) => {
    console.log("Interval changed");
    setLetterInterval(interval);
  };

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

  return (
    <div className={`${cl.subjectsWrapper} text-content`}
    style={{
      background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#fff" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
    }}
    >
      <VisualModal
        open={openVisualModal}
        onRemoveImages={handleRemoveImages}
        onShowImages={handleShowImages}
        onIntervalChange={handleIntervalChange}
        styles={styles}
      />
      <Header
        dark={styles.colorMode === "dark" ? false : true}
        handleOpenVisualModal={handleOpenVisualModal}
      />
      <div className={cl.container}>
        <div
          className="interval"
          style={{ letterSpacing: getLetterSpacing(letterInterval) }}
        >
          <h1 className={`${cl.headline} text-content caption`}
          style={{
            color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",          }}
          >
            {t("types of subjects of financial monitoring")}
          </h1>
          <p className={`${cl.headline99} text-content`}
           style={{
            color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",          }}

          >{t("descSub1")}</p>
          <div className={`${cl.cardContent} text-content`}
            style={{
              background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f9f9f9" : styles.colorMode === "blue" ? "#9dd1ff" : "#000",
              // display: styles.showImage ? 'block' : 'none', // Add this line
              color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
            }}
          >
            {(i18n.language === "ru"
              ? data_ru
              : i18n.language === "kz"
              ? data_kz
              : data_eng
            ).subjects.map((item) => (
              <div className={`${cl.card} text-content`} key={item.id}
              style={{
                background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f9f9f9" : styles.colorMode === "blue" ? "#9dd1ff" : "#000",
                color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
              }}
              >
                <p className={`${cl.number} text-content numbers`}
                
                style={{
                  background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f9f9f9" : styles.colorMode === "blue" ? "#9dd1ff" : "#000",
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
                }}
                >{item.number}</p>
                <p className={`${cl.text} text-content`}
                style={{
                  background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f9f9f9" : styles.colorMode === "blue" ? "#9dd1ff" : "#000",
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
                }}
                >{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Subjects;
