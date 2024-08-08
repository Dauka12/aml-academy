import './style.scss';

function ShortBiography({
    img,
    backgroundColor,
    name,
    birthdate,
    deathdate,
    biography,
    color,
    secondaryColor
}) {

    return ( 
        <div className="shortBiography-wrapper">
            <div className="shortBiography"
                style={{
                    backgroundColor: backgroundColor || '#F9F9F9'
                }}
            >
                <div className="shortBiography-img">
                    <img src={img} alt="shortBiography-img" />
                </div>
                <div className="shortBiography-text">
                    <div className='name' style={{
                        color: color || '#343434'
                    }}>{name}</div>
                    {birthdate || deathdate? (

                        <div className="date" style={{
                            color: secondaryColor || '#8F8F8F'
                        }}>
                            {

                                deathdate 
                                    ? (`${birthdate} - ${deathdate}`) 
                                    : (`${birthdate}`)

                            }
                        </div>

                    ) : null}
                    <div className="biography" style={{
                        color: color || '#343434'
                    }}>{biography}</div>
                </div>
            </div>
        </div>
    );
}

export default ShortBiography;