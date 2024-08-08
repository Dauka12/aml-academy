import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';

import defaultImage from './../../../../assets/images/Image_231.png';

function ImageWithText({ img, imageText, color, children, version = 1 }) {
    const validatedImg = img || defaultImage;
    const validatedColor = color || '#000000';
    const validatedImageText = imageText || '';

    const renderText = (text) => {
        return text.split('\n').map((line, index) => {
            const isWhitespaceOnly = !line.trim();
            return (
                <span key={index} style={{ display: 'block', whiteSpace: isWhitespaceOnly ? 'pre' : 'normal' }}>
                    {isWhitespaceOnly ? '\u00A0' : line}
                </span>
            );
        });
    };

    return (
        <div className="imageWithText">
            <img src={validatedImg} alt={validatedImageText} />
            <div className="image-text" style={{ color: validatedColor }}>
                <div>
                    <div style={{ borderTop: `4px solid ${validatedColor}` }}></div>
                </div>
                {version === 2 ? (
                    <p style={{ color: validatedColor }}>{renderText(validatedImageText)}</p>
                ) : (
                    children ? (
                        children
                    ) : (
                        <p style={{ color: validatedColor }}>{validatedImageText}</p>
                    )
                )}
            </div>
            <div className="dim"></div>
        </div>
    );
}

ImageWithText.propTypes = {
    img: PropTypes.string,
    imageText: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.node,
    version: PropTypes.number,
};

export default ImageWithText;
