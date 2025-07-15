import React, { useEffect, useState } from "react";
import "./style.scss";
import Footer from "../../../components/footer";
import Header from "../../../components/header/v2";
import { useTranslation } from "react-i18next";
import VisualModal from "../../../components/VisualModal/VisualModal";
import { useStyle } from "../../../components/VisualModal/StyleContext";

function MainTasksAndActivities({ email, phoneNumber }) {
  const { t } = useTranslation();

  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const [letterInterval, setLetterInterval] = useState("standard");

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
            item.style.fontSize = "15px";
            break;
          case "standard":
            item.style.fontSize = "20px";
            break;
          case "large":
            item.style.fontSize = "24px";
            break;
          default:
            break;
        }
      });
    }
    handleColorModeChange();
  }, []);
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


  const handleRemoveImages = () => {
    console.log("Images hidden");

    setImagesHidden(true);
  };

  const handleShowImages = () => {
    setImagesHidden(false);
  }

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

  const handleOpenVisualModal = () => {
    console.log("OPEN");
    setOpenVisualModal((prev) => !prev);
    setOpen((prev) => !prev);
  };
  const [openVisualModal, setOpenVisualModal] = useState(open);

  return (
    <div
      className={"vebinars-page text-content"}
      style={{
        background:
          styles.colorMode === "dark"
            ? "#000"
            : styles.colorMode === "light"
              ? "#f2f2f2"
              : styles.colorMode === "blue"
                ? "#9dd1ff"
                : "#000",
      }}
    >
      <VisualModal
        open={openVisualModal}
        onRemoveImages={handleRemoveImages}
        onShowImages={handleShowImages}
        onFontFamily={() => { }}
        onIntervalChange={() => { }}
        styles={styles}
      />



      <div>
        <Header
          dark={styles.colorMode === "dark" ? false : true}
          handleOpenVisualModal={handleOpenVisualModal}
        />
        <div className="container"></div>
      </div>

      <div className="page-content container" style={{ lineHeight: "1.5" }}>
        <div
          className="interval"
          style={{
            letterSpacing: getLetterSpacing(letterInterval), color:
              styles.colorMode === "dark"
                ? "#fff"
                : styles.colorMode === "light"
                  ? "#343434"
                  : styles.colorMode === "blue"
                    ? "#063462"
                    : "#000",
          }}
        >
          <h1
            className="text-content"
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
            {t("Main tasks and activities")}
          </h1>
        </div>
        <p style={{
          color:
            styles.colorMode === "dark"
              ? "#fff"
              : styles.colorMode === "light"
                ? "#343434"
                : styles.colorMode === "blue"
                  ? "#063462"
                  : "#000",
          fontSize: "20px",
          fontWeight: "600",
        }}>{t("ricGroups")}</p>
        <br />
        <ul>
          <li>{t("li1")}</li>

          <li>{t("li2")}</li>

          <li>{t("li3")}</li>
        </ul>
        <br />

        <p style={{
          color:
            styles.colorMode === "dark"
              ? "#fff"
              : styles.colorMode === "light"
                ? "#343434"
                : styles.colorMode === "blue"
                  ? "#063462"
                  : "#000",
          fontSize: "20px",
          fontWeight: "600",
        }}>{t("ricTask")}</p> <br /><p>{t("ricTaskDesk")}</p> <br />
        <p style={{
          color:
            styles.colorMode === "dark"
              ? "#fff"
              : styles.colorMode === "light"
                ? "#343434"
                : styles.colorMode === "blue"
                  ? "#063462"
                  : "#000",
          fontSize: "20px",
          fontWeight: "600",
        }}>{t("generalTask")}</p>
        <br />
        <p>{t("task1")}</p>
        <br />
        <p>{t("task2")}</p>
        <br />
        <p>{t("task3")}</p>
        <br />
        <p>{t("task4")}</p>
        <br />
        <br />



      </div>


      <Footer />
    </div>
  );
}

export default MainTasksAndActivities;
