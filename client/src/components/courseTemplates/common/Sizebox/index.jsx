import './style.scss';

function Sizebox({ height, width }) {

    return ( 
        <div className="sizebox"
            
        >
            <div
                style={{
                    height: `${height || 100}px`,
                }}
            ><p>Вертикальный отступ {height} пикселей</p></div>
        </div>
    );
}

export default Sizebox;