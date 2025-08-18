import React from 'react'
import { useTranslation } from 'react-i18next'
import partnerImg1 from '../../assets/jfif/Afm.jfif'
import partnerImg2 from '../../assets/jfif/Sfm.jfif'
import partnerImg7 from '../../assets/png/image.png'
import partnerImg8 from '../../assets/png/img.png'
import partnerImg6 from '../../assets/png/strike.png'
import partnerImg5 from '../../assets/png/sudEkspertiza.png'
import partnerImg3 from '../../assets/png/Turan.png'
import partnerImg4 from '../../assets/png/uchetPob.png'
import PartnersList from './partners-list'
import './style.css'
const partners = [
    {
        img: partnerImg1,
        partnerName: 'Afm'
    },
    {
        img: partnerImg2,
        partnerName: 'Sfm'
    },
    {
        img: partnerImg3,
        partnerName: 'Turan'
    },
    {
        img: partnerImg4,
        partnerName: 'UchetPob'
    },
    {
        img: partnerImg5,
        partnerName: 'SudEkspertiza'
    },
    {
        img: partnerImg6,
        partnerName: 'Strike plagiarism'
    },
    {
        img: partnerImg7,
        partnerName: 'Paragraph'
    },
    {
        img: partnerImg8,
        partnerName: 'Plagiat c'
    },
]

const PartnersComponent = () => {
    const { t } = useTranslation();

    // Дублируем партнеров для бесконечной прокрутки
    const duplicatedPartners = [...partners, ...partners, ...partners];

    return (
        <div className='partners-component'>
            <div className='partners-title'>
                {t('partners')}
            </div>
            <div className='partners-infinite-scroll'>
                <div className='partners-track'>
                    {duplicatedPartners.map((partner, index) => (
                        <div key={index} className='partners-item'>
                            <PartnersList
                                img={partner.img}
                                partnerName={partner.partnerName}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PartnersComponent
