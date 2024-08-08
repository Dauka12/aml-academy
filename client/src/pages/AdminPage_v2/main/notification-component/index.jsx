import React from 'react';
import './style.css';

const Notification = ({ message, type, onClose }) => {
    const getNotificationStyle = () => {
        switch (type) {
            case 'success':
                return 'notification-success';
            case 'error':
                return 'notification-error';
            default:
                return '';
        }
    };

    return (
        <div className={`notification ${getNotificationStyle()}`}>
            <span>{message}</span>
            <button onClick={onClose}>X</button>
        </div>
    );
};

export default Notification;
