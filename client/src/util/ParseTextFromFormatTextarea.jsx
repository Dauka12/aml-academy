const parseText = (text) => {
    // Если текст пустой или не строка, возвращаем как есть
    if (!text || typeof text !== 'string') {
        return text;
    }

    // Очищаем текст от нежелательных символов в конце строк
    const cleanedText = text
        .replace(/\\\s*$/gm, '')  // Удаляем обратные слэши в конце строк
        .replace(/\\$/gm, '')     // Удаляем одиночные обратные слэши в конце
        .trim();                  // Убираем лишние пробелы

    const regex = /(\|a\|\[(.*?)\](.*?)\|a\|)|(\|•\|(.*?)\|•\|)|(\|b\|(.*?)\|b\|)|(\|i\|(.*?)\|i\|)|(\|u\|(.*?)\|u\|)|(\|h\|(.*?)\|h\|)|(\|r\|(.*?)\|r\|)|(\|\*\|(.*?)\|\*\|)|(\|hr\|)/g;    let parts = [];
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(cleanedText)) !== null) {
        if (match.index > lastIndex) {
            parts.push(cleanedText.substring(lastIndex, match.index));
        }

        if (match[1]) { // Link text
            const url = match[2];
            const displayText = match[3];
            parts.push(
                <a href={url} key={parts?.length} target="_blank" rel="noopener noreferrer">
                    {displayText.includes('|') ? parseText(displayText) : displayText}
                </a>
            );
        } else if (match[4]) { // Strikethrough text (new case)
            const content = match[5];
            parts.push(<ul className="strikethrough" key={parts?.length}><li>{content.includes('|') ? parseText(content) : content}</li></ul>);
        } else if (match[6]) { // Bold text
            const content = match[7];
            parts.push(<span key={parts?.length} className="bold">{content.includes('|') ? parseText(content) : content}</span>);
        } else if (match[8]) { // Italic text
            const content = match[9];
            parts.push(<span key={parts?.length} className="italic">{content.includes('|') ? parseText(content) : content}</span>);
        } else if (match[10]) { // Underline text
            const content = match[11];
            parts.push(<span key={parts?.length} className="underline">{content.includes('|') ? parseText(content) : content}</span>);
        } else if (match[12]) { // Highlight text
            const fullContent = match[13];
            const textContent = fullContent.substring(0, fullContent.indexOf('['));
            const randomText = fullContent.substring(fullContent.indexOf('[') + 1, fullContent.indexOf(']'));
            parts.push(
                <span
                    key={parts?.length}
                    className="highlight"
                    randomtext={`(${randomText})`}>
                    {textContent.includes('|') ? parseText(textContent) : textContent}
                </span>
            );
        } else if (match[14]) { // Red text
            const content = match[15];
            parts.push(<span key={parts?.length} className="red">{content.includes('|') ? parseText(content) : content}</span>);
        } else if (match[16]) { // Unordered list
            const content = match[17];
            parts.push(<ul key={parts?.length}><li>{content.includes('|') ? parseText(content) : content}</li></ul>);
        } else if (match[18]) { // line
            parts.push(<hr key={parts?.length} />);
        }        lastIndex = match.index + match[0]?.length;
    } 
    
    if (lastIndex < cleanedText?.length) {
        parts.push(cleanedText.substring(lastIndex));
    }

    // Обрабатываем переносы строк в каждой части
    const processedParts = [];
    parts.forEach((part, index) => {
        if (typeof part === 'string' && part.includes('\n')) {
            const lines = part.split('\n');
            lines.forEach((line, lineIndex) => {
                if (line) {
                    processedParts.push(line);
                }
                if (lineIndex < lines.length - 1) {
                    processedParts.push(<br key={`br-${index}-${lineIndex}`} />);
                }
            });
        } else {
            processedParts.push(part);
        }
    });

    return processedParts.length === 1 ? processedParts[0] : processedParts;
};

export default parseText;
