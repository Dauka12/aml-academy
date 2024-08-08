
import { Link } from 'react-router-dom';
import './style.scss'

function TextAndLink({ children, text='Ссылка', link, linkText, textColor, linkColor, linkBackgroundColor }) {
    return (
        <div className="textAndLink">
            <div className="text1"
                 style={{
                     color: textColor ? textColor : '#000000',
                 }}
            >{text}</div>
            <div className="link"
                 style={{
                     backgroundColor: linkBackgroundColor ? linkBackgroundColor : '#CADEFC',
                     color: linkColor ? linkColor : '#3A3939'
                 }}
            >
                <Link to={link} target="_blank" rel="noopener noreferrer">
                    <p>{linkText !== undefined ? linkText : 'Ссылка'}</p>
                </Link>
            </div>
        </div>
    );
}

export default TextAndLink;