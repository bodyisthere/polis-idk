import { Link } from "react-router-dom";

function NoUser() {
    return (
        <div className="no-user">
            <div className="no-user__bg"></div>
            <div className="no-user__text">
                <div className="no-user__text-content">
                    <span>Пользователь не найден😞</span>
                    <Link to='/'>Домой!</Link>
                </div>
            </div>
        </div>
    )
}

export default NoUser;