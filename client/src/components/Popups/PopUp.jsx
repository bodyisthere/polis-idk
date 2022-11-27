import "./Popup.scss";

export function PopUp( { isPopOpen, popMessage } ) {
  return (
    <div className={`popup ${isPopOpen === 'success' ? 'popup--success' : 'popup--error'}`}>
      <div className="popup__content">
        {isPopOpen === 'success' ? 'Успех' : popMessage}
      </div>
    </div>
  );
}

