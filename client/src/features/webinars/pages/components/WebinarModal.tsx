import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WebinarModal.scss';

interface WebinarModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const WebinarModal: React.FC<WebinarModalProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="webinar-modal-overlay"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="webinar-modal"
          onClick={e => e.stopPropagation()}
        >
          <h3 className="webinar-modal__title">{title}</h3>
          <p className="webinar-modal__message">{message}</p>
          
          <div className="webinar-modal__actions">
            <button
              className="webinar-modal__cancel-button"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              className="webinar-modal__confirm-button"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WebinarModal;
