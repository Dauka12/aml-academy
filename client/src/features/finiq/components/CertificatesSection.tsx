import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    Box,
    Card,
    CardContent,
    Typography
} from '@mui/material';

// Icons
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';

const MotionCard = motion(Card);

interface CertificatesSectionProps {
    itemVariants?: any;
}

const CertificatesSection: React.FC<CertificatesSectionProps> = ({
    itemVariants
}) => {
    const { t } = useTranslation();

    return (
        <Box sx={{ mb: 6 }}>
            <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                sx={{
                    textAlign: { xs: 'left', sm: 'center' },
                    mb: 4,
                    color: '#1A2751',
                    fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' }
                }}
            >
                {t('finiq.certificates')}
            </Typography>

            <MotionCard
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.7 }}
                sx={{
                    borderRadius: 2,
                    background: 'rgba(245, 247, 250, 0.9)',
                    textAlign: 'center',
                    py: { xs: 3, sm: 4 }
                }}
            >
                <CardContent>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        gap: { xs: 4, sm: 8 }
                    }}>
                        {/* Participant Certificate */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            flex: 1
                        }}>
                            <SchoolIcon sx={{
                                fontSize: { xs: 50, sm: 60, md: 70 },
                                color: 'primary.main',
                                mb: 2
                            }} />
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                                    mb: 2,
                                    color: '#1A2751'
                                }}
                            >
                                {t('finiq.participantCertificate')}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                    lineHeight: 1.6
                                }}
                            >
                                {t('finiq.participantDescription')}
                            </Typography>
                        </Box>

                        {/* Winner Diploma */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            flex: 1
                        }}>
                            <VerifiedIcon sx={{
                                fontSize: { xs: 50, sm: 60, md: 70 },
                                color: '#f57c00',
                                mb: 2
                            }} />
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                                    mb: 2,
                                    color: '#1A2751'
                                }}
                            >
                                {t('finiq.winnerDiploma')}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                    lineHeight: 1.6
                                }}
                            >
                                {t('finiq.winnerDescription')}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </MotionCard>
        </Box>
    );
};

export default CertificatesSection;