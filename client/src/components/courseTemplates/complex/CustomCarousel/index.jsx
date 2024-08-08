import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

import './style.scss';

function CustomCarousel({
    data=[]
}) {
    useEffect(() => {
        console.log(data);

    }, [])

    return (
        <div className="custom-carousel">
            <Carousel autoPlay={false} animation='fade' navButtonsAlwaysVisible={true} fullHeightHover={true} index={1}>
                {
                    data.map( (item, i) =>  <Item key={i} item={item} /> )
                }
            </Carousel>
        </div>
    )
}

const Item = ({ item }) => {
    const { header, image, imageText } = item;

    return (
        <div className="item">
            <div className="header">
                {
                    header &&
                    Array.isArray(header) && 
                    header.length !== 0 
                        ? header.map( (item, i) => <p key={i}>{ item }</p> ) 
                        : null
                }
                {
                    header &&
                    typeof header === 'string' 
                        ? <p>{header}</p>
                        : null
                }
                <p>{ imageText }</p>
            </div>
            <div>
                <img className="imgCarousel" src={image} alt={image} />
            </div>
        </div>
    )
}

export default CustomCarousel;