import Centered from '../Centered';
import './style.scss'

function RandomH2({children, style, text, isCentered=false}) {
    
    if (isCentered && text) {
        return <Centered>
            <div 
                className="random-h2"
                style={style}
            >
                {text}
            </div>
        </Centered>
    }

    if (isCentered && children) {
        return <Centered>
            <div 
                className="random-h2"
                style={style}
            >
                {children}
            </div>
        </Centered>
    }


    if (text) {
        return (
            <div className="random-h2"
                style={style}
            >
                {text}
            </div>
        )
    }
    
    return ( 
        <div className="random-h2"
            style={style}
        >
            {children}
        </div>
    );
}

export default RandomH2;