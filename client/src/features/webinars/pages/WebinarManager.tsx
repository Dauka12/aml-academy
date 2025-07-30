import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useWebinarManager from '../hooks/useWebinarManager';
import { Webinar } from '../types/webinar';
import { WebinarSignup } from '../types/webinarSignup';
import './WebinarManager.scss';
import { convertDateFromArray } from '../utils/webinarHelpers';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Typography,
  Box
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

interface WebinarFormData {
  title: string;
  description: string;
  startDate: string;
  link: string;
  isActive: boolean;
  imageFile: File | null;
}

const initialFormData: WebinarFormData = {
  title: '',
  description: '',
  startDate: '',
  link: '',
  isActive: true,
  imageFile: null
};

const WebinarManager: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    webinarsAdmin,
    signups,
    loading,
    error,
    fetchWebinars,
    createWebinar,
    updateWebinar,
    deleteWebinar,
    fetchWebinarSignups,
    fetchWebinarsAdmin
  } = useWebinarManager();

  const [formData, setFormData] = useState<WebinarFormData>(initialFormData);
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Toggle between admin and preview modes
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // If in preview mode, redirect to the main webinars page
  useEffect(() => {
    fetchWebinarsAdmin();
  }, []);
  useEffect(() => {
    if (isPreviewMode) {
      navigate('/webinars');
    }
  }, [isPreviewMode, navigate]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        imageFile: file
      });
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start editing a webinar
  const handleEdit = (webinar: Webinar) => {
    const startDate = convertDateFromArray(webinar.startDate);
    // Format date to YYYY-MM-DDThh:mm
    const formattedDate = startDate.toISOString().slice(0, 16);
    
    setFormData({
      title: webinar.title,
      description: webinar.description || '',
      startDate: formattedDate,
      link: webinar.link || '',
      isActive: webinar.isActive,
      imageFile: null
    });
    
    setImagePreview(webinar.imageUrl || null);
    setSelectedWebinar(webinar);
    setIsEditing(true);
    
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {console.log('webinarAdmin', webinarsAdmin);
  }, []);
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      if (isEditing && selectedWebinar) {
        // Update existing webinar
        await updateWebinar(selectedWebinar.id, formData);
      } else {
        // Create new webinar
        await createWebinar(formData);
      }
      
      // Reset form and state
      setFormData(initialFormData);
      setIsEditing(false);
      setSelectedWebinar(null);
      setImagePreview(null);
      
      // Refresh webinars list
      fetchWebinars();
      
    } catch (err) {
      setSubmitError('Error saving webinar. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setSelectedWebinar(null);
    setImagePreview(null);
  };

  // Start delete process
  const handleDeleteClick = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setIsDeleteConfirmOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    if (selectedWebinar) {
      await deleteWebinar(selectedWebinar.id);
      setIsDeleteConfirmOpen(false);
      setSelectedWebinar(null);
      
      // Refresh webinars list
      fetchWebinars();
    }
  };

  // View webinar signups
  const handleViewSignups = async (webinar: Webinar) => {
    if (webinar.participants && webinar.participants.length > 0) {
      // Если у вебинара уже есть участники в данных
      // Сохраняем участников в формате WebinarSignup для совместимости с интерфейсом
      const participantsAsSignups = webinar.participants.map(participant => ({
        id: participant.id,
        webinarId: webinar.id,
        isGuest: participant.isGuest,
        phoneNumber: participant.phoneNumber,
        userId: participant.userId,
        fullName: participant.fullName,
        email: participant.email,
        questions: participant.questions,
        createdAt: participant.createdAt,
      }));
      
      // Обновляем список подписок в стейте
      signups.length = 0; // Очищаем текущий массив
      signups.push(...participantsAsSignups); // Добавляем новые данные
      
      setSelectedWebinar(webinar);
    } else {
      // Иначе загружаем подписки с сервера
      await fetchWebinarSignups(webinar.id);
      setSelectedWebinar(webinar);
    }
  };

  // Format date string for display
  const formatDate = (dateValue: any[] | string) => {
    try {
      const date = convertDateFromArray(dateValue);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } catch (e) {
      console.error('Error formatting date:', e, dateValue);
      return 'Invalid date';
    }
  };

  const formatDateTime = (dateValue: any[] | string) => {
    try {
      const date = convertDateFromArray(dateValue);
      return date.toLocaleString();
    } catch (e) {
      console.error('Error formatting date:', e, dateValue);
      return 'Invalid date';
    }
  };

  return (
    <div className="webinar-manager-page">
      <div className="container">
        <div className="page-header">
          <h1>{t('webinar.manager')}</h1>
          
          <div className="action-buttons">
            <button 
              className="preview-button"
              onClick={togglePreviewMode}
            >
              {isPreviewMode ? t('webinar.backToAdmin') : t('webinar.previewMode')}
            </button>
            
            <button 
              className="back-button"
              onClick={() => navigate('/webinars')}
            >
              &larr; {t('webinar.backToWebinars')}
            </button>
          </div>
        </div>
        
        {/* Webinar Form */}
        <div className="webinar-form-container">
          <h2>{isEditing ? t('webinar.editWebinar') : t('webinar.createWebinar')}</h2>
          
          <form onSubmit={handleSubmit} className="webinar-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">{t('webinar.title')} *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="startDate">{t('webinar.startDate')} *</label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">{t('webinar.description')}</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="link">{t('webinar.link')}</label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </div>
              
              <div className="form-group checkbox-group">
                <label htmlFor="isActive">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                  />
                  <span>{t('webinar.isActive')}</span>
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="imageFile">{t('webinar.image')}</label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                onChange={handleFileChange}
                accept="image/*"
                ref={fileInputRef}
                className="file-input"
              />
              
              <div className="file-input-wrapper">
                <button 
                  type="button" 
                  className="file-input-button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t('webinar.chooseFile')}
                </button>
                <span className="file-name">
                  {formData.imageFile ? formData.imageFile.name : t('webinar.noFileChosen')}
                </span>
              </div>
              
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button 
                    type="button"
                    className="remove-image"
                    onClick={() => {
                      setFormData({...formData, imageFile: null});
                      setImagePreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
            
            {submitError && (
              <div className="error-message">
                {submitError}
              </div>
            )}
            
            <div className="form-actions">
              {isEditing && (
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="cancel-button"
                >
                  {t('webinar.cancel')}
                </button>
              )}
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting 
                  ? t('webinar.saving') 
                  : isEditing 
                    ? t('webinar.updateWebinar') 
                    : t('webinar.createWebinar')
                }
              </button>
            </div>
          </form>
        </div>
        
        {/* Webinars Table */}
        <div className="webinars-table-container">
          <h2>{t('webinar.webinarsList')}</h2>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading"></div>
            </div>
          ) : error ? (
            <Box sx={{ p: 3, bgcolor: '#ffebee', color: '#c62828', borderRadius: 1 }}>
              <Typography>{error}</Typography>
            </Box>
          ) : webinarsAdmin?.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body1" color="text.secondary">
                {t('webinar.noWebinars')}
              </Typography>
            </Box>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ width: '100%' }}
            >
              <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="webinars table">
                  <TableHead sx={{ bgcolor: '#1976d2' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('webinar.title')}</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('webinar.date')}</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('webinar.status')}</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('webinar.signups')}</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('webinar.actions')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {webinarsAdmin?.map((webinar: Webinar) => (
                      <TableRow 
                        key={webinar.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f5f5f5' } }}
                      >
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                          {webinar.title}
                        </TableCell>
                        <TableCell>{formatDateTime(webinar.startDate)}</TableCell>
                        <TableCell>
                          <Chip
                            label={webinar.isActive ? t('webinar.active') : t('webinar.inactive')}
                            color={webinar.isActive ? 'success' : 'default'}
                            size="small"
                            icon={webinar.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                          />
                        </TableCell>
                        <TableCell>{webinar.signupsCount || 0}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title={t('webinar.edit')}>
                              <IconButton 
                                size="small" 
                                color="primary"
                                onClick={() => handleEdit(webinar)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('webinar.viewSignups')}>
                              <IconButton
                                size="small"
                                color="info"
                                onClick={() => handleViewSignups(webinar)}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('webinar.delete')}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteClick(webinar)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>
          )}
        </div>
        
        {/* Signups List */}
        {selectedWebinar && signups.length > 0 && (
          <Box className="signups-container" sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
              {t('webinar.signupsFor')} "{selectedWebinar.title}"
            </Typography>
            
            <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2, mb: 4 }}>
              <Table sx={{ minWidth: 650 }} aria-label="signups table">
                <TableHead sx={{ bgcolor: '#2e7d32' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('Зарегестрированный пользователь')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('webinar.email')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('webinar.name')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('Номер телефона')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('webinar.registrationDate')}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('webinar.questions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {signups.map(signup => (
                    <TableRow 
                      key={signup.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f5f5f5' } }}
                    >
                      <TableCell>{signup.isGuest ? '-' : '✅'}</TableCell>
                      <TableCell>{signup.email}</TableCell>
                      <TableCell>{signup.fullName || '-'}</TableCell>
                      <TableCell>{signup.phoneNumber || '-'}</TableCell>
                      <TableCell>{formatDate(signup.createdAt)}</TableCell>
                      <TableCell>{signup.questions || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        
        {/* Delete Confirmation Modal */}
        {isDeleteConfirmOpen && selectedWebinar && (
          <div className="modal-overlay" style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <Paper sx={{ 
              p: 3, 
              width: '100%', 
              maxWidth: '450px',
              borderRadius: 2,
              boxShadow: 24,
            }}>
              <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                {t('webinar.confirmDelete')}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                {t('webinar.deleteWarning')} <strong>"{selectedWebinar.title}"</strong>?
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button 
                  variant="outlined"
                  onClick={() => setIsDeleteConfirmOpen(false)}
                >
                  {t('webinar.cancel')}
                </Button>
                <Button 
                  variant="contained"
                  color="error"
                  onClick={handleConfirmDelete}
                  startIcon={<DeleteIcon />}
                >
                  {t('webinar.delete')}
                </Button>
              </Box>
            </Paper>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebinarManager;
