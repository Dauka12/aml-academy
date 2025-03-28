import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';

export const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
                '&:not(:last-child)': {
        borderBottom: 0,
        },
        '&::before': {
        display: 'none',
        },
        borderRadius: "16px",
        backgroundColor: "#303F6E",
        color:"white",
        padding:"0px",
        marginTop: "4px",
        fontSize:"20px"
}));

export const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowRightIcon sx={{ fontSize: '40px', color:"white", padding:"0px" }} />}
        {...props}
    />
    ))(({ theme }) => ({
        backgroundColor: '#303F6E',
        color: "white",
        padding: "0 0 0 0",
        borderRadius: "16px",
        flexDirection: 'row-reverse',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
        },
            '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    borderRadius: "16px",
}));