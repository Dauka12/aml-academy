import React from 'react'
import './style.css'
const PartnersList = ({img, partnerName}) => {
    return (
        <div>
            <img className="partners-img" src={img} alt={partnerName} />
        </div>
    )
}

export default PartnersList
