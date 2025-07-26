import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { Webinar } from '../../types/webinar.ts';
import webinarApi from '../../api/webinarApi.ts';

interface WebinarRegistrationModalProps {
  webinar: Webinar;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const WebinarRegistrationModal: React.FC<WebinarRegistrationModalProps> = ({
  webinar,
  open,
  onClose,
  onSuccess
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem('jwtToken'));
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isLoggedIn) {
        // If logged in, just register with optional questions
        await webinarApi.signupForWebinar(webinar.id, { 
          questions: questions || undefined 
        });
      } else {
        // If not logged in, require name and email
        if (!name || !email) {
          setError(t('webinar.registrationRequiredFields'));
          setLoading(false);
          return;
        }
        
        await webinarApi.guestSignupForWebinar(webinar.id, {
          name,
          email,
          questions: questions || undefined
        });
      }
      
      setLoading(false);
      onSuccess();
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || t('webinar.registrationError'));
    }
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={loading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {t('webinar.registerForWebinar')}
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              {webinar.title}
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {!isLoggedIn && (
              <>
                <TextField
                  label={t('webinar.form.name')}
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
                
                <TextField
                  label={t('webinar.form.email')}
                  type="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </>
            )}
            
            <TextField
              label={t('webinar.form.questions')}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder={t('webinar.form.questionsPlaceholder')}
              disabled={loading}
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            {t('webinar.cancel')}
          </Button>
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              t('webinar.register')
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default WebinarRegistrationModal;
