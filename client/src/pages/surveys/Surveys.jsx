import React, { useEffect, useState } from "react";

import Footer from "../../components/footer/Footer";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import Header from "../../components/header/Header";
import VisualModal from "../../components/VisualModal/VisualModal";
import "./Surveys.scss";

import { useStyle } from "../../components/VisualModal/StyleContext";

function SurveysPage() {
  const { styles, open, setOpen, userEntry, checkStyle } = useStyle();
  const letterInterval="standard";
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
    handleColorModeChange();

  }, [checkStyle, userEntry, styles, fontSizes]);

  const handleColorModeChange = () => {
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

  const [isSurvey, setSurvey] = useState(true);

  const [surveyList, setSurveyList] = useState([]);
  const testList = [];

  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!checkStyle) return;
    console.log(userEntry);
    if (userEntry) return;
    setSurveyList([
      {
        id: "_123",
        date_open: "2023-08-24",
        date_close: "2023-08-24",
        name: t("anketa"),
        status: "active",
      },
      {
        id: "_123",
        date_open: "2023-08-24",
        date_close: "2023-08-24",
        name: t("anketa"),
        status: "-",
      },
      {
        id: "_123",
        date_open: "2023-08-24",
        date_close: "2023-08-24",
        name: t("anketa"),
        status: "active",
      },
    ]);
  }, []);


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
    <div
      className="surveys-page"
      style={{
        background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#fff" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
      }}
    >
      <div
        className="text-context"
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
          dark={styles.colorMode === "dark" ? false : true}
          handleOpenVisualModal={handleOpenVisualModal}
        />
        <div>
          <div className="container"></div>
        </div>
        <div
          className="interval"
          style={{ letterSpacing: getLetterSpacing(letterInterval) }}
        >
          <main className="page-content container">
            <h1
              className="text-content caption"
              style={{
                color: styles.colorMode === "dark" ? "#fff" : "#343434",
              }}
            >
              {t("survey on topics for training")}
            </h1>
            <div
              className="surveys-list-block"
              style={{
                color: styles.colorMode === "dark" ? "#fff" : "#000",
                background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
              }}
            >
              <div className="toggles"
              style={{
                background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
              }}
              >
                <div
                  onClick={() => {
                    setSurvey(true);
                  }}
                  className={`${isSurvey ? "active" : ""} text-content`}
                  style={{
                    color: styles.colorMode === "dark" ? "#fff" : "#000",
                    background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#d9d9d9" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                  }}
                >
                  {t("surveys")}
                </div>
                <div
                  onClick={() => {
                    setSurvey(false);
                  }}
                  className={`${!isSurvey ? "active" : ""} text-content`}
                  style={{
                    color: styles.colorMode === "dark" ? "#fff" : "#000",
                    background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#d9d9d9" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                  }}
                >
                  {t("testing")}
                </div>
              </div>

              <div
                className="survey-list"
                style={{
                  color: styles.colorMode === "dark" ? "#fff" : "#000",
                  background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                }}
              >
                <table
                  style={{
                    letterSpacing: `${getLetterSpacing(
                      letterInterval
                    )} !important`,
                    background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                  }}
                >
                  <thead
                    className="text-content"
                    style={{
                      background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                    }}
                  >
                    <tr>
                      <td
                        className="text-content !important"
                        style={{
                          color: styles.colorMode === "dark" ? "#fff" : "#000",
                        }}
                      >
                        №
                      </td>
                      <td
                        className="text-content !important"
                        style={{
                          color: styles.colorMode === "dark" ? "#fff" : "#000",
                          background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"


                        }}
                      >
                        {t("date of publication")}
                      </td>
                      <td
                        className="text-content !important"
                        style={{
                          color: styles.colorMode === "dark" ? "#fff" : "#000",
                        }}
                      >
                        {t("title")}
                      </td>
                      <td
                        className="text-content !important"
                        style={{
                          color: styles.colorMode === "dark" ? "#fff" : "#000",
                        }}
                      >
                        {t("status")}
                      </td>
                    </tr>
                  </thead>

                  <div style={{ height: "20px" }}></div>

                  <tbody
                    className="text-content"
                    style={{
                      background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#fff" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
                    }}
                  >
                    {(isSurvey ? surveyList : testList)?.length !== 0 ? (
                      (isSurvey ? surveyList : testList).map(
                        (
                          { date_open, date_close, name, status, id },
                          index
                        ) => {
                          let _status =
                            status === "active" ? t("open") : t("closed");

                          return (
                            <tr
                              style={{
                                hover:
                                  styles.colorMode === "dark" ? "#fff" : "#fff",
                              }}
                              onClick={() => {
                                if (status === "active" && isLoggedIn) {
                                  navigate(`/survey/${id}`);
                                }

                                if (!isLoggedIn) navigate("/login");
                              }}
                            >
                              <td
                                className="text-content !important"
                                style={{
                                  letterSpacing: `${getLetterSpacing(
                                    letterInterval
                                  )} !important`,
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                className="text-content !important"
                                style={{
                                  letterSpacing: `${getLetterSpacing(
                                    letterInterval
                                  )} !important`,
                                }}
                              >
                                {date_open}
                              </td>
                              <td
                                className="text-content !important"
                                style={{
                                  letterSpacing: `${getLetterSpacing(
                                    letterInterval
                                  )} !important`,
                                }}
                              >
                                {name}
                              </td>
                              <td
                                className="text-content !important"
                                style={{
                                  letterSpacing: `${getLetterSpacing(
                                    letterInterval
                                  )} !important`,
                                }}
                              >
                                <div
                                  className={`${
                                    status === "active" ? "active" : "closed"
                                  } text-content`}
                                >
                                  {_status}
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <tr>
                        <td
                          className="text-content !important"
                          colspan="4"
                          style={{ textAlign: "center" }}
                        >
                          {t("no available")}{" "}
                          {isSurvey ? t("survey") : t("tests")}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default SurveysPage;
