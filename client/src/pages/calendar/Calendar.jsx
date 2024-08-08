import React, { useState, useEffect } from "react";

import DefaultHeader from "../../components/defaultHeader/DefaultHeader";
import Footer from "../../components/footer/Footer";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";

import "./Calendar.scss";
import Header from "../../components/header/Header";

import { t } from "i18next";
import { useTranslation } from "react-i18next";

import VisualModal from "../../components/VisualModal/VisualModal";

import { useStyle } from "../../components/VisualModal/StyleContext";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0]; // Extract date part
  return formattedDate;
};

function CalendarPage(props) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [events, setEvents] = useState([
    {
      _id: 0,
      date: "",
      content: "",
      title: "",
      type: "",
    },
  ]);

  const [showEvent, setShowEvent] = useState(false);
  const [currEvent, setCurrEvent] = useState({
    _id: 0,
    date: "",
    content: "",
    title: "",
    type: "",
  });

  useEffect(() => {
    // console.log('Fetching events...');
    axios
      .get("http://localhost:1415/events/all")
      .then((res) => {
        // console.log('Events response:', res.data);

        const formattedEvents = res.data.map((event) => ({
          ...event,
          date: formatDate(event.date),
          _date: formatDate(event._date), // Format the date here
          // You can format other date-related fields in a similar way
        }));

        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
      });
  }, []);

  const handleDateClick = (arg) => {
    // console.log(arg, typeof arg)
  };

  const handleEventClick = (arg) => {
    // console.log(arg)
    // console.log(arg.event.extendedProps);

    // let id = arg.event.id - 0

    setCurrEvent(
      events.filter((item) => {
        return item._id === arg.event.extendedProps._id;
      })[0]
    );

    setShowEvent(true);
  };
  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const [letterInterval, setLetterInterval] = useState("standard");

  const [activeTab, setActiveTab] = useState(1);

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
          case "large":
            // Use specified size for small and large modes
            item.style.fontSize = fontSizes[size].fontSize;
            item.style.lineHeight = fontSizes[size].lineHeight;

            // Adjust size for caption and subtitle in small and large modes
            if (item.classList.contains("caption")) {
              item.style.fontSize = fontSizes[size].caption.fontSize;
              item.style.lineHeight = fontSizes[size].caption.lineHeight;
            } else if (item.classList.contains("subtitle")) {
              item.style.fontSize = fontSizes[size].subtitle.fontSize;
              item.style.lineHeight = fontSizes[size].subtitle.lineHeight;
            }
            break;

          case "standard":
            // Use different sizes for different elements in standard mode
            if (item.classList.contains("caption")) {
              item.style.fontSize = fontSizes[size].caption.fontSize;
              item.style.lineHeight = fontSizes[size].caption.lineHeight;
            } else if (item.classList.contains("subtitle")) {
              item.style.fontSize = fontSizes[size].subtitle.fontSize;
              item.style.lineHeight = fontSizes[size].subtitle.lineHeight;
            } else {
              // Default size for other elements
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

  }, [checkStyle, userEntry, styles, setImagesHidden, fontSizes]);
  const handleColorModeChange = (mode) => {
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

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const handleOpenVisualModal = () => {
    console.log("OPEN");
    setOpenVisualModal((prev) => !prev);
    setOpen((prev) => !prev);
  };
  const [openVisualModal, setOpenVisualModal] = useState(open);

  const handleRemoveImages = () => {
    console.log("Images hidden");

    setImagesHidden(true);
  };

  const handleShowImages = () => {
    setImagesHidden(false);
  };

  const handleIntervalChange = (interval) => {
    console.log("Interval changed");
    setLetterInterval(interval);
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
  useEffect(() => {
    const textContentElement = document.querySelector(".text-content");
    const family = styles.fontFamily;

    if (family) {
      textContentElement.style.fontFamily = family;
    }
  }, []);

  return (
    <>
      <div className="calendar-page"
      style={{
        background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#fff" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
      }}
      >
        <div
          className="text-content"
          style={{ letterSpacing: getLetterSpacing(letterInterval) }}
        >
          <VisualModal
            open={openVisualModal}
            onRemoveImages={handleRemoveImages}
            onShowImages={handleShowImages}
            onFontFamily={() => {}}
            onIntervalChange={() => {}}
            styles={styles}
          />
          <Header
            dark={styles.colorMode == "dark" ? false : true}
            handleOpenVisualModal={handleOpenVisualModal}
          />
          <div className="container">
            <div
              className="interval"
              style={{ letterSpacing: getLetterSpacing(letterInterval) }}
            ></div>
            <main className="page-content container">
              <h2
                className="text-content caption"
                style={{
                  letterSpacing: getLetterSpacing(letterInterval),
                  color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#3A3939" : styles.colorMode === "blue" ? "#063462" : "#000",

                }}
              >
                {t("announcements")}
              </h2>

              <div className="calendar-wrapper">
                {/* <h3>{today}</h3> */}

                <div className="calendar-body">
                  <div
                    className="text-content"
                    style={{ letterSpacing: getLetterSpacing(letterInterval) }}
                  >
                    <FullCalendar
                      className="text-content"
                      locale={
                        i18n.language === "ru"
                          ? "ru-RU"
                          : i18n.language === "kz"
                          ? "ru-RU"
                          : "en-EN"
                      }
                      // locale={'ru-RU'}
                      buttonText={{
                        today: t("today"),
                        month: t("month"),
                        week: t("week"),
                        day: t("day"),
                        list: t("list"),
                      }}
                      headerToolbar={{
                        left: "title",
                        center: "",
                        right: "prev,today,next",
                      }}
                      plugins={[dayGridPlugin, interactionPlugin]}
                      initialView="dayGridMonth"
                      selectable={true}
                      events={events}
                      dateClick={handleDateClick}
                      eventContent={renderEventContent}
                      eventClick={handleEventClick}
                    />
                  </div>
                </div>

                <div
                  className="calendar-events"
                  style={{ letterSpacing: getLetterSpacing(letterInterval) }}
                >
                  {!showEvent ? (
                    events.map((event) => {
                      <EventCard event={event} />;
                    })
                  ) : (
                    <EventCard event={currEvent} />
                  )}
                </div>
              </div>
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

const EventCard = ({ event }) => {
  const monthes = [
    t("month1"),
    t("month2"),
    t("month3"),
    t("month4"),
    t("month5"),
    t("month6"),
    t("month7"),
    t("month8"),
    t("month9"),
    t("month10"),
    t("month11"),
    t("month12"),
  ];

  let day = event.date.substring(8);
  let month = event.date.substring(5, 7);
  month = monthes[parseInt(month) - 1];
  let year = event.date.substring(0, 4);

  return (
    <div className="event-card">
      <div>
        <p>
          {day} {month}
        </p>
        <p>{year}</p>
      </div>
      <div>
        <p>{event.content}</p>
        <div className={"event-type"}>{event.title}</div>
      </div>
    </div>
  );
};

const renderEventContent = (eventInfo) => {
  // console.log("event", eventInfo);

  return (
    <>
      <div
        style={{
          cursor: "pointer",
          background: "#F9CB36",
          border: "none",
          padding: "8px",
        }}
      >
        <i style={{ color: "black" }}>{eventInfo.event.title}</i>
      </div>
    </>
  );
};

export default CalendarPage;
