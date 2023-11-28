import { useState, useRef, useEffect } from 'react'

import styles from './page.module.css'

export default function ErrorDialog({ closeErrorCallback, errorMsg }) {
    // const [hasError, setHasError] = useState(false);
    // const errorMsg = "";

    return (
        <div className={styles.errordialog}>
            <div>ICON</div>
            <p>{errorMsg}</p>
            <div onClick={closeErrorCallback}>CLOSE!</div>
        </div>
    )
}
