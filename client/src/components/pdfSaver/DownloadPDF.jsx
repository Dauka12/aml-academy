import React from "react";
import irl from "../../assets/images/Устав Академия ФМ AML ACADEMY.pdf";
import { useStyle } from "../../components/VisualModal/StyleContext";
import Button from '../UI/button/Button';

import { useTranslation } from 'react-i18next';

import VisualModal from "../../components/VisualModal/VisualModal";




const DownloadPDF = () => {
  const { t } = useTranslation();
  const letterInterval = "standard";

  const { styles } = useStyle();
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

  const handleDownload = () => {
    const fileUrl = irl;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'Ustav_AML.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
                  <VisualModal
        onIntervalChange={() => {}}
        styles={styles}
      />

    <div
      className="interval"
      style={{ letterSpacing: getLetterSpacing(letterInterval) }}
    >

    <Button className={`text-content`} onClick={handleDownload}>
      {t('download')}
    </Button>
    </div>
    </div>
  );
};

export default DownloadPDF;
