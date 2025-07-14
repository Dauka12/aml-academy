import React, { useEffect, useState } from "react";
import cl from "./index.module.css";
import Header from "../../../components/header/v2";
import aboutUsImg from "../../../assets/images/aboutus.png";
import aboutFounderImg from "../../../assets/images/afmafmafmlogo.jpeg";
import Footer from "../../../components/footer";
import { useTranslation } from "react-i18next";
import { useStyle } from "../../../components/VisualModal/StyleContext";
import VisualModal from "../../../components/VisualModal/VisualModal";

function AboutUs() {
  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const [letterInterval, setLetterInterval] = useState("standard");
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [openVisualModal, setOpenVisualModal] = useState(open);
  const [activeTab, setActiveTab] = useState(1);

  const [isDark, setIsDark] = useState(false);

  const fontSizes = {
    small: {
      fontSize: "24px",
      lineHeight: "26px",
      caption: { fontSize: "32px", lineHeight: "34px" },
      subtitle: { fontSize: "22px", lineHeight: "24px" },
    },
    standard: {
      fontSize: "16px",
      lineHeight: "18px",
      caption: { fontSize: "26px", lineHeight: "26px" },
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
    if (!checkStyle || userEntry) return;

    const textContentElements = document.querySelectorAll(".text-content");
    const size = styles.fontSize;
    setImagesHidden(!styles.showImage);

    if (textContentElements) {
      textContentElements.forEach((item) => {
        // Handle styles based on size and mode
        const applyStyles = (style) => {
          item.style.fontSize = style.fontSize;
          item.style.lineHeight = style.lineHeight;
        };

        switch (size) {
          case "small":
          case "large":
            applyStyles(fontSizes[size]);
            break;

          case "standard":
            if (item.classList.contains("caption")) {
              applyStyles(fontSizes.standard.caption);
            } else if (item.classList.contains("subtitle")) {
              applyStyles(fontSizes.standard.subtitle);
            } else {
              applyStyles(fontSizes.standard); // Use standard size for other elements
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

    setIsDark(colorMode == "dark" ? true : false);
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const handleOpenVisualModal = () => {
    console.log("OPEN");
    setOpenVisualModal((prev) => !prev);
    setOpen((prev) => !prev);
  };

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
    <div className={`${cl.AboutUsWrapper} text-content`}
    style={{
      background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
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
        style={{ letterSpacing: getLetterSpacing(letterInterval) }}
      />

      {/* <div className={cl.container}>
                <DefaultHeader />
            </div> */}
      <div className={`${cl.aboutUsContent} text-content`}>
        <div
          className="interval"
          style={{ letterSpacing: getLetterSpacing(letterInterval) }}
        >
          <div className={`${cl.academyWrapper} text-content`}>
            <div className={`${cl.container} text-content`}>
              <div className={`${cl.academy} text-content`}>
                <div className={`${cl.academy__text} text-content`}>
                  <p
                    className={`${cl.headline} text-content caption`}
                    style={{
                      color:
                        styles.colorMode === "dark"
                          ? "#fff"
                          : styles.colorMode === "light"
                          ? "#343434"
                          : styles.colorMode === "blue"
                          ? "#063462"
                          : "#000",
                    }}
                  >
                    {t("about academy")}
                  </p>
                  <p className={`${cl.academy__p} text-content customSize subtitle`}>
                    {t("descAbout")}
                  </p>
                </div>
                {!imagesHidden && (
                  <img
                    src={aboutUsImg}
                    alt="aboutUsImg"
                    style={{ height: "" }}
                  />
                )}
              </div>
                <p className={`${cl.headline} text-content caption`}>
                  {t("mission_academy_a")}
                </p>
                <p className={`${cl.academy__p} text-content subtitle`}>
                  {t("mission_academy_b")}
                </p>
                <p className={`${cl.academy__p} text-content`}>{t("mission_academy_c")}</p>
                <div className={cl.mainTasks}>
                  <div className={cl.MainTask}>
                    <p
                        className={cl.numberf}
                        style={{
                          color:
                              styles.colorMode === "dark"
                                  ? "#fff"
                                  : styles.colorMode === "light"
                                      ? "#3A3939"
                                      : styles.colorMode === "blue"
                                          ? "#063462"
                                          : "#000",
                        }}
                    >
                      1
                    </p>
                    <p className={`${cl.academy__p} text-content`}>
                      {t("mission_academy_d")}
                    </p>
                  </div>
                  <div className={cl.tasks}>
                    <div className={cl.MainTask}>
                      <p
                          className={cl.numberf}
                          style={{
                            color:
                                styles.colorMode === "dark"
                                    ? "#fff"
                                    : styles.colorMode === "light"
                                        ? "#3A3939"
                                        : styles.colorMode === "blue"
                                            ? "#063462"
                                            : "#000",
                          }}
                      >
                        2
                      </p>
                      <p className={`${cl.academy__p} text-content`}>
                        {t("mission_academy_e")}
                      </p>
                    </div>

                  </div>
                  <div className={cl.tasks}>

                  <div className={cl.MainTask}>
                    <p
                        className={cl.numberf}
                        style={{
                          color:
                              styles.colorMode === "dark"
                                  ? "#fff"
                                  : styles.colorMode === "light"
                                      ? "#3A3939"
                                      : styles.colorMode === "blue"
                                          ? "#063462"
                                          : "#000",
                        }}
                    >
                      3
                    </p>
                    <p className={`${cl.academy__p} text-content`}>
                      {t("mission_academy_f")}
                    </p>
                  </div>
                </div>
                </div>

              <div className={cl.tasks}>
                <div className={cl.MainTask}>
                  <p
                      className={cl.numberf}
                      style={{
                        color:
                            styles.colorMode === "dark"
                                ? "#fff"
                                : styles.colorMode === "light"
                                    ? "#3A3939"
                                    : styles.colorMode === "blue"
                                        ? "#063462"
                                        : "#000",
                      }}
                  >
                    4
                  </p>
                  <p className={`${cl.academy__p} text-content`}>
                    {t("mission_academy_g")}
                  </p>
                </div>

              </div>
              <div className={cl.tasks}>

              <div className={cl.MainTask}>
                <p
                    className={cl.numberf}
                    style={{
                      color:
                          styles.colorMode === "dark"
                              ? "#fff"
                              : styles.colorMode === "light"
                                  ? "#3A3939"
                                  : styles.colorMode === "blue"
                                      ? "#063462"
                                      : "#000",
                    }}
                >
                  5
                </p>
                <p className={`${cl.academy__p} text-content`}>
                  {t("mission_academy_h")}
                </p>
              </div>
            </div><div className={cl.tasks}>

              <div className={cl.MainTask}>
                <p
                    className={cl.numberf}
                    style={{
                      color:
                          styles.colorMode === "dark"
                              ? "#fff"
                              : styles.colorMode === "light"
                                  ? "#3A3939"
                                  : styles.colorMode === "blue"
                                      ? "#063462"
                                      : "#000",
                    }}
                >
                  6
                </p>
                <p className={`${cl.academy__p} text-content`}>
                  {t("mission_academy_i")}
                </p>
              </div>
            </div><div className={cl.tasks}>

              <div className={cl.MainTask}>
                <p
                    className={cl.numberf}
                    style={{
                      color:
                          styles.colorMode === "dark"
                              ? "#fff"
                              : styles.colorMode === "light"
                                  ? "#3A3939"
                                  : styles.colorMode === "blue"
                                      ? "#063462"
                                      : "#000",
                    }}
                >
                  7
                </p>
                <p className={`${cl.academy__p} text-content`}>
                  {t("mission_academy_j")}
                </p>
              </div>
            </div>
            </div>
          </div>
          <div className={cl.container}>
            <div className={cl.aboutTheFounder}>
              {!imagesHidden && (
                <img
                  src={aboutFounderImg}
                  alt="aboutTheFoubder"
                  style={{ height: "210px" }}
                />
              )}
              <div className={cl.aboutTheFounder__text}>
                <p className={`${cl.headline} text-content caption`}>
                  {t("about shareholder")}
                </p>
                <p className={`${cl.academy__p} text-content`}>
                  {t("descShareholder")}
                </p>
              </div>
            </div>

            <div className={cl.purposeOfAcademy}>
              <p className={`${cl.headline} text-content caption`}>
                {t("purpose and objectives of the AML ACADEMY")}
              </p>
              <p className={`${cl.academy__p} text-content subtitle`}>
                {t("descPurpose")}
              </p>
              <p className={`${cl.subtitle} text-content`}>{t("main Task")}</p>
              <div className={cl.mainTasks}>
                <div className={cl.MainTask}>
                  <p
                    className={cl.number}
                    style={{
                      color:
                        styles.colorMode === "dark"
                          ? "#fff"
                          : styles.colorMode === "light"
                          ? "#3A3939"
                          : styles.colorMode === "blue"
                          ? "#063462"
                          : "#000",
                    }}
                  >
                    1
                  </p>
                  <p className={`${cl.academy__p} text-content`}>
                    {t("firstTask")}
                  </p>
                </div>
                <div className={cl.tasks}>
                  <div className={cl.MainTask}>
                    <p
                      className={cl.number}
                      style={{
                        color:
                          styles.colorMode === "dark"
                            ? "#fff"
                            : styles.colorMode === "light"
                            ? "#3A3939"
                            : styles.colorMode === "blue"
                            ? "#063462"
                            : "#000",
                      }}
                    >
                      2
                    </p>
                    <p className={`${cl.academy__p} text-content`}>
                      {t("secondTask")}
                    </p>
                  </div>
                  <div className={cl.MainTask}>
                    <p
                      className={cl.number}
                      style={{
                        color:
                          styles.colorMode === "dark"
                            ? "#fff"
                            : styles.colorMode === "light"
                            ? "#3A3939"
                            : styles.colorMode === "blue"
                            ? "#063462"
                            : "#000",
                      }}
                    >
                      3
                    </p>
                    <p className={`${cl.academy__p} text-content`}>
                      {t("therdTask")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AboutUs;
