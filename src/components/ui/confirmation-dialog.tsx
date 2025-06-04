'use client';

import Modal from './modal';
import FormButton from './form-button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar'
}: ConfirmationDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="mt-2">
        <p className="text-gray-300">{message}</p>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <FormButton variant="secondary" onClick={onClose}>
          {cancelLabel}
        </FormButton>
        <FormButton onClick={onConfirm}>
          {confirmLabel}
        </FormButton>
      </div>
    </Modal>
  );
}