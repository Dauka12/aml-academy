import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import basicCourse from "../../../assets/icons/mdi_world-wide-web.svg";
import deepCourse from "../../../assets/icons/simple-icons_progress.svg";
import proCourse from "../../../assets/icons/subway_book.svg";
import backgroundVideoLight from "../../../assets/video/sssssssss.mp4";
import cl from "../Home.module.css";
import CourseBox from "../components/CourseBox";
const AboutUsSection = ({ imagesHidden }) => {
  const { t } = useTranslation();

  return (
    <section className={`${cl.aboutUs} text-content`}>
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "VideoObject",
              "name": "Задний фон",
              "description": "Задний фон",
              "thumbnailUrl": "https://www.amlacdemy.kz/static/media/image.png",
              "uploadDate": "2024-07-14T08:57:20Z",
              "contentUrl": "https://www.amlacdemy.kz/static/media/ssssssss.78b66217f6905b1add0c.mp4",
              "embedUrl": "https://www.amlacdemy.kz/static/media/ssssssss.78b66217f6905b1add0c.mp4"
            }
          `}
        </script>
      </Helmet>
      <div className={cl.container}>
        <div className={`${cl.aboutUs__section} ${imagesHidden ? cl.darkBlueBackground : ""}`}>
          <div className={cl.videoContainer} style={{ backgroundColor: "red" }}>
            <video autoPlay loop muted className={`videoBackground ${cl.videoBackground}`}>
              <source src={backgroundVideoLight} type="video/mp4" />
            </video>
          </div>
          <div className={cl.aboutUs__content}>
            <div style={{ display: 'flex', flexDirection: "column", width: "100%", justifyContent: 'center' }}>
              <p className={`${cl.aboutUs__headline} text-content`}>AML ACADEMY</p>
              <p className={`${cl.aboutUs__text_small} text-content`}>{t("our courses")}</p>
            </div>
            <div className={`${cl.courses_boxes} text-content`}>
              <CourseBox link="/olympiad" imgSrc={deepCourse} text={t('it')} imagesHidden={imagesHidden} />
              <CourseBox link="/courses" imgSrc={basicCourse} text={t('training')} imagesHidden={imagesHidden} />
              <CourseBox link="/ready-made-solutions" imgSrc={proCourse} text={t('ric')} imagesHidden={imagesHidden} />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
