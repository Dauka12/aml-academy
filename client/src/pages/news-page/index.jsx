import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useStyle } from "../../components/VisualModal/StyleContext";
import Footer from "../../components/footer/Footer";

import { useTranslation } from "react-i18next";
import Header from "../../components/header/v2";
import base_url from "../../settings/base_url";
import i18n from '../../settings/i18n';
import "./style.css";

function NewsPage() {

  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [newsData, setNewsData] = useState([]);
  const [selectedRowBtn, setSelectedRowBtn] = useState(null);
  const [displayedNews, setDisplayedNews] = useState(null);  // Добавляем состояние для отображаемых новостей
  const [isLoading, setIsLoading] = useState(true)
  const currentLanguage = i18n.language;
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  const handleNavigate = (id) => {
    navigate(`/news-page/${id}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/aml/course/getAllNewsByLang/${currentLanguage === 'kz' ? 'kz' : currentLanguage === 'eng' ? 'eng' : 'ru'}`);
        setNewsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentLanguage, t]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);  // Показываем индикатор загрузки
        const response = await axios.get(`${base_url}/api/aml/course/getNewsById/${currentLanguage === 'kz' ? 'kz' : currentLanguage === 'eng' ? 'eng' : 'ru'}`, {
          params: {
            id: id
          }
        });
        setDisplayedNews(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentLanguage, id, t]);


  useEffect(() => {
    console.log('Current Language:', currentLanguage);
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
      <div className="cardContainer" key={item.id} onClick={() => handleNavigate(item.id)}>
        <div className="cardContent">
          <p className="cardTitle">{item.name}</p>
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
    );
  } else if (!displayedNews) {
    return (
      <div>No news found.</div>
    );
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
                  {displayedNews.name}
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
                {displayedNews?.description.map((des, index) => (
                    <React.Fragment key={index}>
                      <div className="latestNewsText">{des.description}</div>
                      {des.image && (
                        <div className="latestNewsImgWrapper">
                          <div
                              className="blurred-bg"
                              style={{backgroundImage: `url(${des.image})`}}
                          />
                          <img src={des.image} alt="" className="latestNewsImg"/>
                        </div>
                      )}
                    </React.Fragment>
                ))}
              </div>
            )}
            <div className="otherNews">
              <h3 style={{ 
                marginBottom: '20px', 
                fontSize: '18px', 
                fontWeight: 600, 
                color: '#2c3e50',
                fontFamily: 'Georgia, serif'
              }}>
                {t("all news") || "Другие новости"}
              </h3>
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
