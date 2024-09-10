import React from 'react';

const parseText = (text) => {
    // Extend the regex to find "--" prefixed text along with other formats
    const regex = /(<--(.*?)-->)|(\|b\|(.*?)\|b\|)|(\|i\|(.*?)\|i\|)|(\|u\|(.*?)\|u\|)|(\|h\|(.*?)\|h\|)|(\|r\|(.*?)\|r\|)|(\|a\|(.*?)\|a\|)/g;

    let parts = [];
    let match;
    let lastIndex = 0; 

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        if (match[1]) { // Strikethrough text (new case)
            console.log(match[1], match[2], match)
            parts.push(<ul className="strikethrough" key={parts?.length}><li>{match[2].indexOf("\|") !== -1 ? parseText(match[2]) : match[2]}</li></ul>);
        } else if (match[3]) { // Bold text
            parts.push(<span key={parts?.length} className="bold">{match[4].indexOf("\|") !== -1 ? parseText(match[4]) : match[4]}</span>);
        } else if (match[5]) { // Italic text
            parts.push(<span key={parts?.length} className="italic">{match[6].indexOf("\|") !== -1 ? parseText(match[6]) : match[6]}</span>);
        } else if (match[7]) { // Underline text
            parts.push(<span key={parts?.length} className="underline">{match[8].indexOf("\|") !== -1 ? parseText(match[8]) : match[8]}</span>);
        } else if (match[9]) { // Highlight text
            parts.push(
                <span 
                    key={parts?.length} 
                    className="highlight" 
                    randomtext={
                        "(" + match[10].substring(match[10].indexOf('[')+1, match[10].indexOf(']')) + ")"
                    }>
                        {match[10].indexOf("\|") !== -1 ? parseText(match[10]) : match[10].substring(0, match[10].indexOf('['))}
                </span>
            );
        } else if (match[11]) {
            parts.push(<span key={parts?.length} className="red">{match[12].indexOf("\|") !== -1 ? parseText(match[12]) : match[12]}</span>);
        } else if (match[13]) {
            const url = match[14]; // Remove any leading or trailing whitespace
            parts.push(
                <a href={url} key={parts?.length} target="_blank" rel="noopener noreferrer">
                    {url}
                </a>
            );
        }

        lastIndex = match.index + match[0]?.length;
    }

    if (lastIndex < text?.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts;
};

export default parseText;