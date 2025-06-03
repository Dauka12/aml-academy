import './style.scss';

const JustTextWithP = ({ textData, color }) => {
  // Check if textData is an array, if not convert it to an array with a single element
  const dataArray = Array.isArray(textData) ? textData : [textData];

  const formatText = (text) => {
    if (!text) return '';
    return text?.replace(/"(.*?)"/g, '<span style="font-weight: bold;">$1</span>');
  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      width: '100%',
      padding: '0 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {dataArray.map((text, index) => { 
          return (
            <div key={index}>
              <p 
                className={'abzac'} 
                style={{ color: color || undefined }}
                dangerouslySetInnerHTML={{ __html: formatText(text) }}
              ></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JustTextWithP;
