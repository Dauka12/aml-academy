import React, { useEffect, useState } from 'react';

import { BiSolidFilePdf } from 'react-icons/bi';
import PaginableTable from './../paginableTable/PaginableTable';


import axios from 'axios';
import { useTranslation } from "react-i18next";
import { useStyle } from "../../components/VisualModal/StyleContext";
import base_url from '../../settings/base_url';
import './style.scss';



function ProfileEducation({ handleOpenModal }) {
    const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const [letterInterval, setLetterInterval] = useState("standard");
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

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
  }, [checkStyle, userEntry, styles, setImagesHidden, fontSizes]);
  const handleColorModeChange = (mode) => {
    // Remove previous color mode classes
    const containerElement = document.querySelector(".text-content");
    if (containerElement) {
      containerElement.classList.remove(
        "light-mode",
        "dark-mode",
        "inverted-mode",
        "blue-mode",
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

  const getShowImage = () => {
    return imagesHidden;
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

    const eduColumns = ['Курс', 'Вид курса', 'Начало курса', 'Конец курса', 'Actions'];
    const [eduRows, setEduRows] = useState([
        { org_name: 'загрузка...', position: 'загрузка...', start_date: 'загрузка...', end_date: 'загрузка...' },
        // Add more data as needed
    ]);
    const eduRowsPerPage = 5;

    

    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [opening, setOpening] = useState(false)

    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/course/getUserCourses`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
    
                if (response.status === 200) {
                    console.log(response.data)
                    setCourses(response.data);
    
                    let _edu = response.data.filter(course => course.paymentInfo && course.paymentInfo.status === 'finished').map(course => {
                        return {
                            org_name: course.courseDTO.course_name,
                            position: course.courseDTO.course_name.type_of_study || 'Электронное обучение',
                            start_date: '2024-01-01', 
                            end_date: '2024-02-01',
                            id: course.courseDTO.course_id
                        }
                    });
                    // console.log(_edu)
                    setEduRows(_edu);
                } else {
                    // Handle other status codes if needed
                    setError(response.statusText);
                    // console.log(response.statusText);
                }
    
            } catch (error) {
                setError(error);
                console.error(error);
            }
        };
        
        fetchData();
    
    }, []);

    const getFile = async (id) => {
        if (id) {
            try {
                const response = await axios.get(
                    `${base_url}/api/aml/course/getCertificateByCourseId/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                        responseType: 'blob', // Set the responseType to 'blob'
                    }
                );
    
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Сертификат.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
    
            } catch (error) {
                console.error(error);
            }
        }
    };

    return ( 
        <>
        <div className="education-info text-content"
        style={{
            background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#fff" : styles.colorMode === "blue" ? "#9dd1ff" : "#000"
          }}
        >

            {/* <div className="title">Опыт работы</div> */}
            <div className='table text-content interval'
            style={{ letterSpacing: getLetterSpacing(letterInterval) }}
            >
                <PaginableTable 
                  columns={eduColumns} rows={eduRows} rowsPerPage={eduRowsPerPage} isExtendable={false} getFile={getFile()}>
                      <div className='edu-action' style={{order: 2}} onClick={() => {handleOpenModal()}}>
                          <span className='text-content'>Отзыв</span>
                          {/* <AiFillStar size={23} style={{color: '#F9CB36'}}/> */}
                      </div>
                </PaginableTable>
            </div>
        </div>
        </>
    );
}

export default ProfileEducation;