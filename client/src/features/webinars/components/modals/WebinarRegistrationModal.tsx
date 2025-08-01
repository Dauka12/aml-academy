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
import GuestRegistrationSuccessModal from './GuestRegistrationSuccessModal';

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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [showGuestSuccessModal, setShowGuestSuccessModal] = useState(false);
  
  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem('jwtToken'));
  
  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Limit to 11 digits (7 + 10 digits)
    const limitedDigits = digits.slice(0, 11);
    
    // Format as 7 777 777 77 77
    if (limitedDigits.length === 0) return '';
    if (limitedDigits.length <= 1) return limitedDigits;
    if (limitedDigits.length <= 4) return `${limitedDigits.slice(0, 1)} ${limitedDigits.slice(1)}`;
    if (limitedDigits.length <= 7) return `${limitedDigits.slice(0, 1)} ${limitedDigits.slice(1, 4)} ${limitedDigits.slice(4)}`;
    if (limitedDigits.length <= 9) return `${limitedDigits.slice(0, 1)} ${limitedDigits.slice(1, 4)} ${limitedDigits.slice(4, 7)} ${limitedDigits.slice(7)}`;
    return `${limitedDigits.slice(0, 1)} ${limitedDigits.slice(1, 4)} ${limitedDigits.slice(4, 7)} ${limitedDigits.slice(7, 9)} ${limitedDigits.slice(9)}`;
  };
  
  // Phone number validation
  const validatePhoneNumber = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    
    if (digits.length === 0) {
      return t('webinar.form.phoneRequired');
    }
    
    
    if (digits.length !== 11) {
      return t('webinar.form.phoneInvalidLength');
    }
    
    return null;
  };
  
  // Handle phone number change
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
    
    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError(null);
    }
    
    // Clear general error when user fixes phone
    if (error && error.includes(t('webinar.form.phoneRequired'))) {
      setError(null);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPhoneError(null);
    
    try {
      if (isLoggedIn) {
        // If logged in, just register with optional questions
        await webinarApi.signupForWebinar(webinar.id, { 
          questions: questions || undefined 
        });
        setLoading(false);
        onSuccess();
      } else {
        // If not logged in, require name, email, and phone
        if (!name || !email || !phoneNumber) {
          setError(t('webinar.registrationRequiredFields'));
          setLoading(false);
          return;
        }
        
        // Validate phone number
        const phoneValidationError = validatePhoneNumber(phoneNumber);
        if (phoneValidationError) {
          setPhoneError(phoneValidationError);
          setLoading(false);
          return;
        }
        
        // Remove spaces from phone number for API
        const cleanPhoneNumber = phoneNumber.replace(/\s/g, '');
        
        await webinarApi.guestSignupForWebinar(webinar.id, {
          name,
          email,
          phoneNumber: cleanPhoneNumber,
          questions: questions || undefined
        });
        
        // Сохраняем email гостя для последующего доступа к ссылке
        localStorage.setItem(`guestEmail_webinar_${webinar.id}`, email);
        
        setLoading(false);
        
        // Для гостей показываем специальное модальное окно с предупреждением
        setShowGuestSuccessModal(true);
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || t('webinar.registrationError'));
    }
  };

  const handleGuestSuccessModalClose = () => {
    setShowGuestSuccessModal(false);
    // Clear form data
    setName('');
    setEmail('');
    setPhoneNumber('');
    setQuestions('');
    setError(null);
    setPhoneError(null);
    onClose();
    onSuccess();
  };
  
  const handleClose = () => {
    if (!loading) {
      // Clear form data
      setName('');
      setEmail('');
      setPhoneNumber('');
      setQuestions('');
      setError(null);
      setPhoneError(null);
      onClose();
    }
  };
  
  return (
    <>
      <Dialog 
        open={open} 
        onClose={loading ? undefined : handleClose}
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
                  
                  <TextField
                    label={t('webinar.form.phoneNumber')}
                    fullWidth
                    margin="normal"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="7 777 777 77 77"
                    required
                    disabled={loading}
                    error={!!phoneError}
                    helperText={phoneError || t('webinar.form.phoneHelperText')}
                    inputProps={{
                      maxLength: 15, // "7 777 777 77 77" = 15 characters
                    }}
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
            <Button onClick={handleClose} disabled={loading}>
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

      {/* Модальное окно успешной регистрации для гостей */}
      <GuestRegistrationSuccessModal
        open={showGuestSuccessModal}
        onClose={handleGuestSuccessModalClose}
        webinarTitle={webinar.title}
        webinarLink={webinar.link}
      />
    </>
  );
};

export default WebinarRegistrationModal;
