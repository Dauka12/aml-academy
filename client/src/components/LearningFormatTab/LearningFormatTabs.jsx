import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import courseImg3 from "../../assets/icons/offline.svg";
import courseImg2 from "../../assets/icons/online-education.svg";
import courseImg from "../../assets/icons/remote.svg";
import { useStyle } from "../../components/VisualModal/StyleContext";
import VisualModal from "../../components/VisualModal/VisualModal";
import { useCategoryFormat } from '../../pages/Context/Context';
import Button from "../UI/button/Button";
import cl from "./Tabs.module.css";

const LearningFormatTabs = ({ text }) => {
  const { styles } = useStyle();
  const { t } = useTranslation();
  const { handleChangeCategoryFormat } = useCategoryFormat();
  const [activeTab, setActiveTab] = useState(1);
  const [imagesHidden, setImagesHidden] = useState(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = container?.querySelector(".content");
    const maxLines = 3;

    if (container && container.scrollHeight > container.clientHeight) {
      while (
        container.scrollHeight > container.clientHeight &&
        content?.clientHeight > maxLines * content.offsetHeight
      ) {
        if (content) content.textContent = content.textContent?.replace(/\W*\s(\S)*$/, "...");
      }
    }
  }, [text]);

  const handleRemoveImages = () => {
    setImagesHidden(true);
  };

  const handleShowImages = () => {
    setImagesHidden(false);
  };

  useEffect(() => {
    setImagesHidden(!styles.showImage);
  }, [styles.showImage]);

  return (
    <div
      className={cl.coursesContent}
      style={{
        background:
          styles.colorMode === "dark"
            ? "#000"
            : styles.colorMode === "light"
            ? "#fff"
            : styles.colorMode === "blue"
            ? "#9dd1ff"
            : "#000",
      }}
    >
      <VisualModal onRemoveImages={handleRemoveImages} onShowImages={handleShowImages} />
      <div
        className={cl.tabHeader}
        style={{
          background:
            styles.colorMode === "dark"
              ? "#000"
              : styles.colorMode === "light"
              ? "#fff"
              : styles.colorMode === "blue"
              ? "#9dd1ff"
              : "#000",
        }}
      >
        {[courseImg, courseImg2, courseImg3].map((imgSrc, index) => (
          <div
            key={index}
            className={`${cl.btnTab} ${activeTab === index + 1 ? 'active' : ''}`}
            onClick={() => handleTabClick(index + 1)}
          >
            {!imagesHidden && <img src={imgSrc} alt="" />}
            <div className="nameTab">{t(index === 0 ? "remote" : index === 1 ? "online" : "offline")}</div>
          </div>
        ))}
      </div>
      <div
        className={cl.tabContent}
        style={{
          background:
            styles.colorMode === "dark"
              ? "#000"
              : styles.colorMode === "light"
              ? "#fff"
              : styles.colorMode === "blue"
              ? "#9dd1ff"
              : "#000",
          color: styles.colorMode === "dark" ? "#FFF" : "#000",
        }}
      >
        {activeTab === 1 && (
          <div
            className={cl.courses__info}
            ref={containerRef}
            style={{ maxHeight: "fit-content" }}
          >
            <p
              className={cl.course__headline}
              style={{
                background:
                  styles.colorMode === "dark"
                    ? "#000"
                    : styles.colorMode === "light"
                    ? "#fff"
                    : styles.colorMode === "blue"
                    ? "#9dd1ff"
                    : "#000",
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
              {t("description of the remote")}
            </p>
            <p
              className={cl.course__text}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "vertical",
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
              {t("descRemote")}
            </p>
            <Link to="/courses#top" style={{ textDecoration: "none" }}>
              <Button onClick={() => handleChangeCategoryFormat('Дистанционно')} className={cl.more}>{t("go to catalog")}</Button>
            </Link>
          </div>
        )}
        {activeTab === 2 && (
          <div className={cl.courses__info}>
            <p
              className={cl.course__headline}
              style={{
                background:
                  styles.colorMode === "dark"
                    ? "#000"
                    : styles.colorMode === "light"
                    ? "#fff"
                    : styles.colorMode === "blue"
                    ? "#9dd1ff"
                    : "#000",
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
              {t("description of the online")}
            </p>
            <p
              className={cl.course__text}
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
              {t("descOnline")}
            </p>
            <Link to="/courses#top" style={{ textDecoration: "none" }}>
              <Button onClick={() => handleChangeCategoryFormat('Онлайн')} className={cl.more}>{t("go to catalog")}</Button>
            </Link>
          </div>
        )}
        {activeTab === 3 && (
          <div className={cl.courses__info}>
            <p
              className={cl.course__headline}
              style={{
                background:
                  styles.colorMode === "dark"
                    ? "#000"
                    : styles.colorMode === "light"
                    ? "#fff"
                    : styles.colorMode === "blue"
                    ? "#9dd1ff"
                    : "#000",
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
              {t("description of the offline")}
            </p>
            <p
              className={cl.course__text}
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
              {t("descOffline")}
            </p>
            <Link to="/courses#top" style={{ textDecoration: "none" }}>
              <Button onClick={() => handleChangeCategoryFormat('Очное')} className={cl.more}>{t("go to catalog")}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningFormatTabs;
