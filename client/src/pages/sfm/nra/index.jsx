import React, { useState } from "react";
import Select from "react-select";
import Footer from "../../../components/footer";
import Header from "../../../components/header/v2";
import { t } from "i18next";

// Ссылки на FlipHTML5 для разных PDF-документов
const flipHTML5Files = [
    { 
        value: "https://online.fliphtml5.com/numug/ogje/", 
        label: "НАЦИОНАЛЬНАЯ ОЦЕНКА РИСКОВ легализации (отмывания) преступных доходов 2025",
        downloadUrl: "amlacademy.kz/aml/НАЦИОНАЛЬНАЯ_ОЦЕНКА_РИСКОВ_легализации_(отмывания)_преступных_доходов_2025.docx"
    },
    { 
        value: "https://online.fliphtml5.com/numug/ddrr/", 
        label: "НАЦИОНАЛЬНАЯ ОЦЕНКА РИСКОВ Финансирования терроризма (Публичный отчет) 2025",
        downloadUrl: "amlacademy.kz/aml/НАЦИОНАЛЬНАЯ_ОЦЕНКА_РИСКОВ_Финансирования_терроризма_(Публичный_отчет)_2025_(1).docx"
    },
    { 
        value: "https://online.fliphtml5.com/numug/blwd/", 
        label: "ТӘУЕКЕЛДЕРДІ ҰЛТТЫҚ БАҒАЛАУ Терроризмді қаржыландыру (Қоғамдық есеп) 2025",
        downloadUrl: "amlacademy.kz/aml/_gluster_2025_6_18_b4c98e42bba67003580564caf625b0bf_original.211174.docx"
    },
    { 
        value: "https://online.fliphtml5.com/numug/rxlt/", 
        label: "ҚЫЛМЫСТЫҚ КІРІСТЕРДІ ЗАҢДАСТЫРУ (ЖЫЛЫСТАТУ) ТӘУЕКЕЛДЕРІН ҰЛТТЫҚ БАҒАЛАУ (Жария нұсқасы) 2025",
        downloadUrl: "amlacademy.kz/aml/_gluster_2025_6_18_897290e86f30f0e7aec580d9f4007c6b_original.65625.docx"
    }, 
];

const nra = () => {
    const [selectedURL, setSelectedURL] = useState(flipHTML5Files[0].value);

    const handleSelectChange = (option) => {
        setSelectedURL(option.value);
    };    const handleDownload = () => {
        const selectedDoc = flipHTML5Files.find(doc => doc.value === selectedURL);
        if (selectedDoc && selectedDoc.downloadUrl) {
            // Перенаправляем на страницу скачивания
            window.open(`https://${selectedDoc.downloadUrl}`, '_blank');
        } else {
            // Если нет прямой ссылки, открываем документ в новой вкладке
            window.open(selectedDoc.value, '_blank');
        }
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
                }}>                    <h2 style={{ marginBottom: "15px", color: "#333", fontWeight: "bold", textAlign: "center" }}>
                        {t("nra")}
                    </h2>                    <p style={{ lineHeight: "1.6", color: "#333", margin: "0", textIndent: "60px", textAlign: "justify" }}>
                        {t("nraDesc")}
                    </p>
                </div>                {/* Выпадающий список для выбора документа */}
                <Select
                    options={flipHTML5Files}
                    defaultValue={flipHTML5Files[0]}
                    onChange={handleSelectChange}
                    styles={{ container: (base) => ({ ...base, marginBottom: "20px" }) }}
                />

                {/* Кнопка скачать */}
                <button
                    onClick={handleDownload}
                    style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginBottom: "20px",
                        transition: "background-color 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                >
                    📥 Скачать документ
                </button>

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
            <Footer />
        </>
    );
};

export default nra;
