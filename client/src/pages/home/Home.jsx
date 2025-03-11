import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStyle } from "../../components/VisualModal/StyleContext";
import VisualModal from "../../components/VisualModal/VisualModal";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/v2";
import OlympiadPromoButton from "../../features/olympiad/components/OlympiadPromoButton";
import cl from "./Home.module.css";
import AboutUsSection from "./sections/AboutUsSection";
import SecondSection from "./sections/second-section/index";

function Home() {
  const removeBackground = false;
  const [imagesHidden, setImagesHidden] = useState(false);
  const letterInterval = "standard";
  const { styles, open, setOpen, userEntry, checkStyle } = useStyle();
  const location = useLocation();
  const [openVisualModal, setOpenVisualModal] = useState(open);


  useEffect(() => {
    if (location.hash === "#coursesSection") {
      scrollToCourses();
    } else if (location.hash === "#newsSection") {
      scrollToNews();
    }
  }, []);

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
            item.style.fontSize = fontSizes[size].fontSize;
            item.style.lineHeight = fontSizes[size].lineHeight;
            if (item.classList.contains("caption")) {
              item.style.fontSize = fontSizes[size].caption.fontSize;
              item.style.lineHeight = fontSizes[size].caption.lineHeight;
            } else if (item.classList.contains("subtitle")) {
              item.style.fontSize = fontSizes[size].subtitle.fontSize;
              item.style.lineHeight = fontSizes[size].subtitle.lineHeight;
            }
            break;

          case "standard":
            if (item.classList.contains("caption")) {
              item.style.fontSize = fontSizes[size].caption.fontSize;
              item.style.lineHeight = fontSizes[size].caption.lineHeight;
            } else if (item.classList.contains("subtitle")) {
              item.style.fontSize = fontSizes[size].subtitle.fontSize;
              item.style.lineHeight = fontSizes[size].subtitle.lineHeight;
            } else {
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
  }, [checkStyle, userEntry, styles]);

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


  const scrollToCourses = () => {
    const coursesSection = document.getElementById("coursesSection");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToNews = () => {
    const newsSection = document.getElementById("newsSection");
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenVisualModal = () => {
    setOpenVisualModal((prev) => !prev);
    setOpen((prev) => !prev);
  };

  const handleColorModeChange = (mode) => {
    const containerElement = document.querySelector(".text-content");
    if (containerElement) {
      containerElement.classList.remove("light-mode", "dark-mode", "inverted-mode");
    }

    const { colorMode } = styles;

    if (containerElement) {
      containerElement.classList.add(colorMode + "-mode");
    }
  };

  const handleRemoveImages = () => {
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

  return (
    <div className={`${cl.homeWrapper} text-content`}>
      <OlympiadPromoButton />
      <div className="interval" style={{ letterSpacing: getLetterSpacing(letterInterval) }}>
        <VisualModal open={openVisualModal} onRemoveImages={handleRemoveImages} onShowImages={handleShowImages} onFontFamily={() => {}} onIntervalChange={() => {}} styles={styles} dark={removeBackground} />
        <Header handleOpenVisualModal={handleOpenVisualModal} />
        <AboutUsSection imagesHidden={imagesHidden} />
        <SecondSection />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
