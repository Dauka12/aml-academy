import React, { useEffect, useState } from "react";
import cl from "./MutualEvaluation.module.css";
import DefaultHeader from "../../../components/defaultHeader/DefaultHeader";
import Footer from "../../../components/footer/Footer";
import mutualEvaluationImg from "../../../assets/images/marks.svg";
import Header from "../../../components/header/v2";
import VisualModal from "../../../components/VisualModal/VisualModal";

import { useTranslation } from "react-i18next";
import {
  StyleProvider,
  useStyle,
} from "../../../components/VisualModal/StyleContext";

function MutualEvaluation() {
  const [imagesHidden, setImagesHidden] = useState(false);

  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
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
      caption: { fontSize: "24px", lineHeight: "26px" },
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
    setImagesHidden(!styles.showImage);

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
  }, [checkStyle, userEntry, styles, setImagesHidden, fontSizes]);
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
  const { t } = useTranslation();
  const [letterInterval, setLetterInterval] = useState("standard");

  const handleOpenVisualModal = () => {
    console.log("OPEN");
    setOpenVisualModal((prev) => !prev);
    setOpen((prev) => !prev);
  };
  const [openVisualModal, setOpenVisualModal] = useState(open);

  const handleCloseVisualModal = () => {
    setOpenVisualModal(false);
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
  useEffect(() => {
    const textContentElement = document.querySelector(".text-content");
    const family = styles.fontFamily;
    setImagesHidden(!styles.showImage);

    if (family) {
      textContentElement.style.fontFamily = family;
    }
  }, []);
  const handleRemoveImages = () => {
    console.log("Images hidden");

    setImagesHidden(true);
  };

  const handleShowImages = () => {
    setImagesHidden(false);
  };
  
  const darkModeStyles = {
    filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%)', 
  };
  
  const lightModeStyles = {
    filter: 'invert(0%)', 
    
  };
  
  const blueModeStyles = {
    filter: 'invert(0%)',

  };
  return (
    <div className={`${cl.mutualEvaluationWrapper} text-content`}
    style={{
      background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#fff" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
    }}
    >
      <VisualModal
        open={openVisualModal}
        onRemoveImages={handleRemoveImages}
        onShowImages={handleShowImages}
        onIntervalChange={() => {}}
        styles={styles}
      />

      <Header
        dark={styles.colorMode == "dark" ? false : true}
        handleOpenVisualModal={handleOpenVisualModal}
      />
      <div className={cl.container}>
        <div
          className="interval"
          style={{ letterSpacing: getLetterSpacing(letterInterval) }}
        >
          <h1
            className={`${cl.headline} text-content caption`}
            style={{
              color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
            }}
          >
            {t("mutual assessment")}
          </h1>
          <div className={`${cl.mutualEvaluationContent} text-content`}>
            {!imagesHidden && (
              <img
  src={mutualEvaluationImg}
  alt="mutualEvaluationImg"
  style={{
    height: "190px",
    ...(styles.colorMode === 'dark' ? darkModeStyles : (styles.colorMode === 'light' ? lightModeStyles : blueModeStyles)),
  }}
/>
            )}
            <p
              className={`${cl.mutualEvaluationText} text-content`}
              style={{
                color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",            
              }}
            >
              {t("descMut1")}
            </p>
          </div>
          <div
            className={`${cl.mutualEvaluationBlock} text-content`}
            style={{
              background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
            }}
          >
            <p
              className={`${cl.text} text-content`}
              style={{
                color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",            
              }}
            >
              {t("descMut2")}
              <br></br>
              <br></br>
              {t("descMut3")}
              <br></br>
              <br></br>
              {t("descMut4")}
              <br></br>
              <br></br>
              {t("descMut5")}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MutualEvaluation;
