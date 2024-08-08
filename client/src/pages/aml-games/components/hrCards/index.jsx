import './style.scss';
export default function HrCards({name, date, id, characterImg}) {
    return (
        <div>
            <div className="info-card-container">
                <div className="info-card">
                    <div className='info-card-wrapper'>
                        <div className="info-card-header">
                            National ID Card
                        </div>
                            <div className="info-card-main">
                                <div className="info-card-img">
                                    <img src={characterImg} alt="" />
                                </div>
                            <div className="info-card-personal-info">
                                <span>{ name }</span>
                                <span>{ date }</span>
                                <span>{ id }</span> 
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
