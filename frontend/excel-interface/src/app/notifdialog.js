import { useState, useRef, useEffect } from 'react';
import NotifOKImg from './img/notifOK.svg';
import NotifErrorImg from './img/notifError.svg';

import styles from './page.module.css';

export default function NotifDialog({
    closeNotifCallback,
    notifMsg,
    notifError,
}) {
    // const [hasNotif, setHasNotif] = useState(false);
    // const notifMsg = "";

    return (
        <div className={styles.notifdialog}>
            <div className={styles.notif_icon}>
                {!notifError ? (
                    <NotifOKImg
                        className={styles.image}
                        alt="HAI"
                        // stroke="#00AA00"
                    />
                ) : (
                    <NotifErrorImg
                        className={styles.image}
                        alt="HAI"
                        // stroke="#00AA00"
                    />
                )}
            </div>
            <div className={styles.notif_right}>
                <p>{notifMsg}</p>

                <div
                    className={styles.notif_button}
                    onClick={closeNotifCallback}
                >
                    Dismiss
                </div>
            </div>
        </div>
    );
}
