const pStyle = {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    textAlign: 'left',
    
    paddingLeft: '16px',

    borderLeft: '2px solid #C4C4C4'
}

function Quote({text}) {
    return ( 
        <div style={{padding: '21px', backgroundColor: 'rgb(242, 242, 242)'}}>
            <p style={pStyle}>{text}</p>
        </div>
    );
}

export default Quote;