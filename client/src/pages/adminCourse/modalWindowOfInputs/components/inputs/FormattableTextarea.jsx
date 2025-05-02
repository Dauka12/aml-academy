import ErrorOutlineIcon from '@mui/icons-material/Error';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import HighlightIcon from '@mui/icons-material/Highlight';
import LinkIcon from '@mui/icons-material/Link';
import { Box, Button, ButtonGroup, Paper, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';

const FormattableTextarea = ({
    handleChange,
    label,
    name,
    type,
    value,
    minHeight = 300
}) => {
    const textAreaRef = useRef(null);

    const wrapSelected = (symbol, endSymbol = symbol) => {
        const textArea = textAreaRef.current;
        if (!textArea) return;

        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const selectedText = value.substring(start, end);

        if (start !== end) {
            const before = value.substring(0, start);
            const after = value.substring(end);
            const newText = `${before}${symbol}${selectedText}${endSymbol}${after}`;

            handleChange(name, newText, type);

            setTimeout(() => {
                textArea.focus();
                textArea.selectionStart = start + symbol.length;
                textArea.selectionEnd = end + symbol.length;
            }, 10);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const cursorPosition = event.target.selectionStart;
            const textBeforeCursor = value.substring(0, cursorPosition);
            const textAfterCursor = value.substring(cursorPosition);

            if (textBeforeCursor.slice(-2) === '\\n' || textBeforeCursor.slice(-1) === '\n') {
                const newValue = textBeforeCursor + '\n' + textAfterCursor;
                handleChange(name, newValue, type);

                setTimeout(() => {
                    event.target.selectionStart = event.target.selectionEnd = cursorPosition + 1;
                }, 10);
                return;
            }

            if (/\S/.test(textBeforeCursor)) {
                const newValue = textBeforeCursor + '\\n\n' + textAfterCursor;
                handleChange(name, newValue, type);

                setTimeout(() => {
                    event.target.selectionStart = event.target.selectionEnd = cursorPosition + 3;
                }, 10);
            }
        }
    };

    // Preview text with formatting
    const convertToPreview = (text) => {
        if (!text) return '';

        let preview = text
            .replace(/\|b\|(.*?)\|b\|/g, '<strong>$1</strong>')
            .replace(/\|i\|(.*?)\|i\|/g, '<em>$1</em>')
            .replace(/\|u\|(.*?)\|u\|/g, '<u>$1</u>')
            .replace(/\|h\|(.*?)\|h\|/g, '<span style="background-color: #e6eefb;">$1</span>')
            .replace(/\|r\|(.*?)\|r\|/g, '<span style="color: red;">$1</span>')
            .replace(/\|a\|(.*?)\|a\|/g, '<a href="#">$1</a>')
            .replace(/\|1\|(.*?)\|1\|/g, '<ol><li>$1</li></ol>')
            .replace(/\|•\|(.*?)\|•\|/g, '<ul><li>$1</li></ul>')
            .replace(/\\n/g, '<br>');

        return preview;
    };

    return (
        <Box sx={{ mb: 2 }}>
            {label && (
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                    {label}
                </Typography>
            )}

            <Paper variant="outlined" sx={{ p: 1 }}>
                <ButtonGroup variant="outlined" size="small" sx={{ mb: 1 }}>
                    <Button
                        onClick={() => wrapSelected('|b|')}
                        sx={{ fontWeight: 'bold' }}
                    >
                        <FormatBoldIcon fontSize="small" />
                    </Button>

                    <Button
                        onClick={() => wrapSelected('|i|')}
                        sx={{ fontStyle: 'italic' }}
                    >
                        <FormatItalicIcon fontSize="small" />
                    </Button>

                    <Button
                        onClick={() => wrapSelected('|u|')}
                        sx={{ textDecoration: 'underline' }}
                    >
                        <FormatUnderlinedIcon fontSize="small" />
                    </Button>

                    <Button
                        onClick={() => wrapSelected('|h|', '[Вставьте скрытый текст сюда]|h|')}
                        color="warning"
                    >
                        <HighlightIcon fontSize="small" />
                    </Button>

                    <Button
                        onClick={() => wrapSelected('|r|')}
                        color="error"
                    >
                        <ErrorOutlineIcon fontSize="small" />
                    </Button>

                    <Button
                        onClick={() => wrapSelected('|a|[ Вставьте ссылку сюда ]', '|a|')}
                    >
                        <LinkIcon fontSize="small" />
                    </Button>

                    <Button onClick={() => wrapSelected('|1|')}>
                        <FormatListNumberedIcon fontSize="small" />
                    </Button>

                    <Button onClick={() => wrapSelected('|•|')}>
                        <FormatListBulletedIcon fontSize="small" />
                    </Button>
                </ButtonGroup>

                <TextField
                    inputRef={textAreaRef}
                    fullWidth
                    multiline
                    minRows={minHeight / 20}
                    maxRows={20}
                    value={value || ''}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => handleChange(name, e.target.value, type)}
                    variant="outlined"
                    InputProps={{
                        sx: {
                            fontFamily: '"Ubuntu", monospace',
                            fontSize: '13px',
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            minHeight: `${minHeight}px`,
                        }
                    }}
                />

                {value && (
                    <Box sx={{ mt: 2, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.secondary' }}>
                            Предпросмотр:
                        </Typography>
                        <Box
                            dangerouslySetInnerHTML={{ __html: convertToPreview(value) }}
                            sx={{
                                p: 1,
                                fontFamily: '"Ubuntu", sans-serif',
                                fontSize: '13px',
                                '& a': { color: 'primary.main' },
                                '& ul, & ol': { pl: 2, mt: 0, mb: 0 }
                            }}
                        />
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default FormattableTextarea;
