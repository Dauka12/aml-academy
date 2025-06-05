import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    Box,
    Button,
    CircularProgress
} from '@mui/material';

const ActionButtons = ({ loading, saveAndNext }) => {
    return (
        <Box 
            sx={{ 
                mt: 5, 
                display: 'flex', 
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
        >
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={saveAndNext}
                disabled={loading}
                endIcon={<ArrowForwardIcon />}
                sx={{ py: 1.5, px: 4 }}
            >
                {loading ? <CircularProgress size={24} /> : 'Перейти далее'}
            </Button>
            
            <Button
                variant="text"
                color="inherit"
                sx={{ 
                    ml: 3, 
                    color: 'rgba(55, 71, 97, 0.50)',
                    textDecoration: 'underline'
                }}
                startIcon={<ArrowBackIcon />}
            >
                Вернуться назад
            </Button>
        </Box>
    );
};

export default ActionButtons;
