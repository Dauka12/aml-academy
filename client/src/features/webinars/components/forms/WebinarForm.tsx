import React, { useState, useEffect } from 'react';
import { Webinar } from '../../types/webinar';
import { validateWebinarForm, hasErrors } from '../../utils/validation';
import './WebinarForm.scss';

interface WebinarFormProps {
  webinar?: Partial<Webinar>;
  onSubmit: (webinar: Partial<Webinar>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const initialWebinar: Partial<Webinar> = {
  title: '',
  description: '',
  startDate: [],
  link: '',
  imageUrl: '',
  isActive: true
};

const WebinarForm: React.FC<WebinarFormProps> = ({
  webinar = initialWebinar,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<Partial<Webinar>>(webinar);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setFormData(webinar);
  }, [webinar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'isActive') {
      const inputElement = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: inputElement.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Mark field as touched
    setTouched({ ...touched, [name]: true });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    
    // Validate single field
    const fieldErrors = validateWebinarForm({ [name]: formData[name as keyof Webinar] } as Partial<Webinar>);
    if (fieldErrors[name]) {
      setErrors({ ...errors, [name]: fieldErrors[name] });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const formErrors = validateWebinarForm(formData);
    setErrors(formErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);
    
    if (!hasErrors(formErrors)) {
      onSubmit(formData);
    }
  };

  return (
    <form className="webinar-form" onSubmit={handleSubmit}>
      <div className="webinar-form__group">
        <label htmlFor="title" className="webinar-form__label">
          Title*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`webinar-form__input ${
            touched.title && errors.title ? 'webinar-form__input--error' : ''
          }`}
          placeholder="Enter webinar title"
          disabled={isLoading}
        />
        {touched.title && errors.title && (
          <div className="webinar-form__error">{errors.title}</div>
        )}
      </div>

      <div className="webinar-form__group">
        <label htmlFor="description" className="webinar-form__label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`webinar-form__textarea ${
            touched.description && errors.description ? 'webinar-form__textarea--error' : ''
          }`}
          placeholder="Enter webinar description"
          rows={5}
          disabled={isLoading}
        />
        {touched.description && errors.description && (
          <div className="webinar-form__error">{errors.description}</div>
        )}
      </div>

      <div className="webinar-form__row">
        <div className="webinar-form__group">
          <label htmlFor="startDate" className="webinar-form__label">
            Start Date & Time*
          </label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            value={formData.startDate || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`webinar-form__input ${
              touched.startDate && errors.startDate ? 'webinar-form__input--error' : ''
            }`}
            disabled={isLoading}
          />
          {touched.startDate && errors.startDate && (
            <div className="webinar-form__error">{errors.startDate}</div>
          )}
        </div>
      </div>

      <div className="webinar-form__group">
        <label htmlFor="link" className="webinar-form__label">
          Webinar Link
        </label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`webinar-form__input ${
            touched.link && errors.link ? 'webinar-form__input--error' : ''
          }`}
          placeholder="https://zoom.us/j/example"
          disabled={isLoading}
        />
        {touched.link && errors.link && (
          <div className="webinar-form__error">{errors.link}</div>
        )}
      </div>

      <div className="webinar-form__group">
        <label htmlFor="imageUrl" className="webinar-form__label">
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`webinar-form__input ${
            touched.imageUrl && errors.imageUrl ? 'webinar-form__input--error' : ''
          }`}
          placeholder="https://example.com/image.jpg"
          disabled={isLoading}
        />
        {touched.imageUrl && errors.imageUrl && (
          <div className="webinar-form__error">{errors.imageUrl}</div>
        )}
      </div>

      <div className="webinar-form__group webinar-form__group--checkbox">
        <label className="webinar-form__checkbox">
          <input
            type="checkbox"
            name="isActive"
            checked={Boolean(formData.isActive)}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span>Active</span>
        </label>
      </div>

      <div className="webinar-form__actions">
        {onCancel && (
          <button
            type="button"
            className="webinar-form__button webinar-form__button--cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="webinar-form__button webinar-form__button--submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : webinar.id ? 'Update Webinar' : 'Create Webinar'}
        </button>
      </div>
    </form>
  );
};

export default WebinarForm;
