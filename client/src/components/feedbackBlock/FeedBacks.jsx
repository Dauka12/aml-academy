import React, { useState, useEffect } from 'react';

import './FeedBacks.scss'

import activeDot from './../../assets/icons/yellow-dot.png';
import nonactiveDot from './../../assets/icons/grey-dot.png';
import img from './../../assets/images/vebinar-img.png';

function FeedBacks({ feedBacks }) {

    const [showFeedBacks, setShowFeedbacks] = useState([
        { 
            img: '',
            name: '', 
            text: ''
        }
    ]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        // console.log("FeedBacks", feedBacks);
        // console.log(feedBacks === undefined || feedBacks === null || feedBacks.length === 0)

        if (!feedBacks) return;
        let _maxPage = Math.ceil(feedBacks.length / 3);
        setMaxPage(_maxPage);

        let _showFeedBacks = [feedBacks[page * 3 - 3], feedBacks[page * 3 - 2], feedBacks[page * 3 - 1]]

        setShowFeedbacks(_showFeedBacks);
    }, [])

    useEffect(() => {
        if (!feedBacks) return;
        let _showFeedBacks = [feedBacks[page * 3 - 3], feedBacks[page * 3 - 2], feedBacks[page * 3 - 1]]

        setShowFeedbacks(_showFeedBacks);
    }, [page])

    if (feedBacks === undefined || feedBacks === null || feedBacks.length === 0) return (
        <div className='feedBack-card-non'>
            <p className='section-header'>{'Нет отзывов'}</p>
        </div>
    );

    return ( 
        <>
        <div className='feedBacks-block'>
            {showFeedBacks ? showFeedBacks.map((feedBack, index) => {
                if (!feedBack) return null;

                return (
                    <div className='feedBack-card' key={index}>
                        <div>
                            <div className='img'>{feedBack.user ? feedBack.user.firstname.substring(0, 1) : ''}{feedBack.user ? feedBack.user.lastname.substring(0, 1) : ''}</div>
                            <div className='name'>{feedBack.user ? feedBack.user.firstname : ''} {feedBack.user ? feedBack.user.lastname : ''} {feedBack.user ? feedBack.user.patronymic : ''}</div>
                        </div>
                        <p>{feedBack.comment}</p>
                    </div>
                )
            }) : null}
        </div>
        <div className='page-buttons'>
            {
                [...Array(maxPage)].map((e, i) => (
                    <img src={i+1 === page ? activeDot : nonactiveDot} alt={i+1} onClick={() => setPage(i+1)}/>
                ))
            }
        </div>
        </>
    );
}

export default FeedBacks;