import React from 'react';
import { Box, styled } from '@mui/material';
import { DashboardView as DashboardViewType } from './DashboardSidebar';
import DashboardView from './DashboardView';
import TestsView from './TestsView';
import AchievementsView from './AchievementsView';

// Define interfaces
interface ContentContainerProps {
    open: boolean;
}

interface DashboardContentProps {
    open: boolean;
    currentView: DashboardViewType;
    onViewChange: (view: DashboardViewType) => void;
    exams: any[];
    sessions: any[];
    isLoading: boolean;
    error: string | null;
}

const ContentContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open',
})<ContentContainerProps>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(5, 5, 5, open ? 5 : 8),
    paddingTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3, 2),
        paddingTop: theme.spacing(6),
    }
}));

const DashboardContent: React.FC<DashboardContentProps> = ({
    open,
    currentView,
    onViewChange,
    exams,
    sessions,
    isLoading,
    error
}) => {
    const renderContent = () => {
        switch (currentView) {
            case 'tests':
                return (
                    <TestsView
                        exams={exams}
                        sessions={sessions}
                        isLoading={isLoading}
                        error={error}
                    />
                );
            case 'profile': // legacy route -> achievements
            case 'achivements': // typo safe
            case 'achievements':
                return <AchievementsView onViewChange={onViewChange} />;
            case 'dashboard':
            default:
                return <DashboardView onViewChange={onViewChange} />;
        }
    };

    return (
        <ContentContainer open={open}>
            {renderContent()}
        </ContentContainer>
    );
};

export default DashboardContent;