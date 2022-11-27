import { Link } from 'react-router-dom'

import styles from './AddNewPost.module.scss'

export function AddNewPost() {
    return (
        <Link className={styles.addNewPost} to='/new-post'>
            Добавить новый пост!
        </Link>
    )
}
