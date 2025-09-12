import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    Box,
    Card,
    CardContent,
    Typography,
    useTheme
} from '@mui/material';

// Icons
import GroupIcon from '@mui/icons-material/Group';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CertificateIcon from '@mui/icons-material/CardMembership';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const MotionCard = motion(Card);

interface ParticipationCardsProps {
    containerVariants?: any;
    itemVariants?: any;
}

const ParticipationCards: React.FC<ParticipationCardsProps> = ({
    containerVariants,
    itemVariants
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const participationData = [
        {
            icon: <GroupIcon fontSize="large" />,
            text: t('finiq.participation.anyone')
        },
        {
            icon: <SmartphoneIcon fontSize="large" />,
            text: t('finiq.participation.online')
        },
        {
            icon: <CertificateIcon fontSize="large" />,
            text: t('finiq.participation.certificate')
        },
        {
            icon: <EmojiEventsIcon fontSize="large" />,
            text: t('finiq.participation.prizes')
        }
    ];

    return (
        <MotionCard
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            sx={{
                borderRadius: 2,
                background: 'rgba(245, 247, 250, 0.9)',
                textAlign: 'center',
                py: { xs: 3, sm: 4 }
            }}
        >
            <CardContent>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: { xs: 3, sm: 4 }
                }}>
                    {participationData.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 2,
                                textAlign: 'left'
                            }}
                        >
                            <Box sx={{
                                color: theme.palette.primary.main,
                                flexShrink: 0,
                                mt: 0.5
                            }}>
                                {item.icon}
                            </Box>
                            <Typography
                                variant="body1"
                                sx={{
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                }}
                            >
                                {item.text}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </MotionCard>
    );
};

export default ParticipationCards;