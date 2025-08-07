import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyle } from '../../../components/VisualModal/StyleContext';
import Header from '../../../components/header/v2';
import Footer from '../../../components/footer';
import ThreeJSCanvasWithFallback from '../../../components/ThreeJS/ThreeJSCanvasWithFallback';
import VisualModal from '../../../components/VisualModal/VisualModal';
import cl from './about-us-3d.module.css';

function AboutUs3D() {
  const { styles, open, setOpen, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const [openVisualModal, setOpenVisualModal] = useState(open);
  const [activeSection, setActiveSection] = useState(0);
  const { t } = useTranslation();

  // Font sizes configuration
  const fontSizes = {
    small: {
      fontSize: '20px',
      lineHeight: '22px',
      caption: { fontSize: '28px', lineHeight: '30px' },
      subtitle: { fontSize: '18px', lineHeight: '20px' },
    },
    standard: {
      fontSize: '16px',
      lineHeight: '18px',
      caption: { fontSize: '24px', lineHeight: '26px' },
      subtitle: { fontSize: '16px', lineHeight: '18px' },
    },
    large: {
      fontSize: '20px',
      lineHeight: '22px',
      caption: { fontSize: '28px', lineHeight: '30px' },
      subtitle: { fontSize: '18px', lineHeight: '20px' },
    },
  };

  // Apply visual styles
  useEffect(() => {
    if (!checkStyle || userEntry) return;

    const textContentElements = document.querySelectorAll('.text-content');
    const size = styles.fontSize;
    setImagesHidden(!styles.showImage);

    if (textContentElements) {
      textContentElements.forEach((item) => {
        const applyStyles = (style) => {
          item.style.fontSize = style.fontSize;
          item.style.lineHeight = style.lineHeight;
        };

        switch (size) {
          case 'small':
          case 'large':
            applyStyles(fontSizes[size]);
            break;
          case 'standard':
            if (item.classList.contains('caption')) {
              applyStyles(fontSizes.standard.caption);
            } else if (item.classList.contains('subtitle')) {
              applyStyles(fontSizes.standard.subtitle);
            } else {
              applyStyles(fontSizes.standard);
            }
            break;
          default:
            break;
        }
      });
    }

    handleColorModeChange();
  }, [checkStyle, userEntry, styles, setImagesHidden, fontSizes]);

  const handleColorModeChange = () => {
    const containerElement = document.querySelector('.text-content');
    if (containerElement) {
      containerElement.classList.remove(
        'light-mode',
        'dark-mode',
        'inverted-mode',
        'blue-mode'
      );
    }

    const { colorMode } = styles;
    if (containerElement) {
      containerElement.classList.add(colorMode + '-mode');
    }
  };

  const handleOpenVisualModal = () => {
    setOpenVisualModal((prev) => !prev);
    setOpen((prev) => !prev);
  };

  const getLetterSpacing = () => {
    const interval = styles.letterInterval;
    switch (interval) {
      case 'medium':
        return '2px';
      case 'large':
        return '4px';
      default:
        return '1px';
    }
  };

  // Apply font family
  useEffect(() => {
    const textContentElement = document.querySelectorAll('.text-content');
    const family = styles.fontFamily;

    if (textContentElement) {
      textContentElement.forEach((item) => {
        if (family) {
          item.style.fontFamily = family;
        }
      });
    }
  }, [styles.fontFamily]);

  // Apply letter spacing
  useEffect(() => {
    const textContentElements = document.querySelectorAll('.text-content');
    const letterSpacing = getLetterSpacing();

    if (textContentElements) {
      textContentElements.forEach((item) => {
        item.style.letterSpacing = letterSpacing;
      });
    }
  }, [styles.letterInterval]);

  // Content sections for the floating cards
  const contentSections = [
    {
      id: 'academy',
      title: t('about academy'),
      content: t('descAbout'),
      icon: '🎓',
      position: { top: '51%', left: '20%' }
    },
    {
      id: 'mission',
      title: t('mission_academy_a'),
      content: t('mission_academy_b'),
      icon: '🎯',
      position: { top: '15%', right: '5%' }
    },
    {
      id: 'founder',
      title: t('about shareholder'),
      content: t('descShareholder'),
      icon: '👨‍💼',
      position: { bottom: '9%', left: '4%' }
    },
    {
      id: 'purpose',
      title: t('purpose and objectives of the AML ACADEMY'),
      content: t('descPurpose'),
      icon: '🚀',
      position: { bottom: '10%', right: '5%' }
    }
  ];

  return (
    <div className={`${cl.aboutUs3DWrapper} text-content`}>
      <VisualModal
        open={openVisualModal}
        onRemoveImages={() => setImagesHidden(true)}
        onShowImages={() => setImagesHidden(false)}
        onFontFamily={() => {}}
        onIntervalChange={() => {}}
        styles={styles}
      />
      
      <Header
        dark={styles.colorMode === 'dark' ? false : true}
        handleOpenVisualModal={handleOpenVisualModal}
        style={{ letterSpacing: getLetterSpacing() }}
      />

      {/* Main 3D Scene Container */}
      <div className={cl.sceneContainer}>
        <ThreeJSCanvasWithFallback />
        
        {/* Floating Content Cards */}
        <div className={cl.floatingContent}>
          {contentSections.map((section, index) => (
            <div
              key={section.id}
              className={`${cl.contentCard} ${activeSection === index ? cl.active : ''} text-content`}
              style={{
                ...section.position,
                letterSpacing: getLetterSpacing()
              }}
              onClick={() => setActiveSection(index)}
            >
              <div className={cl.cardIcon}>{section.icon}</div>
              <h3 className={`${cl.cardTitle} text-content caption`}>{section.title}</h3>
              <p className={`${cl.cardContent} text-content subtitle`}>{section.content}</p>
              <div className={cl.cardGlow}></div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className={cl.navigationDots}>
          {contentSections.map((_, index) => (
            <button
              key={index}
              className={`${cl.navDot} ${activeSection === index ? cl.activeDot : ''}`}
              onClick={() => setActiveSection(index)}
            />
          ))}
        </div>

        {/* Main Title Overlay */}
        <div className={cl.titleOverlay}>
          <h1 className={`${cl.mainTitle} text-content caption`}>
            {t('about academy')}
          </h1>
          <p className={`${cl.mainSubtitle} text-content subtitle`}>
            Explore our mission through an immersive 3D experience
          </p>
        </div>

        {/* Stats Display */}
        <div className={cl.statsContainer}>
          <div className={cl.statItem}>
            <span className={cl.statNumber}>1000+</span>
            <span className={cl.statLabel}>Students</span>
          </div>
          <div className={cl.statItem}>
            <span className={cl.statNumber}>50+</span>
            <span className={cl.statLabel}>Courses</span>
          </div>
          <div className={cl.statItem}>
            <span className={cl.statNumber}>10+</span>
            <span className={cl.statLabel}>Years</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs3D;
