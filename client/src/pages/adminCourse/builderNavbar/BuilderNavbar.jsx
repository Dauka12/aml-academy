import { useNavigate } from 'react-router'
import homeIcon from '../../../assets/images/home-icon.svg'
import amlLogo from '../images/aml-logo.png'
import './builderNavbar.scss'

export const BuilderNavbar = () => {
    const navigate = useNavigate()

    return (
        <div className='builder-navbar'>
            <div className='left-part' onClick={() => { navigate("/manager") }}>
                <img className='logo' src={amlLogo} alt="AML" />
                <a className="title">
                    <span className='bold-title'>AML</span>
                    Редактор Курса
                </a>
            </div>
            <div className='right-part'>
                <div className='exit-icon' onClick={() => navigate('/')}>
                    <img src={homeIcon} alt="s" />
                </div>
            </div>
        </div>
    )
}