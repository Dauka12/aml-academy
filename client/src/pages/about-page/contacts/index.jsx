import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";

import igIcon from '../../../assets/images/Instagram_icon.png';
import tgIcon from '../../../assets/images/Telegram_Messenger.png';
import Footer from "../../../components/footer/Footer";

import axios from "axios";
import Header from "../../../components/header/v2";
import base_url from "../../../settings/base_url";

import { useTranslation } from "react-i18next";

import VisualModal from "../../../components/VisualModal/VisualModal";

import { useStyle } from "../../../components/VisualModal/StyleContext";

function ContactsPage({ email, phoneNumber }) {
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
    const MapComponent = () => {
        useEffect(() => {
            const script = document.createElement('script');
            script.charset = 'utf-8';
            script.src = 'https://widgets.2gis.com/js/DGWidgetLoader.js';
            document.head.appendChild(script);

            script.onload = () => {
                new window.DGWidgetLoader({
                    width: 640,
                    height: 600,
                    borderColor: '#a3a3a3',
                    pos: {
                        lat: 51.0921218723467,
                        lon: 71.4210891723633,
                        zoom: 16
                    },
                    opt: {
                        city: 'nur_sultan'
                    },
                    org: [{ id: '70000001083568354' }]
                });
            };

            // Cleanup
            return () => {
                document.head.removeChild(script);
            };
        }, []);

        return (
            <div>
                <a
                    className="dg-widget-link"
                    href="http://2gis.kz/nur_sultan/firm/70000001083568354/center/71.4210891723633,51.0921218723467/zoom/16?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=bigMap"
                >
                    Посмотреть на карте Астаны
                </a>
                <div className="dg-widget-link">
                    <a
                        href="http://2gis.kz/nur_sultan/center/71.421524,51.092334/zoom/16/routeTab/rsType/bus/to/71.421524,51.092334╎Aml Academy, академия финансового мониторинга ?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=route"
                    >
                        Найти проезд до Aml Academy, академия финансового мониторинга
                    </a>
                </div>
                <noscript style={{ color: '#c00', fontSize: '16px', fontWeight: 'bold' }}>
                    Виджет карты использует JavaScript. Включите его в настройках вашего браузера.
                </noscript>
            </div>
        );
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
          <div style={{display: "flex" }}>
              <div>

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
            {t("contacts")}
                  </h1>
              <div style={{display:'flex'}}>
              <div className={''} style={{lineHeight:'2'}}>
                        <br />
                        <nav className={''}>
                            <ul>
                                <li>
                                    <p className={`textStyle`}>{t('city')}</p>
                              </li>
                              <br />
                                <li>
                                    <p className={`textStyle`}>{t('address')}</p>
                              </li>
                              <br />
                                <li>
                                    <p className={`textStyle`}>{t('addressfact')}</p>
                              </li>
                              <br />
                                <li>
                                    <a className={`textStyle`} href={`tel:${phoneNumber}`} onClick={handlePhoneClick}>+7 708 716 8416</a>
                              </li>
                              <br />
                                <li>
                                    <a className={`textStyle`} href={`mailto:${email}`} onClick={handleEmailClick}>aml.academy2023@gmail.com</a>
                                </li>
                            </ul>
                      </nav>
                      <br />
                        <div className={'socialsContacts'}>
                            <a href='https://www.instagram.com/aml_academy/' className={'roundeContacts'}>
                                <img src={igIcon} alt="instagram" className={'iconContacts'} />
                            </a>
                        
                            <a href='https://t.me/aml_academy_23' className={'roundeContacts'}>
                                <img src={tgIcon} alt="telegram" className={'iconContacts'} />
                            </a>
                  </div>
                  <br />
                  <br />
                  <br />
              </div>
              <div style={{marginLeft:'10%',marginBottom:'10%'}}>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A4a08d0ccfef04383de3fc2bab937c2d0636fd66b16a047a660fdc1a3d634a91d&amp;source=constructor" width="700" height="400" frameBorder="0"></iframe>
        </div>

               </div>
          
        </div>
          </div>
</div>
       
        </div>
        <br/><br/>
          <Footer />
    </div>
  );
}

export default ContactsPage;
