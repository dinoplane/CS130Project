/**
 * @module NotifDialog
 */

import NotifOKImg from './img/notifOK.svg';
import NotifErrorImg from './img/notifError.svg';

import styles from './page.module.css';

/**
 * @class
 * This component renders a notification dialog which closes on click of a dismiss button.
 *
 * @param {Callback} closeNotifCallback a callback called when the dismiss button is pressed
 * @param {String} notifMsg the notification message
 * @param {Boolean} notifError whether or not the notification is for an error
 *
 * @returns {ReactNode} A React element that renders a notification dialog
 */
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
