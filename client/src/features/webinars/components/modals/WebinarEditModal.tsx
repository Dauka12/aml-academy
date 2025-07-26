import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  CircularProgress,
  Alert,
  Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Webinar } from '../../types/webinar';
import webinarApi from '../../api/webinarApi';
import { convertDateFromArray } from '../../utils/dateUtils.ts';
import { isValidWebinarData } from '../../utils/validators.ts';

interface WebinarEditModalProps {
  webinar: Webinar;
  open: boolean;
  onClose: () => void;
}

const WebinarEditModal: React.FC<WebinarEditModalProps> = ({
  webinar,
  open,
  onClose
}) => {
  const { t } = useTranslation('webinars');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: null as Date | null,
    isActive: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (webinar) {
      setFormData({
        title: webinar.title,
        description: webinar.description || '',
        startDate: convertDateFromArray(webinar.startDate),
        isActive: webinar.isActive || false,
      });
    }
  }, [webinar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isActive: e.target.checked,
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({
        ...formData,
        startDate: date,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validationErrors = isValidWebinarData(formData);
    if (validationErrors) {
      setError(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Prepare data for API
      const updatedWebinarData = {
        ...formData,
        id: webinar.id,
        startDate: formData.startDate.toISOString(),
      };
      
      await webinarApi.updateWebinar(webinar.id, updatedWebinarData);
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Failed to update webinar:', err);
      setError(t('errorUpdatingWebinar'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={loading ? undefined : onClose} 
      fullWidth 
      maxWidth="md"
      scroll="paper"
      aria-labelledby="edit-webinar-dialog-title"
    >
      <DialogTitle id="edit-webinar-dialog-title">
        {t('editWebinar')}
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {t('webinarUpdatedSuccessfully')}
            </Alert>
          )}
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label={t('title')}
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('description')}
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={t('startDate')}
                  value={formData.startDate}
                  onChange={handleDateChange}
                  disabled={loading}
                  slotProps={{ 
                    textField: { 
                      fullWidth: true,
                      required: true
                    } 
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label={t('duration')}
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                disabled={loading}
                InputProps={{ 
                  endAdornment: (
                    <Typography variant="body2" color="text.secondary">
                      {t('minutes')}
                    </Typography>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label={t('maxParticipants')}
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={handleSwitchChange}
                    name="isActive"
                    color="primary"
                    disabled={loading}
                  />
                }
                label={t('isActive')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('meetingUrl')}
                name="meetingUrl"
                value={formData.meetingUrl}
                onChange={handleChange}
                placeholder="https://zoom.us/j/..."
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('recordingUrl')}
                name="recordingUrl"
                value={formData.recordingUrl}
                onChange={handleChange}
                placeholder="https://vimeo.com/..."
                disabled={loading}
                helperText={t('optionalForPastWebinars')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button 
            onClick={onClose} 
            disabled={loading}
          >
            {t('cancel')}
          </Button>
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? t('saving') : t('save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default WebinarEditModal;
