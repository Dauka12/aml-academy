import React from 'react';
import email from '../assets/email-icon.svg';
import exit from '../assets/exit-icon.svg';
import history from '../assets/history-icon.svg';
import list from '../assets/list-icon.svg';
import manager from '../assets/manager.svg';
import notify from '../assets/notification-icon.svg';
import avatar from '../assets/user-avatar-icon.svg';

import Sizebox from '../../../components/courseTemplates/common/Sizebox';
import DossierComponent from '../components/dossier';
import './style.css';

const AmlExpert = () => {
    return (
        <div className="aml-expert-container">
            <div className='sidebar-expert-wrapper'>
                <aside className="sidebar-expert">
                    <div>
                        <h2>AML Expert</h2>
                        <h3>Сервисы</h3>
                    </div>
                    <ul>
                        <li><img src={manager} alt="Панель управления" /> Панель управления</li>
                        <li><img src={email} alt="Почта" /> Почта</li>
                        <li><img src={history} alt="История" />История</li>
                        <li><img src={list} alt="Список документов" />Список документов</li>
                    </ul>
                    <button className="logout"><img src={exit} alt="Выход" />Выход</button>
                </aside>
            </div>
            <main className="main-content">
                <header className="header">
                    <input type="text" placeholder="Поиск документа..." className="search-input" />
                    <div className="user-info">
                        <div className='notification-container-wrapper'>
                            <div className='notification-container'>
                                <img src={notify} alt="notification" />
                            </div>
                        </div>
                        <div className='avatar-container-wrapper'>
                            <div className='avatar-container'>
                                <img src={avatar} alt="user-avatar" />
                            </div>
                        </div>
                        <span>Ахметжан Дильназ</span>
                    </div>
                </header>
                <Sizebox/>
                <div className='dossier-wrapper'>
                    <div>
                        <h2>Документ: Досье</h2>
                        <div>

                        </div>
                    </div>
                    <div className='input-wrapper'>
                        <input className="input-expert" type="text" placeholder='Адрес или почта отправки' />
                    </div>
                    <DossierComponent/>
                </div>
            </main>
        </div>
    );
}

export default AmlExpert;
