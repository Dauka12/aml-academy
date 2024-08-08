import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import './style.css';

const Card = ({ name, imageSrc, courseId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleNavigate() {
    navigate(`/courses/${courseId}`)
  }
  return (
    <div className="card">
      <img src={imageSrc} alt={name} className="card-img" />
      <div className="card-overlay"></div>
      <div className="card-name">{name}</div>
      <button className="card-button" onClick={handleNavigate}>{ t('read more') }</button>
    </div>
  );
};

export default Card;
