import { useState, useRef, useEffect } from 'react';

import styles from './page.module.css';

export default function NotifDialog({ closeNotifCallback, notifMsg }) {
    // const [hasNotif, setHasNotif] = useState(false);
    // const notifMsg = "";

    return (
        <div className={styles.notifdialog}>
            <div>ICON</div>
            <p>{notifMsg}</p>
            <div onClick={closeNotifCallback}>CLOSE!</div>
        </div>
    );
}
