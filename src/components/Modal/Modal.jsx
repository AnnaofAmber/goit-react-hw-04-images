import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ onClose, largeImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClose);

    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [onClose]);

  const handleClick = e => {
    if (e.target.nodeName === 'DIV' || e.code === 'Escape') {
      onClose();
    }
  };
  return (
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <img className={css.modalImage} src={largeImage} alt="" />
      </div>
    </div>
  );
};
