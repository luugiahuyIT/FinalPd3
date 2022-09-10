import React, { useEffect, useRef } from 'react';
import style from './Modal.module.css';
import InvoiceItem from '../InvoiceItem/InvoiceItem';
const Modal = ({ item, modalStyle, show, onClose, backdropStyle, total }) => {
  const modalRef = useRef(null);
  console.log('modal', item);
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(style.visible);
    } else {
      modalRef.current.classList.remove(style.visible);
    }
  }, [show]);

  return (
    <React.Fragment>
      <div
        ref={modalRef}
        style={backdropStyle}
        className={`${style.modal__wrap}`}
        onClick={onClose}
      >
        <div
          style={modalStyle}
          className={style.modal}
          onClick={(e) => e.stopPropagation()}
        >
          {item.map((item) => (
            <InvoiceItem item={item} />
          ))}
          <div className={style.total}>Total: {total} $</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
