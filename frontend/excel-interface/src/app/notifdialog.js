import NotifOKImg from './img/notifOK.svg';
import NotifErrorImg from './img/notifError.svg';

import styles from './page.module.css';

/**
 * @class NotifDialog
 * This component renders a notification dialog which closes on click of a dismiss button.
 *
 * @param
 * @property {Boolean} dropdownOpen whether or not the dropdown is open
 * @callback handleOpen opens the dropdown
 * @callback handleClose closes the dropdown
 *
 * @returns {ReactNode} A React element that renders a dropdown menu
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
