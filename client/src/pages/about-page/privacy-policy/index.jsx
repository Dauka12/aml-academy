import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";

import Footer from "../../../components/footer/Footer";
import igIcon from '../../../assets/images/Instagram_icon.png';
import tgIcon from '../../../assets/images/Telegram_Messenger.png';

import axios from "axios";
import base_url from "../../../settings/base_url";
import Header from "../../../components/header/Header";

import { t } from "i18next";
import { useTranslation } from "react-i18next";

import VisualModal from "../../../components/VisualModal/VisualModal";

import { useStyle } from "../../../components/VisualModal/StyleContext";

function PrivacyPolicyPage({ email, phoneNumber }) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [vebinars, setVebinars] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
};

const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
    const handleVebinarEnter = (webinar_id) => {
        // Выполняем регистрацию на вебинар
        const jwtToken = localStorage.getItem("jwtToken");
        axios.post(
            `${base_url}/api/aml/webinar/saveUser/webinar/${webinar_id}`,{}, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }).then(response => {
            // Handle success
            console.log("Participation added successfully", response.data);
            // Optionally, you can refresh the data or notify the user
        })
            .catch(error => {
                // Handle error
                console.error("Error adding participation", error);
                // Notify the user of the error
            });;

        setOpenModal(true);
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/aml/webinar/getWebinars`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (response.status === 200) {
          // console.log(response.data)
          setVebinars(response.data);
        } else {
          // Handle other status codes if needed
          setError(response.statusText);
          // console.log(response.statusText);
        }
      } catch (error) {
        setError(error);
        console.error(error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const [letterInterval, setLetterInterval] = useState("standard");
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [activeTab, setActiveTab] = useState(1);

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

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
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

  const jwtToken = localStorage.getItem("jwtToken");

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
        onFontFamily={() => {}}
        onIntervalChange={() => {}}
        styles={styles}
      />

      

      <div>
        <Header
          dark={styles.colorMode == "dark" ? false : true}
          handleOpenVisualModal={handleOpenVisualModal}
        />
        <div className="container"></div>
      </div>

      <div className="page-content container">
        <div
          className="interval"
          style={{ letterSpacing: getLetterSpacing(letterInterval), lineHeight: 1.5 }}
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
            {t("privacy policy")}
                  </h1>
                  <h2> {t("privacy policy title")}</h2>
                  <h2> {t("privacy policy Introductory provisions")}</h2>
                  <p>{t("privacy policy 1.1")}</p>
                  <br />
                  <p>{t("privacy policy 1.2")}</p>
                  <br />
                  <p>{t("privacy policy aml")}</p>
                  <br />
                  <p>{t("privacy policy owner")}</p>
                  <br />
                  <p>{t("privacy policy 1.3")}</p>
                  <br />
                  <p>{t("privacy policy 1.4")}</p>
                  <br />
                  <p>{t("privacy policy 1.5")}</p>
                  <br />
                  <p>{t("privacy policy 1.6")}</p>
                  <br />
                  <p>{t("privacy policy 1.7")}</p>
                  <br />
                  <p>{t("privacy policy 1.8")}</p>
                  <br />
                  <h2> {t("privacy policy data collection")}</h2>
                  <br />
                  <p>{t("privacy policy 2.1")}</p>
                  <br />
                  <p>{t("privacy policy identification")}</p>
                  <br />
                  <p>{t("privacy policy data processing")}</p>
                  <br />
                  <p>{t("privacy policy 3.1")}</p>
                  <br />
                  <p>{t("privacy policy 3.2")}</p>
                  <br />
                  <p>{t("privacy policy 3.3")}</p>
                  <br />
                  <p>{t("privacy policy 3.4")}</p>
                  <br />
                  <p>{t("privacy policy Rights")}</p>
                  <br />
                  <p>{t("privacy policy 4.1")}</p>
                  <br />
                  <p>{t("privacy policy 4.2")}</p>
                  <br />
                  <h2>{t("privacy policy other")}</h2>
                  <br />
                  <p>{t("privacy policy 5.1")}</p>
                  <br />
                  <p>{t("privacy policy 5.2")}</p>
                  <br />
                  <p>{t("privacy policy 5.3")}</p>
                  <br />
                  <p>{t("privacy policy 5.4")}</p>
                  <br />
                  <p>{t("privacy policy 5.5")}</p>



                  </div>
          </div>
          <br />
          <br />
          <br />
          <br />

      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;
