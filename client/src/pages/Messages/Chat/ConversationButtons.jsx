import { MessageController } from "../../../controllers/index.js";

export function ConverstaionButtons( {selectedMessages, setSelectedMessages, conversation} ) {

    function cancelAllSelect() {
        setSelectedMessages([]);
    }

    function deleteMessages() {
        MessageController.remove(selectedMessages, conversation._id)
    }

    function editMessage() {

    }

    return (
        <div className="conversation__top">
            <div className="conversation__top-select-count">
                <div className="conversation__top-count">{selectedMessages.length} сообщения</div>
                <div className="conversation__top-cancel" onClick={cancelAllSelect}><i className="fa-solid fa-xmark"></i></div>
            </div>
            <div className="conversation__top-buttons">
                {selectedMessages.length === 1 
                ?
                <>
                    <button><i className="fa-solid fa-pen"></i></button>
                    <button onClick={deleteMessages}><i className="fa-solid fa-trash"></i></button>
                    <button><i className="fa-solid fa-star"></i></button>
                </>
                :
                <>
                    <button onClick={deleteMessages}><i className="fa-solid fa-trash"></i></button>
                    <button><i className="fa-solid fa-star"></i></button>
                </>
                }
            </div>
        </div>
    )
}