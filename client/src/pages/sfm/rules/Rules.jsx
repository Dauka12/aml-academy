import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import customerImg from "../../../assets/images/customer.svg";
import circleFirst from "../../../assets/images/r1.svg";
import circleSecond from "../../../assets/images/r2.svg";
import circleThird from "../../../assets/images/r3.svg";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import { useStyle } from "../../../components/VisualModal/StyleContext";
import VisualModal from "../../../components/VisualModal/VisualModal";
import cl from "./Rules.module.css";

function Rules() {
  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const [letterInterval, setLetterInterval] = useState("standard");
  const { t } = useTranslation();

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
      caption: { fontSize: "26px", lineHeight: "26px" },
      subtitle: { fontSize: "18px", lineHeight: "20px" },
      customSize: { fontSize: "18px", lineHeight: "20px" }, // New variable for standard mode
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
              // Use custom size for other elements in standard mode
              item.style.fontSize = fontSizes[size].customSize.fontSize;
              item.style.lineHeight = fontSizes[size].customSize.lineHeight;
            }
            break;
  
          default:
            break;
        }
      });
    }
    handleColorModeChange();

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
  const handleOpenVisualModal = () => {
    console.log("OPEN");
    setOpenVisualModal((prev) => !prev);
    setOpen((prev) => !prev);
  };
  const [openVisualModal, setOpenVisualModal] = useState(open);

  const handleRemoveImages = () => {
    console.log("Images hidden");

    setImagesHidden(true);
  };

  const handleShowImages = () => {
    setImagesHidden(false);
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

    if (family) {
      textContentElement.style.fontFamily = family;
    }
  }, []);

  return (
    <div className={`${cl.rulesWrapper} text-content`}
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
      <div className={`${cl.container} text-content`}>
        <div
          className="interval"
          style={{ letterSpacing: getLetterSpacing(letterInterval) }}
        >
          <h1
            className={`${cl.headline} text-content caption`}
            style={{
              color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
            }}
          >
            {t("internal control rules")}
          </h1>
          <p
            className={`${cl.text} text-content`}
            style={{
              color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
            }}
          >
            {t("descRules1")}
          </p>
          <div
            className={cl.rule}
            style={{
              background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
            }}
          >
            <div className={cl.line}></div>
            <p
              className={`${cl.ruleText} text-content`}
              style={{
                color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
              }}
            >
              {t("descRules2")}
            </p>
          </div>
          <p
            className={`${cl.text} text-content`}
            style={{
              color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
            }}
          >
            {t("descRules3")}
          </p>
          <p
            className={`${cl.text} text-content`}
            style={{
              color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
            }}
          >
            {t("descRules4")}
          </p>
          <div className={cl.ruleBlocks}>
            <div className={cl.block}>
              <p className={`${cl.blockText} text-content`}>
                {t("descRules5")}
              </p>
            </div>
            <div className={cl.block}>
              <p className={`${cl.blockText} text-content`}>
                {t("descRules6")}
              </p>
            </div>
            <div className={cl.block}>
              <p className={`${cl.blockText} text-content`}>
                {t("descRules7")}
              </p>
            </div>
            <div className={cl.block}>
              <p className={`${cl.blockText} text-content`}>
                {t("descRules8")}
              </p>
            </div>
            <div className={cl.block}>
              <p className={`${cl.blockText} text-content`}>
                {t("descRules9")}
              </p>
            </div>
          </div>
          <h1 className={`${cl.subtitle} text-content caption`}
          style={{
            color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
          }}
          >{t("descRules10")}</h1>
          <div
            className={cl.customer}
            style={{
              background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f9f9f9" : styles.colorMode === "blue" ? "#9dd1ff91" : "#000"
            }}
          >
            <div className={cl.customerBlock}>
            {!imagesHidden &&(<img
                src={customerImg}
                alt="customerImg"
                style={{ height: "160px" }}
              />)}
              <p
                className={`${cl.customerText} text-content customSize`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
                }}
              >
                {t("descRules11")}
              </p>
            </div>
            <p
              className={`${cl.text} text-content`}
              style={{
                color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
              }}
            >
              {t("descRules12")}
            </p>
            <div className={cl.customerNumbersContent}>
              <div className={cl.customerBlock}>
                <div className={cl.customerNumber}
                style={{
                  background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                }}
                >
                  <img
                    src={circleFirst}
                    alt="circleFirst"
                    className={cl.circleImg}
                  />
                  <p
                    className={`${cl.numberText} text-content`}
                    style={{
                      color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
                    }}
                  >
                    {t("descRules13")}
                  </p>
                </div>
                <div className={cl.customerNumber}
                 style={{
                  background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                }}
                >
                  <img src={circleSecond} alt="circleSecond" />
                  <p
                    className={`${cl.numberText} text-content`}
                    style={{
                      color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
                    }}
                  >
                    {t("descRules14")}
                  </p>
                </div>
              </div>
              <div className={cl.customerNumberThird}
               style={{
                background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
              }}
              >
                <img src={circleThird} alt="circleThird" />
                <p
                  className={`${cl.numberText} text-content`}
                  style={{
                    color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
                  }}
                >
                  {t("descRules15")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Rules;
