import React, { useEffect, useState } from "react";
import cl from "./index.module.css";
import fatfImgLight from "../../../assets/images/fatf.svg";
import fatfImgDark from "../../../assets/images/fatfDark.png";
import Footer from "../../../components/footer";
import Header from "../../../components/header/v2";
import { useTranslation } from "react-i18next";
import VisualModal from "../../../components/VisualModal/VisualModal";
import {
  StyleProvider,
  useStyle,
} from "../../../components/VisualModal/StyleContext";

function Fatf() {
  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const { t } = useTranslation();
  const [letterInterval, setLetterInterval] = useState("standard");

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
      h1: { fontSize: "28px", lineHeight: "30px" },
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

  useEffect(() => {
    const textContentElement = document.querySelector(".text-content");
    const family = styles.fontFamily;

    if (family) {
      textContentElement.style.fontFamily = family;
    }
  }, []);

  const handleCloseVisualModal = () => {
    setOpenVisualModal(false);
  };

  const handleIntervalChange = (interval) => {
    console.log("Interval changed");
    setLetterInterval(interval);
  };
  const handleShowImages = () => {
    setImagesHidden(false);
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
    <div className={`${cl.fatfWrapper} text-content`}
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
      <Header           dark={styles.colorMode == "dark" ? false : true}
 handleOpenVisualModal={handleOpenVisualModal} />
      <div className={`${cl.container} text-content`}>
        <div
          className="interval"
          style={{ letterSpacing: getLetterSpacing(letterInterval) }}
        >
          <h1
            className={`${cl.headline} text-content`}
            style={{
              color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
            }}
          >
            {t("fatf")}
          </h1>
          <div className={`${cl.fatfContent} text-content`}>
            {!imagesHidden && (
              <img src={
                styles.colorMode === "light" ? fatfImgLight : fatfImgDark
              }
              
              
              alt="fatfImg" style={{ height: "220px" }} />
            )}
            <div className={`${cl.fatfContentInner} text-content`}>
              <div
                className={`${cl.fatfBlock} text-content`}
                style={{
                  background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                }}
              >
                <p
                  className={`${cl.fatfBlockText} text-content`}
                  style={{
                    color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
                  }}
                >
                  {t("descFatf1")}
                </p>
              </div>
              <div
                className={`${cl.fatfBlock} text-content`}
                style={{
                  background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                }}
              >
                <p
                  className={`${cl.fatfBlockText} text-content`}
                  style={{
                    color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
                  }}
                >
                  {t("descFatf2")}
                </p>
              </div>
            </div>
          </div>
          <div className={`${cl.fatfText} text-content`}>
            <p
              className={`${cl.text} text-content`}
              style={{
                color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#000" : styles.colorMode === "blue" ? "#063462" : "#000",
              }}
            >
              {t("descFatf3")}
            </p>
            <ul className={`${cl.list} text-content`}>
              <li className="text-content"
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                }}
              >
              <p style={{ fontSize: "18px" }}> {t("descFatf4")}</p>
              </li>
              <li className="text-content"
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                }}
              >
                <p style={{ fontSize: "18px" }}> {t("descFatf5")}</p>
              </li>
              <li className="text-content"
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                }}
              >
                <p style={{ fontSize: "18px" }}> {t("descFatf6")}</p>
              </li>
              <li className="text-content"
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                }}
              >
                <p style={{ fontSize: "18px" }}> {t("descFatf7")}</p>
              </li> 
              <li className="text-content"
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
                }}
              >
                <p style={{ fontSize: "18px" }}> {t("descFatf8")}</p>
              </li>
            </ul>
          </div>
          <div
            className={`${cl.block} text-content`}
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
              {t("descFatf9")}
            </p>
          </div>
          <div style={{ marginBottom: "100px" }}>
            <a
              href="https://www.fatf-gafi.org/en/home.html"
              style={{
                color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
              }}
            >
              <p style={{ fontSize: "18px" }}> {t("linkFatf")}</p>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Fatf;
