import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useStyle } from "../../components/VisualModal/StyleContext";
import Footer from "../../components/footer/Footer";

import Header from "../../components/header/Header";
import { selectNews } from '../../redux/slices/newsSlice';
import base_url from "../../settings/base_url";
import i18n from '../../settings/i18n';
import "./style.css";

function NewsPage() {

  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [newsData, setNewsData] = useState([]);
  const [selectedRowBtn, setSelectedRowBtn] = useState(null);
  const [displayedNews, setDisplayedNews] = useState(null);  // Добавляем состояние для отображаемых новостей
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();
  const selectedNews = useSelector((state) => state.news.selectedNews);
  const currentLanguage = i18n.language;
  const { id } = useParams();

  const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  useEffect(() => {
    if (!checkStyle) return;
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleShowDetailsBtn = (selectedRowBtn) => {
    setSelectedRowBtn(selectedRowBtn);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.getElementById("Modal");
      const buttons = document.getElementsByTagName("button");
      if (modal && !modal.contains(event.target) && !Array.from(buttons).some(button => button === event.target)) {
        handleShowDetailsBtn(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedRowBtn]);

  // Загружаем данные только один раз
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/aml/course/getAllNewsByLang/ru`);
        setNewsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentLanguage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/aml/course/getNewsById/ru`, {
          params: {
            id: id
          }
        });
        setDisplayedNews(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentLanguage]);

  const handleOpenVisualModal = () => {
    setOpen(prev => !prev);
  };

  const renderCardContent = (item) => {
    const datee = new Date(item.date);
    const day = datee.getDate();
    const monthIndex = datee.getMonth();
    const month = months[monthIndex];
    const hour = datee.getHours();
    const minutes = datee.getMinutes();
    const formattedDate = `${day} ${month} ${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return (
      <div className="cardContainer" key={item.id} onClick={() => dispatch(selectNews(item))}>
        <div className="cardContent">
          <p className="cardTitle">{currentLanguage === 'ru' ? item.name : item.kz_name}</p>
          <div className="dateContent">
            <div className="date">
              <p className="dateTime">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div className="vebinars-page text-content" style={{ background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#f2f2f2" : styles.colorMode === "blue" ? "#9dd1ff" : "#000" }}>
        <Header dark={styles.colorMode === "dark" ? false : true} handleOpenVisualModal={handleOpenVisualModal} />
        <div className="page-content container">
          <div className="news-layout">
            {displayedNews && (
              <div className="latestNews">
                <br />
                <h2 className="latestNewsTitle">
                  {currentLanguage === 'kz' ? displayedNews.kz_name : displayedNews.name}
                </h2>
                <br />
                {displayedNews.image && (
                  <div className="latestNewsImgWrapper">
                    {/* Размытый фон */}
                    <div
                      className="blurred-bg"
                      style={{ backgroundImage: `url(${displayedNews.image})` }}
                    />
                    {/* Основное изображение */}
                    <img src={displayedNews.image} alt="" className="latestNewsImg" />
                  </div>
                )}
                <p className="latestNewsText" dangerouslySetInnerHTML={{
                  __html: currentLanguage === 'ru'
                    ? displayedNews.description?.replace(/\n/g, "<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
                    : displayedNews.kz_description?.replace(/\n/g, "<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
                }}></p>
              </div>
            )}

            <div className="otherNews">
              <br /><br /><br />
              {newsData.filter((item) => item.id !== displayedNews?.id).slice(0, 6).map((item) => renderCardContent(item))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

}

export default NewsPage;
