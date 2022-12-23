import "./Popup.scss";

export function PopUp( { isPopOpen, setIsPopOpen } ) {
  return (
    <div className={`popup ${isPopOpen === 'success' ? 'popup--success' : 'popup--error'}`}>
      <div className="popup__content">
        {isPopOpen === 'success' ? 'Успех' : 'Ошибка'}
      </div>
      <div className="popup__close" title="Закрыть" onClick={() => setIsPopOpen(false)}><i className="fa-solid fa-xmark"></i></div>
    </div>
  );
}

