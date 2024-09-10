import React from 'react';

const parseText = (text) => {
    const regex = /(\|a\|\[(.*?)\](.*?)\|a\|)|(\|•\|(.*?)\|•\|)|(\|b\|(.*?)\|b\|)|(\|i\|(.*?)\|i\|)|(\|u\|(.*?)\|u\|)|(\|h\|(.*?)\|h\|)|(\|r\|(.*?)\|r\|)|(\|\*\|(.*?)\|\*\|)|(\|hr\|)/g;

    let parts = [];
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        if (match[1]) { // Link text
            const url = match[2]; // Remove any leading or trailing whitespace
            const displayText = match[3];
            parts.push(
                <a href={url} key={parts?.length} target="_blank" rel="noopener noreferrer">
                    {displayText}
                </a>
            );
        } else if (match[4]) { // Strikethrough text (new case)
            parts.push(<ul className="strikethrough" key={parts?.length}><li>{match[5].includes('|') ? parseText(match[5]) : match[5]}</li></ul>);
        } else if (match[6]) { // Bold text
            parts.push(<span key={parts?.length} className="bold">{match[7].includes('|') ? parseText(match[7]) : match[7]}</span>);
        } else if (match[8]) { // Italic text
            parts.push(<span key={parts?.length} className="italic">{match[9].includes('|') ? parseText(match[9]) : match[9]}</span>);
        } else if (match[10]) { // Underline text
            parts.push(<span key={parts?.length} className="underline">{match[11].includes('|') ? parseText(match[11]) : match[11]}</span>);
        } else if (match[12]) { // Highlight text
            parts.push(
                <span
                    key={parts?.length}
                    className="highlight"
                    randomtext={
                        "(" + match[13].substring(match[13].indexOf('[') + 1, match[13].indexOf(']')) + ")"
                    }>
                    {match[13].includes('|') ? parseText(match[13]) : match[13].substring(0, match[13].indexOf('['))}
                </span>
            );
        } else if (match[14]) { // Red text
            parts.push(<span key={parts?.length} className="red">{match[15].includes('|') ? parseText(match[15]) : match[15]}</span>);
        } else if (match[16]) { // Unordered list
            parts.push(<ul key={parts?.length}><li>{match[17].includes('|') ? parseText(match[17]) : match[17]}</li></ul>);
        } else if (match[18]) { // line
            parts.push(<hr key={parts?.length}/>);
        }

        lastIndex = match.index + match[0]?.length;
    }

    if (lastIndex < text?.length) {
        parts.push(text.substring(lastIndex));
    }
 
    return parts;
};

export default parseText;
