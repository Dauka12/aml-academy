import React from 'react';
import cl from '../../Home.module.css';


const AdvantageBox = ({ imgSrc, text, imagesHidden, textStyle }) => {
    return (
        <div className={cl.advantages_box}>
            {!imagesHidden && <img src={imgSrc} alt={text} />}
            <p className={`${cl.advantages__text} text-content`} style={textStyle}>
                {text}
            </p>
        </div>
    );
};

export default AdvantageBox;
