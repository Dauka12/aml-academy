import React, { useState } from "react";
import Select from "react-select";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/v2";
import { t } from "i18next";

// Ссылки на FlipHTML5 для разных PDF-документов
const flipHTML5Files = [
    { value: "https://online.fliphtml5.com/numug/ogje/", label: "НАЦИОНАЛЬНАЯ ОЦЕНКА РИСКОВ легализации (отмывания) преступных доходов 2025" },
    { value: "https://online.fliphtml5.com/numug/ddrr/", label: "НАЦИОНАЛЬНАЯ ОЦЕНКА РИСКОВ Финансирования терроризма (Публичный отчет) 2025" },
    { value: "https://online.fliphtml5.com/numug/blwd/", label: "ТӘУЕКЕЛДЕРДІ ҰЛТТЫҚ БАҒАЛАУ Терроризмді қаржыландыру (Қоғамдық есеп)" },
    { value: "https://online.fliphtml5.com/numug/rxlt/", label: "ҚЫЛМЫСТЫҚ КІРІСТЕРДІ ЗАҢДАСТЫРУ (ЖЫЛЫСТАТУ) ТӘУЕКЕЛДЕРІН ҰЛТТЫҚ БАҒАЛАУ (Жария нұсқасы) " }, 
];

const nra = () => {
    const [selectedURL, setSelectedURL] = useState(flipHTML5Files[0].value);

    const handleSelectChange = (option) => {
        setSelectedURL(option.value);
    };

    return (
        <>
            {/* Шапка */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", marginBottom: "100px" }}>
                <Header dark={true} style={{ zIndex: 1000 }} />
            </div>            {/* Основное содержимое */}
            <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>

                {/* Описание документа */}
                <div style={{ 
                    textAlign: "left", 
                    marginBottom: "30px", 
                    padding: "20px", 
                    backgroundColor: "#f8f9fa", 
                    borderRadius: "8px",
                    border: "1px solid #e9ecef"
                }}>
                    <h2 style={{ marginBottom: "15px", color: "#333" }}>
                        {t("nra")}
                    </h2>
                    <p style={{ lineHeight: "1.6", color: "#555", margin: "0" }}>
                        {t("nraDesc")}
                    </p>
                </div>

                {/* Выпадающий список для выбора документа */}
                <Select
                    options={flipHTML5Files}
                    defaultValue={flipHTML5Files[0]}
                    onChange={handleSelectChange}
                    styles={{ container: (base) => ({ ...base, marginBottom: "20px" }) }}
                />

                {/* Встраивание FlipHTML5 в iframe */}
                <div style={{ position: "relative", width: "100%", height: "1100px", marginBottom:'40px' }}>
                    <iframe
                        src={selectedURL}
                        title="FlipHTML5 PDF Viewer"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="fullscreen"
                        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                    ></iframe>
                </div>
            </div>

            {/* Подвал */}
            <Footer />
        </>
    );
};

export default nra;
