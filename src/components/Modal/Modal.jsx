import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ largeImageURL, openModal }) => {
  const handleClose = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) openModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  });

  return (
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};
