const textStyle = {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '23px',
    textAlign: 'left',

    padding: '21px',
    background: 'rgb(242, 242, 242)'
}

function NumeratedList({ title, list }) {
    return ( 
        <div style={textStyle}>
            <p>{title}:</p>
            {list.map((value, index) => {
                let char = index === list?.length - 1 ? ';' : '.';

                return <div>
                    {`${index+1}) ${value}${char}`}
                </div>
            })}
        </div>
    );
}

export default NumeratedList;