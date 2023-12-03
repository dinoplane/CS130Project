import { useState, useRef, useEffect } from 'react';
import NotifOKImg from './img/notifOK.svg';
import NotifErrorImg from './img/notifError.svg';

import styles from './page.module.css';

export default function NotifDialog({
    closeNotifCallback,
    notifMsg,
    notifError,
}) {
    return (
        <div className={!notifError ? styles.notifdialog : styles.errordialog}>
            <div className={styles.notif_icon}>
                {!notifError ? (
                    <NotifOKImg className={styles.image} alt="HAI" />
                ) : (
                    <NotifErrorImg className={styles.image} alt="HAI" />
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
