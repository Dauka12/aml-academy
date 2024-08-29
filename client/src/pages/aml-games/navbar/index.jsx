import React from 'react';
import { FiUser } from "react-icons/fi";
import { useNavigate } from 'react-router';

import amlLogo from './../assets/aml-logo.svg';
import './style.scss';

export const NavbarProfile = () => { 

    return (
        <div className="game-nav-bar">
            <div className="logo">
                <img src={amlLogo} alt="AML Logo" />
                <div>Академия финансового мониторинга</div>
            </div>
            <div className="navigation">
                <div className="lang">
                    
                </div>
                <div className="profile">
                    <div className="icon">
                        <FiUser />
                    </div>
                    <span><a href="/courses/aml-games/game/profile/1">Профиль</a></span>
                    <span><a href="/courses/aml-games/game/survey/1">Домой</a></span>
                </div>
            </div>
        </div>
    );
}

export const NavbarGame = () => {
    const navigate = useNavigate();
    return (
        <div className="game-nav-bar" onClick={() => navigate('/')}>
            <div className="logo">
                <img src={amlLogo} alt="" />
                <div>Академия финансового мониторинга</div>
            </div>
        </div>
    );
}
