import React from 'react';
import './Modal.css';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actionLabel,
  onAction,
  actionDisabled = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="Modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="Modal-container"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="Modal-header">
              <h2 className="Modal-title">{title}</h2>
              <button 
                className="Modal-btn-close-header" 
                onClick={onClose}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </header>

            <main className="Modal-content">
              {children}
            </main>

            <footer className="Modal-footer">
              <button 
                className="Modal-btn Modal-btn-secondary" 
                onClick={onClose}
              >
                Fechar
              </button>
              
              {actionLabel && onAction && (
                <button 
                  className="Modal-btn Modal-btn-primary" 
                  onClick={onAction}
                  disabled={actionDisabled}
                >
                  {actionLabel}
                </button>
              )}
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
