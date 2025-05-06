import React from 'react'
import './style.css'

const SectionTitles = ({title}) => {
    return (
        <div>
            <div className='page-title-wrapper'>
                <div className='page-title-container'>
                    <h1 className="page-title">{ title }</h1>
                </div>
            </div>
        </div>
    )
}

export default SectionTitles
