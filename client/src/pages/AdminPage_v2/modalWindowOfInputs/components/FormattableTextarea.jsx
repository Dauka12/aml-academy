import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';

const FormattableTextarea = ({
  handleChange,
  label,
  name,
  type,
  value,
}) => {
  const textAreaRef = useRef(null);

  const wrapSelected = (symbol, endSymbol=symbol) => {
    const textArea = textAreaRef.current;
    if (!textArea) return;
    
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    // Only proceed if there is a selection
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

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{label}</Typography>
      <Paper variant="outlined" sx={{ p: 1, mb: 1 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => wrapSelected('|b|')}
            sx={{ minWidth: 40 }}
          >
            <FormatBoldIcon fontSize="small" />
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => wrapSelected('|i|')}
            sx={{ minWidth: 40 }}
          >
            <FormatItalicIcon fontSize="small" />
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => wrapSelected('|u|')}
            sx={{ minWidth: 40 }}
          >
            <FormatUnderlinedIcon fontSize="small" />
          </Button>
        </Box>

        <TextField
          inputRef={textAreaRef}
          fullWidth
          multiline
          minRows={6}
          maxRows={20}
          value={value || ''}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleChange(name, e.target.value, type)}
          variant="outlined"
          size="small"
        />
      </Paper>
    </Box>
  );
};

export default FormattableTextarea;
