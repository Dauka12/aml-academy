import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAdminWebinars from '../hooks/useAdminWebinars';
import WebinarTable from '../components/tables/WebinarTable';
import WebinarParticipantsModal from '../components/modals/WebinarParticipantsModal';
import WebinarEditModal from '../components/modals/WebinarEditModal';
import { Webinar } from '../types/webinar';
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  CircularProgress,
  Paper,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const WebinarManagerV2: React.FC = () => {
  const { t } = useTranslation('webinars');
  const navigate = useNavigate();
  const {
    webinars,
    loading,
    error,
    fetchWebinars,
    deleteWebinar
  } = useAdminWebinars();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [webinarToDelete, setWebinarToDelete] = useState<Webinar | null>(null);

  // Filter webinars based on search term
  const filteredWebinars = webinars.filter(webinar =>
    webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (webinar.description && webinar.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handlers
  const handleCreateWebinar = () => {
    navigate('/webinars/create');
  };

  const handleEditWebinar = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setIsEditModalOpen(true);
  };

  const handleViewSignups = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setIsParticipantsModalOpen(true);
  };

  const handleDeleteClick = (webinar: Webinar) => {
    setWebinarToDelete(webinar);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!webinarToDelete) return;
    
    try {
      await deleteWebinar(webinarToDelete.id);
      setIsDeleteConfirmOpen(false);
      setWebinarToDelete(null);
    } catch (error) {
      console.error('Failed to delete webinar:', error);
    }
  };

  const handleRefresh = () => {
    fetchWebinars();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {t('webinarManagement')}
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateWebinar}
          >
            {t('createWebinar')}
          </Button>
        </Box>

        {/* Search and Actions */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            placeholder={t('searchPlaceholder')}
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 400 }}
          />
          
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading}
          >
            {t('refresh')}
          </Button>
        </Box>

        {/* Status Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Content */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredWebinars.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography>
              {searchTerm ? t('noMatchingWebinars') : t('noWebinarsFound')}
            </Typography>
          </Paper>
        ) : (
          <WebinarTable
            webinars={filteredWebinars}
            onEdit={handleEditWebinar}
            onViewSignups={handleViewSignups}
            onDelete={handleDeleteClick}
          />
        )}

        {/* Modals */}
        {selectedWebinar && (
          <>
            {/* Edit Modal */}
            <WebinarEditModal
              webinar={selectedWebinar}
              open={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                fetchWebinars(); // Refresh webinars after edit
              }}
            />
            
            {/* Participants Modal */}
            <WebinarParticipantsModal
              webinar={selectedWebinar}
              open={isParticipantsModalOpen}
              onClose={() => setIsParticipantsModalOpen(false)}
            />
          </>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={isDeleteConfirmOpen}
          onClose={() => setIsDeleteConfirmOpen(false)}
        >
          <DialogTitle>{t('confirmDelete')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('deleteWebinarConfirmMessage', {
                title: webinarToDelete?.title
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteConfirmOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>
              {t('delete')}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default WebinarManagerV2;
