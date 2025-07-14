
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import calendarIcon from "../../assets/icons/calendar.svg";
import Footer from "../../components/footer";
import Header from "../../components/header/v2";
import Button from "../../components/UI/button/Button";
import { useStyle } from "../../components/VisualModal/StyleContext";
import VisualModal from "../../components/VisualModal/VisualModal";
import base_url from "../../settings/base_url";
import "./News.scss";
import cl from "./Tabs.module.css";


function AllNewsPage() {
    const { t } = useTranslation();

    const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
    const [imagesHidden, setImagesHidden] = useState(false);
    const letterInterval = "standard";
    const [newsData, setNewsData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRowBtn, setSelectedRowBtn] = useState(null);
    const selectedItem = newsData.find((item) => item.id === selectedRowBtn);

    const activeTab = 'news';


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

    // const formattedLastDate = latestNews ? format(new Date(latestNews.date), 'dd MMMM yyyy HH:mm', { locale: ruLocale }) : '';

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
    const handleShowDetailsBtn = (selectedRowBtn) => {
        setSelectedRowBtn(selectedRowBtn);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modal = document.getElementById('Modal');
            const buttons = document.getElementsByTagName('button');// Получаем ссылку на элемент модального окна
            if ((modal && !modal.contains(event.target)) && (!Array.from(buttons).some(button => button === event.target))) {
                // Проверяем, был ли клик выполнен вне модального окна
                handleShowDetailsBtn(null)
            }
        };

        // Добавляем обработчик события клика на документе
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [selectedItem]);
    const handleNavigate = ({item}) => {
        navigate(`/news-page/${item.id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${base_url}/api/aml/course/getAllNews`,
                    {
                        params: {
                            type: activeTab,
                        },
                    }
                );
                setNewsData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [activeTab]);

    const handleRemoveImages = () => {
        console.log("Images hidden");

        setImagesHidden(true);
    };
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
    const renderCardContent = (item) => {
        const datee = new Date(item.date);
        const day = datee.getDate();
        const monthIndex = datee.getMonth();
        const month = months[monthIndex];
        const hour = datee.getHours();
        const minutes = datee.getMinutes();
        const formattedDate = `${day} ${month} ${hour
            .toString()
            .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        return (
            <div className={cl.cardContainer} key={item.id}>
                <div className={cl.cardContent}>
                    {!imagesHidden && <img src={item.image} alt="" className={cl.newsImg} />}
                    <p
                        className={cl.cardTitle}
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
                        {item.name}
                    </p>
                    <div className={cl.dateContent}>
                        <div className={cl.date}>
                            {!imagesHidden && <img src={calendarIcon} alt="calendar" />}
                            <p className={cl.dateTime}>{formattedDate}</p>
                        </div>
                        <Button id='newsButton' className={cl.cardBtn} onClick={() => handleNavigate({item})}>
                            {t("read more")}
                        </Button>
                    </div>
                </div>
            </div>
        );
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
            <div className="page-content container">
                <div style={{ display: "block" }}>
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
                                {t("news")}
                            </h1>
                            <div>
                                <div
                                    id="newsSection"
                                    className={cl.tabSliderContainer}
                                    style={{
                                        color:
                                            styles.colorMode === "dark"
                                                ? "#fff"
                                                : styles.colorMode === "light"
                                                    ? "#3A3939"
                                                    : styles.colorMode === "blue"
                                                        ? "#063462"
                                                        : "#000",
                                        background: 'rgb(242, 242, 242)'
                                    }}
                                >
                                    <div
                                        className={cl.sliderContainer}
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
                                        {newsData && newsData?.length > 0 ? (
                                            <div className="NewsWrapper">
                                                {newsData.map((item) => renderCardContent(item))}
                                            </div>
                                        ) : (
                                            <div style={{ width: "100%", textAlign: "center", paddingTop: "30px" }}>
                                                <a style={{ fontSize: "24px", fontWeight: "600", opacity: "0.3" }}>Нет недавних новостей</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <Footer />
        </div>
    );
}

export default AllNewsPage;