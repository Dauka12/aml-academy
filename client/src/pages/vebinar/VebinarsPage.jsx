import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Modal } from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useStyle } from "../../components/VisualModal/StyleContext";
import VisualModal from "../../components/VisualModal/VisualModal";
import base_url from "../../settings/base_url";
import "./VebinarsPage.scss";

function VebinarsPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [vebinars, setVebinars] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

    const handleVebinarEnter = (webinar_id) => {
      const jwtToken = localStorage.getItem("jwtToken");
      console.log(error, isLoading);

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
          `${base_url}/api/aml/webinar/getWebinars`
        );

        if (response.status === 200) {
          // console.log(response.data)
          setVebinars(response.data);
          console.log(response.data);
          
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
  const letterInterval = "standard";

  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (!checkStyle) return;
    console.log(userEntry);
    console.log(imagesHidden);
    setActiveTab(1)
    if (userEntry) return;
    const textContentElement = document.querySelectorAll(".text-content");
    const size = styles.fontSize;
    setImagesHidden(!styles.showImage);
    console.log(activeTab);
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
      <VebinarModal
        handleClose={() => {
          setOpenModal(false);
          navigate("/profile/vebinars");
        }}
        open={openModal}
      />
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
          dark={styles.colorMode === "dark" ? false : true}
          handleOpenVisualModal={handleOpenVisualModal}
        />
        <div className="container"></div>
      </div>

      <div className="page-content container">
        <div
          className="interval"
          style={{ letterSpacing: getLetterSpacing(letterInterval) }}
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
            {t("webinars")}
          </h1>

          <div className="vebinar-list-block">
            {/* {console.log(vebinars)} */}
            {vebinars.map((vebinar, index) => {
              // console.log(vebinar.lector)
              return (
                <VebinarCard
                  vebinar={vebinar}
                  index={index}
                  handleVebinarEnter={handleVebinarEnter}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
const VebinarModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
    >
      <Box
        sx={{
          width: "590px",
          padding: "30px 55px",
          boxSizing: "border-box",
          background: "#FFFFFF",
          borderRadius: "10px",
          outline: "none",
          border: "none",

          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1
          style={{
            color: "#3A3939",
            textAlign: "center",
            fontFamily: "Ubuntu",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "26px",

            marginBottom: "15px",
          }}
        >
          Спасибо за ваш интерес к нашему вебинару!
        </h1>
        <p
          style={{
            color: "#3A3939",
            textAlign: "center",
            fontFeatureSettings: `'clig' off, 'liga' off`,
            fontFamily: "Ubuntu",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "26px",

            marginBottom: "15px",
          }}
        >
          Вы успешно зарегистрированы для участия.{" "}
          <strong style={{ fontWeight: "700" }}>Ожидайте подтверждение</strong>{" "}
          на вашем электронном адресе.
        </p>
        <p
          style={{
            color: "#4D4D4D",
            textAlign: "center",
            fontFeatureSettings: `'clig' off, 'liga' off`,
            fontFamily: "Ubuntu",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "26px" /* 162.5% */,

            marginBottom: "15px",
          }}
        >
          Ссылку на вебинар можете увидеть в разделе вебинары на странице
          профиля.
        </p>
        <div
          onClick={() => handleClose()}
          style={{
            width: "max-content",
            margin: "0 auto",
            background: "#1F3C88",
            borderRadius: "8px",
            padding: "12px 96px",
            color: "#FFF",
            fontFeatureSettings: `'clig' off, 'liga' off`,
            fontFamily: "Manrope",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "24px" /* 150% */,
            letterSpacing: "0.2px",
            cursor: "pointer",
          }}
        >
          Окей
        </div>
      </Box>
    </Modal>
  );
};

const VebinarCard = (props) => {
  const {
    webinar_id,
    image,
    name,
    webinar_for_member_of_the_system,
    type,
    date,
  } = props.vebinar;
  // console.log(webinar_for_member_of_the_system)

  const datee = new Date(date);

  const months = {
    0: "января",
    1: "февраля",
    2: "марта",
    3: "апреля",
    4: "мая",
    5: "июня",
    6: "июля",
    7: "августа",
    8: "сентября",
    9: "октября",
    10: "ноября",
    11: "декабря",
  };
  function handleWebinarClick({webinar_id, link}) {
    props.handleVebinarEnter(webinar_id)
    window.open(props.vebinar.link, '_blank', 'noopener,noreferrer');
    console.log(props.vebinar.link);
    console.log(props.index);
    
    
  }
  // Get the day, month, and hour from the date
  const day = datee.getDate();
  const monthIndex = datee.getMonth();
  const month = months[monthIndex];
  const hour = datee.getHours();
  const minutes = datee.getMinutes();

  // Format the date and time
  const formattedDate = `${day} ${month} ${hour
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;


  return (
    <div className="vebinar-card">
      <img src={image} alt="" />
      <div className="info-block">
        <div className="title">{name}</div>
        <div>
          <div className="vebinar-info">
            <p>Аудитория (для кого): {webinar_for_member_of_the_system}</p>
            <p>Формат: {type}</p>
            <p>Стоимость: бесплатно</p>
            <div className="date">{formattedDate}</div>
          </div>
            <img src="timeImagef" alt=""/>
          <div className="lector-info">
            <div
              className="action-btn"
              onClick={() => handleWebinarClick(webinar_id, props.link)}
            >
              Принять участие
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VebinarsPage;
