import './style.scss';

function Divider({
    color='#1F3c88'
}) {
    return ( 
        <div style={{backgroundColor: color}} className="divider"></div>
    );
}

export default Divider;