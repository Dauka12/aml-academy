import React, { useEffect, useState } from "react";
import fifthDirector from "../../../assets/icons/Kairbekov.jpeg";
import sixthDirector from "../../../assets/icons/Nurmakhan.jpeg";
import forthDirector from "../../../assets/images/4.svg";
import seventhDirector from "../../../assets/images/Sagyndykov.png";
import merzadinov from '../../../assets/images/merzadinov.png';
import Footer from "../../../components/footer";
import Header from "../../../components/header/v2";
import cl from "./index.module.css";

import { useTranslation } from "react-i18next";

import { useStyle } from "../../../components/VisualModal/StyleContext";
import VisualModal from "../../../components/VisualModal/VisualModal";

function Management() {
  const { styles, open, setOpen, userEntry, checkStyle } = useStyle();
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
      caption: { fontSize: "26px", lineHeight: "26px" },
      subtitle: { fontSize: "18px", lineHeight: "20px" },
      name: { fontSize: "18px", lineHeight: "20px" }, 
      descname: { fontSize: "13px", lineHeight: "15px" }, 
    },
    large: {
      fontSize: "24px",
      lineHeight: "26px",
      caption: { fontSize: "33px", lineHeight: "33px" }, 
      subtitle: { fontSize: "29px", lineHeight: "29px" },
    },
  };
  
  useEffect(() => {
    if (!checkStyle || userEntry) return;
  
    const textContentElements = document.querySelectorAll(".text-content");
    const size = styles.fontSize;
    setImagesHidden(!styles.showImage);
  
    if (textContentElements) {
      textContentElements.forEach((item) => {

        const applyStyles = (style) => {
          item.style.fontSize = style.fontSize;
          item.style.lineHeight = style.lineHeight;
        };
  
        console.log(fontSizes[size].caption)

        switch (size) {
          case "small":
          case "large":
            if (item.classList.contains("caption")) {
              applyStyles(fontSizes[size].caption);
            } else if (item.classList.contains("subtitle")) {
              applyStyles(fontSizes[size].subtitle);
            }
            // } else if (item.classList.contains("name")) {
            //   applyStyles(fontSizes[size].name); // Use name size for name
            // } else if (item.classList.contains("descname")) {
            //   applyStyles(fontSizes[size].descname); // Use descname size for descname
            // } else {
            //   applyStyles(fontSizes[size]); // Use standard size for other elements
            // }
            break;
  
          case "standard":
            if (item.classList.contains("caption")) {
              console.log("Applying standard caption styles");
              applyStyles(fontSizes.standard.caption);
            } else if (item.classList.contains("subtitle")) {
              console.log("Applying standard subtitle styles");
              applyStyles(fontSizes.standard.subtitle);
            } else if (item.classList.contains("name")) {
              console.log("Applying standard name styles");
              applyStyles(fontSizes.standard.name);
            } else if (item.classList.contains("descname")) {
              console.log("Applying standard descname styles");
              applyStyles(fontSizes.standard.descname);
            } else {
              console.log("Applying standard styles");
              applyStyles(fontSizes.standard);
            }
            break;
  
          default:
            console.log("Default case");
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
    const textContentElement = document.querySelectorAll(".text-content");
    const family = styles.fontFamily;

    if (textContentElement) {
      textContentElement.forEach((item) => {
        if (family) {
          item.style.fontFamily = family;
        }
      });
    }
  }, [styles.fontFamily]);

  return (
    <div className={`${cl.managementWrapper} text-content`}
    style={{
      background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#fff" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
    }}
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
      />
      <div className={cl.container}>
        <div
          className="interval"
          style={{ letterSpacing: getLetterSpacing(letterInterval) }}
        >
          <p
            className={`${cl.headline} text-content caption`}
            style={{
              color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
              fontSize: '35px'
            }}
          >
            {t("board of directors")}
          </p>
          <br />
          <br />
          <br />
          <br />
          <div className={cl.boardOfDirectors}>
            {/* <div className={cl.director}>
              {!imagesHidden && <img style={{width:"172px", height:"217px", borderRadius:"5px"}} src={firstDirector} alt="" />}
              <div className="InfoDir">
              <p
                className={`${cl.name} text-content name`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("firstDirector")}
              </p>
              <p
                className={`${cl.post} text-content descname`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("descFirstDir")}
              </p>
              </div>
            </div> */}
            {/* <div className={cl.director}>
                        <img src={secondDirector} alt="" />
                        <p className={cl.name}>Садырбеков Габит Амангельдиевич</p>
                        <p className={cl.post}>Первый заместитель Председателя Агентства Республики Казахстан по финансовому мониторингу, член Совета директоров</p>
                    </div> */}
            {/* <div className={cl.director}>
              {!imagesHidden && <img src={thirdDirector} alt="" />}
              <div className="InfoDir">
              <p
                className={`${cl.name} text-content name`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("secondDirector")}
              </p>
              <p
                className={`${cl.post} text-content descname`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("descSecondDir")}
              </p>
           </div>
            </div> */}
            <div className={cl.director}>
              {!imagesHidden && <img src={fifthDirector} alt="" style={{width:"172px", height:"217px", borderRadius:"6px"}}/>}
              <div className="InfoDir">
              <p
                className={`${cl.name} text-content name`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("fourthDirector")}
              </p>
              <p
                className={`${cl.post} text-content descname`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("descFourthDir")}
              </p>
              </div>
            </div>
          </div>
          <div className={cl.boardOfDirectors}>
            {/* <div className={cl.director}>
                        <img src={secondDirector} alt="" />
                        <p className={cl.name}>Садырбеков Габит Амангельдиевич</p>
                        <p className={cl.post}>Первый заместитель Председателя Агентства Республики Казахстан по финансовому мониторингу, член Совета директоров</p>
                    </div> */}
            <div className={cl.director}>
              {!imagesHidden && <img src={sixthDirector} style={{width:"172px", height:"217px", borderRadius:"6px"}} alt="" />}
              <div className="InfoDir">
              <p
                className={`${cl.name} text-content name`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("sixthDirector")}
              </p>
              <p
                className={`${cl.post} text-content descname`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("descSixthDir")}
              </p>
             </div>
            </div>
            <div className={cl.director}>
              {!imagesHidden && <img src={seventhDirector} style={{width:"172px", height:"217px", borderRadius:"6px"}} alt="" />}
              <div className="InfoDir">
              <p
                className={`${cl.name} text-content name`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("seventhDirector")}
              </p>
              <p
                className={`${cl.post} text-content descname`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("descSeventhDir")}
              </p>
              </div>
            </div>

            <div className={cl.director}>
              {!imagesHidden && <img src={merzadinov} style={{width:"172px", height:"217px", borderRadius:"6px"}} alt="" />}
              <div className="InfoDir">
              <p
                className={`${cl.name} text-content name`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("fifthDirector")}
              </p>
              <p
                className={`${cl.post} text-content descname`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("descFifthDir")}
              </p>
             </div>
            </div>

            <div className={cl.director}>
              {!imagesHidden && <img src={forthDirector} alt="" />}
              <div className="InfoDir">
              <p
                className={`${cl.name} text-content name`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("therdDirector")}
              </p>
              <p
                className={`${cl.post} text-content descname`}
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("descTherdDir")}
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

export default Management;

