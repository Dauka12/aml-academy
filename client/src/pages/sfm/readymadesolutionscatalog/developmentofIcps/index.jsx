import React, { useEffect, useState } from "react";
import "./index.scss";
import Footer from "../../../../components/footer/index.jsx";
import { useTranslation } from "react-i18next";
import Header from "../../../../components/header/v2/index.jsx";
import VisualModal from "../../../../components/VisualModal/VisualModal.jsx";
import { useStyle } from "../../../../components/VisualModal/StyleContext.jsx";

function DevelopmentOfIcps() {
  const { t } = useTranslation();

  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const letterInterval = "standard";

  useEffect(() => {
    if (!checkStyle) return;
    console.log(userEntry);
    if (userEntry) return;
    const textContentElement = document.querySelectorAll(".text-content");
    const size = styles.fontSize;

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

  const handleRemoveImages = () => {
    console.log("Images hidden");


  };

  const handleShowImages = () => {
  
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
        onFontFamily={() => {}}
        onIntervalChange={() => {}}
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
            {t("Development of ICPs")}
                  </h1>
          <p>{t("development_PVK_AML_CFT")}</p>
          <br />
          <p>{t("development_documents_key_AML_CFT")}</p>
          <br />
          <p>{t("development_internal_control_organization_program_AML_CFT")}</p>
          <br />
          <p>{t("development_anti_money_laundering_risk_management_program")}</p>
          <br />
          <p>{t("development_customer_identification_program")}</p>
          <br />
          <p>{t("development_customer_transaction_monitoring_program")}</p>
          <br />
          <p>{t("development_training_program_AML_CFT")}</p>
          <br />
          <p>{t("development_information_document_management_program_AML_CFT")}</p>
          <br />
          <p>{t("risk_management_system_development")}</p>
          <br />
          <p>{t("development_internal_control_organization_documentation_AML_CFT")}</p>
          <br />
          <p>{t('supporting_documents_PVK_subject_control')}</p>
          
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

export default DevelopmentOfIcps;
