import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Switch } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { pauseMusic, playMusic } from '../../../../redux/slices/musicSlice';
import './style.scss';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('${MusicNoteIcon}')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('${MusicNoteIcon}')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export const MusicSwitcher = ({ handleToggle, isPlaying}) => {
    return (
        <div>
            <MaterialUISwitch checked={isPlaying} onChange={handleToggle} />
        </div>
    )
}

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

    const handleToggle = () => {
        if (isPlaying) {
            dispatch(pauseMusic());  // Pause music if currently playing
        } else {
            dispatch(playMusic());  // Play music if currently paused
        }
    };

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

    const match = matchPath(
        "/courses/aml-games/game/read/:id/:level/:subLevel",
        location.pathname
    );

    return (
        <div>
            {showModal && <Modal onConfirm={handleConfirm} onCancel={handleCancel} />}
            <audio ref={audioRef} loop>
                <source src={music} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div
                style={{
                    position: 'absolute',
                    zIndex: '1000',
                    right: '17%',
                    top: '2.5%',
                    display: match ? 'block' : 'none'
                }}
            >
                <MusicSwitcher handleToggle={handleToggle} isPlaying={isPlaying} />
            </div>
        </div>
    );
};

export default BackgroundMusic;
