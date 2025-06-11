import React from 'react';
import parseText from './ParseTextFromFormatTextarea.jsx';

// Функция для автоматического добавления форматирования к определенным словам
const enhanceTextFormatting = (text) => {
    if (!text || typeof text !== 'string') {
        return text;
    }

    // Список слов, которые должны быть выделены жирным шрифтом
    const boldWords = ['келесі', 'алдыңғы', 'бастапқы', 'соңғы', 'маңызды', 'негізгі'];

    let enhancedText = text;

    // Добавляем маркеры форматирования к определенным словам
    boldWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        enhancedText = enhancedText.replace(regex, `|b|${word}|b|`);
    });

    return enhancedText;
};

// Функция для конвертации React элементов в HTML строку
const elementsToHTML = (elements) => {
    if (!elements) {
        return '';
    }

    if (typeof elements === 'string') {
        return elements;
    }

    if (typeof elements === 'number') {
        return String(elements);
    }

    if (React.isValidElement(elements)) {
        // Обработка React.Fragment
        if (elements.type === React.Fragment) {
            const children = elements.props.children;
            return elementsToHTML(children);
        }

        // Рекурсивно обрабатываем содержимое
        const processChildren = (children) => {
            if (!children) return '';
            if (typeof children === 'string' || typeof children === 'number') {
                return String(children);
            }
            if (Array.isArray(children)) {
                return children.map(child => elementsToHTML(child)).join('');
            }
            return elementsToHTML(children);
        };

        const children = elements.props.children;
        const processedContent = processChildren(children);

        // Простая конвертация для основных элементов
        if (elements.type === 'br') {
            return '<br>';
        } else if (elements.type === 'hr') {
            return '<hr>';
        } else if (elements.type === 'span') {
            const className = elements.props.className || '';
            const randomtext = elements.props.randomtext || '';
            const attrs = randomtext ? ` data-randomtext="${randomtext}"` : '';
            return `<span class="${className}"${attrs}>${processedContent}</span>`;
        } else if (elements.type === 'a') {
            const href = elements.props.href || '';
            const target = elements.props.target || '';
            const rel = elements.props.rel || '';
            return `<a href="${href}" target="${target}" rel="${rel}">${processedContent}</a>`;
        } else if (elements.type === 'ul') {
            return `<ul><li>${processedContent}</li></ul>`;
        }
        return processedContent;
    }

    if (Array.isArray(elements)) {
        return elements.map(element => elementsToHTML(element)).join('');
    }

    return String(elements);
};

// Функция для обработки текста с автоматическим форматированием (возвращает React элементы)
export const processTextWithFormatting = (text) => {
    if (!text || typeof text !== 'string') {
        return text;
    }

    // Обрабатываем переносы строк
    let processedText = text.replace(/\\n/g, '\n');

    // Применяем автоматическое форматирование
    const enhancedText = enhanceTextFormatting(processedText);

    // Парсим текст с форматированием
    const parsed = parseText(enhancedText);

    // Если результат - массив, оборачиваем в React Fragment
    if (Array.isArray(parsed)) {
        return React.createElement(React.Fragment, null, ...parsed);
    }

    return parsed;
};

// Функция для обработки текста с автоматическим форматированием (возвращает HTML строку)
export const processTextWithFormattingHTML = (text) => {
    // Handle React Elements and Fragments directly, converting them to HTML
    if (React.isValidElement(text)) {
        return elementsToHTML(text);
    }
    
    // Handle arrays (like children array from a React Fragment)
    if (Array.isArray(text)) {
        return text.map(item => processTextWithFormattingHTML(item)).join('');
    }
    
    if (!text || typeof text !== 'string') {
        return String(text || '');
    }

    // Убираем лишние кавычки из JSON
    let cleanText = text;
    if (cleanText.startsWith('"') && cleanText.endsWith('"')) {
        cleanText = cleanText.slice(1, -1);
    }

    // Обрабатываем переносы строк
    let processedText = cleanText.replace(/\\n/g, '\n');

    const enhancedText = enhanceTextFormatting(processedText);

    // Парсим текст с форматированием
    const parsed = parseText(enhancedText);

    // Конвертируем в HTML строку
    return elementsToHTML(parsed);
};

export default enhanceTextFormatting;
