import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  Avatar,
  ListItemAvatar,
  CircularProgress,
  TextField,
  InputAdornment
} from '@mui/material';
import { Person as PersonIcon, Search as SearchIcon } from '@mui/icons-material';
import { Webinar } from '../../types/webinar';
import { WebinarSignup } from '../../types/webinarSignup';
import webinarApi from '../../api/webinarApi';

interface WebinarParticipantsModalProps {
  webinar: Webinar;
  open: boolean;
  onClose: () => void;
}

const WebinarParticipantsModal: React.FC<WebinarParticipantsModalProps> = ({
  webinar,
  open,
  onClose
}) => {
  const { t } = useTranslation('webinars');
  const [participants, setParticipants] = useState<WebinarSignup[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Fetch participants when modal opens
  useEffect(() => {
    if (open && webinar) {
      fetchParticipants();
    }
  }, [open, webinar]);
  
  // Filter participants based on search term
  const filteredParticipants = participants.filter(participant => 
    participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (participant.email && participant.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const fetchParticipants = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await webinarApi.getWebinarSignups(webinar.id);
      setParticipants(data);
    } catch (err) {
      console.error('Failed to fetch participants:', err);
      setError(t('errorFetchingParticipants'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div">
          {t('webinar.participants')} - {webinar.title}
        </Typography>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder={t('searchParticipants')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 3, color: 'error.main' }}>
            <Typography>{error}</Typography>
          </Box>
        ) : filteredParticipants.length > 0 ? (
          <List>
            {filteredParticipants.map((participant, index) => (
              <React.Fragment key={participant.id || index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={participant.fullName} 
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {participant.email}
                        </Typography>
                        {participant.questions && (
                          <Box mt={1}>
                            <Typography variant="caption" color="text.secondary">
                              {t('questions')}:
                            </Typography>
                            <Typography variant="body2">
                              {participant.questions}
                            </Typography>
                          </Box>
                        )}
                      </>
                    }
                  />
                </ListItem>
                {index < filteredParticipants.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {searchTerm ? t('noMatchingParticipants') : t('noParticipantsYet')}
            </Typography>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WebinarParticipantsModal;
