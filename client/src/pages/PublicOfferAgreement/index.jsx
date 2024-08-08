import React, { useEffect, useState } from "react";

import "./style.scss";

import Footer from "../../components/footer/Footer";

import { useTranslation } from 'react-i18next';

import Header from "../../components/header/Header";


import VisualModal from "../../components/VisualModal/VisualModal";

import { useStyle } from "../../components/VisualModal/StyleContext";

function PublicOfferAgreement() {

  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const letterInterval = "standard";
  const { t } = useTranslation();

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
  const handleColorModeChange = () => {
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
          dark={styles.colorMode == "dark" ? false : true}
          handleOpenVisualModal={handleOpenVisualModal}
        />
        <div className="container"></div>
      </div>

      <div className="page-content container" style={{ lineHeight: 1.5 }}>
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
            {t("Публичный договор-оферта")}
          </h1>
          <p>{t("Данный Публичный договор является")}</p>
          <br />
          <p>{t("АО «Академия финансового мониторинга")}</p>
          <br />
          <p>{t("Настоящий Договор в соответствии")}</p>
          <br />
          <p>{t("В связи с вышеизложенным")}</p>
          <br />
          <h2>{t("ПОНЯТИЯ И ТЕРМИНЫ, ИСПОЛЬЗУЕМЫЕ В ДОГОВОРЕ")}</h2>
          <p><span className="bold">{t("Исполнитель")}</span> – {t("АО «Академия")}</p>
          <p><span className="bold">{t("Пользователь")}</span> – {t("лицо, пользующееся")}</p>
          <br />
          <p><span className="bold">{t("Зарегистрированный пользователь")} </span>– {t("лицо, пользующееся информацией")}</p>
          <br />
          <p><span className="bold">{t("Заказчик")}</span> – {t("Зарегистрированный пользователь,")}</p>
          <br />
          <p><span className="bold">{t("Сайт")}</span> – {t("веб-сайт Исполнителя")}</p>
          <br />
          <p><span className="bold">{t("Оферта")} </span>– {t("настоящий «Публичный")}</p>
          <br />
          <p><span className="bold">{t("Услуги")} </span>– {t("электронные платные")}</p>
          <br />
          <p><span className="bold">{t("Объект")} </span>– {t("абонемент(ы) и (или)")}</p>
          <br />
          <p><span className="bold">{t("Заказ")} </span>– {t("заявка на приобретение")}</p>
          <br />
          <p><span className="bold">{t("Акцепт")} </span>– {t("ответ Зарегистрированного")}</p>
          <br />
          <p><span className="bold">{t("Прейскурант")} </span>– {t("действующий систематизированный")}</p>
          <br />
          <p><span className="bold">{t("Интерактивные услуги")} </span>– {t("это предоставление")}</p>
          <br />
          <p><span className="bold">{t("Информационная технология")} </span>– {t("совокупность методов")}</p>
          <br />
          <p><span className="bold">{t("Исключительное право")} </span>– {t("совокупность принадлежащих")}</p>
          <br />
          <p><span className="bold">{t("Стороны")} </span>– {t("сторонами Договора")}</p>
          <br />
          <p><span className="bold">{t("Персональные данные")} </span>– {t("сведения, регламентированные")}</p>
          <br />
          <p><span className="bold">{t("Сбор Персональных данных")} </span>– {t("действия, направленные")}</p>
          <br />
          <p><span className="bold">{t("Обработка Персональных данных")} </span>– {t("действия,")}</p>
          <br />
          <p><span className="bold">{t("Третьи лица")} </span>– {t("лица связанные,")}</p>
          <br />
          <p><span className="bold">{t("Компьютерный инцидент")} </span>– {t("это аномальное явление")}</p>
          <br />
          <h2>{t("1.ПРЕДМЕТ ДОГОВОРА")}</h2>
          <p>{t("1.1. Исполнитель")} </p>
          <br />
          <p>{t("1.2. Права")}</p>
          <br />
          <p>{t("1.3. Порядок")}</p>
          <br />
          <p>{t("1.3.1. регистрация")}</p>
          <br />
          <p>{t("1.3.2. совершение")}</p>
          <br />
          <p>{t("1.3.3. оплата")}</p>
          <br />
          <p>{t("1.4. При")}</p>
          <ol>
            <li> – {t("Статус Зарегистрированного")} </li>
            <li> – {t("Заказчик ознакомлен")}</li>
            <li> – {t("Акцепт Исполнителем")}</li>
            <li> – {t("Договор заключен")}</li>
            <li> – {t("заключение данного")}</li>
          </ol>
          <br />
          <p>{t("1.5. Исполнитель")}</p>
          <br />
          <p>{t("1.5.1. Исполнитель")}</p>
          <br />
          <p>{t("1.6. Исполнитель")} </p>
          <br />
          <p>{t("1.6.1. В")}</p>
          <br />
          <p>{t("1.6.2. Сайт")}</p>
          <br />
          <p>{t("1.6.3. При")}</p>
          <br />
          <h2>{t("2.УСЛОВИЯ ОКАЗАНИЯ УСЛУГ")}</h2>
          <p>{t("2.1. Условия")}</p>
          <br />
          <p>{t("Правила пользования сайтом:")} </p>
          <ol>
            <li> – {t("данные вносимые")}</li>
            <li> – {t("ответственность за")} </li>
            <li> – {t("пользование Сайтом")}</li>
            <li> – {t("Заказчик самостоятельно")}</li>
          </ol>
          <br />
          <p>{t("2.2. По")}</p>
          <br />
          <p>{t("2.3. Условия")}</p>
          <br />
          <p>{t("Зарегистрированный")}</p>
          <br />
          <p>{t("2.3.1. разовая")}</p>
          <br />
          <p>{t("2.3.2. регулярная")}</p>
          <br />
          <p>{t("2.3.3. неоднократная")}</p>
          <br />
          <p>{t("2.4. В")}</p>
          <br />
          <h2>{t("3.ЦЕНА")}</h2>
          <p>{t("3.1. Оплата")} </p>
          <br />
          <p>{t("3.2. Настоящим")}</p>
          <br />
          <p>{t("3.3. Оплата")}</p>
          <ol>
            <li> – {t("безналичным платежным")}</li>
            <li> – {t("по квитанции")}</li>
            <li> – {t("по карточке")}</li>
          </ol>
          <br />
          <p>{t("3.3.1. Прейскурант")}</p>
          <br />
          <p>{t("3.4. Стоимость")}</p>
          <br />
          <p>{t("3.5. Оплата")}</p>
          <br />
          <p>{t("3.6. Дата")}</p>
          <br />
          <h2>{t("4. ПРИЕМ-ПЕРЕДАЧА ОКАЗАННЫХ УСЛУГ")}</h2>
          <p>{t("4.1. Прием-передача")} </p>
          <br />
          <p>{t("4.2. Прием-передача")} </p>
          <br />
          <p>{t("4.3. Днем")}</p>
          <br />
          <h2>{t("5.СОГЛАСИЕ НА СБОР, ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ")}</h2>
          <p>{t("5.1. В соответствии")}</p>
          <br />
          <p>{t("5.2. Под")} </p>
          <br />
          <p>{t("5.3. Сбор")}</p>
          <ol>
            <li> – {t("для надлежащего исполнения Договора")}</li>
            <li> – {t("для судебной и внесудебной")}</li>
            <li> – {t("для проведения исследований")}</li>
            <li> – {t("для проведения маркетинговых")}</li>
          </ol>
          <br />
          <p>{t("5.4. Заказчик")}</p>
          <br />
          <p>{t("5.5. Согласие")}</p>
          <br />
          <h2>{t("6.ОТВЕТСТВЕННОСТЬ СТОРОН")}</h2>
          <p>{t("6.1. За неисполнение")}</p>
          <br />
          <p>{t("6.2. При")}</p>
          <br />
          <p>{t("6.3. В случае")}</p>
          <br />
          <p>{t("6.4. В случае")}</p>
          <br />
          <p>{t("6.5. Стороны")}</p>
          <br />
          <h2>{t("7.ФОРС-МАЖОР")}</h2>
          <p>{t("7.1. Стороны")}</p>
          <br />
          <p>{t("7.2. Сторона")}</p>
          <br />
          <p>{t("7.3. В извещении")}</p>
          <br />
          <p>{t("7.4. Сторона")}</p>
          <br />
          <p>{t("7.5. Если")}</p>
          <br />
          <p>{t("7.6. Срок")}</p>
          <br />
          <h2>{t("8.ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ")}</h2>
          <p>{t("8.1. Урегулирование")}</p>
          <br />
          <p>{t("8.2. Сторонами")}</p>
          <br />
          <p>{t("8.2.1. Стороне")}</p>
          <br />
          <p>{t("8.2.2. Содержание")}</p>
          <br />
          <p>{t("8.2.3. Срок")} </p>
          <br />
          <p>{t("8.2.4. При")}</p>
          <br />
          <p>{t("8.3.   Все споры")} </p>
          <br />
          <p>{t("8.4.     Корреспонденция")}</p>
          <br />
          <p>{t("8.5. Условия")}</p>
          <br />
          <h2>{t("9.ПОРЯДОК ИЗМЕНЕНИЯ, РАСТОРЖЕНИЯ ДОГОВОРА")}</h2>
          <p>{t("9.1. Стороны")}</p>
          <br />
          <p>{t("9.1.1. на бумажных")} </p>
          <br />
          <p>{t("9.2. без применения")} </p>
          <ol>
            <li>– {t("от имени Исполнителя")}</li>
            <li>– {t("от имени Заказчика")}</li>
          </ol>
          <br />
          <p>{t("9.3. Уведомление")}</p>
          <ol>
            <li>– {t("в тексте")}</li>
            <li>– {t("в тексте сообщения")}</li>
          </ol>
          <p>{t("Стороны отдельно")}</p>
          <br />
          <p>{t("9.4. Стороны")}</p>
          <ol>
            <li>– {t("Уведомление Заказчика")}</li>
            <li>– {t("В целях обеспечения")} </li>
            <li>– {t("Действующая редакция")}</li>
          </ol>
          <br />
          <p>{t("9.5. Расторжение")} </p>
          <br />
          <p>{t("9.6. Предложение")} </p>
          <br />
          <p>{t("9.7. Односторонний")} </p>
          <ol>
            <li>– {t("посредством электронной")}</li>
            <li>– {t("по почте обязательно")}</li>
            <li>– {t("нарочно под расписку")}</li>
          </ol>
          <br />
          <p>{t("9.8. К установленным")}</p>
          <br />
          <p>{t("9.9. По инициативе Заказчика:")}</p>
          <ol>
            <li>– {t("невыполнение")}</li>
            <li>– {t("просрочка Исполнителем")}</li>
            <li>– {t("невыполнение и")}</li>
          </ol>
          <br />
          <p>{t("9.10. По инициативе Исполнителя:")}</p>
          <ol>
            <li>– {t("невыполнение и (или)")}</li>
            <li>– {t("просрочка Заказчиком")}</li>
            <li>– {t("невыполнение и (или) ненадлежащее")}</li>
          </ol>
          <br />
          <h2>{t("10.ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ")}</h2>
          <p>{t("10.1. Договор")}</p>
          <br />
          <p>{t("10.2. Принимая")}</p>
          <br />
          <p>{t("10.3. Договор")} </p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
}

export default PublicOfferAgreement;
