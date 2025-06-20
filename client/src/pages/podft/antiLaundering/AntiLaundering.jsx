import React, { useEffect, useState } from "react";
import cl from "./AntiLaundering.module.css";
import Footer from "../../../components/footer/Footer";
import schemeImgRu from "../../../assets/images/schemeRu.svg";
import schemeImgKz from "../../../assets/images/schemeKz.png";
import schemeImgEng from "../../../assets/images/schemeEng.png";
import arrowImgLight from "../../../assets/images/arrow.svg";
import arrowImgDark from "../../../assets/images/arrowDark.svg";

import Header from "../../../components/header/v2";

import { useTranslation } from "react-i18next";
import VisualModal from "../../../components/VisualModal/VisualModal";
import "./AntiLaundering.module.css";
import { useStyle } from "../../../components/VisualModal/StyleContext";

function AntiLaundering() {
  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const [letterInterval, setLetterInterval] = useState("standard");
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [activeTab, setActiveTab] = useState(1);
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
        "blue-mode",
      );
    }

    const { colorMode } = styles;

    if (containerElement) {
      containerElement.classList.add(colorMode + "-mode");
    }
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
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

  const getShowImage = () => {
    return imagesHidden;
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
    <div className={`${cl.antiLaunderingWrapper} text-content`}
    style={{
      background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#fff" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
    }}
    >
      <div
        className="interval"
        style={{ letterSpacing: getLetterSpacing(letterInterval) }}
      >
        <VisualModal
          open={openVisualModal}
          onRemoveImages={handleRemoveImages}
          onShowImages={handleShowImages}
          onFontFamily={() => {}}
          onIntervalChange={() => {}}
          styles={styles}
        />
        <Header
          dark={styles.colorMode == "dark" ? false : true}
          handleOpenVisualModal={handleOpenVisualModal}
          style={{ letterSpacing: getLetterSpacing(letterInterval) }}
        />
        <div className={cl.container}>
          <div
            className="interval"
            style={{ letterSpacing: getLetterSpacing(letterInterval) }}
          >
            <h1
              className={`${cl.headline} text-content caption`}
              style={{
                color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",              }}
            >
              {t("anti-washing system of the RK")}
            </h1>
            {!imagesHidden &&
              (i18n.language === "ru" ? (
                <img src={schemeImgRu} alt="schemeImg" className={cl.scheme}  style={{ maxWidth: "100%", height: "auto" }}/>
              ) : i18n.language === "kz" ? (
                <img src={schemeImgKz} alt="schemeImg" className={cl.scheme}  style={{ maxWidth: "100%", height: "auto" }}/>
              ) : (
                <img src={schemeImgEng} alt="schemeImg" className={cl.scheme} style={{ maxWidth: "100%", height: "auto" }}/>
              ))}
            <p
              className={`${cl.text} text-content`}
              style={{ fontSize: "18px" }}
            >
              {t("AntiLaunderingText1")}{" "}
            </p>
            <p
              className={`${cl.text} text-content`}
              style={{ fontSize: "18px" }}

            >
              {t("AntiLaunderingText2")}
            </p>
            <div className={cl.stagesContent}>
              <img
                src={
                  styles.colorMode === "light" ? arrowImgLight : arrowImgDark
                }
                alt="arrowImg"
                className={cl.arrowImg}
              />{" "}
              <div className={cl.stagesArrow}>
                <div
                  onClick={() => handleTabClick(1)}
                  className={`${cl.stage} ${
                    activeTab === 1 ? `${cl.active}` : ""
                  }`}
                >
                  <p className={`${cl.stageText} text-content`}
                   style={{
                    color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                  }}
                  >
                    {t("firstStage")}
                  </p>
                  <div className={cl.circle}></div>
                </div>
                <div
                  onClick={() => handleTabClick(2)}
                  className={`${cl.stageSecond} ${
                    activeTab === 2 ? `${cl.active}` : ""
                  }`}
                >
                  <div className={cl.circle}></div>
                  <p className={`${cl.stageText} text-content`}
                   style={{
                    color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                  }}
                  >
                    {t("secondStage")}
                  </p>
                </div>
                <div
                  onClick={() => handleTabClick(3)}
                  className={`${cl.stageThird} ${
                    activeTab === 3 ? `${cl.active}` : ""
                  }`}
                >
                  <p className={`${cl.stageText} text-content`}
                   style={{
                    color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                  }}
                  >
                    {t("thirdStage")}
                  </p>
                  <div className={cl.circle}></div>
                </div>
              </div>
              <div
                className={`${cl.arrowTabs} text-content`}
                style={{
                  background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                }}
              >
                {activeTab === 1 && (
                  <p className={`${cl.arrowTabsText} text-content`}
                  style={{
                    color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                  }}
                  >
                    <span
                      className={`${cl.title} text-content`}
                      style={{
                        color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                      }}
                    >
                      {t("firstStage")}
                    </span>
                    <br></br>

                    {t("descFirstStage")}
                  </p>
                )}
                {activeTab === 2 && (
                  <p className={`${cl.arrowTabsText} text-content`}
                  style={{
                    color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                  }}
                  >
                    <span
                      className={`${cl.title} text-content`}
                      style={{
                        color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                      }}
                    >
                      {t("secondStage")}
                    </span>
                    <br></br>
                    {t("descSecondStage1")}
                    <br></br>
                    <br></br>
                    {t("descSecondStage2")}
                    <br></br>
                    <br></br>
                    {t("descSecondStage3")}
                    <br></br>
                    <br></br>
                    {t("descSecondStage4")}
                    <br></br>
                    <br></br>
                    {t("descSecondStage5")}
                    <br></br>
                    <br></br>
                    {t("descSecondStage6")}
                    <br></br>
                    <br></br>
                    {t("descSecondStage7")}
                    <br></br>
                    <br></br>
                    {t("descSecondStage8")}
                    <br></br>· {t("descSecondStage9")}
                    <br></br>· {t("descSecondStage10")}
                    <br></br>· {t("descSecondStage11")}
                    <br></br>· {t("descSecondStage12")}
                    <br></br>· {t("descSecondStage13")}
                    <br></br>
                    <br></br>
                    {t("descSecondStage14")}
                    <br></br>
                    <br></br>
                    {t("descSecondStage15")}
                  </p>
                )}
                {activeTab === 3 && (
                  <p className={`${cl.arrowTabsText} text-content`}
                  style={{
                    color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                  }}
                  >
                    <span
                      className={`${cl.title} text-content`}
                      style={{
                        color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                      }}
                    >
                      {t("thirdStage")}
                    </span>
                    <br></br>
                    {t("descThirdStage1")}
                    <br></br>
                    <br></br>
                    {t("descThirdStage2")}
                    <br></br>
                    <br></br>
                    {t("descThirdStage3")}
                    <br></br>
                    <br></br>
                    {t("descThirdStage4")}
                    <br></br>
                    <br></br>
                    {t("descThirdStage5")}
                    <br></br>
                    <br></br>
                    {t("descThirdStage6")}
                    <br></br>
                    <br></br>
                    {t("descThirdStage7")}
                    <br></br>
                    <br></br>
                    {t("descThirdStage8")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AntiLaundering;
