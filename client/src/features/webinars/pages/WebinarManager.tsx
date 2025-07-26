import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useWebinarManager from '../hooks/useWebinarManager';
import { Webinar } from '../types/webinar';
import { WebinarSignup } from '../types/webinarSignup';
import './WebinarManager.scss';
import { convertDateFromArray } from '../utils/webinarHelpers';

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
    webinars,
    signups,
    loading,
    error,
    fetchWebinars,
    createWebinar,
    updateWebinar,
    deleteWebinar,
    fetchWebinarSignups
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
    await fetchWebinarSignups(webinar.id);
    setSelectedWebinar(webinar);
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
            <div className="error-message">{error}</div>
          ) : webinars.length === 0 ? (
            <div className="empty-message">
              {t('webinar.noWebinars')}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="table-responsive"
            >
              <table className="webinars-table">
                <thead>
                  <tr>
                    <th>{t('webinar.title')}</th>
                    <th>{t('webinar.date')}</th>
                    <th>{t('webinar.status')}</th>
                    <th>{t('webinar.signups')}</th>
                    <th>{t('webinar.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {webinars.map((webinar: Webinar) => (
                    <tr key={webinar.id}>
                      <td className="webinar-title">{webinar.title}</td>
                      <td>{formatDateTime(webinar.startDate)}</td>
                      <td>
                        <span className={`status-badge ${webinar.isActive ? 'active' : 'inactive'}`}>
                          {webinar.isActive ? t('webinar.active') : t('webinar.inactive')}
                        </span>
                      </td>
                      <td>{webinar.signupsCount || 0}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            onClick={() => handleEdit(webinar)}
                            className="edit-button"
                          >
                            {t('webinar.edit')}
                          </button>
                          <button 
                            onClick={() => handleViewSignups(webinar)}
                            className="view-button"
                          >
                            {t('webinar.viewSignups')}
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(webinar)}
                            className="delete-button"
                          >
                            {t('webinar.delete')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
        
        {/* Signups List */}
        {selectedWebinar && signups.length > 0 && (
          <div className="signups-container">
            <h2>{t('webinar.signupsFor')} "{selectedWebinar.title}"</h2>
            
            <table className="signups-table">
              <thead>
                <tr>
                  <th>{t('webinar.email')}</th>
                  <th>{t('webinar.name')}</th>
                  <th>{t('webinar.registrationDate')}</th>
                  <th>{t('webinar.questions')}</th>
                </tr>
              </thead>
              <tbody>
                {signups.map(signup => (
                  <tr key={signup.id}>
                    <td>{signup.userEmail}</td>
                    <td>{signup.guestName || '-'}</td>
                    <td>{formatDate(signup.signupDate)}</td>
                    <td>{signup.questions || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {isDeleteConfirmOpen && selectedWebinar && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{t('webinar.confirmDelete')}</h3>
              <p>
                {t('webinar.deleteWarning')} <strong>"{selectedWebinar.title}"</strong>?
              </p>
              
              <div className="modal-actions">
                <button 
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="cancel-button"
                >
                  {t('webinar.cancel')}
                </button>
                <button 
                  onClick={handleConfirmDelete}
                  className="delete-button"
                >
                  {t('webinar.delete')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebinarManager;
