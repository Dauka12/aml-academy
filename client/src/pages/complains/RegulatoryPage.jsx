import React, { useState } from "react";
import Select from "react-select";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

// Ссылки на FlipHTML5 для разных PDF-документов
const flipHTML5Files = [
    { value: "https://online.fliphtml5.com/amlfiles/tfuz/", label: "Антикоррупционная стратегия на 2015-2025 годы" },
    { value: "https://online.fliphtml5.com/amlfiles/jkzf/", label: "Антикоррупционный стандарт РК" },
    { value: "https://online.fliphtml5.com/amlfiles/byhc/", label: "Концепция антикоррупционной политики на 2022-2026 годы" },
    { value: "https://online.fliphtml5.com/amlfiles/hlak/", label: "Международный стандарт 37001" },
    { value: "https://online.fliphtml5.com/amlfiles/zyls/", label: "Методика по ВАКР" },
];

const RegulatoryPage = () => {
    const [selectedURL, setSelectedURL] = useState(flipHTML5Files[0].value);

    const handleSelectChange = (option) => {
        setSelectedURL(option.value);
    };

    return (
        <>
            {/* Шапка */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", marginBottom: "50px" }}>
                <Header dark={true} style={{ zIndex: 1000 }} />
            </div>

            {/* Основное содержимое */}
            <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>

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

export default RegulatoryPage;