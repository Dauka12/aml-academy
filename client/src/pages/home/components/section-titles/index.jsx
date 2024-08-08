import React from 'react'
import './style.css'

const SectionTitles = ({title}) => {
    return (
        <div>
            <div className='page-title-wrapper'>
                <div className='page-title-container'>
                    <h2 className="page-title">{ title }</h2>
                </div>
            </div>
        </div>
    )
}

export default SectionTitles
