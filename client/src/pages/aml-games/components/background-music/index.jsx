import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { pauseMusic, playMusic } from '../../../../redux/slices/musicSlice';
import './style.scss';

const Modal = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal-audio">
            <div className="modal-content-audio">
                <p>Соглашаетесь ли вы включить аудио?</p>
                <div className="modal-buttons-audio">
                    <button className="button-audio" onClick={onConfirm}>Да</button>
                    <button className="button-audio" onClick={onCancel}>Нет</button>
                </div>
            </div>
        </div>
    );
};

const BackgroundMusic = ({ music }) => {
    const location = useLocation(); // Получаем текущий маршрут
    const dispatch = useDispatch();
    const isPlaying = useSelector((state) => state.music.isPlaying);
    const [showModal, setShowModal] = useState(false); // Контролируем отображение модального окна
    const audioRef = useRef(null);

    useEffect(() => {
        if (location.pathname === '/courses/aml-games/game/survey/1') {
            setShowModal(true); // Показываем модальное окно только на нужном маршруте
        } else {
            setShowModal(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(error => {
                console.error("Music play failed: ", error);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const handleConfirm = () => {
        dispatch(playMusic());
        setShowModal(false);
    };

    const handleCancel = () => {
        dispatch(pauseMusic());
        setShowModal(false);
    };

    return (
        <div>
            {showModal && <Modal onConfirm={handleConfirm} onCancel={handleCancel} />}
            <audio ref={audioRef} loop>
                <source src={music} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default BackgroundMusic;
