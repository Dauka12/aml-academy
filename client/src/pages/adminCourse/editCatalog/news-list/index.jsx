import React from 'react';
import { useNavigate } from 'react-router';
import deletIcon from '../../images/delete.svg';
import editIcon from '../../images/edit-catalog.svg';
import '../editCatalog.scss';

const NewsList = ({ newsData, handleDelete }) => {
    const navigate = useNavigate()
    const getDate = (date) => {
        const _date = new Date(date);
        const day = String(_date.getDate()).padStart(2, '0');
        const month = String(_date.getMonth() + 1).padStart(2, '0'); // JavaScript months are 0-based
        const year = _date.getFullYear();
        const hour = (_date.getHours() - 6);
        const minutes = _date.getMinutes();
        const formattedDate = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")},  ${day}.${month}.${year}`;
        return formattedDate;
    };
    const token = localStorage.getItem('jwtToken')
    
    return (
        <>
            {
                newsData.map((x, index) => (
                    <div className="news-card" key={index}>
                        <div className="img-course">
                            <img src={x.image} alt="img" />
                        </div>
                        <div className="text-of-card">
                            <h2>{x.name}</h2>
                            <a>Дата: {getDate(x.date)}</a>
                        </div>
                        <div className="action-of-card">
                            <div onClick={() => { handleDelete(x.id)}} className="delete">
                                <img src={deletIcon} alt="del" />
                            </div>
                            <div onClick={() => { navigate(`/change-news/${x.id}`) }} className="edit">
                                <img src={editIcon} alt="edit" />
                            </div>
                        </div>
                    </div>
                    ))
            }
        </>
    )
}

export default NewsList
