import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/v2";
import { useStyle } from "../../components/VisualModal/StyleContext";
import VisualModal from "../../components/VisualModal/VisualModal";
import imgage2 from './../../assets/images/Rectangle 5147.png';
import imgage3 from './../../assets/images/Rectangle 5149.png';
import imgage4 from './../../assets/images/Rectangle 5151.png';
import imgage5 from './../../assets/images/Rectangle 5153.png';
import imgage1 from './../../assets/images/Rectangle5155.png';
import "./Dictionary.scss";

function DictionaryPage() {
    const { styles, open } = useStyle();
    const { t } = useTranslation();

    return (
        <div className="surveys-page" style={{ background: styles.colorMode === "dark" ? "#000" : "#fff" }}>
            <VisualModal open={open} styles={styles} />
            <Header dark={styles.colorMode === "dark" ? false : true} />
            <div className="text-context">
                <main className="page-content container" style={{display:'flex', flexDirection:'column', gap:'40px', marginBottom:'100px'}}>
                    <div className="main-pon" style={{ marginTop: "100px", textAlign: "center" }}>
                        <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>{t("commonTerms")}</h1>
                        <p style={{ padding: "20px 50px", backgroundColor: "#1A2751", color: "white", borderRadius: "30px", fontSize: "18px" }}>
                            {t("antiMoneyLaundering")}
                        </p>
                    </div>
                    
                    {[{
                        image: imgage1,
                        title: t("legalization.title"),
                        description: t("legalization.description")
                    }, {
                        image: imgage2,
                        title: t("terroristFinancing.title"),
                        description: t("terroristFinancing.description")
                    }, {
                        image: imgage3,
                        title: t("financialMonitoring.title"),
                        description: t("financialMonitoring.description")
                    }, {
                        image: imgage4,
                        title: t("monitoringSubject.title"),
                        description: t("monitoringSubject.description")
                    }, {
                        image: imgage5,
                        title: t("complianceOfficer.title"),
                        description: t("complianceOfficer.description")
                    }].map((section, index) => (
                        <div key={index} className="main-content-container" style={{ backgroundColor: "#F9F9F9", display: "flex", borderRadius: "15px" }}>
                            <div className="text-content-c" style={{ flex: "1", padding: "55px 70px" }}>
                                <div className="first-p" style={{ fontSize: "25px", color: "#1F3C88", fontWeight: "700" }}>{section.title}</div>
                                <div className="second-p" style={{ fontSize: "18px", color: "black", lineHeight: "21px" }}>{section.description}</div>
                            </div>
                            <div style={{ flex: ".7", display: "flex", justifyContent: "center", position: "relative" }}>
                                <img style={{ width: "200px", position: "absolute", bottom: "0" }} src={section.image} alt="" />
                            </div>
                        </div>
                    ))}
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default DictionaryPage;
