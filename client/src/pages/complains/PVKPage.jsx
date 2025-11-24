import React, { useState } from "react";
import Select from "react-select";
import Footer from "../../components/footer";
import Header from "../../components/header/v2";

// Ссылки на FlipHTML5 для разных PDF-документов
const flipHTML5Files = [
    {value: "https://online.fliphtml5.com/numug/qbyq/", label: "Кодекс деловой этики Академии АМЛ" },
    { value: "https://online.fliphtml5.com/amlfiles/uubk/", label: "Должностная инструкция" },
    { value: "https://online.fliphtml5.com/amlfiles/yxai/", label: "Положение" },
    { value: "https://online.fliphtml5.com/numug/qgsq/", label: "Правила информирования о фактах коррупции" },
    {value:  "https://online.fliphtml5.com/numug/mefb/", label: "Сыбайлас жемқорлық туралы хабарлау ережелері"},
    {value:  "https://online.fliphtml5.com/numug/eanj/", label: "Правила внутреннего анализа коррупционных рисков Академии"},
    {value:  "https://online.fliphtml5.com/numug/susm/", label: "Академияның сыбайлас жемқорлық тәуекелдеріне ішкі талдау жүргізу ережесі"},
    {value:  "https://online.fliphtml5.com/sufhu/iitt/", label: "Правила по конфликту интересов"},
    {value:  "https://online.fliphtml5.com/numug/rsnw/", label: "Мүдделер қақтығысының саясаты"},
    {value:  "https://online.fliphtml5.com/amlfiles/wrcj/", label: "Инструкция по коррупции Академии"},
    {value:  "https://online.fliphtml5.com/amlfiles/nevx/", label: "Академияның сыбайлас жемқорлыққа қарсы нұсқаулығы"},
    {value:  "https://online.fliphtml5.com/numug/cruj/", label: "Академияның сыбайлас жемқорлыққа қарсы стандарты"},
    {value:  "https://online.fliphtml5.com/numug/rfqv/", label: "Антикоррупционный стандарт Академии"},
    {value:  "https://online.fliphtml5.com/numug/pbre/", label: "Академияның ішкі сыбайлас жемқорлыққа қарсы саясаты"},
    {value:  "https://online.fliphtml5.com/numug/jnqy/", label: "Внутренняя политика противодействия коррупции Академии"},

];

const PVKPage = () => {
    const [selectedURL, setSelectedURL] = useState(flipHTML5Files[0].value);

    const handleSelectChange = (option) => {
        setSelectedURL(option.value);
    };

    return (
        <>
            {/* Шапка */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", marginBottom: "100px" }}>
                <Header dark={true} style={{ zIndex: 10 }} />
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
