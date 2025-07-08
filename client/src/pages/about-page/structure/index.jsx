import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import lineL from "../../../assets/icons/lineL.svg";
import lineR from "../../../assets/icons/lineR.svg";
import dauren from '../../../assets/images/dauren.png';
import merzadinov from '../../../assets/images/merzadinov.png';
import tleu from '../../../assets/images/tleu.png';
import Dropdown from "../../../components/dropdown/Dropdown";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/v2";
import { useStyle } from "../../../components/VisualModal/StyleContext";
import VisualModal from "../../../components/VisualModal/VisualModal";
import cl from "./index.module.css";
import data_eng from "./structureData eng.json";
import data_kz from "./structureData kz.json";
import data_ru from "./structureData ru.json";
function Structure() {
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
        "inverted-mode"
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

  const cardsData = (
    currentLanguage === "ru"
      ? data_ru
      : currentLanguage === "kz"
      ? data_kz
      : data_eng
  ).cards;

  if (!cardsData || cardsData?.length === 0) {
    return <p>No cards data available.</p>;
  }

  // Check if the first card exists and has the 'id' property
  const firstCard = cardsData[0];
  if (!firstCard || !firstCard.id) {
    return <p>First card data is missing 'id' property.</p>;
  }

  const handleClick = (cardData) => {
    // console.log("User Information:", cardData);
  };

  return (
    <div
      className={cl.charterWrapper}
      style={{
        background:
          styles.colorMode === "dark"
            ? "#000"
            : styles.colorMode === "light"
            ? "#fff"
            : styles.colorMode === "blue"
            ? "#9dd1ff"
            : "#000",
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

      <div className={cl.container}>
        <h1
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
          {t("leadership of the Academy")}
        </h1>
        <div className={cl.charterContent}>
          <div className={cl.charterGrid}>
            {/* Display the first card */}
            <Link
              className={`${cl.card__link} ${cl.firstCardContainer}`}
              // to={{
              //     pathname: `/structure/${firstCard.id}`,
              //     state: { cardData: firstCard },
              // }}
              to={`/structure/${firstCard.id}`}
              onClick={() => handleClick(firstCard)}
            >
              <div className={cl.card}>
                <p
                  className={`${cl.card__title} text-content`}
                  style={{
                    color:
                      styles.colorMode === "dark"
                        ? "#fff"
                        : styles.colorMode === "light"
                        ? "#000"
                        : styles.colorMode === "blue"
                        ? "#063462"
                        : "#000",
                  }}
                >
                  {firstCard.title}
                </p>
                <img
                  src={merzadinov}
                  alt={firstCard.caption}
                  className={cl.card__img}
                />
                <p
                  className={`${cl.card__text} text-content`}
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
                  {firstCard.name}
                </p>
              </div>
            </Link>
            <img src={lineL} alt="line" />
            <img src={lineR} alt="line" />
            <div className={cl.bottomCardsGrid}>
              {cardsData.slice(1).map((card, index) =>
                // Check if the card exists and has the 'id' property
                card && card.id ? (
                  <Link
                    key={index}
                    className={cl.card__link}
                    // to={{
                    // pathname: `/structure/${card.id}`,
                    // state: { cardData: card },
                    // }}
                    to={`/structure/${card.id}`}
                    onClick={() => handleClick(card)}
                  >
                    <div className={cl.card}>
                      <p
                        className={`${cl.card__title} text-content`}
                        style={{
                          color:
                            styles.colorMode === "dark"
                              ? "#fff"
                              : styles.colorMode === "light"
                              ? "#000"
                              : styles.colorMode === "blue"
                              ? "#063462"
                              : "#000",
                        }}
                      >

                        {card.title}
                      </p>
                      <img
                        src={(card.id === '2') ? tleu : dauren}
                        alt={card.caption}
                        className={cl.card__img}
                      />
                      <p
                        className={`${cl.card__text} text-content`}
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
                        {card.name}
                      </p>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </div>
        <h1
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
          {t("divisions")}
        </h1>
        <div
          className={cl.accordion}
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
          <Dropdown
            title={t("titleFirstDiv")}
            content={
              <div>
                {t("contentFirstDiv")}
                <div className={cl.accordionContent}>
                  <ul style={{ listStyleType: "disc" }}>
                    <li
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
                      {t("contentFirstPointOneDiv")}
                    </li>
                    <li
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
                      {t("contentFirstPointTwoDiv")}
                    </li>
                    <li
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
                      {t("contentFirstPointThreeDiv")}
                    </li>
                  </ul>
                </div>
              </div>
            }
          />
          <Dropdown
            title={t("titleSecondDiv")}
            content={
              <div>
                {t("contentSecondDiv")}
                <div className={cl.accordionContent}>
                  <ul style={{ listStyleType: "disc" }}>
                    <li
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
                      {t("contentSecondPointOneDiv")}
                    </li>
                    <li
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
                      {t("contentSecondPointTwoDiv")}
                    </li>
                    <li
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
                      {t("contentSecondPointThreeDiv")}
                    </li>
                    <li
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
                      {t("contentsecondPointFourDiv")}
                    </li>
                    <li
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
                      {t("contentSecondPointFiveDiv")}
                    </li>
                  </ul>
                </div>
              </div>
            }
          />
          <Dropdown
            title={t("titleThirdDiv")}
            content={
              <div>
                <a> {t("contentThirdDiv")} </a>
                <div className={cl.accordionContent}>
                  <ul className={cl.marked}>
                    <li
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
                      {t("contentThirdPointOneDiv")}
                    </li>
                    <li
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
                      {t("contentThirdPointTwoDiv")}
                    </li>
                    <li
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
                      {t("contentThirdPointThreeDiv")}
                    </li>
                    <li
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
                      {t("contentThirdPointFourDiv")}
                    </li>
                    <li
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
                      {t("contentThirdPointFiveDiv")}
                    </li>
                  </ul>
                </div>
              </div>
            }
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Structure;
