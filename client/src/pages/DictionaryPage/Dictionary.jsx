import React, { useState, useEffect } from "react";

import DefaultHeader from "../../components/defaultHeader/DefaultHeader";
import Footer from "../../components/footer/Footer";

import "./Dictionary.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import Header from "../../components/header/Header";
import { useTranslation } from "react-i18next";
import VisualModal from "../../components/VisualModal/VisualModal";

import { useStyle } from "../../components/VisualModal/StyleContext";
import imgage1 from './../../assets/images/Rectangle5155.png';
import imgage2 from './../../assets/images/Rectangle 5147.png';
import imgage3 from './../../assets/images/Rectangle 5149.png';
import imgage4 from './../../assets/images/Rectangle 5151.png';
import imgage5 from './../../assets/images/Rectangle 5153.png';

function DictionaryPage() {
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

    const [isSurvey, setSurvey] = useState(true);

    const [surveyList, setSurveyList] = useState([]);
    const [testList, setTestList] = useState([]);

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
                    dark={styles.colorMode == "dark" ? false : true}
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
                    <div className="main-pon" style={{marginTop:"100px",display: "grid", justifyContent:"center"}}>
                        <div >
                            <h1 style={{textAlign: "center",fontSize:"30px", marginBottom: "30px"}}>ЧАСТО ВСТРЕЧАМЫЕ ПОНЯТИЯ</h1>
                        </div>
                        <div>
                            <p style={{padding: "20px 50px", backgroundColor: "#1A2751",color: "white", borderRadius:"30px",fontSize: "18px", textAlign:"center", marginBottom: "100px"}}>из сферы противодействия отмывания доходов и финансирование терроризма</p>
                        </div>
                    </div>
                        <div class={"main-content-container"} style={{backgroundColor:"#F9F9F9", display: "flex", marginBottom: "100px",borderRadius: "15px"}}>
                            <div class={"text-content-c"} style={{flex: "1",padding: "55px 70px"}}>
                            <div class={"first-p"} style={{fontSize: "25px", color:"#1F3C88", fontWeight: "700", fontFamily:"Arial", marginBottom:"20px"}}>
                                ЛЕГАЛИЗАЦИЯ (ОТМЫВАНИЕ) ДОХОДОВ,
                                ПОЛУЧЕННЫХ ПРЕСТУПНЫМ ПУТЕМ
                            </div>
                            <div class={"second-p"} style={{fontSize: "18px", color:"black", fontFamily:"Arial",fontWeight: "400",lineHeight: "21px" }}>
                                вовлечение в законный оборот денег и (или) иного имущества, полученных преступным путем, посредством совершения сделок в виде конверсии или перевода имущества, представляющего доходы от уголовных правонарушений, либо владение и использование такого имущества, сокрытие или утаивание его подлинного характера, источника, места нахождения, способа распоряжения, перемещения, прав на имущество или его принадлежности, если известно, что такое имущество представляет доходы от уголовных правонарушений, а равно посредничество в легализации денег и (или) иного имущества, полученных преступным путем
                            </div>
                            </div>
                            <div style={{flex:".7", display:"flex", position: "relative", justifyContent:"center"}}>
                                <img style={{width: "250px", position: "absolute", bottom: "0px"}} src={imgage1} alt=""/>
                            </div>
                        </div>
                        <div className={"main-content-container"} style={{backgroundColor:"#F9F9F9", display: "flex", marginBottom: "100px",borderRadius: "15px"}}>
                            <div className={"text-content-c"} style={{flex: "1",padding: "55px 70px"}}>
                                <div className={"first-p"} style={{fontSize: "25px", color:"#1F3C88", fontWeight: "700", fontFamily:"Arial", marginBottom:"20px"}}>
                                    ФИНАНСИРОВАНИЕ ТЕРРОРИЗМА
                                </div>
                                <div className={"second-p"} style={{fontSize: "18px", color:"black", fontFamily:"Arial",fontWeight: "400",lineHeight: "21px" }}>
                                    предоставление или сбор денег и (или) иного имущества, права на имущество или выгод имущественного характера, а также дарение, мена, пожертвования, благотворительная помощь, оказание информационных и иного рода услуг либо оказание финансовых услуг физическому лицу либо группе лиц, либо юридическому лицу, совершенные лицом, заведомо осознававшим террористический характер их деятельности либо то, что предоставленное имущество, оказанные информационные, финансовые и иного рода услуги будут использованы для осуществления террористической деятельности либо обеспечения террористической группы, террористической организации, незаконного военизированного формирования   </div>
                            </div>
                            <div style={{flex:".7", display:"flex", position: "relative", justifyContent:"center"}}>
                                <img style={{width: "250px", position: "absolute", bottom: "0px"}} src={imgage2} alt=""/>
                            </div>
                        </div>
                        <div className={"main-content-container"} style={{backgroundColor:"#F9F9F9", display: "flex", marginBottom: "100px",borderRadius: "15px"}}>
                            <div className={"text-content-c"} style={{flex: "1",padding: "55px 70px"}}>
                                <div className={"first-p"} style={{fontSize: "25px", color:"#1F3C88", fontWeight: "700", fontFamily:"Arial", marginBottom:"20px"}}>
                                    ФИНАНСОВЫЙ МОНИТОРИНГ
                                </div>
                                <div className={"second-p"} style={{fontSize: "18px", color:"black", fontFamily:"Arial",fontWeight: "400",lineHeight: "21px" }}>
                                    совокупность мер по сбору, обработке, анализу и использованию сведений и информации об операциях с деньгами и (или) иным имуществом, осуществляемых уполномоченным органом и субъектом финансового мониторинга в соответствии Законом о ПОД/ФТ                                </div>
                            </div>
                            <div style={{flex:".7", display:"flex", position: "relative", justifyContent:"center"}}>
                                <img style={{width: "200px", position: "absolute", bottom: "0px"}} src={imgage3} alt=""/>
                            </div>
                        </div>
                        <div className={"main-content-container"} style={{backgroundColor:"#F9F9F9", display: "flex", marginBottom: "100px",borderRadius: "15px"}}>
                            <div className={"text-content-c"} style={{flex: "1",padding: "55px 70px"}}>
                                <div className={"first-p"} style={{fontSize: "25px", color:"#1F3C88", fontWeight: "700", fontFamily:"Arial", marginBottom:"20px"}}>
                                    СУБЪЕКТ ФИНАНСОВОГО МОНИТОРИНГА
                                </div>
                                <div className={"second-p"} style={{fontSize: "18px", color:"black", fontFamily:"Arial",fontWeight: "400",lineHeight: "21px" }}>
                                    лица чья деятельность может быть использована в целях отмывания доходов и (или) финансировании терроризма;                                </div>
                            </div>
                            <div style={{flex:".7", display:"flex", position: "relative", justifyContent:"center"}}>
                                <img style={{width: "200px", position: "absolute", bottom: "0px"}} src={imgage4} alt=""/>
                            </div>
                        </div>
                        <div className={"main-content-container"} style={{backgroundColor:"#F9F9F9", display: "flex", marginBottom: "100px",borderRadius: "15px"}}>
                            <div className={"text-content-c"} style={{flex: "1",padding: "55px 70px"}}>
                                <div className={"first-p"} style={{fontSize: "25px", color:"#1F3C88", fontWeight: "700", fontFamily:"Arial", marginBottom:"20px"}}>
                                    КОМПЛАЕНС-КОНТРОЛЕР
                                </div>
                                <div className={"second-p"} style={{fontSize: "18px", color:"black", fontFamily:"Arial",fontWeight: "400",lineHeight: "21px" }}>
                                    это специалист, в обязанности которого входит обеспечение соблюдения субъектом финансового мониторинга законодательства Республики Казахстан о противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма.                                </div>
                            </div>
                            <div style={{flex:".7", display:"flex", position: "relative", justifyContent:"center"}}>
                                <img style={{width: "200px", position: "absolute", bottom: "0px"}} src={imgage5} alt=""/>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DictionaryPage;
