import React, { useState } from "react";
import Select from "react-select";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

// Ссылки на FlipHTML5 для разных PDF-документов
const flipHTML5Files = [
    { value: "https://online.fliphtml5.com/amlfiles/uubk/", label: "Должностная инструкция" },
    { value: "https://online.fliphtml5.com/amlfiles/yxai/", label: "Положение" },
];

const PVKPage = () => {
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

export default PVKPage;